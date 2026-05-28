// ─── POST /api/resourcing/classify ────────────────────────────────────────────
// Classifies Australian construction contract titles into trade categories.
//
// Body: { items: Array<{ id: string, title: string }> }
// Returns: { classifications: Record<string, string> }  // { [id]: trade }

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const TRADES = [
  "Demolition", "Piling", "Concrete", "Waterproofing",
  "Structural Steel", "Facade", "Carpentry", "Tiling", "Painting",
  "Electrical", "Mechanical", "Plumbing", "Fire Services", "Lift",
  "Scaffolding", "Metal & Balustrades", "Consulting", "Cleaning", "Other",
];

const client = new Anthropic();

const SYSTEM_PROMPT = `Classify each Australian construction contract title into exactly one trade category. Use ONLY the title text.

Rules:
- 'Structural Steel Subcontract' → Structural Steel
- 'Demolition and Earthwork PO' → Demolition
- 'Piling works' → Piling
- 'Electrical' or 'HMP Electrical' → Electrical
- 'Wet Fire' → Fire Services
- 'Mechanical Works (Advanced Aircon)' → Mechanical
- 'Waterproofing Subcontract - ...' → Waterproofing
- 'Carpentry Works' → Carpentry
- 'Tile Install' → Tiling
- 'Painting Subcontract' → Painting
- 'Hydraulic Works' → Plumbing
- 'Post Tension' → Concrete
- 'Shotcrete' → Concrete
- 'Lift' or 'Car Stacker' → Lift
- 'Scaffold...' → Scaffolding
- 'Balustrade...' or 'Handrail...' or 'Metal Stairs...' → Metal & Balustrades
- 'BCA Consultant' or '...engineer' or '...consulting' or '...assessment' or 'testing' or 'report' → Consulting
- 'Cleaning' → Cleaning
- 'Joinery...' or 'Timber Floor...' or 'Carpentry...' or 'Door...' → Carpentry
- 'Windows and Doors...' or 'Facade...' or 'Render...' or 'Cladding...' → Facade
- 'Roof...' → Facade
- 'Walls and Ceilings...' or 'Partitions...' → Carpentry
- Supply-only items (door hardware, appliances, supplies) → Other

Categories (use EXACTLY these names):
Demolition, Piling, Concrete, Waterproofing, Structural Steel, Facade, Carpentry, Tiling, Painting, Electrical, Mechanical, Plumbing, Fire Services, Lift, Scaffolding, Metal & Balustrades, Consulting, Cleaning, Other

Return ONLY valid JSON: { "[id]": "[category]" }
No markdown, no explanation.`;

export async function POST(request: NextRequest) {
  let items: Array<{ id: string; title: string }>;
  try {
    const body = await request.json() as { items?: unknown };
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ classifications: {} });
    }
    items = (body.items as Array<{ id: string; title: string; vendor?: string }>)
      .map(i => ({ id: i.id, title: i.title }));
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Send only id + title — no vendor name
  const userText = JSON.stringify(items);

  try {
    const message = await client.messages.create({
      model:      "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system:     SYSTEM_PROMPT,
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
      for (const item of items) classifications[item.id] = "Other";
    }

    // Validate — any unrecognised category → "Other"
    const tradeSet = new Set(TRADES);
    for (const [id, trade] of Object.entries(classifications)) {
      if (!tradeSet.has(trade)) classifications[id] = "Other";
    }
    // Fill any items Claude missed
    for (const item of items) {
      if (!classifications[item.id]) classifications[item.id] = "Other";
    }

    return NextResponse.json({ classifications });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 },
    );
  }
}
