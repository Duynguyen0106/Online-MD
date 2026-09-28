"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/require-role";
import type { MedicalReviewStatus } from "@/lib/curriculum/content-metadata";
import { upsertMedicalReview } from "@/lib/demo/medical-review-store";

export async function setLessonMedicalReview(formData: FormData) {
  const user = await requireRole(["faculty", "admin"]);
  const lessonId = String(formData.get("lessonId") ?? "");
  const reviewStatus = String(
    formData.get("reviewStatus") ?? "NEEDS_REVIEW",
  ) as MedicalReviewStatus;
  const notes = String(formData.get("notes") ?? "") || undefined;
  const reason = String(formData.get("reason") ?? "Faculty review update");
  if (!lessonId) return { ok: false as const, error: "Missing lesson" };

  const allowed: MedicalReviewStatus[] = [
    "DRAFT",
    "MEDICAL_REVIEW",
    "APPROVED",
    "PUBLISHED",
    "NEEDS_REVIEW",
    "ARCHIVED",
  ];
  if (!allowed.includes(reviewStatus)) {
    return { ok: false as const, error: "Invalid status" };
  }

  await upsertMedicalReview({
    lessonId,
    reviewStatus,
    medicalReviewer: user.fullName || user.email,
    notes,
    reason,
  });
  revalidatePath("/faculty/medical-review");
  revalidatePath(`/faculty/lessons/${lessonId}`);
  return { ok: true as const };
}
