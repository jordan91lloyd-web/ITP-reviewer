// POST /api/drawing-changes/scan
// Accepts a list of drawing pairs (or a batch for an existing scan),
// downloads both revision PDFs for each, sends them to Claude vision
// for comparison, stores results in Supabase.
//
// Designed to be called in batches from the frontend — each call
// processes a small number of drawings within the Vercel timeout.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import {
  SYSTEM_PROMPT,
  CHANGE_TYPES,
  type DrawingPair,
  type DetectedChange,
  type ChangeType,
  type Severity,
} from "@/lib/drawing-changes-prompt";

export const maxDuration = 300;

const PDF_SIZE_LIMIT = 15 * 1024 * 1024; // 15 MB per file

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function requireAuth(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("procore_access_token")?.value ?? null;
}

async function downloadPdf(url: string): Promise<Buffer | null> {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > PDF_SIZE_LIMIT) return null;
    return buf;
  } catch {
    return null;
  }
}

function parseChanges(raw: string): DetectedChange[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenceMatch) {
      try {
        parsed = JSON.parse(fenceMatch[1].trim());
      } catch {
        /* fall through */
      }
    }
    if (!parsed) {
      const start = raw.indexOf("[");
      const end = raw.lastIndexOf("]");
      if (start !== -1 && end > start) {
        try {
          parsed = JSON.parse(raw.slice(start, end + 1));
        } catch {
          return [];
        }
      }
    }
  }

  if (!Array.isArray(parsed)) return [];

  const validTypes = new Set<string>(CHANGE_TYPES);
  const validSeverities = new Set<string>(["low", "medium", "high"]);

  return parsed
    .filter(
      (item: unknown): item is Record<string, unknown> =>
        typeof item === "object" && item !== null
    )
    .filter(
      (item) =>
        typeof item.change_type === "string" &&
        validTypes.has(item.change_type) &&
        typeof item.description === "string" &&
        item.description.length > 0
    )
    .map((item) => ({
      change_type: item.change_type as ChangeType,
      description: item.description as string,
      location_on_drawing:
        typeof item.location_on_drawing === "string"
          ? item.location_on_drawing
          : null,
      severity: validSeverities.has(item.severity as string)
        ? (item.severity as Severity)
        : "medium",
    }));
}

async function compareDrawings(
  client: Anthropic,
  pair: DrawingPair,
  oldPdfBase64: string,
  newPdfBase64: string,
  deep?: boolean
): Promise<DetectedChange[]> {
  const response = await client.messages.create({
    model: deep ? "claude-opus-4-6" : "claude-sonnet-4-6",
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `OLD REVISION: Drawing ${pair.drawing_number} — ${pair.drawing_title}, Revision ${pair.old_revision.revision_number}`,
          },
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: oldPdfBase64,
            },
          } as Anthropic.DocumentBlockParam,
          {
            type: "text",
            text: `NEW REVISION: Drawing ${pair.drawing_number} — ${pair.drawing_title}, Revision ${pair.new_revision.revision_number}`,
          },
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: newPdfBase64,
            },
          } as Anthropic.DocumentBlockParam,
          {
            type: "text",
            text: "Compare these two revisions. Identify all scope and specification changes.",
          },
        ],
      },
    ],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  return parseChanges(text);
}

export async function POST(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: {
    company_id: string;
    project_id: string;
    project_name: string;
    drawing_pairs: DrawingPair[];
    scan_id?: string;        // Continue an existing scan
    total_drawings?: number; // Total across all batches (set on first batch)
    is_last_batch?: boolean; // Mark scan as completed
    deep?: boolean;          // Use Opus for deeper analysis
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { company_id, project_id, project_name, drawing_pairs, scan_id, total_drawings, is_last_batch, deep } = body;
  if (!company_id || !project_id || !project_name || !Array.isArray(drawing_pairs) || drawing_pairs.length === 0) {
    return NextResponse.json(
      { error: "company_id, project_id, project_name, and drawing_pairs required" },
      { status: 400 }
    );
  }

  const supabase = getSupabase();
  const claude = new Anthropic();

  // Create or reuse scan record
  let scanRecordId: string;

  if (scan_id) {
    // Continue existing scan
    scanRecordId = scan_id;
  } else {
    // Create new scan record
    const { data: scan, error: scanErr } = await supabase
      .from("drawing_revision_scans")
      .insert({
        company_id,
        project_id,
        project_name,
        status: "running",
        total_drawings: total_drawings ?? drawing_pairs.length,
        completed_drawings: 0,
        failed_drawings: 0,
      })
      .select("id")
      .single();

    if (scanErr || !scan) {
      console.error("[drawing-changes/scan] Failed to create scan:", scanErr);
      return NextResponse.json({ error: "Failed to create scan record" }, { status: 500 });
    }
    scanRecordId = scan.id;
  }

  let batchCompleted = 0;
  let batchFailed = 0;
  const batchChanges: {
    discipline: string;
    drawing_number: string;
    drawing_title: string;
    old_revision: string;
    new_revision: string;
    change_type: string;
    description: string;
    location_on_drawing: string | null;
    severity: string;
  }[] = [];

  for (const pair of drawing_pairs) {
    try {
      // Skip if this revision pair already has results (unless deep scan)
      if (!deep) {
        const { count } = await supabase
          .from("drawing_revision_changes")
          .select("id", { count: "exact", head: true })
          .eq("company_id", company_id)
          .eq("project_id", project_id)
          .eq("drawing_number", pair.drawing_number)
          .eq("old_revision", pair.old_revision.revision_number)
          .eq("new_revision", pair.new_revision.revision_number);

        if (count && count > 0) {
          console.log(`[drawing-changes/scan] Skipping ${pair.drawing_number} rev ${pair.old_revision.revision_number}→${pair.new_revision.revision_number} — already scanned`);
          batchCompleted++;
          continue;
        }
      }

      console.log(
        `[drawing-changes/scan] Comparing ${pair.drawing_number} rev ${pair.old_revision.revision_number} → ${pair.new_revision.revision_number}`
      );

      const [oldPdf, newPdf] = await Promise.all([
        downloadPdf(pair.old_revision.pdf_url),
        downloadPdf(pair.new_revision.pdf_url),
      ]);

      if (!oldPdf || !newPdf) {
        console.warn(`[drawing-changes/scan] Failed to download PDFs for ${pair.drawing_number}`);
        batchFailed++;
        continue;
      }

      const oldBase64 = oldPdf.toString("base64");
      const newBase64 = newPdf.toString("base64");

      const changes = await compareDrawings(claude, pair, oldBase64, newBase64, deep);

      // Deep scan replaces existing results for this drawing
      if (deep && scan_id) {
        await supabase
          .from("drawing_revision_changes")
          .delete()
          .eq("scan_id", scanRecordId)
          .eq("drawing_number", pair.drawing_number)
          .eq("old_revision", pair.old_revision.revision_number)
          .eq("new_revision", pair.new_revision.revision_number);
      }

      if (changes.length > 0) {
        const rows = changes.map((c) => ({
          scan_id: scanRecordId,
          company_id,
          project_id,
          discipline: pair.discipline,
          drawing_number: pair.drawing_number,
          drawing_title: pair.drawing_title,
          old_revision: pair.old_revision.revision_number,
          new_revision: pair.new_revision.revision_number,
          change_type: c.change_type,
          description: c.description,
          location_on_drawing: c.location_on_drawing,
          severity: c.severity,
        }));

        const { error: insertErr } = await supabase
          .from("drawing_revision_changes")
          .insert(rows);

        if (insertErr) {
          console.error(`[drawing-changes/scan] Insert error for ${pair.drawing_number}:`, insertErr);
        }

        batchChanges.push(...rows);
      }

      batchCompleted++;
      await sleep(600);
    } catch (err) {
      console.error(`[drawing-changes/scan] Error comparing ${pair.drawing_number}:`, err);
      batchFailed++;
    }
  }

  // Update scan progress (increment completed/failed counts)
  const { data: currentScan } = await supabase
    .from("drawing_revision_scans")
    .select("completed_drawings, failed_drawings")
    .eq("id", scanRecordId)
    .single();

  const newCompleted = (currentScan?.completed_drawings ?? 0) + batchCompleted;
  const newFailed = (currentScan?.failed_drawings ?? 0) + batchFailed;

  const updatePayload: Record<string, unknown> = {
    completed_drawings: newCompleted,
    failed_drawings: newFailed,
  };

  if (is_last_batch) {
    updatePayload.status = newFailed === (total_drawings ?? drawing_pairs.length) ? "failed" : "completed";
    updatePayload.completed_at = new Date().toISOString();
    if (newFailed > 0) {
      updatePayload.error_message = `${newFailed} drawing(s) failed`;
    }
  }

  await supabase
    .from("drawing_revision_scans")
    .update(updatePayload)
    .eq("id", scanRecordId);

  return NextResponse.json({
    scan_id: scanRecordId,
    batch_completed: batchCompleted,
    batch_failed: batchFailed,
    batch_changes: batchChanges.length,
    total_completed: newCompleted,
    total_failed: newFailed,
  });
}
