// POST /api/drawing-changes/baseline — Upload or link a document, extract scope items
// GET  /api/drawing-changes/baseline?company_id=X&project_id=Y — List baseline docs
// DELETE /api/drawing-changes/baseline — Remove a baseline doc

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { BASELINE_SYSTEM_PROMPT, type BaselineScopeItem } from "@/lib/baseline-prompt";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function parseItems(raw: string): BaselineScopeItem[] {
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch {
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenceMatch) try { parsed = JSON.parse(fenceMatch[1].trim()); } catch { /* */ }
    if (!parsed) {
      const start = raw.indexOf("[");
      const end = raw.lastIndexOf("]");
      if (start !== -1 && end > start) try { parsed = JSON.parse(raw.slice(start, end + 1)); } catch { return []; }
    }
  }
  if (!Array.isArray(parsed)) return [];

  const validCategories = new Set(["inclusion", "exclusion", "allowance", "specification", "condition"]);
  return parsed
    .filter((item: unknown): item is Record<string, unknown> =>
      typeof item === "object" && item !== null &&
      typeof (item as Record<string, unknown>).item === "string" &&
      validCategories.has((item as Record<string, unknown>).category as string)
    )
    .map((item) => ({
      category: item.category as BaselineScopeItem["category"],
      item: item.item as string,
      detail: typeof item.detail === "string" ? item.detail : null,
      source_reference: typeof item.source_reference === "string" ? item.source_reference : null,
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

async function extractWithClaude(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<BaselineScopeItem[]> {
  const client = new Anthropic();
  const contentBlocks: Anthropic.ContentBlockParam[] = [];

  contentBlocks.push({ type: "text", text: `Document: ${filename}` });

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
    // text/plain (from docx/xlsx conversion)
    contentBlocks.push({ type: "text", text: buffer.toString("utf-8") });
  }

  contentBlocks.push({
    type: "text",
    text: "Extract all scope items from this document. Return a JSON array.",
  });

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 16000,
    system: BASELINE_SYSTEM_PROMPT,
    messages: [{ role: "user", content: contentBlocks }],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  return parseItems(text);
}

// ── POST: Upload and process a baseline document ──────────────────────────

const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32 MB — Claude document blocks accept up to ~32 MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB — Claude rejects large base64 image blocks
const SUPPORTED_EXTENSIONS = [".pdf", ".docx", ".xlsx", ".jpg", ".jpeg", ".png"];
const UNSUPPORTED_EXTENSIONS = [".doc", ".xls", ".dwg", ".rvt", ".ifc", ".zip", ".rar", ".mp4", ".mov"];

function isSupportedFile(name: string): { supported: boolean; reason?: string } {
  const lower = name.toLowerCase();
  if (UNSUPPORTED_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    const ext = UNSUPPORTED_EXTENSIONS.find((e) => lower.endsWith(e))!;
    return { supported: false, reason: `Unsupported format (${ext})` };
  }
  if (!SUPPORTED_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    return { supported: false, reason: `Unsupported format` };
  }
  return { supported: true };
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const companyId = formData.get("company_id") as string;
  const projectId = formData.get("project_id") as string;

  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const supabase = getSupabase();

  const file = formData.get("file") as File | null;
  const procoreDocUrl = formData.get("procore_doc_url") as string | null;
  const procoreDocName = formData.get("procore_doc_name") as string | null;
  const procoreDocId = formData.get("procore_doc_id") as string | null;

  let buffer: Buffer;
  let filename: string;
  let mimeType: string;
  let source: "upload" | "procore";
  let fileSize = 0;

  if (file && file.size > 0) {
    filename = file.name;
    source = "upload";
    fileSize = file.size;

    // Check format
    const check = isSupportedFile(filename);
    if (!check.supported) {
      // Log as skipped
      await supabase.from("baseline_documents").insert({
        company_id: companyId, project_id: projectId, document_name: filename,
        document_type: file.type, source: "upload", status: "skipped",
        scope_items: [], item_count: 0, error_message: check.reason,
      });
      return NextResponse.json({ success: false, skipped: true, document_name: filename, reason: check.reason });
    }

    // Check size
    if (file.size > MAX_FILE_SIZE) {
      await supabase.from("baseline_documents").insert({
        company_id: companyId, project_id: projectId, document_name: filename,
        document_type: file.type, source: "upload", status: "skipped",
        scope_items: [], item_count: 0, error_message: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB, max 32 MB)`,
      });
      return NextResponse.json({ success: false, skipped: true, document_name: filename, reason: "File too large" });
    }

    const rawBuffer = Buffer.from(await file.arrayBuffer());
    mimeType = file.type;

    if (filename.toLowerCase().endsWith(".docx")) {
      const { value: text } = await mammoth.extractRawText({ buffer: rawBuffer });
      if (!text.trim()) {
        await supabase.from("baseline_documents").insert({
          company_id: companyId, project_id: projectId, document_name: filename,
          document_type: "text/plain", source: "upload", status: "skipped",
          scope_items: [], item_count: 0, error_message: "Document is empty",
        });
        return NextResponse.json({ success: false, skipped: true, document_name: filename, reason: "Empty document" });
      }
      buffer = Buffer.from(text, "utf-8");
      mimeType = "text/plain";
    } else if (filename.toLowerCase().endsWith(".xlsx")) {
      const text = xlsxToText(rawBuffer);
      if (!text.trim()) {
        await supabase.from("baseline_documents").insert({
          company_id: companyId, project_id: projectId, document_name: filename,
          document_type: "text/plain", source: "upload", status: "skipped",
          scope_items: [], item_count: 0, error_message: "Spreadsheet is empty",
        });
        return NextResponse.json({ success: false, skipped: true, document_name: filename, reason: "Empty spreadsheet" });
      }
      buffer = Buffer.from(text, "utf-8");
      mimeType = "text/plain";
    } else {
      buffer = rawBuffer;
    }
  } else if (procoreDocUrl) {
    source = "procore";
    filename = procoreDocName ?? "procore-document";

    // Check format
    const check = isSupportedFile(filename);
    if (!check.supported) {
      await supabase.from("baseline_documents").insert({
        company_id: companyId, project_id: projectId, document_name: filename,
        document_type: "", source: "procore", procore_document_id: procoreDocId ? parseInt(procoreDocId) : null,
        status: "skipped", scope_items: [], item_count: 0, error_message: check.reason,
      });
      return NextResponse.json({ success: false, skipped: true, document_name: filename, reason: check.reason });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("procore_access_token")?.value;

    const isS3 = !procoreDocUrl.includes("procore.com") || procoreDocUrl.includes("s3.");
    const headers: Record<string, string> = {};
    if (!isS3 && token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(procoreDocUrl, { headers });
    if (!res.ok) {
      await supabase.from("baseline_documents").insert({
        company_id: companyId, project_id: projectId, document_name: filename,
        document_type: "", source: "procore", procore_document_id: procoreDocId ? parseInt(procoreDocId) : null,
        status: "failed", scope_items: [], item_count: 0, error_message: `Download failed (HTTP ${res.status})`,
      });
      return NextResponse.json({ success: false, skipped: false, document_name: filename, reason: `Download failed (HTTP ${res.status})` });
    }
    const rawBuffer = Buffer.from(await res.arrayBuffer());
    fileSize = rawBuffer.length;

    if (fileSize > MAX_FILE_SIZE) {
      await supabase.from("baseline_documents").insert({
        company_id: companyId, project_id: projectId, document_name: filename,
        document_type: "", source: "procore", procore_document_id: procoreDocId ? parseInt(procoreDocId) : null,
        status: "skipped", scope_items: [], item_count: 0,
        error_message: `File too large (${(fileSize / 1024 / 1024).toFixed(1)} MB, max 32 MB)`,
      });
      return NextResponse.json({ success: false, skipped: true, document_name: filename, reason: "File too large" });
    }

    if (filename.toLowerCase().endsWith(".docx")) {
      const { value: text } = await mammoth.extractRawText({ buffer: rawBuffer });
      buffer = Buffer.from(text.trim() ? text : " ", "utf-8");
      mimeType = "text/plain";
    } else if (filename.toLowerCase().endsWith(".xlsx")) {
      const text = xlsxToText(rawBuffer);
      buffer = Buffer.from(text.trim() ? text : " ", "utf-8");
      mimeType = "text/plain";
    } else if (filename.toLowerCase().endsWith(".pdf")) {
      buffer = rawBuffer;
      mimeType = "application/pdf";
    } else if (filename.toLowerCase().match(/\.(jpg|jpeg)$/)) {
      buffer = rawBuffer;
      mimeType = "image/jpeg";
    } else if (filename.toLowerCase().endsWith(".png")) {
      buffer = rawBuffer;
      mimeType = "image/png";
    } else {
      buffer = rawBuffer;
      mimeType = "application/pdf";
    }
  } else {
    return NextResponse.json({ error: "No file or Procore document URL provided" }, { status: 400 });
  }

  // Reject images over 5 MB — base64 encoding inflates them beyond Claude's block limit
  if ((mimeType === "image/jpeg" || mimeType === "image/png") && buffer.length > MAX_IMAGE_SIZE) {
    const sizeMB = (buffer.length / 1024 / 1024).toFixed(1);
    await supabase.from("baseline_documents").insert({
      company_id: companyId, project_id: projectId, document_name: filename,
      document_type: mimeType, source, procore_document_id: procoreDocId ? parseInt(procoreDocId) : null,
      status: "skipped", scope_items: [], item_count: 0, file_size: buffer.length,
      error_message: `Image too large (${sizeMB} MB, max 5 MB for images)`,
    });
    return NextResponse.json({ success: false, skipped: true, document_name: filename, reason: `Image too large (${sizeMB} MB, max 5 MB)` });
  }

  // Create the baseline doc record (status: processing)
  const { data: doc, error: insertErr } = await supabase
    .from("baseline_documents")
    .insert({
      company_id: companyId,
      project_id: projectId,
      document_name: filename,
      document_type: mimeType,
      source,
      procore_document_id: procoreDocId ? parseInt(procoreDocId) : null,
      status: "processing",
      scope_items: [],
      item_count: 0,
      file_size: fileSize,
    })
    .select("id")
    .single();

  if (insertErr || !doc) {
    return NextResponse.json({ error: insertErr?.message ?? "Failed to create record" }, { status: 500 });
  }

  // Extract scope items
  try {
    const items = await extractWithClaude(buffer, filename, mimeType);

    await supabase
      .from("baseline_documents")
      .update({
        status: "processed",
        scope_items: items,
        item_count: items.length,
      })
      .eq("id", doc.id);

    return NextResponse.json({
      success: true,
      document_id: doc.id,
      document_name: filename,
      item_count: items.length,
      scope_items: items,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await supabase
      .from("baseline_documents")
      .update({ status: "failed", error_message: msg })
      .eq("id", doc.id);

    return NextResponse.json({ error: `Extraction failed: ${msg}` }, { status: 500 });
  }
}

// ── GET: List baseline documents for a project ───────────────────────────

export async function GET(request: NextRequest) {
  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");

  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Clean up stuck "processing" records (older than 10 minutes)
  const staleThreshold = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  await supabase
    .from("baseline_documents")
    .update({ status: "failed", error_message: "Processing timed out" })
    .eq("company_id", companyId)
    .eq("project_id", projectId)
    .eq("status", "processing")
    .lt("created_at", staleThreshold);

  const { data: docs, error } = await supabase
    .from("baseline_documents")
    .select("*")
    .eq("company_id", companyId)
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Aggregate scope items across all docs
  const allItems: BaselineScopeItem[] = [];
  for (const doc of docs ?? []) {
    if (Array.isArray(doc.scope_items)) allItems.push(...doc.scope_items);
  }

  const byCat: Record<string, number> = {};
  for (const item of allItems) {
    byCat[item.category] = (byCat[item.category] ?? 0) + 1;
  }

  return NextResponse.json({
    documents: docs ?? [],
    total_items: allItems.length,
    by_category: byCat,
  });
}

// ── PATCH: Retry failed/skipped baseline documents ────────────────────────
// Procore download URLs are presigned S3 URLs that expire.
// To get fresh URLs we crawl the project's folders (same as the folder browser),
// collect ALL files with URLs, then match failed docs by FILENAME.

const FETCH_TIMEOUT = 30_000;
const DOWNLOAD_TIMEOUT = 120_000;

function resolveFileUrl(f: Record<string, unknown>): string {
  const versions = f.file_versions as Record<string, unknown>[] | undefined;
  if (Array.isArray(versions) && versions.length > 0) {
    for (const v of [versions[versions.length - 1], versions[0]]) {
      if (v.url && typeof v.url === "string") return v.url;
      if (v.download_url && typeof v.download_url === "string") return v.download_url;
      const ps = v.prostore_file as Record<string, unknown> | undefined;
      if (ps?.url && typeof ps.url === "string") return ps.url;
    }
  }
  if (f.url && typeof f.url === "string") return f.url;
  if (f.download_url && typeof f.download_url === "string") return f.download_url;
  return "";
}

interface CrawledFile { name: string; url: string; id: number }

// Crawl all project folders, collect every file with a download URL
async function crawlProjectFiles(
  companyId: string,
  projectId: string,
  token: string,
): Promise<{ files: CrawledFile[]; foldersVisited: number; error?: string }> {
  const headers = { Authorization: `Bearer ${token}`, "Procore-Company-Id": companyId };
  const allFiles: CrawledFile[] = [];

  const rootRes = await fetch(
    `${PROCORE_BASE}/rest/v1.0/folders?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`,
    { headers, signal: AbortSignal.timeout(FETCH_TIMEOUT) }
  );
  if (!rootRes.ok) {
    return { files: [], foldersVisited: 0, error: `Root folder failed (HTTP ${rootRes.status})` };
  }
  const rootData = await rootRes.json();
  const queue: number[] = [];

  if (rootData && typeof rootData === "object" && !Array.isArray(rootData)) {
    const folders = Array.isArray(rootData.folders) ? rootData.folders : [];
    for (const f of folders) {
      if (f.id && f.id !== rootData.id) queue.push(f.id);
    }
    for (const f of (Array.isArray(rootData.files) ? rootData.files : [])) {
      const url = resolveFileUrl(f);
      if (url) allFiles.push({ name: f.name as string, url, id: f.id as number });
    }
  } else if (Array.isArray(rootData)) {
    for (const f of rootData) queue.push(f.id);
  }

  const visited = new Set<number>();
  while (queue.length > 0) {
    const folderId = queue.shift()!;
    if (visited.has(folderId)) continue;
    visited.add(folderId);
    try {
      const res = await fetch(
        `${PROCORE_BASE}/rest/v1.0/folders/${folderId}?company_id=${encodeURIComponent(companyId)}&project_id=${encodeURIComponent(projectId)}`,
        { headers, signal: AbortSignal.timeout(FETCH_TIMEOUT) }
      );
      if (!res.ok) continue;
      const data = await res.json();
      for (const f of (Array.isArray(data.files) ? data.files : [])) {
        const url = resolveFileUrl(f);
        if (url) allFiles.push({ name: f.name as string, url, id: f.id as number });
      }
      for (const s of (Array.isArray(data.folders) ? data.folders : [])) {
        if (s.id !== folderId && !visited.has(s.id)) queue.push(s.id);
      }
    } catch { continue; }
  }

  return { files: allFiles, foldersVisited: visited.size };
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { company_id: companyId, project_id: projectId } = body as { company_id?: string; project_id?: string };

  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Clean up stuck "processing" records first (same as GET does)
  const staleThreshold = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  await supabase
    .from("baseline_documents")
    .update({ status: "failed", error_message: "Processing timed out" })
    .eq("company_id", companyId)
    .eq("project_id", projectId)
    .eq("status", "processing")
    .lt("created_at", staleThreshold);

  // Find all failed/skipped docs
  const { data: retryDocs, error: fetchErr } = await supabase
    .from("baseline_documents")
    .select("*")
    .eq("company_id", companyId)
    .eq("project_id", projectId)
    .in("status", ["failed", "skipped"]);

  if (fetchErr) {
    return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  }
  if (!retryDocs || retryDocs.length === 0) {
    return NextResponse.json({ retried: 0, remaining: 0, message: "No retryable documents found" });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("procore_access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not logged in to Procore" }, { status: 401 });
  }

  // Crawl the project's folders once — collect every file with a URL
  const { files: projectFiles, foldersVisited, error: crawlError } = await crawlProjectFiles(companyId, projectId, token);
  if (crawlError) {
    return NextResponse.json({ error: crawlError }, { status: 502 });
  }

  // Build lookup: filename (lowercased) → fresh URL
  // If multiple files share a name, keep all (use first match per doc)
  const nameToUrl = new Map<string, string>();
  for (const f of projectFiles) {
    const key = f.name.toLowerCase();
    if (!nameToUrl.has(key)) nameToUrl.set(key, f.url);
  }

  // Process 1 doc per request for visible progress
  const doc = retryDocs[0];
  const remaining = retryDocs.length - 1;
  const results: { document_name: string; status: string; item_count?: number; error?: string }[] = [];

  try {
    const downloadUrl = nameToUrl.get(doc.document_name.toLowerCase());
    if (!downloadUrl) {
      await supabase.from("baseline_documents").update({
        error_message: `"${doc.document_name}" not found in project (${foldersVisited} folders, ${projectFiles.length} files crawled)`,
      }).eq("id", doc.id);
      results.push({ document_name: doc.document_name, status: "failed", error: `Not found in ${projectFiles.length} project files` });
    } else {
      // Download — no auth header for S3 presigned URLs
      const isS3 = !downloadUrl.includes("procore.com") || downloadUrl.includes("s3.");
      const dlHeaders: Record<string, string> = {};
      if (!isS3) dlHeaders.Authorization = `Bearer ${token}`;

      const dlRes = await fetch(downloadUrl, { headers: dlHeaders, signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT) });
      if (!dlRes.ok) {
        await supabase.from("baseline_documents").update({ error_message: `Download failed (HTTP ${dlRes.status})` }).eq("id", doc.id);
        results.push({ document_name: doc.document_name, status: "failed", error: `Download HTTP ${dlRes.status}` });
      } else {
        const rawBuffer = Buffer.from(await dlRes.arrayBuffer());
        const fileSize = rawBuffer.length;

        if (fileSize > MAX_FILE_SIZE) {
          await supabase.from("baseline_documents").update({
            status: "skipped", file_size: fileSize,
            error_message: `File too large (${(fileSize / 1024 / 1024).toFixed(1)} MB, max 32 MB)`,
          }).eq("id", doc.id);
          results.push({ document_name: doc.document_name, status: "skipped", error: "Too large" });
        } else {
          const filename = doc.document_name;
          let buffer: Buffer;
          let mimeType: string;

          if (filename.toLowerCase().endsWith(".docx")) {
            const { value: text } = await mammoth.extractRawText({ buffer: rawBuffer });
            buffer = Buffer.from(text.trim() ? text : " ", "utf-8");
            mimeType = "text/plain";
          } else if (filename.toLowerCase().endsWith(".xlsx")) {
            const text = xlsxToText(rawBuffer);
            buffer = Buffer.from(text.trim() ? text : " ", "utf-8");
            mimeType = "text/plain";
          } else if (filename.toLowerCase().match(/\.(jpg|jpeg)$/)) {
            buffer = rawBuffer; mimeType = "image/jpeg";
          } else if (filename.toLowerCase().endsWith(".png")) {
            buffer = rawBuffer; mimeType = "image/png";
          } else {
            buffer = rawBuffer; mimeType = "application/pdf";
          }

          if ((mimeType === "image/jpeg" || mimeType === "image/png") && buffer.length > MAX_IMAGE_SIZE) {
            await supabase.from("baseline_documents").update({
              status: "skipped", file_size: buffer.length,
              error_message: `Image too large (${(buffer.length / 1024 / 1024).toFixed(1)} MB, max 5 MB)`,
            }).eq("id", doc.id);
            results.push({ document_name: doc.document_name, status: "skipped", error: "Image too large" });
          } else {
            await supabase.from("baseline_documents").update({ status: "processing", error_message: null, file_size: fileSize }).eq("id", doc.id);
            const items = await extractWithClaude(buffer, filename, mimeType);
            await supabase.from("baseline_documents").update({
              status: "processed", scope_items: items, item_count: items.length,
              error_message: null, file_size: fileSize, document_type: mimeType,
            }).eq("id", doc.id);
            results.push({ document_name: doc.document_name, status: "processed", item_count: items.length });
          }
        }
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await supabase.from("baseline_documents").update({ status: "failed", error_message: `Retry: ${msg}` }).eq("id", doc.id);
    results.push({ document_name: doc.document_name, status: "failed", error: msg });
  }

  const succeeded = results.filter((r) => r.status === "processed").length;
  return NextResponse.json({ retried: results.length, succeeded, remaining, results });
}

// ── DELETE: Remove a baseline document ────────────────────────────────────

export async function DELETE(request: NextRequest) {
  const docId = request.nextUrl.searchParams.get("document_id");
  if (!docId) {
    return NextResponse.json({ error: "document_id required" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("baseline_documents")
    .delete()
    .eq("id", docId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
