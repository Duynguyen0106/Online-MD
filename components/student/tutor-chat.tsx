"use client";

import { useMemo, useState, useTransition } from "react";
import { sendTutorMessage } from "@/actions/learning";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/card";

const STARTERS = [
  "Explain the core mechanism in one paragraph.",
  "What bedside finding would falsify this pathway?",
  "Name the can’t-miss mimic and why.",
  "Walk me through first-line thinking without doses.",
];

export function TutorChat({
  lessons,
  initialLessonId,
}: {
  lessons: { id: string; title: string }[];
  initialLessonId?: string;
}) {
  const [lessonId, setLessonId] = useState(initialLessonId ?? lessons[0]?.id);
  const [lessonQuery, setLessonQuery] = useState("");
  const [message, setMessage] = useState("");
  const [threadId, setThreadId] = useState<string | undefined>();
  const [log, setLog] = useState<{ role: string; content: string }[]>([]);
  const [pending, startTransition] = useTransition();

  const filteredLessons = useMemo(() => {
    const q = lessonQuery.trim().toLowerCase();
    if (!q) return lessons.slice(0, 80);
    return lessons
      .filter((l) => l.title.toLowerCase().includes(q) || l.id.includes(q))
      .slice(0, 80);
  }, [lessons, lessonQuery]);

  const lessonTitle = useMemo(
    () => lessons.find((l) => l.id === lessonId)?.title,
    [lessons, lessonId],
  );

  function send(msg: string) {
    const trimmed = msg.trim();
    if (!trimmed || !lessonId) return;
    setMessage("");
    setLog((l) => [...l, { role: "user", content: trimmed }]);
    startTransition(async () => {
      const res = await sendTutorMessage({
        message: trimmed,
        lessonId,
        threadId,
      });
      setThreadId(res.threadId);
      setLog((l) => [
        ...l,
        { role: "assistant", content: res.structured.reply },
      ]);
    });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
      <SurfaceCard className="flex min-h-[32rem] flex-col p-4 md:p-5">
        <div className="mb-4 space-y-2">
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--muted)]">
              Find a lesson to anchor
            </span>
            <input
              type="search"
              value={lessonQuery}
              onChange={(e) => setLessonQuery(e.target.value)}
              placeholder="Search by lesson title…"
              className="field-control mb-2"
              aria-label="Filter lessons"
            />
            <select
              className="field-control"
              value={lessonId}
              onChange={(e) => {
                setLessonId(e.target.value);
                setThreadId(undefined);
                setLog([]);
              }}
            >
              {filteredLessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-[var(--muted)]">
            Showing {filteredLessons.length}
            {lessonQuery.trim() ? " matches" : " recent options"} · answers stay
            tied to <span className="font-medium text-[var(--foreground)]">{lessonTitle}</span>
          </p>
        </div>

        <div className="mb-4 min-h-0 flex-1 space-y-3 overflow-y-auto rounded-xl bg-[var(--background)]/60 p-3">
          {log.length === 0 ? (
            <div className="space-y-4 py-2">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">
                  Stuck on a mechanism or clinical branch?
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                  Ask one focused question about{" "}
                  <strong className="text-[var(--foreground)]">{lessonTitle}</strong>.
                  Prefer “why” and “what would change management” over laundry lists.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-xs leading-5 text-[var(--foreground)] transition hover:border-[var(--brand)]"
                    onClick={() => send(s)}
                    disabled={pending}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {log.map((m, i) => (
            <div
              key={`${m.role}-${i}`}
              className={
                m.role === "user"
                  ? "ml-4 rounded-xl bg-[var(--brand-soft)] px-3 py-2 text-sm leading-6 md:ml-10"
                  : "mr-4 whitespace-pre-wrap rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm leading-6 md:mr-10"
              }
            >
              {m.content}
            </div>
          ))}
          {pending ? (
            <p className="text-xs text-[var(--muted)]" aria-live="polite">
              Thinking through the lesson context…
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <label className="block flex-1 text-sm">
            <span className="sr-only">Your question</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(message);
                }
              }}
              className="field-control min-h-24"
              placeholder="e.g., Why does AF raise mesenteric embolism risk?"
            />
          </label>
          <Button
            className="sm:mb-0.5"
            disabled={pending || !message.trim()}
            onClick={() => send(message)}
          >
            Send
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-[var(--muted)]">
          Enter to send · Shift+Enter for a new line · Educational tutor, not patient advice
        </p>
      </SurfaceCard>

      <aside className="h-fit space-y-3 lg:sticky lg:top-20">
        <SurfaceCard className="p-4 text-sm leading-6 text-[var(--muted)]">
          <p className="mb-2 font-medium text-[var(--foreground)]">How to get a good answer</p>
          <ul className="list-disc space-y-2 pl-4">
            <li>Pick the lesson you’re studying first</li>
            <li>Ask one stuck point, not the whole chapter</li>
            <li>Request a teach-back or a can’t-miss differential</li>
            <li>Verify numbers and regimens with primary sources</li>
          </ul>
        </SurfaceCard>
        <SurfaceCard className="p-4 text-xs leading-5 text-[var(--muted)]">
          Responses are grounded in the selected lesson. Uncertainty is labeled when the tutor is unsure.
        </SurfaceCard>
      </aside>
    </div>
  );
}
