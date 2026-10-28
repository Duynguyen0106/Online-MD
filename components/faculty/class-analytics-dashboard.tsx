import Link from "next/link";
import { Badge, ProgressBar } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  COHORT_AT_RISK_CONCEPTS,
  MOCK_COHORT_STUDENTS,
  cohortSummary,
  type AtRiskSeverity,
} from "@/lib/demo/faculty-class-analytics";

function severityBadge(severity: AtRiskSeverity): string {
  switch (severity) {
    case "high":
      return "bg-red-50 text-red-800 border-red-200";
    case "moderate":
      return "bg-amber-50 text-amber-900 border-amber-200";
    default:
      return "bg-[var(--surface-2)] text-[var(--muted)]";
  }
}

function riskBadge(label: string): string {
  if (label === "At risk") return "bg-red-50 text-red-800 border-red-200";
  if (label === "Needs review")
    return "bg-amber-50 text-amber-900 border-amber-200";
  return "bg-emerald-50 text-emerald-800 border-emerald-200";
}

export function ClassAnalyticsDashboard({ facultyName }: { facultyName: string }) {
  const summary = cohortSummary();

  return (
    <div className="space-y-8">
      <p className="text-sm text-[var(--muted)]">
        Viewing as{" "}
        <span className="font-medium text-[var(--foreground)]">{facultyName}</span>
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryStat label="Cohort size" value={String(summary.cohortSize)} />
        <SummaryStat
          label="Avg completion"
          value={`${summary.avgCompletionPct}%`}
        />
        <SummaryStat label="Students at risk" value={String(summary.atRisk)} />
        <SummaryStat
          label="High-severity concepts"
          value={String(summary.highSeverityConcepts)}
        />
      </div>

      <section className="animate-fade-up rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="mb-1 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-sm text-[var(--muted)]">Remediation focus</p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl">
              Cohort at-risk concepts
            </h2>
          </div>
          <Badge>Mock formative tags</Badge>
        </div>
        <p className="mb-5 max-w-3xl text-sm leading-6 text-[var(--muted)]">
          Low-scoring tags from recent quizzes and cases — prioritize high-severity items in the
          next tutorial.
        </p>

        <ul className="space-y-3">
          {COHORT_AT_RISK_CONCEPTS.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium">{item.concept}</h3>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    {item.moduleTitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={severityBadge(item.severity)}>
                    {item.severity}
                  </Badge>
                  <Badge>Avg {item.avgScorePct}%</Badge>
                  <Badge>Miss {item.cohortMissRatePct}%</Badge>
                </div>
              </div>
              <div className="mt-3">
                <ProgressBar value={item.avgScorePct / 100} />
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                <span className="font-medium text-[var(--foreground)]">
                  Suggested remediation:
                </span>{" "}
                {item.remediationHint}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-sm text-[var(--muted)]">Cohort roster</p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl">
              Student progress breakdown
            </h2>
          </div>
          <Button asChild variant="secondary" size="sm">
            <Link href="/faculty">Open curriculum library</Link>
          </Button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--surface-2)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Overall completion</th>
                <th className="px-4 py-3 font-medium">Struggling modules</th>
                <th className="px-4 py-3 font-medium">Risk</th>
                <th className="px-4 py-3 font-medium">Last active</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_COHORT_STUDENTS.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-[var(--border)] align-top"
                >
                  <td className="px-4 py-3 font-medium">{student.name}</td>
                  <td className="px-4 py-3 min-w-[10rem]">
                    <div className="mb-1 text-xs text-[var(--muted)]">
                      {student.completionPct}%
                    </div>
                    <ProgressBar value={student.completionPct / 100} />
                  </td>
                  <td className="px-4 py-3">
                    {student.strugglingModules.length === 0 ? (
                      <span className="text-[var(--muted)]">None flagged</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {student.strugglingModules.map((mod) => (
                          <Badge key={mod}>{mod}</Badge>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={riskBadge(student.riskLabel)}>
                      {student.riskLabel}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {student.lastActiveLabel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[var(--muted)]">
          {summary.needsReview} students need review · {summary.atRisk} at risk · sorted roster is
          demo fiction for faculty walkthroughs.
        </p>
      </section>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-3xl">
        {value}
      </p>
    </div>
  );
}
