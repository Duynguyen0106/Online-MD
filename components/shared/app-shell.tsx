import Link from "next/link";
import { getSessionUser } from "@/lib/demo/store";
import { RoleSwitcher } from "@/components/shared/role-switcher";

const studentLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/qbank", label: "Qbank" },
  { href: "/tutor", label: "Faculty AI" },
  { href: "/cases/case-cv-1", label: "Cases" },
];

const facultyLinks = [
  { href: "/faculty", label: "Content" },
  { href: "/dashboard", label: "Student view" },
];

const adminLinks = [
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/faculty", label: "Content" },
  { href: "/dashboard", label: "Student view" },
];

export async function AppShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const user = await getSessionUser();
  const links =
    user.role === "admin"
      ? adminLinks
      : user.role === "faculty"
        ? facultyLinks
        : studentLinks;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--brand-strong)]"
            >
              Online MD
            </Link>
            <nav className="hidden gap-4 text-sm text-[var(--muted)] md:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:text-[var(--foreground)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-[var(--muted)] sm:inline">
              {user.fullName} · {user.role}
            </span>
            <RoleSwitcher currentUserId={user.id} />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        {title ? (
          <h1 className="mb-6 font-[family-name:var(--font-display)] text-3xl tracking-tight">
            {title}
          </h1>
        ) : null}
        {children}
      </main>
    </div>
  );
}
