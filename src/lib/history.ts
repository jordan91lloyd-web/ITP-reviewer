// ─── Review History Store ─────────────────────────────────────────────────────
// Persists QA review records to Supabase (review_records table).
// Replaces the previous local JSON file at data/review-history.json.
//
// All functions are async — callers must await them.
// Structured so the function signatures remain stable if the storage layer
// ever changes again — all access goes through the four exported functions below.

import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ReviewRecord {
  id: string;                          // UUID, stable across runs
  source: "procore" | "manual";

  // Procore identifiers (null for manual uploads)
  procore_project_id:    number | null;
  procore_inspection_id: number | null;
  inspection_title:      string;

  // Review outcome
  reviewed_at:        string;   // ISO 8601 — when this app ran the review
  score:              number;
  score_band:         string;
  package_assessment: string;

  // Procore change-detection: the inspection's updated_at value at review time.
  // If the current updated_at is newer, we flag it as "changed since review".
  procore_updated_at: string | null;
}

// ── Public API ─────────────────────────────────────────────────────────────────

/** Load the full review history, ordered oldest-first. Returns [] on error. */
export async function loadHistory(): Promise<ReviewRecord[]> {
  const { data, error } = await supabase
    .from("review_records")
    .select("*")
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
 * Returns the most recent review for a given Procore inspection, or undefined.
 * Used to determine review_status when listing inspections.
 */
export async function findLatestForInspection(
  project_id: number,
  inspection_id: number
): Promise<ReviewRecord | undefined> {
  const { data, error } = await supabase
    .from("review_records")
    .select("*")
    .eq("procore_project_id", project_id)
    .eq("procore_inspection_id", inspection_id)
    .order("reviewed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[history] findLatestForInspection error:", error.message);
    return undefined;
  }

  return data ?? undefined;
}
