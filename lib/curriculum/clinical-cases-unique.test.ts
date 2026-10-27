import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getClinicalCases } from "@/lib/curriculum/accessors";

describe("clinical case IDs", () => {
  it("are unique across seed and expansion waves", () => {
    const cases = getClinicalCases();
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const c of cases) {
      if (seen.has(c.id)) {
        dupes.push(`${c.id}: "${seen.get(c.id)}" vs "${c.title}"`);
      } else {
        seen.set(c.id, c.title);
      }
    }
    assert.equal(dupes.length, 0, `Duplicate case IDs: ${dupes.join("; ")}`);
  });
});
