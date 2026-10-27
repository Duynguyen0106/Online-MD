"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type AppNavLink = {
  href: string;
  label: string;
  /** Optional group label for Learn / Practice clustering */
  group?: string;
};

export function AppNav({ links }: { links: AppNavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const groups = groupLinks(links);

  return (
    <>
      <nav
        className="hidden items-center gap-1 text-sm text-[var(--muted)] md:flex"
        aria-label="Primary"
      >
        {groups.map((g, gi) => (
          <div key={g.name ?? `g-${gi}`} className="flex items-center gap-1">
            {gi > 0 ? (
              <span
                className="mx-1 h-4 w-px bg-[var(--border)]"
                aria-hidden
              />
            ) : null}
            {g.name ? (
              <span className="mr-1 hidden text-[10px] uppercase tracking-wide text-[var(--muted)] lg:inline">
                {g.name}
              </span>
            ) : null}
            {g.items.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-md px-2 py-1 hover:text-[var(--foreground)]",
                  isActive(pathname, l.href) &&
                    "bg-[var(--brand-soft)] font-medium text-[var(--brand-strong)]",
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="relative md:hidden">
        <button
          type="button"
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)]"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        {open ? (
          <nav
            id="mobile-nav"
            aria-label="Primary"
            className="absolute left-0 top-full z-50 mt-2 max-h-[70vh] min-w-[14rem] overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-sm"
          >
            {groups.map((g, gi) => (
              <div key={g.name ?? `mg-${gi}`} className={cn(gi > 0 && "mt-2 border-t border-[var(--border)] pt-2")}>
                {g.name ? (
                  <p className="px-3 pb-1 text-[10px] font-medium uppercase tracking-wide text-[var(--muted)]">
                    {g.name}
                  </p>
                ) : null}
                {g.items.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]",
                      isActive(pathname, l.href) &&
                        "bg-[var(--brand-soft)] font-medium text-[var(--brand-strong)]",
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        ) : null}
      </div>
    </>
  );
}

function groupLinks(links: AppNavLink[]) {
  const order: string[] = [];
  const map = new Map<string, AppNavLink[]>();
  for (const l of links) {
    const key = l.group ?? "";
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key)!.push(l);
  }
  return order.map((name) => ({
    name: name || undefined,
    items: map.get(name)!,
  }));
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
