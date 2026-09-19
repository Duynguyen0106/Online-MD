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
- Expand depth by editing [`lib/curriculum/seed.ts`](../lib/curriculum/seed.ts); production path syncs the same graph into Supabase tables.
