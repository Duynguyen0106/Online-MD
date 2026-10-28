/**
 * Mock cohort analytics for the faculty dashboard demo.
 * Educational remediation cues only — not live LMS gradebook data.
 */

export type AtRiskSeverity = "high" | "moderate" | "watch";

export interface AtRiskConcept {
  id: string;
  concept: string;
  moduleTitle: string;
  avgScorePct: number;
  cohortMissRatePct: number;
  severity: AtRiskSeverity;
  remediationHint: string;
}

export interface MockCohortStudent {
  id: string;
  name: string;
  completionPct: number;
  strugglingModules: string[];
  riskLabel: "On track" | "Needs review" | "At risk";
  lastActiveLabel: string;
}

export const COHORT_AT_RISK_CONCEPTS: AtRiskConcept[] = [
  {
    id: "risk-frank-starling",
    concept: "Frank–Starling curves",
    moduleTitle: "Cardiovascular",
    avgScorePct: 48,
    cohortMissRatePct: 62,
    severity: "high",
    remediationHint:
      "Re-teach preload vs contractility shifts with a whiteboard PV-loop / Starling overlay before the HF quiz.",
  },
  {
    id: "risk-acid-base",
    concept: "Acid–base disorders",
    moduleTitle: "Renal",
    avgScorePct: 52,
    cohortMissRatePct: 57,
    severity: "high",
    remediationHint:
      "Run a 20-minute ABG drill: primary process → compensation → AG / osm gap — then assign the mixed-disorder case.",
  },
  {
    id: "risk-shock",
    concept: "Shock classification by mechanism",
    moduleTitle: "Cardiovascular",
    avgScorePct: 58,
    cohortMissRatePct: 49,
    severity: "moderate",
    remediationHint:
      "Use a 2×2 (pump vs volume × vasodilated vs vasoconstricted) table; require one can’t-miss mimic per vignette.",
  },
  {
    id: "risk-hyponatremia",
    concept: "Hyponatremia volume status approach",
    moduleTitle: "Renal / Internal Medicine",
    avgScorePct: 61,
    cohortMissRatePct: 44,
    severity: "moderate",
    remediationHint:
      "Force a volume-status first branch before SIADH labeling; pair with a hypertonic saline safety pearl (no standing doses).",
  },
  {
    id: "risk-vent-perfusion",
    concept: "V/Q mismatch vs shunt",
    moduleTitle: "Pulmonary",
    avgScorePct: 64,
    cohortMissRatePct: 38,
    severity: "watch",
    remediationHint:
      "One slide: A-a gradient logic + oxygen response of V/Q vs true shunt; check with two board-style stems.",
  },
];

export const MOCK_COHORT_STUDENTS: MockCohortStudent[] = [
  {
    id: "mock-st-ava",
    name: "Ava Chen",
    completionPct: 78,
    strugglingModules: ["Renal"],
    riskLabel: "Needs review",
    lastActiveLabel: "Today",
  },
  {
    id: "mock-st-marcus",
    name: "Marcus Reid",
    completionPct: 41,
    strugglingModules: ["Cardiovascular", "Pulmonary"],
    riskLabel: "At risk",
    lastActiveLabel: "2 days ago",
  },
  {
    id: "mock-st-priya",
    name: "Priya Nair",
    completionPct: 86,
    strugglingModules: [],
    riskLabel: "On track",
    lastActiveLabel: "Today",
  },
  {
    id: "mock-st-jordan",
    name: "Jordan Blake",
    completionPct: 55,
    strugglingModules: ["Cardiovascular", "Renal"],
    riskLabel: "At risk",
    lastActiveLabel: "Yesterday",
  },
  {
    id: "mock-st-samira",
    name: "Samira Ortiz",
    completionPct: 67,
    strugglingModules: ["Pulmonary"],
    riskLabel: "Needs review",
    lastActiveLabel: "Today",
  },
  {
    id: "mock-st-noah",
    name: "Noah Patel",
    completionPct: 92,
    strugglingModules: [],
    riskLabel: "On track",
    lastActiveLabel: "3 hours ago",
  },
  {
    id: "mock-st-elena",
    name: "Elena Brooks",
    completionPct: 34,
    strugglingModules: ["Cardiovascular", "Renal", "Endocrine"],
    riskLabel: "At risk",
    lastActiveLabel: "5 days ago",
  },
  {
    id: "mock-st-caleb",
    name: "Caleb Nguyen",
    completionPct: 71,
    strugglingModules: ["Acid–base (Renal)"],
    riskLabel: "Needs review",
    lastActiveLabel: "Yesterday",
  },
];

export function cohortSummary() {
  const atRisk = MOCK_COHORT_STUDENTS.filter((s) => s.riskLabel === "At risk")
    .length;
  const needsReview = MOCK_COHORT_STUDENTS.filter(
    (s) => s.riskLabel === "Needs review",
  ).length;
  const avgCompletion =
    MOCK_COHORT_STUDENTS.reduce((n, s) => n + s.completionPct, 0) /
    MOCK_COHORT_STUDENTS.length;
  return {
    cohortSize: MOCK_COHORT_STUDENTS.length,
    atRisk,
    needsReview,
    avgCompletionPct: Math.round(avgCompletion),
    highSeverityConcepts: COHORT_AT_RISK_CONCEPTS.filter(
      (c) => c.severity === "high",
    ).length,
  };
}
