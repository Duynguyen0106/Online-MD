import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { Badge, ProgressBar } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResetProgressButton } from "@/components/student/reset-progress-button";
import {
  STUDENT_COPY,
  formatProgressState,
  lessonActionLabel,
  moduleDescription,
} from "@/lib/copy/student";
import {
  buildCompetencyMatrix,
  topCompetencyGaps,
} from "@/lib/competency/aggregate";
import { COMPETENCY_DOMAIN_LABELS } from "@/lib/competency/domains";
import {
  getAllLessons,
  getAllModules,
  getNextLesson,
  getPhases,
} from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";
import {
  canAccessStep1Qbank,
  canAccessStep2CkQbank,
} from "@/lib/mastery/gates";
import { PRACTICE_ROUTES, qbankHref } from "@/lib/routes/practice";
import { percent } from "@/lib/utils";

export default async function DashboardPage() {
  const state = await readStudentState();
  const masteredLessons = new Set(
    Object.values(state.lessonProgress)
      .filter((p) => p.state === "mastered")
      .map((p) => p.lessonId),
  );
  const lessons = await getAllLessons();
  const next = getNextLesson(lessons, masteredLessons);
  const phases = await getPhases();
  const modules = await getAllModules();
  const completedModules = modules.filter(
    (m) => state.moduleProgress[m.id]?.state === "mastered",
  ).length;
  const step1 = await canAccessStep1Qbank(state);
  const step2 = await canAccessStep2CkQbank(state);
  const nextProgress = next ? state.lessonProgress[next.id] : undefined;
  const nextSummary =
    next?.concepts[0]?.summary ?? STUDENT_COPY.continueSupporting;
  const competencyRows = await buildCompetencyMatrix(state);
  const gaps = topCompetencyGaps(competencyRows, 3);

  return (
    <AppShell title="Your learning dashboard">
      <p className="-mt-4 mb-6 text-[var(--muted)]">
        Keep going from where you left off.
      </p>
      <div className="mb-4 flex justify-end">
        <ResetProgressButton />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="animate-fade-up rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted)]">{STUDENT_COPY.continueLearning}</p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl">
            {next ? next.title : "Curriculum complete"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            {next ? nextSummary : STUDENT_COPY.curriculumComplete}
          </p>
          {next ? (
            <Button asChild className="mt-5">
              <Link href={`/lessons/${next.id}`}>
                {lessonActionLabel(nextProgress?.state)}
              </Link>
            </Button>
          ) : (
            <Button asChild className="mt-5">
              <Link href={PRACTICE_ROUTES.qbank}>
                {STUDENT_COPY.practiceQuestions}
              </Link>
            </Button>
          )}
        </section>
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--muted)]">Your progress</p>
          <p className="mt-2 text-3xl font-[family-name:var(--font-display)]">
            {completedModules} of {modules.length}
          </p>
          <p className="text-sm text-[var(--muted)]">modules completed</p>
          <div className="mt-4">
            <ProgressBar value={modules.length ? completedModules / modules.length : 0} />
          </div>
          <p className="mt-2 text-xs text-[var(--muted)]">
            {percent(modules.length ? completedModules / modules.length : 0)} complete
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={qbankHref("step1")}
              className="inline-flex"
              aria-label="Open Step 1 question bank"
            >
              <Badge
                className={
                  step1.unlocked
                    ? "bg-emerald-50 text-emerald-800 hover:ring-1 hover:ring-emerald-300"
                    : "hover:ring-1 hover:ring-[var(--border)]"
                }
              >
                Step 1 question bank
                {step1.unlocked ? " · Available" : ""}
              </Badge>
            </Link>
            <Link
              href={qbankHref("step2ck")}
              className="inline-flex"
              aria-label="Open Step 2 CK question bank"
            >
              <Badge
                className={
                  step2.unlocked
                    ? "bg-emerald-50 text-emerald-800 hover:ring-1 hover:ring-emerald-300"
                    : "hover:ring-1 hover:ring-[var(--border)]"
                }
              >
                Step 2 CK question bank
                {step2.unlocked ? " · Available" : ""}
              </Badge>
            </Link>
          </div>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Opens the question bank at{" "}
            <Link className="underline" href={PRACTICE_ROUTES.qbank}>
              /qbank
            </Link>
            . Banks unlock after you finish the related curriculum.
          </p>
        </section>
      </div>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="font-[family-name:var(--font-display)] text-lg">
              {STUDENT_COPY.competencyWidgetTitle}
            </h2>
            <Link
              href="/competency"
              className="text-xs text-[var(--brand-strong)] underline"
            >
              {STUDENT_COPY.competencyViewMap}
            </Link>
          </div>
          <p className="mb-3 text-xs text-[var(--muted)]">
            {STUDENT_COPY.competencyDisclaimer}
          </p>
          {gaps.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              Complete a few lessons to see suggested focus areas.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {gaps.map((g) => (
                <li key={`${g.moduleId}-${g.domain}`} className="flex flex-wrap gap-2">
                  <Badge>{COMPETENCY_DOMAIN_LABELS[g.domain]}</Badge>
                  <span>{g.moduleTitle}</span>
                  {g.nextLessonId ? (
                    <Link
                      className="text-[var(--brand-strong)] underline"
                      href={`/lessons/${g.nextLessonId}`}
                    >
                      Continue
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="mb-2 font-[family-name:var(--font-display)] text-lg">
            {STUDENT_COPY.presentationsTitle}
          </h2>
          <p className="mb-4 text-sm leading-6 text-[var(--muted)]">
            Jump into clerkship reasoning by clinical presentation — chest pain,
            shock, AKI, and more — using lessons and cases already in the curriculum.
          </p>
          <Button asChild variant="secondary" size="sm">
            <Link href="/presentations">Browse presentations</Link>
          </Button>
        </div>
      </section>

      <div className="mt-10 space-y-10">
        {phases.map((phase) => (
          <section key={phase.id}>
            <h2 className="font-[family-name:var(--font-display)] text-2xl">{phase.name}</h2>
            <p className="mb-4 max-w-3xl text-sm leading-6 text-[var(--muted)]">
              {phase.description}
            </p>
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
                      <Badge>{formatProgressState(mp?.state)}</Badge>
                    </div>
                    <p className="mb-3 text-sm text-[var(--muted)]">
                      {moduleDescription(mod.id, mod.description)}
                    </p>
                    <ProgressBar value={mp?.percentComplete ?? 0} />
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      {percent(mp?.percentComplete ?? 0)} complete
                      {mod.isCoreClerkship ? " · clinical rotation" : ""}
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
