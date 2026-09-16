// Engine 3: Report to Inspection Creator
// Separate from Engine 1 (ITP Review) and Engine 2 (Action Plan converter)

export interface InspectionItem {
  sequence: number;
  /** Section name — groups items into inspection sections */
  section: string;
  /** Short, verifiable check item for mobile pass/fail (~80 chars) */
  item_name: string;
  /** Original numbering from the source report */
  original_item_number: string | null;
  /** Where in the source document this item came from */
  source_reference: string | null;
  /** The original report text this item was derived from */
  original_report_content: string;
}

export interface ConvertedInspection {
  /** Becomes the Procore template name (prefixed with [HP] + timestamp on upload) */
  template_name: string;
  /** Original filename */
  source_document: string;
  report_title: string | null;
  report_date: string | null;
  report_author: string | null;
  report_company: string | null;
  /** Becomes the inspection description */
  description: string;
  items: InspectionItem[];
}
