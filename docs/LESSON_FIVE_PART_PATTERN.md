# Five-part lesson pattern — How it works / Why it matters

**Reference implementation:** `les-cv-2` — Ischemic Heart Disease & ACS  
**Source:** `lib/curriculum/lessons/ischemic-heart-acs.ts`  
**Date:** 2026-10-29 (Europe/London)

---

## Audit findings (pre-fix)

Auto-expanded seed lessons used a generic chapter shell (`seed-chapter-enhance.ts`) that often:

| Section | Problem |
| --- | --- |
| **How it works** | Dumped broad factual-enrichment prose (including “textbook chapter method” language) only loosely tied to the lesson’s objectives |
| **Why it matters clinically** | Used abstract loss/gain-of-function prompts and empty bridge tables instead of decisions, pitfalls, and look-alikes |
| **Progressive disclosure** | Mixed core mechanism with nuances; no explicit “start here / open later” spine |

---

## Target shape (keep the outer spine)

1. **The basics** — objectives + how to use the lesson  
2. **How it works** — mechanism (progressive)  
3. **Why it matters clinically** — decisions / pitfalls / look-alikes  
4. **Put it together** — teach-back + sources  
5. **Vignette** → **Quiz**

### How it works (required moves)

1. **Core mechanism (start here)** — one continuous causal story  
2. **Classification / anchors** bound to *this* lesson’s objectives  
3. **Nuances** — clearly marked as open-after-core  
4. **Self-check** — 2–3 teach-back questions  
5. Avoid meta phrases like “textbook chapter method,” “organ frame,” or generic control-point filler

### Why it matters clinically (required moves)

1. **Decisions this mechanism changes** — what you do/watch for  
2. **Common pitfalls** — explicit, say-out-loud mistakes  
3. **Look-alikes** — table with discriminator clues  
4. **Bedside synthesis prompt** — ordered clinical reasoning  
5. Prefer clinical reasoning language over abstract “loss/gain of function” templates

---

## Roll out to other lessons

### Option A — Hand-author a reference file (preferred for high-traffic lessons)

1. Copy `lib/curriculum/lessons/ischemic-heart-acs.ts` as a template.  
2. Rewrite Basics objectives from the lesson’s real `Objective[]` rows.  
3. Fill How it works / Why it matters with mechanism → decisions → pitfalls → look-alikes.  
4. Mount the lesson object in `lib/curriculum/seed.ts` (or the relevant expansions wave) in place of the thin seed.  
5. Keep reading length substantial **or** include titles matching `/How it works/i` and `/Why it matters clinically/i` so `enhanceThinSeedLesson` will **not** overwrite the spine.  
6. Add a focused test asserting: progressive headings present, no “textbook chapter method”, pitfalls/look-alikes present, enhancer does not clobber.

### Option B — Rely on improved generic expander

Thin lessons without a hand-authored spine still pass through `enhanceThinSeedLesson`, which now uses the improved How it works / Why it matters templates (clinical moves, pitfalls, look-alikes).  
**Quality ceiling is lower than Option A** — use Option A for core clerkship/pathophysiology lessons students hit first.

### Suggested next hand-authored targets

1. Heart Failure & Foundational Therapy (`les-cv-3`)  
2. Cell Injury, Death & Adaptation (`les-cell-2`)  
3. Chest Pain & ACS Reasoning (clerkship expansion)  
4. One renal (AKI) and one pulmonary (gas exchange / respiratory failure) lesson

### Do not

- Paste copyrighted textbook chapters into How it works  
- Invent numeric STEMI millimeter rules, troponin cutoffs, or drug doses — keep `REFERENCE_REVIEW_REQUIRED`  
- Re-run the generic enhancer over a finished five-part lesson
