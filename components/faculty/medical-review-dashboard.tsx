import Link from "next/link";
import { setLessonMedicalReview } from "@/actions/medical-review";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatLearnerLevel,
  formatReviewStatus,
  type LessonContentMeta,
} from "@/lib/curriculum/content-metadata";

export type ReviewRow = {
  meta: LessonContentMeta;
  title: string;
  moduleTitle: string;
  missingReferences: boolean;
  recentlyChanged: boolean;
};

export function MedicalReviewDashboard({ rows }: { rows: ReviewRow[] }) {
  const needing = rows.filter((r) =>
    ["NEEDS_REVIEW", "MEDICAL_REVIEW", "DRAFT"].includes(r.meta.reviewStatus),
  );
  const guideline = rows.filter((r) => r.meta.guidelineSensitive);
  const missingRefs = rows.filter((r) => r.missingReferences);
  const recent = rows.filter((r) => r.recentlyChanged);

  return (
    <div className="space-y-8">
      <section className="grid gap-3 sm:grid-cols-4">
        <Stat label="Needs / in review" value={needing.length} />
        <Stat label="Guideline-sensitive" value={guideline.length} />
        <Stat label="Missing verified refs" value={missingRefs.length} />
        <Stat label="Recently changed" value={recent.length} />
      </section>

      <ReviewTable
        title="Lessons needing review"
        rows={needing}
        empty="No lessons currently queued."
      />
      <ReviewTable
        title="Guideline-sensitive lessons"
        rows={guideline}
        empty="None flagged."
      />
      <ReviewTable
        title="Missing verified references"
        rows={missingRefs}
        empty="All listed items have a verified citation."
      />
      <ReviewTable
        title="Recently changed"
        rows={recent}
        empty="No recent medical edits recorded."
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-2xl">
        {value}
      </p>
    </div>
  );
}

function ReviewTable({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: ReviewRow[];
  empty: string;
}) {
  return (
    <section>
      <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">
        {title}{" "}
        <span className="text-sm font-normal text-[var(--muted)]">
          ({rows.length})
        </span>
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">{empty}</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] text-xs text-[var(--muted)]">
              <tr>
                <th className="p-3">Lesson</th>
                <th className="p-3">Module</th>
                <th className="p-3">Level</th>
                <th className="p-3">Last reviewed</th>
                <th className="p-3">Status</th>
                <th className="p-3">Reviewer</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 80).map((row) => (
                <tr
                  key={`${title}-${row.meta.lessonId}`}
                  className="border-b border-[var(--border)] align-top"
                >
                  <td className="p-3">
                    <div className="font-medium">{row.title}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {row.meta.lessonId}
                      {row.meta.guidelineSensitive ? " · guideline-sensitive" : ""}
                    </div>
                  </td>
                  <td className="p-3">{row.moduleTitle}</td>
                  <td className="p-3">
                    {formatLearnerLevel(row.meta.learnerLevel)}
                  </td>
                  <td className="p-3">
                    {row.meta.lastReviewed ?? "—"}
                  </td>
                  <td className="p-3">
                    <Badge>{formatReviewStatus(row.meta.reviewStatus)}</Badge>
                  </td>
                  <td className="p-3">
                    {row.meta.medicalReviewer ?? "—"}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/lessons/${row.meta.lessonId}`}>Open</Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <Link href={`/faculty/lessons/${row.meta.lessonId}`}>
                          Edit
                        </Link>
                      </Button>
                      <form action={setLessonMedicalReview} className="flex flex-col gap-1">
                        <input
                          type="hidden"
                          name="lessonId"
                          value={row.meta.lessonId}
                        />
                        <input type="hidden" name="reason" value="Faculty dashboard action" />
                        <input type="hidden" name="reviewStatus" value="APPROVED" />
                        <Button size="sm" type="submit">
                          Approve
                        </Button>
                      </form>
                      <form action={setLessonMedicalReview}>
                        <input
                          type="hidden"
                          name="lessonId"
                          value={row.meta.lessonId}
                        />
                        <input
                          type="hidden"
                          name="reason"
                          value="Changes requested from medical review dashboard"
                        />
                        <input
                          type="hidden"
                          name="reviewStatus"
                          value="NEEDS_REVIEW"
                        />
                        <input
                          type="hidden"
                          name="notes"
                          value="Request changes"
                        />
                        <Button size="sm" variant="outline" type="submit">
                          Request changes
                        </Button>
                      </form>
                      <form action={setLessonMedicalReview}>
                        <input
                          type="hidden"
                          name="lessonId"
                          value={row.meta.lessonId}
                        />
                        <input
                          type="hidden"
                          name="reason"
                          value="Marked for medical review"
                        />
                        <input
                          type="hidden"
                          name="reviewStatus"
                          value="MEDICAL_REVIEW"
                        />
                        <Button size="sm" variant="outline" type="submit">
                          Mark for review
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
