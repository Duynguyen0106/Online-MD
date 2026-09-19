import type {
  ClinicalCase,
  Flashcard,
  Objective,
  Program,
  QbankQuestion,
  QuizQuestion,
} from "@/lib/types/domain";
import { IDS } from "@/lib/curriculum/seed";

/**
 * Second-wave original curriculum depth: high-yield mechanisms and
 * clerkship reasoning written for Online MD (not copied from any bank
 * or proprietary LMS). Emphasizes pathophysiology → clinical phenotype
 * → decision framework.
 */

export const depthObjectives: Objective[] = [
  {
    id: "obj-cv-5",
    code: "OBJ-P1-CV-005",
    statement:
      "Classify shock by pump, volume, vessel tone, and obstruction using exam and hemodynamics.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Physiology",
    moduleId: IDS.modCvb,
    lessonIds: ["les-cv-4"],
  },
  {
    id: "obj-cv-6",
    code: "OBJ-P1-CV-006",
    statement:
      "Distinguish unstable wide-complex tachycardia priorities from stable SVT reasoning.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Management",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modCvb,
    lessonIds: ["les-cv-5"],
  },
  {
    id: "obj-pulm-3",
    code: "OBJ-P1-PULM-003",
    statement:
      "Explain PE hypoxemia using V/Q mismatch and dead-space physiology, and prioritize risk stratification.",
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modPulm,
    lessonIds: ["les-pulm-3"],
  },
  {
    id: "obj-pulm-4",
    code: "OBJ-P1-PULM-004",
    statement:
      "Differentiate cardiogenic vs noncardiogenic pulmonary edema and ARDS oxygenation priorities.",
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modPulm,
    lessonIds: ["les-pulm-4"],
  },
  {
    id: "obj-gi-3",
    code: "OBJ-P1-GI-003",
    statement:
      "Map portal hypertension pathophysiology to variceal bleeding and ascites complications.",
    usmleStep: "step1",
    organSystem: "Gastrointestinal",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modGi,
    lessonIds: ["les-gi-3"],
  },
  {
    id: "obj-gi-4",
    code: "OBJ-P1-GI-004",
    statement:
      "Prioritize resuscitation and airway protection in acute upper GI bleeding.",
    usmleStep: "step2ck",
    organSystem: "Gastrointestinal",
    physicianTask: "Management",
    contentCategory: "Internal Medicine",
    moduleId: IDS.modGi,
    lessonIds: ["les-gi-4"],
  },
  {
    id: "obj-cell-4",
    code: "OBJ-P1-CELL-004",
    statement:
      "Sequence acute inflammation mediators from vascular response to leukocyte recruitment.",
    usmleStep: "step1",
    organSystem: "Multisystem",
    physicianTask: "Knowledge",
    contentCategory: "Pathology",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-3"],
  },
  {
    id: "obj-cell-5",
    code: "OBJ-P1-CELL-005",
    statement:
      "Contrast innate vs adaptive immune effector mechanisms with clinical examples.",
    usmleStep: "step1",
    organSystem: "Multisystem",
    physicianTask: "Knowledge",
    contentCategory: "Immunology",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-4"],
  },
  {
    id: "obj-renal-4",
    code: "OBJ-P1-REN-004",
    statement:
      "Approach hyponatremia by tonicity and volume status before selecting therapy class.",
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Diagnosis",
    contentCategory: "Physiology",
    moduleId: IDS.modRenal,
    lessonIds: ["les-renal-4"],
  },
  {
    id: "obj-endo-3",
    code: "OBJ-P1-ENDO-003",
    statement:
      "Differentiate myxedema coma from thyroid storm using clinical severity markers.",
    usmleStep: "step1",
    organSystem: "Endocrine",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modEndo,
    lessonIds: ["les-endo-3"],
  },
  {
    id: "obj-im-3",
    code: "OBJ-P2-IM-003",
    statement:
      "Build a problem representation for syncope separating cardiac from reflex and orthostatic causes.",
    usmleStep: "step2ck",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Internal Medicine",
    moduleId: IDS.modIm,
    lessonIds: ["les-im-3"],
  },
  {
    id: "obj-neuro-4",
    code: "OBJ-P1-NEURO-004",
    statement:
      "Localize seizures vs syncope mimics and outline status epilepticus first priorities.",
    usmleStep: "step1",
    organSystem: "Nervous System",
    physicianTask: "Management",
    contentCategory: "Neuroscience",
    moduleId: IDS.modNeuro,
    lessonIds: ["les-neuro-4"],
  },
];

function q(
  id: string,
  stem: string,
  choices: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanation: string,
  extras: Partial<QuizQuestion> = {},
): QuizQuestion {
  const choiceObjs = choices.map((text, i) => ({ id: `${id}-c${i}`, text }));
  return {
    id,
    stem,
    choices: choiceObjs,
    correctChoiceId: choiceObjs[correctIndex].id,
    explanation,
    sequence: extras.sequence ?? 1,
    ...extras,
  };
}

export const depthQuizQuestions: QuizQuestion[] = [
  q(
    "qq-cv-4",
    "A patient is warm, tachycardic, hypotensive after pneumonia, with bounding pulses and low SVR. Which shock category fits best?",
    [
      "Distributive (vasodilatory) shock",
      "Cardiogenic shock from pure pump failure",
      "Obstructive shock from tamponade only",
      "Hypovolemic shock from GI bleed exclusively",
    ],
    0,
    "Warm extremities, low SVR, and infection point to distributive/septic physiology rather than cold cardiogenic or pure volume loss.",
    { lessonId: "les-cv-4", sequence: 1, objectiveId: "obj-cv-5" },
  ),
  q(
    "qq-cv-5",
    "An unstable patient has a wide-complex regular tachycardia and hypotension. First priority among options?",
    [
      "Immediate synchronized cardioversion pathway (per ACLS-style urgency)",
      "Oral beta-blocker only and discharge",
      "Assume sinus tachycardia and ignore rhythm",
      "Start outpatient Holter without resuscitation",
    ],
    0,
    "Unstable wide-complex tachycardia is treated as a resuscitation priority; delaying for elective outpatient testing is unsafe.",
    { lessonId: "les-cv-5", sequence: 1, objectiveId: "obj-cv-6" },
  ),
  q(
    "qq-pulm-3",
    "Acute PE primarily causes hypoxemia through which mechanism?",
    [
      "V/Q mismatch with increased alveolar dead space",
      "Complete right-to-left intracardiac shunt in everyone",
      "Primary methemoglobin production",
      "Pure CO2 retention without any V/Q change",
    ],
    0,
    "Vascular obstruction creates ventilated but under-perfused units (dead space) and redistribution that worsens V/Q matching.",
    { lessonId: "les-pulm-3", sequence: 1, objectiveId: "obj-pulm-3" },
  ),
  q(
    "qq-pulm-4",
    "Bilateral infiltrates, PaO2/FiO2 ≤300, and noncardiogenic context after sepsis best supports:",
    [
      "ARDS physiology with impaired gas exchange",
      "Isolated tension pneumothorax as the only explanation",
      "Simple atelectasis cured by one deep breath",
      "Pure metabolic alkalosis without lung injury",
    ],
    0,
    "ARDS is defined by acute hypoxemic respiratory failure with bilateral opacities not fully explained by heart failure/fluid overload.",
    { lessonId: "les-pulm-4", sequence: 1, objectiveId: "obj-pulm-4" },
  ),
  q(
    "qq-gi-3",
    "Portal hypertension from cirrhosis most directly explains which finding?",
    [
      "Esophageal varices from portosystemic collateral flow",
      "Isolated aortic stenosis",
      "Primary hyperthyroidism",
      "Peripheral eosinophilia as the defining feature",
    ],
    0,
    "Elevated portal pressure drives portosystemic collaterals including esophageal varices — a key bleeding risk.",
    { lessonId: "les-gi-3", sequence: 1, objectiveId: "obj-gi-3" },
  ),
  q(
    "qq-gi-4",
    "Massive hematemesis with altered mentation — first parallel priorities?",
    [
      "Airway protection and hemodynamic resuscitation before definitive endoscopy planning",
      "Outpatient PPI refill only",
      "Discharge if hemoglobin was normal yesterday",
      "Start oral iron and ignore vital signs",
    ],
    0,
    "Unstable UGIB: ABCs/airway and volume first; endoscopy is definitive but not a substitute for resuscitation.",
    { lessonId: "les-gi-4", sequence: 1, objectiveId: "obj-gi-4" },
  ),
  q(
    "qq-cell-3",
    "Histamine release early in acute inflammation primarily causes:",
    [
      "Transient arteriolar dilation and increased vascular permeability",
      "Immediate granuloma formation by definition",
      "Selective destruction of all neutrophils",
      "Complete blockade of complement C3",
    ],
    0,
    "Mast-cell histamine drives early vascular changes: dilation and leakiness that produce redness and edema.",
    { lessonId: "les-cell-3", sequence: 1, objectiveId: "obj-cell-4" },
  ),
  q(
    "qq-cell-4",
    "Which pairing correctly contrasts innate vs adaptive immunity?",
    [
      "Innate: rapid pattern recognition; Adaptive: antigen-specific memory (B/T cells)",
      "Innate always requires prior immunization; Adaptive never remembers",
      "Complement is exclusively an adaptive antibody",
      "Neutrophils are the only adaptive memory cells",
    ],
    0,
    "Innate responses are fast and pattern-based; adaptive responses generate antigen-specific clones and memory.",
    { lessonId: "les-cell-4", sequence: 1, objectiveId: "obj-cell-5" },
  ),
  q(
    "qq-renal-4",
    "Before treating hyponatremia, the first classification step is:",
    [
      "Determine tonicity (hypotonic vs iso/hypertonic) then volume status",
      "Give hypertonic saline to every Na <135 without assessment",
      "Assume all cases are SIADH",
      "Ignore glucose and lipids as osmotic contributors",
    ],
    0,
    "Tonicity and volume status prevent wrong therapy (e.g., fluids vs restriction vs hypertonic saline).",
    { lessonId: "les-renal-4", sequence: 1, objectiveId: "obj-renal-4" },
  ),
  q(
    "qq-endo-3",
    "Fever, agitation, tachycardia, and severe thyrotoxicosis after infection suggests:",
    [
      "Thyroid storm — supportive care + antithyroid pathway urgency",
      "Myxedema coma with hypothermia exclusively",
      "Isolated primary adrenal crisis without thyroid findings",
      "Benign essential tremor only",
    ],
    0,
    "Thyroid storm is a clinical diagnosis of severe thyrotoxicosis with systemic decompensation; treat urgently while confirming labs.",
    { lessonId: "les-endo-3", sequence: 1, objectiveId: "obj-endo-3" },
  ),
  q(
    "qq-im-3",
    "Syncope during exertion with a murmur raises highest concern for:",
    [
      "Cardiac outflow obstruction / arrhythmia risk needing urgent evaluation",
      "Vasovagal syncope after prolonged standing only",
      "Orthostasis from dehydration exclusively",
      "Psychogenic nonepileptic spell by default",
    ],
    0,
    "Exertional syncope is a red flag for structural/cardiac causes; do not default to benign reflex syncope.",
    { lessonId: "les-im-3", sequence: 1, objectiveId: "obj-im-3" },
  ),
  q(
    "qq-neuro-4",
    "Continuous convulsions ≥5 minutes without return to baseline — first priority?",
    [
      "Status epilepticus pathway: ABCs, benzodiazepine first-line, escalate antiseizure therapy",
      "Outpatient EEG next month as the only step",
      "Assume psychogenic spell and leave unmonitored",
      "Oral caffeine challenge",
    ],
    0,
    "Prolonged seizures are a neurologic emergency; benzodiazepines and supportive care come before elective outpatient testing.",
    { lessonId: "les-neuro-4", sequence: 1, objectiveId: "obj-neuro-4" },
  ),
];

export const depthQbankQuestions: QbankQuestion[] = [
  {
    id: "qb-6",
    stem: "Hypotensive trauma patient, cool clammy skin, flat neck veins, clear lungs. Most likely shock class?",
    choices: [
      { id: "qb-6-c0", text: "Hypovolemic shock from hemorrhage" },
      { id: "qb-6-c1", text: "Cardiogenic shock with high filling pressures" },
      { id: "qb-6-c2", text: "Warm distributive shock" },
      { id: "qb-6-c3", text: "Neurogenic shock with bradycardia only by definition" },
    ],
    correctChoiceId: "qb-6-c0",
    explanation:
      "Cold, volume-depleted appearance with flat veins after trauma points to hypovolemia/hemorrhage until proven otherwise.",
    moduleId: IDS.modCvb,
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Physiology",
    objectiveId: "obj-cv-5",
    difficulty: 2,
  },
  {
    id: "qb-7",
    stem: "Postpartum day 2, sudden dyspnea, SpO2 88%, clear lungs, swollen calf. Best pathophysiologic framing?",
    choices: [
      {
        id: "qb-7-c0",
        text: "Pulmonary embolism with V/Q mismatch / dead-space physiology",
      },
      { id: "qb-7-c1", text: "Community pneumonia only because postpartum" },
      { id: "qb-7-c2", text: "Primary spontaneous pneumothorax exclusively" },
      { id: "qb-7-c3", text: "Anxiety without need for oxygenation assessment" },
    ],
    correctChoiceId: "qb-7-c0",
    explanation:
      "Postpartum hypercoagulability + hypoxia + clear lungs supports PE physiology; evaluate and treat per clinical pathways.",
    moduleId: IDS.modPulm,
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    objectiveId: "obj-pulm-3",
    difficulty: 3,
  },
  {
    id: "qb-8",
    stem: "Cirrhosis with hematemesis and hypotension. After ABCs, which pathophysiology informs urgency?",
    choices: [
      {
        id: "qb-8-c0",
        text: "Portal hypertension → variceal bleeding risk requiring resuscitation + definitive therapy planning",
      },
      { id: "qb-8-c1", text: "Isolated gastritis always rules out varices" },
      { id: "qb-8-c2", text: "Portal pressure never relates to bleeding" },
      { id: "qb-8-c3", text: "Oral iron alone is definitive therapy" },
    ],
    correctChoiceId: "qb-8-c0",
    explanation:
      "Variceal bleed is a portal-hypertension emergency; stabilize and arrange endoscopic/pharmacologic pathway care.",
    moduleId: IDS.modGi,
    usmleStep: "step2ck",
    organSystem: "Gastrointestinal",
    physicianTask: "Management",
    contentCategory: "Internal Medicine",
    objectiveId: "obj-gi-4",
    difficulty: 3,
  },
  {
    id: "qb-9",
    stem: "Serum Na 118, glucose normal, clinically euvolemic, high urine osmolality. Leading framework?",
    choices: [
      {
        id: "qb-9-c0",
        text: "Hypotonic euvolemic hyponatremia — consider SIADH after excluding cortisol/thyroid issues",
      },
      { id: "qb-9-c1", text: "Hypertonic hyponatremia from hyperglycemia" },
      { id: "qb-9-c2", text: "Pseudohyponatremia from severe hyperlipidemia only by assumption" },
      { id: "qb-9-c3", text: "Hypervolemic hyponatremia from CHF exclusively" },
    ],
    correctChoiceId: "qb-9-c0",
    explanation:
      "Normal glucose + euvolemia + inappropriately concentrated urine fits SIADH-pattern thinking after endocrine exclusions.",
    moduleId: IDS.modRenal,
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Diagnosis",
    contentCategory: "Physiology",
    objectiveId: "obj-renal-4",
    difficulty: 3,
  },
];

export const depthFlashcards: Flashcard[] = [
  {
    id: "fc-14",
    lessonId: "les-cv-4",
    front: "Four shock buckets (mechanism first)",
    back: "Pump (cardiogenic), volume (hypovolemic), tone (distributive), obstruction (PE/tamponade/tension PTX).",
    objectiveId: "obj-cv-5",
  },
  {
    id: "fc-15",
    lessonId: "les-cv-5",
    front: "Unstable wide-complex tachycardia — first principle",
    back: "Treat as VT until proven otherwise; unstable → urgent cardioversion pathway, not elective oral therapy.",
    objectiveId: "obj-cv-6",
  },
  {
    id: "fc-16",
    lessonId: "les-pulm-3",
    front: "PE hypoxemia physiology",
    back: "Increased dead space + V/Q mismatch; A-a gradient rises; clear lungs do not exclude PE.",
    objectiveId: "obj-pulm-3",
  },
  {
    id: "fc-17",
    lessonId: "les-pulm-4",
    front: "ARDS vs cardiogenic edema clue",
    back: "ARDS: noncardiogenic bilateral injury + hypoxemia; cardiogenic: elevated filling pressures / heart failure phenotype.",
    objectiveId: "obj-pulm-4",
  },
  {
    id: "fc-18",
    lessonId: "les-gi-3",
    front: "Portal HTN collaterals",
    back: "Esophageal varices, caput medusae, splenomegaly; ascites from sinusoidal hypertension + hypoalbuminemia.",
    objectiveId: "obj-gi-3",
  },
  {
    id: "fc-19",
    lessonId: "les-gi-4",
    front: "UGIB resuscitation order",
    back: "Airway → two large-bore IVs → crystalloid/blood products → PPI pathway → urgent GI for endoscopy when indicated.",
    objectiveId: "obj-gi-4",
  },
  {
    id: "fc-20",
    lessonId: "les-cell-3",
    front: "Acute inflammation timeline (mediators)",
    back: "Seconds–minutes: histamine/NO; hours: prostaglandins/leukotrienes; recruitment: selectins/integrins + chemokines.",
    objectiveId: "obj-cell-4",
  },
  {
    id: "fc-21",
    lessonId: "les-cell-4",
    front: "Innate vs adaptive one-liner",
    back: "Innate = barriers, phagocytes, complement, PRRs; Adaptive = clonal B/T specificity + memory.",
    objectiveId: "obj-cell-5",
  },
  {
    id: "fc-22",
    lessonId: "les-renal-4",
    front: "Hyponatremia first fork",
    back: "Tonicity → then hypovolemic / euvolemic / hypervolemic → then ADH-appropriate vs inappropriate.",
    objectiveId: "obj-renal-4",
  },
  {
    id: "fc-23",
    lessonId: "les-endo-3",
    front: "Thyroid storm vs myxedema",
    back: "Storm: severe thyrotoxic decompensation (fever, CNS, CV). Myxedema: profound hypothyroidism with hypothermia/coma risk.",
    objectiveId: "obj-endo-3",
  },
  {
    id: "fc-24",
    lessonId: "les-im-3",
    front: "Syncope red flags",
    back: "Exertional, while supine, family sudden death, structural heart disease, abnormal ECG → cardiac workup urgency.",
    objectiveId: "obj-im-3",
  },
  {
    id: "fc-25",
    lessonId: "les-neuro-4",
    front: "Status epilepticus first drug class",
    back: "Benzodiazepines first-line while protecting airway and checking glucose; then longer-acting antiseizure agents.",
    objectiveId: "obj-neuro-4",
  },
];

export const depthClinicalCases: ClinicalCase[] = [
  {
    id: "case-cv-1",
    moduleId: IDS.modCvb,
    title: "Warm Shock After Pneumonia",
    presentationMd:
      "68-year-old with CAP becomes hypotensive, warm extremities, lactate elevated, bounding pulses.",
    stages: [
      {
        id: "cv1",
        prompt: "Name the shock category and the two physiologic drivers of hypotension.",
        expectedFocus: "Distributive/septic — vasodilation + relative hypovolemia/capillary leak",
      },
      {
        id: "cv2",
        prompt: "List parallel first-hour priorities (educational framework, not a hospital protocol).",
        expectedFocus: "Cultures, timely antibiotics, fluids for perfusion, source-control thinking",
      },
    ],
    teachingPoints:
      "Distributive shock is a tone problem plus capillary leak; treat infection and perfusion together.",
    objectiveIds: ["obj-cv-5"],
    status: "published",
  },
  {
    id: "case-pulm-1",
    moduleId: IDS.modPulm,
    title: "Sudden Dyspnea After Orthopedic Surgery",
    presentationMd:
      "Day 3 post hip ORIF: sudden SOB, SpO2 90%, clear lungs, HR 118.",
    stages: [
      {
        id: "p1",
        prompt: "State the leading diagnosis and the gas-exchange mechanism.",
        expectedFocus: "PE — V/Q mismatch and increased dead space",
      },
      {
        id: "p2",
        prompt: "What bedside findings would raise concern for massive/high-risk PE?",
        expectedFocus: "Hypotension, RV strain signs, syncope",
      },
    ],
    teachingPoints:
      "Clear lungs + sudden hypoxia after surgery is PE until the workup says otherwise.",
    objectiveIds: ["obj-pulm-3"],
    status: "published",
  },
  {
    id: "case-gi-1",
    moduleId: IDS.modGi,
    title: "Hematemesis in Decompensated Cirrhosis",
    presentationMd:
      "54-year-old with known cirrhosis vomits large-volume bright blood; BP 88/50.",
    stages: [
      {
        id: "g1",
        prompt: "Link portal hypertension to the bleeding source.",
        expectedFocus: "Esophageal varices from portosystemic collaterals",
      },
      {
        id: "g2",
        prompt: "Order your first five actions in parallel.",
        expectedFocus: "Airway, IV access, volume/blood products, GI endoscopy pathway",
      },
    ],
    teachingPoints:
      "Variceal bleed is a resuscitation emergency; pathophysiology explains why endoscopy must be paired with stabilization.",
    objectiveIds: ["obj-gi-3", "obj-gi-4"],
    status: "published",
  },
  {
    id: "case-renal-1",
    moduleId: IDS.modRenal,
    title: "Na 118 and Confusion",
    presentationMd:
      "Oncology patient on SSRIs presents with confusion; Na 118, euvolemic, normal glucose.",
    stages: [
      {
        id: "r1",
        prompt: "Classify the hyponatremia (tonicity + volume).",
        expectedFocus: "Hypotonic euvolemic hyponatremia",
      },
      {
        id: "r2",
        prompt: "What diagnoses remain after excluding adrenal/thyroid failure?",
        expectedFocus: "SIADH / drug-related / malignancy-related ADH excess patterns",
      },
    ],
    teachingPoints:
      "Never treat the number alone — tonicity and volume decide whether you restrict, replace, or carefully correct.",
    objectiveIds: ["obj-renal-4"],
    status: "published",
  },
];

function reading(
  id: string,
  conceptId: string,
  title: string,
  sequence: number,
  bodyMd: string,
) {
  return {
    id,
    conceptId,
    blockType: "reading" as const,
    title,
    sequence,
    bodyMd,
  };
}

function vignette(
  id: string,
  conceptId: string,
  title: string,
  sequence: number,
  bodyMd: string,
) {
  return {
    id,
    conceptId,
    blockType: "clinical_vignette" as const,
    title,
    sequence,
    bodyMd,
  };
}

function diagram(
  id: string,
  conceptId: string,
  title: string,
  sequence: number,
  bodyMd: string,
) {
  return {
    id,
    conceptId,
    blockType: "diagram" as const,
    title,
    sequence,
    bodyMd,
  };
}

/** Appends depth lessons onto a cloned program. */
export function applyDepthExpansions(program: Program): Program {
  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      if (mod.id === IDS.modCvb) {
        mod.lessons.push(
          {
            id: "les-cv-4",
            moduleId: IDS.modCvb,
            title: "Shock Classification by Mechanism",
            slug: "cv-shock",
            sequence: 4,
            estimatedMinutes: 40,
            status: "published",
            quizPassThreshold: 0.8,
            quizQuestionIds: ["qq-cv-4"],
            concepts: [
              {
                id: "con-cv-4a",
                lessonId: "les-cv-4",
                title: "Pump, volume, tone, obstruction",
                sequence: 1,
                summary:
                  "Shock is inadequate tissue perfusion; classify by the broken physiology before memorizing pressor names.",
                blocks: [
                  reading(
                    "blk-cv-4a-r",
                    "con-cv-4a",
                    "Four-bucket shock map",
                    1,
                    `## Definition
Shock = inadequate oxygen delivery relative to demand → tissue hypoxia and organ dysfunction. BP is a *clue*, not the definition.

## Mechanistic buckets
1. **Cardiogenic (pump)**: MI, myocarditis, end-stage cardiomyopathy → high filling pressures, cool extremities, pulmonary congestion.
2. **Hypovolemic (volume)**: hemorrhage, GI losses, burns → flat veins, cool skin, clear or dry lungs.
3. **Distributive (tone)**: sepsis, anaphylaxis, neurogenic → low SVR; septic often warm early.
4. **Obstructive**: tamponade, tension pneumothorax, massive PE → impaired venous return or RV outflow.

## Bedside integration
Combine skin temperature, JVP/neck veins, lung exam, lactate, and (when available) echo/invasive hemodynamics. Treat the mechanism while supporting ABCs.

### Educational caution
Exact fluid/pressor protocols are institutional. Learn *why* a therapy matches physiology.`,
                  ),
                  diagram(
                    "blk-cv-4a-d",
                    "con-cv-4a",
                    "Hemodynamic sketch",
                    2,
                    `Sketch a 2×2: **preload** (low vs high) vs **SVR** (low vs high). Place septic (low SVR), hypovolemic (low preload), cardiogenic (high preload + high SVR), obstructive PE (RV strain pattern).`,
                  ),
                  vignette(
                    "blk-cv-4a-x",
                    "con-cv-4a",
                    "Vignette: warm hypotension",
                    3,
                    `Pneumonia, warm skin, low BP, rising lactate. Name the bucket and list three parallel first actions.`,
                  ),
                ],
              },
            ],
          },
          {
            id: "les-cv-5",
            moduleId: IDS.modCvb,
            title: "Tachyarrhythmia Safety Framework",
            slug: "cv-tachycardia",
            sequence: 5,
            estimatedMinutes: 35,
            status: "published",
            quizPassThreshold: 0.8,
            quizQuestionIds: ["qq-cv-5"],
            concepts: [
              {
                id: "con-cv-5a",
                lessonId: "les-cv-5",
                title: "Rate, QRS width, stability",
                sequence: 1,
                summary:
                  "Stability and QRS morphology drive urgency more than memorizing every SVT name on day one.",
                blocks: [
                  reading(
                    "blk-cv-5a-r",
                    "con-cv-5a",
                    "Triage the rhythm",
                    1,
                    `## Three questions
1. **Unstable?** Hypotension, shock, ischemic chest pain, acute heart failure, altered mentation → urgent electrical therapy pathway.
2. **Wide vs narrow QRS?** Wide + unstable → treat as VT until proven otherwise.
3. **Regular vs irregular?** Guides SVT differential (AVNRT/AVRT vs AF/flutter/MAT patterns).

## Teaching priority
Do not chase exotic EP labels while perfusion is failing. Stabilize, then refine diagnosis with ECG review and faculty.

## Stable narrow-complex sketch
Vagal maneuvers → AV-nodal agents when appropriate → expert consultation for accessory pathway concerns.`,
                  ),
                  vignette(
                    "blk-cv-5a-x",
                    "con-cv-5a",
                    "Vignette: wide and crashing",
                    2,
                    `HR 190, wide regular QRS, BP 70/40. What do you *not* do, and what is your first priority?`,
                  ),
                ],
              },
            ],
          },
        );
        if (mod.exam) {
          mod.exam.questionIds = [...mod.exam.questionIds, "qq-cv-4", "qq-cv-5"];
        }
      }

      if (mod.id === IDS.modPulm) {
        mod.lessons.push(
          {
            id: "les-pulm-3",
            moduleId: IDS.modPulm,
            title: "Pulmonary Embolism Physiology",
            slug: "pulm-pe",
            sequence: 3,
            estimatedMinutes: 40,
            status: "published",
            quizPassThreshold: 0.8,
            quizQuestionIds: ["qq-pulm-3"],
            concepts: [
              {
                id: "con-pulm-3a",
                lessonId: "les-pulm-3",
                title: "Dead space, RV strain, risk",
                sequence: 1,
                summary:
                  "Vascular obstruction creates dead space and can acutely pressure-overload the right ventricle.",
                blocks: [
                  reading(
                    "blk-pulm-3a-r",
                    "con-pulm-3a",
                    "PE from first principles",
                    1,
                    `## Gas exchange
Occluded pulmonary arteries → ventilated alveoli with little/no perfusion (**increased physiologic dead space**) plus redistribution that worsens V/Q matching → hypoxemia and elevated A–a gradient. Hyperventilation often lowers PaCO2.

## Hemodynamics
Sudden rise in pulmonary vascular resistance → RV strain/failure → obstructive shock in high-burden PE.

## Clinical reasoning (education)
Pretest probability + D-dimer/imaging pathways vary by setting. Your job as a learner: recognize PE phenotypes (sudden dyspnea, clear lungs, risk factors) and understand *why* hypoxia and hypotension occur.

Never invent institutional dosing for thrombolysis from memory in this course — learn indications conceptually and follow supervised protocols.`,
                  ),
                  vignette(
                    "blk-pulm-3a-x",
                    "con-pulm-3a",
                    "Vignette: postop hypoxia",
                    2,
                    `Orthopedic surgery day 3, SpO2 88%, clear lungs. Explain physiology and red flags for high-risk PE.`,
                  ),
                ],
              },
            ],
          },
          {
            id: "les-pulm-4",
            moduleId: IDS.modPulm,
            title: "ARDS & Pulmonary Edema Distinctions",
            slug: "pulm-ards",
            sequence: 4,
            estimatedMinutes: 35,
            status: "published",
            quizPassThreshold: 0.8,
            quizQuestionIds: ["qq-pulm-4"],
            concepts: [
              {
                id: "con-pulm-4a",
                lessonId: "les-pulm-4",
                title: "Permeability vs hydrostatic edema",
                sequence: 1,
                summary:
                  "ARDS is permeability edema from alveolar-capillary injury; cardiogenic edema is hydrostatic.",
                blocks: [
                  reading(
                    "blk-pulm-4a-r",
                    "con-pulm-4a",
                    "Two roads to wet lungs",
                    1,
                    `## Cardiogenic (hydrostatic)
Elevated left atrial / pulmonary venous pressure pushes fluid across an otherwise relatively intact barrier.

## ARDS (permeability)
Diffuse alveolar damage → protein-rich edema, surfactant dysfunction, shunt physiology, bilateral opacities, hypoxemia not fully explained by heart failure.

## Bedside teaching
History (sepsis, aspiration, trauma, pancreatitis), exam, BNP/echo context, and response to therapy help separate phenotypes. Lung-protective ventilation concepts matter clinically; exact vent settings are protocolized.`,
                  ),
                ],
              },
            ],
          },
        );
        if (mod.exam) {
          mod.exam.questionIds = [
            ...mod.exam.questionIds,
            "qq-pulm-3",
            "qq-pulm-4",
          ];
        }
      }

      if (mod.id === IDS.modGi) {
        mod.lessons.push(
          {
            id: "les-gi-3",
            moduleId: IDS.modGi,
            title: "Portal Hypertension & Cirrhosis Complications",
            slug: "gi-portal-htn",
            sequence: 3,
            estimatedMinutes: 40,
            status: "published",
            quizPassThreshold: 0.8,
            quizQuestionIds: ["qq-gi-3"],
            concepts: [
              {
                id: "con-gi-3a",
                lessonId: "les-gi-3",
                title: "From fibrosis to collaterals",
                sequence: 1,
                summary:
                  "Architectural distortion raises portal pressure; collaterals and ascites follow.",
                blocks: [
                  reading(
                    "blk-gi-3a-r",
                    "con-gi-3a",
                    "Portal hypertension cascade",
                    1,
                    `## Mechanism
Cirrhosis → sinusoidal obstruction + splanchnic vasodilation → elevated portal pressure → portosystemic collaterals (varices) and ascites (Starling imbalance + hypoalbuminemia + renal sodium retention).

## Clinical map
- **Varices**: bleeding risk  
- **Ascites**: infection risk (SBP)  
- **Hepatic encephalopathy**: gut-derived neurotoxins + impaired clearance  
- **HRS / AKI**: perfusion and vasoactive imbalance

Teach mechanisms first; guideline dosing for vasoconstrictors/albumin belongs to supervised clinical pathways.`,
                  ),
                  diagram(
                    "blk-gi-3a-d",
                    "con-gi-3a",
                    "Collateral sketch",
                    2,
                    `Draw portal vein → liver block → reverse flow into esophageal, umbilical, and rectal collaterals. Label why esophageal varices bleed catastrophically.`,
                  ),
                ],
              },
            ],
          },
          {
            id: "les-gi-4",
            moduleId: IDS.modGi,
            title: "Acute Upper GI Bleeding Priorities",
            slug: "gi-ugib",
            sequence: 4,
            estimatedMinutes: 35,
            status: "published",
            quizPassThreshold: 0.8,
            quizQuestionIds: ["qq-gi-4"],
            concepts: [
              {
                id: "con-gi-4a",
                lessonId: "les-gi-4",
                title: "ABCs before endoscopy",
                sequence: 1,
                summary:
                  "Massive UGIB kills via airway compromise and hypovolemia; resuscitate in parallel with definitive care.",
                blocks: [
                  reading(
                    "blk-gi-4a-r",
                    "con-gi-4a",
                    "UGIB decision spine",
                    1,
                    `## Parallel priorities
1. Airway if vomiting blood / altered mentation  
2. Large-bore IV access and volume/blood product resuscitation  
3. Reverse coagulopathy when indicated  
4. Proton-pump pathway for ulcer disease; variceal pathway thinking in cirrhosis  
5. Urgent gastroenterology for endoscopy when stabilized enough to proceed

### Differential sketch
Ulcer, varices, Mallory–Weiss, malignancy, Dieulafoy — mechanism informs therapy, but ABCs come first.`,
                  ),
                  vignette(
                    "blk-gi-4a-x",
                    "con-gi-4a",
                    "Vignette: fountain hematemesis",
                    2,
                    `List the first five actions and which pathophysiology changes your pharmacologic pathway (ulcer vs varices).`,
                  ),
                ],
              },
            ],
          },
        );
        if (mod.exam) {
          mod.exam.questionIds = [...mod.exam.questionIds, "qq-gi-3", "qq-gi-4"];
        }
      }

      if (mod.id === IDS.modCell) {
        mod.lessons.push(
          {
            id: "les-cell-3",
            moduleId: IDS.modCell,
            title: "Acute Inflammation Mediator Sequence",
            slug: "cell-inflammation",
            sequence: 3,
            estimatedMinutes: 40,
            status: "published",
            quizPassThreshold: 0.8,
            quizQuestionIds: ["qq-cell-3"],
            concepts: [
              {
                id: "con-cell-3a",
                lessonId: "les-cell-3",
                title: "Vascular response to leukocyte exit",
                sequence: 1,
                summary:
                  "Cardinal signs map to vasodilation, permeability, and cellular recruitment.",
                blocks: [
                  reading(
                    "blk-cell-3a-r",
                    "con-cell-3a",
                    "Mediator choreography",
                    1,
                    `## Vascular phase
Histamine, NO, prostaglandins → arteriolar dilation (rubor/calor) and permeability (tumor). Bradykinin adds pain (dolor).

## Cellular phase
Margination → rolling (selectins) → firm adhesion (integrins) → transmigration → chemotaxis (chemokines, C5a, LTB4) → phagocytosis.

## Outcomes
Resolution, scarring, abscess, or chronic inflammation if the stimulus persists. Link each mediator to a *clinical* sign, not a flashcard list alone.`,
                  ),
                  vignette(
                    "blk-cell-3a-x",
                    "con-cell-3a",
                    "Vignette: cellulitis cardinal signs",
                    2,
                    `Map rubor, calor, tumor, dolor to specific mediator classes.`,
                  ),
                ],
              },
            ],
          },
          {
            id: "les-cell-4",
            moduleId: IDS.modCell,
            title: "Innate vs Adaptive Immunity",
            slug: "cell-immunity",
            sequence: 4,
            estimatedMinutes: 35,
            status: "published",
            quizPassThreshold: 0.8,
            quizQuestionIds: ["qq-cell-4"],
            concepts: [
              {
                id: "con-cell-4a",
                lessonId: "les-cell-4",
                title: "Pattern recognition to memory",
                sequence: 1,
                summary:
                  "Innate speed plus adaptive specificity together clear pathogens and create lasting protection.",
                blocks: [
                  reading(
                    "blk-cell-4a-r",
                    "con-cell-4a",
                    "Two arms, one host defense",
                    1,
                    `## Innate
Barriers, neutrophils/macrophages, NK cells, complement, PRRs (TLRs) recognizing PAMPs/DAMPs — minutes to hours.

## Adaptive
Clonal B and T lymphocytes with antigen receptors; affinity maturation and memory — days, then rapid recall.

## Clinical hooks
- Neutropenia → bacterial/fungal risk  
- Antibody defects → extracellular pathogens  
- T-cell defects → viruses/opportunists  
Vaccines exploit adaptive memory while relying on innate adjuvant signals.`,
                  ),
                ],
              },
            ],
          },
        );
        if (mod.exam) {
          mod.exam.questionIds = [
            ...mod.exam.questionIds,
            "qq-cell-3",
            "qq-cell-4",
          ];
        }
      }

      if (mod.id === IDS.modRenal) {
        mod.lessons.push({
          id: "les-renal-4",
          moduleId: IDS.modRenal,
          title: "Hyponatremia Diagnostic Framework",
          slug: "renal-hyponatremia",
          sequence: 4,
          estimatedMinutes: 40,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-renal-4"],
          concepts: [
            {
              id: "con-renal-4a",
              lessonId: "les-renal-4",
              title: "Tonicity then volume",
              sequence: 1,
              summary:
                "Wrong therapy for hyponatremia comes from skipping classification.",
              blocks: [
                reading(
                  "blk-renal-4a-r",
                  "con-renal-4a",
                  "Hyponatremia algorithm",
                  1,
                  `1. Confirm true hypotonic hyponatremia (exclude hyperglycemia, rare pseudohyponatremia contexts).  
2. Assess volume: hypovolemic / euvolemic / hypervolemic.  
3. Interpret urine Na/osmolality with ADH physiology in mind.  
4. Urgency depends on severe neurologic symptoms — careful controlled correction to avoid osmotic demyelination.

### High-yield patterns
- Hypovolemic + renal losses vs extrarenal  
- Euvolemic → SIADH after cortisol/thyroid exclusion  
- Hypervolemic → CHF, cirrhosis, nephrosis

This course teaches the framework; exact correction rates follow supervised guidelines.`,
                ),
                vignette(
                  "blk-renal-4a-x",
                  "con-renal-4a",
                  "Vignette: Na 118 euvolemic",
                  2,
                  `Walk the algorithm aloud and name three SIADH associations.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) {
          mod.exam.questionIds = [...mod.exam.questionIds, "qq-renal-4"];
        }
      }

      if (mod.id === IDS.modEndo) {
        mod.lessons.push({
          id: "les-endo-3",
          moduleId: IDS.modEndo,
          title: "Thyroid Emergencies",
          slug: "endo-thyroid-emergencies",
          sequence: 3,
          estimatedMinutes: 35,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-endo-3"],
          concepts: [
            {
              id: "con-endo-3a",
              lessonId: "les-endo-3",
              title: "Storm vs myxedema",
              sequence: 1,
              summary:
                "Opposite ends of thyroid dysfunction; both are clinical diagnoses of severity.",
              blocks: [
                reading(
                  "blk-endo-3a-r",
                  "con-endo-3a",
                  "Thyroid crisis map",
                  1,
                  `## Thyroid storm
Severe thyrotoxicosis + systemic decompensation (thermoregulatory, CNS, cardiovascular) often precipitated by infection/surgery. Supportive care + block synthesis/release/peripheral effects in sequenced therapy (institutional protocols).

## Myxedema coma
Profound hypothyroidism with hypothermia, altered mentation, hypoventilation, hyponatremia risk. Supportive care + thyroid hormone replacement under expert guidance.

### Shared teaching point
Labs confirm, but *severity* drives immediate action. Do not wait for a perfect free T4 before recognizing crisis phenotypes.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) {
          mod.exam.questionIds = [...mod.exam.questionIds, "qq-endo-3"];
        }
      }

      if (mod.id === IDS.modIm) {
        mod.lessons.push({
          id: "les-im-3",
          moduleId: IDS.modIm,
          title: "Syncope — Cardiac vs Reflex",
          slug: "im-syncope",
          sequence: 3,
          estimatedMinutes: 35,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-im-3"],
          concepts: [
            {
              id: "con-im-3a",
              lessonId: "les-im-3",
              title: "Problem representation for transient LOC",
              sequence: 1,
              summary:
                "Separate reflex, orthostatic, and cardiac syncope with red-flag filtering.",
              blocks: [
                reading(
                  "blk-im-3a-r",
                  "con-im-3a",
                  "Syncope framework",
                  1,
                  `## Definition
Transient loss of consciousness due to global cerebral hypoperfusion with spontaneous recovery.

## Buckets
- **Reflex (neurally mediated)**: vasovagal, situational  
- **Orthostatic**: volume, autonomic, drugs  
- **Cardiac**: arrhythmia, structural obstruction (AS, HOCM), ischemia

## Red flags
Exertional onset, while supine, family sudden death, known structural disease, abnormal ECG → escalate cardiac evaluation.

Clerkship skill: write a one-sentence problem representation before ordering tests.`,
                ),
                vignette(
                  "blk-im-3a-x",
                  "con-im-3a",
                  "Vignette: syncope on the treadmill",
                  2,
                  `Write the problem representation and list immediate evaluations.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) {
          mod.exam.questionIds = [...mod.exam.questionIds, "qq-im-3"];
        }
      }

      if (mod.id === IDS.modNeuro) {
        mod.lessons.push({
          id: "les-neuro-4",
          moduleId: IDS.modNeuro,
          title: "Seizure vs Syncope & Status Priorities",
          slug: "neuro-seizure-status",
          sequence: 3,
          estimatedMinutes: 35,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-neuro-4"],
          concepts: [
            {
              id: "con-neuro-4a",
              lessonId: "les-neuro-4",
              title: "Phenotype and emergency pathway",
              sequence: 1,
              summary:
                "Convulsive status is a timer-driven emergency; distinguish from syncope mimics.",
              blocks: [
                reading(
                  "blk-neuro-4a-r",
                  "con-neuro-4a",
                  "Seizure emergency map",
                  1,
                  `## Seizure vs syncope clues
Tongue bite (lateral), prolonged confusion, witnessed tonic–clonic activity favor seizure; brief LOC with rapid recovery and prodrome favor syncope — overlap exists.

## Status epilepticus (educational definition)
Prolonged or recurrent seizures without recovery — treat as emergency: ABCs, glucose, benzodiazepines first-line, then longer-acting agents per protocol.

### Safety
Protect airway, do not force objects into the mouth, time the event, and escalate early.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) {
          mod.exam.questionIds = [...mod.exam.questionIds, "qq-neuro-4"];
        }
      }
    }
  }
  return program;
}
