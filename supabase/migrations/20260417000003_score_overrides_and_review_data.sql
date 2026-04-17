-- ── Extend review_records ─────────────────────────────────────────────────────
-- inspection_number_of_type: the sequential number Claude identifies from the
-- document (e.g. "Pour #24"). Populated on new reviews; null on old records.
alter table public.review_records
  add column if not exists inspection_number_of_type integer;

-- review_data: full ReviewResult JSON so the dashboard can show D1–D5 breakdown,
-- missing evidence, and the full report without re-running the review.
alter table public.review_records
  add column if not exists review_data jsonb;


-- ── score_overrides ───────────────────────────────────────────────────────────
-- Human QA override for an AI-assigned score. Append-only: each save adds a
-- new row; the latest row for a review_record_id is the active override.

create table if not exists public.score_overrides (
  id                uuid        primary key default gen_random_uuid(),
  review_record_id  uuid        not null references public.review_records(id),
  company_id        text        not null,
  original_score    integer     not null,
  override_score    integer     not null check (override_score >= 0 and override_score <= 100),
  note              text,
  created_at        timestamptz not null default now(),
  created_by        text
);

create index if not exists score_overrides_review_record_idx
  on public.score_overrides (review_record_id);

create index if not exists score_overrides_company_id_idx
  on public.score_overrides (company_id);
