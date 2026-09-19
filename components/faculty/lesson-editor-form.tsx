"use client";

import { useState, useTransition } from "react";
import { saveFacultyLesson } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import type { Concept, Lesson } from "@/lib/types/domain";

export function LessonEditorForm({ lesson }: { lesson: Lesson }) {
  const [title, setTitle] = useState(lesson.title);
  const [minutes, setMinutes] = useState(lesson.estimatedMinutes);
  const [threshold, setThreshold] = useState(lesson.quizPassThreshold);
  const [concepts, setConcepts] = useState<Concept[]>(
    structuredClone(lesson.concepts),
  );
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function updateBlock(
    conceptIdx: number,
    blockIdx: number,
    patch: Partial<Concept["blocks"][number]>,
  ) {
    setConcepts((prev) => {
      const next = structuredClone(prev);
      next[conceptIdx].blocks[blockIdx] = {
        ...next[conceptIdx].blocks[blockIdx],
        ...patch,
      };
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm md:col-span-2">
          <span className="mb-1 block text-[var(--muted)]">Title</span>
          <input
            className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-[var(--muted)]">Minutes</span>
          <input
            type="number"
            className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-[var(--muted)]">Quiz pass threshold</span>
          <input
            type="number"
            step="0.05"
            min="0.5"
            max="1"
            className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </label>
      </div>

      {concepts.map((concept, ci) => (
        <section
          key={concept.id}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
        >
          <label className="mb-2 block text-sm">
            <span className="mb-1 block text-[var(--muted)]">Concept title</span>
            <input
              className="h-10 w-full rounded-md border border-[var(--border)] px-3"
              value={concept.title}
              onChange={(e) => {
                const v = e.target.value;
                setConcepts((prev) => {
                  const next = structuredClone(prev);
                  next[ci].title = v;
                  return next;
                });
              }}
            />
          </label>
          <label className="mb-4 block text-sm">
            <span className="mb-1 block text-[var(--muted)]">Summary</span>
            <textarea
              className="min-h-20 w-full rounded-md border border-[var(--border)] px-3 py-2"
              value={concept.summary}
              onChange={(e) => {
                const v = e.target.value;
                setConcepts((prev) => {
                  const next = structuredClone(prev);
                  next[ci].summary = v;
                  return next;
                });
              }}
            />
          </label>
          <div className="space-y-4">
            {concept.blocks.map((block, bi) => (
              <div
                key={block.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
              >
                <div className="mb-2 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                  <span>{block.blockType}</span>
                  <span>{block.id}</span>
                </div>
                <input
                  className="mb-2 h-9 w-full rounded-md border border-[var(--border)] px-3 text-sm"
                  value={block.title}
                  onChange={(e) =>
                    updateBlock(ci, bi, { title: e.target.value })
                  }
                />
                {block.mediaUrl !== undefined || block.blockType === "video" ? (
                  <input
                    className="mb-2 h-9 w-full rounded-md border border-[var(--border)] px-3 text-sm"
                    placeholder="Media URL"
                    value={block.mediaUrl ?? ""}
                    onChange={(e) =>
                      updateBlock(ci, bi, { mediaUrl: e.target.value })
                    }
                  />
                ) : null}
                <textarea
                  className="min-h-28 w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
                  placeholder="Markdown body"
                  value={block.bodyMd ?? ""}
                  onChange={(e) =>
                    updateBlock(ci, bi, { bodyMd: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex items-center gap-3">
        <Button
          disabled={pending}
          onClick={() => {
            setMessage(null);
            startTransition(async () => {
              try {
                await saveFacultyLesson({
                  lessonId: lesson.id,
                  title,
                  estimatedMinutes: minutes,
                  quizPassThreshold: threshold,
                  concepts,
                });
                setMessage("Saved. Students will see the updated lesson.");
              } catch (e) {
                setMessage(e instanceof Error ? e.message : "Save failed");
              }
            });
          }}
        >
          Save lesson
        </Button>
        {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
      </div>
    </div>
  );
}
