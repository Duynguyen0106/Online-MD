/**
 * Canonical student Practice routes.
 * Keep nav, dashboard CTAs, redirects, and not-found recovery in sync via this module.
 */
export const PRACTICE_ROUTES = {
  flashcards: "/flashcards",
  qbank: "/qbank",
  tutor: "/tutor",
  cases: "/cases",
} as const;

export type QbankBankParam = "module" | "step1" | "step2ck";

export function qbankHref(bank?: QbankBankParam): string {
  if (!bank || bank === "module") return PRACTICE_ROUTES.qbank;
  return `${PRACTICE_ROUTES.qbank}?bank=${bank}`;
}

/** Common mistaken paths → canonical Practice destinations. */
export const PRACTICE_ALIASES: { source: string; destination: string }[] = [
  { source: "/question-bank", destination: PRACTICE_ROUTES.qbank },
  { source: "/questionbank", destination: PRACTICE_ROUTES.qbank },
  { source: "/questions", destination: PRACTICE_ROUTES.qbank },
  { source: "/clinical-cases", destination: PRACTICE_ROUTES.cases },
  { source: "/clinical_cases", destination: PRACTICE_ROUTES.cases },
  { source: "/case", destination: PRACTICE_ROUTES.cases },
];
