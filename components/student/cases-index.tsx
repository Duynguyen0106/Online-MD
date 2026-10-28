"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ClinicalCase } from "@/lib/types/domain";

type CaseCard = Pick<
  ClinicalCase,
  "id" | "title" | "presentationMd" | "summary" | "format" | "organSystem"
>;

export function CasesIndex({ cases }: { cases: CaseCard[] }) {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState<"all" | "progressive" | "freeform">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases.filter((c) => {
      if (format === "progressive" && c.format !== "progressive") return false;
      if (format === "freeform" && c.format === "progressive") return false;
      if (!q) return true;
      const hay = `${c.title} ${c.summary ?? ""} ${c.organSystem ?? ""} ${c.presentationMd}`.toLowerCase();
      return hay.includes(q);
    });
  }, [cases, format, query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="block min-w-0 flex-1 text-sm">
          <span className="mb-1 block text-[var(--muted)]">Search cases</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Title, organ system, or keyword…"
            className="field-control max-w-xl"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["progressive", "Progressive"],
              ["freeform", "Free-text"],
            ] as const
          ).map(([id, label]) => (
            <Button
              key={id}
              type="button"
              size="sm"
              variant={format === id ? "default" : "secondary"}
              onClick={() => setFormat(id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-xs text-[var(--muted)]">
        {filtered.length} of {cases.length} cases
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-sm text-[var(--muted)]">
          No cases match that filter. Try a broader search or switch format.
        </p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.id}`}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--brand)]"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="font-medium">{c.title}</h2>
                {c.format === "progressive" ? (
                  <Badge className="bg-[var(--brand-soft)] text-[var(--brand-strong)]">
                    Progressive
                  </Badge>
                ) : (
                  <Badge>Free-text</Badge>
                )}
                {c.organSystem ? <Badge>{c.organSystem}</Badge> : null}
              </div>
              <p className="line-clamp-3 text-sm leading-6 text-[var(--muted)]">
                {c.summary ?? c.presentationMd}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
