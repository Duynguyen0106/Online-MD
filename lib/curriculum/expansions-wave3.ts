import type {
  ClinicalCase,
  Flashcard,
  Objective,
  Program,
  QbankQuestion,
  QuizQuestion,
} from "@/lib/types/domain";
import { IDS } from "@/lib/curriculum/seed";

/** Third-wave original clerkship + systems depth (educational, not bank-derived). */

export const wave3Objectives: Objective[] = [
  {
    id: "obj-heme-3",
    code: "OBJ-P1-HEME-003",
    statement:
      "Classify anemias by MCV and reticulocyte response before naming a single disease.",
    usmleStep: "step1",
    organSystem: "Hematopoietic / Lymphoreticular",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modHeme,
    lessonIds: ["les-heme-3"],
  },
  {
    id: "obj-heme-4",
    code: "OBJ-P1-HEME-004",
    statement:
      "Distinguish thrombocytopenia from platelet dysfunction using mucocutaneous bleeding patterns.",
    usmleStep: "step1",
    organSystem: "Hematopoietic / Lymphoreticular",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modHeme,
    lessonIds: ["les-heme-4"],
  },
  {
    id: "obj-id-3",
    code: "OBJ-P1-ID-003",
    statement:
      "Match common community infections to likely pathogens and first empiric logic.",
    usmleStep: "step1",
    organSystem: "Multisystem",
    physicianTask: "Management",
    contentCategory: "Microbiology",
    moduleId: IDS.modId,
    lessonIds: ["les-id-3"],
  },
  {
    id: "obj-id-4",
    code: "OBJ-P1-ID-004",
    statement:
      "Explain HIV opportunistic infection risk by CD4 threshold patterns.",
    usmleStep: "step1",
    organSystem: "Multisystem",
    physicianTask: "Diagnosis",
    contentCategory: "Microbiology",
    moduleId: IDS.modId,
    lessonIds: ["les-id-4"],
  },
  {
    id: "obj-psych-3",
    code: "OBJ-P2-PSY-003",
    statement:
      "Screen and safety-plan for suicidal ideation using structured clinical priorities.",
    usmleStep: "step2ck",
    organSystem: "Behavioral Health",
    physicianTask: "Management",
    contentCategory: "Psychiatry",
    moduleId: IDS.modPsych,
    lessonIds: ["les-psych-3"],
  },
  {
    id: "obj-psych-4",
    code: "OBJ-P2-PSY-004",
    statement:
      "Differentiate delirium from primary psychiatric psychosis using time course and attention.",
    usmleStep: "step2ck",
    organSystem: "Behavioral Health",
    physicianTask: "Diagnosis",
    contentCategory: "Psychiatry",
    moduleId: IDS.modPsych,
    lessonIds: ["les-psych-4"],
  },
  {
    id: "obj-peds-3",
    code: "OBJ-P2-PEDS-003",
    statement:
      "Evaluate fever in the young infant with age-based risk stratification.",
    usmleStep: "step2ck",
    organSystem: "Multisystem",
    physicianTask: "Diagnosis",
    contentCategory: "Pediatrics",
    moduleId: IDS.modPeds,
    lessonIds: ["les-peds-3"],
  },
  {
    id: "obj-peds-4",
    code: "OBJ-P2-PEDS-004",
    statement:
      "Recognize respiratory distress vs failure in bronchiolitis-spectrum illness.",
    usmleStep: "step2ck",
    organSystem: "Respiratory",
    physicianTask: "Management",
    contentCategory: "Pediatrics",
    moduleId: IDS.modPeds,
    lessonIds: ["les-peds-4"],
  },
  {
    id: "obj-obgyn-3",
    code: "OBJ-P2-OB-003",
    statement:
      "Approach first-trimester bleeding with ectopic pregnancy always on the differential.",
    usmleStep: "step2ck",
    organSystem: "Reproductive",
    physicianTask: "Diagnosis",
    contentCategory: "Obstetrics / Gynecology",
    moduleId: IDS.modObgyn,
    lessonIds: ["les-obgyn-3"],
  },
  {
    id: "obj-obgyn-4",
    code: "OBJ-P2-OB-004",
    statement:
      "Interpret postpartum hemorrhage mechanisms: tone, trauma, tissue, thrombin.",
    usmleStep: "step2ck",
    organSystem: "Reproductive",
    physicianTask: "Management",
    contentCategory: "Obstetrics / Gynecology",
    moduleId: IDS.modObgyn,
    lessonIds: ["les-obgyn-4"],
  },
  {
    id: "obj-surg-3",
    code: "OBJ-P2-SURG-003",
    statement:
      "Risk-stratify appendicitis vs alternative RUQ/RLQ diagnoses with exam and imaging logic.",
    usmleStep: "step2ck",
    organSystem: "Gastrointestinal",
    physicianTask: "Diagnosis",
    contentCategory: "Surgery",
    moduleId: IDS.modSurg,
    lessonIds: ["les-surg-3"],
  },
  {
    id: "obj-fm-3",
    code: "OBJ-P2-FM-003",
    statement:
      "Titrate hypertension therapy using comorbidity-aware first-line class reasoning.",
    usmleStep: "step2ck",
    organSystem: "Cardiovascular",
    physicianTask: "Management",
    contentCategory: "Family Medicine",
    moduleId: IDS.modFm,
    lessonIds: ["les-fm-3"],
  },
  {
    id: "obj-msk-3",
    code: "OBJ-P1-MSK-003",
    statement:
      "Localize low back pain red flags that require urgent imaging or laboratory workup.",
    usmleStep: "step1",
    organSystem: "Musculoskeletal",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modMsk,
    lessonIds: ["les-msk-3"],
  },
  {
    id: "obj-im-4",
    code: "OBJ-P2-IM-004",
    statement:
      "Interpret AKI by pre-renal vs intrinsic vs post-renal frameworks at the bedside.",
    usmleStep: "step2ck",
    organSystem: "Renal / Urinary",
    physicianTask: "Diagnosis",
    contentCategory: "Internal Medicine",
    moduleId: IDS.modIm,
    lessonIds: ["les-im-4"],
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

export const wave3QuizQuestions: QuizQuestion[] = [
  q(
    "qq-heme-3",
    "Microcytic anemia with low ferritin most strongly suggests:",
    [
      "Iron deficiency until proven otherwise",
      "B12 deficiency as the first explanation",
      "Acute hemolysis with high reticulocytes exclusively",
      "Polycythemia vera",
    ],
    0,
    "Low MCV + low ferritin is the classic iron-deficiency pattern; confirm cause (blood loss, malabsorption, diet).",
    { lessonId: "les-heme-3", objectiveId: "obj-heme-3" },
  ),
  q(
    "qq-heme-4",
    "Petechiae and mucosal bleeding with normal PT/PTT most often reflect:",
    [
      "Platelet number or function disorder",
      "Factor VIII deficiency alone",
      "Vitamin K deficiency only",
      "Factor XIII deficiency exclusively",
    ],
    0,
    "Mucocutaneous bleeding with normal coagulation times points to platelets (count or function).",
    { lessonId: "les-heme-4", objectiveId: "obj-heme-4" },
  ),
  q(
    "qq-id-3",
    "Otherwise healthy adult with lobar pneumonia — most common typical pathogen to consider first?",
    [
      "Streptococcus pneumoniae",
      "Mycobacterium tuberculosis in every outpatient",
      "Plasmodium falciparum",
      "Clostridium tetani",
    ],
    0,
    "S. pneumoniae remains the classic community lobar pneumonia pathogen in foundational teaching.",
    { lessonId: "les-id-3", objectiveId: "obj-id-3" },
  ),
  q(
    "qq-id-4",
    "HIV with CD4 <50 and retinitis — classic opportunistic pathogen?",
    [
      "CMV",
      "Candida thrush only (CD4 usually higher)",
      "Streptococcus pyogenes exclusively",
      "Rhinovirus",
    ],
    0,
    "CMV disease clusters at very low CD4 counts; thrush appears earlier on the threshold map.",
    { lessonId: "les-id-4", objectiveId: "obj-id-4" },
  ),
  q(
    "qq-psych-3",
    "Patient endorses active suicidal intent with a plan and means. First priority?",
    [
      "Ensure immediate safety / supervised environment and remove means",
      "Schedule routine outpatient follow-up in 3 months only",
      "Start only lifestyle counseling without safety assessment",
      "Discharge without documentation of risk",
    ],
    0,
    "Active intent + plan + means requires immediate safety measures and urgent psychiatric pathway care.",
    { lessonId: "les-psych-3", objectiveId: "obj-psych-3" },
  ),
  q(
    "qq-psych-4",
    "Acute fluctuating attention and awareness in a hospitalized elder most likely:",
    [
      "Delirium until proven otherwise",
      "Primary schizophrenia onset at age 82 as the default",
      "Stable lifelong personality disorder only",
      "Normal aging without workup",
    ],
    0,
    "Acute fluctuating attention defines delirium; seek medical precipitants.",
    { lessonId: "les-psych-4", objectiveId: "obj-psych-4" },
  ),
  q(
    "qq-peds-3",
    "Febrile neonate (<28 days) with fever — foundational teaching priority?",
    [
      "Full serious bacterial infection evaluation and empiric therapy pathway",
      "Home observation without evaluation if smiling",
      "Adult sepsis score alone without age adjustment",
      "Ignore fever under 39°C always",
    ],
    0,
    "Young infants have immature immunity; fever prompts urgent evaluation pathways.",
    { lessonId: "les-peds-3", objectiveId: "obj-peds-3" },
  ),
  q(
    "qq-peds-4",
    "Infant with bronchiolitis, retractions, hypoxia — next clinical framing?",
    [
      "Supportive care with monitoring for respiratory failure",
      "Immediate adult COPD steroid/antibiotic bundle as first line",
      "Discharge without SpO2 check",
      "Mandatory CT pulmonary angiogram for every case",
    ],
    0,
    "Bronchiolitis care is primarily supportive; watch work of breathing and oxygenation.",
    { lessonId: "les-peds-4", objectiveId: "obj-peds-4" },
  ),
  q(
    "qq-obgyn-3",
    "First-trimester bleeding + unilateral pain + positive hCG — must exclude:",
    [
      "Ectopic pregnancy",
      "Third-trimester placenta previa only",
      "Menopause",
      "Primary biliary cholangitis",
    ],
    0,
    "Any reproductive-age patient with bleeding/pain and positive hCG needs ectopic excluded.",
    { lessonId: "les-obgyn-3", objectiveId: "obj-obgyn-3" },
  ),
  q(
    "qq-obgyn-4",
    "Immediate postpartum bleeding with a boggy uterus — first mechanism?",
    [
      "Uterine atony (tone)",
      "Amniotic fluid embolism exclusively in every bleed",
      "Factor VIII deficiency as the only cause",
      "Normal lochia requiring no assessment",
    ],
    0,
    "Atony is the most common PPH mechanism; massage and uterotonic pathways follow.",
    { lessonId: "les-obgyn-4", objectiveId: "obj-obgyn-4" },
  ),
  q(
    "qq-surg-3",
    "Migratory periumbilical pain to RLQ with rebound — leading diagnosis?",
    [
      "Appendicitis until proven otherwise",
      "Uncomplicated GERD",
      "Primary hyperthyroidism",
      "Tension headache",
    ],
    0,
    "Classic migration + peritoneal signs support appendicitis; still consider pelvic and GU alternatives.",
    { lessonId: "les-surg-3", objectiveId: "obj-surg-3" },
  ),
  q(
    "qq-fm-3",
    "Uncomplicated hypertension in a patient with diabetes — preferred first-line class family often includes:",
    [
      "ACE inhibitor or ARB (among guideline-supported options)",
      "High-dose NSAIDs as antihypertensives",
      "Oral decongestants",
      "Systemic steroids",
    ],
    0,
    "ACEI/ARB are foundational for many patients with diabetes and hypertension (educational framing).",
    { lessonId: "les-fm-3", objectiveId: "obj-fm-3" },
  ),
  q(
    "qq-msk-3",
    "Back pain with saddle anesthesia and bowel/bladder dysfunction — action?",
    [
      "Urgent evaluation for cauda equina syndrome",
      "Home rest for 6 weeks without assessment",
      "Assume musculoskeletal strain only",
      "Start only massage therapy",
    ],
    0,
    "Saddle anesthesia + sphincter dysfunction are cauda equina red flags.",
    { lessonId: "les-msk-3", objectiveId: "obj-msk-3" },
  ),
  q(
    "qq-im-4",
    "Rising creatinine, BUN/Cr high, bland urine, responds to fluids — framework?",
    [
      "Pre-renal AKI",
      "Post-renal obstruction only by default",
      "ATN with muddy brown casts exclusively",
      "Chronic ESRD without acuity",
    ],
    0,
    "Volume-responsive AKI with bland sediment fits pre-renal physiology.",
    { lessonId: "les-im-4", objectiveId: "obj-im-4" },
  ),
];

export const wave3QbankQuestions: QbankQuestion[] = [
  {
    id: "qb-10",
    stem: "Fatigue, microcytosis, ferritin low, guaiac positive stool. Best next framing?",
    choices: [
      { id: "qb-10-c0", text: "Iron deficiency from GI blood loss until source found" },
      { id: "qb-10-c1", text: "Thalassemia trait as the only possibility" },
      { id: "qb-10-c2", text: "B12 deficiency explaining microcytosis" },
      { id: "qb-10-c3", text: "No workup needed if young and male" },
    ],
    correctChoiceId: "qb-10-c0",
    explanation:
      "Iron deficiency plus occult blood demands a bleeding-source evaluation appropriate to age/risk.",
    moduleId: IDS.modHeme,
    usmleStep: "step1",
    organSystem: "Hematopoietic / Lymphoreticular",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    objectiveId: "obj-heme-3",
    difficulty: 2,
  },
  {
    id: "qb-11",
    stem: "Postpartum hour 1: boggy uterus, heavy bleeding, BP falling. Priority mechanism?",
    choices: [
      { id: "qb-11-c0", text: "Uterine atony — tone first among the 4 Ts" },
      { id: "qb-11-c1", text: "Ignore uterus and check only thyroid" },
      { id: "qb-11-c2", text: "Assume trauma without examining tone" },
      { id: "qb-11-c3", text: "Normal recovery; no intervention" },
    ],
    correctChoiceId: "qb-11-c0",
    explanation:
      "Atony is the leading PPH cause; examine tone while resuscitating.",
    moduleId: IDS.modObgyn,
    usmleStep: "step2ck",
    organSystem: "Reproductive",
    physicianTask: "Management",
    contentCategory: "Obstetrics / Gynecology",
    objectiveId: "obj-obgyn-4",
    difficulty: 2,
  },
  {
    id: "qb-12",
    stem: "Elderly inpatient becomes confused overnight with fluctuating attention after UTI. Diagnosis frame?",
    choices: [
      { id: "qb-12-c0", text: "Delirium secondary to medical precipitant" },
      { id: "qb-12-c1", text: "New-onset schizophrenia at age 84" },
      { id: "qb-12-c2", text: "Stable dementia without acute change" },
      { id: "qb-12-c3", text: "Malingering by default" },
    ],
    correctChoiceId: "qb-12-c0",
    explanation:
      "Acute fluctuating attention after infection is delirium until proven otherwise.",
    moduleId: IDS.modPsych,
    usmleStep: "step2ck",
    organSystem: "Behavioral Health",
    physicianTask: "Diagnosis",
    contentCategory: "Psychiatry",
    objectiveId: "obj-psych-4",
    difficulty: 2,
  },
];

export const wave3Flashcards: Flashcard[] = [
  {
    id: "fc-26",
    lessonId: "les-heme-3",
    front: "Anemia first forks",
    back: "MCV (micro/normo/macro) → reticulocyte response → kinetic vs production failure.",
    objectiveId: "obj-heme-3",
  },
  {
    id: "fc-27",
    lessonId: "les-heme-4",
    front: "Platelet vs factor bleeding",
    back: "Platelets → mucocutaneous/petechiae; factors → deep tissue/hemarthrosis patterns.",
    objectiveId: "obj-heme-4",
  },
  {
    id: "fc-28",
    lessonId: "les-id-4",
    front: "HIV CD4 thresholds (classic teaching)",
    back: "<200 PCP risk; <100 Toxo/Crypto; <50 MAC/CMV — prophylaxis frameworks follow guidelines.",
    objectiveId: "obj-id-4",
  },
  {
    id: "fc-29",
    lessonId: "les-psych-3",
    front: "Suicide risk triage",
    back: "Ideation → intent → plan → means → protective factors; act on acute high risk immediately.",
    objectiveId: "obj-psych-3",
  },
  {
    id: "fc-30",
    lessonId: "les-psych-4",
    front: "Delirium hallmark",
    back: "Acute onset + fluctuating attention/awareness; find and treat precipitants.",
    objectiveId: "obj-psych-4",
  },
  {
    id: "fc-31",
    lessonId: "les-obgyn-3",
    front: "First-trimester bleeding rule",
    back: "β-hCG + ultrasound pathway; ectopic until localization proves intrauterine pregnancy.",
    objectiveId: "obj-obgyn-3",
  },
  {
    id: "fc-32",
    lessonId: "les-obgyn-4",
    front: "PPH 4 Ts",
    back: "Tone (atony), Trauma, Tissue (retained), Thrombin (coagulopathy).",
    objectiveId: "obj-obgyn-4",
  },
  {
    id: "fc-33",
    lessonId: "les-msk-3",
    front: "Back pain red flags",
    back: "Cancer history, infection signs, cauda equina, trauma, progressive neuro deficits.",
    objectiveId: "obj-msk-3",
  },
  {
    id: "fc-34",
    lessonId: "les-im-4",
    front: "AKI 3 buckets",
    back: "Pre-renal (perfusion), intrinsic (ATN/AIN/GN), post-renal (obstruction).",
    objectiveId: "obj-im-4",
  },
  {
    id: "fc-35",
    lessonId: "les-fm-3",
    front: "HTN first-line families",
    back: "Thiazide-like, ACEI/ARB, CCB — choose by comorbidity (DM, CKD, race/guideline nuances).",
    objectiveId: "obj-fm-3",
  },
];

export const wave3ClinicalCases: ClinicalCase[] = [
  {
    id: "case-heme-1",
    moduleId: IDS.modHeme,
    title: "Fatigue and Microcytosis",
    presentationMd:
      "42-year-old with fatigue; Hb 9.2, MCV 72, ferritin low; stools intermittently dark.",
    stages: [
      {
        id: "h1",
        prompt: "Classify the anemia and name the most likely mechanism.",
        expectedFocus: "Microcytic iron deficiency from blood loss",
      },
      {
        id: "h2",
        prompt: "What evaluations follow after confirming iron deficiency?",
        expectedFocus: "Find bleeding source / GI evaluation appropriate to risk",
      },
    ],
    teachingPoints:
      "Iron deficiency is a sign — treat the cause, not only the ferritin.",
    objectiveIds: ["obj-heme-3"],
    status: "published",
  },
  {
    id: "case-obgyn-1",
    moduleId: IDS.modObgyn,
    title: "First-Trimester Pain and Spotting",
    presentationMd:
      "28-year-old, LMP 7 weeks ago, unilateral pelvic pain, spotting, positive urine hCG; unstable BP.",
    stages: [
      {
        id: "o1",
        prompt: "What life-threatening diagnosis must be excluded first?",
        expectedFocus: "Ruptured ectopic pregnancy",
      },
      {
        id: "o2",
        prompt: "List immediate priorities before definitive imaging/OR.",
        expectedFocus: "ABCs, IV access, type & cross, obstetrics/surgery pathway",
      },
    ],
    teachingPoints:
      "Hemodynamically unstable ectopic is a surgical emergency; do not delay for perfect labs.",
    objectiveIds: ["obj-obgyn-3"],
    status: "published",
  },
  {
    id: "case-psych-1",
    moduleId: IDS.modPsych,
    title: "Overnight Confusion on the Wards",
    presentationMd:
      "79-year-old POD2 becomes inattentive and fluctuating overnight after UTI antibiotics change.",
    stages: [
      {
        id: "y1",
        prompt: "Delirium vs primary psychosis — which features decide?",
        expectedFocus: "Acute fluctuating attention favors delirium",
      },
      {
        id: "y2",
        prompt: "Name three precipitant categories to review.",
        expectedFocus: "Infection, meds, metabolic/electrolyte, hypoxia, pain, retention",
      },
    ],
    teachingPoints:
      "Treat delirium by finding precipitants; antipsychotics are not a substitute for medical workup.",
    objectiveIds: ["obj-psych-4"],
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

export function applyWave3Expansions(program: Program): Program {
  const add = (
    modId: string,
    lesson: Program["phases"][0]["modules"][0]["lessons"][0],
    quizId: string,
  ) => {
    for (const phase of program.phases) {
      for (const mod of phase.modules) {
        if (mod.id !== modId) continue;
        mod.lessons.push(lesson);
        if (mod.exam) mod.exam.questionIds = [...mod.exam.questionIds, quizId];
      }
    }
  };

  add(
    IDS.modHeme,
    {
      id: "les-heme-3",
      moduleId: IDS.modHeme,
      title: "Anemia Classification Framework",
      slug: "heme-anemia",
      sequence: 3,
      estimatedMinutes: 40,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-heme-3"],
      concepts: [
        {
          id: "con-heme-3a",
          lessonId: "les-heme-3",
          title: "MCV and reticulocytes first",
          sequence: 1,
          summary:
            "Sort anemias by red-cell size and marrow response before memorizing disease lists.",
          blocks: [
            reading(
              "blk-heme-3a-r",
              "con-heme-3a",
              "Anemia algorithm",
              1,
              `## Step 1 — Kinetics
Low Hb/Hct → check reticulocytes: high suggests blood loss/hemolysis; low suggests underproduction.

## Step 2 — MCV
- **Microcytic**: iron deficiency, thalassemia, anemia of chronic disease (sometimes), sideroblastic  
- **Normocytic**: acute blood loss, hemolysis early, CKD, ACD  
- **Macrocytic**: B12/folate, alcohol, liver disease, meds, MDS

## Step 3 — Mechanism stories
Iron deficiency demands a *source*. Hemolysis demands LDH/haptoglobin/bilirubin/smear thinking. Do not jump to a rare diagnosis before the framework.`,
            ),
            vignette(
              "blk-heme-3a-x",
              "con-heme-3a",
              "Vignette: MCV 68, ferritin low",
              2,
              `Name the category and the next clinical question you must answer.`,
            ),
          ],
        },
      ],
    },
    "qq-heme-3",
  );

  add(
    IDS.modHeme,
    {
      id: "les-heme-4",
      moduleId: IDS.modHeme,
      title: "Platelet Disorders Clinically",
      slug: "heme-platelets",
      sequence: 4,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-heme-4"],
      concepts: [
        {
          id: "con-heme-4a",
          lessonId: "les-heme-4",
          title: "Count vs function",
          sequence: 1,
          summary: "Petechiae and mucosal bleeding implicate platelets.",
          blocks: [
            reading(
              "blk-heme-4a-r",
              "con-heme-4a",
              "Bleeding phenotype map",
              1,
              `Platelet problems → petechiae, purpura, mucosal bleeding; PT/PTT often normal.  
Factor deficiencies → deep hematomas/hemarthroses; abnormal PT and/or PTT.

Thrombocytopenia buckets: production failure, sequestration, destruction (ITP, DIC, TTP patterns differ — learn signatures).`,
            ),
          ],
        },
      ],
    },
    "qq-heme-4",
  );

  add(
    IDS.modId,
    {
      id: "les-id-3",
      moduleId: IDS.modId,
      title: "Community Infection Empiric Logic",
      slug: "id-community",
      sequence: 3,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-id-3"],
      concepts: [
        {
          id: "con-id-3a",
          lessonId: "les-id-3",
          title: "Syndrome → likely bugs",
          sequence: 1,
          summary: "Match clinical syndromes to probable pathogens before naming drugs.",
          blocks: [
            reading(
              "blk-id-3a-r",
              "con-id-3a",
              "Syndrome-first microbiology",
              1,
              `## High-yield pairings (foundational)
- Lobar CAP → *S. pneumoniae*  
- Cellulitis → streptococci/staphylococci  
- Cystitis → enteric gram-negatives (E. coli dominant)  
- Meningitis (community) → age-based lists (pneumococcus, meningococcus, listeria in extremes of age)

Empiric therapy follows local resistance and guidelines — this lesson trains *bug logic*, not memorizing one hospital antibiogram.`,
            ),
          ],
        },
      ],
    },
    "qq-id-3",
  );

  add(
    IDS.modId,
    {
      id: "les-id-4",
      moduleId: IDS.modId,
      title: "HIV Opportunistic Infection Map",
      slug: "id-hiv-oi",
      sequence: 4,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-id-4"],
      concepts: [
        {
          id: "con-id-4a",
          lessonId: "les-id-4",
          title: "CD4 thresholds as teaching anchors",
          sequence: 1,
          summary: "Risk rises as CD4 falls; prophylaxis frameworks follow guidelines.",
          blocks: [
            reading(
              "blk-id-4a-r",
              "con-id-4a",
              "OI threshold sketch",
              1,
              `Classic teaching thresholds (always verify current guidelines):
- CD4 <200 → PCP risk  
- CD4 <100 → toxoplasmosis, cryptococcosis risk patterns  
- CD4 <50 → MAC, CMV disease risk

ART is the long-term solution; OI prophylaxis is a bridge. Educational goal: recognize the map, not invent doses.`,
            ),
          ],
        },
      ],
    },
    "qq-id-4",
  );

  add(
    IDS.modPsych,
    {
      id: "les-psych-3",
      moduleId: IDS.modPsych,
      title: "Suicide Risk Assessment Essentials",
      slug: "psych-suicide-risk",
      sequence: 3,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-psych-3"],
      concepts: [
        {
          id: "con-psych-3a",
          lessonId: "les-psych-3",
          title: "Ideation to means",
          sequence: 1,
          summary: "Ask directly; act on acute high risk without delay.",
          blocks: [
            reading(
              "blk-psych-3a-r",
              "con-psych-3a",
              "Safety framework",
              1,
              `Ask about ideation, intent, plan, means, prior attempts, substance use, and protective factors.  
High acute risk → secure environment, remove means, urgent psychiatry. Documentation and collateral matter.

This is educational triage reasoning — real clinical care follows institutional safety protocols and laws.`,
            ),
            vignette(
              "blk-psych-3a-x",
              "con-psych-3a",
              "Vignette: plan and access to firearms",
              2,
              `Outline immediate actions and what you communicate to the team.`,
            ),
          ],
        },
      ],
    },
    "qq-psych-3",
  );

  add(
    IDS.modPsych,
    {
      id: "les-psych-4",
      moduleId: IDS.modPsych,
      title: "Delirium vs Primary Psychosis",
      slug: "psych-delirium",
      sequence: 4,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-psych-4"],
      concepts: [
        {
          id: "con-psych-4a",
          lessonId: "les-psych-4",
          title: "Attention is the clue",
          sequence: 1,
          summary: "Acute fluctuating inattention = delirium workup.",
          blocks: [
            reading(
              "blk-psych-4a-r",
              "con-psych-4a",
              "Delirium recognition",
              1,
              `Delirium: acute, fluctuating attention/awareness, often worse at night, medical precipitants.  
Primary psychiatric psychosis: clearer sensorium, more organized delusions/hallucinations without medical fluctuation (still exclude medical mimics).

Precipitants: infection, meds (anticholinergics, benzos), electrolytes, hypoxia, pain, urinary retention, constipation.`,
            ),
          ],
        },
      ],
    },
    "qq-psych-4",
  );

  add(
    IDS.modPeds,
    {
      id: "les-peds-3",
      moduleId: IDS.modPeds,
      title: "Fever in the Young Infant",
      slug: "peds-fever-infant",
      sequence: 3,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-peds-3"],
      concepts: [
        {
          id: "con-peds-3a",
          lessonId: "les-peds-3",
          title: "Age changes the stakes",
          sequence: 1,
          summary: "Neonates and young infants need heightened serious bacterial infection concern.",
          blocks: [
            reading(
              "blk-peds-3a-r",
              "con-peds-3a",
              "Age-banded fever thinking",
              1,
              `Young infants have limited clinical signs of invasive disease. Foundational teaching: fever in neonates prompts full evaluation and empiric therapy pathways; older infants/children use risk stratification tools that evolve with evidence.

Always follow current institutional/AAP-aligned pathways in clinical care; this lesson trains *why age matters*.`,
            ),
          ],
        },
      ],
    },
    "qq-peds-3",
  );

  add(
    IDS.modPeds,
    {
      id: "les-peds-4",
      moduleId: IDS.modPeds,
      title: "Bronchiolitis — Supportive Care Reasoning",
      slug: "peds-bronchiolitis",
      sequence: 4,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-peds-4"],
      concepts: [
        {
          id: "con-peds-4a",
          lessonId: "les-peds-4",
          title: "Work of breathing and oxygen",
          sequence: 1,
          summary: "Most care is supportive; watch for respiratory failure.",
          blocks: [
            reading(
              "blk-peds-4a-r",
              "con-peds-4a",
              "Bronchiolitis map",
              1,
              `Viral lower airway inflammation → wheeze/crackles, tachypnea, hypoxia.  
Priorities: hydration, oxygen as needed, monitoring work of breathing. Routine bronchodilators/steroids are not default for typical viral bronchiolitis in foundational teaching.`,
            ),
          ],
        },
      ],
    },
    "qq-peds-4",
  );

  add(
    IDS.modObgyn,
    {
      id: "les-obgyn-3",
      moduleId: IDS.modObgyn,
      title: "Ectopic Pregnancy Recognition",
      slug: "obgyn-ectopic",
      sequence: 3,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-obgyn-3"],
      concepts: [
        {
          id: "con-obgyn-3a",
          lessonId: "les-obgyn-3",
          title: "hCG + location",
          sequence: 1,
          summary: "Bleeding/pain + positive hCG → prove intrauterine pregnancy or manage ectopic risk.",
          blocks: [
            reading(
              "blk-obgyn-3a-r",
              "con-obgyn-3a",
              "Ectopic framework",
              1,
              `Risk rises with prior ectopic, tubal surgery, PID, IUD in situ, ART.  
Unstable patients → resuscitate and urgent surgical pathway. Stable patients → quantitative hCG + ultrasound discriminatory-zone reasoning under specialist guidance.

Never discharge undifferentiated first-trimester pain/bleeding without a clear follow-up plan.`,
            ),
            vignette(
              "blk-obgyn-3a-x",
              "con-obgyn-3a",
              "Vignette: unilateral pain and spotting",
              2,
              `List red flags for rupture and your first orders.`,
            ),
          ],
        },
      ],
    },
    "qq-obgyn-3",
  );

  add(
    IDS.modObgyn,
    {
      id: "les-obgyn-4",
      moduleId: IDS.modObgyn,
      title: "Postpartum Hemorrhage — 4 Ts",
      slug: "obgyn-pph",
      sequence: 4,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-obgyn-4"],
      concepts: [
        {
          id: "con-obgyn-4a",
          lessonId: "les-obgyn-4",
          title: "Tone first",
          sequence: 1,
          summary: "Atony dominates; still systematically exclude trauma, tissue, thrombin.",
          blocks: [
            reading(
              "blk-obgyn-4a-r",
              "con-obgyn-4a",
              "PPH mechanism checklist",
              1,
              `**Tone**: boggy uterus → massage + uterotonics (protocolized)  
**Trauma**: lacerations, hematoma, rupture  
**Tissue**: retained placenta/membranes  
**Thrombin**: coagulopathy

Resuscitate in parallel. Exact drug sequences are institutional — learn the mechanism map here.`,
            ),
          ],
        },
      ],
    },
    "qq-obgyn-4",
  );

  add(
    IDS.modSurg,
    {
      id: "les-surg-3",
      moduleId: IDS.modSurg,
      title: "Appendicitis Clinical Pattern",
      slug: "surg-appendicitis",
      sequence: 3,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-surg-3"],
      concepts: [
        {
          id: "con-surg-3a",
          lessonId: "les-surg-3",
          title: "Migration and peritonitis",
          sequence: 1,
          summary: "Classic story plus alternatives (gyn, GU, mesenteric adenitis).",
          blocks: [
            reading(
              "blk-surg-3a-r",
              "con-surg-3a",
              "RLQ decision making",
              1,
              `Migration of pain, anorexia, fever, RLQ peritonitis → appendicitis high on the list.  
Always consider ovarian torsion/ectopic in appropriate patients, nephrolithiasis, and diverticulitis by age/location. Imaging adjuncts follow local pathways.`,
            ),
          ],
        },
      ],
    },
    "qq-surg-3",
  );

  add(
    IDS.modFm,
    {
      id: "les-fm-3",
      moduleId: IDS.modFm,
      title: "Hypertension First-Line Reasoning",
      slug: "fm-hypertension",
      sequence: 3,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-fm-3"],
      concepts: [
        {
          id: "con-fm-3a",
          lessonId: "les-fm-3",
          title: "Comorbidity chooses the class",
          sequence: 1,
          summary: "Lifestyle plus evidence-based drug families matched to comorbidities.",
          blocks: [
            reading(
              "blk-fm-3a-r",
              "con-fm-3a",
              "HTN outpatient map",
              1,
              `Confirm elevated readings, assess end-organ risk, counsel lifestyle.  
Drug families: thiazide-like diuretics, ACEI/ARB, CCB — choose with diabetes, CKD, heart failure, pregnancy status, and guideline nuances in mind. Educational goal: *why* a class fits, not memorizing every brand.`,
            ),
          ],
        },
      ],
    },
    "qq-fm-3",
  );

  add(
    IDS.modMsk,
    {
      id: "les-msk-3",
      moduleId: IDS.modMsk,
      title: "Low Back Pain Red Flags",
      slug: "msk-back-red-flags",
      sequence: 3,
      estimatedMinutes: 25,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-msk-3"],
      concepts: [
        {
          id: "con-msk-3a",
          lessonId: "les-msk-3",
          title: "When not to reassure",
          sequence: 1,
          summary: "Most back pain is mechanical; red flags change the pathway.",
          blocks: [
            reading(
              "blk-msk-3a-r",
              "con-msk-3a",
              "Red flag checklist",
              1,
              `Urgent: cauda equina (saddle anesthesia, bowel/bladder), progressive motor deficits, infection risk (IVDU, fever), cancer history with night pain/weight loss, significant trauma.

Mechanical back pain without red flags → education, activity, time — avoid unnecessary imaging.`,
            ),
          ],
        },
      ],
    },
    "qq-msk-3",
  );

  add(
    IDS.modIm,
    {
      id: "les-im-4",
      moduleId: IDS.modIm,
      title: "AKI Bedside Framework",
      slug: "im-aki",
      sequence: 4,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-im-4"],
      concepts: [
        {
          id: "con-im-4a",
          lessonId: "les-im-4",
          title: "Pre-renal, intrinsic, post-renal",
          sequence: 1,
          summary: "Volume status, urine studies, and obstruction screen sort most AKIs.",
          blocks: [
            reading(
              "blk-im-4a-r",
              "con-im-4a",
              "AKI triage",
              1,
              `**Pre-renal**: hypoperfusion; FENa/FEurea patterns; responds to restored perfusion.  
**Intrinsic**: ATN (ischemic/toxic), AIN, GN — sediment helps.  
**Post-renal**: obstruction — bladder scan/imaging when suspected.

Stop nephrotoxins, fix perfusion, relieve obstruction — then refine etiology.`,
            ),
            vignette(
              "blk-im-4a-x",
              "con-im-4a",
              "Vignette: rising Cr after diarrhea",
              2,
              `Classify and list your first five actions.`,
            ),
          ],
        },
      ],
    },
    "qq-im-4",
  );

  return program;
}
