import type { Lesson, Module, Objective, Phase, UsmleStep } from "@/lib/types/domain";

/**
 * Derive additional measurable objectives from existing lesson concept text
 * when a lesson has fewer than 3 objectives. Does not invent new medical claims.
 */
export function supplementalObjectivesForProgram(
  phases: Phase[],
  existing: Objective[],
): Objective[] {
  const countByLesson = new Map<string, number>();
  for (const o of existing) {
    for (const lid of o.lessonIds) {
      countByLesson.set(lid, (countByLesson.get(lid) ?? 0) + 1);
    }
  }

  const extras: Objective[] = [];

  for (const phase of phases) {
    const step: UsmleStep =
      phase.usmleFocus === "step2ck" ? "step2ck" : "step1";
    for (const mod of phase.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.status === "archived") continue;
        const have = countByLesson.get(lesson.id) ?? 0;
        if (have >= 3) continue;
        const seeds = objectiveSeedsFromLesson(lesson);
        let n = have;
        for (const seed of seeds) {
          if (n >= 3) break;
          const id = `obj-auto-${lesson.id}-${n + 1}`;
          if (existing.some((o) => o.id === id) || extras.some((o) => o.id === id)) {
            n += 1;
            continue;
          }
          extras.push({
            id,
            code: `AUTO-${lesson.id.toUpperCase()}-${n + 1}`,
            statement: seed,
            usmleStep: step,
            organSystem: organFromModule(mod),
            physicianTask: "Knowledge",
            contentCategory: categoryFromModule(mod),
            moduleId: mod.id,
            lessonIds: [lesson.id],
          });
          n += 1;
        }
      }
    }
  }

  return extras;
}

function objectiveSeedsFromLesson(lesson: Lesson): string[] {
  const seeds: string[] = [];
  for (const c of lesson.concepts) {
    if (c.summary?.trim()) {
      seeds.push(`Explain: ${measurableSummary(c.summary)}`);
    }
    if (c.title?.trim() && c.title !== lesson.title) {
      seeds.push(
        `Relate ${c.title} to the clinical or mechanistic story of ${lesson.title}.`,
      );
    }
  }
  if (seeds.length < 2) {
    seeds.push(
      `Predict one clinical consequence when the core pathway in ${lesson.title} fails.`,
    );
    seeds.push(
      `Distinguish ${lesson.title} from its closest look-alike mechanism or diagnosis.`,
    );
  }
  return [...new Set(seeds)].slice(0, 3);
}

/** Strip leading vague verbs so auto-objectives stay measurable. */
function measurableSummary(s: string): string {
  let t = s.trim().replace(/\s+/g, " ");
  t = t.replace(
    /^(know|understand|learn|appreciate|be aware of|become familiar with)\s+/i,
    "",
  );
  if (t.length <= 160) return t.endsWith(".") ? t.slice(0, -1) : t;
  return `${t.slice(0, 157).trim()}…`;
}

function organFromModule(mod: Module): string {
  const t = mod.title.toLowerCase();
  if (t.includes("cardio")) return "Cardiovascular";
  if (t.includes("respir") || t.includes("pulm")) return "Respiratory";
  if (t.includes("renal")) return "Renal / Urinary";
  if (t.includes("gastro") || t.includes("hepat")) return "Gastrointestinal";
  if (t.includes("endo")) return "Endocrine";
  if (t.includes("hemat") || t.includes("oncolog")) return "Hematopoietic / Lymphoreticular";
  if (t.includes("neuro")) return "Nervous System";
  if (t.includes("musculo") || t.includes("rheum")) return "Musculoskeletal";
  if (t.includes("pediatr")) return "Pediatric";
  if (t.includes("obstetric") || t.includes("gynecol")) return "Reproductive";
  if (t.includes("psychiatr")) return "Behavioral Health";
  return "Multisystem";
}

function categoryFromModule(mod: Module): string {
  if (mod.isCoreClerkship) {
    if (mod.id === "mod-im") return "Internal Medicine";
    if (mod.id === "mod-surg") return "Surgery";
    if (mod.id === "mod-peds") return "Pediatrics";
    if (mod.id === "mod-obgyn") return "Obstetrics & Gynecology";
    if (mod.id === "mod-psych") return "Psychiatry";
    if (mod.id === "mod-fm") return "Family Medicine";
    return "Clinical Medicine";
  }
  return "Pathophysiology";
}
