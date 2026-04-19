// ─── GET /api/documents ───────────────────────────────────────────────────────
// Returns the company-specific scoring document from Supabase Storage.
// Storage path: {company_id}/scoring-guidelines.docx
// Falls back gracefully to { documents: [], configured: false } if Storage
// is not configured, so the How it Works page can fall back to the static file.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "documents";

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get("procore_access_token")?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const companyId   = process.env.FLEEK_COMPANY_ID ?? "default";

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ documents: [], configured: false });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const storagePath = `${companyId}/scoring-guidelines.docx`;

    // Check whether the company-specific file exists
    const { data: listData } = await supabase.storage
      .from(BUCKET)
      .list(companyId, { limit: 10 });

    const file = (listData ?? []).find(f => f.name === "scoring-guidelines.docx");

    if (!file) {
      // No company-specific file yet — return empty so client uses static fallback
      return NextResponse.json({ documents: [], configured: true, company_id: companyId });
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

    return NextResponse.json({
      documents: [{
        name:          file.name,
        path:          storagePath,
        size:          file.metadata?.size ?? null,
        last_modified: file.updated_at ?? file.created_at ?? null,
        url:           urlData.publicUrl,
      }],
      configured: true,
      company_id: companyId,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ documents: [], configured: false, error: msg });
  }
}
