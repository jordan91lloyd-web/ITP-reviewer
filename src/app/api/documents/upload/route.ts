// ─── POST /api/documents/upload ───────────────────────────────────────────────
// Uploads a document to the Supabase Storage "documents" bucket.
// Requires Procore auth (internal tool — only authenticated team members can upload).
// Expects multipart/form-data with a "file" field.
// Uses the Supabase service role key so RLS policies don't block the upload.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "documents";
const MAX_SIZE_BYTES = 52_428_800; // 50 MB

const ALLOWED_TYPES = new Set([
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/msword",
]);

export async function POST(request: NextRequest) {
  // Auth check
  const cookieStore = await cookies();
  if (!cookieStore.get("procore_access_token")?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const supabaseUrl        = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Supabase Storage is not configured. Set SUPABASE_SERVICE_ROLE_KEY in .env.local." },
      { status: 503 }
    );
  }

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

  // Use a fixed filename so uploads always replace the previous version
  const storageName = "ITP-QA-Scoring-Guidelines-v1.0.docx";

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storageName, buffer, {
      contentType:  file.type,
      upsert:       true, // replace if exists
    });

  if (error) {
    console.error("[documents/upload] Storage error:", error.message);
    return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storageName);

  return NextResponse.json({ success: true, url: urlData.publicUrl, name: storageName });
}
