"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type AppNavLink = { href: string; label: string };

export function AppNav({ links }: { links: AppNavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden gap-4 text-sm text-[var(--muted)] md:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "hover:text-[var(--foreground)]",
              isActive(pathname, l.href) &&
                "font-medium text-[var(--foreground)]",
            )}
          >
            {l.label}
          </Link>
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
            className="absolute left-0 top-full z-50 mt-2 min-w-[12rem] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-sm"
          >
            {links.map((l) => (
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
          </nav>
        ) : null}
      </div>
    </>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
