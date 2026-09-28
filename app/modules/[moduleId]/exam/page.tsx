import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { ExamRunner } from "@/components/student/exam-runner";
import {
  getMergedQuestionMap,
  getModule,
} from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";
import type { QuizQuestion } from "@/lib/types/domain";

export default async function ModuleExamPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = await getModule(moduleId);
  if (!mod?.exam) notFound();
  const state = await readStudentState();
  const lessonsOk = mod.lessons.every(
    (l) => state.lessonProgress[l.id]?.state === "mastered",
  );
  const qmap = await getMergedQuestionMap();
  const questions: QuizQuestion[] = mod.exam.questionIds
    .map((id) => qmap[id])
    .filter(Boolean);

  return (
    <AppShell title="Module assessment">
      <p className="mb-2 text-sm text-[var(--muted)]">{mod.title}</p>
      <p className="mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        You’ve reached the end of this module. Use the assessment to check whether you’re ready to
        move on. Pass threshold: {Math.round(mod.exam.passThreshold * 100)}%.
      </p>
      <ExamRunner
        moduleId={moduleId}
        questions={questions}
        passThreshold={mod.exam.passThreshold}
        lockedReason={
          lessonsOk
            ? undefined
            : "Complete the lessons in this module before starting the assessment."
        }
      />
    </AppShell>
  );
}
