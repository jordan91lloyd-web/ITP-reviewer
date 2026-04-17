// ─── Review History Store ─────────────────────────────────────────────────────
// Persists QA review records to a local JSON file at data/review-history.json.
// Tracks which Procore inspections have been reviewed, their score, and the
// Procore updated_at timestamp so we can detect changes since the last review.
//
// Structured so a real database can replace this without changing callers —
// all access goes through the four exported functions below.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DATA_DIR  = path.join(process.cwd(), "data");
const HIST_FILE = path.join(DATA_DIR, "review-history.json");

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ReviewRecord {
  id: string;                          // local UUID, stable across runs
  source: "procore" | "manual";

  // Procore identifiers (null for manual uploads)
  procore_project_id:    number | null;
  procore_inspection_id: number | null;
  inspection_title:      string;

  // Review outcome
  reviewed_at:       string;   // ISO 8601 — when this app ran the review
  score:             number;
  score_band:        string;
  package_assessment: string;

  // Procore change-detection: the inspection's updated_at value at review time.
  // If the current updated_at is newer, we flag it as "changed since review".
  procore_updated_at: string | null;
}

// ── Internal helpers ───────────────────────────────────────────────────────────

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

// ── Public API ─────────────────────────────────────────────────────────────────

/** Load the full review history. Returns [] if the file doesn't exist yet. */
export function loadHistory(): ReviewRecord[] {
  if (!existsSync(HIST_FILE)) return [];
  try {
    return JSON.parse(readFileSync(HIST_FILE, "utf-8")) as ReviewRecord[];
  } catch {
    return [];
  }
}

/** Append a new review record and persist to disk. Returns the saved record. */
export function appendRecord(record: Omit<ReviewRecord, "id">): ReviewRecord {
  ensureDataDir();
  const history = loadHistory();
  const entry: ReviewRecord = { id: randomUUID(), ...record };
  history.push(entry);
  writeFileSync(HIST_FILE, JSON.stringify(history, null, 2), "utf-8");
  return entry;
}

/**
 * Returns the most recent review for a given Procore inspection, or undefined.
 * Used to determine review_status when listing inspections.
 */
export function findLatestForInspection(
  project_id: number,
  inspection_id: number
): ReviewRecord | undefined {
  return loadHistory()
    .filter(
      r =>
        r.procore_project_id    === project_id &&
        r.procore_inspection_id === inspection_id
    )
    .sort(
      (a, b) =>
        new Date(b.reviewed_at).getTime() - new Date(a.reviewed_at).getTime()
    )[0];
}
