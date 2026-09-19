/**
 * Teaching figures for catalog chapters.
 * Reusable SVG schematics matched by topic keywords; only attached when
 * they clarify a mechanism, pathway, axis, or decision fork.
 */
import fs from "fs";
import path from "path";
import type { CatalogTopic } from "@/lib/curriculum/catalog/types";

export type ChapterFigure = {
  id: string;
  title: string;
  caption: string;
  /** Match against title + points + category + organ blob */
  test: RegExp;
  /** Prefer not attaching to unrelated categories even if keyword hits */
  categories?: RegExp;
  /** When set, topic title must also match (blocks tangential point hits) */
  titleTest?: RegExp;
  svg: string;
};

function svgShell(w: number, h: number, body: string, aria: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${aria}">
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#2f6f5e"/>
    </marker>
  </defs>
  <rect width="100%" height="100%" fill="#f7faf8"/>
  <rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="#c5d4cb" stroke-width="1"/>
  ${body}
</svg>`;
}

const ink = "#1a3a2f";
const brand = "#2f6f5e";
const accent = "#b86b3c";
const muted = "#5c7268";
const soft = "#e3eee8";

function box(x: number, y: number, w: number, h: number, label: string, fill = soft) {
  const lines = label.split("\n");
  const ty = y + h / 2 - ((lines.length - 1) * 7);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${brand}" stroke-width="1.5"/>
  ${lines.map((ln, i) => `<text x="${x + w / 2}" y="${ty + i * 14}" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="${ink}">${ln}</text>`).join("\n")}`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, label = "") {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${brand}" stroke-width="2" marker-end="url(#ah)"/>
  ${label ? `<text x="${midX}" y="${midY - 6}" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="${accent}">${label}</text>` : ""}`;
}

function title(t: string) {
  return `<text x="24" y="28" font-family="Georgia, serif" font-size="16" font-weight="700" fill="${ink}">${t}</text>`;
}

/** Figure library — add only when the schematic teaches something words alone obscure. */
export const CHAPTER_FIGURES: ChapterFigure[] = [
  {
    id: "glycolysis-control",
    title: "Glycolysis control points",
    caption: "Hexokinase/glucokinase, PFK-1, and pyruvate kinase are the major regulated steps; F2,6BP and energy charge set PFK-1 tone.",
    test: /glycolys|pfk|hexokinase|glucokinase|pyruvate kinase/i,
    categories: /biochem|pathophysiol/i,
    svg: svgShell(640, 280, `
      ${title("Glycolysis — regulated nodes")}
      ${box(40, 70, 120, 50, "Glucose")}
      ${arrow(160, 95, 210, 95)}
      ${box(210, 70, 130, 50, "G6P", "#f3e8df")}
      ${arrow(340, 95, 390, 95, "HK/GK")}
      ${box(390, 70, 120, 50, "F6P")}
      ${arrow(280, 120, 280, 160)}
      ${box(220, 160, 120, 55, "PFK-1\n(committed)", "#f3e8df")}
      ${arrow(340, 187, 400, 187, "F2,6BP↑")}
      ${box(400, 160, 130, 55, "F1,6BP")}
      ${arrow(465, 215, 465, 240)}
      ${box(400, 240, 180, 28, "→ Pyruvate (PK)", soft)}
      <text x="40" y="250" font-family="Georgia, serif" font-size="11" fill="${muted}">Fed: insulin ↑ F2,6BP → PFK-1 on · Fasting: glucagon ↓ F2,6BP</text>
    `, "Glycolysis control points schematic"),
  },
  {
    id: "fed-fasting",
    title: "Fed versus fasting integration",
    caption: "Insulin and glucagon flip pathway direction across liver glycolysis/gluconeogenesis, glycogen, and ketogenesis.",
    test: /fed.?fasting|gluconeogenes|glycogen|ketone body|metabolic integration/i,
    categories: /biochem|pathophysiol|endocrin/i,
    svg: svgShell(640, 260, `
      ${title("Fed vs fasting — hepatic switch")}
      ${box(40, 80, 160, 70, "FED\nInsulin high", "#dceee6")}
      ${box(240, 80, 160, 70, "Liver\nGlycolysis ↑\nGlycogen ↑", soft)}
      ${box(440, 80, 160, 70, "Peripheral\nGlucose uptake", soft)}
      ${box(40, 175, 160, 70, "FASTING\nGlucagon high", "#f3e8df")}
      ${box(240, 175, 160, 70, "Liver\nGluconeogenesis ↑\nKetones ↑", soft)}
      ${box(440, 175, 160, 70, "Brain\nUses glucose\n± ketones", soft)}
      ${arrow(200, 115, 240, 115)}
      ${arrow(200, 210, 240, 210)}
    `, "Fed versus fasting metabolic integration"),
  },
  {
    id: "etc-oxphos",
    title: "ETC and oxidative phosphorylation",
    caption: "Complexes I–IV pump protons; ATP synthase uses the gradient. Site-specific poisons and uncouplers create distinct toxidromes.",
    test: /etc|electron transport|oxphos|oxidative phosphorylation|uncoupl|complex i/i,
    categories: /biochem/i,
    svg: svgShell(640, 240, `
      ${title("ETC → proton motive force → ATP")}
      ${box(30, 90, 90, 45, "I")}
      ${box(140, 90, 90, 45, "II")}
      ${box(250, 90, 90, 45, "III")}
      ${box(360, 90, 90, 45, "IV")}
      ${box(490, 90, 120, 45, "ATP\nsynthase", "#f3e8df")}
      ${arrow(120, 112, 140, 112)}
      ${arrow(230, 112, 250, 112)}
      ${arrow(340, 112, 360, 112)}
      ${arrow(450, 112, 490, 112)}
      <text x="30" y="170" font-family="Georgia, serif" font-size="12" fill="${muted}">NADH/FADH₂ → e⁻ → O₂ · H⁺ pumped out · ATP when H⁺ returns</text>
      <text x="30" y="195" font-family="Georgia, serif" font-size="12" fill="${accent}">Cyanide/CO @ IV · Oligomycin @ synthase · Uncouplers: heat, ↓ATP</text>
    `, "Electron transport chain schematic"),
  },
  {
    id: "shock-phenotypes",
    title: "Shock phenotype fork",
    caption: "Name pump, pipe, or tank failure before fluids or pressors — the wrong first move worsens the other phenotypes.",
    test: /shock|septic shock|cardiogenic|hypovolemic|obstructive shock|microcirculation/i,
    categories: /pathophysiol|clinical|internal|advanced|surgery/i,
    svg: svgShell(640, 270, `
      ${title("Shock — match therapy to failure mode")}
      ${box(240, 55, 160, 40, "Low perfusion")}
      ${arrow(200, 95, 120, 130)}
      ${arrow(320, 95, 320, 130)}
      ${arrow(440, 95, 520, 130)}
      ${box(40, 135, 150, 55, "Hypovolemic\nVolume / bleed", "#f3e8df")}
      ${box(220, 135, 150, 55, "Distributive\nSepsis / anaphylaxis", soft)}
      ${box(400, 135, 150, 55, "Cardiogenic\nPump failure", soft)}
      ${box(245, 210, 150, 45, "Obstructive\nPE / tamponade", "#e8eef3")}
      <text x="40" y="255" font-family="Georgia, serif" font-size="11" fill="${muted}">Fluids help some · harm others · Relieving obstruction is the therapy for obstructive shock</text>
    `, "Shock phenotype decision fork"),
  },
  {
    id: "raas-axis",
    title: "RAAS axis",
    caption: "Renin → angiotensin II → aldosterone / vasoconstriction. ACE inhibitors, ARBs, and MRAs interrupt different nodes.",
    test: /raas|renin|angiotensin|aldosterone|ace inhibitor|\barb\b/i,
    categories: /pharmacol|pathophysiol|renal|clinical|internal/i,
    svg: svgShell(640, 250, `
      ${title("Renin–angiotensin–aldosterone")}
      ${box(40, 80, 120, 45, "↓ renal\nperfusion")}
      ${arrow(160, 102, 210, 102)}
      ${box(210, 80, 100, 45, "Renin")}
      ${arrow(310, 102, 360, 102)}
      ${box(360, 80, 100, 45, "Ang I")}
      ${arrow(460, 102, 510, 102, "ACE")}
      ${box(510, 80, 100, 45, "Ang II", "#f3e8df")}
      ${arrow(560, 125, 560, 160)}
      ${box(480, 160, 140, 55, "Aldosterone\n+ vasoconstriction", soft)}
      <text x="40" y="220" font-family="Georgia, serif" font-size="12" fill="${accent}">Drug nodes: ACEI · ARB · MRA · renin inhibitor</text>
    `, "RAAS pathway schematic"),
  },
  {
    id: "nephron-map",
    title: "Nephron transport map",
    caption: "Segment-specific transporters explain diuretic class and electrolyte effects.",
    test: /nephron|tubular transport|loop diuretic|thiazide|spironolactone|thick ascending/i,
    categories: /pathophysiol|pharmacol|renal/i,
    svg: svgShell(640, 260, `
      ${title("Nephron — diuretic targets")}
      ${box(30, 90, 100, 50, "PCT\nCA / SGLT")}
      ${box(150, 90, 120, 50, "TAL\nNKCC2", "#f3e8df")}
      ${box(290, 90, 120, 50, "DCT\nNCC", soft)}
      ${box(430, 90, 120, 50, "CD\nENaC/AQP", soft)}
      ${arrow(130, 115, 150, 115)}
      ${arrow(270, 115, 290, 115)}
      ${arrow(410, 115, 430, 115)}
      <text x="150" y="170" font-family="Georgia, serif" font-size="11" fill="${accent}">Loops @ NKCC2</text>
      <text x="300" y="170" font-family="Georgia, serif" font-size="11" fill="${accent}">Thiazides @ NCC</text>
      <text x="440" y="170" font-family="Georgia, serif" font-size="11" fill="${accent}">MRA / amiloride</text>
      <text x="30" y="220" font-family="Georgia, serif" font-size="12" fill="${muted}">Where you block Na⁺ reabsorption predicts K⁺, Ca²⁺, and volume effects</text>
    `, "Nephron diuretic target map"),
  },
  {
    id: "hpo-axis",
    title: "HPO reproductive axis",
    caption: "GnRH pulses → FSH/LH → ovary/testis → sex steroids with negative feedback (and midcycle positive feedback for LH surge).",
    test: /menstrual|hpo|gnrh|follicular|luteal|reproductive endocrinology|lh surge/i,
    categories: /pathophysiol|endocrin|obstetric|reproduct/i,
    svg: svgShell(640, 270, `
      ${title("Hypothalamic–pituitary–ovarian axis")}
      ${box(240, 55, 160, 40, "Hypothalamus\nGnRH pulses")}
      ${arrow(320, 95, 320, 120)}
      ${box(240, 120, 160, 40, "Pituitary\nFSH / LH")}
      ${arrow(320, 160, 320, 185)}
      ${box(240, 185, 160, 45, "Ovary\nE2 / P4", "#f3e8df")}
      <path d="M220 205 Q80 140 240 75" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="50" y="140" font-family="Georgia, serif" font-size="11" fill="${accent}">Feedback</text>
      <text x="40" y="250" font-family="Georgia, serif" font-size="11" fill="${muted}">Midcycle: high E2 → positive feedback → LH surge → ovulation</text>
    `, "HPO axis schematic"),
  },
  {
    id: "action-potential",
    title: "Cardiac action potential phases",
    caption: "Phase 0 Na⁺ upstroke, plateau Ca²⁺, repolarization K⁺ — antiarrhythmic classes map to these currents.",
    test: /action potential|vaughan williams|antiarrhythmic|phase 0|qt prolong|torsad/i,
    categories: /pharmacol|pathophysiol|cardiovascular|clinical|internal/i,
    svg: svgShell(640, 260, `
      ${title("Ventricular action potential → drug classes")}
      <polyline points="60,180 100,180 130,70 180,90 320,90 400,180 560,180" fill="none" stroke="${brand}" stroke-width="3"/>
      <text x="115" y="60" font-family="Georgia, serif" font-size="12" fill="${accent}">0 Na⁺ (I)</text>
      <text x="230" y="80" font-family="Georgia, serif" font-size="12" fill="${accent}">2 Ca²⁺</text>
      <text x="350" y="140" font-family="Georgia, serif" font-size="12" fill="${accent}">3 K⁺ (III)</text>
      <text x="60" y="210" font-family="Georgia, serif" font-size="12" fill="${muted}">Class I: Na⁺ block · II: β-block · III: K⁺ block · IV: Ca²⁺ (nodal)</text>
      <text x="60" y="235" font-family="Georgia, serif" font-size="12" fill="${muted}">Ic contraindicated in structural heart disease · III: watch QTc</text>
    `, "Cardiac action potential and drug classes"),
  },
  {
    id: "hypersensitivity",
    title: "Hypersensitivity types I–IV",
    caption: "I immediate IgE; II cytotoxic antibody; III immune complex; IV delayed T-cell — each predicts a different clinical pattern.",
    test: /hypersensitivity|anaphylaxis|type i|type iv|immune complex|delayed.?type/i,
    categories: /immunol|pathophysiol|clinical|pediatr/i,
    svg: svgShell(640, 250, `
      ${title("Hypersensitivity map")}
      ${box(30, 80, 130, 70, "I\nIgE / mast\nAnaphylaxis", "#f3e8df")}
      ${box(180, 80, 130, 70, "II\nIgG/IgM\nCytotoxic", soft)}
      ${box(330, 80, 130, 70, "III\nComplexes\nSerum sickness", soft)}
      ${box(480, 80, 130, 70, "IV\nT cells\nTB skin / contact", soft)}
      <text x="30" y="190" font-family="Georgia, serif" font-size="12" fill="${muted}">Epinephrine first in anaphylaxis · Type IV is not histamine-primary</text>
    `, "Hypersensitivity types schematic"),
  },
  {
    id: "coagulation-fork",
    title: "Primary vs secondary hemostasis",
    caption: "Platelet plug versus fibrin clot — mucocutaneous vs deep bleeding guides the first labs and therapies.",
    test: /gi bleed|variceal bleed|melena|hematemesis|\bvte\b|venous thrombo|pulmonary embol|\bpe workup\b|wells score|atrial fibril|anticoagulat|hemostasis pathology|primary vs secondary hemostasis/i,
    titleTest: /bleed|vte|thrombo|embol|fibril|anticoag|hemostasis|coagulat|wells|platelet|warfarin|doac/i,
    categories: /clinical|internal|advanced|pathophysiol|surgery|family/i,
    svg: svgShell(640, 250, `
      ${title("Hemostasis fork")}
      ${box(220, 55, 200, 40, "Vessel injury")}
      ${arrow(200, 95, 120, 130)}
      ${arrow(440, 95, 520, 130)}
      ${box(40, 135, 180, 60, "Primary\nPlatelets / vWF\nMucocutaneous bleed", "#f3e8df")}
      ${box(420, 135, 180, 60, "Secondary\nCoagulation factors\nDeep/joint bleed", soft)}
      <text x="40" y="230" font-family="Georgia, serif" font-size="12" fill="${muted}">Antiplatelets vs anticoagulants hit different arms — match drug to mechanism</text>
    `, "Hemostasis primary versus secondary"),
  },
  {
    id: "acid-base-fork",
    title: "Acid–base first branch",
    caption: "pH → primary process → anion gap / compensation check before naming the cause list.",
    test: /acid.?base|anion gap|metabolic acidosis|respiratory alkalosis|winter/i,
    categories: /pathophysiol|clinical|internal|advanced|renal/i,
    svg: svgShell(640, 270, `
      ${title("Acid–base decision spine")}
      ${box(240, 50, 160, 35, "Look at pH")}
      ${arrow(200, 85, 120, 120)}
      ${arrow(440, 85, 520, 120)}
      ${box(40, 125, 160, 45, "Acidemia")}
      ${box(440, 125, 160, 45, "Alkalemia")}
      ${arrow(120, 170, 120, 200)}
      ${box(40, 200, 160, 50, "Metabolic vs\nrespiratory", "#f3e8df")}
      ${box(240, 200, 160, 50, "Anion gap?\nCompensation?", soft)}
      <text x="420" y="230" font-family="Georgia, serif" font-size="11" fill="${muted}">Then cause list</text>
    `, "Acid-base diagnostic fork"),
  },
  {
    id: "aki-branches",
    title: "AKI pre-renal / intrinsic / post-renal",
    caption: "Volume and obstruction first; then ATN/AIN/glomerular forks with urine studies.",
    test: /\baki\b|acute kidney|prerenal|\batn\b|hydronephr|oligur/i,
    categories: /pathophysiol|clinical|internal|renal|advanced/i,
    svg: svgShell(640, 250, `
      ${title("AKI — three buckets")}
      ${box(40, 90, 160, 70, "Pre-renal\nPerfusion\nFeNa low*", "#f3e8df")}
      ${box(240, 90, 160, 70, "Intrinsic\nATN / AIN\nGN / vascular", soft)}
      ${box(440, 90, 160, 70, "Post-renal\nObstruction\nBladder scan", soft)}
      <text x="40" y="200" font-family="Georgia, serif" font-size="12" fill="${muted}">*Context matters after diuretics · Image early when obstruction plausible</text>
    `, "AKI classification schematic"),
  },
  {
    id: "stroke-clock",
    title: "Hyperacute stroke clock",
    caption: "Last known well → glucose → noncontrast CT → lytic/thrombectomy eligibility.",
    test: /\bstroke\b|nihss|thrombolysis|last known well|large.?vessel|\btpa\b|\btnk\b/i,
    categories: /clinical|internal|advanced|pathophysiol|nervous/i,
    svg: svgShell(640, 240, `
      ${title("Stroke — time-critical sequence")}
      ${box(30, 90, 110, 50, "LKW\ntime")}
      ${arrow(140, 115, 170, 115)}
      ${box(170, 90, 110, 50, "ABCs\nGlucose")}
      ${arrow(280, 115, 310, 115)}
      ${box(310, 90, 110, 50, "CT ±\nvessels")}
      ${arrow(420, 115, 450, 115)}
      ${box(450, 90, 160, 50, "Lytic /\nthrombectomy", "#f3e8df")}
      <text x="30" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Hemorrhage excludes lysis · LVO opens endovascular pathways</text>
    `, "Acute stroke workflow schematic"),
  },
  {
    id: "dka-hhs",
    title: "DKA versus HHS",
    caption: "Gap acidosis + ketones (DKA) versus extreme hyperosmolality with profound dehydration (HHS).",
    test: /\bdka\b|\bhhs\b|diabetic keto|ketoacidosis/i,
    categories: /pathophysiol|clinical|internal|endocrin|advanced|pediatr/i,
    svg: svgShell(640, 250, `
      ${title("DKA vs HHS")}
      ${box(40, 80, 250, 100, "DKA\nAnion-gap acidosis\nKetones +\nInsulin ± K⁺ protocol", "#f3e8df")}
      ${box(350, 80, 250, 100, "HHS\nVery high glucose\nHigh osmolality\nVolume first", soft)}
      <text x="40" y="220" font-family="Georgia, serif" font-size="12" fill="${muted}">Both: trigger search · Avoid overly rapid osmolality shifts · Overlap insulin when transitioning</text>
    `, "DKA versus HHS comparison"),
  },
  {
    id: "maternal-arrest",
    title: "Maternal arrest modifications",
    caption: "Left uterine displacement plus early perimortem cesarean consideration are the pregnancy-specific ACLS modifications.",
    test: /perimortem|maternal cardiac arrest|left uterine displacement|aortocaval|acls mod/i,
    categories: /advanced|obstetric|clinical|reproduct/i,
    svg: svgShell(640, 260, `
      ${title("Maternal cardiac arrest — parallel actions")}
      ${box(40, 70, 170, 55, "Standard\nACLS", soft)}
      ${box(235, 70, 170, 55, "Left uterine\ndisplacement", "#f3e8df")}
      ${box(430, 70, 170, 55, "Airway\nexpertise", soft)}
      ${box(180, 160, 280, 55, "Perimortem CS early\nif no ROSC (~4–5 min)", "#f3e8df")}
      <text x="40" y="245" font-family="Georgia, serif" font-size="11" fill="${muted}">Do not delay hysterotomy for OR transport when still in the bay</text>
    `, "Maternal cardiac arrest modifications"),
  },
  {
    id: "sepsis-bundle",
    title: "Sepsis first-hour spine",
    caption: "Cultures when they do not delay therapy, early antimicrobials, lactate, fluids guided by phenotype, source control.",
    test: /\bsepsis\b|septic shock|qsofa|source control|neutropenic fever/i,
    categories: /clinical|internal|advanced|pathophysiol|microbiol|surgery|pediatr/i,
    svg: svgShell(640, 240, `
      ${title("Sepsis — first actions")}
      ${box(30, 85, 110, 50, "Recognize")}
      ${arrow(140, 110, 165, 110)}
      ${box(165, 85, 110, 50, "Cultures")}
      ${arrow(275, 110, 300, 110)}
      ${box(300, 85, 120, 50, "Antibiotics", "#f3e8df")}
      ${arrow(420, 110, 445, 110)}
      ${box(445, 85, 160, 50, "Fluids / pressors\n+ source", soft)}
      <text x="30" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">Lactate trends · Reassess perfusion · Do not drown cardiogenic phenotypes</text>
    `, "Sepsis initial management spine"),
  },
  {
    id: "cell-central-dogma",
    title: "Central dogma with quality control",
    caption: "DNA → RNA → protein with splicing, targeting, and degradation checkpoints that disease often breaks.",
    test: /transcription &|rna processing|central dogma|splicing|translation & targeting|signal recognition particle/i,
    categories: /cell biology|molecular|biochem/i,
    svg: svgShell(640, 230, `
      ${title("Information flow + checkpoints")}
      ${box(40, 90, 100, 45, "DNA")}
      ${arrow(140, 112, 180, 112, "tx")}
      ${box(180, 90, 100, 45, "RNA")}
      ${arrow(280, 112, 320, 112, "splice")}
      ${box(320, 90, 100, 45, "mRNA")}
      ${arrow(420, 112, 460, 112, "tl")}
      ${box(460, 90, 140, 45, "Protein", "#f3e8df")}
      <text x="40" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">NMD · chaperones · proteasome/autophagy — disease often lives in QC</text>
    `, "Central dogma with quality control"),
  },
  {
    id: "pharyngeal-apparatus",
    title: "Pharyngeal apparatus field",
    caption: "Arch/pouch derivatives cluster congenital anomalies — one field defect predicts neighbors.",
    test: /pharyngeal apparatus|branchial cleft|branchial arch|pharyngeal pouch|pharyngeal arch/i,
    categories: /anatom|embryo/i,
    svg: svgShell(640, 250, `
      ${title("Pharyngeal apparatus — think in fields")}
      ${box(40, 80, 120, 55, "Arch 1\nMeckel\nCN V", soft)}
      ${box(180, 80, 120, 55, "Arch 2\nReicherts\nCN VII", soft)}
      ${box(320, 80, 120, 55, "Arch 3\nHyoid/carotid\nCN IX", soft)}
      ${box(460, 80, 140, 55, "Arch 4/6\nLaryngeal\nCN X", "#f3e8df")}
      <text x="40" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Pouch derivatives: middle ear, tonsil, thymus/parathyroids — DiGeorge field</text>
    `, "Pharyngeal arches schematic"),
  },
  {
    id: "portal-anastomoses",
    title: "Portosystemic anastomoses",
    caption: "Left gastric–azygos, umbilical, and rectal anastomoses explain variceal sites in portal hypertension.",
    test: /portal vein|portosystemic|esophageal varices|caput medusae|portal hypertension/i,
    titleTest: /portal|varices|portosystemic|caput/i,
    categories: /anatom|pathophysiol|clinical|gastro/i,
    svg: svgShell(640, 250, `
      ${title("Portal hypertension — decompress sites")}
      ${box(220, 50, 200, 40, "Portal pressure ↑")}
      ${box(40, 120, 150, 50, "Esophageal\nvarices", "#f3e8df")}
      ${box(245, 120, 150, 50, "Caput\nmedusae", soft)}
      ${box(450, 120, 150, 50, "Rectal\nvarices", soft)}
      ${arrow(250, 90, 115, 120)}
      ${arrow(320, 90, 320, 120)}
      ${arrow(390, 90, 525, 120)}
      <text x="40" y="210" font-family="Georgia, serif" font-size="12" fill="${muted}">Anatomy predicts bleed site · Source control + hemodynamics first</text>
    `, "Portosystemic anastomoses schematic"),
  },
  {
    id: "ob-hemorrhage",
    title: "Postpartum hemorrhage 4 Ts",
    caption: "Tone, trauma, tissue, thrombin — simultaneous actions with uterotonics and transfusion readiness.",
    test: /postpartum hemorrhage|pph|uterotonic|4 ts|obstetric hemorrhage/i,
    categories: /obstetric|advanced|clinical|reproduct|surgery/i,
    svg: svgShell(640, 240, `
      ${title("PPH — four Ts in parallel")}
      ${box(30, 90, 130, 55, "Tone\nMassage\nUterotonics", "#f3e8df")}
      ${box(180, 90, 130, 55, "Trauma\nLacs /\ninversion", soft)}
      ${box(330, 90, 130, 55, "Tissue\nRetained\nplacenta", soft)}
      ${box(480, 90, 130, 55, "Thrombin\nCoagulopathy", soft)}
      <text x="30" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Resuscitate while you search — do not wait for a single cause</text>
    `, "Postpartum hemorrhage four Ts"),
  },
  {
    id: "preeclampsia",
    title: "Preeclampsia severe features",
    caption: "Hypertension plus end-organ findings; magnesium for seizure prophylaxis; delivery is definitive.",
    test: /preeclampsia|eclampsia|hellp|magnesium sulfate/i,
    categories: /obstetric|clinical|advanced|reproduct/i,
    svg: svgShell(640, 250, `
      ${title("Preeclampsia pathway")}
      ${box(40, 80, 160, 50, "HTN +\nproteinuria / EO", soft)}
      ${arrow(200, 105, 250, 105)}
      ${box(250, 80, 160, 50, "Severe\nfeatures?", "#f3e8df")}
      ${arrow(410, 105, 460, 105)}
      ${box(460, 70, 150, 70, "MgSO₄\n+ delivery\nplan", "#f3e8df")}
      <text x="40" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Watch Mg toxicity: loss of reflexes → respiratory depression</text>
    `, "Preeclampsia management schematic"),
  },
  {
    id: "suicide-risk",
    title: "Suicide risk assessment spine",
    caption: "Ideation → plan → intent → means → protective factors, with lethal-means counseling and timed follow-up.",
    test: /suicide risk|ideation plan intent|suicidality|lethal.?means/i,
    categories: /psychiatr|behavioral|clinical/i,
    svg: svgShell(640, 240, `
      ${title("Suicide risk — ask and document")}
      ${box(20, 90, 100, 45, "Ideation")}
      ${arrow(120, 112, 145, 112)}
      ${box(145, 90, 90, 45, "Plan")}
      ${arrow(235, 112, 260, 112)}
      ${box(260, 90, 90, 45, "Intent")}
      ${arrow(350, 112, 375, 112)}
      ${box(375, 90, 100, 45, "Means", "#f3e8df")}
      ${arrow(475, 112, 500, 112)}
      ${box(500, 90, 120, 45, "Protective\nfactors", soft)}
      <text x="20" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">Means counseling is treatment · Timed follow-up beats “PRN PCP”</text>
    `, "Suicide risk assessment spine"),
  },
  {
    id: "study-design",
    title: "Evidence hierarchy sketch",
    caption: "Design strength is not automatic truth — bias, confounding, and applicability still decide bedside use.",
    test: /study design|rct|cohort|case.?control|evidence hierarch|guideline|rct critical appraisal/i,
    categories: /epidemiolog|biostat|ethic/i,
    svg: svgShell(640, 250, `
      ${title("Study designs — questions they answer")}
      ${box(40, 80, 120, 55, "RCT\nTherapy", "#f3e8df")}
      ${box(180, 80, 120, 55, "Cohort\nIncidence", soft)}
      ${box(320, 80, 140, 55, "Case-control\nRare outcomes", soft)}
      ${box(480, 80, 120, 55, "Cross-section\nPrevalence", soft)}
      <text x="40" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Always ask: comparator, exclusions, absolute benefit, applicability</text>
    `, "Study design overview"),
  },
  {
    id: "capacity-consent",
    title: "Capacity and consent elements",
    caption: "Capacity is decision-specific; consent needs indication, risks, benefits, alternatives, and voluntariness.",
    test: /capacity assessment|informed consent &|decision-making capacity|four principles &|surrogate decision-making/i,
    titleTest: /capacity|informed consent|four principles|surrogate/i,
    categories: /ethic|profession|clinical|psychiatr/i,
    svg: svgShell(640, 250, `
      ${title("Capacity → consent")}
      ${box(30, 85, 120, 50, "Understand")}
      ${box(170, 85, 120, 50, "Appreciate")}
      ${box(310, 85, 120, 50, "Reason")}
      ${box(450, 85, 150, 50, "Express\nchoice", "#f3e8df")}
      <text x="30" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">If incapacitated: substituted judgment → best interest · Document the source of authority</text>
    `, "Decision-making capacity elements"),
  },
  {
    id: "pathophys-insult",
    title: "Insult → adaptation → decompensation",
    caption: "Pathophysiology chapters should name the disrupted variable, the compensation, and when compensation becomes disease.",
    test: /pathophysiol/i,
    categories: /pathophysiol/i,
    svg: svgShell(640, 230, `
      ${title("Pathophysiology spine")}
      ${box(40, 90, 150, 55, "Insult", "#f3e8df")}
      ${arrow(190, 117, 230, 117)}
      ${box(230, 90, 150, 55, "Adaptation", soft)}
      ${arrow(380, 117, 420, 117)}
      ${box(420, 90, 180, 55, "Decompensation\n(= new disease)", soft)}
      <text x="40" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Predict the bedside finding from the disrupted variable before opening the key</text>
    `, "Insult adaptation decompensation model"),
  },
  {
    id: "gram-stain",
    title: "Gram stain logic",
    caption: "Cell-wall structure drives stain result and empiric drug intuition before the species name returns.",
    test: /gram stain|peptidoglycan|\blps\b|gram-positive|gram-negative|gram \+|staph vs strep|staphylococ|streptococ/i,
    categories: /microbiol/i,
    svg: svgShell(640, 240, `
      ${title("Gram stain → first therapy intuition")}
      ${box(40, 85, 250, 70, "Gram + thick peptidoglycan\nRetain crystal violet", soft)}
      ${box(350, 85, 250, 70, "Gram − outer membrane/LPS\nPink; different drug issues", "#f3e8df")}
      <text x="40" y="195" font-family="Georgia, serif" font-size="12" fill="${muted}">Stain + syndrome ≠ final ID — but it narrows the first hour</text>
    `, "Gram stain comparison"),
  },
  {
    id: "decision-spine",
    title: "Clinical decision spine",
    caption: "Syndrome → can’t-miss → discriminating data → timed therapy → reassessment.",
    test: /clinical reasoning|problem representation|chest pain pathway|acute dyspnea|ward |clerkship|disposition|continuity & comprehensive|adult preventive|office procedures|multimorbidity|primary care/i,
    categories: /clinical medicine|internal medicine|family medicine|advanced clinical/i,
    svg: svgShell(640, 220, `
      ${title("Ward/clinic decision spine")}
      ${box(15, 90, 100, 45, "Syndrome")}
      ${arrow(115, 112, 135, 112)}
      ${box(135, 90, 110, 45, "Can't-miss")}
      ${arrow(245, 112, 265, 112)}
      ${box(265, 90, 100, 45, "Data")}
      ${arrow(365, 112, 385, 112)}
      ${box(385, 90, 100, 45, "Therapy", "#f3e8df")}
      ${arrow(485, 112, 505, 112)}
      ${box(505, 90, 120, 45, "Reassess", soft)}
    `, "Clinical decision spine"),
  },
  {
    id: "autonomic-receptors",
    title: "Autonomic receptor map",
    caption: "α1/α2/β1/β2/M receptors map organ effects and toxidromes — name the receptor before the drug.",
    test: /adrenergic|autonomic|alpha-?1|beta-?2|cholinergic|muscarinic|catecholamine biology/i,
    categories: /pharmacol|pathophysiol|endocrin/i,
    svg: svgShell(640, 250, `
      ${title("Autonomic receptors — organ effects")}
      ${box(30, 80, 110, 55, "α1\nVasoconstrict", soft)}
      ${box(155, 80, 110, 55, "α2\nPresynaptic↓", soft)}
      ${box(280, 80, 110, 55, "β1\nHeart ↑", "#f3e8df")}
      ${box(405, 80, 110, 55, "β2\nBronchodilate", soft)}
      ${box(530, 80, 90, 55, "M\nRest/digest", soft)}
      <text x="30" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Agonist vs antagonist vs toxidrome — same map for overdose and therapy</text>
    `, "Autonomic receptor map"),
  },
  {
    id: "inflammation-patterns",
    title: "Inflammation and necrosis patterns",
    caption: "Neutrophilic vs granulomatous vs coagulative patterns forecast tempo and complications.",
    test: /inflammation pathology|necrosis patterns|granulomatous|hemostasis pathology|hemodynamic injury|hypersensitivity tissue|wound healing pathology|pathologic calcification|chronic inflammation/i,
    titleTest: /inflammation|necrosis|granulomatous|hemostasis pathology|hemodynamic|hypersensitivity tissue|wound healing|calcification|cell death/i,
    categories: /patholog|pathophysiol/i,
    svg: svgShell(640, 240, `
      ${title("Pathology patterns → clinical forecast")}
      ${box(30, 85, 140, 55, "Acute\nneutrophilic", soft)}
      ${box(190, 85, 140, 55, "Granulomatous\npersistent Ag", soft)}
      ${box(350, 85, 140, 55, "Coagulative\nischemia", "#f3e8df")}
      ${box(510, 85, 110, 55, "Apoptosis\nquiet", soft)}
      <text x="30" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Pattern names the process — then name the next complication</text>
    `, "Inflammation and necrosis patterns"),
  },
  {
    id: "antibody-classes",
    title: "Antibody class geography",
    caption: "IgM first response, IgG crosses placenta, IgA mucosa, IgE mast cells — class predicts syndrome.",
    test: /immunology of pregnancy|antibody class|b cell development|\bantibodies\b|\bigg\b|\bigm\b|\biga nephropathy\b|\bige\b|placental transfer|alloimmun|rh (incompatibility|disease)|secretory iga|hypersensitivity types/i,
    titleTest: /antibody|antibodies|igg|igm|iga|ige|pregnancy|alloimmun|rh |hypersensitivity|b cell/i,
    categories: /immunol|obstetric|pathophysiol/i,
    svg: svgShell(640, 240, `
      ${title("Antibody classes — where they work")}
      ${box(30, 85, 130, 55, "IgM\nEarly / pentamer", soft)}
      ${box(180, 85, 130, 55, "IgG\nPlacenta ✓", "#f3e8df")}
      ${box(330, 85, 130, 55, "IgA\nMucosa", soft)}
      ${box(480, 85, 130, 55, "IgE\nMast cells", soft)}
      <text x="30" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Rh disease is IgG biology · Anaphylaxis is IgE biology</text>
    `, "Antibody class geography"),
  },
  {
    id: "bacteremia-device",
    title: "Device and CNS infection logic",
    caption: "Biofilm + foreign body means source control often beats antibiotics alone.",
    test: /device infection|cns device|shunt infection|catheter|biofilm|prosthetic|streptococcal disease/i,
    categories: /microbiol|clinical|surgery|advanced/i,
    svg: svgShell(640, 230, `
      ${title("Hardware infection — think biofilm")}
      ${box(40, 85, 160, 55, "Organism +\nhost niche", soft)}
      ${arrow(200, 112, 250, 112)}
      ${box(250, 85, 160, 55, "Biofilm on\ndevice", "#f3e8df")}
      ${arrow(410, 112, 460, 112)}
      ${box(460, 85, 150, 55, "Remove /\nrevise + Rx", soft)}
      <text x="40" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Antibiotics without source control fail prosthetic and shunt infections</text>
    `, "Device infection biofilm logic"),
  },
  {
    id: "pediatric-fluids",
    title: "Pediatric dehydration estimate",
    caption: "Weight-based deficit percent drives bolus and maintenance — over-rapid sodium correction risks neurologic injury.",
    test: /pediatric dehydration|\bors\b|oral rehydration|deficit percent|maintenance fluid/i,
    categories: /pediatr|clinical/i,
    svg: svgShell(640, 230, `
      ${title("Pediatric fluids — estimate then replace")}
      ${box(40, 80, 150, 55, "Appearance\n+ weight Δ", soft)}
      ${arrow(190, 107, 230, 107)}
      ${box(230, 80, 160, 55, "% dehydration\nestimate", "#f3e8df")}
      ${arrow(390, 107, 430, 107)}
      ${box(430, 80, 170, 55, "ORS / IV\n+ maintenance", soft)}
      <text x="40" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">Shock: isotonic bolus · Watch Na⁺ correction rate</text>
    `, "Pediatric dehydration fluid plan"),
  },
  {
    id: "congenital-heart-screen",
    title: "Critical congenital heart clues",
    caption: "Differential cyanosis, ductal-dependent shock at duct closure, and failed pulse-ox screening demand prostaglandin thinking.",
    test: /congenital heart|ductal-?dependent|prostaglandin|pulse-?ox screening|differential cyanosis/i,
    categories: /pediatr|advanced|pathophysiol|cardiovascular/i,
    svg: svgShell(640, 240, `
      ${title("Neonatal heart — don't miss ductal dependence")}
      ${box(40, 80, 160, 55, "Poor feeding\n± cyanosis", soft)}
      ${arrow(200, 107, 240, 107)}
      ${box(240, 80, 160, 55, "Pulse-ox /\ndifferential sats", "#f3e8df")}
      ${arrow(400, 107, 440, 107)}
      ${box(440, 80, 160, 55, "PGE1 +\ncardiology", "#f3e8df")}
      <text x="40" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Duct closure unmasks left- or right-sided obstructive lesions</text>
    `, "Critical congenital heart screening clues"),
  },
  {
    id: "ppp-shunt",
    title: "Pentose phosphate pathway branches",
    caption: "Oxidative arm makes NADPH; non-oxidative arm feeds ribose-5-P and glycolytic intermediates — G6PD failure hits the oxidative arm.",
    test: /pentose phosphate|\bppp\b|g6pd|nadph|ribose-?5/i,
    categories: /biochem/i,
    svg: svgShell(640, 250, `
      ${title("PPP — oxidative vs non-oxidative")}
      ${box(40, 80, 140, 55, "G6P", soft)}
      ${arrow(180, 107, 220, 107)}
      ${box(220, 70, 160, 70, "Oxidative\nNADPH +\nCO₂", "#f3e8df")}
      ${arrow(380, 107, 420, 107)}
      ${box(420, 70, 180, 70, "Non-oxidative\nR5P ↔ F6P/GAP", soft)}
      <text x="40" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">G6PD: can't make NADPH → hemolysis under oxidant stress</text>
    `, "Pentose phosphate pathway schematic"),
  },
  {
    id: "fao-carnitine",
    title: "Fatty acid oxidation and carnitine shuttle",
    caption: "Long-chain acyl-CoA needs CPT-I / carnitine / CPT-II to enter mitochondria — shuttle defects mimic hypoketotic hypoglycemia.",
    test: /fatty acid oxidation|carnitine|cpt-?i|cpt-?ii|beta.?oxid|hypoketotic/i,
    categories: /biochem|pathophysiol|pediatr/i,
    svg: svgShell(640, 250, `
      ${title("FAO — carnitine shuttle gate")}
      ${box(30, 80, 130, 55, "Cytosol\nAcyl-CoA", soft)}
      ${arrow(160, 107, 200, 107, "CPT-I")}
      ${box(200, 80, 140, 55, "Acyl-\ncarnitine", "#f3e8df")}
      ${arrow(340, 107, 380, 107)}
      ${box(380, 80, 140, 55, "Matrix\nβ-oxidation", soft)}
      ${box(530, 80, 80, 55, "Acetyl-\nCoA", soft)}
      <text x="30" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Malonyl-CoA inhibits CPT-I in the fed state · Defects → hypoketotic hypoglycemia</text>
    `, "Fatty acid oxidation carnitine shuttle"),
  },
  {
    id: "urea-cycle",
    title: "Urea cycle and hyperammonemia",
    caption: "Nitrogen disposal through CPS1 → OTC → argininosuccinate → arginine → urea; OTC deficiency is the classic X-linked crisis.",
    test: /urea cycle|hyperammon|otc deficiency|cps1|ornithine transcarb/i,
    categories: /biochem|pathophysiol|pediatr|clinical/i,
    svg: svgShell(640, 260, `
      ${title("Urea cycle — nitrogen exit")}
      ${box(30, 80, 100, 45, "NH₄⁺")}
      ${arrow(130, 102, 160, 102)}
      ${box(160, 80, 90, 45, "CPS1")}
      ${arrow(250, 102, 280, 102)}
      ${box(280, 80, 90, 45, "OTC", "#f3e8df")}
      ${arrow(370, 102, 400, 102)}
      ${box(400, 80, 100, 45, "ASA/\narginine")}
      ${arrow(500, 102, 530, 102)}
      ${box(530, 80, 80, 45, "Urea")}
      <text x="30" y="170" font-family="Georgia, serif" font-size="12" fill="${muted}">Mitochondrial start (CPS1/OTC) vs cytosolic finish · High NH₃ → encephalopathy</text>
      <text x="30" y="195" font-family="Georgia, serif" font-size="12" fill="${accent}">Stop protein · give calories · scavengers / dialysis when severe</text>
    `, "Urea cycle schematic"),
  },
  {
    id: "nucleotide-paths",
    title: "Nucleotide de novo versus salvage",
    caption: "De novo costs energy; salvage recycles bases. HGPRT failure (Lesch-Nyhan) and xanthine oxidase blockade (allopurinol) live on this map.",
    test: /purine|pyrimidine|nucleotide salvage|de novo|hgprt|lesch.?nyhan|xanthine oxidase/i,
    categories: /biochem|pharmacol|pathophysiol/i,
    svg: svgShell(640, 240, `
      ${title("Nucleotides — de novo vs salvage")}
      ${box(40, 85, 200, 60, "De novo\nPRPP → IMP/UMP\nEnergy-expensive", soft)}
      ${box(280, 85, 200, 60, "Salvage\nHGPRT / APRT\nRecycle bases", "#f3e8df")}
      ${box(500, 85, 110, 60, "Uric acid\nXO", soft)}
      <text x="40" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Allopurinol blocks XO · Lesch-Nyhan = HGPRT failure</text>
    `, "Nucleotide pathway overview"),
  },
  {
    id: "vitamin-cofactors",
    title: "Vitamins as cofactor classes",
    caption: "Water-soluble vitamins often coenzymes; fat-soluble vitamins often signaling/storage — deficiency clinics follow solubility and stores.",
    test: /\bvitamins?\b as|water-soluble vitamin|fat-soluble vitamin|vitamin deficiency|thiamine deficiency|niacin deficiency|folate deficiency|\bb12\b deficiency|cobalamin deficiency|ascorbic|pyridoxine deficiency|vitamins as enzyme/i,
    categories: /biochem|pathophysiol|clinical|family/i,
    svg: svgShell(640, 240, `
      ${title("Vitamin logic — solubility predicts stores")}
      ${box(40, 80, 260, 70, "Water-soluble\nB / C coenzymes\nLow stores → early deficiency", soft)}
      ${box(340, 80, 260, 70, "Fat-soluble\nA D E K\nStores + malabsorption risk", "#f3e8df")}
      <text x="40" y="190" font-family="Georgia, serif" font-size="12" fill="${muted}">Name the reaction the vitamin enables before memorizing a rash list</text>
    `, "Vitamin cofactor class map"),
  },
  {
    id: "dna-repair-map",
    title: "DNA repair pathway map",
    caption: "Mismatch, NER, BER, and double-strand break repair — syndrome names map to the broken pathway.",
    test: /dna repair|mismatch repair|nucleotide excision|base excision|homologous recombination|lynch|xeroderma/i,
    categories: /cell biology|patholog|biochem/i,
    svg: svgShell(640, 250, `
      ${title("DNA repair — match syndrome to pathway")}
      ${box(25, 85, 140, 55, "MMR\nLynch", soft)}
      ${box(175, 85, 140, 55, "NER\nXP", soft)}
      ${box(325, 85, 140, 55, "BER\nOxidative", soft)}
      ${box(475, 85, 140, 55, "DSB\nBRCA/ATM", "#f3e8df")}
      <text x="25" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Fidelity failure → mutagenesis or cell death · Clinical pattern names the pathway</text>
    `, "DNA repair pathways"),
  },
  {
    id: "apoptosis-fork",
    title: "Apoptosis intrinsic versus extrinsic",
    caption: "Mitochondrial (Bcl-2/cytochrome c) versus death-receptor (Fas/TNF) arms converge on caspases — cancer often disables one arm.",
    test: /apoptosis|intrinsic pathway|extrinsic pathway|bcl-?2|caspase|death receptor/i,
    categories: /cell biology|patholog|pathophysiol/i,
    svg: svgShell(640, 250, `
      ${title("Apoptosis — two doors, one execution")}
      ${box(40, 80, 180, 60, "Intrinsic\nMito / cyt c\nBcl-2 gate", "#f3e8df")}
      ${box(280, 80, 180, 60, "Extrinsic\nFas / TNF-R\nDeath domain", soft)}
      ${arrow(220, 140, 300, 170)}
      ${arrow(370, 140, 340, 170)}
      ${box(250, 175, 160, 45, "Caspases", soft)}
      <text x="40" y="240" font-family="Georgia, serif" font-size="11" fill="${muted}">Quiet death vs necrosis spill — immune consequences differ</text>
    `, "Apoptosis pathway fork"),
  },
  {
    id: "cell-cycle-checkpoints",
    title: "Cell-cycle checkpoints",
    caption: "G1/S, G2/M, and spindle checkpoints — tumor suppressors enforce them; oncogenes push past them.",
    test: /cell cycle checkpoints|oncogenes? vs tumor suppressors?|oncogene addiction|tumor suppressor networks?|g1\/s checkpoint|g2\/m checkpoint/i,
    categories: /cell biology|patholog/i,
    svg: svgShell(640, 240, `
      ${title("Cell cycle — gates that fail in cancer")}
      ${box(40, 90, 100, 45, "G1")}
      ${arrow(140, 112, 170, 112)}
      ${box(170, 85, 110, 55, "G1/S\nRb / p53", "#f3e8df")}
      ${arrow(280, 112, 310, 112)}
      ${box(310, 90, 100, 45, "S/G2")}
      ${arrow(410, 112, 440, 112)}
      ${box(440, 85, 160, 55, "G2/M &\nspindle check", soft)}
      <text x="40" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Oncogene = gas · Tumor suppressor = brake — both change gate behavior</text>
    `, "Cell cycle checkpoint map"),
  },
  {
    id: "collagen-assembly",
    title: "Collagen synthesis checkpoints",
    caption: "Hydroxylation (vitamin C), triple helix, cleavage, and cross-link steps explain scurvy and osteogenesis imperfecta phenotypes.",
    test: /collagen synthesis|scurvy|osteogenesis imperfecta|collagen.*hydroxylation|triple helix/i,
    titleTest: /collagen|scurvy|osteogenesis|\boi\b/i,
    categories: /cell biology|biochem|patholog/i,
    svg: svgShell(640, 250, `
      ${title("Collagen — where scurvy and OI hit")}
      ${box(20, 85, 120, 55, "Pro-α\nchains", soft)}
      ${arrow(140, 112, 165, 112)}
      ${box(165, 85, 130, 55, "OH (Vit C)\nGly-X-Y", "#f3e8df")}
      ${arrow(295, 112, 320, 112)}
      ${box(320, 85, 130, 55, "Triple\nhelix", soft)}
      ${arrow(450, 112, 475, 112)}
      ${box(475, 85, 140, 55, "Cross-link\nECM", soft)}
      <text x="20" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Scurvy: hydroxylation · OI: chain structure/quantity · Ehlers-Danlos: processing/cross-link</text>
    `, "Collagen synthesis checkpoints"),
  },
  {
    id: "fetal-circulation",
    title: "Fetal circulation shunts",
    caption: "Ductus venosus, foramen ovale, and ductus arteriosus bypass lungs/liver — postnatal closure explains transitional physiology and ductal-dependent lesions.",
    test: /fetal circulation|cardiac embryology|ductus arteriosus|ductus venosus|fetal shunt|foramen ovale.*(fetal|shunt|atrial)|fetal.*(foramen ovale)/i,
    categories: /anatom|embryo|pediatr|pathophysiol/i,
    svg: svgShell(640, 260, `
      ${title("Fetal shunts — three bypasses")}
      ${box(30, 80, 160, 55, "Ductus\nvenosus\n(liver bypass)", soft)}
      ${box(220, 80, 160, 55, "Foramen\novale\n(R→L atrium)", "#f3e8df")}
      ${box(410, 80, 190, 55, "Ductus\narteriosus\n(PA→aorta)", soft)}
      <text x="30" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Birth: lungs open → FO/DA close · Failed transition or ductal-dependent lesions</text>
    `, "Fetal circulation shunts"),
  },
  {
    id: "neural-tube",
    title: "Neural tube closure map",
    caption: "Cranial and caudal neuropore timing explains anencephaly versus spina bifida; folate timing is prevention biology.",
    test: /neural tube|neuropore|anencephaly|spina bifida|neurulation|folate prevention/i,
    categories: /anatom|embryo|pathophysiol|pediatr/i,
    svg: svgShell(640, 240, `
      ${title("Neural tube — close on time")}
      ${box(40, 85, 160, 55, "Neural plate\n→ fold", soft)}
      ${arrow(200, 112, 240, 112)}
      ${box(240, 85, 160, 55, "Cranial &\ncaudal neuropores", "#f3e8df")}
      ${arrow(400, 112, 440, 112)}
      ${box(440, 85, 160, 55, "Closed tube\nor defect", soft)}
      <text x="40" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Folate before closure window · Defect level predicts phenotype</text>
    `, "Neural tube closure"),
  },
  {
    id: "midgut-rotation",
    title: "Midgut rotation and fixation",
    caption: "270° counterclockwise rotation and fixation — malrotation leaves a narrow pedicle and volvulus risk.",
    test: /midgut rotation|malrotation|volvulus|intestinal rotation|omphalocele|physiologic hernia/i,
    categories: /anatom|embryo|surgery|pediatr/i,
    svg: svgShell(640, 250, `
      ${title("Midgut — rotate, return, fix")}
      ${box(30, 85, 140, 55, "Herniate\ninto cord", soft)}
      ${arrow(170, 112, 210, 112)}
      ${box(210, 85, 160, 55, "270° CCW\nrotation", "#f3e8df")}
      ${arrow(370, 112, 410, 112)}
      ${box(410, 85, 190, 55, "Return + fix\nor volvulus risk", soft)}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Bilious emesis in neonate → think malrotation/volvulus until proven otherwise</text>
    `, "Midgut rotation schematic"),
  },
  {
    id: "brachial-plexus",
    title: "Brachial plexus trunks",
    caption: "Roots → trunks → divisions → cords → branches — injury level predicts the deficit pattern (Erb vs Klumpke).",
    test: /brachial plexus|erb palsy|klumpke|upper trunk palsy|lower trunk palsy/i,
    titleTest: /brachial plexus/i,
    categories: /anatom|clinical|surgery/i,
    svg: svgShell(640, 240, `
      ${title("Brachial plexus — level names the deficit")}
      ${box(20, 90, 90, 40, "Roots")}
      ${arrow(110, 110, 135, 110)}
      ${box(135, 90, 90, 40, "Trunks")}
      ${arrow(225, 110, 250, 110)}
      ${box(250, 90, 100, 40, "Divisions")}
      ${arrow(350, 110, 375, 110)}
      ${box(375, 90, 90, 40, "Cords")}
      ${arrow(465, 110, 490, 110)}
      ${box(490, 85, 120, 50, "Terminal\nnerves", "#f3e8df")}
      <text x="20" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">Erb (upper trunk) waiter's tip · Klumpke (lower) claw / Horner possible</text>
    `, "Brachial plexus organization"),
  },
  {
    id: "complement-cascade",
    title: "Complement pathway convergence",
    caption: "Classical, lectin, and alternative paths meet at C3 convertase — deficiency patterns predict infection vs autoimmunity.",
    test: /complement deficienc|complement cascade|complement clinical|c3 convertase|membrane attack complex|complement pathway|complement/i,
    titleTest: /complement/i,
    categories: /immunol|pathophysiol|microbiol/i,
    svg: svgShell(640, 260, `
      ${title("Complement — three doors to C3")}
      ${box(30, 70, 140, 45, "Classical\nAb–Ag", soft)}
      ${box(200, 70, 140, 45, "Lectin\nMBL", soft)}
      ${box(370, 70, 140, 45, "Alternative\nTickover", soft)}
      ${arrow(100, 115, 280, 145)}
      ${arrow(270, 115, 300, 145)}
      ${arrow(440, 115, 340, 145)}
      ${box(220, 150, 160, 45, "C3 → MAC", "#f3e8df")}
      <text x="30" y="230" font-family="Georgia, serif" font-size="12" fill="${muted}">Early vs terminal defects → different bug lists and SLE-like risk</text>
    `, "Complement cascade overview"),
  },
  {
    id: "transplant-rejection",
    title: "Transplant rejection timing",
    caption: "Hyperacute (preformed Ab), acute (T-cell), chronic (vasculopathy) — timing plus histology guides therapy.",
    test: /transplant rejection|hyperacute|acute cellular rejection|chronic rejection|crossmatch|hla matching/i,
    categories: /immunol|clinical|surgery|advanced/i,
    svg: svgShell(640, 250, `
      ${title("Rejection — clock + mechanism")}
      ${box(30, 85, 170, 60, "Hyperacute\nMinutes–hours\nPreformed Ab", "#f3e8df")}
      ${box(230, 85, 170, 60, "Acute\nDays–months\nT cells ± Ab", soft)}
      ${box(430, 85, 170, 60, "Chronic\nMonths–years\nVasculopathy", soft)}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Crossmatch prevents hyperacute · Biopsy guides rescue immunosuppression</text>
    `, "Transplant rejection timing"),
  },
  {
    id: "mhc-presentation",
    title: "MHC I versus MHC II presentation",
    caption: "Intracellular peptides on MHC I to CD8; extracellular on MHC II to CD4 — restriction explains effector choice.",
    test: /mhc restriction|antigen presentation|mhc i|mhc ii|hla class/i,
    categories: /immunol/i,
    svg: svgShell(640, 250, `
      ${title("Antigen presentation — who talks to whom")}
      ${box(40, 80, 250, 70, "MHC I\nIntracellular peptide\n→ CD8 T cell", soft)}
      ${box(350, 80, 250, 70, "MHC II\nExtracellular peptide\n→ CD4 T cell", "#f3e8df")}
      <text x="40" y="190" font-family="Georgia, serif" font-size="12" fill="${muted}">Cross-presentation blurs the rule for dendritic cells — know the default first</text>
    `, "MHC antigen presentation"),
  },
  {
    id: "pid-buckets",
    title: "Primary immunodeficiency buckets",
    caption: "B-cell, T-cell, phagocyte, and complement defects each predict a characteristic infection pattern.",
    test: /primary immunodeficiency|phagocyte immunodeficiency|antibody deficiency|scid|chronic granulomatous/i,
    categories: /immunol|pediatr|pathophysiol/i,
    svg: svgShell(640, 250, `
      ${title("PID — infection pattern names the arm")}
      ${box(20, 85, 140, 55, "B cell\nPyogenic\n+ enteric viruses", soft)}
      ${box(175, 85, 140, 55, "T cell\nViral /\nopportunistic", "#f3e8df")}
      ${box(330, 85, 140, 55, "Phagocyte\nCatalase+\nabscesses", soft)}
      ${box(485, 85, 130, 55, "Complement\nNeisseria\n± SLE", soft)}
      <text x="20" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Age of onset + organism list → which arm to test first</text>
    `, "Primary immunodeficiency buckets"),
  },
  {
    id: "agonist-antagonist",
    title: "Agonist versus antagonist logic",
    caption: "Full/partial agonists and competitive/noncompetitive antagonists reshape dose–response — efficacy is not affinity.",
    test: /pharmacodynamics|agonists? & antagonists?|dose.?response|spare receptor|potency vs efficacy|therapeutic index/i,
    categories: /pharmacol/i,
    svg: svgShell(640, 260, `
      ${title("PD — shape of the curve")}
      ${box(40, 80, 160, 55, "Full agonist\nEmax = 100%", soft)}
      ${box(230, 80, 160, 55, "Partial agonist\nEmax < full", "#f3e8df")}
      ${box(420, 80, 180, 55, "Antagonist\nShifts / flattens", soft)}
      <text x="40" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">Potency = left-right · Efficacy = height · Spare receptors hide occupancy truths</text>
    `, "Agonist antagonist pharmacodynamics"),
  },
  {
    id: "cyp450-map",
    title: "CYP induction and inhibition",
    caption: "Inducers raise clearance of substrates; inhibitors raise substrate levels — name the victim drug and the direction.",
    test: /cyp450|cyp3a4|induction & inhibition|drug.?drug interaction|enzyme induc/i,
    categories: /pharmacol|clinical|internal|family/i,
    svg: svgShell(640, 250, `
      ${title("CYP — who changes whose level")}
      ${box(40, 80, 160, 60, "Inducer\n↑ enzyme\n↓ substrate", soft)}
      ${box(240, 80, 160, 60, "Substrate\nvictim drug", "#f3e8df")}
      ${box(440, 80, 160, 60, "Inhibitor\n↓ enzyme\n↑ substrate", soft)}
      <text x="40" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Always ask direction · Narrow-therapeutic-index victims (warfarin, DOACs, chemo)</text>
    `, "CYP450 induction inhibition map"),
  },
  {
    id: "adme-map",
    title: "ADME disposition map",
    caption: "Absorption, distribution, metabolism, excretion — each step is a failure point for dose, route, and organ dysfunction.",
    test: /\badme\b|pharmacokinetics|clinical pharmacokinetics|absorption distribution/i,
    categories: /pharmacol/i,
    svg: svgShell(640, 230, `
      ${title("ADME — four gates for every drug")}
      ${box(30, 90, 120, 45, "Absorb")}
      ${arrow(150, 112, 175, 112)}
      ${box(175, 90, 120, 45, "Distribute")}
      ${arrow(295, 112, 320, 112)}
      ${box(320, 90, 120, 45, "Metabolize", "#f3e8df")}
      ${arrow(440, 112, 465, 112)}
      ${box(465, 90, 140, 45, "Excrete", soft)}
      <text x="30" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">Liver/kidney failure rewrite M and E first — then rethink dose</text>
    `, "ADME disposition map"),
  },
  {
    id: "screening-metrics",
    title: "Screening test metric map",
    caption: "Sensitivity, specificity, PPV, and NPV — prevalence links predictive values to the same 2×2.",
    test: /screening test metrics|sensitivity|specificity|\bppv\b|\bnpv\b|likelihood ratio|diagnostic study appraisal/i,
    titleTest: /screening|diagnostic study|biostatistics|sensitivity|likelihood/i,
    categories: /epidemiolog|family|clinical/i,
    svg: svgShell(640, 250, `
      ${title("2×2 — which number answers which question")}
      ${box(40, 80, 130, 55, "Sensitivity\nDisease → +", soft)}
      ${box(185, 80, 130, 55, "Specificity\nNo disease → −", soft)}
      ${box(330, 80, 130, 55, "PPV\n+ → disease", "#f3e8df")}
      ${box(475, 80, 130, 55, "NPV\n− → well", soft)}
      <text x="40" y="180" font-family="Georgia, serif" font-size="12" fill="${muted}">Prevalence moves PPV/NPV · Sn/Sp stay put for the same test</text>
    `, "Screening test metrics map"),
  },
  {
    id: "bias-confounding",
    title: "Bias versus confounding",
    caption: "Bias is systematic error in design/measure; confounding is a third variable mixing the exposure–outcome link — fixes differ.",
    test: /bias, confounding|confounding & effect|selection bias|information bias|effect modification/i,
    categories: /epidemiolog/i,
    svg: svgShell(640, 250, `
      ${title("Wrong answer for different reasons")}
      ${box(40, 80, 250, 70, "Bias\nSystematic error\nFix design / measurement", soft)}
      ${box(350, 80, 250, 70, "Confounding\nThird variable\nRestrict / adjust / randomize", "#f3e8df")}
      <text x="40" y="190" font-family="Georgia, serif" font-size="12" fill="${muted}">Effect modification is real biology — do not “adjust it away”</text>
    `, "Bias versus confounding"),
  },
  {
    id: "nnt-arr",
    title: "ARR, RRR, and NNT",
    caption: "Absolute risk reduction drives NNT; relative risk reduction can look large when absolute benefit is tiny.",
    test: /\barr\b|\brrr\b|\bnnt\b|\bnnh\b|absolute risk|relative risk reduction/i,
    titleTest: /arr|rrr|nnt|absolute risk|relative risk/i,
    categories: /epidemiolog|clinical|family|pharmacol/i,
    svg: svgShell(640, 240, `
      ${title("Risk math clinicians actually use")}
      ${box(40, 85, 150, 55, "CER\nControl event", soft)}
      ${box(220, 85, 150, 55, "EER\nTx event", soft)}
      ${box(400, 85, 200, 55, "ARR = CER−EER\nNNT = 1/ARR", "#f3e8df")}
      <text x="40" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Always ask for absolute benefit before celebrating a relative % </text>
    `, "ARR RRR NNT relationship"),
  },
  {
    id: "outbreak-steps",
    title: "Outbreak investigation steps",
    caption: "Confirm → define case → describe → hypothesize → test → control → communicate — order prevents premature conclusions.",
    test: /outbreak investigation|epidemic curve|case definition|foodborne outbreak/i,
    categories: /epidemiolog|microbiol|family/i,
    svg: svgShell(640, 230, `
      ${title("Outbreak — disciplined sequence")}
      ${box(15, 90, 90, 40, "Confirm")}
      ${arrow(105, 110, 120, 110)}
      ${box(120, 90, 90, 40, "Define")}
      ${arrow(210, 110, 225, 110)}
      ${box(225, 90, 90, 40, "Describe")}
      ${arrow(315, 110, 330, 110)}
      ${box(330, 90, 100, 40, "Hypothesize", "#f3e8df")}
      ${arrow(430, 110, 445, 110)}
      ${box(445, 90, 160, 40, "Test / control", soft)}
      <text x="15" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">Case definition before epicurve theories</text>
    `, "Outbreak investigation steps"),
  },
  {
    id: "eol-ethics",
    title: "End-of-life ethics spine",
    caption: "Goals, surrogates, withholding vs withdrawing equivalence, and proportionate care — document the values source.",
    test: /end-of-life ethics|goals of care|withhold|withdraw|surrogate decision|primary palliative/i,
    titleTest: /end-of-life|goals of care|surrogate|palliative|scarce resource/i,
    categories: /ethic|clinical|advanced|family|psychiatr/i,
    svg: svgShell(640, 250, `
      ${title("EOL — values before interventions")}
      ${box(30, 85, 140, 55, "Goals &\nvalues", "#f3e8df")}
      ${arrow(170, 112, 210, 112)}
      ${box(210, 85, 160, 55, "Surrogate /\nauthority", soft)}
      ${arrow(370, 112, 410, 112)}
      ${box(410, 85, 190, 55, "Proportionate\nplan + time-limited trial", soft)}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Withholding ≈ withdrawing ethically · Document why, not only what</text>
    `, "End-of-life ethics spine"),
  },
  {
    id: "virus-baltimore",
    title: "DNA versus RNA virus logic",
    caption: "Genome type predicts replication niche, mutation rate, and which antivirals or vaccines make sense.",
    test: /dna virus families|rna virus families|baltimore|viral replication|respiratory viruses comparative/i,
    categories: /microbiol/i,
    svg: svgShell(640, 240, `
      ${title("Virus genome → clinical intuition")}
      ${box(40, 85, 250, 65, "DNA viruses\nNucleus (often)\nMore stable genomes", soft)}
      ${box(350, 85, 250, 65, "RNA viruses\nCytoplasm (often)\nHigher mutation rate", "#f3e8df")}
      <text x="40" y="190" font-family="Georgia, serif" font-size="12" fill="${muted}">Exception lists matter — learn the rule, then the famous exceptions</text>
    `, "DNA versus RNA virus comparison"),
  },
  {
    id: "tb-latency",
    title: "TB latency versus disease",
    caption: "Exposure → latent infection → reactivation risk — tests and treatment goals differ by stage.",
    test: /tb diagnostics|latent.*tb|tuberculosis|mycobacteria biology|igra|reactivation/i,
    titleTest: /tb |tuberculosis|mycobacteria/i,
    categories: /microbiol|clinical|pathophysiol|internal/i,
    svg: svgShell(640, 240, `
      ${title("TB — stage decides the ask")}
      ${box(30, 90, 140, 50, "Exposure")}
      ${arrow(170, 115, 200, 115)}
      ${box(200, 90, 160, 50, "Latent TB\nContainment", soft)}
      ${arrow(360, 115, 390, 115)}
      ${box(390, 90, 210, 50, "Active disease\nSymptoms ± contagion", "#f3e8df")}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">IGRA/TST ≠ active disease · Treat latent to prevent reactivation</text>
    `, "TB latency versus active disease"),
  },
  {
    id: "atls-survey",
    title: "ATLS primary survey",
    caption: "ABCDE with simultaneous hemorrhage control — do not skip airway for a fascinating belly exam.",
    test: /atls|primary survey|abcde|secondary survey|trauma icu|thoracic trauma/i,
    categories: /surgery|clinical|advanced/i,
    svg: svgShell(640, 230, `
      ${title("ATLS — primary survey order")}
      ${box(20, 90, 80, 45, "A\nAirway")}
      ${arrow(100, 112, 120, 112)}
      ${box(120, 90, 80, 45, "B\nBreath")}
      ${arrow(200, 112, 220, 112)}
      ${box(220, 90, 90, 45, "C\nCirc/bleed", "#f3e8df")}
      ${arrow(310, 112, 330, 112)}
      ${box(330, 90, 80, 45, "D\nDisability")}
      ${arrow(410, 112, 430, 112)}
      ${box(430, 90, 170, 45, "E\nExpose / environ", soft)}
      <text x="20" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">Life threats first · Secondary survey only after ABCDEs stable</text>
    `, "ATLS primary survey"),
  },
  {
    id: "appendicitis-path",
    title: "Appendicitis decision pathway",
    caption: "Clinical probability → labs/imaging → OR vs observation — perforation risk rises with delay in the right patient.",
    test: /appendicitis/i,
    categories: /surgery|clinical|pediatr/i,
    svg: svgShell(640, 250, `
      ${title("Appendicitis — probability then action")}
      ${box(30, 85, 150, 55, "History +\nexam score", soft)}
      ${arrow(180, 112, 220, 112)}
      ${box(220, 85, 160, 55, "Labs ±\nimaging", soft)}
      ${arrow(380, 112, 420, 112)}
      ${box(420, 85, 180, 55, "OR vs observe\n± abx pathway", "#f3e8df")}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Kids/pregnant: imaging choice changes · Don't miss perforation sepsis</text>
    `, "Appendicitis decision pathway"),
  },
  {
    id: "ssi-prevention",
    title: "SSI prevention bundle logic",
    caption: "Timing of antibiotics, skin prep, glycemic control, and wound class — prevention is a system, not a single wipe.",
    test: /surgical site infection|ssi prevention|wound class|perioperative antibiotic/i,
    categories: /surgery|clinical/i,
    svg: svgShell(640, 240, `
      ${title("SSI — prevent before you treat")}
      ${box(30, 85, 140, 55, "Abx timing\n± redose", "#f3e8df")}
      ${box(190, 85, 140, 55, "Skin prep\n+ hair logic", soft)}
      ${box(350, 85, 140, 55, "Glucose /\ntemp", soft)}
      ${box(510, 85, 100, 55, "Wound\nclass", soft)}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Post-op fever day 1 ≠ automatic SSI — timing patterns matter</text>
    `, "Surgical site infection prevention"),
  },
  {
    id: "pediatric-asthma",
    title: "Pediatric asthma exacerbation steps",
    caption: "Oxygen/SABA, steroids early, escalate to ipratropium/Mg/airway support — reassess work of breathing.",
    test: /pediatric asthma|asthma exacerbation|status asthmaticus/i,
    categories: /pediatr|clinical|family|advanced/i,
    svg: svgShell(640, 240, `
      ${title("Asthma exacerbation — escalate by response")}
      ${box(30, 85, 140, 55, "O₂ + SABA\n± ipratropium", soft)}
      ${arrow(170, 112, 210, 112)}
      ${box(210, 85, 140, 55, "Systemic\nsteroids", "#f3e8df")}
      ${arrow(350, 112, 390, 112)}
      ${box(390, 85, 210, 55, "Mg / airway\nteam if failing", soft)}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Silent chest is late · Reassess after each step</text>
    `, "Pediatric asthma exacerbation"),
  },
  {
    id: "bronchiolitis-care",
    title: "Bronchiolitis supportive care",
    caption: "Supportive O₂/hydration; routine bronchodilators and steroids do not change the disease for typical viral bronchiolitis.",
    test: /bronchiolitis/i,
    categories: /pediatr|clinical/i,
    svg: svgShell(640, 240, `
      ${title("Bronchiolitis — support, don't overtreat")}
      ${box(40, 85, 160, 55, "Assess work\nof breathing", soft)}
      ${arrow(200, 112, 250, 112)}
      ${box(250, 85, 160, 55, "O₂ / suction\nhydration", "#f3e8df")}
      ${arrow(410, 112, 460, 112)}
      ${box(460, 85, 140, 55, "Avoid routine\nSABA/steroids", soft)}
      <text x="40" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Watch apnea risk in young infants · Escalate for hypoxia/fatigue</text>
    `, "Bronchiolitis supportive care"),
  },
  {
    id: "shoulder-dystocia",
    title: "Shoulder dystocia HELPERR",
    caption: "Call for help, episiotomy decision, legs (McRoberts), pressure, enter maneuvers, remove posterior arm, roll — timed documented steps.",
    test: /shoulder dystocia|helperr|mcroberts/i,
    categories: /obstetric|clinical|advanced/i,
    svg: svgShell(640, 250, `
      ${title("Shoulder dystocia — HELPERR spine")}
      ${box(20, 80, 90, 50, "Help", soft)}
      ${box(120, 80, 90, 50, "Episiotomy\nconsider", soft)}
      ${box(220, 80, 100, 50, "Legs\nMcRoberts", "#f3e8df")}
      ${box(330, 80, 90, 50, "Pressure\nsuprapubic", soft)}
      ${box(430, 80, 90, 50, "Enter\nmaneuvers", soft)}
      ${box(530, 80, 90, 50, "Remove\n/ Roll", soft)}
      <text x="20" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">Fundal pressure is wrong · Document time on perineum</text>
    `, "Shoulder dystocia HELPERR"),
  },
  {
    id: "ectopic-emergency",
    title: "Ectopic pregnancy emergency fork",
    caption: "Pregnancy test + stability first; unstable ruptured ectopic is surgery, not a leisurely β-hCG curve.",
    test: /ectopic pregnancy|β-?hcg|beta.?hcg|tubal pregnancy/i,
    titleTest: /ectopic/i,
    categories: /obstetric|clinical|emergency|surgery/i,
    svg: svgShell(640, 250, `
      ${title("Ectopic — stability decides the lane")}
      ${box(40, 70, 160, 50, "+ hCG\n± pain/bleed", soft)}
      ${arrow(200, 95, 250, 95)}
      ${box(250, 70, 160, 50, "Unstable?", "#f3e8df")}
      ${arrow(300, 120, 200, 160)}
      ${arrow(330, 120, 450, 160)}
      ${box(100, 165, 180, 50, "OR / resus", "#f3e8df")}
      ${box(400, 165, 200, 50, "US + MTX vs surgery", soft)}
      <text x="40" y="240" font-family="Georgia, serif" font-size="11" fill="${muted}">Do not send unstable patients on a “serial hCG stroll”</text>
    `, "Ectopic pregnancy emergency"),
  },
  {
    id: "serotonin-nms",
    title: "Serotonin syndrome versus NMS",
    caption: "Serotonin syndrome: hyperreflexia/clonus, faster onset; NMS: lead-pipe rigidity, slower, dopamine-block context.",
    test: /serotonin syndrome|neuroleptic malignant|\bnms\b/i,
    categories: /psychiatr|pharmacol|clinical|advanced/i,
    svg: svgShell(640, 260, `
      ${title("SS vs NMS — don't mix the maps")}
      ${box(40, 80, 260, 90, "Serotonin syndrome\nClonus / hyperreflexia\nSerotonergic drugs\nCool + stop + cypro/benzo", "#f3e8df")}
      ${box(340, 80, 260, 90, "NMS\nLead-pipe rigidity\nAntipsychotic context\nStop + support ± dantrolene/bromo", soft)}
      <text x="40" y="210" font-family="Georgia, serif" font-size="12" fill="${muted}">Onset speed + reflex exam often separates them before labs return</text>
    `, "Serotonin syndrome versus NMS"),
  },
  {
    id: "alcohol-ciwa",
    title: "Alcohol withdrawal escalation",
    caption: "CIWA-guided benzos, thiamine, escalate for DT risk — untreated withdrawal can kill.",
    test: /alcohol withdrawal|ciwa|delirium tremens/i,
    categories: /psychiatr|clinical|internal|advanced/i,
    svg: svgShell(640, 240, `
      ${title("Alcohol withdrawal — score and treat")}
      ${box(30, 85, 140, 55, "Last drink\n+ CIWA", soft)}
      ${arrow(170, 112, 210, 112)}
      ${box(210, 85, 160, 55, "Benzos\nsymptom-triggered", "#f3e8df")}
      ${arrow(370, 112, 410, 112)}
      ${box(410, 85, 190, 55, "Escalate ICU\nif DT / refractory", soft)}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Thiamine before glucose when depleted · Watch for kindling</text>
    `, "Alcohol withdrawal CIWA care"),
  },
  {
    id: "office-htn",
    title: "Office hypertension confirmation",
    caption: "Confirm elevated readings, assess urgency/emergency, then lifestyle + drug class matched to comorbidities.",
    test: /office hypertension|hypertension diagnosis|hypertension longitudinal|outpatient.*hypertension/i,
    categories: /family|clinical|internal/i,
    svg: svgShell(640, 250, `
      ${title("Clinic HTN — confirm then classify")}
      ${box(30, 85, 150, 55, "Repeated\nreadings", soft)}
      ${arrow(180, 112, 220, 112)}
      ${box(220, 85, 160, 55, "Urgency vs\nemergency?", "#f3e8df")}
      ${arrow(380, 112, 420, 112)}
      ${box(420, 85, 180, 55, "Lifestyle +\ndrug by comorbidity", soft)}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">End-organ clues change speed · Home/ABPM when white-coat likely</text>
    `, "Office hypertension pathway"),
  },
  {
    id: "phq9-ladder",
    title: "PHQ-9 primary care ladder",
    caption: "Screen → severity → safety → therapy/meds → follow-up — positive screen without safety plan is incomplete care.",
    test: /phq-?9|depression screen|mdd treatment|behavioral health in fm/i,
    categories: /family|psychiatr|clinical/i,
    svg: svgShell(640, 240, `
      ${title("PHQ-9 — screen is not the finish line")}
      ${box(25, 90, 110, 45, "Screen")}
      ${arrow(135, 112, 155, 112)}
      ${box(155, 90, 110, 45, "Severity")}
      ${arrow(265, 112, 285, 112)}
      ${box(285, 90, 110, 45, "Safety", "#f3e8df")}
      ${arrow(395, 112, 415, 112)}
      ${box(415, 90, 190, 45, "Treat + follow-up", soft)}
      <text x="25" y="175" font-family="Georgia, serif" font-size="12" fill="${muted}">Item 9 positive → same-day safety assessment</text>
    `, "PHQ-9 care ladder"),
  },
  {
    id: "vent-goals",
    title: "Mechanical ventilation goals",
    caption: "Gas exchange, lung protection, and synchrony — FiO₂/PEEP for O₂, rate/TV for CO₂, plateau pressure limits.",
    test: /mechanical ventilation|ventilator|ards berlin|lung protective/i,
    categories: /advanced|clinical/i,
    svg: svgShell(640, 250, `
      ${title("Ventilator — name the goal you're moving")}
      ${box(30, 80, 170, 60, "Oxygenation\nFiO₂ / PEEP", soft)}
      ${box(230, 80, 170, 60, "Ventilation\nRate / TV", soft)}
      ${box(430, 80, 170, 60, "Protection\nPplat / driving P", "#f3e8df")}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">ARDS: low TV · Permissive hypercapnia when needed · Fix the cause</text>
    `, "Mechanical ventilation goals"),
  },
  {
    id: "status-epilepticus",
    title: "Status epilepticus escalation",
    caption: "Benzodiazepine first, then ASM load, then anesthetic coma — time is neurons.",
    test: /status epilepticus|seizure escalation|refractory status/i,
    categories: /advanced|clinical|pediatr|neurolog/i,
    svg: svgShell(640, 240, `
      ${title("Status — clock-driven escalation")}
      ${box(30, 85, 150, 55, "ABCs +\nbenzo", "#f3e8df")}
      ${arrow(180, 112, 220, 112)}
      ${box(220, 85, 160, 55, "ASM load\n(e.g. levetiracetam)", soft)}
      ${arrow(380, 112, 420, 112)}
      ${box(420, 85, 180, 55, "OR / ICU\nanesthetic Rx", soft)}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Don't undertreat with tiny benzo doses · Parallel workup for cause</text>
    `, "Status epilepticus escalation"),
  },
  {
    id: "ams-framework",
    title: "Altered mental status framework",
    caption: "ABCs, glucose, focal vs global, tox/metabolic/infection/structural — don't skip the reversible bedside fixes.",
    test: /altered mental status|ams framework|delirium workup|hospital delirium/i,
    categories: /clinical|internal|advanced|psychiatr/i,
    svg: svgShell(640, 250, `
      ${title("AMS — reverse the reversible first")}
      ${box(30, 80, 120, 50, "ABCs\nGlucose", "#f3e8df")}
      ${arrow(150, 105, 190, 105)}
      ${box(190, 80, 140, 50, "Focal vs\nglobal?", soft)}
      ${arrow(330, 105, 370, 105)}
      ${box(370, 70, 230, 70, "Tox / metabolic\nInfection / structural\n± psych", soft)}
      <text x="30" y="185" font-family="Georgia, serif" font-size="12" fill="${muted}">Don't call it “just dementia” until delirium triggers are cleared</text>
    `, "Altered mental status framework"),
  },
  {
    id: "acs-pathway",
    title: "ACS pathway fork",
    caption: "ECG within minutes, aspirin/anticoagulation as indicated, STEMI reperfusion clock vs UA/NSTEMI risk pathway.",
    test: /acs pathway|stemi|nstemi|acute coronary|complicated acs/i,
    titleTest: /acs|stemi|nstemi|coronary|chest pain pathway/i,
    categories: /internal|clinical|advanced|family/i,
    svg: svgShell(640, 250, `
      ${title("ACS — ECG then pathway")}
      ${box(40, 75, 140, 50, "ABCs +\nECG", "#f3e8df")}
      ${arrow(180, 100, 230, 100)}
      ${box(230, 60, 160, 40, "STEMI", soft)}
      ${box(230, 115, 160, 40, "UA/NSTEMI", soft)}
      ${arrow(390, 80, 440, 80)}
      ${arrow(390, 135, 440, 135)}
      ${box(440, 55, 160, 50, "Reperfusion\nclock", "#f3e8df")}
      ${box(440, 120, 160, 50, "Risk ± early\ninvasive", soft)}
      <text x="40" y="210" font-family="Georgia, serif" font-size="12" fill="${muted}">Aspirin early unless contraindicated · Don't delay reperfusion for troponin</text>
    `, "ACS clinical pathway"),
  },
];

function topicBlob(topic: CatalogTopic): string {
  return [topic.title, topic.contentCategory, topic.organSystem, ...topic.points, topic.quizExplain, topic.cardFront, topic.cardBack].join(" \n ");
}

/** Select figures that are pedagogically warranted for this topic (max 2). */
export function figuresForTopic(topic: CatalogTopic): ChapterFigure[] {
  const blob = topicBlob(topic);
  const cat = topic.contentCategory ?? "";
  const hits: ChapterFigure[] = [];
  for (const fig of CHAPTER_FIGURES) {
    if (!fig.test.test(blob)) continue;
    if (fig.titleTest && !fig.titleTest.test(topic.title)) continue;
    if (fig.categories && !fig.categories.test(cat) && !fig.categories.test(blob)) continue;
    hits.push(fig);
  }
  const framingIds = new Set(["pathophys-insult", "decision-spine"]);
  const specific = hits.filter((f) => !framingIds.has(f.id));
  const framing = hits.filter((f) => framingIds.has(f.id));
  if (specific.length) return specific.slice(0, 2);
  return framing.slice(0, 1);
}

export function figuresMarkdownForTopic(topic: CatalogTopic): string {
  const figs = figuresForTopic(topic);
  if (!figs.length) return "";
  const blocks = figs.map((f, i) => {
    return `#### Figure ${i + 1}. ${f.title}

![${f.title}](/figures/${f.id}.svg)

*${f.caption}*
`;
  });
  return `### Teaching figures

${blocks.join("\n")}`;
}

/** Write all figure SVGs into public/figures (idempotent). */
export function writeChapterFigureAssets(publicDir = path.join(process.cwd(), "public", "figures")) {
  fs.mkdirSync(publicDir, { recursive: true });
  for (const fig of CHAPTER_FIGURES) {
    fs.writeFileSync(path.join(publicDir, `${fig.id}.svg`), fig.svg, "utf8");
  }
  return CHAPTER_FIGURES.length;
}

export function auditTopicFigures(topic: CatalogTopic): {
  key: string;
  title: string;
  figureIds: string[];
  necessary: boolean;
  issues: string[];
} {
  const figs = figuresForTopic(topic);
  const issues: string[] = [];
  const blob = topicBlob(topic);
  for (const f of figs) {
    if (!f.test.test(blob)) issues.push(`${f.id}: matched without keyword (unexpected)`);
    // Category guard soft-check
    if (f.categories && !f.categories.test(topic.contentCategory) && !f.test.test(topic.title)) {
      // still ok if points matched strongly
    }
  }
  const needsFigure = CHAPTER_FIGURES.some((f) => {
    if (!f.test.test(blob)) return false;
    if (f.titleTest && !f.titleTest.test(topic.title)) return false;
    if (f.categories && !f.categories.test(topic.contentCategory) && !f.categories.test(blob)) {
      return false;
    }
    return true;
  });
  if (needsFigure && figs.length === 0) {
    issues.push("matcher should attach a figure but none selected");
  }
  return {
    key: topic.key,
    title: topic.title,
    figureIds: figs.map((f) => f.id),
    necessary: needsFigure,
    issues,
  };
}
