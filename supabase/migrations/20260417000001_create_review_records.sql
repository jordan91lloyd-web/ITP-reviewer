-- ── review_records ────────────────────────────────────────────────────────────
-- Stores every QA review run by the app. Replaces data/review-history.json.
-- Append-only: rows are never updated or deleted — each re-review adds a new row.
-- The most recent row for a (procore_project_id, procore_inspection_id) pair is
-- treated as the current review status for that inspection.

create table if not exists public.review_records (
  id                    uuid        primary key,
  source                text        not null check (source in ('procore', 'manual')),
  procore_project_id    bigint,
  procore_inspection_id bigint,
  inspection_title      text        not null,
  reviewed_at           timestamptz not null,
  score                 integer     not null,
  score_band            text        not null,
  package_assessment    text        not null,
  procore_updated_at    timestamptz,
  created_at            timestamptz not null default now()
);

-- Fast lookup: "give me the latest review for this project + inspection"
create index if not exists review_records_procore_inspection_idx
  on public.review_records (procore_project_id, procore_inspection_id, reviewed_at desc);


-- ── projects ──────────────────────────────────────────────────────────────────
-- Caches Procore project metadata so we don't need to re-fetch it on every
-- import. Keyed by Procore's project ID (bigint).

create table if not exists public.projects (
  id             bigint      primary key,   -- Procore project ID
  name           text        not null,
  display_name   text,
  project_number text,
  company_id     bigint      not null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Index for company-scoped project lookups
create index if not exists projects_company_id_idx
  on public.projects (company_id);
