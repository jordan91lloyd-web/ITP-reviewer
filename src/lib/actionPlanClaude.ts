// ─── Action Plan Claude client ────────────────────────────────────────────
// Own Claude client for the report-to-Action-Plan converter.
// Completely separate from the ITP review client in claude.ts.

import Anthropic from "@anthropic-ai/sdk";
import { buildActionPlanSystemPrompt, buildActionPlanInstructions } from "./actionPlanPrompt";
import type { ConvertedActionPlan, ActionPlanActivity } from "./actionPlanTypes";

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 16000;

/**
 * Converts a single document into a structured Action Plan.
 * Accepts PDF (native), images (vision), or pre-extracted text (docx/xlsx).
 */
export async function runActionPlanConversion(
  fileBuffer: Buffer,
  filename: string,
  mimeType: "application/pdf" | "image/jpeg" | "image/png" | "text/plain"
): Promise<ConvertedActionPlan> {
  console.log(`[action-plan] Converting "${filename}" (${mimeType})`);

  const client = new Anthropic();

  const contentBlocks: Anthropic.ContentBlockParam[] = [];

  // Label
  contentBlocks.push({
    type: "text",
    text: `Document: ${filename}`,
  });

  // Document, image, or text block
  if (mimeType === "application/pdf") {
    const base64 = fileBuffer.toString("base64");
    contentBlocks.push({
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data: base64 },
    });
  } else if (mimeType === "text/plain") {
    contentBlocks.push({
      type: "text",
      text: fileBuffer.toString("utf-8"),
    });
  } else {
    const base64 = fileBuffer.toString("base64");
    contentBlocks.push({
      type: "image",
      source: { type: "base64", media_type: mimeType, data: base64 },
    });
  }

  // Closing instructions with JSON template
  contentBlocks.push({
    type: "text",
    text: buildActionPlanInstructions(),
  });

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: buildActionPlanSystemPrompt(),
    messages: [{ role: "user", content: contentBlocks }],
  });

  const block = message.content[0];
  if (block.type !== "text") {
    throw new Error("Unexpected response format from Claude (expected a text block).");
  }

  const rawResponse = block.text;
  const stopReason = message.stop_reason;

  console.log(`[action-plan] stop_reason=${stopReason} | response_length=${rawResponse.length}`);

  if (stopReason === "max_tokens") {
    throw new Error(
      "The conversion response was truncated (exceeded the token limit). " +
      "The document may be too large or complex."
    );
  }

  const parsed = extractJson(rawResponse);
  return validateActionPlan(parsed, filename);
}

/**
 * Extracts a JSON object from a string that may contain markdown fences or prose.
 */
function extractJson(raw: string): unknown {
  // 1. Direct parse
  try {
    return JSON.parse(raw);
  } catch { /* fall through */ }

  // 2. Strip markdown fences
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch { /* fall through */ }
  }

  // 3. Find outermost { … }
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try {
      return JSON.parse(raw.slice(start, end + 1));
    } catch { /* fall through */ }
  }

  throw new Error("No valid JSON object found in Claude response.");
}

/**
 * Validates the parsed response matches ConvertedActionPlan exactly.
 */
function validateActionPlan(raw: unknown, filename: string): ConvertedActionPlan {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Claude returned an unexpected result format (not a JSON object).");
  }

  const r = raw as Record<string, unknown>;

  function needStr(key: string): string {
    if (typeof r[key] !== "string") {
      throw new Error(`Missing or invalid field "${key}" (expected string).`);
    }
    return r[key] as string;
  }

  function strOrNull(key: string): string | null {
    if (r[key] === null || r[key] === undefined) return null;
    if (typeof r[key] !== "string") {
      throw new Error(`Field "${key}" must be a string or null.`);
    }
    return r[key] as string;
  }

  const action_plan_name = needStr("action_plan_name");
  const source_document = typeof r.source_document === "string" ? r.source_document : filename;
  const report_title = strOrNull("report_title");
  const report_date = strOrNull("report_date");
  const report_author = strOrNull("report_author");
  const report_company = strOrNull("report_company");
  const description = needStr("description");

  if (!Array.isArray(r.activities)) {
    throw new Error('Missing or invalid field "activities" (expected array).');
  }

  if (r.activities.length === 0) {
    throw new Error("Claude returned zero activities — the document may not contain actionable items.");
  }

  const activities: ActionPlanActivity[] = r.activities.map((item: unknown, i: number) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`activities[${i}] is not an object.`);
    }
    const a = item as Record<string, unknown>;

    if (typeof a.sequence !== "number") {
      throw new Error(`activities[${i}].sequence must be a number.`);
    }
    if (typeof a.activity_title !== "string") {
      throw new Error(`activities[${i}].activity_title must be a string.`);
    }
    if (typeof a.section !== "string") {
      throw new Error(`activities[${i}].section must be a string.`);
    }
    if (typeof a.original_report_content !== "string") {
      throw new Error(`activities[${i}].original_report_content must be a string.`);
    }

    return {
      sequence: a.sequence as number,
      original_item_number:
        a.original_item_number === null || a.original_item_number === undefined
          ? null
          : String(a.original_item_number),
      section: a.section as string,
      activity_title: a.activity_title as string,
      acceptance_criteria:
        a.acceptance_criteria === null || a.acceptance_criteria === undefined
          ? null
          : String(a.acceptance_criteria),
      source_reference:
        a.source_reference === null || a.source_reference === undefined
          ? null
          : String(a.source_reference),
      original_report_content: a.original_report_content as string,
    };
  });

  return {
    action_plan_name,
    source_document,
    report_title,
    report_date,
    report_author,
    report_company,
    description,
    activities,
  };
}
