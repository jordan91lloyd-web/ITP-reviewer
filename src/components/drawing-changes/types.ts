export interface DashboardProject {
  id: number;
  name: string;
  display_name: string;
}

export interface RevisionInfo {
  revision_number: string;
  pdf_url: string;
}

export interface DrawingPair {
  drawing_id: number;
  drawing_number: string;
  drawing_title: string;
  discipline: string;
  revision_count: number;
  revisions: RevisionInfo[];
  old_revision: RevisionInfo;
  new_revision: RevisionInfo;
  scanned_pairs: string[];
  status: "scanned" | "new_revision" | "not_scanned";
}

export type ReviewStatus = "needs_review" | "not_a_variation" | "variation_raised";
export type VariationRisk = "likely_variation" | "within_scope" | "unclear";
export type SortOption = "discipline" | "severity" | "variation_risk" | "change_type";

export interface ChangeRow {
  id: string;
  discipline: string;
  drawing_number: string;
  drawing_title: string;
  old_revision: string;
  new_revision: string;
  change_type: string;
  description: string;
  location_on_drawing: string | null;
  severity: string;
  variation_risk: VariationRisk | null;
  variation_note: string | null;
  review_status: ReviewStatus | null;
  change_event_id: string | null;
  old_pdf_storage_path: string | null;
  new_pdf_storage_path: string | null;
}

export interface BaselineScopeItem {
  category: "inclusion" | "exclusion" | "allowance" | "specification" | "condition";
  item: string;
  detail: string | null;
  source_reference: string | null;
}

export interface BaselineDoc {
  id: string;
  document_name: string;
  source: "upload" | "procore";
  status: "pending" | "processing" | "processed" | "failed" | "skipped";
  scope_items: BaselineScopeItem[];
  item_count: number;
  file_size: number | null;
  error_message: string | null;
  created_at: string;
}

export interface ScanRecord {
  id: string;
  project_name: string;
  status: string;
  total_drawings: number;
  completed_drawings: number;
  failed_drawings: number;
  created_at: string;
  completed_at: string | null;
}

export interface ScanInfo {
  id: string;
  created_at: string;
  status: string;
  total_drawings: number;
  completed_drawings: number;
}

export interface DocCompareResult {
  change_type: string;
  description: string;
  location_on_drawing: string | null;
  severity: string;
  variation_risk: string | null;
  variation_note: string | null;
}

export interface DrawingGroupData {
  number: string;
  title: string;
  totalChanges: number;
  totalHigh: number;
  totalVariations: number;
  totalNeedReview: number;
  hasEvent: boolean;
  revisions: RevisionGroupData[];
}

export interface RevisionGroupData {
  revKey: string;
  rev: string;
  changes: ChangeRow[];
}

export type RegisterFlatRow =
  | { type: "discipline"; key: string; discipline: string; changeCount: number; highCount: number; drawingCount: number }
  | { type: "drawing"; key: string; data: DrawingGroupData; discipline: string; hasMultipleRevs: boolean }
  | { type: "revisions-panel"; key: string; drawingNumber: string; discipline: string }
  | { type: "revision-header"; key: string; rev: string; changeCount: number; highCount: number }
  | { type: "change"; key: string; change: ChangeRow };

export type PickerFlatRow =
  | { type: "discipline-header"; key: string; discipline: string; count: number; selectedCount: number; allSelected: boolean }
  | { type: "drawing-row"; key: string; pair: DrawingPair };
