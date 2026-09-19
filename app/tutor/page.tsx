import { AppShell } from "@/components/shared/app-shell";
import { TutorChat } from "@/components/student/tutor-chat";

export default function TutorPage() {
  return (
    <AppShell title="Faculty AI tutor">
      <p className="mb-6 max-w-3xl text-sm text-[var(--muted)]">
        Expert medical-educator assistant grounded in curriculum context. Configure{" "}
        <code className="rounded bg-[var(--surface-2)] px-1">AI_ENABLED=true</code> and an API key
        for live model responses; offline mode still returns structured Zod-validated scaffolding.
      </p>
      <TutorChat lessonId="les-cv-1" />
    </AppShell>
  );
}
