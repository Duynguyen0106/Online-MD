import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import { LessonPlayer } from "@/components/student/lesson-player";
import {
  buildLessonMeta,
  formatLearnerLevel,
} from "@/lib/curriculum/content-metadata";
import {
  getLesson,
  getLessonBlocks,
  getModuleForLesson,
  getObjectivesForLesson,
  getPhaseForModule,
} from "@/lib/curriculum/accessors";
import { getMedicalReview } from "@/lib/demo/medical-review-store";
import { readStudentState } from "@/lib/demo/store";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);
  if (!lesson) notFound();
  const mod = await getModuleForLesson(lessonId);
  const phase = mod ? await getPhaseForModule(mod.id) : undefined;
  const blocks = getLessonBlocks(lesson);
  const objectives = getObjectivesForLesson(lessonId);
  const state = await readStudentState();
  const meta = buildLessonMeta({
    lessonId: lesson.id,
    moduleId: lesson.moduleId,
    title: lesson.title,
    phaseKind: phase?.phaseKind,
    isCoreClerkship: mod?.isCoreClerkship,
  });
  const review = await getMedicalReview(lessonId);
  const lastReviewed = review?.lastReviewed ?? meta.lastReviewed;
  const references = meta.references;

  return (
    <AppShell title={lesson.title}>
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge>{formatLearnerLevel(meta.learnerLevel)}</Badge>
        {meta.educationalRole ? (
          <Badge className="border-[var(--border)] bg-transparent">
            {meta.educationalRole.replaceAll("_", " ")}
          </Badge>
        ) : null}
      </div>
      {objectives.length > 0 ? (
        <section className="mb-6 max-w-3xl">
          <h2 className="mb-2 text-sm font-semibold text-[var(--brand-strong)]">
            What you’ll learn
          </h2>
          <p className="mb-2 text-sm text-[var(--muted)]">
            By the end of this lesson, you should be able to:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--foreground)]">
            {objectives.map((o) => (
              <li key={o.id}>{o.statement}</li>
            ))}
          </ul>
        </section>
      ) : null}
      <LessonPlayer
        lesson={lesson}
        blocks={blocks}
        progress={state.lessonProgress[lessonId]}
        moduleId={mod?.id ?? lesson.moduleId}
      />
      <section className="mt-8 max-w-3xl border-t border-[var(--border)] pt-4">
        <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Sources
        </h2>
        <ul className="space-y-1 text-xs leading-5 text-[var(--muted)]">
          {references.map((ref) => (
            <li key={ref.label}>
              {ref.citation ?? ref.label}
              {ref.status === "REFERENCE_REVIEW_REQUIRED"
                ? " — reference review required"
                : null}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-[var(--muted)]">
          Last reviewed: {lastReviewed ?? "not yet medically approved"}
        </p>
      </section>
    </AppShell>
  );
}
