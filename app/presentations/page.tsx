import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import {
  filterExistingProblemLinks,
  listClinicalProblems,
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
    .filter((p) => p.lessonIds.length + p.caseIds.length > 0);

  return (
    <AppShell title={STUDENT_COPY.presentationsTitle}>
      <p className="-mt-4 mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        {STUDENT_COPY.presentationsIntro}
      </p>
      {problems.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="mb-2 font-[family-name:var(--font-display)] text-xl">
            No presentations linked yet
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Presentation pathways appear when lessons or cases are tagged. Browse
            modules from your dashboard in the meantime.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {problems.map((p) => (
            <Link
              key={p.slug}
              href={`/presentations/${p.slug}`}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--brand)]"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="font-medium">{p.title}</h2>
                <Badge>
                  {p.lessonIds.length} lesson
                  {p.lessonIds.length === 1 ? "" : "s"}
                </Badge>
                {p.caseIds.length > 0 ? (
                  <Badge>
                    {p.caseIds.length} case
                    {p.caseIds.length === 1 ? "" : "s"}
                  </Badge>
                ) : null}
              </div>
              <p className="text-sm leading-6 text-[var(--muted)]">{p.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
