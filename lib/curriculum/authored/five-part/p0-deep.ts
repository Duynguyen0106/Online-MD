/**
 * Deepen-pass overlays for P0 high-traffic clerkship lessons.
 * These replace thinner module stubs so chapters clear the textbook floor
 * with real academic prose (not teach-back padding).
 * Conceptual pharmacology only — REFERENCE_REVIEW_REQUIRED retained.
 */

export const P0_DEEP_FIVE_PART: Record<string, string> = {
  "les-id-2": `# Sepsis Recognition & Empiric Logic

**Year 3** · Infectious Disease / Critical Care · Acute Care

## 1. Core Pathophysiology

Sepsis is life-threatening organ dysfunction caused by a dysregulated host response to infection. The modern educational frame separates **infection** (microbial invasion) from **sepsis** (infection + organ dysfunction) and **septic shock** (subset with circulatory/cellular/metabolic abnormalities profound enough that vasopressors are required to maintain MAP after adequate volume and lactate remains elevated—exact numeric thresholds belong to current SSC guidance and must be verified: *REFERENCE_REVIEW_REQUIRED*).

### Host–pathogen cascade

Pathogen-associated molecular patterns engage innate receptors → cytokine storm (TNF, IL-1, IL-6) → endothelial activation, capillary leak, nitric-oxide–mediated vasodilation, and microvascular thrombosis. Macroscopic phenotype is **distributive shock** (low SVR), often with relative or absolute hypovolemia from leak and venodilation. A subset develops septic cardiomyopathy (reversible myocardial depression). Mitochondrial dysfunction and cytopathic hypoxia help explain elevated lactate even when bulk cardiac output is high.

### Why minutes matter

Each hour of delayed effective antimicrobials after hypotension is associated with rising mortality in observational teaching literature. Source control (drain the abscess, remove the infected device, debride necrotic tissue) is pathophysiology applied as surgery/procedure—not an afterthought to the antibiotic order.

## 2. Clinical Presentation

### Recognition cluster

Suspect sepsis when infection is plausible and organ dysfunction appears: altered mentation, tachypnea/respiratory failure, hypotension or rising vasopressor need, oliguria, mottling, coagulopathy/thrombocytopenia, rising bilirubin, or lactate elevation. Fever may be absent in elders, immunocompromised patients, and beta-blocked hosts.

### Shock bedside phenotype

Early “warm shock” (bound pulses, warm extremities) can progress to cool, mottled hypoperfusion. qSOFA (altered mentation, RR≥22, SBP≤100) is a bedside prompt—not a screening tool that rules out sepsis. SOFA-based organ scoring appears in definitions; teach the concept, verify current cutoffs before quoting numbers (*REFERENCE_REVIEW_REQUIRED*).

### Can’t-miss mimics

Cardiogenic shock, hemorrhagic shock, anaphylaxis, adrenal crisis, overdose, and PE can share hypotension. Fever does not prove infection; absence of fever does not exclude it.

## 3. Diagnostic Approach

### Parallel resuscitation and data

1. ABCs and IV access  
2. Lactate as a perfusion/metabolic marker (trend matters)  
3. Blood cultures ×2 (and site cultures) **before** antibiotics when delay will be minutes, not when delay will be long  
4. Source hunt: CXR, UA/culture, skin/soft tissue exam, lines, abdomen, CNS if indicated  
5. CBC, chemistries, coags, ABG/VBG as available  

Do not invent institutional lactate clearance percentages or MAP goals as standing orders from this page—learn the physiologic goals (restore perfusion, give effective drugs, control source) and verify numeric targets in current bundles (*REFERENCE_REVIEW_REQUIRED*).

## 4. Management & Pharmacology

### Order of operations (conceptual)

1. **Support perfusion** — fluids for most patients with sepsis-induced hypoperfusion, then vasopressors (norepinephrine typically first-line in septic shock frameworks) if hypotension persists  
2. **Empiric antimicrobials** — broad enough for likely source and host risk (MRSA, Pseudomonas, resistant Gram-negatives when risk factors exist); give promptly  
3. **Source control** — schedule as soon as feasible  
4. **Reassess** — hemodynamics, mentation, urine output, lactate trend, culture data → narrow antibiotics  
5. **Adjuncts** — stress-dose steroids in refractory septic shock frameworks; glucose control without harmful hypoglycemia; VTE prophylaxis when appropriate  

### Toxicity / stewardship literacy

Broad empiric therapy is a time-limited hypothesis. Allergy history, renal dosing, C. difficile risk, and drug–bug mismatch at 48–72h are part of the chapter skill.

*Exact fluid mL/kg recipes, pressor mcg/kg/min, and antibiotic menus: REFERENCE_REVIEW_REQUIRED (SSC / institutional sepsis pathway).*

## 5. High-Yield Board Pearl

**Pearl:** Sepsis care is a physiologic order of operations—recognize organ dysfunction → cultures without delaying drugs → antimicrobials + source control → reassess and narrow. Blood pressure alone does not define the disease.

**Step 2 CK trap:** Waiting for “the white count to come back” before the first antimicrobial dose in overt septic shock.

### Sources

Citations for this lesson are being verified by faculty. Treat doses, numeric cutoffs, and trial statistics as belonging to primary sources and current society guidance — not as standalone orders from this page.

*Faculty marker: REFERENCE_REVIEW_REQUIRED — attach current Surviving Sepsis Campaign / institutional bundle citations after faculty review.*
`,

  "les-renal-3": `# Acid–Base Disorder Framework

**Year 2–3** · Renal / Pulmonary · Diagnostic Reasoning

## 1. Core Pathophysiology

Arterial pH is defended by the balance between **PaCO₂** (respiratory acid, controlled by alveolar ventilation) and **HCO₃⁻** (metabolic base, controlled by renal generation/reclamation and by buffering of nonvolatile acids). Primary disorders:

| Primary disorder | Initiating change | Expected compensation direction |
| --- | --- | --- |
| Metabolic acidosis | ↓ HCO₃⁻ | ↓ PaCO₂ (hyperventilation) |
| Metabolic alkalosis | ↑ HCO₃⁻ | ↑ PaCO₂ (hypoventilation) |
| Respiratory acidosis | ↑ PaCO₂ | ↑ HCO₃⁻ (renal retention) |
| Respiratory alkalosis | ↓ PaCO₂ | ↓ HCO₃⁻ (renal excretion) |

Compensation moves the partner in the **same direction** as the primary disturbance and rarely normalizes pH completely. If compensation is inappropriate, a **mixed disorder** is present.

### Anion gap

AG ≈ Na⁺ − (Cl⁻ + HCO₃⁻). Elevated AG implies unmeasured anions (lactate, ketones, toxins, uremic acids). Non-gap (hyperchloremic) acidosis implies HCO₃⁻ loss or impaired renal acid excretion (diarrhea, RTA, saline load). Correct AG downward conceptually when albumin is low (unmeasured anions decrease with hypoalbuminemia)—exact correction factors vary by source (*REFERENCE_REVIEW_REQUIRED*).

### Winters’ formula (teaching)

For metabolic acidosis, expected PaCO₂ ≈ 1.5 × [HCO₃⁻] + 8 (±2) is a common teaching estimate. If measured PaCO₂ is substantially different, add a respiratory disorder. Verify formula variants before teaching as dogma (*REFERENCE_REVIEW_REQUIRED*).

## 2. Clinical Presentation

**Acidemia:** Kussmaul respirations (deep, rapid) in metabolic acidosis; CNS depression and hypercapnia risk in respiratory acidosis; shock clues for lactate; fruity odor/polyuria for ketoacidosis; diarrhea history for NAGMA.

**Alkalemia:** Volume depletion, diuretic use, vomiting (metabolic alkalosis); pain, hypoxemia, pregnancy, liver failure (respiratory alkalosis); arrhythmia risk when severe.

## 3. Diagnostic Approach

### Mandatory sequence

1. **pH** — acidemia or alkalemia?  
2. **Primary partner** — is HCO₃⁻ or PaCO₂ responsible?  
3. **Anion gap** (± osmolar gap if toxic alcohols plausible)  
4. **Compensation check** — appropriate vs mixed  
5. **Hidden disorders** — delta-delta for coexistent NAGMA/metabolic alkalosis; additional respiratory process  

For hypoxemia concurrent with the ABG, map to the five hypoxemia mechanisms (low FiO₂, hypoventilation, diffusion, shunt, V/Q).

## 4. Management & Pharmacology

Treat the generator of the disorder—not the number alone:

- Lactate acidosis → restore perfusion  
- DKA → fluids + insulin frameworks + K⁺ management  
- Hypercapnic respiratory acidosis → improve ventilation (NIV/intubation pathways as indicated)  
- Chloride-responsive metabolic alkalosis → volume + chloride repletion  
- RTA → alkali therapy selected by type  

IV bicarbonate is indication-selected (e.g., selected severe acidemia, certain toxidromes)—not automatic for every low pH.

*Doses, dialysis thresholds, and ventilator targets: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Never skip the order—pH → primary partner → gap → compensation. That sequence catches mixed disorders the boards love to hide.

**Step 1 bridge:** Diarrhea loses HCO₃⁻ (NAGMA); vomiting loses H⁺ (metabolic alkalosis).

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-renal-4": `# Hyponatremia Diagnostic Framework

**Year 3** · Renal · Diagnostic Approach / Acute Care

## 1. Core Pathophysiology

Plasma [Na⁺] reflects the ratio of exchangeable sodium+potassium to total body water. **True hypotonic hyponatremia** means excess water relative to solute, almost always involving ADH (vasopressin) action plus water intake. ADH inserts aquaporin-2 in collecting-duct principal cells → water reabsorption.

### Why ADH is on

- **Osmotic stimulus:** high effective osmolality (appropriate).  
- **Hemodynamic stimulus:** low effective arterial blood volume (CHF, cirrhosis, hypovolemia)—ADH is “appropriate” to perfusion even though it worsens hyponatremia.  
- **SIADH:** ADH without osmotic or hemodynamic justification (CNS, lung, drugs, cancer).

### Tonicity forks before volume

1. **Hypertonic hyponatremia** — hyperglycemia (or mannitol) dilutes Na⁺; correct conceptually for glucose.  
2. **Isotonic “pseudo” patterns** — rare assay artifacts in selected methods with extreme hyperlipidemia/protein; modern ion-selective electrodes make classic pseudohyponatremia uncommon but still taught.  
3. **Hypotonic** — proceed to volume classification.

## 2. Clinical Presentation

Mild/chronic: nausea, gait instability, subtle cognition change. Acute severe: headache, seizures, coma from cerebral edema. Chronic severe hyponatremia may look quiet—yet **over-rapid correction** risks osmotic demyelination (dysarthria, paraparesis, locked-in phenotype days later).

Volume exam: dry mucous membranes/orthostasis (hypovolemic); edema/ascites (hypervolemic); no edema and normal JVP (euvolemic—SIADH, hypothyroidism, glucocorticoid deficiency).

## 3. Diagnostic Approach

1. Confirm Na⁺ and measure **serum osmolality**  
2. Classify hypotonic cases by **volume status**  
3. **Urine Na⁺ and urine osmolality** — high Uosm suggests ADH effect; urine Na⁺ helps separate hypovolemic renal vs extrarenal losses and supports SIADH vs hypovolemia  
4. TSH and morning cortisol when euvolemic differential includes endocrine failure  
5. Medication review (thiazides, SSRIs, carbamazepine, ecstasy, etc.)

*Numeric correction limits (mEq/L per 24h) are guideline-sensitive—REFERENCE_REVIEW_REQUIRED. Do not invent a standing correction rate from this page.*

## 4. Management & Pharmacology

Match therapy to physiology:

- **Hypovolemic:** isotonic saline restores volume → turns off hemodynamic ADH → water diuresis  
- **SIADH:** fluid restriction ± treat cause; vaptans/demeclocycline are specialty tools  
- **Hypervolemic (HF/cirrhosis):** treat driver; fluid/salt strategy per disease; vaptans selected cases  
- **Severe neurologic symptoms:** controlled hypertonic saline in monitored settings with frequent Na⁺ checks  

Oral fluid freedom in SIADH worsens the disorder. Thiazides should be stopped when they are the cause.

## 5. High-Yield Board Pearl

**Pearl:** Wrong therapy comes from skipping classification—tonicity, then volume, then ADH story—before the IV bag.

**Step 2 CK:** Seizing hyponatremia needs controlled hypertonic therapy; asymptomatic chronic hyponatremia needs slow correction literacy.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-renal-5": `# Hyperkalemia Emergency Framework

**Year 3** · Renal · Emergency Medicine

## 1. Core Pathophysiology

Extracellular potassium dominates resting membrane potential of cardiac myocytes. Acute hyperkalemia lessens the resting potential difference → slowed conduction → peaked T waves, PR prolongation, QRS widening, sine-wave VT/VF, asystole. Total-body potassium may be high (reduced excretion) or normal with **shift** out of cells.

### Cause map

**Impaired excretion:** AKI/CKD, hypoaldosteronism (type 4 RTA), drugs (ACEI/ARB, MRA, NSAIDs, potassium-sparing diuretics, trimethoprim).  
**Shift outward:** acidosis, hyperosmolarity, succinylcholine, digoxin toxicity, beta-blockade, insulin deficiency.  
**Load / release:** rhabdomyolysis, tumor lysis, hemolysis (also artifactual), exogenous K⁺.

Pseudohyperkalemia from hemolyzed draws or extreme thrombocytosis/leukocytosis must be considered when the ECG is normal and the clinical pretest is low—but never delay therapy when the ECG is already toxic.

## 2. Clinical Presentation

Often asymptomatic until conduction fails. Weakness, ascending paralysis, palpitations. ECG changes can appear before symptoms and are the urgency signal.

## 3. Diagnostic Approach

1. Immediate **ECG** when K⁺ is high or risk is high  
2. Repeat/confirm if hemolysis artifact plausible **and** ECG reassuring—do not endlessly repeat while the QRS widens  
3. Creatinine, glucose, acid–base, CK, med list, urine output  

Exact K⁺ cutoffs for “emergency” are contextual (rate of rise, ECG, oliguria)—avoid rote single-number dogma without ECG (*REFERENCE_REVIEW_REQUIRED* for institutional thresholds).

## 4. Management & Pharmacology (physiologic order)

1. **Stabilize membrane** — IV calcium if ECG changes or imminent risk (buys time; does **not** lower K⁺)  
2. **Shift intracellularly** — insulin ± glucose; nebulized β2-agonists; bicarbonate in selected metabolic acidosis  
3. **Remove from body** — loop diuretics if the kidney can respond; cation-exchange binders / newer GI binders; hemodialysis when needed (AKI, TLS, refractory ECG toxicity)  

Temporizing shifts wear off; plan definitive removal. Stop offending drugs. Treat the cause (obstruction, adrenal failure, TLS).

*Exact grams of calcium, insulin units, and binder choices: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Calcium protects the heart; insulin shifts; only excretion, binders, or dialysis remove potassium. Shifts without removal are a stalling tactic.

**Step 2 CK:** Peaked T → wide QRS → sine wave is a timer—stabilize while you plan removal.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-im-2": `# Chest Pain & ACS Reasoning

**Year 3** · Internal Medicine · Diagnostic Reasoning

## 1. Core Pathophysiology

Chest pain is a symptom, not a diagnosis. Life-threatening mechanisms to hold simultaneously:

1. **ACS** — atherothrombotic plaque event → supply ischemia (type 1 MI) or demand ischemia (type 2)  
2. **Aortic dissection** — intimal tear → false lumen; can occlude coronaries and mimic STEMI  
3. **Pulmonary embolism** — dead space + RV strain  
4. **Tension pneumothorax** — obstructive shock  
5. **Esophageal rupture** — mediastinitis after vomiting (Boerhaave)

Visceral ischemic pain is often pressure/squeeze with autonomic features; pleuritic pain suggests pleural/pericardial/PE/MSK—but ACS can be atypical (women, diabetes, elders).

## 2. Clinical Presentation

OPQRST history, radiation to arm/jaw/neck, diaphoresis, dyspnea, syncope. Tearing maximal-at-onset pain + pulse deficits/unequal BP → dissection. Sudden dyspnea with clear lungs → PE. Trauma/tall thin young patient + unilateral findings → pneumothorax.

Unstable vitals reorder the algorithm: resuscitate while you diagnose.

## 3. Diagnostic Approach

### First minutes

- ABCs  
- **ECG within minutes** for ongoing pain (STEMI pathway vs non-ST)  
- IV access, monitor, pulse oximetry  
- Troponin timed to protocol  
- CXR when dissection/PTX/alternative diagnoses plausible  

Risk scores (HEART, TIMI) adjunct disposition in low-risk NSTE chest pain—*REFERENCE_REVIEW_REQUIRED* for point values. CT angiography pathways for dissection/PE when pretest warrants; do not send unstable STEMI to the scanner instead of reperfusion.

## 4. Management & Pharmacology

### ACS conceptual priorities

Aspirin (chewed) when ACS likely and no contraindication; P2Y12 and anticoagulation per pathway; urgent reperfusion for STEMI; oxygen only if hypoxemic; nitrates when appropriate after excluding preload-dependent states (inferior/RV MI, severe AS, PDE5 inhibitors); beta-blockade when shock/bradycardia absent.

### Dissection caution

Avoid empiric anticoagulation/thrombolysis until dissection is considered when the story fits. BP/HR control frameworks precede operative planning.

*Doses, door-to-balloon targets, and lytic contraindications: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** ECG + stability sort the first fork—don’t bury a STEMI under a beautiful five-paragraph differential.

**Step 2 CK:** Tearing pain + focal neuro deficit → dissection until CT says otherwise.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-im-4": `# AKI Bedside Framework

**Year 3** · Internal Medicine / Renal · Ward Reasoning

## 1. Core Pathophysiology

Acute kidney injury is an abrupt decline in GFR with accumulation of nitrogenous waste and dysregulation of fluid/electrolytes. Educational classification:

- **Pre-renal:** kidney is structurally intact but underperfused (hypovolemia, HF “forward failure,” sepsis vasodilation, RAS physiology with ACEI/ARB + NSAID + diuretic “triple whammy”).  
- **Intrinsic:** ATN (ischemic or toxic), AIN (drugs/infection), glomerulonephritis/vasculitis, thrombotic microangiopathy, myeloma cast nephropathy.  
- **Post-renal:** obstruction (prostate, stones, bilateral ureteral, Foley kink).  

FENa/FEurea and urine sediment support the story; they do not replace hemodynamics and medication review. ATN follows prolonged ischemia or nephrotoxins (aminoglycosides, contrast in at-risk hosts, heme pigments).

## 2. Clinical Presentation

Oliguria/anuria, volume overload, hyperkalemia symptoms, uremic nausea/pericarditis (late), drug toxicity from reduced clearance. Context clues: hypotension, recent contrast, new NSAID/ACEI, BPH, anuria sudden with hydronephrosis risk.

## 3. Diagnostic Approach

1. Confirm creatinine rise / oliguria trajectory (KDIGO staging frameworks—*REFERENCE_REVIEW_REQUIRED*)  
2. Volume and perfusion exam + daily weights/ins-outs  
3. UA with microscopy (muddy brown casts → ATN teaching; RBC casts → GN; WBC casts → AIN/pyelo)  
4. Bladder scan / renal US when post-renal plausible  
5. Hold nephrotoxins; review obstruction; check K⁺/acid–base urgently  

## 4. Management & Pharmacology

Restore perfusion (fluids if hypovolemic; treat shock class correctly), relieve obstruction, stop nephrotoxins, dose-adjust renally cleared drugs, manage complications (hyperkalemia algorithm, volume overload, acidosis). Dialysis indications teaching: Acidosis, Electrolytes (refractory K⁺), Intoxications, Overload, Uremia (AEIOU)—verify institutional thresholds (*REFERENCE_REVIEW_REQUIRED*).

Avoid reflexive large fluid boluses in congested HF-associated AKI.

## 5. High-Yield Board Pearl

**Pearl:** First sentence of every AKI note should be pre-renal vs ATN vs obstruction—sediment and ultrasound finish the paragraph.

**Step 2 CK:** Anuria is obstruction or catastrophic until proven otherwise.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-cv-4": `# Shock Classification by Mechanism

**Year 3** · Cardiovascular / Critical Care · Clinical Reasoning

## 1. Core Pathophysiology

Shock is inadequate tissue oxygen delivery relative to demand, producing cellular hypoxia and organ dysfunction. Classify by the dominant lesion in the cardiovascular circuit:

| Class | Primary problem | Typical CO | Typical SVR | Classic examples |
| --- | --- | --- | --- | --- |
| Hypovolemic | ↓ preload | ↓ | ↑ | Hemorrhage, GI losses, burns |
| Distributive | Vasodilation / maldistribution | ↑ or normal early | ↓ | Septic, anaphylactic, neurogenic |
| Cardiogenic | Pump failure | ↓ | ↑ | MI, fulminant myocarditis, end-stage CM |
| Obstructive | Extracardiac blockage of flow | ↓ | ↑ | Tamponade, massive PE, tension PTX |

Mixed shock is common (septic cardiomyopathy; trauma with bleed + tension PTX). Lactate and base deficit track tissue hypoperfusion; normal blood pressure does not exclude occult shock (compensated phase).

### Compensatory physiology then failure

Catecholamine surge defends MAP via tachycardia and vasoconstriction while gut/skin/kidney perfusion fall. When compensation fails, hypotension appears—late in children and some adults.

## 2. Clinical Presentation

Shared: altered mentation, oliguria, tachypnea, rising lactate. Class-specific:

- **Hypovolemic:** flat veins, dry mucosa, external/hidden blood loss  
- **Distributive:** fever/source, warm extremities early, wide pulse pressure  
- **Cardiogenic:** elevated JVP, S3, pulmonary edema, ischemic ECG  
- **Obstructive:** elevated JVP + clear lungs (PE/tamponade teaching), muffled sounds/pulsus (tamponade), unilateral absent breath sounds (tension PTX)

## 3. Diagnostic Approach

Resuscitate in parallel with diagnosis. Rapid ultrasound (LV/RV function, IVC, lung sliding, pericardial effusion, free fluid), ECG, lactate, CBC, cultures when infection plausible, CXR. Swan numbers are not required to start thinking in classes; when used, interpret with clinical context. Do not invent mPAP/PCWP cutoffs as standing teaching numbers here (*REFERENCE_REVIEW_REQUIRED* for hemodynamic definitions).

## 4. Management & Pharmacology

Mechanism-directed first moves:

- Hypovolemic → stop losses + volume/blood  
- Distributive/septic → cultures, antimicrobials, fluids then vasopressors  
- Cardiogenic → cautious fluids only if hypovolemic; unload/support pump; reperfusion if ischemic  
- Obstructive → reverse obstruction (needle/OR, pericardiocentesis pathway, PE reperfusion frameworks by risk)

Vasopressors/inotropes are tools attached to a physiologic goal and a reassessment clock—not diagnoses.

*Drug selection and device indications: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Sort shock by preload, pump, pipes, and obstruction—MAP alone does not name the class.

**Step 2 CK:** Clear lungs + ↑JVP + hypotension → obstructive differential before reflexive large fluid challenges.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-cv-5": `# Tachyarrhythmia Safety Framework

**Year 3** · Cardiovascular · Acute Care Reasoning

## 1. Core Pathophysiology

Extreme tachycardia shortens diastole → cuts coronary perfusion time and ventricular filling → stroke volume collapse, especially in ischemia, hypertrophy, or valvular stenosis. Educational priority is **hemodynamic consequence**, not the exotic EP label.

### Circuit families (high-level)

- Sinus tachycardia — appropriate response to a driver (pain, hypovolemia, PE, anemia, thyrotoxicosis)  
- SVT (AVNRT/AVRT, atrial tachycardia)  
- AF/flutter — atrial drivers; irregular (AF) vs often regular flutter with fixed block  
- VT — ventricular myocardial circuit; wide QRS; may degenerate to VF  
- Pre-excited AF — accessory pathway conduction risk if AV-nodal agents given

## 2. Clinical Presentation

### Three triage questions

1. **Unstable?** Hypotension, shock, ischemic pain, acute HF, severe AMS → electrical therapy pathway  
2. **Wide vs narrow QRS?** Wide + unstable → treat as VT until proven otherwise  
3. **Regular vs irregular?** Guides SVT differential  

Palpitations, syncope, chest pain, dyspnea, or sudden collapse. Prior MI raises VT pretest probability.

## 3. Diagnostic Approach

Pulse/BP/mentation → defibrillator readiness → 12-lead when stable enough. Name QRS width, regularity, AV relationship (dissociation favors VT), flutter waves, delta waves. Do not delay unstable care for perfect taxonomy. Electrolytes, ischemia workup, digoxin level when relevant.

## 4. Management & Pharmacology

**Unstable** → synchronized cardioversion / defibrillation per ACLS (*REFERENCE_REVIEW_REQUIRED* for energies).  
**Stable narrow SVT sketch:** vagal → AV-nodal agents when appropriate → expert help for accessory pathway concerns.  
**Stable wide:** assume VT in adults with heart disease until proven otherwise.  

Avoid AV-nodal blockade in irregular wide-complex rhythms that may be pre-excited AF—a classic harm pathway. Treat sinus tachycardia by fixing the driver, not by “rate-controlling” a compensatory rhythm blindly.

## 5. High-Yield Board Pearl

**Pearl:** Unstable + wide + regular → treat as VT. Label the circuit after perfusion returns.

**Step 2 CK trap:** AV-nodal agent in pre-excited AF can accelerate ventricular response via the accessory pathway.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-pulm-3": `# Pulmonary Embolism Physiology

**Year 2–3** · Respiratory / Cardiovascular · Pathophysiology

## 1. Core Pathophysiology

### Gas exchange

Pulmonary arterial obstruction leaves alveoli ventilated but under-perfused → **increased physiologic dead space**. Redistribution of blood flow worsens V/Q matching elsewhere → hypoxemia and elevated A–a gradient. Hyperventilation often lowers PaCO₂; a rising PaCO₂ in PE can signal impending fatigue/failure.

### Hemodynamics

Sudden rise in pulmonary vascular resistance pressure-overloads the RV. The thin-walled RV dilates, septum bows leftward, LV filling falls → obstructive shock in high-burden PE. Hypotension with clear lungs and elevated JVP is a classic teaching phenotype.

### Thrombosis biology

Virchow triad (stasis, endothelial injury, hypercoagulability) frames risk after surgery, cancer, estrogen, prior VTE, and inherited thrombophilia. Fat/air/septic emboli are mechanism variants with different therapies.

## 2. Clinical Presentation

Sudden dyspnea, pleuritic pain, tachycardia, hemoptysis (infarct), syncope. Post-op day 3 hypoxia with clear lungs is a classic vignette. Massive/high-risk PE: hypotension and RV failure signs. Submassive/intermediate-risk teaching emphasizes RV strain without sustained hypotension—definitions evolve (*REFERENCE_REVIEW_REQUIRED*).

## 3. Diagnostic Approach

Pretest probability + D-dimer/imaging pathways are setting-specific. CTPA is common when probability is not low; V/Q when contrast is undesirable. ECG may show sinus tach or right-strain patterns (insensitive). Bedside echo assesses RV when unstable. Leg US can support diagnosis when CT unavailable and proximal DVT is found.

Never invent institutional Wells/Geneva point cutoffs or D-dimer thresholds as standing rules here (*REFERENCE_REVIEW_REQUIRED*).

## 4. Management & Pharmacology

Stabilize ABCs. Anticoagulation when PE is confirmed or highly probable and bleeding risk allows. High-risk PE reperfusion frameworks (systemic thrombolysis, catheter-based therapy, surgical embolectomy) are protocolized and specialist-led. IVC filters are selected-indication tools when anticoagulation fails or is contraindicated.

*Lytic doses and anticoagulant recipes: REFERENCE_REVIEW_REQUIRED — supervised protocols only.*

## 5. High-Yield Board Pearl

**Pearl:** PE = dead space + possible RV failure. Clear lungs + hypoxia + risk factors should put PE on the board.

**Step 1 bridge:** Dead space raises wasted ventilation; shunt physiology is the opposite extreme (perfused, unventilated).

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-pulm-4": `# ARDS & Pulmonary Edema Distinctions

**Year 2–3** · Respiratory · Critical Care Pathophysiology

## 1. Core Pathophysiology

### Cardiogenic (hydrostatic) edema

Elevated left atrial / pulmonary venous pressure drives fluid across a relatively intact alveolar–capillary barrier → protein-poor edema. LV failure, severe mitral disease, and volume overload are drivers.

### ARDS (permeability edema)

Diffuse alveolar damage from sepsis, aspiration, pneumonia, trauma, pancreatitis, transfusion → protein-rich edema, surfactant dysfunction, hyaline membranes, shunt physiology, bilateral opacities, and hypoxemia not fully explained by heart failure. Compliance falls; work of breathing rises. Berlin definition frameworks use timing, imaging, origin of edema, and P/F ratio severity bands—*exact cutoffs REFERENCE_REVIEW_REQUIRED*.

### Why oxygen alone fails

Flooded alveoli create shunt-like units. Supplemental O₂ cannot oxygenate blood that never meets alveolar gas; recruitment and lung-protective ventilation address the mechanism.

## 2. Clinical Presentation

ARDS: acute onset after a precipitant, bilateral crackles, severe hypoxemia, often needing high FiO₂. Cardiogenic: ischemic history, elevated JVP, S3, asymmetric when alternate diagnoses intervene, often improves with decongestion. Mixed phenotypes exist (aspiration after arrest; sepsis plus HF).

## 3. Diagnostic Approach

History of precipitant vs cardiac context; BNP/echo to weigh hydrostatic contribution; CXR/CT bilateral opacities; ABG for hypoxemia severity. Exclude alternative causes of bilateral infiltrates (alveolar hemorrhage, mimics).

## 4. Management & Pharmacology

Treat the precipitant. Lung-protective ventilation (low tidal volume frameworks), plateau-pressure limits, conservative fluid strategy after shock resuscitation, prone positioning in severe ARDS—institutional protocols. Neuromuscular blockade selected early severe cases in trial-informed frameworks. Cardiogenic edema: decongestion, afterload reduction, pump support as indicated.

*Ventilator recipes are not standing orders from this page — REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** ARDS = leaky barrier + shunt; cardiogenic edema = high pressure. Oxygen alone will not fix flooded alveoli.

**Step 2 CK:** Bilateral infiltrates + severe hypoxemia after sepsis → ARDS pathway, not reflexive “diurese everyone.”

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-endo-2": `# DKA & Hyperosmolar States

**Year 3** · Endocrine · Emergency Medicine

## 1. Core Pathophysiology

Absolute or relative insulin deficiency plus counter-regulatory hormones (glucagon, cortisol, catecholamines, growth hormone) drive hyperglycemia and osmotic diuresis. Free fatty acid release undergoes hepatic β-oxidation → ketone bodies (**DKA**), producing anion-gap metabolic acidosis—classic in T1DM but also in ketosis-prone T2DM and SGLT2i-associated euglycemic DKA teaching.

**HHS** features profound hyperglycemia and hyperosmolality with minimal ketosis—typically T2DM with enough insulin to suppress ketogenesis but not hyperglycemia. Severe volume depletion and neurologic change dominate.

### Potassium paradox

Total-body K⁺ is depleted from osmotic diuresis, yet serum K⁺ may be normal or high from insulin deficiency and acidosis shifting K⁺ outward. Insulin therapy drives K⁺ intracellularly—replete thoughtfully before/during insulin when indicated.

## 2. Clinical Presentation

Polyuria/polydipsia, weight loss, nausea/abdominal pain (DKA), Kussmaul breathing, fruity odor; HHS with profound dehydration and altered mentation. Precipitants: infection, missed insulin, MI, pancreatitis, steroids, new-onset diabetes.

## 3. Diagnostic Approach

Glucose, VBG/ABG, anion gap, serum/urine ketones (β-hydroxybutyrate preferred when available), electrolytes, osmolality, creatinine, infection workup, ECG. Diagnostic cutoffs for DKA/HHS (pH, bicarb, osmolality, mental status) are guideline-defined—*REFERENCE_REVIEW_REQUIRED*.

Euglycemic DKA: relatively lower glucose with gap acidosis/ketones on SGLT2i—do not dismiss because glucose is “not 500.”

## 4. Management & Pharmacology

Fluids first to restore perfusion, then insulin infusions per protocol, careful K⁺ repletion, treat precipitant, hold SGLT2i, transition to subcutaneous insulin when gap closes and patient eats. Bicarbonate rarely indicated except selected severe acidemia per protocol. Avoid inventing fluid rates or insulin U/kg from memory here.

*Exact protocols: REFERENCE_REVIEW_REQUIRED (ADA / institutional DKA pathway).*

## 5. High-Yield Board Pearl

**Pearl:** DKA = gap acidosis + ketones; HHS = extreme osmolality with little ketosis—both are volume emergencies first.

**Step 2 CK:** Normal serum K⁺ in DKA still usually means total-body depletion—check before insulin without K⁺ in the bag when K⁺ is already low.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-gi-4": `# Acute Upper GI Bleeding Priorities

**Year 3** · GI · Acute Care

## 1. Core Pathophysiology

UGIB originates proximal to the ligament of Treitz. Mechanisms:

- **Acid-peptic** — H. pylori / NSAID / stress ulcer → arterial bleeding from vessel in ulcer base  
- **Variceal** — portal hypertension → thin-walled collaterals that rupture  
- **Mallory–Weiss** — mucosal tear at GE junction after retching  
- **Vascular** — Dieulafoy, angiodysplasia; malignancy

Massive bleeding kills via airway compromise (aspiration of blood) and hypovolemic shock. BUN often rises from digested blood protein load plus hypovolemia.

## 2. Clinical Presentation

Hematemesis, coffee-ground emesis, melena; hematochezia if extremely brisk. Orthostasis/tachycardia mark volume loss. Liver stigmata, thrombocytopenia, and ascites raise variceal pretest probability. Medication review: anticoagulants, antiplatelets, NSAIDs, SSRIs.

## 3. Diagnostic Approach

ABCs first; large-bore IV access ×2; CBC, type & screen/crossmatch, INR, chemistry, lactate; reverse anticoagulation per protocol when indicated. Risk scores (e.g., Glasgow-Blatchford) adjunct triage—*REFERENCE_REVIEW_REQUIRED*. Urgent endoscopy for diagnosis and therapy once resuscitated enough for sedation/airway safety. CTA/interventional radiology when endoscopy cannot localize brisk bleed.

## 4. Management & Pharmacology

Airway protection if ongoing hematemesis/altered mentation; balanced transfusion frameworks (avoid overtransfusion targets that may worsen rebleeding in some ulcer pathways—verify current targets); PPI for ulcer disease pathways; variceal pathways add splanchnic vasoconstrictors + antibiotics in cirrhosis + urgent endoscopy; balloon tamponade as bridge only. Surgery/IR for refractory bleeding.

*Transfusion thresholds, vasoactive drug doses, and PPI infusion recipes: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Resuscitate in parallel with definitive care—do not delay airway/volume for the endoscopy suite elevator.

**Step 2 CK:** Cirrhosis + UGIB → think varices and give antibiotics as part of the pathway, not optional garnish.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-surg-4": `# Trauma Primary Survey

**Year 3** · Surgery / Trauma · ATLS Logic

## 1. Core Pathophysiology

Death from trauma clusters in predictable physiologic failures: airway obstruction, inadequate oxygenation/ventilation, hemorrhage (external or cavitary), expanding intracranial mass, and hypothermia/coagulopathy spirals. The **primary survey** is designed to find and fix these threats in order (**ABCDE**) before detailed diagnosis. Secondary survey is a head-to-toe only after ABCDEs are addressed.

Trimodal death teaching (immediate, early hours, delayed days) motivates scene/transport urgency and later VTE/sepsis prevention—but the learner’s first job is the primary survey.

## 2. Clinical Presentation

Mechanism predicts injury: frontal MVC → aortic/solid organ patterns; axial load → spine; penetrating zone dictates tract. External hemorrhage, paradoxical chest wall motion, tracheal deviation, muffled heart sounds, expanding abdomen, unstable pelvis, altered GCS, open fractures.

## 3. Diagnostic Approach

ABCDE with simultaneous resuscitation; monitoring; portable CXR/pelvis; FAST/eFAST for fluid and pneumothorax; AMPLE history when obtainable (Allergies, Meds, Past history, Last meal, Events). CT is for the stabilizing patient—not the exsanguinating one who needs OR.

## 4. Management & Pharmacology

Secure airway (assume C-spine until cleared), oxygenate/ventilate, decompress tension PTX, control hemorrhage (direct pressure, tourniquet, pelvic binder, OR), maintain perfusion with blood-based resuscitation frameworks when hemorrhaging, prevent hypothermia, tetanus/antibiotics for selected wounds, analgesia that preserves mentation/airway judgment.

Massive transfusion and TXA timing are protocolized—*REFERENCE_REVIEW_REQUIRED*.

## 5. High-Yield Board Pearl

**Pearl:** Primary survey is treatment, not sightseeing—fix threats as you find them, in ABCDE order.

**Step 2 CK:** Absent breath sounds + shock after trauma → decompress suspected tension PTX without waiting for radiology.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-heme-5": `# Acute Transfusion Reactions

**Year 3** · Hematology · Acute Care

## 1. Core Pathophysiology

Transfused blood is a transplant of cells and plasma proteins. Acute reactions sort by mechanism and timing:

| Reaction | Core mechanism | Classic onset clues |
| --- | --- | --- |
| Acute hemolytic | ABO incompatibility (preformed Ab) | Fever, flank pain, dark urine during transfusion |
| Febrile non-hemolytic | Donor cytokine / Ab to donor leukocytes | Fever/rigors without hemolysis |
| Allergic / anaphylactic | Recipient IgE; IgA deficiency risk | Urticaria → bronchospasm/shock |
| TACO | Hydrostatic volume overload | Hypertension, hypoxia, elevated BNP |
| TRALI | Ab-mediated acute lung injury | Hypoxia, noncardiogenic edema, often hypotension/fever |
| Bacterial contamination | Unit sepsis | Rapid septic shock |
| Delayed hemolytic | Anamnestic Ab days later | Falling Hb, jaundice after discharge |

## 2. Clinical Presentation

Stop-trigger symptoms: fever, chills, back/flank pain, chest pain, dyspnea, urticaria, hypotension/hypertension, bleeding from DIC in hemolytic reactions, hemoglobinuria.

TACO vs TRALI: both hypoxic; TACO tends toward hypertension/volume overload signs; TRALI toward fever/hypotension and noncardiogenic edema—overlap exists; treat supportively while differentiating.

## 3. Diagnostic Approach

1. **Stop transfusion immediately**; keep IV line open with saline  
2. Clerical check (right unit, right patient)  
3. Send remaining unit + post-transfusion labs (hemolysis panel, Direct Coombs, culture as indicated)  
4. CXR for respiratory reactions; BNP adjunct for TACO vs TRALI  

## 4. Management & Pharmacology

ABCs; fluids for acute hemolytic hypotension pathways; epinephrine for anaphylaxis; diuretics/oxygen/ventilatory support for TACO; supportive care ± vent for TRALI (avoid diuretics as automatic first move if TRALI likely); broad antibiotics if bacterial contamination suspected; report to blood bank for quarantine of co-components.

Never restart the same unit after a suspected hemolytic or anaphylactic reaction.

## 5. High-Yield Board Pearl

**Pearl:** First action is always stop the transfusion—then sort fever vs allergy vs overload vs lung injury vs sepsis.

**Step 2 CK:** Hypertension + hypoxia during transfusion → TACO until proven otherwise; fever + hypoxia + hypotension → think TRALI/sepsis.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-psych-6": `# Alcohol Withdrawal

**Year 3** · Psychiatry / Medicine · Withdrawal

## 1. Core Pathophysiology

Chronic ethanol potentiates GABA-A and dampens NMDA glutamate signaling. Abrupt cessation produces excitatory rebound: autonomic hyperactivity, tremor, anxiety, seizures, and delirium tremens (DT). Timing teaching (approximate): tremulousness within hours; seizures often 12–48h; DT typically 48–72h—verify local teaching ranges (*REFERENCE_REVIEW_REQUIRED*). Kindling explains escalating severity with repeated withdrawals.

Wernicke encephalopathy (thiamine deficiency) — confusion, ataxia, ophthalmoplegia — can coexist and is precipitated when glucose is given without thiamine in depleted patients.

## 2. Clinical Presentation

Anxiety, insomnia, tremor, diaphoresis, tachycardia, hypertension, nausea; hallucinations with relatively clear sensorium (alcoholic hallucinosis) versus fluctuating inattention/confusion in DT; generalized tonic-clonic seizures.

## 3. Diagnostic Approach

CIWA-Ar or equivalent symptom scales guide treatment intensity (*score cutoffs REFERENCE_REVIEW_REQUIRED*); glucose, electrolytes (Mg²⁺, PO₄³⁻, K⁺), LFTs, ECG; rule out meningitis, ICH, polysubstance toxicity, and hepatic encephalopathy mimics. Ask last drink time and prior complicated withdrawal.

## 4. Management & Pharmacology

Benzodiazepines (symptom-triggered or fixed-dose protocols) are first-line; escalate for DT with ICU-capable monitoring. Give **thiamine before or with glucose** in at-risk patients; replete magnesium/folate; quiet environment; restraint only for safety. Antipsychotics may calm hallucination but do **not** treat the GABA withdrawal mechanism and can lower seizure threshold—use cautiously as adjuncts only.

Outpatient detox is inappropriate after seizures/DT or with unreliable follow-up.

*Exact benzo dosing schedules: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Thiamine early; benzodiazepines treat alcohol withdrawal—antipsychotics alone do not replace GABA tone.

**Step 2 CK:** Autonomic storm + fluctuating confusion days after last drink → DT until proven otherwise.

### Sources

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,
};
