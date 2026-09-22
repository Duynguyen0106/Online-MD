import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { program } from "@/lib/curriculum/seed";
import {
  enhanceProgramSeedLessons,
  enhanceThinSeedLesson,
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

describe("seed-chapter-enhance", () => {
  it("expands thin seed lessons to textbook-length readings", () => {
    const mod = program.phases[0].modules[0];
    const lesson = mod.lessons.find((l) => l.id === "les-cell-1");
    assert.ok(lesson);
    assert.ok(readingChars(lesson) < 4000);

    const enhanced = enhanceThinSeedLesson(structuredClone(lesson), mod);
    assert.ok(readingChars(enhanced) >= 4000);
    assert.ok(enhanced.estimatedMinutes >= 90);
    assert.ok(
      enhanced.concepts[0].blocks.some((b) =>
        b.title?.includes("Core mechanisms"),
      ),
    );
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
});
