/**
 * Hand-authored five-part chapters for mod-renal.
 * No invented GFR cutoffs, K thresholds, or diuretic doses as standing orders.
 */

export const RENAL_FIVE_PART: Record<string, string> = {
  "les-renal-1": `# GFR & Filtration Barrier

**Year 1–2** · Renal · Physiology

## 1. Core Pathophysiology

### Starling forces in the glomerulus

GFR is driven by net filtration pressure across the glomerular capillaries and the ultrafiltration coefficient (Kf). Hydrostatic pressure in the glomerular capillary favors filtration; oncotic pressure and Bowman-space hydrostatic pressure oppose it. Along the capillary, rising oncotic pressure reduces net filtration toward the efferent end.

### Afferent vs efferent tone

Afferent constriction ↓ RPF and ↓ GFR. Moderate efferent constriction (classic angiotensin II teaching) preferentially preserves/raises GFR relative to RPF → ↑ filtration fraction. Severe efferent dilation (ACEI/ARB teaching in low-perfusion states) can drop GFR when the kidney is angiotensin-II–dependent.

### Clearance teaching

Inulin clearance ≈ GFR; PAH clearance approximates RPF with extraction assumptions. Filtration fraction = GFR/RPF. The filtration barrier (endothelium, GBM, podocyte slit diaphragm) size- and charge-selects; podocyte injury → proteinuria.

## 2. Clinical Presentation

Falling GFR: rising creatinine, oliguria, volume overload, uremic symptoms. Barrier failure: proteinuria, hematuria, edema (nephrotic/nephritic phenotypes). ACEI/ARB initiation with bilateral RAS or volume depletion: creatinine rise from loss of efferent tone.

## 3. Diagnostic Approach

Serum creatinine/eGFR (limitations in extremes of muscle mass), urinalysis, urine protein quantitation, and imaging when obstruction/RAS is suspected. Exact CKD staging cutoffs: *REFERENCE_REVIEW_REQUIRED*.

## 4. Management & Pharmacology

Protect hemodynamics (avoid hypotension/NSAIDs in at-risk kidneys), adjust renally cleared drugs, and use RAAS blockade thoughtfully in proteinuric disease while monitoring K⁺/creatinine. Diuretics treat volume; they do not “raise GFR” as primary therapy.

## 5. High-Yield Board Pearl

**Pearl:** Afferent constrictors drop GFR; moderate efferent constriction raises filtration fraction—ACEI/ARB remove that efferent support.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-renal-2": `# Tubular Transport & Diuretics

**Year 1–2** · Renal · Physiology / Pharmacology

## 1. Core Pathophysiology

### Segment map

- **PCT:** bulk isosmotic reabsorption; carbonic anhydrase enables HCO₃⁻ reclamation.  
- **TAL (thick ascending limb):** NKCC2 reabsorbs Na–K–2Cl; impermeable to water → diluting segment; generates medullary gradient.  
- **DCT:** NCC reabsorbs NaCl.  
- **CD principal cells:** ENaC Na⁺ reabsorption (aldosterone-stimulated) creates lumen-negative driving force for K⁺ and H⁺ secretion.

### Diuretic targets

Acetazolamide → PCT CA. Loop agents → NKCC2. Thiazides → NCC. K⁺-sparing → ENaC blockade or mineralocorticoid receptor antagonism.

## 2. Clinical Presentation

Volume overload needing diuresis; hypertension; edematous states; metabolic alkalosis/hypokalemia from loops/thiazides; metabolic acidosis/hypokalemia patterns from acetazolamide; hyperkalemia from K⁺-sparing agents.

## 3. Diagnostic Approach

Electrolytes, creatinine, volume status exam, and urine output response. Spot the expected acid–base/K⁺ signature of each class.

## 4. Management & Pharmacology

Loops are most potent for volume overload; thiazides are common first-line antihypertensives in appropriate patients; MRAs appear in HFrEF and resistant hypertension frameworks. Monitor electrolytes and kidney function.

*Exact doses/titration: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Know the transporter before the brand—NKCC2 (loop), NCC (thiazide), ENaC/MR (K⁺-sparing).

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-renal-3": `# Acid–Base Disorder Framework

**Year 2–3** · Renal / Pulmonary · Diagnostic Reasoning

## 1. Core Pathophysiology

pH is set by the balance of PaCO₂ (respiratory acid) and HCO₃⁻ (metabolic base). Primary disorders shift one partner; compensation moves the other in the same direction. Incomplete or excessive compensation implies a mixed disorder. Anion gap sorts metabolic acidosis into gap vs hyperchloremic frameworks; albumin correction matters when hypoalbuminemic.

## 2. Clinical Presentation

Acidemia: compensatory hyperventilation, shock/toxin clues, diarrhea (NAGMA), ketoacidosis/lactate/toxins (HAGMA). Alkalemia: vomiting/diuretics (metabolic), hyperventilation (respiratory).

## 3. Diagnostic Approach

1. pH → acidemia/alkalemia  
2. Primary partner (HCO₃⁻ vs PaCO₂)  
3. Anion gap (± osmolar gap)  
4. Expected compensation (Winters’ and related teaching)  
5. Hidden disorders (delta-delta, additional respiratory process)

Exact formulas/ranges: *REFERENCE_REVIEW_REQUIRED*.

## 4. Management & Pharmacology

Treat the cause: restore perfusion, stop acid generation (e.g., DKA frameworks), reverse hypoventilation, replete chloride in chloride-responsive metabolic alkalosis. Bicarbonate is indication-selected.

## 5. High-Yield Board Pearl

**Pearl:** Never skip the order—pH → primary → gap → compensation. That sequence catches mixed disorders.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-renal-4": `# Hyponatremia Diagnostic Framework

**Year 3** · Renal · Diagnostic Approach / Acute Care

## 1. Core Pathophysiology

True hypotonic hyponatremia reflects excess water relative to sodium, usually from ADH action (appropriate or inappropriate) plus water intake. Hypertonic hyponatremia (hyperglycemia) is dilution from effective osmoles. Pseudohyponatremia is a rare lab artifact in selected assays/contexts.

ADH is stimulated by high effective osmolality or low effective arterial blood volume—explaining hypovolemic and hypervolemic hyponatremia with “appropriate” ADH, versus SIADH as euvolemic inappropriate ADH.

## 2. Clinical Presentation

Mild: headache, nausea. Severe/acute: seizures, coma, herniation risk from cerebral edema. Chronic severe hyponatremia may look surprisingly quiet—and over-rapid correction risks osmotic demyelination.

## 3. Diagnostic Approach

1. Confirm true hypotonic hyponatremia  
2. Volume status: hypo / eu / hypervolemic  
3. Urine Na / osmolality with ADH physiology  
4. TSH/cortisol when euvolemic differential includes endocrine failure  
5. Drug and cancer review for SIADH

*Numeric correction limits: REFERENCE_REVIEW_REQUIRED — do not invent mmEq/L/h rules here.*

## 4. Management & Pharmacology

Match therapy to class: isotonic resuscitation for hypovolemic; fluid restriction ± etiology treatment for SIADH; treat HF/cirrhosis drivers in hypervolemic; hypertonic saline pathways for severe neurologic symptoms under monitored protocols. Demyelination risk frames why slow chronic correction matters.

## 5. High-Yield Board Pearl

**Pearl:** Wrong therapy comes from skipping classification—volume status + tonicity before the IV bag.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-renal-5": `# Hyperkalemia Emergency Framework

**Year 3** · Renal · Emergency Medicine

## 1. Core Pathophysiology

High extracellular K⁺ reduces the resting membrane potential difference → conduction abnormalities. Causes: reduced excretion (AKI/CKD, drugs: ACEI/ARB/MRA/NSAID, hypoaldosteronism), shift out of cells (acidosis, succinylcholine, cell lysis/TLS), or exogenous load.

## 2. Clinical Presentation

Often asymptomatic until ECG changes: peaked T waves, PR prolongation, QRS widening, sine-wave ventricular rhythm, asystole. Weakness and ascending paralysis can appear.

## 3. Diagnostic Approach

Repeat/confirm K⁺ if hemolyzed sample is plausible; **ECG immediately** when K⁺ is high or symptoms/risk are present; review meds, creatinine, glucose, acid–base, CK/lysis labs.

## 4. Management & Pharmacology (conceptual order)

1. **Stabilize membrane** — IV calcium if ECG changes (does not lower K⁺)  
2. **Shift** — insulin ± glucose, β2-agonists; consider bicarbonate in selected metabolic acidosis  
3. **Remove** — binders, diuretics if kidney function allows, dialysis when needed  

Temporizing shifts are not definitive removal.

*Exact doses and dialysis indications: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Calcium protects the heart; insulin shifts; only excretion/dialysis/binders remove potassium.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-renal-6": `# CKD Staging & Complications

**Year 2–3** · Renal · Pathophysiology / Chronic Care

## 1. Core Pathophysiology

CKD is chronic (≥3 months) kidney structure/function abnormality. Staging uses eGFR categories (G1–G5) and albuminuria (A1–A3). Progressive nephron loss → adaptive hyperfiltration in remnant nephrons that becomes maladaptive (glomerulosclerosis). Complications reflect lost endocrine/excretory roles: EPO deficiency anemia, mineral bone disease (PO₄ retention, FGF23/PTH/vitamin D axis), acidosis, hyperkalemia, volume overload, uremia, accelerated CVD.

## 2. Clinical Presentation

Often silent until advanced: fatigue, edema, hypertension, nocturia, pruritus, nausea, pericarditis in severe uremia teaching. Medication toxicity from reduced clearance.

## 3. Diagnostic Approach

eGFR, UACR/proteinuria, urinalysis, renal imaging when indicated, CBC, calcium/phosphate/PTH, bicarbonate, electrolytes. Exact KDIGO numeric cut-points: *REFERENCE_REVIEW_REQUIRED*.

## 4. Management & Pharmacology

Slow progression: BP control, RAAS blockade in albuminuric disease when appropriate, SGLT2i frameworks in selected CKD/diabetes/HF, glycemic control, avoid nephrotoxins. Treat complications conceptually (ESA/iron for anemia, phosphate binders/vitamin D analogs per specialty pathways, bicarbonate for acidosis, diuretics for volume).

## 5. High-Yield Board Pearl

**Pearl:** Stage CKD by **GFR + albuminuria**—albuminuria multiplies cardiovascular and progression risk beyond creatinine alone.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-renal-7": `# Nephritic vs Nephrotic Syndromes

**Year 2** · Renal · Pathology / Clinical Correlation

## 1. Core Pathophysiology

**Nephritic:** glomerular inflammation → hematuria, RBC casts, hypertension, oliguria, mild–moderate proteinuria (PSGN, IgA nephropathy, RPGN/crescentic patterns).  
**Nephrotic:** podocyte/slit-diaphragm barrier failure → massive proteinuria (≥3.5 g/day teaching threshold), hypoalbuminemia, edema, hyperlipidemia; thrombosis risk from antithrombin loss; infection risk from loss of immunoglobulins. Classic lesions: MCD, FSGS, membranous, diabetic nephropathy, amyloid.

## 2. Clinical Presentation

Nephritic: cola urine, HTN, edema, active sediment. Nephrotic: anasarca, frothy urine, hypercoagulability (esp. membranous teaching), infections.

## 3. Diagnostic Approach

UA with microscopy, urine protein quantitation, serologies as indicated (ASo/complement, ANA, ANCA, anti-GBM, hepatitis, PLA2R), and kidney biopsy when it changes management. Exact protein cutoffs and serology panels: *REFERENCE_REVIEW_REQUIRED*.

## 4. Management & Pharmacology

Supportive: BP/proteinuria control (RAAS blockade), edema management, statin/anticoagulation decisions in selected nephrotic states. Disease-specific immunosuppression is lesion-dependent and specialty-guided—not invented here.

## 5. High-Yield Board Pearl

**Pearl:** Nephritic = active sediment + inflammation; nephrotic = heavy protein + hypoalbuminemia + edema. Boards love that fork.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-renal-8": `# Diuretic Sites of Action

**Year 1–2** · Renal · Pharmacology Map

## 1. Core Pathophysiology

Revisit the nephron as a drug target map:

| Segment | Transporter / target | Class | Classic electrolyte signature |
| --- | --- | --- | --- |
| PCT | Carbonic anhydrase | Acetazolamide | ↑HCO₃⁻ loss → metabolic acidosis; K⁺ wasting |
| TAL | NKCC2 | Loop | Potent natriuresis; hypokalemic metabolic alkalosis; ↓ Ca²⁺ reabsorption |
| DCT | NCC | Thiazide | Hypokalemic metabolic alkalosis; ↑ Ca²⁺ reabsorption |
| CD | ENaC / MR | K⁺-sparing | Hyperkalemia; metabolic acidosis tendency |

Loops break the concentrating gradient; thiazides impair dilution more than concentration—useful teaching for hyponatremia risk with thiazides.

## 2. Clinical Presentation

Therapeutic: improved edema/BP. Adverse: dizziness, cramps, arrhythmia risk from K⁺/Mg²⁺ shifts, gout flares (thiazides), gynecomastia (spironolactone).

## 3. Diagnostic Approach

Match the acid–base/K⁺ pattern to the class when unexplained electrolyte disorders appear after diuretic starts.

## 4. Management & Pharmacology

Choose class by goal (volume vs BP vs HF MRA benefit) and monitor labs. Combination sequential nephron blockade is powerful and arrhythmogenic if unsupervised.

*Dosing schedules: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Thiazides increase calcium reabsorption; loops increase calcium excretion—board gold for stones vs hypercalciuria vignettes.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,
};
