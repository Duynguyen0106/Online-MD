import {
  clinicalCases,
  flashcards,
  getQuestionMap,
  objectives,
  program,
  qbankQuestions,
  quizQuestions,
} from "@/lib/curriculum/seed";
import type {
  Lesson,
  Module,
  Phase,
  QuizQuestion,
} from "@/lib/types/domain";

export { getQuestionMap };

export function getProgram() {
  return program;
}

export function getPhases(): Phase[] {
  return program.phases;
}

export function getAllModules(): Module[] {
  return program.phases.flatMap((p) => p.modules);
}

export function getModule(moduleId: string): Module | undefined {
  return getAllModules().find((m) => m.id === moduleId);
}

export function getPhaseForModule(moduleId: string): Phase | undefined {
  return program.phases.find((p) => p.modules.some((m) => m.id === moduleId));
}

export function getAllLessons(): Lesson[] {
  return getAllModules().flatMap((m) => m.lessons);
}

export function getLesson(lessonId: string): Lesson | undefined {
  return getAllLessons().find((l) => l.id === lessonId);
}

export function getModuleForLesson(lessonId: string): Module | undefined {
  return getAllModules().find((m) => m.lessons.some((l) => l.id === lessonId));
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

export function getNextLesson(masteredLessonIds: Set<string>): Lesson | null {
  for (const lesson of getAllLessons()) {
    if (lesson.status !== "published") continue;
    if (!masteredLessonIds.has(lesson.id)) return lesson;
  }
  return null;
}
