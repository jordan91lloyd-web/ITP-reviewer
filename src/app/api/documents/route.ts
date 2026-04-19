// ─── GET /api/documents ───────────────────────────────────────────────────────
// Lists available documents in the Supabase Storage "documents" bucket.
// Returns each file with its name, size, last_modified, and a public download URL.
// Falls back gracefully if Storage is not configured.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "documents";

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get("procore_access_token")?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const supabaseUrl    = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey    = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ documents: [], configured: false });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.storage.from(BUCKET).list("", {
      limit: 100,
      sortBy: { column: "updated_at", order: "desc" },
    });

    if (error) {
      console.error("[documents] Storage list error:", error.message);
      return NextResponse.json({ documents: [], configured: true, error: error.message });
    }

    const documents = (data ?? [])
      .filter(f => f.name !== ".emptyFolderPlaceholder")
      .map(f => {
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(f.name);
        return {
          name:          f.name,
          size:          f.metadata?.size ?? null,
          last_modified: f.updated_at ?? f.created_at ?? null,
          url:           urlData.publicUrl,
        };
      });

    return NextResponse.json({ documents, configured: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ documents: [], configured: false, error: msg });
  }
}
