-- ─── Scoring Versions ─────────────────────────────────────────────────────────
-- Tracks every version of the scoring guidelines document uploaded per company.
-- Every review record is stamped with the version that was active when it ran.

create table if not exists scoring_versions (
  id                 uuid        primary key default gen_random_uuid(),
  company_id         text        not null,
  version_number     text        not null,   -- e.g. "1.0", "1.1", "2.0"
  uploaded_by_email  text        not null,
  uploaded_by_name   text,
  uploaded_at        timestamptz not null default now(),
  file_name          text,
  file_size          integer,
  source             text        not null,   -- "supabase" | "fallback_file" | "fallback_hardcoded"
  notes              text
);

create index if not exists scoring_versions_company_uploaded_idx
  on scoring_versions (company_id, uploaded_at desc);

-- Stamp each review with the scoring version that was active
alter table public.review_records
  add column if not exists scoring_version_id    uuid references scoring_versions(id),
  add column if not exists scoring_version_label text;

create index if not exists review_records_scoring_version_idx
  on public.review_records (scoring_version_id)
  where scoring_version_id is not null;
