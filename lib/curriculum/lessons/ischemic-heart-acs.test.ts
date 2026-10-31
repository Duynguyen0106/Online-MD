import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAllLessons, getObjectives } from "@/lib/curriculum/accessors";
import { enhanceThinSeedLesson } from "@/lib/curriculum/seed-chapter-enhance";
import { program } from "@/lib/curriculum/seed";
import { ischemicHeartAcsLesson } from "@/lib/curriculum/lessons/ischemic-heart-acs";

describe("Ischemic Heart Disease & ACS reference lesson", () => {
  it("ships the five-part spine with progressive How it works / clinical Why sections", () => {
    const titles = ischemicHeartAcsLesson.concepts[0].blocks.map((b) => b.title);
    assert.deepEqual(
      titles.slice(0, 5),
      [
        "1. The basics",
        "2. How it works",
        "3. Why it matters clinically",
        "4. Put it together",
        "Vignette: inferior STEMI",
      ],
    );

    const how = ischemicHeartAcsLesson.concepts[0].blocks.find((b) =>
      b.title?.includes("How it works"),
    );
    const why = ischemicHeartAcsLesson.concepts[0].blocks.find((b) =>
      b.title?.includes("Why it matters clinically"),
    );
    assert.ok(how?.bodyMd);
    assert.ok(why?.bodyMd);

    assert.match(how.bodyMd, /Core mechanism \(start here\)/i);
    assert.match(how.bodyMd, /Nuance — open after|open after the table|Nuances \(open after/i);
    assert.doesNotMatch(how.bodyMd, /textbook chapter method/i);

    assert.match(why.bodyMd, /Common pitfalls/i);
    assert.match(why.bodyMd, /Look-alikes/i);
    assert.match(why.bodyMd, /aortic dissection/i);
    assert.doesNotMatch(why.bodyMd, /Gain of function/i);
  });

  it("stays bound to ACS learning objectives", () => {
    const body = ischemicHeartAcsLesson.concepts
      .flatMap((c) => c.blocks.map((b) => b.bodyMd ?? ""))
      .join("\n");
    assert.match(body, /Localize/i);
    assert.match(body, /STEMI/);
    assert.match(body, /NSTEMI|NSTE-ACS/);
    assert.match(body, /unstable angina/i);
    assert.match(body, /LAD/);
    assert.match(body, /REFERENCE_REVIEW_REQUIRED/);
  });

  it("is not overwritten by the generic chapter enhancer", () => {
    const mod = program.phases
      .flatMap((p) => p.modules)
      .find((m) => m.id === "mod-cv");
    assert.ok(mod);
    const out = enhanceThinSeedLesson(
      structuredClone(ischemicHeartAcsLesson),
      mod,
    );
    const how = out.concepts[0].blocks.find((b) =>
      b.title?.includes("How it works"),
    );
    assert.match(how?.bodyMd ?? "", /Thin-cap fibroatheroma/i);
    assert.doesNotMatch(how?.bodyMd ?? "", /Control-point checklist/i);
  });

  it("is the live lesson returned by accessors", async () => {
    const live = (await getAllLessons()).find((l) => l.id === "les-cv-2");
    assert.ok(live);
    assert.equal(live.title, "Ischemic Heart Disease & ACS");
    const how = live.concepts
      .flatMap((c) => c.blocks)
      .find((b) => b.title?.includes("How it works"));
    assert.match(how?.bodyMd ?? "", /Core mechanism \(start here\)/i);

    const objs = getObjectives().filter((o) =>
      (o.lessonIds ?? []).includes("les-cv-2"),
    );
    assert.ok(objs.some((o) => /coronary territories|ACS|STEMI|NSTEMI/i.test(o.statement)));
  });
});
