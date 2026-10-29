import { AppShell } from "@/components/shared/app-shell";
import { TutorChat } from "@/components/student/tutor-chat";
import { getAllLessons } from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";

export default async function TutorPage() {
  const lessons = await getAllLessons();
  const published = lessons.filter((l) => l.status === "published");
  const state = await readStudentState();
  const recentLessonId = Object.values(state.lessonProgress)
    .filter((p) => p.updatedAt)
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))[0]
    ?.lessonId;
  const initialLessonId =
    (recentLessonId && published.some((l) => l.id === recentLessonId)
      ? recentLessonId
      : undefined) ?? published[0]?.id;

  return (
    <AppShell title="Ask a question">
      <p className="mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        Ask about a lesson when you need clarification. Answers are grounded in the selected
        lesson content.
      </p>
      <TutorChat
        lessons={published.map((l) => ({ id: l.id, title: l.title }))}
        initialLessonId={initialLessonId}
      />
    </AppShell>
  );
}
