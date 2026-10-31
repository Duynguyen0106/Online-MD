# Full App Audit — Online MD

**Date:** 2026-10-27  
**Baseline:** `main` @ `d33588d` (post medical + UX stack ship)  
**Tracks:** Medical (`npm run audit:medical`) · UX/UI (all roles) · Technical health  
**Detail docs:** [`MEDICAL_CONTENT_AUDIT.md`](MEDICAL_CONTENT_AUDIT.md) · [`UX_UI_AUDIT.md`](UX_UI_AUDIT.md) · [`TECHNICAL_HEALTH_AUDIT.md`](TECHNICAL_HEALTH_AUDIT.md) · [`MEDICAL_REVIEW_REQUIRED.md`](MEDICAL_REVIEW_REQUIRED.md)  
**Status:** Structural + product + engineering. **Not medical approval. Not WCAG certification.**

---

## Executive summary

| Area | Verdict |
| --- | --- |
| Medical structure | **Green** — objectives/refs/vague verbs/concept flags/quiz structure at zero |
| Medical safety gate | **Open** — 807 guideline-sensitive lessons; 83 guideline quiz rows; HIGH human-review list |
| UX / roles | **Mostly green** after passes 1–3; **2 new P0 copy issues** (student “Locked”; sources jargon) |
| Engineering | **Demo-only unsafe for shared prod** — shared session, role switcher → admin, answers shipped to client |
| Verification | `tsc` clean · tests **15/15** · lint 2 warnings · mastery OK · hours ≈ **4.04** FTE years |

**Fix order (cross-cutting)**

1. **Tech Q1** — stop shipping `correctChoiceId` / full keyed banks to the browser; score server-side.  
2. **Tech A1–A3** — demo session + unauthenticated role switcher incompatible with shared deploy.  
3. **UX G2 + S1** — student “Locked” CTA + “not medically approved” sources jargon.  
4. **Medical M1** — faculty review of HIGH pathways (do not invent medicine).  
5. **UX P1 cluster** — tutor 884-select, flashcard labels, mobile nav a11y, exam/qbank submit guards.  
6. **Scale** — qbank 24 vs 884 quizzes; durable storage when leaving demo.

---

## 1. Surface map

| Role | Routes |
| --- | --- |
| Marketing | `/`, `/login`, `/signup`, `/invite/[token]` |
| Student | `/dashboard`, `/modules/[id]`, `/lessons/[id](+quiz)`, `/competency`, `/presentations`, `/qbank`, `/flashcards`, `/cases`, `/tutor` |
| Faculty | `/faculty`, `/faculty/lessons/[id]`, `/faculty/flashcards`, `/faculty/questions`, `/faculty/medical-review` |
| Admin | `/admin/analytics|invites|unlock-rules|users` (**`/admin` itself 404**) |
| API | `/api/health` (public) |

---

## 2. Medical (re-run)

| Metric | Value |
| --- | --- |
| Lessons / objectives / quizzes / flashcards | **884** / **3422** / 884 / 846 |
| Qbank / cases | **24** / **24** |
| Missing objectives · vague verbs · missing Sources · concept flags · quiz structural gaps | **all 0** |
| Guideline-sensitive lessons · guideline quiz rows | **807** · **83** |
| Soft title overlaps | **125** (80 same-module?, 24 cross-module, 14 foundational-vs-clinical, 7 level) |
| Cases 4-stage / 2-stage | **7** / **17** |

| ID | Sev | Finding | Next step |
| --- | --- | --- | --- |
| M1 | P0 | HIGH pathways still need physician/educator review | `/faculty/medical-review`; see `MEDICAL_REVIEW_REQUIRED.md` |
| M2 | P1 | 807 + 83 guideline flags, not auto-rewritten | Queue by organ system |
| M3 | P1 | Qbank depth tiny vs curriculum | Objective-mapped expansion + sign-off |
| M4 | P2 | Soft title overlap debt | Committee consolidate vs keep |
| M5 | P2 | Most cases still 2-stage | Expand high-traffic presentations |

---

## 3. UX / UI (open after merge)

**Already fixed (verified):** mobile nav, Learn/Practice, skip-link, lesson sticky progress, heatmap scroll hint, objectives pagination, unlock-rules voice, lesson sticky save, gate reason cleanup, STUDENT_COPY wiring — see `UX_UI_AUDIT.md` §2.

| ID | Sev | Finding | Next step |
| --- | --- | --- | --- |
| G2 | P0 | Module qbank CTA still says **“Locked”** | “Not yet available” / reason-only |
| S1 | P0 | Lesson Sources footer exposes faculty QA jargon | Neutral student copy; status faculty-only |
| N7 | P1 | Mobile nav: no Escape / outside click / focus trap | Standard disclosure a11y |
| G3–G4 | P1 | Step badges omit locked state; exam/qbank allow empty submit | Align with quiz runner |
| A4–A7 | P1 | ProgressBar / cases / flashcards / heatmap a11y gaps | Labels + aria |
| L3–L4 | P1 | Lesson TOC pushes content on mobile; concept titles missing | Collapse TOC; show concept headings |
| T1 | P1 | Tutor shows `AI_ENABLED` env jargon + 884-option select | Student copy + searchable picker |
| F3–F6 | P1 | Faculty density / jargon / unconfirmed review actions | Humanize + confirm |
| D5 | P1 | Reset progress one-click | Confirm dialog |
| P2 backlog | P2 | Design-system debt, logo home, empty states, admin blurb | When touching those surfaces |

---

## 4. Technical health (open)

| ID | Sev | Finding | Next step |
| --- | --- | --- | --- |
| Q1 | P0 | Quiz/exam/qbank props include **`correctChoiceId`**; qbank page ships entire bank | Strip answers; score in server actions |
| A1–A3 | P0 | Shared `session.json` + unauthenticated `switchDemoUser` + passwordless login | Cookies/Auth; gate demo switcher |
| Q2 | P0 | Qbank gates skipped for faculty/admin role | Enforce for assessment takers |
| S1–S3 | P1 | `/tmp` demo persistence; layout-only RBAC; health discloses config | Durable DB; real claims; slim health |
| S4 | P1 | Video iframe may embed arbitrary `mediaUrl` | Host allowlist |
| E1–E2 | P1 | No `error.tsx` / `not-found.tsx`; throw-heavy actions | Boundaries + typed results |
| R1–R2 | P1 | `/admin` 404; Supabase auth unused | Redirect; finish or fail-closed |
| T1 | P1 | No action/API/UI tests | Scoring + gate + answer-strip regressions |
| P1perf | P1 | ~1.6MB curriculum graph / large server chunks | Lazy catalog / cache |
| C5 | P2 | Unused import lint warnings | Clean |

Full evidence tables: `TECHNICAL_HEALTH_AUDIT.md`.

---

## 5. Cross-cutting risks

1. **Integrity** — client-visible correct answers undermines mastery gates even when UX copy is polished.  
2. **Demo → shared host** — one session file + role switcher = anyone can become admin.  
3. **Guideline density** — faculty review capacity is the medical bottleneck, not more generators.  
4. **Practice thinness** — 884 lessons vs 24 qbank / 24 cases.

---

## 6. Intentionally unchanged

- Mastery threshold math / unlock-rule semantics (except role bypass Q2).  
- Invented clinical thresholds or regimens.  
- Full visual redesign / dark mode.  
- Claiming medical approval or WCAG conformance.

---

## 7. Verification log

| Check | Result |
| --- | --- |
| `npm run audit:medical` | Structural zeros as §2 |
| `npx tsc --noEmit` | Pass |
| `npm test` | 15/15 |
| `npm run lint` | 0 errors, 2 warnings |
| `npm run mastery` | OK |
| `npm run hours` | ≈ 4.04 FTE program years |
