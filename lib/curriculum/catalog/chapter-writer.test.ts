import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildChapterClinical,
  buildChapterSynthesis,
} from "@/lib/curriculum/catalog/chapter-writer";
import type { CatalogTopic } from "@/lib/curriculum/catalog/types";

function sampleTopic(
  year: 1 | 2 | 3 | 4,
  overrides: Partial<CatalogTopic> = {},
): CatalogTopic {
  return {
    key: "sample",
    moduleId: "mod-cv",
    year,
    title: "Sample Pathway",
    organSystem: "Cardiovascular",
    contentCategory: "Pathophysiology",
    estimatedMinutes: 90,
    points: ["Anchor one", "Anchor two", "Anchor three"],
    vignette: "A short case stem for mechanism teaching.",
    quizStem: "Most accurate statement?",
    quizChoices: ["Correct mechanism", "Wrong A", "Wrong B", "Wrong C"],
    quizCorrect: 0,
    quizExplain: "Teach the mechanism before the order set.",
    cardFront: "Sample",
    cardBack: "Mechanism first",
    ...overrides,
  };
}

describe("chapter-writer table hygiene", () => {
  it("preclerkship clinical block has no Clinical prediction table", () => {
    const md = buildChapterClinical(sampleTopic(2));
    assert.doesNotMatch(md, /\|\s*Clinical prediction\s*\|/);
    assert.doesNotMatch(md, /Correlation table/);
    assert.doesNotMatch(md, /Expected phenotype, lab, or drug effect/);
    assert.match(md, /Mechanism anchors — teach-back/);
    assert.match(md, /Anchor one/);
  });

  it("clerkship clinical block has no Working Clinical prediction table", () => {
    const md = buildChapterClinical(
      sampleTopic(3, {
        title: "Sepsis Recognition, Early Care, and Reassessment",
        contentCategory: "Internal Medicine",
      }),
    );
    assert.doesNotMatch(md, /\|\s*Clinical prediction\s*\|/);
    assert.doesNotMatch(md, /Working table/);
    assert.doesNotMatch(md, /Decision-changing finding or next timed action/);
    assert.match(md, /Chapter rules — teach-back/);
  });

  it("synthesis Sources is prose, not a guideline status grid", () => {
    const md = buildChapterSynthesis(
      sampleTopic(2, { title: "Pulmonary Hypertension Groups" }),
    );
    assert.doesNotMatch(md, /\|\s*Guideline \/ reference\s*\|\s*Status\s*\|/);
    assert.match(md, /citations for this lesson are being verified/i);
    assert.match(md, /REFERENCE_REVIEW_REQUIRED/);
  });

  it("ACS / PH / sepsis-shaped topics never emit blank prediction columns", () => {
    const topics = [
      sampleTopic(2, {
        title: "ACS Pathophysiology",
        points: [
          "Thin-cap fibroatheroma",
          "Platelet cascade",
          "Occlusive thrombus",
        ],
      }),
      sampleTopic(2, {
        title: "Pulmonary Hypertension Groups",
        points: [
          "Pre vs post capillary hemodynamics",
          "Current mPAP definition — verify before teaching numbers",
        ],
      }),
      sampleTopic(3, {
        title: "Sepsis Recognition, Early Care, and Reassessment",
        points: [
          "Recognize severity",
          "Cultures when appropriate",
          "Reassess after first actions",
        ],
        contentCategory: "Internal Medicine",
      }),
    ];
    for (const topic of topics) {
      const md = `${buildChapterClinical(topic)}\n${buildChapterSynthesis(topic)}`;
      assert.doesNotMatch(md, /\|\s*Clinical prediction\s*\|/, topic.title);
      assert.doesNotMatch(
        md,
        /\|\s*[^|\n]+\s*\|\s*(Expected phenotype|Decision-changing finding)/,
        topic.title,
      );
    }
  });
});
