import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { CasePlayer } from "@/components/student/case-player";
import { sanitizeStudentMarkdown } from "@/lib/copy/sanitize-student-content";
import { getClinicalCase } from "@/lib/curriculum/accessors";
import type { ClinicalCase } from "@/lib/types/domain";

export default async function CasePage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const clinical = getClinicalCase(caseId);
  if (!clinical) notFound();
  const progressive = clinical.format === "progressive";
  const studentCase = sanitizeCaseForStudent(clinical);
  return (
    <AppShell title={clinical.title}>
      <p className="-mt-4 mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        {progressive
          ? "Progressive clinical case. Each answer unlocks the next disclosure—do not skip ahead."
          : "Clinical case. Think through the presentation before revealing the answer."}
      </p>
      <CasePlayer clinicalCase={studentCase} />
    </AppShell>
  );
}

function sanitizeCaseForStudent(clinical: ClinicalCase): ClinicalCase {
  return {
    ...clinical,
    presentationMd: sanitizeStudentMarkdown(clinical.presentationMd),
    teachingPoints: sanitizeStudentMarkdown(clinical.teachingPoints),
    stages: clinical.stages.map((stage) => ({
      ...stage,
      revealMd: stage.revealMd
        ? sanitizeStudentMarkdown(stage.revealMd)
        : stage.revealMd,
      teachingMd: stage.teachingMd
        ? sanitizeStudentMarkdown(stage.teachingMd)
        : stage.teachingMd,
      choices: stage.choices?.map((choice) => ({
        ...choice,
        explanation: choice.explanation
          ? sanitizeStudentMarkdown(choice.explanation)
          : choice.explanation,
      })),
    })),
  };
}
