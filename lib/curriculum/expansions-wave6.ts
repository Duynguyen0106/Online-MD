import type {
  ClinicalCase,
  Flashcard,
  Objective,
  Program,
  QbankQuestion,
  QuizQuestion,
} from "@/lib/types/domain";
import { IDS } from "@/lib/curriculum/seed";

/** Sixth-wave: thicken Surgery/FM and add respiratory, oncology, wound, gallbladder depth. */

export const wave6Objectives: Objective[] = [
  {
    id: "obj-surg-5",
    code: "OBJ-P2-SURG-005",
    statement:
      "Evaluate biliary colic vs acute cholecystitis using Murphy sign and systemic features.",
    usmleStep: "step2ck",
    organSystem: "Gastrointestinal",
    physicianTask: "Diagnosis",
    contentCategory: "Surgery",
    moduleId: IDS.modSurg,
    lessonIds: ["les-surg-5"],
  },
  {
    id: "obj-surg-6",
    code: "OBJ-P2-SURG-006",
    statement:
      "Classify wound healing phases and factors that impair healing.",
    usmleStep: "step2ck",
    organSystem: "Multisystem",
    physicianTask: "Knowledge",
    contentCategory: "Surgery",
    moduleId: IDS.modSurg,
    lessonIds: ["les-surg-6"],
  },
  {
    id: "obj-surg-7",
    code: "OBJ-P2-SURG-007",
    statement:
      "Risk-stratify preoperative patients using cardiac and airway considerations conceptually.",
    usmleStep: "step2ck",
    organSystem: "Multisystem",
    physicianTask: "Management",
    contentCategory: "Surgery",
    moduleId: IDS.modSurg,
    lessonIds: ["les-surg-7"],
  },
  {
    id: "obj-fm-5",
    code: "OBJ-P2-FM-005",
    statement:
      "Apply outpatient asthma control assessment and step-up controller reasoning.",
    usmleStep: "step2ck",
    organSystem: "Respiratory",
    physicianTask: "Management",
    contentCategory: "Family Medicine",
    moduleId: IDS.modFm,
    lessonIds: ["les-fm-5"],
  },
  {
    id: "obj-fm-6",
    code: "OBJ-P2-FM-006",
    statement:
      "Screen and counsel for depression and anxiety in primary care with safety nets.",
    usmleStep: "step2ck",
    organSystem: "Behavioral Health",
    physicianTask: "Management",
    contentCategory: "Family Medicine",
    moduleId: IDS.modFm,
    lessonIds: ["les-fm-6"],
  },
  {
    id: "obj-fm-7",
    code: "OBJ-P2-FM-007",
    statement:
      "Interpret lipid panels and apply ASCVD risk–based statin reasoning.",
    usmleStep: "step2ck",
    organSystem: "Cardiovascular",
    physicianTask: "Management",
    contentCategory: "Family Medicine",
    moduleId: IDS.modFm,
    lessonIds: ["les-fm-7"],
  },
  {
    id: "obj-pulm-6",
    code: "OBJ-P1-PULM-006",
    statement:
      "Interpret ABGs using pH, PaCO2, HCO3 and A–a gradient thinking.",
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Diagnosis",
    contentCategory: "Physiology",
    moduleId: IDS.modPulm,
    lessonIds: ["les-pulm-6"],
  },
  {
    id: "obj-pulm-7",
    code: "OBJ-P1-PULM-007",
    statement:
      "Localize pleural effusions as transudate vs exudate using Light criteria logic.",
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modPulm,
    lessonIds: ["les-pulm-7"],
  },
  {
    id: "obj-heme-6",
    code: "OBJ-P1-HEME-006",
    statement:
      "Contrast acute leukemias by blast lineage clues and clinical urgency.",
    usmleStep: "step1",
    organSystem: "Hematopoietic / Lymphoreticular",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modHeme,
    lessonIds: ["les-heme-6"],
  },
  {
    id: "obj-heme-7",
    code: "OBJ-P1-HEME-007",
    statement:
      "Recognize tumor lysis syndrome electrolyte pattern and emergency priorities.",
    usmleStep: "step1",
    organSystem: "Hematopoietic / Lymphoreticular",
    physicianTask: "Management",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modHeme,
    lessonIds: ["les-heme-7"],
  },
  {
    id: "obj-gi-7",
    code: "OBJ-P1-GI-007",
    statement:
      "Differentiate cholestatic vs hepatocellular injury patterns on LFTs.",
    usmleStep: "step1",
    organSystem: "Gastrointestinal",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modGi,
    lessonIds: ["les-gi-7"],
  },
  {
    id: "obj-endo-6",
    code: "OBJ-P1-ENDO-006",
    statement:
      "Map diabetes microvascular and macrovascular complications to screening priorities.",
    usmleStep: "step1",
    organSystem: "Endocrine",
    physicianTask: "Management",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modEndo,
    lessonIds: ["les-endo-6"],
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

export const wave6QuizQuestions: QuizQuestion[] = [
  q(
    "qq-surg-5",
    "RUQ pain + fever + positive Murphy sign most suggests:",
    [
      "Acute cholecystitis",
      "Uncomplicated biliary colic without inflammation",
      "Primary pneumonia exclusively",
      "GERD only",
    ],
    0,
    "Fever + Murphy sign elevate biliary colic to cholecystitis concern.",
    { lessonId: "les-surg-5", objectiveId: "obj-surg-5" },
  ),
  q(
    "qq-surg-6",
    "Which factor most reliably impairs wound healing?",
    [
      "Uncontrolled hyperglycemia / poor perfusion / smoking",
      "Adequate protein intake",
      "Normothermia and oxygenation",
      "Clean surgical technique alone guaranteeing healing",
    ],
    0,
    "Glucose control, perfusion, oxygen, nutrition, and smoking status critically affect healing.",
    { lessonId: "les-surg-6", objectiveId: "obj-surg-6" },
  ),
  q(
    "qq-surg-7",
    "Preop patient with active unstable angina — principle?",
    [
      "Defer elective surgery until cardiac optimization when feasible",
      "Proceed with all electives regardless of ACS",
      "Ignore cardiac history if labs are normal",
      "Only check triglycerides",
    ],
    0,
    "Active cardiac conditions warrant delay/optimization of elective cases.",
    { lessonId: "les-surg-7", objectiveId: "obj-surg-7" },
  ),
  q(
    "qq-fm-5",
    "Daytime symptoms most days + night awakenings weekly — asthma control?",
    [
      "Not well controlled — consider step-up controller therapy",
      "Perfect control — stop all inhalers",
      "COPD by definition",
      "Ignore ACT/GINA-style control questions",
    ],
    0,
    "Frequent symptoms mean poor control; step up anti-inflammatory controller therapy.",
    { lessonId: "les-fm-5", objectiveId: "obj-fm-5" },
  ),
  q(
    "qq-fm-6",
    "Positive PHQ-9 with SI in clinic — first priority?",
    [
      "Assess acuity of suicide risk and ensure safety plan / urgent pathway",
      "Only refill metformin",
      "Discharge without documentation",
      "Start MAOI without evaluation",
    ],
    0,
    "Primary care depression care always includes safety assessment when SI is present.",
    { lessonId: "les-fm-6", objectiveId: "obj-fm-6" },
  ),
  q(
    "qq-fm-7",
    "LDL 190 without secondary cause — statin reasoning?",
    [
      "High-intensity statin indicated in foundational guideline teaching",
      "Never treat lipids if asymptomatic",
      "Only diet forever without pharmacologic option",
      "Start estrogen as lipid therapy first-line in all adults",
    ],
    0,
    "Very high LDL is a statin indication independent of calculated risk in core teaching.",
    { lessonId: "les-fm-7", objectiveId: "obj-fm-7" },
  ),
  q(
    "qq-pulm-6",
    "pH 7.25, PaCO2 60, HCO3 26 — primary process?",
    [
      "Acute respiratory acidosis",
      "Metabolic alkalosis",
      "Respiratory alkalosis",
      "Normal acid–base",
    ],
    0,
    "Low pH + high PaCO2 = respiratory acidosis; HCO3 near normal suggests acute.",
    { lessonId: "les-pulm-6", objectiveId: "obj-pulm-6" },
  ),
  q(
    "qq-pulm-7",
    "Pleural fluid protein/serum protein >0.5 and LDH criteria met — effusion type?",
    [
      "Exudate (Light criteria)",
      "Transudate from CHF exclusively",
      "Normal pleural fluid",
      "Always chylothorax",
    ],
    0,
    "Light criteria positive → exudate; pursue infection/malignancy/PE/etc.",
    { lessonId: "les-pulm-7", objectiveId: "obj-pulm-7" },
  ),
  q(
    "qq-heme-6",
    "Child with blasts, bone pain, cytopenias — urgency frame?",
    [
      "Acute leukemia until proven otherwise — urgent hematology",
      "Iron deficiency only",
      "Stable chronic anemia observation for months",
      "Primary hyperthyroidism",
    ],
    0,
    "Blasts + cytopenias are a hematologic emergency workup.",
    { lessonId: "les-heme-6", objectiveId: "obj-heme-6" },
  ),
  q(
    "qq-heme-7",
    "After starting chemo: high K, high PO4, high uric acid, low Ca — syndrome?",
    [
      "Tumor lysis syndrome",
      "SIADH exclusively",
      "Primary hyperparathyroidism",
      "Refeeding syndrome with low phosphate only",
    ],
    0,
    "TLS: hyperkalemia, hyperphosphatemia, hyperuricemia, secondary hypocalcemia.",
    { lessonId: "les-heme-7", objectiveId: "obj-heme-7" },
  ),
  q(
    "qq-gi-7",
    "ALP and GGT markedly elevated with milder AST/ALT — pattern?",
    [
      "Cholestatic injury pattern",
      "Pure hepatocellular necrosis only",
      "Muscle injury exclusively",
      "Normal pregnancy physiology always",
    ],
    0,
    "ALP±GGT predominance = cholestatic; hepatocellular shows AST/ALT predominance.",
    { lessonId: "les-gi-7", objectiveId: "obj-gi-7" },
  ),
  q(
    "qq-endo-6",
    "Longstanding diabetes eye screening targets which microvascular complication?",
    [
      "Diabetic retinopathy",
      "Aortic dissection exclusively",
      "Otitis media",
      "Primary biliary cholangitis",
    ],
    0,
    "Retinopathy, nephropathy, neuropathy are classic microvascular complications.",
    { lessonId: "les-endo-6", objectiveId: "obj-endo-6" },
  ),
];

export const wave6QbankQuestions: QbankQuestion[] = [
  {
    id: "qb-19",
    stem: "RUQ pain after fatty meal, fever 38.7, +Murphy. Next imaging/path frame?",
    choices: [
      { id: "qb-19-c0", text: "Acute cholecystitis — RUQ ultrasound first-line often" },
      { id: "qb-19-c1", text: "Uncomplicated GERD — PPI only" },
      { id: "qb-19-c2", text: "Ignore fever as biliary colic" },
      { id: "qb-19-c3", text: "Primary pyelonephritis without GU symptoms" },
    ],
    correctChoiceId: "qb-19-c0",
    explanation:
      "Fever + Murphy → cholecystitis; ultrasound is common first imaging.",
    moduleId: IDS.modSurg,
    usmleStep: "step2ck",
    organSystem: "Gastrointestinal",
    physicianTask: "Diagnosis",
    contentCategory: "Surgery",
    objectiveId: "obj-surg-5",
    difficulty: 2,
  },
  {
    id: "qb-20",
    stem: "pH 7.50, PaCO2 28, HCO3 22. Primary disorder?",
    choices: [
      { id: "qb-20-c0", text: "Respiratory alkalosis" },
      { id: "qb-20-c1", text: "Metabolic acidosis" },
      { id: "qb-20-c2", text: "Respiratory acidosis" },
      { id: "qb-20-c3", text: "Normal ABG" },
    ],
    correctChoiceId: "qb-20-c0",
    explanation: "High pH + low PaCO2 = respiratory alkalosis.",
    moduleId: IDS.modPulm,
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Diagnosis",
    contentCategory: "Physiology",
    objectiveId: "obj-pulm-6",
    difficulty: 2,
  },
  {
    id: "qb-21",
    stem: "Day 1 induction chemo: K 6.4, PO4 high, uric acid high, Cr rising.",
    choices: [
      {
        id: "qb-21-c0",
        text: "Tumor lysis — fluids, lower uric acid, manage electrolytes, monitor renal",
      },
      { id: "qb-21-c1", text: "Ignore labs if patient feels well" },
      { id: "qb-21-c2", text: "Give potassium supplementation" },
      { id: "qb-21-c3", text: "Primary SIADH treatment only" },
    ],
    correctChoiceId: "qb-21-c0",
    explanation:
      "TLS is an oncologic emergency: hydrate, control uric acid, fix electrolytes, protect kidneys.",
    moduleId: IDS.modHeme,
    usmleStep: "step1",
    organSystem: "Hematopoietic / Lymphoreticular",
    physicianTask: "Management",
    contentCategory: "Pathophysiology",
    objectiveId: "obj-heme-7",
    difficulty: 3,
  },
];

export const wave6Flashcards: Flashcard[] = [
  {
    id: "fc-56",
    lessonId: "les-surg-5",
    front: "Biliary colic vs cholecystitis",
    back: "Colic: transient postprandial RUQ pain. Cholecystitis: prolonged pain + fever/leukocytosis/+Murphy.",
    objectiveId: "obj-surg-5",
  },
  {
    id: "fc-57",
    lessonId: "les-surg-6",
    front: "Wound healing phases",
    back: "Hemostasis → inflammation → proliferation → remodeling. Impaired by ischemia, glucose, steroids, smoking, infection.",
    objectiveId: "obj-surg-6",
  },
  {
    id: "fc-58",
    lessonId: "les-fm-5",
    front: "Asthma control questions",
    back: "Day symptoms, night awakenings, activity limit, reliever use, exacerbations → step therapy.",
    objectiveId: "obj-fm-5",
  },
  {
    id: "fc-59",
    lessonId: "les-fm-7",
    front: "Statin benefit groups (core)",
    back: "Clinical ASCVD; LDL≥190; diabetes age 40–75; elevated 10-year risk — verify current guidelines.",
    objectiveId: "obj-fm-7",
  },
  {
    id: "fc-60",
    lessonId: "les-pulm-6",
    front: "ABG first look",
    back: "pH → primary metabolic vs respiratory (HCO3 vs PaCO2) → compensation → A–a if hypoxemia.",
    objectiveId: "obj-pulm-6",
  },
  {
    id: "fc-61",
    lessonId: "les-pulm-7",
    front: "Light criteria",
    back: "Exudate if PF/serum protein >0.5, PF/serum LDH >0.6, or PF LDH >2/3 ULN serum.",
    objectiveId: "obj-pulm-7",
  },
  {
    id: "fc-62",
    lessonId: "les-heme-7",
    front: "TLS labs",
    back: "↑K ↑PO4 ↑uric acid ↓Ca ± AKI — hydrate and lower uric acid; treat hyperkalemia.",
    objectiveId: "obj-heme-7",
  },
  {
    id: "fc-63",
    lessonId: "les-gi-7",
    front: "LFT patterns",
    back: "Hepatocellular: AST/ALT↑↑. Cholestatic: ALP/GGT↑↑. Mixed possible.",
    objectiveId: "obj-gi-7",
  },
  {
    id: "fc-64",
    lessonId: "les-endo-6",
    front: "Diabetes complication buckets",
    back: "Micro: retina, kidney, nerves. Macro: CAD, stroke, PAD. Screen and risk-reduce.",
    objectiveId: "obj-endo-6",
  },
  {
    id: "fc-65",
    lessonId: "les-surg-7",
    front: "Preop cardiac principle",
    back: "Active ACS/decompensated HF/severe arrhythmia/valvular disease → optimize before elective surgery.",
    objectiveId: "obj-surg-7",
  },
];

export const wave6ClinicalCases: ClinicalCase[] = [
  {
    id: "case-surg-2",
    moduleId: IDS.modSurg,
    title: "RUQ Pain and a Positive Murphy Sign",
    presentationMd:
      "42-year-old woman with 18 hours of RUQ pain after fried food; fever 38.6; +Murphy; WBC 14k.",
    stages: [
      {
        id: "b1",
        prompt: "Colic or cholecystitis — what features decide?",
        expectedFocus: "Prolonged pain + fever/Murphy → acute cholecystitis",
      },
      {
        id: "b2",
        prompt: "First imaging and disposition thinking?",
        expectedFocus: "RUQ US; NPO, fluids, abx pathway, surgery consult",
      },
    ],
    teachingPoints:
      "Murphy + systemic signs change the diagnosis from colic to cholecystitis.",
    objectiveIds: ["obj-surg-5"],
    status: "published",
  },
  {
    id: "case-pulm-2",
    moduleId: IDS.modPulm,
    title: "ABG After an Opioid Overdose",
    presentationMd:
      "Somnolent patient after opioids; ABG pH 7.22, PaCO2 68, HCO3 27, PaO2 55 on room air.",
    stages: [
      {
        id: "a1",
        prompt: "Name the primary acid–base disorder.",
        expectedFocus: "Acute respiratory acidosis",
      },
      {
        id: "a2",
        prompt: "What is the immediate physiologic priority?",
        expectedFocus: "Airway/ventilation — reverse hypoventilation",
      },
    ],
    teachingPoints:
      "ABGs diagnose the process; treating the cause (ventilation) comes first.",
    objectiveIds: ["obj-pulm-6"],
    status: "published",
  },
  {
    id: "case-heme-2",
    moduleId: IDS.modHeme,
    title: "Electrolytes After Induction",
    presentationMd:
      "Young adult with ALL day 1 chemo: K 6.2, PO4 6.8, uric acid 14, Ca 6.9, Cr up from baseline.",
    stages: [
      {
        id: "t1",
        prompt: "Syndrome name and the dangerous electrolytes?",
        expectedFocus: "TLS — hyperK, hyperPO4, hyperuricemia, hypoCa",
      },
      {
        id: "t2",
        prompt: "List parallel management priorities.",
        expectedFocus: "IV fluids, uric acid control, treat hyperK, monitor renal/telemetry",
      },
    ],
    teachingPoints:
      "TLS is predictable in bulky/chemosensitive tumors — prevent and treat aggressively.",
    objectiveIds: ["obj-heme-7"],
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

export function applyWave6Expansions(program: Program): Program {
  pushLesson(
    program,
    IDS.modSurg,
    {
      id: "les-surg-5",
      moduleId: IDS.modSurg,
      title: "Biliary Colic & Cholecystitis",
      slug: "surg-biliary",
      sequence: 5,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-surg-5"],
      concepts: [
        {
          id: "con-surg-5a",
          lessonId: "les-surg-5",
          title: "From stone to inflamed gallbladder",
          sequence: 1,
          summary: "Transient obstruction vs sustained cystic duct obstruction with inflammation.",
          blocks: [
            reading(
              "blk-surg-5a-r",
              "con-surg-5a",
              "Biliary disease map",
              1,
              `**Biliary colic**: episodic postprandial RUQ/epigastric pain when a stone transiently obstructs; patient often afebrile between attacks.  
**Acute cholecystitis**: persistent obstruction → gallbladder inflammation; fever, leukocytosis, +Murphy sign.  

Ultrasound first-line often (stones, wall thickening, pericholecystic fluid, sonographic Murphy). Choledocholithiasis/cholangitis add jaundice and Charcot/Reynolds teaching. NPO, fluids, antibiotics, surgical consult for cholecystitis.`,
            ),
            vignette(
              "blk-surg-5a-x",
              "con-surg-5a",
              "Vignette: 18 hours of RUQ pain",
              2,
              `Distinguish colic vs cholecystitis and list first orders.`,
            ),
          ],
        },
      ],
    },
    "qq-surg-5",
  );

  pushLesson(
    program,
    IDS.modSurg,
    {
      id: "les-surg-6",
      moduleId: IDS.modSurg,
      title: "Wound Healing Biology",
      slug: "surg-wound-healing",
      sequence: 6,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-surg-6"],
      concepts: [
        {
          id: "con-surg-6a",
          lessonId: "les-surg-6",
          title: "Phases and failure modes",
          sequence: 1,
          summary: "Healing is biology you can optimize or sabotage.",
          blocks: [
            reading(
              "blk-surg-6a-r",
              "con-surg-6a",
              "Healing phases",
              1,
              `Hemostasis → inflammation → proliferation (granulation, collagen, epithelialization) → remodeling.  

Impair: ischemia, hypoxia, smoking, uncontrolled diabetes, steroids/immunosuppression, malnutrition, infection, foreign bodies, radiation.  

Clinical pearl: optimize host factors as aggressively as you plan the incision.`,
            ),
          ],
        },
      ],
    },
    "qq-surg-6",
  );

  pushLesson(
    program,
    IDS.modSurg,
    {
      id: "les-surg-7",
      moduleId: IDS.modSurg,
      title: "Preoperative Risk Thinking",
      slug: "surg-preop-risk",
      sequence: 7,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-surg-7"],
      concepts: [
        {
          id: "con-surg-7a",
          lessonId: "les-surg-7",
          title: "Active cardiac conditions first",
          sequence: 1,
          summary: "Elective surgery waits for unstable hearts and uncontrolled major disease.",
          blocks: [
            reading(
              "blk-surg-7a-r",
              "con-surg-7a",
              "Preop framework",
              1,
              `Assess urgency (elective vs emergent), functional capacity, active cardiac conditions (unstable ACS, decompensated HF, significant arrhythmia, severe valvular disease), pulmonary risk, meds (anticoagulation, SGLT2i, etc.), airway.  

Emergency surgery proceeds with risk mitigation; elective cases allow optimization. Exact testing algorithms follow guidelines/cardiology — learn the principles here.`,
            ),
          ],
        },
      ],
    },
    "qq-surg-7",
  );

  pushLesson(
    program,
    IDS.modFm,
    {
      id: "les-fm-5",
      moduleId: IDS.modFm,
      title: "Outpatient Asthma Control",
      slug: "fm-asthma-control",
      sequence: 5,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-fm-5"],
      concepts: [
        {
          id: "con-fm-5a",
          lessonId: "les-fm-5",
          title: "Control → step therapy",
          sequence: 1,
          summary: "Ask about control every visit; inhaled corticosteroids are the foundation.",
          blocks: [
            reading(
              "blk-fm-5a-r",
              "con-fm-5a",
              "Primary care asthma",
              1,
              `Assess daytime symptoms, night waking, activity limitation, reliever use, exacerbations (ACT/GINA-style).  
Not well controlled → check inhaler technique/adherence/triggers, then step up ICS-based controller therapy.  
Exacerbation: bronchodilators + steroids when indicated; know when to send to ED (hypoxia, severe work of breathing).`,
            ),
          ],
        },
      ],
    },
    "qq-fm-5",
  );

  pushLesson(
    program,
    IDS.modFm,
    {
      id: "les-fm-6",
      moduleId: IDS.modFm,
      title: "Primary Care Depression & Anxiety",
      slug: "fm-bh-screening",
      sequence: 6,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-fm-6"],
      concepts: [
        {
          id: "con-fm-6a",
          lessonId: "les-fm-6",
          title: "Screen, treat, safety-net",
          sequence: 1,
          summary: "PHQ/GAD tools help; suicidal ideation changes the pathway immediately.",
          blocks: [
            reading(
              "blk-fm-6a-r",
              "con-fm-6a",
              "Behavioral health in FM",
              1,
              `Screen with validated tools; confirm clinical diagnosis; assess suicide risk every positive screen with SI.  
Mild–moderate: therapy ± SSRI/SNRI with follow-up for activation/side effects.  
Severe, psychotic, or unsafe → urgent specialty/ED pathway. Collaborative care improves outcomes.`,
            ),
          ],
        },
      ],
    },
    "qq-fm-6",
  );

  pushLesson(
    program,
    IDS.modFm,
    {
      id: "les-fm-7",
      moduleId: IDS.modFm,
      title: "Lipids & Statin Benefit Groups",
      slug: "fm-lipids",
      sequence: 7,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-fm-7"],
      concepts: [
        {
          id: "con-fm-7a",
          lessonId: "les-fm-7",
          title: "Risk-based prevention",
          sequence: 1,
          summary: "Treat based on ASCVD risk and LDL extremes, not the number alone in isolation.",
          blocks: [
            reading(
              "blk-fm-7a-r",
              "con-fm-7a",
              "Statin reasoning",
              1,
              `Core benefit-group teaching: clinical ASCVD; LDL ≥190; diabetes (age band); elevated 10-year ASCVD risk.  
Lifestyle always. High-intensity vs moderate-intensity depends on group and tolerance.  
Check secondary causes when lipids extreme; monitor adherence and muscle/liver symptoms pragmatically.`,
            ),
          ],
        },
      ],
    },
    "qq-fm-7",
  );

  pushLesson(
    program,
    IDS.modPulm,
    {
      id: "les-pulm-6",
      moduleId: IDS.modPulm,
      title: "ABG Interpretation Framework",
      slug: "pulm-abg",
      sequence: 6,
      estimatedMinutes: 40,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-pulm-6"],
      concepts: [
        {
          id: "con-pulm-6a",
          lessonId: "les-pulm-6",
          title: "pH first, then the partner",
          sequence: 1,
          summary: "Systematic ABG reading prevents missing mixed disorders.",
          blocks: [
            reading(
              "blk-pulm-6a-r",
              "con-pulm-6a",
              "ABG steps",
              1,
              `1. Acidemia or alkalemia (pH)?  
2. Is PaCO2 or HCO3 the primary partner?  
3. Is compensation appropriate (Winters, expected Δ)? If not → mixed disorder.  
4. For hypoxemia: calculate A–a gradient (elevated → V/Q, shunt, diffusion; normal → hypoventilation/low FiO2).

Treat the patient and the cause — ABG is a lens, not the therapy.`,
            ),
            vignette(
              "blk-pulm-6a-x",
              "con-pulm-6a",
              "Vignette: opioid hypoventilation",
              2,
              `Interpret pH 7.22 / PaCO2 68 / HCO3 27 and state first action.`,
            ),
          ],
        },
      ],
    },
    "qq-pulm-6",
  );

  pushLesson(
    program,
    IDS.modPulm,
    {
      id: "les-pulm-7",
      moduleId: IDS.modPulm,
      title: "Pleural Effusion — Transudate vs Exudate",
      slug: "pulm-pleural",
      sequence: 7,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-pulm-7"],
      concepts: [
        {
          id: "con-pulm-7a",
          lessonId: "les-pulm-7",
          title: "Light criteria logic",
          sequence: 1,
          summary: "Transudates are hydrostatic/oncotic; exudates are inflammatory/malignant/infectious.",
          blocks: [
            reading(
              "blk-pulm-7a-r",
              "con-pulm-7a",
              "Effusion workup map",
              1,
              `**Transudate**: CHF, cirrhosis, nephrosis — fix the underlying Starling imbalance.  
**Exudate** (Light criteria): pneumonia (parapneumonic/empyema), malignancy, PE, TB, autoimmune.  

Always integrate clinical pretest probability; bloody/neutrophil-rich/low glucose fluids carry specific implications.`,
            ),
          ],
        },
      ],
    },
    "qq-pulm-7",
  );

  pushLesson(
    program,
    IDS.modHeme,
    {
      id: "les-heme-6",
      moduleId: IDS.modHeme,
      title: "Acute Leukemia Recognition",
      slug: "heme-acute-leukemia",
      sequence: 6,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-heme-6"],
      concepts: [
        {
          id: "con-heme-6a",
          lessonId: "les-heme-6",
          title: "Blasts and marrow failure",
          sequence: 1,
          summary: "Cytopenias + blasts = urgent hematology, not watchful waiting.",
          blocks: [
            reading(
              "blk-heme-6a-r",
              "con-heme-6a",
              "Leukemia urgency",
              1,
              `Fatigue, infections, bleeding, bone pain, circulating blasts. ALL more classic in children; AML across ages with Auer rods in teaching cases.  

Complications: infection, bleeding, DIC (especially APML), leukostasis, TLS. Diagnosis needs morphology/flow/genetics — start with smear and urgent referral.`,
            ),
          ],
        },
      ],
    },
    "qq-heme-6",
  );

  pushLesson(
    program,
    IDS.modHeme,
    {
      id: "les-heme-7",
      moduleId: IDS.modHeme,
      title: "Tumor Lysis Syndrome",
      slug: "heme-tls",
      sequence: 7,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-heme-7"],
      concepts: [
        {
          id: "con-heme-7a",
          lessonId: "les-heme-7",
          title: "Electrolyte emergency of cell death",
          sequence: 1,
          summary: "Bulky chemosensitive tumors release intracellular contents into blood.",
          blocks: [
            reading(
              "blk-heme-7a-r",
              "con-heme-7a",
              "TLS map",
              1,
              `Pattern: ↑K, ↑PO4, ↑uric acid, ↓Ca, ±AKI.  
Prevention/treatment principles: vigorous hydration, uric acid lowering (allopurinol/rasburicase per protocol), treat hyperkalemia, dialysis if needed.  

High-risk: Burkitt, ALL, bulky lymphomas, high WBC AML — anticipate TLS before induction.`,
            ),
          ],
        },
      ],
    },
    "qq-heme-7",
  );

  pushLesson(
    program,
    IDS.modGi,
    {
      id: "les-gi-7",
      moduleId: IDS.modGi,
      title: "Liver Test Pattern Recognition",
      slug: "gi-lft-patterns",
      sequence: 7,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-gi-7"],
      concepts: [
        {
          id: "con-gi-7a",
          lessonId: "les-gi-7",
          title: "Hepatocellular vs cholestatic",
          sequence: 1,
          summary: "Pattern first, diagnosis second.",
          blocks: [
            reading(
              "blk-gi-7a-r",
              "con-gi-7a",
              "LFT framework",
              1,
              `**Hepatocellular**: AST/ALT dominate (viral hepatitis, toxins, ischemia, autoimmune).  
**Cholestatic**: ALP/GGT dominate (obstruction, PBC/PSC, drugs).  
**Isolated bilirubin**: hemolysis vs Gilbert vs obstruction — fractionate.  

Synthetic function (INR, albumin, bilirubin) tells severity more than enzyme height alone.`,
            ),
          ],
        },
      ],
    },
    "qq-gi-7",
  );

  pushLesson(
    program,
    IDS.modEndo,
    {
      id: "les-endo-6",
      moduleId: IDS.modEndo,
      title: "Diabetes Chronic Complications",
      slug: "endo-dm-complications",
      sequence: 6,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-endo-6"],
      concepts: [
        {
          id: "con-endo-6a",
          lessonId: "les-endo-6",
          title: "Micro vs macro",
          sequence: 1,
          summary: "Screen what hyperglycemia quietly destroys.",
          blocks: [
            reading(
              "blk-endo-6a-r",
              "con-endo-6a",
              "Complication map",
              1,
              `**Microvascular**: retinopathy (dilated exams), nephropathy (UACR + eGFR), neuropathy (foot exams).  
**Macrovascular**: CAD, cerebrovascular disease, PAD — aggressive ASCVD risk reduction.  

Glycemic control mainly prevents micro complications; BP/statins/SGLT2i/GLP-1 thinking matter for heart/kidney in modern care.`,
            ),
          ],
        },
      ],
    },
    "qq-endo-6",
  );

  return program;
}
