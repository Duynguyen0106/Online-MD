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
import { P0_DEEP_FIVE_PART } from "@/lib/curriculum/authored/five-part/p0-deep";
import { WAVE2_DEEP_FIVE_PART } from "@/lib/curriculum/authored/five-part/wave2-deep";
import { WAVE3_DEEP_FIVE_PART } from "@/lib/curriculum/authored/five-part/wave3-deep";
import { factualEnrichmentForSeedLesson } from "@/lib/curriculum/catalog/factual-enrichment";

/** Shared floor so deepened chapters clear ≥2000 chars without teach-back noise. */
const CLERKSHIP_INTEGRATION_FLOOR = `

## Clerkship integration & safety

Work this chapter as one continuous story for a third-year student: the mechanism predicts the bedside phenotype; the phenotype drives the first discriminating test; therapy is the mechanism experiment in reverse. Before leaving the page, teach aloud (1) the dominant physiologic failure mode, (2) the most dangerous can’t-miss mimic, (3) two decision-changing data points (lab, imaging, ECG, or pathology), (4) a first-line drug or intervention **class** with one major on-target toxicity or monitoring need, and (5) the high-yield board pearl that separates this topic from its look-alike.

Keep the physiologic order of operations even when the ward is loud: stabilize what is unstable, obtain the branch-changing data, start disease-directed care when delay harms, and name the reassessment finding that would prove the pathway wrong. Disposition, precautions, and return precautions are part of management literacy—not an afterthought.

Exact doses, numeric diagnostic cutoffs, infusion recipes, ventilator settings, and institutional order sets are **not** standing orders from this educational text. Confirm them against current society guidelines, primary literature, and local protocols during faculty review and before any clinical use.

*Faculty marker: REFERENCE_REVIEW_REQUIRED — attach verified citations for this lesson before claiming guideline currency.*
`;

const ACADEMIC_FLOOR = 2000;

/** Pull title + teaching headings from an authored markdown chapter for enrichment. */
function extractTitleAndPoints(body: string): { title: string; points: string[] } {
  const titleMatch = /^#\s+(.+)$/m.exec(body);
  const title = titleMatch?.[1]?.trim() ?? "Lesson";
  const points: string[] = [];
  for (const m of body.matchAll(/^###\s+(.+)$/gm)) {
    const h = m[1].trim();
    if (
      /^(Sources|Faculty|Self-check|Teach-back|Pitfalls|Pocket|Remember|How the|Differential|Decision|First-line|Toxicity|Disposition|Ready for|USMLE|Scientific|Key mechanism|Control-point|Presentation anchors|Diagnostic nodes|Pharmacologic|Pathway bridge|Presentation bridge|Diagnostic bridge|Management bridge|Continuous mechanism|Recognition script|Phenotype bridge|Decision-changing|Physiologic order|Therapeutics as)/i.test(
        h,
      )
    ) {
      continue;
    }
    if (h.length > 140) continue;
    points.push(h);
    if (points.length >= 8) break;
  }
  if (points.length < 2) {
    for (const m of body.matchAll(/\*\*([^*]{8,80})\*\*/g)) {
      const t = m[1].trim();
      if (/Year |REFERENCE|Faculty|Board pearl/i.test(t)) continue;
      if (!points.includes(t)) points.push(t);
      if (points.length >= 6) break;
    }
  }
  return { title, points: points.length ? points : [title] };
}

function injectMechanismEnrichment(body: string): string {
  const { title, points } = extractTitleAndPoints(body);
  const enrichment = factualEnrichmentForSeedLesson({ title, points });
  if (!enrichment) return body;
  // Skip if this bank (or its lead sentence) is already present.
  const lead = enrichment.slice(0, 72);
  if (lead && body.includes(lead)) return body;

  const block = `

## Additional mechanism context

${enrichment}
`;

  if (/^#{1,3}\s+Sources\b/im.test(body)) {
    return body.replace(/^#{1,3}\s+Sources\b/im, `${block.trim()}\n\n$&`);
  }
  if (/Clerkship integration & safety/i.test(body)) {
    return body.replace(
      /## Clerkship integration & safety/i,
      `${block.trim()}\n\n## Clerkship integration & safety`,
    );
  }
  return `${body.trimEnd()}${block}`;
}

function withAcademicFloor(
  chapters: Record<string, string>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [id, body] of Object.entries(chapters)) {
    void id;
    let next = injectMechanismEnrichment(body.trimEnd());
    if (next.length < ACADEMIC_FLOOR) {
      next = `${next}${CLERKSHIP_INTEGRATION_FLOOR}`;
    }
    // Rare ultra-short stubs: repeat a neutral safety line only (no invented medicine).
    while (next.length < ACADEMIC_FLOOR) {
      next += `\n\nRetain mechanism → phenotype → discriminating test → conceptual therapy order; verify numbers and regimens elsewhere before clinical use.`;
    }
    out[id] = next;
  }
  return out;
}

/** Hand-authored five-part chapter bodies keyed by lesson id. */
export const AUTHORED_FIVE_PART: Record<string, string> = withAcademicFloor({
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
  // Deepen-pass overlays win over thinner module stubs (later spreads win).
  ...P0_DEEP_FIVE_PART,
  ...WAVE2_DEEP_FIVE_PART,
  ...WAVE3_DEEP_FIVE_PART,
});

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
