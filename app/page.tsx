import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[var(--brand-strong)]"
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
          className="pointer-events-none absolute inset-0 opacity-95"
          style={{
            background:
              "linear-gradient(145deg, var(--hero-a) 0%, var(--hero-b) 55%, #0f766e 100%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-white md:py-28">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-white/75">
            Online MD
          </p>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight md:text-6xl">
            Learn medicine from the ground up.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90 md:text-xl">
            A structured medical curriculum that takes you from basic science to organ systems and
            then into the core clinical rotations.
          </p>
          <p className="mt-4 max-w-2xl text-base text-white/80">
            Study the lessons, check your understanding, and build the knowledge you need before
            moving on to question banks.
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

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
          A medical-school curriculum, built for self-paced study
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
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
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
            Learn first. Practice second.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Online MD is designed around a simple idea: understand the material before relying on
            questions to teach it.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Each lesson gives you the core concepts, clinical connections, and a short check of
            your understanding. Once you’ve worked through the curriculum, the question bank
            becomes the next step.
          </p>
          <Button asChild className="mt-8">
            <Link href="/signup">Start with the first lesson</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
