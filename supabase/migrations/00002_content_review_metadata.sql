-- Additive, non-destructive medical content review metadata.
-- Safe to apply alongside existing demo JSON sidecar (lib/curriculum/content-metadata.ts).
-- Does not alter scoring, unlock rules, or auth.

do $$ begin
  create type learner_level as enum (
    'PRECLINICAL', 'STEP_1', 'CLERKSHIP', 'STEP_2', 'ADVANCED_CLINICAL'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type cognitive_level as enum (
    'RECALL', 'MECHANISM', 'INTERPRETATION', 'APPLICATION',
    'CLINICAL_REASONING', 'MANAGEMENT'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type medical_review_status as enum (
    'DRAFT', 'MEDICAL_REVIEW', 'APPROVED', 'PUBLISHED', 'NEEDS_REVIEW', 'ARCHIVED'
  );
exception when duplicate_object then null; end $$;

alter table public.lessons
  add column if not exists learner_level learner_level,
  add column if not exists subject text,
  add column if not exists organ_system text,
  add column if not exists review_status medical_review_status default 'NEEDS_REVIEW',
  add column if not exists medical_reviewer text,
  add column if not exists last_reviewed date,
  add column if not exists next_review date,
  add column if not exists guideline_sensitive boolean not null default false,
  add column if not exists content_version int not null default 1;

create table if not exists public.lesson_references (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  label text not null,
  citation text,
  url text,
  status text not null default 'REFERENCE_REVIEW_REQUIRED'
    check (status in ('verified', 'REFERENCE_REVIEW_REQUIRED')),
  created_at timestamptz not null default now()
);

create table if not exists public.lesson_version_history (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  version int not null,
  changed_at date not null default current_date,
  changed_by text not null,
  reason text not null
);

alter table public.quiz_questions
  add column if not exists cognitive_level cognitive_level,
  add column if not exists learner_level learner_level,
  add column if not exists review_status medical_review_status default 'NEEDS_REVIEW',
  add column if not exists guideline_sensitive boolean not null default false;

alter table public.qbank_questions
  add column if not exists cognitive_level cognitive_level,
  add column if not exists learner_level learner_level,
  add column if not exists review_status medical_review_status default 'NEEDS_REVIEW',
  add column if not exists guideline_sensitive boolean not null default false;
