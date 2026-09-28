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
      bodyMd: `## ${lesson.title} — how it works

### Key points

${enrichment || `Rebuild **${lesson.title}** from first principles: definition → regulation → failure mode → clinical bridge.`}

### Teaching notes from this lesson

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
      title: "3. Why it matters clinically",
      sequence: 3,
      bodyMd: `## Why it matters clinically — ${lesson.title}

Translate each control point into something you can observe in a patient: a symptom, exam finding, lab pattern, imaging clue, or drug effect.

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
