// ─── POST /api/resourcing/classify ────────────────────────────────────────────
// Classifies a list of contract titles into trade categories using Claude.
//
// Body: { items: Array<{ id: string, title: string, vendor: string }> }
// Returns: { classifications: Record<string, string> }  // { [id]: trade }

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const TRADES = [
  "Demolition", "Excavation", "Piling", "Concrete", "Waterproofing",
  "Structural Steel", "Facade", "Carpentry", "Tiling", "Painting",
  "Electrical", "Mechanical", "Plumbing", "Fire Services", "Lift",
  "Landscaping", "Consulting", "Other",
];

const client = new Anthropic();

export async function POST(request: NextRequest) {
  let items: Array<{ id: string; title: string; vendor: string }>;
  try {
    const body = await request.json() as { items?: unknown };
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ classifications: {} });
    }
    items = body.items as Array<{ id: string; title: string; vendor: string }>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const system = `Classify each construction contract into exactly one trade category from this list: ${TRADES.join(", ")}.
Return ONLY a JSON object: { "[id]": "[trade]" }
No other text.`;

  const userText = JSON.stringify(
    items.map(i => ({ id: i.id, title: i.title, vendor: i.vendor })),
  );

  try {
    const message = await client.messages.create({
      model:      "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system,
      messages:   [{ role: "user", content: userText }],
    });

    const raw = message.content
      .filter(b => b.type === "text")
      .map(b => (b as { type: "text"; text: string }).text)
      .join("");

    // Strip markdown fences if present
    const jsonStr = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();

    let classifications: Record<string, string> = {};
    try {
      classifications = JSON.parse(jsonStr) as Record<string, string>;
    } catch {
      // If parse fails, fall back to "Other" for all items
      for (const item of items) {
        classifications[item.id] = "Other";
      }
    }

    // Validate each value is a known trade; default unknown to "Other"
    const tradeSet = new Set(TRADES);
    for (const [id, trade] of Object.entries(classifications)) {
      if (!tradeSet.has(trade)) classifications[id] = "Other";
    }

    return NextResponse.json({ classifications });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 },
    );
  }
}
