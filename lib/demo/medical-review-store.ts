import { promises as fs } from "fs";
import path from "path";
import { ensureDemoDataDir } from "@/lib/demo/data-dir";
import type {
  ContentVersionEntry,
  MedicalReviewStatus,
} from "@/lib/curriculum/content-metadata";

export type MedicalReviewRecord = {
  lessonId: string;
  reviewStatus: MedicalReviewStatus;
  medicalReviewer?: string;
  lastReviewed?: string;
  nextReview?: string;
  notes?: string;
  version: number;
  versionHistory: ContentVersionEntry[];
  updatedAt: string;
};

type StoreFile = { lessons: Record<string, MedicalReviewRecord> };

async function filePath() {
  const dir = await ensureDemoDataDir();
  return path.join(dir, "medical-review.json");
}

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await fs.readFile(await filePath(), "utf8");
    return JSON.parse(raw) as StoreFile;
  } catch {
    return { lessons: {} };
  }
}

async function writeStore(store: StoreFile) {
  try {
    await fs.writeFile(await filePath(), JSON.stringify(store, null, 2), "utf8");
  } catch {
    /* ignore durable write failures in ephemeral envs */
  }
}

export async function listMedicalReviews(): Promise<MedicalReviewRecord[]> {
  const store = await readStore();
  return Object.values(store.lessons);
}

export async function getMedicalReview(
  lessonId: string,
): Promise<MedicalReviewRecord | undefined> {
  const store = await readStore();
  return store.lessons[lessonId];
}

export async function upsertMedicalReview(args: {
  lessonId: string;
  reviewStatus: MedicalReviewStatus;
  medicalReviewer: string;
  notes?: string;
  nextReview?: string;
  reason: string;
}): Promise<MedicalReviewRecord> {
  const store = await readStore();
  const prev = store.lessons[args.lessonId];
  const now = new Date().toISOString();
  const version = (prev?.version ?? 0) + 1;
  const entry: ContentVersionEntry = {
    version,
    date: now.slice(0, 10),
    changedBy: args.medicalReviewer,
    reason: args.reason,
  };
  const record: MedicalReviewRecord = {
    lessonId: args.lessonId,
    reviewStatus: args.reviewStatus,
    medicalReviewer: args.medicalReviewer,
    lastReviewed: now.slice(0, 10),
    nextReview: args.nextReview ?? prev?.nextReview,
    notes: args.notes,
    version,
    versionHistory: [...(prev?.versionHistory ?? []), entry].slice(-20),
    updatedAt: now,
  };
  store.lessons[args.lessonId] = record;
  await writeStore(store);
  return record;
}
