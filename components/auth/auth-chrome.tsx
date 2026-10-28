import Link from "next/link";

/** Lightweight branded frame for login / signup (no app shell chrome). */
export function AuthChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(900px 420px at 15% -10%, color-mix(in oklab, var(--hero-b) 22%, transparent), transparent), radial-gradient(700px 380px at 100% 0%, color-mix(in oklab, var(--hero-c) 14%, transparent), transparent)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="text-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--brand-strong)]"
          >
            Online MD
          </Link>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Learn first. Practice second.
          </p>
        </div>
        {children}
        <p className="text-center text-xs text-[var(--muted)]">
          <Link href="/" className="underline hover:text-[var(--foreground)]">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
