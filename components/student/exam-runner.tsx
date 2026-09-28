"use client";

import { useState, useTransition } from "react";
import { submitModuleExam } from "@/actions/learning";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/lib/types/domain";
import { cn, percent } from "@/lib/utils";

export function ExamRunner({
  moduleId,
  questions,
  passThreshold,
  lockedReason,
}: {
  moduleId: string;
  questions: QuizQuestion[];
  passThreshold: number;
  lockedReason?: string;
}) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (lockedReason) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-amber-950">
        <h2 className="mb-2 font-[family-name:var(--font-display)] text-xl">
          Assessment not available yet
        </h2>
        <p className="text-sm">{lockedReason}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((q, i) => (
        <fieldset
          key={q.id}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <legend className="px-1 text-sm text-[var(--muted)]">Item {i + 1}</legend>
          <p className="mb-4 text-[15px] leading-7">{q.stem}</p>
          <div className="space-y-2">
            {q.choices.map((c) => (
              <label
                key={c.id}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-lg border border-[var(--border)] px-3 py-2 text-sm",
                  responses[q.id] === c.id && "border-[var(--brand)] bg-[var(--brand-soft)]",
                )}
              >
                <input
                  type="radio"
                  name={q.id}
                  checked={responses[q.id] === c.id}
                  onChange={() => setResponses((r) => ({ ...r, [q.id]: c.id }))}
                />
                <span>{c.text}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <Button
        disabled={pending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            try {
              const res = await submitModuleExam({ moduleId, responses });
              setResult({ score: res.score, passed: res.passed });
            } catch (e) {
              setError(e instanceof Error ? e.message : "Submit failed");
            }
          });
        }}
      >
        Submit assessment
      </Button>
      {result ? (
        <div className="space-y-1 text-sm">
          <p className="font-medium">
            {result.passed ? "Assessment complete" : "Keep reviewing"}
          </p>
          <p>
            You scored {percent(result.score)}.
            {result.passed
              ? " You can now continue to the next part of the curriculum."
              : ` Need ≥${percent(passThreshold)} to pass.`}
          </p>
        </div>
      ) : null}
      {error ? (
        <p className="text-sm text-[var(--danger)]">
          {error === "Submit failed"
            ? "Something went wrong. Please try again."
            : error}
        </p>
      ) : null}
    </div>
  );
}
