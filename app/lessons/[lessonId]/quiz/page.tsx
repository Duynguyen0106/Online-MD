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
    <AppShell title="Check your understanding">
      <p className="mb-2 text-sm text-[var(--muted)]">{lesson.title}</p>
      <p className="mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        Take this short quiz before moving on. Pass threshold:{" "}
        {Math.round(lesson.quizPassThreshold * 100)}%. Review the lesson sections first if you
        haven’t already.
      </p>
      <QuizRunner
        lessonId={lessonId}
        questions={questions}
        passThreshold={lesson.quizPassThreshold}
      />
    </AppShell>
  );
}
