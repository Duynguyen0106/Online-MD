# Online MD

Content-first MD curriculum platform (Next.js, Supabase, Vercel).

Students complete lessons and pass mastery checks before USMLE Qbank unlocks. Qbank is an assessment layer, not primary instruction.

## Implementation plan

See [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) for schema, file layout, RLS, mastery gates, and phased build order.

**Locked product decisions**

- Single institution / one program
- Email/password auth; faculty & admin invite-only
- Student-facing AI tutor + clinical case feedback (Zod-validated)
- External media URLs only
- Student + faculty + admin surfaces in the MVP build track

## Status

Planning complete. Application scaffold not started yet.
