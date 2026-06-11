// Single source of truth for ITP score band thresholds, labels, and colours.
// Import from here everywhere a band threshold, label, or colour is needed.
// Do NOT hardcode threshold literals (85, 70, 50) elsewhere in the codebase.

import type { ScoreBand } from "./types";

export type { ScoreBand };

// Canonical thresholds — change here only (then grep confirms no duplicates remain).
// Intentionally strict: 85+ for Compliant matches the audit-readiness standard.
export const BAND_THRESHOLDS = {
  compliant:        85,
  minor_gaps:       70,
  significant_gaps: 50,
  // critical_risk = anything below significant_gaps
} as const;

export interface BandDef {
  band:  ScoreBand;
  label: string;
  range: string; // display string, e.g. "85–100"
  min:   number;
  max:   number;
}

export const BANDS: BandDef[] = [
  { band: "compliant",        label: "Compliant",       range: "85–100", min: 85, max: 100 },
  { band: "minor_gaps",       label: "Minor gaps",      range: "70–84",  min: 70, max: 84  },
  { band: "significant_gaps", label: "Significant gaps", range: "50–69", min: 50, max: 69  },
  { band: "critical_risk",    label: "Critical risk",   range: "0–49",   min: 0,  max: 49  },
];

/** Return the band for a numeric score, or null when score is null/unreviewed. */
export function getScoreBand(score: number | null): ScoreBand | null {
  if (score === null) return null;
  if (score >= BAND_THRESHOLDS.compliant)        return "compliant";
  if (score >= BAND_THRESHOLDS.minor_gaps)       return "minor_gaps";
  if (score >= BAND_THRESHOLDS.significant_gaps) return "significant_gaps";
  return "critical_risk";
}

/** Human-readable label for a band key. */
export function getBandLabel(band: string | null | undefined): string {
  return BANDS.find(b => b.band === band)?.label ?? "—";
}

/** Tailwind classes for the band pill (border + bg + text). */
export function getBandPillClasses(band: string | null | undefined): string {
  if (band === "compliant")        return "bg-green-50 text-green-700 border border-green-200";
  if (band === "minor_gaps")       return "bg-amber-50 text-amber-700 border border-amber-200";
  if (band === "significant_gaps") return "bg-orange-50 text-orange-700 border border-orange-200";
  if (band === "critical_risk")    return "bg-red-50 text-red-700 border border-red-200";
  return "bg-gray-50 text-gray-500 border border-gray-200";
}

/** CSS-variable colour for the numeric score display, matching the score's band. */
export function getScoreColor(score: number | null): string {
  if (score === null) return "var(--hp-text-muted)";
  if (score >= BAND_THRESHOLDS.compliant)        return "var(--hp-compliant)";
  if (score >= BAND_THRESHOLDS.minor_gaps)       return "var(--hp-minor)";
  if (score >= BAND_THRESHOLDS.significant_gaps) return "var(--hp-significant)";
  return "var(--hp-critical)";
}

/** Dot background colour for ITP row status indicator. */
export function getScoreDotColor(score: number | null, isReviewed: boolean): string {
  if (!isReviewed || score === null) return "#D4C4AE";
  if (score >= BAND_THRESHOLDS.compliant)        return "var(--hp-compliant)";
  if (score >= BAND_THRESHOLDS.minor_gaps)       return "var(--hp-minor)";
  if (score >= BAND_THRESHOLDS.significant_gaps) return "var(--hp-significant)";
  return "var(--hp-critical)";
}
