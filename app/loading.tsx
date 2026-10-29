export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-4 h-8 w-48 animate-pulse rounded-md bg-[var(--surface-2)]" />
      <div className="space-y-3">
        <div className="h-4 w-full max-w-xl animate-pulse rounded-md bg-[var(--surface-2)]" />
        <div className="h-4 w-full max-w-lg animate-pulse rounded-md bg-[var(--surface-2)]" />
        <div className="h-4 w-full max-w-md animate-pulse rounded-md bg-[var(--surface-2)]" />
      </div>
      <p className="mt-6 text-sm text-[var(--muted)]">Loading…</p>
    </div>
  );
}
