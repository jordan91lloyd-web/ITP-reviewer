-- ─── Audit Log ───────────────────────────────────────────────────────────────
-- Records every significant user action for compliance and operational review.

CREATE TABLE IF NOT EXISTS audit_log (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id   text        NOT NULL,
  user_id      text        NOT NULL,
  user_name    text        NOT NULL,
  user_email   text,
  action       text        NOT NULL,
  entity_type  text,          -- "inspection" | "project"
  entity_id    text,          -- Procore inspection or project ID
  entity_name  text,          -- human-readable name e.g. "ITP-002 Concrete Form Reo Pour #24"
  project_id   text,
  project_name text,
  details      jsonb,         -- structured extras: old_score, new_score, file_count, etc.
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS audit_log_company_id_idx  ON audit_log (company_id);
CREATE INDEX IF NOT EXISTS audit_log_user_id_idx     ON audit_log (user_id);
CREATE INDEX IF NOT EXISTS audit_log_created_at_idx  ON audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS audit_log_action_idx      ON audit_log (action);
