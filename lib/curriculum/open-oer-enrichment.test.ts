import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getAllLessons,
  getObjectives,
  getQuestionMap,
} from "@/lib/curriculum/accessors";
import {
  OPEN_MEDICAL_TEXTBOOKS,
  furtherReadingMd,
} from "@/lib/curriculum/open-textbooks";

describe("open textbook catalog", () => {
  it("lists pathology, anatomy, physiology, and pharmacology OERs", () => {
    const subjects = new Set(OPEN_MEDICAL_TEXTBOOKS.map((b) => b.subject));
    for (const s of ["pathology", "anatomy", "physiology", "pharmacology"] as const) {
      assert.ok(subjects.has(s), `missing subject ${s}`);
    }
  });

  it("marks commercial-unfriendly licenses as link-only", () => {
    const openstax = OPEN_MEDICAL_TEXTBOOKS.find((b) => b.id === "openstax-ap2e");
    assert.ok(openstax);
    assert.equal(openstax.remixOk, false);
    assert.match(openstax.license, /NC/);
  });

  it("allows Patholines remix with CC BY", () => {
    const p = OPEN_MEDICAL_TEXTBOOKS.find((b) => b.id === "patholines");
    assert.ok(p);
    assert.equal(p.remixOk, true);
    assert.equal(p.license, "CC-BY-4.0");
  });

  it("builds further-reading markdown for CV module", () => {
    const md = furtherReadingMd("mod-cv");
    assert.match(md, /Further reading/);
    assert.match(md, /openstax\.org|pathologia|pressbooks/i);
  });
});

describe("open-OER pathology deepen lessons", () => {
  it("publishes the five audit-priority deepen lessons", async () => {
    const lessons = await getAllLessons();
    const ids = new Set(lessons.map((l) => l.id));
    for (const id of [
      "les-cv-mi-timeline",
      "les-cell-amyloid",
      "les-cell-carcinogenesis",
      "les-cell-paraneoplastic",
      "les-msk-skin-tumors",
    ]) {
      assert.ok(ids.has(id), `missing lesson ${id}`);
    }
  });

  it("keeps MI timeline original (no Harsh Mohan / Robbins paste markers)", async () => {
    const lessons = await getAllLessons();
    const mi = lessons.find((l) => l.id === "les-cv-mi-timeline");
    assert.ok(mi);
    const body = mi.concepts
      .flatMap((c) => c.blocks.map((b) => b.bodyMd ?? ""))
      .join("\n");
    assert.doesNotMatch(body, /Harsh Mohan|Robbins Basic Pathology|Pathoma/i);
    assert.match(body, /Further reading|Pathologia|OpenStax|BCIT/i);
    assert.match(body, /coagulative necrosis/i);
  });

  it("registers objectives and quiz items for deepen lessons", () => {
    const objs = new Set(getObjectives().map((o) => o.id));
    const qmap = getQuestionMap();
    assert.ok(objs.has("obj-cv-mi-timeline"));
    assert.ok(objs.has("obj-cell-amyloid"));
    assert.ok(qmap["qq-cv-mi-timeline"]);
    assert.ok(qmap["qq-cell-carcinogenesis"]);
  });
});
