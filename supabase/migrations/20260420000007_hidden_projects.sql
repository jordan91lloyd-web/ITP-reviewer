-- ─── Hidden Projects ──────────────────────────────────────────────────────────
-- Tracks which projects a company has hidden from the dashboard sidebar.
-- Visibility is per-company (not per-user) — hiding a project hides it for everyone.

create table if not exists hidden_projects (
  id          uuid primary key default gen_random_uuid(),
  company_id  text not null,
  project_id  text not null,
  hidden_by   text,               -- user email
  hidden_at   timestamptz not null default now(),
  unique (company_id, project_id)
);

create index if not exists hidden_projects_company_id_idx on hidden_projects (company_id);

alter table hidden_projects enable row level security;

-- Service role can read/write everything (used by API routes with SUPABASE_SERVICE_ROLE_KEY).
-- Anon/publishable key gets no access — visibility is managed server-side only.
create policy "Service role full access"
  on hidden_projects
  for all
  to service_role
  using (true)
  with check (true);
