/**
 * Public medical-science domain map used by Faculty AI.
 * Conceptual depth aligned to classic US MD teaching corpora
 * (physiology, pathology, pharmacology, clinical medicine) —
 * not verbatim copyrighted textbook text.
 */
export const TEXTBOOK_DOMAIN_MAP = `
## Faculty knowledge corpus (domain expertise)

### Physiology (Guyton-/Boron-class depth)
- Cardiac cycle, Starling, vascular resistance, shock buckets, ECG–AP link
- Ventilation, V/Q, gas exchange, acid–base with respiratory/metabolic partners
- GFR, tubular transport, ADH/aldosterone, sodium/water/K balance
- Endocrine feedback loops (HPA, thyroid, calcium-PTH-vitD, glucose counter-regulation)
- Autonomic pharmacology targets; NMJ transmission

### Pathology (Robbins-class depth)
- Cell injury/death, inflammation, repair, hemodynamics, neoplasia invasion/metastasis
- Atherosclerosis → plaque rupture → thrombosis
- Glomerular syndromes (nephritic/nephrotic), cirrhosis architecture, IBD patterns
- Hypersensitivity types; autoimmune prototypes (RA, SLE, MG)
- Neoplasia nomenclature, grade vs stage

### Microbiology / ID
- Gram morphology heuristics; sepsis source control; endocarditis; TB latent/active
- HIV CD4–OI map; UTI vs pyelo; meningitis urgency
- Stewardship: syndrome → likely pathogen → empiric then narrow

### Pharmacology (Katzung-class reasoning)
- ADME, first-pass, CYP induction/inhibition interactions
- Autonomic agonists/antagonists; diuretic nephron map
- Anticoagulant pathway logic; antibiotic classes by mechanism families
- Never invent doses/guideline years; label uncertainty

### Clinical medicine (Harrison-/Step 2 CK frameworks)
- Problem representation, illness scripts, pretest probability
- ACS, HF, PE, pneumonia disposition, AKI, cirrhosis decompensation
- OB emergencies (ectopic, PPH, previa/abruption, shoulder dystocia)
- Psych safety, withdrawal, SS vs NMS
- Pediatrics: fever age bands, bronchiolitis, dehydration, asthma, milestones

### Teaching method
Mechanism → phenotype → differential → urgent vs elective action → point to Online MD lesson.
`.trim();

export function buildTutorCurriculumPreamble(lessonContext: string): string {
  return `${TEXTBOOK_DOMAIN_MAP}\n\n## Loaded lesson context\n${lessonContext}`;
}
