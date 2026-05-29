// ─── POST /api/resourcing/analyse ─────────────────────────────────────────────
// Streams a Claude AI resourcing analysis based on project stages and conflicts.
//
// Body: { projectSummary: string, conflictSummary: string }
// Returns: text/plain streaming response

import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return new Response("Not authenticated", { status: 401 });
  }

  let projectSummary: string;
  let conflictSummary: string;
  try {
    const body = await request.json() as { projectSummary?: string; conflictSummary?: string };
    projectSummary  = body.projectSummary  ?? "";
    conflictSummary = body.conflictSummary ?? "";
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const prompt = `You are a construction project analyst for Fleek Constructions in Sydney, Australia.

Analyse this subcontractor resourcing data and identify risks.

CURRENT PROJECT STAGES:
${projectSummary}

RESOURCING CONFLICTS (same contractor, same trade, 3+ projects):
${conflictSummary}

Provide:
1. TOP 3 HIGH RISK subcontractors — why they are high risk, which projects are affected, recommended action
2. TOP 3 OVERLOADED SCOPES — trades where capacity is most stretched across the portfolio
3. IMMEDIATE ACTIONS — 2-3 specific things to do this week
4. UPCOMING RISKS — what conflicts are coming in the next 2-3 stages based on current programme positions

Keep it concise, practical, Australian construction context. No fluff.
Format with clear headers and bullet points.`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = client.messages.stream({
          model:      "claude-sonnet-4-6",
          max_tokens: 1000,
          messages:   [{ role: "user", content: prompt }],
        });

        for await (const chunk of messageStream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "AI error";
        controller.enqueue(new TextEncoder().encode(`\n\nError: ${msg}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
