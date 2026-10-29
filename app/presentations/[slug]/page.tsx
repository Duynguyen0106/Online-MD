import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  filterExistingProblemLinks,
  getClinicalProblem,
} from "@/lib/curriculum/clinical-problem-tags";
import {
  getAllFlashcards,
  getAllLessons,
  getClinicalCase,
  getClinicalCases,
  getLesson,
  getModuleForLesson,
} from "@/lib/curriculum/accessors";
import { STUDENT_COPY } from "@/lib/copy/student";

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

  const lessonRows = await Promise.all(
    filtered.lessonIds.map(async (id) => {
      const lesson = await getLesson(id);
      const mod = await getModuleForLesson(id);
      return lesson
        ? { lesson, moduleTitle: mod?.title ?? lesson.moduleId }
        : null;
    }),
  );

  const caseRows = filtered.caseIds
    .map((id) => getClinicalCase(id))
    .filter(Boolean);

  const lessonIdSet = new Set(filtered.lessonIds);
  const allCards = await getAllFlashcards();
  const pathwayCards = allCards
    .filter((c) => c.lessonId && lessonIdSet.has(c.lessonId))
    .slice(0, 8);
  const practiceLessonId = filtered.lessonIds[0];

  return (
    <AppShell title={filtered.title}>
      <p className="-mt-4 mb-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        {filtered.summary}
      </p>
      <p className="mb-6 text-xs text-[var(--muted)]">
        {STUDENT_COPY.presentationsDisclaimer}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/presentations">All presentations</Link>
        </Button>
        {practiceLessonId ? (
          <Button asChild size="sm">
            <Link href={`/lessons/${practiceLessonId}/quiz`}>
              Practice this pathway
            </Link>
          </Button>
        ) : null}
        <Button asChild variant="secondary" size="sm">
          <Link href="/flashcards">Open flashcards</Link>
        </Button>
      </div>

      <section className="mb-8">
        <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">
          Lessons
        </h2>
        {lessonRows.filter(Boolean).length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            No linked lessons yet for this presentation. Check Clinical cases below,
            or browse the module list from your dashboard.
          </p>
        ) : (
          <ul className="space-y-2">
            {lessonRows.map((row) =>
              row ? (
                <li
                  key={row.lesson.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
                >
                  <Link
                    href={`/lessons/${row.lesson.id}`}
                    className="font-medium text-[var(--brand-strong)] hover:underline"
                  >
                    {row.lesson.title}
                  </Link>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {row.moduleTitle}
                  </p>
                </li>
              ) : null,
            )}
          </ul>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">
          Clinical cases
        </h2>
        {caseRows.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            No linked cases yet for this presentation.
          </p>
        ) : (
          <ul className="space-y-2">
            {caseRows.map((c) =>
              c ? (
                <li
                  key={c.id}
                  className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
                >
                  <Link
                    href={`/cases/${c.id}`}
                    className="font-medium text-[var(--brand-strong)] hover:underline"
                  >
                    {c.title}
                  </Link>
                  <Badge>Case</Badge>
                </li>
              ) : null,
            )}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">
          Study set
        </h2>
        {pathwayCards.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            Flashcards for linked lessons will appear here as cards are published.
            Use Practice this pathway for a short quiz from the first linked lesson.
          </p>
        ) : (
          <ul className="space-y-2">
            {pathwayCards.map((card) => (
              <li
                key={card.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
              >
                <p className="text-sm font-medium">{card.front}</p>
                <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">
                  {card.back}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppShell>
  );
}
