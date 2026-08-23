// ─── Action Plan conversion types ─────────────────────────────────────────
// Shared interfaces for the report-to-Action-Plan converter.

export interface ActionPlanActivity {
  sequence: number;
  original_item_number: string | null;
  section: string;
  activity_title: string;
  acceptance_criteria: string | null;
  source_reference: string | null;
  original_report_content: string;
}

export interface ConvertedActionPlan {
  action_plan_name: string;
  source_document: string;
  report_title: string | null;
  report_date: string | null;
  report_author: string | null;
  report_company: string | null;
  description: string;
  activities: ActionPlanActivity[];
}
