import { AppShell } from "@/components/shared/app-shell";
import { FlashcardDeck } from "@/components/student/flashcard-deck";
import { getAllFlashcards } from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";

export default async function FlashcardsPage() {
  const cards = await getAllFlashcards();
  const state = await readStudentState();
  return (
    <AppShell title="Flashcard review">
      <FlashcardDeck cards={cards} reviews={state.cardReviews} />
    </AppShell>
  );
}
