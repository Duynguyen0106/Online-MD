import type {
  Flashcard,
  Lesson,
  Objective,
  QuizQuestion,
} from "@/lib/types/domain";
import type { CatalogBundle, CatalogTopic } from "@/lib/curriculum/catalog/types";
import {
  buildChapterClinical,
  buildChapterCore,
  buildChapterFraming,
  buildChapterSynthesis,
  buildChapterVignette,
} from "@/lib/curriculum/catalog/chapter-writer";

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

export function buildCatalogBundle(topics: CatalogTopic[]): CatalogBundle {
  const lessonsByModule: Record<string, Lesson[]> = {};
  const objectives: Objective[] = [];
  const quizQuestions: QuizQuestion[] = [];
  const flashcards: Flashcard[] = [];

  const seqByModule: Record<string, number> = {};

  for (const topic of topics) {
    const lessonId = `les-cat-${topic.key}`;
    const objId = `obj-cat-${topic.key}`;
    const quizId = `qq-cat-${topic.key}`;
    const conceptId = `con-cat-${topic.key}`;
    const fcId = `fc-cat-${topic.key}`;

    seqByModule[topic.moduleId] = (seqByModule[topic.moduleId] ?? 100) + 1;
    const sequence = seqByModule[topic.moduleId];

    const choiceObjs = topic.quizChoices.map((text, i) => ({
      id: `${quizId}-c${i}`,
      text,
    }));

    quizQuestions.push({
      id: quizId,
      lessonId,
      stem: topic.quizStem,
      choices: choiceObjs,
      correctChoiceId: choiceObjs[topic.quizCorrect].id,
      explanation: topic.quizExplain,
      objectiveId: objId,
      sequence: 1,
    });

    objectives.push({
      id: objId,
      code: `OBJ-Y${topic.year}-${topic.key.toUpperCase().slice(0, 24)}`,
      statement: `Explain and apply: ${topic.title}`,
      usmleStep: topic.year <= 2 ? "step1" : "step2ck",
      organSystem: topic.organSystem,
      physicianTask: topic.physicianTask ?? "Knowledge",
      contentCategory: topic.contentCategory,
      moduleId: topic.moduleId,
      lessonIds: [lessonId],
    });

    flashcards.push({
      id: fcId,
      lessonId,
      front: topic.cardFront,
      back: topic.cardBack,
      objectiveId: objId,
    });

    const clinical = topic.year >= 3;
    const lesson: Lesson = {
      id: lessonId,
      moduleId: topic.moduleId,
      title: topic.title,
      slug: topic.key,
      sequence,
      estimatedMinutes: topic.estimatedMinutes,
      status: "published",
      quizPassThreshold: 0.8,
      quizQuestionIds: [quizId],
      concepts: [
        {
          id: conceptId,
          lessonId,
          title: topic.title,
          sequence: 1,
          summary: topic.points[0] ?? topic.title,
          blocks: [
            reading(
              `blk-${topic.key}-ch1`,
              conceptId,
              "I. Foundations & learning goals",
              1,
              buildChapterFraming(topic),
            ),
            reading(
              `blk-${topic.key}-ch2`,
              conceptId,
              clinical
                ? "II. Clinical pathway (core chapter)"
                : "II. Core mechanisms (core chapter)",
              2,
              buildChapterCore(topic),
            ),
            reading(
              `blk-${topic.key}-ch3`,
              conceptId,
              clinical
                ? "III. Bedside application"
                : "III. Clinical correlation",
              3,
              buildChapterClinical(topic),
            ),
            reading(
              `blk-${topic.key}-ch4`,
              conceptId,
              "IV. Synthesis, pitfalls & self-check",
              4,
              buildChapterSynthesis(topic),
            ),
            vignette(
              `blk-${topic.key}-case`,
              conceptId,
              clinical ? "Case conference" : "Board vignette",
              5,
              buildChapterVignette(topic),
            ),
          ],
        },
      ],
    };

    if (!lessonsByModule[topic.moduleId]) lessonsByModule[topic.moduleId] = [];
    lessonsByModule[topic.moduleId].push(lesson);
  }

  return { lessonsByModule, objectives, quizQuestions, flashcards };
}
