"use client";

import { useState, useTransition } from "react";
import {
  removeFacultyFlashcard,
  saveFacultyFlashcard,
} from "@/actions/admin";
import { Button } from "@/components/ui/button";
import type { FacultyFlashcard } from "@/lib/demo/admin-store";

export function FlashcardEditor({
  cards,
  lessons,
}: {
  cards: FacultyFlashcard[];
  lessons: { id: string; title: string }[];
}) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [lessonId, setLessonId] = useState(lessons[0]?.id ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <form
        className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
        onSubmit={(e) => {
          e.preventDefault();
          setMessage(null);
          startTransition(async () => {
            try {
              await saveFacultyFlashcard({ front, back, lessonId });
              setFront("");
              setBack("");
              setMessage("Flashcard saved");
            } catch (err) {
              setMessage(err instanceof Error ? err.message : "Save failed");
            }
          });
        }}
      >
        <h2 className="font-medium">New flashcard</h2>
        <label className="block text-sm">
          <span className="mb-1 block text-[var(--muted)]">Lesson</span>
          <select
            className="h-10 w-full rounded-md border border-[var(--border)] px-3"
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
          >
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-[var(--muted)]">Front</span>
          <input
            className="h-10 w-full rounded-md border border-[var(--border)] px-3"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-[var(--muted)]">Back</span>
          <textarea
            className="min-h-24 w-full rounded-md border border-[var(--border)] px-3 py-2"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          />
        </label>
        <Button type="submit" disabled={pending}>
          Save card
        </Button>
        {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
      </form>

      <div className="space-y-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-start justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="text-sm">
              <p className="font-medium">{card.front}</p>
              <p className="mt-1 text-[var(--muted)]">{card.back}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{card.lessonId}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => {
                startTransition(async () => {
                  await removeFacultyFlashcard(card.id);
                });
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
