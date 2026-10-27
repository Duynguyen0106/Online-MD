"use client";

import { useMemo, useState } from "react";

export type ObjectiveRow = {
  id: string;
  code: string;
  statement: string;
  usmleStep: string;
  organSystem: string;
  physicianTask: string;
  contentCategory: string;
  moduleId: string;
};

const PAGE_SIZE = 25;

export function ObjectivesTable({ rows }: { rows: ObjectiveRow[] }) {
  const [query, setQuery] = useState("");
  const [moduleId, setModuleId] = useState("all");
  const [page, setPage] = useState(0);

  const modules = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of rows) map.set(r.moduleId, (map.get(r.moduleId) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (moduleId !== "all" && r.moduleId !== moduleId) return false;
      if (!q) return true;
      return (
        r.code.toLowerCase().includes(q) ||
        r.statement.toLowerCase().includes(q) ||
        r.organSystem.toLowerCase().includes(q) ||
        r.contentCategory.toLowerCase().includes(q) ||
        r.physicianTask.toLowerCase().includes(q)
      );
    });
  }, [rows, query, moduleId]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const slice = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-sm">
          <span className="mb-1 block text-xs text-[var(--muted)]">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Code, statement, system…"
            className="h-9 w-64 max-w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-xs text-[var(--muted)]">Module</span>
          <select
            value={moduleId}
            onChange={(e) => {
              setModuleId(e.target.value);
              setPage(0);
            }}
            className="h-9 max-w-xs rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm"
          >
            <option value="all">All modules ({rows.length})</option>
            {modules.map(([id, n]) => (
              <option key={id} value={id}>
                {id} ({n})
              </option>
            ))}
          </select>
        </label>
        <p className="pb-2 text-xs text-[var(--muted)]">
          Showing {slice.length} of {filtered.length}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] text-xs text-[var(--muted)]">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Statement</th>
              <th className="p-3">Step</th>
              <th className="p-3">Organ system</th>
              <th className="p-3">Task</th>
              <th className="p-3">Category</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((o) => (
              <tr
                key={o.id}
                className="border-b border-[var(--border)] align-top"
              >
                <td className="p-3 font-medium">{o.code}</td>
                <td className="p-3">{o.statement}</td>
                <td className="p-3">{o.usmleStep}</td>
                <td className="p-3">{o.organSystem}</td>
                <td className="p-3">{o.physicianTask}</td>
                <td className="p-3">{o.contentCategory}</td>
              </tr>
            ))}
            {slice.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-sm text-[var(--muted)]"
                >
                  No objectives match this filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs disabled:opacity-40"
          disabled={safePage <= 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          Previous
        </button>
        <span className="text-xs text-[var(--muted)]">
          Page {safePage + 1} of {pageCount}
        </span>
        <button
          type="button"
          className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs disabled:opacity-40"
          disabled={safePage >= pageCount - 1}
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
