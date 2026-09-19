import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import { getClinicalCases } from "@/lib/curriculum/accessors";

export default function CasesIndexPage() {
  const cases = getClinicalCases();
  return (
    <AppShell title="Clinical cases">
      <p className="mb-6 max-w-3xl text-sm text-[var(--muted)]">
        Structured reasoning cases with Faculty AI feedback. Content-first: use after related
        lessons when possible.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {cases.map((c) => (
          <Link
            key={c.id}
            href={`/cases/${c.id}`}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--brand)]"
          >
            <div className="mb-2 flex items-center gap-2">
              <h2 className="font-medium">{c.title}</h2>
              <Badge>{c.status}</Badge>
            </div>
            <p className="line-clamp-3 text-sm text-[var(--muted)]">{c.presentationMd}</p>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
