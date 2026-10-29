/**
 * Sidecar clinical-presentation index (MT.vn-inspired).
 * Tags only existing lesson/case IDs — no new medical content.
 *
 * Recommended student order on each pathway page:
 * foundational lessons → reasoning lessons → clinical cases.
 */

export type ClinicalProblem = {
  slug: string;
  title: string;
  /** One-sentence educational framing — no doses or guideline claims. */
  summary: string;
  /** Years 1–2 / organ-system mechanism lessons. */
  foundationLessonIds: string[];
  /** Clerkship / Years 3–4 approach and decision lessons. */
  reasoningLessonIds: string[];
  caseIds: string[];
  /**
   * Organ-system modules that, when mastered (or when the student is in
   * clerkships), make this pathway a good dashboard recommendation.
   */
  relatedModuleIds: string[];
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
    foundationLessonIds: ["les-cv-2", "les-cat-y2-cv-acs-path"],
    reasoningLessonIds: [
      "les-im-2",
      "les-cat-y3-im-chest-pain",
      "les-cat-y3-im-acs-ed",
      "les-cat-y4-im-acs-icu",
    ],
    caseIds: ["case-im-1"],
    relatedModuleIds: ["mod-cv", "mod-im"],
  },
  {
    slug: "dyspnea",
    title: "Dyspnea",
    summary:
      "Approach breathlessness through heart-failure physiology, pulmonary embolism workup, and ward admission decisions.",
    foundationLessonIds: [
      "les-cv-3",
      "les-cat-y2-cv-hf-mechanisms",
      "les-pulm-3",
    ],
    reasoningLessonIds: [
      "les-cat-y3-im-dyspnea",
      "les-cat-y3-im-hf-admit",
      "les-cat-y3-im-pe-workup",
    ],
    caseIds: ["case-cv-1", "case-pulm-1"],
    relatedModuleIds: ["mod-cv", "mod-pulm", "mod-im"],
  },
  {
    slug: "shock",
    title: "Shock",
    summary:
      "Classify shock by mechanism, link microcirculation and lactate thinking, then practice bedside differentiation.",
    foundationLessonIds: [
      "les-cv-4",
      "les-cat-y2-cv-shock-micro",
      "les-cat-y2-path-hemodynamic",
    ],
    reasoningLessonIds: [
      "les-surg-1",
      "les-cat-y4-im-shock-types",
      "les-cat-y4-im-icu-shock",
      "les-cat-y4-im-septic-shock",
    ],
    caseIds: ["case-cv-2"],
    relatedModuleIds: ["mod-cv", "mod-surg", "mod-im"],
  },
  {
    slug: "syncope",
    title: "Syncope",
    summary:
      "Separate cardiac, reflex, and neurologic causes using physiology and a structured clinical approach.",
    foundationLessonIds: ["les-cat-y2-cv-syncope-phys", "les-neuro-4"],
    reasoningLessonIds: ["les-im-3", "les-cat-y3-im-syncope"],
    caseIds: ["case-im-2"],
    relatedModuleIds: ["mod-cv", "mod-neuro", "mod-im"],
  },
  {
    slug: "fever",
    title: "Fever",
    summary:
      "Risk-stratify febrile illness from pathogen foundations through sepsis recognition and inpatient fever workups.",
    foundationLessonIds: [
      "les-id-2",
      "les-cat-y2-id-sepsis-path",
      "les-cat-y2-id-fever",
    ],
    reasoningLessonIds: [
      "les-im-1",
      "les-im-5",
      "les-cat-y3-im-fever-inpatient",
      "les-cat-y3-im-sepsis-hour1",
    ],
    caseIds: ["case-neuro-1", "case-id-1"],
    relatedModuleIds: ["mod-id", "mod-im"],
  },
  {
    slug: "altered-mental-status",
    title: "Altered mental status",
    summary:
      "Stabilize first, then discriminate metabolic, toxic, neurologic, and psychiatric contributors.",
    foundationLessonIds: ["les-psych-4"],
    reasoningLessonIds: [
      "les-cat-y3-im-altered-mental",
      "les-cat-y3-im-delirium",
      "les-cat-y4-im-icu-sedation",
    ],
    caseIds: ["case-endo-1", "case-renal-1", "case-psych-1"],
    relatedModuleIds: ["mod-neuro", "mod-psych", "mod-im", "mod-endo"],
  },
  {
    slug: "acute-kidney-injury",
    title: "Acute kidney injury",
    summary:
      "Frame AKI from mechanisms to ward workup, including urgent electrolyte complications.",
    foundationLessonIds: ["les-cat-y2-ren-aki-path"],
    reasoningLessonIds: [
      "les-im-4",
      "les-cat-y3-im-aki-ward",
      "les-cat-y3-im-aki-workup",
    ],
    caseIds: ["case-renal-2"],
    relatedModuleIds: ["mod-renal", "mod-im"],
  },
  {
    slug: "gi-bleeding",
    title: "GI bleeding",
    summary:
      "Connect bleeding physiology to ward resuscitation priorities and cirrhosis-related emergencies.",
    foundationLessonIds: [
      "les-gi-4",
      "les-cat-y2-gi-gi-bleed-mech",
      "les-cat-y2-gi-gi-bleed-phys",
    ],
    reasoningLessonIds: [
      "les-cat-y3-im-gi-bleed-ward",
      "les-cat-y3-im-gi-bleed",
      "les-cat-y4-im-gi-bleed-icu",
    ],
    caseIds: ["case-gi-1"],
    relatedModuleIds: ["mod-gi", "mod-im"],
  },
  {
    slug: "hyperglycemia",
    title: "Hyperglycemia",
    summary:
      "Distinguish diabetes emergencies conceptually (DKA/HHS pathways) from routine hyperglycemia teaching.",
    foundationLessonIds: ["les-endo-2", "les-cat-y2-endo-dka-hhs-path"],
    reasoningLessonIds: [
      "les-cat-y3-im-dka-hhs",
      "les-cat-y4-peds-dka-cerebral",
    ],
    caseIds: ["case-endo-1"],
    relatedModuleIds: ["mod-endo", "mod-im", "mod-peds"],
  },
  {
    slug: "electrolyte-abnormalities",
    title: "Electrolyte abnormalities",
    summary:
      "Approach sodium, potassium, and related electrolyte disorders with physiology-first framing before ward management.",
    foundationLessonIds: ["les-renal-4", "les-renal-5"],
    reasoningLessonIds: [
      "les-cat-y3-im-electrolytes-ward",
      "les-cat-y3-im-hyponatremia",
    ],
    caseIds: ["case-renal-2", "case-endo-2", "case-heme-2"],
    relatedModuleIds: ["mod-renal", "mod-endo", "mod-im"],
  },
  {
    slug: "abdominal-pain",
    title: "Abdominal pain",
    summary:
      "Threat-filter the acute abdomen, then practice progressive cases that punish premature closure.",
    foundationLessonIds: ["les-gi-4", "les-cat-y2-gi-gi-bleed-mech"],
    reasoningLessonIds: ["les-surg-1", "les-cat-y3-surg-acute-abd"],
    caseIds: ["case-surg-1", "case-ami-1", "case-gi-2", "case-surg-2"],
    relatedModuleIds: ["mod-gi", "mod-surg", "mod-im"],
  },
];

export function listClinicalProblems(): ClinicalProblem[] {
  return CLINICAL_PROBLEMS;
}

export function getClinicalProblem(slug: string): ClinicalProblem | undefined {
  return CLINICAL_PROBLEMS.find((p) => p.slug === slug);
}

/** All lesson IDs on a pathway in recommended order. */
export function problemLessonIds(problem: ClinicalProblem): string[] {
  return [...problem.foundationLessonIds, ...problem.reasoningLessonIds];
}

export function problemsForLesson(lessonId: string): ClinicalProblem[] {
  return CLINICAL_PROBLEMS.filter((p) =>
    problemLessonIds(p).includes(lessonId),
  );
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
    foundationLessonIds: problem.foundationLessonIds.filter((id) =>
      existingLessonIds.has(id),
    ),
    reasoningLessonIds: problem.reasoningLessonIds.filter((id) =>
      existingLessonIds.has(id),
    ),
    caseIds: problem.caseIds.filter((id) => existingCaseIds.has(id)),
  };
}

export function pathwayLinkCounts(problem: ClinicalProblem): {
  lessons: number;
  cases: number;
} {
  return {
    lessons:
      problem.foundationLessonIds.length + problem.reasoningLessonIds.length,
    cases: problem.caseIds.length,
  };
}

/**
 * True when the student is in Years 3–4 (clerkship progress) or has finished
 * at least one organ-system module tied to presentation pathways.
 */
export function shouldFeaturePresentationPathways(input: {
  moduleProgress: Record<string, { state?: string } | undefined>;
  clerkshipModuleIds: string[];
  organModuleIds: string[];
}): boolean {
  const { moduleProgress, clerkshipModuleIds, organModuleIds } = input;
  const startedClerkship = clerkshipModuleIds.some((id) => {
    const s = moduleProgress[id]?.state;
    return s === "in_progress" || s === "completed" || s === "mastered";
  });
  if (startedClerkship) return true;
  return organModuleIds.some(
    (id) => moduleProgress[id]?.state === "mastered",
  );
}

/** Pathways worth highlighting given the student's mastered modules. */
export function featuredPresentationProblems(
  problems: ClinicalProblem[],
  masteredModuleIds: Set<string>,
  opts?: { forceAll?: boolean; limit?: number },
): ClinicalProblem[] {
  const limit = opts?.limit ?? 6;
  if (opts?.forceAll) return problems.slice(0, limit);
  const scored = problems
    .map((p) => ({
      problem: p,
      score: p.relatedModuleIds.filter((id) => masteredModuleIds.has(id))
        .length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.problem.title.localeCompare(b.problem.title));
  if (scored.length > 0) return scored.slice(0, limit).map((x) => x.problem);
  // Clerkship-ready but no organ mastery recorded yet — still show a curated set.
  return problems.slice(0, limit);
}
