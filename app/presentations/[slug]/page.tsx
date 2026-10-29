import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { Button } from "@/components/ui/button";
import {
  PresentationCaseList,
  PresentationHowToUse,
  PresentationLessonList,
  type PathwayCaseRow,
  type PathwayLessonRow,
} from "@/components/student/presentation-pathway";
import {
  filterExistingProblemLinks,
  getClinicalProblem,
  pathwayLinkCounts,
  problemLessonIds,
} from "@/lib/curriculum/clinical-problem-tags";
import {
  getAllLessons,
  getClinicalCase,
  getClinicalCases,
  getLesson,
  getModuleForLesson,
} from "@/lib/curriculum/accessors";
import { STUDENT_COPY } from "@/lib/copy/student";

async function resolveLessonRows(
  ids: string[],
  role: "foundation" | "reasoning",
): Promise<PathwayLessonRow[]> {
  const rows = await Promise.all(
    ids.map(async (id) => {
      const lesson = await getLesson(id);
      if (!lesson) return null;
      const mod = await getModuleForLesson(id);
      return {
        id: lesson.id,
        title: lesson.title,
        moduleTitle: mod?.title ?? lesson.moduleId,
        role,
      } satisfies PathwayLessonRow;
    }),
  );
  return rows.filter((r): r is PathwayLessonRow => r != null);
}

export default async function PresentationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = getClinicalProblem(slug);
  if (!problem) notFound();

  const lessons = await getAllLessons();
  const cases = getClinicalCases();
  const filtered = filterExistingProblemLinks(
    problem,
    new Set(lessons.map((l) => l.id)),
    new Set(cases.map((c) => c.id)),
  );

  const counts = pathwayLinkCounts(filtered);
  if (counts.lessons + counts.cases === 0) notFound();

  const foundationRows = await resolveLessonRows(
    filtered.foundationLessonIds,
    "foundation",
  );
  const reasoningRows = await resolveLessonRows(
    filtered.reasoningLessonIds,
    "reasoning",
  );

  // Defensive: if a tagged ID somehow failed getLesson, still surface nothing broken.
  const resolvedLessonIds = new Set(
    [...foundationRows, ...reasoningRows].map((r) => r.id),
  );
  const missingTagged = problemLessonIds(filtered).filter(
    (id) => !resolvedLessonIds.has(id),
  );

  const caseRows: PathwayCaseRow[] = filtered.caseIds
    .map((id) => getClinicalCase(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({
      id: c.id,
      title: c.title,
      format: c.format,
    }));

  return (
    <AppShell title={filtered.title}>
      <p className="-mt-4 mb-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        {filtered.summary}
      </p>
      <p className="mb-4 text-xs text-[var(--muted)]">
        {STUDENT_COPY.presentationsDisclaimer}
      </p>
      <p className="mb-6 text-xs text-[var(--muted)]">
        {counts.lessons} linked lesson{counts.lessons === 1 ? "" : "s"} ·{" "}
        {counts.cases} clinical case{counts.cases === 1 ? "" : "s"}
      </p>

      <PresentationHowToUse />

      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/presentations">All presentations</Link>
        </Button>
      </div>

      <PresentationLessonList
        title="1. Foundational lessons"
        emptyLabel="No foundational lessons linked in the current curriculum graph."
        rows={foundationRows}
      />
      <PresentationLessonList
        title="2. Reasoning lessons"
        emptyLabel="No reasoning lessons linked in the current curriculum graph."
        rows={reasoningRows}
      />
      <PresentationCaseList rows={caseRows} />

      {missingTagged.length > 0 ? (
        <p className="mt-6 text-xs text-[var(--muted)]">
          Some tagged resources are temporarily unavailable:{" "}
          {missingTagged.join(", ")}.
        </p>
      ) : null}
    </AppShell>
  );
}
