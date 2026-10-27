/**
 * Student-facing competency domains derived from curriculum objective metadata.
 * Study-evidence labels only — not clinical certification.
 */

export const COMPETENCY_DOMAINS = [
  "scientific_concepts",
  "diagnosis",
  "management",
  "patient_care",
  "knowledge",
  "mechanisms",
  "interpretation",
  "systems_practice",
] as const;

export type CompetencyDomainId = (typeof COMPETENCY_DOMAINS)[number];

export const COMPETENCY_DOMAIN_LABELS: Record<CompetencyDomainId, string> = {
  scientific_concepts: "Scientific concepts",
  diagnosis: "Diagnosis",
  management: "Management",
  patient_care: "Patient care",
  knowledge: "Knowledge",
  mechanisms: "Mechanisms",
  interpretation: "Interpretation",
  systems_practice: "Systems practice",
};

/** Short column headers for the heatmap. */
export const COMPETENCY_DOMAIN_SHORT: Record<CompetencyDomainId, string> = {
  scientific_concepts: "Science",
  diagnosis: "Dx",
  management: "Mgmt",
  patient_care: "Care",
  knowledge: "Know",
  mechanisms: "Mech",
  interpretation: "Interp",
  systems_practice: "Systems",
};

/**
 * Map raw Objective.physicianTask / contentCategory strings onto the 8 domains.
 * Optional statement first-verb hints fill Interpretation when metadata is coarse.
 * Unmapped tasks fall into Knowledge.
 */
export function normalizeCompetencyDomain(
  physicianTask: string,
  contentCategory?: string,
  statement?: string,
): CompetencyDomainId {
  const task = physicianTask.trim().toLowerCase();
  const cat = (contentCategory ?? "").trim().toLowerCase();
  const stmt = (statement ?? "").trim().toLowerCase();

  // Primary physician tasks win over statement verbs.
  if (task === "diagnosis" || task.includes("diagnos")) return "diagnosis";
  if (task === "management" || task.includes("manag")) return "management";
  if (task === "patient care" || task.includes("patient care")) {
    return "patient_care";
  }
  // Interpretation before scientific-concepts/mechanism fallbacks so "Interpret …"
  // objectives are not swallowed by coarse Knowledge tags.
  if (
    task.includes("interpret") ||
    cat.includes("imaging") ||
    /^\s*interpret\b/.test(stmt)
  ) {
    return "interpretation";
  }
  if (
    task.includes("scientific concepts") ||
    task === "medical knowledge / scientific concepts"
  ) {
    return "scientific_concepts";
  }
  if (
    cat.includes("physiology") ||
    cat.includes("pathophysiology") ||
    cat.includes("biochem") ||
    cat.includes("cell biology") ||
    cat.includes("microbiology") ||
    cat.includes("pharmacology") ||
    cat.includes("immunology")
  ) {
    if (task === "knowledge" || task.includes("knowledge")) return "mechanisms";
  }
  if (
    cat.includes("biostat") ||
    cat.includes("epidemiology") ||
    cat.includes("ethics") ||
    cat.includes("health systems") ||
    cat.includes("prevention")
  ) {
    return "systems_practice";
  }
  if (
    cat.includes("pathology") &&
    (task === "knowledge" || task.includes("knowledge"))
  ) {
    return "mechanisms";
  }
  if (task === "knowledge" || task.includes("knowledge")) return "knowledge";
  return "knowledge";
}
