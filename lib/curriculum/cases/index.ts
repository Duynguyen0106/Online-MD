import type { ClinicalCase } from "@/lib/types/domain";
import { acuteMesentericIschemiaCase } from "@/lib/curriculum/cases/acute-mesenteric-ischemia";

/**
 * Authored progressive (and future) clinical cases living under
 * `lib/curriculum/cases/`. Merged into the runtime case catalog via accessors.
 */
export const authoredClinicalCases: ClinicalCase[] = [
  acuteMesentericIschemiaCase,
];

export { acuteMesentericIschemiaCase };
