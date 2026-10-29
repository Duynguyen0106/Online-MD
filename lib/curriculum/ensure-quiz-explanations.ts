import type { QuizQuestion } from "@/lib/types/domain";

const TEACHING_RE = /why|because|correct|incorrect|distractor/i;
const GUIDELINE_SENSITIVE =
  /\b(antibiotic|anticoagul|antiplatelet|acs|stemi|nstemi|stroke|tpa|thromboly|sepsis|vasopressor|insulin|dka|hhs|mechanical vent|ards|pregnan|pediatric|dialysis|rrt|chemotherap|immunosuppress|contraindicat|resuscitat|defibrillat|epinephrine|norepinephrine|heparin|warfarin|doac|pci|cabg|guidelines?|hour-?1|perc|wells)\b/i;

const DISTRACTOR_FOOTER =
  " Why not the others: each distractor conflicts with the mechanism taught in this lesson—map every choice back to the reading before reattempting.";

const GUIDELINE_FOOTER =
  " Educational framing only — confirm doses, windows, and regimens against current institutional protocols and society guidelines.";

/**
 * Ensure formative explanations include pedagogical framing without inventing
 * new medical claims. Idempotent.
 */
export function ensureQuizExplanationTeaching(
  question: QuizQuestion,
): QuizQuestion {
  let explanation = (question.explanation || "").trim();
  if (!explanation) return question;
  if (
    !TEACHING_RE.test(explanation) &&
    !explanation.includes("Why not the others:")
  ) {
    explanation = `${explanation}${DISTRACTOR_FOOTER}`;
  }
  const hay = `${question.stem} ${explanation}`;
  if (
    GUIDELINE_SENSITIVE.test(hay) &&
    !explanation.includes("confirm doses, windows, and regimens")
  ) {
    explanation = `${explanation}${GUIDELINE_FOOTER}`;
  }
  if (explanation === (question.explanation || "").trim()) return question;
  return { ...question, explanation };
}

export function ensureQuizBankTeaching(
  questions: QuizQuestion[],
): QuizQuestion[] {
  return questions.map(ensureQuizExplanationTeaching);
}
