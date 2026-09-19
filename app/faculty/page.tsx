import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import { getObjectives, getPhases } from "@/lib/curriculum/accessors";

export default async function FacultyPage() {
  const phases = await getPhases();
  const objectives = getObjectives();

  return (
    <AppShell title="Faculty content library">
      <p className="mb-6 max-w-3xl text-sm text-[var(--muted)]">
        Curriculum mirrors integrated organ-system preclerkship + core clerkships. Open a lesson to
        edit content blocks, or manage{" "}
        <Link className="text-[var(--brand-strong)] underline" href="/faculty/flashcards">
          flashcards
        </Link>
        .
      </p>
      <div className="space-y-8">
        {phases.map((phase) => (
          <section key={phase.id}>
            <h2 className="font-[family-name:var(--font-display)] text-2xl">{phase.name}</h2>
            <div className="mt-3 space-y-3">
              {phase.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-medium">{mod.title}</h3>
                    <Badge>{mod.status}</Badge>
                    {mod.isCoreClerkship ? <Badge>core clerkship</Badge> : null}
                  </div>
                  <ul className="space-y-1 text-sm text-[var(--muted)]">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <Link
                          className="text-[var(--brand-strong)] hover:underline"
                          href={`/faculty/lessons/${lesson.id}`}
                        >
                          {lesson.sequence}. {lesson.title}
                        </Link>{" "}
                        · {lesson.concepts.length} concepts ·{" "}
                        {lesson.concepts.reduce((n, c) => n + c.blocks.length, 0)} blocks
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

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
