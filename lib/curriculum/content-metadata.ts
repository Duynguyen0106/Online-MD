/**
 * Sidecar medical-content metadata (non-destructive).
 * Does not alter scoring, unlock, auth, or progress logic.
 * Faculty review UI and student Sources footer read from here.
 */

export type LearnerLevel =
  | "PRECLINICAL"
  | "STEP_1"
  | "CLERKSHIP"
  | "STEP_2"
  | "ADVANCED_CLINICAL";

export type CognitiveLevel =
  | "RECALL"
  | "MECHANISM"
  | "INTERPRETATION"
  | "APPLICATION"
  | "CLINICAL_REASONING"
  | "MANAGEMENT";

export type MedicalReviewStatus =
  | "DRAFT"
  | "MEDICAL_REVIEW"
  | "APPROVED"
  | "PUBLISHED"
  | "NEEDS_REVIEW"
  | "ARCHIVED";

export type ContentReference = {
  label: string;
  /** Verified citation text only — never invent DOIs */
  citation?: string;
  url?: string;
  status: "verified" | "REFERENCE_REVIEW_REQUIRED";
};

export type ContentVersionEntry = {
  version: number;
  date: string;
  changedBy: string;
  reason: string;
};

export type LessonContentMeta = {
  lessonId: string;
  moduleId: string;
  learnerLevel: LearnerLevel;
  subject?: string;
  system?: string;
  cognitiveFocus?: CognitiveLevel;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  lastReviewed?: string;
  nextReview?: string;
  reviewStatus: MedicalReviewStatus;
  medicalReviewer?: string;
  guidelineSensitive: boolean;
  references: ContentReference[];
  version: number;
  versionHistory: ContentVersionEntry[];
  educationalRole?:
    | "FOUNDATIONAL"
    | "CLINICAL_APPLICATION"
    | "ADVANCED"
    | "CASE"
    | "REVIEW";
};

export type QuestionContentMeta = {
  questionId: string;
  lessonId?: string;
  objectiveId?: string;
  learnerLevel?: LearnerLevel;
  cognitiveLevel: CognitiveLevel;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  reviewStatus: MedicalReviewStatus;
  guidelineSensitive: boolean;
  referenceStatus?: "verified" | "REFERENCE_REVIEW_REQUIRED";
};

const GUIDELINE_RE =
  /\b(antibiotic|anticoagul|antiplatelet|acs|stemi|nstemi|stroke|thromboly|sepsis|vasopressor|insulin|dka|hhs|mechanical vent|ards|pregnan|pediatric septic|dialysis|rrt|chemotherap|immunosuppress|resuscitat|heparin|warfarin|doac|pci|hour-?1|perc|wells)\b/i;

/** Explicit overrides for high-visibility lessons (audit-driven). */
export const LESSON_META_OVERRIDES: Record<string, Partial<LessonContentMeta>> =
  {
    "les-cv-1": {
      learnerLevel: "PRECLINICAL",
      educationalRole: "FOUNDATIONAL",
      system: "Cardiovascular",
      subject: "Physiology",
      reviewStatus: "NEEDS_REVIEW",
      guidelineSensitive: false,
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "Metadata baseline from medical content audit",
        },
      ],
      references: [
        {
          label: "Cardiac electrophysiology (educational)",
          status: "REFERENCE_REVIEW_REQUIRED",
        },
      ],
    },
    "les-cv-2": {
      learnerLevel: "STEP_1",
      educationalRole: "FOUNDATIONAL",
      system: "Cardiovascular",
      subject: "Pathophysiology",
      reviewStatus: "NEEDS_REVIEW",
      guidelineSensitive: true,
      nextReview: "2027-03-28",
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "Flagged ACS pathway as guideline-sensitive",
        },
      ],
      references: [
        {
          label: "AHA/ACC ACS guideline family",
          status: "REFERENCE_REVIEW_REQUIRED",
        },
      ],
    },
    "les-cv-3": {
      learnerLevel: "STEP_1",
      educationalRole: "FOUNDATIONAL",
      system: "Cardiovascular",
      subject: "Pathophysiology / Therapeutics",
      reviewStatus: "NEEDS_REVIEW",
      guidelineSensitive: true,
      nextReview: "2027-03-28",
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "HF GDMT / phenotype framing flagged for medical review",
        },
      ],
      references: [
        {
          label: "AHA/ACC/HFSA heart failure guideline family",
          status: "REFERENCE_REVIEW_REQUIRED",
        },
      ],
    },
    "les-cv-8": {
      learnerLevel: "STEP_1",
      educationalRole: "FOUNDATIONAL",
      system: "Cardiovascular",
      subject: "Physiology",
      reviewStatus: "NEEDS_REVIEW",
      guidelineSensitive: false,
      version: 2,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "Metadata baseline",
        },
        {
          version: 2,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason:
            "Replaced imprecise 'kills preload' language with diastolic filling physiology",
        },
      ],
      references: [
        {
          label: "Pericardial disease / tamponade physiology",
          status: "REFERENCE_REVIEW_REQUIRED",
        },
      ],
    },
    "les-cat-y2-cv-excitation": {
      learnerLevel: "STEP_1",
      educationalRole: "FOUNDATIONAL",
      system: "Cardiovascular",
      reviewStatus: "NEEDS_REVIEW",
      guidelineSensitive: false,
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason:
            "Distinguished as advanced EP mechanism companion to les-cv-1",
        },
      ],
      references: [{ label: "Cardiac EP", status: "REFERENCE_REVIEW_REQUIRED" }],
    },
    "les-cat-y2-cv-hf-mechanisms": {
      learnerLevel: "STEP_1",
      educationalRole: "FOUNDATIONAL",
      system: "Cardiovascular",
      reviewStatus: "NEEDS_REVIEW",
      guidelineSensitive: true,
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "HFrEF/HFpEF mechanism companion to foundational HF therapy",
        },
      ],
      references: [
        {
          label: "Heart failure phenotype definitions",
          status: "REFERENCE_REVIEW_REQUIRED",
        },
      ],
    },
    "les-cat-y3-im-sepsis-hour1": {
      learnerLevel: "CLERKSHIP",
      educationalRole: "CLINICAL_APPLICATION",
      reviewStatus: "MEDICAL_REVIEW",
      guidelineSensitive: true,
      nextReview: "2027-01-28",
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "Retitled/reframed away from rigid Hour-1 checklist reading",
        },
      ],
      references: [
        {
          label: "Surviving Sepsis Campaign / sepsis consensus",
          status: "REFERENCE_REVIEW_REQUIRED",
        },
      ],
    },
    "les-cat-y3-im-vte-ward": {
      learnerLevel: "CLERKSHIP",
      educationalRole: "CLINICAL_APPLICATION",
      reviewStatus: "MEDICAL_REVIEW",
      guidelineSensitive: true,
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "Wells/PERC must remain adjuncts to pretest probability",
        },
      ],
      references: [
        {
          label: "VTE / PE clinical prediction & treatment guidance",
          status: "REFERENCE_REVIEW_REQUIRED",
        },
      ],
    },
    "les-cat-y3-im-pe-workup": {
      learnerLevel: "CLERKSHIP",
      educationalRole: "CLINICAL_APPLICATION",
      reviewStatus: "MEDICAL_REVIEW",
      guidelineSensitive: true,
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "PE workup flagged for medical review",
        },
      ],
      references: [
        {
          label: "ESC / ASH-aligned PE diagnostic pathway (verify edition)",
          status: "REFERENCE_REVIEW_REQUIRED",
        },
      ],
    },
    "les-cat-y4-im-acs-icu": {
      learnerLevel: "ADVANCED_CLINICAL",
      educationalRole: "ADVANCED",
      reviewStatus: "MEDICAL_REVIEW",
      guidelineSensitive: true,
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "Tagged advanced clinical within IM module",
        },
      ],
      references: [
        {
          label: "Complicated ACS / cardiogenic shock pathways",
          status: "REFERENCE_REVIEW_REQUIRED",
        },
      ],
    },
    "les-cat-y4-im-icu-shock": {
      learnerLevel: "ADVANCED_CLINICAL",
      educationalRole: "ADVANCED",
      reviewStatus: "MEDICAL_REVIEW",
      guidelineSensitive: true,
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "Tagged advanced ICU shock content",
        },
      ],
      references: [
        { label: "Shock / critical care monitoring", status: "REFERENCE_REVIEW_REQUIRED" },
      ],
    },
    "les-cat-y4-im-onco-emerg": {
      learnerLevel: "ADVANCED_CLINICAL",
      educationalRole: "ADVANCED",
      reviewStatus: "MEDICAL_REVIEW",
      guidelineSensitive: true,
      version: 1,
      versionHistory: [
        {
          version: 1,
          date: "2026-09-28",
          changedBy: "curriculum-audit",
          reason: "Retitled to distinguish from core oncologic emergencies",
        },
      ],
      references: [
        {
          label: "Oncologic emergencies / neutropenic fever",
          status: "REFERENCE_REVIEW_REQUIRED",
        },
      ],
    },
  };

export const QUESTION_META_OVERRIDES: Record<
  string,
  Partial<QuestionContentMeta>
> = {
  "qq-cv-1": {
    cognitiveLevel: "RECALL",
    learnerLevel: "PRECLINICAL",
    reviewStatus: "NEEDS_REVIEW",
    guidelineSensitive: false,
    difficulty: 1,
  },
  "qq-cv-2": {
    cognitiveLevel: "INTERPRETATION",
    learnerLevel: "STEP_1",
    reviewStatus: "MEDICAL_REVIEW",
    guidelineSensitive: true,
    difficulty: 2,
  },
  "qq-cv-3": {
    cognitiveLevel: "MECHANISM",
    learnerLevel: "STEP_1",
    reviewStatus: "MEDICAL_REVIEW",
    guidelineSensitive: true,
    difficulty: 2,
  },
};

function inferLearnerLevel(args: {
  lessonId: string;
  moduleId: string;
  phaseKind?: string;
  title: string;
  isCoreClerkship?: boolean;
}): LearnerLevel {
  const t = `${args.title} ${args.moduleId}`.toLowerCase();
  if (
    args.lessonId.includes("-y4-") ||
    /icu|sub-?i|advanced|consult|complicated/i.test(t)
  ) {
    return "ADVANCED_CLINICAL";
  }
  if (args.phaseKind === "clerkship_core" || args.isCoreClerkship) {
    return /step\s*2/i.test(t) ? "STEP_2" : "CLERKSHIP";
  }
  if (
    /pathophys|disease|syndrome|failure|acs|shock|ischemi/i.test(args.title)
  ) {
    return "STEP_1";
  }
  return "PRECLINICAL";
}

export function buildLessonMeta(args: {
  lessonId: string;
  moduleId: string;
  title: string;
  phaseKind?: string;
  isCoreClerkship?: boolean;
}): LessonContentMeta {
  const override = LESSON_META_OVERRIDES[args.lessonId] ?? {};
  const guidelineSensitive =
    override.guidelineSensitive ?? GUIDELINE_RE.test(args.title);
  const base: LessonContentMeta = {
    lessonId: args.lessonId,
    moduleId: args.moduleId,
    learnerLevel: inferLearnerLevel(args),
    reviewStatus: guidelineSensitive ? "MEDICAL_REVIEW" : "NEEDS_REVIEW",
    guidelineSensitive,
    references: [
      {
        label: "Primary teaching sources",
        status: "REFERENCE_REVIEW_REQUIRED",
      },
    ],
    version: 1,
    versionHistory: [
      {
        version: 1,
        date: "2026-09-28",
        changedBy: "curriculum-audit",
        reason: "Baseline metadata from medical content audit",
      },
    ],
  };
  return {
    ...base,
    ...override,
    lessonId: args.lessonId,
    moduleId: args.moduleId,
    references: override.references ?? base.references,
    versionHistory: override.versionHistory ?? base.versionHistory,
  };
}

export function getQuestionMeta(
  questionId: string,
  fallback?: Partial<QuestionContentMeta>,
): QuestionContentMeta {
  const o = QUESTION_META_OVERRIDES[questionId] ?? {};
  return {
    cognitiveLevel: o.cognitiveLevel ?? fallback?.cognitiveLevel ?? "RECALL",
    reviewStatus: o.reviewStatus ?? "NEEDS_REVIEW",
    guidelineSensitive: o.guidelineSensitive ?? false,
    ...fallback,
    ...o,
    questionId,
  };
}

export function formatLearnerLevel(level: LearnerLevel): string {
  switch (level) {
    case "PRECLINICAL":
      return "Preclinical";
    case "STEP_1":
      return "Step 1";
    case "CLERKSHIP":
      return "Clerkship";
    case "STEP_2":
      return "Step 2";
    case "ADVANCED_CLINICAL":
      return "Advanced clinical";
  }
}

export function formatReviewStatus(status: MedicalReviewStatus): string {
  switch (status) {
    case "DRAFT":
      return "Draft";
    case "MEDICAL_REVIEW":
      return "Medical review";
    case "APPROVED":
      return "Approved";
    case "PUBLISHED":
      return "Published";
    case "NEEDS_REVIEW":
      return "Needs review";
    case "ARCHIVED":
      return "Archived";
  }
}
