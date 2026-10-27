import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { FacultyLibrary } from "@/components/faculty/faculty-library";
import { ObjectivesTable } from "@/components/faculty/objectives-table";
import { getObjectives, getPhases } from "@/lib/curriculum/accessors";

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
        edit content blocks, manage{" "}
        <Link className="text-[var(--brand-strong)] underline" href="/faculty/flashcards">
          flashcards
        </Link>{" "}
        /{" "}
        <Link className="text-[var(--brand-strong)] underline" href="/faculty/questions">
          questions
        </Link>
        , or open the{" "}
        <Link className="text-[var(--brand-strong)] underline" href="/faculty/medical-review">
          medical content review
        </Link>{" "}
        queue.
      </p>
      <FacultyLibrary phases={library} />

      <section className="mt-10">
        <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">
          Objectives ({objectives.length})
        </h2>
        <ObjectivesTable
          rows={objectives.map((o) => ({
            id: o.id,
            code: o.code,
            statement: o.statement,
            usmleStep: o.usmleStep,
            organSystem: o.organSystem,
            physicianTask: o.physicianTask,
            contentCategory: o.contentCategory,
            moduleId: o.moduleId,
          }))}
        />
      </section>
    </AppShell>
  );
}
