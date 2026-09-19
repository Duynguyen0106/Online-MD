import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { reviewSm2 } from "./supermemo2";

describe("reviewSm2", () => {
  it("resets on low quality", () => {
    const result = reviewSm2({
      easiness: 2.5,
      intervalDays: 10,
      repetitions: 4,
      quality: 2,
    });
    assert.equal(result.repetitions, 0);
    assert.equal(result.intervalDays, 1);
  });

  it("sets first successful interval to 1 day", () => {
    const result = reviewSm2({
      easiness: 2.5,
      intervalDays: 0,
      repetitions: 0,
      quality: 4,
    });
    assert.equal(result.repetitions, 1);
    assert.equal(result.intervalDays, 1);
  });

  it("sets second successful interval to 6 days", () => {
    const result = reviewSm2({
      easiness: 2.5,
      intervalDays: 1,
      repetitions: 1,
      quality: 5,
    });
    assert.equal(result.repetitions, 2);
    assert.equal(result.intervalDays, 6);
  });
});
