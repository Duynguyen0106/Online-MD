import type { Module, Program } from "@/lib/types/domain";
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
      "Year-1 metabolic biochemistry: fuels, vitamins, inborn errors — foundation for every organ-system block.",
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
      "Gross anatomy, embryologic malformations, and clinical imaging correlation for Year 1.",
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
      "Innate/adaptive immunity, hypersensitivity, autoimmunity, transplant, and vaccines.",
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
      "ADME, autonomic pharmacology, toxidromes, and mechanism-class maps used across clerkships.",
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
      "Study design, bias, screening metrics, biostatistics literacy, and prevention science.",
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
      "Clinical ethics, consent/capacity, justice/equity, and systems professionalism.",
    isCoreClerkship: false,
    status: "published",
    examPassThreshold: 0.7,
  });

  // Rename phase display names to 4-year map without breaking IDs
  for (const phase of program.phases) {
    if (phase.id === IDS.phase1) {
      phase.name = "Years 1–2 — Preclinical Foundations & Organ Systems";
      phase.description =
        "Full-time preclinical map (≥2 academic years): Year-1 mechanisms (biochem, anatomy, immuno, micro, pharm, path) and Year-2 organ-system pathophysiology. Mastery required before Step 1 Qbank unlock.";
    }
    if (phase.id === IDS.phase2) {
      phase.name = "Years 3–4 — Core Clerkships & Advanced Clinical";
      phase.description =
        "Year-3 core clerkships plus Year-4 sub-internship / ICU / complex ambulatory topics on the same clerkship spines. Step 2 CK Qbank after core clerkship mastery.";
    }
  }

  // Drop empty advanced phase if present from earlier iterations
  program.phases = program.phases.filter(
    (p) => p.id !== "phase-advanced" || p.modules.length > 0,
  );

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
