import type { Module, Program } from "@/lib/types/domain";
import { MODULE_DESCRIPTIONS } from "@/lib/copy/student";
import { IDS } from "@/lib/curriculum/seed";
import { buildCatalogBundle } from "@/lib/curriculum/catalog/factory";
import { FOUR_YEAR_TOPICS } from "@/lib/curriculum/catalog/topics-generated";

/** Extended module IDs for full 4-year MD map (foundational + existing). */
export const CATALOG_MODULE_IDS = {
  ...IDS,
  modBiochem: "mod-biochem",
  modAnatomy: "mod-anatomy",
  modImmuno: "mod-immuno",
  modPharm: "mod-pharm",
  modEpi: "mod-epi",
  modEthics: "mod-ethics",
} as const;

export const catalogBundle = buildCatalogBundle(FOUR_YEAR_TOPICS);

export const catalogObjectives = catalogBundle.objectives;
export const catalogQuizQuestions = catalogBundle.quizQuestions;
export const catalogFlashcards = catalogBundle.flashcards;

function ensureModule(
  program: Program,
  phaseId: string,
  mod: Omit<Module, "lessons" | "exam"> & { lessons?: Module["lessons"] },
) {
  const phase = program.phases.find((p) => p.id === phaseId);
  if (!phase) return;
  if (phase.modules.some((m) => m.id === mod.id)) return;
  phase.modules.push({
    ...mod,
    lessons: mod.lessons ?? [],
    exam: {
      id: `exam-${mod.id}`,
      moduleId: mod.id,
      title: `${mod.title} Exam`,
      passThreshold: 0.7,
      questionIds: [],
    },
  });
}

/** Ensure Year-1 foundational modules exist on the foundations phase. */
export function ensureFourYearModules(program: Program): Program {
  const p1 = IDS.phase1;
  ensureModule(program, p1, {
    id: CATALOG_MODULE_IDS.modBiochem,
    phaseId: p1,
    title: "Biochemistry & Metabolism",
    slug: "biochemistry",
    sequence: 0,
    description:
      "Build the metabolic foundations you’ll use throughout medicine.",
    isCoreClerkship: false,
    status: "published",
    examPassThreshold: 0.7,
  });
  ensureModule(program, p1, {
    id: CATALOG_MODULE_IDS.modAnatomy,
    phaseId: p1,
    title: "Anatomy, Embryology & Imaging Correlation",
    slug: "anatomy-embryology",
    sequence: 0,
    description:
      "Connect anatomy and development to clinical findings and medical imaging.",
    isCoreClerkship: false,
    status: "published",
    examPassThreshold: 0.7,
  });
  ensureModule(program, p1, {
    id: CATALOG_MODULE_IDS.modImmuno,
    phaseId: p1,
    title: "Immunology",
    slug: "immunology",
    sequence: 0,
    description:
      "Understand innate and adaptive immunity, hypersensitivity, autoimmunity, transplantation, and vaccines.",
    isCoreClerkship: false,
    status: "published",
    examPassThreshold: 0.7,
  });
  ensureModule(program, p1, {
    id: CATALOG_MODULE_IDS.modPharm,
    phaseId: p1,
    title: "Pharmacology Foundations",
    slug: "pharmacology",
    sequence: 0,
    description:
      "Learn how drugs move through the body, how they work, and how to recognize important drug effects and toxicities.",
    isCoreClerkship: false,
    status: "published",
    examPassThreshold: 0.7,
  });
  ensureModule(program, p1, {
    id: CATALOG_MODULE_IDS.modEpi,
    phaseId: p1,
    title: "Epidemiology, Biostatistics & Prevention",
    slug: "epidemiology",
    sequence: 0,
    description:
      "Learn how to interpret medical evidence, understand risk, and evaluate clinical studies.",
    isCoreClerkship: false,
    status: "published",
    examPassThreshold: 0.7,
  });
  ensureModule(program, p1, {
    id: CATALOG_MODULE_IDS.modEthics,
    phaseId: p1,
    title: "Ethics, Professionalism & Health Systems",
    slug: "ethics-systems",
    sequence: 0,
    description:
      "Work through the ethical and professional issues that come up in clinical practice.",
    isCoreClerkship: false,
    status: "published",
    examPassThreshold: 0.7,
  });

  // Rename phase display names to 4-year map without breaking IDs
  for (const phase of program.phases) {
    if (phase.id === IDS.phase1) {
      phase.name = "Years 1–2 · Preclinical medicine";
      phase.description =
        "Build the basic science and organ-system knowledge you’ll use throughout medical school.";
    }
    if (phase.id === IDS.phase2) {
      phase.name = "Years 3–4 · Clinical medicine";
      phase.description =
        "Put the science into practice through the core clinical rotations.";
    }
  }

  // Drop empty advanced phase if present from earlier iterations
  program.phases = program.phases.filter(
    (p) => p.id !== "phase-advanced" || p.modules.length > 0,
  );

  // Keep module IDs stable; refresh student-facing descriptions where we have better copy.
  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      const next = MODULE_DESCRIPTIONS[mod.id];
      if (next) mod.description = next;
    }
  }

  return program;
}

/** Append catalog lessons and exam questions onto modules. */
export function applyFourYearCatalog(program: Program): Program {
  ensureFourYearModules(program);
  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      const extras = catalogBundle.lessonsByModule[mod.id];
      if (!extras?.length) continue;
      mod.lessons.push(...extras);
      if (mod.exam) {
        const quizIds = extras.flatMap((l) => l.quizQuestionIds);
        mod.exam.questionIds = [...mod.exam.questionIds, ...quizIds.slice(0, 8)];
      }
    }
  }
  return program;
}

/** Hour budget helper for docs/CI. */
export function estimateCatalogStudyHours() {
  const firstPassMin = FOUR_YEAR_TOPICS.reduce(
    (s, t) => s + t.estimatedMinutes,
    0,
  );
  const preMin = FOUR_YEAR_TOPICS.filter((t) => t.year <= 2).reduce(
    (s, t) => s + t.estimatedMinutes,
    0,
  );
  const mastery = 2;
  const weekHours = 40;
  const weeksPerYear = 46;
  return {
    topics: FOUR_YEAR_TOPICS.length,
    firstPassHours: firstPassMin / 60,
    masteryHours: (firstPassMin / 60) * mastery,
    preclinicalFirstPassHours: preMin / 60,
    preclinicalMasteryHours: (preMin / 60) * mastery,
    preclinicalFullTimeYears:
      ((preMin / 60) * mastery) / (weekHours * weeksPerYear),
    assumptions: {
      masteryMultiplier: mastery,
      hoursPerWeek: weekHours,
      weeksPerYear,
    },
  };
}
