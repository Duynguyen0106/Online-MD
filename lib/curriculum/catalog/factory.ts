import type {
  Flashcard,
  Lesson,
  Objective,
  QuizQuestion,
} from "@/lib/types/domain";
import type { CatalogBundle, CatalogTopic } from "@/lib/curriculum/catalog/types";

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

function buildReadingBody(topic: CatalogTopic): string {
  const bullets = topic.points.map((p) => `- ${p}`).join("\n");
  return `## ${topic.title}

**Academic year ${topic.year}** · ${topic.contentCategory} · ${topic.organSystem}

### Learning goals
Master the mechanism well enough to explain it aloud, predict clinical findings, and avoid dangerous misconceptions before moving on.

### Core teaching points
${bullets}

### Study method (mastery)
1. Read and sketch the mechanism from memory.
2. Teach the vignette answer out loud (2 minutes).
3. Complete the formative quiz (≥80% to pass).
4. Add the flashcard to your spaced-repetition queue.

### Integrity note
Original Online MD teaching — aligned to USMLE Content Outline domains. Not copied from proprietary banks or school LMS text. Verify doses/guidelines with primary sources in clinical care.
`;
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
              `blk-${topic.key}-r1`,
              conceptId,
              "Core reading",
              1,
              buildReadingBody(topic),
            ),
            reading(
              `blk-${topic.key}-r2`,
              conceptId,
              "Mechanism integration",
              2,
              `## Integration

Connect **${topic.title}** to neighboring Offline MD lessons in this module. Ask:

1. What molecule, cell, or circuit failed?
2. What bedside finding must follow if the mechanism is true?
3. What is the most dangerous look-alike diagnosis?

### High-yield anchors
${topic.points
  .slice(0, 3)
  .map((p, i) => `${i + 1}. ${p}`)
  .join("\n")}
`,
            ),
            vignette(
              `blk-${topic.key}-x`,
              conceptId,
              "Clinical vignette",
              3,
              topic.vignette,
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
