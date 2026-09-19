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

export interface ClinicalCase {
  id: string;
  moduleId?: string;
  title: string;
  presentationMd: string;
  stages: { id: string; prompt: string; expectedFocus: string }[];
  teachingPoints: string;
  objectiveIds: string[];
  status: PublishStatus;
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
}
