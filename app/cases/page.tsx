import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { getClinicalCases } from "@/lib/curriculum/accessors";

export default function CasesIndexPage() {
  const cases = getClinicalCases();
  return (
    <AppShell title="Clinical cases">
      <p className="mb-6 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        Think through the presentation before revealing the answer. Use these after the related
        lessons when you can.
      </p>
      {cases.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">No clinical cases are available yet.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {cases.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.id}`}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--brand)]"
            >
              <h2 className="mb-2 font-medium">{c.title}</h2>
              <p className="line-clamp-3 text-sm text-[var(--muted)]">{c.presentationMd}</p>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
