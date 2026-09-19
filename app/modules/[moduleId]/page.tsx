import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { Badge, ProgressBar } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getModule } from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";
import {
  canAccessModuleQbank,
  evaluateModuleMastery,
} from "@/lib/mastery/gates";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = getModule(moduleId);
  if (!mod) notFound();
  const state = await readStudentState();
  const mastery = evaluateModuleMastery(moduleId, state);
  const qbank = canAccessModuleQbank(state, moduleId);
  const mp = state.moduleProgress[moduleId];

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

      <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">Lessons</h2>
      <div className="space-y-3">
        {mod.lessons.map((lesson) => {
          const lp = state.lessonProgress[lesson.id];
          return (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 hover:border-[var(--brand)]"
            >
              <div>
                <p className="font-medium">{lesson.title}</p>
                <p className="text-xs text-[var(--muted)]">
                  ~{lesson.estimatedMinutes} min · {lesson.concepts.length} concepts
                </p>
              </div>
              <Badge>{lp?.state ?? "not_started"}</Badge>
            </Link>
          );
        })}
      </div>

      <div className="mt-8">
        <Button asChild>
          <Link href={`/modules/${mod.id}/exam`}>Module exam</Link>
        </Button>
      </div>
    </AppShell>
  );
}
