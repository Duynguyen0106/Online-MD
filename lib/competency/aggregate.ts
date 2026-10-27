import {
  COMPETENCY_DOMAINS,
  type CompetencyDomainId,
  normalizeCompetencyDomain,
} from "@/lib/competency/domains";
import {
  getAllModules,
  getNextLesson,
  getObjectives,
  getQbankQuestions,
} from "@/lib/curriculum/accessors";
import type { Module, StudentState } from "@/lib/types/domain";

export type CompetencyCell = {
  moduleId: string;
  domain: CompetencyDomainId;
  /** 0–1 study-evidence score */
  score: number;
  linkedLessonCount: number;
  masteredLessonCount: number;
};

export type CompetencyModuleRow = {
  moduleId: string;
  title: string;
  sequence: number;
  phaseId: string;
  cells: Record<CompetencyDomainId, CompetencyCell>;
  nextLessonId: string | null;
  overall: number;
};

export type CompetencyGap = {
  moduleId: string;
  moduleTitle: string;
  domain: CompetencyDomainId;
  score: number;
  nextLessonId: string | null;
};

function clamp01(n: number) {
  if (Number.isNaN(n) || n < 0) return 0;
  if (n > 1) return 1;
  return n;
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
    const publishedLessons = mod.lessons.filter((l) => l.status === "published");
    const masteredIds = new Set(
      publishedLessons
        .filter((l) => state.lessonProgress[l.id]?.state === "mastered")
        .map((l) => l.id),
    );
    const next = getNextLesson(publishedLessons, masteredIds);

    const cells = {} as Record<CompetencyDomainId, CompetencyCell>;
    let overallSum = 0;

    for (const domain of COMPETENCY_DOMAINS) {
      const linked = publishedLessons.filter((l) =>
        lessonDomains.get(l.id)?.has(domain),
      );
      // If no objective maps this domain onto the module, treat every lesson as
      // weakly linked so empty modules still show progress texture.
      const pool = linked.length > 0 ? linked : publishedLessons;
      const mastered = pool.filter((l) => masteredIds.has(l.id)).length;
      const base = pool.length === 0 ? 0 : mastered / pool.length;

      let score = base;
      if (examPassed.has(mod.id)) score = Math.min(1, score + 0.08);
      // Light qbank signal when student has practiced related items
      const organHint = mod.title.toLowerCase();
      const organTouched = [...qbankTouchedSystems].some((s) =>
        organHint.includes(s.split(/[\/\s]/)[0] ?? s),
      );
      if (organTouched && qbankTouchedTasks.size > 0) {
        score = Math.min(1, score + 0.04);
      }

      const cell: CompetencyCell = {
        moduleId: mod.id,
        domain,
        score: clamp01(score),
        linkedLessonCount: pool.length,
        masteredLessonCount: mastered,
      };
      cells[domain] = cell;
      overallSum += cell.score;
    }

    rows.push({
      moduleId: mod.id,
      title: mod.title,
      sequence: mod.sequence,
      phaseId: mod.phaseId,
      cells,
      nextLessonId: next?.id ?? null,
      overall: clamp01(overallSum / COMPETENCY_DOMAINS.length),
    });
  }

  rows.sort((a, b) => a.sequence - b.sequence || a.title.localeCompare(b.title));
  return rows;
}

/** Lowest-scoring module/domain pairs for dashboard cues. */
export function topCompetencyGaps(
  rows: CompetencyModuleRow[],
  limit = 3,
): CompetencyGap[] {
  const gaps: CompetencyGap[] = [];
  for (const row of rows) {
    for (const domain of COMPETENCY_DOMAINS) {
      const cell = row.cells[domain];
      gaps.push({
        moduleId: row.moduleId,
        moduleTitle: row.title,
        domain,
        score: cell.score,
        nextLessonId: row.nextLessonId,
      });
    }
  }
  gaps.sort((a, b) => a.score - b.score || a.moduleTitle.localeCompare(b.moduleTitle));
  // Prefer gaps that still have room to improve
  return gaps.filter((g) => g.score < 0.95).slice(0, limit);
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
