import { AppShell } from "@/components/shared/app-shell";
import { TutorChat } from "@/components/student/tutor-chat";
import { getAllLessons } from "@/lib/curriculum/accessors";

export default async function TutorPage() {
  const lessons = await getAllLessons();
  return (
    <AppShell
      title="Ask a question"
      description="Pick the lesson you’re studying, then ask one stuck point. Answers stay grounded in that lesson’s teaching—not free-floating advice."
    >
      <TutorChat
        lessons={lessons.map((l) => ({ id: l.id, title: l.title }))}
        initialLessonId="les-cv-1"
      />
    </AppShell>
  );
}
