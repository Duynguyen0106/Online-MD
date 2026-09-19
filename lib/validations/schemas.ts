import { z } from "zod";

export const tutorOutputSchema = z.object({
  reply: z.string().min(1),
  relatedObjectiveIds: z.array(z.string()).default([]),
  suggestedNextBlockId: z.string().optional(),
  keyTeachingPoints: z.array(z.string()).default([]),
  disclaimers: z.array(z.string()).default([]),
  uncertaintyNotes: z.array(z.string()).default([]),
});

export type TutorOutput = z.infer<typeof tutorOutputSchema>;

export const caseFeedbackSchema = z.object({
  overallAssessment: z.string().min(1),
  strengths: z.array(z.string()).default([]),
  gaps: z.array(z.string()).default([]),
  rubricScores: z
    .array(
      z.object({
        criterion: z.string(),
        score: z.number().min(0).max(5),
        comment: z.string().optional(),
      }),
    )
    .default([]),
  followUpQuestions: z.array(z.string()).default([]),
  safetyFlags: z.array(z.string()).default([]),
  disclaimers: z.array(z.string()).default([]),
});

export type CaseFeedback = z.infer<typeof caseFeedbackSchema>;

export const markBlockSchema = z.object({
  lessonId: z.string().min(1),
  blockId: z.string().min(1),
});

export const submitQuizSchema = z.object({
  lessonId: z.string().min(1),
  responses: z.record(z.string(), z.string()),
});

export const submitExamSchema = z.object({
  moduleId: z.string().min(1),
  responses: z.record(z.string(), z.string()),
});

export const reviewCardSchema = z.object({
  flashcardId: z.string().min(1),
  quality: z.number().int().min(0).max(5),
});

export const startQbankSchema = z.object({
  moduleId: z.string().optional(),
  usmleStep: z.enum(["step1", "step2ck"]).optional(),
  mode: z.enum(["tutor", "timed"]).default("tutor"),
});

export const submitQbankSchema = z.object({
  attemptId: z.string().min(1),
  responses: z.record(z.string(), z.string()),
});

export const tutorMessageSchema = z.object({
  message: z.string().min(1).max(4000),
  lessonId: z.string().optional(),
  threadId: z.string().optional(),
});

export const caseResponseSchema = z.object({
  caseId: z.string().min(1),
  responses: z.record(z.string(), z.string()),
});
