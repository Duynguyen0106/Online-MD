import type { QuizQuestion } from "@/lib/types/domain";

const TEACHING_RE = /why|because|correct|incorrect|distractor/i;

const DISTRACTOR_FOOTER =
  " Why not the others: each distractor conflicts with the mechanism taught in this lesson—map every choice back to the reading before reattempting.";

/**
 * Ensure formative explanations include pedagogical framing without inventing
 * new medical claims. Idempotent.
 */
export function ensureQuizExplanationTeaching(
  question: QuizQuestion,
): QuizQuestion {
  const explanation = (question.explanation || "").trim();
  if (!explanation) return question;
  if (TEACHING_RE.test(explanation)) return question;
  if (explanation.includes("Why not the others:")) return question;
  return {
    ...question,
    explanation: `${explanation}${DISTRACTOR_FOOTER}`,
  };
}

export function ensureQuizBankTeaching(
  questions: QuizQuestion[],
): QuizQuestion[] {
  return questions.map(ensureQuizExplanationTeaching);
}
