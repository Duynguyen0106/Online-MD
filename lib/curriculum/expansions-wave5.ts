import type {
  ClinicalCase,
  Flashcard,
  Objective,
  Program,
  QbankQuestion,
  QuizQuestion,
} from "@/lib/types/domain";
import { IDS } from "@/lib/curriculum/seed";

/** Fifth-wave original content — deepen thinner modules with accurate frameworks. */

export const wave5Objectives: Objective[] = [
  {
    id: "obj-msk-4",
    code: "OBJ-P1-MSK-004",
    statement:
      "Differentiate gout from septic arthritis and CPPD using synovial fluid logic.",
    usmleStep: "step1",
    organSystem: "Musculoskeletal",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modMsk,
    lessonIds: ["les-msk-4"],
  },
  {
    id: "obj-msk-5",
    code: "OBJ-P1-MSK-005",
    statement:
      "Recognize compartment syndrome using the 6 P framework and urgency of fasciotomy pathway.",
    usmleStep: "step2ck",
    organSystem: "Musculoskeletal",
    physicianTask: "Diagnosis",
    contentCategory: "Surgery",
    moduleId: IDS.modMsk,
    lessonIds: ["les-msk-5"],
  },
  {
    id: "obj-endo-5",
    code: "OBJ-P1-ENDO-005",
    statement:
      "Interpret hypercalcemia using PTH-dependent vs PTH-independent frameworks.",
    usmleStep: "step1",
    organSystem: "Endocrine",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modEndo,
    lessonIds: ["les-endo-5"],
  },
  {
    id: "obj-gi-6",
    code: "OBJ-P1-GI-006",
    statement:
      "Contrast Crohn disease and ulcerative colitis by distribution and transmurality.",
    usmleStep: "step1",
    organSystem: "Gastrointestinal",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modGi,
    lessonIds: ["les-gi-6"],
  },
  {
    id: "obj-neuro-6",
    code: "OBJ-P1-NEURO-006",
    statement:
      "Link elevated ICP signs to herniation syndromes and immediate management priorities.",
    usmleStep: "step1",
    organSystem: "Nervous System",
    physicianTask: "Management",
    contentCategory: "Neuroscience",
    moduleId: IDS.modNeuro,
    lessonIds: ["les-neuro-6"],
  },
  {
    id: "obj-heme-5",
    code: "OBJ-P1-HEME-005",
    statement:
      "Recognize acute transfusion reactions by timing and stop-the-transfusion priority.",
    usmleStep: "step1",
    organSystem: "Hematopoietic / Lymphoreticular",
    physicianTask: "Management",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modHeme,
    lessonIds: ["les-heme-5"],
  },
  {
    id: "obj-psych-5",
    code: "OBJ-P2-PSY-005",
    statement:
      "Diagnose major depression and outline first-line treatment + safety monitoring principles.",
    usmleStep: "step2ck",
    organSystem: "Behavioral Health",
    physicianTask: "Management",
    contentCategory: "Psychiatry",
    moduleId: IDS.modPsych,
    lessonIds: ["les-psych-5"],
  },
  {
    id: "obj-psych-6",
    code: "OBJ-P2-PSY-006",
    statement:
      "Differentiate alcohol withdrawal severity and benzodiazepine pathway urgency.",
    usmleStep: "step2ck",
    organSystem: "Behavioral Health",
    physicianTask: "Management",
    contentCategory: "Psychiatry",
    moduleId: IDS.modPsych,
    lessonIds: ["les-psych-6"],
  },
  {
    id: "obj-renal-6",
    code: "OBJ-P1-REN-006",
    statement:
      "Stage CKD by GFR categories and name key complications to monitor.",
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modRenal,
    lessonIds: ["les-renal-6"],
  },
  {
    id: "obj-cv-8",
    code: "OBJ-P1-CV-008",
    statement:
      "Explain atherosclerosis initiation and ACS plaque rupture conceptually.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Knowledge",
    contentCategory: "Pathology",
    moduleId: IDS.modCvb,
    lessonIds: ["les-cv-7"],
  },
  {
    id: "obj-id-5",
    code: "OBJ-P1-ID-005",
    statement:
      "Risk-stratify UTI vs pyelonephritis and choose culture-informed therapy thinking.",
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Diagnosis",
    contentCategory: "Microbiology",
    moduleId: IDS.modId,
    lessonIds: ["les-id-5"],
  },
  {
    id: "obj-obgyn-5",
    code: "OBJ-P2-OB-005",
    statement:
      "Describe stages of labor and recognize arrest-of-labor red flags conceptually.",
    usmleStep: "step2ck",
    organSystem: "Reproductive",
    physicianTask: "Knowledge",
    contentCategory: "Obstetrics / Gynecology",
    moduleId: IDS.modObgyn,
    lessonIds: ["les-obgyn-5"],
  },
  {
    id: "obj-im-6",
    code: "OBJ-P2-IM-006",
    statement:
      "Initiate VTE risk assessment and anticoagulation contraindications thinking on the wards.",
    usmleStep: "step2ck",
    organSystem: "Cardiovascular",
    physicianTask: "Management",
    contentCategory: "Internal Medicine",
    moduleId: IDS.modIm,
    lessonIds: ["les-im-6"],
  },
  {
    id: "obj-peds-6",
    code: "OBJ-P2-PEDS-006",
    statement:
      "Screen developmental milestones at key ages and know when to refer.",
    usmleStep: "step2ck",
    organSystem: "Multisystem",
    physicianTask: "Diagnosis",
    contentCategory: "Pediatrics",
    moduleId: IDS.modPeds,
    lessonIds: ["les-peds-6"],
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

export const wave5QuizQuestions: QuizQuestion[] = [
  q(
    "qq-msk-4",
    "Needle-shaped negatively birefringent crystals in synovial fluid indicate:",
    [
      "Monosodium urate (gout)",
      "Calcium pyrophosphate exclusively without other testing",
      "Always septic arthritis without culture",
      "Cholesterol emboli as the only diagnosis",
    ],
    0,
    "MSU crystals are needle-shaped and negatively birefringent; still exclude infection when clinical concern exists.",
    { lessonId: "les-msk-4", objectiveId: "obj-msk-4" },
  ),
  q(
    "qq-msk-5",
    "Severe pain out of proportion after tibial fracture with tense compartments — concern?",
    [
      "Acute compartment syndrome — urgent surgical evaluation",
      "Simple bruise observe at home",
      "Primary gout flare only",
      "Delayed elective casting in 2 weeks",
    ],
    0,
    "Pain out of proportion + tense compartments after trauma = compartment syndrome until proven otherwise.",
    { lessonId: "les-msk-5", objectiveId: "obj-msk-5" },
  ),
  q(
    "qq-endo-5",
    "High calcium + high PTH most often suggests:",
    [
      "Primary hyperparathyroidism (PTH-dependent)",
      "PTHrP malignancy with suppressed PTH",
      "Vitamin D deficiency exclusively",
      "Hypoparathyroidism",
    ],
    0,
    "PTH-dependent hypercalcemia → primary hyperparathyroidism (or rarely familial/tertiary patterns).",
    { lessonId: "les-endo-5", objectiveId: "obj-endo-5" },
  ),
  q(
    "qq-gi-6",
    "Transmural inflammation anywhere from mouth to anus with skip lesions favors:",
    [
      "Crohn disease",
      "Ulcerative colitis limited to continuous colon mucosa only",
      "Celiac disease exclusively",
      "GERD",
    ],
    0,
    "Crohn: transmural, skip lesions, any GI segment; UC: continuous mucosal colitis from rectum.",
    { lessonId: "les-gi-6", objectiveId: "obj-gi-6" },
  ),
  q(
    "qq-neuro-6",
    "Cushing triad (HTN, bradycardia, irregular breathing) after head injury suggests:",
    [
      "Raised ICP with impending herniation risk",
      "Benign tension headache",
      "Uncomplicated migraine",
      "Primary adrenal crisis only",
    ],
    0,
    "Cushing triad is a late sign of elevated ICP — emergency airway/ICP pathway.",
    { lessonId: "les-neuro-6", objectiveId: "obj-neuro-6" },
  ),
  q(
    "qq-heme-5",
    "Fever and back pain minutes into a transfusion — first action?",
    [
      "Stop the transfusion and keep IV access",
      "Increase the infusion rate",
      "Ignore if hemoglobin was low",
      "Give oral iron instead mid-transfusion",
    ],
    0,
    "Any suspected acute transfusion reaction → stop transfusion immediately, maintain IV, assess.",
    { lessonId: "les-heme-5", objectiveId: "obj-heme-5" },
  ),
  q(
    "qq-psych-5",
    "≥2 weeks of depressed mood or anhedonia with functional impairment — framework?",
    [
      "Major depressive episode criteria thinking + safety assessment",
      "Normal grief without any evaluation ever",
      "Bipolar mania by definition",
      "Delirium exclusively",
    ],
    0,
    "Duration + core symptoms + impairment define MDD thinking; always assess suicide risk.",
    { lessonId: "les-psych-5", objectiveId: "obj-psych-5" },
  ),
  q(
    "qq-psych-6",
    "48h after last drink: tremor, tachycardia, hallucinations — concern?",
    [
      "Alcohol withdrawal — benzodiazepine pathway urgency",
      "Caffeine overdose only",
      "SSRI discontinuation exclusively",
      "Hypothyroidism",
    ],
    0,
    "Alcohol withdrawal can progress to seizures/DTs; benzos are foundational therapy.",
    { lessonId: "les-psych-6", objectiveId: "obj-psych-6" },
  ),
  q(
    "qq-renal-6",
    "eGFR 28 mL/min/1.73m² sustained — CKD stage teaching category?",
    [
      "CKD G4 (severe decrease)",
      "Normal kidney function",
      "CKD G1 only",
      "AKI by definition without chronicity",
    ],
    0,
    "G4 is eGFR 15–29; confirm chronicity ≥3 months for CKD staging.",
    { lessonId: "les-renal-6", objectiveId: "obj-renal-6" },
  ),
  q(
    "qq-cv-7",
    "ACS most often begins with which plaque event?",
    [
      "Plaque rupture/erosion with thrombosis",
      "Gradual calcification without thrombosis always",
      "Primary vasospasm exclusively in all STEMIs",
      "Venous stasis in the legs only",
    ],
    0,
    "Acute coronary syndromes are typically thrombosis on ruptured/eroded atherosclerotic plaque.",
    { lessonId: "les-cv-7", objectiveId: "obj-cv-8" },
  ),
  q(
    "qq-id-5",
    "Dysuria + fever + CVA tenderness most suggests:",
    [
      "Pyelonephritis rather than simple cystitis",
      "Asymptomatic bacteriuria always",
      "Urethritis without upper tract risk",
      "Primary pneumonia",
    ],
    0,
    "Systemic signs + CVA tenderness raise upper-tract (pyelo) concern.",
    { lessonId: "les-id-5", objectiveId: "obj-id-5" },
  ),
  q(
    "qq-obgyn-5",
    "Second stage of labor is defined by:",
    [
      "Complete cervical dilation to delivery of the neonate",
      "Onset of contractions to complete dilation only",
      "Delivery of placenta only",
      "First prenatal visit",
    ],
    0,
    "Stage 1 = onset to complete dilation; stage 2 = complete dilation to birth; stage 3 = placenta.",
    { lessonId: "les-obgyn-5", objectiveId: "obj-obgyn-5" },
  ),
  q(
    "qq-im-6",
    "Hospitalized medical patient at high VTE risk without contraindications — principle?",
    [
      "Pharmacologic prophylaxis unless bleeding risk precludes it",
      "No prophylaxis ever for medical inpatients",
      "Therapeutic anticoagulation for all without indication",
      "Aspirin only replaces all prophylaxis always",
    ],
    0,
    "Risk-assess VTE and bleeding; most high-risk medical inpatients need prophylaxis.",
    { lessonId: "les-im-6", objectiveId: "obj-im-6" },
  ),
  q(
    "qq-peds-6",
    "No babbling by 12 months — best action?",
    [
      "Developmental/hearing evaluation and early referral thinking",
      "Reassure indefinitely without screening",
      "Start adult SSRI",
      "Assume bilingual delay without assessment",
    ],
    0,
    "Missed language milestones warrant hearing check and early intervention referral.",
    { lessonId: "les-peds-6", objectiveId: "obj-peds-6" },
  ),
];

export const wave5QbankQuestions: QbankQuestion[] = [
  {
    id: "qb-16",
    stem: "Ca 12.2, PTH high, low phosphate, stones/bones/groans. Framework?",
    choices: [
      { id: "qb-16-c0", text: "Primary hyperparathyroidism" },
      { id: "qb-16-c1", text: "PTHrP malignancy with low PTH" },
      { id: "qb-16-c2", text: "Vitamin D deficiency hypocalcemia" },
      { id: "qb-16-c3", text: "Hypoparathyroidism after thyroidectomy" },
    ],
    correctChoiceId: "qb-16-c0",
    explanation:
      "High Ca + high PTH = PTH-dependent hypercalcemia, classically primary hyperparathyroidism.",
    moduleId: IDS.modEndo,
    usmleStep: "step1",
    organSystem: "Endocrine",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    objectiveId: "obj-endo-5",
    difficulty: 2,
  },
  {
    id: "qb-17",
    stem: "Continuous bloody diarrhea, rectum involved, no small-bowel disease. Most likely?",
    choices: [
      { id: "qb-17-c0", text: "Ulcerative colitis pattern" },
      { id: "qb-17-c1", text: "Crohn with skip ileal lesions only" },
      { id: "qb-17-c2", text: "Celiac disease" },
      { id: "qb-17-c3", text: "Diverticulosis without inflammation" },
    ],
    correctChoiceId: "qb-17-c0",
    explanation:
      "UC is continuous colonic mucosal disease beginning in the rectum.",
    moduleId: IDS.modGi,
    usmleStep: "step1",
    organSystem: "Gastrointestinal",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    objectiveId: "obj-gi-6",
    difficulty: 2,
  },
  {
    id: "qb-18",
    stem: "Alcohol cessation day 2: agitation, HR 130, BP 170/100, visual hallucinations.",
    choices: [
      {
        id: "qb-18-c0",
        text: "Alcohol withdrawal — benzodiazepines + supportive care",
      },
      { id: "qb-18-c1", text: "Opioid withdrawal treated with naloxone only" },
      { id: "qb-18-c2", text: "Serotonin syndrome from one missed SSRI dose" },
      { id: "qb-18-c3", text: "Simple insomnia without medical risk" },
    ],
    correctChoiceId: "qb-18-c0",
    explanation:
      "Autonomic hyperactivity + hallucinations after alcohol cessation = withdrawal; benzos are first-line.",
    moduleId: IDS.modPsych,
    usmleStep: "step2ck",
    organSystem: "Behavioral Health",
    physicianTask: "Management",
    contentCategory: "Psychiatry",
    objectiveId: "obj-psych-6",
    difficulty: 3,
  },
];

export const wave5Flashcards: Flashcard[] = [
  {
    id: "fc-46",
    lessonId: "les-msk-4",
    front: "Gout vs CPPD crystals",
    back: "Gout: needle MSU, negative birefringence. CPPD: rhomboid, positive birefringence. Always consider infection.",
    objectiveId: "obj-msk-4",
  },
  {
    id: "fc-47",
    lessonId: "les-msk-5",
    front: "Compartment syndrome clue",
    back: "Pain out of proportion ± paresthesia; pulselessness is late. Urgent fasciotomy pathway.",
    objectiveId: "obj-msk-5",
  },
  {
    id: "fc-48",
    lessonId: "les-endo-5",
    front: "Hypercalcemia fork",
    back: "Check PTH: high → primary HPT; low → PTHrP/vit D excess/osteolysis, etc.",
    objectiveId: "obj-endo-5",
  },
  {
    id: "fc-49",
    lessonId: "les-gi-6",
    front: "Crohn vs UC",
    back: "Crohn: transmural, skips, any GI. UC: continuous mucosal, rectum→proximal colon.",
    objectiveId: "obj-gi-6",
  },
  {
    id: "fc-50",
    lessonId: "les-neuro-6",
    front: "ICP emergency signs",
    back: "Decreasing consciousness, Cushing triad, asymmetric pupils — airway + ICP measures.",
    objectiveId: "obj-neuro-6",
  },
  {
    id: "fc-51",
    lessonId: "les-heme-5",
    front: "Transfusion reaction first step",
    back: "STOP transfusion, keep IV line, check vitals/clerical ID, notify blood bank.",
    objectiveId: "obj-heme-5",
  },
  {
    id: "fc-52",
    lessonId: "les-psych-6",
    front: "Alcohol withdrawal timeline",
    back: "Tremor/anxiety hours; seizures ~24–48h; DTs ~48–72h — benzos + thiamine.",
    objectiveId: "obj-psych-6",
  },
  {
    id: "fc-53",
    lessonId: "les-renal-6",
    front: "CKD complications",
    back: "Anemia, secondary HPT/bone disease, acidosis, hyperkalemia, volume overload, CVD.",
    objectiveId: "obj-renal-6",
  },
  {
    id: "fc-54",
    lessonId: "les-cv-7",
    front: "Atherosclerosis → ACS",
    back: "Endothelial injury → lipid plaque → rupture/erosion → platelet-fibrin thrombus.",
    objectiveId: "obj-cv-8",
  },
  {
    id: "fc-55",
    lessonId: "les-obgyn-5",
    front: "Labor stages",
    back: "1: onset→complete dilation; 2: complete→birth; 3: birth→placenta.",
    objectiveId: "obj-obgyn-5",
  },
];

export const wave5ClinicalCases: ClinicalCase[] = [
  {
    id: "case-msk-1",
    moduleId: IDS.modMsk,
    title: "Hot MTP Joint at Night",
    presentationMd:
      "55-year-old man awakens with exquisite pain in the first MTP; joint red/hot; afebrile; uric acid pending.",
    stages: [
      {
        id: "m1",
        prompt: "What must you still exclude before treating as gout alone?",
        expectedFocus: "Septic arthritis — aspirate when feasible",
      },
      {
        id: "m2",
        prompt: "Which crystal finding confirms gout?",
        expectedFocus: "Needle-shaped negatively birefringent MSU crystals",
      },
    ],
    teachingPoints:
      "Gout is common; infection is dangerous — synovial fluid settles both.",
    objectiveIds: ["obj-msk-4"],
    status: "published",
  },
  {
    id: "case-psych-2",
    moduleId: IDS.modPsych,
    title: "Day 2 Off Alcohol",
    presentationMd:
      "44-year-old stopped drinking yesterday; now tremulous, HR 125, seeing insects on the wall.",
    stages: [
      {
        id: "w1",
        prompt: "Name the syndrome and the first-line medication class.",
        expectedFocus: "Alcohol withdrawal — benzodiazepines",
      },
      {
        id: "w2",
        prompt: "What vitamin do you give and why?",
        expectedFocus: "Thiamine to prevent Wernicke encephalopathy",
      },
    ],
    teachingPoints:
      "Treat withdrawal aggressively; thiamine before prolonged glucose when risk is high.",
    objectiveIds: ["obj-psych-6"],
    status: "published",
  },
  {
    id: "case-endo-2",
    moduleId: IDS.modEndo,
    title: "Stones, Bones, and a High Calcium",
    presentationMd:
      "62-year-old with recurrent kidney stones; Ca 11.4, PTH elevated, phosphate low.",
    stages: [
      {
        id: "c1",
        prompt: "Is this PTH-dependent or independent hypercalcemia?",
        expectedFocus: "PTH-dependent — primary hyperparathyroidism",
      },
      {
        id: "c2",
        prompt: "Name two complications of prolonged disease.",
        expectedFocus: "Nephrolithiasis, bone disease, neuropsych symptoms, constipation",
      },
    ],
    teachingPoints:
      "Always check PTH with hypercalcemia — it splits the entire differential.",
    objectiveIds: ["obj-endo-5"],
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

type Lesson = Program["phases"][0]["modules"][0]["lessons"][0];

function pushLesson(
  program: Program,
  modId: string,
  lesson: Lesson,
  quizId: string,
) {
  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      if (mod.id !== modId) continue;
      mod.lessons.push(lesson);
      if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, quizId];
    }
  }
}

export function applyWave5Expansions(program: Program): Program {
  pushLesson(
    program,
    IDS.modMsk,
    {
      id: "les-msk-4",
      moduleId: IDS.modMsk,
      title: "Crystal Arthropathy vs Infection",
      slug: "msk-gout-cppd",
      sequence: 4,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-msk-4"],
      concepts: [
        {
          id: "con-msk-4a",
          lessonId: "les-msk-4",
          title: "Synovial fluid settles the argument",
          sequence: 1,
          summary: "Crystals diagnose gout/CPPD; WBC/culture exclude septic arthritis.",
          blocks: [
            reading(
              "blk-msk-4a-r",
              "con-msk-4a",
              "Crystal rules",
              1,
              `**Gout (MSU)**: needle-shaped, negatively birefringent; 1st MTP classic; hyperuricemia is supportive, not diagnostic alone.  
**CPPD**: rhomboid, positively birefringent; knee/wrist; chondrocalcinosis on imaging.  

Crystals can coexist with infection — aspirate when the joint is hot and you cannot exclude sepsis.`,
            ),
            vignette(
              "blk-msk-4a-x",
              "con-msk-4a",
              "Vignette: red hot knee",
              2,
              `List orders before starting steroids or delaying care.`,
            ),
          ],
        },
      ],
    },
    "qq-msk-4",
  );

  pushLesson(
    program,
    IDS.modMsk,
    {
      id: "les-msk-5",
      moduleId: IDS.modMsk,
      title: "Compartment Syndrome Recognition",
      slug: "msk-compartment",
      sequence: 5,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-msk-5"],
      concepts: [
        {
          id: "con-msk-5a",
          lessonId: "les-msk-5",
          title: "Pain out of proportion",
          sequence: 1,
          summary: "Rising pressure threatens nerves and muscle — time to fasciotomy matters.",
          blocks: [
            reading(
              "blk-msk-5a-r",
              "con-msk-5a",
              "Compartment urgency",
              1,
              `After fractures, crush, reperfusion: severe pain, pain on passive stretch, tense compartments, paresthesias.  
Pulselessness/paralysis are late. Measure pressures when equivocal; definitive treatment is fasciotomy via surgical pathway.

Do not elevate and observe away a tense, screaming compartment.`,
            ),
          ],
        },
      ],
    },
    "qq-msk-5",
  );

  pushLesson(
    program,
    IDS.modEndo,
    {
      id: "les-endo-5",
      moduleId: IDS.modEndo,
      title: "Hypercalcemia — PTH Fork",
      slug: "endo-hypercalcemia",
      sequence: 5,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-endo-5"],
      concepts: [
        {
          id: "con-endo-5a",
          lessonId: "les-endo-5",
          title: "One lab splits the differential",
          sequence: 1,
          summary: "PTH-dependent vs independent hypercalcemia drives the workup.",
          blocks: [
            reading(
              "blk-endo-5a-r",
              "con-endo-5a",
              "Hypercalcemia algorithm",
              1,
              `1. Confirm true hypercalcemia (corrected/ionized).  
2. Measure PTH.  
3. **High/inappropriately normal PTH** → primary hyperparathyroidism (± familial).  
4. **Low PTH** → PTHrP, osteolytic mets, vitamin D excess, granulomas, thyrotoxicosis, milk-alkali, immobilization.

Severe symptomatic hypercalcemia: fluids first, then mechanism-directed therapy under protocols.`,
            ),
          ],
        },
      ],
    },
    "qq-endo-5",
  );

  pushLesson(
    program,
    IDS.modGi,
    {
      id: "les-gi-6",
      moduleId: IDS.modGi,
      title: "IBD — Crohn vs Ulcerative Colitis",
      slug: "gi-ibd",
      sequence: 6,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-gi-6"],
      concepts: [
        {
          id: "con-gi-6a",
          lessonId: "les-gi-6",
          title: "Distribution and depth",
          sequence: 1,
          summary: "Anatomy of inflammation predicts complications and surgery choices.",
          blocks: [
            reading(
              "blk-gi-6a-r",
              "con-gi-6a",
              "IBD contrast table (prose)",
              1,
              `**Ulcerative colitis**: continuous mucosal inflammation from rectum proximally; bloody diarrhea; toxic megacolon risk; colorectal cancer surveillance.  
**Crohn disease**: transmural, skip lesions, any GI tract (ileum classic); fistulas, strictures, perianal disease; granulomas may appear.

Extraintestinal: joints, skin, eyes, PSC association (more UC). Therapy is specialist-guided; learn phenotypes first.`,
            ),
          ],
        },
      ],
    },
    "qq-gi-6",
  );

  pushLesson(
    program,
    IDS.modNeuro,
    {
      id: "les-neuro-6",
      moduleId: IDS.modNeuro,
      title: "Raised ICP & Herniation Patterns",
      slug: "neuro-icp",
      sequence: 5,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-neuro-6"],
      concepts: [
        {
          id: "con-neuro-6a",
          lessonId: "les-neuro-6",
          title: "Monro–Kellie and herniation",
          sequence: 1,
          summary: "Fixed cranial vault: rising volume raises pressure and shifts brain.",
          blocks: [
            reading(
              "blk-neuro-6a-r",
              "con-neuro-6a",
              "ICP emergency map",
              1,
              `Brain + blood + CSF = constant volume. Mass/edema/hemorrhage → ↑ICP → ischemia.  

Signs: headache, vomiting, declining consciousness, papilledema, Cushing triad (late).  
Herniation patterns (uncal → CN III; tonsillar → respiratory arrest) are taught as *why airway and ICP care cannot wait*.

Immediate priorities: ABCs, head-of-bed, avoid obstruction of venous return, urgent neurosurgery/ICU pathway — exact osmotherapy dosing is protocolized.`,
            ),
          ],
        },
      ],
    },
    "qq-neuro-6",
  );

  pushLesson(
    program,
    IDS.modHeme,
    {
      id: "les-heme-5",
      moduleId: IDS.modHeme,
      title: "Acute Transfusion Reactions",
      slug: "heme-transfusion",
      sequence: 5,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-heme-5"],
      concepts: [
        {
          id: "con-heme-5a",
          lessonId: "les-heme-5",
          title: "Stop first, then classify",
          sequence: 1,
          summary: "Timing and vital signs sort febrile, allergic, hemolytic, and TACO/TRALI.",
          blocks: [
            reading(
              "blk-heme-5a-r",
              "con-heme-5a",
              "Reaction map",
              1,
              `**Always**: stop transfusion, keep IV access, recheck patient/unit ID, notify blood bank.  

- Acute hemolytic (ABO): fever, flank pain, hemoglobinuria — clerical error classic  
- Febrile non-hemolytic: fever without hemolysis  
- Allergic/anaphylactic: urticaria → airway  
- TACO: volume overload  
- TRALI: acute lung injury from transfusion  

Differentiate TACO vs TRALI clinically; both can cause hypoxia.`,
            ),
          ],
        },
      ],
    },
    "qq-heme-5",
  );

  pushLesson(
    program,
    IDS.modPsych,
    {
      id: "les-psych-5",
      moduleId: IDS.modPsych,
      title: "Major Depression Diagnosis & First Steps",
      slug: "psych-mdd",
      sequence: 5,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-psych-5"],
      concepts: [
        {
          id: "con-psych-5a",
          lessonId: "les-psych-5",
          title: "SIGECAPS with safety",
          sequence: 1,
          summary: "Criteria + impairment + suicide risk drive care intensity.",
          blocks: [
            reading(
              "blk-psych-5a-r",
              "con-psych-5a",
              "MDD framework",
              1,
              `≥2 weeks of depressed mood or anhedonia plus accompanying neurovegetative/cognitive symptoms with functional impairment.  
Exclude bipolar (prior mania/hypomania), medical mimics, substances.  

First-line: psychotherapy and/or SSRI/SNRI class thinking; monitor activation/suicidality especially early in youth. Severe + psychotic/catatonic features need specialty urgency.`,
            ),
          ],
        },
      ],
    },
    "qq-psych-5",
  );

  pushLesson(
    program,
    IDS.modPsych,
    {
      id: "les-psych-6",
      moduleId: IDS.modPsych,
      title: "Alcohol Withdrawal",
      slug: "psych-alcohol-withdrawal",
      sequence: 6,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-psych-6"],
      concepts: [
        {
          id: "con-psych-6a",
          lessonId: "les-psych-6",
          title: "Autonomic hyperactivity clock",
          sequence: 1,
          summary: "Withdrawal is a timed, dangerous physiology — benzos and thiamine.",
          blocks: [
            reading(
              "blk-psych-6a-r",
              "con-psych-6a",
              "Withdrawal timeline",
              1,
              `Hours: tremor, anxiety, insomnia, tachycardia.  
~24–48h: withdrawal seizures risk.  
~48–72h: delirium tremens (confusion, hallucinations, severe autonomic instability).  

Benzodiazepines are first-line; thiamine to prevent Wernicke; monitor CIWA-style severity. Exact dosing protocols are institutional.`,
            ),
            vignette(
              "blk-psych-6a-x",
              "con-psych-6a",
              "Vignette: visual hallucinations day 2",
              2,
              `List immediate orders and complications you are preventing.`,
            ),
          ],
        },
      ],
    },
    "qq-psych-6",
  );

  pushLesson(
    program,
    IDS.modRenal,
    {
      id: "les-renal-6",
      moduleId: IDS.modRenal,
      title: "CKD Staging & Complications",
      slug: "renal-ckd",
      sequence: 6,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-renal-6"],
      concepts: [
        {
          id: "con-renal-6a",
          lessonId: "les-renal-6",
          title: "GFR categories and sequelae",
          sequence: 1,
          summary: "Chronicity ≥3 months + GFR/albuminuria define CKD and its risks.",
          blocks: [
            reading(
              "blk-renal-6a-r",
              "con-renal-6a",
              "CKD map",
              1,
              `Stage by eGFR (G1–G5) and albuminuria (A1–A3). G3–G5 drive most complication teaching.  

Complications: anemia (EPO), mineral bone disease (PO4/PTH/vit D), acidosis, hyperkalemia, volume overload, uremic symptoms, accelerated CVD.  

Slow progression: BP control, RAAS blockade when indicated, SGLT2i in modern diabetic/CKD care, avoid nephrotoxins.`,
            ),
          ],
        },
      ],
    },
    "qq-renal-6",
  );

  pushLesson(
    program,
    IDS.modCvb,
    {
      id: "les-cv-7",
      moduleId: IDS.modCvb,
      title: "Atherosclerosis to Plaque Rupture",
      slug: "cv-atherosclerosis",
      sequence: 7,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-cv-7"],
      concepts: [
        {
          id: "con-cv-7a",
          lessonId: "les-cv-7",
          title: "Endothelium to thrombus",
          sequence: 1,
          summary: "ACS is usually acute thrombosis on disrupted plaque, not gradual stenosis alone.",
          blocks: [
            reading(
              "blk-cv-7a-r",
              "con-cv-7a",
              "Atherogenesis teaching arc",
              1,
              `Endothelial injury (lipids, smoking, HTN, diabetes) → monocyte entry → foam cells → fatty streak → fibrous plaque.  
Vulnerable plaque: thin cap, lipid-rich core → rupture/erosion → platelet activation + fibrin → ACS.

Prevention targets risk factors; acute care targets thrombosis and ischemia (see ACS lessons).`,
            ),
          ],
        },
      ],
    },
    "qq-cv-7",
  );

  pushLesson(
    program,
    IDS.modId,
    {
      id: "les-id-5",
      moduleId: IDS.modId,
      title: "UTI vs Pyelonephritis",
      slug: "id-uti-pyelo",
      sequence: 5,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-id-5"],
      concepts: [
        {
          id: "con-id-5a",
          lessonId: "les-id-5",
          title: "Lower vs upper tract",
          sequence: 1,
          summary: "Systemic signs and CVA tenderness upgrade cystitis to pyelo thinking.",
          blocks: [
            reading(
              "blk-id-5a-r",
              "con-id-5a",
              "Urinary infection map",
              1,
              `Cystitis: dysuria, frequency, urgency; usually afebrile.  
Pyelonephritis: fever, flank pain, CVA tenderness ± nausea — longer therapy and closer follow-up.  
E. coli dominates. Culture before abx when complicated/pyelo/male/pregnant. Asymptomatic bacteriuria: treat mainly in pregnancy and before urologic procedures.`,
            ),
          ],
        },
      ],
    },
    "qq-id-5",
  );

  pushLesson(
    program,
    IDS.modObgyn,
    {
      id: "les-obgyn-5",
      moduleId: IDS.modObgyn,
      title: "Stages of Labor",
      slug: "obgyn-labor-stages",
      sequence: 5,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-obgyn-5"],
      concepts: [
        {
          id: "con-obgyn-5a",
          lessonId: "les-obgyn-5",
          title: "Definitions that drive decisions",
          sequence: 1,
          summary: "Know stages so arrest and fetal status decisions make sense.",
          blocks: [
            reading(
              "blk-obgyn-5a-r",
              "con-obgyn-5a",
              "Labor stages",
              1,
              `**Stage 1**: onset of labor → complete cervical dilation (latent + active phases).  
**Stage 2**: complete dilation → delivery of neonate.  
**Stage 3**: delivery of placenta.  

Arrest of progress and nonreassuring fetal status are obstetric emergencies managed by specialists — learn the vocabulary and maternal–fetal monitoring principles.`,
            ),
          ],
        },
      ],
    },
    "qq-obgyn-5",
  );

  pushLesson(
    program,
    IDS.modIm,
    {
      id: "les-im-6",
      moduleId: IDS.modIm,
      title: "Inpatient VTE Prophylaxis",
      slug: "im-vte-ppx",
      sequence: 6,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-im-6"],
      concepts: [
        {
          id: "con-im-6a",
          lessonId: "les-im-6",
          title: "Risk vs bleeding",
          sequence: 1,
          summary: "Most medical inpatients need VTE prevention unless bleeding risk dominates.",
          blocks: [
            reading(
              "blk-im-6a-r",
              "con-im-6a",
              "VTE prevention on the wards",
              1,
              `Assess thrombosis risk (immobility, cancer, prior VTE, acute illness) and bleeding risk.  
Pharmacologic prophylaxis (LMWH/heparin class thinking) when benefit outweighs bleed risk; mechanical methods when anticoagulants contraindicated.  

Therapeutic anticoagulation is for *diagnosed* VTE or other indications — do not confuse prophylaxis doses with treatment.`,
            ),
          ],
        },
      ],
    },
    "qq-im-6",
  );

  pushLesson(
    program,
    IDS.modPeds,
    {
      id: "les-peds-6",
      moduleId: IDS.modPeds,
      title: "Developmental Milestone Surveillance",
      slug: "peds-milestones",
      sequence: 6,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-peds-6"],
      concepts: [
        {
          id: "con-peds-6a",
          lessonId: "les-peds-6",
          title: "Screen early, refer early",
          sequence: 1,
          summary: "Missed milestones — especially language/social — warrant hearing checks and EI referral.",
          blocks: [
            reading(
              "blk-peds-6a-r",
              "con-peds-6a",
              "Milestone anchors (teaching)",
              1,
              `Use current CDC/AAP milestone checklists in practice. Classic teaching anchors: social smile ~2m, sits ~6m, walks ~12m, words expand in year 2.  

Any regression or missed language milestones → hearing evaluation + early intervention. Do not wait for “catch up” when red flags are present.`,
            ),
          ],
        },
      ],
    },
    "qq-peds-6",
  );

  return program;
}
