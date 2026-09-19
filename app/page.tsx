import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(135deg, var(--hero-a) 0%, var(--hero-b) 48%, #0f766e 100%)",
        }}
      />
      <div className="animate-drift pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-[color-mix(in_oklab,var(--hero-c)_35%,transparent)] blur-3xl" />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16 text-white">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-white/70">
          Content-first medical education
        </p>
        <h1 className="animate-fade-up font-[family-name:var(--font-display)] text-5xl leading-tight md:text-7xl">
          Online MD
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/85 md:text-xl">
          An organ-system foundations curriculum and core clerkship pathway modeled on leading US MD
          programs — rebuilt for asynchronous mastery. Lessons first. Qbank only after you earn it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-white text-[var(--hero-a)] hover:bg-white/90">
            <Link href="/dashboard">Enter student dashboard</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
            <Link href="/faculty">Faculty library</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
