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

export interface DetectedChange {
  change_type: ChangeType;
  description: string;
  location_on_drawing: string | null;
  severity: Severity;
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
  created_at: string;
}

export const SYSTEM_PROMPT = `You are a construction drawing analyst comparing two revisions of the same construction drawing for a builder. Your job is to identify SCOPE and SPECIFICATION changes that affect buildability, cost, or compliance.

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
- "severity": "high" if it affects structure, fire rating, waterproofing, or significantly changes scope; "medium" for moderate scope or spec changes; "low" for minor spec adjustments

Return ONLY a JSON array. No markdown, no explanation, no code fences.
[{"change_type":"...","description":"...","location_on_drawing":"...","severity":"..."}]
Return [] if no meaningful scope/specification changes are found.`;
