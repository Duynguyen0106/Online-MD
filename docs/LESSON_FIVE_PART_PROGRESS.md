# Five-Part Lesson Expansion Progress

**Structure (required for every lesson):**
1. Core Pathophysiology
2. Clinical Presentation
3. Diagnostic Approach
4. Management & Pharmacology
5. High-Yield Board Pearl

**Safety:** No invented doses, hemodynamic cutoffs, or standing regimens. Guideline-sensitive lines keep `REFERENCE_REVIEW_REQUIRED`.

## Scope

| Layer | Count | Mechanism |
| --- | ---: | --- |
| Catalog (generated) | 771 | `chapter-writer.ts` + `factory.ts` emit five-part blocks for every `les-cat-*` topic |
| Handcrafted seed/expansion | 113 | Authored overlays in `lib/curriculum/authored/five-part/` applied via `seed-chapter-enhance.ts` |
| **Total** | **884** | |

## Handcrafted module checklist

| Module | Lessons | Status |
| --- | ---: | --- |
| mod-cv | 8 | **Done** (`cv.ts`: les-cv-1…8) |
| mod-pulm | 7 | **Done** (`pulm.ts`: les-pulm-1…7) |
| mod-renal | 8 | **Done** (`renal.ts`: les-renal-1…8) |
| mod-gi | 6 | Pending |
| mod-endo | 6 | Pending |
| mod-heme | 7 | Pending |
| mod-neuro | 7 | Pending |
| mod-msk | 7 | Pending |
| mod-id | 7 | Pending |
| mod-im | 7 | Pending |
| mod-surg | 7 | Pending |
| mod-peds | 7 | Pending |
| mod-obgyn | 7 | Pending |
| mod-psych | 7 | Pending |
| mod-fm | 7 | Pending |
| mod-cell-mol | 8 | Pending |

## Catalog

All 771 catalog lessons receive the five-part spine automatically when the curriculum graph is built (overview + sections 1–5 + case vignette).

## Next pass

Author `lib/curriculum/authored/five-part/gi.ts` next, then endo → heme → remaining clerkship modules.
