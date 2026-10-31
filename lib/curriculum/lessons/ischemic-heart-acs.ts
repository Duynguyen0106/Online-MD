/**
 * Reference five-part lesson: Ischemic Heart Disease & ACS (les-cv-2).
 *
 * Pattern goals for “How it works” + “Why it matters clinically”:
 * - Bound to lesson objectives (territory localization; STEMI/NSTE-ACS/UA)
 * - Clinical reasoning language (not “textbook chapter method”)
 * - Explicit pitfalls / look-alikes
 * - Progressive disclosure: core mechanism → classification → nuances
 */
import type { Lesson } from "@/lib/types/domain";

function reading(
  id: string,
  conceptId: string,
  title: string,
  sequence: number,
  bodyMd: string,
) {
  return {
    id,
    conceptId,
    blockType: "reading" as const,
    title,
    sequence,
    bodyMd,
  };
}

function vignette(
  id: string,
  conceptId: string,
  title: string,
  sequence: number,
  bodyMd: string,
) {
  return {
    id,
    conceptId,
    blockType: "clinical_vignette" as const,
    title,
    sequence,
    bodyMd,
  };
}

const CONCEPT_ID = "con-cv-2a";

export const ischemicHeartAcsLesson: Lesson = {
  id: "les-cv-2",
  moduleId: "mod-cv",
  title: "Ischemic Heart Disease & ACS",
  slug: "cv-acs",
  sequence: 2,
  estimatedMinutes: 55,
  status: "published",
  quizPassThreshold: 0.8,
  quizQuestionIds: ["qq-cv-2"],
  concepts: [
    {
      id: CONCEPT_ID,
      lessonId: "les-cv-2",
      title: "Coronary territories and ACS classification",
      sequence: 1,
      summary:
        "Localize LAD/LCx/RCA ischemia on ECG and classify STEMI vs NSTE-ACS vs unstable angina from ECG + troponin reasoning.",
      blocks: [
        reading(
          "blk-cv-2-basics",
          CONCEPT_ID,
          "1. The basics",
          1,
          `# Ischemic Heart Disease & ACS

**Module:** Cardiovascular System

## Objectives for this lesson

By the end, you should be able to:

1. **Localize** the threatened myocardium to LAD, LCx, or RCA territory from a typical ST-elevation pattern.
2. **Classify** the presentation as STEMI, NSTEMI, or unstable angina using ECG + troponin concepts (no invented numeric cutoffs).
3. Name the **mechanism** that links plaque disruption to those phenotypes.
4. List **can’t-miss look-alikes** that mimic ACS before you lock the diagnosis.

## How to use this lesson

Read **How it works** for the mechanism spine first. Then use **Why it matters clinically** for decisions, pitfalls, and look-alikes. Finish with Put it together, the vignette, and the quiz.
`,
        ),
        reading(
          "blk-cv-2-how",
          CONCEPT_ID,
          "2. How it works",
          2,
          `## How it works — ischemic heart disease & ACS

### 1. Core mechanism (start here)

Myocardial ischemia means **oxygen supply cannot meet demand**.

In atherosclerotic disease the usual acute story is:

1. **Thin-cap fibroatheroma** ruptures or erodes  
2. **Platelet adhesion/aggregation** + coagulation cascade  
3. **Coronary thrombus** partially or completely occludes flow  
4. Downstream myocardium becomes ischemic → injury → necrosis if flow is not restored

Stable angina is usually **fixed stenoses** with demand ischemia on exertion.  
**ACS** is the acute plaque/thrombus spectrum on top of that biology.

Hold that spine before adding ECG labels.

### 2. What the labels mean (classification)

| Label | ECG idea | Troponin idea | Mechanism cue |
| --- | --- | --- | --- |
| **Unstable angina** | Ischemic symptoms / ECG changes possible | No rise | Acute plaque event without detectable necrosis |
| **NSTEMI** | No STEMI-criteria ST elevation (may have depression/T-wave changes) | Rise | Partial occlusion / non-occlusive thrombus → necrosis |
| **STEMI** | ST elevation (or equivalent) in a territory | Usually rises | Occlusive thrombus → transmural threat → **emergent reperfusion** |

Teaching shorthand: **ECG decides STEMI pathway urgency; troponin separates UA from NSTEMI within NSTE-ACS.** Exact millimeter criteria and assay cutoffs are institutional — REFERENCE_REVIEW_REQUIRED.

### 3. Territory map (localize before you name the artery “for sure”)

Typical STEMI lead clusters → wall → **usual** culprit:

| Leads | Wall | Usual artery |
| --- | --- | --- |
| V1–V4 | Anterior / septal | **LAD** |
| I, aVL, V5–V6 | Lateral | **LCx** (sometimes diagonal/OM) |
| II, III, aVF | Inferior | **RCA** (or LCx if left-dominant) |

**Nuance — open after the table:**  
- Inferior STEMI: compare III vs II; marked III > II with reciprocal aVL favors **RCA**.  
- Right-sided leads (e.g., V4R) when you suspect **RV infarct** with inferior STEMI.  
- Posterior involvement may show tall R waves / ST depression in V1–V3 as a reciprocal window.

You are practicing **probabilistic localization**, not claiming angiography from leads alone.

### 4. Supply–demand (type 2) ischemia — related but different story

When a patient has troponin rise from **anemia, tachyarrhythmia, hypoxia, hypotension, or hypertensive crisis** without acute atherothrombosis as the driver, think **demand ischemia / type 2 MI** framing.

Still treat the cause and watch for coexistent ACS — but do not force every troponin(+) case into the plaque-rupture script.

### 5. Self-check before the clinical section

- Can you explain plaque → thrombus → STEMI vs NSTE-ACS in one breath?  
- Can you point to LAD vs inferior patterns on a blank ECG template?  
- Can you say what unstable angina and NSTEMI share, and what splits them?
`,
        ),
        reading(
          "blk-cv-2-why",
          CONCEPT_ID,
          "3. Why it matters clinically",
          3,
          `## Why it matters clinically — decisions, pitfalls, look-alikes

### 1. Why classification changes the first moves

| If you classify… | Clinical reasoning priority |
| --- | --- |
| **STEMI (or equivalent)** | Activate **emergent reperfusion** thinking (PCI preferred; fibrinolysis only when PCI cannot be timely and contraindications are absent — REFERENCE_REVIEW_REQUIRED) |
| **NSTE-ACS** | Stabilize ischemia, antithrombotic concepts, **risk-stratify** for invasive timing — not “ignore because no ST elevation” |
| **Unstable angina** | Same acute-plaque caution as NSTE-ACS; serial ECGs/troponins because the first draw can miss evolving injury |
| **Demand ischemia** | Fix the driver (O₂, rate, pressure, hemoglobin) while you still exclude true ACS when the story fits |

ECG within minutes is the safety habit — not an afterthought once the troponin returns.

### 2. Common pitfalls (say these out loud)

1. **Anchoring on “troponin pending”** while ST elevation already demands reperfusion thinking.  
2. **Calling every troponin(+) “STEMI care”** — NSTEMI and type 2 pathways differ.  
3. **Missing RV infarct** in inferior STEMI → nitrates / preload-sensitive hypotension.  
4. **Treating MONA-BASH as a contemporary checklist** — historical teaching vocabulary only; modern framing is ABC + antiplatelet/anticoagulation concepts + reperfusion pathway (REFERENCE_REVIEW_REQUIRED for regimens).  
5. **Localizing with absolute certainty** from a single ECG without dominance / reciprocal context.

### 3. Look-alikes — keep them on the board

| Look-alike | Why it fools you | What pulls you away from ACS-only anchoring |
| --- | --- | --- |
| **Aortic dissection** | Severe chest/back pain ± troponin if coronaries involved | Pulse deficit, neurologic signs, widened mediastinum, sudden tearing onset |
| **PE** | Chest pain, dyspnea, sometimes troponin/RV strain | Risk factors, hypoxia out of proportion, ECG often non-territorial |
| **Pericarditis / myopericarditis** | ST elevation | Diffuse ST elevation, PR depression, pain positional, viral prodrome |
| **Takotsubo / spasm / MINOCA frames** | ACS-like ECG or troponin | Angiography without culprit, stress trigger — advanced nuance |
| **Esophageal / biliary / MSK pain** | Chest discomfort | Exam and history; still get ECG when ACS remains plausible |

**Rule:** for acute chest pain, run a **threat filter** (ACS, dissection, PE, tension pneumothorax, esophageal rupture) before you celebrate a single diagnosis.

### 4. Bedside synthesis prompt

For the next patient with possible ACS, force this order:

1. Unstable? (airway, shock, arrhythmia)  
2. ECG now — STEMI pathway or not?  
3. Territory hypothesis if ST elevation  
4. Troponin trajectory for NSTE-ACS vs UA  
5. Explicit look-alike you have not excluded  

That sequence *is* the clinical payoff of the mechanism section.
`,
        ),
        reading(
          "blk-cv-2-together",
          CONCEPT_ID,
          "4. Put it together",
          4,
          `## Put it together — Ischemic Heart Disease & ACS

### One continuous story

Plaque disruption → thrombus → ischemia/necrosis.  
**STEMI** = occlusive threat with ST elevation (or equivalent) → emergent reperfusion thinking.  
**NSTE-ACS** = UA (troponin−) or NSTEMI (troponin+) without STEMI criteria → antithrombotic + risk-based invasive timing.  
**Leads** localize the wall; **artery** is probabilistic (LAD / LCx / RCA ± dominance).

### Teach-back checklist

- [ ] I can draw LAD / LCx / RCA territories onto a torso or ECG map  
- [ ] I can split STEMI vs NSTEMI vs UA without inventing lab numbers  
- [ ] I can name three ACS look-alikes and one discriminating clue each  
- [ ] I can explain why inferior STEMI makes me think about RV and preload  

### Sources

| Guideline / reference | Status |
| --- | --- |
| AHA/ACC ACS / STEMI–NSTE-ACS pathway family | REFERENCE_REVIEW_REQUIRED |
| Institutional ECG STEMI criteria and troponin assay cutoffs | REFERENCE_REVIEW_REQUIRED |

Last reviewed: not yet medically approved. Exact doses, door-to-balloon targets, and fibrinolysis windows belong to primary sources after faculty review.
`,
        ),
        vignette(
          "blk-cv-2-vignette",
          CONCEPT_ID,
          "Vignette: inferior STEMI",
          5,
          `62M with diaphoresis and crushing chest pressure. ECG: ST elevation in **II, III, aVF** with reciprocal depression in **aVL**. Blood pressure 118/74, lungs clear, no murmur yet.

**Work the case in order:**
1. Is this STEMI-pathway ECG or NSTE-ACS?  
2. Which wall is threatened, and which artery is most likely?  
3. What complication should you watch for before giving preload-reducing agents?  
4. Name one look-alike you still have not fully excluded.

**Teaching point:** Inferior ST elevation + reciprocal aVL localizes to the inferior wall, usually **RCA** (LCx if left-dominant). Think **RV infarct** before nitrates. Reperfusion urgency beats historical MONA checklists — verify current institutional ACS pathway (REFERENCE_REVIEW_REQUIRED).`,
        ),
      ],
    },
  ],
};
