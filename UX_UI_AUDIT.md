# UX / UI Audit

**Date:** 2026-10-27  
**Scope:** Student, faculty, and admin surfaces (App Router + shared shell)  
**Method:** Code inspection of routes, shell, players, gates, and copy; P0 remediations in the same pass  
**Status:** Structural / interaction audit. Not a visual redesign or accessibility certification.

---

## 1. Surface map

| Role | Primary routes |
| --- | --- |
| Marketing | `/`, `/login`, `/signup`, `/invite/[token]` |
| Student | `/dashboard`, `/modules/[id]`, `/lessons/[id]`, `/competency`, `/presentations`, `/qbank`, `/flashcards`, `/cases`, `/tutor` |
| Faculty | `/faculty`, `/faculty/flashcards`, `/faculty/questions`, `/faculty/lessons/[id]`, `/faculty/medical-review` |
| Admin | `/admin/analytics`, `/admin/invites`, `/admin/unlock-rules`, `/admin/users` (+ faculty + student view) |

Shared chrome: [`components/shared/app-shell.tsx`](components/shared/app-shell.tsx) + [`components/shared/app-nav.tsx`](components/shared/app-nav.tsx).

Design tokens: Fraunces + Source Sans 3; teal clinical palette in [`app/globals.css`](app/globals.css).

---

## 2. Findings (before → after this pass)

### P0 — fixed

| ID | Finding | Fix |
| --- | --- | --- |
| N1 | No mobile navigation (`nav` was `hidden md:flex`) | Client `AppNav` with Menu/Close disclosure |
| N2 | “Log in” always in student/faculty nav while demo session exists | Removed; “Switch account” near role switcher |
| N3 | Faculty/admin nav omitted Medical review | Added `/faculty/medical-review` to faculty + admin links |
| N4 | No active nav state | Pathname-aware active styles (desktop + mobile) |
| G1 | Qbank gate reasons leaked internal strings (`Rule inactive`, concatenated mastery reasons) | Student-facing reasons only in `canAccessModuleQbank` / Step 1 missing-curriculum copy |
| C1 | Educational role badges showed `CLINICAL APPLICATION` raw | `formatEducationalRole()` |
| C2 | Exam runner said “Item N”; quizzes said “Question N” | Unified to “Question N” |
| C3 | `STUDENT_COPY` underused on home/dashboard/qbank/module | Wired taglines and qbank/module CTAs |
| V1 | Marketing `max-w-5xl` vs app `max-w-6xl` | Home hero/header aligned to `max-w-6xl` |
| V2 | Cases cards lacked hover lift used elsewhere | Matched presentation/dashboard hover |
| A1 | Role switcher select lacked accessible name | `aria-label="Demo role"` |

### P1 — recommended next (not in this PR)

| ID | Finding | Recommendation |
| --- | --- | --- |
| N5 | Eight student nav items compete on desktop | Group Learn / Practice or collapse secondary links |
| N6 | Role switcher shows role enum only (`student`) | Show display name + role |
| L1 | Lesson player is dense (sidebar + long chapters) | Sticky progress + clearer section completion |
| L2 | Competency heatmap may overflow on small screens | Horizontal scroll affordance / compact mode |
| F1 | Faculty objectives table dumps 3k+ rows on one page | Search / pagination / module filter |
| F2 | Faculty editors are form-heavy without sticky save | Sticky save bar + unsaved warning |
| AD1 | Admin unlock-rules copy still more “system” than “education” | Align labels with student voice |
| A2 | Focus rings / skip-link not audited | Add skip-to-content + visible `:focus-visible` |
| A3 | Color-only progress (emerald badges) | Pair with text (already mostly done; keep pairing) |

### P2 — later

| ID | Finding |
| --- | --- |
| D1 | Only Button + Badge primitives; unused Radix deps vs IMPLEMENTATION_PLAN “shadcn” |
| D2 | Card pattern duplicated ad hoc (no shared Card component) |
| D3 | Product tours / mock-exam UX (MT.vn P2) not built |
| D4 | Dark mode not supported (fine; avoid accidental drift) |

---

## 3. Interaction patterns (current)

```mermaid
flowchart LR
  Dashboard --> Module
  Module --> Lesson
  Lesson --> Quiz
  Module --> Exam
  Exam --> Qbank
  Dashboard --> Competency
  Dashboard --> Presentations
  Presentations --> Lesson
  Presentations --> Cases
```

- Progress language: Not started / In progress / Complete (avoid “locked” / “mastered” in student UI).
- Gates: disabled CTA + reason text; mastery logic unchanged.
- Practice: learn-first copy on qbank; competency scores labeled study evidence.

---

## 4. Intentionally unchanged

- Mastery thresholds, unlock rules, scoring, auth.
- Full visual redesign / new design system.
- Faculty content editing workflows beyond nav discoverability.
- WCAG certification (needs dedicated a11y pass with tooling).

---

## 5. Verification

- `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run mastery`, `npm run build`
- Manual: mobile Menu opens student links; faculty sees Medical review; locked qbank shows friendly reason only
