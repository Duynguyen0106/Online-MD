import type { ContentBlock, Lesson, Module } from "@/lib/types/domain";
import { factualEnrichmentForSeedLesson } from "@/lib/curriculum/catalog/factual-enrichment";

const MIN_READING_CHARS = 4000;

function readingChars(lesson: Lesson): number {
  let n = 0;
  for (const c of lesson.concepts) {
    for (const b of c.blocks) {
      if (b.blockType === "reading" || b.blockType === "clinical_vignette") {
        n += b.bodyMd?.length ?? 0;
      }
    }
  }
  return n;
}

function collectPoints(lesson: Lesson): string[] {
  const points: string[] = [];
  for (const c of lesson.concepts) {
    if (c.summary) points.push(c.summary);
    for (const b of c.blocks) {
      if (b.blockType === "reading" && b.title) points.push(b.title);
    }
  }
  return [...new Set(points)].slice(0, 6);
}

function existingReadingMarkdown(lesson: Lesson): string {
  const parts: string[] = [];
  for (const c of lesson.concepts) {
    for (const b of c.blocks) {
      if (b.blockType === "reading" && b.bodyMd?.trim()) {
        parts.push(`### ${b.title}\n\n${b.bodyMd.trim()}`);
      }
    }
  }
  return parts.join("\n\n");
}

function nonReadingBlocks(lesson: Lesson): ContentBlock[] {
  const out: ContentBlock[] = [];
  for (const c of lesson.concepts) {
    for (const b of c.blocks) {
      if (b.blockType !== "reading") out.push(b);
    }
  }
  return out;
}

const SOURCES_FOOTER = `

### Sources

Citations for this lesson are being verified by faculty. Treat doses, numeric cutoffs, and trial statistics as belonging to primary sources and current society guidance — not as standalone orders from this page.

*Faculty marker: attach verified citations in medical review before claiming guideline currency.*
`;

const HAS_SOURCES_RE =
  /##?\s*sources\b|##?\s*references\b|guideline \/ reference|REFERENCE_REVIEW_REQUIRED|citations for this lesson are being verified/i;

/** Append a REFERENCE_REVIEW_REQUIRED Sources block when missing (no invented citations). */
export function ensureSourcesFooter(lesson: Lesson): Lesson {
  const body = lesson.concepts
    .flatMap((c) => c.blocks)
    .map((b) => b.bodyMd || "")
    .join("\n");
  if (HAS_SOURCES_RE.test(body)) return lesson;

  let appended = false;
  const concepts = lesson.concepts.map((c) => {
    if (appended) return c;
    const readingBlocks = c.blocks.filter((b) => b.blockType === "reading");
    const target = readingBlocks[readingBlocks.length - 1];
    if (!target?.bodyMd?.trim()) return c;
    appended = true;
    return {
      ...c,
      blocks: c.blocks.map((b) =>
        b.id === target.id
          ? { ...b, bodyMd: `${(b.bodyMd ?? "").trimEnd()}\n${SOURCES_FOOTER}` }
          : b,
      ),
    };
  });

  if (!appended) {
    // No reading block — add a short sources-only reading on the first concept.
    const first = concepts[0];
    if (!first) return lesson;
    const conceptId = first.id;
    concepts[0] = {
      ...first,
      blocks: [
        ...first.blocks,
        {
          id: `blk-src-${lesson.id}`,
          conceptId,
          blockType: "reading",
          title: "Sources",
          sequence: first.blocks.length + 1,
          bodyMd: `# Sources\n${SOURCES_FOOTER}`,
        },
      ],
    };
  }

  return { ...lesson, concepts };
}

/**
 * Expand thin seed/expansion lessons into textbook-style chapter blocks
 * while preserving diagrams, videos, and vignettes.
 */
export function enhanceThinSeedLesson(
  lesson: Lesson,
  module: Module,
): Lesson {
  if (lesson.id.startsWith("les-cat-")) return lesson;
  if (readingChars(lesson) >= MIN_READING_CHARS) {
    return ensureSourcesFooter(lesson);
  }

  const points = collectPoints(lesson);
  const enrichment = factualEnrichmentForSeedLesson({
    title: lesson.title,
    points: points.length ? points : [lesson.title],
  });

  const prior = existingReadingMarkdown(lesson);
  const extras = nonReadingBlocks(lesson).map((b, i) => ({
    ...b,
    sequence: 5 + i,
  }));

  const conceptId = `con-enh-${lesson.id}`;
  const chapterBlocks: ContentBlock[] = [
    {
      id: `blk-enh-${lesson.id}-ch1`,
      conceptId,
      blockType: "reading",
      title: "1. The basics",
      sequence: 1,
      bodyMd: `# ${lesson.title}

**Module:** ${module.title}

## What you’ll learn

By the end of this lesson, you should be able to:

1. Explain the core ideas of **${lesson.title}** without notes.
2. Connect each major control point to a bedside or laboratory finding.
3. Distinguish look-alike mechanisms or diagnoses.
4. Walk through a short clinical vignette before the quiz.

## How to use this lesson

Start with the original teaching notes, work through the mechanism, connect it to patients, then review the key points and take the quiz.
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch2`,
      conceptId,
      blockType: "reading",
      title: "2. How it works",
      sequence: 2,
      bodyMd: `## ${lesson.title} — how it works

### Teaching notes from this lesson

${prior || `Rebuild **${lesson.title}** from first principles: definition → regulation → failure mode → clinical bridge.`}

### Control-point checklist

${(points.length ? points : [lesson.title]).map((p, i) => `### ${i + 1}. ${p}

**${p}.** Place this node in the pathway for **${lesson.title}**, state what increases/decreases its activity, and name the phenotype when it fails. Tie the finding back to **${module.title}** so the mechanism predicts disease rather than remaining abstract.
`).join("\n")}

${
  enrichment
    ? `### Additional context

${enrichment}
`
    : ""
}
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch3`,
      conceptId,
      blockType: "reading",
      title: "3. Why it matters clinically",
      sequence: 3,
      bodyMd: `## Why it matters clinically — ${lesson.title}

Translate each control point into something you can observe in a patient: a symptom, exam finding, lab pattern, imaging clue, or drug effect.

### Mechanism storyline

Teach **${lesson.title}** as one continuous story through these anchors (in order): ${(points.length ? points : [lesson.title]).join(" → ")}. At each step, name the regulated variable, the compensatory response, and the bedside finding that compensation creates. When compensation becomes maladaptive, that is usually where the disease phenotype appears in **${module.title}**.

### Clinical threads

1. **Loss of function** — What syndrome appears when the pathway cannot meet demand?  
2. **Gain of function** — What appears when a brake is lost?  
3. **Toxic/pharmacologic hit** — Which agents act here?  
4. **Look-alike** — What is the most important mimic, and what discriminates it?

### Bridge table

| # | Anchor | Clinical prediction |
| --- | --- | --- |
${(points.length ? points : [lesson.title]).map((p, i) => `| ${i + 1} | ${p} | Phenotype, lab, imaging, or drug effect when this node fails |`).join("\n")}
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch4`,
      conceptId,
      blockType: "reading",
      title: "4. Put it together",
      sequence: 4,
      bodyMd: `## Put it together — ${lesson.title}

### Summary

**${lesson.title}** (module: ${module.title}) comes together when you can teach a continuous story through: ${(points.length ? points : [lesson.title]).join("; ")}.

### Common mistakes

1. Reading summaries without understanding regulation and phenotype  
2. Memorizing isolated facts without pathway links  
3. Missing the look-alike diagnosis  
4. Skipping a quick teach-back before the quiz  

### Self-check

${(points.length ? points : [lesson.title]).map((p, i) => `- [ ] ${i + 1}. I can teach: *${p}*`).join("\n")}
- [ ] I can state one clinical consequence and one common misconception.

Then check your understanding with the quiz (≥80%), and review the flashcards later.
${SOURCES_FOOTER}
`,
    },
    ...extras,
  ];

  return ensureSourcesFooter({
    ...lesson,
    estimatedMinutes: Math.max(lesson.estimatedMinutes, 90),
    concepts: [
      {
        id: conceptId,
        lessonId: lesson.id,
        title: lesson.title,
        sequence: 1,
        summary: points[0] ?? lesson.title,
        blocks: chapterBlocks,
      },
    ],
  });
}

export function enhanceProgramSeedLessons<
  T extends { phases: { modules: Module[] }[] },
>(program: T): T {
  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      mod.lessons = mod.lessons.map((lesson) =>
        ensureSourcesFooter(enhanceThinSeedLesson(lesson, mod)),
      );
    }
  }
  return program;
}
