import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { Badge, ProgressBar } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatProgressState,
  lessonActionLabel,
  moduleDescription,
} from "@/lib/copy/student";
import {
  buildLessonMeta,
  formatLearnerLevel,
} from "@/lib/curriculum/content-metadata";
import {
  getClinicalCases,
  getLessonBlocks,
  getModule,
  getPhaseForModule,
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
  const phase = await getPhaseForModule(moduleId);
  const state = await readStudentState();
  const mastery = await evaluateModuleMastery(moduleId, state);
  const qbank = await canAccessModuleQbank(state, moduleId);
  const mp = state.moduleProgress[moduleId];
  const relatedCases = getClinicalCases(moduleId);
  const progressPct = mp?.percentComplete ?? 0;

  const checklist = await Promise.all(
    mod.lessons.map(async (lesson, index) => {
      const lp = state.lessonProgress[lesson.id];
      const blocks = getLessonBlocks(lesson);
      const viewed = new Set(lp?.viewedBlockIds ?? []);
      const evalLesson = await evaluateLessonMastery(lesson.id, lp);
      const meta = buildLessonMeta({
        lessonId: lesson.id,
        moduleId: mod.id,
        title: lesson.title,
        phaseKind: phase?.phaseKind,
        isCoreClerkship: mod.isCoreClerkship,
      });
      return {
        index: index + 1,
        lesson,
        lp,
        blocksTotal: blocks.length,
        blocksViewed: blocks.filter((b) => viewed.has(b.id)).length,
        quizScore: lp?.lastFormativeScore,
        mastery: evalLesson,
        learnerLevel: meta.learnerLevel,
        educationalRole: meta.educationalRole,
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
          <p className="text-xs text-[var(--muted)]">Your progress</p>
          <p className="mt-2 text-2xl font-[family-name:var(--font-display)]">
            {percent(progressPct)} complete
          </p>
          <div className="mt-3">
            <ProgressBar value={progressPct} />
          </div>
          <Badge className="mt-3">{formatProgressState(mp?.state)}</Badge>
          <p className="mt-3 text-xs text-[var(--muted)]">
            Complete the lessons and assessment to finish this module.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs text-[var(--muted)]">Module assessment</p>
          <p className="mt-2 text-sm leading-6">{mastery.reason}</p>
          <Button asChild size="sm" className="mt-3" variant="secondary">
            <Link href={`/modules/${mod.id}/exam`}>
              {mastery.examPassed ? "Review assessment" : "Start assessment"}
            </Link>
          </Button>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs text-[var(--muted)]">Question bank</p>
          <p className="mt-2 text-sm leading-6">
            {qbank.unlocked
              ? "Questions are available for this module."
              : qbank.reason}
          </p>
          {qbank.unlocked ? (
            <Button asChild size="sm" className="mt-3">
              <Link href="/qbank">Practice questions</Link>
            </Button>
          ) : (
            <Button size="sm" className="mt-3" disabled>
              Not yet available
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
        {checklist.map((row) => (
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
                    {row.mastery.allBlocksViewed ? "✓" : "○"} Sections reviewed{" "}
                    {row.blocksViewed}/{row.blocksTotal}
                  </li>
                  <li>
                    {row.mastery.quizPass ? "✓" : "○"} Check your understanding{" "}
                    {row.quizScore != null
                      ? `${Math.round(row.quizScore * 100)}%`
                      : "Not completed"}{" "}
                    (need ≥{Math.round(row.lesson.quizPassThreshold * 100)}%)
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge>{formatProgressState(row.lp?.state)}</Badge>
                <Badge className="border-[var(--border)] bg-transparent">
                  {formatLearnerLevel(row.learnerLevel)}
                </Badge>
                {row.educationalRole === "ADVANCED" ? (
                  <Badge className="border-amber-300 bg-amber-50 text-amber-900">
                    Advanced
                  </Badge>
                ) : null}
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
            {mastery.examPassed ? "Review assessment" : "Start assessment"}
          </Link>
        </Button>
        <p className="text-sm text-[var(--muted)]">
          {mastery.examPassed
            ? "Assessment complete"
            : "Complete the lessons and module assessment first."}
        </p>
      </div>
    </AppShell>
  );
}
