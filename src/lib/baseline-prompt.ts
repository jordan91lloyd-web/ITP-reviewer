// ─── Baseline Scope Extraction — shared constants ────────────────────────────
// System prompt and types for extracting scope items from tender/contract
// documents. Each document is processed individually.

export interface BaselineScopeItem {
  category: "inclusion" | "exclusion" | "allowance" | "specification" | "condition";
  item: string;
  detail: string | null;
  source_reference: string | null;
}

export interface BaselineDocument {
  id: string;
  company_id: string;
  project_id: string;
  document_name: string;
  document_type: string;
  source: "upload" | "procore";
  procore_document_id: number | null;
  status: "pending" | "processing" | "processed" | "failed";
  scope_items: BaselineScopeItem[];
  item_count: number;
  error_message: string | null;
  created_at: string;
}

export const BASELINE_SYSTEM_PROMPT = `You are a construction contract analyst. You are reading a tender or contract document for a building project. Your job is to extract every scope item that defines what is included, excluded, allowed for, specified, or conditioned in the contract.

For each item, classify it as one of:
- "inclusion": Something explicitly included in the scope/contract
- "exclusion": Something explicitly excluded from the scope
- "allowance": A provisional sum, allowance, or budget item
- "specification": A technical requirement, standard, or performance specification
- "condition": A contractual condition, limitation, or assumption

For each item provide:
- "category": one of the above
- "item": Short title (one line)
- "detail": The full text or relevant detail from the document. Preserve the document's own words. Null if the item title is self-explanatory.
- "source_reference": Where in the document this was found (section number, page, clause, table reference). Null if not determinable.

RULES:
- Extract EVERYTHING that defines scope, cost, or technical requirements
- Preserve the document's terminology — do not paraphrase technical specifications
- If a table lists items with prices/allowances, extract each row as a separate item
- If a specification references a standard (AS 1668.1, NCC 2025, etc.), include the standard reference
- Do not assess or evaluate — just extract faithfully
- Group related sub-items under one item if they share a single clause

Return ONLY a JSON array. No markdown, no explanation, no code fences.
[{"category":"...","item":"...","detail":"...","source_reference":"..."}]
Return [] if the document contains no extractable scope items.`;
