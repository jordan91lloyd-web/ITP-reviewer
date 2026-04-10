// ─── Shared TypeScript types used across the app ───────────────────────────

/**
 * A single file from the bundle, after it has been processed on the server.
 *
 * - "text"  → we extracted readable text from a PDF
 * - "image" → we have a raw image (JPG/PNG) to send to Claude's vision API
 */
export type ProcessedFile =
  | { kind: "text"; filename: string; text: string }
  | {
      kind: "image";
      filename: string;
      base64: string;
      mediaType: "image/jpeg" | "image/png";
    };

/** One file's observation returned by Claude */
export interface DocumentObservation {
  filename: string;
  observation: string;
}

/**
 * Package identification fields extracted automatically by Claude from the bundle.
 * Null means Claude could not confidently identify the field.
 */
export interface InspectionHeader {
  project_name: string | null;
  project_number: string | null;
  itp_number: string | null;
  itp_name: string | null;
  inspection_reference: string | null;
  extraction_confidence: "high" | "medium" | "low";
}

/**
 * A single missing-evidence item returned by Claude.
 * Uses evidence quality classification aligned with practical ITP review.
 */
export interface MissingEvidence {
  item: number;
  evidence_type: string;
  reason: string;
  status: "Missing" | "Substantially complete" | "Unclear";
}

/**
 * Explanation of how the overall score was determined.
 * Used to give site managers and PMs a plain-language breakdown.
 */
export interface ScoreBreakdown {
  rationale: string;           // 2–3 sentence overview of how the score was reached
  strong_contributors: string[]; // evidence that strongly boosted the score
  score_reductions: string[];    // gaps or issues that reduced the score
  genuinely_missing: string[];   // items truly absent (not just informal/unsigned)
}

/** A single key issue (problem, inconsistency, or concern) returned by Claude. */
export interface KeyIssue {
  item: number;
  title: string;
  explanation: string;
}

/** The full structured result returned by Claude */
export interface ReviewResult {
  inspection_header: InspectionHeader;
  score: number;                          // 0–100
  confidence: "high" | "medium" | "low";
  executive_summary: string;
  package_assessment: "complete" | "mostly complete" | "incomplete";
  score_breakdown: ScoreBreakdown;
  missing_evidence: MissingEvidence[];
  key_issues: KeyIssue[];
  next_actions: string[];
  document_observations: DocumentObservation[];
}

/** What the /api/review route returns to the browser */
export type ReviewResponse =
  | { success: true; result: ReviewResult }
  | { success: false; error: string };
