// ─── POST /api/review ─────────────────────────────────────────────────────
// Receives the document bundle from the browser, processes each file,
// sends everything to Claude, and returns a structured JSON review.
// No user-supplied metadata — Claude extracts all header fields automatically.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { runBundleReview } from "@/lib/claude";
import {
  isAllowedType,
  isTooLarge,
  MAX_BUNDLE_SIZE_BYTES,
  MAX_FILE_COUNT,
} from "@/lib/validation";
import type { ProcessedFile } from "@/lib/types";
import { logAuditEvent, resolveAuditUser, AUDIT_ACTIONS } from "@/lib/audit";

export async function POST(request: NextRequest) {
  console.log("\n[review] ─────────────────────────────────────");
  console.log("[review] New review request received");

  // Resolve audit identity from Procore cookie if present (manual uploads may
  // not be authenticated, in which case we log as "anonymous").
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  const auditUser   = await resolveAuditUser(accessToken);
  const auditCompany = process.env.FLEEK_COMPANY_ID ?? "manual";

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
      // Pass PDF natively so Claude reads typed text AND sees embedded
      // images, signatures, stamps, and scanned pages — exactly what a
      // human reviewer would see when opening the file.
      console.log(`[review]   → Passing PDF natively (${(buffer.length / 1024).toFixed(1)} KB)`);
      processedFiles.push({
        kind: "pdf",
        filename: file.name,
        base64: buffer.toString("base64"),
      });
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
    const result = await runBundleReview(processedFiles, auditCompany);

    console.log(`[review] Review complete. Score: ${result.total_score} (${result.score_band}), Assessment: ${result.package_assessment}`);
    console.log("[review] ─────────────────────────────────────\n");

    void logAuditEvent({
      ...auditUser,
      company_id: auditCompany,
      action: AUDIT_ACTIONS.REVIEW_RUN,
      details: { file_count: processedFiles.length, score: result.total_score, score_band: result.score_band, source: "manual", scoring_source: result.scoring_source },
    });

    return NextResponse.json({ success: true, result });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("[review] Review failed:", msg);

    void logAuditEvent({
      ...auditUser,
      company_id: auditCompany,
      action: AUDIT_ACTIONS.REVIEW_FAILED,
      details: { file_count: processedFiles.length, error: msg, source: "manual", scoring_source: "unknown" },
    });

    return fail(msg, 500);
  }
}

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}
