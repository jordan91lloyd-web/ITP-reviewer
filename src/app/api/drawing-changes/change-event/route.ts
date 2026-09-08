// POST /api/drawing-changes/change-event
// Creates a draft Change Event from drawing changes.
// Stores in Supabase AND creates in Procore if authenticated.
//
// Body: {
//   company_id, project_id, project_name,
//   title, description, discipline,
//   change_ids: string[]
// }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/**
 * Fetch the first "open" or default status ID for change events on this company.
 */
async function getDefaultStatusId(
  token: string,
  companyId: string
): Promise<number | null> {
  try {
    const url = `${PROCORE_BASE}/rest/v2.0/companies/${companyId}/change_events/statuses?per_page=100`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Procore-Company-Id": companyId,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const statuses: { id: number; name: string; default_status?: boolean }[] =
      Array.isArray(data) ? data : data?.data ?? [];

    // Prefer default status, then "Open", then first
    const defaultStatus = statuses.find((s) => s.default_status);
    if (defaultStatus) return defaultStatus.id;
    const openStatus = statuses.find((s) =>
      s.name.toLowerCase().includes("open")
    );
    if (openStatus) return openStatus.id;
    return statuses[0]?.id ?? null;
  } catch {
    return null;
  }
}

/**
 * Create a Change Event in Procore.
 * POST /rest/v1.1/change_events?project_id={project_id}
 */
async function createProcoreChangeEvent(
  token: string,
  companyId: string,
  projectId: string,
  title: string,
  description: string,
  statusId: number
): Promise<{ id: number; number: string } | null> {
  try {
    const url = `${PROCORE_BASE}/rest/v1.1/change_events?project_id=${projectId}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Procore-Company-Id": companyId,
      },
      body: JSON.stringify({
        change_event: {
          title,
          description,
          scope: "tbd",
          status: { id: statusId },
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[change-event] Procore create failed: ${res.status} ${text.slice(0, 500)}`);
      return null;
    }

    const data = await res.json();
    return { id: data.id, number: data.number ?? String(data.id) };
  } catch (err) {
    console.error("[change-event] Procore create error:", err);
    return null;
  }
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

  // Try to create in Procore first (if user is authenticated)
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;

  let procoreEventId: string | null = null;
  let procoreEventNumber: string | null = null;
  let procoreSynced = false;

  if (accessToken) {
    const statusId = await getDefaultStatusId(accessToken, company_id);
    if (statusId) {
      const result = await createProcoreChangeEvent(
        accessToken,
        company_id,
        project_id,
        title,
        description,
        statusId
      );
      if (result) {
        procoreEventId = String(result.id);
        procoreEventNumber = result.number;
        procoreSynced = true;
      }
    }
  }

  // Store in Supabase
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
      status: procoreSynced ? "synced" : "draft",
      procore_change_event_id: procoreEventId,
    })
    .select("id")
    .single();

  if (eventErr || !event) {
    console.error("[change-event] Insert error:", eventErr);
    return NextResponse.json({ error: eventErr?.message ?? "Failed to create change event" }, { status: 500 });
  }

  // Mark linked changes as "variation_raised" with event ID
  await supabase
    .from("drawing_revision_changes")
    .update({
      review_status: "variation_raised",
      change_event_id: event.id,
    })
    .in("id", change_ids);

  return NextResponse.json({
    success: true,
    event_id: event.id,
    procore_synced: procoreSynced,
    procore_event_id: procoreEventId,
    procore_event_number: procoreEventNumber,
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
