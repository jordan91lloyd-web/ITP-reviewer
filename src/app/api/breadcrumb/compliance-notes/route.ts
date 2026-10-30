// POST /api/breadcrumb/compliance-notes
// Upserts a compliance note for a site/week into site_compliance_notes.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requirePermission } from "@/lib/route-auth";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(request: NextRequest) {
  const auth = await requirePermission(request, "company", "view");
  if (auth.error) return auth.error;

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
