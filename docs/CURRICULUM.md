# Curriculum architecture — 4-year MD map

## Pedigree (public patterns, not copied syllabi)

Online MD follows the architecture of leading US MD programs: **integrated preclinical foundations + organ systems**, then **core clerkships**, then **advanced clinical / sub-internship** work — redesigned for asynchronous mastery learning.

| Online MD phase | Academic years | Analogous residential pattern |
| --- | --- | --- |
| Years 1–2 Preclinical | ≥2 full-time years | Mechanisms + organ-system blocks (Bridges / Genes-to-Society–style integration) |
| Year 3 Core clerkships + Year 4 advanced | ~1–2 years | IM, Surgery, Peds, OB/GYN, Psychiatry, FM (+ sub-I / ICU / complex ambulatory topics) |

## Full-time hour budget (design target)

Assumptions: **40 hours/week × 46 weeks/year**, mastery multiplier **≈2×** first-pass study (re-reads, quizzes ≥80%, exams, spaced cards, cases).

| Block | First-pass lesson hours (catalog) | With mastery (~2×) | Full-time duration |
| --- | --- | --- | --- |
| Preclinical Y1–Y2 | ~1,860 h | ~3,720 h | **≥2.0 years** |
| Clinical Y3–Y4 | ~624 h | ~1,248 h | ~0.7 years catalog + clerkship immersion framing |
| **Program total (catalog)** | ~2,484 h | ~4,968 h | **~2.7 years** of structured Online MD study units |

> Residential MD still includes ~2 years of clinical immersion that online modules approximate but do not fully replace (procedural volume, longitudinal clinics, overnight call). Online MD’s **preclinical** load is sized so a full-time student needs **at least 2 years** before clerkship Qbank unlocks.

## Module map (sticks to curriculum)

### Year 1 — Mechanisms
Biochemistry & Metabolism · Anatomy/Embryology · Cells/Molecules/Pathology · Immunology · Microbiology/ID foundations · Pharmacology · Epidemiology/Biostats · Ethics/Systems

### Year 2 — Organ systems & pathophysiology
Cardiovascular · Respiratory · Renal · GI/Hepatology · Endocrine · Hematology · Neurosciences · MSK/Rheum · Host defense/ID (systems)

### Year 3 — Core clerkships
Internal Medicine · Surgery · Pediatrics · OB/GYN · Psychiatry · Family Medicine

### Year 4 — Advanced
Sub-I / ICU / complex ambulatory topics layered on clerkship modules + advanced clinical phase

## Online adaptations

- Lessons are **multi-hour study units** (preclinical ≈5 h; clinical ≈4 h) with reading, integration, vignette, formative quiz, and flashcard.
- **Mastery gates** replace seat time; Qbank remains assessment-after-mastery.
- Faculty AI uses the textbook-domain map (`lib/ai/knowledge-domains.ts`) plus lesson context.

## Content integrity

- Original educational writing; USMLE Content Outline–aligned domains.
- No proprietary question banks or school LMS text.
- Catalog generator: `lib/curriculum/catalog/` (528+ topics) layered on seed + waves 1–7.
- Sync path: same graph → Supabase tables when Auth/DB cutover completes.
