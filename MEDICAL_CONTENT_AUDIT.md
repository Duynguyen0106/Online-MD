# Medical Content Audit

**Date:** 2026-09-28 (baseline) · **Refresh:** 2026-10-27 · **Pedagogy pass:** 2026-10-27 · **Expert re-audit:** 2026-10-27 · **Fix-everything:** 2026-10-27  
**Scope:** Live Online MD curriculum graph (seed + expansion waves + 4-year catalog) + MT.vn P0 surfaces  
**Method:** Inspect-only inventory via `scripts/medical-content-audit.ts` → `docs/audit/*.json`, plus targeted review of cardiovascular, sepsis, VTE, heart-failure pathways, and P0 presentation/competency metadata.  
**Status:** Structural and educational audit. **Not medical approval.**  
**Expert re-audit:** [`MEDICAL_EXPERT_AUDIT.md`](MEDICAL_EXPERT_AUDIT.md) (post–fix-everything teaching-quality pass).

---

## Fix-everything pass (2026-10-27)

Safe automations only — no invented cutoffs/regimens; HIGH faculty gate unchanged.

| Metric | After fix-everything |
| --- | --- |
| Lessons / objectives / quizzes / qbank / cases | 884 / 3422 / **890** / 24 / 24 |
| Content blocks | **4337** (light enhance preserves cores; less scaffold churn) |
| Structural zeros | **held** |
| Cases with ≥4 stages | **18** / 6 remaining 2-stage |
| Guideline-sensitive lessons / quiz rows | 808 / 85 (flagged only) |
| Enrichment FPs | `hold`⊂threshold, `niv`⊂universal, bacteriology→anemia **fixed** + tests |
| Seed enhancement | Light path when mechanism already taught (no Control-point wrap on CV cores) |
| New figure | `gfr-starling` on `les-renal-1` |

---

## Pedagogy pass (2026-10-27)

Teaching-quality pass (illustrations + deliberate practice). No invented doses/cutoffs.

| Metric | After pedagogy pass |
| --- | --- |
| Lessons / objectives / quizzes / qbank / cases | 884 / 3422 / **890** / 24 / 24 |
| Content blocks | **4352** (diagram embeds added) |
| Structural zeros (missing objs/refs/vague/concept flags/quiz structural) | **held** |
| Cases with ≥4 stages | **11** (was 7; fever/HHS/hyperK/meningitis expanded) |
| Guideline-sensitive lessons / quiz rows | 803 / 85 (flagged only) |
| Seed enhancement | Original teaching notes first; category/organ bank dump removed; ETC/stroke false positives fixed |
| New/updated figures | `coronary-ecg`, `acs-pathway` (plaque fork), `ph-pre-post`, `sepsis-immunopath`, `frank-starling-hf` + seed embeds of existing SVGs |
| Student Sources footer | Neutral “citations being verified” (no raw medical-approval jargon) |

### Pedagogy remediations applied

1. Constrained `factualEnrichmentForSeedLesson` — title/points only, max 3 snippets; teaching notes lead.  
2. Embedded existing SVGs into `les-cv-1/4`, `les-renal-2/3`, `les-id-1/2`.  
3. New mechanism SVGs for coronary–ECG, ACS fork, PH map, sepsis immunopath, Frank–Starling/HF.  
4. Extended `case-id-1`, `case-endo-1`, `case-renal-2`, `case-neuro-1` to 4-stage pattern.  
5. Added 6 high-yield formative items on ACS/HF/shock/sepsis/acid–base (review-flagged where guideline-adjacent).  
6. Expanded `les-renal-1` / `les-id-1` cores; retitled catalog PFT companion; learner_level metadata.  
7. Softened student-facing Sources copy (faculty medical gate unchanged).

---

## Refresh findings (2026-10-27)

### Fix-pass inventory (after safe remediations)

| Metric | Baseline → pass 1 → **pass 2** |
| --- | --- |
| Lessons / objectives / quizzes / qbank / cases / flashcards | 884 / 3206 / 884 / 24 / 23 / 846 → 884 / **3422** / 884 / 24 / **24** / 846 |
| Lessons missing objectives | 0 → **0** |
| Objectives per lesson | many singles → **all 3–5** |
| Vague-verb objectives | 0–4 → **0** |
| Lessons missing Sources / `REFERENCE_REVIEW_REQUIRED` | 64 → **0** |
| Exact title collisions | 1 → **0** |
| Quiz rows needing attention (structural) | 174 → 83 → **0** |
| Quiz guideline-sensitive only (separate) | — → — → **83** (flagged, not auto-rewritten) |
| Concept flags (tamponade/HF/MONA/HyperK scans) | 57–60 → **0** (false-positive HyperK scan fixed; MONA framed) |
| Cases with ≥4 reasoning stages | 0 → **7** high-yield |
| Title overlap pairs (Jaccard ≥0.45) | 126 → 125 (soft lexical; not exact dupes) |
| Guideline-sensitive keyword hits | 807 (broad scan; not approval) |

### Safe remediations applied

1. **Duplicate case ID** — depth “Warm Shock” renamed **`case-cv-2`**; unique-ID test added; linked on `/presentations/shock`.
2. **Syncope case** — added `case-im-2` from existing syncope teaching (no new thresholds); linked on `/presentations/syncope`.
3. **Capacity objectives** — replaced bare Understand/Appreciate teaching points with noun phrases.
4. **Sources footers** — `ensureSourcesFooter` on seed/wave lessons (`REFERENCE_REVIEW_REQUIRED`; no invented DOIs).
5. **Quiz distractor teaching** — pedagogical footer when explanations lacked why/correct/distractor language (no new medical claims).
6. **Objective coverage** — supplemental objectives derived from existing concept summaries so every lesson has 3–5 measurable statements.
7. **Exact-title hygiene** — FM back pain, peds asthma acute, CAP disposition retitled to distinguish complementary lessons.
8. **Vague module copy** — replaced student/seed “Understand …” module blurbs with measurable verbs.
9. **Competency Interpretation** — Interpret-led statements map into the heatmap domain.
10. **Audit script** — HF GDMT false-positive fixed; PERC flag respects pretest/adjunct framing.
11. **Pass 2** — HyperK body false-positives removed; MONA only flags when historical framing absent; guideline quiz disclaimer footers; 7 high-yield cases expanded to 4 stages; PH lesson metadata → `MEDICAL_REVIEW`.

### Intentionally NOT “fixed” (human / medical gate)

- PH hemodynamic cutoffs, ACS reperfusion detail, VTE/PERC clinical validation, DKA/HHS insulin–K protocols, vent/ARDS numbers, pregnancy/pediatric septic shock, oncologic emergency regimens — remain on `MEDICAL_REVIEW_REQUIRED.md`.
- 807 guideline-sensitive keyword hits and 83 guideline-flagged quiz rows — flagged, not auto-rewritten.
- Soft Jaccard title overlaps — educator judgment for consolidate vs keep.
- No claim of medical approval; competency scores remain study evidence only.

### P0 presentation index (medical-safety check)

- All 10 presentation lesson/case IDs resolve; summaries are framing-only.
- Shock → `case-cv-2`; syncope → `case-im-2`.

---

## 1. Curriculum overview

Online MD is organized as:

| Layer | Structure |
| --- | --- |
| Program | Online MD (`prog-md-online`) |
| Phases | 2 — Preclinical (Years 1–2, Step 1 focus); Clinical (Years 3–4, Step 2 CK focus) |
| Modules | 22 (16 preclinical + 6 core clerkships) |
| Lessons | 884 published study units |
| Progression intent | Mechanisms → organ systems → clerkships → advanced/ICU topics layered on clerkship modules |

Catalog topics (771) expand into textbook-style chapters (Foundations → Core → Clinical correlation → Synthesis → Case). Seed and waves 1–7 supply denser handcrafted lessons and the clinical case / qbank spine.

**Curriculum map (conceptual):**

```
Curriculum
 → Phase (foundations | clerkship_core)
   → Module
     → Lesson
       → Learning objective(s)
       → Content blocks (reading / vignette / video / diagram)
       → Formative quiz question(s)
       → Flashcard(s)
     → Module exam questions
 → Qbank questions (module- and step-tagged)
 → Clinical cases (module-linked stages + teaching points)
```

---

## 2. Counts

| Asset | Count |
| --- | --- |
| Phases | 2 |
| Modules | 22 |
| Lessons | 884 |
| Content blocks | 4,343 |
| Learning objectives (records) | 881 |
| Formative quiz questions | 884 |
| Qbank questions | 24 |
| Clinical cases | 23 |
| Flashcards | 846 |

### Module lesson counts (preclinical)

| Module | Lessons |
| --- | --- |
| Cells, Molecules & Mechanisms | 48 |
| Cardiovascular | 33 |
| Respiratory | 32 |
| Renal & Acid–Base | 33 |
| GI & Hepatology | 31 |
| Endocrine & Reproductive | 31 |
| Hematology & Oncology Foundations | 32 |
| Neurosciences & Behavior | 32 |
| Musculoskeletal & Rheumatology | 32 |
| Host Defense / Micro / ID | 54 |
| Biochemistry & Metabolism | 48 |
| Anatomy / Embryology / Imaging | 40 |
| Immunology | 32 |
| Pharmacology Foundations | 34 |
| Epidemiology / Biostats / Prevention | 14 |
| Ethics / Professionalism / Systems | 12 |

### Module lesson counts (clinical)

| Module | Lessons |
| --- | --- |
| Internal Medicine | 71 |
| Surgery | 60 |
| Pediatrics | 52 |
| OB/GYN | 55 |
| Psychiatry | 53 |
| Family Medicine | 55 |

---

## 3. Learning objectives

| Metric | Value |
| --- | --- |
| Lessons with 0 objectives (audit baseline) | **5** |
| Lessons with 0 objectives (after safe fix) | **0** |
| Objective records (after catalog expansion) | **~3,206** |
| Vague verb objectives (`know` / `understand` / etc.) | 1 fixed (`obj-peds-6`) |

**Baseline gap (now remediated for coverage):** Five seed lessons lacked objectives; catalog lessons used a generic `Explain and apply: {title}` pattern. Catalog factory now emits 3–4 measurable objectives per topic from existing teaching points. Student-facing chapter framing still lists objectives in markdown as well.

**Previously missing (objectives added):**

1. `les-msk-1` — Approach to Joint Pain  
2. `les-peds-1` — Fever in the Young Infant — Reasoning Frame  
3. `les-obgyn-1` — Prenatal Care Foundations  
4. `les-psych-1` — Safety Assessment & Mood Disorders Intro  
5. `les-fm-1` — Preventive Care & Undifferentiated Symptoms  

---

## 4. Assessment linkage

| Bank | With `objectiveId` | Without |
| --- | --- | --- |
| Formative quizzes | 884 | 0 |
| Qbank | 24 | 0 |

**Strength:** Every question currently carries an objective ID.  
**Weakness:** Mapping is usually 1 question → 1 thin objective → 1 lesson. Cognitive-level and difficulty tags exist only on qbank (`difficulty: number`). Formative items lack cognitive-level metadata. Explanations are often correct but short; ~497 lack explicit distractor teaching.

---

## 5. Clinical cases

23 cases; each typically has **2 stages** (far below the 12-stage reasoning scaffold recommended for rich cases). Cases cover CV dyspnea, DKA-like presentation, chest pain, acute abdomen, shock, PE, variceal bleed, hyponatremia, anemia, ectopic risk, delirium, hyperkalemia, meningitis, pancreatitis, gout, alcohol withdrawal, hypercalcemia, cholecystitis, opioid ABG, TLS electrolytes, myasthenia, shoulder dystocia, endocarditis.

**Missing presentation pathways (recommended, not mass-generated):** syncope workup case, undifferentiated fever, GI bleed non-cirrhotic, AKI ward case expansion, stroke time-window case, hyperglycemia non-DKA.

---

## 6. Duplicate / overlapping lessons

Exact title collisions:

| Title | Instances | Classification |
| --- | --- | --- |
| Low Back Pain Red Flags | Preclinical MSK + FM clerkship | FOUNDATIONAL vs CLINICAL (complementary) |
| Community Pneumonia Disposition | Seed IM + catalog IM | SAME_MODULE — consolidate or retitle |
| Oncologic Emergencies | Y3 catalog + Y4 catalog IM | CORE vs ADVANCED — retitle Y4 |
| Pediatric Asthma Exacerbation | Seed peds + catalog peds | SAME_MODULE — consolidate or retitle |
| Suicide Risk Assessment Essentials | Seed psych + catalog psych | SAME_MODULE — consolidate or retitle |

High-value complementary pairs (keep; distinguish purpose):

| Foundation / mechanism | Clinical / advanced |
| --- | --- |
| Cardiac Electrophysiology & Mechanics | Cardiac Electrophysiology Gradients (pacemaker If, VW map) |
| Ischemic Heart Disease & ACS | ACS Pathophysiology Deep Dive → ACS Pathway in the ED → Complicated ACS ICU Care |
| Heart Failure & Foundational Therapy | Heart Failure Mechanisms HFrEF/HFpEF → Acute HF Admission Decisions |
| Shock Classification by Mechanism | Shock Microcirculation & Lactate → Bedside differentiation → ICU teams |
| Valvular Heart Disease Hemodynamics | (physics / lesion-specific catalog topics) |
| Cardiac Tamponade Physiology | Pericardial disease catalog |

Full overlap list: `docs/audit/overlaps.json` (131 pairs at Jaccard ≥0.45; many are false positives from shared words).

---

## 7. Questions without objectives

None in the current graph (0 formative, 0 qbank). Secondary gap: objectives are too coarse to support fine-grained mastery reporting.

---

## 8. Questions with weak explanations

17 formative items with explanation length &lt; 40 characters (mostly catalog one-liners that restates the correct choice). ~497 additional items lack explicit “why not the others” teaching. See `QUESTION_BANK_AUDIT.md`.

---

## 9. Lessons without references

~482 clinical/pathophys lessons lack a student-facing Sources / References section. Catalog chapter footer notes “verify doses and guidelines” but does not list verified citations. **Do not invent DOIs.** Prefer `REFERENCE_REVIEW_REQUIRED` until a faculty reviewer attaches society guidelines / landmark trials.

---

## 10. Guideline-sensitive lessons

Keyword scan is intentionally broad. Priority clusters for human review (not auto-approved):

- Antibiotic selection / CAP / sepsis / neutropenic fever  
- Anticoagulation / VTE / PE / Wells–PERC  
- ACS antiplatelet / anticoagulation / reperfusion  
- Stroke / thrombolysis windows  
- Vasopressors / shock / ICU monitoring  
- Insulin / DKA / HHS  
- Mechanical ventilation / ARDS  
- Pregnancy / pediatric septic shock  
- Oncologic emergencies / immunosuppression  

See `MEDICAL_REVIEW_REQUIRED.md` and `docs/audit/guideline-sensitive-lessons.json`.

---

## 11. Potentially outdated / imprecise content

| Item | Finding | Action |
| --- | --- | --- |
| Tamponade summary (`les-cv-8`) | “kills preload” — imprecise | **Fix** to diastolic compression / impaired filling language |
| HFrEF GDMT (`les-cv-3`) | Already lists ARNI/ACEI/ARB, BB, MRA, SGLT2 + diuretics | Keep; add HFmrEF phenotype label; flag for reviewer confirmation |
| MONA in ACS vignette | Explicitly labeled historical vs contemporary | OK educationally; keep MEDIUM flag |
| Hour-1 Sepsis Bundle title | Risks rigid checklist reading | Retitle / reframe toward recognition + reassessment |
| PERC/Wells catalog topics | Mentions tools; pretest probability framing weak in chapter bullets | Flag for review; do not invent thresholds |
| PH hemodynamic definition | Single PH groups lesson; verify mPAP threshold currency | Flag HIGH for reviewer |

---

## 12. Advanced content mixed into core curriculum

Year-4 advanced topics (ICU shock teams, complicated ACS, septic shock beyond hour-1, oncologic emergencies, PICU sepsis) live inside the same clerkship modules as core Y3 lessons. Phase kind is a single `clerkship_core` for all clinical years — **no separate advanced phase in the live graph**. Learners currently see advanced and core titles in one list without an explicit level badge.

---

## 13. Missing clinical reasoning opportunities

Cases are vignette-thin (2 stages). Recommended pathways (recommend-only): Chest pain, Dyspnea, Syncope, Fever, Shock, Altered mental status, AKI, GI bleeding, Hyperglycemia, Electrolyte abnormalities — each with immediate threats → assessment → differential → discriminators → labs → interpretation → initial management → reassessment.

---

## 14. Medical-review-required items

See `MEDICAL_REVIEW_REQUIRED.md` (prioritized HIGH / MEDIUM / LOW).

---

## 15. Recommended restructuring

See `CURRICULUM_RECOMMENDATIONS.md`. **Do not mass-delete or mass-generate.** Prefer metadata (learner level, review status), retitling duplicates, and expanding objectives/cases where medically supportable.

---

## 16. Metadata & review architecture (current vs needed)

| Capability | Current | Needed |
| --- | --- | --- |
| Publish status | `draft` / `published` / `archived` on lessons | Keep |
| Medical review status | Absent | `DRAFT` / `MEDICAL_REVIEW` / `APPROVED` / `PUBLISHED` / `NEEDS_REVIEW` / `ARCHIVED` |
| Learner level | Inferred from phase only | Explicit `PRECLINICAL` / `STEP_1` / `CLERKSHIP` / `STEP_2` / `ADVANCED_CLINICAL` |
| Cognitive level on questions | Absent (formative) | `RECALL` … `MANAGEMENT` |
| References | Informal markdown only | Structured + student Sources footer |
| Version history | Faculty override timestamp only | Lightweight version entries on medical edits |
| Faculty review UI | Library + editors | Dedicated medical-content review dashboard |

---

## Uncertainty statement

Automated scans over-flag guideline sensitivity and under-detect subtle clinical errors. Exact duplicate detection by title is reliable; conceptual duplication requires educator judgment. No content in this audit is claimed to be medically approved.
