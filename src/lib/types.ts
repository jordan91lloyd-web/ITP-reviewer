// ─── Shared TypeScript types used across the app ───────────────────────────

export type ProcessedFile =
  | { kind: "text"; filename: string; text: string }
  | { kind: "image"; filename: string; base64: string; mediaType: "image/jpeg" | "image/png" };

export interface DocumentObservation {
  filename: string;
  observation: string;
}

export interface InspectionHeader {
  project_name: string | null;
  project_number: string | null;
  itp_number: string | null;
  itp_name: string | null;
  inspection_reference: string | null;
  extraction_confidence: "high" | "medium" | "low";
}

export interface MissingEvidence {
  item: number;
  evidence_type: string;
  reason: string;
  status: "Missing" | "Substantially complete" | "Unclear";
}

export interface KeyIssue {
  item: number;
  title: string;
  explanation: string;
}

export interface CategoryScore {
  applicable_points: number;
  achieved_points: number;
}

export interface ScoreBreakdown {
  excluded_as_not_applicable: string[];
  category_scores: {
    high_value: CategoryScore;
    medium_value: CategoryScore;
    low_value: CategoryScore;
  };
  scoring_explanation: string;
  strong_contributors: string[];
  score_reductions: string[];
  genuinely_missing: string[];
}

export type ScoreBand = "excellent" | "good" | "partial" | "poor" | "critical";

export interface ReviewResult {
  inspection_header: InspectionHeader;
  total_score: number;           // 0–100, computed from achieved/applicable
  score_band: ScoreBand;
  confidence: "high" | "medium" | "low";
  package_assessment: "complete" | "mostly complete" | "incomplete";
  executive_summary: string;
  applicable_points: number;     // total points possible from applicable items
  achieved_points: number;       // total points earned
  score_breakdown: ScoreBreakdown;
  missing_evidence: MissingEvidence[];
  key_issues: KeyIssue[];
  next_actions: string[];
  document_observations: DocumentObservation[];
}

export type ReviewResponse =
  | { success: true; result: ReviewResult }
  | { success: false; error: string };
