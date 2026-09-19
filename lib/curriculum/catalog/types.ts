import type {
  Flashcard,
  Lesson,
  Objective,
  QuizQuestion,
} from "@/lib/types/domain";

/** Compact topic used to expand into a full mastery lesson (~2.5–3 study hours). */
export type CatalogTopic = {
  /** Stable lesson id suffix, e.g. "y1-biochem-glycolysis" */
  key: string;
  moduleId: string;
  year: 1 | 2 | 3 | 4;
  title: string;
  organSystem: string;
  contentCategory: string;
  physicianTask?: string;
  /** First-pass study minutes (reading + notes + vignette + quiz prep). */
  estimatedMinutes: number;
  /** Mechanistic teaching bullets — expanded into lesson reading. */
  points: string[];
  vignette: string;
  quizStem: string;
  quizChoices: [string, string, string, string];
  quizCorrect: 0 | 1 | 2 | 3;
  quizExplain: string;
  cardFront: string;
  cardBack: string;
};

export type CatalogBundle = {
  lessonsByModule: Record<string, Lesson[]>;
  objectives: Objective[];
  quizQuestions: QuizQuestion[];
  flashcards: Flashcard[];
};
