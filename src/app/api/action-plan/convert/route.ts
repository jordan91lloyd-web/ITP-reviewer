// ─── POST /api/action-plan/convert ────────────────────────────────────────
// Accepts a single file (PDF, JPG, PNG, DOCX, XLSX), converts it into a
// structured Action Plan via Claude, and returns the result.
// No Procore calls. No Supabase writes.

import { NextRequest, NextResponse } from "next/server";
import { runActionPlanConversion } from "@/lib/actionPlanClaude";
import mammoth from "mammoth";
import * as XLSX from "xlsx";

export const maxDuration = 60;

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

// MIME types we accept directly
const NATIVE_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);

// MIME types for docx/xlsx (browsers report varying MIMEs)
const DOCX_MIMES = new Set([
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const XLSX_MIMES = new Set([
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

// Legacy formats to reject explicitly
const LEGACY_DOC = new Set(["application/msword"]);
const LEGACY_XLS = new Set(["application/vnd.ms-excel"]);

function resolveType(
  mime: string,
  name: string
): "pdf" | "image" | "docx" | "xlsx" | "legacy_doc" | "legacy_xls" | null {
  if (NATIVE_TYPES.has(mime)) {
    return mime === "application/pdf" ? "pdf" : "image";
  }
  if (DOCX_MIMES.has(mime) || name.toLowerCase().endsWith(".docx")) return "docx";
  if (XLSX_MIMES.has(mime) || name.toLowerCase().endsWith(".xlsx")) return "xlsx";
  if (LEGACY_DOC.has(mime) || name.toLowerCase().endsWith(".doc")) return "legacy_doc";
  if (LEGACY_XLS.has(mime) || name.toLowerCase().endsWith(".xls")) return "legacy_xls";
  return null;
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
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No file provided. Upload a single PDF, JPG, PNG, DOCX, or XLSX." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is 20 MB.` },
        { status: 400 }
      );
    }

    const fileType = resolveType(file.type, file.name);

    if (fileType === "legacy_doc") {
      return NextResponse.json(
        { success: false, error: "Legacy .doc format not supported \u2014 re-save as .docx." },
        { status: 400 }
      );
    }
    if (fileType === "legacy_xls") {
      return NextResponse.json(
        { success: false, error: "Legacy .xls format not supported \u2014 re-save as .xlsx." },
        { status: 400 }
      );
    }
    if (!fileType) {
      return NextResponse.json(
        { success: false, error: `Unsupported file type "${file.type}". Use PDF, JPG, PNG, DOCX, or XLSX.` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (fileType === "pdf") {
      const plan = await runActionPlanConversion(buffer, file.name, "application/pdf");
      return NextResponse.json({ success: true, plan });
    }

    if (fileType === "image") {
      const mimeType = file.type as "image/jpeg" | "image/png";
      const plan = await runActionPlanConversion(buffer, file.name, mimeType);
      return NextResponse.json({ success: true, plan });
    }

    if (fileType === "docx") {
      const { value: text } = await mammoth.extractRawText({ buffer });
      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: "Word document appears to be empty." },
          { status: 400 }
        );
      }
      const textBuffer = Buffer.from(text, "utf-8");
      const plan = await runActionPlanConversion(textBuffer, file.name, "text/plain");
      return NextResponse.json({ success: true, plan });
    }

    if (fileType === "xlsx") {
      const text = xlsxToText(buffer);
      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: "Excel file appears to be empty." },
          { status: 400 }
        );
      }
      const textBuffer = Buffer.from(text, "utf-8");
      const plan = await runActionPlanConversion(textBuffer, file.name, "text/plain");
      return NextResponse.json({ success: true, plan });
    }

    return NextResponse.json(
      { success: false, error: "Unexpected file type." },
      { status: 400 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[action-plan/convert] Error: ${message}`);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
