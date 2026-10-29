import { AppShell } from "@/components/shared/app-shell";
import { QbankPanel } from "@/components/student/qbank-panel";
import { STUDENT_COPY } from "@/lib/copy/student";
import { getAllModules, getQbankQuestions } from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";
import {
  canAccessModuleQbank,
  canAccessStep1Qbank,
  canAccessStep2CkQbank,
} from "@/lib/mastery/gates";
import type { QbankBankParam } from "@/lib/routes/practice";

function parseBank(raw: string | string[] | undefined): QbankBankParam {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === "step1" || value === "step2ck" || value === "module") return value;
  return "module";
}

export default async function QbankPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const initialBank = parseBank(params.bank);
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
    <AppShell title={STUDENT_COPY.questionBank}>
      <p className="mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        {STUDENT_COPY.learnFirstPracticeSecond} {STUDENT_COPY.qbankIntro}
      </p>
      <QbankPanel
        modules={modules.map((m) => ({ id: m.id, title: m.title }))}
        moduleGates={moduleGates}
        step1Reason={step1.unlocked ? undefined : step1.reason}
        step2Reason={step2.unlocked ? undefined : step2.reason}
        questionsPreview={questions}
        initialBank={initialBank}
      />
    </AppShell>
  );
}
