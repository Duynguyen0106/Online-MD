-- Online MD schema (Supabase / Postgres)
-- Apply with supabase db push or psql when connecting a project.

create extension if not exists "pgcrypto";

do $$ begin
  create type user_role as enum ('student', 'faculty', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type progress_state as enum ('not_started', 'in_progress', 'completed', 'mastered');
exception when duplicate_object then null; end $$;

do $$ begin
  create type content_block_type as enum (
    'video', 'reading', 'diagram', 'audio', 'clinical_vignette', 'formative_question'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type usmle_step as enum ('step1', 'step2ck');
exception when duplicate_object then null; end $$;

do $$ begin
  create type attempt_status as enum ('in_progress', 'submitted', 'abandoned');
exception when duplicate_object then null; end $$;

do $$ begin
  create type unlock_scope as enum (
    'module_qbank', 'phase_step1_qbank', 'clerkship_step2_qbank', 'custom'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type invite_status as enum ('pending', 'accepted', 'revoked', 'expired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type publish_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  full_name text,
  role user_role not null default 'student',
  cohort_year int,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role user_role not null check (role in ('faculty', 'admin')),
  token_hash text unique not null,
  status invite_status not null default 'pending',
  invited_by uuid references public.profiles (id),
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text
);

create table if not exists public.phases (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  name text not null,
  slug text not null,
  sequence int not null,
  phase_kind text not null,
  usmle_focus usmle_step,
  description text
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references public.phases (id) on delete cascade,
  title text not null,
  slug text not null,
  sequence int not null,
  description text,
  is_core_clerkship boolean not null default false,
  status publish_status not null default 'draft',
  exam_pass_threshold numeric not null default 0.70
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules (id) on delete cascade,
  title text not null,
  slug text not null,
  sequence int not null,
  estimated_minutes int,
  status publish_status not null default 'draft',
  quiz_pass_threshold numeric not null default 0.80
);

create table if not exists public.concepts (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  title text not null,
  sequence int not null,
  summary text
);

create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  concept_id uuid not null references public.concepts (id) on delete cascade,
  block_type content_block_type not null,
  title text not null,
  sequence int not null,
  body_md text,
  media_url text,
  media_provider text,
  duration_seconds int,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.objectives (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  statement text not null,
  usmle_step usmle_step not null,
  organ_system text not null,
  physician_task text not null,
  content_category text not null,
  module_id uuid references public.modules (id) on delete set null
);

create table if not exists public.objective_lesson_map (
  objective_id uuid references public.objectives (id) on delete cascade,
  lesson_id uuid references public.lessons (id) on delete cascade,
  weight numeric not null default 1,
  primary key (objective_id, lesson_id)
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  module_id uuid references public.modules (id) on delete cascade,
  phase_id uuid references public.phases (id) on delete cascade,
  state progress_state not null default 'not_started',
  percent_complete numeric not null default 0,
  mastered_at timestamptz,
  unique (user_id, module_id)
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  state progress_state not null default 'not_started',
  last_formative_score numeric,
  mastered_at timestamptz,
  started_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table if not exists public.content_block_views (
  user_id uuid not null references public.profiles (id) on delete cascade,
  content_block_id uuid not null references public.content_blocks (id) on delete cascade,
  viewed_at timestamptz not null default now(),
  seconds_watched int,
  primary key (user_id, content_block_id)
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons (id) on delete cascade,
  stem text not null,
  choices jsonb not null,
  correct_choice_id text not null,
  explanation text,
  objective_id uuid references public.objectives (id),
  sequence int not null default 1,
  is_active boolean not null default true
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  status attempt_status not null default 'in_progress',
  score numeric,
  responses jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  submitted_at timestamptz
);

create table if not exists public.module_exams (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null unique references public.modules (id) on delete cascade,
  title text not null,
  pass_threshold numeric not null default 0.70
);

create table if not exists public.exam_questions (
  id uuid primary key default gen_random_uuid(),
  module_exam_id uuid not null references public.module_exams (id) on delete cascade,
  stem text not null,
  choices jsonb not null,
  correct_choice_id text not null,
  explanation text,
  objective_id uuid references public.objectives (id),
  sequence int not null default 1
);

create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  module_exam_id uuid not null references public.module_exams (id) on delete cascade,
  status attempt_status not null default 'in_progress',
  score numeric,
  passed boolean,
  responses jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  submitted_at timestamptz
);

create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons (id) on delete set null,
  concept_id uuid references public.concepts (id) on delete set null,
  front text not null,
  back text not null,
  objective_id uuid references public.objectives (id),
  created_by uuid references public.profiles (id),
  is_active boolean not null default true
);

create table if not exists public.card_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  flashcard_id uuid not null references public.flashcards (id) on delete cascade,
  easiness numeric not null default 2.5,
  interval_days int not null default 0,
  repetitions int not null default 0,
  due_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  last_quality int,
  unique (user_id, flashcard_id)
);

create table if not exists public.qbank_questions (
  id uuid primary key default gen_random_uuid(),
  usmle_step usmle_step not null,
  module_id uuid references public.modules (id) on delete set null,
  stem text not null,
  choices jsonb not null,
  correct_choice_id text not null,
  explanation text,
  organ_system text not null,
  physician_task text not null,
  content_category text not null,
  objective_id uuid references public.objectives (id),
  difficulty int not null default 3,
  is_active boolean not null default true
);

create table if not exists public.qbank_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  usmle_step usmle_step,
  module_id uuid references public.modules (id),
  mode text not null default 'tutor',
  status attempt_status not null default 'in_progress',
  question_ids uuid[] not null default '{}',
  responses jsonb not null default '{}'::jsonb,
  score numeric,
  started_at timestamptz not null default now(),
  submitted_at timestamptz
);

create table if not exists public.unlock_rules (
  id uuid primary key default gen_random_uuid(),
  scope unlock_scope not null,
  name text not null,
  target_module_id uuid references public.modules (id),
  target_phase_id uuid references public.phases (id),
  requires_all_modules_in_phase boolean not null default false,
  requires_core_clerkship boolean not null default false,
  min_module_state progress_state not null default 'mastered',
  is_active boolean not null default true,
  config jsonb not null default '{}'::jsonb
);

create table if not exists public.clinical_cases (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.modules (id),
  title text not null,
  presentation_md text not null,
  stages jsonb not null,
  teaching_points text,
  objective_ids uuid[] not null default '{}',
  status publish_status not null default 'draft'
);

create table if not exists public.case_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  case_id uuid not null references public.clinical_cases (id) on delete cascade,
  status attempt_status not null default 'in_progress',
  student_responses jsonb not null default '{}'::jsonb,
  ai_feedback jsonb,
  score numeric,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.tutor_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid references public.lessons (id),
  module_id uuid references public.modules (id),
  created_at timestamptz not null default now()
);

create table if not exists public.tutor_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.tutor_threads (id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  structured jsonb,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.content_block_views enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.card_reviews enable row level security;
alter table public.qbank_attempts enable row level security;
alter table public.case_attempts enable row level security;
alter table public.tutor_threads enable row level security;
alter table public.tutor_messages enable row level security;

create policy profiles_self on public.profiles
  for select using (auth.uid() = id);

create policy lesson_progress_owner on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy block_views_owner on public.content_block_views
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy quiz_attempts_owner on public.quiz_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy exam_attempts_owner on public.exam_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy card_reviews_owner on public.card_reviews
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy qbank_attempts_owner on public.qbank_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy case_attempts_owner on public.case_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy tutor_threads_owner on public.tutor_threads
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
