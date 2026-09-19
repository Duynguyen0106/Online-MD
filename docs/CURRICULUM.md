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
- Layered expansions: `expansions.ts`, `expansions-depth.ts`, `expansions-wave3.ts` … `expansions-wave7.ts`.
- Faculty AI domain map: [`lib/ai/knowledge-domains.ts`](../lib/ai/knowledge-domains.ts) (Guyton/Robbins/Katzung/Harrison-class conceptual depth — not copyrighted prose).
- Production path syncs the same graph into Supabase tables.

## Depth coverage (expansions)

Current build targets **100+ original lessons** with ≥6 per module. High-yield additions include Parkinson/MG, RA/SLE, TB/endocarditis, shoulder dystocia, previa/abruption, nephritic/nephrotic, diuretics, Mendelian genetics, ADME, tamponade, cirrhosis decompensation, SS vs NMS, and pediatric asthma exacerbation, layered on prior waves (shock, PE, IBD, TLS, etc.).

