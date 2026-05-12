// ─── POST /api/procore/generate-action-items ──────────────────────────────────
// Separate post-review step: generates 2–5 action items for the site manager
// using a fresh, lightweight Claude call. Never affects the main review pipeline.
//
// SQL migration (run once in Supabase):
// -- ALTER TABLE review_records
// --    ADD COLUMN IF NOT EXISTS action_items jsonb DEFAULT '[]';

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import type { ActionItem } from "@/lib/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const runtime = "nodejs";

interface RequestBody {
  inspection_id: string;
  project_id: string;
  company_id: string;
  review_summary: string;
  key_issues: string[];
  missing_evidence: string[];
  score: number;
  score_band: string;
  itp_name: string;
}

export async function POST(request: NextRequest) {
  // ── Auth check ──────────────────────────────────────────────────────────────
  console.log("[generate-action-items] step 1: auth check");
  const cookieStore = await cookies();
  if (!cookieStore.get("procore_access_token")?.value) {
    return NextResponse.json({ action_items: [], error: "Not authenticated." });
  }

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ action_items: [], error: "Invalid request body." });
  }

  const {
    inspection_id,
    project_id: _project_id,
    company_id,
    review_summary,
    key_issues,
    missing_evidence,
    score,
    score_band,
    itp_name,
  } = body;

  console.log("[generate-action-items] called for:", itp_name, inspection_id);

  if (!inspection_id || !company_id || !itp_name) {
    return NextResponse.json({ action_items: [], error: "Missing required fields." });
  }

  // ── Build prompt ────────────────────────────────────────────────────────────
  const issuesList  = Array.isArray(key_issues)      ? key_issues.join(", ")      : "";
  const missingList = Array.isArray(missing_evidence) ? missing_evidence.join(", ") : "";

  const userPrompt = `ITP: ${itp_name}
Score: ${score}/100 (${score_band})
Key issues: ${issuesList || "None identified"}
Missing evidence: ${missingList || "None identified"}
Summary: ${review_summary || "No summary available"}

Generate 2-5 specific action items for the site manager.
Respond with ONLY a JSON array, nothing else:
[
  {
    "priority": "high",
    "action": "specific instruction",
    "category": "evidence|signoff|close|deficiency"
  }
]`;

  // ── Call Claude ─────────────────────────────────────────────────────────────
  let actionItems: ActionItem[] = [];
  try {
    console.log("[generate-action-items] step 2: calling Claude");

    const claudePromise = anthropic.messages.create({
      model:      "claude-sonnet-4-6",
      max_tokens: 800,
      system:     "You are a construction QA assistant. Generate specific actionable items for a site manager. Respond only with a JSON array.",
      messages: [{ role: "user", content: userPrompt }],
    });
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Claude timeout after 15s")), 15000)
    );
    const message = await Promise.race([claudePromise, timeoutPromise]);

    const raw = message.content
      .filter(b => b.type === "text")
      .map(b => (b as { type: "text"; text: string }).text)
      .join("");

    console.log("[generate-action-items] step 3: Claude responded, length:", raw.length);

    // Strip markdown fences if present
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```\s*$/, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) {
      actionItems = parsed.filter(
        (item): item is ActionItem =>
          typeof item === "object" &&
          item !== null &&
          ["high", "medium", "low"].includes(item.priority) &&
          typeof item.action === "string" &&
          ["evidence", "signoff", "close", "deficiency"].includes(item.category)
      ).slice(0, 5);
    }

    console.log("[generate-action-items] step 4: parsed items:", actionItems.length);
  } catch (err) {
    console.error("[generate-action-items] Claude call or parse failed:", err instanceof Error ? err.message : err);
    // Non-fatal: return empty action items rather than error
    return NextResponse.json({ action_items: [] });
  }

  // ── Save to Supabase ────────────────────────────────────────────────────────
  // Find the latest review record for this inspection + company, then update
  // both the separate action_items column and merge into review_data JSON so
  // the dashboard can read them via review_data?.action_items without any
  // changes to the inspections endpoint.
  try {
    const { data: records } = await supabase
      .from("review_records")
      .select("id, review_data")
      .eq("procore_inspection_id", inspection_id)
      .eq("company_id", company_id)
      .order("reviewed_at", { ascending: false })
      .limit(1);

    if (records && records.length > 0) {
      const record = records[0];
      const existingReviewData = (record.review_data ?? {}) as Record<string, unknown>;
      const mergedReviewData   = { ...existingReviewData, action_items: actionItems };

      await supabase
        .from("review_records")
        .update({
          action_items: actionItems,   // dedicated column (requires migration)
          review_data:  mergedReviewData,
        })
        .eq("id", record.id);
    }

    console.log("[generate-action-items] step 5: saved to Supabase");
  } catch (err) {
    console.error("[generate-action-items] Supabase update failed:", err instanceof Error ? err.message : err);
    // Non-fatal: still return the generated items
  }

  return NextResponse.json({ action_items: actionItems });
}
