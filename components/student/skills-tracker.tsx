"use client";

import { useMemo, useState, useTransition } from "react";
import { setSkillPracticeStatus } from "@/actions/learning";
import { Badge, ProgressBar } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CLINICAL_SKILLS,
  SKILL_STATUS_LABELS,
  SKILL_STATUS_ORDER,
  skillStatusTone,
  type SkillCategory,
} from "@/lib/curriculum/skills";
import type { SkillPracticeStatus, SkillProgress } from "@/lib/types/domain";
import { percent } from "@/lib/utils";

function statusOf(
  map: Record<string, SkillProgress>,
  skillId: string,
): SkillPracticeStatus {
  return map[skillId]?.status ?? "not_started";
}

export function SkillsTracker({
  initialProgress,
}: {
  initialProgress: Record<string, SkillProgress>;
}) {
  const [progress, setProgress] = useState(initialProgress);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [filter, setFilter] = useState<SkillCategory | "All">("All");

  const counts = useMemo(() => {
    let notStarted = 0;
    let simulated = 0;
    let verified = 0;
    for (const skill of CLINICAL_SKILLS) {
      const s = statusOf(progress, skill.id);
      if (s === "verified") verified++;
      else if (s === "simulated") simulated++;
      else notStarted++;
    }
    return { notStarted, simulated, verified, total: CLINICAL_SKILLS.length };
  }, [progress]);

  const categories = useMemo(() => {
    const set = new Set(CLINICAL_SKILLS.map((s) => s.category));
    return ["All", ...Array.from(set)] as (SkillCategory | "All")[];
  }, []);

  const visible = CLINICAL_SKILLS.filter(
    (s) => filter === "All" || s.category === filter,
  );

  const verifiedRatio =
    counts.total === 0 ? 0 : counts.verified / counts.total;

  function updateStatus(skillId: string, status: SkillPracticeStatus) {
    setPendingId(skillId);
    // Optimistic local update; server persists to mock student profile.
    setProgress((prev) => ({
      ...prev,
      [skillId]: {
        skillId,
        status,
        updatedAt: new Date().toISOString(),
      },
    }));
    startTransition(async () => {
      try {
        await setSkillPracticeStatus({ skillId, status });
      } finally {
        setPendingId(null);
      }
    });
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:col-span-2">
          <p className="text-sm text-[var(--muted)]">Overall verification</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-3xl">
            {counts.verified} of {counts.total}
          </p>
          <p className="text-sm text-[var(--muted)]">
            skills marked verified / observed
          </p>
          <div className="mt-4">
            <ProgressBar value={verifiedRatio} />
          </div>
          <p className="mt-2 text-xs text-[var(--muted)]">
            {percent(verifiedRatio)} verified · {counts.simulated} in simulation
            · {counts.notStarted} not started
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm text-[var(--muted)]">How to use</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-[var(--muted)]">
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Simulation
              </span>{" "}
              — practiced on a model, task trainer, or standardized patient.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Verified
              </span>{" "}
              — observed or signed off in a supervised clinical setting.
            </li>
          </ul>
          <p className="mt-3 text-xs text-[var(--muted)]">
            Educational checklist only — not a hospital credentialling log.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            type="button"
            size="sm"
            variant={filter === cat ? "default" : "secondary"}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {visible.map((skill) => {
          const status = statusOf(progress, skill.id);
          const busy = pending && pendingId === skill.id;
          return (
            <article
              key={skill.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--brand)]"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium">{skill.title}</h3>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    {skill.category} · {skill.settingHint}
                  </p>
                </div>
                <Badge className={skillStatusTone(status)}>
                  {SKILL_STATUS_LABELS[status]}
                </Badge>
              </div>
              <p className="mb-4 text-sm leading-6 text-[var(--muted)]">
                {skill.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILL_STATUS_ORDER.map((option) => (
                  <Button
                    key={option}
                    type="button"
                    size="sm"
                    variant={status === option ? "default" : "outline"}
                    disabled={busy}
                    onClick={() => updateStatus(skill.id, option)}
                  >
                    {SKILL_STATUS_LABELS[option]}
                  </Button>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
