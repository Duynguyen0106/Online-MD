import type {
  ClinicalCase,
  Flashcard,
  Objective,
  Program,
  QbankQuestion,
  QuizQuestion,
} from "@/lib/types/domain";
import { IDS } from "@/lib/curriculum/seed";

/** Additional original educational content layered onto the base seed. */
export const extraObjectives: Objective[] = [
  {
    id: "obj-endo-2",
    code: "OBJ-P1-ENDO-002",
    statement:
      "Differentiate DKA vs HHS using osmolarity, ketones, and volume status.",
    usmleStep: "step1",
    organSystem: "Endocrine",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modEndo,
    lessonIds: ["les-endo-2"],
  },
  {
    id: "obj-renal-3",
    code: "OBJ-P1-REN-003",
    statement: "Apply Winters formula and anion gap logic to mixed acid–base disorders.",
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Diagnosis",
    contentCategory: "Physiology",
    moduleId: IDS.modRenal,
    lessonIds: ["les-renal-3"],
  },
  {
    id: "obj-im-2",
    code: "OBJ-P2-IM-002",
    statement: "Risk-stratify chest pain and choose initial ACS workup priorities.",
    usmleStep: "step2ck",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Internal Medicine",
    moduleId: IDS.modIm,
    lessonIds: ["les-im-2"],
  },
];

export const extraQuizQuestions: QuizQuestion[] = [
  {
    id: "qq-endo-2",
    lessonId: "les-endo-2",
    sequence: 1,
    objectiveId: "obj-endo-2",
    stem: "A patient with glucose 900 mg/dL, minimal ketones, and serum osmolality 340 mOsm/kg is most consistent with:",
    choices: [
      { id: "qq-endo-2-c0", text: "Hyperosmolar hyperglycemic state (HHS)" },
      { id: "qq-endo-2-c1", text: "Classic DKA with high anion-gap ketosis" },
      { id: "qq-endo-2-c2", text: "Isolated SIADH" },
      { id: "qq-endo-2-c3", text: "Primary adrenal insufficiency only" },
    ],
    correctChoiceId: "qq-endo-2-c0",
    explanation:
      "HHS features marked hyperglycemia and hyperosmolality with absent/minimal ketosis; DKA has prominent ketoacidosis.",
  },
  {
    id: "qq-renal-3",
    lessonId: "les-renal-3",
    sequence: 1,
    objectiveId: "obj-renal-3",
    stem: "In metabolic acidosis, Winters formula estimates expected compensatory PCO2. A PCO2 much higher than predicted suggests:",
    choices: [
      {
        id: "qq-renal-3-c0",
        text: "Coexisting respiratory acidosis",
      },
      { id: "qq-renal-3-c1", text: "Pure respiratory alkalosis only" },
      { id: "qq-renal-3-c2", text: "Mandatory metabolic alkalosis" },
      { id: "qq-renal-3-c3", text: "Normal compensation by definition" },
    ],
    correctChoiceId: "qq-renal-3-c0",
    explanation:
      "If PCO2 is higher than Winters prediction, ventilation is inadequate → additional respiratory acidosis.",
  },
  {
    id: "qq-im-2",
    lessonId: "les-im-2",
    sequence: 1,
    objectiveId: "obj-im-2",
    stem: "First priorities for suspected ACS in a stable adult typically include:",
    choices: [
      {
        id: "qq-im-2-c0",
        text: "ECG, aspirin (if no contraindication), and troponin-based pathway",
      },
      { id: "qq-im-2-c1", text: "Immediate elective stress MRI before ECG" },
      { id: "qq-im-2-c2", text: "Discharge without ECG if pain resolved for 5 minutes" },
      { id: "qq-im-2-c3", text: "Empiric thrombolysis for all chest pain" },
    ],
    correctChoiceId: "qq-im-2-c0",
    explanation:
      "Rapid ECG + antiplatelet (when appropriate) + biomarker pathway guide STEMI vs NSTE-ACS decisions.",
  },
];

export const extraQbankQuestions: QbankQuestion[] = [
  {
    id: "qb-4",
    usmleStep: "step1",
    moduleId: IDS.modEndo,
    stem: "Which laboratory pattern best separates DKA from HHS?",
    choices: [
      { id: "qb-4-c0", text: "Prominent ketonemia/acidosis in DKA; extreme hyperosmolality in HHS" },
      { id: "qb-4-c1", text: "Normal glucose in both" },
      { id: "qb-4-c2", text: "Low TSH defining both syndromes" },
      { id: "qb-4-c3", text: "Hyperkalemia only in HHS by definition" },
    ],
    correctChoiceId: "qb-4-c0",
    explanation:
      "DKA is ketoacidotic; HHS is dominated by hyperosmolar hyperglycemia with little ketosis.",
    organSystem: "Endocrine",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    objectiveId: "obj-endo-2",
    difficulty: 2,
  },
  {
    id: "qb-5",
    usmleStep: "step2ck",
    moduleId: IDS.modIm,
    stem: "A 58-year-old with exertional pressure and new T-wave inversions has rising troponin without ST elevation. Best next categorization?",
    choices: [
      { id: "qb-5-c0", text: "NSTE-ACS (NSTEMI) with guideline-directed anti-ischemic care" },
      { id: "qb-5-c1", text: "Unstable angina because ST elevation is absent" },
      { id: "qb-5-c2", text: "STEMI requiring immediate fibrinolytics in all PCI centers" },
      { id: "qb-5-c3", text: "Noncardiac pain if chest wall tenderness is present" },
    ],
    correctChoiceId: "qb-5-c0",
    explanation:
      "Troponin-positive ischemia without STEMI criteria is NSTEMI within NSTE-ACS.",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Internal Medicine",
    objectiveId: "obj-im-2",
    difficulty: 2,
  },
];

export const extraFlashcards: Flashcard[] = [
  {
    id: "fc-9",
    lessonId: "les-endo-2",
    front: "DKA vs HHS — key separator?",
    back: "DKA: ketones + acidosis; HHS: extreme hyperosmolality, minimal ketones.",
    objectiveId: "obj-endo-2",
  },
  {
    id: "fc-10",
    lessonId: "les-renal-3",
    front: "Winters formula purpose?",
    back: "Predict expected PCO2 compensation in metabolic acidosis; mismatch ⇒ mixed disorder.",
    objectiveId: "obj-renal-3",
  },
  {
    id: "fc-11",
    lessonId: "les-im-2",
    front: "First tests in suspected ACS?",
    back: "ECG immediately; aspirin if appropriate; troponin pathway.",
    objectiveId: "obj-im-2",
  },
];

export const extraClinicalCases: ClinicalCase[] = [
  {
    id: "case-endo-1",
    moduleId: IDS.modEndo,
    title: "Polyuria, Polydipsia, and Altered Mentation",
    presentationMd:
      "72-year-old with T2DM, missed oral meds during gastroenteritis. Glucose 920 mg/dL, Na 148, bicarbonate 22, small serum ketones, measured osmolality 335. Dry mucous membranes; lethargic.",
    stages: [
      {
        id: "e1",
        prompt: "Is this closer to DKA or HHS, and which labs drive your call?",
        expectedFocus: "HHS — marked hyperosmolality, minimal ketosis",
      },
      {
        id: "e2",
        prompt: "Outline initial management priorities (ABCs, fluids, electrolytes, insulin timing).",
        expectedFocus: "Volume first, correct K carefully, insulin after adequate K",
      },
    ],
    teachingPoints:
      "HHS is a hyperosmolar emergency; fluid resuscitation precedes insulin, and potassium must be watched closely.",
    objectiveIds: ["obj-endo-2"],
    status: "published",
  },
  {
    id: "case-im-1",
    moduleId: IDS.modIm,
    title: "Exertional Chest Pressure on the Wards",
    presentationMd:
      "61-year-old with diabetes and hypertension develops substernal pressure at rest lasting 25 minutes. ECG: new T inversions laterally. Troponin rising. No ST elevations.",
    stages: [
      {
        id: "i1",
        prompt: "Classify the ACS phenotype and list immediate orders.",
        expectedFocus: "NSTEMI / NSTE-ACS; ECG, ASA, anticoagulation per pathway, anti-ischemic care",
      },
      {
        id: "i2",
        prompt: "What findings would convert this to a STEMI-equivalent pathway?",
        expectedFocus: "ST elevation, new LBBB meeting criteria, posterior MI equivalents, ongoing instability",
      },
    ],
    teachingPoints:
      "Troponin-positive ischemia without STEMI criteria is NSTEMI; stabilize and risk-stratify for invasive strategy timing.",
    objectiveIds: ["obj-im-2"],
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

/** Mutates a cloned program by appending new lessons to existing modules. */
export function applyCurriculumExpansions(program: Program): Program {
  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      if (mod.id === IDS.modEndo) {
        mod.lessons.push({
          id: "les-endo-2",
          moduleId: IDS.modEndo,
          title: "DKA & Hyperosmolar States",
          slug: "endo-dka-hhs",
          sequence: 2,
          estimatedMinutes: 35,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-endo-2"],
          concepts: [
            {
              id: "con-endo-2a",
              lessonId: "les-endo-2",
              title: "DKA vs HHS mechanisms",
              sequence: 1,
              summary:
                "Insulin deficiency/resistance plus counter-regulatory hormones drive hyperglycemia; ketogenesis distinguishes DKA.",
              blocks: [
                reading(
                  "blk-endo-2a-r",
                  "con-endo-2a",
                  "Hyperglycemic crises",
                  1,
                  `## Shared drivers
Relative/absolute insulin deficiency + glucagon/catecholamines/cortisol → hyperglycemia, osmotic diuresis, volume depletion.

## DKA
Lipolysis → free fatty acids → hepatic ketogenesis → anion-gap metabolic acidosis. Often younger/T1DM, but can occur in T2DM.

## HHS
Severe hyperglycemia and hyperosmolality with **minimal ketosis**; neurologic changes common; typically older T2DM with infection/missed meds.

### Management skeleton (education, not a protocol)
ABCs → aggressive isotonic fluids → monitor/replace K → insulin after K is safe → treat precipitant. Exact protocols follow institutional/guideline pathways.`,
                ),
                vignette(
                  "blk-endo-2a-x",
                  "con-endo-2a",
                  "Vignette: glucose 900",
                  2,
                  `Elderly patient, glucose 900, bicarb near normal, small ketones, osmolality 335. Name the syndrome and the first physiologic priority (volume).`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) {
          mod.exam.questionIds = [...mod.exam.questionIds, "qq-endo-2"];
        }
      }

      if (mod.id === IDS.modRenal) {
        mod.lessons.push({
          id: "les-renal-3",
          moduleId: IDS.modRenal,
          title: "Acid–Base Disorder Framework",
          slug: "renal-acid-base",
          sequence: 3,
          estimatedMinutes: 40,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-renal-3"],
          concepts: [
            {
              id: "con-renal-3a",
              lessonId: "les-renal-3",
              title: "Steps in acid–base analysis",
              sequence: 1,
              summary:
                "pH → primary process → anion gap → compensation check → hidden disorders.",
              blocks: [
                reading(
                  "blk-renal-3a-r",
                  "con-renal-3a",
                  "Acid–base algorithm",
                  1,
                  `1. Look at pH (acidemia/alkalemia).  
2. Identify primary metabolic vs respiratory process using HCO3 and PCO2.  
3. Calculate anion gap (Na − (Cl + HCO3)); consider albumin correction.  
4. Check compensation (Winters for metabolic acidosis).  
5. If compensation is off, diagnose a **mixed** disorder.

Gold mark / delta gap methods help uncover metabolic alkalosis hiding beside HAGMA.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) {
          mod.exam.questionIds = [...mod.exam.questionIds, "qq-renal-3"];
        }
      }

      if (mod.id === IDS.modIm) {
        mod.lessons.push({
          id: "les-im-2",
          moduleId: IDS.modIm,
          title: "Chest Pain & ACS Reasoning",
          slug: "im-acs",
          sequence: 2,
          estimatedMinutes: 40,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-im-2"],
          concepts: [
            {
              id: "con-im-2a",
              lessonId: "les-im-2",
              title: "ACS spectrum on the wards",
              sequence: 1,
              summary:
                "History + ECG + troponin classify STEMI vs NSTE-ACS and drive timing of reperfusion.",
              blocks: [
                reading(
                  "blk-im-2a-r",
                  "con-im-2a",
                  "Clerkship ACS map",
                  1,
                  `## Immediate moves
ECG within minutes, ABCs, aspirin unless contraindicated, risk stratification.

## Phenotypes
- STEMI / equivalent → emergent reperfusion pathway  
- NSTEMI → troponin(+), no STEMI criteria  
- Unstable angina → ischemia without biomarker rise

Online clerkship goal: practice *problem representation* and order-set reasoning, not memorize one hospital’s order set.`,
                ),
                vignette(
                  "blk-im-2a-x",
                  "con-im-2a",
                  "Vignette: T-wave inversions + rising troponin",
                  2,
                  `Classify the syndrome and list three orders you place in the first 15 minutes.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) {
          mod.exam.questionIds = [...mod.exam.questionIds, "qq-im-2"];
        }
      }
    }
  }
  return program;
}
