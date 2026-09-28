import { AppShell } from "@/components/shared/app-shell";
import { FlashcardDeck } from "@/components/student/flashcard-deck";
import { getAllFlashcards } from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";

export default async function FlashcardsPage() {
  const cards = await getAllFlashcards();
  const state = await readStudentState();
  return (
    <AppShell title="Flashcards">
      <p className="-mt-4 mb-6 text-sm text-[var(--muted)]">
        Review key points from your lessons. Cards return when they’re due.
      </p>
      <FlashcardDeck cards={cards} reviews={state.cardReviews} />
    </AppShell>
  );
}
