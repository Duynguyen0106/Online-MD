/**
 * Hand-authored five-part chapters for mod-cv (senior clerkship tone).
 * Conceptual pharmacology only — no standing doses/regimens.
 * Faculty marker REFERENCE_REVIEW_REQUIRED retained for guideline-sensitive lines.
 */

export const CV_FIVE_PART: Record<string, string> = {
  "les-cv-1": `# Cardiac Electrophysiology & Mechanics

**Year 2 — Organ-System Pathophysiology** · Cardiovascular · Mechanisms

## 1. Core Pathophysiology

### Membrane excitability and the ventricular action potential

Cardiac myocytes are excitable cells whose transmembrane voltage is set by the balance of inward depolarizing and outward repolarizing currents. In ventricular working myocardium, **phase 0** is a rapid Na⁺ influx (INa) that drives the upstroke; **phase 1** early repolarization reflects transient outward K⁺ current (Ito); **phase 2** plateau balances inward L-type Ca²⁺ current (ICa,L) against delayed rectifier K⁺ currents; **phase 3** completes repolarization as K⁺ currents dominate; **phase 4** resting potential is stabilized largely by inward rectifier IK1.

Nodal tissue (SA and AV nodes) lacks a robust fast Na⁺ upstroke. Phase 0 is **Ca²⁺-dependent**, which is why nondihydropyridine calcium-channel blockers and β-blockers slow AV nodal conduction, whereas Na⁺-channel blockers preferentially affect atrial/ventricular myocardium and His–Purkinje tissue.

### Excitation–contraction coupling

Trigger Ca²⁺ entry through L-type channels induces ryanodine-receptor release from the sarcoplasmic reticulum (calcium-induced calcium release). Cytosolic Ca²⁺ binds troponin C, permitting actin–myosin cross-bridge cycling. Diastole requires Ca²⁺ reuptake (SERCA) and extrusion (NCX). Impaired relaxation or elevated diastolic Ca²⁺ links electrophysiology to diastolic dysfunction phenotypes.

### Pump mechanics: preload, afterload, contractility

**Preload** approximates end-diastolic sarcomere length (related to EDV and venous return). **Afterload** approximates wall stress opposing ejection (related to arterial pressure and ventricular geometry via Laplace’s law). **Contractility** is the load-independent inotropic state modulated by sympathetic tone and inotropic agents.

**Frank–Starling** physiology: within limits, increased venous return increases stroke volume. In decompensated HFrEF the relationship flattens—volume loading worsens congestion without proportional stroke-volume gain. Pressure–volume loops integrate these concepts for valvular disease and cardiomyopathy teaching.

## 2. Clinical Presentation

### What the learner should see

Electrophysiologic failure presents as bradyarrhythmia, conduction block, or tachyarrhythmia with hemodynamic consequence (hypotension, ischemic pain, acute pulmonary edema, syncope, or altered mentation). Mechanical failure presents as low-output symptoms (fatigue, cool extremities, oliguria, narrow pulse pressure) and/or congestion (dyspnea, orthopnea, edema, elevated jugular venous pressure).

### Exam anchors

- Pulse rate/regularity and blood-pressure trajectory sort electrical instability from compensated ectopy.
- S3, displaced apex, and cool mottled skin suggest reduced forward flow; rales and elevated JVP suggest elevated filling pressures.
- Wide-complex tachycardia with instability is treated as ventricular tachycardia until proven otherwise—do not chase exotic labels while perfusion fails.

### Can’t-miss mimics

Vasovagal syncope, seizure, and orthostasis can imitate arrhythmia-related syncope; obstructive shock (tamponade, massive PE) can imitate “pump failure” without a primary myocyte problem.

## 3. Diagnostic Approach

### High-yield studies

1. **12-lead ECG** — rate, rhythm, intervals (PR, QRS, QTc), ischemic ST/T changes, chamber enlargement patterns.
2. **Continuous monitoring** when intermittent arrhythmia is suspected.
3. **Troponin / BNP** when ischemia or heart-failure phenotypes are in the differential (interpret in clinical context).
4. **Echocardiography** — EF phenotype, valves, pericardial effusion, RV strain clues.
5. **Electrolytes / digoxin level / thyroid** when arrhythmogenic metabolic contributors are plausible.

### ECG–AP correlation (board-facing)

Atrial depolarization → P wave; AV nodal/His delay → PR; ventricular depolarization → QRS; ventricular repolarization → T wave. Prolonged PR implicates AV conduction delay; wide QRS implicates ventricular conduction delay or ventricular origin.

Exact numeric cutoffs for intervals and QT correction formulas belong to primary ECG references (*REFERENCE_REVIEW_REQUIRED*).

## 4. Management & Pharmacology

### Conceptual classes (verify regimens)

| Target | Class (conceptual) | Physiologic effect | Major toxicity / caution |
| --- | --- | --- | --- |
| β1 receptors | β-blockers | ↓ automaticity, ↓ AV conduction, ↓ O₂ demand | Bradycardia, AV block, decompensated shock |
| L-type Ca²⁺ (nodal) | Non-DHP CCBs | ↓ AV nodal conduction | Bradycardia, hypotension; avoid in HFrEF decompensation |
| Na⁺ / K⁺ channels | Class I / III antiarrhythmics | Alter conduction / refractoriness | Proarrhythmia, QT prolongation (class-dependent) |
| Preload | Diuretics / venodilators | ↓ congestion | Hypotension, electrolyte shifts |
| Afterload / remodeling | ACEi/ARB/ARNI, hydralazine-nitrate (selected) | ↓ wall stress, remodeling benefit in HF frameworks | Hyperkalemia, renal effects, hypotension |

Unstable tachyarrhythmia → urgent electrical therapy pathway per ACLS (*REFERENCE_REVIEW_REQUIRED*). Do not invent energy doses or infusion recipes from this chapter.

## 5. High-Yield Board Pearl

**Pearl:** Nodal upstrokes are Ca²⁺-dependent; ventricular upstrokes are Na⁺-dependent — that single fact predicts which drugs slow the AV node versus which widen QRS or affect ventricular myocardium.

**Step 2 CK add-on:** Unstable wide-complex tachycardia → treat as VT; mechanism teaching comes after perfusion is restored.

### Sources

Citations for this lesson are being verified by faculty. Treat doses, numeric cutoffs, and trial statistics as belonging to primary sources and current society guidance — not as standalone orders from this page.

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-cv-2": `# Ischemic Heart Disease & ACS

**Year 2–3** · Cardiovascular · Pathophysiology / Acute Care

## 1. Core Pathophysiology

### Atherosclerosis to acute coronary syndrome

Coronary atherosclerosis progresses from fatty streak to fibroatheroma. The acute coronary syndrome (ACS) cascade is typically initiated by **thin-cap fibroatheroma disruption** → platelet activation and aggregation → thrombin generation → occlusive or near-occlusive thrombus superimposed on a ruptured or eroded plaque.

### Supply–demand mismatch

Myocardial ischemia occurs when coronary oxygen delivery cannot meet myocyte demand. **Type 1 MI** is atherothrombotic plaque event; **type 2 MI** is demand ischemia without acute atherothrombosis as the primary event (anemia, tachyarrhythmia, hypotension, spasm, etc.). Educational framing: mechanism first, then biomarker/ECG classification.

### Coronary territories (typical)

- **LAD** — anterior wall, septum ± apex (precordial leads V1–V4 pattern teaching).
- **LCx** — lateral wall (I, aVL, V5–V6).
- **RCA** — inferior wall (II, III, aVF); often contributes SA/AV nodal branches → bradycardia/AV block risk in inferior infarction.

Dominance variants exist; teach typical maps while acknowledging anatomic variability.

## 2. Clinical Presentation

### Classic and high-risk features

Pressure-like or heavy chest discomfort, radiation to arm/jaw/neck, diaphoresis, dyspnea, nausea, sense of doom. Women, older adults, and patients with diabetes may present with more atypical features (isolated dyspnea, epigastric pain, fatigue).

### Hemodynamic and electrical complications

Pump failure, cardiogenic shock, papillary muscle rupture (acute MR), VSD, free-wall rupture/tamponade, and malignant ventricular arrhythmias are time-critical phenotypes after transmural infarction.

### Can’t-miss mimics

Aortic dissection, PE, tension pneumothorax, esophageal rupture, and pericarditis/myocarditis can share chest pain. Dissection with coronary ostial compromise can present as STEMI-equivalent—avoid anticoagulation/lytic thinking until dissection is considered when the story fits.

## 3. Diagnostic Approach

### ACS spectrum (classification logic)

- **Unstable angina** — ischemia without troponin rise.
- **NSTEMI** — troponin(+), without ST elevation meeting STEMI criteria.
- **STEMI** — occlusive thrombus physiology with ST elevation (or equivalent) → emergent reperfusion pathway.

### Decision-changing data

1. **ECG within minutes** of arrival for ongoing chest pain.
2. **Serial troponin** timed to institutional protocol.
3. **Chest radiograph / bedside echo** when alternative diagnoses or mechanical complications are plausible.
4. **Risk stratification** frameworks for NSTE-ACS timing of angiography (*REFERENCE_REVIEW_REQUIRED* for exact scores/cutoffs).

### Inferior STEMI teaching vignette pattern

ST elevation in II, III, aVF with reciprocal depression in aVL localizes inferior wall; RCA vs LCx reasoning uses lead III vs II emphasis and right-sided leads when RV infarction is suspected.

## 4. Management & Pharmacology

### Contemporary priorities (conceptual — not MONA nostalgia)

Historical “MONA-BASH” vocabulary is teaching archaeology. Contemporary educational priorities:

1. **ABCs / resuscitation**
2. **Aspirin** (antiplatelet) when ACS is likely and no contraindication
3. **P2Y12 inhibitor** and **anticoagulation** per ACS pathway
4. **Urgent reperfusion** for STEMI (PCI preferred where available; fibrinolysis when PCI cannot be achieved in time — institutional protocols)
5. **Supportive care** — oxygen only if hypoxemic; nitrates/analgesia when appropriate and after considering preload-dependent states (e.g., inferior/RV MI)

β-blockade and high-intensity statin therapy enter early secondary prevention frameworks once shock and bradycardia contraindications are respected.

*All dosing, timing windows, and contraindications: REFERENCE_REVIEW_REQUIRED (ACLS / AHA-ACC pathways).*

### Major toxicities / cautions

Bleeding with antiplatelet/anticoagulant stacks; hypotension with nitrates in RV infarction; bradycardia/AV block with β-blockers in inferior MI; fibrinolysis contraindications.

## 5. High-Yield Board Pearl

**Pearl:** Troponin defines myocardial injury; ECG + clinical context define the reperfusion emergency. ST elevation (or equivalent) is a time clock, not a laboratory afterthought.

**Step 1 bridge:** Plaque rupture → platelet thrombus → coronary occlusion → transmural ischemia → ST elevation in the corresponding territory.

### Sources

Citations for this lesson are being verified by faculty. Treat doses, numeric cutoffs, and trial statistics as belonging to primary sources and current society guidance — not as standalone orders from this page.

*Faculty marker: REFERENCE_REVIEW_REQUIRED — attach current AHA/ACC ACS guidance after faculty review.*
`,

  "les-cv-3": `# Heart Failure & Foundational Therapy

**Year 2–3** · Cardiovascular · Pathophysiology / Therapeutics

## 1. Core Pathophysiology

### Definitions and phenotypes

Heart failure is a clinical syndrome of structural and/or functional cardiac impairment leading to elevated filling pressures and/or inadequate cardiac output. Educational phenotypes:

- **HFrEF** — reduced ejection fraction; often eccentric remodeling; ischemic and nonischemic cardiomyopathies.
- **HFmrEF** — mildly reduced EF; management concepts often overlap HFrEF frameworks — verify current society guidance.
- **HFpEF** — preserved EF with diastolic dysfunction/concentric remodeling; aging, hypertension, obesity, diabetes, and infiltrative disease contribute.

### Neurohormonal model

RAAS activation and sympathetic surge are initially compensatory (support blood pressure and perfusion) then **maladaptive**: vasoconstriction, salt/water retention, hypertrophy, fibrosis, arrhythmias, progressive remodeling. This model explains why neurohormonal blockade—not diuretics alone—modifies disease trajectory in HFrEF.

### Hemodynamics (Frank–Starling bridge)

Elevated left-ventricular end-diastolic pressure → pulmonary venous hypertension → dyspnea and edema. Flattened Starling curve in decompensated HFrEF means further preload may worsen congestion without restoring stroke volume. Right-sided findings follow left-sided disease or primary RV/pulmonary vascular processes.

## 2. Clinical Presentation

### Congestion vs low output

**Congestion:** orthopnea, PND, bendopnea, elevated JVP, rales, edema, ascites, weight gain.  
**Low output:** fatigue, cool extremities, narrow pulse pressure, renal hypoperfusion, mentation changes, lactic acidosis in shock.

### Framingham-style bedside cluster (conceptual)

Combine suggestive symptoms with signs of elevated filling pressure and/or hypoperfusion. Acute decompensated phenotypes include hypertensive pulmonary edema, normotensive congestion, and cardiogenic shock.

### Can’t-miss mimics

COPD exacerbation, pneumonia, PE, anemia, renal failure with volume overload, and high-output states can imitate or coexist with HF.

## 3. Diagnostic Approach

### Core data

1. **BNP/NT-proBNP** — supports HF when elevated; interpret with atrial fibrillation, CKD, obesity, age.
2. **ECG** — ischemia, arrhythmia, LVH, LBBB patterns.
3. **Chest radiograph** — pulmonary edema pattern, cardiomegaly (insensitive alone).
4. **Transthoracic echo** — EF phenotype, valves, wall motion, pericardium, estimated pressures (qualitative teaching).
5. **Labs** — electrolytes, creatinine, CBC, glucose, thyroid as indicated; troponin if ACS overlap.

Exact biomarker cutoffs and staging schemas: *REFERENCE_REVIEW_REQUIRED*.

### Congestion vs perfusion exam grid

Sort each patient on two axes: wet/dry and warm/cold. That grid drives initial therapy emphasis (decongestion vs perfusion support) better than EF alone in the acute setting.

## 4. Management & Pharmacology

### Foundational HFrEF pillars (conceptual GDMT)

Contemporary teaching centers on four disease-modifying classes plus decongestion:

1. **ARNI / ACEI / ARB** — RAAS interruption; remodeling and outcome benefit frameworks  
2. **Evidence-based β-blockers** — blunt sympathetic toxicity; mortality benefit in HFrEF  
3. **Mineralocorticoid receptor antagonists** — antifibrotic / neurohormonal  
4. **SGLT2 inhibitors** — outcome benefit across HF phenotypes in contemporary trials/guidance  
5. **Loop diuretics** — treat congestion (symptom control; not a substitute for GDMT)

HFpEF therapy emphasizes comorbidity control, congestion management, and selected agents with emerging evidence—verify current guidelines before teaching fixed regimens.

### Major toxicities / monitoring

Hyperkalemia and creatinine rise with RAAS inhibitors/MRAs; bradycardia/AV block with β-blockers; volume depletion/hypotension with diuretics; genitourinary infections with SGLT2i teaching points.

*Exact initiation order, titration, and target doses: REFERENCE_REVIEW_REQUIRED (AHA/ACC/HFSA or equivalent).*

## 5. High-Yield Board Pearl

**Pearl:** Diuretics treat water; neurohormonal blockade treats the disease biology. Boards punish “furosemide-only” thinking in chronic HFrEF.

**Step 1 bridge:** Angiotensin II and aldosterone drive fibrosis and remodeling — blocking them is pathophysiology applied as pharmacology.

### Sources

- Heart failure guideline-directed medical therapy — \`REFERENCE_REVIEW_REQUIRED\` (attach current AHA/ACC/HFSA or equivalent after faculty review).
- Last reviewed: not yet medically approved.
`,

  "les-cv-4": `# Shock Classification by Mechanism

**Year 3** · Cardiovascular / Critical Care · Clinical Reasoning

## 1. Core Pathophysiology

### Shock as inadequate tissue perfusion

Shock is a state of cellular oxygen delivery failure relative to demand, producing tissue hypoxia and organ dysfunction. Classify by the dominant physiologic lesion:

| Class | Primary problem | CO (typical) | SVR (typical) | Examples |
| --- | --- | --- | --- | --- |
| Hypovolemic | ↓ preload | ↓ | ↑ | Hemorrhage, GI losses |
| Distributive | Vasodilation / maldistribution | ↑ or normal early | ↓ | Septic, anaphylactic, neurogenic |
| Cardiogenic | Pump failure | ↓ | ↑ | MI, fulminant myocarditis, end-stage CM |
| Obstructive | Extracardiac flow obstruction | ↓ | ↑ | Tamponade, massive PE, tension PTX |

Mixed shock is common (e.g., septic cardiomyopathy). Teach the dominant mechanism first, then look for second hits.

### Lactate and compensatory physiology

Catecholamine surge, tachycardia, and vasoconstriction may transiently defend blood pressure while occult hypoperfusion progresses. Normal blood pressure does not exclude shock.

## 2. Clinical Presentation

### Shared bedside signals

Hypotension or relative hypotension, tachycardia (or relative bradycardia in neurogenic/drug causes), altered mentation, oliguria, cool or warm extremities depending on class, mottling, and rising lactate.

### Class-specific clues

- **Hypovolemic:** flat veins, dry mucosa, hemorrhage signs, GI fluid losses  
- **Distributive (septic):** fever/hypothermia, warm extremities early, source clues  
- **Cardiogenic:** elevated JVP, S3, pulmonary edema, ischemic ECG  
- **Obstructive:** elevated JVP with clear lungs (PE/tamponade patterns), muffled sounds/pulsus (tamponade teaching), unilateral breath sounds (tension PTX)

## 3. Diagnostic Approach

### Parallel resuscitation + diagnosis

Do not delay airway/oxygenation/IV access while sorting class. Rapid ultrasound (cardiac windows, IVC, lung sliding, free fluid) plus ECG, lactate, blood gas, CBC, cultures when infection is plausible, and chest radiograph form a high-yield first pass.

### Discriminators

Warm vs cold extremities, JVP up vs down, wet vs dry lungs, and echo estimates of LV/RV function and pericardial effusion rapidly narrow the mechanism.

Exact hemodynamic numeric definitions (e.g., historic mPAP cutoffs) are not invented here — verify before teaching numbers (*REFERENCE_REVIEW_REQUIRED*).

## 4. Management & Pharmacology

### Mechanism-directed first moves (conceptual)

- **Hypovolemic:** stop losses + volume restoration (blood products when hemorrhagic)  
- **Distributive/septic:** cultures when appropriate, timely antimicrobials, fluids then vasopressors for persistent hypotension — follow sepsis pathways  
- **Cardiogenic:** cautious fluids if truly hypovolemic; otherwise unload/support pump; urgent reperfusion if ischemic; expert support devices as indicated  
- **Obstructive:** reverse the obstruction (pericardiocentesis pathway, chest decompression, PE reperfusion frameworks per risk)

Vasopressors/inotropes are class tools, not diagnoses. Pair every agent with a physiologic goal and a reassessment clock.

*Drug selection, dosing, and device indications: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** Sort shock by **preload, pump, afterload/pipe, and obstruction** — blood pressure alone does not name the class.

**Step 2 CK:** Clear lungs + elevated JVP + hypotension → think obstructive (tamponade/PE) before reflexively giving large fluid challenges for “hypotension.”

### Sources

Citations for this lesson are being verified by faculty.

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-cv-5": `# Tachyarrhythmia Safety Framework

**Year 3** · Cardiovascular · Acute Care Reasoning

## 1. Core Pathophysiology

### Why rate becomes a perfusion emergency

Extreme tachycardia shortens diastole, reduces coronary perfusion time, and can collapse stroke volume—especially in stiff ventricles, ischemia, or valvular stenosis. The educational priority is **hemodynamic consequence**, not the exotic EP label.

### Circuit classes (high-level)

- **Sinus tachycardia** — appropriate response to underlying driver (pain, hypovolemia, PE, thyrotoxicosis, anemia).  
- **SVT family** — AVNRT/AVRT, atrial tachycardia; accessory pathways change risk calculus for AV-nodal agents.  
- **Atrial fibrillation / flutter** — atrial drivers with variable AV conduction; irregular (AF) vs often regular (flutter with fixed block).  
- **Ventricular tachycardia** — ventricular myocardial circuit; wide QRS; may degenerate to VF.

## 2. Clinical Presentation

### Three triage questions

1. **Unstable?** Hypotension, shock, ischemic chest pain, acute heart failure, severe altered mentation → urgent electrical therapy pathway.  
2. **Wide vs narrow QRS?** Wide + unstable → treat as VT until proven otherwise.  
3. **Regular vs irregular?** Guides SVT differential (AVNRT/AVRT vs AF/flutter/MAT patterns).

### Bedside phenotype

Palpitations, syncope/presyncope, chest pain, dyspnea, or sudden collapse. Implantable device patients and those with prior MI raise pretest probability of VT.

## 3. Diagnostic Approach

### Immediate data

- Pulse/BP/mentation  
- Continuous monitor + **12-lead ECG** when stable enough to obtain  
- Access, oxygen if hypoxemic, defibrillator readiness  

### ECG features to name

QRS width, regularity, AV relationship (dissociation favors VT), concordant precordial pattern teaching, flutter waves, delta waves when pre-excitation is suspected.

Do not delay unstable care for perfect ECG taxonomy.

## 4. Management & Pharmacology

### Stability-first algorithm (conceptual)

**Unstable** → synchronized cardioversion / defibrillation per ACLS energy algorithms (*REFERENCE_REVIEW_REQUIRED*).  
**Stable narrow-complex SVT sketch:** vagal maneuvers → AV-nodal agents when appropriate → expert consultation for known/suspected accessory pathway.  
**Stable wide-complex:** assume VT in adults with heart disease until proven otherwise; antiarrhythmic selection is pathway- and expert-dependent.

Avoid AV-nodal blockade in irregular wide-complex rhythms that may represent pre-excited AF — a classic harm pathway.

*Exact drugs, doses, and energies: REFERENCE_REVIEW_REQUIRED (ACLS).*

## 5. High-Yield Board Pearl

**Pearl:** Unstable + wide + regular → treat as VT. Label the circuit after the patient has a pulse and a blood pressure.

**Step 2 CK trap:** Giving an AV-nodal agent in pre-excited AF can accelerate ventricular response via the accessory pathway.

### Sources

Citations for this lesson are being verified by faculty.

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-cv-6": `# Valvular Heart Disease Hemodynamics

**Year 2–3** · Cardiovascular · Pathophysiology

## 1. Core Pathophysiology

### Stenosis vs regurgitation

**Stenosis** obstructs forward flow → pressure overload proximal to the valve (concentric hypertrophy pattern teaching for chronic aortic stenosis).  
**Regurgitation** allows backward flow → volume overload of the receiving chamber (eccentric remodeling pattern teaching).

### Classic lesion maps

- **Aortic stenosis (AS):** fixed LV outflow obstruction → LV pressure overload → limited stroke-volume reserve; triad teaching: angina, syncope, heart failure.  
- **Aortic regurgitation (AR):** diastolic runoff into LV → wide pulse pressure phenotypes in chronic severe AR.  
- **Mitral stenosis (MS):** often rheumatic worldwide; obstructed LA emptying → pulmonary hypertension and AF risk.  
- **Mitral regurgitation (MR):** primary leaflet/chordal disease vs secondary (functional) from ventricular remodeling; acute MR (papillary rupture) is a surgical emergency phenotype after MI.

### Pressure–volume intuition

AS: high LV systolic pressure for a given aortic pressure. MR: V waves and reduced forward stroke volume despite total LV stroke volume. MS: elevated LA–LV diastolic gradient.

## 2. Clinical Presentation

### Symptom patterns

Exertional dyspnea, angina, syncope (AS), orthopnea/edema, palpitations (AF with MS/MR), acute pulmonary edema (acute MR/AR).

### Exam anchors

Murmur timing (systolic vs diastolic), radiation, maneuvers (pre/afterload changes), carotid pulse character (parvus et tardus teaching in severe AS), and signs of pulmonary hypertension or right heart failure in mitral disease.

## 3. Diagnostic Approach

### Core tools

1. **Transthoracic echocardiography** — lesion severity, etiology, ventricular size/function, pulmonary pressure estimates.  
2. **ECG** — LA enlargement, LVH, AF.  
3. **Chest radiograph** — cardiomegaly, pulmonary venous hypertension patterns.  
4. **Invasive hemodynamics / TEE / CT** when intervention planning requires (specialty pathways).

Exact severity cutoffs (valve areas, gradients, regurgitant fractions): *REFERENCE_REVIEW_REQUIRED*.

## 4. Management & Pharmacology

### Conceptual pillars

- Treat comorbidities (hypertension, ischemia, AF rate/rhythm frameworks).  
- **Afterload reduction** concepts in selected regurgitant lesions when LV dysfunction/hypertension present — specialist guided.  
- **Avoid** venodilation/preload collapse in severe AS when hypotensive; fixed-output physiology tolerates vasodilation poorly.  
- Definitive therapy for severe symptomatic lesions is often **mechanical** (repair/replacement / TAVR pathways) rather than chronic drug “cure.”  
- Anticoagulation teaching when mechanical prostheses or AF coexist (*REFERENCE_REVIEW_REQUIRED*).

## 5. High-Yield Board Pearl

**Pearl:** Syncope + harsh late-peaking systolic murmur + soft S2 → think severe AS; drugs do not replace valve therapy when indication thresholds are met.

**Step 1:** Pressure overload → concentric hypertrophy; volume overload → eccentric hypertrophy.

### Sources

Citations for this lesson are being verified by faculty.

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-cv-7": `# Atherosclerosis to Plaque Rupture

**Year 1–2** · Cardiovascular · Pathology / Mechanisms

## 1. Core Pathophysiology

### Endothelial injury hypothesis

Chronic endothelial injury (hemodynamic shear, smoking, hyperglycemia, dyslipidemia, hypertension) permits LDL entry and retention in the intima. Oxidized LDL stimulates monocyte recruitment; macrophages become foam cells → fatty streak.

### Evolution to fibroatheroma

Smooth-muscle migration, collagen synthesis, and necrotic core formation produce the fibroatheroma. A **thin fibrous cap** overlying a large lipid-rich necrotic core is rupture-prone. Inflammatory mediators (MMPs) weaken the cap.

### Thrombosis after rupture/erosion

Cap rupture exposes thrombogenic material → platelet adhesion/aggregation and coagulation cascade → mural or occlusive thrombus. Plaque erosion without frank rupture is an alternative ACS mechanism, especially emphasized in some contemporary pathology teaching.

### Systemic risk biology

Atherogenesis is not “plumbing dirt” alone: ApoB-containing lipoproteins, inflammation, and thrombosis risk integrate into event probability. Stable angina often reflects flow-limiting stenosis; ACS often reflects sudden thrombosis on a previously non-flow-limiting rupture-prone plaque—explaining why many MIs arise from moderate stenoses.

## 2. Clinical Presentation

### Chronic vs acute phenotypes

- **Stable ischemic heart disease:** reproducible exertional angina from supply–demand mismatch across a fixed stenosis.  
- **ACS:** rest pain, crescendo pattern, or infarction from acute thrombosis.  
- **Limb/cerebral analogs:** claudication vs acute limb ischemia; TIA vs ischemic stroke from atheroembolism or local thrombosis.

### Risk factor story

Age, male sex (earlier), family history, smoking, diabetes, hypertension, LDL-C elevation, obesity, chronic kidney disease.

## 3. Diagnostic Approach

### Educational diagnostics

Lipid panel, glucose/A1c, blood pressure assessment, ECG/stress testing frameworks for stable symptoms, and coronary imaging/angiography when ACS or high-risk stable disease is suspected. Pathology correlation uses histology of fatty streak → fibroatheroma → rupture.

Do not invent CAC score cutoffs or stenosis % thresholds as standing rules here (*REFERENCE_REVIEW_REQUIRED*).

## 4. Management & Pharmacology

### Mechanism-aligned prevention (conceptual)

- **LDL lowering** (statins ± additional agents) — plaque stabilization and event reduction frameworks  
- **Antiplatelet therapy** in established ASCVD  
- **BP control, smoking cessation, diabetes management, exercise, diet**  
- Acute plaque-event care links to the ACS lesson (antithrombotic + reperfusion)

Statin teaching: HMG-CoA reductase inhibition ↓ hepatic cholesterol synthesis → ↑ LDL receptor expression → ↓ circulating LDL-C; myopathy and hepatic enzyme monitoring are classic toxicity literacy points.

*Exact intensity groups and targets: REFERENCE_REVIEW_REQUIRED.*

## 5. High-Yield Board Pearl

**Pearl:** ACS is often acute thrombosis on a ruptured thin-cap fibroatheroma — not simply “the tightest stenosis finally clogged.”

**Step 1:** Foam cells = macrophages + oxidized LDL in the intima.

### Sources

Citations for this lesson are being verified by faculty.

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,

  "les-cv-8": `# Cardiac Tamponade Physiology

**Year 2–3** · Cardiovascular · Hemodynamics / Emergencies

## 1. Core Pathophysiology

### Pericardial constraint and equalization

The pericardial sac has limited compliance. Rapid fluid accumulation raises intrapericardial pressure → external constraint of cardiac chambers → impaired diastolic filling. Classic catheterization teaching emphasizes **equalization of diastolic pressures** across chambers when tamponade physiology is established.

### Compensatory cascade then collapse

Tachycardia and elevated systemic vascular resistance defend blood pressure until filling is so impaired that stroke volume falls → obstructive shock. Pulsus paradoxus teaching: exaggerated inspiratory drop in LV stroke volume related to septal interaction and shared pericardial space (nuances exist in ASD/AI teaching exceptions).

### Etiologic map

Trauma, post-MI free-wall rupture, aortic dissection into pericardium, malignancy, uremia, idiopathic/viral pericarditis with effusion, procedural perforation, and anticoagulation-associated hemorrhage.

## 2. Clinical Presentation

### Beck’s triad and beyond

Hypotension, elevated JVP, and muffled heart sounds are the classic triad—sensitive teaching anchors but incomplete. Dyspnea, tachycardia, clear lungs, anxiety, and pulsus paradoxus clues matter. Traumatic and postoperative settings raise pretest probability.

### Can’t-miss look-alikes

Tension pneumothorax, massive PE, and severe asthma/COPD auto-PEEP can share obstructive shock physiology with elevated intrathoracic/right-sided pressures. Distinguishing lung exam and ultrasound findings is essential.

## 3. Diagnostic Approach

### Bedside first

- Clinical suspicion + **ECG** (low voltage, electrical alternans when large effusion)  
- **Chest radiograph** may show enlarged silhouette in subacute large effusions (can be normal early if acute bloody accumulation)  
- **Bedside echo** — chamber collapse signs (esp. RV diastolic collapse teaching), IVC plethora, swinging heart  

Do not delay transfer to definitive drainage capability for exhaustive testing when obstructive shock from tamponade is clear.

Exact Doppler cutoff criteria: *REFERENCE_REVIEW_REQUIRED*.

## 4. Management & Pharmacology

### Reverse the obstruction

Definitive therapy is **drainage** (pericardiocentesis or surgical window depending on etiology—traumatic/aortic causes often need surgery). Temporizing: oxygen, careful IV fluid to support preload if hypotensive while arranging drainage; avoid aggressive positive-pressure ventilation strategies that further reduce venous return when possible; vasopressors only as a bridge.

Anticoagulation is typically held/reversed in hemorrhagic tamponade frameworks. Treat the underlying cause after stabilization.

*Procedural technique and dosing of any peri-procedural drugs: REFERENCE_REVIEW_REQUIRED / supervised protocols.*

## 5. High-Yield Board Pearl

**Pearl:** Clear lungs + elevated JVP + hypotension → obstructive shock differential (tamponade, PE, tension PTX)—not automatic sepsis fluids.

**Step 1/2:** Electrical alternans + low voltage → large pericardial effusion until proven otherwise; drainage beats pressors.

### Sources

Citations for this lesson are being verified by faculty.

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,
};
