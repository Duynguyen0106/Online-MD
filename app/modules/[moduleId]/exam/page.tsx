import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { ExamRunner } from "@/components/student/exam-runner";
import { getModule, getQuestionsByIds } from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";

export default async function ModuleExamPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = getModule(moduleId);
  if (!mod?.exam) notFound();
  const state = await readStudentState();
  const lessonsOk = mod.lessons.every(
    (l) => state.lessonProgress[l.id]?.state === "mastered",
  );
  const questions = getQuestionsByIds(mod.exam.questionIds);

  return (
    <AppShell title={mod.exam.title}>
      <p className="mb-6 text-sm text-[var(--muted)]">
        Pass ≥{Math.round(mod.exam.passThreshold * 100)}% after mastering all lessons to master the
        module and unlock its Qbank.
      </p>
      <ExamRunner
        moduleId={moduleId}
        questions={questions}
        passThreshold={mod.exam.passThreshold}
        lockedReason={
          lessonsOk ? undefined : "Master all lessons in this module before sitting the exam."
        }
      />
    </AppShell>
  );
}
