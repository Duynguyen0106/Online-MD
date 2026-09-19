import { promises as fs } from "fs";
import path from "path";
import { createHash, randomBytes } from "crypto";
import type {
  ContentBlock,
  DemoUser,
  Invite,
  Lesson,
  UnlockRule,
} from "@/lib/types/domain";
import { DEMO_USERS } from "@/lib/demo/users";
import { program as seedProgram } from "@/lib/curriculum/seed";
import { applyCurriculumExpansions } from "@/lib/curriculum/expansions";
import { newId } from "@/lib/demo/ids";
import { ensureDemoDataDir } from "@/lib/demo/data-dir";

async function dataFiles() {
  const dir = await ensureDemoDataDir();
  return {
    invites: path.join(dir, "invites.json"),
    unlock: path.join(dir, "unlock-rules.json"),
    overrides: path.join(dir, "curriculum-overrides.json"),
    users: path.join(dir, "users.json"),
  };
}

export type LessonOverride = {
  lessonId: string;
  title?: string;
  estimatedMinutes?: number;
  quizPassThreshold?: number;
  concepts?: Lesson["concepts"];
  updatedAt: string;
  updatedBy: string;
};

export type CurriculumOverrides = {
  lessons: Record<string, LessonOverride>;
  flashcards?: FacultyFlashcard[];
  questions?: FacultyQuestion[];
};

export type FacultyFlashcard = {
  id: string;
  lessonId?: string;
  front: string;
  back: string;
  objectiveId?: string;
  updatedAt: string;
  updatedBy: string;
};

export type FacultyQuestion = {
  id: string;
  lessonId?: string;
  moduleExamId?: string;
  stem: string;
  choices: { id: string; text: string }[];
  correctChoiceId: string;
  explanation: string;
  sequence: number;
  updatedAt: string;
  updatedBy: string;
};

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    await ensureDemoDataDir();
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  try {
    await ensureDemoDataDir();
    await fs.writeFile(file, JSON.stringify(value, null, 2), "utf8");
  } catch {
    /* serverless: ignore durable write failures */
  }
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function createInviteToken() {
  return randomBytes(24).toString("hex");
}

const DEFAULT_UNLOCK_RULES: UnlockRule[] = [
  {
    id: "rule-module-qbank",
    scope: "module_qbank",
    name: "Module Qbank after module mastery",
    requiresAllModulesInPhase: false,
    requiresCoreClerkship: false,
    minModuleState: "mastered",
    isActive: true,
  },
  {
    id: "rule-step1",
    scope: "phase_step1_qbank",
    name: "Step 1 Qbank after all foundations modules",
    requiresAllModulesInPhase: true,
    requiresCoreClerkship: false,
    minModuleState: "mastered",
    isActive: true,
  },
  {
    id: "rule-step2",
    scope: "clerkship_step2_qbank",
    name: "Step 2 CK Qbank after core clerkships",
    requiresAllModulesInPhase: false,
    requiresCoreClerkship: true,
    minModuleState: "mastered",
    isActive: true,
  },
];

export async function listUsers(): Promise<DemoUser[]> {
  const files = await dataFiles();
  const extra = await readJson<DemoUser[]>(files.users, []);
  const byId = new Map<string, DemoUser>();
  for (const u of [...DEMO_USERS, ...extra]) byId.set(u.id, u);
  return [...byId.values()];
}

export async function addProvisionedUser(user: DemoUser) {
  const users = await listUsers();
  if (users.some((u) => u.email === user.email)) {
    throw new Error("User already exists");
  }
  const files = await dataFiles();
  const extra = await readJson<DemoUser[]>(files.users, []);
  extra.push(user);
  await writeJson(files.users, extra);
  return user;
}

export async function listInvites(): Promise<Invite[]> {
  const files = await dataFiles();
  return readJson<Invite[]>(files.invites, []);
}

export async function createInvite(input: {
  email: string;
  role: "faculty" | "admin";
  invitedBy: string;
  expiresInDays?: number;
}) {
  const token = createInviteToken();
  const invite: Invite = {
    id: newId("invite"),
    email: input.email.toLowerCase().trim(),
    role: input.role,
    tokenHash: hashToken(token),
    status: "pending",
    invitedBy: input.invitedBy,
    expiresAt: new Date(
      Date.now() + (input.expiresInDays ?? 7) * 24 * 60 * 60 * 1000,
    ).toISOString(),
    createdAt: new Date().toISOString(),
  };
  const invites = await listInvites();
  invites.unshift(invite);
  const files = await dataFiles();
  await writeJson(files.invites, invites);
  return { invite, token };
}

export async function revokeInvite(inviteId: string) {
  const invites = await listInvites();
  const next = invites.map((i) =>
    i.id === inviteId ? { ...i, status: "revoked" as const } : i,
  );
  const files = await dataFiles();
  await writeJson(files.invites, next);
}

export async function acceptInvite(token: string, fullName: string) {
  const hash = hashToken(token);
  const invites = await listInvites();
  const invite = invites.find((i) => i.tokenHash === hash);
  if (!invite) throw new Error("Invalid invite");
  if (invite.status !== "pending") throw new Error("Invite is not pending");
  if (new Date(invite.expiresAt).getTime() < Date.now()) {
    throw new Error("Invite expired");
  }
  const user: DemoUser = {
    id: newId("user"),
    email: invite.email,
    fullName,
    role: invite.role,
  };
  await addProvisionedUser(user);
  invite.status = "accepted";
  invite.acceptedAt = new Date().toISOString();
  const files = await dataFiles();
  await writeJson(files.invites, invites);
  return user;
}

export async function listUnlockRules(): Promise<UnlockRule[]> {
  const files = await dataFiles();
  return readJson<UnlockRule[]>(files.unlock, DEFAULT_UNLOCK_RULES);
}

export async function saveUnlockRules(rules: UnlockRule[]) {
  const files = await dataFiles();
  await writeJson(files.unlock, rules);
}

export async function getCurriculumOverrides(): Promise<CurriculumOverrides> {
  const files = await dataFiles();
  return readJson<CurriculumOverrides>(files.overrides, { lessons: {} });
}

export async function saveLessonOverride(override: LessonOverride) {
  const current = await getCurriculumOverrides();
  current.lessons[override.lessonId] = override;
  const files = await dataFiles();
  await writeJson(files.overrides, current);
  return override;
}

export async function listFacultyFlashcards(): Promise<FacultyFlashcard[]> {
  const current = await getCurriculumOverrides();
  return current.flashcards ?? [];
}

export async function upsertFacultyFlashcard(
  card: Omit<FacultyFlashcard, "updatedAt"> & { updatedAt?: string },
) {
  const current = await getCurriculumOverrides();
  const cards = current.flashcards ?? [];
  const next: FacultyFlashcard = {
    ...card,
    updatedAt: new Date().toISOString(),
  };
  const idx = cards.findIndex((c) => c.id === card.id);
  if (idx >= 0) cards[idx] = next;
  else cards.push(next);
  current.flashcards = cards;
  const files = await dataFiles();
  await writeJson(files.overrides, current);
  return next;
}

export async function deleteFacultyFlashcard(id: string) {
  const current = await getCurriculumOverrides();
  current.flashcards = (current.flashcards ?? []).filter((c) => c.id !== id);
  const files = await dataFiles();
  await writeJson(files.overrides, current);
}

export async function listFacultyQuestions(): Promise<FacultyQuestion[]> {
  const current = await getCurriculumOverrides();
  return current.questions ?? [];
}

export async function upsertFacultyQuestion(
  question: Omit<FacultyQuestion, "updatedAt"> & { updatedAt?: string },
) {
  const current = await getCurriculumOverrides();
  const questions = current.questions ?? [];
  const next: FacultyQuestion = {
    ...question,
    updatedAt: new Date().toISOString(),
  };
  const idx = questions.findIndex((q) => q.id === question.id);
  if (idx >= 0) questions[idx] = next;
  else questions.push(next);
  current.questions = questions;
  const files = await dataFiles();
  await writeJson(files.overrides, current);
  return next;
}

export async function deleteFacultyQuestion(id: string) {
  const current = await getCurriculumOverrides();
  current.questions = (current.questions ?? []).filter((q) => q.id !== id);
  const files = await dataFiles();
  await writeJson(files.overrides, current);
}

/** Resolve live curriculum with expansions + faculty overrides applied. */
export async function getResolvedProgram() {
  const overrides = await getCurriculumOverrides();
  const cloned = applyCurriculumExpansions(structuredClone(seedProgram));
  for (const phase of cloned.phases) {
    for (const mod of phase.modules) {
      mod.lessons = mod.lessons.map((lesson) => {
        const o = overrides.lessons[lesson.id];
        if (!o) return lesson;
        return {
          ...lesson,
          title: o.title ?? lesson.title,
          estimatedMinutes: o.estimatedMinutes ?? lesson.estimatedMinutes,
          quizPassThreshold: o.quizPassThreshold ?? lesson.quizPassThreshold,
          concepts: o.concepts ?? lesson.concepts,
        };
      });
    }
  }
  return cloned;
}

export function assertContentBlocks(blocks: ContentBlock[]) {
  return blocks;
}

export { newId };
