"use client";

import { useState, useTransition } from "react";
import { sendTutorMessage } from "@/actions/learning";
import { Button } from "@/components/ui/button";

export function TutorChat({ lessonId }: { lessonId?: string }) {
  const [message, setMessage] = useState("");
  const [threadId, setThreadId] = useState<string | undefined>();
  const [log, setLog] = useState<{ role: string; content: string }[]>([]);
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="mb-4 max-h-[480px] space-y-3 overflow-y-auto">
          {log.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              Ask the Faculty AI tutor about mechanisms, differentials, or how this lesson maps to
              USMLE tasks. Responses are Zod-validated JSON from a medical-educator system prompt.
            </p>
          ) : null}
          {log.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "ml-8 rounded-lg bg-[var(--brand-soft)] px-3 py-2 text-sm"
                  : "mr-8 rounded-lg bg-[var(--surface-2)] px-3 py-2 text-sm whitespace-pre-wrap"
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
            placeholder="e.g., Why does inferior STEMI often implicate the RCA?"
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
          <li>Grounded in loaded curriculum context</li>
          <li>Uncertainty labeled; not real-patient advice</li>
          <li>Enable AI_ENABLED + AI_API_KEY for live model</li>
        </ul>
      </aside>
    </div>
  );
}
