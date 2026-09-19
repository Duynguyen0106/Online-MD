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
 * Wave 7 — raise thinner modules to ≥7 lessons with accurate mechanisms.
 * Original educational writing; USMLE-aligned frameworks (not bank copies).
 */

export const wave7Objectives: Objective[] = [
  {
    id: "obj-neuro-7",
    code: "OBJ-P1-NEURO-007",
    statement:
      "Localize Parkinsonism to nigrostriatal dopamine loss and contrast with essential tremor.",
    usmleStep: "step1",
    organSystem: "Nervous System",
    physicianTask: "Diagnosis",
    contentCategory: "Neuroscience",
    moduleId: IDS.modNeuro,
    lessonIds: ["les-neuro-7"],
  },
  {
    id: "obj-neuro-8",
    code: "OBJ-P1-NEURO-008",
    statement:
      "Explain myasthenia gravis neuromuscular junction failure and crisis priorities.",
    usmleStep: "step1",
    organSystem: "Nervous System",
    physicianTask: "Diagnosis",
    contentCategory: "Neuroscience",
    moduleId: IDS.modNeuro,
    lessonIds: ["les-neuro-8"],
  },
  {
    id: "obj-msk-6",
    code: "OBJ-P1-MSK-006",
    statement:
      "Contrast rheumatoid arthritis and osteoarthritis by synovium vs cartilage patterns.",
    usmleStep: "step1",
    organSystem: "Musculoskeletal",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modMsk,
    lessonIds: ["les-msk-6"],
  },
  {
    id: "obj-msk-7",
    code: "OBJ-P1-MSK-007",
    statement:
      "Recognize SLE clinical patterns and lupus nephritis as a major organ threat.",
    usmleStep: "step1",
    organSystem: "Musculoskeletal",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modMsk,
    lessonIds: ["les-msk-7"],
  },
  {
    id: "obj-id-6",
    code: "OBJ-P1-ID-006",
    statement:
      "Interpret TB as latent vs active disease and prioritize airborne isolation thinking.",
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Diagnosis",
    contentCategory: "Microbiology",
    moduleId: IDS.modId,
    lessonIds: ["les-id-6"],
  },
  {
    id: "obj-id-7",
    code: "OBJ-P1-ID-007",
    statement:
      "Apply Duke-style endocarditis suspicion using bacteremia plus valvular risk.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Microbiology",
    moduleId: IDS.modId,
    lessonIds: ["les-id-7"],
  },
  {
    id: "obj-obgyn-6",
    code: "OBJ-P2-OB-006",
    statement:
      "Manage shoulder dystocia with HELPERR-style maneuver sequence conceptually.",
    usmleStep: "step2ck",
    organSystem: "Reproductive",
    physicianTask: "Management",
    contentCategory: "Obstetrics / Gynecology",
    moduleId: IDS.modObgyn,
    lessonIds: ["les-obgyn-6"],
  },
  {
    id: "obj-obgyn-7",
    code: "OBJ-P2-OB-007",
    statement:
      "Differentiate placenta previa vs abruption by bleeding pattern and pain.",
    usmleStep: "step2ck",
    organSystem: "Reproductive",
    physicianTask: "Diagnosis",
    contentCategory: "Obstetrics / Gynecology",
    moduleId: IDS.modObgyn,
    lessonIds: ["les-obgyn-7"],
  },
  {
    id: "obj-renal-7",
    code: "OBJ-P1-REN-007",
    statement:
      "Separate nephritic vs nephrotic syndromes by sediment and protein quantity.",
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modRenal,
    lessonIds: ["les-renal-7"],
  },
  {
    id: "obj-renal-8",
    code: "OBJ-P1-REN-008",
    statement:
      "Explain diuretic class sites of action along the nephron.",
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Knowledge",
    contentCategory: "Pharmacology",
    moduleId: IDS.modRenal,
    lessonIds: ["les-renal-8"],
  },
  {
    id: "obj-cell-8",
    code: "OBJ-P1-CELL-008",
    statement:
      "Apply Mendelian inheritance patterns to pedigree risk estimation.",
    usmleStep: "step1",
    organSystem: "Multisystem",
    physicianTask: "Knowledge",
    contentCategory: "Genetics",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-7"],
  },
  {
    id: "obj-cell-9",
    code: "OBJ-P1-CELL-009",
    statement:
      "Map pharmacokinetic ADME concepts to clinical dosing intuition (not numeric regimens).",
    usmleStep: "step1",
    organSystem: "Multisystem",
    physicianTask: "Knowledge",
    contentCategory: "Pharmacology",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-8"],
  },
  {
    id: "obj-cv-9",
    code: "OBJ-P1-CV-009",
    statement:
      "Distinguish tamponade physiology using Beck triad and pulsus paradoxus thinking.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Physiology",
    moduleId: IDS.modCvb,
    lessonIds: ["les-cv-8"],
  },
  {
    id: "obj-im-7",
    code: "OBJ-P2-IM-007",
    statement:
      "Risk-stratify GI bleed and cirrhosis decompensation on the medicine wards.",
    usmleStep: "step2ck",
    organSystem: "Gastrointestinal",
    physicianTask: "Management",
    contentCategory: "Internal Medicine",
    moduleId: IDS.modIm,
    lessonIds: ["les-im-7"],
  },
  {
    id: "obj-psych-7",
    code: "OBJ-P2-PSY-007",
    statement:
      "Identify serotonin syndrome vs NMS using neuromuscular and autonomic clues.",
    usmleStep: "step2ck",
    organSystem: "Behavioral Health",
    physicianTask: "Diagnosis",
    contentCategory: "Psychiatry",
    moduleId: IDS.modPsych,
    lessonIds: ["les-psych-7"],
  },
  {
    id: "obj-peds-7",
    code: "OBJ-P2-PEDS-007",
    statement:
      "Evaluate pediatric asthma exacerbation severity and escalation priorities.",
    usmleStep: "step2ck",
    organSystem: "Respiratory",
    physicianTask: "Management",
    contentCategory: "Pediatrics",
    moduleId: IDS.modPeds,
    lessonIds: ["les-peds-7"],
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

export const wave7QuizQuestions: QuizQuestion[] = [
  q(
    "qq-neuro-7",
    "Resting tremor, bradykinesia, rigidity, and postural instability best fit:",
    [
      "Parkinson disease (nigrostriatal dopamine loss)",
      "Essential tremor as the only diagnosis",
      "ALS without motor findings",
      "Migraine aura exclusively",
    ],
    0,
    "Cardinal motor features reflect substantia nigra pars compacta dopamine neuron loss.",
    { lessonId: "les-neuro-7", objectiveId: "obj-neuro-7" },
  ),
  q(
    "qq-neuro-8",
    "Fatigable weakness worse with use, ptosis, AChR antibodies — disease?",
    [
      "Myasthenia gravis",
      "Botulism with descending paralysis only by default",
      "Guillain–Barré ascending areflexia exclusively",
      "Polymyositis without fatigability",
    ],
    0,
    "Fatigable NMJ failure with ocular findings is classic myasthenia.",
    { lessonId: "les-neuro-8", objectiveId: "obj-neuro-8" },
  ),
  q(
    "qq-msk-6",
    "Symmetric small-joint synovitis with morning stiffness >1 hour favors:",
    [
      "Rheumatoid arthritis pattern",
      "Osteoarthritis DIP Heberden nodes only",
      "Gout as the only explanation",
      "Simple sprain",
    ],
    0,
    "RA is inflammatory synovitis; OA is cartilage wear with different joint pattern.",
    { lessonId: "les-msk-6", objectiveId: "obj-msk-6" },
  ),
  q(
    "qq-msk-7",
    "Malar rash, photosensitivity, arthritis, and proteinuria in a young woman — concern?",
    [
      "SLE with possible lupus nephritis",
      "Uncomplicated contact dermatitis only",
      "Primary osteoarthritis",
      "Essential hypertension alone",
    ],
    0,
    "Multisystem autoimmunity + renal involvement raises SLE/lupus nephritis concern.",
    { lessonId: "les-msk-7", objectiveId: "obj-msk-7" },
  ),
  q(
    "qq-id-6",
    "Positive IGRA without symptoms or infiltrate is most consistent with:",
    [
      "Latent TB infection (evaluate for active disease first)",
      "Guaranteed active cavitary TB",
      "Ruled-out TB forever",
      "Community viral URI",
    ],
    0,
    "Latent TB: immune evidence without active disease — still exclude active TB before treating LTBI.",
    { lessonId: "les-id-6", objectiveId: "obj-id-6" },
  ),
  q(
    "qq-id-7",
    "Fever + new regurgitant murmur + persistently positive blood cultures — frame?",
    [
      "Infective endocarditis until proven otherwise",
      "Simple viral syndrome",
      "Uncomplicated UTI only",
      "Anxiety",
    ],
    0,
    "Bacteremia plus valvular findings is endocarditis until excluded.",
    { lessonId: "les-id-7", objectiveId: "obj-id-7" },
  ),
  q(
    "qq-obgyn-6",
    "Turtle sign after head delivery — first maneuver classically taught?",
    [
      "McRoberts maneuver (hyperflex maternal hips) as initial HELPERR step",
      "Fundal pressure as first-line",
      "Immediate discharge",
      "Oral terbutaline only",
    ],
    0,
    "Shoulder dystocia: call for help, McRoberts ± suprapubic pressure early — not fundal pressure.",
    { lessonId: "les-obgyn-6", objectiveId: "obj-obgyn-6" },
  ),
  q(
    "qq-obgyn-7",
    "Painless third-trimester bleeding suggests which until proven otherwise?",
    [
      "Placenta previa",
      "Placental abruption with severe pain always",
      "Appendicitis",
      "GERD",
    ],
    0,
    "Painless late bleeding → previa; painful bleeding → abruption until evaluated.",
    { lessonId: "les-obgyn-7", objectiveId: "obj-obgyn-7" },
  ),
  q(
    "qq-renal-7",
    "Heavy proteinuria (>3.5 g/day), hypoalbuminemia, edema — syndrome?",
    [
      "Nephrotic syndrome",
      "Nephritic syndrome with active sediment only",
      "Prerenal azotemia exclusively",
      "Diabetes insipidus",
    ],
    0,
    "Nephrotic = heavy protein, hypoalbuminemia, edema (± hyperlipidemia).",
    { lessonId: "les-renal-7", objectiveId: "obj-renal-7" },
  ),
  q(
    "qq-renal-8",
    "Loop diuretics act primarily on which nephron segment?",
    [
      "Thick ascending limb Na-K-2Cl cotransporter",
      "Proximal carbonic anhydrase only",
      "Collecting duct ENaC exclusively",
      "Glomerular filtration barrier pores",
    ],
    0,
    "Loops inhibit NKCC2 in the thick ascending limb.",
    { lessonId: "les-renal-8", objectiveId: "obj-renal-8" },
  ),
  q(
    "qq-cell-7",
    "Affected father transmits trait to all daughters but no sons — pattern?",
    [
      "X-linked dominant classic teaching pattern",
      "Y-linked exclusively to daughters",
      "Mitochondrial from father to all children",
      "Autosomal recessive with 100% penetrance always",
    ],
    0,
    "X-linked dominant: affected males transmit to all daughters, no sons.",
    { lessonId: "les-cell-7", objectiveId: "obj-cell-8" },
  ),
  q(
    "qq-cell-8",
    "First-pass metabolism primarily reduces oral bioavailability via:",
    [
      "Hepatic (and gut) extraction before systemic circulation",
      "Renal excretion only before absorption",
      "Skin metabolism exclusively",
      "Pulmonary filtration of tablets",
    ],
    0,
    "Oral drugs may be extensively metabolized in gut/liver before reaching systemic blood.",
    { lessonId: "les-cell-8", objectiveId: "obj-cell-9" },
  ),
  q(
    "qq-cv-8",
    "Hypotension, muffled heartsounds, elevated JVP after penetrating chest trauma — concern?",
    [
      "Cardiac tamponade",
      "Simple anxiety",
      "Uncomplicated pneumothorax without hemodynamics",
      "Hypothyroid myxedema only",
    ],
    0,
    "Beck triad teaching points to tamponade — obstructive shock physiology.",
    { lessonId: "les-cv-8", objectiveId: "obj-cv-9" },
  ),
  q(
    "qq-im-7",
    "Cirrhosis with ascites, fever, abdominal tenderness — next concern?",
    [
      "Spontaneous bacterial peritonitis until excluded",
      "Uncomplicated constipation only",
      "GERD",
      "Primary hyperthyroidism",
    ],
    0,
    "Fever + ascites tenderness → tap for SBP.",
    { lessonId: "les-im-7", objectiveId: "obj-im-7" },
  ),
  q(
    "qq-psych-7",
    "Hyperreflexia, clonus, myoclonus after serotonergic drug combination — syndrome?",
    [
      "Serotonin syndrome",
      "NMS with lead-pipe rigidity and bradyreflexia exclusively",
      "Opioid withdrawal only",
      "Hypoglycemia alone",
    ],
    0,
    "Serotonin syndrome: hyperreflexia/clonus; NMS: rigidity/bradyreflexia after antipsychotics.",
    { lessonId: "les-psych-7", objectiveId: "obj-psych-7" },
  ),
  q(
    "qq-peds-7",
    "Child asthma exacerbation with hypoxia and poor air movement — priority?",
    [
      "Oxygen, bronchodilators, systemic steroids; escalate if failing",
      "Home observation without SpO2",
      "Adult COPD antibiotic bundle first always",
      "CTPA for every wheeze",
    ],
    0,
    "Pediatric asthma exacerbation: O2, bronchodilators, steroids; watch for silent chest.",
    { lessonId: "les-peds-7", objectiveId: "obj-peds-7" },
  ),
];

export const wave7QbankQuestions: QbankQuestion[] = [
  {
    id: "qb-22",
    stem: "Fatigable ptosis improves after rest; ice-pack test positive. Mechanism?",
    choices: [
      { id: "qb-22-c0", text: "Autoantibodies impair ACh receptor signaling at NMJ" },
      { id: "qb-22-c1", text: "Anterior horn cell degeneration exclusively" },
      { id: "qb-22-c2", text: "Dopamine depletion in substantia nigra" },
      { id: "qb-22-c3", text: "Peripheral myelin attack like MS plaques in brain" },
    ],
    correctChoiceId: "qb-22-c0",
    explanation: "MG is postsynaptic NMJ failure from AChR (or MuSK) autoimmunity.",
    moduleId: IDS.modNeuro,
    usmleStep: "step1",
    organSystem: "Nervous System",
    physicianTask: "Diagnosis",
    contentCategory: "Neuroscience",
    objectiveId: "obj-neuro-8",
    difficulty: 3,
  },
  {
    id: "qb-23",
    stem: "Painless third-trimester bleeding; soft nontender uterus. Leading diagnosis?",
    choices: [
      { id: "qb-23-c0", text: "Placenta previa" },
      { id: "qb-23-c1", text: "Placental abruption with board-like uterus" },
      { id: "qb-23-c2", text: "Appendicitis" },
      { id: "qb-23-c3", text: "Threatened miscarriage at 8 weeks only" },
    ],
    correctChoiceId: "qb-23-c0",
    explanation: "Painless late bleeding → previa; avoid digital exams until location known.",
    moduleId: IDS.modObgyn,
    usmleStep: "step2ck",
    organSystem: "Reproductive",
    physicianTask: "Diagnosis",
    contentCategory: "Obstetrics / Gynecology",
    objectiveId: "obj-obgyn-7",
    difficulty: 2,
  },
  {
    id: "qb-24",
    stem: "IVDU with fever, tricuspid regurg murmur, septic pulmonary emboli.",
    choices: [
      {
        id: "qb-24-c0",
        text: "Right-sided infective endocarditis",
      },
      { id: "qb-24-c1", text: "Uncomplicated bronchitis" },
      { id: "qb-24-c2", text: "Primary adrenal insufficiency" },
      { id: "qb-24-c3", text: "Migraine" },
    ],
    correctChoiceId: "qb-24-c0",
    explanation: "IVDU + tricuspid involvement + septic emboli to lung = right-sided IE.",
    moduleId: IDS.modId,
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Microbiology",
    objectiveId: "obj-id-7",
    difficulty: 3,
  },
];

export const wave7Flashcards: Flashcard[] = [
  {
    id: "fc-66",
    lessonId: "les-neuro-7",
    front: "Parkinson cardinal features",
    back: "Bradykinesia + rest tremor + rigidity ± postural instability; ↓nigrostriatal dopamine.",
    objectiveId: "obj-neuro-7",
  },
  {
    id: "fc-67",
    lessonId: "les-neuro-8",
    front: "MG vs Lambert–Eaton",
    back: "MG: fatigable, worse with use, ocular; LEMS: improves with use, autonomic, cancer association.",
    objectiveId: "obj-neuro-8",
  },
  {
    id: "fc-68",
    lessonId: "les-msk-6",
    front: "RA vs OA",
    back: "RA: inflammatory synovitis, MCP/PIP, morning stiffness. OA: cartilage wear, DIP/PIP/weight-bearing, brief stiffness.",
    objectiveId: "obj-msk-6",
  },
  {
    id: "fc-69",
    lessonId: "les-id-6",
    front: "Latent vs active TB",
    back: "LTBI: +IGRA/TST, no symptoms/culture/infiltrate. Active: symptoms ± CXR/micro — isolate.",
    objectiveId: "obj-id-6",
  },
  {
    id: "fc-70",
    lessonId: "les-obgyn-6",
    front: "Shoulder dystocia first moves",
    back: "Call for help, McRoberts, suprapubic pressure — avoid fundal pressure.",
    objectiveId: "obj-obgyn-6",
  },
  {
    id: "fc-71",
    lessonId: "les-obgyn-7",
    front: "Previa vs abruption",
    back: "Previa: painless bleeding, soft uterus. Abruption: painful bleeding, firm/tender uterus, fetal distress.",
    objectiveId: "obj-obgyn-7",
  },
  {
    id: "fc-72",
    lessonId: "les-renal-7",
    front: "Nephritic vs nephrotic",
    back: "Nephritic: HTN, hematuria, RBC casts, mild protein. Nephrotic: ≥3.5g protein, edema, hypoalbuminemia.",
    objectiveId: "obj-renal-7",
  },
  {
    id: "fc-73",
    lessonId: "les-renal-8",
    front: "Diuretic sites",
    back: "Acetazolamide PT; loop TAL; thiazide DCT; K-sparing CD (ENaC/aldosterone).",
    objectiveId: "obj-renal-8",
  },
  {
    id: "fc-74",
    lessonId: "les-cv-8",
    front: "Tamponade triad",
    back: "Hypotension + elevated JVP + muffled sounds; pulsus paradoxus; obstructive shock.",
    objectiveId: "obj-cv-9",
  },
  {
    id: "fc-75",
    lessonId: "les-psych-7",
    front: "Serotonin syndrome vs NMS",
    back: "SS: hyperreflexia/clonus, serotonergic drugs. NMS: lead-pipe rigidity, bradyreflexia, antipsychotics.",
    objectiveId: "obj-psych-7",
  },
];

export const wave7ClinicalCases: ClinicalCase[] = [
  {
    id: "case-neuro-2",
    moduleId: IDS.modNeuro,
    title: "Fatigable Ptosis",
    presentationMd:
      "32-year-old with fluctuating double vision and drooping eyelids worse at day's end; ice pack improves ptosis.",
    stages: [
      {
        id: "mg1",
        prompt: "Most likely diagnosis and anatomic site of failure?",
        expectedFocus: "Myasthenia gravis — neuromuscular junction",
      },
      {
        id: "mg2",
        prompt: "What crisis feature would force airway priority?",
        expectedFocus: "Respiratory muscle weakness / impending respiratory failure",
      },
    ],
    teachingPoints:
      "Fatigability and ocular findings localize to NMJ; crisis is an airway emergency.",
    objectiveIds: ["obj-neuro-8"],
    status: "published",
  },
  {
    id: "case-obgyn-2",
    moduleId: IDS.modObgyn,
    title: "Turtle Sign on the Labor Floor",
    presentationMd:
      "After delivery of the head, the head retracts against the perineum; anterior shoulder will not deliver.",
    stages: [
      {
        id: "sd1",
        prompt: "Name the emergency and the first two maneuvers.",
        expectedFocus: "Shoulder dystocia — McRoberts + suprapubic pressure",
      },
      {
        id: "sd2",
        prompt: "Which maneuver must you avoid?",
        expectedFocus: "Fundal pressure",
      },
    ],
    teachingPoints:
      "Seconds matter; structured HELPERR sequence beats improvisation.",
    objectiveIds: ["obj-obgyn-6"],
    status: "published",
  },
  {
    id: "case-id-1",
    moduleId: IDS.modId,
    title: "Fever and a New Murmur in an IVDU",
    presentationMd:
      "28-year-old who injects drugs: fever for a week, new tricuspid regurgitant murmur, multiple pulmonary nodules.",
    stages: [
      {
        id: "ie1",
        prompt: "Syndrome and most likely valve?",
        expectedFocus: "Right-sided infective endocarditis — tricuspid",
      },
      {
        id: "ie2",
        prompt: "Why are blood cultures drawn before antibiotics when stable enough?",
        expectedFocus: "Maximize microbiologic yield to guide prolonged therapy",
      },
    ],
    teachingPoints:
      "IVDU endocarditis seeds the lungs; get cultures and start timely therapy.",
    objectiveIds: ["obj-id-7"],
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

export function applyWave7Expansions(program: Program): Program {
  const L = (
    modId: string,
    id: string,
    title: string,
    slug: string,
    seq: number,
    minutes: number,
    quizId: string,
    conceptId: string,
    conceptTitle: string,
    summary: string,
    blocks: Lesson["concepts"][0]["blocks"],
  ) =>
    pushLesson(
      program,
      modId,
      {
        id,
        moduleId: modId,
        title,
        slug,
        sequence: seq,
        estimatedMinutes: minutes,
        status: "published",
        quizPassThreshold: 0.8,
        quizQuestionIds: [quizId],
        concepts: [
          {
            id: conceptId,
            lessonId: id,
            title: conceptTitle,
            sequence: 1,
            summary,
            blocks,
          },
        ],
      },
      quizId,
    );

  L(
    IDS.modNeuro,
    "les-neuro-7",
    "Parkinson Disease Mechanisms",
    "neuro-parkinson",
    6,
    35,
    "qq-neuro-7",
    "con-neuro-7a",
    "Nigrostriatal dopamine loss",
    "Cardinal motor features map to basal ganglia circuit failure.",
    [
      reading(
        "blk-neuro-7a-r",
        "con-neuro-7a",
        "Parkinson map",
        1,
        `Substantia nigra pars compacta dopamine neurons degenerate → unbalanced basal ganglia output → bradykinesia, resting tremor, rigidity, postural instability.  

Lewy bodies (α-synuclein) are the pathologic hallmark in idiopathic PD.  
Distinguish **essential tremor** (action/postural, often bilateral, alcohol-responsive teaching) from resting pill-rolling tremor.

Therapy concepts: replace/enhance dopamine signaling (levodopa, agonists, MAO-B/COMT strategies) — exact regimens are specialist/protocol guided.`,
      ),
    ],
  );

  L(
    IDS.modNeuro,
    "les-neuro-8",
    "Myasthenia Gravis & NMJ Failure",
    "neuro-myasthenia",
    7,
    35,
    "qq-neuro-8",
    "con-neuro-8a",
    "Postsynaptic AChR autoimmune attack",
    "Fatigable weakness is the clinical signature of NMJ failure.",
    [
      reading(
        "blk-neuro-8a-r",
        "con-neuro-8a",
        "MG framework",
        1,
        `Autoantibodies (AChR, MuSK) impair neuromuscular transmission → fatigable weakness, ptosis, diplopia, bulbar symptoms.  
Worsens with use, improves with rest. Crisis = respiratory compromise → airway first.  

Contrast Lambert–Eaton (presynaptic P/Q Ca channel, improves with use, cancer association).  
Edrophonium/ice-pack tests are historical/adjunct teaching — diagnosis uses antibodies + electrodiagnostics.`,
      ),
      vignette(
        "blk-neuro-8a-x",
        "con-neuro-8a",
        "Vignette: evening double vision",
        2,
        `Localize the lesion and list crisis warning signs.`,
      ),
    ],
  );

  L(
    IDS.modMsk,
    "les-msk-6",
    "RA vs Osteoarthritis",
    "msk-ra-oa",
    6,
    35,
    "qq-msk-6",
    "con-msk-6a",
    "Synovium vs cartilage",
    "Inflammatory autoimmune synovitis is not the same disease as degenerative cartilage loss.",
    [
      reading(
        "blk-msk-6a-r",
        "con-msk-6a",
        "Pattern recognition",
        1,
        `**RA**: symmetric MCP/PIP, prolonged morning stiffness, rheumatoid factor/anti-CCP associations, erosions, extra-articular disease.  
**OA**: DIP Heberden / PIP Bouchard, knees/hips/spine, brief stiffness, osteophytes, mechanical pain.

Treatment philosophies differ: RA needs disease-modifying therapy early; OA emphasizes load reduction, PT, analgesics — rheumatology guides biologics.`,
      ),
    ],
  );

  L(
    IDS.modMsk,
    "les-msk-7",
    "SLE Clinical Map",
    "msk-sle",
    7,
    35,
    "qq-msk-7",
    "con-msk-7a",
    "Multisystem autoimmunity",
    "Kidney involvement drives much of SLE morbidity — screen urine.",
    [
      reading(
        "blk-msk-7a-r",
        "con-msk-7a",
        "SLE framework",
        1,
        `Clinical clusters: mucocutaneous (malar/discoid, photosensitivity, oral ulcers), arthritis, serositis, renal, neuropsychiatric, hematologic.  
ANA sensitive; anti-dsDNA/Sm more specific teaching associations. Complement may fall in activity.  

**Lupus nephritis** → proteinuria/hematuria/AKI risk — early nephrology. Pregnancy and antiphospholipid add clotting/obstetric risk.`,
      ),
    ],
  );

  L(
    IDS.modId,
    "les-id-6",
    "Tuberculosis — Latent vs Active",
    "id-tb",
    6,
    35,
    "qq-id-6",
    "con-id-6a",
    "Airborne mycobacterial disease",
    "Always exclude active TB before treating latent infection.",
    [
      reading(
        "blk-id-6a-r",
        "con-id-6a",
        "TB decision tree",
        1,
        `**Active TB**: cough, fever, night sweats, weight loss ± cavitary upper-lobe disease; airborne isolation; microbiologic confirmation.  
**LTBI**: positive TST/IGRA without active disease evidence.  

Risk: recent exposure, immunosuppression, incarceration/homelessness, endemic exposure.  
Therapy regimens are guideline-based — learn the latent/active fork and public-health urgency.`,
      ),
    ],
  );

  L(
    IDS.modId,
    "les-id-7",
    "Infective Endocarditis Suspicion",
    "id-endocarditis",
    7,
    35,
    "qq-id-7",
    "con-id-7a",
    "Bacteremia + endocardium",
    "Persistent bacteremia and valvular findings demand IE workup.",
    [
      reading(
        "blk-id-7a-r",
        "con-id-7a",
        "IE map",
        1,
        `Risk: prosthetic valves, prior IE, IVDU, congenital heart disease, indwelling lines.  
Left-sided → systemic emboli; right-sided (IVDU) → pulmonary septic emboli.  

Blood cultures (multiple sets) before antibiotics when possible; echo (TTE→TEE) for vegetations.  
Duke criteria organize major/minor findings — treat as prolonged IV therapy under ID/cards.`,
      ),
      vignette(
        "blk-id-7a-x",
        "con-id-7a",
        "Vignette: IVDU fever and nodules",
        2,
        `Which valve and embolic pattern fit?`,
      ),
    ],
  );

  L(
    IDS.modObgyn,
    "les-obgyn-6",
    "Shoulder Dystocia Maneuvers",
    "obgyn-shoulder-dystocia",
    6,
    30,
    "qq-obgyn-6",
    "con-obgyn-6a",
    "HELPERR sequence",
    "Turtle sign starts a timed obstetric emergency algorithm.",
    [
      reading(
        "blk-obgyn-6a-r",
        "con-obgyn-6a",
        "Shoulder dystocia",
        1,
        `Turtle sign = head retracts against perineum. Call for help.  

Classic sequence teaching: **McRoberts** (hyperflex hips) ± **suprapubic pressure**, then rotational maneuvers, delivery of posterior arm, etc. (HELPERR mnemonic).  
**Avoid fundal pressure.** Document times; prepare for neonatal resuscitation and PPH risk.`,
      ),
    ],
  );

  L(
    IDS.modObgyn,
    "les-obgyn-7",
    "Previa vs Abruption",
    "obgyn-previa-abruption",
    7,
    30,
    "qq-obgyn-7",
    "con-obgyn-7a",
    "Third-trimester bleeding fork",
    "Pain and uterine tone separate the two classic bleeds.",
    [
      reading(
        "blk-obgyn-7a-r",
        "con-obgyn-7a",
        "Late pregnancy bleeding",
        1,
        `**Placenta previa**: painless bleeding, soft uterus; placenta covers cervix — no digital vaginal exam until ultrasound localization.  
**Abruption**: painful bleeding, firm/tender uterus, fetal distress, coagulopathy risk — resuscitate mother/fetus, urgent OB.  

Both can be catastrophic; ABCs and obstetric emergency pathways first.`,
      ),
    ],
  );

  L(
    IDS.modRenal,
    "les-renal-7",
    "Nephritic vs Nephrotic Syndromes",
    "renal-nephritic-nephrotic",
    7,
    35,
    "qq-renal-7",
    "con-renal-7a",
    "Sediment and protein quantity",
    "Two glomerular syndromes with different complications.",
    [
      reading(
        "blk-renal-7a-r",
        "con-renal-7a",
        "Glomerular syndromes",
        1,
        `**Nephritic**: hematuria, RBC casts, HTN, oliguria, mild–moderate protein — inflammation of glomeruli (PSGN, IgA, RPGN patterns).  
**Nephrotic**: ≥3.5 g/day protein, hypoalbuminemia, edema, hyperlipidemia, thrombosis risk — MCD, FSGS, membranous, diabetic, amyloid teaching list.

Biopsy often needed for definitive typing in adults; treat complications (volume, infection, clot risk) while pursuing etiology.`,
      ),
    ],
  );

  L(
    IDS.modRenal,
    "les-renal-8",
    "Diuretic Sites of Action",
    "renal-diuretics",
    8,
    30,
    "qq-renal-8",
    "con-renal-8a",
    "Nephron pharmacology map",
    "Know where each class works before memorizing brand names.",
    [
      reading(
        "blk-renal-8a-r",
        "con-renal-8a",
        "Diuretic map",
        1,
        `Proximal tubule: carbonic anhydrase inhibitors.  
Thick ascending limb: **loop** diuretics (NKCC2) — powerful, cause hypokalemia/metabolic alkalosis.  
Distal convoluted tubule: **thiazides** (NCC).  
Collecting duct: K-sparing (ENaC blockers, aldosterone antagonists).  

Match class to edema, HTN, hyperkalemia risk, and sulfa/allergy caveats under supervised prescribing.`,
      ),
    ],
  );

  L(
    IDS.modCell,
    "les-cell-7",
    "Mendelian Inheritance Patterns",
    "cell-mendelian",
    7,
    35,
    "qq-cell-7",
    "con-cell-7a",
    "Pedigree logic",
    "Pattern recognition drives counseling before gene names.",
    [
      reading(
        "blk-cell-7a-r",
        "con-cell-7a",
        "Inheritance frameworks",
        1,
        `**Autosomal dominant**: vertical transmission, 50% risk to offspring.  
**Autosomal recessive**: horizontal sibships, carrier parents.  
**X-linked**: no male-to-male; affected males transmit X to all daughters.  
**Mitochondrial**: maternal transmission to all children.  

Penetrance, variable expressivity, and de novo mutations complicate real pedigrees — state assumptions explicitly.`,
      ),
    ],
  );

  L(
    IDS.modCell,
    "les-cell-8",
    "Pharmacokinetics — ADME Essentials",
    "cell-adme",
    8,
    35,
    "qq-cell-8",
    "con-cell-8a",
    "Absorption to excretion",
    "ADME explains why route and liver/kidney function change effect.",
    [
      reading(
        "blk-cell-8a-r",
        "con-cell-8a",
        "ADME map",
        1,
        `**A**bsorption (bioavailability, first-pass)  
**D**istribution (Vd, protein binding)  
**M**etabolism (CYP induction/inhibition — clinical interaction logic)  
**E**xcretion (renal/hepatic clearance)

Half-life guides dosing interval conceptually. Never invent numeric regimens here — use ADME to reason about failure, toxicity, and interactions.`,
      ),
    ],
  );

  L(
    IDS.modCvb,
    "les-cv-8",
    "Cardiac Tamponade Physiology",
    "cv-tamponade",
    8,
    30,
    "qq-cv-8",
    "con-cv-8a",
    "Obstructive filling failure",
    "Pericardial pressure equalizes diastolic pressures and kills preload.",
    [
      reading(
        "blk-cv-8a-r",
        "con-cv-8a",
        "Tamponade",
        1,
        `Fluid in pericardial sac ↑ intrapericardial pressure → impaired diastolic filling → ↓CO.  
Beck triad teaching: hypotension, elevated JVP, muffled sounds; pulsus paradoxus.  

Trauma, post-MI rupture, malignancy, uremia, idiopathic pericarditis complications.  
Treatment: urgent pericardiocentesis/surgical drainage — obstructive shock pathway.`,
      ),
    ],
  );

  L(
    IDS.modIm,
    "les-im-7",
    "Cirrhosis Decompensation on the Wards",
    "im-cirrhosis-decomp",
    7,
    35,
    "qq-im-7",
    "con-im-7a",
    "Ascites, SBP, HE, bleed",
    "Decompensation events are medicine emergencies with clear checklists.",
    [
      reading(
        "blk-im-7a-r",
        "con-im-7a",
        "Decompensation map",
        1,
        `Watch for: variceal bleed, SBP (tap ascites if fever/pain/HE/AKI), hepatic encephalopathy, hepatorenal physiology, volume overload.  

Lactulose/rifaximin thinking for HE; albumin + antibiotics pathways for SBP per guidelines; bleed → ABCs + GI.  
Document dry weight goals and avoid nephrotoxins.`,
      ),
    ],
  );

  L(
    IDS.modPsych,
    "les-psych-7",
    "Serotonin Syndrome vs NMS",
    "psych-ss-nms",
    7,
    30,
    "qq-psych-7",
    "con-psych-7a",
    "Two toxidromes, opposite reflexes",
    "Drug history plus neuromuscular exam separates SS from NMS.",
    [
      reading(
        "blk-psych-7a-r",
        "con-psych-7a",
        "Toxidrome contrast",
        1,
        `**Serotonin syndrome**: serotonergic combos (SSRI + MAOI/tramadol/etc.), hyperthermia, hyperreflexia, clonus, myoclonus, diarrhea — stop agents, supportive care, benzos.  
**NMS**: antipsychotics, lead-pipe rigidity, bradyreflexia, elevated CK — stop antipsychotic, supportive care, specialty therapies.

Both can be fatal; airway/cooling/fluids first.`,
      ),
    ],
  );

  L(
    IDS.modPeds,
    "les-peds-7",
    "Pediatric Asthma Exacerbation",
    "peds-asthma-exacerbation",
    7,
    30,
    "qq-peds-7",
    "con-peds-7a",
    "Wheeze to silent chest",
    "Silent chest and hypoxia are failure signs — escalate early.",
    [
      reading(
        "blk-peds-7a-r",
        "con-peds-7a",
        "Peds asthma acute care",
        1,
        `Assess work of breathing, SpO2, air entry, mental status.  
Oxygen, repeated bronchodilators, systemic corticosteroids; magnesium/escalation for severe.  
Silent chest ≠ improvement. Disposition by response and social safety.`,
      ),
    ],
  );

  return program;
}
