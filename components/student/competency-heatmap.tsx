import Link from "next/link";
import {
  COMPETENCY_DOMAINS,
  COMPETENCY_DOMAIN_LABELS,
  COMPETENCY_DOMAIN_SHORT,
  type CompetencyDomainId,
} from "@/lib/competency/domains";
import type { CompetencyModuleRow } from "@/lib/competency/aggregate";
import { cn } from "@/lib/utils";

function cellClass(score: number): string {
  if (score >= 0.75) return "bg-emerald-100 text-emerald-900";
  if (score >= 0.45) return "bg-teal-50 text-teal-900";
  if (score >= 0.2) return "bg-amber-50 text-amber-950";
  if (score > 0) return "bg-orange-50 text-orange-950";
  return "bg-[var(--surface-2)] text-[var(--muted)]";
}

export function CompetencyHeatmap({
  rows,
  compact = false,
}: {
  rows: CompetencyModuleRow[];
  compact?: boolean;
}) {
  const domains = COMPETENCY_DOMAINS;
  const visible = compact ? rows.slice(0, 8) : rows;

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] text-xs text-[var(--muted)]">
            <th className="sticky left-0 z-10 bg-[var(--surface)] p-3 font-medium">
              Module
            </th>
            {domains.map((d) => (
              <th
                key={d}
                className="p-2 text-center font-medium"
                title={COMPETENCY_DOMAIN_LABELS[d]}
              >
                {compact
                  ? COMPETENCY_DOMAIN_SHORT[d]
                  : COMPETENCY_DOMAIN_SHORT[d]}
              </th>
            ))}
            <th className="p-2 text-center font-medium">Next</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((row) => (
            <tr
              key={row.moduleId}
              className="border-b border-[var(--border)] align-middle"
            >
              <td className="sticky left-0 z-10 bg-[var(--surface)] p-3">
                <Link
                  href={`/modules/${row.moduleId}`}
                  className="font-medium text-[var(--brand-strong)] hover:underline"
                >
                  {row.title}
                </Link>
                <p className="text-[10px] text-[var(--muted)]">
                  Overall {Math.round(row.overall * 100)}%
                </p>
              </td>
              {domains.map((domain: CompetencyDomainId) => {
                const cell = row.cells[domain];
                const href = row.nextLessonId
                  ? `/lessons/${row.nextLessonId}`
                  : `/modules/${row.moduleId}`;
                return (
                  <td key={domain} className="p-1.5 text-center">
                    <Link
                      href={href}
                      title={`${COMPETENCY_DOMAIN_LABELS[domain]}: ${Math.round(cell.score * 100)}% (${cell.masteredLessonCount}/${cell.linkedLessonCount} lessons)`}
                      className={cn(
                        "mx-auto flex h-9 w-9 items-center justify-center rounded-md text-[11px] font-medium transition hover:ring-2 hover:ring-[var(--brand)]",
                        cellClass(cell.score),
                      )}
                    >
                      {Math.round(cell.score * 100)}
                    </Link>
                  </td>
                );
              })}
              <td className="p-2 text-center text-xs">
                {row.nextLessonId ? (
                  <Link
                    href={`/lessons/${row.nextLessonId}`}
                    className="text-[var(--brand-strong)] underline"
                  >
                    Continue
                  </Link>
                ) : (
                  <span className="text-[var(--muted)]">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
