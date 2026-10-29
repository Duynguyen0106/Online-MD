import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import {
  filterExistingProblemLinks,
  listClinicalProblems,
  pathwayLinkCounts,
} from "@/lib/curriculum/clinical-problem-tags";
import {
  getAllLessons,
  getClinicalCases,
} from "@/lib/curriculum/accessors";
import { STUDENT_COPY } from "@/lib/copy/student";

export default async function PresentationsPage() {
  const lessons = await getAllLessons();
  const cases = getClinicalCases();
  const lessonIds = new Set(lessons.map((l) => l.id));
  const caseIds = new Set(cases.map((c) => c.id));
  const problems = listClinicalProblems()
    .map((p) => filterExistingProblemLinks(p, lessonIds, caseIds))
    .filter((p) => {
      const c = pathwayLinkCounts(p);
      return c.lessons + c.cases > 0;
    });

  return (
    <AppShell title={STUDENT_COPY.presentationsTitle}>
      <p className="-mt-4 mb-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        {STUDENT_COPY.presentationsIntro}
      </p>
      <p className="mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        {STUDENT_COPY.presentationsHowToBody}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {problems.map((p) => {
          const counts = pathwayLinkCounts(p);
          return (
            <Link
              key={p.slug}
              href={`/presentations/${p.slug}`}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--brand)]"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="font-medium">{p.title}</h2>
                <Badge>
                  {counts.lessons} lesson
                  {counts.lessons === 1 ? "" : "s"}
                </Badge>
                {counts.cases > 0 ? (
                  <Badge>
                    {counts.cases} case
                    {counts.cases === 1 ? "" : "s"}
                  </Badge>
                ) : null}
              </div>
              <p className="text-sm leading-6 text-[var(--muted)]">{p.summary}</p>
              <p className="mt-3 text-xs text-[var(--brand-strong)]">
                {p.foundationLessonIds.length} foundation ·{" "}
                {p.reasoningLessonIds.length} reasoning · {p.caseIds.length}{" "}
                case{p.caseIds.length === 1 ? "" : "s"}
              </p>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
