import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { CasePlayer } from "@/components/student/case-player";
import { getClinicalCase } from "@/lib/curriculum/accessors";

export default async function CasePage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const clinical = getClinicalCase(caseId);
  if (!clinical) notFound();
  return (
    <AppShell title={clinical.title}>
      <p className="-mt-4 mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        Clinical case. Think through the presentation before revealing the answer.
      </p>
      <CasePlayer clinicalCase={clinical} />
    </AppShell>
  );
}
