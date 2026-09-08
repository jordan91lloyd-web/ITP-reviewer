// POST /api/drawing-changes/change-event
// Creates a draft Change Event from one or more drawing changes.
// Stores in Supabase. Procore integration is a future addition.
//
// Body: {
//   company_id, project_id, project_name,
//   title, description, discipline,
//   change_ids: string[]  — the changes this event covers
// }

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  let body: {
    company_id: string;
    project_id: string;
    project_name: string;
    title: string;
    description: string;
    discipline: string;
    change_ids: string[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, project_id, project_name, title, description, discipline, change_ids } = body;
  if (!company_id || !project_id || !title || !Array.isArray(change_ids) || change_ids.length === 0) {
    return NextResponse.json({ error: "company_id, project_id, title, and change_ids required" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Create the change event draft
  const { data: event, error: eventErr } = await supabase
    .from("drawing_change_events")
    .insert({
      company_id,
      project_id,
      project_name,
      title,
      description,
      discipline,
      change_ids,
      status: "draft",
      procore_change_event_id: null,
    })
    .select("id")
    .single();

  if (eventErr || !event) {
    console.error("[change-event] Insert error:", eventErr);
    return NextResponse.json({ error: eventErr?.message ?? "Failed to create change event" }, { status: 500 });
  }

  // Mark the linked changes as "variation_raised" and store the event ID
  await supabase
    .from("drawing_revision_changes")
    .update({
      review_status: "variation_raised",
      change_event_id: event.id,
    })
    .in("id", change_ids);

  // TODO: Procore integration
  // Once the Change Events API endpoint is confirmed, this is where we'd:
  // 1. POST /rest/v1.0/projects/{project_id}/change_events
  //    { change_event: { title, description, status: "open" } }
  // 2. Store the returned Procore ID in procore_change_event_id
  // 3. The event links back to Procore for tracking

  return NextResponse.json({
    success: true,
    event_id: event.id,
    procore_synced: false,  // Will be true once Procore integration is live
  });
}

// GET /api/drawing-changes/change-event?company_id=X&project_id=Y
// Lists all change events for a project.

export async function GET(request: NextRequest) {
  const companyId = request.nextUrl.searchParams.get("company_id");
  const projectId = request.nextUrl.searchParams.get("project_id");

  if (!companyId || !projectId) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  const supabase = getSupabase();

  const { data: events, error } = await supabase
    .from("drawing_change_events")
    .select("*")
    .eq("company_id", companyId)
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ events: events ?? [] });
}
