import type { CatalogTopic } from "@/lib/curriculum/catalog/types";

function yearLabel(year: 1 | 2 | 3 | 4): string {
  if (year === 1) return "Year 1 — Mechanisms & Foundations";
  if (year === 2) return "Year 2 — Organ-System Pathophysiology";
  if (year === 3) return "Year 3 — Core Clerkship";
  return "Year 4 — Advanced / Sub-Internship";
}

function isClinical(year: 1 | 2 | 3 | 4): boolean {
  return year >= 3;
}

function domainLens(topic: CatalogTopic): string {
  const c = topic.contentCategory.toLowerCase();
  if (c.includes("biochem")) {
    return "Follow carbons, cofactors, compartmentation (cytosol vs mitochondria), and fed/fasting hormonal control. Ask which enzyme is rate-limiting and what allosteric signal flips it.";
  }
  if (c.includes("physio") || c.includes("pathophys")) {
    return "Separate structure, baseline tone/set-point, and acute regulation. Then predict the bedside vital-sign or lab signature of failure.";
  }
  if (c.includes("immuno") || c.includes("micro") || c.includes("id")) {
    return "Name the host defense layer (barrier, innate, adaptive) or pathogen strategy, then the clinical syndrome that follows when that layer fails.";
  }
  if (c.includes("pharm")) {
    return "State receptor/enzyme target, agonist vs antagonist logic, on-target therapeutic effect, and the toxicity that proves pathway engagement.";
  }
  if (c.includes("anatomy") || c.includes("embryo")) {
    return "Localize the structure in three dimensions, name its relationships, and connect malformation or injury to a precise deficit.";
  }
  if (
    c.includes("internal") ||
    c.includes("surgery") ||
    c.includes("pediatr") ||
    c.includes("obstetric") ||
    c.includes("gynecol") ||
    c.includes("psychiatr") ||
    c.includes("family") ||
    c.includes("advanced")
  ) {
    return "Sequence recognition → stabilization → decision-changing data → initial therapy → reassessment. Keep can’t-miss diagnoses on the board.";
  }
  return "Keep mechanism and phenotype coupled: every abstract claim should predict a finding you could defend on rounds.";
}

function expandPoint(point: string, topic: CatalogTopic, index: number): string {
  const n = index + 1;
  const clinical = isClinical(topic.year);
  if (clinical) {
    return `#### ${n}. ${point}

Treat this as a working rule at the bedside, not a slogan. When **${topic.title}** is in play, ask: *What must I do in the next minutes, what data confirms or refutes the working diagnosis, and what harm follows if I delay?*

**How it shows up.** ${point} shapes the history you take, the exam maneuvers you prioritize, and the first labs/imaging you order. Link each finding back to the organ system (**${topic.organSystem}**) so the case does not become a disconnected checklist.

**Why it matters clinically.** Missing or mis-ordering this step is a common source of preventable morbidity in ${topic.contentCategory.toLowerCase()} care. Write the next action in one sentence before you leave the room or the chart.

**Domain lens.** ${domainLens(topic)}

**How to study it.** Close the page and restate the rule, one confirmatory finding, and one look-alike that could fool you. If you cannot, re-read this section before the quiz. Keep the lesson’s teaching emphasis in view: *${topic.quizExplain}*
`;
  }

  return `#### ${n}. ${point}

Build this idea from first principles before you memorize a list. In **${topic.title}**, the teaching point above is a control node: something that changes rate, direction, structure, or signaling so that a predictable phenotype follows.

**Physiology / mechanism.** Explain *what* is regulated, *where* it sits in the pathway, and *what increases or decreases* its activity. Use the language of molecules, cells, or circuits in the **${topic.organSystem}** domain of ${topic.contentCategory.toLowerCase()}.

**Domain lens.** ${domainLens(topic)}

**Clinical bridge.** Name at least one bedside or laboratory consequence that must be true if this mechanism is operating. If you cannot name a consequence, you do not yet own the mechanism.

**Common misconception.** Students often treat this point as trivia. Instead, predict what happens if the node fails, is blocked pharmacologically, or is constitutively active—then check your prediction against the vignette and quiz. Correct teaching emphasis for this lesson: *${topic.quizExplain}*
`;
}

/** Opening chapter: framing, objectives, map of the lesson. */
export function buildChapterFraming(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const goals = clinical
    ? [
        "Recognize when this problem is present or imminent from history, exam, and early data.",
        "State the first stabilizing actions and the critical diagnoses not to miss.",
        "Choose an initial diagnostic and management pathway that is safe, sequenced, and explainable.",
        "Anticipate complications, disposition needs, and common cognitive traps.",
      ]
    : [
        "Explain the core mechanism aloud without notes, including regulators and failure modes.",
        "Predict the clinical or laboratory findings that must follow if the mechanism is true.",
        "Contrast this pathway with the most important look-alike mechanisms.",
        "Connect the idea to neighboring lessons in this organ-system or foundational block.",
      ];

  return `# ${topic.title}

**${yearLabel(topic.year)}** · ${topic.contentCategory} · ${topic.organSystem}${
    topic.physicianTask ? ` · Task focus: ${topic.physicianTask}` : ""
  }

## Why this chapter exists

${
  clinical
    ? `This chapter is written like a clerkship teaching conference, not a bullet sheet. **${topic.title}** is a pattern you will meet on wards, in clinic, and on call. The goal is that you can walk a team through *recognition → stabilization → diagnosis → initial management → pitfalls* with the same clarity you would expect from a well-edited textbook chapter.`
    : `This chapter is written like a preclerkship textbook section, not a flashcard stack. **${topic.title}** sits inside ${topic.contentCategory.toLowerCase()} and the **${topic.organSystem}** map. Read it to understand *mechanism → phenotype → clinical consequence*, then prove that understanding on the vignette and formative quiz.`
}

## Learning objectives

${goals.map((g, i) => `${i + 1}. ${g}`).join("\n")}

## How to read this lesson

1. Read **Foundations** once without taking notes—get the story.
2. Re-read **Core mechanisms / Clinical pathway** and sketch the flow from memory.
3. Use **Clinical correlation** to connect mechanism to a patient.
4. Finish with **Synthesis & pitfalls**, then teach the vignette answer out loud for two minutes.
5. Only then attempt the formative quiz (pass threshold ≥80%).

> **Integrity.** Original Online MD teaching aligned to USMLE Content Outline domains. Not copied from proprietary question banks or school LMS text. Verify doses, thresholds, and guidelines with primary sources before clinical use.
`;
}

/** Main didactic chapter expanded from teaching points. */
export function buildChapterCore(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const pointSections = topic.points
    .map((p, i) => expandPoint(p, topic, i))
    .join("\n");

  if (clinical) {
    return `## Clinical pathway — ${topic.title}

### The clinical story

On a busy service, **${topic.title}** usually announces itself as a cluster of symptoms, vital-sign changes, and risk factors rather than a single lab value. Begin with the patient’s stability: airway, breathing, circulation, disability, and exposure when the presentation is acute. Parallel to resuscitation, build a short differential that always includes the can’t-miss entities for **${topic.organSystem}** disease in ${topic.contentCategory}.

### Orientation to the domain

This lesson lives in **${topic.contentCategory}** with an organ-system focus on **${topic.organSystem}**. Keep that frame visible: every order and every reassessment should either support the working diagnosis, exclude a dangerous alternative, or buy time safely while you gather data.

### Stepwise teaching points

${pointSections}

### Diagnostic reasoning spine

Use a repeatable spine so the chapter becomes transferable to other cases:

1. **Syndrome first** — name the physiologic problem (shock, ischemia, obstruction, infection, metabolic failure, etc.).
2. **Time sensitivity** — decide what must happen in minutes vs hours.
3. **High-yield data** — choose tests that change management, not tests that decorate the chart.
4. **Initial therapy** — start disease-directed care when delay harms, while continuing to refine the diagnosis.
5. **Reassess** — after each intervention, ask whether perfusion, pain, gas exchange, mentation, or labs moved in the expected direction.

### Communication script (teach-back)

Practice saying: *“I think this is ${topic.title.toLowerCase()} because of X and Y. The danger if I’m wrong is Z. My next three actions are…”* If that sentence is fuzzy, the chapter is not finished for you yet.
`;
  }

  return `## Core mechanisms — ${topic.title}

### The scientific story

Before lists and mnemonics, hold a single narrative: in **${topic.title}**, a regulated process in the **${topic.organSystem}** domain is set up so that energy, structure, signaling, or host defense can meet physiologic demand. Disease appears when the process is absent, excessive, mistimed, or mislocalized. ${topic.contentCategory} gives you the vocabulary; clinical medicine asks you to predict the phenotype.

### Map of the chapter’s control points

The teaching points below are the “chapter headings inside the chapter.” Master each as a mini-section: definition → regulation → failure mode → clinical consequence.

${pointSections}

### From molecule to bedside

For every control point, complete this four-line note in your own words:

1. **Normal job** of the molecule/cell/circuit  
2. **What increases / decreases** its activity  
3. **Phenotype** when it fails or is overactive  
4. **One test or finding** that would support your explanation  

If you can fill those four lines without looking back, you are reading at textbook depth rather than skimming summaries.

### Pharmacologic and pathologic modifiers

Ask how drugs, toxins, genetic variants, inflammation, ischemia, or nutritional deficiency would shift the same pathway. This habit converts ${topic.contentCategory.toLowerCase()} facts into transferable Step 1 reasoning and prepares you for organ-system blocks in Year 2.
`;
}

/** Clinical correlation / applied chapter. */
export function buildChapterClinical(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const anchors = topic.points
    .slice(0, 4)
    .map((p, i) => `| ${i + 1} | ${p} | Restate the expected finding or next action |`)
    .join("\n");

  if (clinical) {
    return `## Bedside application — putting ${topic.title} to work

### Opening moves

When the chief concern suggests **${topic.title}**, protect the patient first. Stabilize ABCs as needed, obtain a focused history (onset, severity, associated features, medications, prior episodes), and perform a targeted exam of the **${topic.organSystem}** system while you decide what data you need immediately.

### Working differential

Keep a short differential that is *forced* to include:

- The most likely explanation given prevalence and the story  
- The most dangerous explanation you cannot afford to miss  
- One common mimic that shares surface features with **${topic.title}**

### Data that changes management

Order tests that branch the pathway. For each result, know in advance: *If positive, I do A; if negative, I do B.* Avoid shotgun panels that delay care without changing decisions in ${topic.contentCategory.toLowerCase()}.

### Initial management principles

Management in this chapter is educational scaffolding, not a substitute for institutional protocols or current guidelines:

1. Address life threats and reversible precipitants early.  
2. Start disease-directed therapy when waiting for perfect certainty would cause harm.  
3. Monitor the response on a short clock (minutes to hours, depending on acuity).  
4. Escalate early if the trajectory is wrong (ICU, surgery, specialty procedural care).  
5. Document the rationale so the next clinician can continue the same story.

### Teaching table — anchors from this lesson

| # | Teaching anchor | Your teach-back |
| --- | --- | --- |
${anchors}

### Disposition and follow-up thinking

Before leaving the case, state disposition needs (floor vs higher care), pending results, precautions, and what would make you bring the patient back to the bedside immediately. Clerkship excellence is often *reassessment literacy*, not only the first order set.
`;
  }

  return `## Clinical correlation — when ${topic.title} meets a patient

### Bridging basic science to the ward

A mechanism is mastered only when it predicts a person. For **${topic.title}**, translate each control point into something a clinician could observe: a symptom, exam finding, imaging pattern, lab disturbance, or pharmacologic effect within **${topic.organSystem}** care.

### Illustrative clinical threads

Use these threads while you study (they are teaching frames, not complete cases):

1. **Failure of regulation** — What syndrome appears when the pathway cannot meet demand?  
2. **Toxic or pharmacologic interruption** — What drug or toxin targets this node, and what bedside clue follows?  
3. **Genetic or developmental variant** — How would a congenital defect in this pathway present across the lifespan?  
4. **Inflammation, ischemia, or neoplasia** — How do tissue stress states remodel the same mechanism?

### High-yield correlation table

| # | Mechanism anchor | Clinical prediction to practice |
| --- | --- | --- |
${anchors}

### Laboratory and imaging logic

Do not memorize isolated lab names. Ask which result would rise, fall, or redistribute if your mechanism story is correct—and which result would force you to revise the story. That habit is the difference between summary notes and chapter-level understanding in ${topic.contentCategory.toLowerCase()}.

### Therapy as a physiologic experiment

When a treatment exists for this pathway, treat the drug as an experiment: receptor/enzyme target → expected physiologic change → clinical endpoint → toxicity that proves the same pathway was engaged. You will reuse that pattern across organ-system blocks.
`;
}

/** Synthesis, pitfalls, self-check. */
export function buildChapterSynthesis(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const checklist = topic.points
    .map((p, i) => `- [ ] ${i + 1}. I can explain: *${p}*`)
    .join("\n");

  return `## Synthesis, pitfalls, and self-check

### One-paragraph chapter summary

**${topic.title}** (${yearLabel(topic.year)}; ${topic.contentCategory}; ${topic.organSystem}) asks you to master a coherent story: ${
    clinical
      ? "recognize the syndrome, stabilize the patient, gather decision-changing data, start sequenced therapy, and avoid the traps that turn a recoverable case into a catastrophe."
      : "name the regulated process, locate its control points, predict the phenotype of failure, and carry that prediction to the bedside."
  } The teaching anchors of this chapter are: ${topic.points.join("; ")}.

### Dangerous pitfalls

1. **Summary-only studying** — recognizing the title without being able to teach the mechanism or pathway.  
2. **Isolated facts** — memorizing one bullet while ignoring how it links to the next step in the story.  
3. **Missing the look-alike** — failing to contrast **${topic.title}** with its most important mimic.  
4. **Skipping reassessment** — ${
    clinical
      ? "ordering therapy without a clock for response."
      : "stating a mechanism without naming a clinical consequence."
  }  
5. **Guideline theater** — reciting names of tests or drugs without knowing *why this one, why now*.

### Self-check (close the book)

${checklist}
- [ ] I can teach the vignette answer out loud in ≤2 minutes.
- [ ] I can name one can’t-miss alternative diagnosis or mechanism.
- [ ] I can state what I would do first if this appeared tonight on call / on an exam stem.

### Mastery gate for this lesson

You are ready for the formative quiz when you can reproduce the chapter’s story without scrolling. Pass requires ≥80%. Afterward, add the lesson flashcard to spaced repetition so the chapter does not decay into a vague summary again.

### Quiz preview (think before you click)

${topic.quizStem}

Correct choice teaching point: ${topic.quizExplain}
`;
}

/** Expanded vignette written like a textbook case box. */
export function buildChapterVignette(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const lead = topic.vignette?.trim();

  if (clinical) {
    return `## Case conference — ${topic.title}

### Stem

${
      lead && lead.length > 40
        ? lead
        : `A clerkship student is called about a patient whose presentation centers on **${topic.title}**. Vitals may be abnormal or trending the wrong way. The nurse asks what to do next.`
    }

### Your tasks (write before revealing your answer)

1. **Immediate priorities** — What do you protect or stabilize first?  
2. **Working diagnosis** — Why does **${topic.title}** fit, and what is the main can’t-miss alternative?  
3. **Next data** — Which 2–3 tests or findings would most change management?  
4. **Initial plan** — State the first therapeutic moves in order.  
5. **Pitfall** — Name one error that commonly worsens this case.

### Facilitator notes (after you attempt)

Anchor your discussion to these chapter rules:

${topic.points.map((p) => `- ${p}`).join("\n")}

Expected teaching emphasis: **${topic.quizExplain}**

### Take-home sentence

If you remember only one line from this case box: *${topic.cardFront} → ${topic.cardBack}.*
`;
  }

  return `## Board vignette — ${topic.title}

### Stem

${
    lead && lead.length > 40
      ? lead
      : `A classmate is asked at the board to explain **${topic.title}**. The facilitator wants mechanism, one clinical consequence, and one misconception—not a list of buzzwords.`
}

### Your tasks

1. Draw or narrate the pathway / structure from memory.  
2. Mark the key control points:  
${topic.points.map((p) => `   - ${p}`).join("\n")}
3. State one clinical or laboratory consequence that must follow.  
4. Name a dangerous misconception and correct it.  
5. Connect this chapter to a neighboring lesson in **${topic.organSystem}** or ${topic.contentCategory.toLowerCase()}.

### Model emphasis

${topic.quizExplain}

### Pocket card

**${topic.cardFront}**  
${topic.cardBack}
`;
}
