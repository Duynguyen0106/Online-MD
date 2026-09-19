"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type LessonRow = {
  id: string;
  title: string;
  sequence: number;
  conceptCount: number;
  blockCount: number;
};

type ModuleRow = {
  id: string;
  title: string;
  status: string;
  isCoreClerkship: boolean;
  lessons: LessonRow[];
};

type PhaseRow = {
  id: string;
  name: string;
  modules: ModuleRow[];
};

export function FacultyLibrary({ phases }: { phases: PhaseRow[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return phases;
    return phases
      .map((phase) => ({
        ...phase,
        modules: phase.modules
          .map((mod) => ({
            ...mod,
            lessons: mod.lessons.filter(
              (l) =>
                l.title.toLowerCase().includes(needle) ||
                mod.title.toLowerCase().includes(needle),
            ),
          }))
          .filter(
            (mod) =>
              mod.lessons.length > 0 ||
              mod.title.toLowerCase().includes(needle),
          ),
      }))
      .filter((phase) => phase.modules.length > 0);
  }, [phases, q]);

  return (
    <div className="space-y-6">
      <input
        className="h-10 w-full max-w-md rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm"
        placeholder="Filter modules or lessons…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {filtered.map((phase) => (
        <section key={phase.id}>
          <h2 className="font-[family-name:var(--font-display)] text-2xl">{phase.name}</h2>
          <div className="mt-3 space-y-3">
            {phase.modules.map((mod) => (
              <div
                key={mod.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{mod.title}</h3>
                  <Badge>{mod.status}</Badge>
                  {mod.isCoreClerkship ? <Badge>core clerkship</Badge> : null}
                </div>
                <ul className="space-y-1 text-sm text-[var(--muted)]">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        className="text-[var(--brand-strong)] hover:underline"
                        href={`/faculty/lessons/${lesson.id}`}
                      >
                        {lesson.sequence}. {lesson.title}
                      </Link>{" "}
                      · {lesson.conceptCount} concepts · {lesson.blockCount} blocks
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
