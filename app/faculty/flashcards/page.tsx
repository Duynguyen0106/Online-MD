import { AppShell } from "@/components/shared/app-shell";
import { FlashcardEditor } from "@/components/faculty/flashcard-editor";
import { requireRole } from "@/lib/auth/require-role";
import { getAllLessons } from "@/lib/curriculum/accessors";
import { listFacultyFlashcards } from "@/lib/demo/admin-store";

export default async function FacultyFlashcardsPage() {
  await requireRole(["faculty", "admin"]);
  const [lessons, cards] = await Promise.all([
    getAllLessons(),
    listFacultyFlashcards(),
  ]);

  return (
    <AppShell title="Faculty flashcards">
      <p className="mb-6 text-sm text-[var(--muted)]">
        Create spaced-repetition cards tied to lessons. Cards appear in the student flashcard deck.
      </p>
      <FlashcardEditor
        cards={cards}
        lessons={lessons.map((l) => ({ id: l.id, title: l.title }))}
      />
    </AppShell>
  );
}
