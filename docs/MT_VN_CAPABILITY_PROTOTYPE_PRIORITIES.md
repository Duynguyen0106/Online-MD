# MT.vn → Online MD capability prototype priorities

**Date:** 2026-10-27  
**Context:** Follow-on to [COMPARISON_MEDICAL_TUTOR_VN.md](./COMPARISON_MEDICAL_TUTOR_VN.md).  
**Constraint:** Keep Online MD’s mastery curriculum spine. Do not replace Phase → Module → Lesson with a practice-only IA. Do not invent medical content or claim clinical approval.

## Implemented P0 (2026-10-27)

| Capability | Student routes |
| --- | --- |
| Competency heatmap (study evidence) | [`/competency`](../app/competency/page.tsx) + dashboard focus widget |
| Clinical-presentation index | [`/presentations`](../app/presentations/page.tsx) + [`/presentations/[slug]`](../app/presentations/[slug]/page.tsx) |

Evidence is progress-derived only; scores are **not** clinical certification. P1+ items below remain recommended, not built.

---

## Priority framework

| Rank | Criteria |
| --- | --- |
| P0 | High educational leverage, fits existing domain model, low risk to auth/scoring/unlock |
| P1 | Strong product differentiation; needs new surfaces but can sit beside curriculum |
| P2 | Valuable later; heavy media/simulation or localization/monetization scope |
| Skip (near-term) | Conflicts with institutional/demo MVP or requires unverified clinical tooling |

---

## Ranked prototypes

### P0 — Competency heatmap over existing modules

**MT.vn analog:** `/competency` (17 systems × 12 domains heatmap).

**Online MD fit:** Map existing modules (and optionally organ-system tags on lessons/objectives) to a student-facing competency matrix. Evidence comes from lesson mastery, formative scores, exam attempts, qbank attempts—not a parallel unlock economy.

**Suggested slice:**

1. Define competency domains aligned to existing `physicianTask` / content categories (start with 6–8, not necessarily 12).
2. Aggregate per-module evidence from `StudentState` + mastery gates.
3. Dashboard widget + `/competency` (or dashboard section) with “next lesson” links into current module/lesson routes.
4. Label as study evidence, not certification (mirror MT.vn’s disclaimer posture).

**Avoid:** Paid system unlocks; replacing mastery gates.

---

### P0 — Clinical-problem index across clerkship content

**MT.vn analog:** 128 clinical problems under organ systems.

**Online MD fit:** Index clerkship lessons + clinical cases by presentation (chest pain, dyspnea, shock, AKI, etc.) without rewriting the curriculum graph.

**Suggested slice:**

1. Sidecar taxonomy (`presentation` / `clinical_problem` tags) on lessons/cases—non-destructive, like content-metadata.
2. Student “Approach by presentation” browse that deep-links to existing `/lessons/...` and `/cases/...`.
3. Seed with high-yield presentations already called out in the medical content audit.

**Avoid:** Mass-generating new problem banks before tagging existing content.

---

### P1 — Richer clinical cases (SCT-style and multi-stage reasoning)

**MT.vn analog:** `/chan-doan-sct`, multi-step case reasoning.

**Online MD fit:** Extend [`ClinicalCase`](../lib/types/domain.ts) stages beyond the current ~2-stage pattern; optional SCT-like “new finding changes hypothesis” stage type.

**Suggested slice:**

1. Expand 2–3 existing cases to 6–10 reasoning stages (presentation → differential → data → interpretation → management → reassessment).
2. Add an optional stage kind for concordance-style ratings only after faculty review of stems.
3. Keep AI case feedback Zod-validated; no diagnostic claims for real patients.

**Avoid:** Full SCT product surface until a few enriched cases prove the pedagogy.

---

### P1 — OSCE / virtual-patient as advanced case type (thin prototype)

**MT.vn analog:** `/osce`, `/virtual-patient`, timed bedside actions.

**Online MD fit:** New advanced case mode under `/cases`, not a separate simulation stack.

**Suggested slice:**

1. Case subtype: checklist + timed stations (history/exam/orders) with structured scoring against expectedFocus.
2. One demo station (e.g., chest pain) linked from IM clerkship.
3. Faculty-editable checklist items.

**Avoid:** 3D avatars, device physics, or Bates-scale libraries in the first prototype.

---

### P2 — Mock-exam UX over gated qbank

**MT.vn analog:** `/thi-thu`.

**Online MD fit:** Timed multi-block exam runner that draws from unlocked qbank/module exam pools after mastery gates.

**Suggested slice:** Reuse exam runner patterns; add “practice block” mode with review. Grow item bank only with objective mapping + medical review.

---

### P2 — Product tours / guided onboarding

**MT.vn analog:** Extensive Vietnamese `PageTourHost` tours.

**Online MD fit:** Short English tours for dashboard → first module → quiz → qbank unlock explanation.

**Avoid:** Full localization until product market decision is explicit.

---

### P2 — Classrooms / cohorts

**MT.vn analog:** `/my-classes`.

**Online MD fit:** Optional faculty-visible cohort progress on top of existing student state—after auth/Supabase cutover is stable.

---

### Skip near-term

| Capability | Why skip now |
| --- | --- |
| Subscription / entitlements (`/goi-dang-ky`) | Conflicts with institutional/demo MVP; monetization is a separate product decision |
| Vietnamese localization as default | Locale strategy not decided; keep English/USMLE spine |
| Full 3D anatomy–physiology hub | High media cost; does not strengthen mastery curriculum first |
| Medical English pathway | Adjacent product; not required for MD curriculum OS |
| Replacing modules/lessons with `/study`-only IA | Would abandon Online MD’s core differentiator |

---

## Recommended build order

1. **Competency heatmap (P0)** — uses data already produced by mastery.
2. **Clinical-problem index (P0)** — improves clerkship navigation without new medical prose.
3. **Multi-stage / SCT-leaning cases (P1)** — deepens clinical reasoning on existing case infrastructure.
4. **Thin OSCE station (P1)** — only after case stage model is solid.
5. **Mock-exam blocks + tours (P2)** — polish and scale once banks grow under medical review.

---

## Non-goals for prototypes

- Do not invent doses, guideline years, or SCT answer keys without faculty review.
- Do not weaken mastery gates to mimic entitlement unlocks.
- Do not claim competency scores certify clinical competence.
- Do not mass-generate OSCE/SCT content to “catch up” on volume.
