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
      <CasePlayer clinicalCase={clinical} />
    </AppShell>
  );
}
