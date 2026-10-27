import type { ContentBlock, Lesson, Module } from "@/lib/types/domain";
import { CV_FIVE_PART } from "@/lib/curriculum/authored/five-part/cv";
import { PULM_FIVE_PART } from "@/lib/curriculum/authored/five-part/pulm";

/** Hand-authored five-part chapter bodies keyed by lesson id. */
export const AUTHORED_FIVE_PART: Record<string, string> = {
  ...CV_FIVE_PART,
  ...PULM_FIVE_PART,
};

const SOURCES_FOOTER_RE =
  /##?\s*sources\b|REFERENCE_REVIEW_REQUIRED|citations for this lesson are being verified/i;

/**
 * Replace reading blocks with a single authored five-part chapter while
 * preserving diagrams, videos, and clinical vignettes.
 */
export function applyAuthoredFivePart(
  lesson: Lesson,
  _module: Module,
  bodyMd: string,
): Lesson {
  const first = lesson.concepts[0];
  if (!first) return lesson;

  const preserved: ContentBlock[] = [];
  for (const c of lesson.concepts) {
    for (const b of c.blocks) {
      if (b.blockType !== "reading") {
        preserved.push({ ...b, conceptId: first.id });
      }
    }
  }

  const chapter: ContentBlock = {
    id: `blk-5part-${lesson.id}`,
    conceptId: first.id,
    blockType: "reading",
    title: "1–5. Five-part chapter",
    sequence: 1,
    bodyMd: SOURCES_FOOTER_RE.test(bodyMd)
      ? bodyMd
      : `${bodyMd.trimEnd()}

### Sources

Citations for this lesson are being verified by faculty. Treat doses, numeric cutoffs, and trial statistics as belonging to primary sources and current society guidance — not as standalone orders from this page.

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,
  };

  const blocks = [
    chapter,
    ...preserved.map((b, i) => ({ ...b, sequence: i + 2 })),
  ];

  return {
    ...lesson,
    estimatedMinutes: Math.max(lesson.estimatedMinutes, 60),
    concepts: [
      {
        ...first,
        title: lesson.title,
        summary: first.summary || lesson.title,
        blocks,
      },
      // Drop trailing concepts whose readings were merged; keep only if they
      // had non-reading blocks already folded into `preserved`.
    ],
  };
}

export function tryApplyAuthoredFivePart(
  lesson: Lesson,
  module: Module,
): Lesson | null {
  const body = AUTHORED_FIVE_PART[lesson.id];
  if (!body) return null;
  return applyAuthoredFivePart(lesson, module, body);
}
