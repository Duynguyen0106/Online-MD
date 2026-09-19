import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { Badge, ProgressBar } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLessonBlocks, getModule } from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";
import {
  canAccessModuleQbank,
  evaluateLessonMastery,
  evaluateModuleMastery,
} from "@/lib/mastery/gates";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = await getModule(moduleId);
  if (!mod) notFound();
  const state = await readStudentState();
  const mastery = await evaluateModuleMastery(moduleId, state);
  const qbank = await canAccessModuleQbank(state, moduleId);
  const mp = state.moduleProgress[moduleId];

  const checklist = await Promise.all(
    mod.lessons.map(async (lesson) => {
      const lp = state.lessonProgress[lesson.id];
      const blocks = getLessonBlocks(lesson);
      const viewed = new Set(lp?.viewedBlockIds ?? []);
      const evalLesson = await evaluateLessonMastery(lesson.id, lp);
      return {
        lesson,
        lp,
        blocksTotal: blocks.length,
        blocksViewed: blocks.filter((b) => viewed.has(b.id)).length,
        quizScore: lp?.lastFormativeScore,
        mastery: evalLesson,
      };
    }),
  );

  return (
    <AppShell title={mod.title}>
      <p className="mb-6 max-w-3xl text-[var(--muted)]">{mod.description}</p>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs text-[var(--muted)]">Module progress</p>
          <div className="mt-3">
            <ProgressBar value={mp?.percentComplete ?? 0} />
          </div>
          <Badge className="mt-3">{mp?.state ?? "not_started"}</Badge>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs text-[var(--muted)]">Mastery gate</p>
          <p className="mt-2 text-sm">{mastery.reason}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs text-[var(--muted)]">Module Qbank</p>
          <p className="mt-2 text-sm">
            {qbank.unlocked ? "Unlocked" : qbank.reason}
          </p>
          {qbank.unlocked ? (
            <Button asChild size="sm" className="mt-3">
              <Link href="/qbank">Open Qbank</Link>
            </Button>
          ) : (
            <Button size="sm" className="mt-3" disabled>
              Locked
            </Button>
          )}
        </div>
      </div>

      <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">
        Learning path checklist
      </h2>
      <div className="space-y-3">
        {checklist.map((row) => (
          <div
            key={row.lesson.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                href={`/lessons/${row.lesson.id}`}
                className="font-medium text-[var(--brand-strong)] hover:underline"
              >
                {row.lesson.title}
              </Link>
              <Badge>{row.lp?.state ?? "not_started"}</Badge>
            </div>
            <ul className="mt-2 space-y-1 text-xs text-[var(--muted)]">
              <li>
                {row.mastery.allBlocksViewed ? "✓" : "○"} Content blocks{" "}
                {row.blocksViewed}/{row.blocksTotal}
              </li>
              <li>
                {row.mastery.quizPass ? "✓" : "○"} Formative quiz{" "}
                {row.quizScore != null
                  ? `${Math.round(row.quizScore * 100)}%`
                  : "not attempted"}{" "}
                (need ≥{Math.round(row.lesson.quizPassThreshold * 100)}%)
              </li>
              <li>
                <Link
                  className="underline"
                  href={`/lessons/${row.lesson.id}/quiz`}
                >
                  Open quiz
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href={`/modules/${mod.id}/exam`}>Module exam</Link>
        </Button>
        <Badge>
          Exam {mastery.examPassed ? "passed" : "required after lessons"}
        </Badge>
      </div>
    </AppShell>
  );
}
