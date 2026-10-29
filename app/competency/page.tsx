import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { CompetencyHeatmap } from "@/components/student/competency-heatmap";
import { Badge } from "@/components/ui/badge";
import {
  buildCompetencyMatrix,
  competencyModuleActivity,
  topCompetencyGaps,
} from "@/lib/competency/aggregate";
import { COMPETENCY_DOMAIN_LABELS } from "@/lib/competency/domains";
import { STUDENT_COPY } from "@/lib/copy/student";
import { readStudentState } from "@/lib/demo/store";

function continueLabel(kind: string | null | undefined) {
  if (kind === "quiz") return "Continue quiz";
  if (kind === "module") return "Open module";
  return "Continue lesson";
}

export default async function CompetencyPage() {
  const state = await readStudentState();
  const rows = await buildCompetencyMatrix(state);
  const activity = await competencyModuleActivity(state);
  const gaps = topCompetencyGaps(rows, 5, { moduleActivityMs: activity });

  return (
    <AppShell title={STUDENT_COPY.competencyTitle}>
      <p className="-mt-4 mb-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        {STUDENT_COPY.competencyIntro}
      </p>
      <p className="mb-6 max-w-3xl text-xs text-[var(--muted)]">
        {STUDENT_COPY.competencyDisclaimer}
      </p>

      {gaps.length > 0 ? (
        <section className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <h2 className="mb-2 text-sm font-semibold text-[var(--brand-strong)]">
            Suggested focus
          </h2>
          <ul className="space-y-2 text-sm">
            {gaps.map((g) => (
              <li
                key={`${g.moduleId}-${g.domain}`}
                className="flex flex-wrap items-center gap-2"
              >
                <Badge>{COMPETENCY_DOMAIN_LABELS[g.domain]}</Badge>
                <span className="text-[var(--muted)]">{g.moduleTitle}</span>
                <span className="text-xs text-[var(--muted)]">
                  {Math.round(g.score * 100)}% evidence
                </span>
                {g.nextHref ? (
                  <Link
                    href={g.nextHref}
                    className="text-xs text-[var(--brand-strong)] underline"
                  >
                    {continueLabel(g.nextKind)}
                  </Link>
                ) : (
                  <Link
                    href={`/modules/${g.moduleId}`}
                    className="text-xs text-[var(--brand-strong)] underline"
                  >
                    Open module
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {rows.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="mb-2 font-[family-name:var(--font-display)] text-xl">
            No modules to map yet
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Competency evidence appears once published modules are in the
            curriculum. Start from your dashboard when lessons are available.
          </p>
        </div>
      ) : (
        <CompetencyHeatmap rows={rows} />
      )}
    </AppShell>
  );
}
