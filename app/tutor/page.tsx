import { AppShell } from "@/components/shared/app-shell";
import { TutorChat } from "@/components/student/tutor-chat";
import { getAllLessons } from "@/lib/curriculum/accessors";

export default async function TutorPage() {
  const lessons = await getAllLessons();
  return (
    <AppShell title="Ask a question">
      <p className="mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        Ask about a lesson when you need clarification. Answers are grounded in the selected
        lesson content.
      </p>
      <TutorChat
        lessons={lessons.map((l) => ({ id: l.id, title: l.title }))}
        initialLessonId="les-cv-1"
      />
    </AppShell>
  );
}
