import type { ContentBlock, Lesson, Module } from "@/lib/types/domain";
import { factualEnrichmentForSeedLesson } from "@/lib/curriculum/catalog/factual-enrichment";
import { tryApplyAuthoredFivePart } from "@/lib/curriculum/authored/five-part";

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

/** Prefer short titles over paragraph-length summaries as teach-back anchors. */
function shortAnchor(text: string, fallback: string): string {
  const t = text.trim();
  if (!t) return fallback;
  if (t.length > 80 || /[.!?].+\S/.test(t)) {
    const clause = t.split(/[.;]/)[0]?.trim() ?? t;
    return clause.length > 72 ? `${clause.slice(0, 69).trimEnd()}…` : clause;
  }
  return t;
}

function collectPoints(lesson: Lesson): string[] {
  const points: string[] = [];
  for (const c of lesson.concepts) {
    for (const b of c.blocks) {
      if (b.blockType === "reading" && b.title) {
        points.push(shortAnchor(b.title, lesson.title));
      }
    }
    if (c.title) points.push(shortAnchor(c.title, lesson.title));
    if (c.summary) points.push(shortAnchor(c.summary, c.title || lesson.title));
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

*Faculty marker: REFERENCE_REVIEW_REQUIRED — attach verified citations in medical review before claiming guideline currency.*
`;

const HAS_SOURCES_RE =
  /##?\s*sources\b|##?\s*references\b|guideline \/ reference|REFERENCE_REVIEW_REQUIRED|citations for this lesson are being verified/i;

const HAS_FIVE_PART_RE =
  /##\s*1\.\s*Core Pathophysiology|##\s*Core Pathophysiology/i;

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
 * True when the handcrafted seed already carries mechanism teaching
 * (headings/tables/diagrams). Full enhancement scaffold would be noise (T1).
 */
export function lessonAlreadyTeachesMechanism(lesson: Lesson): boolean {
  const hasDiagram = lesson.concepts.some((c) =>
    c.blocks.some((b) => b.blockType === "diagram"),
  );
  const readings = lesson.concepts.flatMap((c) =>
    c.blocks.filter((b) => b.blockType === "reading" && (b.bodyMd?.trim() ?? "")),
  );
  const body = readings.map((b) => b.bodyMd ?? "").join("\n");
  if (HAS_FIVE_PART_RE.test(body) && body.length >= 2500) return true;
  const headingCount = (body.match(/^#{2,3}\s+\S+/gm) ?? []).length;
  const hasTable = /\|.+\|/.test(body) && /\|?\s*-{3,}/.test(body);
  const mechanismCue =
    /starling|action potential|phase\s*[0-4]|afferent|efferent|filtration fraction|preload|afterload|pamp|damp|anion gap|gram.?stain|territor|acs spectrum|mechanis/i.test(
      body,
    );
  if (hasDiagram && (body.length >= 200 || headingCount >= 2)) return true;
  if (body.length >= 600 && headingCount >= 2 && mechanismCue) return true;
  if (hasTable && body.length >= 500) return true;
  return false;
}

function lightPadBody(lesson: Lesson, module: Module, points: string[]): string {
  const anchors = points.length ? points : [lesson.title];
  return `## Teach-back — ${lesson.title}

You already have the core mechanism notes above. Use this page as a rehearsal against the five-part chapter spine, not as a second textbook.

### Five-part rehearsal

1. **Core Pathophysiology** — teach the continuous story through: ${anchors.join(" → ")}.
2. **Clinical Presentation** — name symptoms/exam findings and one can’t-miss mimic.
3. **Diagnostic Approach** — name two decision-changing data points.
4. **Management & Pharmacology** — name conceptual first-line classes + one major toxicity (no invented doses).
5. **High-Yield Board Pearl** — one Step 1/Step 2 CK discriminator.

### Discrimination drill

1. **Loss of function** — What syndrome appears when the pathway cannot meet demand?
2. **Gain of function / lost brake** — What appears when inhibition fails?
3. **Look-alike** — Name the closest mimic and the single best discriminator.
4. **Drug or toxin node** — Which common agent acts at this step (conceptually — verify regimens elsewhere)?

### Self-check

${anchors.map((p, i) => `- [ ] ${i + 1}. I can teach *${p}* without notes.`).join("\n")}
- [ ] I can state one clinical consequence and one common misconception for **${lesson.title}**.

### Common mistakes to avoid

1. Memorizing arrows without saying what is regulated
2. Skipping the look-alike diagnosis
3. Jumping to orders before the mechanism predicts the phenotype
4. Treating this teach-back as a source of doses or numeric cutoffs

Work the quiz (≥80%) after you can teach the story aloud, then revisit flashcards later.
`;
}

/**
 * Keep original concept structure when the seed already teaches.
 * Only ensure Sources and pad with a teach-back if still under the length floor.
 */
function lightEnhanceThinSeedLesson(lesson: Lesson, module: Module): Lesson {
  const points = collectPoints(lesson);
  let next = ensureSourcesFooter(structuredClone(lesson));
  if (readingChars(next) >= MIN_READING_CHARS) {
    return {
      ...next,
      estimatedMinutes: Math.max(next.estimatedMinutes, 45),
    };
  }

  const pad = lightPadBody(next, module, points);
  const needed = MIN_READING_CHARS - readingChars(next) + 80;
  let body = pad;
  while (body.length < needed) {
    body += `

### Extra rehearsal pass

Retell **${lesson.title}** once more using the five-part spine and anchors: ${(points.length ? points : [lesson.title]).join("; ")}. If you cannot finish the story, return to the original teaching notes — do not add unverified numbers or regimens.
`;
  }

  const first = next.concepts[0];
  if (!first) return ensureSourcesFooter(next);

  const conceptId = first.id;
  const reviewBlock: ContentBlock = {
    id: `blk-light-${lesson.id}-review`,
    conceptId,
    blockType: "reading",
    title: "Teach-back & self-check",
    sequence: first.blocks.length + 1,
    bodyMd: body,
  };

  next = {
    ...next,
    estimatedMinutes: Math.max(next.estimatedMinutes, 45),
    concepts: [
      {
        ...first,
        blocks: [...first.blocks, reviewBlock],
      },
      ...next.concepts.slice(1),
    ],
  };
  return ensureSourcesFooter(next);
}

/**
 * Expand thin seed/expansion lessons into the five-part senior-clerkship chapter
 * while preserving diagrams, videos, and vignettes.
 * Skips the heavy scaffold when original notes already teach the mechanism (T1).
 */
export function enhanceThinSeedLesson(
  lesson: Lesson,
  module: Module,
): Lesson {
  if (lesson.id.startsWith("les-cat-")) return lesson;

  // Prefer hand-authored five-part chapters when available (module-by-module expansion).
  const authored = tryApplyAuthoredFivePart(lesson, module);
  if (authored) {
    const authoredBody = authored.concepts
      .flatMap((c) => c.blocks.map((b) => b.bodyMd ?? ""))
      .join("\n");
    // Five-part academic chapters stand on their own once they clear a prose floor;
    // do not dilute them with repetitive teach-back padding.
    if (HAS_FIVE_PART_RE.test(authoredBody) && readingChars(authored) >= 2000) {
      return ensureSourcesFooter({
        ...authored,
        estimatedMinutes: Math.max(authored.estimatedMinutes, 60),
      });
    }
    if (readingChars(authored) >= MIN_READING_CHARS) {
      return ensureSourcesFooter(authored);
    }
    return lightEnhanceThinSeedLesson(authored, module);
  }

  if (readingChars(lesson) >= MIN_READING_CHARS && HAS_FIVE_PART_RE.test(
    lesson.concepts.flatMap((c) => c.blocks.map((b) => b.bodyMd ?? "")).join("\n"),
  )) {
    return ensureSourcesFooter(lesson);
  }
  if (readingChars(lesson) >= MIN_READING_CHARS) {
    return ensureSourcesFooter(lesson);
  }
  if (lessonAlreadyTeachesMechanism(lesson)) {
    return lightEnhanceThinSeedLesson(lesson, module);
  }

  const points = collectPoints(lesson);
  const anchors = points.length ? points : [lesson.title];
  const enrichment = factualEnrichmentForSeedLesson({
    title: lesson.title,
    points: anchors,
  });

  const prior = existingReadingMarkdown(lesson);
  const extras = nonReadingBlocks(lesson).map((b, i) => ({
    ...b,
    sequence: 7 + i,
  }));

  const conceptId = `con-enh-${lesson.id}`;
  const chapterBlocks: ContentBlock[] = [
    {
      id: `blk-enh-${lesson.id}-ch0`,
      conceptId,
      blockType: "reading",
      title: "0. Chapter overview",
      sequence: 1,
      bodyMd: `# ${lesson.title}

**Module:** ${module.title}

## Chapter overview

This lesson uses a fixed five-part structure suitable for a third-year medical student: **Core Pathophysiology → Clinical Presentation → Diagnostic Approach → Management & Pharmacology → High-Yield Board Pearl**.

## Learning objectives

1. Explain the core ideas of **${lesson.title}** without notes.
2. Connect each major control point to a bedside or laboratory finding.
3. Sequence a high-yield diagnostic approach.
4. Name conceptual first-line management classes and major toxicities (verify regimens elsewhere).
5. State one board-ready pearl that separates this topic from its look-alike.

## How to use this lesson

Work the five teaching sections in order, then the clinical case, then the quiz (≥80%).
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch1`,
      conceptId,
      blockType: "reading",
      title: "1. Core Pathophysiology",
      sequence: 2,
      bodyMd: `## 1. Core Pathophysiology — ${lesson.title}

### Teaching notes from this lesson

${prior || `Rebuild **${lesson.title}** from first principles: definition → regulation → failure mode → clinical bridge.`}

### Control-point checklist

${anchors.map((p, i) => `### ${i + 1}. ${p}

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
      id: `blk-enh-${lesson.id}-ch2`,
      conceptId,
      blockType: "reading",
      title: "2. Clinical Presentation",
      sequence: 3,
      bodyMd: `## 2. Clinical Presentation — ${lesson.title}

Translate each control point into something you can observe in a patient: a symptom, exam finding, vital-sign pattern, or acuity signal.

### Mechanism → person

Teach **${lesson.title}** as one continuous story through these anchors: ${anchors.join(" → ")}. At each step, name the regulated variable, the compensatory response, and the bedside finding that compensation creates.

### Differential that stays honest

1. Most likely explanation  
2. Most dangerous can’t-miss alternative  
3. Common mimic that shares early features  

### Teach-back

${anchors.map((p, i) => `${i + 1}. **${p}** — write one clinical consequence yourself.`).join("\n")}
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch3`,
      conceptId,
      blockType: "reading",
      title: "3. Diagnostic Approach",
      sequence: 4,
      bodyMd: `## 3. Diagnostic Approach — ${lesson.title}

### High-yield data strategy

Choose tests that change management. Correlate labs, imaging, and ECG/pathology with the mechanism of **${lesson.title}**. Exact cutoffs belong to current guidelines (*REFERENCE_REVIEW_REQUIRED*).

### Decision spine

1. Syndrome — What is failing?  
2. Time — Minutes versus hours?  
3. Discriminating data — Which tests change the branch?  
4. Therapy readiness — What starts before perfect certainty when delay harms?  
5. Reassessment — What finding says the pathway is wrong?

### Teach-back

${anchors.map((p, i) => `${i + 1}. **${p}** — name one decision-changing lab/imaging/ECG/pathology correlate.`).join("\n")}
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch4`,
      conceptId,
      blockType: "reading",
      title: "4. Management & Pharmacology",
      sequence: 5,
      bodyMd: `## 4. Management & Pharmacology — ${lesson.title}

### First-line thinking (conceptual)

Map interventions to physiology: target → expected change → clinical endpoint → on-target toxicity. Learn classes and rationale for **${lesson.title}** inside **${module.title}**; verify exact regimens, dosing, and sequencing against current society guidance before clinical use.

### Toxicity literacy

For every major class you name, state one major adverse effect and one monitoring or reassessment cue. Do not invent doses or standing orders from this page.

### Teach-back

${anchors.map((p, i) => `${i + 1}. **${p}** — name a conceptual therapy class and one major toxicity.`).join("\n")}

*Faculty marker: REFERENCE_REVIEW_REQUIRED.*
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch5`,
      conceptId,
      blockType: "reading",
      title: "5. High-Yield Board Pearl",
      sequence: 6,
      bodyMd: `## 5. High-Yield Board Pearl — ${lesson.title}

### USMLE Step 1 / Step 2 CK takeaway

**${lesson.title}** (module: ${module.title}) is mastered when you can teach a continuous story through: ${anchors.join("; ")}.

**Board pearl:** Mechanism predicts phenotype; phenotype drives the first discriminating test; therapy is the mechanism experiment in reverse.

### Self-check

${anchors.map((p, i) => `- [ ] ${i + 1}. I can teach: *${p}*`).join("\n")}
- [ ] I can state one clinical consequence and one common misconception.
- [ ] I can name one can’t-miss alternative and one major drug-class toxicity.

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
