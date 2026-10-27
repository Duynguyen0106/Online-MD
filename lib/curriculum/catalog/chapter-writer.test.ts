import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildChapterBoardPearl,
  buildChapterDiagnostics,
  buildChapterFraming,
  buildChapterManagement,
  buildChapterPathophysiology,
  buildChapterPresentation,
  buildChapterSynthesis,
  buildChapterClinical,
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

describe("chapter-writer five-part pedagogy", () => {
  it("framing announces the five-part structure", () => {
    const md = buildChapterFraming(sampleTopic(2));
    assert.match(md, /Core Pathophysiology/);
    assert.match(md, /Clinical Presentation/);
    assert.match(md, /Diagnostic Approach/);
    assert.match(md, /Management & Pharmacology/);
    assert.match(md, /High-Yield Board Pearl/);
  });

  it("emits all five numbered section headings", () => {
    const topic = sampleTopic(3, {
      title: "Sepsis Recognition, Early Care, and Reassessment",
      contentCategory: "Internal Medicine",
    });
    const md = [
      buildChapterPathophysiology(topic),
      buildChapterPresentation(topic),
      buildChapterDiagnostics(topic),
      buildChapterManagement(topic),
      buildChapterBoardPearl(topic),
    ].join("\n");
    assert.match(md, /## 1\. Core Pathophysiology/);
    assert.match(md, /## 2\. Clinical Presentation/);
    assert.match(md, /## 3\. Diagnostic Approach/);
    assert.match(md, /## 4\. Management & Pharmacology/);
    assert.match(md, /## 5\. High-Yield Board Pearl/);
    assert.match(md, /REFERENCE_REVIEW_REQUIRED/);
  });

  it("preclerkship presentation block has no Clinical prediction table", () => {
    const md = buildChapterPresentation(sampleTopic(2));
    assert.doesNotMatch(md, /\|\s*Clinical prediction\s*\|/);
    assert.doesNotMatch(md, /Correlation table/);
    assert.doesNotMatch(md, /Expected phenotype, lab, or drug effect/);
    assert.match(md, /Teach-back/);
    assert.match(md, /Anchor one/);
  });

  it("clerkship presentation block has no Working Clinical prediction table", () => {
    const md = buildChapterPresentation(
      sampleTopic(3, {
        title: "Sepsis Recognition, Early Care, and Reassessment",
        contentCategory: "Internal Medicine",
      }),
    );
    assert.doesNotMatch(md, /\|\s*Clinical prediction\s*\|/);
    assert.doesNotMatch(md, /Working table/);
    assert.doesNotMatch(md, /Decision-changing finding or next timed action/);
    assert.match(md, /Teach-back/);
  });

  it("board pearl Sources is prose, not a guideline status grid", () => {
    const md = buildChapterBoardPearl(
      sampleTopic(2, { title: "Pulmonary Hypertension Groups" }),
    );
    assert.doesNotMatch(md, /\|\s*Guideline \/ reference\s*\|\s*Status\s*\|/);
    assert.match(md, /citations for this lesson are being verified/i);
    assert.match(md, /REFERENCE_REVIEW_REQUIRED/);
    assert.match(md, /Board pearl/);
  });

  it("deprecated aliases still resolve without blank prediction columns", () => {
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
      const md = `${buildChapterClinical(topic)}\n${buildChapterSynthesis(topic)}\n${buildChapterDiagnostics(topic)}`;
      assert.doesNotMatch(md, /\|\s*Clinical prediction\s*\|/, topic.title);
      assert.doesNotMatch(
        md,
        /\|\s*[^|\n]+\s*\|\s*(Expected phenotype|Decision-changing finding)/,
        topic.title,
      );
    }
  });
});
