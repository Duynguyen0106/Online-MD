import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
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
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();
  const objectives = getObjectivesForLesson(lessonId);

  return (
    <AppShell title={`Edit · ${lesson.title}`}>
      <p className="mb-4 text-sm text-[var(--muted)]">
        Demo editor view (read-only content source in <code>lib/curriculum/seed.ts</code>). Supabase
        CRUD + Zod forms land with production persistence.
      </p>
      <div className="space-y-4">
        {lesson.concepts.map((concept) => (
          <div
            key={concept.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <h2 className="font-medium">{concept.title}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{concept.summary}</p>
            <ul className="mt-3 space-y-2">
              {concept.blocks.map((block) => (
                <li key={block.id} className="flex flex-wrap items-center gap-2 text-sm">
                  <Badge>{block.blockType}</Badge>
                  <span>{block.title}</span>
                  {block.mediaUrl ? (
                    <span className="text-xs text-[var(--muted)]">{block.mediaUrl}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="mb-2 font-medium">Tagged objectives</h3>
        <ul className="space-y-2 text-sm">
          {objectives.map((o) => (
            <li key={o.id} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
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
