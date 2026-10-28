"use client";

import { useMemo, useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { submitCaseAttempt } from "@/actions/learning";
import { Button } from "@/components/ui/button";
import type { CaseFeedback } from "@/lib/validations/schemas";
import type { CaseStage, ClinicalCase } from "@/lib/types/domain";

function FreeformCasePlayer({ clinicalCase }: { clinicalCase: ClinicalCase }) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<CaseFeedback | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 prose prose-sm max-w-none dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {clinicalCase.presentationMd}
        </ReactMarkdown>
      </article>
      {clinicalCase.stages.map((stage, i) => (
        <div
          key={stage.id}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <p className="mb-2 text-sm font-medium">
            Stage {i + 1}: {stage.prompt}
          </p>
          <textarea
            className="field-control min-h-28"
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
        Check my reasoning
      </Button>
      {feedback ? <FeedbackPanel feedback={feedback} /> : null}
    </div>
  );
}

function FeedbackPanel({ feedback }: { feedback: CaseFeedback }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-7">
      <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl">
        Feedback
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
  );
}

function stageIsAnswered(
  stage: CaseStage,
  selections: Record<string, string>,
  wrapupsOpened: Record<string, boolean>,
): boolean {
  if (stage.kind === "wrapup" || !stage.choices?.length) {
    return Boolean(wrapupsOpened[stage.id]);
  }
  return Boolean(selections[stage.id]);
}

function ProgressiveCasePlayer({
  clinicalCase,
}: {
  clinicalCase: ClinicalCase;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [wrapupsOpened, setWrapupsOpened] = useState<Record<string, boolean>>(
    {},
  );
  const [showRationale, setShowRationale] = useState(false);
  const [feedback, setFeedback] = useState<CaseFeedback | null>(null);
  const [pending, startTransition] = useTransition();
  const [reflections, setReflections] = useState("");

  const stage = clinicalCase.stages[stepIndex];
  const total = clinicalCase.stages.length;
  const isWrapup = stage?.kind === "wrapup" || !stage?.choices?.length;
  const selectedId = stage ? selections[stage.id] : undefined;
  const selectedChoice = stage?.choices?.find((c) => c.id === selectedId);
  const isCorrect =
    stage?.correctChoiceId != null && selectedId === stage.correctChoiceId;
  const answered = stage
    ? stageIsAnswered(stage, selections, wrapupsOpened)
    : false;
  const isLast = stepIndex >= total - 1;

  const progressLabel = useMemo(
    () => `Step ${Math.min(stepIndex + 1, total)} of ${total}`,
    [stepIndex, total],
  );

  if (!stage) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[var(--muted)]">
        <span>{progressLabel}</span>
        <div className="flex gap-1">
          {clinicalCase.stages.map((s, i) => (
            <span
              key={s.id}
              className={`h-2 w-8 rounded-full ${
                i < stepIndex
                  ? "bg-[var(--brand)]"
                  : i === stepIndex
                    ? "bg-[var(--brand)]/60"
                    : "bg-[var(--border)]"
              }`}
              aria-hidden
            />
          ))}
        </div>
      </div>

      <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 prose prose-sm max-w-none dark:prose-invert">
        {stepIndex === 0 ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {clinicalCase.presentationMd}
          </ReactMarkdown>
        ) : null}
        {stage.revealMd ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {stage.revealMd}
          </ReactMarkdown>
        ) : null}
      </article>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="mb-4 text-sm font-medium leading-6">{stage.prompt}</p>

        {!isWrapup && stage.choices ? (
          <fieldset className="space-y-2" disabled={answered && showRationale}>
            <legend className="sr-only">Select one answer</legend>
            {stage.choices.map((choice) => {
              const active = selectedId === choice.id;
              const revealCorrectness = answered && showRationale;
              const correct = choice.id === stage.correctChoiceId;
              return (
                <label
                  key={choice.id}
                  className={`flex cursor-pointer gap-3 rounded-lg border p-3 text-sm leading-6 transition-colors ${
                    active
                      ? "border-[var(--brand)] bg-[var(--brand)]/5"
                      : "border-[var(--border)] hover:border-[var(--brand)]/50"
                  } ${
                    revealCorrectness && correct
                      ? "border-emerald-600 bg-emerald-500/10"
                      : ""
                  } ${
                    revealCorrectness && active && !correct
                      ? "border-red-500/70 bg-red-500/5"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    className="mt-1"
                    name={stage.id}
                    value={choice.id}
                    checked={active}
                    onChange={() => {
                      if (answered && showRationale) return;
                      setSelections((s) => ({ ...s, [stage.id]: choice.id }));
                      setShowRationale(false);
                    }}
                  />
                  <span>{choice.text}</span>
                </label>
              );
            })}
          </fieldset>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Read the wrap-up, then continue or submit reflections for feedback.
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {!isWrapup ? (
            <Button
              disabled={!selectedId || (answered && showRationale)}
              onClick={() => setShowRationale(true)}
            >
              Check answer
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() =>
                setWrapupsOpened((w) => ({ ...w, [stage.id]: true }))
              }
            >
              Mark wrap-up reviewed
            </Button>
          )}

          {(showRationale || (isWrapup && wrapupsOpened[stage.id])) &&
          !isLast ? (
            <Button
              variant="secondary"
              onClick={() => {
                setStepIndex((i) => i + 1);
                setShowRationale(false);
              }}
            >
              Continue to next step
            </Button>
          ) : null}
        </div>

        {showRationale && selectedChoice ? (
          <div
            className={`mt-4 rounded-lg border p-4 text-sm leading-6 ${
              isCorrect
                ? "border-emerald-600/40 bg-emerald-500/5"
                : "border-amber-600/40 bg-amber-500/5"
            }`}
          >
            <p className="font-medium">
              {isCorrect ? "Correct direction." : "Not the best next move."}
            </p>
            {selectedChoice.explanation ? (
              <p className="mt-2">{selectedChoice.explanation}</p>
            ) : null}
            {!isCorrect && stage.correctChoiceId ? (
              <p className="mt-2 text-[var(--muted)]">
                Preferred answer:{" "}
                {stage.choices?.find((c) => c.id === stage.correctChoiceId)
                  ?.text ?? stage.expectedFocus}
              </p>
            ) : null}
            {stage.teachingMd ? (
              <div className="mt-3 prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {stage.teachingMd}
                </ReactMarkdown>
              </div>
            ) : null}
          </div>
        ) : null}

        {isWrapup && stage.teachingMd && wrapupsOpened[stage.id] ? (
          <div className="mt-4 prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {stage.teachingMd}
            </ReactMarkdown>
          </div>
        ) : null}
      </div>

      {isLast && (showRationale || wrapupsOpened[stage.id] || isWrapup) ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-3">
          <p className="text-sm font-medium">Optional written reflection</p>
          <textarea
            className="field-control min-h-24"
            placeholder="One-sentence problem representation, can’t-miss mimic, and first timed action…"
            value={reflections}
            onChange={(e) => setReflections(e.target.value)}
          />
          <Button
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                const responses: Record<string, string> = { ...selections };
                if (reflections.trim()) {
                  responses[`${stage.id}-reflection`] = reflections.trim();
                }
                for (const s of clinicalCase.stages) {
                  if (s.choices && selections[s.id]) {
                    const choice = s.choices.find(
                      (c) => c.id === selections[s.id],
                    );
                    responses[s.id] = choice?.text ?? selections[s.id];
                  }
                }
                const res = await submitCaseAttempt({
                  caseId: clinicalCase.id,
                  responses,
                });
                setFeedback(res.feedback);
              });
            }}
          >
            Check my reasoning
          </Button>
        </div>
      ) : null}

      {feedback ? <FeedbackPanel feedback={feedback} /> : null}
    </div>
  );
}

export function CasePlayer({ clinicalCase }: { clinicalCase: ClinicalCase }) {
  const progressive =
    clinicalCase.format === "progressive" ||
    clinicalCase.stages.some((s) => Boolean(s.choices?.length || s.revealMd));

  if (progressive) {
    return <ProgressiveCasePlayer clinicalCase={clinicalCase} />;
  }
  return <FreeformCasePlayer clinicalCase={clinicalCase} />;
}
