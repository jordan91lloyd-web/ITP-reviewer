// ─── Review History Store ─────────────────────────────────────────────────────
// Persists QA review records to Supabase (review_records table).
// Replaces the previous local JSON file at data/review-history.json.
//
// All functions are async — callers must await them.
//
// Required Supabase table — bulk_queue_jobs (create once via SQL editor):
//
//   CREATE TABLE bulk_queue_jobs (
//     id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     company_id TEXT NOT NULL,
//     project_id TEXT NOT NULL,
//     status     TEXT NOT NULL DEFAULT 'running',
//     -- status: 'running' | 'completed' | 'failed'
//     items      JSONB NOT NULL,
//     -- array of { inspection_id, project_id, status, error? }
//     -- item status: 'queued' | 'processing' | 'done' | 'failed'
//     created_at TIMESTAMPTZ DEFAULT now(),
//     updated_at TIMESTAMPTZ DEFAULT now()
//   );
//
//   Enable RLS on the table; add a "No public access" policy
//   (same pattern as review_records). All access is via SUPABASE_SERVICE_ROLE_KEY.
//
//   Migration — add user_id column to bulk_queue_jobs (run once):
//
//   ALTER TABLE bulk_queue_jobs ADD COLUMN user_id TEXT;
//
// Required Supabase table — procore_tokens (create once via SQL editor):
//
//   CREATE TABLE procore_tokens (
//     id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     company_id    TEXT NOT NULL,
//     user_id       TEXT NOT NULL,
//     access_token  TEXT NOT NULL,
//     refresh_token TEXT NOT NULL,
//     expires_at    BIGINT NOT NULL,
//     -- Unix ms timestamp (same format as procore_token_expires_at cookie)
//     created_at    TIMESTAMPTZ DEFAULT now(),
//     updated_at    TIMESTAMPTZ DEFAULT now(),
//     UNIQUE(company_id, user_id)
//   );
//
//   ALTER TABLE procore_tokens ENABLE ROW LEVEL SECURITY;
//   CREATE POLICY "No public access" ON procore_tokens FOR ALL USING (false);

import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import type { ReviewResult } from "@/lib/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ReviewRecord {
  id: string;
  source: "procore" | "manual";

  // Procore identifiers (null for manual uploads)
  procore_project_id:    number | null;
  procore_inspection_id: number | null;
  company_id:            string | null;
  inspection_title:      string;

  // Review outcome
  reviewed_at:        string;
  score:              number;
  score_band:         string;
  package_assessment: string;

  // Sequential inspection number Claude extracted from the document
  // (e.g. "Pour #24" → 24). Null on old records or when not found.
  inspection_number_of_type: number | null;

  // Full ReviewResult JSON — powers the dashboard D1–D5 breakdown and
  // full-report view without re-running the review.
  review_data: ReviewResult | null;

  // Scoring document version used for this review
  scoring_version_id:    string | null;
  scoring_version_label: string | null;

  // Procore change-detection
  procore_updated_at: string | null;
}

// ── Public API ─────────────────────────────────────────────────────────────────

/** Load the full review history for a company, ordered oldest-first. Returns [] on error. */
export async function loadHistory(company_id: string): Promise<ReviewRecord[]> {
  const { data, error } = await supabase
    .from("review_records")
    .select("*")
    .eq("company_id", company_id)
    .order("reviewed_at", { ascending: true });

  if (error) {
    console.error("[history] loadHistory error:", error.message);
    return [];
  }

  return (data ?? []) as ReviewRecord[];
}

/** Insert a new review record. Returns the saved record. */
export async function appendRecord(
  record: Omit<ReviewRecord, "id">
): Promise<ReviewRecord> {
  const entry: ReviewRecord = { id: randomUUID(), ...record };

  const { data, error } = await supabase
    .from("review_records")
    .insert(entry)
    .select()
    .single();

  if (error) {
    throw new Error(`[history] Failed to save review record: ${error.message}`);
  }

  return data as ReviewRecord;
}

/**
 * Returns the most recent review for a given Procore inspection, scoped to
 * company_id so history badges are accurate across multiple companies.
 */
export async function findLatestForInspection(
  project_id: number,
  inspection_id: number,
  company_id: string
): Promise<ReviewRecord | undefined> {
  const { data, error } = await supabase
    .from("review_records")
    .select("*")
    .eq("procore_project_id", project_id)
    .eq("procore_inspection_id", inspection_id)
    .eq("company_id", company_id)
    .order("reviewed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[history] findLatestForInspection error:", error.message);
    return undefined;
  }

  return data ?? undefined;
}
