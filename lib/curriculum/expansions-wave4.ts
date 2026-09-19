import type {
  ClinicalCase,
  Flashcard,
  Objective,
  Program,
  QbankQuestion,
  QuizQuestion,
} from "@/lib/types/domain";
import { IDS } from "@/lib/curriculum/seed";

/** Fourth-wave original content: neoplasia, valves, airways, K+, adrenal, CNS infection, pancreas, clerkship depth. */

export const wave4Objectives: Objective[] = [
  {
    id: "obj-cell-6",
    code: "OBJ-P1-CELL-006",
    statement:
      "Distinguish hyperplasia, metaplasia, dysplasia, and neoplasia using definitional criteria.",
    usmleStep: "step1",
    organSystem: "Multisystem",
    physicianTask: "Knowledge",
    contentCategory: "Pathology",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-5"],
  },
  {
    id: "obj-cell-7",
    code: "OBJ-P1-CELL-007",
    statement:
      "Map hallmarks of cancer to invasion and metastasis steps.",
    usmleStep: "step1",
    organSystem: "Multisystem",
    physicianTask: "Knowledge",
    contentCategory: "Pathology",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-6"],
  },
  {
    id: "obj-cv-7",
    code: "OBJ-P1-CV-007",
    statement:
      "Link valvular lesions to murmur timing and hemodynamic consequences.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modCvb,
    lessonIds: ["les-cv-6"],
  },
  {
    id: "obj-pulm-5",
    code: "OBJ-P1-PULM-005",
    statement:
      "Contrast asthma and COPD pathophysiology and acute exacerbation priorities.",
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Management",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modPulm,
    lessonIds: ["les-pulm-5"],
  },
  {
    id: "obj-renal-5",
    code: "OBJ-P1-REN-005",
    statement:
      "Prioritize hyperkalemia emergency steps by ECG changes and membrane excitability.",
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Management",
    contentCategory: "Physiology",
    moduleId: IDS.modRenal,
    lessonIds: ["les-renal-5"],
  },
  {
    id: "obj-endo-4",
    code: "OBJ-P1-ENDO-004",
    statement:
      "Differentiate primary adrenal insufficiency from Cushing pathophysiology using ACTH axis logic.",
    usmleStep: "step1",
    organSystem: "Endocrine",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modEndo,
    lessonIds: ["les-endo-4"],
  },
  {
    id: "obj-neuro-5",
    code: "OBJ-P1-NEURO-005",
    statement:
      "Interpret meningitis vs encephalitis patterns and urgent LP/imaging sequencing principles.",
    usmleStep: "step1",
    organSystem: "Nervous System",
    physicianTask: "Diagnosis",
    contentCategory: "Neuroscience",
    moduleId: IDS.modNeuro,
    lessonIds: ["les-neuro-5"],
  },
  {
    id: "obj-gi-5",
    code: "OBJ-P1-GI-005",
    statement:
      "Recognize acute pancreatitis diagnosis criteria and early severity priorities.",
    usmleStep: "step1",
    organSystem: "Gastrointestinal",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modGi,
    lessonIds: ["les-gi-5"],
  },
  {
    id: "obj-im-5",
    code: "OBJ-P2-IM-005",
    statement:
      "Build a pneumonia severity and disposition framework for ward decision-making.",
    usmleStep: "step2ck",
    organSystem: "Respiratory",
    physicianTask: "Management",
    contentCategory: "Internal Medicine",
    moduleId: IDS.modIm,
    lessonIds: ["les-im-5"],
  },
  {
    id: "obj-surg-4",
    code: "OBJ-P2-SURG-004",
    statement:
      "Apply ATLS-style primary survey priorities to trauma ABCs.",
    usmleStep: "step2ck",
    organSystem: "Multisystem",
    physicianTask: "Management",
    contentCategory: "Surgery",
    moduleId: IDS.modSurg,
    lessonIds: ["les-surg-4"],
  },
  {
    id: "obj-peds-5",
    code: "OBJ-P2-PEDS-005",
    statement:
      "Differentiate dehydration severity in gastroenteritis and choose ORS vs IV pathways conceptually.",
    usmleStep: "step2ck",
    organSystem: "Gastrointestinal",
    physicianTask: "Management",
    contentCategory: "Pediatrics",
    moduleId: IDS.modPeds,
    lessonIds: ["les-peds-5"],
  },
  {
    id: "obj-fm-4",
    code: "OBJ-P2-FM-004",
    statement:
      "Initiate type 2 diabetes lifestyle and metformin-first reasoning with comorbidity caveats.",
    usmleStep: "step2ck",
    organSystem: "Endocrine",
    physicianTask: "Management",
    contentCategory: "Family Medicine",
    moduleId: IDS.modFm,
    lessonIds: ["les-fm-4"],
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

export const wave4QuizQuestions: QuizQuestion[] = [
  q(
    "qq-cell-5",
    "Reversible change of one differentiated cell type to another (e.g., squamous metaplasia in bronchi) is:",
    [
      "Metaplasia",
      "Neoplasia by definition",
      "Irreversible anaplasia only",
      "Hyperplasia of stem cells exclusively without phenotype change",
    ],
    0,
    "Metaplasia is a reversible adaptive change in differentiated cell type; neoplasia is clonal autonomous growth.",
    { lessonId: "les-cell-5", objectiveId: "obj-cell-6" },
  ),
  q(
    "qq-cell-6",
    "Invasion through basement membrane best distinguishes:",
    [
      "Carcinoma in situ vs invasive carcinoma",
      "Hyperplasia from hypertrophy",
      "Apoptosis from necrosis",
      "Metaplasia from atrophy",
    ],
    0,
    "Breach of basement membrane defines invasion — the key step from in situ to invasive carcinoma.",
    { lessonId: "les-cell-6", objectiveId: "obj-cell-7" },
  ),
  q(
    "qq-cv-6",
    "Systolic crescendo-decrescendo murmur at the right upper sternal border radiating to carotids suggests:",
    [
      "Aortic stenosis",
      "Mitral stenosis exclusively",
      "Aortic regurgitation only",
      "Tricuspid stenosis as first choice",
    ],
    0,
    "Classic AS: systolic ejection murmur at RUSB with carotid radiation.",
    { lessonId: "les-cv-6", objectiveId: "obj-cv-7" },
  ),
  q(
    "qq-pulm-5",
    "Asthma pathophysiology centers on which combination?",
    [
      "Reversible bronchoconstriction + airway inflammation/hyperresponsiveness",
      "Irreversible alveolar destruction alone as the defining feature",
      "Pure pulmonary embolism physiology",
      "Primary surfactant deficiency in adults",
    ],
    0,
    "Asthma is reversible obstruction driven by inflammation and hyperresponsiveness.",
    { lessonId: "les-pulm-5", objectiveId: "obj-pulm-5" },
  ),
  q(
    "qq-renal-5",
    "Peaked T waves and wide QRS with K 7.2 — first membrane-stabilizing priority?",
    [
      "IV calcium (protocolized) to stabilize cardiac membrane",
      "Oral kayexalate as the only immediate step",
      "Ignore ECG if asymptomatic historically",
      "Fluid restriction alone",
    ],
    0,
    "ECG changes from hyperkalemia → stabilize membrane with calcium while shifting/removing K.",
    { lessonId: "les-renal-5", objectiveId: "obj-renal-5" },
  ),
  q(
    "qq-endo-4",
    "Hyperpigmentation + hypotension + hyponatremia after autoimmune adrenal destruction suggests:",
    [
      "Primary adrenal insufficiency (high ACTH, low cortisol/aldosterone)",
      "Secondary adrenal insufficiency with high aldosterone always",
      "Cushing disease exclusively",
      "SIADH as the sole explanation",
    ],
    0,
    "Primary AI: both glucocorticoid and mineralocorticoid loss; high ACTH → hyperpigmentation.",
    { lessonId: "les-endo-4", objectiveId: "obj-endo-4" },
  ),
  q(
    "qq-neuro-5",
    "Fever, nuchal rigidity, and photophobia — immediate priority framing?",
    [
      "Acute meningitis pathway — do not delay antibiotics for perfect tests if unstable",
      "Outpatient migraine clinic next month",
      "Assume viral URI without evaluation",
      "Elective EEG only",
    ],
    0,
    "Suspected bacterial meningitis is time-critical; stabilize and treat while arranging LP/imaging appropriately.",
    { lessonId: "les-neuro-5", objectiveId: "obj-neuro-5" },
  ),
  q(
    "qq-gi-5",
    "Epigastric pain radiating to back, lipase ≥3× ULN — diagnosis frame?",
    [
      "Acute pancreatitis",
      "Uncomplicated GERD only",
      "Primary hyperthyroidism",
      "Migraine equivalent",
    ],
    0,
    "Typical pain + lipase elevation (≥3×) meets diagnostic criteria without mandatory imaging.",
    { lessonId: "les-gi-5", objectiveId: "obj-gi-5" },
  ),
  q(
    "qq-im-5",
    "CAP with hypotension and new O2 need — disposition thinking?",
    [
      "Higher severity — consider monitored/higher-acuity care pathway",
      "Always discharge home without vitals review",
      "Ignore oxygenation if CXR is positive",
      "Treat as PE without pneumonia workup",
    ],
    0,
    "Abnormal vitals and gas exchange drive severity/disposition more than the CXR alone.",
    { lessonId: "les-im-5", objectiveId: "obj-im-5" },
  ),
  q(
    "qq-surg-4",
    "Trauma primary survey first letter priority?",
    [
      "Airway with C-spine consideration",
      "Full skeletal survey before ABCs",
      "Detailed neurologic exam before airway",
      "Outpatient orthopedics referral first",
    ],
    0,
    "ATLS-style primary survey: Airway (C-spine) → Breathing → Circulation → Disability → Exposure.",
    { lessonId: "les-surg-4", objectiveId: "obj-surg-4" },
  ),
  q(
    "qq-peds-5",
    "Mild dehydration from gastroenteritis in a well-appearing child — preferred first approach?",
    [
      "Oral rehydration solution trial",
      "Immediate central line for all cases",
      "Adult hypertonic saline protocol by default",
      "NPO forever without fluids",
    ],
    0,
    "ORS is first-line for mild–moderate dehydration when the child can drink and is stable.",
    { lessonId: "les-peds-5", objectiveId: "obj-peds-5" },
  ),
  q(
    "qq-fm-4",
    "New T2DM without contraindications — foundational first pharmacologic class often taught?",
    [
      "Metformin (with lifestyle) unless contraindicated",
      "Sliding-scale insulin as mandatory first outpatient step for all",
      "High-dose thiazides as antihyperglycemics",
      "Systemic steroids",
    ],
    0,
    "Metformin plus lifestyle is the classic foundational first step when eGFR/tolerability allow.",
    { lessonId: "les-fm-4", objectiveId: "obj-fm-4" },
  ),
];

export const wave4QbankQuestions: QbankQuestion[] = [
  {
    id: "qb-13",
    stem: "Heavy smoker with progressive dyspnea, barrel chest, decreased DLCO — physiology frame?",
    choices: [
      { id: "qb-13-c0", text: "Emphysema-predominant COPD with alveolar destruction" },
      { id: "qb-13-c1", text: "Pure reversible asthma without fixed obstruction" },
      { id: "qb-13-c2", text: "Restrictive ILD as the only possibility" },
      { id: "qb-13-c3", text: "Normal aging without workup" },
    ],
    correctChoiceId: "qb-13-c0",
    explanation:
      "Smoking + hyperinflation + low DLCO supports emphysema physiology within COPD.",
    moduleId: IDS.modPulm,
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    objectiveId: "obj-pulm-5",
    difficulty: 2,
  },
  {
    id: "qb-14",
    stem: "K 6.9 with peaked T waves. Correct sequence principle?",
    choices: [
      {
        id: "qb-14-c0",
        text: "Stabilize membrane → shift K intracellularly → remove K / treat cause",
      },
      { id: "qb-14-c1", text: "Remove K only; never stabilize if ECG abnormal" },
      { id: "qb-14-c2", text: "Give succinylcholine to lower K" },
      { id: "qb-14-c3", text: "Observe indefinitely without ECG" },
    ],
    correctChoiceId: "qb-14-c0",
    explanation:
      "Hyperkalemia with ECG changes: calcium → shift (insulin/glucose, beta-agonists, bicarb in select contexts) → removal (GI binders/dialysis) + fix cause.",
    moduleId: IDS.modRenal,
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Management",
    contentCategory: "Physiology",
    objectiveId: "obj-renal-5",
    difficulty: 3,
  },
  {
    id: "qb-15",
    stem: "Fever, headache, neck stiffness; immunocompetent adult. Immediate action principle?",
    choices: [
      {
        id: "qb-15-c0",
        text: "Blood cultures and timely empiric antibiotics; LP when safe",
      },
      { id: "qb-15-c1", text: "Wait 48h for viral PCR before any therapy" },
      { id: "qb-15-c2", text: "Outpatient NSAIDs only" },
      { id: "qb-15-c3", text: "Start only antifungals first-line in all adults" },
    ],
    correctChoiceId: "qb-15-c0",
    explanation:
      "Do not delay antibiotics for bacterial meningitis suspicion; coordinate LP/imaging with stability and contraindications.",
    moduleId: IDS.modNeuro,
    usmleStep: "step1",
    organSystem: "Nervous System",
    physicianTask: "Management",
    contentCategory: "Neuroscience",
    objectiveId: "obj-neuro-5",
    difficulty: 3,
  },
];

export const wave4Flashcards: Flashcard[] = [
  {
    id: "fc-36",
    lessonId: "les-cell-5",
    front: "Hyperplasia vs hypertrophy vs metaplasia vs dysplasia",
    back: "More cells / bigger cells / cell-type switch / disordered growth with atypia — neoplasia is clonal autonomy.",
    objectiveId: "obj-cell-6",
  },
  {
    id: "fc-37",
    lessonId: "les-cell-6",
    front: "Invasion definition",
    back: "Tumor cells breach basement membrane → invasive carcinoma; metastasis requires invasion + dissemination + colonization.",
    objectiveId: "obj-cell-7",
  },
  {
    id: "fc-38",
    lessonId: "les-cv-6",
    front: "AS vs AR murmur timing",
    back: "AS = systolic ejection; AR = diastolic decrescendo at left sternal border.",
    objectiveId: "obj-cv-7",
  },
  {
    id: "fc-39",
    lessonId: "les-pulm-5",
    front: "Asthma vs COPD one-liner",
    back: "Asthma: reversible obstruction + inflammation; COPD: largely irreversible airflow limitation (emphysema/chronic bronchitis).",
    objectiveId: "obj-pulm-5",
  },
  {
    id: "fc-40",
    lessonId: "les-renal-5",
    front: "Hyperkalemia ABC",
    back: "Stabilize (Ca) → Shift (insulin/glucose, β-agonists) → Remove (binders/dialysis) + treat cause.",
    objectiveId: "obj-renal-5",
  },
  {
    id: "fc-41",
    lessonId: "les-endo-4",
    front: "Primary vs secondary AI",
    back: "Primary: low cortisol+aldosterone, high ACTH (± pigment). Secondary: low ACTH/cortisol, aldosterone relatively spared.",
    objectiveId: "obj-endo-4",
  },
  {
    id: "fc-42",
    lessonId: "les-neuro-5",
    front: "Meningitis triad+",
    back: "Fever, nuchal rigidity, altered mentation/headache — treat urgently if bacterial suspected.",
    objectiveId: "obj-neuro-5",
  },
  {
    id: "fc-43",
    lessonId: "les-gi-5",
    front: "Pancreatitis diagnosis",
    back: "2 of 3: characteristic pain, lipase/amylase ≥3× ULN, imaging findings.",
    objectiveId: "obj-gi-5",
  },
  {
    id: "fc-44",
    lessonId: "les-surg-4",
    front: "Trauma primary survey",
    back: "A (airway/C-spine) → B → C → D (disability) → E (exposure/environment).",
    objectiveId: "obj-surg-4",
  },
  {
    id: "fc-45",
    lessonId: "les-fm-4",
    front: "T2DM first steps",
    back: "Lifestyle + metformin if tolerated/allowed; add agents by ASCVD/HF/CKD and A1c goals.",
    objectiveId: "obj-fm-4",
  },
];

export const wave4ClinicalCases: ClinicalCase[] = [
  {
    id: "case-renal-2",
    moduleId: IDS.modRenal,
    title: "Peaked T Waves on the Monitor",
    presentationMd:
      "CKD patient misses dialysis; K 7.1, peaked T waves, widening QRS, alert but weak.",
    stages: [
      {
        id: "k1",
        prompt: "List the three physiologic goals of hyperkalemia therapy in order.",
        expectedFocus: "Stabilize membrane → shift K in → remove K / treat cause",
      },
      {
        id: "k2",
        prompt: "Which therapies only temporize vs definitively remove potassium?",
        expectedFocus: "Insulin/beta-agonists shift; dialysis/binders remove",
      },
    ],
    teachingPoints:
      "ECG changes make hyperkalemia an emergency; shifting buys time for removal.",
    objectiveIds: ["obj-renal-5"],
    status: "published",
  },
  {
    id: "case-neuro-1",
    moduleId: IDS.modNeuro,
    title: "Fever and Stiff Neck",
    presentationMd:
      "22-year-old college student: fever, severe headache, photophobia, nuchal rigidity; BP 100/60.",
    stages: [
      {
        id: "n1",
        prompt: "What diagnosis are you racing against and why is time critical?",
        expectedFocus: "Bacterial meningitis — delayed antibiotics worsen outcomes",
      },
      {
        id: "n2",
        prompt: "When might you image before LP, and what must not be delayed?",
        expectedFocus: "Focal neuro signs/papilledema/instability → image; still give timely abx",
      },
    ],
    teachingPoints:
      "Suspect bacterial meningitis → cultures and antibiotics promptly; sequence LP/CT thoughtfully.",
    objectiveIds: ["obj-neuro-5"],
    status: "published",
  },
  {
    id: "case-gi-2",
    moduleId: IDS.modGi,
    title: "Epigastric Pain to the Back",
    presentationMd:
      "48-year-old with alcohol use disorder: severe epigastric pain radiating to back; lipase 900 (ULN 60).",
    stages: [
      {
        id: "g1",
        prompt: "Does this meet diagnostic criteria without CT?",
        expectedFocus: "Yes — pain + lipase ≥3× ULN",
      },
      {
        id: "g2",
        prompt: "Name early management priorities (educational).",
        expectedFocus: "Fluids, analgesia, NPO/early nutrition per pathway, find cause",
      },
    ],
    teachingPoints:
      "Pancreatitis is a clinical + lab diagnosis; early care is supportive and cause-directed.",
    objectiveIds: ["obj-gi-5"],
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

function pushLesson(program: Program, modId: string, lesson: Lesson, quizId: string) {
  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      if (mod.id !== modId) continue;
      mod.lessons.push(lesson);
      if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, quizId];
    }
  }
}

export function applyWave4Expansions(program: Program): Program {
  pushLesson(
    program,
    IDS.modCell,
    {
      id: "les-cell-5",
      moduleId: IDS.modCell,
      title: "Cellular Adaptations & Dysplasia",
      slug: "cell-adaptations",
      sequence: 5,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-cell-5"],
      concepts: [
        {
          id: "con-cell-5a",
          lessonId: "les-cell-5",
          title: "Adaptive vocabulary that predicts cancer risk",
          sequence: 1,
          summary:
            "Precise words prevent mixing reversible adaptation with clonal neoplasia.",
          blocks: [
            reading(
              "blk-cell-5a-r",
              "con-cell-5a",
              "Definitions that matter",
              1,
              `**Hypertrophy**: bigger cells (e.g., myocytes under afterload).  
**Hyperplasia**: more cells (e.g., glandular endometrium).  
**Atrophy**: smaller size/number from disuse, denervation, ischemia, malnutrition.  
**Metaplasia**: one differentiated type → another (bronchial squamous metaplasia in smokers) — reversible if stimulus removed, but may precede dysplasia.  
**Dysplasia**: disordered growth + cytologic atypia — a precancerous warning, not yet invasive cancer.

Neoplasia is *clonal autonomous growth* — benign or malignant.`,
            ),
            vignette(
              "blk-cell-5a-x",
              "con-cell-5a",
              "Vignette: Barrett esophagus",
              2,
              `Name the adaptive process and why surveillance exists.`,
            ),
          ],
        },
      ],
    },
    "qq-cell-5",
  );

  pushLesson(
    program,
    IDS.modCell,
    {
      id: "les-cell-6",
      moduleId: IDS.modCell,
      title: "Invasion & Metastasis Steps",
      slug: "cell-invasion-metastasis",
      sequence: 6,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-cell-6"],
      concepts: [
        {
          id: "con-cell-6a",
          lessonId: "les-cell-6",
          title: "From in situ to distant colony",
          sequence: 1,
          summary: "Invasion of basement membrane is the histologic hinge to carcinoma.",
          blocks: [
            reading(
              "blk-cell-6a-r",
              "con-cell-6a",
              "Metastatic cascade (teaching map)",
              1,
              `1. Loss of adhesion / epithelial–mesenchymal programs  
2. Protease-mediated basement membrane invasion  
3. Intravasation into vessels/lymphatics  
4. Survival in circulation  
5. Extravasation and colonization of a niche

Carcinoma in situ has not invaded. Grade describes differentiation; stage describes anatomic extent — do not conflate them.`,
            ),
          ],
        },
      ],
    },
    "qq-cell-6",
  );

  pushLesson(
    program,
    IDS.modCvb,
    {
      id: "les-cv-6",
      moduleId: IDS.modCvb,
      title: "Valvular Heart Disease Hemodynamics",
      slug: "cv-valves",
      sequence: 6,
      estimatedMinutes: 40,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-cv-6"],
      concepts: [
        {
          id: "con-cv-6a",
          lessonId: "les-cv-6",
          title: "Murmur timing maps to physiology",
          sequence: 1,
          summary: "Systolic vs diastolic timing plus radiation localizes lesions.",
          blocks: [
            reading(
              "blk-cv-6a-r",
              "con-cv-6a",
              "High-yield valves",
              1,
              `## Aortic stenosis
Fixed outflow obstruction → LV pressure overload → syncope/angina/dyspnea triad teaching. Systolic crescendo-decrescendo at RUSB → carotids.

## Aortic regurgitation
Diastolic reverse flow → wide pulse pressure; diastolic decrescendo.

## Mitral stenosis
Diastolic rumble; often rheumatic history teaching; left atrial pressure↑ → pulmonary congestion.

## Mitral regurgitation
Systolic regurgitant murmur; volume load on LA/LV.

Learn physiology first; echo confirms severity in clinical care.`,
            ),
            vignette(
              "blk-cv-6a-x",
              "con-cv-6a",
              "Vignette: syncope + delayed carotid upstroke",
              2,
              `Which valve lesion and what hemodynamic story?`,
            ),
          ],
        },
      ],
    },
    "qq-cv-6",
  );

  pushLesson(
    program,
    IDS.modPulm,
    {
      id: "les-pulm-5",
      moduleId: IDS.modPulm,
      title: "Asthma & COPD Mechanisms",
      slug: "pulm-asthma-copd",
      sequence: 5,
      estimatedMinutes: 40,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-pulm-5"],
      concepts: [
        {
          id: "con-pulm-5a",
          lessonId: "les-pulm-5",
          title: "Reversible vs fixed obstruction",
          sequence: 1,
          summary: "Spirometry and smoking history separate phenotypes; acute care shares airway priorities.",
          blocks: [
            reading(
              "blk-pulm-5a-r",
              "con-pulm-5a",
              "Obstructive disease map",
              1,
              `**Asthma**: episodic reversible obstruction, eosinophilic/Th2 inflammation common, hyperresponsiveness, nocturnal symptoms.  
**COPD**: smoking/α1-AT contexts; emphysema (alveolar destruction, ↓DLCO) vs chronic bronchitis (productive cough). Obstruction largely irreversible.

### Acute exacerbation priorities (educational)
Oxygen to target sats, bronchodilators, steroids when indicated, ventilatory support if failing — exact regimens are protocolized.`,
            ),
          ],
        },
      ],
    },
    "qq-pulm-5",
  );

  pushLesson(
    program,
    IDS.modRenal,
    {
      id: "les-renal-5",
      moduleId: IDS.modRenal,
      title: "Hyperkalemia Emergency Framework",
      slug: "renal-hyperkalemia",
      sequence: 5,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-renal-5"],
      concepts: [
        {
          id: "con-renal-5a",
          lessonId: "les-renal-5",
          title: "Membrane, shift, remove",
          sequence: 1,
          summary: "ECG-guided urgency; temporizing shifts are not definitive removal.",
          blocks: [
            reading(
              "blk-renal-5a-r",
              "con-renal-5a",
              "Hyperkalemia physiology",
              1,
              `High extracellular K → resting membrane less negative → conduction risk (peaked T, wide QRS, sine wave, asystole).

**Stabilize**: IV calcium if ECG changes (does not lower K).  
**Shift**: insulin±glucose, β2-agonists; bicarbonate in select metabolic acidosis.  
**Remove**: binders, diuretics if functioning kidneys, dialysis.  
**Cause**: AKI, drugs (ACEi/ARB/spironolactone), cell lysis, hypoaldosteronism.

Never invent doses here — learn the sequence and verify protocols.`,
            ),
            vignette(
              "blk-renal-5a-x",
              "con-renal-5a",
              "Vignette: missed dialysis",
              2,
              `Order your first three actions and name one definitive removal method.`,
            ),
          ],
        },
      ],
    },
    "qq-renal-5",
  );

  pushLesson(
    program,
    IDS.modEndo,
    {
      id: "les-endo-4",
      moduleId: IDS.modEndo,
      title: "Adrenal Insufficiency & Cushing Axis",
      slug: "endo-adrenal",
      sequence: 4,
      estimatedMinutes: 40,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-endo-4"],
      concepts: [
        {
          id: "con-endo-4a",
          lessonId: "les-endo-4",
          title: "ACTH tells the story",
          sequence: 1,
          summary: "Primary vs secondary AI and cortisol excess localize on the HPA axis.",
          blocks: [
            reading(
              "blk-endo-4a-r",
              "con-endo-4a",
              "Adrenal axis map",
              1,
              `## Adrenal insufficiency
**Primary**: adrenal destruction → ↓cortisol + ↓aldosterone, ↑ACTH (hyperpigmentation), hyperkalemia/hyponatremia. Crisis = shock needing stress-dose steroids + fluids.  
**Secondary**: pituitary ACTH↓ → cortisol↓, aldosterone relatively spared (RAAS intact).

## Cushing syndrome
Excess cortisol — ACTH-dependent (pituitary adenoma / ectopic) vs ACTH-independent (adrenal). Clinical: central obesity, purple striae, hypertension, hyperglycemia.

Educational focus: axis logic before brand-name assays.`,
            ),
          ],
        },
      ],
    },
    "qq-endo-4",
  );

  pushLesson(
    program,
    IDS.modNeuro,
    {
      id: "les-neuro-5",
      moduleId: IDS.modNeuro,
      title: "Meningitis & Encephalitis Urgency",
      slug: "neuro-meningitis",
      sequence: 4,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-neuro-5"],
      concepts: [
        {
          id: "con-neuro-5a",
          lessonId: "les-neuro-5",
          title: "Time-critical CNS infection",
          sequence: 1,
          summary: "Meningeal signs vs encephalitis (brain parenchyma) change the syndrome but share urgency.",
          blocks: [
            reading(
              "blk-neuro-5a-r",
              "con-neuro-5a",
              "CNS infection pathway",
              1,
              `**Meningitis**: fever, headache, nuchal rigidity ± altered mentation.  
**Encephalitis**: more prominent brain dysfunction (behavior, seizures, focal deficits) — HSV temporal lobe classic teaching.

Do not delay antibiotics/antivirals when suspicion is high. Image before LP if focal signs, papilledema, seizures, immunocompromise, or instability — but give therapy while arranging studies.

CSF patterns (bacterial vs viral) are taught after clinical stabilization priorities.`,
            ),
          ],
        },
      ],
    },
    "qq-neuro-5",
  );

  pushLesson(
    program,
    IDS.modGi,
    {
      id: "les-gi-5",
      moduleId: IDS.modGi,
      title: "Acute Pancreatitis Essentials",
      slug: "gi-pancreatitis",
      sequence: 5,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-gi-5"],
      concepts: [
        {
          id: "con-gi-5a",
          lessonId: "les-gi-5",
          title: "Diagnosis and early care",
          sequence: 1,
          summary: "Gallstones and alcohol dominate causes; early care is supportive.",
          blocks: [
            reading(
              "blk-gi-5a-r",
              "con-gi-5a",
              "Pancreatitis framework",
              1,
              `Diagnose with 2 of 3: characteristic pain, enzymes ≥3× ULN, imaging.  
Causes: gallstones, alcohol, triglycerides, drugs, post-ERCP, idiopathic.  
Early priorities: fluid resuscitation, analgesia, monitor organ failure, nutrition per evidence-based pathways, treat cause (e.g., cholangitis/ERCP when indicated).

Severity scores exist clinically — learn organ-failure thinking, not memorizing one score blindly.`,
            ),
            vignette(
              "blk-gi-5a-x",
              "con-gi-5a",
              "Vignette: lipase 15× ULN",
              2,
              `List causes to investigate and first supportive steps.`,
            ),
          ],
        },
      ],
    },
    "qq-gi-5",
  );

  pushLesson(
    program,
    IDS.modIm,
    {
      id: "les-im-5",
      moduleId: IDS.modIm,
      title: "Community Pneumonia Disposition",
      slug: "im-cap-disposition",
      sequence: 5,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-im-5"],
      concepts: [
        {
          id: "con-im-5a",
          lessonId: "les-im-5",
          title: "Severity over the radiograph alone",
          sequence: 1,
          summary: "Vitals, oxygenation, and comorbidities drive level of care.",
          blocks: [
            reading(
              "blk-im-5a-r",
              "con-im-5a",
              "CAP clerkship map",
              1,
              `Confirm infiltrate + syndrome, assess PSI/CURB-65-style risk conceptually, check O2 and sepsis signs.  
Outpatient vs ward vs ICU hinges on stability, not only how white the CXR looks. Cover likely pathogens; narrow when cultures return.`,
            ),
          ],
        },
      ],
    },
    "qq-im-5",
  );

  pushLesson(
    program,
    IDS.modSurg,
    {
      id: "les-surg-4",
      moduleId: IDS.modSurg,
      title: "Trauma Primary Survey",
      slug: "surg-trauma-abc",
      sequence: 4,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-surg-4"],
      concepts: [
        {
          id: "con-surg-4a",
          lessonId: "les-surg-4",
          title: "ABCDE before the CT wish list",
          sequence: 1,
          summary: "Life threats first; secondary survey later.",
          blocks: [
            reading(
              "blk-surg-4a-r",
              "con-surg-4a",
              "Primary survey",
              1,
              `**A** Airway + C-spine protection  
**B** Breathing (pneumothorax, open chest wounds)  
**C** Circulation / hemorrhage control  
**D** Disability (GCS, pupils)  
**E** Exposure / environment (hypothermia)

Massive hemorrhage may reorder priorities in modern trauma systems — learn the principle of physiologic threats first.`,
            ),
          ],
        },
      ],
    },
    "qq-surg-4",
  );

  pushLesson(
    program,
    IDS.modPeds,
    {
      id: "les-peds-5",
      moduleId: IDS.modPeds,
      title: "Dehydration in Gastroenteritis",
      slug: "peds-dehydration",
      sequence: 5,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-peds-5"],
      concepts: [
        {
          id: "con-peds-5a",
          lessonId: "les-peds-5",
          title: "ORS vs IV",
          sequence: 1,
          summary: "Most pediatric gastroenteritis rehydrates orally if mild–moderate and drinking.",
          blocks: [
            reading(
              "blk-peds-5a-r",
              "con-peds-5a",
              "Rehydration reasoning",
              1,
              `Assess mental status, eyes/mucosa, tears, capillary refill, skin turgor, urine output.  
Mild–moderate + able to drink → ORS. Severe / shock / inability to drink → IV pathway. Avoid juice/soda as primary rehydration fluid.`,
            ),
          ],
        },
      ],
    },
    "qq-peds-5",
  );

  pushLesson(
    program,
    IDS.modFm,
    {
      id: "les-fm-4",
      moduleId: IDS.modFm,
      title: "Type 2 Diabetes First Steps",
      slug: "fm-t2dm",
      sequence: 4,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-fm-4"],
      concepts: [
        {
          id: "con-fm-4a",
          lessonId: "les-fm-4",
          title: "Lifestyle + metformin foundation",
          sequence: 1,
          summary: "Match add-on therapy to ASCVD, HF, and CKD as evidence evolves.",
          blocks: [
            reading(
              "blk-fm-4a-r",
              "con-fm-4a",
              "Outpatient T2DM map",
              1,
              `Confirm diagnosis, counsel nutrition/activity/weight, screen complications.  
Metformin first when eGFR/tolerability allow. Add SGLT2i/GLP-1 RA thinking when ASCVD/HF/CKD dominate modern guidelines — verify current society recommendations in practice.

Hypoglycemia risk rises with insulin/sulfonylureas — teach safety.`,
            ),
          ],
        },
      ],
    },
    "qq-fm-4",
  );

  return program;
}
