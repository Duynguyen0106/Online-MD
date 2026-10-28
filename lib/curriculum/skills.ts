import type { SkillPracticeStatus } from "@/lib/types/domain";

export type SkillCategory =
  | "Procedures"
  | "Airway & access"
  | "Imaging interpretation"
  | "Bedside exams";

export interface ClinicalSkill {
  id: string;
  title: string;
  category: SkillCategory;
  summary: string;
  settingHint: string;
}

/**
 * Core clerkship-oriented procedures and clinical skills for the tracker.
 * Educational checklist only — not a credentialling or privilege log.
 */
export const CLINICAL_SKILLS: ClinicalSkill[] = [
  {
    id: "skill-venipuncture",
    title: "Venipuncture",
    category: "Procedures",
    summary:
      "Peripheral blood draw with aseptic technique, vessel selection, and specimen labeling.",
    settingHint: "Phlebotomy / wards",
  },
  {
    id: "skill-peripheral-iv",
    title: "Peripheral IV placement",
    category: "Airway & access",
    summary:
      "Short peripheral catheter insertion, flush check, and securement for fluid/medication delivery.",
    settingHint: "ED / wards / simulation",
  },
  {
    id: "skill-foley",
    title: "Foley catheter insertion",
    category: "Procedures",
    summary:
      "Sterile urethral catheterization with indication check, balloon inflation, and urine return confirmation.",
    settingHint: "Wards / OR / simulation",
  },
  {
    id: "skill-ng-tube",
    title: "Nasogastric tube placement",
    category: "Procedures",
    summary:
      "NG placement for decompression or feeding with placement verification before use.",
    settingHint: "Wards / ED / simulation",
  },
  {
    id: "skill-suturing",
    title: "Simple interrupted suturing",
    category: "Procedures",
    summary:
      "Wound prep, local anesthesia concepts, interrupted suture placement, and knot security.",
    settingHint: "Suture lab / ED / clinic",
  },
  {
    id: "skill-abg",
    title: "Arterial blood gas sampling",
    category: "Airway & access",
    summary:
      "Radial (or alternate) arterial puncture technique, site selection, and sample handling.",
    settingHint: "ICU / wards / simulation",
  },
  {
    id: "skill-bag-mask",
    title: "Bag-mask ventilation",
    category: "Airway & access",
    summary:
      "Open airway, seal, and effective ventilation with two-person technique when needed.",
    settingHint: "Simulation / code training",
  },
  {
    id: "skill-pocus-basic",
    title: "Basic POCUS interpretation",
    category: "Imaging interpretation",
    summary:
      "Recognize core views and binary findings (e.g., free fluid, basic cardiac windows) under supervision.",
    settingHint: "ED / ICU ultrasound teaching",
  },
  {
    id: "skill-cxr-basic",
    title: "Chest X-ray interpretation",
    category: "Imaging interpretation",
    summary:
      "Systematic CXR read: quality, airways/bones, cardiac silhouette, lungs, pleura, devices.",
    settingHint: "Radiology rounds / wards",
  },
  {
    id: "skill-ecg-basic",
    title: "12-lead ECG interpretation",
    category: "Imaging interpretation",
    summary:
      "Rate, rhythm, intervals, ischemia patterns, and when to escalate for STEMI-equivalent concern.",
    settingHint: "Wards / ED / cardiology teaching",
  },
  {
    id: "skill-neuro-exam",
    title: "Focused neurologic exam",
    category: "Bedside exams",
    summary:
      "Mental status, cranial nerves, motor/sensory, reflexes, and gait with localization in mind.",
    settingHint: "Wards / neurology clinic",
  },
  {
    id: "skill-sterile-technique",
    title: "Sterile gowning & gloving",
    category: "Bedside exams",
    summary:
      "Hand hygiene, gown/glove sequence, and maintaining a sterile field for bedside procedures.",
    settingHint: "OR / procedure labs",
  },
];

export const SKILL_STATUS_LABELS: Record<SkillPracticeStatus, string> = {
  not_started: "Not started",
  simulated: "Practiced in simulation",
  verified: "Verified / observed",
};

export const SKILL_STATUS_ORDER: SkillPracticeStatus[] = [
  "not_started",
  "simulated",
  "verified",
];

export function getClinicalSkill(id: string): ClinicalSkill | undefined {
  return CLINICAL_SKILLS.find((s) => s.id === id);
}

export function skillStatusTone(status: SkillPracticeStatus): string {
  switch (status) {
    case "verified":
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    case "simulated":
      return "bg-amber-50 text-amber-900 border-amber-200";
    default:
      return "";
  }
}
