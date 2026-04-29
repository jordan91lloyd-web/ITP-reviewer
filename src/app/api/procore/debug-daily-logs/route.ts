// ─── GET /api/procore/debug-daily-logs ────────────────────────────────────────
// Diagnostic endpoint. Confirms whether the Procore daily construction logs
// API works for a given project and shows the raw data shape.
//
// Tries two endpoints in order:
//   1. GET /rest/v1.0/daily_construction_report_logs  (primary)
//   2. GET /rest/v1.0/projects/{id}/daily_logs         (fallback if 404)
//
// Usage (browser, while logged in):
//   /api/procore/debug-daily-logs?project_id=123&company_id=456
//
// Read-only — makes no changes to Procore data.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_API_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://app.procore.com"
    : "https://sandbox.procore.com";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const sp        = request.nextUrl.searchParams;
  const projectId = sp.get("project_id");
  const companyId = sp.get("company_id");

  if (!projectId || !companyId) {
    return NextResponse.json(
      { error: "project_id and company_id query params are required." },
      { status: 400 }
    );
  }

  const authHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Procore-Company-Id": companyId,
  };

  // ── Try primary endpoint: daily_construction_report_logs ─────────────────────

  const primaryUrl = new URL(`${PROCORE_API_BASE}/rest/v1.0/daily_construction_report_logs`);
  primaryUrl.searchParams.set("project_id", projectId);
  primaryUrl.searchParams.set("company_id", companyId);

  let primaryStatus: number;
  let primaryBody: unknown;
  try {
    const res = await fetch(primaryUrl.toString(), { headers: authHeaders });
    primaryStatus = res.status;
    try {
      primaryBody = await res.json();
    } catch {
      primaryBody = await res.text();
    }
  } catch (err) {
    return NextResponse.json({
      error: "Network error calling primary endpoint",
      detail: err instanceof Error ? err.message : String(err),
    }, { status: 502 });
  }

  // ── Try fallback endpoint: projects/{id}/daily_logs ───────────────────────────

  const fallbackUrl = new URL(`${PROCORE_API_BASE}/rest/v1.0/projects/${projectId}/daily_logs`);
  fallbackUrl.searchParams.set("company_id", companyId);

  let fallbackStatus: number;
  let fallbackBody: unknown;
  try {
    const res = await fetch(fallbackUrl.toString(), { headers: authHeaders });
    fallbackStatus = res.status;
    try {
      fallbackBody = await res.json();
    } catch {
      fallbackBody = await res.text();
    }
  } catch (err) {
    fallbackStatus = 0;
    fallbackBody   = { error: err instanceof Error ? err.message : String(err) };
  }

  // ── Try notes_logs endpoint ───────────────────────────────────────────────────

  const notesUrl = new URL(`${PROCORE_API_BASE}/rest/v1.0/notes_logs`);
  notesUrl.searchParams.set("project_id", projectId);
  notesUrl.searchParams.set("company_id", companyId);

  let notesStatus: number;
  let notesBody: unknown;
  try {
    const res = await fetch(notesUrl.toString(), { headers: authHeaders });
    notesStatus = res.status;
    try {
      notesBody = await res.json();
    } catch {
      notesBody = await res.text();
    }
  } catch (err) {
    notesStatus = 0;
    notesBody   = { error: err instanceof Error ? err.message : String(err) };
  }

  return NextResponse.json({
    project_id: projectId,
    company_id: companyId,
    endpoints: {
      daily_construction_report_logs: {
        url:    primaryUrl.toString(),
        status: primaryStatus!,
        // Truncate large arrays to first 3 entries to keep response readable
        body: Array.isArray(primaryBody)
          ? { count: primaryBody.length, first_three: primaryBody.slice(0, 3) }
          : primaryBody,
      },
      projects_daily_logs: {
        url:    fallbackUrl.toString(),
        status: fallbackStatus!,
        body: Array.isArray(fallbackBody)
          ? { count: fallbackBody.length, first_three: (fallbackBody as unknown[]).slice(0, 3) }
          : fallbackBody,
      },
      notes_logs: {
        url:    notesUrl.toString(),
        status: notesStatus!,
        body: Array.isArray(notesBody)
          ? { count: notesBody.length, first_three: (notesBody as unknown[]).slice(0, 3) }
          : notesBody,
      },
    },
  });
}
