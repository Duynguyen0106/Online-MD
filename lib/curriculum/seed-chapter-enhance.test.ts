import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { program } from "@/lib/curriculum/seed";
import {
  enhanceProgramSeedLessons,
  enhanceThinSeedLesson,
  lessonAlreadyTeachesMechanism,
} from "@/lib/curriculum/seed-chapter-enhance";

function readingChars(lesson: {
  concepts: { blocks: { blockType: string; bodyMd?: string }[] }[];
}): number {
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

function findLesson(id: string) {
  for (const phase of program.phases) {
    for (const mod of phase.modules) {
      const lesson = mod.lessons.find((l) => l.id === id);
      if (lesson) return { lesson, mod };
    }
  }
  return null;
}

describe("seed-chapter-enhance", () => {
  it("expands thin stub lessons with the full textbook scaffold", () => {
    const hit = findLesson("les-endo-1");
    assert.ok(hit);
    assert.ok(readingChars(hit.lesson) < 4000);
    assert.equal(lessonAlreadyTeachesMechanism(hit.lesson), false);

    const enhanced = enhanceThinSeedLesson(structuredClone(hit.lesson), hit.mod);
    assert.ok(readingChars(enhanced) >= 4000);
    assert.ok(enhanced.estimatedMinutes >= 90);
    assert.ok(
      enhanced.concepts[0].blocks.some((b) =>
        b.title?.includes("How it works"),
      ),
    );
    const body = enhanced.concepts
      .flatMap((c) => c.blocks)
      .map((b) => b.bodyMd || "")
      .join("\n");
    assert.match(body, /Sources|citations for this lesson are being verified/i);
    assert.match(body, /Control-point checklist/);
  });

  it("leaves catalog lessons untouched", () => {
    const fakeMod = program.phases[0].modules[0];
    const catalogish = {
      ...fakeMod.lessons[0],
      id: "les-cat-example",
      concepts: [
        {
          id: "c1",
          lessonId: "les-cat-example",
          title: "Short",
          sequence: 1,
          summary: "x",
          blocks: [
            {
              id: "b1",
              conceptId: "c1",
              blockType: "reading" as const,
              title: "Tiny",
              sequence: 1,
              bodyMd: "short",
            },
          ],
        },
      ],
    };
    const out = enhanceThinSeedLesson(catalogish, fakeMod);
    assert.equal(out.concepts[0].blocks[0].bodyMd, "short");
  });

  it("enhances all non-catalog seed lessons in the program", () => {
    const enhanced = enhanceProgramSeedLessons(structuredClone(program));
    let n = 0;
    for (const phase of enhanced.phases) {
      for (const mod of phase.modules) {
        for (const lesson of mod.lessons) {
          if (lesson.id.startsWith("les-cat-")) continue;
          n++;
          assert.ok(
            readingChars(lesson) >= 4000,
            `${lesson.id} still thin (${readingChars(lesson)})`,
          );
        }
      }
    }
    assert.ok(n >= 20);
  });

  it("light-enhances CV electrophysiology without scaffold noise or ETC/stroke banks", () => {
    const hit = findLesson("les-cv-1");
    assert.ok(hit);
    assert.equal(lessonAlreadyTeachesMechanism(hit.lesson), true);
    const enhanced = enhanceThinSeedLesson(structuredClone(hit.lesson), hit.mod);
    assert.ok(readingChars(enhanced) >= 4000);
    const body = enhanced.concepts
      .flatMap((c) => c.blocks)
      .map((b) => b.bodyMd || "")
      .join("\n");
    assert.doesNotMatch(body, /Control-point checklist/);
    assert.doesNotMatch(body, /\*\*ETC \/ OXPHOS\.\*\*/);
    assert.doesNotMatch(body, /Acute stroke syndromes/);
    assert.match(body, /phase|action potential|Na|repolar/i);
    assert.match(body, /Teach-back|Sources|citations for this lesson are being verified/i);
    // Original concept structure preserved (not replaced by con-enh-*).
    assert.ok(enhanced.concepts.some((c) => c.id === "con-cv-1a"));
  });

  it("attaches a GFR Starling figure on les-renal-1", () => {
    const hit = findLesson("les-renal-1");
    assert.ok(hit);
    const hasFig = hit.lesson.concepts.some((c) =>
      c.blocks.some(
        (b) =>
          b.blockType === "diagram" &&
          (b.bodyMd?.includes("gfr-starling") ||
            b.title?.toLowerCase().includes("starling")),
      ),
    );
    assert.ok(hasFig);
  });
});
