import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { QuizRunner } from "@/components/student/quiz-runner";
import {
  getFormativeQuestionsLive,
  getLesson,
} from "@/lib/curriculum/accessors";

export default async function LessonQuizPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);
  if (!lesson) notFound();
  const questions = await getFormativeQuestionsLive(lessonId);

  return (
    <AppShell title={`Formative quiz · ${lesson.title}`}>
      <p className="mb-6 text-sm text-[var(--muted)]">
        Pass threshold {Math.round(lesson.quizPassThreshold * 100)}%. Combined with full content
        viewing, this unlocks lesson mastery.
      </p>
      <QuizRunner
        lessonId={lessonId}
        questions={questions}
        passThreshold={lesson.quizPassThreshold}
      />
    </AppShell>
  );
}
