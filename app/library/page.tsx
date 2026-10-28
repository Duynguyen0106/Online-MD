import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { Badge } from "@/components/ui/badge";
import { STUDENT_COPY } from "@/lib/copy/student";
import {
  OPEN_MEDICAL_TEXTBOOKS,
  type OpenTextbookSubject,
} from "@/lib/curriculum/open-textbooks";

const SUBJECT_ORDER: OpenTextbookSubject[] = [
  "anatomy",
  "physiology",
  "pathology",
  "pharmacology",
  "microbiology",
  "immunology",
  "clinical",
];

const SUBJECT_LABEL: Record<OpenTextbookSubject, string> = {
  anatomy: "Anatomy",
  physiology: "Physiology",
  pathology: "Pathology",
  pharmacology: "Pharmacology",
  microbiology: "Microbiology",
  immunology: "Immunology",
  clinical: "Clinical reference",
};

export default function OpenTextbookLibraryPage() {
  const bySubject = SUBJECT_ORDER.map((subject) => ({
    subject,
    books: OPEN_MEDICAL_TEXTBOOKS.filter((b) => b.subject === subject),
  })).filter((g) => g.books.length > 0);

  return (
    <AppShell title={STUDENT_COPY.libraryTitle}>
      <p className="-mt-4 mb-4 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        {STUDENT_COPY.libraryIntro}
      </p>
      <p className="mb-8 max-w-3xl rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--muted)]">
        {STUDENT_COPY.libraryPolicy}
      </p>

      <div className="space-y-10">
        {bySubject.map((group) => (
          <section key={group.subject}>
            <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl tracking-tight">
              {SUBJECT_LABEL[group.subject]}
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {group.books.map((book) => (
                <li
                  key={book.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--brand-strong)] underline-offset-2 hover:underline"
                    >
                      {book.title}
                    </a>
                    <Badge>{book.license}</Badge>
                    {book.remixOk ? (
                      <Badge>Adapt OK</Badge>
                    ) : (
                      <Badge>Read / link</Badge>
                    )}
                  </div>
                  <p className="text-xs text-[var(--muted)]">{book.authors}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                    {book.notes}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-[var(--muted)]">
        Deepened pathology lessons from this catalog live in Cell/Molecular,
        Cardiovascular, and Musculoskeletal modules.{" "}
        <Link href="/dashboard" className="underline hover:text-[var(--foreground)]">
          Back to dashboard
        </Link>
      </p>
    </AppShell>
  );
}
