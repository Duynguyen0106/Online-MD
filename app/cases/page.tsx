import { AppShell } from "@/components/shared/app-shell";
import { CasesIndex } from "@/components/student/cases-index";
import { getClinicalCases } from "@/lib/curriculum/accessors";

export default function CasesIndexPage() {
  const cases = getClinicalCases().map((c) => ({
    id: c.id,
    title: c.title,
    presentationMd: c.presentationMd,
    summary: c.summary,
    format: c.format,
    organSystem: c.organSystem,
  }));

  return (
    <AppShell
      title="Clinical cases"
      description="Think through the presentation before revealing the answer. Progressive cases unlock history, exam, and imaging step by step—use them after the related lessons when you can."
    >
      {cases.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">No clinical cases are available yet.</p>
      ) : (
        <CasesIndex cases={cases} />
      )}
    </AppShell>
  );
}
