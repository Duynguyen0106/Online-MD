import { promises as fs } from "fs";
import path from "path";
import type { DemoUser, StudentState } from "@/lib/types/domain";
import { DEMO_USERS } from "@/lib/demo/users";
import { listUsers } from "@/lib/demo/admin-store";
import { newId } from "@/lib/demo/ids";

export { DEMO_USERS, newId };

const DATA_DIR = path.join(process.cwd(), ".data");
const SESSION_FILE = path.join(DATA_DIR, "session.json");
const LEGACY_STATE_FILE = path.join(DATA_DIR, "student-state.json");

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

function stateFileFor(userId: string) {
  const safe = userId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(DATA_DIR, `progress-${safe}.json`);
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readStudentState(userId?: string): Promise<StudentState> {
  const id = userId ?? (await getSessionUserId());
  await ensureDataDir();
  const file = stateFileFor(id);
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as StudentState;
    return { ...parsed, userId: id };
  } catch {
    // migrate legacy single-file store for default student
    if (id === "user-student-1") {
      try {
        const legacy = JSON.parse(
          await fs.readFile(LEGACY_STATE_FILE, "utf8"),
        ) as StudentState;
        if (legacy.userId === id) {
          await writeStudentState(legacy);
          return legacy;
        }
      } catch {
        /* no legacy */
      }
    }
    return emptyState(id);
  }
}

export async function writeStudentState(state: StudentState) {
  await ensureDataDir();
  await fs.writeFile(stateFileFor(state.userId), JSON.stringify(state, null, 2), "utf8");
}

export async function updateStudentState(
  updater: (state: StudentState) => StudentState | Promise<StudentState>,
  userId?: string,
) {
  const id = userId ?? (await getSessionUserId());
  const current = await readStudentState(id);
  const next = await updater(current);
  next.userId = id;
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

export async function resetCurrentUserProgress() {
  const id = await getSessionUserId();
  const empty = emptyState(id);
  await writeStudentState(empty);
  return empty;
}
