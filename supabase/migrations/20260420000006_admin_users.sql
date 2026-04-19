-- ─── Company Admins ───────────────────────────────────────────────────────────
-- Tracks which users have admin access per company.
-- Admins can manage scoring documents and add/remove other admins.

CREATE TABLE IF NOT EXISTS company_admins (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id  text        NOT NULL,
  email       text        NOT NULL,
  name        text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  created_by  text,
  UNIQUE (company_id, email)
);

CREATE INDEX IF NOT EXISTS company_admins_company_id_idx ON company_admins (company_id);
CREATE INDEX IF NOT EXISTS company_admins_email_idx       ON company_admins (email);

-- Seed first admin for Fleek Constructions
INSERT INTO company_admins (company_id, email, name, created_by)
VALUES ('598134325535477', 'jordan@fleekconstructions.au', 'Jordan', 'system')
ON CONFLICT DO NOTHING;
