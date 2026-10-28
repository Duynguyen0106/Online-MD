# Pathology Content Audit

**Date:** 2026-10-28 (Europe/London)  
**Branch intent:** Content coverage / depth audit for Online MD pathology teaching  
**Status:** Educational structure audit. **Not medical approval.**

---

## Source boundary (important)

The request referenced a WordPress-hosted PDF of *Harsh Mohan — Textbook of Pathology (6th ed.)*. That file is a **copyrighted textbook** and was **not downloaded, parsed, quoted, or used** as an audit corpus.

This audit instead measures Online MD against **public USMLE-style general and systemic pathology pillars** and classic board-discriminator themes already used in curriculum design (cell injury, inflammation, neoplasia, hemodynamics, organ-system pathology frameworks). It does **not** claim equivalence to any commercial pathology textbook.

Reproduce:

```bash
npx tsx scripts/pathology-content-audit.ts
# → docs/audit/pathology-coverage.json
# → docs/audit/pathology-depth.json
```

---

## Inventory snapshot

| Asset | Count |
| --- | ---: |
| Modules | 22 |
| Lessons | 884 |
| Catalog topics | 771 |
| Objectives | 3422 |
| Clinical cases | 25 |

---

## Verdict

**PASS with conditions** for *breadth* of pathology themes across the live curriculum graph.

| Gate | Result |
| --- | --- |
| 22/22 USMLE-style pathology pillars have keyword presence | **Yes** (all rated strong on loose presence) |
| Classic board discriminators (necrosis vs apoptosis, coagulative vs liquefactive, metaplasia/dysplasia, oncogene/suppressor, thrombosis/embolism, acute/chronic inflammation) | **Present** |
| Dedicated depth for 30 classic lesion frameworks | **24 dedicated · 5 embedded · 1 thin · 0 missing** |
| Pathology-rich clinical cases | **Thin** relative to lesson volume (many pillars have 0–1 cases) |
| Faculty citation / numeric safety | Still governed by `REFERENCE_REVIEW_REQUIRED` / `MEDICAL_REVIEW_REQUIRED.md` |

**Conditions**

1. Breadth ≠ board-ready morphology depth. Several high-yield frameworks are **embedded** in organ lessons rather than given a clear dedicated teaching spine.  
2. General pathology is heavily **catalog-generated**; handcrafted cell-injury densification should stay on the deepen queue.  
3. Do not treat keyword hits as proof of accurate histology timelines or staging rules without faculty review.  
4. This audit deliberately avoids ingesting copyrighted textbook prose.

---

## Pillar coverage (presence)

Heuristic keyword scan across lessons + catalog + objectives + cases (`pathology-coverage.json`).

All of the following pillars scored **strong** on presence (≥3 lesson hits and catalog support):

**General:** cell injury/death/adaptations; acute/chronic inflammation; repair/wound healing; hemodynamic disorders; neoplasia; genetic/congenital; immunopathology; infectious patterns; environmental/nutrition; pediatric themes.

**Systemic:** cardiovascular; respiratory; renal/urinary; GI/hepatobiliary; hematopathology; endocrine; breast/female genital; male genital/prostate; CNS; MSK/soft tissue; dermatopathology; eye/ENT themes.

**Relative thinness (still present, fewer dedicated lessons):** eye/ENT, male genital/prostate, dermatopathology, bone tumors — more catalog/incidental than clerkship-case reinforced.

---

## Classic topic depth

| Depth | Count | Meaning |
| --- | ---: | --- |
| Dedicated | 24 | Title-level lesson and/or catalog topic + substantive body hits |
| Embedded | 5 | Concept appears inside other lessons/topics, no clear dedicated spine |
| Thin | 1 | Sparse hits |
| Missing | 0 | — |

### Embedded (priority deepen / retitle candidates)

| Topic | Notes |
| --- | --- |
| Amyloidosis | Multiple incidental hits; no dedicated titled spine |
| Chemical / radiation / microbial carcinogenesis | Widely mentioned; worth a focused Year-1 neoplasia lesson path |
| Paraneoplastic syndromes | Few lessons; easy miss for Step 1 |
| Skin tumors (BCC/SCC/melanoma) | Present but not a strong dedicated track |
| Cellular adaptations suite | Ubiquitous keywords; ensure one coherent adaptations chapter remains findable |

### Thin

| Topic | Notes |
| --- | --- |
| **MI morphologic timeline** | Catalog point exists (`MI timeline histology` on a CV pathology topic) but dedicated teachable timeline prose is sparse. Faculty should deepen from primary histology sources — **do not paste copyrighted textbook tables**. |

### Strong dedicated examples (non-exhaustive)

Pathologic calcification; endogenous pigments; edema mechanisms; red vs white infarct; hypersensitivity I–IV; TB morphology cues; atherosclerosis morphology; nephritic vs nephrotic; Crohn vs UC; obstructive vs restrictive lung frames; anemia classification; leukemia/lymphoma frameworks; diabetes morphology cues; thyroid pathology; cervical/HPV; prostate BPH vs carcinoma; CNS tumors/herniation themes.

---

## Cross-checks with existing medical audit

Aligned with [`MEDICAL_CONTENT_AUDIT.md`](../MEDICAL_CONTENT_AUDIT.md) and [`MEDICAL_REVIEW_REQUIRED.md`](../MEDICAL_REVIEW_REQUIRED.md):

- Structural hygiene (objectives, sources footers, duplicate IDs) already improved.  
- Guideline-sensitive clinical numbers remain **out of scope** for autonomous rewrite.  
- Pathology morphology timelines and staging schemes should join the faculty review queue when taught with exact hours/criteria.

---

## Recommendations (safe next steps)

1. **Faculty deepen pack (no copyrighted paste):** amyloidosis; carcinogenesis modalities; paraneoplastic map; MI histology timeline (verify against faculty-preferred primary source); skin tumor discriminators.  
2. **Case reinforcement:** add progressive cases that force morphology → mechanism → management for TB/granuloma, infarct type, nephritic sediment, and a breast or prostate vignette.  
3. **Discoverability:** ensure Year-1 general pathology catalog keys are linked from the cell/molecular and pathology-adjacent module UIs so “embedded” topics are findable.  
4. **Keep refusing** ingestion of pirated/copyrighted full textbooks as curriculum source material; cite licensed or faculty-approved references only.

---

## What this audit is not

- Not a chapter-by-chapter concordance with Harsh Mohan, Robbins, or any other commercial text.  
- Not a claim that Online MD replaces a pathology course textbook.  
- Not medical or board-prep certification.
