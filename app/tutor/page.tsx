import { AppShell } from "@/components/shared/app-shell";
import { TutorChat } from "@/components/student/tutor-chat";
import { getAllLessons } from "@/lib/curriculum/accessors";

export default async function TutorPage() {
  const lessons = await getAllLessons();
  return (
    <AppShell title="Faculty AI tutor">
      <p className="mb-6 max-w-3xl text-sm text-[var(--muted)]">
        Expert medical-educator assistant grounded in the selected lesson. Configure{" "}
        <code className="rounded bg-[var(--surface-2)] px-1">AI_ENABLED=true</code> and an API key
        for live model responses; offline mode still returns structured Zod-validated scaffolding.
      </p>
      <TutorChat
        lessons={lessons.map((l) => ({ id: l.id, title: l.title }))}
        initialLessonId="les-cv-1"
      />
    </AppShell>
  );
}
