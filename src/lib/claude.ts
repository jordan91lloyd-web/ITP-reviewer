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
  CategoryScore,
  ScoreBand,
  CommercialConfidence,
} from "./types";

const MODEL = "claude-sonnet-4-6";
// 4096 was too low for multi-file bundles — document_observations grows with
// file count and was truncating the JSON mid-object. 16 000 comfortably covers
// bundles of up to ~20 files while keeping latency reasonable.
const MAX_TOKENS = 16000;

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

  // Closing instructions (passes file count so prompt can require one observation per file)
  contentBlocks.push({ type: "text", text: buildInstructions(files.length) });
  console.log(`[claude] Content blocks built: ${contentBlocks.length} blocks for ${files.length} file(s)`);

  const isDev = process.env.NODE_ENV === "development";
  console.log(`[claude] Bundle: ${files.length} file(s) | model=${MODEL} | max_tokens=${MAX_TOKENS}`);

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

    // Detect output truncation — if stop_reason is "max_tokens" the JSON will
    // be incomplete and will always fail to parse.
    const stopReason = message.stop_reason;
    console.log(`[claude] stop_reason=${stopReason} | response_length=${rawResponse.length} chars`);
    if (stopReason === "max_tokens") {
      console.error("[claude] ⚠ Response was TRUNCATED (hit max_tokens). Increase MAX_TOKENS or reduce prompt complexity.");
      throw new Error(
        "The review response was too long for the current token limit. Try uploading fewer files or contact support."
      );
    }

    if (isDev) {
      console.log("[claude] Raw response (first 3000 chars):\n", rawResponse.slice(0, 3000));
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Claude API error: ${msg}`);
  }

  let parsed: unknown;
  let parseStage = "initial";
  try {
    parseStage = "extractJson";
    parsed = extractJson(rawResponse);
  } catch {
    console.error(`[claude] ── Parse failure at stage: ${parseStage} ─────────────`);
    console.error(`[claude] Files in bundle: ${files.length}`);
    console.error(`[claude] Response length: ${rawResponse.length} chars`);
    console.error(`[claude] First 500 chars:\n`, rawResponse.slice(0, 500));
    console.error(`[claude] Last 200 chars:\n`, rawResponse.slice(-200));
    console.error("[claude] ──────────────────────────────────────────────────────");
    throw new Error(
      "Claude returned a response that could not be read as JSON. Try running the review again."
    );
  }

  return validateResult(normalizeEnums(parsed));
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

/**
 * Normalizes enum-like fields in Claude's parsed response before strict
 * validation runs. Claude occasionally capitalises values, uses underscores,
 * or picks synonyms — this maps common variations to the canonical values so
 * the validator never rejects an otherwise correct response.
 */
function normalizeEnums(parsed: unknown): unknown {
  if (typeof parsed !== "object" || parsed === null) return parsed;
  const r = parsed as Record<string, unknown>;
  const isDev = process.env.NODE_ENV === "development";

  // ── package_assessment ────────────────────────────────────────────────────
  if (typeof r.package_assessment === "string") {
    const raw = r.package_assessment;
    const norm = normalizePackageAssessment(raw);
    if (isDev && norm !== raw) {
      console.log(`[claude] normalise package_assessment: "${raw}" → "${norm}"`);
    }
    r.package_assessment = norm;
  }

  // ── confidence ────────────────────────────────────────────────────────────
  if (typeof r.confidence === "string") {
    const raw = r.confidence;
    const norm = normalizeConfidence(raw);
    if (isDev && norm !== raw) {
      console.log(`[claude] normalise confidence: "${raw}" → "${norm}"`);
    }
    r.confidence = norm;
  }

  // ── score_band ────────────────────────────────────────────────────────────
  if (typeof r.score_band === "string") {
    const raw = r.score_band;
    const norm = normalizeScoreBand(raw);
    if (isDev && norm !== raw) {
      console.log(`[claude] normalise score_band: "${raw}" → "${norm}"`);
    }
    r.score_band = norm;
  }

  // ── inspection_header.extraction_confidence ───────────────────────────────
  if (typeof r.inspection_header === "object" && r.inspection_header !== null) {
    const h = r.inspection_header as Record<string, unknown>;
    if (typeof h.extraction_confidence === "string") {
      h.extraction_confidence = normalizeConfidence(h.extraction_confidence);
    }
  }

  // ── commercial_confidence.rating ──────────────────────────────────────────
  if (typeof r.commercial_confidence === "object" && r.commercial_confidence !== null) {
    const cc = r.commercial_confidence as Record<string, unknown>;
    if (typeof cc.rating === "string") {
      const raw = cc.rating;
      const norm = normalizeConfidence(raw);
      if (isDev && norm !== raw) {
        console.log(`[claude] normalise commercial_confidence.rating: "${raw}" → "${norm}"`);
      }
      cc.rating = norm;
    }
  }

  return r;
}

function normalizePackageAssessment(v: string): string {
  const s = v.toLowerCase().trim().replace(/_/g, " ");
  if (s === "complete") return "complete";
  if (s === "mostly complete" || s === "substantially complete" || s === "largely complete") return "mostly complete";
  if (s === "incomplete" || s === "partial" || s === "partially complete" || s === "not complete") return "incomplete";
  // Unknown — return as-is and let the validator report it
  return v;
}

function normalizeConfidence(v: string): string {
  const s = v.toLowerCase().trim();
  if (s === "high") return "high";
  if (s === "medium" || s === "moderate" || s === "med") return "medium";
  if (s === "low") return "low";
  return v;
}

function normalizeScoreBand(v: string): string {
  const s = v.toLowerCase().trim().replace(/_/g, " ");
  if (s === "excellent") return "excellent";
  if (s === "good") return "good";
  if (s === "partial" || s === "moderate" || s === "medium") return "partial";
  if (s === "poor") return "poor";
  if (s === "critical" || s === "very poor" || s === "fail") return "critical";
  return v;
}

function validateResult(raw: unknown): ReviewResult {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Claude returned an unexpected result format (not a JSON object).");
  }

  const r = raw as Record<string, unknown>;
  const isStr = (v: unknown): v is string => typeof v === "string";
  const isNum = (v: unknown): v is number => typeof v === "number";
  const isStrArr = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");
  const isStrOrNull = (v: unknown): v is string | null => v === null || typeof v === "string";

  function need<T>(key: string, check: (v: unknown) => v is T, label: string): T {
    if (!check(r[key])) throw new Error(`Response field "${key}" is missing or invalid (expected: ${label}).`);
    return r[key] as T;
  }

  // ── inspection_header ─────────────────────────────────────────────────────
  if (typeof r.inspection_header !== "object" || r.inspection_header === null) {
    throw new Error('Response is missing "inspection_header".');
  }
  const h = r.inspection_header as Record<string, unknown>;
  const validConf = ["high", "medium", "low"] as const;
  if (!isStrOrNull(h.project_name)) throw new Error("inspection_header.project_name must be string or null.");
  if (!isStrOrNull(h.project_number)) throw new Error("inspection_header.project_number must be string or null.");
  if (!isStrOrNull(h.itp_number)) throw new Error("inspection_header.itp_number must be string or null.");
  if (!isStrOrNull(h.itp_name)) throw new Error("inspection_header.itp_name must be string or null.");
  if (!isStrOrNull(h.inspection_reference)) throw new Error("inspection_header.inspection_reference must be string or null.");
  if (!isStrOrNull(h.closed_by)) throw new Error("inspection_header.closed_by must be string or null.");
  if (h.inspection_number_of_type !== null && typeof h.inspection_number_of_type !== "number") {
    throw new Error("inspection_header.inspection_number_of_type must be a number or null.");
  }
  if (!validConf.includes(h.extraction_confidence as typeof validConf[number])) {
    throw new Error("inspection_header.extraction_confidence must be high | medium | low.");
  }
  const inspection_header: InspectionHeader = {
    project_name: h.project_name as string | null,
    project_number: h.project_number as string | null,
    itp_number: h.itp_number as string | null,
    itp_name: h.itp_name as string | null,
    inspection_reference: h.inspection_reference as string | null,
    closed_by: h.closed_by as string | null,
    inspection_number_of_type: h.inspection_number_of_type as number | null,
    extraction_confidence: h.extraction_confidence as InspectionHeader["extraction_confidence"],
  };

  // ── Core fields ───────────────────────────────────────────────────────────
  const total_score = need("total_score", isNum, "number");
  const validBands = ["excellent", "good", "partial", "poor", "critical"] as const;
  const score_band = need(
    "score_band",
    (v): v is ScoreBand => validBands.includes(v as ScoreBand),
    "excellent | good | partial | poor | critical"
  );
  const confidence = need(
    "confidence",
    (v): v is "high" | "medium" | "low" => v === "high" || v === "medium" || v === "low",
    "high | medium | low"
  );
  const package_assessment = need(
    "package_assessment",
    (v): v is "complete" | "mostly complete" | "incomplete" =>
      v === "complete" || v === "mostly complete" || v === "incomplete",
    "complete | mostly complete | incomplete"
  );
  const executive_summary = need("executive_summary", isStr, "string");
  const applicable_points = need("applicable_points", isNum, "number");
  const achieved_points = need("achieved_points", isNum, "number");
  const next_actions = need("next_actions", isStrArr, "string[]");

  // ── score_breakdown ───────────────────────────────────────────────────────
  if (typeof r.score_breakdown !== "object" || r.score_breakdown === null) {
    throw new Error('Response is missing "score_breakdown".');
  }
  const sb = r.score_breakdown as Record<string, unknown>;

  if (!isStrArr(sb.excluded_as_not_applicable)) throw new Error("score_breakdown.excluded_as_not_applicable must be a string[].");
  if (!isStr(sb.scoring_explanation)) throw new Error("score_breakdown.scoring_explanation must be a string.");
  if (!isStrArr(sb.strong_contributors)) throw new Error("score_breakdown.strong_contributors must be a string[].");
  if (!isStrArr(sb.score_reductions)) throw new Error("score_breakdown.score_reductions must be a string[].");
  if (!isStrArr(sb.genuinely_missing)) throw new Error("score_breakdown.genuinely_missing must be a string[].");

  if (typeof sb.category_scores !== "object" || sb.category_scores === null) {
    throw new Error("score_breakdown.category_scores must be an object.");
  }
  const cs = sb.category_scores as Record<string, unknown>;
  function validateCat(key: string): CategoryScore {
    const c = cs[key];
    if (typeof c !== "object" || c === null) throw new Error(`score_breakdown.category_scores.${key} must be an object.`);
    const cat = c as Record<string, unknown>;
    if (!isNum(cat.applicable_points)) throw new Error(`score_breakdown.category_scores.${key}.applicable_points must be a number.`);
    if (!isNum(cat.achieved_points)) throw new Error(`score_breakdown.category_scores.${key}.achieved_points must be a number.`);
    return { applicable_points: cat.applicable_points, achieved_points: cat.achieved_points };
  }

  const score_breakdown: ScoreBreakdown = {
    excluded_as_not_applicable: sb.excluded_as_not_applicable as string[],
    category_scores: {
      high_value: validateCat("high_value"),
      medium_value: validateCat("medium_value"),
      low_value: validateCat("low_value"),
    },
    scoring_explanation: sb.scoring_explanation as string,
    strong_contributors: sb.strong_contributors as string[],
    score_reductions: sb.score_reductions as string[],
    genuinely_missing: sb.genuinely_missing as string[],
  };

  // ── missing_evidence ──────────────────────────────────────────────────────
  if (!Array.isArray(r.missing_evidence)) throw new Error('Response is missing "missing_evidence" array.');
  const validStatuses = ["Missing", "Substantially complete", "Unclear"] as const;
  const missing_evidence: MissingEvidence[] = r.missing_evidence.map((item: unknown, i: number) => {
    if (typeof item !== "object" || item === null) throw new Error(`missing_evidence[${i}] is not an object.`);
    const m = item as Record<string, unknown>;
    if (!isNum(m.item)) throw new Error(`missing_evidence[${i}].item must be a number.`);
    if (!isStr(m.evidence_type)) throw new Error(`missing_evidence[${i}].evidence_type must be a string.`);
    if (!isStr(m.reason)) throw new Error(`missing_evidence[${i}].reason must be a string.`);
    if (!validStatuses.includes(m.status as typeof validStatuses[number])) {
      throw new Error(`missing_evidence[${i}].status must be: ${validStatuses.join(" | ")}.`);
    }
    return { item: m.item, evidence_type: m.evidence_type, reason: m.reason, status: m.status as MissingEvidence["status"] };
  });

  // ── key_issues ────────────────────────────────────────────────────────────
  if (!Array.isArray(r.key_issues)) throw new Error('Response is missing "key_issues" array.');
  const key_issues: KeyIssue[] = r.key_issues.map((item: unknown, i: number) => {
    if (typeof item !== "object" || item === null) throw new Error(`key_issues[${i}] is not an object.`);
    const k = item as Record<string, unknown>;
    if (!isNum(k.item)) throw new Error(`key_issues[${i}].item must be a number.`);
    if (!isStr(k.title)) throw new Error(`key_issues[${i}].title must be a string.`);
    if (!isStr(k.explanation)) throw new Error(`key_issues[${i}].explanation must be a string.`);
    return { item: k.item, title: k.title, explanation: k.explanation };
  });

  // ── document_observations ─────────────────────────────────────────────────
  if (!Array.isArray(r.document_observations)) throw new Error('Response is missing "document_observations" array.');
  const document_observations = r.document_observations.map((item: unknown, i: number) => {
    if (typeof item !== "object" || item === null) throw new Error(`document_observations[${i}] is not an object.`);
    const obs = item as Record<string, unknown>;
    if (!isStr(obs.filename) || !isStr(obs.observation)) {
      throw new Error(`document_observations[${i}] must have string "filename" and "observation".`);
    }
    return { filename: obs.filename, observation: obs.observation };
  });

  // ── commercial_confidence ─────────────────────────────────────────────────
  // Validate if present; fall back gracefully if Claude omitted it.
  const validCcRatings = ["high", "medium", "low"] as const;
  let commercial_confidence: CommercialConfidence;
  if (typeof r.commercial_confidence === "object" && r.commercial_confidence !== null) {
    const cc = r.commercial_confidence as Record<string, unknown>;
    const rating = validCcRatings.includes(cc.rating as typeof validCcRatings[number])
      ? (cc.rating as CommercialConfidence["rating"])
      : "medium";
    const reason = isStr(cc.reason) ? cc.reason : "Commercial confidence not returned.";
    commercial_confidence = { rating, reason };
  } else {
    commercial_confidence = { rating: "medium", reason: "Commercial confidence not returned." };
  }

  return {
    inspection_header,
    total_score,
    score_band,
    confidence,
    package_assessment,
    executive_summary,
    applicable_points,
    achieved_points,
    score_breakdown,
    missing_evidence,
    key_issues,
    next_actions,
    document_observations,
    commercial_confidence,
  };
}
