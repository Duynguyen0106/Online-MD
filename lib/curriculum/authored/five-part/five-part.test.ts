import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { program } from "@/lib/curriculum/seed";
import { applyCurriculumExpansions } from "@/lib/curriculum/expansions";
import { enhanceProgramSeedLessons } from "@/lib/curriculum/seed-chapter-enhance";
import { AUTHORED_FIVE_PART } from "@/lib/curriculum/authored/five-part";
import { P0_DEEP_FIVE_PART } from "@/lib/curriculum/authored/five-part/p0-deep";
import { WAVE2_DEEP_FIVE_PART } from "@/lib/curriculum/authored/five-part/wave2-deep";
import { WAVE3_DEEP_FIVE_PART } from "@/lib/curriculum/authored/five-part/wave3-deep";
import { buildCatalogBundle } from "@/lib/curriculum/catalog/factory";
import { FOUR_YEAR_TOPICS } from "@/lib/curriculum/catalog/topics-generated";

describe("authored five-part handcrafted chapters", () => {
  it("registers all 113 handcrafted lessons with five-part headings", () => {
    const ids = Object.keys(AUTHORED_FIVE_PART);
    assert.equal(ids.length, 113);
    for (const body of Object.values(AUTHORED_FIVE_PART)) {
      assert.match(body, /## 1\. Core Pathophysiology/);
      assert.match(body, /## 2\. Clinical Presentation/);
      assert.match(body, /## 3\. Diagnostic Approach/);
      assert.match(body, /## 4\. Management & Pharmacology/);
      assert.match(body, /## 5\. High-Yield Board Pearl/);
      assert.match(body, /REFERENCE_REVIEW_REQUIRED/);
    }
  });

  it("covers every non-catalog lesson id in the expanded program", () => {
    const expanded = applyCurriculumExpansions(structuredClone(program));
    const handcrafted: string[] = [];
    for (const phase of expanded.phases) {
      for (const mod of phase.modules) {
        for (const lesson of mod.lessons) {
          if (!lesson.id.startsWith("les-cat-")) handcrafted.push(lesson.id);
        }
      }
    }
    assert.equal(handcrafted.length, 113);
    for (const id of handcrafted) {
      assert.ok(AUTHORED_FIVE_PART[id], `missing authored chapter for ${id}`);
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

describe("deepen-pass overlays", () => {
  const overlays = {
    ...P0_DEEP_FIVE_PART,
    ...WAVE2_DEEP_FIVE_PART,
    ...WAVE3_DEEP_FIVE_PART,
  };

  it("covers remaining thin handcrafted lessons with ≥2000-char five-part prose", () => {
    assert.ok(Object.keys(overlays).length >= 90);
    for (const id of Object.keys(overlays)) {
      const body = AUTHORED_FIVE_PART[id];
      assert.ok(body, id);
      assert.ok(body.length >= 2000, `${id} still thin (${body.length})`);
      assert.match(body, /## 1\. Core Pathophysiology/);
      assert.match(body, /## 5\. High-Yield Board Pearl/);
      // Overlay content is present (floor footer may append after it).
      assert.match(body, new RegExp(overlays[id].slice(0, 40).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });

  it("every handcrafted authored chapter clears the 2000-char academic floor", () => {
    for (const [id, body] of Object.entries(AUTHORED_FIVE_PART)) {
      assert.ok(body.length >= 2000, `${id} still thin (${body.length})`);
    }
  });

  it("enhanced deepened lessons serve without teach-back padding", () => {
    const enhanced = enhanceProgramSeedLessons(
      applyCurriculumExpansions(structuredClone(program)),
    );
    const lessons = enhanced.phases.flatMap((p) =>
      p.modules.flatMap((m) => m.lessons),
    );
    let padded = 0;
    for (const id of Object.keys(AUTHORED_FIVE_PART)) {
      const lesson = lessons.find((l) => l.id === id);
      assert.ok(lesson, id);
      const body = lesson.concepts
        .flatMap((c) => c.blocks)
        .map((b) => b.bodyMd ?? "")
        .join("\n");
      if (/Extra rehearsal pass|## Teach-back —/i.test(body)) padded++;
      assert.match(body, /## 1\. Core Pathophysiology/, id);
    }
    assert.equal(padded, 0, `${padded} lessons still padded`);
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
