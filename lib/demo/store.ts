import { promises as fs } from "fs";
import path from "path";
import type { DemoUser, StudentState } from "@/lib/types/domain";
import { DEMO_USERS } from "@/lib/demo/users";
import { listUsers } from "@/lib/demo/admin-store";
import { newId } from "@/lib/demo/ids";

export { DEMO_USERS, newId };

const DATA_DIR = path.join(process.cwd(), ".data");
const STATE_FILE = path.join(DATA_DIR, "student-state.json");
const SESSION_FILE = path.join(DATA_DIR, "session.json");

function emptyState(userId: string): StudentState {
  return {
    userId,
    lessonProgress: {},
    moduleProgress: {},
    quizAttempts: [],
    examAttempts: [],
    cardReviews: {},
    qbankAttempts: [],
    caseAttempts: [],
    tutorThreads: [],
  };
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readStudentState(userId = "user-student-1"): Promise<StudentState> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(STATE_FILE, "utf8");
    const parsed = JSON.parse(raw) as StudentState;
    if (parsed.userId !== userId) return emptyState(userId);
    return parsed;
  } catch {
    return emptyState(userId);
  }
}

export async function writeStudentState(state: StudentState) {
  await ensureDataDir();
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2), "utf8");
}

export async function updateStudentState(
  updater: (state: StudentState) => StudentState | Promise<StudentState>,
  userId = "user-student-1",
) {
  const current = await readStudentState(userId);
  const next = await updater(current);
  await writeStudentState(next);
  return next;
}

export async function getSessionUserId(): Promise<string> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(SESSION_FILE, "utf8");
    const parsed = JSON.parse(raw) as { userId: string };
    return parsed.userId || "user-student-1";
  } catch {
    return "user-student-1";
  }
}

export async function setSessionUserId(userId: string) {
  await ensureDataDir();
  await fs.writeFile(SESSION_FILE, JSON.stringify({ userId }, null, 2), "utf8");
}

export async function getSessionUser(): Promise<DemoUser> {
  const id = await getSessionUserId();
  const users = await listUsers();
  return users.find((u) => u.id === id) ?? DEMO_USERS[0];
}
