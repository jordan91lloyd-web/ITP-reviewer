// ─── Drawing Revision Changes — shared constants ────────────────────────────
// System prompt and types for comparing drawing revisions via Claude vision.
// Import from this module — do NOT copy-paste inline.

export const CHANGE_TYPES = [
  "addition",
  "deletion",
  "spec_change",
  "relocation",
] as const;

export type ChangeType = (typeof CHANGE_TYPES)[number];

export type Severity = "low" | "medium" | "high";

export type VariationRisk = "likely_variation" | "within_scope" | "unclear";

export interface DetectedChange {
  change_type: ChangeType;
  description: string;
  location_on_drawing: string | null;
  severity: Severity;
  variation_risk: VariationRisk | null;
  variation_note: string | null;
}

export interface DrawingPair {
  drawing_id: number;
  drawing_number: string;
  drawing_title: string;
  discipline: string;
  old_revision: { revision_number: string; pdf_url: string };
  new_revision: { revision_number: string; pdf_url: string };
}

export interface ScanResult {
  id: string;
  company_id: string;
  project_id: string;
  project_name: string;
  status: "pending" | "running" | "completed" | "failed";
  total_drawings: number;
  completed_drawings: number;
  failed_drawings: number;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface ChangeRow {
  id: string;
  scan_id: string;
  company_id: string;
  project_id: string;
  discipline: string;
  drawing_number: string;
  drawing_title: string;
  old_revision: string;
  new_revision: string;
  change_type: ChangeType;
  description: string;
  location_on_drawing: string | null;
  severity: Severity;
  variation_risk: VariationRisk | null;
  variation_note: string | null;
  created_at: string;
}

// ── Baseline scope item (imported from baseline-prompt.ts at runtime) ────────
export interface BaselineScopeItemRef {
  category: string;
  item: string;
  detail: string | null;
  source_reference: string | null;
}

// ── System prompt builder ────────────────────────────────────────────────────
// When baseline scope items are provided, the prompt includes them so Claude
// can assess each drawing change against the original contract scope.

const BASE_PROMPT = `You are a construction drawing analyst comparing two revisions of the same construction drawing for a builder. Your job is to identify SCOPE and SPECIFICATION changes that affect buildability, cost, or compliance.

COMPARE the OLD revision against the NEW revision and identify every meaningful change.

INCLUDE these types of changes:
- addition: New elements, rooms, features, specifications, or requirements added
- deletion: Elements, rooms, features, or requirements removed
- spec_change: Material, dimension, finish, rating, or performance specification altered
- relocation: Elements moved to a different position on the drawing

DO NOT flag:
- Cosmetic annotation changes (cloud markings, revision triangles, date stamps)
- Drawing border or title block updates
- Changes to revision history tables on the drawing
- Minor text reformatting that does not change meaning
- Drawing number or sheet reference updates

For each change, provide:
- "change_type": one of "addition", "deletion", "spec_change", "relocation"
- "description": Clear one-sentence description of what changed and its construction impact
- "location_on_drawing": Approximate location using grid references, zones, room names, or levels visible on the drawing. Null if not determinable.
- "severity": "high" if it affects structure, fire rating, waterproofing, or significantly changes scope; "medium" for moderate scope or spec changes; "low" for minor spec adjustments`;

const BASELINE_SECTION = `

BASELINE SCOPE ASSESSMENT:
You have been provided with scope items extracted from the project's tender and contract documents. For EACH change you identify, also assess whether it falls within the original contracted scope or represents a potential variation.

For each change, also provide:
- "variation_risk": one of:
  - "likely_variation" — the change introduces scope, materials, or requirements NOT covered by the baseline documents. This is something the builder could price as a variation.
  - "within_scope" — the change aligns with or is already covered by an existing inclusion, specification, or allowance in the baseline.
  - "unclear" — insufficient baseline information to determine. The baseline may not cover this trade or discipline.
- "variation_note": One sentence explaining your assessment. Reference the specific baseline item if it matches (e.g. "Matches specification clause 4.2 — AS/NZS 1668.1 compliance"). If a likely variation, explain what is new (e.g. "Acoustic insulation rating increased to Rw52 — original spec was Rw45").

BASELINE SCOPE ITEMS:
`;

const OUTPUT_FORMAT_NO_BASELINE = `

Return ONLY a JSON array. No markdown, no explanation, no code fences.
[{"change_type":"...","description":"...","location_on_drawing":"...","severity":"..."}]
Return [] if no meaningful scope/specification changes are found.`;

const OUTPUT_FORMAT_WITH_BASELINE = `

Return ONLY a JSON array. No markdown, no explanation, no code fences.
[{"change_type":"...","description":"...","location_on_drawing":"...","severity":"...","variation_risk":"...","variation_note":"..."}]
Return [] if no meaningful scope/specification changes are found.`;

/**
 * Build the system prompt for drawing comparison.
 * When baseline scope items are provided, includes them so Claude can assess variation risk.
 */
export function buildSystemPrompt(baselineItems?: BaselineScopeItemRef[]): string {
  if (!baselineItems || baselineItems.length === 0) {
    return BASE_PROMPT + OUTPUT_FORMAT_NO_BASELINE;
  }

  // Format scope items as a readable list grouped by category
  const byCategory: Record<string, BaselineScopeItemRef[]> = {};
  for (const item of baselineItems) {
    if (!byCategory[item.category]) byCategory[item.category] = [];
    byCategory[item.category].push(item);
  }

  const lines: string[] = [];
  for (const [category, items] of Object.entries(byCategory)) {
    lines.push(`\n[${category.toUpperCase()}]`);
    for (const item of items) {
      let line = `• ${item.item}`;
      if (item.detail) line += ` — ${item.detail}`;
      if (item.source_reference) line += ` (${item.source_reference})`;
      lines.push(line);
    }
  }

  return BASE_PROMPT + BASELINE_SECTION + lines.join("\n") + OUTPUT_FORMAT_WITH_BASELINE;
}

// Legacy export — unchanged prompt for backward compatibility
export const SYSTEM_PROMPT = BASE_PROMPT + OUTPUT_FORMAT_NO_BASELINE;
