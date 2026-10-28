/**
 * Vetted free / openly licensed medical textbooks and OERs.
 *
 * Policy:
 * - Prefer clear Creative Commons licenses with documented reuse terms.
 * - CC BY-NC / NC-SA sources are listed for student reading links only —
 *   do not paste substantial text into Online MD without confirming the
 *   product’s noncommercial status and ShareAlike obligations.
 * - OpenStax currently forbids ingesting book text into LLMs / generative AI
 *   without prior written permission — use links, not copy-paste enrichment.
 * - Never use unauthorized WordPress/HF mirrors of commercial textbooks
 *   (Harsh Mohan, Robbins, Pathoma, Harrison’s, First Aid, etc.).
 */

export type OpenTextbookLicense =
  | "CC-BY-4.0"
  | "CC-BY-NC-4.0"
  | "CC-BY-NC-SA-4.0"
  | "CC-BY-SA-4.0"
  | "free-to-read"
  | "public-domain";

export type OpenTextbookSubject =
  | "anatomy"
  | "physiology"
  | "pathology"
  | "pharmacology"
  | "microbiology"
  | "immunology"
  | "clinical";

export type OpenTextbook = {
  id: string;
  title: string;
  authors: string;
  subject: OpenTextbookSubject;
  license: OpenTextbookLicense;
  /** true = OK to adapt text into Online MD with attribution */
  remixOk: boolean;
  url: string;
  notes: string;
  /** Suggested Online MD modules that benefit from this as further reading */
  moduleIds: string[];
};

export const OPEN_MEDICAL_TEXTBOOKS: OpenTextbook[] = [
  {
    id: "openstax-ap2e",
    title: "Anatomy and Physiology 2e",
    authors: "Betts, Young, Wise, et al. (OpenStax)",
    subject: "anatomy",
    license: "CC-BY-NC-SA-4.0",
    remixOk: false,
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction",
    notes:
      "Excellent free A&P. Link for student reading only — NC-SA + OpenStax bars LLM ingestion without permission.",
    moduleIds: ["mod-cell-mol", "mod-cv", "mod-pulm", "mod-renal", "mod-gi", "mod-endo", "mod-neuro", "mod-msk"],
  },
  {
    id: "openstax-ap2e-physio",
    title: "Anatomy and Physiology 2e (physiology systems)",
    authors: "Betts, Young, Wise, et al. (OpenStax)",
    subject: "physiology",
    license: "CC-BY-NC-SA-4.0",
    remixOk: false,
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-1-structure-and-function-of-blood-vessels",
    notes: "Cardiovascular and organ-system physiology chapters for foundations bridging.",
    moduleIds: ["mod-cv", "mod-pulm", "mod-renal", "mod-endo"],
  },
  {
    id: "openstax-micro",
    title: "Microbiology",
    authors: "Parker, Schneegurt, et al. (OpenStax)",
    subject: "microbiology",
    license: "CC-BY-NC-SA-4.0",
    remixOk: false,
    url: "https://openstax.org/books/microbiology/pages/1-introduction",
    notes: "Pathogenicity, immunity, and system infections — free to read; do not paste for AI enrichment.",
    moduleIds: ["mod-id", "mod-cell-mol", "mod-im"],
  },
  {
    id: "openstax-pharm-nurses",
    title: "Pharmacology for Nurses",
    authors: "OpenStax",
    subject: "pharmacology",
    license: "CC-BY-4.0",
    remixOk: false,
    url: "https://openstax.org/details/books/pharmacology-nurses",
    notes:
      "Introductory pharmacology by system. Prefer linking; verify current OpenStax license page before any text reuse. Not a substitute for MD-level clinical pharmacology.",
    moduleIds: ["mod-cv", "mod-pulm", "mod-endo", "mod-psych", "mod-im"],
  },
  {
    id: "bcit-pathology",
    title: "Pathology: From the Tissue Level to Clinical Manifestations",
    authors: "Kong, Dyck, Soon (BCIT)",
    subject: "pathology",
    license: "CC-BY-NC-4.0",
    remixOk: false,
    url: "https://pressbooks.bccampus.ca/dcbiol2200/",
    notes:
      "Strong multimedia pathology OER. NC license → student reading / faculty reference links only unless product is clearly noncommercial.",
    moduleIds: ["mod-cell-mol", "mod-cv", "mod-pulm", "mod-renal", "mod-gi", "mod-heme"],
  },
  {
    id: "pathologia-edinburgh",
    title: "Pathologia",
    authors: "University of Edinburgh Pathology",
    subject: "pathology",
    license: "free-to-read",
    remixOk: false,
    url: "https://pathologia.ed.ac.uk/",
    notes:
      "Free curated CALs (MI, infarction, atherosclerosis, cell death, neoplasia, inflammation). Link; do not scrape.",
    moduleIds: ["mod-cell-mol", "mod-cv", "mod-id"],
  },
  {
    id: "patholines",
    title: "Patholines — Starting Pathology handbook",
    authors: "Mikael Häggström, M.D.",
    subject: "pathology",
    license: "CC-BY-4.0",
    remixOk: true,
    url: "https://patholines.org/Starting_pathology",
    notes:
      "CC BY 4.0 clinical pathology handbook. Safe to adapt with attribution when needed.",
    moduleIds: ["mod-cell-mol", "mod-heme", "mod-id"],
  },
  {
    id: "wikibooks-pathology",
    title: "Pathology (Wikibooks)",
    authors: "Wikibooks contributors",
    subject: "pathology",
    license: "CC-BY-SA-4.0",
    remixOk: true,
    url: "https://en.wikibooks.org/wiki/Pathology",
    notes: "Open general/systemic pathology outline. ShareAlike if substantial text is adapted.",
    moduleIds: ["mod-cell-mol"],
  },
  {
    id: "wikibooks-physiology",
    title: "Human Physiology (Wikibooks)",
    authors: "Wikibooks contributors",
    subject: "physiology",
    license: "CC-BY-SA-4.0",
    remixOk: true,
    url: "https://en.wikibooks.org/wiki/Human_Physiology",
    notes: "Open physiology companion; SA applies to adapted prose.",
    moduleIds: ["mod-cv", "mod-pulm", "mod-renal", "mod-endo", "mod-neuro"],
  },
  {
    id: "ncbi-bookshelf",
    title: "NCBI Bookshelf (selective open titles)",
    authors: "NLM / various",
    subject: "clinical",
    license: "free-to-read",
    remixOk: false,
    url: "https://www.ncbi.nlm.nih.gov/books/",
    notes:
      "Free to read ≠ free to remix. Check each title’s copyright notice before reuse.",
    moduleIds: ["mod-im", "mod-id"],
  },
];

export function openTextbooksForModule(moduleId: string): OpenTextbook[] {
  return OPEN_MEDICAL_TEXTBOOKS.filter((t) => t.moduleIds.includes(moduleId));
}

export function openTextbooksBySubject(
  subject: OpenTextbookSubject,
): OpenTextbook[] {
  return OPEN_MEDICAL_TEXTBOOKS.filter((t) => t.subject === subject);
}

/** Markdown “Further reading” block for lesson footers (links only). */
export function furtherReadingMd(moduleId: string): string {
  const books = openTextbooksForModule(moduleId);
  if (books.length === 0) return "";
  const lines = books.map(
    (b) =>
      `- [${b.title}](${b.url}) — ${b.authors} (${b.license}${b.remixOk ? "; remix OK with attribution" : "; read / link only"})`,
  );
  return `### Further reading (open / free OERs)\n\n${lines.join("\n")}\n\n*Educational framing only — not a substitute for licensed course textbooks or faculty-approved references. Do not paste copyrighted commercial texts.*`;
}
