import {
  COMPETENCY_DOMAINS,
  type CompetencyDomainId,
  normalizeCompetencyDomain,
} from "@/lib/competency/domains";
import {
  getAllModules,
  getLessonBlocks,
  getObjectives,
  getQbankQuestions,
} from "@/lib/curriculum/accessors";
import type {
  Lesson,
  LessonProgress,
  Module,
  StudentState,
} from "@/lib/types/domain";

export type CompetencyNextKind = "lesson" | "quiz" | "module";

export type CompetencyCell = {
  moduleId: string;
  domain: CompetencyDomainId;
  /** 0–1 study-evidence score */
  score: number;
  linkedLessonCount: number;
  masteredLessonCount: number;
  /** Domain-specific next study target */
  nextLessonId: string | null;
  nextHref: string | null;
  nextKind: CompetencyNextKind | null;
};

export type CompetencyModuleRow = {
  moduleId: string;
  title: string;
  sequence: number;
  phaseId: string;
  cells: Record<CompetencyDomainId, CompetencyCell>;
  /** Weakest incomplete domain’s next target (row Continue). */
  nextLessonId: string | null;
  nextHref: string | null;
  nextKind: CompetencyNextKind | null;
  overall: number;
};

export type CompetencyGap = {
  moduleId: string;
  moduleTitle: string;
  domain: CompetencyDomainId;
  score: number;
  nextLessonId: string | null;
  nextHref: string | null;
  nextKind: CompetencyNextKind | null;
  /** Higher = more worth surfacing in Suggested focus */
  priority: number;
};

function clamp01(n: number) {
  if (Number.isNaN(n) || n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

/**
 * Per-lesson study evidence from section views + formative quiz.
 * Mastered lessons count as full evidence; partial progress moves the needle.
 */
export function lessonEvidenceScore(
  lesson: Pick<Lesson, "quizPassThreshold">,
  progress: LessonProgress | undefined,
  blockCount: number,
): number {
  if (progress?.state === "mastered") return 1;

  const viewed = new Set(progress?.viewedBlockIds ?? []);
  const sectionFraction =
    blockCount <= 0 ? 0 : Math.min(1, viewed.size / blockCount);

  const quizScore = clamp01(progress?.lastFormativeScore ?? 0);
  // Sections and quiz each carry half the lesson until mastery.
  return clamp01(0.5 * sectionFraction + 0.5 * quizScore);
}

export type NextStudyTarget = {
  lessonId: string;
  href: string;
  kind: CompetencyNextKind;
};

/**
 * First incomplete lesson in the pool: open the quiz when sections are done
 * but the formative threshold is not yet met; otherwise open the lesson.
 */
export function resolveNextStudyTarget(
  pool: Lesson[],
  state: StudentState,
): NextStudyTarget | null {
  for (const lesson of pool) {
    if (lesson.status !== "published") continue;
    const progress = state.lessonProgress[lesson.id];
    if (progress?.state === "mastered") continue;

    const blocks = getLessonBlocks(lesson);
    const viewed = new Set(progress?.viewedBlockIds ?? []);
    const allSectionsViewed =
      blocks.length > 0 && blocks.every((b) => viewed.has(b.id));
    const quizPass =
      (progress?.lastFormativeScore ?? 0) >= lesson.quizPassThreshold;

    if (allSectionsViewed && !quizPass && lesson.quizQuestionIds.length > 0) {
      return {
        lessonId: lesson.id,
        href: `/lessons/${lesson.id}/quiz`,
        kind: "quiz",
      };
    }
    return {
      lessonId: lesson.id,
      href: `/lessons/${lesson.id}`,
      kind: "lesson",
    };
  }
  return null;
}

function latestActivityMs(mod: Module, state: StudentState): number {
  let latest = 0;
  const lessonIds = new Set(mod.lessons.map((l) => l.id));
  for (const lesson of mod.lessons) {
    const lp = state.lessonProgress[lesson.id];
    if (lp?.updatedAt) {
      const t = Date.parse(lp.updatedAt);
      if (!Number.isNaN(t) && t > latest) latest = t;
    }
    if (lp?.startedAt) {
      const t = Date.parse(lp.startedAt);
      if (!Number.isNaN(t) && t > latest) latest = t;
    }
  }
  for (const attempt of state.quizAttempts) {
    if (!lessonIds.has(attempt.lessonId)) continue;
    const stamp = attempt.submittedAt ?? attempt.startedAt;
    const t = Date.parse(stamp);
    if (!Number.isNaN(t) && t > latest) latest = t;
  }
  for (const attempt of state.examAttempts) {
    if (attempt.moduleId !== mod.id) continue;
    const stamp = attempt.submittedAt ?? attempt.startedAt;
    const t = Date.parse(stamp);
    if (!Number.isNaN(t) && t > latest) latest = t;
  }
  return latest;
}

/** 0–1 recency weight: recent work ranks higher for Suggested focus. */
export function activityRecencyWeight(
  latestMs: number,
  nowMs = Date.now(),
): number {
  if (latestMs <= 0) return 0;
  const days = Math.max(0, (nowMs - latestMs) / (1000 * 60 * 60 * 24));
  // Full weight within ~2 days, fading over two weeks.
  return clamp01(Math.exp(-days / 7));
}

/**
 * Aggregate module × domain study evidence from existing progress.
 * Does not change mastery gates or unlock rules.
 */
export async function buildCompetencyMatrix(
  state: StudentState,
): Promise<CompetencyModuleRow[]> {
  const modules = await getAllModules();
  const objectives = getObjectives();
  const qbank = getQbankQuestions();

  const examPassed = new Set(
    state.examAttempts
      .filter((a) => a.status === "submitted" && a.passed)
      .map((a) => a.moduleId),
  );

  const qbankTouchedSystems = new Set<string>();
  const qbankTouchedTasks = new Set<string>();
  for (const attempt of state.qbankAttempts) {
    if (!attempt.questionIds?.length) continue;
    for (const qid of attempt.questionIds) {
      const q = qbank.find((item) => item.id === qid);
      if (!q) continue;
      if (q.organSystem) qbankTouchedSystems.add(q.organSystem.toLowerCase());
      if (q.physicianTask) qbankTouchedTasks.add(q.physicianTask.toLowerCase());
    }
  }

  // lessonId → domains (from objectives that list the lesson)
  const lessonDomains = new Map<string, Set<CompetencyDomainId>>();
  for (const obj of objectives) {
    const domain = normalizeCompetencyDomain(
      obj.physicianTask,
      obj.contentCategory,
      obj.statement,
    );
    for (const lid of obj.lessonIds) {
      if (!lessonDomains.has(lid)) lessonDomains.set(lid, new Set());
      lessonDomains.get(lid)!.add(domain);
    }
  }

  const rows: CompetencyModuleRow[] = [];

  for (const mod of modules) {
    if (mod.status !== "published") continue;
    const publishedLessons = mod.lessons
      .filter((l) => l.status === "published")
      .slice()
      .sort((a, b) => a.sequence - b.sequence);

    const cells = {} as Record<CompetencyDomainId, CompetencyCell>;
    let overallSum = 0;

    for (const domain of COMPETENCY_DOMAINS) {
      const linked = publishedLessons.filter((l) =>
        lessonDomains.get(l.id)?.has(domain),
      );
      // If no objective maps this domain onto the module, treat every lesson as
      // weakly linked so empty modules still show progress texture.
      const pool = linked.length > 0 ? linked : publishedLessons;

      let evidenceSum = 0;
      let mastered = 0;
      for (const lesson of pool) {
        const progress = state.lessonProgress[lesson.id];
        if (progress?.state === "mastered") mastered += 1;
        const blocks = getLessonBlocks(lesson);
        evidenceSum += lessonEvidenceScore(lesson, progress, blocks.length);
      }
      let score = pool.length === 0 ? 0 : evidenceSum / pool.length;

      if (examPassed.has(mod.id)) score = Math.min(1, score + 0.08);
      const organHint = mod.title.toLowerCase();
      const organTouched = [...qbankTouchedSystems].some((s) =>
        organHint.includes(s.split(/[\/\s]/)[0] ?? s),
      );
      if (organTouched && qbankTouchedTasks.size > 0) {
        score = Math.min(1, score + 0.04);
      }

      const next = resolveNextStudyTarget(pool, state);
      const cell: CompetencyCell = {
        moduleId: mod.id,
        domain,
        score: clamp01(score),
        linkedLessonCount: pool.length,
        masteredLessonCount: mastered,
        nextLessonId: next?.lessonId ?? null,
        nextHref: next?.href ?? (pool.length === 0 ? `/modules/${mod.id}` : null),
        nextKind: next?.kind ?? (pool.length === 0 ? "module" : null),
      };
      cells[domain] = cell;
      overallSum += cell.score;
    }

    // Row Continue → weakest incomplete domain’s next target
    let weakest: CompetencyCell | null = null;
    for (const domain of COMPETENCY_DOMAINS) {
      const cell = cells[domain];
      if (cell.score >= 0.95) continue;
      if (!weakest || cell.score < weakest.score) weakest = cell;
    }
    const rowNext = weakest ?? cells[COMPETENCY_DOMAINS[0]];

    rows.push({
      moduleId: mod.id,
      title: mod.title,
      sequence: mod.sequence,
      phaseId: mod.phaseId,
      cells,
      nextLessonId: rowNext?.nextLessonId ?? null,
      nextHref: rowNext?.nextHref ?? `/modules/${mod.id}`,
      nextKind: rowNext?.nextKind ?? "module",
      overall: clamp01(overallSum / COMPETENCY_DOMAINS.length),
    });
  }

  rows.sort((a, b) => a.sequence - b.sequence || a.title.localeCompare(b.title));
  return rows;
}

/**
 * Lowest-scoring module/domain pairs for dashboard cues.
 * Prefers weak domains in modules the student touched recently.
 */
export function topCompetencyGaps(
  rows: CompetencyModuleRow[],
  limit = 3,
  options?: {
    nowMs?: number;
    moduleActivityMs?: Record<string, number>;
  },
): CompetencyGap[] {
  const nowMs = options?.nowMs ?? Date.now();
  const gaps: CompetencyGap[] = [];

  for (const row of rows) {
    const latest =
      options?.moduleActivityMs?.[row.moduleId] ??
      // Fall back: infer from whether any cell has partial credit
      (row.overall > 0 ? nowMs - 3 * 24 * 60 * 60 * 1000 : 0);
    const activity = activityRecencyWeight(latest, nowMs);

    for (const domain of COMPETENCY_DOMAINS) {
      const cell = row.cells[domain];
      if (cell.score >= 0.95) continue;
      // Weakness × recent activity. Meaningful partial evidence (sections/quizzes
      // started) outranks untouched zeros so Suggested focus stays actionable.
      let priority = (1 - cell.score) * (0.25 + 0.75 * activity);
      if (cell.score >= 0.1 && cell.score < 0.95) {
        priority += 0.35;
      }
      gaps.push({
        moduleId: row.moduleId,
        moduleTitle: row.title,
        domain,
        score: cell.score,
        nextLessonId: cell.nextLessonId,
        nextHref: cell.nextHref,
        nextKind: cell.nextKind,
        priority,
      });
    }
  }

  gaps.sort(
    (a, b) =>
      b.priority - a.priority ||
      a.score - b.score ||
      a.moduleTitle.localeCompare(b.moduleTitle),
  );

  // Diversify: at most one gap per domain in the first pass, then fill.
  const picked: CompetencyGap[] = [];
  const usedDomains = new Set<CompetencyDomainId>();
  const usedModules = new Set<string>();

  for (const gap of gaps) {
    if (picked.length >= limit) break;
    if (usedDomains.has(gap.domain)) continue;
    if (usedModules.has(gap.moduleId) && picked.length < limit) {
      // Allow second pick from same module only after unique domains filled
      continue;
    }
    picked.push(gap);
    usedDomains.add(gap.domain);
    usedModules.add(gap.moduleId);
  }
  if (picked.length < limit) {
    for (const gap of gaps) {
      if (picked.length >= limit) break;
      if (picked.some((p) => p.moduleId === gap.moduleId && p.domain === gap.domain)) {
        continue;
      }
      picked.push(gap);
    }
  }
  return picked;
}

/** Build activity map for smarter Suggested focus (call with live StudentState). */
export async function competencyModuleActivity(
  state: StudentState,
): Promise<Record<string, number>> {
  const modules = await getAllModules();
  const out: Record<string, number> = {};
  for (const mod of modules) {
    if (mod.status !== "published") continue;
    out[mod.id] = latestActivityMs(mod, state);
  }
  return out;
}

export function modulesByPhase(
  rows: CompetencyModuleRow[],
  modules: Module[],
): Map<string, CompetencyModuleRow[]> {
  const phaseOf = new Map(modules.map((m) => [m.id, m.phaseId]));
  const out = new Map<string, CompetencyModuleRow[]>();
  for (const row of rows) {
    const phaseId = phaseOf.get(row.moduleId) ?? row.phaseId;
    if (!out.has(phaseId)) out.set(phaseId, []);
    out.get(phaseId)!.push(row);
  }
  return out;
}
