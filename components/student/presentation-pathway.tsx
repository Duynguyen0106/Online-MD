import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { STUDENT_COPY } from "@/lib/copy/student";

export type PathwayLessonRow = {
  id: string;
  title: string;
  moduleTitle: string;
  role: "foundation" | "reasoning";
};

export type PathwayCaseRow = {
  id: string;
  title: string;
  format?: string;
};

export function PresentationHowToUse() {
  return (
    <aside className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="font-[family-name:var(--font-display)] text-lg">
        {STUDENT_COPY.presentationsHowToTitle}
      </h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {STUDENT_COPY.presentationsHowToBody}
      </p>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6 text-[var(--foreground)]">
        <li>{STUDENT_COPY.presentationsHowToStep1}</li>
        <li>{STUDENT_COPY.presentationsHowToStep2}</li>
        <li>{STUDENT_COPY.presentationsHowToStep3}</li>
      </ol>
    </aside>
  );
}

export function PresentationLessonList({
  title,
  emptyLabel,
  rows,
}: {
  title: string;
  emptyLabel: string;
  rows: PathwayLessonRow[];
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">{emptyLabel}</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/lessons/${row.id}`}
                  className="font-medium text-[var(--brand-strong)] hover:underline"
                >
                  {row.title}
                </Link>
                <Badge>
                  {row.role === "foundation" ? "Foundation" : "Reasoning"}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {row.moduleTitle}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function PresentationCaseList({
  rows,
}: {
  rows: PathwayCaseRow[];
}) {
  return (
    <section>
      <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl">
        Clinical cases
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">
          No linked cases yet for this presentation.
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((c) => (
            <li
              key={c.id}
              className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <Link
                href={`/cases/${c.id}`}
                className="font-medium text-[var(--brand-strong)] hover:underline"
              >
                {c.title}
              </Link>
              <Badge>Case</Badge>
              {c.format === "progressive" ? (
                <Badge>Progressive</Badge>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
