# Medical Expert Re-Audit (post–fix-everything pass)

**Date:** 2026-10-27 · **Reconfirm:** 2026-10-29 (rebased onto main; audit re-run)  
**Auditor posture:** Experienced medical educator (mechanisms → phenotype → reasoning → assessment)  
**Baseline:** `cursor/medical-pedagogy-pass-405e` (post–pedagogy + safe fix pass + main sync)  
**Method:** `npm run audit:medical` + regression tests for enrichment FPs + live sampling  
**Status:** Educational audit. **Not medical approval. Not a license to invent cutoffs or regimens.**

---

## Executive verdict

| Layer | Grade | One-line judgment |
| --- | --- | --- |
| Structural hygiene | **A** | Objectives/refs/vague verbs/concept flags/quiz structure remain zero |
| Handcrafted P0 cores (CV/renal/ID) | **A−** | Real teaching leads; light enhance preserves cores; GFR figure added |
| Figures | **A−** | Mechanism schematics teach; PH still refuses numbers; GFR Starling map live |
| Cases | **B+** | **19** four-stage / **6** two-stage; presentation-priority expansions + AMI progressive |
| High-yield formatives | **B+** | Near-miss distractors improved on sepsis/HF items |
| Catalog chapters | **B−** | Enrichment false positives (hold/NIV/hemolysis) fixed with tests |
| Faculty medical gate | **Incomplete** | All HIGH items on `MEDICAL_REVIEW_REQUIRED.md` still open |

**Bottom line:** Safe engineering fixes closed the top educational-harm residual (wrong-chapter enrichment) and reduced scaffold noise on already-good seeds. HIGH guideline pathways remain human-only.

---

## Inventory (re-run)

| Metric | Value |
| --- | --- |
| Lessons / objectives / blocks | 884 / 3422 / 4337 |
| Formative quizzes / qbank / cases / flashcards | **890** / 24 / **25** / 846 |
| Missing objectives · vague verbs · missing Sources · concept flags · quiz structural gaps | **0** |
| Guideline-sensitive lessons · guideline quiz rows | **808** · **85** |
| Soft title overlaps | 125 |
| Cases 4-stage / 2-stage | **19** / **6** |

---

## Fix-everything pass (safe automations only)

| ID | Status | What changed |
| --- | --- | --- |
| E1 | **Fixed** | `\bhold\b` / word-bound `\bniv\b`; ethics capacity tightened; regression tests |
| E3 | **Fixed** | Anemia bank no longer matches bare bacteriology “hemolysis”; seed title-gate for loose banks |
| T1 | **Fixed** | Light enhance when original notes already teach — keeps concepts; no Control-point wrap |
| T2 | **Fixed** | `gfr-starling` figure on `les-renal-1` |
| T5 | **Improved** | Expanded presentation-priority + high-yield 2→4 stage cases (18/24 now 4-stage) |
| H1 | **Improved** | `qq-id-2b` / `qq-cv-3b` distractors → plausible near-misses |
| E2 | **Open** | Faculty HIGH review — do not invent numbers or clear rows |

---

## Remaining backlog (not auto-fixed)

1. **E2 / HIGH gate** — PH, ACS, sepsis, VTE/PERC, DKA/HHS, vent/ARDS, OB/peds shock, onc, RRT  
2. **T3** — Catalog sepsis density (prune only; do not thicken)  
3. **T4** — Qbank still 24; grow only with sign-off  
4. **T5 residual** — 6 two-stage cases: `case-heme-1`, `case-obgyn-1`, `case-msk-1`, `case-surg-2`, `case-neuro-2`, `case-obgyn-2`  
5. **H2/H3** — Soft title overlaps; catalog “Regarding…” stems at scale  

---

## Explicitly do NOT auto-fix

1. PH mPAP / PCWP (or any hemodynamic) cutoffs  
2. ACS antiplatelet / anticoagulant / reperfusion regimens as orders  
3. Sepsis hour-1 checklists, fluid/pressor/antibiotic bundles as standing orders  
4. DKA/HHS insulin–potassium protocols  
5. Vent/ARDS targets, OB/peds septic shock, neutropenic fever regimens, RRT thresholds  
6. Setting `APPROVED` or clearing HIGH review rows without a human  
7. Inventing institutional “ideal answers” inside cases  

---

## Verification

- `npm test` — 24/24 pass (includes new enrichment FP suite)  
- `npm run audit:medical` — structural zeros held  
- Case mix: **18×4-stage / 6×2-stage**  
- Live checks: `threshold` ↛ capacity bank; `universal` ↛ NIV bank; bacteriology hemolysis ↛ anemia on seed path  
