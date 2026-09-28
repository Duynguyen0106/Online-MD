/**
 * Student-facing copy helpers.
 * Keep internal ProgressState / gate logic unchanged; only translate for display.
 */
import type { ProgressState } from "@/lib/types/domain";

export function formatProgressState(state: ProgressState | string | undefined): string {
  switch (state) {
    case "not_started":
    case undefined:
      return "Not started";
    case "in_progress":
      return "In progress";
    case "completed":
    case "mastered":
      return "Complete";
    default:
      return String(state).replace(/_/g, " ");
  }
}

/** CTA label for a lesson based on progress state. */
export function lessonActionLabel(state: ProgressState | string | undefined): string {
  switch (state) {
    case "in_progress":
      return "Continue lesson";
    case "completed":
    case "mastered":
      return "Review lesson";
    default:
      return "Start lesson";
  }
}

export function formatBlockType(blockType: string): string {
  switch (blockType) {
    case "video":
    case "external_media":
      return "Recommended video";
    case "clinical_vignette":
      return "Clinical case";
    case "reading":
      return "Reading";
    case "diagram":
      return "Diagram";
    case "audio":
      return "Audio";
    case "formative_question":
      return "Practice question";
    case "interactive":
      return "Interactive";
    default:
      return blockType.replace(/_/g, " ");
  }
}

export const STUDENT_COPY = {
  productTagline: "Learn medicine from the ground up.",
  productSubhead:
    "A structured medical curriculum that takes you from basic science to organ systems and then into the core clinical rotations.",
  learnFirstPracticeSecond: "Learn first. Practice second.",
  continueLearning: "Continue learning",
  continueLesson: "Continue lesson",
  startLesson: "Start lesson",
  reviewLesson: "Review lesson",
  takeTheQuiz: "Take the quiz",
  checkUnderstanding: "Check your understanding",
  startAssessment: "Start assessment",
  moduleAssessment: "Module assessment",
  questionBank: "Question bank",
  practiceQuestions: "Practice questions",
  startQuestions: "Start questions",
  backToModule: "Back to module",
  nextLesson: "Next lesson",
  watchVideo: "Watch video",
  markAsWatched: "Mark as watched",
  markAsViewed: "Mark as viewed",
  nextSection: "Next section",
  curriculumComplete:
    "You’ve finished the available lessons. Practice with the question bank when you’re ready.",
  qbankIntro:
    "Complete the lessons and assessments before moving on to the question bank for that part of the curriculum.",
  qbankAvailable: "Questions are available for this module.",
  qbankLockedModule:
    "Complete the module lessons and assessment before these questions become available.",
  assessmentComplete: "Assessment complete",
  tryAgain: "Try again",
  notCompleted: "Not completed",
} as const;

/** Default human descriptions for known modules (by id). Fallback to seed description. */
export const MODULE_DESCRIPTIONS: Record<string, string> = {
  "mod-cell-mol":
    "Learn the cellular and molecular processes that underlie disease.",
  "mod-cell":
    "Learn the cellular and molecular processes that underlie disease.",
  "mod-biochem":
    "Build the metabolic foundations you’ll use throughout medicine.",
  "mod-anatomy":
    "Connect anatomy and development to clinical findings and medical imaging.",
  "mod-immuno":
    "Understand innate and adaptive immunity, hypersensitivity, autoimmunity, transplantation, and vaccines.",
  "mod-pharm":
    "Learn how drugs move through the body, how they work, and how to recognize important drug effects and toxicities.",
  "mod-epi":
    "Learn how to interpret medical evidence, understand risk, and evaluate clinical studies.",
  "mod-ethics":
    "Work through the ethical and professional issues that come up in clinical practice.",
  "mod-cv":
    "Build from cardiac electrophysiology and hemodynamics to ischemic disease, heart failure phenotypes, shock, and valvular/pericardial pathophysiology.",
  "mod-pulm":
    "Learn how ventilation and gas exchange work, then apply them to common lung diseases.",
  "mod-renal":
    "Understand kidney function, fluid balance, electrolytes, and acid–base disorders.",
  "mod-gi":
    "Learn how the GI tract and liver work and how common diseases disrupt them.",
  "mod-endo":
    "Understand hormonal regulation and the major endocrine and reproductive disorders.",
  "mod-heme":
    "Build a framework for anemia, bleeding, clotting, and cancer.",
  "mod-neuro":
    "Learn how the nervous system works and how to approach common neurologic problems.",
  "mod-msk":
    "Understand bones, joints, muscles, and the immune diseases that affect connective tissue.",
  "mod-id":
    "Learn how the immune system responds to infection and how to recognize important pathogens.",
  "mod-im":
    "Learn how to approach common adult patients, from the first presentation through diagnosis and initial management.",
  "mod-surg":
    "Build a practical framework for common surgical presentations, perioperative care, and the initial assessment of the surgical patient.",
  "mod-peds":
    "Learn how common pediatric problems present differently from adults and how to approach the child and family in clinical practice.",
  "mod-obgyn":
    "Understand common problems in pregnancy, reproductive health, and women’s health through a clinical framework.",
  "mod-psych":
    "Learn how to approach common psychiatric presentations, establish a differential diagnosis, and understand the principles of treatment.",
  "mod-fm":
    "Apply clinical reasoning across common problems seen in primary care and longitudinal medicine.",
};

export function moduleDescription(
  moduleId: string,
  fallback?: string,
): string {
  return MODULE_DESCRIPTIONS[moduleId] ?? fallback ?? "";
}
