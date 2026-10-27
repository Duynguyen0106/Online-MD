import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { acuteMesentericIschemiaCase } from "@/lib/curriculum/cases/acute-mesenteric-ischemia";
import { authoredClinicalCases } from "@/lib/curriculum/cases";
import { getClinicalCase, getClinicalCases } from "@/lib/curriculum/accessors";

describe("acute mesenteric ischemia progressive case", () => {
  it("has four progressive steps with MCQ distractors then wrap-up", () => {
    const c = acuteMesentericIschemiaCase;
    assert.equal(c.format, "progressive");
    assert.equal(c.stages.length, 4);
    assert.equal(c.stages[0]?.kind, "decision");
    assert.equal(c.stages[3]?.kind, "wrapup");

    for (const stage of c.stages.slice(0, 3)) {
      assert.ok(stage.revealMd && stage.revealMd.length > 80, stage.id);
      assert.ok(stage.choices && stage.choices.length >= 4, stage.id);
      assert.ok(stage.correctChoiceId, stage.id);
      assert.ok(
        stage.choices.some((ch) => ch.id === stage.correctChoiceId),
        stage.id,
      );
      for (const ch of stage.choices) {
        assert.ok(ch.explanation && ch.explanation.length > 20, ch.id);
      }
    }

    assert.match(c.stages[0]!.revealMd!, /Chief complaint/i);
    assert.match(c.stages[1]!.revealMd!, /HPI/i);
    assert.match(c.stages[2]!.revealMd!, /CTA|CT angiography/i);
    assert.match(c.stages[3]!.revealMd!, /pathophysiolog|board pearl/i);
    assert.match(c.teachingPoints, /REFERENCE_REVIEW_REQUIRED/);
  });

  it("registers in the runtime clinical case catalog", () => {
    assert.ok(authoredClinicalCases.some((c) => c.id === "case-ami-1"));
    assert.ok(getClinicalCases().some((c) => c.id === "case-ami-1"));
    const live = getClinicalCase("case-ami-1");
    assert.ok(live);
    assert.equal(live?.format, "progressive");
    assert.equal(live?.stages.length, 4);
  });

  it("uses clinically plausible distractors on step 1–3", () => {
    const texts = acuteMesentericIschemiaCase.stages
      .flatMap((s) => s.choices ?? [])
      .map((c) => c.text.toLowerCase())
      .join(" | ");
    assert.match(texts, /perforat|peritonitis/);
    assert.match(texts, /diverticulitis|gastroenteritis|biliary/);
    assert.match(texts, /plain|axr|serial|d-dimer|colonoscopy/);
    assert.match(texts, /outpatient|elective|fluids overnight|ppi/);
  });
});
