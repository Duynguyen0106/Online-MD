import type { ContentBlock, Lesson, Module } from "@/lib/types/domain";
import { factualEnrichmentForTopic } from "@/lib/curriculum/catalog/factual-enrichment";

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

/**
 * Expand thin seed/expansion lessons into textbook-style chapter blocks
 * while preserving diagrams, videos, and vignettes.
 */
export function enhanceThinSeedLesson(
  lesson: Lesson,
  module: Module,
): Lesson {
  if (lesson.id.startsWith("les-cat-")) return lesson;
  if (readingChars(lesson) >= MIN_READING_CHARS) return lesson;

  const points = collectPoints(lesson);
  const enrichment = factualEnrichmentForTopic({
    title: lesson.title,
    points: points.length ? points : [lesson.title],
    quizExplain: points[0] ?? lesson.title,
    cardBack: module.title,
    contentCategory: "Pathophysiology",
    organSystem: module.title,
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
      title: "I. Foundations & learning goals",
      sequence: 1,
      bodyMd: `# ${lesson.title}

**Module:** ${module.title}

## Chapter overview

This lesson develops **${lesson.title}** as a textbook-style chapter for mastery learning. Read for mechanism and clinical consequence—not buzzwords alone.

## Learning objectives

1. Explain the core ideas of **${lesson.title}** without notes.
2. Connect each major control point to a bedside or laboratory phenotype.
3. Discriminate look-alike mechanisms or diagnoses.
4. Teach a short vignette answer aloud before the formative quiz.

## Study path

Foundations → Core chapter → Clinical bridge → Synthesis → any diagrams/videos/vignettes in this lesson → quiz (≥80%).
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch2`,
      conceptId,
      blockType: "reading",
      title: "II. Core mechanisms (chapter)",
      sequence: 2,
      bodyMd: `## ${lesson.title} — core mechanisms

### High-yield reference detail

${enrichment || `Rebuild **${lesson.title}** from first principles: definition → regulation → failure mode → clinical bridge.`}

### Integrated teaching notes from this lesson

${prior || `Use the module objectives and quiz stems to reconstruct the pathway for **${lesson.title}**.`}

### Control-point checklist

${(points.length ? points : [lesson.title]).map((p, i) => `### ${i + 1}. ${p}

**${p}.** Place this node in the pathway for **${lesson.title}**, state what increases/decreases its activity, and name the phenotype when it fails. Tie the finding back to **${module.title}** so the mechanism predicts disease rather than remaining abstract.
`).join("\n")}
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch3`,
      conceptId,
      blockType: "reading",
      title: "III. Clinical correlation",
      sequence: 3,
      bodyMd: `## Clinical correlation — ${lesson.title}

Translate each control point into something observable in a patient cared for under **${module.title}**: a symptom, exam finding, lab pattern, imaging clue, or drug effect.

### Clinical threads

1. **Loss of function** — What syndrome appears when the pathway cannot meet demand?  
2. **Gain of function** — What appears when a brake is lost?  
3. **Toxic/pharmacologic hit** — Which agents act here?  
4. **Look-alike** — What is the most important mimic, and what discriminates it?

### Bridge table

| # | Anchor | Clinical prediction |
| --- | --- | --- |
${(points.length ? points : [lesson.title]).map((p, i) => `| ${i + 1} | ${p} | Expected finding / next action |`).join("\n")}
`,
    },
    {
      id: `blk-enh-${lesson.id}-ch4`,
      conceptId,
      blockType: "reading",
      title: "IV. Synthesis, pitfalls & self-check",
      sequence: 4,
      bodyMd: `## Synthesis — ${lesson.title}

### One-paragraph summary

**${lesson.title}** (module: ${module.title}) is mastered when you can teach a continuous story through: ${(points.length ? points : [lesson.title]).join("; ")}.

### Pitfalls

1. Summary-only reading without regulation/phenotype  
2. Isolated facts without pathway links  
3. Missing the look-alike  
4. Skipping teach-back before the quiz  

### Self-check

${(points.length ? points : [lesson.title]).map((p, i) => `- [ ] ${i + 1}. I can teach: *${p}*`).join("\n")}
- [ ] I can state one clinical consequence and one misconception.

Pass the formative quiz at ≥80%, then space the flashcards.
`,
    },
    ...extras,
  ];

  return {
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
  };
}

export function enhanceProgramSeedLessons<
  T extends { phases: { modules: Module[] }[] },
>(program: T): T {
  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      mod.lessons = mod.lessons.map((lesson) =>
        enhanceThinSeedLesson(lesson, mod),
      );
    }
  }
  return program;
}
