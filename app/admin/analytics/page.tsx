import { AppShell } from "@/components/shared/app-shell";
import { ProgressBar } from "@/components/ui/badge";
import { getAllLessons, getAllModules, getObjectives } from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";
import {
  canAccessStep1Qbank,
  canAccessStep2CkQbank,
} from "@/lib/mastery/gates";

export default async function AdminAnalyticsPage() {
  const state = await readStudentState("user-student-1");
  const modules = await getAllModules();
  const lessons = await getAllLessons();
  const objectives = getObjectives();
  const masteredLessons = Object.values(state.lessonProgress).filter(
    (p) => p.state === "mastered",
  ).length;
  const masteredModules = Object.values(state.moduleProgress).filter(
    (p) => p.state === "mastered",
  ).length;
  const step1 = await canAccessStep1Qbank(state);
  const step2 = await canAccessStep2CkQbank(state);

  return (
    <AppShell title="Admin analytics">
      <div className="mb-4 flex flex-wrap gap-3 text-sm">
        <a className="text-[var(--brand-strong)] underline" href="/admin/users">
          Users
        </a>
        <a className="text-[var(--brand-strong)] underline" href="/admin/invites">
          Invites
        </a>
        <a className="text-[var(--brand-strong)] underline" href="/admin/unlock-rules">
          Unlock rules
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Modules in catalog" value={String(modules.length)} />
        <Stat label="Lessons" value={String(lessons.length)} />
        <Stat label="Objectives tagged" value={String(objectives.length)} />
        <Stat
          label="Demo student mastery"
          value={`${masteredModules}/${modules.length} modules`}
        />
      </div>

      <section className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="font-[family-name:var(--font-display)] text-xl">Unlock funnel</h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-1 text-sm">Lesson mastery</p>
            <ProgressBar
              value={lessons.length ? masteredLessons / lessons.length : 0}
            />
          </div>
          <div>
            <p className="mb-1 text-sm">Module mastery</p>
            <ProgressBar
              value={modules.length ? masteredModules / modules.length : 0}
            />
          </div>
          <p className="text-sm text-[var(--muted)]">
            Step 1 Qbank: {step1.unlocked ? "unlocked" : step1.reason}
          </p>
          <p className="text-sm text-[var(--muted)]">
            Step 2 CK Qbank: {step2.unlocked ? "unlocked" : step2.reason}
          </p>
        </div>
      </section>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">{value}</p>
    </div>
  );
}
