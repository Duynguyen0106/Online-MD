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
  const [lessonId, setLessonId] = useState(initialLessonId ?? lessons[0]?.id);
  const [message, setMessage] = useState("");
  const [threadId, setThreadId] = useState<string | undefined>();
  const [log, setLog] = useState<{ role: string; content: string }[]>([]);
  const [pending, startTransition] = useTransition();
  const lessonTitle = useMemo(
    () => lessons.find((l) => l.id === lessonId)?.title,
    [lessons, lessonId],
  );

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
              Ask about mechanisms in <strong>{lessonTitle}</strong>. Responses are Zod-validated
              JSON from a medical-educator system prompt.
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
            disabled={pending || !message.trim()}
            onClick={() => {
              const msg = message.trim();
              setMessage("");
              setLog((l) => [...l, { role: "user", content: msg }]);
              startTransition(async () => {
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
              });
            }}
          >
            Send
          </Button>
        </div>
      </div>
      <aside className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
        <p className="mb-2 font-medium text-[var(--foreground)]">Expert posture</p>
        <ul className="list-disc space-y-2 pl-4">
          <li>Board-level medical educator system prompt</li>
          <li>Grounded in selected lesson context</li>
          <li>Uncertainty labeled; not real-patient advice</li>
          <li>Enable AI_ENABLED + AI_API_KEY for live model</li>
        </ul>
      </aside>
    </div>
  );
}
