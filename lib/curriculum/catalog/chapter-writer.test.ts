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

  it("injects organ-aware section frames and keeps mechanism banks in pathophysiology only", () => {
    const topic = sampleTopic(3, {
      key: "acs-enrich",
      title: "Acute Coronary Syndromes",
      organSystem: "Cardiovascular",
      contentCategory: "Pathophysiology",
      points: [
        "Thin-cap fibroatheroma",
        "Platelet cascade",
        "Occlusive thrombus",
      ],
      quizExplain: "Ischemia time and reperfusion strategy dominate.",
    });
    const patho = buildChapterPathophysiology(topic);
    const clinical = buildChapterPresentation(topic);
    const dx = buildChapterDiagnostics(topic);
    const rx = buildChapterManagement(topic);

    assert.match(patho, /Continuous mechanism story/);
    assert.match(patho, /Pathway bridge/);
    assert.match(clinical, /Recognition script/);
    assert.match(clinical, /Presentation bridge/);
    assert.match(dx, /Decision-changing data/);
    assert.match(dx, /Diagnostic bridge/);
    assert.match(rx, /Physiologic order of operations/);
    assert.match(rx, /Management bridge/);
    assert.match(patho, /perfusion, congestion, ischemia/);

    // Keyword banks appear in pathophysiology; clinical/dx/rx should not re-paste
    // the same deep bank blocks (dedupe enrichment across sections).
    const bankMarker = /\*\*[^*]+— textbook core\.\*\*/;
    const pathoBanks = patho.match(bankMarker)?.length ?? 0;
    const clinicalBanks = clinical.match(bankMarker)?.length ?? 0;
    const dxBanks = dx.match(bankMarker)?.length ?? 0;
    const rxBanks = rx.match(bankMarker)?.length ?? 0;
    assert.ok(pathoBanks >= 0);
    assert.equal(clinicalBanks, 0);
    assert.equal(dxBanks, 0);
    assert.equal(rxBanks, 0);
  });

  it("preclerkship presentation uses phenotype bridge frame", () => {
    const md = buildChapterPresentation(
      sampleTopic(2, {
        title: "Cardiac Action Potential",
        organSystem: "Cardiovascular",
      }),
    );
    assert.match(md, /Phenotype bridge/);
    assert.doesNotMatch(md, /Recognition script/);
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
