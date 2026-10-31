import Link from "next/link";
import { getSessionUser } from "@/lib/demo/store";
import { AppNav, type AppNavLink } from "@/components/shared/app-nav";
import { RoleSwitcher } from "@/components/shared/role-switcher";

const adminLinks: AppNavLink[] = [
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/invites", label: "Invites" },
  { href: "/admin/unlock-rules", label: "Access rules" },
  { href: "/admin/users", label: "Users" },
  { href: "/faculty", label: "Curriculum" },
  { href: "/faculty/medical-review", label: "Medical review" },
  { href: "/dashboard", label: "Student view" },
];

const facultyLinks: AppNavLink[] = [
  { href: "/faculty", label: "Curriculum" },
  { href: "/faculty/flashcards", label: "Flashcards" },
  { href: "/faculty/questions", label: "Questions" },
  { href: "/faculty/medical-review", label: "Medical review" },
  { href: "/dashboard", label: "Student view" },
];

const studentLinks: AppNavLink[] = [
  { href: "/dashboard", label: "Dashboard", group: "Learn" },
  { href: "/competency", label: "Competency", group: "Learn" },
  { href: "/presentations", label: "Presentations", group: "Learn" },
  { href: "/library", label: "Open textbooks", group: "Learn" },
  { href: "/flashcards", label: "Flashcards", group: "Practice" },
  { href: "/qbank", label: "Question bank", group: "Practice" },
  { href: "/tutor", label: "Ask a question", group: "Practice" },
  { href: "/cases", label: "Clinical cases", group: "Practice" },
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
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
            <Link
              href="/"
              className="shrink-0 font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--brand-strong)]"
            >
              Online MD
            </Link>
            <AppNav links={links} />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden text-xs text-[var(--muted)] sm:inline">
              {user.fullName} · {user.role}
            </span>
            <RoleSwitcher currentUserId={user.id} />
            <Link
              href="/login"
              className="hidden text-xs text-[var(--muted)] underline hover:text-[var(--foreground)] sm:inline"
            >
              Switch account
            </Link>
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-6xl px-4 py-8 outline-none">
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
