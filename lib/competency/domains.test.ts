import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeCompetencyDomain } from "@/lib/competency/domains";

describe("normalizeCompetencyDomain", () => {
  it("maps diagnosis and management tasks", () => {
    assert.equal(normalizeCompetencyDomain("Diagnosis"), "diagnosis");
    assert.equal(normalizeCompetencyDomain("Management"), "management");
    assert.equal(normalizeCompetencyDomain("Patient Care"), "patient_care");
  });

  it("maps scientific concepts wording", () => {
    assert.equal(
      normalizeCompetencyDomain("Medical Knowledge / Scientific Concepts"),
      "scientific_concepts",
    );
  });

  it("uses pathophysiology category to prefer mechanisms", () => {
    assert.equal(
      normalizeCompetencyDomain("Knowledge", "Pathophysiology"),
      "mechanisms",
    );
  });

  it("falls back to knowledge", () => {
    assert.equal(normalizeCompetencyDomain("Something else"), "knowledge");
  });

  it("maps Interpret-led statements to interpretation", () => {
    assert.equal(
      normalizeCompetencyDomain(
        "Knowledge",
        "Physiology",
        "Interpret V/Q relationships and West zones of pulmonary blood flow.",
      ),
      "interpretation",
    );
  });
});
