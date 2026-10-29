import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  factualEnrichment,
  factualEnrichmentForSeedLesson,
  factualEnrichmentForTopic,
} from "@/lib/curriculum/catalog/factual-enrichment";

describe("factual-enrichment false-positive guards", () => {
  it("does not treat hemodynamic threshold as a psychiatric hold (E1)", () => {
    const prose = factualEnrichment(
      "Pulmonary hypertension groups and the hemodynamic threshold for pre-capillary disease",
    );
    assert.doesNotMatch(prose, /Decision-making capacity & involuntary care/);
    assert.doesNotMatch(prose, /Involuntary psychiatric holds/);
  });

  it("still matches real psychiatric hold / capacity teaching (E1 positive)", () => {
    const prose = factualEnrichment(
      "Psychiatric hold criteria and decision-making capacity assessment",
    );
    assert.match(prose, /Decision-making capacity & involuntary care/);
  });

  it("does not treat universal as NIV / obstructive lung care (E1)", () => {
    const prose = factualEnrichment(
      "Sepsis care is individualized — not an inflexible universal checklist",
    );
    assert.doesNotMatch(prose, /Obstructive lung care/);
    assert.doesNotMatch(prose, /\bNIV for hypercapnic/);
  });

  it("still matches real NIV / COPD teaching (E1 positive)", () => {
    const prose = factualEnrichment(
      "COPD exacerbation with hypercapnic failure considered for NIV",
    );
    assert.match(prose, /Obstructive lung care/);
  });

  it("does not pull anemia framework from bacteriology hemolysis points (E3)", () => {
    const prose = factualEnrichmentForSeedLesson({
      title: "Clinical Bacteriology",
      points: [
        "Morphology + catalase/coagulase/hemolysis decision trees.",
        "Coagulase / hemolysis / specialty tests that finish speciation",
      ],
    });
    assert.doesNotMatch(prose, /Anemia framework/);
    assert.doesNotMatch(prose, /MCV sorts/);
  });

  it("still pulls anemia framework when the seed title is hematologic (E3 positive)", () => {
    const prose = factualEnrichmentForSeedLesson({
      title: "Anemia Workup",
      points: ["MCV fork", "hemolysis workup labs", "iron deficiency source hunt"],
    });
    assert.match(prose, /Anemia framework/);
  });

  it("PH catalog topic does not ingest capacity/ethics via threshold wording", () => {
    const prose = factualEnrichmentForTopic({
      title: "Pulmonary Hypertension Groups",
      points: [
        "Pre- vs post-capillary physiology",
        "Clinical group framework without quoting unverified numeric thresholds",
      ],
      quizExplain:
        "Chronic lung disease can cause Group 3 pulmonary hypertension. Hemodynamic numeric definitions have changed — verify current thresholds.",
      cardBack: "PH groups · pre/post capillary",
      contentCategory: "Pathophysiology",
      organSystem: "Cardiovascular",
    });
    assert.doesNotMatch(prose, /Decision-making capacity & involuntary care/);
    assert.doesNotMatch(prose, /\*\*Ethics\.\*\*/);
  });
});
