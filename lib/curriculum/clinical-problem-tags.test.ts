import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getAllLessons,
  getClinicalCase,
  getClinicalCases,
  getLesson,
} from "@/lib/curriculum/accessors";
import {
  CLINICAL_PROBLEMS,
  featuredPresentationProblems,
  filterExistingProblemLinks,
  pathwayLinkCounts,
  problemLessonIds,
  shouldFeaturePresentationPathways,
} from "@/lib/curriculum/clinical-problem-tags";

describe("clinical presentation pathways", () => {
  it("keeps foundation → reasoning → case ordering metadata for every pathway", () => {
    assert.ok(CLINICAL_PROBLEMS.length >= 10);
    for (const p of CLINICAL_PROBLEMS) {
      assert.ok(p.slug);
      assert.ok(p.foundationLessonIds.length + p.reasoningLessonIds.length > 0);
      assert.ok(p.relatedModuleIds.length > 0);
      const ordered = problemLessonIds(p);
      assert.deepEqual(ordered, [
        ...p.foundationLessonIds,
        ...p.reasoningLessonIds,
      ]);
    }
  });

  it("resolves every tagged lesson and case against the live curriculum", async () => {
    const lessons = await getAllLessons();
    const cases = getClinicalCases();
    const lessonIds = new Set(lessons.map((l) => l.id));
    const caseIds = new Set(cases.map((c) => c.id));

    for (const p of CLINICAL_PROBLEMS) {
      const filtered = filterExistingProblemLinks(p, lessonIds, caseIds);
      const counts = pathwayLinkCounts(filtered);
      assert.equal(
        counts.lessons,
        problemLessonIds(p).length,
        `${p.slug} lost lessons after filter`,
      );
      assert.equal(
        counts.cases,
        p.caseIds.length,
        `${p.slug} lost cases after filter`,
      );

      for (const id of problemLessonIds(filtered)) {
        const lesson = await getLesson(id);
        assert.ok(lesson, `missing lesson ${id} on ${p.slug}`);
      }
      for (const id of filtered.caseIds) {
        assert.ok(getClinicalCase(id), `missing case ${id} on ${p.slug}`);
      }
    }
  });

  it("features pathways after organ mastery or clerkship progress", () => {
    assert.equal(
      shouldFeaturePresentationPathways({
        moduleProgress: {},
        clerkshipModuleIds: ["mod-im"],
        organModuleIds: ["mod-cv"],
      }),
      false,
    );
    assert.equal(
      shouldFeaturePresentationPathways({
        moduleProgress: { "mod-cv": { state: "mastered" } },
        clerkshipModuleIds: ["mod-im"],
        organModuleIds: ["mod-cv"],
      }),
      true,
    );
    assert.equal(
      shouldFeaturePresentationPathways({
        moduleProgress: { "mod-im": { state: "in_progress" } },
        clerkshipModuleIds: ["mod-im"],
        organModuleIds: ["mod-cv"],
      }),
      true,
    );

    const featured = featuredPresentationProblems(
      CLINICAL_PROBLEMS,
      new Set(["mod-cv"]),
      { limit: 3 },
    );
    assert.ok(featured.length > 0);
    assert.ok(featured.every((p) => p.relatedModuleIds.includes("mod-cv")));
  });
});
