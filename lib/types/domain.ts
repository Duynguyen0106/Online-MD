export type UserRole = "student" | "faculty" | "admin";
export type ProgressState =
  | "not_started"
  | "in_progress"
  | "completed"
  | "mastered";
export type ContentBlockType =
  | "video"
  | "reading"
  | "diagram"
  | "audio"
  | "clinical_vignette"
  | "formative_question";
export type UsmleStep = "step1" | "step2ck";
export type AttemptStatus = "in_progress" | "submitted" | "abandoned";
export type PublishStatus = "draft" | "published" | "archived";
export type PhaseKind = "foundations" | "clerkship_core" | "advanced";
export type InviteStatus = "pending" | "accepted" | "revoked" | "expired";
export type UnlockScope =
  | "module_qbank"
  | "phase_step1_qbank"
  | "clerkship_step2_qbank"
  | "custom";

export interface Invite {
  id: string;
  email: string;
  role: "faculty" | "admin";
  tokenHash: string;
  status: InviteStatus;
  invitedBy: string;
  expiresAt: string;
  acceptedAt?: string;
  createdAt: string;
}

export interface UnlockRule {
  id: string;
  scope: UnlockScope;
  name: string;
  targetModuleId?: string;
  targetPhaseId?: string;
  requiresAllModulesInPhase: boolean;
  requiresCoreClerkship: boolean;
  minModuleState: ProgressState;
  isActive: boolean;
  config?: Record<string, unknown>;
}

export interface Choice {
  id: string;
  text: string;
}

export interface Objective {
  id: string;
  code: string;
  statement: string;
  usmleStep: UsmleStep;
  organSystem: string;
  physicianTask: string;
  contentCategory: string;
  moduleId: string;
  lessonIds: string[];
}

export interface ContentBlock {
  id: string;
  conceptId: string;
  blockType: ContentBlockType;
  title: string;
  sequence: number;
  bodyMd?: string;
  mediaUrl?: string;
  mediaProvider?: "youtube" | "vimeo" | "mux" | "other";
  durationSeconds?: number;
}

export interface Concept {
  id: string;
  lessonId: string;
  title: string;
  sequence: number;
  summary: string;
  blocks: ContentBlock[];
}

export interface QuizQuestion {
  id: string;
  lessonId?: string;
  moduleExamId?: string;
  stem: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  objectiveId?: string;
  sequence: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  sequence: number;
  estimatedMinutes: number;
  status: PublishStatus;
  quizPassThreshold: number;
  concepts: Concept[];
  quizQuestionIds: string[];
}

export interface ModuleExam {
  id: string;
  moduleId: string;
  title: string;
  passThreshold: number;
  questionIds: string[];
}

export interface Module {
  id: string;
  phaseId: string;
  title: string;
  slug: string;
  sequence: number;
  description: string;
  isCoreClerkship: boolean;
  status: PublishStatus;
  examPassThreshold: number;
  lessons: Lesson[];
  exam?: ModuleExam;
}

export interface Phase {
  id: string;
  programId: string;
  name: string;
  slug: string;
  sequence: number;
  phaseKind: PhaseKind;
  usmleFocus?: UsmleStep;
  description: string;
  modules: Module[];
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  phases: Phase[];
}

export interface Flashcard {
  id: string;
  lessonId?: string;
  conceptId?: string;
  front: string;
  back: string;
  objectiveId?: string;
}

export interface QbankQuestion {
  id: string;
  usmleStep: UsmleStep;
  moduleId?: string;
  stem: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  organSystem: string;
  physicianTask: string;
  contentCategory: string;
  objectiveId?: string;
  difficulty: number;
}

/** One multiple-choice option inside a progressive clinical case stage. */
export interface CaseStageChoice {
  id: string;
  text: string;
  /** Brief rationale shown after the learner selects this option. */
  explanation?: string;
}

/**
 * A progressive-disclosure or free-text reasoning stage.
 * Legacy cases only set `id` / `prompt` / `expectedFocus`.
 * Progressive cases add `revealMd`, optional MCQ fields, and wrap-up teaching.
 */
export interface CaseStage {
  id: string;
  prompt: string;
  expectedFocus: string;
  /** Information newly disclosed when this stage unlocks. */
  revealMd?: string;
  choices?: CaseStageChoice[];
  correctChoiceId?: string;
  /** Teaching shown after the learner answers (or for wrap-up stages). */
  teachingMd?: string;
  /** `wrapup` stages are educational only (no forced MCQ gate). */
  kind?: "decision" | "wrapup";
}

export interface ClinicalCase {
  id: string;
  moduleId?: string;
  title: string;
  presentationMd: string;
  /**
   * `progressive` = step-gated disclosure with MCQs.
   * `freeform` / omitted = classic simultaneous free-text stages.
   */
  format?: "freeform" | "progressive";
  stages: CaseStage[];
  teachingPoints: string;
  objectiveIds: string[];
  status: PublishStatus;
  /** Short index-card blurb (optional). */
  summary?: string;
  organSystem?: string;
  difficulty?: "clerkship" | "advanced";
}

export interface DemoUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface LessonProgress {
  lessonId: string;
  state: ProgressState;
  viewedBlockIds: string[];
  lastFormativeScore?: number;
  masteredAt?: string;
  startedAt?: string;
  updatedAt: string;
}

export interface ModuleProgress {
  moduleId: string;
  state: ProgressState;
  percentComplete: number;
  masteredAt?: string;
}

export interface QuizAttempt {
  id: string;
  lessonId: string;
  status: AttemptStatus;
  score?: number;
  responses: Record<string, string>;
  startedAt: string;
  submittedAt?: string;
}

export interface ExamAttempt {
  id: string;
  moduleExamId: string;
  moduleId: string;
  status: AttemptStatus;
  score?: number;
  passed?: boolean;
  responses: Record<string, string>;
  startedAt: string;
  submittedAt?: string;
}

export interface CardReview {
  flashcardId: string;
  easiness: number;
  intervalDays: number;
  repetitions: number;
  dueAt: string;
  lastReviewedAt?: string;
  lastQuality?: number;
}

export interface QbankAttempt {
  id: string;
  usmleStep?: UsmleStep;
  moduleId?: string;
  mode: "tutor" | "timed";
  status: AttemptStatus;
  questionIds: string[];
  responses: Record<string, string>;
  score?: number;
  startedAt: string;
  submittedAt?: string;
}

export interface CaseAttempt {
  id: string;
  caseId: string;
  status: AttemptStatus;
  studentResponses: Record<string, string>;
  aiFeedback?: unknown;
  startedAt: string;
  completedAt?: string;
}

export interface TutorMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  structured?: unknown;
  createdAt: string;
}

export interface TutorThread {
  id: string;
  lessonId?: string;
  moduleId?: string;
  messages: TutorMessage[];
  createdAt: string;
}

/** Clerkship procedure / clinical-skills tracker status. */
export type SkillPracticeStatus =
  | "not_started"
  | "simulated"
  | "verified";

export interface SkillProgress {
  skillId: string;
  status: SkillPracticeStatus;
  updatedAt: string;
  notes?: string;
}

export interface StudentState {
  userId: string;
  lessonProgress: Record<string, LessonProgress>;
  moduleProgress: Record<string, ModuleProgress>;
  quizAttempts: QuizAttempt[];
  examAttempts: ExamAttempt[];
  cardReviews: Record<string, CardReview>;
  qbankAttempts: QbankAttempt[];
  caseAttempts: CaseAttempt[];
  tutorThreads: TutorThread[];
  /** Optional for older saved progress files; treated as {} when missing. */
  skillProgress?: Record<string, SkillProgress>;
}
