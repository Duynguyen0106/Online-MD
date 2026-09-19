import type {
  Choice,
  ClinicalCase,
  Flashcard,
  Objective,
  Program,
  QbankQuestion,
  QuizQuestion,
} from "@/lib/types/domain";

/** Stable IDs for curriculum graph */
export const IDS = {
  program: "prog-md-online",
  phase1: "phase-foundations",
  phase2: "phase-clerkships",
  // Phase 1 modules
  modCell: "mod-cell-mol",
  modCvb: "mod-cv",
  modPulm: "mod-pulm",
  modRenal: "mod-renal",
  modGi: "mod-gi",
  modEndo: "mod-endo",
  modHeme: "mod-heme",
  modNeuro: "mod-neuro",
  modMsk: "mod-msk",
  modId: "mod-id",
  // Phase 2 clerkships
  modIm: "mod-im",
  modSurg: "mod-surg",
  modPeds: "mod-peds",
  modObgyn: "mod-obgyn",
  modPsych: "mod-psych",
  modFm: "mod-fm",
} as const;

function q(
  id: string,
  stem: string,
  choices: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanation: string,
  extras: Partial<QuizQuestion> = {},
): QuizQuestion {
  const choiceObjs: Choice[] = choices.map((text, i) => ({
    id: `${id}-c${i}`,
    text,
  }));
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

/**
 * Curriculum architecture mirrors common patterns at top US MD schools
 * (integrated organ-system preclerkship + core clerkships), adapted for
 * asynchronous online mastery learning. Content is original educational
 * writing aligned to public USMLE Content Outline domains — not copied
 * from any school LMS, First Aid, UWorld, or other copyrighted banks.
 */
export const quizQuestions: QuizQuestion[] = [
  q(
    "qq-cell-1",
    "A missense mutation replaces a charged residue with a hydrophobic residue in a transmembrane helix. Which immediate biophysical consequence is most likely?",
    [
      "Impaired protein folding or membrane insertion",
      "Increased transcription of the mutant allele only",
      "Complete loss of DNA replication fidelity",
      "Selective destruction of mitochondrial DNA",
    ],
    0,
    "Changing polarity within a transmembrane domain commonly destabilizes folding or insertion into the lipid bilayer, altering trafficking or function.",
    { lessonId: "les-cell-1", sequence: 1, objectiveId: "obj-cell-1" },
  ),
  q(
    "qq-cell-2",
    "Which process best explains how a G-protein–coupled receptor amplifies an extracellular signal inside the cell?",
    [
      "One ligand-bound receptor activates many G-protein cycles and downstream enzymes",
      "The ligand directly phosphorylates DNA polymerase",
      "The receptor covalently binds ATP to create a new gene",
      "Endocytosis permanently destroys all second messengers",
    ],
    0,
    "Signal amplification occurs because activated receptors catalyze multiple G-protein turnovers and effectors generate many second-messenger molecules.",
    { lessonId: "les-cell-1", sequence: 2, objectiveId: "obj-cell-2" },
  ),
  q(
    "qq-cell-3",
    "In apoptosis, cytochrome c release from mitochondria primarily activates which cascade?",
    [
      "Caspase-9 apoptosome pathway",
      "Classic complement C5–C9 MAC only",
      "JAK-STAT transcription without proteases",
      "Necroptosis via MLKL pores exclusively",
    ],
    0,
    "Cytochrome c with Apaf-1 and procaspase-9 forms the apoptosome, activating effector caspases.",
    { lessonId: "les-cell-2", sequence: 1, objectiveId: "obj-cell-3" },
  ),
  q(
    "qq-cv-1",
    "During phase 0 of the ventricular myocyte action potential, the dominant ion movement is:",
    [
      "Rapid Na+ influx through voltage-gated sodium channels",
      "Ca2+ efflux through the sodium–calcium exchanger only",
      "K+ influx through inward rectifier channels",
      "Cl− influx through CFTR",
    ],
    0,
    "Phase 0 depolarization in ventricular myocytes is driven by fast voltage-gated Na+ current (INa).",
    { lessonId: "les-cv-1", sequence: 1, objectiveId: "obj-cv-1" },
  ),
  q(
    "qq-cv-2",
    "A patient with ST-elevation in leads II, III, and aVF most likely has occlusion in which artery territory?",
    [
      "Inferior wall — typically right coronary artery (or dominant circumflex)",
      "Anterior wall — left anterior descending only",
      "High lateral wall — diagonal branches only",
      "Posterior wall — always left main stem",
    ],
    0,
    "II, III, aVF view the inferior wall, usually supplied by the RCA (or LCx in left-dominant systems).",
    { lessonId: "les-cv-2", sequence: 1, objectiveId: "obj-cv-3" },
  ),
  q(
    "qq-cv-3",
    "ACE inhibitors reduce afterload and remodeling partly by decreasing levels of:",
    [
      "Angiotensin II and aldosterone",
      "Bradykinin only, with no effect on angiotensin",
      "Atrial natriuretic peptide exclusively",
      "Thyroid hormone binding globulin",
    ],
    0,
    "ACE inhibition lowers angiotensin II (and downstream aldosterone) and also increases bradykinin; the angiotensin/aldosterone axis is central to remodeling.",
    { lessonId: "les-cv-3", sequence: 1, objectiveId: "obj-cv-4" },
  ),
  q(
    "qq-pulm-1",
    "In West zone 3 of the upright lung, blood flow is greatest primarily because:",
    [
      "Arterial and venous pressures both exceed alveolar pressure",
      "Alveolar pressure always exceeds arterial pressure",
      "There is no capillary recruitment possible",
      "Pulmonary vascular resistance is infinite",
    ],
    0,
    "Zone 3 has continuous perfusion because Pa > Pv > PA, maximizing capillary recruitment and flow.",
    { lessonId: "les-pulm-1", sequence: 1, objectiveId: "obj-pulm-1" },
  ),
  q(
    "qq-pulm-2",
    "An acute asthma exacerbation classically shows which spirometric pattern?",
    [
      "Obstructive: ↓FEV1, ↓FEV1/FVC, concavity of expiratory loop",
      "Restrictive: ↑FEV1/FVC with proportionally reduced volumes only",
      "Normal spirometry with isolated DLCO rise",
      "Fixed extrathoracic obstruction only",
    ],
    0,
    "Asthma is an obstructive disease; FEV1 falls more than FVC, reducing the ratio, with scooped expiratory flow-volume loop.",
    { lessonId: "les-pulm-2", sequence: 1, objectiveId: "obj-pulm-2" },
  ),
  q(
    "qq-renal-1",
    "The primary driving force for glomerular filtration is:",
    [
      "Glomerular capillary hydrostatic pressure",
      "Bowman space oncotic pressure alone",
      "Ureteral peristalsis",
      "Medullary interstitial urea only",
    ],
    0,
    "Net filtration pressure is dominated by glomerular hydrostatic pressure opposing Bowman hydrostatic and capillary oncotic pressures.",
    { lessonId: "les-renal-1", sequence: 1, objectiveId: "obj-renal-1" },
  ),
  q(
    "qq-renal-2",
    "Loop diuretics inhibit which transporter in the thick ascending limb?",
    [
      "NKCC2 (Na-K-2Cl cotransporter)",
      "ENaC only",
      "NHE3 exclusively in collecting duct",
      "Na/Ca exchanger in proximal tubule",
    ],
    0,
    "Furosemide-class agents block NKCC2 in the thick ascending limb, impairing the concentrating mechanism.",
    { lessonId: "les-renal-2", sequence: 1, objectiveId: "obj-renal-2" },
  ),
  q(
    "qq-gi-1",
    "Portal hypertension with esophageal varices reflects increased pressure in the:",
    [
      "Portal venous system with portosystemic collateral flow",
      "Hepatic artery only",
      "Thoracic duct exclusively",
      "Inferior vena cava valvular system",
    ],
    0,
    "Portal hypertension drives flow through portosystemic anastomoses (e.g., left gastric → esophageal veins).",
    { lessonId: "les-gi-2", sequence: 1, objectiveId: "obj-gi-2" },
  ),
  q(
    "qq-endo-1",
    "In primary hypothyroidism, expected laboratory pattern is:",
    [
      "High TSH, low free T4",
      "Low TSH, high free T4",
      "High TSH, high free T4",
      "Low TSH, low free T4 with high free T3 only",
    ],
    0,
    "Primary thyroid failure lowers free T4; loss of negative feedback raises TSH.",
    { lessonId: "les-endo-1", sequence: 1, objectiveId: "obj-endo-1" },
  ),
  q(
    "qq-heme-1",
    "Iron-deficiency anemia typically shows which red-cell indices?",
    [
      "Microcytic, hypochromic anemia with low ferritin",
      "Macrocytic anemia with high B12",
      "Normocytic anemia with high haptoglobin consumption only",
      "Spherocytes with positive osmotic fragility as the first finding",
    ],
    0,
    "Iron deficiency impairs hemoglobin synthesis → small, pale RBCs; ferritin is low (unless inflammation confounds).",
    { lessonId: "les-heme-1", sequence: 1, objectiveId: "obj-heme-1" },
  ),
  q(
    "qq-neuro-1",
    "A lesion of the left primary motor cortex face area most likely causes:",
    [
      "Right lower facial weakness with forehead relatively spared (UMN pattern)",
      "Complete left facial paralysis including forehead (LMN)",
      "Bilateral ptosis only",
      "Isolated tongue fasciculations without limb findings",
    ],
    0,
    "Corticobulbar UMN lesions to the face preferentially affect the contralateral lower face; forehead has bilateral UMN innervation.",
    { lessonId: "les-neuro-2", sequence: 1, objectiveId: "obj-neuro-2" },
  ),
  q(
    "qq-id-1",
    "Gram-positive cocci in clusters that are catalase-positive and coagulase-positive are most consistent with:",
    [
      "Staphylococcus aureus",
      "Streptococcus pyogenes",
      "Enterococcus faecalis",
      "Streptococcus pneumoniae",
    ],
    0,
    "S. aureus: GPCs in clusters, catalase+, coagulase+.",
    { lessonId: "les-id-1", sequence: 1, objectiveId: "obj-id-1" },
  ),
  // Module exam questions (CV example + shared pattern)
  q(
    "eq-cv-1",
    "Frank–Starling mechanism primarily describes the relationship between:",
    [
      "Preload (sarcomere stretch) and stroke volume",
      "Afterload and coronary perfusion pressure only",
      "Heart rate and PR interval exclusively",
      "Blood viscosity and Reynolds number only",
    ],
    0,
    "Increased venous return stretches myocytes and, within limits, increases stroke volume.",
    { moduleExamId: "exam-cv", sequence: 1, objectiveId: "obj-cv-2" },
  ),
  q(
    "eq-cv-2",
    "Unstable angina differs from NSTEMI primarily by:",
    [
      "Absence of biomarker evidence of myocyte necrosis",
      "Presence of Q waves in all cases",
      "Requirement for thrombolysis as first-line in all patients",
      "Normal ECG by definition",
    ],
    0,
    "Unstable angina is ischemia without troponin elevation; NSTEMI has necrosis biomarkers.",
    { moduleExamId: "exam-cv", sequence: 2, objectiveId: "obj-cv-3" },
  ),
  q(
    "eq-cv-3",
    "Beta-blockers in chronic HFrEF are beneficial mainly because they:",
    [
      "Reduce deleterious chronic sympathetic activation and improve remodeling",
      "Acutely increase contractility like digoxin in all patients",
      "Block ACE in the pulmonary endothelium",
      "Dissolve coronary thrombi",
    ],
    0,
    "Evidence-based beta-blockers blunt harmful catecholamine signaling and reverse remodeling over time.",
    { moduleExamId: "exam-cv", sequence: 3, objectiveId: "obj-cv-4" },
  ),
  q(
    "eq-cell-1",
    "Ubiquitin–proteasome mediated degradation primarily targets:",
    [
      "Polyubiquitinated proteins for proteolysis",
      "Intact genomic DNA strands",
      "Stored glycogen granules only",
      "Ribosomal RNA exclusively in the nucleolus",
    ],
    0,
    "Polyubiquitin chains mark proteins for proteasomal degradation.",
    { moduleExamId: "exam-cell", sequence: 1, objectiveId: "obj-cell-2" },
  ),
  q(
    "eq-cell-2",
    "p53 activation after DNA damage most directly promotes:",
    [
      "Cell-cycle arrest and/or apoptosis via transcriptional targets",
      "Unregulated VEGF secretion only",
      "Immediate antibody class switching",
      "Ribosome biogenesis acceleration alone",
    ],
    0,
    "p53 induces CDK inhibitors (e.g., p21) and pro-apoptotic genes depending on context.",
    { moduleExamId: "exam-cell", sequence: 2, objectiveId: "obj-cell-3" },
  ),
  // Clerkship-style formative
  q(
    "qq-im-1",
    "Initial outpatient therapy for a hemodynamically stable adult with CAP and no comorbidities often includes:",
    [
      "Amoxicillin or doxycycline (per local resistance patterns/guidelines)",
      "IV vancomycin plus cefepime for all outpatients",
      "Oseltamivir alone without antibacterial coverage",
      "Therapeutic hypothermia",
    ],
    0,
    "Guideline-directed outpatient CAP regimens typically cover typical/atypical pathogens with agents such as amoxicillin or doxycycline when appropriate.",
    { lessonId: "les-im-1", sequence: 1, objectiveId: "obj-im-1" },
  ),
  q(
    "qq-surg-1",
    "The earliest physiologic response to acute hypovolemic hemorrhage includes:",
    [
      "Sympathetic activation with tachycardia and vasoconstriction",
      "Immediate ANP-mediated massive diuresis",
      "Primary respiratory alkalosis from renal compensation first",
      "Cessation of catecholamine release",
    ],
    0,
    "Baroreceptor-mediated sympathetic surge raises HR and SVR to defend blood pressure.",
    { lessonId: "les-surg-1", sequence: 1, objectiveId: "obj-surg-1" },
  ),
];

export const objectives: Objective[] = [
  {
    id: "obj-cell-1",
    code: "OBJ-P1-CELL-001",
    statement:
      "Explain how DNA mutations alter protein structure and cellular phenotype.",
    usmleStep: "step1",
    organSystem: "General Principles",
    physicianTask: "Medical Knowledge / Scientific Concepts",
    contentCategory: "Biochemistry & Genetics",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-1"],
  },
  {
    id: "obj-cell-2",
    code: "OBJ-P1-CELL-002",
    statement:
      "Map major signal-transduction pathways from receptor to cellular response.",
    usmleStep: "step1",
    organSystem: "General Principles",
    physicianTask: "Medical Knowledge / Scientific Concepts",
    contentCategory: "Cell Biology",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-1"],
  },
  {
    id: "obj-cell-3",
    code: "OBJ-P1-CELL-003",
    statement:
      "Differentiate necrosis, apoptosis, and autophagy in tissue injury.",
    usmleStep: "step1",
    organSystem: "General Principles",
    physicianTask: "Medical Knowledge / Scientific Concepts",
    contentCategory: "Pathology",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-2"],
  },
  {
    id: "obj-cv-1",
    code: "OBJ-P1-CV-001",
    statement:
      "Describe cardiac ion channels and phases of the myocyte action potential.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Medical Knowledge / Scientific Concepts",
    contentCategory: "Physiology",
    moduleId: IDS.modCvb,
    lessonIds: ["les-cv-1"],
  },
  {
    id: "obj-cv-2",
    code: "OBJ-P1-CV-002",
    statement:
      "Apply Frank–Starling and pressure–volume concepts to heart failure phenotypes.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Medical Knowledge / Scientific Concepts",
    contentCategory: "Physiology",
    moduleId: IDS.modCvb,
    lessonIds: ["les-cv-1", "les-cv-3"],
  },
  {
    id: "obj-cv-3",
    code: "OBJ-P1-CV-003",
    statement:
      "Localize coronary territories and classify acute coronary syndromes.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modCvb,
    lessonIds: ["les-cv-2"],
  },
  {
    id: "obj-cv-4",
    code: "OBJ-P1-CV-004",
    statement:
      "Select foundational pharmacologic strategies for HFrEF and ischemic heart disease.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Management",
    contentCategory: "Pharmacology",
    moduleId: IDS.modCvb,
    lessonIds: ["les-cv-3"],
  },
  {
    id: "obj-pulm-1",
    code: "OBJ-P1-PULM-001",
    statement: "Interpret V/Q relationships and West zones of pulmonary blood flow.",
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Medical Knowledge / Scientific Concepts",
    contentCategory: "Physiology",
    moduleId: IDS.modPulm,
    lessonIds: ["les-pulm-1"],
  },
  {
    id: "obj-pulm-2",
    code: "OBJ-P1-PULM-002",
    statement: "Distinguish obstructive vs restrictive spirometry patterns.",
    usmleStep: "step1",
    organSystem: "Respiratory",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modPulm,
    lessonIds: ["les-pulm-2"],
  },
  {
    id: "obj-renal-1",
    code: "OBJ-P1-REN-001",
    statement: "Quantify forces governing glomerular filtration rate.",
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Medical Knowledge / Scientific Concepts",
    contentCategory: "Physiology",
    moduleId: IDS.modRenal,
    lessonIds: ["les-renal-1"],
  },
  {
    id: "obj-renal-2",
    code: "OBJ-P1-REN-002",
    statement: "Locate nephron transporter targets of major diuretic classes.",
    usmleStep: "step1",
    organSystem: "Renal / Urinary",
    physicianTask: "Management",
    contentCategory: "Pharmacology",
    moduleId: IDS.modRenal,
    lessonIds: ["les-renal-2"],
  },
  {
    id: "obj-gi-2",
    code: "OBJ-P1-GI-002",
    statement: "Explain portal hypertension and clinically important collaterals.",
    usmleStep: "step1",
    organSystem: "Gastrointestinal",
    physicianTask: "Medical Knowledge / Scientific Concepts",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modGi,
    lessonIds: ["les-gi-2"],
  },
  {
    id: "obj-endo-1",
    code: "OBJ-P1-ENDO-001",
    statement: "Interpret TSH/free T4 patterns in primary vs central thyroid disease.",
    usmleStep: "step1",
    organSystem: "Endocrine",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modEndo,
    lessonIds: ["les-endo-1"],
  },
  {
    id: "obj-heme-1",
    code: "OBJ-P1-HEME-001",
    statement: "Classify anemias using kinetics and red-cell indices.",
    usmleStep: "step1",
    organSystem: "Hematopoietic / Lymphoreticular",
    physicianTask: "Diagnosis",
    contentCategory: "Pathophysiology",
    moduleId: IDS.modHeme,
    lessonIds: ["les-heme-1"],
  },
  {
    id: "obj-neuro-2",
    code: "OBJ-P1-NEURO-002",
    statement: "Localize upper vs lower motor neuron facial weakness.",
    usmleStep: "step1",
    organSystem: "Nervous System",
    physicianTask: "Diagnosis",
    contentCategory: "Neuroscience",
    moduleId: IDS.modNeuro,
    lessonIds: ["les-neuro-2"],
  },
  {
    id: "obj-id-1",
    code: "OBJ-P1-ID-001",
    statement: "Use Gram stain morphology and basic biochemical tests to identify common pathogens.",
    usmleStep: "step1",
    organSystem: "Multisystem",
    physicianTask: "Medical Knowledge / Scientific Concepts",
    contentCategory: "Microbiology",
    moduleId: IDS.modId,
    lessonIds: ["les-id-1"],
  },
  {
    id: "obj-im-1",
    code: "OBJ-P2-IM-001",
    statement: "Initiate evidence-aligned empiric therapy for community-acquired pneumonia.",
    usmleStep: "step2ck",
    organSystem: "Respiratory",
    physicianTask: "Management",
    contentCategory: "Internal Medicine",
    moduleId: IDS.modIm,
    lessonIds: ["les-im-1"],
  },
  {
    id: "obj-surg-1",
    code: "OBJ-P2-SURG-001",
    statement: "Recognize compensatory responses to hypovolemic shock and prioritize resuscitation.",
    usmleStep: "step2ck",
    organSystem: "Multisystem",
    physicianTask: "Management",
    contentCategory: "Surgery",
    moduleId: IDS.modSurg,
    lessonIds: ["les-surg-1"],
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

function video(
  id: string,
  conceptId: string,
  title: string,
  sequence: number,
  mediaUrl: string,
) {
  return {
    id,
    conceptId,
    blockType: "video" as const,
    title,
    sequence,
    mediaUrl,
    mediaProvider: "youtube" as const,
    durationSeconds: 600,
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

export const program: Program = {
  id: IDS.program,
  name: "Online MD — Integrated Curriculum",
  slug: "online-md",
  description:
    "A content-first MD curriculum modeled on integrated organ-system preclerkship and core clerkship structures used across leading US medical schools, redesigned for asynchronous online mastery learning.",
  phases: [
    {
      id: IDS.phase1,
      programId: IDS.program,
      name: "Phase 1 — Foundations (Organ Systems)",
      slug: "foundations",
      sequence: 1,
      phaseKind: "foundations",
      usmleFocus: "step1",
      description:
        "Preclerkship foundational science integrated by organ system and disease mechanism — analogous to block curricula at schools such as UCSF Bridges, Vanderbilt, and other organ-based programs. Mastery required before Step 1 Qbank unlock.",
      modules: [
        {
          id: IDS.modCell,
          phaseId: IDS.phase1,
          title: "Cells, Molecules & Mechanisms of Disease",
          slug: "cell-molecular",
          sequence: 1,
          description:
            "Genetics, cell signaling, and cell injury — the shared language of every organ-system block.",
          isCoreClerkship: false,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-cell",
            moduleId: IDS.modCell,
            title: "Cell & Molecular Mechanisms Exam",
            passThreshold: 0.7,
            questionIds: ["eq-cell-1", "eq-cell-2"],
          },
          lessons: [
            {
              id: "les-cell-1",
              moduleId: IDS.modCell,
              title: "From Gene to Protein to Phenotype",
              slug: "gene-to-phenotype",
              sequence: 1,
              estimatedMinutes: 45,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-cell-1", "qq-cell-2"],
              concepts: [
                {
                  id: "con-cell-1a",
                  lessonId: "les-cell-1",
                  title: "Mutation classes and protein consequences",
                  sequence: 1,
                  summary:
                    "Silent, missense, nonsense, frameshift, and splice mutations change proteins differently; location (catalytic site, transmembrane domain, trafficking motif) predicts phenotype.",
                  blocks: [
                    reading(
                      "blk-cell-1a-r",
                      "con-cell-1a",
                      "Core reading: mutation → structure → function",
                      1,
                      `## Learning focus

Medical genetics in the preclerkship curriculum connects **genotype** to **molecular phenotype** before organ-specific disease.

### Mutation spectrum
- **Silent**: codon change, same amino acid (may still affect splicing/expression).
- **Missense**: amino acid substitution — severity depends on chemical class change and protein context.
- **Nonsense / frameshift**: often trigger nonsense-mediated decay or truncated proteins.
- **Splice-site**: exon skip or intron retention.

### Clinical bridge
Cystic fibrosis (CFTR folding/trafficking), sickle cell (HbS polymerization), and osteogenesis imperfecta (collagen glycine substitutions) illustrate how biophysical failure becomes disease.

> Study tip: for each disease you meet later, ask *what molecule failed, and at which step (synthesis, folding, trafficking, function, clearance)?*`,
                    ),
                    video(
                      "blk-cell-1a-v",
                      "con-cell-1a",
                      "External primer: gene expression overview (public)",
                      2,
                      "https://www.youtube.com/watch?v=gG7uCskUOrA",
                    ),
                    diagram(
                      "blk-cell-1a-d",
                      "con-cell-1a",
                      "Diagram notes: central dogma checkpoints",
                      3,
                      `\`\`\`
DNA --(transcription)--> RNA --(splicing/export)--> mRNA --(translation)--> polypeptide --(folding/PTM)--> functional protein
         ^ mutations can hit any arrow
\`\`\`

Annotate where NMD, chaperones, and proteasomes intervene.`,
                    ),
                  ],
                },
                {
                  id: "con-cell-1b",
                  lessonId: "les-cell-1",
                  title: "Receptors and signal amplification",
                  sequence: 2,
                  summary:
                    "GPCRs, RTKs, and nuclear receptors convert ligand binding into cascades with built-in amplification and termination.",
                  blocks: [
                    reading(
                      "blk-cell-1b-r",
                      "con-cell-1b",
                      "Signal transduction essentials",
                      1,
                      `## Receptor classes high-yield for USMLE Step 1
1. **GPCR** → Gα (Gs/Gi/Gq) → adenylate cyclase / PLC → cAMP or IP3/DAG.
2. **Receptor tyrosine kinase** → autophosphorylation → Ras–MAPK, PI3K–AKT.
3. **Nuclear receptors** → ligand-dependent transcription (steroids, thyroid hormone).

### Amplification
One occupied receptor can activate many G proteins; each effector enzyme generates many second messengers. Termination uses GTP hydrolysis, phosphodiesterases, phosphatases, and receptor desensitization (e.g., β-arrestin).

### Pharmacology hook
Beta-blockers, ACE inhibitors (later CV module), and tyrosine kinase inhibitors all target nodes in these maps.`,
                    ),
                  ],
                },
              ],
            },
            {
              id: "les-cell-2",
              moduleId: IDS.modCell,
              title: "Cell Injury, Death & Adaptation",
              slug: "cell-injury",
              sequence: 2,
              estimatedMinutes: 40,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-cell-3"],
              concepts: [
                {
                  id: "con-cell-2a",
                  lessonId: "les-cell-2",
                  title: "Necrosis vs apoptosis vs autophagy",
                  sequence: 1,
                  summary:
                    "Pattern of death determines inflammation, histology, and therapeutic implications.",
                  blocks: [
                    reading(
                      "blk-cell-2a-r",
                      "con-cell-2a",
                      "Modes of cell death",
                      1,
                      `## Necrosis
Unregulated death after severe injury (ischemia, toxins). Membrane rupture → inflammation. Patterns: coagulative (infarcts in solid organs), liquefactive (brain, abscess), caseous (TB), fat (pancreas), fibrinoid (vessels).

## Apoptosis
Programmed, energy-dependent. **Intrinsic** (mitochondrial cytochrome c → apoptosome → caspase-9) vs **extrinsic** (Fas/TNF → caspase-8). Minimal inflammation; apoptotic bodies cleared by macrophages.

## Autophagy
Lysosomal recycling under stress; can be adaptive or, if excessive, contribute to death.

### Hypoxia pearl
Reversible injury: cellular swelling, fatty change. Irreversible: membrane damage, mitochondrial permeability transition, calcium influx, enzyme leak (clinical biomarkers).`,
                    ),
                    vignette(
                      "blk-cell-2a-v",
                      "con-cell-2a",
                      "Vignette: chest pain and troponin",
                      2,
                      `A 58-year-old with crushing chest pain has elevated troponin I.  
**Question to self:** which death pathway dominates in a completed myocardial infarct core, and why do biomarkers rise?

**Teaching point:** coagulative necrosis of myocytes releases structural proteins (troponin, CK-MB) into blood — a clinical readout of irreversible membrane injury.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modCvb,
          phaseId: IDS.phase1,
          title: "Cardiovascular System",
          slug: "cardiovascular",
          sequence: 2,
          description:
            "Integrated CV block: electrophysiology, coronary disease, heart failure, and foundational therapy — a centerpiece of organ-system curricula.",
          isCoreClerkship: false,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-cv",
            moduleId: IDS.modCvb,
            title: "Cardiovascular Module Exam",
            passThreshold: 0.7,
            questionIds: ["eq-cv-1", "eq-cv-2", "eq-cv-3"],
          },
          lessons: [
            {
              id: "les-cv-1",
              moduleId: IDS.modCvb,
              title: "Cardiac Electrophysiology & Mechanics",
              slug: "cv-ep-mechanics",
              sequence: 1,
              estimatedMinutes: 50,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-cv-1"],
              concepts: [
                {
                  id: "con-cv-1a",
                  lessonId: "les-cv-1",
                  title: "Action potentials and the ECG link",
                  sequence: 1,
                  summary:
                    "Ventricular myocyte phases 0–4 map to ion currents; SA/AV nodal tissue differs (Ca2+-dependent upstrokes).",
                  blocks: [
                    reading(
                      "blk-cv-1a-r",
                      "con-cv-1a",
                      "Myocyte action potential",
                      1,
                      `## Ventricular myocyte
| Phase | Event | Key current |
| --- | --- | --- |
| 0 | Rapid depolarization | INa |
| 1 | Early repolarization | Ito |
| 2 | Plateau | ICa,L balanced by IK |
| 3 | Repolarization | IK (delayed rectifiers) |
| 4 | Resting potential | IK1 |

Nodal cells lack robust INa upstrokes; phase 0 is Ca2+-dependent — explaining why nondihydropyridine calcium-channel blockers slow AV conduction.

### ECG bridge
Atrial depolarization → P wave; ventricular depolarization → QRS; ventricular repolarization → T wave. Conduction delays prolong PR or widen QRS depending on site.`,
                    ),
                    video(
                      "blk-cv-1a-v",
                      "con-cv-1a",
                      "External primer: cardiac AP (public anatomy/physiology)",
                      2,
                      "https://www.youtube.com/watch?v=UTAIas9bEwk",
                    ),
                  ],
                },
                {
                  id: "con-cv-1b",
                  lessonId: "les-cv-1",
                  title: "Preload, afterload, Frank–Starling",
                  sequence: 2,
                  summary:
                    "Stroke volume rises with sarcomere stretch within physiologic limits; afterload opposes ejection.",
                  blocks: [
                    reading(
                      "blk-cv-1b-r",
                      "con-cv-1b",
                      "Pump mechanics",
                      1,
                      `**Preload** ≈ end-diastolic fiber length (related to EDV/venous return).  
**Afterload** ≈ wall stress during ejection (related to aortic pressure and ventricular geometry).  
**Contractility** is load-independent inotropic state (sympathetic tone, inotropes).

Frank–Starling: ↑ venous return → ↑ SV (within limits). In decompensated HFrEF, the curve flattens; volume overload worsens congestion without proportional SV gain.

Pressure–volume loops integrate these concepts for valvular disease and cardiomyopathy.`,
                    ),
                  ],
                },
              ],
            },
            {
              id: "les-cv-2",
              moduleId: IDS.modCvb,
              title: "Ischemic Heart Disease & ACS",
              slug: "cv-acs",
              sequence: 2,
              estimatedMinutes: 45,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-cv-2"],
              concepts: [
                {
                  id: "con-cv-2a",
                  lessonId: "les-cv-2",
                  title: "Coronary territories and ACS classification",
                  sequence: 1,
                  summary:
                    "LAD/LCx/RCA territories; STEMI vs NSTE-ACS defined by ECG and biomarkers.",
                  blocks: [
                    reading(
                      "blk-cv-2a-r",
                      "con-cv-2a",
                      "Coronary anatomy & ACS",
                      1,
                      `## Territories (typical)
- **LAD**: anterior wall, septum ± apex (V1–V4).
- **LCx**: lateral wall (I, aVL, V5–V6).
- **RCA**: inferior wall (II, III, aVF); often SA/AV nodal branches.

## ACS spectrum
Atherosclerotic plaque disruption → thrombosis.
- **Unstable angina**: ischemia without troponin rise.
- **NSTEMI**: troponin(+), no ST elevation meeting STEMI criteria.
- **STEMI**: occlusive thrombus with ST elevation (or equivalent) → emergent reperfusion.

Demand ischemia (type 2 MI) occurs when supply cannot meet increased demand without acute atherothrombosis as the primary event.`,
                    ),
                    vignette(
                      "blk-cv-2a-x",
                      "con-cv-2a",
                      "Vignette: inferior STEMI",
                      2,
                      `62M with diaphoresis; ECG shows ST elevation in II, III, aVF with reciprocal depression in aVL.  
Localize the wall, anticipate RCA vs LCx, and list immediate goals: MONA-BASH historically taught vs contemporary ABC + dual antiplatelet + anticoagulation + reperfusion pathway per ACLS/guidelines.`,
                    ),
                  ],
                },
              ],
            },
            {
              id: "les-cv-3",
              moduleId: IDS.modCvb,
              title: "Heart Failure & Foundational Therapy",
              slug: "cv-hf",
              sequence: 3,
              estimatedMinutes: 45,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-cv-3"],
              concepts: [
                {
                  id: "con-cv-3a",
                  lessonId: "les-cv-3",
                  title: "HFrEF vs HFpEF and GDMT pillars",
                  sequence: 1,
                  summary:
                    "Ejection fraction phenotypes; neurohormonal blockade as disease-modifying therapy.",
                  blocks: [
                    reading(
                      "blk-cv-3a-r",
                      "con-cv-3a",
                      "Heart failure frameworks",
                      1,
                      `## Phenotypes
- **HFrEF**: reduced EF, often eccentric remodeling; ischemic and nonischemic cardiomyopathies.
- **HFpEF**: preserved EF, diastolic dysfunction, concentric remodeling; aging, HTN, obesity, diabetes.

## Neurohormonal model
RAAS and sympathetic activation are initially compensatory then maladaptive → fibrosis, remodeling, arrhythmias.

## Foundational HFrEF therapy (conceptual pillars)
ARNI/ACEI/ARB, evidence-based beta-blockers, mineralocorticoid receptor antagonists, SGLT2 inhibitors — plus diuretics for volume. Exact regimens evolve with guidelines; learn *mechanisms* and *why remodeling improves survival*.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        // Additional Phase 1 modules (compact but real content)
        {
          id: IDS.modPulm,
          phaseId: IDS.phase1,
          title: "Respiratory System",
          slug: "respiratory",
          sequence: 3,
          description: "Gas exchange, mechanics, obstructive/restrictive disease.",
          isCoreClerkship: false,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-pulm",
            moduleId: IDS.modPulm,
            title: "Respiratory Module Exam",
            passThreshold: 0.7,
            questionIds: ["qq-pulm-1", "qq-pulm-2"],
          },
          lessons: [
            {
              id: "les-pulm-1",
              moduleId: IDS.modPulm,
              title: "Ventilation–Perfusion & Gas Exchange",
              slug: "pulm-vq",
              sequence: 1,
              estimatedMinutes: 35,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-pulm-1"],
              concepts: [
                {
                  id: "con-pulm-1a",
                  lessonId: "les-pulm-1",
                  title: "West zones and hypoxemia mechanisms",
                  sequence: 1,
                  summary: "V/Q mismatch, shunt, diffusion limitation, hypoventilation, low FiO2.",
                  blocks: [
                    reading(
                      "blk-pulm-1a-r",
                      "con-pulm-1a",
                      "Hypoxemia framework",
                      1,
                      `Five causes of hypoxemia: (1) low FiO2, (2) hypoventilation, (3) diffusion limitation, (4) shunt, (5) V/Q mismatch.  
A-a gradient helps separate hypoventilation/low FiO2 (normal A-a) from the others (elevated A-a).  
Shunt does not correct fully with 100% O2; V/Q mismatch usually does improve.`,
                    ),
                  ],
                },
              ],
            },
            {
              id: "les-pulm-2",
              moduleId: IDS.modPulm,
              title: "Obstructive & Restrictive Patterns",
              slug: "pulm-patterns",
              sequence: 2,
              estimatedMinutes: 35,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-pulm-2"],
              concepts: [
                {
                  id: "con-pulm-2a",
                  lessonId: "les-pulm-2",
                  title: "Spirometry interpretation",
                  sequence: 1,
                  summary: "FEV1/FVC, TLC, DLCO pattern recognition.",
                  blocks: [
                    reading(
                      "blk-pulm-2a-r",
                      "con-pulm-2a",
                      "Spirometry essentials",
                      1,
                      `Obstruction: ↓FEV1/FVC. Restriction: ↓TLC (spirometry may show ↓FVC with normal/high ratio — confirm with lung volumes).  
DLCO low in emphysema, ILD, pulmonary vascular disease; relatively preserved in many extrapulmonary restrictions.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modRenal,
          phaseId: IDS.phase1,
          title: "Renal & Acid–Base",
          slug: "renal",
          sequence: 4,
          description: "GFR, tubular transport, diuretics, acid–base scaffolds.",
          isCoreClerkship: false,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-renal",
            moduleId: IDS.modRenal,
            title: "Renal Module Exam",
            passThreshold: 0.7,
            questionIds: ["qq-renal-1", "qq-renal-2"],
          },
          lessons: [
            {
              id: "les-renal-1",
              moduleId: IDS.modRenal,
              title: "GFR & Filtration Barrier",
              slug: "renal-gfr",
              sequence: 1,
              estimatedMinutes: 30,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-renal-1"],
              concepts: [
                {
                  id: "con-renal-1a",
                  lessonId: "les-renal-1",
                  title: "Starling forces in the glomerulus",
                  sequence: 1,
                  summary: "Hydrostatic vs oncotic pressures; filtration fraction.",
                  blocks: [
                    reading(
                      "blk-renal-1a-r",
                      "con-renal-1a",
                      "GFR determinants",
                      1,
                      `GFR depends on net filtration pressure and Kf. Afferent constriction ↓GFR; moderate efferent constriction ↑GFR (as with angiotensin II).  
Clearance of inulin ≈ GFR; PAH ≈ RPF (with assumptions). Filtration fraction = GFR/RPF.`,
                    ),
                  ],
                },
              ],
            },
            {
              id: "les-renal-2",
              moduleId: IDS.modRenal,
              title: "Tubular Transport & Diuretics",
              slug: "renal-diuretics",
              sequence: 2,
              estimatedMinutes: 35,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-renal-2"],
              concepts: [
                {
                  id: "con-renal-2a",
                  lessonId: "les-renal-2",
                  title: "Nephron map of diuretic targets",
                  sequence: 1,
                  summary: "PCT CA inhibitors, loop NKCC2, DCT NCC, CD ENaC.",
                  blocks: [
                    reading(
                      "blk-renal-2a-r",
                      "con-renal-2a",
                      "Diuretic sites",
                      1,
                      `Acetazolamide → PCT carbonic anhydrase. Loop diuretics → TAL NKCC2. Thiazides → DCT NCC. K+-sparing → principal cell ENaC or aldosterone receptor.  
Loops are most potent; thiazides preferred in HTN; spironolactone disease-modifying in HFrEF.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modGi,
          phaseId: IDS.phase1,
          title: "Gastrointestinal & Hepatology",
          slug: "gi-hepatology",
          sequence: 5,
          description: "Digestion, absorption, liver pathophysiology, portal hypertension.",
          isCoreClerkship: false,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-gi",
            moduleId: IDS.modGi,
            title: "GI Module Exam",
            passThreshold: 0.7,
            questionIds: ["qq-gi-1"],
          },
          lessons: [
            {
              id: "les-gi-2",
              moduleId: IDS.modGi,
              title: "Portal Hypertension & Liver Failure",
              slug: "gi-portal",
              sequence: 1,
              estimatedMinutes: 35,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-gi-1"],
              concepts: [
                {
                  id: "con-gi-2a",
                  lessonId: "les-gi-2",
                  title: "Portal hypertension sequelae",
                  sequence: 1,
                  summary: "Varices, ascites, splenomegaly, encephalopathy mechanisms.",
                  blocks: [
                    reading(
                      "blk-gi-2a-r",
                      "con-gi-2a",
                      "Portal HTN clinical map",
                      1,
                      `Increased portal pressure → portosystemic shunts (esophageal varices, caput medusae, hemorrhoids), congestive splenomegaly, ascites (underfill + overflow + hypoalbuminemia).  
Hepatic encephalopathy: ammonia and other neurotoxins bypass detoxification. Synthetic dysfunction → ↑INR, ↓albumin.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modEndo,
          phaseId: IDS.phase1,
          title: "Endocrine & Reproductive",
          slug: "endocrine",
          sequence: 6,
          description: "Feedback axes, thyroid, diabetes foundations, reproductive endocrinology intro.",
          isCoreClerkship: false,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-endo",
            moduleId: IDS.modEndo,
            title: "Endocrine Module Exam",
            passThreshold: 0.7,
            questionIds: ["qq-endo-1"],
          },
          lessons: [
            {
              id: "les-endo-1",
              moduleId: IDS.modEndo,
              title: "Thyroid Axis & Clinical Patterns",
              slug: "endo-thyroid",
              sequence: 1,
              estimatedMinutes: 30,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-endo-1"],
              concepts: [
                {
                  id: "con-endo-1a",
                  lessonId: "les-endo-1",
                  title: "TSH-centered interpretation",
                  sequence: 1,
                  summary: "Primary vs central disease; antibody associations conceptually.",
                  blocks: [
                    reading(
                      "blk-endo-1a-r",
                      "con-endo-1a",
                      "Thyroid labs",
                      1,
                      `Primary hypo: ↑TSH ↓FT4. Primary hyper: ↓TSH ↑FT4/T3. Central disease: inappropriately normal/low TSH with low FT4.  
Hashimoto vs Graves are autoimmune prototypes; learn mechanism before memorizing assay panels.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modHeme,
          phaseId: IDS.phase1,
          title: "Hematology & Oncology Foundations",
          slug: "hematology",
          sequence: 7,
          description: "Anemia classification, hemostasis overview, neoplasia principles.",
          isCoreClerkship: false,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-heme",
            moduleId: IDS.modHeme,
            title: "Heme Module Exam",
            passThreshold: 0.7,
            questionIds: ["qq-heme-1"],
          },
          lessons: [
            {
              id: "les-heme-1",
              moduleId: IDS.modHeme,
              title: "Approach to Anemia",
              slug: "heme-anemia",
              sequence: 1,
              estimatedMinutes: 35,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-heme-1"],
              concepts: [
                {
                  id: "con-heme-1a",
                  lessonId: "les-heme-1",
                  title: "Kinetic and morphologic classification",
                  sequence: 1,
                  summary: "Production vs destruction/loss; micro/normo/macrocytic algorithms.",
                  blocks: [
                    reading(
                      "blk-heme-1a-r",
                      "con-heme-1a",
                      "Anemia algorithm",
                      1,
                      `Start with CBC + indices + reticulocyte count.  
Low retic → underproduction (iron, B12/folate, marrow failure, chronic disease). High retic → blood loss or hemolysis (check LDH, haptoglobin, bilirubin, smear).  
Microcytic: iron deficiency, thalassemia, anemia of chronic disease, sideroblastic.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modNeuro,
          phaseId: IDS.phase1,
          title: "Neurosciences & Behavior",
          slug: "neurosciences",
          sequence: 8,
          description: "Localization, motor pathways, and behavioral science foundations.",
          isCoreClerkship: false,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-neuro",
            moduleId: IDS.modNeuro,
            title: "Neuroscience Module Exam",
            passThreshold: 0.7,
            questionIds: ["qq-neuro-1"],
          },
          lessons: [
            {
              id: "les-neuro-2",
              moduleId: IDS.modNeuro,
              title: "Motor Systems & Localization",
              slug: "neuro-motor",
              sequence: 1,
              estimatedMinutes: 35,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-neuro-1"],
              concepts: [
                {
                  id: "con-neuro-2a",
                  lessonId: "les-neuro-2",
                  title: "UMN vs LMN",
                  sequence: 1,
                  summary: "Pattern recognition for cortex, internal capsule, cord, root, nerve, NMJ, muscle.",
                  blocks: [
                    reading(
                      "blk-neuro-2a-r",
                      "con-neuro-2a",
                      "Localization rules",
                      1,
                      `UMN: pyramidal weakness, hyperreflexia, Babinski, spasticity (after spinal shock). LMN: flaccid weakness, hyporeflexia, fasciculations, atrophy.  
Facial weakness: UMN spares forehead; LMN (CN VII) involves forehead — classic Step 1 localization pearl.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modMsk,
          phaseId: IDS.phase1,
          title: "Musculoskeletal & Rheumatology",
          slug: "msk",
          sequence: 9,
          description: "Bone, joint, and autoimmune connective-tissue foundations.",
          isCoreClerkship: false,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-msk",
            moduleId: IDS.modMsk,
            title: "MSK Module Exam",
            passThreshold: 0.7,
            questionIds: ["qq-heme-1"],
          },
          lessons: [
            {
              id: "les-msk-1",
              moduleId: IDS.modMsk,
              title: "Joint Pain Framework",
              slug: "msk-joints",
              sequence: 1,
              estimatedMinutes: 30,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-heme-1"],
              concepts: [
                {
                  id: "con-msk-1a",
                  lessonId: "les-msk-1",
                  title: "Inflammatory vs mechanical arthritis",
                  sequence: 1,
                  summary: "Morning stiffness, systemic features, synovial pattern recognition.",
                  blocks: [
                    reading(
                      "blk-msk-1a-r",
                      "con-msk-1a",
                      "Arthritis approach",
                      1,
                      `Inflammatory: prolonged morning stiffness, warmth, elevated ESR/CRP, systemic symptoms. Mechanical/OA: activity-related pain, brief stiffness.  
Monoarthritis → always consider septic arthritis until proven otherwise in acute presentations.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modId,
          phaseId: IDS.phase1,
          title: "Host Defense, Microbiology & Infectious Disease",
          slug: "infectious-disease",
          sequence: 10,
          description: "Immune principles and high-yield organism identification strategies.",
          isCoreClerkship: false,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-id",
            moduleId: IDS.modId,
            title: "ID Module Exam",
            passThreshold: 0.7,
            questionIds: ["qq-id-1"],
          },
          lessons: [
            {
              id: "les-id-1",
              moduleId: IDS.modId,
              title: "Bacteriology Laboratory Logic",
              slug: "id-bacteriology",
              sequence: 1,
              estimatedMinutes: 30,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-id-1"],
              concepts: [
                {
                  id: "con-id-1a",
                  lessonId: "les-id-1",
                  title: "Gram stain algorithms",
                  sequence: 1,
                  summary: "Morphology + catalase/coagulase/hemolysis decision trees.",
                  blocks: [
                    reading(
                      "blk-id-1a-r",
                      "con-id-1a",
                      "Bug desk reference habits",
                      1,
                      `Build branching algorithms rather than isolated flashcards: Gram → shape → arrangement → catalase → coagulase/hemolysis → specialty tests.  
S. aureus vs strep vs enterococcus distinctions unlock dozens of clinical vignettes.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: IDS.phase2,
      programId: IDS.program,
      name: "Phase 2 — Core Clerkships",
      slug: "clerkships",
      sequence: 2,
      phaseKind: "clerkship_core",
      usmleFocus: "step2ck",
      description:
        "Core clinical clerkships aligned with the standard US MD core (IM, Surgery, Pediatrics, OB/GYN, Psychiatry, Family Medicine). Online model emphasizes clinical reasoning cases and Step 2 CK–style decision making. Step 2 CK Qbank unlocks after core clerkship modules are mastered.",
      modules: [
        {
          id: IDS.modIm,
          phaseId: IDS.phase2,
          title: "Internal Medicine Clerkship",
          slug: "internal-medicine",
          sequence: 1,
          description: "Adult medicine clinical reasoning: pneumonia, ACS, AKI, glycemic emergencies.",
          isCoreClerkship: true,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-im",
            moduleId: IDS.modIm,
            title: "IM Clerkship Exam",
            passThreshold: 0.7,
            questionIds: ["qq-im-1"],
          },
          lessons: [
            {
              id: "les-im-1",
              moduleId: IDS.modIm,
              title: "Community-Acquired Pneumonia",
              slug: "im-cap",
              sequence: 1,
              estimatedMinutes: 40,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-im-1"],
              concepts: [
                {
                  id: "con-im-1a",
                  lessonId: "les-im-1",
                  title: "Diagnosis, severity, empiric therapy",
                  sequence: 1,
                  summary: "Clinical + radiographic diagnosis; site-of-care; guideline-directed empiric Rx.",
                  blocks: [
                    reading(
                      "blk-im-1a-r",
                      "con-im-1a",
                      "CAP clinical pathway",
                      1,
                      `## Step 2 CK posture
Assess airway/oxygenation, sepsis, and site of care (outpatient vs ward vs ICU) using clinical judgment frameworks (e.g., severity indices as adjuncts).  
Cover typical (pneumococcus, H. influenzae) and atypical (Mycoplasma, Chlamydia, Legionella) pathogens when indicated.  
Always reconsider TB, influenza, COVID-19, aspiration, and immunocompromised hosts when history demands.`,
                    ),
                    vignette(
                      "blk-im-1a-x",
                      "con-im-1a",
                      "Vignette: febrile cough",
                      2,
                      `45Y otherwise healthy outpatient with fever, productive cough, focal crackles, and lobar infiltrate. Mentally choose empiric outpatient therapy and list red flags for admission.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modSurg,
          phaseId: IDS.phase2,
          title: "Surgery Clerkship",
          slug: "surgery",
          sequence: 2,
          description: "Perioperative physiology, acute abdomen, shock, wound healing.",
          isCoreClerkship: true,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-surg",
            moduleId: IDS.modSurg,
            title: "Surgery Clerkship Exam",
            passThreshold: 0.7,
            questionIds: ["qq-surg-1"],
          },
          lessons: [
            {
              id: "les-surg-1",
              moduleId: IDS.modSurg,
              title: "Shock & Resuscitation Priorities",
              slug: "surg-shock",
              sequence: 1,
              estimatedMinutes: 35,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-surg-1"],
              concepts: [
                {
                  id: "con-surg-1a",
                  lessonId: "les-surg-1",
                  title: "Hypovolemic and distributive shock",
                  sequence: 1,
                  summary: "ABCs, hemorrhage control, differentiating shock physiology.",
                  blocks: [
                    reading(
                      "blk-surg-1a-r",
                      "con-surg-1a",
                      "Shock physiology for clerks",
                      1,
                      `Hypovolemic/hemorrhagic: ↓preload → ↓CO; compensatory tachycardia/vasoconstriction.  
Distributive (septic): vasodilation, relative hypovolemia. Cardiogenic: pump failure. Obstructive: tamponade/PE/tension pneumothorax.  
Surgical priority: stop bleeding, restore volume/oxygen delivery, treat cause.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modPeds,
          phaseId: IDS.phase2,
          title: "Pediatrics Clerkship",
          slug: "pediatrics",
          sequence: 3,
          description: "Growth, development, fever, and pediatric preventive care.",
          isCoreClerkship: true,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-peds",
            moduleId: IDS.modPeds,
            title: "Pediatrics Clerkship Exam",
            passThreshold: 0.7,
            questionIds: ["qq-im-1"],
          },
          lessons: [
            {
              id: "les-peds-1",
              moduleId: IDS.modPeds,
              title: "Fever in the Young Infant — Reasoning Frame",
              slug: "peds-fever",
              sequence: 1,
              estimatedMinutes: 30,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-im-1"],
              concepts: [
                {
                  id: "con-peds-1a",
                  lessonId: "les-peds-1",
                  title: "Age-based risk stratification",
                  sequence: 1,
                  summary: "Neonates vs older infants; serious bacterial infection consideration.",
                  blocks: [
                    reading(
                      "blk-peds-1a-r",
                      "con-peds-1a",
                      "Pediatric fever principles",
                      1,
                      `Younger infants have higher risk of serious bacterial infection and atypical presentations. Clinical pathways depend on age, immunization status, appearance, and local guidelines.  
Online clerkship goal: practice *risk stratification reasoning*, not memorize a single hospital protocol.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modObgyn,
          phaseId: IDS.phase2,
          title: "Obstetrics & Gynecology Clerkship",
          slug: "obgyn",
          sequence: 4,
          description: "Pregnancy physiology, prenatal care, and common gynecologic presentations.",
          isCoreClerkship: true,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-obgyn",
            moduleId: IDS.modObgyn,
            title: "OB/GYN Clerkship Exam",
            passThreshold: 0.7,
            questionIds: ["qq-endo-1"],
          },
          lessons: [
            {
              id: "les-obgyn-1",
              moduleId: IDS.modObgyn,
              title: "Prenatal Care Foundations",
              slug: "obgyn-prenatal",
              sequence: 1,
              estimatedMinutes: 30,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-endo-1"],
              concepts: [
                {
                  id: "con-obgyn-1a",
                  lessonId: "les-obgyn-1",
                  title: "Dating, screening, warning signs",
                  sequence: 1,
                  summary: "Gestational dating, routine labs/screens, when to escalate.",
                  blocks: [
                    reading(
                      "blk-obgyn-1a-r",
                      "con-obgyn-1a",
                      "Prenatal care map",
                      1,
                      `Confirm dating (LMP + ultrasound), review teratogen/exposure history, initiate routine prenatal labs and gestational-age–specific screens.  
Teach red flags: bleeding, severe headache/visual changes, decreased fetal movement, preterm contractions, fever.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modPsych,
          phaseId: IDS.phase2,
          title: "Psychiatry Clerkship",
          slug: "psychiatry",
          sequence: 5,
          description: "Mental status, mood/psychosis frameworks, safety assessment.",
          isCoreClerkship: true,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-psych",
            moduleId: IDS.modPsych,
            title: "Psychiatry Clerkship Exam",
            passThreshold: 0.7,
            questionIds: ["qq-neuro-1"],
          },
          lessons: [
            {
              id: "les-psych-1",
              moduleId: IDS.modPsych,
              title: "Safety Assessment & Mood Disorders Intro",
              slug: "psych-safety",
              sequence: 1,
              estimatedMinutes: 30,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-neuro-1"],
              concepts: [
                {
                  id: "con-psych-1a",
                  lessonId: "les-psych-1",
                  title: "Suicide risk and MSE",
                  sequence: 1,
                  summary: "Structured safety assessment; depression diagnostic criteria overview.",
                  blocks: [
                    reading(
                      "blk-psych-1a-r",
                      "con-psych-1a",
                      "Clinical safety first",
                      1,
                      `Always assess ideation, plan, intent, means, protective factors. Document clearly.  
Major depressive disorder requires persistent syndromic features with functional impairment — learn criterion clusters rather than single symptoms.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
        {
          id: IDS.modFm,
          phaseId: IDS.phase2,
          title: "Family Medicine Clerkship",
          slug: "family-medicine",
          sequence: 6,
          description: "Continuity care, prevention, and undifferentiated outpatient complaints.",
          isCoreClerkship: true,
          status: "published",
          examPassThreshold: 0.7,
          exam: {
            id: "exam-fm",
            moduleId: IDS.modFm,
            title: "Family Medicine Clerkship Exam",
            passThreshold: 0.7,
            questionIds: ["qq-im-1"],
          },
          lessons: [
            {
              id: "les-fm-1",
              moduleId: IDS.modFm,
              title: "Preventive Care & Undifferentiated Symptoms",
              slug: "fm-prevention",
              sequence: 1,
              estimatedMinutes: 30,
              status: "published",
              quizPassThreshold: 0.8,
              quizQuestionIds: ["qq-im-1"],
              concepts: [
                {
                  id: "con-fm-1a",
                  lessonId: "les-fm-1",
                  title: "Screening principles",
                  sequence: 1,
                  summary: "USPSTF-style reasoning: benefits, harms, shared decisions.",
                  blocks: [
                    reading(
                      "blk-fm-1a-r",
                      "con-fm-1a",
                      "Prevention reasoning",
                      1,
                      `Screening tests require sufficient prevalence, acceptable sensitivity/specificity, and net benefit. Anchor counseling in patient values.  
Undifferentiated symptoms (fatigue, dizziness): rule out red flags, then probabilistic workups.`,
                    ),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const flashcards: Flashcard[] = [
  {
    id: "fc-1",
    lessonId: "les-cv-1",
    front: "Dominant ion current in ventricular phase 0?",
    back: "Fast Na+ influx (INa).",
    objectiveId: "obj-cv-1",
  },
  {
    id: "fc-2",
    lessonId: "les-cv-2",
    front: "ST elevation in II, III, aVF suggests which wall?",
    back: "Inferior wall — usually RCA (or dominant LCx).",
    objectiveId: "obj-cv-3",
  },
  {
    id: "fc-3",
    lessonId: "les-cell-2",
    front: "Cytochrome c activates which caspase pathway?",
    back: "Intrinsic apoptosis via apoptosome → caspase-9.",
    objectiveId: "obj-cell-3",
  },
  {
    id: "fc-4",
    lessonId: "les-renal-2",
    front: "Loop diuretic transporter target?",
    back: "NKCC2 in thick ascending limb.",
    objectiveId: "obj-renal-2",
  },
  {
    id: "fc-5",
    lessonId: "les-pulm-2",
    front: "Spirometry hallmark of obstruction?",
    back: "Reduced FEV1/FVC ratio.",
    objectiveId: "obj-pulm-2",
  },
  {
    id: "fc-6",
    lessonId: "les-endo-1",
    front: "Primary hypothyroidism labs?",
    back: "High TSH, low free T4.",
    objectiveId: "obj-endo-1",
  },
  {
    id: "fc-7",
    lessonId: "les-id-1",
    front: "Catalase+, coagulase+ GPC in clusters?",
    back: "Staphylococcus aureus.",
    objectiveId: "obj-id-1",
  },
  {
    id: "fc-8",
    lessonId: "les-im-1",
    front: "Outpatient CAP coverage goal?",
    back: "Cover typical ± atypical pathogens per guidelines/host factors.",
    objectiveId: "obj-im-1",
  },
];

export const qbankQuestions: QbankQuestion[] = [
  {
    id: "qb-1",
    usmleStep: "step1",
    moduleId: IDS.modCvb,
    stem: "A 67-year-old man has pulmonary edema and an EF of 30%. Chronic therapy with an ACE inhibitor is most likely to improve survival by which mechanism?",
    choices: [
      { id: "qb-1-c0", text: "Reducing angiotensin II–mediated remodeling" },
      { id: "qb-1-c1", text: "Directly dissolving coronary thrombus" },
      { id: "qb-1-c2", text: "Blocking late sodium current like ranolazine" },
      { id: "qb-1-c3", text: "Inhibiting NKCC2 in the loop of Henle" },
    ],
    correctChoiceId: "qb-1-c0",
    explanation:
      "ACE inhibitors reduce angiotensin II (and aldosterone), limiting maladaptive remodeling — a disease-modifying effect in HFrEF.",
    organSystem: "Cardiovascular",
    physicianTask: "Management",
    contentCategory: "Pharmacology",
    objectiveId: "obj-cv-4",
    difficulty: 2,
  },
  {
    id: "qb-2",
    usmleStep: "step1",
    moduleId: IDS.modCell,
    stem: "A protein is tagged with a Lys48-linked polyubiquitin chain. What is the most likely fate?",
    choices: [
      { id: "qb-2-c0", text: "Proteasomal degradation" },
      { id: "qb-2-c1", text: "Export to the extracellular matrix unchanged" },
      { id: "qb-2-c2", text: "Permanent insertion into mitochondrial DNA" },
      { id: "qb-2-c3", text: "Conversion into a tRNA molecule" },
    ],
    correctChoiceId: "qb-2-c0",
    explanation: "K48-linked polyubiquitin is the classic proteasome degradation signal.",
    organSystem: "General Principles",
    physicianTask: "Medical Knowledge / Scientific Concepts",
    contentCategory: "Cell Biology",
    objectiveId: "obj-cell-2",
    difficulty: 1,
  },
  {
    id: "qb-3",
    usmleStep: "step2ck",
    moduleId: IDS.modIm,
    stem: "A previously healthy 50-year-old has fever, dyspnea, and a lobar infiltrate. Oxygen saturation is 96% on room air; she is ambulatory and taking oral fluids. Next best management step?",
    choices: [
      {
        id: "qb-3-c0",
        text: "Outpatient antibiotics with follow-up precautions",
      },
      { id: "qb-3-c1", text: "Immediate surgical lung biopsy" },
      { id: "qb-3-c2", text: "Empiric antifungal therapy only" },
      { id: "qb-3-c3", text: "Therapeutic anticoagulation without antibiotics" },
    ],
    correctChoiceId: "qb-3-c0",
    explanation:
      "Low-risk CAP without hypoxia or instability is typically managed with outpatient antibiotics and return precautions.",
    organSystem: "Respiratory",
    physicianTask: "Management",
    contentCategory: "Internal Medicine",
    objectiveId: "obj-im-1",
    difficulty: 2,
  },
];

export const clinicalCases: ClinicalCase[] = [
  {
    id: "case-cv-1",
    moduleId: IDS.modCvb,
    title: "Progressive Dyspnea and Orthophnea",
    presentationMd:
      "A 64-year-old with prior anterior MI presents with 2 weeks of progressive dyspnea, orthopnea, and ankle swelling. BP 100/70, HR 98, SpO2 93% on room air. JVP elevated; bilateral crackles; S3; 2+ pitting edema. CXR: pulmonary edema. Troponin mildly up; ECG: old Q waves, no acute STE.",
    stages: [
      {
        id: "stage-1",
        prompt: "List your leading diagnosis and the physiologic mechanism of the crackles/edema.",
        expectedFocus: "Acute decompensated HFrEF / elevated left-sided filling pressures",
      },
      {
        id: "stage-2",
        prompt: "Outline initial management priorities and which drug classes modify disease long-term.",
        expectedFocus: "Oxygen/diuresis/hemodynamic support as needed; GDMT pillars for HFrEF",
      },
    ],
    teachingPoints:
      "Congestion reflects elevated filling pressures. Stabilize volume/oxygenation, then optimize disease-modifying therapy for HFrEF.",
    objectiveIds: ["obj-cv-2", "obj-cv-4"],
    status: "published",
  },
];

export function getQuestionMap() {
  return Object.fromEntries(quizQuestions.map((q) => [q.id, q]));
}
