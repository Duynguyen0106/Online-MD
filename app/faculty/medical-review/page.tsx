import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import {
  MedicalReviewDashboard,
  type ReviewRow,
} from "@/components/faculty/medical-review-dashboard";
import {
  LESSON_META_OVERRIDES,
  buildLessonMeta,
} from "@/lib/curriculum/content-metadata";
import { getPhases } from "@/lib/curriculum/accessors";
import { listMedicalReviews } from "@/lib/demo/medical-review-store";

export default async function MedicalReviewPage() {
  const phases = await getPhases();
  const overrides = await listMedicalReviews();
  const overrideMap = Object.fromEntries(
    overrides.map((r) => [r.lessonId, r]),
  );

  const rows: ReviewRow[] = [];
  for (const phase of phases) {
    for (const mod of phase.modules) {
      for (const lesson of mod.lessons) {
        const hasExplicitMeta = Boolean(LESSON_META_OVERRIDES[lesson.id]);
        const base = buildLessonMeta({
          lessonId: lesson.id,
          moduleId: mod.id,
          title: lesson.title,
          phaseKind: phase.phaseKind,
          isCoreClerkship: mod.isCoreClerkship,
        });
        // Dashboard focuses on guideline-sensitive + explicitly audited lessons
        // so faculty are not flooded with every baseline NEEDS_REVIEW tag.
        if (!base.guidelineSensitive && !hasExplicitMeta && !overrideMap[lesson.id]) {
          continue;
        }
        const ov = overrideMap[lesson.id];
        const meta = ov
          ? {
              ...base,
              reviewStatus: ov.reviewStatus,
              medicalReviewer: ov.medicalReviewer,
              lastReviewed: ov.lastReviewed,
              nextReview: ov.nextReview,
              version: ov.version,
              versionHistory: ov.versionHistory,
            }
          : base;
        const missingReferences = meta.references.every(
          (r) => r.status === "REFERENCE_REVIEW_REQUIRED",
        );
        const recentlyChanged = (meta.versionHistory?.length ?? 0) > 1;
        rows.push({
          meta,
          title: lesson.title,
          moduleTitle: mod.title,
          missingReferences,
          recentlyChanged,
        });
      }
    }
  }

  const focused = rows;

  return (
    <AppShell title="Medical content review">
      <p className="mb-2 max-w-3xl text-sm text-[var(--muted)]">
        Faculty/admin only. Queue for lessons needing medical review, guideline-sensitive
        topics, missing verified references, and recently changed content. Approving here
        records reviewer metadata — it does not invent citations or change student scoring.
      </p>
      <p className="mb-6 text-sm">
        <Link className="text-[var(--brand-strong)] underline" href="/faculty">
          Back to content library
        </Link>
      </p>
      <MedicalReviewDashboard rows={focused} />
    </AppShell>
  );
}
