import { AppShell } from "@/components/shared/app-shell";
import { QbankPanel } from "@/components/student/qbank-panel";
import { getAllModules, getQbankQuestions } from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";
import {
  canAccessModuleQbank,
  canAccessStep1Qbank,
  canAccessStep2CkQbank,
} from "@/lib/mastery/gates";

export default async function QbankPage() {
  const state = await readStudentState();
  const modules = await getAllModules();
  const moduleGates: Record<string, string | undefined> = {};
  for (const mod of modules) {
    const gate = await canAccessModuleQbank(state, mod.id);
    moduleGates[mod.id] = gate.unlocked ? undefined : gate.reason;
  }
  const step1 = await canAccessStep1Qbank(state);
  const step2 = await canAccessStep2CkQbank(state);
  const questions = getQbankQuestions();

  return (
    <AppShell title="USMLE Qbank">
      <p className="mb-6 max-w-3xl text-sm text-[var(--muted)]">
        Assessment layer only. Module banks unlock after module mastery; Step 1 after all Phase 1
        modules; Step 2 CK after all core clerkships. Server actions reject locked starts.
      </p>
      <QbankPanel
        modules={modules.map((m) => ({ id: m.id, title: m.title }))}
        moduleGates={moduleGates}
        step1Reason={step1.unlocked ? undefined : step1.reason}
        step2Reason={step2.unlocked ? undefined : step2.reason}
        questionsPreview={questions}
      />
    </AppShell>
  );
}
