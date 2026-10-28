import { AppShell } from "@/components/shared/app-shell";
import { SkillsTracker } from "@/components/student/skills-tracker";
import { STUDENT_COPY } from "@/lib/copy/student";
import { readStudentState } from "@/lib/demo/store";

export default async function SkillsPage() {
  const state = await readStudentState();
  const initialProgress = state.skillProgress ?? {};

  return (
    <AppShell title={STUDENT_COPY.skillsTitle} description={STUDENT_COPY.skillsIntro}>
      <SkillsTracker initialProgress={initialProgress} />
    </AppShell>
  );
}
