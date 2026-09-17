// ─── Test: does creating an inspection from a project template pick up
// the company template's CURRENT items (live sync), or the snapshot from copy time?
//
// We have from previous tests:
// - Company template 598134335529766: currently has Section B + Item B1
// - Project template 598134335529767: API shows empty sections
//
// This test creates an inspection from the project template and checks
// what items the inspection actually gets.
//
// DELETE this route after testing.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const maxDuration = 120;

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

const PACE_MS = 600;

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function hdrs(token: string, cid: string) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Procore-Company-Id": cid };
}

async function post(token: string, path: string, cid: string, body: unknown) {
  const url = `${PROCORE_BASE}${path}${path.includes("?") ? "&" : "?"}company_id=${cid}`;
  const res = await fetch(url, { method: "POST", headers: hdrs(token, cid), body: JSON.stringify(body) });
  const text = await res.text();
  let json: unknown = null;
  try { json = JSON.parse(text); } catch { /* */ }
  return { ok: res.ok, status: res.status, json, error: !res.ok ? text.slice(0, 500) : null };
}

async function get(token: string, path: string, cid: string) {
  const url = `${PROCORE_BASE}${path}${path.includes("?") ? "&" : "?"}company_id=${cid}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, "Procore-Company-Id": cid } });
  if (!res.ok) return null;
  return res.json();
}

export async function GET(request: NextRequest) { return runTest(request); }
export async function POST(request: NextRequest) { return runTest(request); }

async function runTest(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("procore_access_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const CID = "598134325535477";
  const PID = "598134325555936"; // Sandbox
  const COMPANY_TEMPLATE = 598134335529766; // has Section B + Item B1
  const PROJECT_TEMPLATE = 598134335529767; // API shows empty, but might be live-synced
  const log: string[] = [];

  try {
    // 1. Read company template to confirm current state
    const ct = await get(token, `/rest/v1.0/companies/${CID}/checklist/list_templates/${COMPANY_TEMPLATE}`, CID);
    const ctItems = await get(token, `/rest/v1.0/companies/${CID}/inspection_templates/${COMPANY_TEMPLATE}/items`, CID);
    log.push(`Company template items: ${JSON.stringify(ctItems)}`);

    // 2. Read project template via API
    const pt = await get(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/${PROJECT_TEMPLATE}`, CID);
    const ptSections = (pt as { sections?: Array<{ name: string; items?: Array<{ name: string }> }> })?.sections ?? [];
    log.push(`Project template sections (API): ${JSON.stringify(ptSections.map(s => ({ name: s.name, items: s.items?.map(i => i.name) })))}`);

    // 3. Create an inspection from the project template
    const insp = await post(token, `/rest/v1.1/projects/${PID}/checklist/lists`, CID, {
      list_template_id: PROJECT_TEMPLATE,
      list: { description: "Sync test — checking if inspection gets company template items" },
    });
    if (!insp.ok) {
      return NextResponse.json({
        error: `Create inspection failed: ${insp.error}`,
        log,
        hint: "If the project template has no items, Procore may reject the inspection creation",
      }, { status: 502 });
    }
    const inspectionId = (insp.json as { id: number }).id;
    log.push(`Inspection created: ${inspectionId}`);
    await sleep(PACE_MS);

    // 4. Read the inspection with extended view to see its actual items
    const inspDetail = await get(
      token,
      `/rest/v1.0/checklist/lists/${inspectionId}?view=extended&project_id=${PID}`,
      CID,
    ) as {
      id: number;
      name: string;
      sections?: Array<{ name: string; items?: Array<{ name: string; status?: string }> }>;
    } | null;

    const inspSections = inspDetail?.sections ?? [];
    const inspItemNames = inspSections.flatMap(s =>
      (s.items ?? []).map(i => `${s.name} > ${i.name}`)
    );
    log.push(`Inspection items: ${JSON.stringify(inspItemNames)}`);

    return NextResponse.json({
      success: true,
      company_template_id: COMPANY_TEMPLATE,
      project_template_id: PROJECT_TEMPLATE,
      inspection_id: inspectionId,
      inspection_name: inspDetail?.name,
      company_template_has_items: Array.isArray(ctItems) && ctItems.length > 0,
      project_template_sections_via_api: ptSections.length,
      inspection_sections: inspSections.length,
      inspection_items: inspItemNames,
      conclusion: inspItemNames.length > 0
        ? "LIVE SYNC CONFIRMED — the inspection got items from the company template even though the project template API showed empty. The sync works!"
        : "NO SYNC — the inspection has no items either. The project template is truly empty.",
      log,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err), log }, { status: 500 });
  }
}
