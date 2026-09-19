# Curriculum architecture notes

## Pedigree (public patterns, not copied syllabi)

Top US MD schools increasingly use **integrated organ-system preclerkship** blocks followed by **core clinical clerkships**. Online MD mirrors that architecture for asynchronous mastery learning:

| Online MD phase | Analogous residential pattern |
| --- | --- |
| Phase 1 Foundations | Organ-system / mechanism blocks (e.g., Bridges-style, Genes-to-Society-style integration) |
| Phase 2 Core clerkships | IM, Surgery, Peds, OB/GYN, Psychiatry, Family Medicine |

## Online adaptations

- Lessons replace lecture days; **content blocks** mix reading, diagram notes, vignettes, and external videos.
- **Mastery gates** replace seat-time progression.
- **Qbank** unlocks only after module/phase mastery (assessment, not primary instruction).
- **Faculty AI** tutors against loaded lesson context with a medical-educator system prompt.

## Content integrity

- No copyrighted question banks or school LMS text.
- Objectives tagged with USMLE step, organ system, physician task, content category.
- Base graph: [`lib/curriculum/seed.ts`](../lib/curriculum/seed.ts). Layered expansions: [`expansions.ts`](../lib/curriculum/expansions.ts), [`expansions-depth.ts`](../lib/curriculum/expansions-depth.ts), [`expansions-wave3.ts`](../lib/curriculum/expansions-wave3.ts), [`expansions-wave4.ts`](../lib/curriculum/expansions-wave4.ts).
- Production path syncs the same graph into Supabase tables.

## Depth coverage (expansions)

| Domain | Example lessons |
| --- | --- |
| Shock & arrhythmias & valves | `les-cv-4`, `les-cv-5`, `les-cv-6` |
| PE, ARDS, asthma/COPD | `les-pulm-3`–`5` |
| Portal HTN, UGIB, pancreatitis | `les-gi-3`–`5` |
| Inflammation, immunity, neoplasia | `les-cell-3`–`6` |
| Hyponatremia, hyperkalemia, adrenal | `les-renal-4/5`, `les-endo-3/4` |
| Syncope, status, meningitis | `les-im-3`, `les-neuro-4/5` |
| Heme / ID / Psych / Peds / OB / Surg / FM / MSK / AKI / CAP / trauma / T2DM | wave-3 + wave-4 clerkship lessons |
| First-wave clerkship expansions | DKA/HHS, ACS, sepsis, acute abdomen, preeclampsia, septic joint, FM screening |
