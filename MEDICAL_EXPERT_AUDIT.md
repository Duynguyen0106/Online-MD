# Medical Expert Re-Audit (post–pedagogy pass)

**Date:** 2026-10-27  
**Auditor posture:** Experienced medical educator (mechanisms → phenotype → reasoning → assessment)  
**Baseline:** `cursor/medical-pedagogy-pass-405e` @ `d3d1f78`  
**Method:** `npm run audit:medical` + live lesson/case/figure sampling of P0 pathways  
**Status:** Educational audit. **Not medical approval. Not a license to invent cutoffs or regimens.**

---

## Executive verdict

| Layer | Grade | One-line judgment |
| --- | --- | --- |
| Structural hygiene | **A** | Objectives/refs/vague verbs/concept flags/quiz structure remain zero |
| Handcrafted P0 cores (CV/renal/ID) | **B+** | Real teaching leads again; real SVGs; enhancement scaffold still noisy |
| Figures | **B+** | Mechanism schematics now teach; PH figure correctly refuses numbers |
| Cases (sampled 4-stage) | **B** | Sound reasoning spine without protocol dumps; still templated cadence |
| High-yield formatives | **B+** | Mechanism/localization stems beat catalog templates |
| Catalog chapters | **C** | Still long and bank-dense; **enrichment false positives are the top residual harm** |
| Faculty medical gate | **Incomplete** | All HIGH items on `MEDICAL_REVIEW_REQUIRED.md` still open |

**Bottom line:** Pedagogy pass fixed the worst *seed pollution* and added usable figures/practice. The next medical-education risk is **wrong-chapter enrichment inside catalog (and residual seed “Additional context”)**, not missing page count. Do not “fix” HIGH pathways by generating numbers.

---

## Inventory (re-run)

| Metric | Value |
| --- | --- |
| Lessons / objectives / blocks | 884 / 3422 / 4352 |
| Formative quizzes / qbank / cases / flashcards | **890** / 24 / 24 / 846 |
| Missing objectives · vague verbs · missing Sources · concept flags · quiz structural gaps | **0** |
| Guideline-sensitive lessons · guideline quiz rows | **803** · **85** |
| Soft title overlaps | 125 |
| Cases 4-stage / 2-stage | **11** / **13** |

---

## What improved (keep)

1. **Seed signal restored** — `les-cv-1` leads with AP phase table; **no ETC/OXPHOS or acute-stroke chapter** in the lead.  
2. **Real diagrams** — SVG embeds on `les-cv-1/2/3/4`, `les-renal-2/3`, `les-id-1/2` (not ASCII “sketch this”).  
3. **New mechanism figures** — `coronary-ecg`, plaque `acs-pathway`, `ph-pre-post`, `sepsis-immunopath`, `frank-starling-hf`; PH caption correctly defers numeric cutoffs.  
4. **4-stage cases** — fever IE, HHS, hyperK, meningitis use representation → threat filter → educational plan → reassessment **without** dumping insulin/K or antibiotic regimens.  
5. **Formatives** — `qq-cv-2b/2c`, `qq-cv-3b`, `qq-cv-4b`, `qq-id-2b`, `qq-renal-3b` are mechanism/next-step items, not “Regarding {Title}…” templates.  
6. **Student Sources** — neutral “citations being verified” language (faculty gate unchanged).

---

## Findings (still open)

### P0 — medical-education harm / safety process

| ID | Finding | Evidence | Recommendation |
| --- | --- | --- | --- |
| E1 | Catalog enrichment **false positives** inject wrong chapters | PH lesson can pull capacity/ethics via `/hold/` ⊂ “threshold”; sepsis catalog can pull obstructive-lung bank via `\bniv\b` ⊂ “u**niv**ersal” | Tighten regexes (`\\bhold\\b` / NIV word boundaries); add negative tests |
| E2 | HIGH guideline pathways still student-visible without approval | PH, ACS, sepsis, VTE/PERC, DKA/HHS, vent/ARDS, OB/peds shock, onc, RRT on `MEDICAL_REVIEW_REQUIRED.md` | Faculty queue only; **do not invent numbers** |
| E3 | Seed “Additional context” can still bleed adjacent banks | `les-id-1` point “hemolysis” → anemia framework | Require title match for loose hematology regexes on seed path |

### P1 — teaching quality

| ID | Finding | Recommendation |
| --- | --- | --- |
| T1 | Enhancement scaffold (`Control-point checklist`, bridge tables, 90 min) still wraps already-good cores | Skip or shrink enhancement when original notes already teach the mechanism |
| T2 | `les-renal-1` still has no figure (nephron SVG is on `les-renal-2`) | Add Starling/GFR schematic or reuse a filtration figure |
| T3 | Catalog sepsis chapters remain density ≫ signal (~tens of k chars) | Do not thicken; prune false-positive banks; keep recognition/reassessment frame |
| T4 | Qbank still 24 vs 884 lessons | Expand only objective-mapped + signed off |
| T5 | 13 cases remain 2-stage | Next presentation-priority expansions only |

### P2 — hygiene

| ID | Finding | Recommendation |
| --- | --- | --- |
| H1 | Formative distractors sometimes absurd (“Vitamin C only”) | Prefer plausible near-misses |
| H2 | Soft title overlaps (125) | Continue retitle / learner_level companion pattern |
| H3 | Catalog “Regarding… most accurate?” stems at scale | Rewrite when touching those topics |

---

## Pathway spot-checks

### Cardiovascular
- **EP (`les-cv-1`):** Teachable again; figure present; enhancement padding remains.  
- **ACS (`les-cv-2`):** Territories + plaque→pathway figures good; regimens stay review-required — correct.  
- **HF (`les-cv-3`):** Phenotypes + Frank–Starling sketch good; GDMT still conceptual.  
- **Shock (`les-cv-4`):** Phenotype SVG replaces ASCII sketch — clear win.

### Renal / ID
- **GFR (`les-renal-1`):** Starling-first rewrite is pedagogically correct; add a figure next.  
- **Acid–base (`les-renal-3`):** Algorithm + fork figure solid.  
- **Bacteriology (`les-id-1`):** Branching lab logic improved; watch hemolysis→anemia bleed.  
- **Sepsis (`les-id-2`):** Bedside + immunopath figures complement each other.

### Cases / quizzes
- Four expanded cases: educational sequencing language is appropriate for students.  
- New formatives outperform catalog templates; keep guideline footers where ACS/sepsis-adjacent.

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

## Recommended next pass (ordered)

1. **Fix enrichment false positives** (E1/E3) with regression tests — highest educational safety ROI.  
2. **Gate enhancement scaffold** when original reading already carries the mechanism (T1).  
3. **Faculty medical review** of HIGH list (E2) — human only.  
4. GFR figure for `les-renal-1`; continue 2→4 stage cases by presentation traffic (T2/T5).  
5. Selective qbank growth with sign-off (T4).

---

## Verification

- `npm run audit:medical` — structural zeros held  
- `npm test` — 16/16 pass  
- Live sampling: CV leads clean of ETC/stroke banks; PH matcher attaches `ph-pre-post`; case stage mix 11×4 / 13×2
