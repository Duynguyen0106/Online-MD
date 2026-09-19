"use server";

import { revalidatePath } from "next/cache";
import {
  getClinicalCase,
  getFormativeQuestions,
  getLesson,
  getLessonBlocks,
  getModule,
  getObjectivesForLesson,
  getQbankQuestions,
  getQuestionMap,
} from "@/lib/curriculum/accessors";
import { generateCaseFeedback, generateTutorReply } from "@/lib/ai/medical-educator";
import {
  canAccessModuleQbank,
  canAccessStep1Qbank,
  canAccessStep2CkQbank,
  ensureLessonProgress,
  evaluateLessonMastery,
  evaluateModuleMastery,
  recomputeModuleProgress,
  scoreResponses,
} from "@/lib/mastery/gates";
import { initialCardReview, reviewSm2 } from "@/lib/spaced-repetition/supermemo2";
import {
  getSessionUser,
  newId,
  setSessionUserId,
  updateStudentState,
} from "@/lib/demo/store";
import {
  caseResponseSchema,
  markBlockSchema,
  reviewCardSchema,
  startQbankSchema,
  submitExamSchema,
  submitQbankSchema,
  submitQuizSchema,
  tutorMessageSchema,
} from "@/lib/validations/schemas";

export async function switchDemoUser(userId: string) {
  await setSessionUserId(userId);
  revalidatePath("/", "layout");
  return { ok: true as const };
}

export async function markBlockViewed(input: unknown) {
  const parsed = markBlockSchema.parse(input);
  const lesson = await getLesson(parsed.lessonId);
  if (!lesson) throw new Error("Lesson not found");
  const blocks = getLessonBlocks(lesson);
  if (!blocks.some((b) => b.id === parsed.blockId)) {
    throw new Error("Block not in lesson");
  }

  const state = await updateStudentState(async (s) => {
    const lp = ensureLessonProgress(s, parsed.lessonId);
    const viewed = new Set(lp.viewedBlockIds);
    viewed.add(parsed.blockId);
    const nextLp = {
      ...lp,
      viewedBlockIds: [...viewed],
      state: lp.state === "mastered" ? lp.state : ("in_progress" as const),
      startedAt: lp.startedAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const mastery = await evaluateLessonMastery(parsed.lessonId, nextLp);
    if (mastery.mastered) {
      nextLp.state = "mastered";
      nextLp.masteredAt = nextLp.masteredAt ?? new Date().toISOString();
    }
    s.lessonProgress[parsed.lessonId] = nextLp;
    const mod = await getModule(lesson.moduleId);
    if (mod) {
      s.moduleProgress[mod.id] = await recomputeModuleProgress(mod.id, s);
    }
    return s;
  });

  revalidatePath(`/lessons/${parsed.lessonId}`);
  revalidatePath("/dashboard");
  return { ok: true as const, progress: state.lessonProgress[parsed.lessonId] };
}

export async function submitFormativeQuiz(input: unknown) {
  const parsed = submitQuizSchema.parse(input);
  const questions = getFormativeQuestions(parsed.lessonId);
  const lesson = await getLesson(parsed.lessonId);
  if (!lesson) throw new Error("Lesson not found");
  const qmap = getQuestionMap();
  const score = scoreResponses(
    questions.map((q) => q.id),
    parsed.responses,
    (id) => qmap[id]?.correctChoiceId,
  );

  const state = await updateStudentState(async (s) => {
    s.quizAttempts.push({
      id: newId("quiz"),
      lessonId: parsed.lessonId,
      status: "submitted",
      score,
      responses: parsed.responses,
      startedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    });
    const lp = ensureLessonProgress(s, parsed.lessonId);
    const nextLp = {
      ...lp,
      lastFormativeScore: Math.max(lp.lastFormativeScore ?? 0, score),
      state: lp.state === "mastered" ? lp.state : ("in_progress" as const),
      updatedAt: new Date().toISOString(),
      startedAt: lp.startedAt ?? new Date().toISOString(),
    };
    const mastery = await evaluateLessonMastery(parsed.lessonId, nextLp);
    if (mastery.mastered) {
      nextLp.state = "mastered";
      nextLp.masteredAt = nextLp.masteredAt ?? new Date().toISOString();
    }
    s.lessonProgress[parsed.lessonId] = nextLp;
    s.moduleProgress[lesson.moduleId] = await recomputeModuleProgress(
      lesson.moduleId,
      s,
    );
    return s;
  });

  revalidatePath(`/lessons/${parsed.lessonId}`);
  revalidatePath(`/lessons/${parsed.lessonId}/quiz`);
  revalidatePath("/dashboard");
  return {
    ok: true as const,
    score,
    passed: score >= lesson.quizPassThreshold,
    progress: state.lessonProgress[parsed.lessonId],
  };
}

export async function submitModuleExam(input: unknown) {
  const parsed = submitExamSchema.parse(input);
  const mod = await getModule(parsed.moduleId);
  if (!mod?.exam) throw new Error("Exam not found");

  const userState = await updateStudentState((s) => s);
  const lessonsOk = mod.lessons.every(
    (l) => userState.lessonProgress[l.id]?.state === "mastered",
  );
  if (!lessonsOk) {
    throw new Error("Module exam locked until all lessons are mastered");
  }

  const qmap = getQuestionMap();
  const score = scoreResponses(
    mod.exam.questionIds,
    parsed.responses,
    (id) => qmap[id]?.correctChoiceId,
  );
  const passed = score >= mod.exam.passThreshold;

  await updateStudentState(async (s) => {
    s.examAttempts.push({
      id: newId("exam"),
      moduleExamId: mod.exam!.id,
      moduleId: mod.id,
      status: "submitted",
      score,
      passed,
      responses: parsed.responses,
      startedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    });
    s.moduleProgress[mod.id] = await recomputeModuleProgress(mod.id, s);
    const evaluation = await evaluateModuleMastery(mod.id, s);
    if (evaluation.mastered) {
      s.moduleProgress[mod.id] = {
        ...s.moduleProgress[mod.id],
        state: "mastered",
        masteredAt: new Date().toISOString(),
        percentComplete: 1,
      };
    }
    return s;
  });

  revalidatePath(`/modules/${mod.id}`);
  revalidatePath(`/modules/${mod.id}/exam`);
  revalidatePath("/qbank");
  revalidatePath("/dashboard");
  return { ok: true as const, score, passed };
}

export async function reviewFlashcard(input: unknown) {
  const parsed = reviewCardSchema.parse(input);
  const now = new Date();
  await updateStudentState((s) => {
    const prev = s.cardReviews[parsed.flashcardId] ?? {
      flashcardId: parsed.flashcardId,
      ...initialCardReview(now),
    };
    const next = reviewSm2(
      {
        easiness: prev.easiness,
        intervalDays: prev.intervalDays,
        repetitions: prev.repetitions,
        quality: parsed.quality,
      },
      now,
    );
    s.cardReviews[parsed.flashcardId] = {
      flashcardId: parsed.flashcardId,
      easiness: next.easiness,
      intervalDays: next.intervalDays,
      repetitions: next.repetitions,
      dueAt: next.dueAt.toISOString(),
      lastReviewedAt: now.toISOString(),
      lastQuality: parsed.quality,
    };
    return s;
  });
  revalidatePath("/flashcards");
  return { ok: true as const };
}

export async function startQbankAttempt(input: unknown) {
  const parsed = startQbankSchema.parse(input);
  const user = await getSessionUser();
  if (user.role === "student") {
    const state = await updateStudentState((s) => s);
    if (parsed.moduleId) {
      const gate = await canAccessModuleQbank(state, parsed.moduleId);
      if (!gate.unlocked) throw new Error(gate.reason);
    } else if (parsed.usmleStep === "step1") {
      const gate = await canAccessStep1Qbank(state);
      if (!gate.unlocked) throw new Error(gate.reason);
    } else if (parsed.usmleStep === "step2ck") {
      const gate = await canAccessStep2CkQbank(state);
      if (!gate.unlocked) throw new Error(gate.reason);
    } else {
      throw new Error("Specify moduleId or usmleStep");
    }
  }

  const questions = getQbankQuestions({
    moduleId: parsed.moduleId,
    usmleStep: parsed.usmleStep,
  });
  if (questions.length === 0) throw new Error("No qbank questions available");

  const attemptId = newId("qbank");
  await updateStudentState((s) => {
    s.qbankAttempts.push({
      id: attemptId,
      moduleId: parsed.moduleId,
      usmleStep: parsed.usmleStep,
      mode: parsed.mode,
      status: "in_progress",
      questionIds: questions.map((q) => q.id),
      responses: {},
      startedAt: new Date().toISOString(),
    });
    return s;
  });

  revalidatePath("/qbank");
  return { ok: true as const, attemptId, questionIds: questions.map((q) => q.id) };
}

export async function submitQbankAttempt(input: unknown) {
  const parsed = submitQbankSchema.parse(input);
  const qmap = Object.fromEntries(getQbankQuestions().map((q) => [q.id, q]));
  let score = 0;
  await updateStudentState(async (s) => {
    const attempt = s.qbankAttempts.find((a) => a.id === parsed.attemptId);
    if (!attempt) throw new Error("Attempt not found");
    if (attempt.moduleId) {
      const gate = await canAccessModuleQbank(s, attempt.moduleId);
      if (!gate.unlocked) throw new Error(gate.reason);
    }
    if (attempt.usmleStep === "step1") {
      const gate = await canAccessStep1Qbank(s);
      if (!gate.unlocked) throw new Error(gate.reason);
    }
    if (attempt.usmleStep === "step2ck") {
      const gate = await canAccessStep2CkQbank(s);
      if (!gate.unlocked) throw new Error(gate.reason);
    }
    score = scoreResponses(
      attempt.questionIds,
      parsed.responses,
      (id) => qmap[id]?.correctChoiceId,
    );
    attempt.responses = parsed.responses;
    attempt.score = score;
    attempt.status = "submitted";
    attempt.submittedAt = new Date().toISOString();
    return s;
  });
  revalidatePath("/qbank");
  return { ok: true as const, score };
}

export async function sendTutorMessage(input: unknown) {
  const parsed = tutorMessageSchema.parse(input);
  const lesson = parsed.lessonId ? await getLesson(parsed.lessonId) : undefined;
  const objectives = parsed.lessonId
    ? getObjectivesForLesson(parsed.lessonId)
    : [];
  const blocks = lesson ? getLessonBlocks(lesson) : [];
  const context = [
    lesson
      ? `Lesson: ${lesson.title}\nConcepts: ${lesson.concepts.map((c) => `${c.title}: ${c.summary}`).join("\n")}`
      : "General curriculum tutoring",
    `Objectives:\n${objectives.map((o) => `${o.code}: ${o.statement}`).join("\n")}`,
    `Blocks:\n${blocks.map((b) => `${b.id} ${b.title}`).join("\n")}`,
  ].join("\n\n");

  const structured = await generateTutorReply({
    message: parsed.message,
    curriculumContext: context,
  });

  const threadId = parsed.threadId ?? newId("thread");
  await updateStudentState((s) => {
    let thread = s.tutorThreads.find((t) => t.id === threadId);
    if (!thread) {
      thread = {
        id: threadId,
        lessonId: parsed.lessonId,
        messages: [],
        createdAt: new Date().toISOString(),
      };
      s.tutorThreads.unshift(thread);
    }
    thread.messages.push({
      id: newId("msg"),
      role: "user",
      content: parsed.message,
      createdAt: new Date().toISOString(),
    });
    thread.messages.push({
      id: newId("msg"),
      role: "assistant",
      content: structured.reply,
      structured,
      createdAt: new Date().toISOString(),
    });
    return s;
  });

  revalidatePath("/tutor");
  return { ok: true as const, threadId, structured };
}

export async function submitCaseAttempt(input: unknown) {
  const parsed = caseResponseSchema.parse(input);
  const clinical = getClinicalCase(parsed.caseId);
  if (!clinical) throw new Error("Case not found");

  const feedback = await generateCaseFeedback({
    caseTitle: clinical.title,
    presentation: clinical.presentationMd,
    stages: clinical.stages,
    responses: parsed.responses,
    teachingPoints: clinical.teachingPoints,
  });

  const attemptId = newId("case");
  await updateStudentState((s) => {
    s.caseAttempts.push({
      id: attemptId,
      caseId: parsed.caseId,
      status: "submitted",
      studentResponses: parsed.responses,
      aiFeedback: feedback,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    });
    return s;
  });

  revalidatePath(`/cases/${parsed.caseId}`);
  return { ok: true as const, attemptId, feedback };
}
