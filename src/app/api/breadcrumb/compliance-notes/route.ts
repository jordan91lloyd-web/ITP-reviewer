// POST /api/breadcrumb/compliance-notes
// Upserts a compliance note for a site/week into site_compliance_notes.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return !!cookieStore.get("procore_access_token")?.value;
}

export async function POST(request: NextRequest) {
  if (!await requireAuth()) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { company_id?: string; site_reference?: string; week_start?: string; notes?: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, site_reference, week_start, notes } = body;
  if (!company_id || !site_reference || !week_start) {
    return NextResponse.json(
      { error: "company_id, site_reference, and week_start are required" },
      { status: 400 },
    );
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("site_compliance_notes")
    .upsert(
      {
        company_id,
        site_reference,
        week_start,
        notes: notes ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "company_id,site_reference,week_start" },
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
