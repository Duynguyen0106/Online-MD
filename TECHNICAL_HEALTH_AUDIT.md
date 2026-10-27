# Technical Health Audit — Online MD

**Date:** 2026-10-27  
**Scope:** App Router pages, `actions/`, `lib/mastery/gates.ts`, `lib/demo/*`, auth/login, API health, tests, TODO/FIXME, dead routes, type safety, security, performance, error handling  
**Method:** Static code inspection + `npm test` / `npm run lint` / `npx tsc --noEmit` / built `.next` chunk sizes  
**Out of scope:** Medical/content accuracy claims (not evaluated)

---

## Executive summary

Online MD is a Next.js 15 App Router demo with a filesystem-backed session (`lib/demo/store.ts`) and a large in-repo curriculum seed (~1.6MB under `lib/curriculum`). Auth is intentionally demo-grade: no passwords, shared `session.json`, and a global role switcher that can become admin. Assessment items ship `correctChoiceId` to client components. Tests cover a thin slice of pure logic (15 cases). No `TODO`/`FIXME` markers were found. No open-redirect login callback was found.

---

## Findings

### P0 — Critical

| ID | Area | Finding | Evidence | Recommendation |
| --- | --- | --- | --- | --- |
| A1 | Auth | **Session is a shared server file + in-memory ID**, not per-browser cookies. Defaults to `user-student-1`. Any request on the same host/process shares one “logged-in” user. | `lib/demo/store.ts` `getSessionUserId` / `setSessionUserId` read/write `.data/session.json` and `memorySessionUserId` | Replace with signed HTTP-only cookies (or Supabase Auth). Never share one global session across users. |
| A2 | Auth | **`switchDemoUser(userId)` is an unauthenticated server action** that sets session to any id (including `user-admin-1`). UI exposes this via `RoleSwitcher` on every AppShell page. | `actions/learning.ts` `switchDemoUser`; `components/shared/role-switcher.tsx`; always rendered in `components/shared/app-shell.tsx` | Gate behind `DEMO_MODE` + local-only, or remove from production builds. Require real auth for faculty/admin. |
| A3 | Auth | **Login has no password / MFA.** `loginDemoStudent(email)` sets session if email matches a student. Signup creates a student and immediately sets session. | `actions/admin.ts` `loginDemoStudent`; `actions/auth.ts` `signupStudent`; `components/auth/login-form.tsx` | Wire Supabase (or equivalent) before any non-demo deploy. Keep demo login behind explicit env flag. |
| Q1 | Integrity | **Quiz/exam/qbank payloads include `correctChoiceId` (and explanations) on the client.** Students can read answers from RSC props / network. | `QuizQuestion` / `QbankQuestion` in `lib/types/domain.ts`; `app/lessons/[lessonId]/quiz/page.tsx` passes full questions to `QuizRunner`; `app/modules/[moduleId]/exam/page.tsx` same; **`app/qbank/page.tsx` passes `getQbankQuestions()` entire bank** as `questionsPreview` to client `QbankPanel` | Strip answers server-side; score only in server actions; return explanations after submit. Never send full qbank with keys to the browser. |
| Q2 | Gates | **Qbank mastery gates apply only when `user.role === "student"`.** After RoleSwitcher → faculty/admin, `startQbankAttempt` skips gates. | `actions/learning.ts` `startQbankAttempt` (~lines 231–246) | Enforce gates for all roles that take student assessments, or deny qbank for non-students. |

### P1 — High

| ID | Area | Finding | Evidence | Recommendation |
| --- | --- | --- | --- | --- |
| S1 | Persistence | **On Vercel/Lambda, demo data goes to `/tmp`** — progress, invites, overrides, reviews are ephemeral and non-shared across instances. | `lib/demo/data-dir.ts`; silent write failures in `writeStudentState` / `writeJson` | Persist to Supabase/DB when `DEMO_MODE=false`; fail loudly if durable write required. |
| S2 | Security | **`requireRole` is layout-only and trusts demo session.** Compromised session ⇒ full admin layout + privileged actions (`actions/admin.ts` `requireRoles`). | `app/admin/layout.tsx`, `app/faculty/layout.tsx`, `lib/auth/require-role.ts` | Real auth + RBAC claims; treat demo role switcher as incompatible with production. |
| S3 | API | **`GET /api/health` is unauthenticated and discloses** `demoMode`, `supabaseConfigured`, `hasServiceRole`, key type, catalog sizes. | `app/api/health/route.ts` | Split public liveness (`ok`) from authenticated diagnostics. |
| S4 | Embeds | **Video iframe `src` falls back to raw `mediaUrl`** if not YouTube-shaped — faculty-editable URLs can embed arbitrary origins. | `components/student/lesson-player.tsx` `toEmbedUrl` | Allowlist hosts (youtube, vimeo, mux); reject others. |
| E1 | Errors | **No `app/error.tsx`, `global-error.tsx`, or `not-found.tsx`.** Unhandled action/`ZodError` throws surface as generic Next failures. | Glob under `app/` — zero error/not-found boundaries | Add route-level error + not-found UI; map Zod errors to 400-style client messages. |
| E2 | Actions | **Most mutations `throw new Error(...)`** without stable error codes; client catch is inconsistent (quiz submit has no try/catch). | `actions/learning.ts`, `components/student/quiz-runner.tsx` | Return `{ ok: false, error }` or use `useActionState`; always catch on client. |
| R1 | Routes | **Dead / incomplete routes:** `/admin` has layout but no `page.tsx` (404). No `/faculty/lessons` index (only `[lessonId]`). | `app/admin/` listing; `app/faculty/lessons/` | Add redirect `/admin` → `/admin/analytics`; optional faculty lessons index. |
| R2 | Auth stack | **Supabase clients exist but login/signup never use them** — production auth path is unfinished. | `lib/supabase/{client,server,admin,config}.ts` vs `actions/auth.ts` / login form | Either finish Supabase auth or document demo-only and fail build when `DEMO_MODE=false` without auth. |
| T1 | Tests | **No tests for actions, API, auth, demo store, or App Router pages.** Regression risk on gates/auth/scoring. | Only 5 `*.test.ts` files; `package.json` `test` lists them explicitly | Add action/unit tests for scoring + gates; API health contract; store isolation. |
| P1perf | Perf | **Curriculum graph is huge and pulled into large server chunks** (~1.3MB `lib_demo_admin-store` server chunk). Many pages call `getAllModules`/`getAllLessons` and rebuild program. | `du -sh lib/curriculum` ≈ 1.6M; `.next/server/chunks/...admin-store...js` ≈ 1.3M; `topics-generated.ts` ≈ 752KB / ~14k lines; hour-budget live graph ~884 lessons | Split catalog into DB/lazy JSON; cache resolved program; avoid loading full expansions on every health/dashboard hit. |

### P2 — Medium / hygiene

| ID | Area | Finding | Evidence | Recommendation |
| --- | --- | --- | --- | --- |
| C1 | Secrets | **No client-bundled service role / AI keys found.** `SUPABASE_SERVICE_ROLE_KEY` and `AI_API_KEY` are server-only. `NEXT_PUBLIC_*` anon/publishable keys are expected. | `.env.example`; `lib/supabase/admin.ts` comment; `lib/ai/medical-educator.ts` | Keep service role out of `"use client"`; add CI grep for `SERVICE_ROLE` in client graphs. |
| C2 | Redirects | **No open redirect on login** — hardcodes `/dashboard`. Invite accept routes by role to fixed paths. | `login-form.tsx`, `accept-invite-form.tsx` | If adding `?next=`, validate same-origin path allowlist. |
| C3 | TODO | **No `TODO` / `FIXME` / `@ts-ignore` / `as any` matches** in TS/TSX (repo is clean of those markers). | Repo-wide ripgrep | Continue; prefer issues for known gaps instead of silent debt. |
| C4 | Types | **Hotspots:** `JSON.parse(...) as T` without Zod in demo stores; `as MedicalReviewStatus` cast; `mod.exam!`; `role as "faculty" \| "admin"`. Strict TS is on. | `lib/demo/store.ts`, `admin-store.ts`, `actions/medical-review.ts`, `actions/admin.ts` | Parse persisted JSON with Zod schemas already used for inputs. |
| C5 | Lint | Unused import warning in learning actions. | `eslint`: `getQuestionMap` unused in `actions/learning.ts` | Remove unused import. |
| C6 | Scripts | **`package.json` has no `typecheck` / `e2e` / coverage.** `test` hardcodes five files (easy to drift). `lint` is bare `eslint`. | `package.json` scripts | Add `"typecheck": "tsc --noEmit"`; `test` via glob; optional Playwright smoke. |
| C7 | Middleware | **No `middleware.ts`** — no edge auth, CSP, or rate limits. | Glob — none | Add middleware when real auth lands; consider CSP for iframes/markdown. |
| C8 | Health cost | Health handler loads full module/lesson catalog for counts. | `app/api/health/route.ts` | Cache counts or use lightweight counters. |
| C9 | Invite UX | Invite accept is token-gated (hashed at rest — good) but returns raw token once from `createFacultyInvite` — fine for demo; ensure tokens never log. | `lib/demo/admin-store.ts` `hashToken` / `createInvite` | Keep hashing; short TTL already (7d). |

---

## App Router page map

| Route | Shell / guard | Notes |
| --- | --- | --- |
| `/` | Marketing | No auth |
| `/login`, `/signup` | Forms | Demo email-only |
| `/invite/[token]` | Accept invite | Provisions faculty/admin |
| `/dashboard`, `/competency`, `/presentations`, `/flashcards`, `/qbank`, `/tutor`, `/cases`, `/cases/[id]`, `/modules/[id]`, `/modules/[id]/exam`, `/lessons/[id]`, `/lessons/[id]/quiz`, `/presentations/[slug]` | `AppShell` | No role gate; uses shared demo session |
| `/faculty/*` | `requireRole(faculty\|admin)` layout | Medical review, editors |
| `/admin/analytics|invites|unlock-rules|users` | `requireRole(admin)` layout | **`/admin` itself 404** |
| `/api/health` | Public GET | Only API route |

---

## Auth / login flow (as implemented)

1. Default session → `user-student-1` if no `session.json`.
2. Login → `loginDemoStudent(email)` → must be existing **student** → `setSessionUserId`.
3. Signup → create student in `users.json` → set session.
4. Invite → hashed token → create faculty/admin → set session.
5. RoleSwitcher → `switchDemoUser` → any demo user id (student/faculty/admin).
6. Supabase modules unused by this flow.

---

## `lib/mastery/gates.ts`

Pure mastery/unlock logic is coherent: lesson = all blocks viewed + quiz ≥ threshold; module = all lessons mastered + exam passed; qbank scopes respect admin unlock rules. Covered partially by `lib/mastery/gates.test.ts` (lesson mastery + module/step1 lock only). **Gaps:** `evaluateModuleMastery`, `canAccessStep2CkQbank`, `recomputeModuleProgress`, `scoreResponses`, unlock-rule inactive paths, faculty gate bypass in actions.

---

## `lib/demo/store`

- Per-user `progress-{userId}.json` + global `session.json`.
- Memory fallback masks disk failures (progress can silently vanish on serverless).
- Session is process-global — incorrect for multi-tenant or concurrent users.

---

## API health

`GET /api/health` returns `ok: true`, catalog counts (via full accessors), Supabase config/reachability, `hasServiceRole` boolean. Useful for ops; over-exposed as public.

---

## Tests vs gaps

| File | Covers | Gaps |
| --- | --- | --- |
| `lib/spaced-repetition/supermemo2.test.ts` | SM-2 reset / interval 1 / interval 6 | Quality edge cases, due dates |
| `lib/mastery/gates.test.ts` | Lesson blocks+quiz; module qbank lock; step1 lock | Module mastery, step2ck, scoring, unlock rules |
| `lib/competency/domains.test.ts` | Domain string normalization | Aggregation matrix |
| `lib/curriculum/seed-chapter-enhance.test.ts` | Thin lesson expansion length/structure | Catalog factory / expansions integrity |
| `lib/curriculum/clinical-cases-unique.test.ts` | Unique clinical case IDs | Quiz/qbank ID uniqueness |

**Missing entirely:** `actions/*`, auth/session, admin-store, API routes, UI/E2E, security regressions (answer stripping), Supabase path.

**Run result (this audit):** `npm test` → 15/15 pass; `npm run lint` → 2 warnings; `npx tsc --noEmit` → clean.

---

## `package.json` scripts

| Script | Purpose |
| --- | --- |
| `dev` | `next dev --turbopack` |
| `build` | `next build --turbopack` |
| `start` | `next start` |
| `lint` | `eslint` (no explicit paths/max-warnings) |
| `test` | Hardcoded list of 5 `tsx --test` files |
| `mastery` | `scripts/mastery-path.ts` smoke of unlock path |
| `hours` | `scripts/hour-budget.ts` curriculum hour model |
| `audit:medical` | `scripts/medical-content-audit.ts` |

**Absent:** `typecheck`, `test:watch`, coverage, e2e, `db:*`, format.

---

## Performance notes (non-medical)

- `lib/curriculum` ≈ **1.6MB** source; generated topics alone ≈ **752KB**.
- Live curriculum scale (from `npm run hours`): **~884 lessons**, large first-pass hour budget — load cost is structural.
- Largest built artifact inspected: **~1.3MB** server chunk for `lib/demo/admin-store` (pulls expansions).
- Client components generally do **not** import seed/expansions directly (good); answer leakage is via **serialized props**, not seed import.
- Qbank page serializes the **entire question bank** to the client on every visit — bandwidth + integrity issue.

---

## Error handling summary

- Server actions: throw + Zod `.parse` (unhandled → 500).
- Clients: login/signup/invite/qbank/exam catch; quiz runner does not.
- Demo store: swallows FS errors.
- AI path: falls back offline on `AI_DISABLED` (tutor/case) — intentional.

---

## Priority remediation order (engineering)

1. Stop shipping `correctChoiceId` to clients; score server-side (Q1).  
2. Replace shared demo session / role switcher for any shared deploy (A1–A3).  
3. Enforce qbank gates regardless of role (Q2).  
4. Durable storage + real auth when leaving demo (S1–S2, R2).  
5. Trim health disclosure; add error boundaries; expand tests (S3, E1, T1).  
6. Lazy-load / externalize curriculum catalog (P1perf).
