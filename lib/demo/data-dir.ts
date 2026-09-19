import { promises as fs } from "fs";
import os from "os";
import path from "path";

/**
 * Demo JSON persistence directory.
 * On Vercel (and similar serverless hosts) `process.cwd()` is read-only, so
 * mkdir/write to `.data` throws EROFS and crashes dynamic routes like /lessons/[id].
 * Prefer /tmp there; keep project-local `.data` for local/dev.
 */
function preferredDataDir(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "online-md-data");
  }
  return path.join(process.cwd(), ".data");
}

let resolvedDir: string | null = null;

export async function getDemoDataDir(): Promise<string> {
  if (resolvedDir) return resolvedDir;

  const primary = preferredDataDir();
  try {
    await fs.mkdir(primary, { recursive: true });
    // Prove writes work (some hosts allow mkdir but not write).
    const probe = path.join(primary, ".write-probe");
    await fs.writeFile(probe, "ok");
    await fs.unlink(probe).catch(() => undefined);
    resolvedDir = primary;
    return resolvedDir;
  } catch {
    const fallback = path.join(os.tmpdir(), "online-md-data");
    await fs.mkdir(fallback, { recursive: true });
    resolvedDir = fallback;
    return resolvedDir;
  }
}

export async function ensureDemoDataDir(): Promise<string> {
  return getDemoDataDir();
}
