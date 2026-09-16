// POST /api/drawing-changes/compare-doc
// Compares a single uploaded or Procore document against the project's
// baseline scope items. Returns DetectedChange[] with variation_risk flags.
// Results saved to drawing_revision_changes table with discipline="Document".

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import {
  buildDocComparePrompt,
  CHANGE_TYPES,
  type DetectedChange,
  type ChangeType,
  type Severity,
  type VariationRisk,
  type BaselineScopeItemRef,
} from "@/lib/drawing-changes-prompt";

export const maxDuration = 300;

const MAX_FILE_SIZE = 32 * 1024 * 1024;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function parseChanges(raw: string): DetectedChange[] {
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch {
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenceMatch) try { parsed = JSON.parse(fenceMatch[1].trim()); } catch { /* */ }
    if (!parsed) {
      const start = raw.indexOf("[");
      const end = raw.lastIndexOf("]");
      if (start !== -1 && end > start) {
        try { parsed = JSON.parse(raw.slice(start, end + 1)); } catch { return []; }
      }
    }
  }
  if (!Array.isArray(parsed)) return [];

  const validTypes = new Set<string>(CHANGE_TYPES);
  const validSeverities = new Set<string>(["low", "medium", "high"]);
  const validVariationRisks = new Set<string>(["likely_variation", "within_scope", "unclear"]);

  return parsed
    .filter((item: unknown): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .filter((item) => typeof item.change_type === "string" && validTypes.has(item.change_type) && typeof item.description === "string" && item.description.length > 0)
    .map((item) => ({
      change_type: item.change_type as ChangeType,
      description: item.description as string,
      location_on_drawing: typeof item.location_on_drawing === "string" ? item.location_on_drawing : null,
      severity: validSeverities.has(item.severity as string) ? (item.severity as Severity) : "medium",
      variation_risk: validVariationRisks.has(item.variation_risk as string) ? (item.variation_risk as VariationRisk) : null,
      variation_note: typeof item.variation_note === "string" && item.variation_note.length > 0 ? item.variation_note : null,
    }));
}

function xlsxToText(buffer: Buffer): string {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const parts: string[] = [];
  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) continue;
    parts.push(`\n=== Sheet: ${sheetName} ===\n`);
    const range = XLSX.utils.decode_range(sheet["!ref"] ?? "A1");
    for (let r = range.s.r; r <= range.e.r; r++) {
      const cells: string[] = [];
      for (let c = range.s.c; c <= range.e.c; c++) {
        const addr = XLSX.utils.encode_cell({ r, c });
        const cell = sheet[addr];
        cells.push(cell ? String(cell.v ?? "") : "");
      }
      parts.push(cells.join("\t"));
    }
  }
  return parts.join("\n");
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("procore_access_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const formData = await request.formData();
  const companyId = formData.get("company_id") as string;
  const projectId = formData.get("project_id") as string;
  const projectName = formData.get("project_name") as string | null;

  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  // Accept either an uploaded file or a Procore document URL
  const file = formData.get("file") as File | null;
  const procoreDocUrl = formData.get("procore_doc_url") as string | null;
  const docName = (formData.get("document_name") as string) ?? file?.name ?? "document";

  let buffer: Buffer;
  let mimeType: string;

  if (file && file.size > 0) {
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB, max 32 MB)` }, { status: 400 });
    }
    const rawBuffer = Buffer.from(await file.arrayBuffer());
    const name = file.name.toLowerCase();

    if (name.endsWith(".docx")) {
      const { value: text } = await mammoth.extractRawText({ buffer: rawBuffer });
      if (!text.trim()) return NextResponse.json({ error: "Document is empty" }, { status: 400 });
      buffer = Buffer.from(text, "utf-8");
      mimeType = "text/plain";
    } else if (name.endsWith(".xlsx")) {
      const text = xlsxToText(rawBuffer);
      if (!text.trim()) return NextResponse.json({ error: "Spreadsheet is empty" }, { status: 400 });
      buffer = Buffer.from(text, "utf-8");
      mimeType = "text/plain";
    } else if (name.endsWith(".pdf")) {
      buffer = rawBuffer;
      mimeType = "application/pdf";
    } else if (name.match(/\.(jpg|jpeg)$/)) {
      buffer = rawBuffer;
      mimeType = "image/jpeg";
    } else if (name.endsWith(".png")) {
      buffer = rawBuffer;
      mimeType = "image/png";
    } else {
      return NextResponse.json({ error: "Unsupported format. Use PDF, DOCX, XLSX, JPG, or PNG." }, { status: 400 });
    }
  } else if (procoreDocUrl) {
    // Download from Procore
    const isS3 = !procoreDocUrl.includes("procore.com") || procoreDocUrl.includes("s3.");
    const headers: Record<string, string> = {};
    if (!isS3) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(procoreDocUrl, { headers, signal: AbortSignal.timeout(120_000) });
    if (!res.ok) return NextResponse.json({ error: `Download failed (HTTP ${res.status})` }, { status: 502 });

    const rawBuffer = Buffer.from(await res.arrayBuffer());
    if (rawBuffer.length > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `File too large (${(rawBuffer.length / 1024 / 1024).toFixed(1)} MB)` }, { status: 400 });
    }

    const name = docName.toLowerCase();
    if (name.endsWith(".docx")) {
      const { value: text } = await mammoth.extractRawText({ buffer: rawBuffer });
      buffer = Buffer.from(text.trim() || " ", "utf-8");
      mimeType = "text/plain";
    } else if (name.endsWith(".xlsx")) {
      const text = xlsxToText(rawBuffer);
      buffer = Buffer.from(text.trim() || " ", "utf-8");
      mimeType = "text/plain";
    } else if (name.endsWith(".pdf")) {
      buffer = rawBuffer;
      mimeType = "application/pdf";
    } else if (name.match(/\.(jpg|jpeg)$/)) {
      buffer = rawBuffer;
      mimeType = "image/jpeg";
    } else if (name.endsWith(".png")) {
      buffer = rawBuffer;
      mimeType = "image/png";
    } else {
      buffer = rawBuffer;
      mimeType = "application/pdf"; // assume PDF
    }
  } else {
    return NextResponse.json({ error: "No file or document URL provided" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Fetch baseline scope items
  const { data: baselineDocs } = await supabase
    .from("baseline_documents")
    .select("scope_items")
    .eq("company_id", companyId)
    .eq("project_id", projectId)
    .eq("status", "processed");

  const allItems: BaselineScopeItemRef[] = [];
  for (const doc of baselineDocs ?? []) {
    if (Array.isArray(doc.scope_items)) allItems.push(...doc.scope_items);
  }

  if (allItems.length === 0) {
    return NextResponse.json({ error: "No baseline scope items found. Add baseline documents first." }, { status: 400 });
  }

  // Build prompt and call Claude
  const systemPrompt = buildDocComparePrompt(allItems);
  const client = new Anthropic();

  const contentBlocks: Anthropic.ContentBlockParam[] = [];
  contentBlocks.push({ type: "text", text: `DOCUMENT TO REVIEW: ${docName}` });

  if (mimeType === "application/pdf") {
    contentBlocks.push({
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data: buffer.toString("base64") },
    } as Anthropic.DocumentBlockParam);
  } else if (mimeType === "image/jpeg" || mimeType === "image/png") {
    contentBlocks.push({
      type: "image",
      source: { type: "base64", media_type: mimeType as "image/jpeg" | "image/png", data: buffer.toString("base64") },
    });
  } else {
    contentBlocks.push({ type: "text", text: buffer.toString("utf-8") });
  }

  contentBlocks.push({
    type: "text",
    text: "Review this document against the baseline scope. Identify all changes, additions, or conflicts.",
  });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 16000,
      system: systemPrompt,
      messages: [{ role: "user", content: contentBlocks }],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    const changes = parseChanges(text);

    // Create a scan record for this document comparison
    const { data: scan } = await supabase
      .from("drawing_revision_scans")
      .insert({
        company_id: companyId,
        project_id: projectId,
        project_name: projectName ?? "",
        status: "completed",
        total_drawings: 1,
        completed_drawings: 1,
        failed_drawings: 0,
        completed_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    const scanId = scan?.id;

    // Save changes to drawing_revision_changes with discipline="Document"
    if (scanId && changes.length > 0) {
      const rows = changes.map((c) => ({
        scan_id: scanId,
        company_id: companyId,
        project_id: projectId,
        discipline: "Document",
        drawing_number: docName,
        drawing_title: docName,
        old_revision: "baseline",
        new_revision: "current",
        change_type: c.change_type,
        description: c.description,
        location_on_drawing: c.location_on_drawing,
        severity: c.severity,
        variation_risk: c.variation_risk,
        variation_note: c.variation_note,
      }));

      await supabase.from("drawing_revision_changes").insert(rows);
    }

    return NextResponse.json({
      success: true,
      document_name: docName,
      scan_id: scanId,
      changes_found: changes.length,
      changes,
      baseline_items_used: allItems.length,
      by_risk: {
        likely_variation: changes.filter((c) => c.variation_risk === "likely_variation").length,
        within_scope: changes.filter((c) => c.variation_risk === "within_scope").length,
        unclear: changes.filter((c) => c.variation_risk === "unclear").length,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[compare-doc] Error: ${msg}`);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
