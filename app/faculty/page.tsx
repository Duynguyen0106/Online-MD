import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { FacultyLibrary } from "@/components/faculty/faculty-library";
import { getObjectives, getPhases } from "@/lib/curriculum/accessors";
import { Badge } from "@/components/ui/badge";

export default async function FacultyPage() {
  const phases = await getPhases();
  const objectives = getObjectives();
  const library = phases.map((phase) => ({
    id: phase.id,
    name: phase.name,
    modules: phase.modules.map((mod) => ({
      id: mod.id,
      title: mod.title,
      status: mod.status,
      isCoreClerkship: mod.isCoreClerkship,
      lessons: mod.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        sequence: lesson.sequence,
        conceptCount: lesson.concepts.length,
        blockCount: lesson.concepts.reduce((n, c) => n + c.blocks.length, 0),
      })),
    })),
  }));

  return (
    <AppShell title="Faculty content library">
      <p className="mb-6 max-w-3xl text-sm text-[var(--muted)]">
        Curriculum mirrors integrated organ-system preclerkship + core clerkships. Open a lesson to
        edit content blocks, or manage{" "}
        <Link className="text-[var(--brand-strong)] underline" href="/faculty/flashcards">
          flashcards
        </Link>{" "}
        /{" "}
        <Link className="text-[var(--brand-strong)] underline" href="/faculty/questions">
          questions
        </Link>
        .
      </p>
      <FacultyLibrary phases={library} />

      <section className="mt-10">
        <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">
          Objectives ({objectives.length})
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] text-xs text-[var(--muted)]">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Statement</th>
                <th className="p-3">Step</th>
                <th className="p-3">Organ system</th>
                <th className="p-3">Task</th>
                <th className="p-3">Category</th>
              </tr>
            </thead>
            <tbody>
              {objectives.map((o) => (
                <tr key={o.id} className="border-b border-[var(--border)] align-top">
                  <td className="p-3 font-medium">{o.code}</td>
                  <td className="p-3">{o.statement}</td>
                  <td className="p-3">{o.usmleStep}</td>
                  <td className="p-3">{o.organSystem}</td>
                  <td className="p-3">{o.physicianTask}</td>
                  <td className="p-3">{o.contentCategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
