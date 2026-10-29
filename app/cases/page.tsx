import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { getClinicalCases } from "@/lib/curriculum/accessors";
import { PRACTICE_ROUTES } from "@/lib/routes/practice";

export default function CasesIndexPage() {
  const cases = getClinicalCases();
  return (
    <AppShell title="Clinical cases">
      <p className="mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        Think through the presentation before revealing the answer. Use these after the related
        lessons when you can. Progressive cases unlock history, exam, and imaging step by step.
      </p>
      {cases.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="font-[family-name:var(--font-display)] text-xl">
            Cases coming soon
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
            No clinical cases are published in this environment yet. Keep learning from modules
            and the{" "}
            <Link className="underline" href={PRACTICE_ROUTES.qbank}>
              question bank
            </Link>{" "}
            meanwhile.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {cases.map((c) => (
            <Link
              key={c.id}
              href={`${PRACTICE_ROUTES.cases}/${c.id}`}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--brand)]"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="font-medium">{c.title}</h2>
                {c.format === "progressive" ? (
                  <span className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] uppercase tracking-wide text-[var(--muted)]">
                    Progressive
                  </span>
                ) : null}
              </div>
              <p className="line-clamp-3 text-sm text-[var(--muted)]">
                {c.summary ?? c.presentationMd}
              </p>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
