/**
 * Open-OER enrichment wave.
 *
 * Original Online MD teaching prose for pathology topics that the content
 * audit flagged as embedded/thin. Further-reading footers point at vetted
 * free OERs (OpenStax, Pathologia, BCIT, Patholines, Wikibooks) — links only.
 *
 * Does NOT paste OpenStax, Harsh Mohan, Robbins, Pathoma, or MedRAG corpora.
 */
import type {
  Flashcard,
  Objective,
  Program,
  QuizQuestion,
} from "@/lib/types/domain";
import { IDS } from "@/lib/curriculum/seed";
import { furtherReadingMd } from "@/lib/curriculum/open-textbooks";

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

const OER_NOTE =
  "\n\n*Original Online MD teaching map. Morphology timelines and staging rules remain faculty-reviewable (REFERENCE_REVIEW_REQUIRED for exact hour cutoffs used in exams).*";

export const openOerObjectives: Objective[] = [
  {
    id: "obj-cv-mi-timeline",
    code: "OBJ-P1-CV-MI-TL",
    statement:
      "Sequence gross and histologic changes after myocardial infarction from hours to months.",
    usmleStep: "step1",
    organSystem: "Cardiovascular",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modCvb,
    lessonIds: ["les-cv-mi-timeline"],
  },
  {
    id: "obj-cell-amyloid",
    code: "OBJ-P1-CELL-AMY",
    statement:
      "Explain amyloid as misfolded protein deposits and map AL vs AA vs Aβ clinical patterns.",
    usmleStep: "step1",
    organSystem: "General Principles",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-amyloid"],
  },
  {
    id: "obj-cell-carcinogenesis",
    code: "OBJ-P1-CELL-CARC",
    statement:
      "Contrast chemical, radiation, and microbial carcinogenesis using initiator/promoter and oncoprotein logic.",
    usmleStep: "step1",
    organSystem: "General Principles",
    physicianTask: "Foundational Knowledge",
    contentCategory: "Pathology",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-carcinogenesis"],
  },
  {
    id: "obj-cell-paraneoplastic",
    code: "OBJ-P1-CELL-PARA",
    statement:
      "Map classic paraneoplastic syndromes to tumor types and mediating factors.",
    usmleStep: "step1",
    organSystem: "General Principles",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modCell,
    lessonIds: ["les-cell-paraneoplastic"],
  },
  {
    id: "obj-msk-skin-tumors",
    code: "OBJ-P1-MSK-SKIN",
    statement:
      "Discriminate basal cell carcinoma, squamous cell carcinoma, and melanoma by risk and clinical cues.",
    usmleStep: "step1",
    organSystem: "Skin / Soft Tissue",
    physicianTask: "Diagnosis",
    contentCategory: "Pathology",
    moduleId: IDS.modMsk,
    lessonIds: ["les-msk-skin-tumors"],
  },
];

export const openOerQuizQuestions: QuizQuestion[] = [
  q(
    "qq-cv-mi-timeline",
    "At ~3–4 days after a completed myocardial infarct, histology most characteristically shows:",
    [
      "Macrophage infiltration with early removal of necrotic debris",
      "Dense collagen scar as the only finding",
      "Wavy fibers alone without necrosis",
      "Fully regenerated myocytes",
    ],
    0,
    "Teaching timeline: days 3–7 emphasize macrophage cleanup of coagulative necrosis before granulation dominates later in the first week–two weeks.",
    { lessonId: "les-cv-mi-timeline", objectiveId: "obj-cv-mi-timeline" },
  ),
  q(
    "qq-cell-amyloid",
    "Apple-green birefringence with Congo red under polarized light supports:",
    [
      "Amyloid deposition",
      "Iron overload alone",
      "Glycogen storage exclusively",
      "Fat necrosis only",
    ],
    0,
    "Congo red with apple-green birefringence is the classic tinctorial teaching cue for amyloid.",
    { lessonId: "les-cell-amyloid", objectiveId: "obj-cell-amyloid" },
  ),
  q(
    "qq-cell-carcinogenesis",
    "HPV E6/E7 contributing to cervical neoplasia is best framed as:",
    [
      "Microbial carcinogenesis via oncoprotein inactivation of tumor suppressors",
      "Purely thermal injury without molecular effect",
      "Initiator chemical only with no viral role",
      "Always benign metaplasia without cancer risk",
    ],
    0,
    "High-risk HPV oncoproteins disrupt p53/Rb pathways — a board-standard microbial carcinogenesis example.",
    {
      lessonId: "les-cell-carcinogenesis",
      objectiveId: "obj-cell-carcinogenesis",
    },
  ),
  q(
    "qq-cell-paraneoplastic",
    "Small-cell lung cancer with Cushingoid features most often implicates:",
    [
      "Ectopic ACTH production",
      "PTHrP as the only mediator",
      "Primary adrenal failure",
      "Iodine deficiency",
    ],
    0,
    "SCLC is classically linked to ACTH (and also SIADH / Lambert–Eaton in other vignettes).",
    {
      lessonId: "les-cell-paraneoplastic",
      objectiveId: "obj-cell-paraneoplastic",
    },
  ),
  q(
    "qq-msk-skin-tumors",
    "A pearly telangiectatic papule on sun-damaged face that rarely metastasizes is most consistent with:",
    [
      "Basal cell carcinoma",
      "Nodular melanoma as first choice",
      "Keratoacanthoma requiring no diagnosis",
      "Dermatofibroma exclusively",
    ],
    0,
    "BCC: pearly, telangiectatic, locally invasive, metastasis rare versus melanoma’s metastatic risk.",
    { lessonId: "les-msk-skin-tumors", objectiveId: "obj-msk-skin-tumors" },
  ),
];

export const openOerFlashcards: Flashcard[] = [
  {
    id: "fc-cv-mi-timeline",
    lessonId: "les-cv-mi-timeline",
    front: "MI histology day 1 vs day 5 vs month 2?",
    back: "Day 1: coagulative necrosis begins; day ~5: macrophages clearing debris / early granulation; month 2+: dense scar. Exact hour tables: faculty-verify.",
  },
  {
    id: "fc-cell-amyloid",
    lessonId: "les-cell-amyloid",
    front: "AL vs AA amyloid — protein source?",
    back: "AL = immunoglobulin light chain (plasma cell); AA = serum amyloid A (chronic inflammation).",
  },
  {
    id: "fc-cell-para",
    lessonId: "les-cell-paraneoplastic",
    front: "PTHrP paraneoplastic hypercalcemia — classic tumor?",
    back: "Squamous cell lung cancer (teaching association); also other solid tumors.",
  },
];

export const openOerClinicalCases: never[] = [];
export const openOerQbankQuestions: never[] = [];

export function applyOpenOerExpansions(program: Program): Program {
  const cellReading = furtherReadingMd(IDS.modCell);
  const cvReading = furtherReadingMd(IDS.modCvb);
  const mskReading = furtherReadingMd(IDS.modMsk);

  pushLesson(
    program,
    IDS.modCvb,
    {
      id: "les-cv-mi-timeline",
      moduleId: IDS.modCvb,
      title: "MI Morphologic Timeline",
      slug: "cv-mi-timeline",
      sequence: 20,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-cv-mi-timeline"],
      concepts: [
        {
          id: "con-cv-mi-timeline",
          lessonId: "les-cv-mi-timeline",
          title: "From waviness to scar",
          sequence: 1,
          summary:
            "Gross and histologic phases after coronary occlusion explain rupture risk windows and biomarker rise.",
          blocks: [
            reading(
              "blk-cv-mi-timeline-r",
              "con-cv-mi-timeline",
              "Teaching timeline (verify exact hours with faculty sources)",
              1,
              `## Why a timeline exists
Completed ischemic myocyte death is **coagulative necrosis**. The clock from occlusion → inflammation → granulation → scar explains (1) when the wall is mechanically weakest and (2) what the microscope should show if death occurred days ago.

## Board-style sequence (conceptual — not a pasted textbook table)
| Phase (approx.) | Dominant picture |
| --- | --- |
| 0–4 h | Often normal light microscopy; waviness may appear; clinical diagnosis leans on ECG/biomarkers |
| ~4–24 h | Early coagulative necrosis; hypereosinophilic myocytes; edema; early neutrophils arriving |
| ~1–3 d | Neutrophil-rich necrosis; progressive disintegration |
| ~3–7 d | **Macrophage** phagocytosis of debris; disintegration of dead muscle — classic teaching window for free-wall rupture risk |
| ~1–2 wk | Granulation tissue (fibroblasts, new vessels) |
| Weeks → months | Progressive collagen scar; remodeling |

## Clinical bridges
- **Troponin** rises after irreversible membrane injury — not after reversible ischemia alone.  
- **Rupture / VSD / papillary muscle** complications cluster when necrosis is soft and inflamed (roughly days 3–7 in classic teaching).  
- Reperfusion changes the histology (hemorrhage, contraction bands) — do not force a single timeline onto every reperfused infarct.

${OER_NOTE}

${cvReading}

**Open path companions (read, do not scrape):** [Pathologia — Myocardial infarction](https://pathologia.ed.ac.uk/) · [BCIT Pathology](https://pressbooks.bccampus.ca/dcbiol2200/) (CC BY-NC).`,
            ),
            vignette(
              "blk-cv-mi-timeline-v",
              "con-cv-mi-timeline",
              "Vignette: day-5 shock after STEMI",
              2,
              `A patient treated for STEMI develops sudden hypotension and a new murmur on hospital day 5.  
**Ask:** which morphologic phase makes mechanical complication plausible, and what bedside structures fail (free wall, septum, papillary muscle)?`,
            ),
          ],
        },
      ],
    },
    "qq-cv-mi-timeline",
  );

  pushLesson(
    program,
    IDS.modCell,
    {
      id: "les-cell-amyloid",
      moduleId: IDS.modCell,
      title: "Amyloidosis — Protein Misfolding Pathology",
      slug: "cell-amyloidosis",
      sequence: 20,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-cell-amyloid"],
      concepts: [
        {
          id: "con-cell-amyloid",
          lessonId: "les-cell-amyloid",
          title: "Shared morphology, different proteins",
          sequence: 1,
          summary:
            "Amyloid is extracellular misfolded β-sheet protein with a common tinctorial signature and disease-specific precursors.",
          blocks: [
            reading(
              "blk-cell-amyloid-r",
              "con-cell-amyloid",
              "AL, AA, and organ maps",
              1,
              `## Shared definition
**Amyloid** = extracellular deposits of misfolded proteins in β-pleated sheet conformation.  
Light microscopy: amorphous eosinophilic material.  
Special stain teaching cue: **Congo red → apple-green birefringence** under polarized light.

## High-yield biochemical types
| Type | Precursor | Clinical teaching frame |
| --- | --- | --- |
| **AL** | Ig light chain | Plasma-cell dyscrasia / myeloma spectrum |
| **AA** | Serum amyloid A | Chronic inflammation (RA, IBD, chronic infection) |
| **Aβ** | Amyloid-β | Alzheimer neuropathology teaching |
| **ATTR** | Transthyretin | Aging / hereditary cardiomyopathy–neuropathy frames |

## Organ consequences (pattern recognition)
- Kidney → nephrotic-range proteinuria  
- Heart → restrictive cardiomyopathy, low-voltage ECG teaching association  
- Tongue / soft tissue → macroglossia (AL)  
- CNS → Alzheimer plaques (Aβ) — different clinical conversation than systemic AL/AA

Do not treat “amyloid” as one disease — name the **protein** when the vignette allows.

${OER_NOTE}

${cellReading}`,
            ),
          ],
        },
      ],
    },
    "qq-cell-amyloid",
  );

  pushLesson(
    program,
    IDS.modCell,
    {
      id: "les-cell-carcinogenesis",
      moduleId: IDS.modCell,
      title: "Carcinogenesis — Chemical, Radiation, Microbial",
      slug: "cell-carcinogenesis",
      sequence: 21,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-cell-carcinogenesis"],
      concepts: [
        {
          id: "con-cell-carcinogenesis",
          lessonId: "les-cell-carcinogenesis",
          title: "Three exposure classes, one multistep logic",
          sequence: 1,
          summary:
            "Initiators damage DNA; promoters drive clonal expansion; microbes contribute oncoproteins or chronic injury.",
          blocks: [
            reading(
              "blk-cell-carcinogenesis-r",
              "con-cell-carcinogenesis",
              "Exposure map for Step 1",
              1,
              `## Multistep logic
Most cancers need accumulated driver hits (oncogenes ↑ / tumor suppressors ↓) plus escape from apoptosis, senescence, and immune surveillance. Exposures are classified by **how** they push that ladder.

## Chemical
- **Initiators** (genotoxic): create lasting DNA lesions (classic teaching: polycyclic aromatic hydrocarbons, aflatoxin → HCC with p53 mutation associations, alkylators).  
- **Promoters**: expand initiated clones via proliferation/inflammation without necessarily being complete carcinogens alone.  
- Lifestyle boards: tobacco (many organs), alcohol (upper GI/liver), nitrosamines (stomach teaching).

## Radiation
- **UV** → skin cancers (pyrimidine dimers; BCC/SCC/melanoma risk spectra differ).  
- **Ionizing** → leukemias/solid tumors after latency; DNA double-strand breaks.  
- Therapeutic radiation fields can seed secondary malignancy years later — counseling concept.

## Microbial
| Agent | Teaching cancer link | Mechanism cue |
| --- | --- | --- |
| HPV (high-risk) | Cervix, oropharynx, anus | E6/E7 → p53/Rb |
| HBV/HCV | HCC | Chronic injury ± viral oncogenic programs |
| *H. pylori* | Gastric adenocarcinoma / MALT | Chronic gastritis / antigen drive |
| EBV | Burkitt, nasopharyngeal, some lymphomas | Latent oncoproteins |
| HHV-8 | Kaposi sarcoma | Endothelial proliferation programs |

Tie each vignette to **exposure → molecular hit → tissue field**, not memorized lists alone.

${OER_NOTE}

${cellReading}

**Open companions:** [Pathologia — Neoplasia](https://pathologia.ed.ac.uk/) · [OpenStax Microbiology](https://openstax.org/books/microbiology/pages/1-introduction) (read/link only).`,
            ),
          ],
        },
      ],
    },
    "qq-cell-carcinogenesis",
  );

  pushLesson(
    program,
    IDS.modCell,
    {
      id: "les-cell-paraneoplastic",
      moduleId: IDS.modCell,
      title: "Paraneoplastic Syndromes",
      slug: "cell-paraneoplastic",
      sequence: 22,
      estimatedMinutes: 30,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-cell-paraneoplastic"],
      concepts: [
        {
          id: "con-cell-paraneoplastic",
          lessonId: "les-cell-paraneoplastic",
          title: "Remote effects that betray the tumor",
          sequence: 1,
          summary:
            "Hormone-like factors and cross-reactive immunity produce systemic syndromes distant from the primary mass.",
          blocks: [
            reading(
              "blk-cell-paraneoplastic-r",
              "con-cell-paraneoplastic",
              "Classic mediator map",
              1,
              `## Definition
**Paraneoplastic** = clinical syndromes caused by a tumor’s remote effects (secreted factors or immune cross-reactivity), not by local invasion or metastasis burden alone.

## High-yield pairs
| Syndrome | Mediator / mechanism | Classic tumor teaching |
| --- | --- | --- |
| Hypercalcemia | PTHrP | Squamous cell lung cancer |
| Cushing syndrome | ACTH | Small-cell lung cancer |
| SIADH / hyponatremia | ADH | Small-cell lung cancer |
| Polycythemia | Erythropoietin | Renal cell carcinoma, HCC |
| Lambert–Eaton | Abs to presynaptic Ca channels | Small-cell lung cancer |
| Myasthenia-like / dermatomyositis flags | Immune | Occult malignancy workup when atypical |

## Clinical habit
When an endocrine or neurologic syndrome arrives **without** a primary gland explanation, ask: *which solid tumor secretes or triggers this?* Staging and oncology referral beat endless electrolyte tweaks alone.

${OER_NOTE}

${cellReading}`,
            ),
          ],
        },
      ],
    },
    "qq-cell-paraneoplastic",
  );

  pushLesson(
    program,
    IDS.modMsk,
    {
      id: "les-msk-skin-tumors",
      moduleId: IDS.modMsk,
      title: "Skin Tumors — BCC, SCC, Melanoma",
      slug: "msk-skin-tumors",
      sequence: 20,
      estimatedMinutes: 35,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: ["qq-msk-skin-tumors"],
      concepts: [
        {
          id: "con-msk-skin-tumors",
          lessonId: "les-msk-skin-tumors",
          title: "Three tumors, three risk stories",
          sequence: 1,
          summary:
            "UV field cancerization produces different keratinocyte vs melanocyte malignancies with distinct metastatic temperaments.",
          blocks: [
            reading(
              "blk-msk-skin-tumors-r",
              "con-msk-skin-tumors",
              "Discriminator table",
              1,
              `## Shared risk
Chronic UV exposure, fair skin, immunosuppression (especially SCC), prior radiation, and genetic syndromes (e.g., xeroderma pigmentosum) enlarge the field.

## Discriminators
| Tumor | Clinical cue | Behavior teaching |
| --- | --- | --- |
| **Basal cell carcinoma** | Pearly papule, telangiectasias, rolled border; face common | Locally invasive; metastasis rare |
| **Squamous cell carcinoma** | Scaly/ulcerated plaque; lips/ears/actinic field; deeper on lip | Can metastasize (higher risk on lip/ear/immunosuppression) |
| **Melanoma** | ABCDE / ugly-duckling pigmented lesion | Metastatic risk drives staging depth (Breslow) conversations |

## Precursors / neighbors
Actinic keratosis → SCC risk field. Dysplastic nevi raise melanoma surveillance — they are not automatic melanoma.

## Management concepts (not regimens)
Biopsy suspicious lesions; margin-controlled excision for many BCCs/SCCs; melanoma pathways hinge on depth and nodes — **REFERENCE_REVIEW_REQUIRED** for staging cutoffs used in exams.

${OER_NOTE}

${mskReading}

**Open A&P companion (link only):** [OpenStax integumentary chapters](https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction).`,
            ),
            vignette(
              "blk-msk-skin-tumors-v",
              "con-msk-skin-tumors",
              "Vignette: changing mole",
              2,
              `A 48-year-old notes a previously stable mole that developed asymmetry and color variegation.  
**Ask:** which ABCDE features are present, and why depth matters more than diameter alone once melanoma is confirmed?`,
            ),
          ],
        },
      ],
    },
    "qq-msk-skin-tumors",
  );

  return program;
}
