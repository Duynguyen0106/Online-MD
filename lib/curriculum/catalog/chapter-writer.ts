import type { CatalogTopic } from "@/lib/curriculum/catalog/types";
import { factualEnrichmentForTopic } from "@/lib/curriculum/catalog/factual-enrichment";
import { figuresMarkdownForTopic } from "@/lib/curriculum/catalog/chapter-figures";
import {
  diagnosticFrame,
  managementFrame,
  pathophysFrame,
  presentationFrame,
  topicSalt,
} from "@/lib/curriculum/catalog/section-frames";

function yearLabel(year: 1 | 2 | 3 | 4): string {
  if (year === 1) return "Year 1 — Mechanisms & Foundations";
  if (year === 2) return "Year 2 — Organ-System Pathophysiology";
  if (year === 3) return "Year 3 — Core Clerkship";
  return "Year 4 — Advanced / Sub-Internship";
}

function isClinical(year: 1 | 2 | 3 | 4): boolean {
  return year >= 3;
}

function pickOpener(openers: string[], topic: CatalogTopic, index: number): string {
  return openers[topicSalt(topic, index + 17) % openers.length];
}

function bridgeSynthesis(
  topic: CatalogTopic,
  section: "pathophys" | "clinical" | "diagnostic" | "management",
): string {
  const chain = topic.points.join(" → ");
  const title = topic.title;
  const organ = topic.organSystem;
  if (section === "pathophys") {
    return `### Pathway bridge

One continuous mechanism for **${title}** runs: ${chain}. Do not leave any node as an isolated buzzword—each step should predict the next regulator, failure mode, or phenotype inside the **${organ}** map.`;
  }
  if (section === "clinical") {
    return `### Presentation bridge

At the bedside, the same spine reads as a timed story: ${chain}. For **${title}**, ask which finding arrives first, which escalates acuity, and which mimic would share early features in **${organ}** disease.`;
  }
  if (section === "diagnostic") {
    return `### Diagnostic bridge

Map tests onto the chapter spine—${chain}—so each result confirms, revises, or falsifies a node in **${title}**. Prefer the smallest panel that changes the branch over an exhaustive **${organ}** workup.`;
  }
  return `### Management bridge

Therapy should walk the spine in reverse physiologic order: ${chain}. Name the class that acts on each critical node of **${title}**, one on-target toxicity, and the reassessment finding that would prove the pathway wrong in **${organ}** care.`;
}

/**
 * Turn a compact teaching bullet into textbook-style prose.
 * Declarative content only — no “fill in the blank” study prompts.
 * Keyword banks live once at topic level (pathophysiology), not on every point × section.
 */
function proseForPoint(
  point: string,
  topic: CatalogTopic,
  index: number,
  section: "pathophys" | "clinical" | "diagnostic" | "management",
): string {
  const n = index + 1;
  const title = topic.title;
  const organ = topic.organSystem;
  const cat = topic.contentCategory;
  const clinical = isClinical(topic.year);
  const neighbors = topic.points.filter((p) => p !== point);
  const neighborHint =
    neighbors.length > 0
      ? `Neighbor nodes in this chapter include: ${neighbors.slice(0, 3).join("; ")}.`
      : `Hold this node against the chapter emphasis: ${topic.quizExplain}`;

  if (section === "pathophys") {
    const openers = [
      `**${point}.** Begin here: this is a control point in the mechanism of **${title}** (${cat}; **${organ}**). Rate, direction, structure, or signaling can be increased, decreased, blocked, or driven constitutively at this node.`,
      `**${point}.** Regulation decides whether this node supports homeostasis or produces disease in **${title}**. Physiologic “on” and “off” signals belong in the same paragraph as the definition.`,
      `**${point}.** Failure at this node should predict a nameable phenotype—clinical finding, lab pattern, imaging clue, or drug effect—inside the **${organ}** map.`,
      `**${point}.** Discriminate this node from its neighbor in **${title}** by compartment, cofactor, hormonal state, or the syndrome that appears when only this step is hit.`,
      `**${point}.** Treat toxins and therapeutics that act here as pathway experiments: name the molecular target and the expected physiologic change before any regimen details.`,
      `**${point}.** When compensation at this node becomes maladaptive, that is usually where **${title}** declares itself clinically in **${organ}** teaching.`,
    ];
    const opener = pickOpener(openers, topic, index);
    return `### ${n}. ${point}

${opener}

State what increases or decreases activity at **${point}**, what fails when it is lost, and one bedside or laboratory finding that follows. ${neighborHint}
`;
  }

  if (section === "clinical") {
    const openers = clinical
      ? [
          `**${point}.** This rule often sorts acuity first in **${title}**. In ${cat} care focused on **${organ}**, privilege findings that would change the next timed action.`,
          `**${point}.** Once the syndrome is on the board, this checkpoint decides which symptoms and exam findings are decision-changing versus decorative.`,
          `**${point}.** Later in the encounter, this finding prevents premature closure—ask what look-alike in **${organ}** disease would share early features.`,
          `**${point}.** At reassessment, this presentation clue usually reveals whether the pathway identification was correct.`,
          `**${point}.** Vital-sign trajectory around this finding often outranks a single normal snapshot when **${title}** is evolving.`,
          `**${point}.** Pair this presentation clue with one red-flag alternative that would force escalation in the next 15 minutes.`,
        ]
      : [
          `**${point}.** Translate this mechanism node into what the patient reports and what you can elicit on exam when **${title}** is active.`,
          `**${point}.** Name the symptom–sign pair that follows when this control point fails inside **${organ}** disease.`,
          `**${point}.** Contrast the phenotype of loss-of-function versus gain-of-function at this node.`,
          `**${point}.** Identify the bedside finding that would force you to revise the mechanism story for **${title}**.`,
          `**${point}.** Convert regulation at this node into a timed clinical story—onset, progression, and associated features.`,
          `**${point}.** Ask which exam maneuver raises or lowers the probability of **${title}** versus its closest mimic.`,
        ];
    const opener = pickOpener(openers, topic, index);
    return `### ${n}. ${point}

${opener}

Build a hypothesis-driven history and exam around **${point}**: every element should support or weaken **${title}** or a can’t-miss alternative in the **${organ}** domain. ${neighborHint}
`;
  }

  if (section === "diagnostic") {
    const openers = clinical
      ? [
          `**${point}.** Choose data that change the branch for **${title}**—not tests that merely confirm what you already decided.`,
          `**${point}.** For this rule, know the if/then: *if A, do X; if B, do Y*. Decorative labs delay care.`,
          `**${point}.** Imaging and ECG/pathology correlation should map to the mechanism of **${title}**, not to a shopping list.`,
          `**${point}.** Reassessment labs are part of diagnosis: the wrong trajectory means the pathway was misidentified.`,
          `**${point}.** Bundle the first panel so results that matter for **${point}** return together when minutes matter.`,
          `**${point}.** Pre-commit to the branch this result would open before you order it for **${title}**.`,
        ]
      : [
          `**${point}.** Ask which laboratory or imaging result must rise, fall, or redistribute if this mechanism node is correct.`,
          `**${point}.** Treat diagnostics as experiments on **${title}**: expected pattern → revision rule if the pattern fails.`,
          `**${point}.** Discriminating studies separate this pathway from its closest look-alike in **${organ}** teaching.`,
          `**${point}.** Pathology or ECG correlation should land on a named structure or current when this node fails.`,
          `**${point}.** Prefer one falsifying study for **${point}** over an unfocused panel that never revises the story.`,
          `**${point}.** Link the expected result for **${point}** to the phenotype you would teach at the board.`,
        ];
    const opener = pickOpener(openers, topic, index);
    return `### ${n}. ${point}

${opener}

Prefer a short decision-changing panel tied to **${point}** over exhaustive testing. Exact cutoffs and institutional pathways belong to primary sources and current society guidance. ${neighborHint}
`;
  }

  // management
  const openers = clinical
    ? [
        `**${point}.** Initial therapy for **${title}** follows physiology: stabilize what is unstable, then start disease-directed care when delay harms.`,
        `**${point}.** Map this rule to a drug class or intervention class—mechanism of action first, then major on-target toxicities.`,
        `**${point}.** Sequencing matters: name what must precede the next agent, and what finding forces escalation.`,
        `**${point}.** Disposition and reassessment clocks are management, not afterthoughts, for **${organ}** presentations of **${title}**.`,
        `**${point}.** Tie this intervention to a physiologic goal (preload, afterload, rate, inflammation, source control, obstruction).`,
        `**${point}.** Name the monitoring need that proves this step helped—or that the pathway for **${title}** was wrong.`,
      ]
    : [
        `**${point}.** Name the therapeutic class that acts at this node and the expected physiologic change in **${title}**.`,
        `**${point}.** Pair every mechanism-targeted therapy with its major on-target toxicity or monitoring need.`,
        `**${point}.** Distinguish disease-modifying therapy from supportive care for congestion, perfusion, or inflammation.`,
        `**${point}.** Hold conceptual first-line thinking; verify exact regimens, dosing, and sequencing against current guidelines before clinical use.`,
        `**${point}.** Therapy reverses the pathway at **${point}**: target → physiologic change → clinical endpoint → toxicity.`,
        `**${point}.** Separate class identity from standing-order details—this page teaches mechanism, not institutional recipes.`,
      ];
  const opener = pickOpener(openers, topic, index);
  return `### ${n}. ${point}

${opener}

Hold conceptual first-line thinking for **${point}**; verify exact regimens elsewhere. ${neighborHint}

*Faculty marker: REFERENCE_REVIEW_REQUIRED — do not treat this chapter as a standing order set. Exact doses, durations, and numeric cutoffs require primary sources.*
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
    ? `This chapter develops **${topic.title}** for a clerkship learner using a fixed five-part structure: Core Pathophysiology → Clinical Presentation → Diagnostic Approach → Management & Pharmacology → High-Yield Board Pearl. It belongs to **${topic.contentCategory}** with primary focus on the **${topic.organSystem}** system.`
    : `This chapter develops **${topic.title}** for a preclerkship-to-clerkship learner using a fixed five-part structure: Core Pathophysiology → Clinical Presentation → Diagnostic Approach → Management & Pharmacology → High-Yield Board Pearl. It belongs to **${topic.contentCategory}** within the **${topic.organSystem}** map.`
}

## What this chapter covers

${pointList}

## Learning objectives

${
  clinical
    ? `1. Explain the core pathophysiology of **${topic.title}** without notes.\n2. Recognize typical and high-risk clinical presentations.\n3. Sequence a high-yield diagnostic approach (labs, imaging, ECG/pathology correlation).\n4. State first-line management classes, mechanisms, and major toxicities conceptually.\n5. Apply one board-ready pearl that separates this diagnosis from its look-alike.`
    : `1. Explain the core mechanism of **${topic.title}** without notes.\n2. Predict clinical presentation from pathway failure.\n3. Link diagnostics (labs/imaging/ECG/pathology) to mechanism.\n4. Name conceptual first-line pharmacologic/therapeutic classes and on-target toxicities.\n5. State one high-yield board pearl that prevents a common misconception.`
}

## How the chapter is organized

Five teaching sections follow this page. The clinical case is a short teach-back before the quiz (≥80% to pass).

> Original Online MD teaching aligned to USMLE Content Outline domains. Verify doses and guidelines with primary sources in clinical care.
`;
}

/** 1. Core Pathophysiology */
export function buildChapterPathophysiology(topic: CatalogTopic): string {
  const bank = factualEnrichmentForTopic(topic);
  const figures = figuresMarkdownForTopic(topic);
  const figuresBlock = figures ? `\n${figures}\n` : "";
  const sections = topic.points
    .map((p, i) => proseForPoint(p, topic, i, "pathophys"))
    .join("\n");

  return `## 1. Core Pathophysiology — ${topic.title}

${pathophysFrame(topic)}

### Scientific / physiologic frame

A regulated process in **${topic.organSystem}** ${topic.contentCategory.toLowerCase()} maintains homeostasis; disease appears when the process is deficient, excessive, mistimed, or mislocalized. **${topic.title}** develops cellular/molecular mechanisms, hemodynamics, or biochemistry in chapter form. Each heading below is a major control point.

### Key mechanism points

${bank || `Rebuild **${topic.title}** from the control-point sections below, tying each node to regulation and phenotype.`}
${figuresBlock}
### Control-point sections

${sections}

${bridgeSynthesis(topic, "pathophys")}

### Synthesis line

${topic.quizExplain}
`;
}

/** 2. Clinical Presentation */
export function buildChapterPresentation(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const sections = topic.points
    .map((p, i) => proseForPoint(p, topic, i, "clinical"))
    .join("\n");
  const teachBack = topic.points
    .map(
      (p, i) =>
        `${i + 1}. **${p}** — name one symptom, exam finding, or acuity signal yourself (this page does not fill that cell).`,
    )
    .join("\n");

  return `## 2. Clinical Presentation — ${topic.title}

${presentationFrame(topic)}

### How the patient looks

${
  clinical
    ? `Patients do not arrive labeled **${topic.title}**. They arrive with symptoms, vital-sign trajectories, and risk factors. Build the history around onset, severity, associated features, medications, prior episodes, and red-flag symptoms for **${topic.organSystem}** disease. The exam should be hypothesis-driven.`
    : `A preclerkship chapter is unfinished until the mechanism predicts a person. For **${topic.title}**, convert each control point into symptoms and physical findings inside **${topic.organSystem}** care.`
}

### Differential that stays honest

Carry three lines on the board:

1. Most likely explanation given base rate and the story  
2. Most dangerous explanation you cannot miss  
3. Common mimic that shares early features with **${topic.title}**

### Presentation anchors

${sections}

${bridgeSynthesis(topic, "clinical")}

### Teach-back

${teachBack}

**Remember:** ${topic.quizExplain}
`;
}

/** 3. Diagnostic Approach */
export function buildChapterDiagnostics(topic: CatalogTopic): string {
  const sections = topic.points
    .map((p, i) => proseForPoint(p, topic, i, "diagnostic"))
    .join("\n");

  return `## 3. Diagnostic Approach — ${topic.title}

${diagnosticFrame(topic)}

### High-yield data strategy

Choose tests that change management. For each major result, know the branch: *if A, do X; if B, do Y*. Correlate labs, imaging, and ECG/pathology with the mechanism of **${topic.title}** rather than collecting an unfocused panel.

### Decision spine

1. **Syndrome** — What is failing?  
2. **Time** — Minutes versus hours?  
3. **Discriminating data** — Which tests change the branch point?  
4. **Initial therapy readiness** — What starts before perfect certainty when delay harms?  
5. **Reassessment** — What finding says the pathway is working or wrong?

### Diagnostic nodes

${sections}

${bridgeSynthesis(topic, "diagnostic")}

### Chapter rules — teach-back

${topic.points
  .map(
    (p, i) =>
      `${i + 1}. **${p}** — name one decision-changing lab, imaging, ECG, or pathology correlate yourself.`,
  )
  .join("\n")}

Exact numeric cutoffs belong to current guidelines and institutional pathways — *REFERENCE_REVIEW_REQUIRED*.
`;
}

/** 4. Management & Pharmacology */
export function buildChapterManagement(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const sections = topic.points
    .map((p, i) => proseForPoint(p, topic, i, "management"))
    .join("\n");

  return `## 4. Management & Pharmacology — ${topic.title}

${managementFrame(topic)}

### First-line thinking (conceptual)

${
  clinical
    ? `Stabilize ABCs and time-critical threats in parallel with diagnosis when needed. Start disease-directed therapy when waiting for certainty causes harm, then reassess on a short clock. Map interventions to physiology inside **${topic.organSystem}** care for **${topic.title}**.`
    : `Therapy is the mechanism experiment in reverse: target → expected physiologic change → clinical endpoint → on-target toxicity. Learn classes and rationale for **${topic.title}**; verify exact regimens elsewhere.`
}

### Pharmacologic / interventional nodes

${sections}

${bridgeSynthesis(topic, "management")}

### Toxicity & monitoring literacy

For every major class you name, state one major adverse effect and one monitoring or reassessment cue. Do not invent doses, infusion recipes, or standing order sets from this page.

### Disposition thinking

Before leaving the case, state level of care, pending results, precautions, and what would force immediate return to the bedside.

*Faculty marker: REFERENCE_REVIEW_REQUIRED — attach verified citations for **${topic.title}** before claiming guideline currency.*
`;
}

/** 5. High-Yield Board Pearl */
export function buildChapterBoardPearl(topic: CatalogTopic): string {
  const checklist = topic.points
    .map((p, i) => `- [ ] ${i + 1}. I can teach: *${p}*`)
    .join("\n");

  return `## 5. High-Yield Board Pearl — ${topic.title}

### USMLE Step 1 / Step 2 CK takeaway

**${topic.title}** (${yearLabel(topic.year)}; ${topic.contentCategory}; ${topic.organSystem}) is mastered when you can tell a continuous story through these anchors: ${topic.points.join("; ")}.

**Board pearl:** ${topic.quizExplain}

**Pocket card:** **${topic.cardFront}** → ${topic.cardBack}

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
6. Treating educational text as a source of unverified doses or numeric cutoffs  

### Self-check

${checklist}
- [ ] I can teach the vignette in ≤2 minutes without notes.  
- [ ] I can name one can’t-miss alternative.  
- [ ] I can state the first conceptual action I would take if this appeared tonight.
- [ ] I can state one major drug-class toxicity or monitoring need.

### Ready for quiz

Pass threshold ≥80%. Afterward, add the flashcard (**${topic.cardFront}** → ${topic.cardBack}) to spaced repetition so the chapter does not collapse back into a summary.

### Sources

Citations for this lesson are being verified by faculty. Treat doses, numeric cutoffs, and trial statistics as belonging to primary sources and current society guidance — not as standalone orders from this page.

*Faculty marker: REFERENCE_REVIEW_REQUIRED — attach verified citations for **${topic.title}** in medical review before claiming guideline currency.*
`;
}

/** @deprecated Prefer buildChapterPathophysiology — kept for transitional imports/tests. */
export function buildChapterCore(topic: CatalogTopic): string {
  return buildChapterPathophysiology(topic);
}

/** @deprecated Prefer buildChapterPresentation — kept for transitional imports/tests. */
export function buildChapterClinical(topic: CatalogTopic): string {
  return buildChapterPresentation(topic);
}

/** @deprecated Prefer buildChapterBoardPearl — kept for transitional imports/tests. */
export function buildChapterSynthesis(topic: CatalogTopic): string {
  return buildChapterBoardPearl(topic);
}

/** True when the stored vignette is a meta study-prompt rather than a case stem. */
function isThinVignette(vignette: string | undefined): boolean {
  const v = vignette?.trim() ?? "";
  if (v.length < 200) return true;
  return (
    /Teach .+ using mechanism/i.test(v) ||
    /A learner is asked to explain/i.test(v) ||
    /Outline the mechanism, one clinical consequence/i.test(v) ||
    /On rounds, a patient presentation hinges on/i.test(v) ||
    /State the mechanism, expected findings/i.test(v)
  );
}

/**
 * Synthesize a declarative case/board stem from topic metadata when the
 * catalog vignette is only a study prompt.
 */
function synthesizeVignetteStem(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const p0 = topic.points[0] ?? topic.title;
  const p1 = topic.points[1] ?? topic.cardFront;
  const p2 = topic.points[2] ?? topic.cardBack;
  const anchors = [p0, p1, p2].filter(Boolean);

  if (clinical) {
    return `A patient presents for care in the **${topic.organSystem}** domain with a problem that centers on **${topic.title}** (${topic.contentCategory}).

Early clues align with this chapter rule: *${anchors[0]}*. As the encounter unfolds, a second decision point appears: *${anchors[1]}*.${
      anchors[2] ? ` A third checkpoint—*${anchors[2]}*—separates the leading diagnosis from a can’t-miss alternative.` : ""
    }

Vital signs, focused exam, and the first labs/imaging must sort acuity from deferrable detail. Your task is to name the syndrome, the most dangerous mimic, the two or three data points that change the branch, and the first timed actions—before perfect certainty—consistent with: ${topic.quizExplain}

Pocket emphasis while you work: **${topic.cardFront}** → ${topic.cardBack}.`;
  }

  return `At the teaching board you must explain **${topic.title}** (${topic.contentCategory}; **${topic.organSystem}**) as a continuous mechanism story—not a buzzword list.

Start with this control point: *${anchors[0]}*. Show how it is regulated and what phenotype appears when it fails. Then connect the next node: *${anchors[1]}*.${
    anchors[2] ? ` Close the pathway with: *${anchors[2]}*.` : ""
  }

End by stating one bedside or laboratory consequence and one misconception that would harm a patient if believed. The chapter’s emphasis is: ${topic.quizExplain}

Memory hook: **${topic.cardFront}** → ${topic.cardBack}.`;
}

export function buildChapterVignette(topic: CatalogTopic): string {
  const clinical = isClinical(topic.year);
  const raw = topic.vignette?.trim() ?? "";
  const stem = isThinVignette(raw) ? synthesizeVignetteStem(topic) : raw;

  if (clinical) {
    return `## Case conference — ${topic.title}

### Stem

${stem}

### Work the case (map to the five-part chapter)

1. **Pathophysiology** — What is the dominant failure mode?  
2. **Presentation** — Working diagnosis and can’t-miss alternative  
3. **Diagnostics** — Two or three decision-changing data points  
4. **Management** — Initial management in physiologic order (conceptual)  
5. **Board pearl** — One pitfall that commonly worsens care  

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

### Teach-back checklist (five-part)

1. Narrate **Core Pathophysiology** (or sketch the pathway/structure).  
2. Mark each control point:  
${topic.points.map((p) => `   - ${p}`).join("\n")}
3. State **Clinical Presentation** consequences.  
4. Name one **Diagnostic** correlate (lab/imaging/ECG/pathology).  
5. State one **Management** class + major toxicity conceptually, then one **Board Pearl**.

### Model emphasis

${topic.quizExplain}

### Pocket card

**${topic.cardFront}** — ${topic.cardBack}
`;
}
