"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  acceptInvite,
  createInvite,
  deleteFacultyFlashcard,
  deleteFacultyQuestion,
  listInvites,
  listUnlockRules,
  listUsers,
  newId,
  revokeInvite,
  saveLessonOverride,
  saveUnlockRules,
  upsertFacultyFlashcard,
  upsertFacultyQuestion,
} from "@/lib/demo/admin-store";
import { getSessionUser, setSessionUserId } from "@/lib/demo/store";
import { getLesson } from "@/lib/curriculum/accessors";
import type { ContentBlockType, UnlockRule } from "@/lib/types/domain";

async function requireRoles(roles: Array<"faculty" | "admin">) {
  const user = await getSessionUser();
  if (!roles.includes(user.role as "faculty" | "admin")) {
    throw new Error("Forbidden");
  }
  return user;
}

const lessonEditSchema = z.object({
  lessonId: z.string().min(1),
  title: z.string().min(3).max(200),
  estimatedMinutes: z.number().int().min(5).max(240),
  quizPassThreshold: z.number().min(0.5).max(1),
  concepts: z
    .array(
      z.object({
        id: z.string(),
        lessonId: z.string(),
        title: z.string().min(1),
        sequence: z.number().int(),
        summary: z.string().min(1),
        blocks: z.array(
          z.object({
            id: z.string(),
            conceptId: z.string(),
            blockType: z.enum([
              "video",
              "reading",
              "diagram",
              "audio",
              "clinical_vignette",
              "formative_question",
            ] as [ContentBlockType, ...ContentBlockType[]]),
            title: z.string().min(1),
            sequence: z.number().int(),
            bodyMd: z.string().optional(),
            mediaUrl: z.string().optional(),
            mediaProvider: z
              .enum(["youtube", "vimeo", "mux", "other"])
              .optional(),
            durationSeconds: z.number().optional(),
          }),
        ),
      }),
    )
    .min(1),
});

export async function saveFacultyLesson(input: unknown) {
  const user = await requireRoles(["faculty", "admin"]);
  const parsed = lessonEditSchema.parse(input);
  const existing = await getLesson(parsed.lessonId);
  if (!existing) throw new Error("Lesson not found");

  await saveLessonOverride({
    lessonId: parsed.lessonId,
    title: parsed.title,
    estimatedMinutes: parsed.estimatedMinutes,
    quizPassThreshold: parsed.quizPassThreshold,
    concepts: parsed.concepts,
    updatedAt: new Date().toISOString(),
    updatedBy: user.id,
  });

  revalidatePath(`/faculty/lessons/${parsed.lessonId}`);
  revalidatePath(`/lessons/${parsed.lessonId}`);
  revalidatePath("/faculty");
  revalidatePath("/dashboard");
  return { ok: true as const };
}

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["faculty", "admin"]),
});

export async function createFacultyInvite(input: unknown) {
  const user = await requireRoles(["admin"]);
  const parsed = inviteSchema.parse(input);
  const { invite, token } = await createInvite({
    email: parsed.email,
    role: parsed.role,
    invitedBy: user.id,
  });
  revalidatePath("/admin/invites");
  return {
    ok: true as const,
    inviteId: invite.id,
    acceptPath: `/invite/${token}`,
    token,
  };
}

export async function revokeFacultyInvite(inviteId: string) {
  await requireRoles(["admin"]);
  await revokeInvite(inviteId);
  revalidatePath("/admin/invites");
  return { ok: true as const };
}

const acceptSchema = z.object({
  token: z.string().min(10),
  fullName: z.string().min(2).max(120),
});

export async function acceptFacultyInvite(input: unknown) {
  const parsed = acceptSchema.parse(input);
  const user = await acceptInvite(parsed.token, parsed.fullName);
  await setSessionUserId(user.id);
  revalidatePath("/", "layout");
  return { ok: true as const, user };
}

export async function getAdminDirectory() {
  await requireRoles(["admin"]);
  const [users, invites, unlockRules] = await Promise.all([
    listUsers(),
    listInvites(),
    listUnlockRules(),
  ]);
  return { users, invites, unlockRules };
}

const unlockToggleSchema = z.object({
  ruleId: z.string(),
  isActive: z.boolean(),
});

export async function setUnlockRuleActive(input: unknown) {
  await requireRoles(["admin"]);
  const parsed = unlockToggleSchema.parse(input);
  const rules = await listUnlockRules();
  const next: UnlockRule[] = rules.map((r) =>
    r.id === parsed.ruleId ? { ...r, isActive: parsed.isActive } : r,
  );
  await saveUnlockRules(next);
  revalidatePath("/admin/unlock-rules");
  revalidatePath("/qbank");
  return { ok: true as const };
}

const flashcardSchema = z.object({
  id: z.string().optional(),
  lessonId: z.string().optional(),
  front: z.string().min(1).max(500),
  back: z.string().min(1).max(2000),
  objectiveId: z.string().optional(),
});

export async function saveFacultyFlashcard(input: unknown) {
  const user = await requireRoles(["faculty", "admin"]);
  const parsed = flashcardSchema.parse(input);
  const saved = await upsertFacultyFlashcard({
    id: parsed.id ?? newId("fc"),
    lessonId: parsed.lessonId,
    front: parsed.front,
    back: parsed.back,
    objectiveId: parsed.objectiveId,
    updatedBy: user.id,
  });
  revalidatePath("/faculty/flashcards");
  revalidatePath("/flashcards");
  return { ok: true as const, card: saved };
}

export async function removeFacultyFlashcard(id: string) {
  await requireRoles(["faculty", "admin"]);
  await deleteFacultyFlashcard(id);
  revalidatePath("/faculty/flashcards");
  revalidatePath("/flashcards");
  return { ok: true as const };
}

const questionSchema = z.object({
  id: z.string().optional(),
  lessonId: z.string().min(1),
  stem: z.string().min(10).max(2000),
  choices: z
    .array(z.object({ id: z.string(), text: z.string().min(1) }))
    .length(4),
  correctIndex: z.number().int().min(0).max(3),
  explanation: z.string().min(5).max(2000),
});

export async function saveFacultyQuestion(input: unknown) {
  const user = await requireRoles(["faculty", "admin"]);
  const parsed = questionSchema.parse(input);
  const choices = parsed.choices.map((c, i) => ({
    id: c.id || `${parsed.id ?? "q"}-c${i}`,
    text: c.text,
  }));
  const saved = await upsertFacultyQuestion({
    id: parsed.id ?? newId("qq"),
    lessonId: parsed.lessonId,
    stem: parsed.stem,
    choices,
    correctChoiceId: choices[parsed.correctIndex].id,
    explanation: parsed.explanation,
    sequence: 99,
    updatedBy: user.id,
  });
  revalidatePath("/faculty/questions");
  revalidatePath(`/lessons/${parsed.lessonId}/quiz`);
  return { ok: true as const, question: saved };
}

export async function removeFacultyQuestion(id: string) {
  await requireRoles(["faculty", "admin"]);
  await deleteFacultyQuestion(id);
  revalidatePath("/faculty/questions");
  return { ok: true as const };
}

export async function loginDemoStudent(email: string) {
  const users = await listUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.role === "student",
  );
  if (!user) throw new Error("Student not found. Use student@online-md.local in demo.");
  await setSessionUserId(user.id);
  revalidatePath("/", "layout");
  return { ok: true as const };
}
