// ─── POST /api/documents/upload ───────────────────────────────────────────────
// Uploads a scoring guidelines document to Supabase Storage.
// Storage path: {company_id}/scoring-guidelines.docx
// Requires the caller to be a company admin (checked via isCompanyAdmin).
// Logs the upload to the audit_log table.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";
import { isCompanyAdmin } from "@/lib/admin";
import { logAuditEvent, AUDIT_ACTIONS } from "@/lib/audit";
import { invalidateScoringCache, nextVersionNumber } from "@/lib/scoring";

const BUCKET        = "documents";
const MAX_SIZE_BYTES = 52_428_800; // 50 MB

const ALLOWED_TYPES = new Set([
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/msword",
]);

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const supabaseUrl        = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const companyId          = process.env.FLEEK_COMPANY_ID ?? "default";

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Supabase Storage is not configured. Set SUPABASE_SERVICE_ROLE_KEY in .env.local." },
      { status: 503 }
    );
  }

  // Admin check
  let user: { login: string; name: string; id: number };
  try {
    user = await getProcoreUser(accessToken);
  } catch {
    return NextResponse.json({ error: "Failed to verify identity." }, { status: 401 });
  }

  const admin = await isCompanyAdmin(user.login, companyId);
  if (!admin) {
    return NextResponse.json({ error: "Access denied. Admin role required." }, { status: 403 });
  }

  // Parse form data
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File exceeds the 50 MB size limit." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only .docx, .doc, and .pdf files are allowed." },
      { status: 400 }
    );
  }

  const supabase    = createClient(supabaseUrl, supabaseServiceKey);
  const storagePath = `${companyId}/scoring-guidelines.docx`;

  // Check if a previous version exists (for audit log)
  const { data: existing } = await supabase.storage
    .from(BUCKET)
    .list(companyId, { limit: 5 });
  const previousVersionExisted = (existing ?? []).some(f => f.name === "scoring-guidelines.docx");

  // Upload
  const arrayBuffer = await file.arrayBuffer();
  const buffer      = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert:      true,
    });

  if (uploadError) {
    console.error("[documents/upload] Storage error:", uploadError.message);
    return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  // Bust the in-memory scoring cache so the next review picks up the new doc
  invalidateScoringCache(companyId);

  // ── Insert scoring version record ───────────────────────────────────────
  let newVersionNumber = "1.0";
  let newVersionId: string | null = null;
  try {
    // Find the latest version for this company to auto-increment
    const { data: latestRow } = await supabase
      .from("scoring_versions")
      .select("version_number")
      .eq("company_id", companyId)
      .order("uploaded_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    newVersionNumber = nextVersionNumber(latestRow?.version_number ?? null);

    const { data: versionRow, error: versionError } = await supabase
      .from("scoring_versions")
      .insert({
        company_id:        companyId,
        version_number:    newVersionNumber,
        uploaded_by_email: user.login,
        uploaded_by_name:  user.name,
        file_name:         file.name,
        file_size:         file.size,
        source:            "supabase",
      })
      .select("id")
      .single();

    if (versionError) {
      console.error("[documents/upload] Failed to insert scoring_versions row:", versionError.message);
    } else {
      newVersionId = versionRow?.id ?? null;
    }
  } catch (err) {
    console.error("[documents/upload] Version tracking error:", err instanceof Error ? err.message : err);
  }

  // Audit log (fire-and-forget)
  void logAuditEvent({
    company_id:  companyId,
    user_id:     String(user.id),
    user_name:   user.name,
    user_email:  user.login,
    action:      AUDIT_ACTIONS.SCORING_DOCUMENT_UPDATED,
    details: {
      filename:                  file.name,
      file_size:                 file.size,
      storage_path:              storagePath,
      previous_version_existed:  previousVersionExisted,
      version_number:            newVersionNumber,
      version_id:                newVersionId,
    },
  });

  return NextResponse.json({
    success:        true,
    url:            urlData.publicUrl,
    name:           storagePath,
    company_id:     companyId,
    version_number: newVersionNumber,
    version_id:     newVersionId,
  });
}
