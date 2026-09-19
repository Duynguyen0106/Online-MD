import { AppShell } from "@/components/shared/app-shell";
import { QbankPanel } from "@/components/student/qbank-panel";
import { getQbankQuestions } from "@/lib/curriculum/accessors";
import { IDS } from "@/lib/curriculum/seed";
import { readStudentState } from "@/lib/demo/store";
import {
  canAccessModuleQbank,
  canAccessStep1Qbank,
  canAccessStep2CkQbank,
} from "@/lib/mastery/gates";

export default async function QbankPage() {
  const state = await readStudentState();
  const moduleGate = canAccessModuleQbank(state, IDS.modCvb);
  const step1 = canAccessStep1Qbank(state);
  const step2 = canAccessStep2CkQbank(state);
  const questions = getQbankQuestions();

  return (
    <AppShell title="USMLE Qbank">
      <p className="mb-6 max-w-3xl text-sm text-[var(--muted)]">
        Assessment layer only. Module banks unlock after module mastery; Step 1 after all Phase 1
        modules; Step 2 CK after all core clerkships. Server actions reject locked starts.
      </p>
      <QbankPanel
        moduleId={IDS.modCvb}
        moduleGateReason={moduleGate.unlocked ? undefined : moduleGate.reason}
        step1Reason={step1.unlocked ? undefined : step1.reason}
        step2Reason={step2.unlocked ? undefined : step2.reason}
        questionsPreview={questions}
      />
    </AppShell>
  );
}
