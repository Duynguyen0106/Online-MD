"use client";

import { useState, useTransition } from "react";
import { removeFacultyQuestion, saveFacultyQuestion } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import type { FacultyQuestion } from "@/lib/demo/admin-store";
import { newId } from "@/lib/demo/ids";

export function QuestionEditor({
  questions,
  lessons,
}: {
  questions: FacultyQuestion[];
  lessons: { id: string; title: string }[];
}) {
  const [lessonId, setLessonId] = useState(lessons[0]?.id ?? "");
  const [stem, setStem] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState("");
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
              const ids = [0, 1, 2, 3].map((i) => newId(`c${i}`));
              await saveFacultyQuestion({
                lessonId,
                stem,
                choices: choices.map((text, i) => ({ id: ids[i], text })),
                correctIndex,
                explanation,
              });
              setStem("");
              setChoices(["", "", "", ""]);
              setExplanation("");
              setMessage("Question saved to formative bank");
            } catch (err) {
              setMessage(err instanceof Error ? err.message : "Save failed");
            }
          });
        }}
      >
        <h2 className="font-medium">New formative question</h2>
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
          <span className="mb-1 block text-[var(--muted)]">Stem</span>
          <textarea
            className="min-h-24 w-full rounded-md border border-[var(--border)] px-3 py-2"
            value={stem}
            onChange={(e) => setStem(e.target.value)}
            required
          />
        </label>
        {choices.map((c, i) => (
          <label key={i} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="correct"
              checked={correctIndex === i}
              onChange={() => setCorrectIndex(i)}
            />
            <input
              className="h-9 flex-1 rounded-md border border-[var(--border)] px-3"
              placeholder={`Choice ${i + 1}`}
              value={c}
              onChange={(e) => {
                const next = [...choices];
                next[i] = e.target.value;
                setChoices(next);
              }}
              required
            />
          </label>
        ))}
        <label className="block text-sm">
          <span className="mb-1 block text-[var(--muted)]">Explanation</span>
          <textarea
            className="min-h-20 w-full rounded-md border border-[var(--border)] px-3 py-2"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            required
          />
        </label>
        <Button type="submit" disabled={pending}>
          Save question
        </Button>
        {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
      </form>

      <div className="space-y-2">
        {questions.map((q) => (
          <div
            key={q.id}
            className="flex items-start justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="text-sm">
              <p className="font-medium">{q.stem}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{q.lessonId}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => {
                startTransition(async () => {
                  await removeFacultyQuestion(q.id);
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
