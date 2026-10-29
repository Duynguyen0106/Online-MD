import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRACTICE_ROUTES } from "@/lib/routes/practice";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
        404
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        That URL isn’t part of Online MD. Practice lives at{" "}
        <Link className="underline" href={PRACTICE_ROUTES.qbank}>
          /qbank
        </Link>{" "}
        and{" "}
        <Link className="underline" href={PRACTICE_ROUTES.cases}>
          /cases
        </Link>
        .
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild>
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={PRACTICE_ROUTES.qbank}>Question bank</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={PRACTICE_ROUTES.cases}>Clinical cases</Link>
        </Button>
      </div>
    </div>
  );
}
