import { cn } from "@/lib/utils";

/** Shared surface used across dashboard, practice, and faculty cards. */
export function SurfaceCard({
  className,
  interactive = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5",
        interactive &&
          "transition hover:-translate-y-0.5 hover:border-[var(--brand)]",
        className,
      )}
      {...props}
    />
  );
}

export function SurfaceCardLink({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--brand)]",
        className,
      )}
      {...props}
    />
  );
}
