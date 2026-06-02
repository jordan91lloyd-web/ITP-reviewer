// ─── POST /api/resourcing/analyse ─────────────────────────────────────────────
// Chat endpoint for the Resourcing Assistant.
//
// Body: {
//   messages: Array<{ role: "user" | "assistant", content: string }>,
//   context: { projectSummary: string, conflictSummary: string, vendorData: string }
// }
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

  let messages: Array<{ role: "user" | "assistant"; content: string }>;
  let context: { projectSummary?: string; conflictSummary?: string; vendorData?: string };
  try {
    const body = await request.json() as {
      messages?: Array<{ role: "user" | "assistant"; content: string }>;
      context?: { projectSummary?: string; conflictSummary?: string; vendorData?: string };
    };
    messages = body.messages ?? [];
    context  = body.context  ?? {};
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!messages.length) {
    return new Response("No messages provided", { status: 400 });
  }

  const projectSummary  = context.projectSummary  ?? "No project data available.";
  const conflictSummary = context.conflictSummary ?? "No active conflicts detected.";
  const vendorData      = context.vendorData      ?? "No vendor detail available.";

  const systemPrompt = `You are a resourcing assistant for Fleek Constructions in Sydney, Australia.
You help the construction team understand subcontractor workload across their project portfolio.

Here is the current resourcing data:

ACTIVE PROJECTS AND CURRENT STAGES:
${projectSummary}

ACTIVE RESOURCING CONFLICTS (same contractor, active stage, 3+ projects):
${conflictSummary}

VENDOR DETAILS (active vendors per project):
${vendorData}

Answer questions concisely. Use bullet points where appropriate. Australian construction context.`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = client.messages.stream({
          model:      "claude-sonnet-4-6",
          max_tokens: 1000,
          system:     systemPrompt,
          messages,
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
