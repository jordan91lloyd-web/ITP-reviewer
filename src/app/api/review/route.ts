// ─── POST /api/review ─────────────────────────────────────────────────────
// Receives the document bundle from the browser, processes each file,
// sends everything to Claude, and returns a structured JSON review.
// No user-supplied metadata — Claude extracts all header fields automatically.

import { NextRequest, NextResponse } from "next/server";
import { runBundleReview } from "@/lib/claude";
import {
  isAllowedType,
  isTooLarge,
  MAX_BUNDLE_SIZE_BYTES,
  MAX_FILE_COUNT,
} from "@/lib/validation";
import type { ProcessedFile } from "@/lib/types";
import pdfParse from "pdf-parse";

export async function POST(request: NextRequest) {
  console.log("\n[review] ─────────────────────────────────────");
  console.log("[review] New review request received");

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[review] ERROR: ANTHROPIC_API_KEY is not set");
    return fail(
      "ANTHROPIC_API_KEY is not set. " +
        "Create a .env.local file in the project root and add: ANTHROPIC_API_KEY=your-key-here. " +
        "Then restart the dev server with: npm run dev",
      500
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (err) {
    console.error("[review] Failed to parse form data:", err);
    return fail("Could not read the uploaded data. Please try again.", 400);
  }

  // ── Collect and validate uploaded files ──────────────────────────────────
  const rawFiles = formData.getAll("files") as File[];

  if (rawFiles.length === 0) {
    return fail("No files were uploaded. Please add at least one document.", 400);
  }
  if (rawFiles.length > MAX_FILE_COUNT) {
    return fail(`Too many files. Maximum is ${MAX_FILE_COUNT} per bundle.`, 400);
  }

  const totalBytes = rawFiles.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > MAX_BUNDLE_SIZE_BYTES) {
    return fail(
      `Bundle is too large (${(totalBytes / 1024 / 1024).toFixed(1)} MB). Maximum total is 50 MB.`,
      400
    );
  }

  for (const file of rawFiles) {
    if (!isAllowedType(file.type)) {
      return fail(`"${file.name}" is not a supported file type. Accepted: PDF, JPG, PNG.`, 400);
    }
    if (isTooLarge(file.size)) {
      return fail(`"${file.name}" is too large. Maximum size per file is 20 MB.`, 400);
    }
  }

  console.log(`[review] ${rawFiles.length} file(s) accepted:`, rawFiles.map((f) => f.name));

  // ── Process each file ─────────────────────────────────────────────────────
  const processedFiles: ProcessedFile[] = [];

  for (const file of rawFiles) {
    console.log(`[review] Processing: ${file.name} (${file.type})`);
    const buffer = Buffer.from(await file.arrayBuffer());

    if (file.type === "application/pdf") {
      try {
        const pdfData = await pdfParse(buffer);
        const text = pdfData.text?.trim();

        if (!text) {
          console.warn(`[review] Warning: No text found in ${file.name} — may be a scanned image`);
          processedFiles.push({
            kind: "text",
            filename: file.name,
            text: "[This PDF contains no extractable text. It appears to be a scanned image. " +
                  "Consider uploading it as a JPG or PNG so Claude can analyse its contents visually.]",
          });
        } else {
          console.log(`[review]   → Extracted ${text.length} characters of text`);
          processedFiles.push({ kind: "text", filename: file.name, text });
        }
      } catch (err) {
        console.error(`[review] Failed to parse PDF ${file.name}:`, err);
        processedFiles.push({
          kind: "text",
          filename: file.name,
          text: "[Could not read this PDF. It may be corrupted or password-protected.]",
        });
      }
    } else {
      const base64 = buffer.toString("base64");
      const mediaType = file.type === "image/png" ? "image/png" : "image/jpeg";
      console.log(`[review]   → Image prepared for vision API (${(buffer.length / 1024).toFixed(1)} KB)`);
      processedFiles.push({ kind: "image", filename: file.name, base64, mediaType });
    }
  }

  // ── Send to Claude ────────────────────────────────────────────────────────
  console.log("[review] Sending bundle to Claude...");

  try {
    const result = await runBundleReview(processedFiles);

    console.log(`[review] Review complete. Score: ${result.score}, Assessment: ${result.package_assessment}`);
    console.log("[review] ─────────────────────────────────────\n");

    return NextResponse.json({ success: true, result });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("[review] Review failed:", msg);
    return fail(msg, 500);
  }
}

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}
