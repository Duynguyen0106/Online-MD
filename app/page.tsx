import Link from "next/link";
import { Button } from "@/components/ui/button";
import { STUDENT_COPY } from "@/lib/copy/student";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--brand-strong)]"
          >
            Online MD
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/login" className="text-[var(--muted)] hover:text-[var(--foreground)]">
              Log in
            </Link>
            <Button asChild size="sm">
              <Link href="/signup">Create account</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(145deg, var(--hero-a) 0%, var(--hero-b) 55%, #0f766e 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(196,163,90,0.25), transparent 35%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-white md:py-28">
          <p className="mb-3 font-[family-name:var(--font-display)] text-3xl tracking-tight text-white md:text-4xl">
            Online MD
          </p>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight md:text-5xl">
            {STUDENT_COPY.productTagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90 md:text-xl">
            {STUDENT_COPY.productSubhead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-[var(--hero-a)] hover:bg-white/90">
              <Link href="/signup">Start learning</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
            >
              <Link href="/dashboard">Explore the curriculum</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
          A medical-school curriculum, built for self-paced study
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-[var(--brand-strong)]">
              Preclinical foundations
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Learn anatomy, physiology, biochemistry, pathology, pharmacology, microbiology,
              immunology, and the other core subjects that make clinical medicine easier to
              understand.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--brand-strong)]">Organ systems</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Bring those subjects together through cardiovascular, respiratory, renal, GI,
              endocrine, neurologic, hematologic, and other organ-system blocks.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--brand-strong)]">
              Clinical rotations
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Move from mechanisms to patients with Internal Medicine, Surgery, Pediatrics,
              OB/GYN, Psychiatry, and Family Medicine.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
            {STUDENT_COPY.learnFirstPracticeSecond}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Understand the material before relying on questions to teach it. Lessons, checks for
            understanding, cases, and a skills tracker come first—question banks second.
          </p>
          <Button asChild className="mt-8">
            <Link href="/signup">Start with the first lesson</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
