import type { ContentBlock, Lesson, Module } from "@/lib/types/domain";
import { factualEnrichmentForTopic } from "@/lib/curriculum/catalog/factual-enrichment";
import { STUDENT_SOURCES_FOOTER } from "@/lib/copy/sanitize-student-content";

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

/** Map seed modules to catalog enrichment category/organ labels. */
function enrichmentContext(module: Module): {
  contentCategory: string;
  organSystem: string;
} {
  const id = module.id;
  if (id === "mod-cell-mol")
    return { contentCategory: "Cell Biology", organSystem: "Multisystem" };
  if (id === "mod-cv")
    return { contentCategory: "Pathophysiology", organSystem: "Cardiovascular" };
  if (id === "mod-pulm")
    return { contentCategory: "Pathophysiology", organSystem: "Respiratory" };
  if (id === "mod-renal")
    return { contentCategory: "Pathophysiology", organSystem: "Renal / Urinary" };
  if (id === "mod-gi")
    return {
      contentCategory: "Pathophysiology",
      organSystem: "Gastrointestinal",
    };
  if (id === "mod-endo")
    return { contentCategory: "Pathophysiology", organSystem: "Endocrine" };
  if (id === "mod-heme")
    return {
      contentCategory: "Pathophysiology",
      organSystem: "Hematopoietic / Lymphoreticular",
    };
  if (id === "mod-neuro")
    return { contentCategory: "Pathophysiology", organSystem: "Nervous System" };
  if (id === "mod-msk")
    return {
      contentCategory: "Pathophysiology",
      organSystem: "Musculoskeletal",
    };
  if (id === "mod-id")
    return { contentCategory: "Microbiology", organSystem: "Multisystem" };
  if (id === "mod-im")
    return { contentCategory: "Internal Medicine", organSystem: "Multisystem" };
  if (id === "mod-surg")
    return { contentCategory: "Surgery", organSystem: "Multisystem" };
  if (id === "mod-peds")
    return { contentCategory: "Pediatrics", organSystem: "Pediatric" };
  if (id === "mod-obgyn")
    return {
      contentCategory: "Obstetrics & Gynecology",
      organSystem: "Reproductive",
    };
  if (id === "mod-psych")
    return { contentCategory: "Psychiatry", organSystem: "Behavioral Health" };
  if (id === "mod-fm")
    return { contentCategory: "Family Medicine", organSystem: "Multisystem" };
  return { contentCategory: "Pathophysiology", organSystem: "Multisystem" };
}

const SOURCES_FOOTER = STUDENT_SOURCES_FOOTER;

const HAS_SOURCES_RE =
  /##?\s*sources\b|##?\s*references\b|guideline \/ reference|REFERENCE_REVIEW_REQUIRED|confirm doses, thresholds/i;

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
/** Hand-authored five-part chapters should not be overwritten by the generic expander. */
function hasFivePartSpine(lesson: Lesson): boolean {
  const titles = lesson.concepts
    .flatMap((c) => c.blocks)
    .map((b) => b.title ?? "");
  return (
    titles.some((t) => /how it works/i.test(t)) &&
    titles.some((t) => /why it matters clinically/i.test(t))
  );
}

export function enhanceThinSeedLesson(
  lesson: Lesson,
  module: Module,
): Lesson {
  if (lesson.id.startsWith("les-cat-")) return lesson;
  // Reference hand-authored lessons (e.g. les-cv-2 ACS) keep their spine.
  if (hasFivePartSpine(lesson) || readingChars(lesson) >= MIN_READING_CHARS) {
    return ensureSourcesFooter(lesson);
  }

  const points = collectPoints(lesson);
  const ctx = enrichmentContext(module);
  const enrichment = factualEnrichmentForTopic({
    title: lesson.title,
    points: points.length ? points : [lesson.title],
    quizExplain: points[0] ?? lesson.title,
    cardBack: module.title,
    contentCategory: ctx.contentCategory,
    organSystem: ctx.organSystem,
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

Start with the basics, work through the mechanism, connect it to patients, then review the key points and take the quiz.
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch2`,
      conceptId,
      blockType: "reading",
      title: "2. How it works",
      sequence: 2,
      bodyMd: `## How it works — ${lesson.title}

*Reference pattern:* core mechanism first, then classification/nuances. Prefer clinical reasoning language over meta “chapter method” prose. See \`les-cv-2\` (Ischemic Heart Disease & ACS) for the hand-authored model.

### 1. Core mechanism (start here)

${enrichment || `State the main pathway for **${lesson.title}** in one continuous story: normal → stressed → failed. Name the primary failure mode that produces the bedside syndrome.`}

### 2. Build from the lesson anchors

${(points.length ? points : [lesson.title]).map((p, i) => `#### ${i + 1}. ${p}

Place **${p}** in the pathway. What increases or decreases it? What phenotype appears when it fails? Predict one finding you could defend on rounds.
`).join("\n")}

### 3. Nuances (open after the core is solid)

${prior || `Add the exceptions and modifiers that change management once the core mechanism is clear—without burying the spine.`}

### 4. Self-check

- Can you teach the core mechanism without notes?  
- Can you place each anchor above in that story?  
- What is the first nuance that most often tricks learners?
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch3`,
      conceptId,
      blockType: "reading",
      title: "3. Why it matters clinically",
      sequence: 3,
      bodyMd: `## Why it matters clinically — ${lesson.title}

*Reference pattern:* decisions → pitfalls → look-alikes. Bound to this lesson’s objectives, not generic organ essays. See \`les-cv-2\` for the hand-authored model.

### 1. Decisions this mechanism changes

For each anchor, name what you would **do or watch for** at the bedside (order, monitor, escalate, or counsel)—not a full guideline dump.

| # | Anchor | Clinical move |
| --- | --- | --- |
${(points.length ? points : [lesson.title]).map((p, i) => `| ${i + 1} | ${p} | Finding, next step, or monitoring priority when this node fails |`).join("\n")}

### 2. Common pitfalls

1. Skipping the core mechanism and jumping to memorized labels  
2. Missing the time-critical branch (what must be acted on *now*?)  
3. Treating a historical teaching mnemonic as a modern protocol  
4. Forgetting serial data when the first test can be falsely reassuring  

### 3. Look-alikes

| Look-alike | Why it fools you | Discriminator |
| --- | --- | --- |
| Closest mimic of **${lesson.title}** | Shared symptom or lab pattern | History, exam, or test that splits the differential |
| Second mimic | Overlapping urgency or imaging | Explicit “not this because…” clue |

### 4. Bedside synthesis prompt

Unstable? → Critical test now? → Working classification? → Explicit look-alike still on the board?
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
