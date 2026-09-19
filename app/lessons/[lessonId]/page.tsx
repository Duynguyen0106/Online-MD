import { notFound } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { LessonPlayer } from "@/components/student/lesson-player";
import { Badge } from "@/components/ui/badge";
import {
  getLesson,
  getLessonBlocks,
  getModuleForLesson,
  getObjectivesForLesson,
} from "@/lib/curriculum/accessors";
import { readStudentState } from "@/lib/demo/store";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);
  if (!lesson) notFound();
  const mod = await getModuleForLesson(lessonId);
  const blocks = getLessonBlocks(lesson);
  const objectives = getObjectivesForLesson(lessonId);
  const state = await readStudentState();

  return (
    <AppShell title={lesson.title}>
      <div className="mb-4 flex flex-wrap gap-2">
        {objectives.map((o) => (
          <Badge key={o.id} title={o.statement}>
            {o.code} · {o.usmleStep} · {o.organSystem}
          </Badge>
        ))}
      </div>
      <LessonPlayer
        lesson={lesson}
        blocks={blocks}
        progress={state.lessonProgress[lessonId]}
        moduleId={mod?.id ?? lesson.moduleId}
      />
    </AppShell>
  );
}
