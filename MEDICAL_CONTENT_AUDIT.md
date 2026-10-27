# Medical Content Audit

**Date:** 2026-09-28 (baseline) · **Refresh:** 2026-10-27  
**Scope:** Live Online MD curriculum graph (seed + expansion waves + 4-year catalog) + MT.vn P0 surfaces  
**Method:** Inspect-only inventory via `scripts/medical-content-audit.ts` → `docs/audit/*.json`, plus targeted review of cardiovascular, sepsis, VTE, heart-failure pathways, and P0 presentation/competency metadata.  
**Status:** Structural and educational audit. **Not medical approval.**

---

## Refresh findings (2026-10-27)

Inventory re-run (`npm run audit:medical`):

| Metric | Value |
| --- | --- |
| Lessons / objectives / quizzes / qbank / cases / flashcards | 884 / 3206 / 884 / 24 / **23 unique** / 846 |
| Lessons missing objectives | **0** |
| Vague-verb objectives (after capacity topic fix) | **0** (was 4 template artifacts) |
| Guideline-sensitive keyword hits | 807 (broad scan; not approval) |
| Quiz rows needing attention | 174 |
| Title overlap pairs (Jaccard ≥0.45) | 126 |

### Safe remediations in this refresh

1. **Duplicate case ID** — `expansions-depth.ts` reused `case-cv-1` for “Warm Shock After Pneumonia,” colliding with seed “Progressive Dyspnea and Orthophnea.” Renamed to **`case-cv-2`**; unique-ID regression test added.
2. **P0 shock pathway** — linked `case-cv-2` on `/presentations/shock` (was empty despite a live shock case).
3. **Capacity objectives** — catalog points `"Understand"` / `"Appreciate"` produced nonsensical generated objectives; rewritten to noun phrases for the four abilities (no new clinical claims).
4. **Competency Interpretation column** — was empty (0 objectives). `normalizeCompetencyDomain` now honors Interpret-led statements (currently **1** objective; most interpret skills remain under Diagnosis task tags). Cognitive-level metadata would populate this domain more honestly.
5. **Audit script** — HF ACEI+BB+diuretic flag no longer false-positives contemporary GDMT lists that already include ARNI/SGLT2.

### P0 presentation index (medical-safety check)

- All 10 presentation lesson/case IDs resolve in the live graph.
- Summaries are one-sentence educational framing only (no doses, thresholds, or guideline claims).
- Student disclaimer present: educational pathways only; regimens belong to supervised care.
- Syncope still has **no** dedicated case (recommend-only; do not invent).
- Competency scores remain labeled as study evidence, not certification.

### Prior HIGH remediations still needing human sign-off

Tamponade “kills preload” wording and sepsis Hour-1 title were previously softened in content/metadata, but items stay on `MEDICAL_REVIEW_REQUIRED.md` until a physician approves. PH definition, ACS/VTE/DKA/vent pathways unchanged in claim.

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
