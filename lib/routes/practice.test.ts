import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  PRACTICE_ALIASES,
  PRACTICE_ROUTES,
  qbankHref,
} from "@/lib/routes/practice";

describe("practice routes", () => {
  it("points Question bank and Clinical cases at existing App Router pages", () => {
    const root = process.cwd();
    assert.equal(PRACTICE_ROUTES.qbank, "/qbank");
    assert.equal(PRACTICE_ROUTES.cases, "/cases");
    assert.ok(
      existsSync(path.join(root, "app/qbank/page.tsx")),
      "app/qbank/page.tsx must exist",
    );
    assert.ok(
      existsSync(path.join(root, "app/cases/page.tsx")),
      "app/cases/page.tsx must exist",
    );
  });

  it("builds Step bank deep links used by the dashboard", () => {
    assert.equal(qbankHref("step1"), "/qbank?bank=step1");
    assert.equal(qbankHref("step2ck"), "/qbank?bank=step2ck");
    assert.equal(qbankHref(), "/qbank");
  });

  it("aliases common mistaken paths to the canonical Practice routes", () => {
    const bySource = Object.fromEntries(
      PRACTICE_ALIASES.map((a) => [a.source, a.destination]),
    );
    assert.equal(bySource["/question-bank"], "/qbank");
    assert.equal(bySource["/clinical-cases"], "/cases");
  });
});
