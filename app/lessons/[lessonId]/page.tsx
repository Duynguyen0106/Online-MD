import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { LessonPlayer } from "@/components/student/lesson-player";
import {
  getLesson,
  getLessonBlocks,
  getModuleForLesson,
  getObjectivesForLesson,
} from "@/lib/curriculum/accessors";
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
  const blocks = getLessonBlocks(lesson);
  const objectives = getObjectivesForLesson(lessonId);
  const state = await readStudentState();

  return (
    <AppShell title={lesson.title}>
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
    </AppShell>
  );
}
