/**
 * Write SVG assets and audit figures for one content category (a "chapter" batch).
 */
import { FOUR_YEAR_TOPICS } from "../lib/curriculum/catalog/topics-generated.ts";
import {
  writeChapterFigureAssets,
  auditTopicFigures,
  figuresForTopic,
  CHAPTER_FIGURES,
} from "../lib/curriculum/catalog/chapter-figures.ts";
import { buildChapterCore } from "../lib/curriculum/catalog/chapter-writer.ts";

const category = process.argv[2];
if (!category) {
  console.error("Usage: npx tsx scripts/audit-chapter-figures.mts <ContentCategory|ALL>");
  process.exit(1);
}

const n = writeChapterFigureAssets();
if (process.env.FIGURE_AUDIT_QUIET !== "1") {
  console.error(`Wrote ${n} SVG assets to public/figures/`);
}

const topics =
  category === "ALL"
    ? FOUR_YEAR_TOPICS
    : FOUR_YEAR_TOPICS.filter((t) => t.contentCategory === category);

if (!topics.length) {
  console.error("No topics for category:", category);
  console.error(
    "Available:",
    [...new Set(FOUR_YEAR_TOPICS.map((t) => t.contentCategory))].join(" | "),
  );
  process.exit(1);
}

let withFigs = 0;
let neededMissing = 0;
let issues = 0;
const missing: string[] = [];
const sample: { title: string; figs: string[] }[] = [];

for (const t of topics) {
  const a = auditTopicFigures(t);
  if (a.figureIds.length) {
    withFigs++;
    if (sample.length < 8) sample.push({ title: t.title, figs: a.figureIds });
  }
  if (a.necessary && a.figureIds.length === 0) {
    neededMissing++;
    missing.push(t.title);
  }
  issues += a.issues.length;

  // Ensure markdown embeds resolve to known ids
  const core = buildChapterCore(t);
  for (const id of a.figureIds) {
    if (!core.includes(`/figures/${id}.svg`)) {
      console.error("EMBED MISSING", t.title, id);
      issues++;
    }
    if (!CHAPTER_FIGURES.some((f) => f.id === id)) {
      console.error("UNKNOWN FIGURE", id);
      issues++;
    }
  }
}

console.log(
  JSON.stringify(
    {
      category,
      topics: topics.length,
      withFigures: withFigs,
      pctWithFigures: Math.round((100 * withFigs) / topics.length),
      neededButMissing: neededMissing,
      missing: missing.slice(0, 15),
      issueCount: issues,
      sample,
      librarySize: CHAPTER_FIGURES.length,
    },
    null,
    2,
  ),
);

if (neededMissing > 0 || issues > 0) process.exitCode = 2;
