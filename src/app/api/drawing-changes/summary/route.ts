// POST /api/drawing-changes/summary
// Takes a list of detected changes and asks Claude to produce a short
// executive summary for QA managers.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 30;

interface ChangeSummaryInput {
  discipline: string;
  drawing_number: string;
  change_type: string;
  severity: string;
  description: string;
  variation_risk: string | null;
  variation_note: string | null;
  review_status: string | null;
}

async function requireAuth(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value ?? null;
}

export async function POST(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: {
    project_name: string;
    changes: ChangeSummaryInput[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { project_name, changes } = body;
  if (!project_name || !Array.isArray(changes) || changes.length === 0) {
    return NextResponse.json(
      { error: "project_name and a non-empty changes array are required" },
      { status: 400 }
    );
  }

  // Trim to essential fields. If more than 200 changes, send only
  // high-severity and likely-variation items plus a count of the rest.
  let trimmedChanges: ChangeSummaryInput[];
  let omittedCount = 0;

  if (changes.length > 200) {
    const priority = changes.filter(
      (c) => c.severity === "high" || c.variation_risk === "likely_variation"
    );
    omittedCount = changes.length - priority.length;
    trimmedChanges = priority;
  } else {
    trimmedChanges = changes;
  }

  const changesPayload = trimmedChanges.map((c) => ({
    discipline: c.discipline,
    drawing_number: c.drawing_number,
    change_type: c.change_type,
    severity: c.severity,
    description: c.description,
    variation_risk: c.variation_risk,
  }));

  const omittedNote =
    omittedCount > 0
      ? `\n\nNote: ${omittedCount} lower-priority changes were omitted from this list. The total change count is ${changes.length}.`
      : "";

  const systemPrompt = `You are a construction QA analyst reviewing drawing revision changes for a project.
Summarise the findings in 3-4 sentences for a QA manager who needs to decide what to act on first.

Include:
- Total changes and how many are likely variations vs within scope
- Which disciplines have the most risk and why (be specific about what changed)
- What the QA manager should prioritise reviewing

Be direct and specific. Use discipline names and drawing numbers where relevant.
Do not use bullet points — write flowing prose. Keep it under 100 words.`;

  const userMessage = `Project: ${project_name}

Here are the detected drawing revision changes:

${JSON.stringify(changesPayload, null, 1)}${omittedNote}`;

  try {
    const claude = new Anthropic();
    const message = await claude.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    return NextResponse.json({ summary: text });
  } catch (err) {
    console.error("[drawing-changes/summary] Claude error:", err);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
