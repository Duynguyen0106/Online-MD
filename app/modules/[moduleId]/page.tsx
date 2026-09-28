import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { Badge, ProgressBar } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  STUDENT_COPY,
  formatProgressState,
  formatQuizProgress,
  formatSectionProgress,
  lessonActionLabel,
  moduleDescription,
} from "@/lib/copy/student";
import {
  getClinicalCases,
  getLessonBlocks,
  getModule,
} from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";
import {
  canAccessModuleQbank,
  evaluateLessonMastery,
  evaluateModuleMastery,
} from "@/lib/mastery/gates";
import { percent } from "@/lib/utils";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = await getModule(moduleId);
  if (!mod) notFound();
  const state = await readStudentState();
  const moduleStatus = await evaluateModuleMastery(moduleId, state);
  const qbank = await canAccessModuleQbank(state, moduleId);
  const mp = state.moduleProgress[moduleId];
  const relatedCases = getClinicalCases(moduleId);
  const progressPct = mp?.percentComplete ?? 0;

  const lessons = await Promise.all(
    mod.lessons.map(async (lesson, index) => {
      const lp = state.lessonProgress[lesson.id];
      const blocks = getLessonBlocks(lesson);
      const viewed = new Set(lp?.viewedBlockIds ?? []);
      const evalLesson = await evaluateLessonMastery(lesson.id, lp);
      return {
        index: index + 1,
        lesson,
        lp,
        blocksTotal: blocks.length,
        blocksViewed: blocks.filter((b) => viewed.has(b.id)).length,
        quizScore: lp?.lastFormativeScore,
        evalLesson,
        summary:
          lesson.concepts[0]?.summary ??
          "Core concepts, clinical connections, and a short check of your understanding.",
      };
    }),
  );

  return (
    <AppShell title={mod.title}>
      <p className="-mt-2 mb-6 max-w-3xl text-[var(--muted)]">
        {moduleDescription(mod.id, mod.description)}
      </p>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs text-[var(--muted)]">Module progress</p>
          <p className="mt-2 text-2xl font-[family-name:var(--font-display)]">
            {percent(progressPct)} complete
          </p>
          <div className="mt-3">
            <ProgressBar value={progressPct} />
          </div>
          <Badge className="mt-3">{formatProgressState(mp?.state)}</Badge>
          <p className="mt-3 text-xs text-[var(--muted)]">
            {STUDENT_COPY.moduleProgressHint}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs text-[var(--muted)]">Module assessment</p>
          <p className="mt-2 text-sm leading-6">{moduleStatus.reason}</p>
          <Button asChild size="sm" className="mt-3" variant="secondary">
            <Link href={`/modules/${mod.id}/exam`}>
              {moduleStatus.examPassed ? "View results" : "Start assessment"}
            </Link>
          </Button>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs text-[var(--muted)]">Question bank</p>
          <p className="mt-2 text-sm leading-6">
            {qbank.unlocked
              ? STUDENT_COPY.qbankAvailable
              : STUDENT_COPY.qbankLockedModule}
          </p>
          {qbank.unlocked ? (
            <Button asChild size="sm" className="mt-3">
              <Link href="/qbank">Practice questions</Link>
            </Button>
          ) : (
            <Button size="sm" className="mt-3" disabled>
              Locked
            </Button>
          )}
        </div>
      </div>

      <h2 className="mb-1 font-[family-name:var(--font-display)] text-xl">Lessons</h2>
      <p className="mb-4 max-w-3xl text-sm text-[var(--muted)]">
        Work through the lessons in order. Each lesson covers the core concepts, clinical
        connections, and a short check of your understanding.
      </p>
      <div className="space-y-3">
        {lessons.map((row) => (
          <div
            key={row.lesson.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-[var(--muted)]">Lesson {row.index}</p>
                <Link
                  href={`/lessons/${row.lesson.id}`}
                  className="font-medium text-[var(--brand-strong)] hover:underline"
                >
                  {row.lesson.title}
                </Link>
                <p className="mt-1 text-sm text-[var(--muted)]">{row.summary}</p>
                <ul className="mt-2 space-y-1 text-xs text-[var(--muted)]">
                  <li>
                    {row.evalLesson.allBlocksViewed ? "✓" : "○"}{" "}
                    {formatSectionProgress(row.blocksViewed, row.blocksTotal)}
                  </li>
                  <li>
                    {row.evalLesson.quizPass ? "✓" : "○"}{" "}
                    {formatQuizProgress(row.quizScore, row.evalLesson.quizPass)}
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge>{formatProgressState(row.lp?.state)}</Badge>
                <Button asChild size="sm">
                  <Link href={`/lessons/${row.lesson.id}`}>
                    {lessonActionLabel(row.lp?.state)}
                  </Link>
                </Button>
                <Link
                  className="text-xs underline text-[var(--muted)]"
                  href={`/lessons/${row.lesson.id}/quiz`}
                >
                  Take the quiz
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {relatedCases.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">
            Clinical cases
          </h2>
          <ul className="space-y-2 text-sm">
            {relatedCases.map((c) => (
              <li key={c.id}>
                <Link
                  className="text-[var(--brand-strong)] underline"
                  href={`/cases/${c.id}`}
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild>
          <Link href={`/modules/${mod.id}/exam`}>
            {moduleStatus.examPassed ? "View results" : "Start assessment"}
          </Link>
        </Button>
        <p className="text-sm text-[var(--muted)]">
          {moduleStatus.examPassed
            ? STUDENT_COPY.assessmentComplete
            : STUDENT_COPY.moduleProgressHint}
        </p>
      </div>
    </AppShell>
  );
}
