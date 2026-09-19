import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { Badge, ProgressBar } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllModules,
  getNextLesson,
  getPhases,
} from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";
import {
  canAccessStep1Qbank,
  canAccessStep2CkQbank,
} from "@/lib/mastery/gates";
import { percent } from "@/lib/utils";

export default async function DashboardPage() {
  const state = await readStudentState();
  const masteredLessons = new Set(
    Object.values(state.lessonProgress)
      .filter((p) => p.state === "mastered")
      .map((p) => p.lessonId),
  );
  const next = getNextLesson(masteredLessons);
  const phases = getPhases();
  const modules = getAllModules();
  const masteredModules = modules.filter(
    (m) => state.moduleProgress[m.id]?.state === "mastered",
  ).length;
  const step1 = canAccessStep1Qbank(state);
  const step2 = canAccessStep2CkQbank(state);

  return (
    <AppShell title="Student dashboard">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="animate-fade-up rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted)]">Continue learning</p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl">
            {next ? next.title : "Curriculum complete — assess with Qbank"}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Mastery rule: view every content block and score ≥80% on the formative quiz before a
            lesson is mastered.
          </p>
          {next ? (
            <Button asChild className="mt-5">
              <Link href={`/lessons/${next.id}`}>Open next lesson</Link>
            </Button>
          ) : (
            <Button asChild className="mt-5">
              <Link href="/qbank">Go to Qbank</Link>
            </Button>
          )}
        </section>
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted)]">Program progress</p>
          <p className="mt-2 text-3xl font-[family-name:var(--font-display)]">
            {masteredModules}/{modules.length}
          </p>
          <p className="text-sm text-[var(--muted)]">modules mastered</p>
          <div className="mt-4">
            <ProgressBar value={modules.length ? masteredModules / modules.length : 0} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className={step1.unlocked ? "bg-emerald-50 text-emerald-800" : ""}>
              Step 1 Qbank {step1.unlocked ? "unlocked" : "locked"}
            </Badge>
            <Badge className={step2.unlocked ? "bg-emerald-50 text-emerald-800" : ""}>
              Step 2 CK Qbank {step2.unlocked ? "unlocked" : "locked"}
            </Badge>
          </div>
        </section>
      </div>

      <div className="mt-10 space-y-8">
        {phases.map((phase) => (
          <section key={phase.id}>
            <h2 className="font-[family-name:var(--font-display)] text-2xl">{phase.name}</h2>
            <p className="mb-4 max-w-3xl text-sm text-[var(--muted)]">{phase.description}</p>
            <div className="grid gap-3 md:grid-cols-2">
              {phase.modules.map((mod) => {
                const mp = state.moduleProgress[mod.id];
                return (
                  <Link
                    key={mod.id}
                    href={`/modules/${mod.id}`}
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--brand)]"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h3 className="font-medium">{mod.title}</h3>
                      <Badge>{mp?.state ?? "not_started"}</Badge>
                    </div>
                    <p className="mb-3 text-sm text-[var(--muted)]">{mod.description}</p>
                    <ProgressBar value={mp?.percentComplete ?? 0} />
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      {percent(mp?.percentComplete ?? 0)} complete
                      {mod.isCoreClerkship ? " · core clerkship" : ""}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
