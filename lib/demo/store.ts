import { promises as fs } from "fs";
import path from "path";
import type { DemoUser, StudentState } from "@/lib/types/domain";
import { DEMO_USERS } from "@/lib/demo/users";
import { listUsers } from "@/lib/demo/admin-store";
import { newId } from "@/lib/demo/ids";
import { ensureDemoDataDir } from "@/lib/demo/data-dir";

export { DEMO_USERS, newId };

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

async function paths() {
  const dir = await ensureDemoDataDir();
  return {
    dir,
    session: path.join(dir, "session.json"),
    legacy: path.join(dir, "student-state.json"),
    stateFor: (userId: string) => {
      const safe = userId.replace(/[^a-zA-Z0-9_-]/g, "_");
      return path.join(dir, `progress-${safe}.json`);
    },
  };
}

/** In-memory fallback when disk is unavailable mid-request. */
const memoryState = new Map<string, StudentState>();
let memorySessionUserId: string | null = null;

export async function readStudentState(userId?: string): Promise<StudentState> {
  const id = userId ?? (await getSessionUserId());
  try {
    const p = await paths();
    try {
      const raw = await fs.readFile(p.stateFor(id), "utf8");
      const parsed = JSON.parse(raw) as StudentState;
      return { ...parsed, userId: id };
    } catch {
      if (id === "user-student-1") {
        try {
          const legacy = JSON.parse(await fs.readFile(p.legacy, "utf8")) as StudentState;
          if (legacy.userId === id) {
            await writeStudentState(legacy);
            return legacy;
          }
        } catch {
          /* no legacy */
        }
      }
    }
  } catch {
    /* disk unavailable */
  }
  return memoryState.get(id) ?? emptyState(id);
}

export async function writeStudentState(state: StudentState) {
  memoryState.set(state.userId, state);
  try {
    const p = await paths();
    await fs.writeFile(p.stateFor(state.userId), JSON.stringify(state, null, 2), "utf8");
  } catch {
    /* keep memory copy on serverless write failure */
  }
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
  if (memorySessionUserId) return memorySessionUserId;
  try {
    const p = await paths();
    const raw = await fs.readFile(p.session, "utf8");
    const parsed = JSON.parse(raw) as { userId: string };
    return parsed.userId || "user-student-1";
  } catch {
    return "user-student-1";
  }
}

export async function setSessionUserId(userId: string) {
  memorySessionUserId = userId;
  try {
    const p = await paths();
    await fs.writeFile(p.session, JSON.stringify({ userId }, null, 2), "utf8");
  } catch {
    /* memory session only */
  }
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
