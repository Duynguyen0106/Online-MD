"use client";

import { useMemo, useState, useTransition } from "react";
import { sendTutorMessage } from "@/actions/learning";
import { Button } from "@/components/ui/button";

export function TutorChat({
  lessons,
  initialLessonId,
}: {
  lessons: { id: string; title: string }[];
  initialLessonId?: string;
}) {
  const fallbackLessonId = lessons[0]?.id ?? "";
  const [lessonId, setLessonId] = useState(
    initialLessonId && lessons.some((l) => l.id === initialLessonId)
      ? initialLessonId
      : fallbackLessonId,
  );
  const [message, setMessage] = useState("");
  const [threadId, setThreadId] = useState<string | undefined>();
  const [log, setLog] = useState<{ role: string; content: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const lessonTitle = useMemo(
    () => lessons.find((l) => l.id === lessonId)?.title,
    [lessons, lessonId],
  );

  if (lessons.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="mb-2 font-[family-name:var(--font-display)] text-xl">
          No lessons available
        </h2>
        <p className="text-sm text-[var(--muted)]">
          The tutor needs a lesson to ground its answers. Open a module from your
          dashboard once lessons are published.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <label className="mb-3 block text-sm">
          <span className="mb-1 block text-[var(--muted)]">Anchor lesson</span>
          <select
            className="h-10 w-full rounded-md border border-[var(--border)] px-3"
            value={lessonId}
            onChange={(e) => {
              setLessonId(e.target.value);
              setThreadId(undefined);
              setLog([]);
              setError(null);
            }}
          >
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
        </label>
        <div className="mb-4 max-h-[480px] space-y-3 overflow-y-auto">
          {log.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              Ask a question about <strong>{lessonTitle}</strong>. Keep it focused on
              the mechanism or clinical point you’re stuck on.
            </p>
          ) : null}
          {log.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "ml-8 rounded-lg bg-[var(--brand-soft)] px-3 py-2 text-sm"
                  : "mr-8 whitespace-pre-wrap rounded-lg bg-[var(--surface-2)] px-3 py-2 text-sm"
              }
            >
              {m.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-20 flex-1 rounded-md border border-[var(--border)] bg-[var(--background)] p-3 text-sm"
            placeholder="e.g., Walk me through Winters formula with an example."
          />
          <Button
            disabled={pending || !message.trim() || !lessonId}
            onClick={() => {
              const msg = message.trim();
              setMessage("");
              setError(null);
              setLog((l) => [...l, { role: "user", content: msg }]);
              startTransition(async () => {
                try {
                  const res = await sendTutorMessage({
                    message: msg,
                    lessonId,
                    threadId,
                  });
                  setThreadId(res.threadId);
                  setLog((l) => [
                    ...l,
                    { role: "assistant", content: res.structured.reply },
                  ]);
                } catch (e) {
                  setError(
                    e instanceof Error
                      ? e.message
                      : "Could not get a reply. Try again.",
                  );
                }
              });
            }}
          >
            Send
          </Button>
        </div>
        {error ? (
          <p className="mt-3 text-sm text-amber-800" role="alert">
            {error}
          </p>
        ) : null}
      </div>
      <aside className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
        <p className="mb-2 font-medium text-[var(--foreground)]">How this helps</p>
        <ul className="list-disc space-y-2 pl-4">
          <li>Answers stay tied to the lesson you select</li>
          <li>Best for mechanisms, differentials, and “why not the other choice?”</li>
          <li>Educational only — not advice for a real patient</li>
          <li>If something is uncertain, the reply should say so</li>
        </ul>
      </aside>
    </div>
  );
}
