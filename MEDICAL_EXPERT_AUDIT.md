# Medical Expert Re-Audit (chapter structure + table hygiene)

**Date:** 2026-10-27  
**Auditor posture:** Experienced medical educator (mechanisms → phenotype → reasoning → assessment)  
**Baseline:** `cursor/chapter-structure-tables-405e` (on pedagogy + fix-everything)  
**Method:** Chapter-spine review + live table sampling + `npm run audit:medical`  
**Status:** Educational audit. **Not medical approval. Not a license to invent cutoffs or regimens.**

---

## Executive verdict

| Layer | Grade | One-line judgment |
| --- | --- | --- |
| Structural hygiene | **A** | Objectives/refs/vague verbs/concept flags/quiz structure remain zero |
| Chapter spine | **B+** | Mechanism → phenotype → practice → sources is clear; empty prediction tables removed |
| Handcrafted P0 cores | **A−** | Real teaching + light enhance; renal-2/3 and id-2 now light-enhanced |
| Figures | **A−** | Mechanism schematics teach; PH refuses numbers; GFR Starling map live |
| Cases | **B+** | 18 four-stage / 6 two-stage |
| Catalog chapters | **B** | No more blank Clinical-prediction grids; Sources prose (not status table) |
| Faculty medical gate | **Incomplete** | HIGH items on `MEDICAL_REVIEW_REQUIRED.md` still open |

**Bottom line:** The main structural student-confusion mode was **markdown tables that looked like answers but were homework placeholders**. Generators now emit teach-back lists instead. Do not mass-fill prediction columns without faculty.

---

## Inventory (re-run)

| Metric | Value |
| --- | --- |
| Lessons / objectives / blocks | 884 / 3422 / 4331 |
| Formative quizzes / qbank / cases / flashcards | **890** / 24 / 24 / 846 |
| Missing objectives · vague verbs · missing Sources · concept flags · quiz structural gaps | **0** |
| Guideline-sensitive lessons · guideline quiz rows | **809** · **85** |
| Soft title overlaps | 125 |
| Cases 4-stage / 2-stage | **18** / **6** |

---

## Chapter structure grades

| Spine path | Count (approx) | Structure judgment |
| --- | --- | --- |
| Handcrafted + light enhance | P0 CV/renal/ID cores | **Keep** — original concepts, teach-back pad only |
| Full seed scaffold (stubs) | Remaining thin seeds | Basics → how it works → clinical bridge **list** → put together |
| Catalog writer | ~771 `les-cat-*` | Framing → core → clinical teach-back list → synthesis + Sources prose |

### Table hygiene (this pass)

| Finding | Before | After |
| --- | --- | --- |
| Seed Bridge `# \| Anchor \| Clinical prediction` | Placeholder third column on ~104 lessons | Replaced with **Clinical bridge — teach-back** numbered list |
| Catalog Correlation / Working tables | Identical blank prediction cells on ~771 lessons | Numbered mechanism/chapter-rule teach-backs |
| Catalog Sources status grid | `REFERENCE_REVIEW_REQUIRED` looked like a content answer | Neutral Sources prose (+ faculty marker) |
| `les-cv-1` Phase \| Event \| Key current | Real filled teaching | **Unchanged — keep** |

---

## Still open

1. **E2 / HIGH gate** — PH, ACS, sepsis, VTE/PERC, DKA/HHS, vent/ARDS, OB/peds shock, onc, RRT  
2. Faculty-authored **filled** comparison tables only when verified (nephritic/nephrotic, Crohn/UC, etc.) — not this pass  
3. Qbank growth with sign-off; residual 6 two-stage cases; soft title overlaps  

---

## Explicitly do NOT auto-fix

1. Inventing filled “Clinical prediction” cells at scale  
2. PH/ACS/sepsis/DKA numeric or regimen content  
3. Clearing HIGH review rows without a human  

---

## Verification

- `npm test` — 29/29 (enrichment + chapter-writer table hygiene + light-enhance P0s)  
- `npm run audit:medical` — structural zeros held  
- Live checks: full-scaffold and catalog ACS/PH/sepsis bodies have **no** `| Clinical prediction |` header  
