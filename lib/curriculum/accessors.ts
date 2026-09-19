import { getResolvedProgram } from "@/lib/demo/admin-store";
import {
  clinicalCases,
  flashcards,
  getQuestionMap,
  objectives,
  qbankQuestions,
  quizQuestions,
} from "@/lib/curriculum/seed";
import type {
  Lesson,
  Module,
  Phase,
  Program,
  QuizQuestion,
} from "@/lib/types/domain";

export { getQuestionMap };

export async function getProgram(): Promise<Program> {
  return getResolvedProgram();
}

export async function getPhases(): Promise<Phase[]> {
  const program = await getProgram();
  return program.phases;
}

export async function getAllModules(): Promise<Module[]> {
  const phases = await getPhases();
  return phases.flatMap((p) => p.modules);
}

export async function getModule(moduleId: string): Promise<Module | undefined> {
  return (await getAllModules()).find((m) => m.id === moduleId);
}

export async function getPhaseForModule(
  moduleId: string,
): Promise<Phase | undefined> {
  const phases = await getPhases();
  return phases.find((p) => p.modules.some((m) => m.id === moduleId));
}

export async function getAllLessons(): Promise<Lesson[]> {
  return (await getAllModules()).flatMap((m) => m.lessons);
}

export async function getLesson(lessonId: string): Promise<Lesson | undefined> {
  return (await getAllLessons()).find((l) => l.id === lessonId);
}

export async function getModuleForLesson(
  lessonId: string,
): Promise<Module | undefined> {
  return (await getAllModules()).find((m) =>
    m.lessons.some((l) => l.id === lessonId),
  );
}

export function getLessonBlocks(lesson: Lesson) {
  return lesson.concepts.flatMap((c) => c.blocks).sort((a, b) => {
    if (a.conceptId === b.conceptId) return a.sequence - b.sequence;
    const ca = lesson.concepts.find((c) => c.id === a.conceptId)?.sequence ?? 0;
    const cb = lesson.concepts.find((c) => c.id === b.conceptId)?.sequence ?? 0;
    return ca - cb || a.sequence - b.sequence;
  });
}

export function getQuestionsByIds(ids: string[]): QuizQuestion[] {
  const map = getQuestionMap();
  return ids.map((id) => map[id]).filter(Boolean);
}

export function getFormativeQuestions(lessonId: string) {
  return quizQuestions.filter((q) => q.lessonId === lessonId);
}

export function getObjectives() {
  return objectives;
}

export function getObjectivesForLesson(lessonId: string) {
  return objectives.filter((o) => o.lessonIds.includes(lessonId));
}

export function getFlashcards(lessonId?: string) {
  if (!lessonId) return flashcards;
  return flashcards.filter((f) => f.lessonId === lessonId);
}

export function getQbankQuestions(opts?: {
  moduleId?: string;
  usmleStep?: "step1" | "step2ck";
}) {
  return qbankQuestions.filter((q) => {
    if (opts?.moduleId && q.moduleId !== opts.moduleId) return false;
    if (opts?.usmleStep && q.usmleStep !== opts.usmleStep) return false;
    return true;
  });
}

export function getClinicalCases(moduleId?: string) {
  if (!moduleId) return clinicalCases;
  return clinicalCases.filter((c) => c.moduleId === moduleId);
}

export function getClinicalCase(caseId: string) {
  return clinicalCases.find((c) => c.id === caseId);
}

export function getNextLesson(
  lessons: Lesson[],
  masteredLessonIds: Set<string>,
): Lesson | null {
  for (const lesson of lessons) {
    if (lesson.status !== "published") continue;
    if (!masteredLessonIds.has(lesson.id)) return lesson;
  }
  return null;
}
