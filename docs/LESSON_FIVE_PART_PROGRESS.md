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
| mod-cv | 8 | **Done** (`cv.ts`) |
| mod-pulm | 7 | **Done** (`pulm.ts`) |
| mod-renal | 8 | **Done** (`renal.ts`) |
| mod-gi | 6 | **Done** (`gi.ts`) |
| mod-endo | 6 | **Done** (`endo.ts`) |
| mod-heme | 7 | **Done** (`heme.ts`) |
| mod-neuro | 7 | **Done** (`neuro.ts`) |
| mod-msk | 7 | **Done** (`msk.ts`) |
| mod-id | 7 | **Done** (`id.ts`) |
| mod-im | 7 | **Done** (`im.ts`) |
| mod-surg | 7 | **Done** (`surg.ts`) |
| mod-peds | 7 | **Done** (`peds.ts`) |
| mod-obgyn | 7 | **Done** (`obgyn.ts`) |
| mod-psych | 7 | **Done** (`psych.ts`) |
| mod-fm | 7 | **Done** (`fm.ts`) |
| mod-cell-mol | 8 | **Done** (`cell-mol.ts`) |

**Handcrafted authored: 113 / 113**

## Catalog

All 771 catalog lessons receive the five-part spine automatically when the curriculum graph is built (overview + sections 1–5 + case vignette).

## Deepen pass (P0)

High-traffic clerkship chapters overlaid in `p0-deep.ts` (wins over thinner module stubs):

- `les-id-2` Sepsis
- `les-renal-3` Acid–base, `les-renal-4` Hyponatremia, `les-renal-5` Hyperkalemia
- `les-im-2` Chest pain/ACS, `les-im-4` AKI
- `les-cv-4` Shock, `les-cv-5` Tachyarrhythmia
- `les-pulm-3` PE, `les-pulm-4` ARDS
- `les-endo-2` DKA/HHS
- `les-gi-4` UGIB
- `les-surg-4` Trauma primary survey
- `les-heme-5` Transfusion reactions
- `les-psych-6` Alcohol withdrawal

## Maintenance

Continue deepen passes for remaining padded chapters; keep `REFERENCE_REVIEW_REQUIRED` until citations are attached. Prefer editing module files or `p0-deep.ts` under `lib/curriculum/authored/five-part/` rather than reintroducing placeholder tables.
