// ─── Inspection Creator Claude client ─────────────────────────────────────
// Engine 3: Report to Inspection Creator.
// Completely separate from Engine 1 (claude.ts) and Engine 2 (actionPlanClaude.ts).

import Anthropic from "@anthropic-ai/sdk";
import { INSPECTION_CREATOR_SYSTEM_PROMPT, buildInspectionCreatorInstructions } from "./inspectionCreatorPrompt";
import type { ConvertedInspection, InspectionItem } from "./inspectionCreatorTypes";

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 24000;

/**
 * Converts a single document into a structured inspection checklist.
 * Accepts PDF (native), images (vision), or pre-extracted text (docx/xlsx).
 */
export async function runInspectionConversion(
  fileBuffer: Buffer,
  filename: string,
  mimeType: "application/pdf" | "image/jpeg" | "image/png" | "text/plain"
): Promise<ConvertedInspection> {
  console.log(`[inspection-creator] Converting "${filename}" (${mimeType})`);

  const client = new Anthropic();
  const contentBlocks: Anthropic.ContentBlockParam[] = [];

  contentBlocks.push({ type: "text", text: `Document: ${filename}` });

  if (mimeType === "application/pdf") {
    contentBlocks.push({
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data: fileBuffer.toString("base64") },
    });
  } else if (mimeType === "text/plain") {
    contentBlocks.push({ type: "text", text: fileBuffer.toString("utf-8") });
  } else {
    contentBlocks.push({
      type: "image",
      source: { type: "base64", media_type: mimeType, data: fileBuffer.toString("base64") },
    });
  }

  contentBlocks.push({
    type: "text",
    text: buildInspectionCreatorInstructions(filename),
  });

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: INSPECTION_CREATOR_SYSTEM_PROMPT,
    messages: [{ role: "user", content: contentBlocks }],
  });

  const message = await stream.finalMessage();
  const block = message.content[0];
  if (block.type !== "text") {
    throw new Error("Unexpected response format from Claude (expected a text block).");
  }

  const rawResponse = block.text;
  const stopReason = message.stop_reason;
  console.log(`[inspection-creator] stop_reason=${stopReason} | response_length=${rawResponse.length}`);

  if (stopReason === "max_tokens") {
    throw new Error(
      "The conversion response was truncated (exceeded the token limit). The document may be too large or complex."
    );
  }

  const parsed = extractJson(rawResponse);
  return validateInspection(parsed, filename);
}

function extractJson(raw: string): unknown {
  try { return JSON.parse(raw); } catch { /* fall through */ }

  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    try { return JSON.parse(fenceMatch[1].trim()); } catch { /* fall through */ }
  }

  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try { return JSON.parse(raw.slice(start, end + 1)); } catch { /* fall through */ }
  }

  throw new Error(`No valid JSON found in Claude response. First 500 chars: ${raw.slice(0, 500)}`);
}

function validateInspection(raw: unknown, filename: string): ConvertedInspection {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Claude returned an unexpected result format (not a JSON object).");
  }

  const r = raw as Record<string, unknown>;

  function needStr(key: string): string {
    if (typeof r[key] !== "string") throw new Error(`Missing or invalid field "${key}" (expected string).`);
    return r[key] as string;
  }

  function strOrNull(key: string): string | null {
    if (r[key] === null || r[key] === undefined) return null;
    if (typeof r[key] !== "string") throw new Error(`Field "${key}" must be a string or null.`);
    return r[key] as string;
  }

  const template_name = needStr("template_name");
  const source_document = typeof r.source_document === "string" ? r.source_document : filename;
  const report_title = strOrNull("report_title");
  const report_date = strOrNull("report_date");
  const report_author = strOrNull("report_author");
  const report_company = strOrNull("report_company");
  const description = needStr("description");

  if (!Array.isArray(r.items)) {
    throw new Error('Missing or invalid field "items" (expected array).');
  }
  if (r.items.length === 0) {
    throw new Error("Claude returned zero items — the document may not contain inspectable checks.");
  }

  const items: InspectionItem[] = r.items.map((item: unknown, i: number) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`items[${i}] is not an object.`);
    }
    const a = item as Record<string, unknown>;

    if (typeof a.sequence !== "number") throw new Error(`items[${i}].sequence must be a number.`);
    if (typeof a.item_name !== "string") throw new Error(`items[${i}].item_name must be a string.`);
    if (typeof a.section !== "string") throw new Error(`items[${i}].section must be a string.`);
    if (typeof a.original_report_content !== "string") throw new Error(`items[${i}].original_report_content must be a string.`);

    return {
      sequence: a.sequence as number,
      section: a.section as string,
      item_name: a.item_name as string,
      original_item_number: a.original_item_number == null ? null : String(a.original_item_number),
      source_reference: a.source_reference == null ? null : String(a.source_reference),
      original_report_content: a.original_report_content as string,
    };
  });

  return {
    template_name,
    source_document,
    report_title,
    report_date,
    report_author,
    report_company,
    description,
    items,
  };
}
