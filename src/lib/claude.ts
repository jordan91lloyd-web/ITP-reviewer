// ─── Claude API client ────────────────────────────────────────────────────
// Handles all communication with the Anthropic API.
// Supports both text (PDFs) and image files (JPG/PNG) in the same bundle.
// The review is always an ITP package review — no user-supplied metadata.

import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildPreamble, buildInstructions } from "./prompt";
import type {
  ReviewResult,
  ProcessedFile,
  MissingEvidence,
  KeyIssue,
  InspectionHeader,
  ScoreBreakdown,
} from "./types";

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 4096;

/**
 * Sends the document bundle to Claude and returns a structured ReviewResult.
 * Claude extracts the project/ITP metadata automatically from the documents.
 */
export async function runBundleReview(files: ProcessedFile[]): Promise<ReviewResult> {
  const client = new Anthropic();

  const contentBlocks: Anthropic.ContentBlockParam[] = [];

  // Opening context
  contentBlocks.push({
    type: "text",
    text: buildPreamble(files.length),
  });

  // One block (or block pair) per file
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const label = `\n\n--- Document ${i + 1} of ${files.length}: ${file.filename} ---`;

    if (file.kind === "text") {
      contentBlocks.push({
        type: "text",
        text: `${label}\n${file.text}\n--- End of document ${i + 1} ---`,
      });
    } else {
      contentBlocks.push({ type: "text", text: `${label}\n[Image file — see below]` });
      contentBlocks.push({
        type: "image",
        source: { type: "base64", media_type: file.mediaType, data: file.base64 },
      });
      contentBlocks.push({ type: "text", text: `--- End of document ${i + 1} ---` });
    }
  }

  // Closing instructions
  contentBlocks.push({ type: "text", text: buildInstructions() });

  console.log(`[claude] Sending bundle to Claude: ${files.length} file(s), model=${MODEL}`);

  let rawResponse: string;

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: buildSystemPrompt(),
      messages: [
        { role: "user", content: contentBlocks },
      ],
    });

    const block = message.content[0];
    if (block.type !== "text") {
      throw new Error("Unexpected response format from Claude (expected a text block).");
    }

    rawResponse = block.text;
    console.log(`[claude] Response received (${rawResponse.length} chars)`);

    if (process.env.NODE_ENV === "development") {
      console.log("[claude] Raw response:\n", rawResponse.slice(0, 2000));
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Claude API error: ${msg}`);
  }

  let parsed: unknown;
  try {
    parsed = extractJson(rawResponse);
  } catch {
    console.error("[claude] Failed to parse response as JSON:", rawResponse.slice(0, 500));
    throw new Error(
      "Claude returned a response that could not be read as JSON. Try running the review again."
    );
  }

  return validateResult(parsed);
}

/**
 * Robustly extracts a JSON object from a string that may contain:
 *  - Markdown code fences (```json … ``` or ``` … ```)
 *  - Leading or trailing prose text
 *
 * Strategy:
 *  1. Try parsing the string as-is.
 *  2. Extract content from the innermost ```json … ``` or ``` … ``` fence.
 *  3. Slice from the first "{" to the last "}" and parse that.
 *
 * Throws if no valid JSON object can be extracted.
 */
function extractJson(raw: string): unknown {
  // 1. Direct parse (fast path — works when prefill forces clean JSON)
  try {
    return JSON.parse(raw);
  } catch {
    // fall through
  }

  // 2. Strip markdown code fences anywhere in the string
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch {
      // fall through
    }
  }

  // 3. Find outermost { … } and parse that slice
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try {
      return JSON.parse(raw.slice(start, end + 1));
    } catch {
      // fall through
    }
  }

  throw new Error("No valid JSON object found in Claude response.");
}

function validateResult(raw: unknown): ReviewResult {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Claude returned an unexpected result format (not a JSON object).");
  }

  const r = raw as Record<string, unknown>;

  function need<T>(key: string, check: (v: unknown) => v is T, label: string): T {
    if (!check(r[key])) {
      throw new Error(
        `Claude's response was missing or had an invalid "${key}" field (expected: ${label}).`
      );
    }
    return r[key] as T;
  }

  const isString = (v: unknown): v is string => typeof v === "string";
  const isNumber = (v: unknown): v is number => typeof v === "number";
  const isStringArray = (v: unknown): v is string[] =>
    Array.isArray(v) && v.every((x) => typeof x === "string");
  const isStringOrNull = (v: unknown): v is string | null =>
    v === null || typeof v === "string";

  // ── inspection_header ─────────────────────────────────────────────────────
  if (typeof r.inspection_header !== "object" || r.inspection_header === null) {
    throw new Error('Claude\'s response was missing an "inspection_header" object.');
  }
  const h = r.inspection_header as Record<string, unknown>;
  const validConf = ["high", "medium", "low"] as const;

  if (!isStringOrNull(h.project_name)) throw new Error("inspection_header.project_name must be string or null.");
  if (!isStringOrNull(h.project_number)) throw new Error("inspection_header.project_number must be string or null.");
  if (!isStringOrNull(h.itp_number)) throw new Error("inspection_header.itp_number must be string or null.");
  if (!isStringOrNull(h.itp_name)) throw new Error("inspection_header.itp_name must be string or null.");
  if (!isStringOrNull(h.inspection_reference)) throw new Error("inspection_header.inspection_reference must be string or null.");
  if (!validConf.includes(h.extraction_confidence as typeof validConf[number])) {
    throw new Error("inspection_header.extraction_confidence must be high | medium | low.");
  }

  const inspection_header: InspectionHeader = {
    project_name: h.project_name as string | null,
    project_number: h.project_number as string | null,
    itp_number: h.itp_number as string | null,
    itp_name: h.itp_name as string | null,
    inspection_reference: h.inspection_reference as string | null,
    extraction_confidence: h.extraction_confidence as InspectionHeader["extraction_confidence"],
  };

  // ── Core fields ───────────────────────────────────────────────────────────
  const score = need("score", isNumber, "number");
  const confidence = need(
    "confidence",
    (v): v is "high" | "medium" | "low" => v === "high" || v === "medium" || v === "low",
    '"high" | "medium" | "low"'
  );
  const executive_summary = need("executive_summary", isString, "string");
  const package_assessment = need(
    "package_assessment",
    (v): v is "complete" | "mostly complete" | "incomplete" =>
      v === "complete" || v === "mostly complete" || v === "incomplete",
    '"complete" | "mostly complete" | "incomplete"'
  );
  const next_actions = need("next_actions", isStringArray, "string[]");

  // ── score_breakdown ───────────────────────────────────────────────────────
  if (typeof r.score_breakdown !== "object" || r.score_breakdown === null) {
    throw new Error('Claude\'s response was missing a "score_breakdown" object.');
  }
  const sb = r.score_breakdown as Record<string, unknown>;
  if (typeof sb.rationale !== "string") throw new Error("score_breakdown.rationale must be a string.");
  if (!Array.isArray(sb.strong_contributors) || !sb.strong_contributors.every((x) => typeof x === "string")) {
    throw new Error("score_breakdown.strong_contributors must be a string array.");
  }
  if (!Array.isArray(sb.score_reductions) || !sb.score_reductions.every((x) => typeof x === "string")) {
    throw new Error("score_breakdown.score_reductions must be a string array.");
  }
  if (!Array.isArray(sb.genuinely_missing) || !sb.genuinely_missing.every((x) => typeof x === "string")) {
    throw new Error("score_breakdown.genuinely_missing must be a string array.");
  }
  const score_breakdown: ScoreBreakdown = {
    rationale: sb.rationale as string,
    strong_contributors: sb.strong_contributors as string[],
    score_reductions: sb.score_reductions as string[],
    genuinely_missing: sb.genuinely_missing as string[],
  };

  // ── missing_evidence ──────────────────────────────────────────────────────
  if (!Array.isArray(r.missing_evidence)) {
    throw new Error('Claude\'s response was missing a "missing_evidence" array.');
  }
  const validStatuses = ["Missing", "Substantially complete", "Unclear"] as const;
  const missing_evidence: MissingEvidence[] = r.missing_evidence.map((item: unknown, i: number) => {
    if (typeof item !== "object" || item === null) throw new Error(`missing_evidence[${i}] is not an object.`);
    const m = item as Record<string, unknown>;
    if (typeof m.item !== "number") throw new Error(`missing_evidence[${i}].item must be a number.`);
    if (typeof m.evidence_type !== "string") throw new Error(`missing_evidence[${i}].evidence_type must be a string.`);
    if (typeof m.reason !== "string") throw new Error(`missing_evidence[${i}].reason must be a string.`);
    if (!validStatuses.includes(m.status as typeof validStatuses[number])) {
      throw new Error(`missing_evidence[${i}].status must be one of: ${validStatuses.join(", ")}.`);
    }
    return {
      item: m.item as number,
      evidence_type: m.evidence_type as string,
      reason: m.reason as string,
      status: m.status as MissingEvidence["status"],
    };
  });

  // ── key_issues ────────────────────────────────────────────────────────────
  if (!Array.isArray(r.key_issues)) {
    throw new Error('Claude\'s response was missing a "key_issues" array.');
  }
  const key_issues: KeyIssue[] = r.key_issues.map((item: unknown, i: number) => {
    if (typeof item !== "object" || item === null) throw new Error(`key_issues[${i}] is not an object.`);
    const k = item as Record<string, unknown>;
    if (typeof k.item !== "number") throw new Error(`key_issues[${i}].item must be a number.`);
    if (typeof k.title !== "string") throw new Error(`key_issues[${i}].title must be a string.`);
    if (typeof k.explanation !== "string") throw new Error(`key_issues[${i}].explanation must be a string.`);
    return {
      item: k.item as number,
      title: k.title as string,
      explanation: k.explanation as string,
    };
  });

  // ── document_observations ─────────────────────────────────────────────────
  if (!Array.isArray(r.document_observations)) {
    throw new Error('Claude\'s response was missing a "document_observations" array.');
  }
  const document_observations = r.document_observations.map((item: unknown, i: number) => {
    if (typeof item !== "object" || item === null) throw new Error(`document_observations[${i}] is not an object.`);
    const obs = item as Record<string, unknown>;
    if (typeof obs.filename !== "string" || typeof obs.observation !== "string") {
      throw new Error(`document_observations[${i}] is missing "filename" or "observation".`);
    }
    return { filename: obs.filename, observation: obs.observation };
  });

  return {
    inspection_header,
    score,
    confidence,
    executive_summary,
    package_assessment,
    score_breakdown,
    missing_evidence,
    key_issues,
    next_actions,
    document_observations,
  };
}
