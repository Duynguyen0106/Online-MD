import type {
  ClinicalCase,
  Flashcard,
  Objective,
  Program,
  QbankQuestion,
  QuizQuestion,
} from "@/lib/types/domain";
import { IDS } from "@/lib/curriculum/seed";
import {
  applyDepthExpansions,
  depthClinicalCases,
  depthFlashcards,
  depthObjectives,
  depthQbankQuestions,
  depthQuizQuestions,
} from "@/lib/curriculum/expansions-depth";

export {
  depthClinicalCases,
  depthFlashcards,
  depthObjectives,
  depthQbankQuestions,
  depthQuizQuestions,
};

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
  {
    id: "obj-neuro-3",
    code: "OBJ-P1-NEURO-003",
    statement: "Localize stroke syndromes using vascular territory patterns.",
    usmleStep: "step1",
    organSystem: "Nervous System",
    physicianTask: "Diagnosis",
    contentCategory: "Neuroscience",
    moduleId: IDS.modNeuro,
    lessonIds: ["les-neuro-3"],
  },
  {
    id: "obj-heme-2",
    code: "OBJ-P1-HEME-002",
    statement: "Distinguish intrinsic vs extrinsic coagulation pathway defects clinically.",
    usmleStep: "step1",
    organSystem: "Hematopoietic / Lymphoreticular",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modHeme,
    lessonIds: ["les-heme-2"],
  },
  {
    id: "obj-psych-2",
    code: "OBJ-P2-PSY-002",
    statement: "Differentiate mania, hypomania, and mixed features in mood disorders.",
    usmleStep: "step2ck",
    organSystem: "Behavioral Health",
    physicianTask: "Diagnosis",
    contentCategory: "Psychiatry",
    moduleId: IDS.modPsych,
    lessonIds: ["les-psych-2"],
  },
  {
    id: "obj-surg-2",
    code: "OBJ-P2-SURG-002",
    statement: "Prioritize evaluation of the acute abdomen by peritonitis vs obstruction patterns.",
    usmleStep: "step2ck",
    organSystem: "Gastrointestinal",
    physicianTask: "Diagnosis",
    contentCategory: "Surgery",
    moduleId: IDS.modSurg,
    lessonIds: ["les-surg-2"],
  },
  {
    id: "obj-id-2",
    code: "OBJ-P1-ID-002",
    statement: "Choose empiric coverage logic for sepsis source control thinking.",
    usmleStep: "step1",
    organSystem: "Multisystem",
    physicianTask: "Management",
    contentCategory: "Microbiology",
    moduleId: IDS.modId,
    lessonIds: ["les-id-2"],
  },
  {
    id: "obj-peds-2",
    code: "OBJ-P2-PEDS-002",
    statement: "Apply age-based vaccine and anticipatory guidance frameworks.",
    usmleStep: "step2ck",
    organSystem: "Multisystem",
    physicianTask: "Management",
    contentCategory: "Pediatrics",
    moduleId: IDS.modPeds,
    lessonIds: ["les-peds-2"],
  },
  {
    id: "obj-obgyn-2",
    code: "OBJ-P2-OB-002",
    statement: "Recognize preeclampsia warning signs and initial stabilization priorities.",
    usmleStep: "step2ck",
    organSystem: "Reproductive",
    physicianTask: "Diagnosis",
    contentCategory: "Obstetrics & Gynecology",
    moduleId: IDS.modObgyn,
    lessonIds: ["les-obgyn-2"],
  },
  {
    id: "obj-msk-2",
    code: "OBJ-P1-MSK-002",
    statement: "Differentiate septic arthritis from crystal arthropathy using synovial fluid logic.",
    usmleStep: "step1",
    organSystem: "Musculoskeletal",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modMsk,
    lessonIds: ["les-msk-2"],
  },
  {
    id: "obj-fm-2",
    code: "OBJ-P2-FM-002",
    statement: "Apply shared-decision framing to common adult preventive screening discussions.",
    usmleStep: "step2ck",
    organSystem: "Multisystem",
    physicianTask: "Management",
    contentCategory: "Family Medicine",
    moduleId: IDS.modFm,
    lessonIds: ["les-fm-2"],
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
  {
    id: "qq-neuro-3",
    lessonId: "les-neuro-3",
    sequence: 1,
    objectiveId: "obj-neuro-3",
    stem: "Sudden right face/arm weakness with aphasia most suggests occlusion in which territory?",
    choices: [
      { id: "qq-neuro-3-c0", text: "Left MCA superior/perisylvian language regions" },
      { id: "qq-neuro-3-c1", text: "Right PCA occipital pole only" },
      { id: "qq-neuro-3-c2", text: "Anterior spinal artery" },
      { id: "qq-neuro-3-c3", text: "Bilateral ACA watershed exclusively" },
    ],
    correctChoiceId: "qq-neuro-3-c0",
    explanation:
      "Dominant (usually left) MCA lesions produce contralateral face/arm weakness with aphasia.",
  },
  {
    id: "qq-heme-2",
    lessonId: "les-heme-2",
    sequence: 1,
    objectiveId: "obj-heme-2",
    stem: "Isolated prolonged PTT that corrects with mixing, with normal PT, suggests deficiency of:",
    choices: [
      { id: "qq-heme-2-c0", text: "An intrinsic pathway factor (e.g., VIII, IX, XI)" },
      { id: "qq-heme-2-c1", text: "Factor VII alone" },
      { id: "qq-heme-2-c2", text: "Fibrinogen only" },
      { id: "qq-heme-2-c3", text: "Vitamin K–dependent factor VII exclusively without PTT change" },
    ],
    correctChoiceId: "qq-heme-2-c0",
    explanation:
      "Intrinsic pathway defects prolong PTT; mixing correction implies factor deficiency rather than inhibitor.",
  },
  {
    id: "qq-psych-2",
    lessonId: "les-psych-2",
    sequence: 1,
    objectiveId: "obj-psych-2",
    stem: "A 5-day episode of elevated mood, decreased need for sleep, and grandiose plans causing job loss is best classified as:",
    choices: [
      { id: "qq-psych-2-c0", text: "Manic episode (functional impairment / severity)" },
      { id: "qq-psych-2-c1", text: "Hypomania without impairment by definition" },
      { id: "qq-psych-2-c2", text: "Major depression with seasonal pattern only" },
      { id: "qq-psych-2-c3", text: "Brief psychotic disorder without mood findings" },
    ],
    correctChoiceId: "qq-psych-2-c0",
    explanation:
      "Mania includes marked impairment or hospitalization; hypomania is milder without major impairment.",
  },
  {
    id: "qq-surg-2",
    lessonId: "les-surg-2",
    sequence: 1,
    objectiveId: "obj-surg-2",
    stem: "Diffuse peritonitis after sudden-onset severe abdominal pain most urgently raises concern for:",
    choices: [
      { id: "qq-surg-2-c0", text: "Hollow viscus perforation until proven otherwise" },
      { id: "qq-surg-2-c1", text: "Uncomplicated viral gastroenteritis" },
      { id: "qq-surg-2-c2", text: "Constipation alone" },
      { id: "qq-surg-2-c3", text: "Stable inguinal hernia without incarceration risk" },
    ],
    correctChoiceId: "qq-surg-2-c0",
    explanation:
      "Sudden severe pain with peritonitis is a surgical emergency differential led by perforation.",
  },
  {
    id: "qq-id-2",
    lessonId: "les-id-2",
    sequence: 1,
    objectiveId: "obj-id-2",
    stem: "In suspected bacterial sepsis, the earliest management priority after ABCs is:",
    choices: [
      { id: "qq-id-2-c0", text: "Obtain cultures promptly and start timely empiric antibiotics" },
      { id: "qq-id-2-c1", text: "Wait 24h for culture finalization before any antibiotics" },
      { id: "qq-id-2-c2", text: "Start antifungals for all adults first-line" },
      { id: "qq-id-2-c3", text: "Avoid fluids in hypotensive septic patients" },
    ],
    correctChoiceId: "qq-id-2-c0",
    explanation:
      "Sepsis care prioritizes rapid cultures (when they do not delay therapy) and early empiric antimicrobials with resuscitation.",
  },
  {
    id: "qq-peds-2",
    lessonId: "les-peds-2",
    sequence: 1,
    objectiveId: "obj-peds-2",
    stem: "A well 2-month-old at a routine visit should receive counseling that emphasizes:",
    choices: [
      {
        id: "qq-peds-2-c0",
        text: "Age-appropriate immunizations and anticipatory safety guidance",
      },
      { id: "qq-peds-2-c1", text: "Skipping vaccines if the child looks well" },
      { id: "qq-peds-2-c2", text: "Adult tetanus schedule only" },
      { id: "qq-peds-2-c3", text: "No car seat until age 2" },
    ],
    correctChoiceId: "qq-peds-2-c0",
    explanation:
      "Well-child visits center prevention: vaccines on schedule plus age-specific safety counseling.",
  },
  {
    id: "qq-obgyn-2",
    lessonId: "les-obgyn-2",
    sequence: 1,
    objectiveId: "obj-obgyn-2",
    stem: "A pregnant patient at 34 weeks with severe headache, visual changes, and BP 168/110 most urgently suggests:",
    choices: [
      { id: "qq-obgyn-2-c0", text: "Preeclampsia with severe features — stabilize and obstetric escalation" },
      { id: "qq-obgyn-2-c1", text: "Uncomplicated migraine; discharge without evaluation" },
      { id: "qq-obgyn-2-c2", text: "Normal third-trimester physiology alone" },
      { id: "qq-obgyn-2-c3", text: "Primary hyperthyroidism as the only diagnosis" },
    ],
    correctChoiceId: "qq-obgyn-2-c0",
    explanation:
      "Severe-range BP with neurologic symptoms in pregnancy is preeclampsia with severe features until proven otherwise.",
  },
  {
    id: "qq-msk-2",
    lessonId: "les-msk-2",
    sequence: 1,
    objectiveId: "obj-msk-2",
    stem: "Acute monoarthritis of the knee; synovial WBC 80,000 with neutrophils. Next priority?",
    choices: [
      { id: "qq-msk-2-c0", text: "Treat as septic arthritis until excluded (aspirate/culture/urgent care)" },
      { id: "qq-msk-2-c1", text: "Assume gout and delay aspiration indefinitely" },
      { id: "qq-msk-2-c2", text: "Start only oral antihistamines" },
      { id: "qq-msk-2-c3", text: "Ignore because OA never needs arthrocentesis" },
    ],
    correctChoiceId: "qq-msk-2-c0",
    explanation:
      "Hot monoarthritis with inflammatory fluid is septic arthritis until proven otherwise.",
  },
  {
    id: "qq-fm-2",
    lessonId: "les-fm-2",
    sequence: 1,
    objectiveId: "obj-fm-2",
    stem: "When counseling an average-risk adult about a screening test, the best first step is:",
    choices: [
      {
        id: "qq-fm-2-c0",
        text: "Clarify benefits, harms, and patient values before ordering",
      },
      { id: "qq-fm-2-c1", text: "Order every available screening test at once" },
      { id: "qq-fm-2-c2", text: "Refuse all screening indefinitely" },
      { id: "qq-fm-2-c3", text: "Use only social media anecdotes as evidence" },
    ],
    correctChoiceId: "qq-fm-2-c0",
    explanation:
      "Prevention counseling is shared decision-making: benefits, harms, alternatives, and values.",
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
  {
    id: "fc-12",
    lessonId: "les-neuro-3",
    front: "Aphasia + right face/arm weakness territory?",
    back: "Usually left MCA language cortex / superior division territory.",
    objectiveId: "obj-neuro-3",
  },
  {
    id: "fc-13",
    lessonId: "les-heme-2",
    front: "Isolated ↑PTT that corrects on mixing?",
    back: "Intrinsic pathway factor deficiency (VIII/IX/XI…).",
    objectiveId: "obj-heme-2",
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
  {
    id: "case-surg-1",
    moduleId: IDS.modSurg,
    title: "Sudden Severe Abdominal Pain",
    presentationMd:
      "45-year-old with sudden-onset diffuse abdominal pain, board-like rigidity, and absent bowel sounds. HR 120, BP 95/60. Upright CXR pending.",
    stages: [
      {
        id: "s1",
        prompt: "What is your leading diagnosis category and why?",
        expectedFocus: "Perforated viscus / peritonitis — rigid abdomen, systemic signs",
      },
      {
        id: "s2",
        prompt: "List resuscitation and surgical priorities before imaging delays care.",
        expectedFocus: "ABCs, IV access, fluids, broad antibiotics, surgical consult, avoid delaying OR for unstable peritonitis",
      },
    ],
    teachingPoints:
      "Diffuse peritonitis is a surgical emergency. Resuscitate in parallel with definitive source control planning.",
    objectiveIds: ["obj-surg-2"],
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
  applyDepthExpansions(program);
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

      if (mod.id === IDS.modNeuro) {
        mod.lessons.push({
          id: "les-neuro-3",
          moduleId: IDS.modNeuro,
          title: "Stroke Localization by Territory",
          slug: "neuro-stroke",
          sequence: 2,
          estimatedMinutes: 35,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-neuro-3"],
          concepts: [
            {
              id: "con-neuro-3a",
              lessonId: "les-neuro-3",
              title: "MCA / ACA / PCA patterns",
              sequence: 1,
              summary: "Map deficits to arterial territories before imaging details.",
              blocks: [
                reading(
                  "blk-neuro-3a-r",
                  "con-neuro-3a",
                  "Vascular localization",
                  1,
                  `## High-yield territories
- **MCA**: face/arm > leg; aphasia (dominant) or neglect (non-dominant)
- **ACA**: contralateral leg weakness, frontal behavioral changes
- **PCA**: visual field cuts, alexia without agraphia (classic variants)

Always pair localization with time-last-known-well reasoning for reperfusion eligibility (clerkship/Step 2 overlap).`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, "qq-neuro-3"];
      }

      if (mod.id === IDS.modHeme) {
        mod.lessons.push({
          id: "les-heme-2",
          moduleId: IDS.modHeme,
          title: "Coagulation Pathways Clinically",
          slug: "heme-coag",
          sequence: 2,
          estimatedMinutes: 30,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-heme-2"],
          concepts: [
            {
              id: "con-heme-2a",
              lessonId: "les-heme-2",
              title: "PT, PTT, and mixing studies",
              sequence: 1,
              summary: "Use screening assays to place defects on the cascade map.",
              blocks: [
                reading(
                  "blk-heme-2a-r",
                  "con-heme-2a",
                  "Coag screen logic",
                  1,
                  `PT ≈ extrinsic (VII) + common pathway. PTT ≈ intrinsic (XII, XI, IX, VIII) + common.  
Mixing study: corrects → deficiency; fails to correct → inhibitor (e.g., lupus anticoagulant, factor VIII inhibitor patterns differ clinically).`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, "qq-heme-2"];
      }

      if (mod.id === IDS.modPsych) {
        mod.lessons.push({
          id: "les-psych-2",
          moduleId: IDS.modPsych,
          title: "Bipolar Spectrum — Mania vs Hypomania",
          slug: "psych-bipolar",
          sequence: 2,
          estimatedMinutes: 30,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-psych-2"],
          concepts: [
            {
              id: "con-psych-2a",
              lessonId: "les-psych-2",
              title: "Severity and impairment thresholds",
              sequence: 1,
              summary: "Duration + impairment/hospitalization separate mania from hypomania.",
              blocks: [
                reading(
                  "blk-psych-2a-r",
                  "con-psych-2a",
                  "Mood elevation framework",
                  1,
                  `Mania: elevated/irritable mood + energy, ≥1 week (or any duration if hospitalized), marked impairment or psychosis.  
Hypomania: similar symptoms, shorter/milder, observable change without major impairment.  
Always assess safety, substances, and medical mimics.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, "qq-psych-2"];
      }

      if (mod.id === IDS.modSurg) {
        mod.lessons.push({
          id: "les-surg-2",
          moduleId: IDS.modSurg,
          title: "Acute Abdomen Patterns",
          slug: "surg-abdomen",
          sequence: 2,
          estimatedMinutes: 35,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-surg-2"],
          concepts: [
            {
              id: "con-surg-2a",
              lessonId: "les-surg-2",
              title: "Peritonitis vs obstruction vs ischemia",
              sequence: 1,
              summary: "Pattern recognition drives urgency more than a single lab value.",
              blocks: [
                reading(
                  "blk-surg-2a-r",
                  "con-surg-2a",
                  "Surgical abdomen map",
                  1,
                  `**Peritonitis**: rigid, rebound, silent abdomen → perforation/contamination until proven otherwise.  
**Obstruction**: colicky pain, distension, vomiting, obstipation.  
**Mesenteric ischemia**: pain out of proportion; respect lactate/acidosis but do not wait on a single normal value.

Resuscitate while arranging definitive imaging/OR — do not serial-exam an unstable acute abdomen forever.`,
                ),
                vignette(
                  "blk-surg-2a-x",
                  "con-surg-2a",
                  "Vignette: board-like abdomen",
                  2,
                  `List your top 3 diagnoses and the first 5 actions in parallel.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, "qq-surg-2"];
      }

      if (mod.id === IDS.modId) {
        mod.lessons.push({
          id: "les-id-2",
          moduleId: IDS.modId,
          title: "Sepsis Recognition & Empiric Logic",
          slug: "id-sepsis",
          sequence: 2,
          estimatedMinutes: 30,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-id-2"],
          concepts: [
            {
              id: "con-id-2a",
              lessonId: "les-id-2",
              title: "Source, severity, spectrum",
              sequence: 1,
              summary: "Resuscitate, culture, cover likely pathogens, control source.",
              blocks: [
                reading(
                  "blk-id-2a-r",
                  "con-id-2a",
                  "Sepsis bedside framework",
                  1,
                  `Think in parallel: ABCs/perfusion → cultures without delaying drugs → empiric antibiotics matched to suspected source and local resistance → source control.  
Narrow therapy when microbiology returns. Educational goal is reasoning, not memorizing one hospital antibiogram.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, "qq-id-2"];
      }

      if (mod.id === IDS.modPeds) {
        mod.lessons.push({
          id: "les-peds-2",
          moduleId: IDS.modPeds,
          title: "Well-Child Prevention Visit",
          slug: "peds-prevention",
          sequence: 2,
          estimatedMinutes: 25,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-peds-2"],
          concepts: [
            {
              id: "con-peds-2a",
              lessonId: "les-peds-2",
              title: "Vaccines and anticipatory guidance",
              sequence: 1,
              summary: "Prevention is the core of outpatient pediatrics clerkship thinking.",
              blocks: [
                reading(
                  "blk-peds-2a-r",
                  "con-peds-2a",
                  "Prevention visit map",
                  1,
                  `Pair growth/development surveillance with immunization review and age-specific safety (sleep, car seats, choking, screens).  
Document parental concerns and follow national schedule frameworks rather than inventing catch-up plans from memory under pressure.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, "qq-peds-2"];
      }

      if (mod.id === IDS.modObgyn) {
        mod.lessons.push({
          id: "les-obgyn-2",
          moduleId: IDS.modObgyn,
          title: "Preeclampsia Warning Signs",
          slug: "obgyn-preeclampsia",
          sequence: 2,
          estimatedMinutes: 30,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-obgyn-2"],
          concepts: [
            {
              id: "con-obgyn-2a",
              lessonId: "les-obgyn-2",
              title: "Recognition and initial priorities",
              sequence: 1,
              summary: "Hypertension plus end-organ clues drive urgency in pregnancy.",
              blocks: [
                reading(
                  "blk-obgyn-2a-r",
                  "con-obgyn-2a",
                  "Preeclampsia framework",
                  1,
                  `After 20 weeks: new hypertension + proteinuria or end-organ dysfunction.  
Severe features include severe-range BP, neurologic symptoms, pulmonary edema, hepatic/renal injury, thrombocytopenia.  
Educational priorities: recognize, stabilize mother, involve obstetrics early — exact delivery timing follows guidelines/gestational age.`,
                ),
                vignette(
                  "blk-obgyn-2a-x",
                  "con-obgyn-2a",
                  "Vignette: headache and visual changes at 34w",
                  2,
                  `List red flags, first bedside actions, and what you communicate to obstetrics.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, "qq-obgyn-2"];
      }

      if (mod.id === IDS.modMsk) {
        mod.lessons.push({
          id: "les-msk-2",
          moduleId: IDS.modMsk,
          title: "Hot Joint — Septic vs Crystal",
          slug: "msk-septic-joint",
          sequence: 2,
          estimatedMinutes: 30,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-msk-2"],
          concepts: [
            {
              id: "con-msk-2a",
              lessonId: "les-msk-2",
              title: "Synovial fluid decision tree",
              sequence: 1,
              summary: "Never miss septic arthritis in acute monoarthritis.",
              blocks: [
                reading(
                  "blk-msk-2a-r",
                  "con-msk-2a",
                  "Monoarthritis algorithm",
                  1,
                  `Acute hot joint → aspirate when feasible. High WBC with PMNs → treat as infection until cultures/clinical course say otherwise.  
Crystals (gout/CPPD) can coexist with infection — crystals alone do not exclude septic arthritis.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, "qq-msk-2"];
      }

      if (mod.id === IDS.modFm) {
        mod.lessons.push({
          id: "les-fm-2",
          moduleId: IDS.modFm,
          title: "Shared Decisions in Screening",
          slug: "fm-screening",
          sequence: 2,
          estimatedMinutes: 25,
          status: "published",
          quizPassThreshold: 0.8,
          quizQuestionIds: ["qq-fm-2"],
          concepts: [
            {
              id: "con-fm-2a",
              lessonId: "les-fm-2",
              title: "Benefits, harms, values",
              sequence: 1,
              summary: "Prevention visits are conversations, not checklists alone.",
              blocks: [
                reading(
                  "blk-fm-2a-r",
                  "con-fm-2a",
                  "Screening counseling map",
                  1,
                  `State the target condition, test performance in plain language, downstream consequences of positives, and reasonable alternatives.  
Anchor to guideline families (e.g., USPSTF-style reasoning) while adapting to comorbidity and patient priorities.`,
                ),
                vignette(
                  "blk-fm-2a-x",
                  "con-fm-2a",
                  "Vignette: 52-year-old asking about cancer screening",
                  2,
                  `Outline a 2-minute shared-decision script: benefit, harm, uncertainty, next step.`,
                ),
              ],
            },
          ],
        });
        if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, "qq-fm-2"];
      }
    }
  }
  return program;
}
