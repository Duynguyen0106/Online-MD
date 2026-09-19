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
 * Each section leads with point-specific enrichment; scaffolding is short and varied.
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
  const factsBlock = localFacts
    ? `${localFacts}\n\n`
    : `**${point}** is a primary teaching node in **${title}**. State what increases or decreases its activity, what fails when it is lost, and what bedside or laboratory finding follows.\n\n`;

  if (clinical) {
    const openers = [
      `**${point}.** This is often the first branch that sorts acuity in **${title}**. In ${cat} care focused on **${organ}**, treat it as a rule that changes orders in the first minutes—not as background reading.`,
      `**${point}.** Once the syndrome of **${title}** is on the board, this rule decides which data are decision-changing versus decorative. Privilege findings that would alter the next action for a **${organ}** problem.`,
      `**${point}.** Later in the encounter, this checkpoint prevents premature closure. Ask what look-alike in **${organ}** disease would be worsened by the same first move used for **${title}**.`,
      `**${point}.** Use this rule at reassessment: if the trajectory after initial therapy is wrong, this is usually where the pathway was misidentified.`,
    ];
    const opener = openers[Math.min(index, openers.length - 1)];

    return `### ${n}. ${point}

${opener}

${factsBlock}Translate the rule into a timed plan: stabilize what is unstable, obtain the two or three results that change the branch, start disease-directed therapy when delay harms, and name the finding that would force escalation. Exact doses belong to current guidelines; the chapter skill is the physiologic order of operations for **${title}**.
`;
  }

  const openers = [
    `**${point}.** Begin here: this is a control point in the mechanism of **${title}** (${cat}; **${organ}**). Rate, direction, structure, or signaling can be increased, decreased, blocked, or driven constitutively at this node.`,
    `**${point}.** Regulation decides whether this node supports homeostasis or produces disease in **${title}**. Physiologic “on” and “off” signals (substrates, hormones, energy charge, hypoxia, inflammatory mediators, drugs, variants) belong in the same paragraph as the definition.`,
    `**${point}.** Failure at this node should predict a nameable phenotype—clinical finding, lab pattern, imaging clue, or drug effect—inside the **${organ}** map. If you cannot name the phenotype, the mechanism is still incomplete.`,
    `**${point}.** Discriminate this node from its neighbor in **${title}** by compartment, cofactor, hormonal state (fed/fasting), or the syndrome that appears when only this step is hit.`,
  ];
  const opener = openers[Math.min(index, openers.length - 1)];

  return `### ${n}. ${point}

${opener}

${factsBlock}Toxins and therapeutics that act here are experiments on the pathway: name the target, the expected physiologic change, and the on-target toxicity. Hold the control point, its regulators, and one phenotype as a single teachable paragraph.
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
    .map(
      (p, i) =>
        `| ${i + 1} | ${p} | ${
          clinical
            ? "Decision-changing finding or next timed action"
            : "Expected phenotype, lab, or drug effect"
        } |`,
    )
    .join("\n");

  if (clinical) {
    return `## Applied care — ${topic.title}

### Recognition

Build the history around onset, severity, associated features, medications, prior episodes, and red-flag symptoms for **${topic.organSystem}** disease. The exam should be hypothesis-driven: every maneuver should support or weaken **${topic.title}** or a can’t-miss alternative.

### Differential that stays honest

Carry three lines on the board:

1. Most likely explanation given base rate and the story  
2. Most dangerous explanation you cannot miss  
3. Common mimic that shares early features with **${topic.title}**

### Data and therapy

Choose tests that change management. For each major result, know the branch: *if A, do X; if B, do Y*. Start disease-directed therapy when waiting for certainty causes harm, then reassess on a short clock. Exact drug doses and institutional pathways belong to current guidelines—this chapter teaches the physiologic order of operations.

### Working table

| # | Chapter rule | Clinical prediction |
| --- | --- | --- |
${rows}

### Disposition thinking

Before leaving the case, state level of care, pending results, precautions, and what would force immediate return to the bedside. Reassessment literacy is part of the chapter, not an afterthought.

**Remember:** ${topic.quizExplain}
`;
  }

  return `## Clinical correlation — ${topic.title}

### From mechanism to a person

A preclerkship chapter is unfinished until the mechanism predicts a patient. For each control point in **${topic.title}**, name a symptom, exam finding, imaging pattern, lab disturbance, or drug effect inside **${topic.organSystem}** care.

### Clinical threads

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
