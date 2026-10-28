import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  COHORT_AT_RISK_CONCEPTS,
  MOCK_COHORT_STUDENTS,
  cohortSummary,
} from "@/lib/demo/faculty-class-analytics";

describe("faculty class analytics mock data", () => {
  it("includes classic at-risk concepts for remediation", () => {
    const blob = COHORT_AT_RISK_CONCEPTS.map((c) => c.concept).join(" | ");
    assert.match(blob, /Frank|Starling/i);
    assert.match(blob, /acid/i);
    assert.ok(COHORT_AT_RISK_CONCEPTS.some((c) => c.severity === "high"));
    assert.ok(COHORT_AT_RISK_CONCEPTS.every((c) => c.avgScorePct < 70));
  });

  it("lists mock students with completion and struggling modules", () => {
    assert.ok(MOCK_COHORT_STUDENTS.length >= 6);
    for (const s of MOCK_COHORT_STUDENTS) {
      assert.ok(s.name.length > 2);
      assert.ok(s.completionPct >= 0 && s.completionPct <= 100);
      assert.ok(
        s.riskLabel === "On track" ||
          s.riskLabel === "Needs review" ||
          s.riskLabel === "At risk",
      );
    }
    const summary = cohortSummary();
    assert.equal(summary.cohortSize, MOCK_COHORT_STUDENTS.length);
    assert.ok(summary.atRisk >= 1);
    assert.ok(summary.highSeverityConcepts >= 1);
  });
});
