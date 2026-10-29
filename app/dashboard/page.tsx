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
  getClinicalCases,
  getNextLesson,
  getPhases,
} from "@/lib/curriculum/accessors";
import {
  featuredPresentationProblems,
  filterExistingProblemLinks,
  listClinicalProblems,
  pathwayLinkCounts,
  shouldFeaturePresentationPathways,
} from "@/lib/curriculum/clinical-problem-tags";
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

  const clerkshipModuleIds = modules
    .filter((m) => m.isCoreClerkship)
    .map((m) => m.id);
  const organModuleIds = [
    ...new Set(
      listClinicalProblems().flatMap((p) => p.relatedModuleIds),
    ),
  ];
  const featurePathways = shouldFeaturePresentationPathways({
    moduleProgress: state.moduleProgress,
    clerkshipModuleIds,
    organModuleIds,
  });
  const masteredModuleIds = new Set(
    modules
      .filter((m) => state.moduleProgress[m.id]?.state === "mastered")
      .map((m) => m.id),
  );
  const liveLessonIds = new Set(lessons.map((l) => l.id));
  const liveCaseIds = new Set(getClinicalCases().map((c) => c.id));
  const liveProblems = listClinicalProblems()
    .map((p) => filterExistingProblemLinks(p, liveLessonIds, liveCaseIds))
    .filter((p) => {
      const c = pathwayLinkCounts(p);
      return c.lessons + c.cases > 0;
    });
  const featuredProblems = featurePathways
    ? featuredPresentationProblems(liveProblems, masteredModuleIds, {
        forceAll: clerkshipModuleIds.some((id) => {
          const s = state.moduleProgress[id]?.state;
          return s === "in_progress" || s === "completed" || s === "mastered";
        }),
        limit: 6,
      })
    : [];

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
              <Link href="/qbank">{STUDENT_COPY.practiceQuestions}</Link>
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
            <Badge className={step1.unlocked ? "bg-emerald-50 text-emerald-800" : ""}>
              Step 1 question bank
              {step1.unlocked ? " · Available" : ""}
            </Badge>
            <Badge className={step2.unlocked ? "bg-emerald-50 text-emerald-800" : ""}>
              Step 2 CK question bank
              {step2.unlocked ? " · Available" : ""}
            </Badge>
          </div>
        </section>
      </div>

      {featurePathways && featuredProblems.length > 0 ? (
        <section className="mt-6 rounded-2xl border border-[var(--brand)]/30 bg-[var(--surface)] p-6">
          <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--brand-strong)]">
              {STUDENT_COPY.presentationsFeaturedEyebrow}
            </p>
            <Link
              href="/presentations"
              className="text-xs text-[var(--brand-strong)] underline"
            >
              {STUDENT_COPY.presentationsFeaturedCta}
            </Link>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl">
            {STUDENT_COPY.presentationsTitle}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
            {STUDENT_COPY.presentationsFeaturedBody}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProblems.map((p) => {
              const counts = pathwayLinkCounts(p);
              return (
                <Link
                  key={p.slug}
                  href={`/presentations/${p.slug}`}
                  className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--brand)]"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-medium">{p.title}</h3>
                    <Badge>
                      {counts.lessons}L · {counts.cases}C
                    </Badge>
                  </div>
                  <p className="line-clamp-2 text-xs leading-5 text-[var(--muted)]">
                    {p.summary}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section
        className={`mt-6 grid gap-6 ${featurePathways ? "lg:grid-cols-1" : "lg:grid-cols-2"}`}
      >
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
        {!featurePathways ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="mb-2 font-[family-name:var(--font-display)] text-lg">
              {STUDENT_COPY.presentationsTitle}
            </h2>
            <p className="mb-4 text-sm leading-6 text-[var(--muted)]">
              After you finish related organ-system modules—or once you enter
              Years 3–4—pathways like chest pain, shock, and AKI appear here with
              linked lessons and cases.
            </p>
            <Button asChild variant="secondary" size="sm">
              <Link href="/presentations">Browse presentations</Link>
            </Button>
          </div>
        ) : null}
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
