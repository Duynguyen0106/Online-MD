/**
 * Strip faculty/meta-instruction markers from student-visible teaching text.
 * Source data may still carry audit tokens for the medical-review queue.
 */

const FACULTY_LINE_RE =
  /^\s*\*?Faculty\s+(marker|should|note)[:\s][^\n]*\*?\s*$/gim;

const LAST_REVIEWED_UNAPPROVED_RE =
  /Last reviewed:\s*not yet medically approved\.?(?:\s*Faculty should[^\n]*)?/gi;

const NOT_YET_APPROVED_RE = /not yet medically approved\.?/gi;

const REFERENCE_TOKEN_RE = /\bREFERENCE_REVIEW_REQUIRED\b/g;

/** Status cell / inline audit token → student phrasing. */
const STATUS_CELL_RE =
  /\|\s*Authoritative society guidance or primary literature for[^\n|]*\|\s*REFERENCE_REVIEW_REQUIRED\s*\|/gi;

export function sanitizeStudentMarkdown(input: string | undefined | null): string {
  if (!input) return "";
  let out = input;

  out = out.replace(FACULTY_LINE_RE, "");
  out = out.replace(LAST_REVIEWED_UNAPPROVED_RE, STUDENT_SOURCES_LAST_REVIEWED);
  out = out.replace(NOT_YET_APPROVED_RE, "pending faculty medical review");
  out = out.replace(STATUS_CELL_RE, "| Primary literature / society guidance | Confirm current guidelines |");
  out = out.replace(REFERENCE_TOKEN_RE, "confirm with current guidelines");

  // Collapse leftover italic faculty asides that were only the token.
  out = out.replace(/\*\s*confirm with current guidelines\s*\*/gi, "");
  out = out.replace(/\(\s*confirm with current guidelines\s*\)/gi, "");
  out = out.replace(/[—–-]\s*confirm with current guidelines[^\n.]*/gi, "");
  out = out.replace(/\s*confirm with current guidelines for regimens\.?/gi, "");
  out = out.replace(/[ \t]+\n/g, "\n");
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

export const STUDENT_SOURCES_LAST_REVIEWED =
  "Educational material — confirm doses, thresholds, and regimens with current guidelines and supervised clinical care.";

/** Student-facing Sources block appended to readings (no faculty audit tokens). */
export const STUDENT_SOURCES_FOOTER = `

### Sources

Exact doses, thresholds, and trial statistics belong to primary sources and current society guidelines. Confirm details in supervised clinical care.

${STUDENT_SOURCES_LAST_REVIEWED}
`;

export function formatStudentLastReviewed(
  lastReviewed: string | undefined | null,
): string {
  if (!lastReviewed || /not yet medically approved/i.test(lastReviewed)) {
    return STUDENT_SOURCES_LAST_REVIEWED;
  }
  if (/REFERENCE_REVIEW_REQUIRED/i.test(lastReviewed)) {
    return sanitizeStudentMarkdown(lastReviewed);
  }
  return `Last reviewed: ${lastReviewed}`;
}

export function formatStudentReferenceLine(args: {
  label: string;
  citation?: string;
  status?: string;
}): string {
  const base = args.citation ?? args.label;
  if (args.status === "REFERENCE_REVIEW_REQUIRED") {
    return `${base} — confirm against current guidelines`;
  }
  return base;
}
