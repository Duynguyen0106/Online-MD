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

    const correctText = topic.quizChoices[topic.quizCorrect];
    const explanation = enhanceCatalogExplanation(
      topic.quizExplain,
      correctText,
      topic.year >= 3,
    );

    quizQuestions.push({
      id: quizId,
      lessonId,
      stem: topic.quizStem,
      choices: choiceObjs,
      correctChoiceId: choiceObjs[topic.quizCorrect].id,
      explanation,
      objectiveId: objId,
      sequence: 1,
    });

    const objStatements = measurableObjectivesForTopic(topic);
    objStatements.forEach((statement, i) => {
      const id = i === 0 ? objId : `${objId}-${i + 1}`;
      objectives.push({
        id,
        code: `OBJ-Y${topic.year}-${topic.key.toUpperCase().slice(0, 20)}-${i + 1}`,
        statement,
        usmleStep: topic.year <= 2 ? "step1" : "step2ck",
        organSystem: topic.organSystem,
        physicianTask: topic.physicianTask ?? "Knowledge",
        contentCategory: topic.contentCategory,
        moduleId: topic.moduleId,
        lessonIds: [lessonId],
      });
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
              "1. The basics",
              1,
              buildChapterFraming(topic),
            ),
            reading(
              `blk-${topic.key}-ch2`,
              conceptId,
              clinical ? "2. Clinical approach" : "2. How it works",
              2,
              buildChapterCore(topic),
            ),
            reading(
              `blk-${topic.key}-ch3`,
              conceptId,
              clinical
                ? "3. Why it matters clinically"
                : "3. Why it matters clinically",
              3,
              buildChapterClinical(topic),
            ),
            reading(
              `blk-${topic.key}-ch4`,
              conceptId,
              "4. Put it together",
              4,
              buildChapterSynthesis(topic),
            ),
            vignette(
              `blk-${topic.key}-case`,
              conceptId,
              "Clinical case",
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

function enhanceCatalogExplanation(
  explain: string,
  correctText: string,
  clinical: boolean,
): string {
  const trimmed = explain.trim();
  if (
    /correct answer:|why not the others:|why:/i.test(trimmed) &&
    trimmed.length >= 80
  ) {
    return trimmed;
  }
  const whyNot = clinical
    ? "Why not the others: they skip pretest probability, invent unsupported rules, or reverse the safe order of operations taught in this chapter."
    : "Why not the others: they contradict the pathway regulation or phenotype emphasized in this chapter.";
  if (trimmed.length >= 80) {
    return `Correct answer: ${correctText}\n\nWhy: ${trimmed}\n\n${whyNot}`;
  }
  return `Correct answer: ${correctText}\n\nWhy: ${trimmed}\n\n${whyNot}`;
}

function measurableObjectivesForTopic(topic: CatalogTopic): string[] {
  const clinical = topic.year >= 3;
  const points = topic.points.slice(0, 4);
  if (points.length === 0) {
    return [
      clinical
        ? `Recognize presentations of ${topic.title} and select the first management priority.`
        : `Explain the core mechanism of ${topic.title} and predict one clinical consequence.`,
    ];
  }
  return points.map((p, i) => {
    if (clinical) {
      if (i === 0) return `Recognize how ${p} changes acuity or the first action in ${topic.title}.`;
      if (i === 1) return `Differentiate competing explanations using ${p} when evaluating ${topic.title}.`;
      if (i === 2) return `Select initial investigations or therapies related to ${p} for ${topic.title}.`;
      return `Reassess response using ${p} after initial management of ${topic.title}.`;
    }
    if (i === 0) return `Explain ${p} as a control point in ${topic.title}.`;
    if (i === 1) return `Describe regulation and failure modes involving ${p} in ${topic.title}.`;
    if (i === 2) return `Predict clinical or laboratory consequences when ${p} is disrupted.`;
    return `Compare ${p} with the closest look-alike mechanism in ${topic.title}.`;
  });
}
