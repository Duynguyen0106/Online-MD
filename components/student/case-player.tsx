"use client";

import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import { submitCaseAttempt } from "@/actions/learning";
import { Button } from "@/components/ui/button";
import type { CaseFeedback } from "@/lib/validations/schemas";
import type { ClinicalCase } from "@/lib/types/domain";

export function CasePlayer({ clinicalCase }: { clinicalCase: ClinicalCase }) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<CaseFeedback | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <ReactMarkdown>{clinicalCase.presentationMd}</ReactMarkdown>
      </article>
      {clinicalCase.stages.map((stage, i) => (
        <div key={stage.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="mb-2 text-sm font-medium">
            Stage {i + 1}: {stage.prompt}
          </p>
          <textarea
            className="min-h-28 w-full rounded-md border border-[var(--border)] bg-[var(--background)] p-3 text-sm"
            value={responses[stage.id] ?? ""}
            onChange={(e) =>
              setResponses((r) => ({ ...r, [stage.id]: e.target.value }))
            }
          />
        </div>
      ))}
      <Button
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            const res = await submitCaseAttempt({
              caseId: clinicalCase.id,
              responses,
            });
            setFeedback(res.feedback);
          });
        }}
      >
        Request Faculty AI feedback
      </Button>
      {feedback ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-7">
          <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl">
            Expert feedback
          </h3>
          <p>{feedback.overallAssessment}</p>
          <p className="mt-3 font-medium">Strengths</p>
          <ul className="list-disc pl-5">
            {feedback.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="mt-3 font-medium">Gaps</p>
          <ul className="list-disc pl-5">
            {feedback.gaps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
