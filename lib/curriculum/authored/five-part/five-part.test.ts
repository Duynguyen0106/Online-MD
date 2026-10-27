import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { program } from "@/lib/curriculum/seed";
import { applyCurriculumExpansions } from "@/lib/curriculum/expansions";
import { enhanceProgramSeedLessons } from "@/lib/curriculum/seed-chapter-enhance";
import { AUTHORED_FIVE_PART } from "@/lib/curriculum/authored/five-part";
import { buildCatalogBundle } from "@/lib/curriculum/catalog/factory";
import { FOUR_YEAR_TOPICS } from "@/lib/curriculum/catalog/topics-generated";

describe("authored five-part handcrafted chapters", () => {
  it("registers CV + pulm handcrafted lessons with five-part headings", () => {
    const ids = Object.keys(AUTHORED_FIVE_PART).sort();
    assert.equal(ids.length, 15);
    assert.ok(ids.every((id) => id.startsWith("les-cv-") || id.startsWith("les-pulm-")));
    for (const body of Object.values(AUTHORED_FIVE_PART)) {
      assert.match(body, /## 1\. Core Pathophysiology/);
      assert.match(body, /## 2\. Clinical Presentation/);
      assert.match(body, /## 3\. Diagnostic Approach/);
      assert.match(body, /## 4\. Management & Pharmacology/);
      assert.match(body, /## 5\. High-Yield Board Pearl/);
      assert.match(body, /REFERENCE_REVIEW_REQUIRED/);
    }
  });

  it("enhancement applies authored chapters and preserves media/vignettes", () => {
    const enhanced = enhanceProgramSeedLessons(
      applyCurriculumExpansions(structuredClone(program)),
    );
    const lessons = enhanced.phases.flatMap((p) =>
      p.modules.flatMap((m) => m.lessons),
    );
    for (const id of Object.keys(AUTHORED_FIVE_PART)) {
      const lesson = lessons.find((l) => l.id === id);
      assert.ok(lesson, id);
      const body = lesson.concepts
        .flatMap((c) => c.blocks)
        .map((b) => b.bodyMd ?? "")
        .join("\n");
      assert.match(body, /## 1\. Core Pathophysiology/, id);
      assert.match(body, /## 5\. High-Yield Board Pearl/, id);
    }
    const cv1 = lessons.find((l) => l.id === "les-cv-1");
    assert.ok(
      cv1?.concepts.some((c) =>
        c.blocks.some((b) => b.blockType === "video" || b.blockType === "diagram"),
      ),
      "les-cv-1 should keep non-reading media blocks",
    );
    const cv2 = lessons.find((l) => l.id === "les-cv-2");
    assert.ok(
      cv2?.concepts.some((c) =>
        c.blocks.some((b) => b.blockType === "clinical_vignette"),
      ),
      "les-cv-2 should keep its clinical vignette",
    );
  });
});

describe("catalog factory five-part blocks", () => {
  it("emits overview + five teaching sections + case for a sample topic", () => {
    const sample = FOUR_YEAR_TOPICS.slice(0, 3);
    const bundle = buildCatalogBundle(sample);
    for (const lessons of Object.values(bundle.lessonsByModule)) {
      for (const lesson of lessons) {
        const titles = lesson.concepts[0].blocks.map((b) => b.title);
        assert.ok(titles.includes("0. Chapter overview"), lesson.id);
        assert.ok(titles.includes("1. Core Pathophysiology"), lesson.id);
        assert.ok(titles.includes("2. Clinical Presentation"), lesson.id);
        assert.ok(titles.includes("3. Diagnostic Approach"), lesson.id);
        assert.ok(titles.includes("4. Management & Pharmacology"), lesson.id);
        assert.ok(titles.includes("5. High-Yield Board Pearl"), lesson.id);
        assert.ok(titles.includes("Clinical case"), lesson.id);
      }
    }
  });
});
