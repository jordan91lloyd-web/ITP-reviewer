-- ── Add company_id to review_records ─────────────────────────────────────────
-- Scopes review history to a specific Procore company so badges are accurate
-- when a user has access to multiple companies.
--
-- Note: the `projects` table already has `company_id bigint` from the initial
-- migration — no change needed there.

alter table public.review_records
  add column if not exists company_id text;

-- Index for fast company-scoped history lookups
create index if not exists review_records_company_id_idx
  on public.review_records (company_id);
