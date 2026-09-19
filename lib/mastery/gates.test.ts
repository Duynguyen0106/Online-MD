import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  canAccessModuleQbank,
  canAccessStep1Qbank,
  evaluateLessonMastery,
} from "./gates";
import type { StudentState } from "@/lib/types/domain";

function emptyState(): StudentState {
  return {
    userId: "u1",
    lessonProgress: {},
    moduleProgress: {},
    quizAttempts: [],
    examAttempts: [],
    cardReviews: {},
    qbankAttempts: [],
    caseAttempts: [],
    tutorThreads: [],
  };
}

describe("mastery gates", () => {
  it("requires blocks + quiz for lesson mastery", () => {
    const result = evaluateLessonMastery("les-cv-1", {
      lessonId: "les-cv-1",
      state: "in_progress",
      viewedBlockIds: [],
      lastFormativeScore: 1,
      updatedAt: new Date().toISOString(),
    });
    assert.equal(result.mastered, false);
    assert.equal(result.quizPass, true);
    assert.equal(result.allBlocksViewed, false);
  });

  it("locks module qbank until module mastered", () => {
    const gate = canAccessModuleQbank(emptyState(), "mod-cv");
    assert.equal(gate.unlocked, false);
  });

  it("locks step1 qbank until foundations mastered", () => {
    const gate = canAccessStep1Qbank(emptyState());
    assert.equal(gate.unlocked, false);
  });
});
