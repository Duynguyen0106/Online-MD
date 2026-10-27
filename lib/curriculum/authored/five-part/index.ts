import type { ContentBlock, Lesson, Module } from "@/lib/types/domain";
import { CV_FIVE_PART } from "@/lib/curriculum/authored/five-part/cv";
import { PULM_FIVE_PART } from "@/lib/curriculum/authored/five-part/pulm";
import { RENAL_FIVE_PART } from "@/lib/curriculum/authored/five-part/renal";
import { GI_FIVE_PART } from "@/lib/curriculum/authored/five-part/gi";
import { ENDO_FIVE_PART } from "@/lib/curriculum/authored/five-part/endo";
import { HEME_FIVE_PART } from "@/lib/curriculum/authored/five-part/heme";
import { NEURO_FIVE_PART } from "@/lib/curriculum/authored/five-part/neuro";
import { MSK_FIVE_PART } from "@/lib/curriculum/authored/five-part/msk";
import { ID_FIVE_PART } from "@/lib/curriculum/authored/five-part/id";
import { IM_FIVE_PART } from "@/lib/curriculum/authored/five-part/im";
import { SURG_FIVE_PART } from "@/lib/curriculum/authored/five-part/surg";
import { PEDS_FIVE_PART } from "@/lib/curriculum/authored/five-part/peds";
import { OBGYN_FIVE_PART } from "@/lib/curriculum/authored/five-part/obgyn";
import { PSYCH_FIVE_PART } from "@/lib/curriculum/authored/five-part/psych";
import { FM_FIVE_PART } from "@/lib/curriculum/authored/five-part/fm";
import { CELL_MOL_FIVE_PART } from "@/lib/curriculum/authored/five-part/cell-mol";

/** Hand-authored five-part chapter bodies keyed by lesson id. */
export const AUTHORED_FIVE_PART: Record<string, string> = {
  ...CV_FIVE_PART,
  ...PULM_FIVE_PART,
  ...RENAL_FIVE_PART,
  ...GI_FIVE_PART,
  ...ENDO_FIVE_PART,
  ...HEME_FIVE_PART,
  ...NEURO_FIVE_PART,
  ...MSK_FIVE_PART,
  ...ID_FIVE_PART,
  ...IM_FIVE_PART,
  ...SURG_FIVE_PART,
  ...PEDS_FIVE_PART,
  ...OBGYN_FIVE_PART,
  ...PSYCH_FIVE_PART,
  ...FM_FIVE_PART,
  ...CELL_MOL_FIVE_PART,
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
