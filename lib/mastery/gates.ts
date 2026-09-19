import {
  getAllModules,
  getLesson,
  getLessonBlocks,
  getModule,
  getPhases,
} from "@/lib/curriculum/accessors";
import type {
  LessonProgress,
  ModuleProgress,
  ProgressState,
  StudentState,
} from "@/lib/types/domain";
import { listUnlockRules } from "@/lib/demo/admin-store";

export async function evaluateLessonMastery(
  lessonId: string,
  progress: LessonProgress | undefined,
): Promise<{
  mastered: boolean;
  reason: string;
  allBlocksViewed: boolean;
  quizPass: boolean;
}> {
  const lesson = await getLesson(lessonId);
  if (!lesson) {
    return {
      mastered: false,
      reason: "Lesson not found",
      allBlocksViewed: false,
      quizPass: false,
    };
  }
  const blocks = getLessonBlocks(lesson);
  const viewed = new Set(progress?.viewedBlockIds ?? []);
  const allBlocksViewed =
    blocks.length > 0 && blocks.every((b) => viewed.has(b.id));
  const threshold = lesson.quizPassThreshold;
  const quizPass = (progress?.lastFormativeScore ?? 0) >= threshold;
  const mastered = allBlocksViewed && quizPass;
  return {
    mastered,
    allBlocksViewed,
    quizPass,
    reason: mastered
      ? "All content viewed and formative quiz passed"
      : !allBlocksViewed
        ? "View all content blocks"
        : `Score at least ${Math.round(threshold * 100)}% on the formative quiz`,
  };
}

export async function evaluateModuleMastery(
  moduleId: string,
  state: StudentState,
): Promise<{
  mastered: boolean;
  lessonsMastered: boolean;
  examPassed: boolean;
  reason: string;
}> {
  const mod = await getModule(moduleId);
  if (!mod) {
    return {
      mastered: false,
      lessonsMastered: false,
      examPassed: false,
      reason: "Module not found",
    };
  }
  const lessonsMastered = mod.lessons.every(
    (l) => state.lessonProgress[l.id]?.state === "mastered",
  );
  const examAttempts = state.examAttempts.filter(
    (a) => a.moduleId === moduleId && a.status === "submitted",
  );
  const examPassed = examAttempts.some((a) => a.passed);
  const mastered = lessonsMastered && examPassed;
  return {
    mastered,
    lessonsMastered,
    examPassed,
    reason: mastered
      ? "All lessons mastered and module exam passed"
      : !lessonsMastered
        ? "Master all lessons first"
        : `Pass the module exam (≥${Math.round(mod.examPassThreshold * 100)}%)`,
  };
}

export async function recomputeModuleProgress(
  moduleId: string,
  state: StudentState,
): Promise<ModuleProgress> {
  const mod = await getModule(moduleId);
  if (!mod) {
    return { moduleId, state: "not_started", percentComplete: 0 };
  }
  const lessons = mod.lessons;
  const masteredCount = lessons.filter(
    (l) => state.lessonProgress[l.id]?.state === "mastered",
  ).length;
  const started = lessons.some((l) => state.lessonProgress[l.id]);
  const evalResult = await evaluateModuleMastery(moduleId, state);
  let progressState: ProgressState = "not_started";
  if (evalResult.mastered) progressState = "mastered";
  else if (started || masteredCount > 0) progressState = "in_progress";
  const percentComplete =
    lessons.length === 0
      ? 0
      : (masteredCount + (evalResult.examPassed ? 1 : 0)) / (lessons.length + 1);
  return {
    moduleId,
    state: progressState,
    percentComplete,
    masteredAt: evalResult.mastered
      ? state.moduleProgress[moduleId]?.masteredAt ?? new Date().toISOString()
      : undefined,
  };
}

export type QbankUnlock =
  | { unlocked: true; scope: string }
  | { unlocked: false; scope: string; reason: string };

export async function canAccessModuleQbank(
  userState: StudentState,
  moduleId: string,
): Promise<QbankUnlock> {
  const rules = await listUnlockRules();
  const rule = rules.find((r) => r.scope === "module_qbank" && r.isActive);
  if (rule && !rule.isActive) {
    return { unlocked: false, scope: `module:${moduleId}`, reason: "Rule inactive" };
  }
  const evaluation = await evaluateModuleMastery(moduleId, userState);
  if (evaluation.mastered) {
    return { unlocked: true, scope: `module:${moduleId}` };
  }
  return {
    unlocked: false,
    scope: `module:${moduleId}`,
    reason: `Module Qbank locked until mastery. ${evaluation.reason}.`,
  };
}

export async function canAccessStep1Qbank(
  userState: StudentState,
): Promise<QbankUnlock> {
  const rules = await listUnlockRules();
  const rule = rules.find((r) => r.scope === "phase_step1_qbank");
  if (rule && !rule.isActive) {
    return {
      unlocked: false,
      scope: "step1",
      reason: "Step 1 Qbank unlock rule is disabled by admin.",
    };
  }
  const foundations = (await getPhases()).find(
    (p) => p.phaseKind === "foundations",
  );
  if (!foundations) {
    return { unlocked: false, scope: "step1", reason: "Foundations phase missing" };
  }
  const pending = foundations.modules.filter(
    (m) => userState.moduleProgress[m.id]?.state !== "mastered",
  );
  if (pending.length === 0) {
    return { unlocked: true, scope: "step1" };
  }
  return {
    unlocked: false,
    scope: "step1",
    reason: `Step 1 Qbank unlocks after all Phase 1 modules are mastered (${pending.length} remaining).`,
  };
}

export async function canAccessStep2CkQbank(
  userState: StudentState,
): Promise<QbankUnlock> {
  const rules = await listUnlockRules();
  const rule = rules.find((r) => r.scope === "clerkship_step2_qbank");
  if (rule && !rule.isActive) {
    return {
      unlocked: false,
      scope: "step2ck",
      reason: "Step 2 CK Qbank unlock rule is disabled by admin.",
    };
  }
  const clerkships = (await getAllModules()).filter((m) => m.isCoreClerkship);
  const pending = clerkships.filter(
    (m) => userState.moduleProgress[m.id]?.state !== "mastered",
  );
  if (pending.length === 0) {
    return { unlocked: true, scope: "step2ck" };
  }
  return {
    unlocked: false,
    scope: "step2ck",
    reason: `Step 2 CK Qbank unlocks after all core clerkship modules are mastered (${pending.length} remaining).`,
  };
}

export function scoreResponses(
  questionIds: string[],
  responses: Record<string, string>,
  resolveCorrect: (id: string) => string | undefined,
): number {
  if (questionIds.length === 0) return 0;
  let correct = 0;
  for (const id of questionIds) {
    if (responses[id] && responses[id] === resolveCorrect(id)) correct += 1;
  }
  return correct / questionIds.length;
}

export function ensureLessonProgress(
  state: StudentState,
  lessonId: string,
): LessonProgress {
  const existing = state.lessonProgress[lessonId];
  if (existing) return existing;
  return {
    lessonId,
    state: "not_started",
    viewedBlockIds: [],
    updatedAt: new Date().toISOString(),
  };
}
