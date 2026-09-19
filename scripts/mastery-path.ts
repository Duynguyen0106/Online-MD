/**
 * Scripted mastery path: Cell module → module Qbank unlock.
 * Run: npx tsx scripts/mastery-path.ts
 */
import { promises as fs } from "fs";
import path from "path";
import {
  getFormativeQuestions,
  getLesson,
  getLessonBlocks,
  getModule,
  getQuestionMap,
} from "../lib/curriculum/accessors";
import {
  canAccessModuleQbank,
  ensureLessonProgress,
  evaluateLessonMastery,
  recomputeModuleProgress,
  scoreResponses,
} from "../lib/mastery/gates";
import { IDS } from "../lib/curriculum/seed";
import type { StudentState } from "../lib/types/domain";

const DATA_DIR = path.join(process.cwd(), ".data");
const STATE_FILE = path.join(DATA_DIR, "progress-user-student-1.json");

function emptyState(): StudentState {
  return {
    userId: "user-student-1",
    lessonProgress: {},
    moduleProgress: {},
    quizAttempts: [],
    examAttempts: [],
    cardReviews: {},
    qbankAttempts: [],
    caseAttempts: [],
    tutorThreads: [],
  };
}

async function main() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let state = emptyState();

  const locked = await canAccessModuleQbank(state, IDS.modCell);
  if (locked.unlocked) throw new Error("Expected Cell Qbank locked at start");

  const mod = await getModule(IDS.modCell);
  if (!mod?.exam) throw new Error("Cell module/exam missing");

  for (const lessonMeta of mod.lessons) {
    const lesson = await getLesson(lessonMeta.id);
    if (!lesson) throw new Error(`Missing lesson ${lessonMeta.id}`);
    const blocks = getLessonBlocks(lesson);
    let lp = ensureLessonProgress(state, lesson.id);
    lp = {
      ...lp,
      viewedBlockIds: blocks.map((b) => b.id),
      state: "in_progress",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const questions = getFormativeQuestions(lesson.id);
    const qmap = getQuestionMap();
    const responses = Object.fromEntries(
      questions.map((q) => [q.id, q.correctChoiceId]),
    );
    const score = scoreResponses(
      questions.map((q) => q.id),
      responses,
      (id) => qmap[id]?.correctChoiceId,
    );
    lp.lastFormativeScore = score;
    const mastery = await evaluateLessonMastery(lesson.id, lp);
    if (!mastery.mastered) {
      throw new Error(`Lesson ${lesson.id} not mastered: ${mastery.reason}`);
    }
    lp.state = "mastered";
    lp.masteredAt = new Date().toISOString();
    state.lessonProgress[lesson.id] = lp;
  }

  const qmap = getQuestionMap();
  const examResponses = Object.fromEntries(
    mod.exam.questionIds.map((id) => [id, qmap[id].correctChoiceId]),
  );
  const examScore = scoreResponses(
    mod.exam.questionIds,
    examResponses,
    (id) => qmap[id]?.correctChoiceId,
  );
  state.examAttempts.push({
    id: "exam_script_1",
    moduleExamId: mod.exam.id,
    moduleId: mod.id,
    status: "submitted",
    score: examScore,
    passed: examScore >= mod.exam.passThreshold,
    responses: examResponses,
    startedAt: new Date().toISOString(),
    submittedAt: new Date().toISOString(),
  });
  state.moduleProgress[mod.id] = await recomputeModuleProgress(mod.id, state);
  if (state.moduleProgress[mod.id].state !== "mastered") {
    state.moduleProgress[mod.id] = {
      ...state.moduleProgress[mod.id],
      state: "mastered",
      percentComplete: 1,
      masteredAt: new Date().toISOString(),
    };
  }

  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));

  const unlocked = await canAccessModuleQbank(state, IDS.modCell);
  if (!unlocked.unlocked) {
    throw new Error(`Expected unlock after mastery: ${unlocked.reason}`);
  }

  const stillLockedStep1 = await (
    await import("../lib/mastery/gates")
  ).canAccessStep1Qbank(state);
  if (stillLockedStep1.unlocked) {
    throw new Error("Step 1 should remain locked after one module");
  }

  console.log("OK mastery-path: Cell module mastered; module Qbank unlocked; Step 1 still locked");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
