# Medical Review Required

**Date:** 2026-09-28  
**Rule:** Do not invent corrections. Flag uncertain statements for a qualified physician/medical educator.  
**Statuses used after remediation:** items remain `NEEDS_REVIEW` / `MEDICAL_REVIEW` until a human approves.

---

## HIGH priority

| File | Lesson | Statement / issue | Why it needs review | Suggested source type | Priority |
| --- | --- | --- | --- | --- | --- |
| `lib/curriculum/expansions-wave7.ts` | `les-cv-8` Cardiac Tamponade Physiology | Summary used “kills preload” | Physiologically imprecise; risks wrong mental model of obstructive shock | Standard physiology / critical care text; ESC/AHA pericardial disease statements | HIGH |
| `lib/curriculum/catalog/topics-generated.ts` | `les-cat-y2-cv-ph` Pulmonary Hypertension Groups | Hemodynamic definition of PH | Thresholds have changed historically; obsolete mPAP cutoffs must not be taught as current without labeling | ESC/ERS pulmonary hypertension guidelines (current edition) | HIGH |
| `lib/curriculum/catalog/topics-generated.ts` | `les-cat-y3-im-sepsis-hour1` Hour-1 Sepsis Bundle | Bundle framed as lesson title/checklist | Hour-1 language can be read as inflexible universal checklist | SSC / sepsis consensus; teach recognition, cultures when appropriate, timely antimicrobials, source control, reassessment | HIGH |
| `lib/curriculum/seed.ts` + IM catalog | ACS management pathways | Antiplatelet, anticoagulation, reperfusion strategy | Rapidly evolving, guideline-defined | AHA/ACC ACS guidelines; institutional pathways | HIGH |
| `lib/curriculum/expansions.ts` + catalog | Sepsis recognition & empiric logic | Empiric antibiotics, fluids, pressors | High-stakes, local resistance, timing nuances | SSC; local antibiogram (label as local) | HIGH |
| Catalog / seed IM | VTE / PE / Wells / PERC | Prediction rules and anticoagulation | Must not replace pretest probability; bleeding risk varies | CHEST / ASH / ESC PE guidance; validation literature | HIGH |
| Catalog IM/Endo | DKA / HHS / insulin infusions | Insulin and electrolyte correction | Dosing and potassium rules are protocol-sensitive | ADA / institutional DKA protocols | HIGH |
| Catalog / pulm-adjacent | Mechanical ventilation / ARDS | Modes, PEEP, tidal volume targets | Easy to over-specify unverified numbers | ARDSNet-era evidence summaries; current critical care guidelines | HIGH |
| Catalog OB/Peds | Pregnancy & pediatric septic shock | Emergency management | Population-specific; high harm if wrong | ACOG / AAP / PALS-aligned educational sources | HIGH |
| Catalog IM | Oncologic emergencies / immunosuppression | Neutropenic fever antibiotics, TLS | Time-critical, regimen-specific | IDSA neutropenic fever; oncology emergency reviews | HIGH |
| Catalog / renal | RRT / dialysis indications | Thresholds and timing | Context-dependent | KDIGO / nephrology society statements | HIGH |
| Any lesson stating drug doses, absolute diagnostic cutoffs, or trial mortality figures not traced to a primary source | (various) | Unverified numeric claims | Fabrication risk | Primary literature or mark `REFERENCE_REVIEW_REQUIRED` | HIGH |

---

## MEDIUM priority

| File | Lesson | Statement / issue | Why it needs review | Suggested source type | Priority |
| --- | --- | --- | --- | --- | --- |
| `lib/curriculum/seed.ts` | `les-cv-2` Ischemic Heart Disease & ACS | MONA-BASH historical vs contemporary pathway | Framing is careful but still guideline-adjacent | AHA/ACC ACS; ACLS educational materials | MEDIUM |
| `lib/curriculum/seed.ts` | `les-cv-3` Heart Failure & Foundational Therapy | GDMT pillar list; HFmrEF under-emphasized | Contemporary GDMT present; phenotype completeness & wording | AHA/ACC/HFSA heart failure guidance | MEDIUM |
| Catalog VTE lessons | Wells/PERC conceptual bullets | Pretest probability relationship under-taught | Rules are tools, not substitutes | Clinical prediction rule primers + PE guidelines | MEDIUM |
| Catalog antibiotic / CAP lessons | Empiric regimens | Local resistance and host factors | Avoid universal regimens | ATS/IDSA CAP; local stewardship | MEDIUM |
| Catalog stroke lessons | Time windows / thrombolysis / thrombectomy | Eligibility criteria change | Stroke systems of care statements | AHA/ASA stroke guidelines | MEDIUM |
| Formative catalog bank | 17 ultra-short explanations | Teaching quality | Expand without inventing new medical claims | Parent chapter mechanism text | MEDIUM |
| Exact duplicate lesson titles | CAP disposition, pediatric asthma, suicide assessment, onc emergencies | Assessment/progress confusion | Educator decides consolidate vs distinguish | Curriculum committee | MEDIUM |

---

## LOW priority

| File | Lesson | Statement / issue | Why it needs review | Suggested source type | Priority |
| --- | --- | --- | --- | --- | --- |
| Catalog titles | `Spirochetes`, `SBO vs LBO`, other compressed labels | Student-facing clarity | Educational hygiene, not clinical danger | Style guide | LOW |
| Catalog objectives | `Explain and apply: {title}` | Weak measurability | Pedagogy | Bloom-aligned objective rewrite from existing points | LOW |
| Module descriptions | e.g. “Understand the heart…” | Vague marketing-ish verbs | Pedagogy | Rewrite with measurable outcomes | LOW |
| Cases (all) | 2-stage structure | Limited clinical reasoning rehearsal | Instructional design | Expand stages after content lock | LOW |

---

## Review workflow (recommended)

1. Faculty opens **Medical content review** dashboard.  
2. Filter: `guideline_sensitive = true` OR `review_status = NEEDS_REVIEW`.  
3. Open lesson → edit if needed → set status to `APPROVED` or request changes.  
4. Record `last_reviewed`, `medical_reviewer`, optional `next_review` for guideline-sensitive items.  
5. Append lightweight version history (version, date, who, reason).

No automated process should set `APPROVED` or `PUBLISHED` (medical sense) without a human reviewer.
