import type { CatalogTopic } from "@/lib/curriculum/catalog/types";

/**
 * Organ- and year-aware section frames that enrich Clinical / Diagnostic /
 * Management blocks without re-pasting the same keyword banks four times.
 */

function clinicalYear(topic: CatalogTopic): boolean {
  return topic.year >= 3;
}

function organCue(organ: string): string {
  const o = organ.toLowerCase();
  if (/cardio|heart/.test(o)) {
    return "perfusion, congestion, ischemia, arrhythmia, and valvular obstruction/regurgitation";
  }
  if (/respir|pulmon|lung/.test(o)) {
    return "airway, alveolar gas exchange, ventilation–perfusion matching, and work of breathing";
  }
  if (/renal|kidney|genito/.test(o)) {
    return "perfusion, filtration, tubular handling, obstruction, and acid–base/volume balance";
  }
  if (/gastro|hepat|liver|gi/.test(o)) {
    return "mucosal integrity, motility/obstruction, portal flow, and hepatocellular vs cholestatic injury";
  }
  if (/endocrin/.test(o)) {
    return "hormone excess vs deficiency, feedback failure, and acute crisis physiology";
  }
  if (/hemat|lymph/.test(o)) {
    return "production vs destruction vs loss, bleeding vs thrombosis, and marrow/peripheral kinetics";
  }
  if (/nerv|neuro|cns|brain/.test(o)) {
    return "localization (CNS vs PNS), tempo, and vascular vs inflammatory vs toxic-metabolic causes";
  }
  if (/musculo|rheum|msk/.test(o)) {
    return "articular vs periarticular disease, inflammatory vs mechanical patterns, and septic joint vigilance";
  }
  if (/reproduct|obstetric|gynecol/.test(o)) {
    return "hormonal axis integrity, pregnancy physiology, and time-critical obstetric emergencies";
  }
  if (/pediatr|child/.test(o)) {
    return "age-specific vitals, congenital differentials, and developmental timing";
  }
  return "the dominant organ-system failure mode for this chapter";
}

export function presentationFrame(topic: CatalogTopic): string {
  const organ = topic.organSystem;
  const title = topic.title;
  const cue = organCue(organ);
  if (clinicalYear(topic)) {
    return `### Recognition script for **${title}**

Build a timed story: onset, trajectory, associated features, medications, and red flags in the **${organ}** domain. Focus the encounter on ${cue}. Vital-sign trends often outrank a single normal snapshot. Ask what finding would force escalation in the next 15 minutes versus what can wait for confirmatory data.

Carry three lines: most likely · most dangerous · most common mimic of **${title}**. Exam maneuvers should be hypothesis-driven—each one ought to raise or lower the probability of **${title}** or its can’t-miss alternative.`;
  }
  return `### Phenotype bridge for **${title}**

A mechanism chapter is unfinished until it predicts a person. For **${title}** in the **${organ}** map, convert each control point into a symptom, exam finding, or vital-sign pattern grounded in ${cue}. Loss-of-function, gain-of-function, and toxic/pharmacologic hits should yield distinguishable bedside clues—not interchangeable buzzwords.`;
}

export function diagnosticFrame(topic: CatalogTopic): string {
  const organ = topic.organSystem;
  const title = topic.title;
  const cue = organCue(organ);
  if (clinicalYear(topic)) {
    return `### Decision-changing data for **${title}**

Prefer tests that change the branch over tests that decorate the chart. For **${organ}** presentations of **${title}**, pre-commit to if/then rules: *if A → X; if B → Y*. Orient the first panel toward ${cue}. Bundle results that must return together when minutes matter (e.g., ECG + troponin thinking in chest pain; glucose + ECG in syncope; UA + cultures when febrile and toxic).

Reassessment is diagnostic: the wrong trajectory after initial therapy means the pathway—not just the dose—was misidentified. Exact numeric cutoffs belong to current guidelines (*REFERENCE_REVIEW_REQUIRED*).`;
  }
  return `### Labs and imaging as experiments on **${title}**

Ask which result must rise, fall, or redistribute if the mechanism of **${title}** is correct—and which result would falsify it. In the **${organ}** domain, pathology, ECG, and imaging should land on a named structure or process tied to ${cue}, not an unfocused panel. Prefer discriminating studies that separate this pathway from its closest look-alike.`;
}

export function managementFrame(topic: CatalogTopic): string {
  const organ = topic.organSystem;
  const title = topic.title;
  const cue = organCue(organ);
  if (clinicalYear(topic)) {
    return `### Physiologic order of operations — **${title}**

1. Stabilize airway, breathing, circulation, and immediate threats in parallel with diagnosis when needed.  
2. Start disease-directed therapy when delay harms—even before perfect certainty.  
3. Map each intervention to a **${organ}** physiologic goal grounded in ${cue}.  
4. Name one major on-target toxicity or monitoring need for every class you invoke.  
5. Set a reassessment clock and a disposition/precaution plan.

Exact regimens, infusion recipes, and institutional order sets are not standing orders from this page (*REFERENCE_REVIEW_REQUIRED*).`;
  }
  return `### Therapeutics as mechanism experiments — **${title}**

Therapy reverses the pathway: target → expected physiologic change → clinical endpoint → on-target toxicity. For **${title}**, separate disease-modifying classes from purely supportive care, keeping ${cue} in view. Learn the class and the monitoring need; verify dosing, sequencing, and contraindications against current society guidance before clinical use (*REFERENCE_REVIEW_REQUIRED*).`;
}

export function pathophysFrame(topic: CatalogTopic): string {
  const title = topic.title;
  const organ = topic.organSystem;
  const points = topic.points;
  const chain = points.join(" → ");
  const cue = organCue(organ);
  return `### Continuous mechanism story

Teach **${title}** as one arc through: ${chain}. At each node in the **${organ}** map, name what is regulated, what turns the node up or down, and the phenotype when it fails—keeping ${cue} as the physiologic backdrop. When compensation becomes maladaptive, that is usually where disease declares itself clinically.

**Chapter emphasis:** ${topic.quizExplain}`;
}

/** Stable pseudo-random index from topic key + salt (varies scaffold without chaos). */
export function topicSalt(topic: CatalogTopic, salt: number): number {
  const s = `${topic.key}:${salt}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
