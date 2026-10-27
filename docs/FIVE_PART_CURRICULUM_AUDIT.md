# Five-Part Curriculum Audit

**Date:** 2026-10-27  
**Branch:** `cursor/five-part-lesson-structure-405e`  
**Method:** `npx tsx scripts/five-part-audit.ts` → `docs/audit/five-part-audit.json` + targeted qualitative review  
**Status:** Structural, pedagogical, and safety-heuristic audit. **Not medical approval.**

---

## Verdict

**PASS with conditions** for structure and safety heuristics across all **884** lessons.

| Gate | Result |
| --- | --- |
| Five-part spine present (handcrafted) | **113 / 113** |
| Five-part spine present (catalog) | **771 / 771** |
| `REFERENCE_REVIEW_REQUIRED` present | **884 / 884** |
| Teach-back padding (`Extra rehearsal pass`) | **0** |
| Blank “Clinical prediction” tables | **0** |
| Heuristic standing-dose / mPAP–PCWP / Na-correction hits | **0** |

**Conditions (not blockers for merge of structure work, but required before claiming clinical readiness):**

1. Faculty must still attach citations — every lesson carries `REFERENCE_REVIEW_REQUIRED`.  
2. Catalog prose remains **template-enriched**, not hand-authored specialty text (all 771 hit scaffold openers).  
3. **91 / 113** handcrafted chapters still rely on the shared clerkship-integration floor footer to clear 2000 chars — deepen content is real but uneven.  
4. Several handcrafted pairs are pedagogically overlapping and should be differentiated or merged in a later editorial pass.

---

## 1. Scope & counts

| Layer | Count | How five-part is delivered |
| --- | ---: | --- |
| Catalog (`les-cat-*`) | 771 | `chapter-writer.ts` + `factory.ts` |
| Handcrafted seed/expansion | 113 | `lib/curriculum/authored/five-part/*` via `seed-chapter-enhance.ts` |
| **Total** | **884** | |

### Deepen overlay mix (handcrafted)

| Overlay | Lessons |
| --- | ---: |
| P0 (`p0-deep.ts`) | 15 |
| Wave 2 (`wave2-deep.ts`) | 31 |
| Wave 3 (`wave3-deep.ts`) | 61 |
| Base module file only (no deepen overlay) | 6 |

Base-only survivors are primarily longer original CV chapters that already cleared the floor without overlays.

---

## 2. Structure findings

### Required spine (all lessons)

1. Core Pathophysiology  
2. Clinical Presentation  
3. Diagnostic Approach  
4. Management & Pharmacology  
5. High-Yield Board Pearl  

**Handcrafted:** 113/113 contain all five numbered `##` headings after enhancement.  
**Catalog:** 771/771 emit the five teaching sections plus overview + case.

### Module rollup (handcrafted)

Every module (`mod-cv` … `mod-cell-mol`) reports **five = n** and **ref = n** in `docs/audit/five-part-audit.json`.

### Length (handcrafted reading+vignette body)

| Metric | Value |
| --- | ---: |
| Min | 2,073 |
| Avg | 2,758 |
| Max | 5,884 |
| < 2,500 chars | 22 |
| < 3,000 chars | 97 |
| Using floor footer | 91 |

Shortest post-enhance: `les-surg-4`, `les-psych-6`, `les-id-1`.  
Longest: `les-cv-1`, `les-cv-2`, `les-id-2`, `les-cv-3`.

---

## 3. Safety findings

### Heuristics run

- Weight/time-indexed dose patterns (`mg/kg`, `mg/day`, etc.)  
- Hemodynamic cutoff patterns (`mPAP`, `PCWP`, `MAP` with comparators)  
- Hard sodium-correction “mEq” rate patterns  
- Blank Clinical-prediction tables  
- Missing faculty marker  

### Results

| Heuristic | Handcrafted | Catalog |
| --- | ---: | ---: |
| Dose-pattern hits | 0 | 0 |
| Hemodynamic cutoff hits | 0 | 0 |
| Hard Na-correction hits | 0 | 0 |
| Blank prediction tables | 0 | 0 |
| `REFERENCE_REVIEW_REQUIRED` | 113 | 771 |

**Interpretation:** Educational text is staying conceptual on regimens/cutoffs in the automated scan. This does **not** prove clinical accuracy — only that the common “invented standing order” fingerprints are absent.

---

## 4. Quality / pedagogy findings

### A. Catalog is structurally complete but stylistically templated

All 771 catalog lessons match scaffold openers from `proseForPoint` (e.g. “Begin here: this is a control point…”, “This is often the first branch…”).  
Keyword `factualEnrichment` banks add real medical prose where titles/points match, but chapters without rich keyword hits remain generic.

**Risk:** Students may experience “same voice, different title” fatigue in Year 1–2 catalog blocks.  
**Recommendation:** Priority enrich organ-system P0 catalog titles with topic-specific banks or hand overrides (same pattern as handcrafted deepen overlays).

### B. Handcrafted deepen depth is uneven

- P0 overlays (sepsis, shock, ACS/AKI, electrolytes, PE/ARDS, DKA, UGIB, trauma, transfusion, alcohol withdrawal) are the strongest academic chapters.  
- Wave 2/3 overlays restore full five-part teaching but many still need the shared **Clerkship integration & safety** footer to clear 2000 chars.  
- Footer is pedagogically useful (teach-aloud checklist + safety) but is not a substitute for topic-specific depth.

**Recommendation:** Next deepen wave should target the 22 chapters still &lt;2500 chars and any wave-3 chapters that are mostly footer-propped.

### C. Overlapping handcrafted pairs (editorial)

| Pair | Issue |
| --- | --- |
| `les-gi-2` / `les-gi-3` | Portal hypertension / cirrhosis complications overlap heavily |
| `les-peds-1` / `les-peds-3` | Young-infant fever frame vs application — intentional ladder, but nearly duplicate after deepen |
| `les-im-1` / `les-im-5` | CAP content vs disposition — OK if `les-im-5` stays disposition-only (monitor drift) |
| `les-renal-2` / `les-renal-8` | Diuretics transport vs sites-of-action — high redundancy |

**Recommendation:** Differentiate objectives explicitly or merge into one lesson + one drill in a later editorial PR.

### D. Not audited in this pass

- Quiz stem/explanation medical accuracy  
- Flashcard accuracy  
- Clinical case stage fidelity  
- Hour budget / mastery gate impact of longer chapters  
- UI rendering of markdown tables/diagrams after overlay merge  

---

## 5. Priority remediation backlog

| Priority | Item | Why |
| --- | --- | --- |
| P0 | Faculty citation pass on `REFERENCE_REVIEW_REQUIRED` | Blocks any claim of guideline currency |
| P1 | Deepen 22 handcrafted chapters still &lt;2500 chars | Reduce footer dependence |
| P1 | Resolve GI / peds / renal diuretic overlap pairs | Student confusion / wasted hours |
| P2 | Catalog anti-template enrichment for high-traffic Year 2 organ topics | Reading experience / retention |
| P2 | Spot-check learner UI for five-part navigation | Confirm factory block titles surface correctly |
| P3 | Quiz/flashcard alignment to new five-part anchors | Assessment validity |

---

## 6. Reproduction

```bash
npx tsx scripts/five-part-audit.ts
# writes docs/audit/five-part-audit.json

npm test
# includes five-part regression suite (22 tests at audit time)
```

Optional npm alias: `npm run audit:five-part`

---

## 7. Bottom line

The curriculum **meets the five-part pedagogical contract** across all 884 lessons and **clears automated safety fingerprints** for invented standing doses/hemodynamic cutoffs/blank prediction tables.  

It is **ready for structured faculty medical review**, not ready to be labeled as medically approved content. The highest-yield next human work is citation attachment + continued deepen of the shortest handcrafted chapters and editorial de-duplication of overlapping pairs.
