/**
 * Hand-authored five-part chapters for mod-pulm.
 * Conceptual management only — no standing vent recipes or lytic doses.
 */

export const PULM_FIVE_PART: Record<string, string> = {
  "les-pulm-1": `# Ventilation–Perfusion & Gas Exchange

**Year 1–2** · Respiratory · Physiology

## 1. Core Pathophysiology

### Five mechanisms of hypoxemia

1. **Low inspired O₂ (FiO₂)** — high altitude; normal A–a gradient.  
2. **Hypoventilation** — ↑ PaCO₂ displaces O₂; normal A–a gradient.  
3. **Diffusion limitation** — thickened or reduced alveolar–capillary surface (exercise, ILD extremes).  
4. **Shunt** — perfused but unventilated units (atelectasis, pneumonia, anatomic shunt); **does not fully correct with 100% O₂**.  
5. **V/Q mismatch** — the most common ward mechanism; usually improves with supplemental O₂.

### West zones (upright lung)

- Zone 1: PA > Pa > Pv — alveolar dead-space tendency  
- Zone 2: Pa > PA > Pv — intermittent flow  
- Zone 3: Pa > Pv > PA — continuous flow (base)

Gravity and vascular pressures distribute blood flow; alveolar pressure modulates capillary patency. PE increases physiologic dead space; consolidated pneumonia creates shunt-like units.

### A–a gradient as a discriminator

Normal A–a points to low FiO₂ or hypoventilation. Elevated A–a points to V/Q mismatch, shunt, or diffusion limitation. Exact expected A–a formulas vary by age and source (*REFERENCE_REVIEW_REQUIRED*).

## 2. Clinical Presentation

Postoperative atelectasis: dyspnea, low SpO₂, often clear or basilar findings. PE: sudden dyspnea, clear lungs, risk factors. Pneumonia: fever, focal findings, productive cough. Hypoventilation: narcotics, neuromuscular disease, obesity hypoventilation—somnolence and rising CO₂.

## 3. Diagnostic Approach

ABG (PaO₂, PaCO₂, pH), SpO₂ response to supplemental O₂ (shunt vs V/Q teaching), chest radiograph, and clinical pretest for PE/pneumonia. Calculate A–a when teaching discrimination.

## 4. Management & Pharmacology

Treat the mechanism: upright positioning and lung expansion for atelectasis; reverse hypoventilation drivers; oxygen for V/Q mismatch; address shunt source (recruitment, drainage, antibiotics). Oxygen alone will not abolish true shunt. Exact O₂ targets and PE pathways: *REFERENCE_REVIEW_REQUIRED*.

## 5. High-Yield Board Pearl

**Pearl:** Shunt does not fully correct with 100% O₂; V/Q mismatch usually does. Normal A–a → think low FiO₂ or hypoventilation.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-pulm-2": `# Obstructive & Restrictive Patterns

**Year 2** · Respiratory · Pulmonary Function

## 1. Core Pathophysiology

### Obstruction

Airway narrowing or loss of elastic recoil slows emptying → **↓ FEV₁/FVC**. Residual volume often rises (air trapping). Emphysema destroys alveolar septa (↑ compliance, ↓ DLCO); chronic bronchitis is airway-predominant.

### Restriction

Reduced lung expansion → **↓ TLC**. Intrinsic restriction (ILD) often ↓ DLCO; extrapulmonary restriction (neuromuscular, kyphoscoliosis, obesity) may preserve DLCO. Spirometry alone showing ↓ FVC with normal/high ratio suggests restriction but **lung volumes confirm TLC**.

### DLCO map

Low in emphysema, ILD, pulmonary vascular disease, anemia; relatively preserved in many extrapulmonary restrictions; high in polycythemia, alveolar hemorrhage, left-to-right shunt teaching contexts.

## 2. Clinical Presentation

Obstruction: dyspnea, wheeze, prolonged expiration, smoking or atopic history. Restriction: shallow tachypnea, ILD crackles, neuromuscular weakness, chest wall deformity.

## 3. Diagnostic Approach

Spirometry ± bronchodilator, lung volumes, DLCO, and clinical correlation. Pattern recognition beats memorizing isolated numbers; severity cutoffs belong to ATS/ERS tables (*REFERENCE_REVIEW_REQUIRED*).

## 4. Management & Pharmacology

Obstruction: bronchodilators, anti-inflammatory therapy in asthma, smoking cessation and guideline COPD inhaler frameworks. Restriction: treat the cause (ILD workup, NIV in selected neuromuscular disease). No invented inhaler step-ups here.

## 5. High-Yield Board Pearl

**Pearl:** ↓ FEV₁/FVC = obstruction. Restriction needs ↓ TLC—not just a small FVC on spirometry.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-pulm-3": `# Pulmonary Embolism Physiology

**Year 2–3** · Respiratory / Cardiovascular · Pathophysiology

## 1. Core Pathophysiology

### Gas exchange

Occluded pulmonary arteries leave ventilated alveoli under-perfused (**↑ physiologic dead space**) and redistribute flow, worsening V/Q matching → hypoxemia and elevated A–a gradient. Hyperventilation often lowers PaCO₂.

### Hemodynamics

Sudden ↑ pulmonary vascular resistance → RV pressure overload → RV strain/failure → obstructive shock in high-burden PE. Hypotension with clear lungs and elevated JVP is a classic teaching phenotype.

### Thrombosis biology

Virchow triad (stasis, endothelial injury, hypercoagulability) frames risk. Fat/air/tumor emboli are mechanism variants.

## 2. Clinical Presentation

Sudden dyspnea, pleuritic pain, tachycardia, hemoptysis (infarct), syncope in high-risk PE. Post-op orthopedic and hospitalized patients raise pretest probability. Massive/high-risk PE: hypotension and RV failure signs.

## 3. Diagnostic Approach

Pretest probability + D-dimer/imaging pathways are setting-specific. CT pulmonary angiography is common when probability is not low; V/Q when CT contrast is undesirable. ECG may show right-heart strain patterns (nonspecific). Echo assesses RV when unstable.

Never invent institutional D-dimer cutoffs or Wells thresholds as standing rules here (*REFERENCE_REVIEW_REQUIRED*).

## 4. Management & Pharmacology

Stabilize ABCs; anticoagulation when PE is confirmed or highly probable and bleeding risk allows; reperfusion frameworks (systemic thrombolysis, catheter/surgical options) for high-risk PE are protocolized. Inferior vena cava filters are selected-indication tools.

*Lytic doses and anticoagulation recipes: REFERENCE_REVIEW_REQUIRED — supervised protocols only.*

## 5. High-Yield Board Pearl

**Pearl:** PE = dead space + possible RV failure. Clear lungs + hypoxia + risk factors should put PE on the board.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-pulm-4": `# ARDS & Pulmonary Edema Distinctions

**Year 2–3** · Respiratory · Critical Care Pathophysiology

## 1. Core Pathophysiology

### Cardiogenic (hydrostatic) edema

Elevated left atrial / pulmonary venous pressure drives fluid across a relatively intact alveolar–capillary barrier → protein-poor edema.

### ARDS (permeability edema)

Diffuse alveolar damage from sepsis, aspiration, trauma, pancreatitis, pneumonia → protein-rich edema, surfactant dysfunction, shunt physiology, bilateral opacities, and hypoxemia not fully explained by heart failure. Compliance falls; work of breathing rises.

### Shunt physiology

Flooded alveoli create shunt-like units → poor response to oxygen alone; recruitment and lung-protective ventilation concepts matter.

## 2. Clinical Presentation

ARDS: acute onset after a precipitant, bilateral crackles, severe hypoxemia. Cardiogenic: ischemic history, elevated JVP, S3, response to diuresis/afterload reduction. Overlap exists—think mixed phenotypes after massive MI with aspiration, etc.

## 3. Diagnostic Approach

Berlin-style teaching: timing, bilateral opacities, origin of edema not fully cardiac, hypoxemia severity by P/F ratio frameworks. BNP/echo help exclude primary hydrostatic failure. Exact P/F cutoffs: *REFERENCE_REVIEW_REQUIRED*.

## 4. Management & Pharmacology

Treat the precipitant. Lung-protective ventilation (low tidal volume frameworks), conservative fluid strategy after shock resuscitation, prone positioning in severe ARDS—institutional protocols. Cardiogenic edema: decongestion and pump support as indicated.

*Ventilator recipes are not standing orders from this page — REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** ARDS = leaky barrier + shunt; cardiogenic edema = high pressure. Oxygen alone will not fix flooded alveoli.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-pulm-5": `# Asthma & COPD Mechanisms

**Year 2–3** · Respiratory · Pathophysiology / Acute Care

## 1. Core Pathophysiology

### Asthma

Episodic, often reversible airway obstruction from bronchoconstriction, mucosal edema, and mucus. Th2/eosinophilic inflammation and airway hyperresponsiveness are common teaching frames; neutrophilic phenotypes exist. Triggers: allergens, viral URI, exercise, cold, NSAIDs/ASA in selected patients.

### COPD

Chronic irreversible (or poorly reversible) obstruction from smoking or α1-antitrypsin deficiency contexts. **Emphysema** destroys alveolar walls (↓ DLCO, hyperinflation); **chronic bronchitis** is productive cough phenotype with airway remodeling. Exacerbations are often infectious triggers on fixed obstruction.

### Shared acute physiology

Airflow obstruction → air trapping → increased work of breathing → V/Q mismatch → hypoxemia ± hypercapnia in fatigue.

## 2. Clinical Presentation

Asthma: wheeze, nocturnal symptoms, atopy, variable peak flows. COPD: progressive dyspnea, smoking history, chronic sputum, barrel chest teaching. Red flags: silent chest, accessory use, altered mentation, rising CO₂.

## 3. Diagnostic Approach

Spirometry with bronchodilator response, DLCO, eosinophils/IgE when phenotype-directed care is considered, ABG in exacerbation, chest radiograph to exclude mimics (pneumothorax, pneumonia, HF).

## 4. Management & Pharmacology

**Asthma (conceptual):** inhaled bronchodilators, inhaled corticosteroids as controller backbone, escalation per guidelines; systemic steroids for exacerbations.  
**COPD (conceptual):** bronchodilator foundations, ICS in selected phenotypes, oxygen when chronic severe hypoxemia criteria met, smoking cessation, rehab; antibiotics/steroids in selected exacerbations.

Avoid sedating a tiring asthmatic without a ventilation plan. NIV may help selected COPD hypercapnic exacerbations.

*Exact step therapy and O₂ criteria: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Asthma is episodic and often reversible; COPD is chronic and poorly reversible—spirometry + smoking history separate the board vignette.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-pulm-6": `# ABG Interpretation Framework

**Year 2–3** · Respiratory / Renal · Diagnostic Reasoning

## 1. Core Pathophysiology

pH reflects net acid–base balance. PaCO₂ is the respiratory acid; HCO₃⁻ is the metabolic base. Primary disorders:

- Respiratory acidosis: ↑ PaCO₂  
- Respiratory alkalosis: ↓ PaCO₂  
- Metabolic acidosis: ↓ HCO₃⁻  
- Metabolic alkalosis: ↑ HCO₃⁻  

Compensation moves the partner in the same direction as the primary disturbance but rarely normalizes pH fully. Inappropriate compensation implies a **mixed disorder**.

Anion gap (Na⁺ − [Cl⁻ + HCO₃⁻]) sorts metabolic acidosis into gap vs non-gap frameworks; exact reference ranges vary by lab (*REFERENCE_REVIEW_REQUIRED*).

## 2. Clinical Presentation

Acidemia: hyperventilation (Kussmaul in metabolic acidosis), shock clues, toxin history. Alkalemia: lightheadedness, arrhythmias risk with severe shifts, volume contraction or diuretic history for metabolic alkalosis; pain/hypoxemia/pregnancy for respiratory alkalosis.

## 3. Diagnostic Approach

### Stepwise read

1. Acidemia or alkalemia (pH)?  
2. Is PaCO₂ or HCO₃⁻ the primary partner?  
3. Is compensation appropriate (Winters’ formula and expected Δ teaching)? If not → mixed.  
4. For hypoxemia: compute A–a and map to the five mechanisms.  
5. For metabolic acidosis: anion gap ± osmolar gap when toxic alcohols are plausible.

## 4. Management & Pharmacology

Treat the cause: reverse hypoventilation, improve oxygenation/V/Q, restore perfusion, stop ongoing acid generation (e.g., DKA insulin frameworks), replete chloride in chloride-responsive metabolic alkalosis. Bicarbonate therapy is indication-selected—not automatic.

*Doses and dialysis thresholds: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Read ABGs in order—pH → primary partner → compensation → gap. Skipping to “the number looks low” creates mixed-disorder misses.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-pulm-7": `# Pleural Effusion — Transudate vs Exudate

**Year 2–3** · Respiratory · Diagnostic Approach

## 1. Core Pathophysiology

Pleural fluid accumulates when formation exceeds absorption. **Transudates** follow Starling imbalance (↑ hydrostatic or ↓ oncotic pressure) with intact pleura—CHF, cirrhosis, nephrosis. **Exudates** follow inflamed or disrupted pleural surfaces—pneumonia (parapneumonic/empyema), malignancy, PE, TB, connective-tissue disease, pancreatitis.

### Light criteria logic (conceptual)

Exudate suggested when pleural/serum protein or LDH ratios exceed guideline thresholds, or pleural LDH is high relative to serum upper limit. Exact numeric cutoffs: *REFERENCE_REVIEW_REQUIRED*. Heart-failure transudates on diuretics can be “pseudoexudates”—clinical context matters.

## 2. Clinical Presentation

Dyspnea, pleuritic pain, dullness to percussion, ↓ breath sounds. Fever suggests parapneumonic/empyema; weight loss suggests malignancy; edema/orthopnea suggests CHF.

## 3. Diagnostic Approach

Imaging confirms fluid; ultrasound guides thoracentesis. Send protein, LDH, glucose, cell count/diff, Gram stain/culture, cytology as indicated; pH in parapneumonic teaching. Always interpret fluid with the chest radiograph and clinical pretest.

## 4. Management & Pharmacology

Transudate: treat the driver (decongest CHF). Exudate: treat infection/malignancy/PE as found; drain when indicated for empyema or large symptomatic effusions. Chest-tube and fibrinolytic decisions are specialty protocols.

## 5. High-Yield Board Pearl

**Pearl:** Transudate = Starling problem; exudate = pleural disease. Light criteria sort the fluid—then chase the cause.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,
};
