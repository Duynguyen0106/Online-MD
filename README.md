# Online MD

Content-first MD curriculum platform (Next.js App Router, TypeScript, Tailwind, Supabase-ready, Vercel).

Students complete lessons and pass mastery checks before USMLE Qbank unlocks. Qbank is an assessment layer, not primary instruction.

## Locked product decisions

- Single institution / one program
- Email/password auth; faculty & admin invite-only
- Student-facing AI tutor + clinical case feedback (Zod-validated)
- External media URLs only
- Student + faculty + admin surfaces in the MVP build track

## Curriculum model

The seeded curriculum follows the structure common to leading US MD programs:

1. **Phase 1 — Foundations (organ systems):** cell/molecular mechanisms, then CV, pulmonary, renal, GI/hepatology, endocrine, hematology, neurosciences, MSK/rheum, host defense/ID.
2. **Phase 2 — Core clerkships:** Internal Medicine, Surgery, Pediatrics, OB/GYN, Psychiatry, Family Medicine.

Content is **original educational writing** aligned to public USMLE Content Outline domains (not copied from any school LMS, First Aid, UWorld, or other copyrighted banks). External media uses public YouTube URLs.

## Quick start (demo mode)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Progress persists in `.data/`. Switch student/faculty/admin in the header.

```bash
npm test
npm run mastery   # Cell module → Qbank unlock path
npm run build
```

Auth routes: `/login` (students), `/invite/[token]` (faculty/admin). Admin: `/admin/invites`, `/admin/users`, `/admin/unlock-rules`.
## Faculty AI

`lib/ai/medical-educator.ts` uses a board-level medical educator system prompt. Responses are validated with Zod.

- Offline (default): structured expert scaffolding without an API key
- Live: set `AI_ENABLED=true`, `AI_API_KEY`, optional `AI_BASE_URL` / `AI_MODEL`

## Supabase

Schema + RLS sketch: [`supabase/migrations/00001_init.sql`](supabase/migrations/00001_init.sql). Demo mode runs without Supabase; connect credentials in `.env` to migrate off the file store.

## Docs

- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Curriculum notes](docs/CURRICULUM.md)
