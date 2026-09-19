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
- Base graph: [`lib/curriculum/seed.ts`](../lib/curriculum/seed.ts). Layered expansions: [`lib/curriculum/expansions.ts`](../lib/curriculum/expansions.ts) + [`lib/curriculum/expansions-depth.ts`](../lib/curriculum/expansions-depth.ts).
- Production path syncs the same graph into Supabase tables.

## Depth coverage (expansions)

| Domain | Example lessons |
| --- | --- |
| Shock & arrhythmias | `les-cv-4`, `les-cv-5` |
| PE & ARDS | `les-pulm-3`, `les-pulm-4` |
| Portal HTN & UGIB | `les-gi-3`, `les-gi-4` |
| Inflammation & immunity | `les-cell-3`, `les-cell-4` |
| Hyponatremia / thyroid crises | `les-renal-4`, `les-endo-3` |
| Syncope / status | `les-im-3`, `les-neuro-4` |
| Heme / ID / Psych / Peds / OB / Surg / FM / MSK / AKI | `les-heme-3/4`, `les-id-3/4`, `les-psych-3/4`, `les-peds-3/4`, `les-obgyn-3/4`, `les-surg-3`, `les-fm-3`, `les-msk-3`, `les-im-4` |
| Clerkship expansions | DKA/HHS, ACS, sepsis, acute abdomen, preeclampsia, septic joint, FM screening, etc. |
