// ─── POST /api/inspection-creator/convert ─────────────────────────────────
// Accepts a single file (PDF, JPG, PNG, DOCX, XLSX), converts it into a
// structured inspection checklist via Claude, and returns the result.

import { NextRequest, NextResponse } from "next/server";
import { runInspectionConversion } from "@/lib/inspectionCreatorClaude";
import mammoth from "mammoth";
import * as XLSX from "xlsx";

export const maxDuration = 120;

const MAX_FILE_SIZE = 32 * 1024 * 1024;

const NATIVE_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const DOCX_MIMES = new Set(["application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
const XLSX_MIMES = new Set(["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]);
const LEGACY_DOC = new Set(["application/msword"]);
const LEGACY_XLS = new Set(["application/vnd.ms-excel"]);

function resolveType(
  mime: string,
  name: string
): "pdf" | "image" | "docx" | "xlsx" | "legacy_doc" | "legacy_xls" | null {
  if (NATIVE_TYPES.has(mime)) return mime === "application/pdf" ? "pdf" : "image";
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
  let fileRef: File | null = null;
  let fileTypeRef: "pdf" | "image" | "docx" | "xlsx" | "legacy_doc" | "legacy_xls" | null = null;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, error: "No file provided. Upload a PDF, JPG, PNG, DOCX, or XLSX." }, { status: 400 });
    }
    fileRef = file;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 32 MB.` }, { status: 400 });
    }

    const fileType = resolveType(file.type, file.name);
    fileTypeRef = fileType;
    if (fileType === "legacy_doc") return NextResponse.json({ success: false, error: "Legacy .doc not supported — re-save as .docx." }, { status: 400 });
    if (fileType === "legacy_xls") return NextResponse.json({ success: false, error: "Legacy .xls not supported — re-save as .xlsx." }, { status: 400 });
    if (!fileType) return NextResponse.json({ success: false, error: `Unsupported file type "${file.type}". Use PDF, JPG, PNG, DOCX, or XLSX.` }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileSizeMB = (file.size / 1024 / 1024).toFixed(1);

    // Build format_received string for error reporting
    let formatReceived = "";

    if (fileType === "pdf") {
      formatReceived = `PDF (${fileSizeMB} MB)`;
      const inspection = await runInspectionConversion(buffer, file.name, "application/pdf");
      return NextResponse.json({ success: true, inspection });
    }
    if (fileType === "image") {
      const imgType = file.type === "image/png" ? "PNG" : "JPEG";
      formatReceived = `${imgType} image (${fileSizeMB} MB)`;
      const inspection = await runInspectionConversion(buffer, file.name, file.type as "image/jpeg" | "image/png");
      return NextResponse.json({ success: true, inspection });
    }
    if (fileType === "docx") {
      const { value: text } = await mammoth.extractRawText({ buffer });
      formatReceived = `Word document extracted to text (${text.length.toLocaleString()} characters)`;
      if (!text.trim()) return NextResponse.json({ success: false, error: "Word document appears to be empty.", file_type: "docx", file_size: fileSizeMB, format_received: formatReceived }, { status: 400 });
      const inspection = await runInspectionConversion(Buffer.from(text, "utf-8"), file.name, "text/plain");
      return NextResponse.json({ success: true, inspection });
    }
    if (fileType === "xlsx") {
      const text = xlsxToText(buffer);
      formatReceived = `Excel spreadsheet extracted to text (${text.length.toLocaleString()} characters)`;
      if (!text.trim()) return NextResponse.json({ success: false, error: "Excel file appears to be empty.", file_type: "xlsx", file_size: fileSizeMB, format_received: formatReceived }, { status: 400 });
      const inspection = await runInspectionConversion(Buffer.from(text, "utf-8"), file.name, "text/plain");
      return NextResponse.json({ success: true, inspection });
    }

    return NextResponse.json({ success: false, error: "Unexpected file type." }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[inspection-creator/convert] Error: ${message}`);

    // Build contextual suggestion and format info
    const fileSizeMB = fileRef ? (fileRef.size / 1024 / 1024).toFixed(1) : "unknown";
    const detectedType = fileTypeRef;

    let suggestion = "Try uploading the document again. If the problem persists, try a different file format.";
    let formatReceived = `Unknown (${fileSizeMB} MB)`;

    if (message.includes("truncat") || message.includes("token limit") || message.includes("too large")) {
      suggestion = "The document is very large. Try splitting it into sections and converting each separately.";
    } else if (detectedType === "image") {
      const imgType = fileRef && fileRef.type === "image/png" ? "PNG" : "JPEG";
      formatReceived = `${imgType} image (${fileSizeMB} MB)`;
      suggestion = "Try taking a clearer photo with better lighting. Handwritten text should be legible.";
    } else if (detectedType === "pdf") {
      formatReceived = `PDF (${fileSizeMB} MB)`;
      suggestion = "The PDF may be scanned at low resolution. Try a higher-quality scan.";
    } else if (detectedType === "docx") {
      formatReceived = `Word document (${fileSizeMB} MB)`;
      suggestion = "The document may have unusual formatting. Try copying the content to a new document.";
    } else if (detectedType === "xlsx") {
      formatReceived = `Excel spreadsheet (${fileSizeMB} MB)`;
      suggestion = "The document may have unusual formatting. Try copying the content to a new document.";
    }

    return NextResponse.json({
      success: false,
      error: message,
      file_type: detectedType,
      file_size: fileSizeMB,
      format_received: formatReceived,
      suggestion,
    }, { status: 500 });
  }
}
