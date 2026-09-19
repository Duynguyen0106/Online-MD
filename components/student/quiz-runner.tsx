"use client";

import { useState, useTransition } from "react";
import { submitFormativeQuiz } from "@/actions/learning";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/lib/types/domain";
import { cn, percent } from "@/lib/utils";

export function QuizRunner({
  lessonId,
  questions,
  passThreshold,
}: {
  lessonId: string;
  questions: QuizQuestion[];
  passThreshold: number;
}) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(
    null,
  );
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      {questions.map((q, i) => (
        <fieldset
          key={q.id}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <legend className="px-1 text-sm font-medium text-[var(--muted)]">
            Question {i + 1}
          </legend>
          <p className="mb-4 text-[15px] leading-7">{q.stem}</p>
          <div className="space-y-2">
            {q.choices.map((c) => (
              <label
                key={c.id}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-lg border border-[var(--border)] px-3 py-2 text-sm hover:bg-[var(--surface-2)]",
                  responses[q.id] === c.id && "border-[var(--brand)] bg-[var(--brand-soft)]",
                )}
              >
                <input
                  type="radio"
                  className="mt-1"
                  name={q.id}
                  checked={responses[q.id] === c.id}
                  onChange={() =>
                    setResponses((r) => ({ ...r, [q.id]: c.id }))
                  }
                />
                <span>{c.text}</span>
              </label>
            ))}
          </div>
          {result ? (
            <p className="mt-3 text-sm text-[var(--muted)]">{q.explanation}</p>
          ) : null}
        </fieldset>
      ))}
      <div className="flex items-center gap-4">
        <Button
          disabled={pending || Object.keys(responses).length < questions.length}
          onClick={() => {
            startTransition(async () => {
              const res = await submitFormativeQuiz({ lessonId, responses });
              setResult({ score: res.score, passed: res.passed });
            });
          }}
        >
          Submit quiz
        </Button>
        {result ? (
          <p className="text-sm">
            Score {percent(result.score)} —{" "}
            {result.passed
              ? `Passed (≥${percent(passThreshold)})`
              : `Need ≥${percent(passThreshold)} for mastery`}
          </p>
        ) : null}
      </div>
    </div>
  );
}
