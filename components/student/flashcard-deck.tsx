"use client";

import { useMemo, useState, useTransition } from "react";
import { reviewFlashcard } from "@/actions/learning";
import { Button } from "@/components/ui/button";
import type { CardReview, Flashcard } from "@/lib/types/domain";

export function FlashcardDeck({
  cards,
  reviews,
}: {
  cards: Flashcard[];
  reviews: Record<string, CardReview>;
}) {
  const due = useMemo(() => {
    const now = Date.now();
    return cards.filter((c) => {
      const r = reviews[c.id];
      if (!r) return true;
      return new Date(r.dueAt).getTime() <= now;
    });
  }, [cards, reviews]);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [pending, startTransition] = useTransition();
  const card = due[index] ?? due[0];

  if (!card) {
    return (
      <p className="text-[var(--muted)]">
        No cards due. Spaced-repetition intervals will bring them back later.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <p className="text-sm text-[var(--muted)]">
        {due.length} due · SuperMemo-2 scheduling
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="animate-fade-up min-h-56 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-left shadow-[0_20px_60px_-40px_rgba(15,60,80,0.45)] transition-transform hover:-translate-y-0.5"
      >
        <p className="mb-2 text-xs uppercase tracking-wide text-[var(--muted)]">
          {flipped ? "Answer" : "Prompt"}
        </p>
        <p className="text-lg leading-8">{flipped ? card.back : card.front}</p>
      </button>
      <div className="flex flex-wrap gap-2">
        {[0, 1, 2, 3, 4, 5].map((q) => (
          <Button
            key={q}
            size="sm"
            variant={q < 3 ? "outline" : "secondary"}
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                await reviewFlashcard({ flashcardId: card.id, quality: q });
                setFlipped(false);
                setIndex((i) => (i + 1) % Math.max(due.length, 1));
              });
            }}
          >
            {q}
          </Button>
        ))}
      </div>
      <p className="text-xs text-[var(--muted)]">Rate recall quality 0 (blank) to 5 (perfect).</p>
    </div>
  );
}
