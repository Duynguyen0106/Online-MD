/**
 * Sidecar clinical-presentation index (MT.vn-inspired).
 * Tags only existing lesson/case IDs — no new medical content.
 */

export type ClinicalProblem = {
  slug: string;
  title: string;
  /** One-sentence educational framing — no doses or guideline claims. */
  summary: string;
  lessonIds: string[];
  caseIds: string[];
};

/**
 * High-yield presentations from the medical content audit.
 * Lesson/case IDs verified against the live curriculum accessors export.
 */
export const CLINICAL_PROBLEMS: ClinicalProblem[] = [
  {
    slug: "chest-pain",
    title: "Chest pain",
    summary:
      "Immediate threats, ischemic vs non-ischemic differentials, and the ACS reasoning pathway from foundations through clerkship.",
    lessonIds: [
      "les-cv-2",
      "les-cat-y2-cv-acs-path",
      "les-im-2",
      "les-cat-y3-im-chest-pain",
      "les-cat-y3-im-acs-ed",
      "les-cat-y4-im-acs-icu",
    ],
    caseIds: ["case-im-1"],
  },
  {
    slug: "dyspnea",
    title: "Dyspnea",
    summary:
      "Approach breathlessness through heart-failure physiology, pulmonary embolism workup, and ward admission decisions.",
    lessonIds: [
      "les-cv-3",
      "les-cat-y2-cv-hf-mechanisms",
      "les-pulm-3",
      "les-cat-y3-im-dyspnea",
      "les-cat-y3-im-hf-admit",
      "les-cat-y3-im-pe-workup",
    ],
    caseIds: ["case-cv-1", "case-pulm-1"],
  },
  {
    slug: "shock",
    title: "Shock",
    summary:
      "Classify shock by mechanism, link microcirculation and lactate thinking, then practice bedside differentiation.",
    lessonIds: [
      "les-cv-4",
      "les-cat-y2-cv-shock-micro",
      "les-cat-y2-path-hemodynamic",
      "les-surg-1",
      "les-cat-y4-im-shock-types",
      "les-cat-y4-im-icu-shock",
      "les-cat-y4-im-septic-shock",
    ],
    caseIds: [],
  },
  {
    slug: "syncope",
    title: "Syncope",
    summary:
      "Separate cardiac, reflex, and neurologic causes using physiology and a structured clinical approach.",
    lessonIds: [
      "les-cat-y2-cv-syncope-phys",
      "les-neuro-4",
      "les-im-3",
      "les-cat-y3-im-syncope",
    ],
    caseIds: [],
  },
  {
    slug: "fever",
    title: "Fever",
    summary:
      "Risk-stratify febrile illness from pathogen foundations through sepsis recognition and inpatient fever workups.",
    lessonIds: [
      "les-id-2",
      "les-im-1",
      "les-im-5",
      "les-cat-y2-id-sepsis-path",
      "les-cat-y2-id-fever",
      "les-cat-y3-im-fever-inpatient",
      "les-cat-y3-im-sepsis-hour1",
    ],
    caseIds: ["case-neuro-1", "case-id-1"],
  },
  {
    slug: "altered-mental-status",
    title: "Altered mental status",
    summary:
      "Stabilize first, then discriminate metabolic, toxic, neurologic, and psychiatric contributors.",
    lessonIds: [
      "les-cat-y3-im-altered-mental",
      "les-cat-y3-im-delirium",
      "les-psych-4",
      "les-cat-y4-im-icu-sedation",
    ],
    caseIds: ["case-endo-1", "case-renal-1", "case-psych-1"],
  },
  {
    slug: "acute-kidney-injury",
    title: "Acute kidney injury",
    summary:
      "Frame AKI from mechanisms to ward workup, including urgent electrolyte complications.",
    lessonIds: [
      "les-cat-y2-ren-aki-path",
      "les-im-4",
      "les-cat-y3-im-aki-ward",
      "les-cat-y3-im-aki-workup",
    ],
    caseIds: ["case-renal-2"],
  },
  {
    slug: "gi-bleeding",
    title: "GI bleeding",
    summary:
      "Connect bleeding physiology to ward resuscitation priorities and cirrhosis-related emergencies.",
    lessonIds: [
      "les-gi-4",
      "les-cat-y2-gi-gi-bleed-mech",
      "les-cat-y2-gi-gi-bleed-phys",
      "les-cat-y3-im-gi-bleed-ward",
      "les-cat-y3-im-gi-bleed",
      "les-cat-y4-im-gi-bleed-icu",
    ],
    caseIds: ["case-gi-1"],
  },
  {
    slug: "hyperglycemia",
    title: "Hyperglycemia",
    summary:
      "Distinguish diabetes emergencies conceptually (DKA/HHS pathways) from routine hyperglycemia teaching.",
    lessonIds: [
      "les-endo-2",
      "les-cat-y2-endo-dka-hhs-path",
      "les-cat-y3-im-dka-hhs",
      "les-cat-y4-peds-dka-cerebral",
    ],
    caseIds: ["case-endo-1"],
  },
  {
    slug: "electrolyte-abnormalities",
    title: "Electrolyte abnormalities",
    summary:
      "Approach sodium, potassium, and related electrolyte disorders with physiology-first framing before ward management.",
    lessonIds: [
      "les-renal-4",
      "les-renal-5",
      "les-cat-y3-im-electrolytes-ward",
      "les-cat-y3-im-hyponatremia",
    ],
    caseIds: ["case-renal-2", "case-endo-2", "case-heme-2"],
  },
];

export function listClinicalProblems(): ClinicalProblem[] {
  return CLINICAL_PROBLEMS;
}

export function getClinicalProblem(slug: string): ClinicalProblem | undefined {
  return CLINICAL_PROBLEMS.find((p) => p.slug === slug);
}

export function problemsForLesson(lessonId: string): ClinicalProblem[] {
  return CLINICAL_PROBLEMS.filter((p) => p.lessonIds.includes(lessonId));
}

export function problemsForCase(caseId: string): ClinicalProblem[] {
  return CLINICAL_PROBLEMS.filter((p) => p.caseIds.includes(caseId));
}

/** Drop IDs that are not present in the live graph (safe for partial catalogs). */
export function filterExistingProblemLinks(
  problem: ClinicalProblem,
  existingLessonIds: Set<string>,
  existingCaseIds: Set<string>,
): ClinicalProblem {
  return {
    ...problem,
    lessonIds: problem.lessonIds.filter((id) => existingLessonIds.has(id)),
    caseIds: problem.caseIds.filter((id) => existingCaseIds.has(id)),
  };
}
