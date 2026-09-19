import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { LessonEditorForm } from "@/components/faculty/lesson-editor-form";
import { Badge } from "@/components/ui/badge";
import { getLesson, getObjectivesForLesson } from "@/lib/curriculum/accessors";
import { getSessionUser } from "@/lib/demo/store";

export default async function FacultyLessonEditorPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const user = await getSessionUser();
  if (user.role === "student") {
    return (
      <AppShell title="Lesson editor">
        <p className="text-sm text-[var(--muted)]">Faculty/admin only.</p>
      </AppShell>
    );
  }
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);
  if (!lesson) notFound();
  const objectives = getObjectivesForLesson(lessonId);

  return (
    <AppShell title={`Edit · ${lesson.title}`}>
      <p className="mb-4 text-sm text-[var(--muted)]">
        Zod-validated faculty editor. Saves to demo curriculum overrides (`.data/`) until Supabase
        content tables are connected.
      </p>
      <LessonEditorForm lesson={lesson} />
      <div className="mt-8">
        <h3 className="mb-2 font-medium">Tagged objectives</h3>
        <ul className="space-y-2 text-sm">
          {objectives.map((o) => (
            <li
              key={o.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3"
            >
              <span className="font-medium">{o.code}</span> — {o.statement}
              <div className="mt-1 flex flex-wrap gap-2">
                <Badge>{o.usmleStep}</Badge>
                <Badge>{o.organSystem}</Badge>
                <Badge>{o.physicianTask}</Badge>
                <Badge>{o.contentCategory}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
