import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  activityRecencyWeight,
  lessonEvidenceScore,
  topCompetencyGaps,
  type CompetencyModuleRow,
} from "@/lib/competency/aggregate";
import { COMPETENCY_DOMAINS } from "@/lib/competency/domains";

function emptyCell(
  moduleId: string,
  domain: (typeof COMPETENCY_DOMAINS)[number],
  score: number,
) {
  return {
    moduleId,
    domain,
    score,
    linkedLessonCount: 2,
    masteredLessonCount: 0,
    nextLessonId: `lesson-${moduleId}`,
    nextHref: `/lessons/lesson-${moduleId}`,
    nextKind: "lesson" as const,
  };
}

function row(
  moduleId: string,
  title: string,
  scores: Partial<Record<(typeof COMPETENCY_DOMAINS)[number], number>>,
): CompetencyModuleRow {
  const cells = {} as CompetencyModuleRow["cells"];
  let sum = 0;
  for (const d of COMPETENCY_DOMAINS) {
    const score = scores[d] ?? 0;
    cells[d] = emptyCell(moduleId, d, score);
    sum += score;
  }
  return {
    moduleId,
    title,
    sequence: 1,
    phaseId: "p1",
    cells,
    nextLessonId: `lesson-${moduleId}`,
    nextHref: `/lessons/lesson-${moduleId}`,
    nextKind: "lesson",
    overall: sum / COMPETENCY_DOMAINS.length,
  };
}

describe("lessonEvidenceScore", () => {
  const lesson = { quizPassThreshold: 0.7 };

  it("returns 1 when mastered", () => {
    assert.equal(
      lessonEvidenceScore(
        lesson,
        {
          lessonId: "l1",
          state: "mastered",
          viewedBlockIds: [],
          updatedAt: "2026-01-01",
        },
        4,
      ),
      1,
    );
  });

  it("credits section views before quiz", () => {
    const score = lessonEvidenceScore(
      lesson,
      {
        lessonId: "l1",
        state: "in_progress",
        viewedBlockIds: ["a", "b"],
        updatedAt: "2026-01-01",
      },
      4,
    );
    // 0.5 * (2/4) + 0.5 * 0 = 0.25
    assert.equal(score, 0.25);
  });

  it("credits quiz score alongside sections", () => {
    const score = lessonEvidenceScore(
      lesson,
      {
        lessonId: "l1",
        state: "in_progress",
        viewedBlockIds: ["a", "b", "c", "d"],
        lastFormativeScore: 0.8,
        updatedAt: "2026-01-01",
      },
      4,
    );
    // 0.5 * 1 + 0.5 * 0.8 = 0.9
    assert.equal(score, 0.9);
  });
});

describe("activityRecencyWeight", () => {
  it("is 0 with no activity", () => {
    assert.equal(activityRecencyWeight(0), 0);
  });

  it("is near 1 for activity today", () => {
    const now = Date.parse("2026-10-29T12:00:00Z");
    const w = activityRecencyWeight(now - 60_000, now);
    assert.ok(w > 0.95);
  });

  it("fades over days", () => {
    const now = Date.parse("2026-10-29T12:00:00Z");
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const w = activityRecencyWeight(weekAgo, now);
    assert.ok(w > 0.3 && w < 0.5);
  });
});

describe("topCompetencyGaps", () => {
  it("prefers recently worked weak domains over untouched zeros", () => {
    const now = Date.parse("2026-10-29T12:00:00Z");
    const rows = [
      row("mod-cold", "Zoology", { knowledge: 0 }),
      row("mod-hot", "Cardiology", {
        diagnosis: 0.2,
        management: 0.9,
        // Other domains stay 0 — partial diagnosis should still win via
        // in-progress boost + module recency.
      }),
    ];
    const gaps = topCompetencyGaps(rows, 3, {
      nowMs: now,
      moduleActivityMs: {
        "mod-cold": 0,
        "mod-hot": now - 2 * 60 * 60 * 1000,
      },
    });
    assert.ok(gaps.length >= 1);
    assert.equal(gaps[0].moduleId, "mod-hot");
    assert.equal(gaps[0].domain, "diagnosis");
    assert.equal(gaps[0].nextHref, "/lessons/lesson-mod-hot");
  });

  it("diversifies domains in suggested focus", () => {
    const now = Date.parse("2026-10-29T12:00:00Z");
    const rows = [
      row("a", "Alpha", { diagnosis: 0.1, management: 0.1, knowledge: 0.1 }),
      row("b", "Beta", { diagnosis: 0.15, management: 0.12 }),
    ];
    const gaps = topCompetencyGaps(rows, 3, {
      nowMs: now,
      moduleActivityMs: {
        a: now,
        b: now,
      },
    });
    const domains = new Set(gaps.map((g) => g.domain));
    assert.ok(domains.size >= 2);
  });
});
