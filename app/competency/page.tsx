import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { CompetencyHeatmap } from "@/components/student/competency-heatmap";
import { Badge } from "@/components/ui/badge";
import {
  buildCompetencyMatrix,
  topCompetencyGaps,
} from "@/lib/competency/aggregate";
import { COMPETENCY_DOMAIN_LABELS } from "@/lib/competency/domains";
import { STUDENT_COPY } from "@/lib/copy/student";
import { readStudentState } from "@/lib/demo/store";

export default async function CompetencyPage() {
  const state = await readStudentState();
  const rows = await buildCompetencyMatrix(state);
  const gaps = topCompetencyGaps(rows, 5);

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
                {g.nextLessonId ? (
                  <Link
                    href={`/lessons/${g.nextLessonId}`}
                    className="text-xs text-[var(--brand-strong)] underline"
                  >
                    Continue lesson
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

      <CompetencyHeatmap rows={rows} />
    </AppShell>
  );
}
