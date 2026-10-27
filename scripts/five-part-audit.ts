/**
 * Five-part curriculum audit: structure coverage, safety heuristics, deepen status.
 * Run: npx tsx scripts/five-part-audit.ts
 */
import fs from "fs";
import { program } from "@/lib/curriculum/seed";
import { applyCurriculumExpansions } from "@/lib/curriculum/expansions";
import { enhanceProgramSeedLessons } from "@/lib/curriculum/seed-chapter-enhance";
import { catalogBundle } from "@/lib/curriculum/catalog/apply";
import { AUTHORED_FIVE_PART } from "@/lib/curriculum/authored/five-part";
import { P0_DEEP_FIVE_PART } from "@/lib/curriculum/authored/five-part/p0-deep";
import { WAVE2_DEEP_FIVE_PART } from "@/lib/curriculum/authored/five-part/wave2-deep";
import { WAVE3_DEEP_FIVE_PART } from "@/lib/curriculum/authored/five-part/wave3-deep";
import type { Lesson } from "@/lib/types/domain";

const FIVE = [
  { key: "S1", re: /##\s*1\.\s*Core Pathophysiology/i },
  { key: "S2", re: /##\s*2\.\s*Clinical Presentation/i },
  { key: "S3", re: /##\s*3\.\s*Diagnostic Approach/i },
  { key: "S4", re: /##\s*4\.\s*Management & Pharmacology/i },
  { key: "S5", re: /##\s*5\.\s*High-Yield Board Pearl/i },
];

const DOSE_RX =
  /\b\d+(\.\d+)?\s*(mg|mcg|µg|g|units?|u)\s*\/\s*(kg|day|dose|hr|h)\b/gi;
const CUTOFF_RX = /\b(mPAP|PCWP|MAP)\s*[><=]{1,2}\s*\d+/gi;
const HARD_RATE_RX = /\b(correct|correction)\s+.{0,40}\b\d+\s*mEq/gi;
const BLANK_PRED = /\|\s*Clinical prediction\s*\|/i;
const PAD_RX = /Extra rehearsal pass|## Teach-back —/i;
const REF_RX = /REFERENCE_REVIEW_REQUIRED/i;
const FLOOR_RX = /Clerkship integration & safety/i;

type Overlay = "p0" | "wave2" | "wave3" | "base" | "catalog";

type Row = {
  id: string;
  moduleId: string;
  title: string;
  kind: "handcrafted" | "catalog";
  chars: number;
  fivePart: boolean;
  missingSections: string[];
  hasRef: boolean;
  hasPad: boolean;
  hasFloorFooter: boolean;
  blankPredictionTable: boolean;
  doseHits: number;
  cutoffHits: number;
  rateHits: number;
  overlay: Overlay;
};

function readingBody(lesson: Lesson): string {
  return lesson.concepts
    .flatMap((c) => c.blocks)
    .filter(
      (b) =>
        b.blockType === "reading" || b.blockType === "clinical_vignette",
    )
    .map((b) => b.bodyMd ?? "")
    .join("\n");
}

function overlayFor(id: string): Overlay {
  if (P0_DEEP_FIVE_PART[id]) return "p0";
  if (WAVE2_DEEP_FIVE_PART[id]) return "wave2";
  if (WAVE3_DEEP_FIVE_PART[id]) return "wave3";
  if (AUTHORED_FIVE_PART[id]) return "base";
  return "catalog";
}

function auditLesson(
  lesson: Lesson,
  moduleId: string,
  kind: Row["kind"],
): Row {
  const body = readingBody(lesson);
  const missing = FIVE.filter((s) => !s.re.test(body)).map((s) => s.key);
  return {
    id: lesson.id,
    moduleId,
    title: lesson.title,
    kind,
    chars: body.length,
    fivePart: missing.length === 0,
    missingSections: missing,
    hasRef: REF_RX.test(body),
    hasPad: PAD_RX.test(body),
    hasFloorFooter: FLOOR_RX.test(body),
    blankPredictionTable: BLANK_PRED.test(body),
    doseHits: [...body.matchAll(DOSE_RX)].length,
    cutoffHits: [...body.matchAll(CUTOFF_RX)].length,
    rateHits: [...body.matchAll(HARD_RATE_RX)].length,
    overlay: kind === "catalog" ? "catalog" : overlayFor(lesson.id),
  };
}

const enhanced = enhanceProgramSeedLessons(
  applyCurriculumExpansions(structuredClone(program)),
);

const handcrafted: Row[] = [];
for (const ph of enhanced.phases) {
  for (const mod of ph.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.id.startsWith("les-cat-")) continue;
      handcrafted.push(auditLesson(lesson, mod.id, "handcrafted"));
    }
  }
}

const catalog: Row[] = [];
for (const [moduleId, lessons] of Object.entries(
  catalogBundle.lessonsByModule,
)) {
  for (const lesson of lessons) {
    catalog.push(auditLesson(lesson, moduleId, "catalog"));
  }
}

const byMod: Record<
  string,
  { n: number; five: number; ref: number; floor: number; avgChars: number }
> = {};
for (const r of handcrafted) {
  const m = byMod[r.moduleId] ?? {
    n: 0,
    five: 0,
    ref: 0,
    floor: 0,
    avgChars: 0,
  };
  m.n++;
  if (r.fivePart) m.five++;
  if (r.hasRef) m.ref++;
  if (r.hasFloorFooter) m.floor++;
  m.avgChars += r.chars;
  byMod[r.moduleId] = m;
}
for (const m of Object.values(byMod)) {
  m.avgChars = Math.round(m.avgChars / m.n);
}

const doseContexts: { id: string; snippet: string }[] = [];
for (const r of handcrafted) {
  if (r.doseHits === 0) continue;
  const lesson = enhanced.phases
    .flatMap((p) => p.modules)
    .flatMap((m) => m.lessons)
    .find((l) => l.id === r.id);
  if (!lesson) continue;
  const body = readingBody(lesson);
  const idx = body.search(DOSE_RX);
  if (idx < 0) continue;
  doseContexts.push({
    id: r.id,
    snippet: body.slice(Math.max(0, idx - 50), idx + 70).replace(/\n/g, " "),
  });
  if (doseContexts.length >= 15) break;
}

const summary = {
  totals: {
    handcrafted: handcrafted.length,
    catalog: catalog.length,
    all: handcrafted.length + catalog.length,
    authoredKeys: Object.keys(AUTHORED_FIVE_PART).length,
  },
  structure: {
    handcraftedFivePart: handcrafted.filter((r) => r.fivePart).length,
    handcraftedMissing: handcrafted
      .filter((r) => !r.fivePart)
      .map((r) => ({ id: r.id, missing: r.missingSections })),
    catalogFivePart: catalog.filter((r) => r.fivePart).length,
    catalogMissingSample: catalog
      .filter((r) => !r.fivePart)
      .slice(0, 10)
      .map((r) => ({ id: r.id, missing: r.missingSections })),
  },
  safety: {
    handcraftedWithRef: handcrafted.filter((r) => r.hasRef).length,
    catalogWithRef: catalog.filter((r) => r.hasRef).length,
    handcraftedPadded: handcrafted.filter((r) => r.hasPad).length,
    handcraftedBlankPred: handcrafted.filter((r) => r.blankPredictionTable)
      .length,
    catalogBlankPred: catalog.filter((r) => r.blankPredictionTable).length,
    handcraftedDoseHits: handcrafted.reduce((s, r) => s + r.doseHits, 0),
    catalogDoseHits: catalog.reduce((s, r) => s + r.doseHits, 0),
    handcraftedCutoffHits: handcrafted.reduce((s, r) => s + r.cutoffHits, 0),
    handcraftedRateHits: handcrafted.reduce((s, r) => s + r.rateHits, 0),
    doseLessonIds: handcrafted.filter((r) => r.doseHits > 0).map((r) => r.id),
    cutoffLessonIds: handcrafted
      .filter((r) => r.cutoffHits > 0)
      .map((r) => r.id),
    rateLessonIds: handcrafted.filter((r) => r.rateHits > 0).map((r) => r.id),
  },
  deepen: {
    floorFooter: handcrafted.filter((r) => r.hasFloorFooter).length,
    overlayCounts: {
      p0: handcrafted.filter((r) => r.overlay === "p0").length,
      wave2: handcrafted.filter((r) => r.overlay === "wave2").length,
      wave3: handcrafted.filter((r) => r.overlay === "wave3").length,
      base: handcrafted.filter((r) => r.overlay === "base").length,
    },
    charStats: {
      min: Math.min(...handcrafted.map((r) => r.chars)),
      max: Math.max(...handcrafted.map((r) => r.chars)),
      avg: Math.round(
        handcrafted.reduce((s, r) => s + r.chars, 0) / handcrafted.length,
      ),
      under2500: handcrafted.filter((r) => r.chars < 2500).length,
      under3000: handcrafted.filter((r) => r.chars < 3000).length,
    },
  },
};

fs.mkdirSync("docs/audit", { recursive: true });
const out = {
  generatedAt: new Date().toISOString(),
  summary,
  byMod,
  doseContexts,
  handcrafted,
};
fs.writeFileSync(
  "docs/audit/five-part-audit.json",
  JSON.stringify(out, null, 2),
);
console.log(JSON.stringify({ summary, byMod, doseContexts }, null, 2));
