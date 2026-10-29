import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <AppShell title="Page not found">
      <p className="-mt-4 mb-6 max-w-xl text-sm leading-6 text-[var(--muted)]">
        That lesson, module, case, or page is not in the curriculum graph. Check the
        link, or continue from your dashboard.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/presentations">Browse presentations</Link>
        </Button>
      </div>
    </AppShell>
  );
}
