import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  formatStudentLastReviewed,
  formatStudentReferenceLine,
  sanitizeStudentMarkdown,
} from "@/lib/copy/sanitize-student-content";

describe("sanitizeStudentMarkdown", () => {
  it("removes not-yet-approved and faculty instruction lines", () => {
    const raw = `Teaching prose.

### Sources

| Guideline / reference | Status |
| --- | --- |
| Authoritative society guidance or primary literature for this lesson | REFERENCE_REVIEW_REQUIRED |

Last reviewed: not yet medically approved. Faculty should attach verified citations before claiming guideline currency.
*Faculty marker: REFERENCE_REVIEW_REQUIRED — attach verified citations.*`;

    const out = sanitizeStudentMarkdown(raw);
    assert.doesNotMatch(out, /not yet medically approved/i);
    assert.doesNotMatch(out, /REFERENCE_REVIEW_REQUIRED/);
    assert.doesNotMatch(out, /Faculty should/i);
    assert.doesNotMatch(out, /Faculty marker/i);
    assert.match(out, /Educational material/i);
    assert.match(out, /Teaching prose/);
  });

  it("softens inline review tokens in case teaching", () => {
    const out = sanitizeStudentMarkdown(
      "CTA is preferred. *Exact protocols: REFERENCE_REVIEW_REQUIRED.*",
    );
    assert.doesNotMatch(out, /REFERENCE_REVIEW_REQUIRED/);
    assert.match(out, /CTA is preferred/);
  });

  it("strips Ready for quiz plumbing before Sources", () => {
    const raw = `Teaching body.

### Ready for quiz

Pass threshold ≥80%. Afterward, add the flashcard (**PFK-1**) to spaced repetition so the chapter does not collapse back into a summary.

### Sources

Exact doses belong to primary sources.`;
    const out = sanitizeStudentMarkdown(raw);
    assert.doesNotMatch(out, /Ready for quiz/i);
    assert.doesNotMatch(out, /Pass threshold/i);
    assert.doesNotMatch(out, /spaced repetition/i);
    assert.match(out, /Teaching body/);
    assert.match(out, /### Sources/);
  });
});

describe("formatStudentLastReviewed", () => {
  it("replaces missing or unapproved review stamps", () => {
    assert.match(formatStudentLastReviewed(undefined), /Educational material/);
    assert.match(
      formatStudentLastReviewed("not yet medically approved"),
      /Educational material/,
    );
    assert.equal(
      formatStudentLastReviewed("2026-03-01"),
      "Last reviewed: 2026-03-01",
    );
  });
});

describe("formatStudentReferenceLine", () => {
  it("avoids faculty audit wording", () => {
    const line = formatStudentReferenceLine({
      label: "Primary teaching sources",
      status: "REFERENCE_REVIEW_REQUIRED",
    });
    assert.doesNotMatch(line, /reference review required/i);
    assert.match(line, /confirm against current guidelines/i);
  });
});
