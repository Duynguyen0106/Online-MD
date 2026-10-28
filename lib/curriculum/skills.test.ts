import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CLINICAL_SKILLS,
  SKILL_STATUS_LABELS,
  getClinicalSkill,
} from "@/lib/curriculum/skills";
import { setSkillStatusSchema } from "@/lib/validations/schemas";

describe("clinical skills tracker catalog", () => {
  it("includes core procedures requested for clerkship tracking", () => {
    const titles = CLINICAL_SKILLS.map((s) => s.title.toLowerCase()).join(" | ");
    assert.match(titles, /venipuncture/);
    assert.match(titles, /foley/);
    assert.match(titles, /sutur/);
    assert.match(titles, /pocus/);
    assert.match(titles, /chest x-ray|cxr/i);
    assert.ok(CLINICAL_SKILLS.length >= 8);
    const ids = new Set(CLINICAL_SKILLS.map((s) => s.id));
    assert.equal(ids.size, CLINICAL_SKILLS.length);
  });

  it("resolves skills and validates status updates", () => {
    assert.ok(getClinicalSkill("skill-venipuncture"));
    assert.equal(SKILL_STATUS_LABELS.not_started, "Not started");
    assert.equal(SKILL_STATUS_LABELS.simulated, "Practiced in simulation");
    assert.equal(SKILL_STATUS_LABELS.verified, "Verified / observed");

    const ok = setSkillStatusSchema.parse({
      skillId: "skill-suturing",
      status: "simulated",
    });
    assert.equal(ok.status, "simulated");
    assert.throws(() =>
      setSkillStatusSchema.parse({ skillId: "x", status: "done" }),
    );
  });
});
