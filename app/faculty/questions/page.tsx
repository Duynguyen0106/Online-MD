import { AppShell } from "@/components/shared/app-shell";
import { QuestionEditor } from "@/components/faculty/question-editor";
import { requireRole } from "@/lib/auth/require-role";
import { getAllLessons } from "@/lib/curriculum/accessors";
import { listFacultyQuestions } from "@/lib/demo/admin-store";

export default async function FacultyQuestionsPage() {
  await requireRole(["faculty", "admin"]);
  const [lessons, questions] = await Promise.all([
    getAllLessons(),
    listFacultyQuestions(),
  ]);

  return (
    <AppShell title="Faculty question bank">
      <p className="mb-6 text-sm text-[var(--muted)]">
        Add formative items to lessons. Mark the correct choice with the radio. Zod-validated;
        appears on the student quiz immediately.
      </p>
      <QuestionEditor
        questions={questions}
        lessons={lessons.map((l) => ({ id: l.id, title: l.title }))}
      />
    </AppShell>
  );
}
