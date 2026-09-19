import type { CatalogTopic } from "@/lib/curriculum/catalog/types";
import {
  factualEnrichment,
  factualEnrichmentForTopic,
} from "@/lib/curriculum/catalog/factual-enrichment";

function yearLabel(year: 1 | 2 | 3 | 4): string {
  if (year === 1) return "Year 1 — Mechanisms & Foundations";
  if (year === 2) return "Year 2 — Organ-System Pathophysiology";
  if (year === 3) return "Year 3 — Core Clerkship";
  return "Year 4 — Advanced / Sub-Internship";
}

function isClinical(year: 1 | 2 | 3 | 4): boolean {
  return year >= 3;
}

/**
 * Turn a compact teaching bullet into textbook-style prose.
 * Declarative content only — no “fill in the blank” study prompts.
 */
function proseForPoint(
  point: string,
  topic: CatalogTopic,
  index: number,
): string {
  const n = index + 1;
  const title = topic.title;
  const organ = topic.organSystem;
  const cat = topic.contentCategory;
  const clinical = isClinical(topic.year);
  const localFacts = factualEnrichment(`${point} ${title}`);

  if (clinical) {
    return `### ${n}. ${point}

**${point}.** In **${title}** (${cat}; **${organ}**), this rule structures the encounter from the first minutes. It tells you which symptoms and exam findings to privilege, which complications to hunt for, and which orders are time-critical versus deferrable.

Clinically, the rule maps onto a limited set of ${organ} failure modes—ischemia, obstruction, infection, inflammation, bleeding, metabolic crisis, toxidrome, or pump/ventilatory failure. Once you name the failure mode, vitals and labs stop being a checklist and become evidence for or against **${title}**.

${localFacts ? `${localFacts}\n\n` : ""}Initial actions should follow the rule’s implied branch: stabilize what is unstable, obtain the two or three data points that change management, and start disease-directed therapy when delay itself causes harm. Reassess on a short clock; if the trajectory is wrong, escalate rather than repeating the same orders.

Keep a look-alike on the board that shares early features with **${title}** but would be worsened by the same first move. Discriminating those paths is the practical heart of this section.

**Bottom line.** ${topic.quizExplain}
`;
  }

  return `### ${n}. ${point}

**${point}.** This node belongs to the mechanism of **${title}** in ${cat}, framed in the **${organ}** map. It is best understood as a control point: a place where the pathway’s rate, direction, structure, or signaling can be increased, decreased, blocked, or constitutively driven.

${localFacts ? `${localFacts}\n\n` : ""}Regulation is the rest of the story. Physiologic “on” signals (substrate supply, allosteric activators, hormones, hypoxia, inflammatory mediators, or increased expression) and “off” signals (product inhibition, energy charge, hormones in the opposite state, drugs, or loss-of-function variants) determine whether this node supports homeostasis or produces disease.

When the node fails—absent, inhibited, overactive, mistargeted, or structurally disrupted—a predictable phenotype follows. That phenotype should be nameable as a clinical finding, laboratory pattern, imaging clue, or drug effect. The same logic explains toxins and therapeutics that act here: they are experiments on the pathway.

Learners commonly confuse this node with a neighboring step in **${title}**. The discriminator is usually location (compartment/tissue), cofactor requirement, hormonal state (fed/fasting), or the specific clinical syndrome that appears when only this node is hit.

**Bottom line for this section.** Hold the control point, its regulators, and one phenotype together as a single paragraph you could teach at the board.
`;
}

export function buildChapterFraming(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const pointList = topic.points.map((p, i) => `${i + 1}. ${p}`).join("\n");

  return `# ${topic.title}

**${yearLabel(topic.year)}** · ${topic.contentCategory} · ${topic.organSystem}${
    topic.physicianTask ? ` · ${topic.physicianTask}` : ""
  }

## Chapter overview

${
  clinical
    ? `This chapter develops **${topic.title}** the way a strong clerkship text would: syndrome recognition, physiologic rationale, sequenced evaluation, initial management, and the mistakes that cause harm. It belongs to **${topic.contentCategory}** with primary focus on the **${topic.organSystem}** system.`
    : `This chapter develops **${topic.title}** the way a strong preclerkship text would: define the process, locate its control points, explain regulation, predict the phenotype of failure, and bridge to clinical findings. It belongs to **${topic.contentCategory}** within the **${topic.organSystem}** map.`
}

## What this chapter covers

${pointList}

## Learning objectives

${
  clinical
    ? `1. Recognize presentations of **${topic.title}** and triage acuity.\n2. Explain the physiologic basis for the first diagnostic and therapeutic moves.\n3. Sequence initial management and name can’t-miss alternatives.\n4. Anticipate complications and reassessment checkpoints.`
    : `1. Explain the core mechanism of **${topic.title}** without notes.\n2. Identify regulators and failure modes at each major control point.\n3. Predict clinical or laboratory consequences of pathway disruption.\n4. Discriminate this mechanism from its most important look-alike.`
}

## How the chapter is organized

Section II is the didactic core with detailed mechanism content. Section III bridges to patients. Section IV consolidates pitfalls. The vignette is a teach-back box before the formative quiz (≥80% to pass).

> Original Online MD teaching aligned to USMLE Content Outline domains. Verify doses and guidelines with primary sources in clinical care.
`;
}

export function buildChapterCore(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const bank = factualEnrichmentForTopic(topic);
  const sections = topic.points
    .map((p, i) => proseForPoint(p, topic, i))
    .join("\n");

  if (clinical) {
    return `## ${topic.title} — clinical pathway

### Opening physiologic frame

Patients do not arrive labeled **${topic.title}**. They arrive with symptoms, vital-sign trajectories, and risk factors. Begin by naming the dominant physiologic problem inside the **${topic.organSystem}** domain of ${topic.contentCategory}. Acuity decides whether you stabilize in parallel with diagnosis or can gather data first.

### High-yield reference detail

${bank || `Use the chapter sections below to rebuild the full pathway for **${topic.title}** from first principles.`}

### Decision spine

1. **Syndrome** — What is failing?  
2. **Time** — Minutes versus hours?  
3. **Discriminating data** — Which tests change the branch point?  
4. **Initial therapy** — What starts before perfect certainty when delay harms?  
5. **Reassessment** — What finding says the pathway is working or wrong?

### Chapter sections

${sections}

### Integrating the teaching point

${topic.quizExplain}
`;
  }

  return `## ${topic.title} — core mechanisms

### Scientific frame

A regulated process in **${topic.organSystem}** ${topic.contentCategory.toLowerCase()} maintains homeostasis; disease appears when the process is deficient, excessive, mistimed, or mislocalized. **${topic.title}** develops that arc in chapter form. Each heading below is a major control point.

### High-yield reference detail

${bank || `Rebuild **${topic.title}** from the control-point sections below, tying each node to regulation and phenotype.`}

### Chapter sections

${sections}

### Synthesis line

${topic.quizExplain}
`;
}

export function buildChapterClinical(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const rows = topic.points
    .map((p, i) => `| ${i + 1} | ${p} | ${clinical ? "Next action / confirming finding" : "Expected phenotype / test"} |`)
    .join("\n");

  if (clinical) {
    return `## Applied care — ${topic.title}

### Recognition

Build the history around onset, severity, associated features, medications, prior episodes, and red-flag symptoms for **${topic.organSystem}** disease. The exam should be hypothesis-driven: every maneuver should support or weaken **${topic.title}** or a can’t-miss alternative.

### Differential that is forced to stay honest

Always carry three lines on the board:

1. Most likely explanation given base rate and the story  
2. Most dangerous explanation you cannot miss  
3. Common mimic that shares early features with **${topic.title}**

### Data and therapy

Choose tests that change management. For each major result, know the branch: *if A, do X; if B, do Y*. Start disease-directed therapy when waiting for certainty causes harm, then reassess on a short clock. Exact drug doses and institutional pathways belong to current guidelines—this chapter teaches the physiologic order of operations.

### Working table

| # | Chapter rule | Fill in while studying |
| --- | --- | --- |
${rows}

### Disposition thinking

Before you leave the case, state level of care, pending results, precautions, and what would force immediate return to the bedside. Reassessment literacy is part of the chapter, not an afterthought.

**Remember:** ${topic.quizExplain}
`;
  }

  return `## Clinical correlation — ${topic.title}

### From mechanism to a person

A preclerkship chapter is unfinished until the mechanism predicts a patient. For each control point in **${topic.title}**, name a symptom, exam finding, imaging pattern, lab disturbance, or drug effect inside **${topic.organSystem}** care.

### Clinical threads to keep active while you read

1. **Loss of function** — What syndrome appears when the pathway cannot meet demand?  
2. **Gain of function / constitutive activity** — What phenotype appears when the brake is lost?  
3. **Toxic or pharmacologic hit** — Which drugs or toxins act here, and what clue follows?  
4. **Developmental or genetic variant** — How might a congenital defect present across the lifespan?

### Correlation table

| # | Mechanism anchor | Clinical prediction |
| --- | --- | --- |
${rows}

### Labs and imaging as experiments

Do not memorize isolated test names. Ask which result must rise, fall, or redistribute if your mechanism story is correct—and which result would force revision. Therapy, when relevant, is the same experiment in reverse: target → expected physiologic change → clinical endpoint → on-target toxicity.

**Chapter anchor:** ${topic.quizExplain}
`;
}

export function buildChapterSynthesis(topic: CatalogTopic): string {
  const checklist = topic.points
    .map((p, i) => `- [ ] ${i + 1}. I can teach: *${p}*`)
    .join("\n");

  return `## Synthesis, pitfalls, and self-check

### Chapter in one paragraph

**${topic.title}** (${yearLabel(topic.year)}; ${topic.contentCategory}; ${topic.organSystem}) is mastered when you can tell a continuous story through these anchors: ${topic.points.join("; ")}. The chapter’s teaching emphasis is: ${topic.quizExplain}

### Pitfalls this chapter is designed to prevent

1. Stopping at buzzwords without regulation or phenotype  
2. Treating each bullet as unrelated trivia instead of one pathway  
3. Missing the look-alike diagnosis or mechanism  
4. ${
    isClinical(topic.year)
      ? "Starting therapy without a reassessment clock"
      : "Stating a mechanism without a clinical consequence"
  }  
5. Confusing recognition of the title with the ability to teach the chapter aloud  

### Self-check

${checklist}
- [ ] I can teach the vignette in ≤2 minutes without notes.  
- [ ] I can name one can’t-miss alternative.  
- [ ] I can state the first action I would take if this appeared tonight.

### Ready for quiz

Pass threshold ≥80%. Afterward, add the flashcard (**${topic.cardFront}** → ${topic.cardBack}) to spaced repetition so the chapter does not collapse back into a summary.
`;
}

export function buildChapterVignette(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const stem =
    topic.vignette?.trim() ||
    (clinical
      ? `You are called about a patient whose presentation centers on **${topic.title}**. Decide what matters in the next minutes.`
      : `At the board, explain **${topic.title}**: mechanism, one clinical consequence, and one misconception.`);

  if (clinical) {
    return `## Case conference — ${topic.title}

### Stem

${stem}

### Work the case

1. Immediate priorities (ABCs / time-critical actions)  
2. Working diagnosis and can’t-miss alternative  
3. Two or three decision-changing data points  
4. Initial management in order  
5. One pitfall that commonly worsens care  

### Chapter rules to use

${topic.points.map((p) => `- ${p}`).join("\n")}

### Facilitator emphasis

${topic.quizExplain}

### Pocket card

**${topic.cardFront}** — ${topic.cardBack}
`;
  }

  return `## Board vignette — ${topic.title}

### Stem

${stem}

### Teach-back checklist

1. Narrate or sketch the pathway/structure.  
2. Mark each control point:  
${topic.points.map((p) => `   - ${p}`).join("\n")}
3. State one clinical or laboratory consequence.  
4. Correct one dangerous misconception.  
5. Link this chapter to a neighboring **${topic.organSystem}** or ${topic.contentCategory.toLowerCase()} lesson.

### Model emphasis

${topic.quizExplain}

### Pocket card

**${topic.cardFront}** — ${topic.cardBack}
`;
}
