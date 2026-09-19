"use client";

import { useMemo, useState, useTransition } from "react";
import { startQbankAttempt, submitQbankAttempt } from "@/actions/learning";
import { Button } from "@/components/ui/button";
import type { QbankQuestion } from "@/lib/types/domain";
import { cn, percent } from "@/lib/utils";

export function QbankPanel({
  modules,
  moduleGates,
  step1Reason,
  step2Reason,
  questionsPreview,
}: {
  modules: { id: string; title: string }[];
  moduleGates: Record<string, string | undefined>;
  step1Reason?: string;
  step2Reason?: string;
  questionsPreview: QbankQuestion[];
}) {
  const unlockedModules = useMemo(
    () => modules.filter((m) => !moduleGates[m.id]),
    [modules, moduleGates],
  );
  const [moduleId, setModuleId] = useState(unlockedModules[0]?.id ?? modules[0]?.id ?? "");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const activeQuestions = questionsPreview.filter((q) =>
    questionIds.length ? questionIds.includes(q.id) : false,
  );
  const selectedLocked = Boolean(moduleGates[moduleId]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <label className="text-sm">
          <span className="mb-1 block text-[var(--muted)]">Module bank</span>
          <select
            className="h-10 w-full max-w-md rounded-md border border-[var(--border)] px-3"
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
          >
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
                {moduleGates[m.id] ? " (locked)" : ""}
              </option>
            ))}
          </select>
        </label>
        <p className="mt-2 text-xs text-[var(--muted)]">
          {selectedLocked
            ? moduleGates[moduleId]
            : "Module mastered — assessment bank available"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <GateCard
          title="Module Qbank"
          reason={selectedLocked ? moduleGates[moduleId] : undefined}
          unlocked={!selectedLocked}
          onStart={() =>
            startTransition(async () => {
              setError(null);
              try {
                const res = await startQbankAttempt({
                  moduleId,
                  mode: "tutor",
                });
                setAttemptId(res.attemptId);
                setQuestionIds(res.questionIds);
                setScore(null);
                setResponses({});
              } catch (e) {
                setError(e instanceof Error ? e.message : "Locked");
              }
            })
          }
          pending={pending}
        />
        <GateCard
          title="Step 1 Qbank"
          reason={step1Reason}
          unlocked={!step1Reason}
          onStart={() =>
            startTransition(async () => {
              setError(null);
              try {
                const res = await startQbankAttempt({
                  usmleStep: "step1",
                  mode: "tutor",
                });
                setAttemptId(res.attemptId);
                setQuestionIds(res.questionIds);
                setScore(null);
                setResponses({});
              } catch (e) {
                setError(e instanceof Error ? e.message : "Locked");
              }
            })
          }
          pending={pending}
        />
        <GateCard
          title="Step 2 CK Qbank"
          reason={step2Reason}
          unlocked={!step2Reason}
          onStart={() =>
            startTransition(async () => {
              setError(null);
              try {
                const res = await startQbankAttempt({
                  usmleStep: "step2ck",
                  mode: "tutor",
                });
                setAttemptId(res.attemptId);
                setQuestionIds(res.questionIds);
                setScore(null);
                setResponses({});
              } catch (e) {
                setError(e instanceof Error ? e.message : "Locked");
              }
            })
          }
          pending={pending}
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
          {error}
        </div>
      ) : null}

      {attemptId ? (
        <div className="space-y-4">
          <h2 className="font-[family-name:var(--font-display)] text-xl">
            Assessment session
          </h2>
          {activeQuestions.map((q, i) => (
            <fieldset
              key={q.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <legend className="text-sm text-[var(--muted)]">Q{i + 1}</legend>
              <p className="mb-3 text-sm leading-7">{q.stem}</p>
              <div className="space-y-2">
                {q.choices.map((c) => (
                  <label
                    key={c.id}
                    className={cn(
                      "flex gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm",
                      responses[q.id] === c.id && "bg-[var(--brand-soft)]",
                    )}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={responses[q.id] === c.id}
                      onChange={() =>
                        setResponses((r) => ({ ...r, [q.id]: c.id }))
                      }
                    />
                    {c.text}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <Button
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                const res = await submitQbankAttempt({ attemptId, responses });
                setScore(res.score);
              });
            }}
          >
            Submit assessment
          </Button>
          {score !== null ? (
            <p className="text-sm">Session score {percent(score)}</p>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted)]">
          Qbank is an assessment layer. Master the related content first — gates are enforced in
          server actions, not only in the UI.
        </p>
      )}
    </div>
  );
}

function GateCard({
  title,
  reason,
  unlocked,
  onStart,
  pending,
}: {
  title: string;
  reason?: string;
  unlocked: boolean;
  onStart: () => void;
  pending: boolean;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 min-h-16 text-xs text-[var(--muted)]">
        {unlocked ? "Unlocked" : reason}
      </p>
      <Button
        className="mt-3"
        size="sm"
        disabled={!unlocked || pending}
        onClick={onStart}
      >
        {unlocked ? "Start" : "Locked"}
      </Button>
    </div>
  );
}
