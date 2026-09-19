import { getResolvedProgram } from "@/lib/demo/admin-store";
import {
  clinicalCases as baseCases,
  flashcards as baseFlashcards,
  objectives as baseObjectives,
  qbankQuestions as baseQbank,
  quizQuestions as baseQuiz,
} from "@/lib/curriculum/seed";
import {
  depthClinicalCases,
  depthFlashcards,
  depthObjectives,
  depthQbankQuestions,
  depthQuizQuestions,
  extraClinicalCases,
  extraFlashcards,
  extraObjectives,
  extraQbankQuestions,
  extraQuizQuestions,
  wave3ClinicalCases,
  wave3Flashcards,
  wave3Objectives,
  wave3QbankQuestions,
  wave3QuizQuestions,
  wave4ClinicalCases,
  wave4Flashcards,
  wave4Objectives,
  wave4QbankQuestions,
  wave4QuizQuestions,
} from "@/lib/curriculum/expansions";
import type {
  Lesson,
  Module,
  Phase,
  Program,
  QuizQuestion,
} from "@/lib/types/domain";

const quizQuestions = [
  ...baseQuiz,
  ...extraQuizQuestions,
  ...depthQuizQuestions,
  ...wave3QuizQuestions,
  ...wave4QuizQuestions,
];
const objectives = [
  ...baseObjectives,
  ...extraObjectives,
  ...depthObjectives,
  ...wave3Objectives,
  ...wave4Objectives,
];
const flashcards = [
  ...baseFlashcards,
  ...extraFlashcards,
  ...depthFlashcards,
  ...wave3Flashcards,
  ...wave4Flashcards,
];
const qbankQuestions = [
  ...baseQbank,
  ...extraQbankQuestions,
  ...depthQbankQuestions,
  ...wave3QbankQuestions,
  ...wave4QbankQuestions,
];
const clinicalCases = [
  ...baseCases,
  ...extraClinicalCases,
  ...depthClinicalCases,
  ...wave3ClinicalCases,
  ...wave4ClinicalCases,
];

export function getQuestionMap() {
  return Object.fromEntries(quizQuestions.map((q) => [q.id, q]));
}

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

export async function getFormativeQuestionsLive(lessonId: string) {
  const { listFacultyQuestions } = await import("@/lib/demo/admin-store");
  const faculty = await listFacultyQuestions();
  const base = getFormativeQuestions(lessonId);
  const extra = faculty
    .filter((q) => q.lessonId === lessonId)
    .map((q) => ({
      id: q.id,
      lessonId: q.lessonId,
      moduleExamId: q.moduleExamId,
      stem: q.stem,
      choices: q.choices,
      correctChoiceId: q.correctChoiceId,
      explanation: q.explanation,
      sequence: q.sequence,
    }));
  return [...base, ...extra];
}

export function getQuestionMapLiveSync() {
  return getQuestionMap();
}

export async function getMergedQuestionMap() {
  const { listFacultyQuestions } = await import("@/lib/demo/admin-store");
  const faculty = await listFacultyQuestions();
  const map = getQuestionMap();
  for (const q of faculty) {
    map[q.id] = {
      id: q.id,
      lessonId: q.lessonId,
      moduleExamId: q.moduleExamId,
      stem: q.stem,
      choices: q.choices,
      correctChoiceId: q.correctChoiceId,
      explanation: q.explanation,
      sequence: q.sequence,
    };
  }
  return map;
}

export function getObjectives() {
  return objectives;
}

export function getObjectivesForLesson(lessonId: string) {
  return objectives.filter((o) => o.lessonIds.includes(lessonId));
}

export function getFlashcards(lessonId?: string) {
  // base + expansion cards; faculty cards merged async via getAllFlashcards
  if (!lessonId) return flashcards;
  return flashcards.filter((f) => f.lessonId === lessonId);
}

export async function getAllFlashcards(lessonId?: string) {
  const { listFacultyFlashcards } = await import("@/lib/demo/admin-store");
  const faculty = await listFacultyFlashcards();
  const merged = [
    ...flashcards,
    ...faculty.map((f) => ({
      id: f.id,
      lessonId: f.lessonId,
      front: f.front,
      back: f.back,
      objectiveId: f.objectiveId,
    })),
  ];
  if (!lessonId) return merged;
  return merged.filter((f) => f.lessonId === lessonId);
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
