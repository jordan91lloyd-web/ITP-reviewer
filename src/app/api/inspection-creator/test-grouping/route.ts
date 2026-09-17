// ─── Clean end-to-end test of the company→project sync flow
//
// 1. Create fresh company template with Section A + Item A1
// 2. Copy to project
// 3. Create inspection #1 from project template → should have Item A1
// 4. Edit company template: add Section B + Item B1 (keep Section A)
// 5. Create inspection #2 from project template → does it have BOTH A1 and B1?
// 6. Report what each inspection actually contains
//
// DELETE this route after testing.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const maxDuration = 180;

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

const PACE_MS = 700;

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

type InspDetail = {
  id: number; name: string;
  sections?: Array<{ name: string; items?: Array<{ name: string }> }>;
};

function inspItems(d: InspDetail | null): string[] {
  return (d?.sections ?? []).flatMap(s => (s.items ?? []).map(i => `${s.name} > ${i.name}`));
}

export async function GET(request: NextRequest) { return runTest(request); }
export async function POST(request: NextRequest) { return runTest(request); }

async function runTest(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("procore_access_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const CID = "598134325535477";
  const PID = "598134325555936";
  const log: string[] = [];

  try {
    // Get response set
    const rsSets = await get(token, `/rest/v1.0/companies/${CID}/checklist/item/response_sets`, CID) as Array<{ id: number; name: string; active: boolean }> | null;
    const rsId = rsSets?.find((rs) => /pass/i.test(rs.name) && rs.active)?.id ?? rsSets?.[0]?.id;
    if (!rsId) return NextResponse.json({ error: "No response sets" }, { status: 400 });

    // ── STEP 1: Fresh company template with Section A + Item A1 ──
    const name = `[HP Test] Full Flow ${Date.now()}`;
    const t = await post(token, `/rest/v1.0/companies/${CID}/checklist/list_templates`, CID, {
      list_template: { name },
    });
    if (!t.ok) return NextResponse.json({ error: `Create template: ${t.error}`, log }, { status: 502 });
    const ctId = (t.json as { id: number }).id;
    log.push(`1. Company template created: ${ctId} (${name})`);
    await sleep(PACE_MS);

    const secA = await post(token, `/rest/v1.0/companies/${CID}/checklist/list_templates/${ctId}/sections`, CID, {
      section: { name: "Section A - First Report", position: 1 },
    });
    if (!secA.ok) return NextResponse.json({ error: `Section A: ${secA.error}`, log }, { status: 502 });
    const secAId = (secA.json as { id: number }).id;
    log.push(`   Section A: ${secAId}`);
    await sleep(PACE_MS);

    const itemA = await post(token, `/rest/v1.0/companies/${CID}/inspection_templates/${ctId}/items`, CID, {
      inspection_template_item: { name: "Item A1 - from first report", position: 1, section_id: secAId, response_set_id: rsId, type: "default" },
    });
    if (!itemA.ok) return NextResponse.json({ error: `Item A1: ${itemA.error}`, log }, { status: 502 });
    log.push(`   Item A1: ${(itemA.json as { id: number }).id}`);
    await sleep(PACE_MS);

    // ── STEP 2: Copy to project ──
    const copy = await post(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/create_from_company_template`, CID, {
      source_template_id: ctId,
    });
    if (!copy.ok) return NextResponse.json({ error: `Copy: ${copy.error}`, log }, { status: 502 });
    const ptId = (copy.json as { id: number }).id;
    log.push(`2. Project template: ${ptId}`);
    await sleep(PACE_MS);

    // ── STEP 3: Create inspection #1 ──
    const insp1 = await post(token, `/rest/v1.1/projects/${PID}/checklist/lists`, CID, {
      list_template_id: ptId,
      list: { description: "Test inspection #1 — should have Section A items" },
    });
    if (!insp1.ok) return NextResponse.json({ error: `Inspection #1: ${insp1.error}`, log }, { status: 502 });
    const insp1Id = (insp1.json as { id: number }).id;
    log.push(`3. Inspection #1 created: ${insp1Id}`);
    await sleep(PACE_MS);

    const insp1Detail = await get(token, `/rest/v1.0/checklist/lists/${insp1Id}?view=extended&project_id=${PID}`, CID) as InspDetail | null;
    const insp1Items = inspItems(insp1Detail);
    log.push(`   Inspection #1 items: ${JSON.stringify(insp1Items)}`);

    // ── STEP 4: Add Section B + Item B1 to COMPANY template ──
    const secB = await post(token, `/rest/v1.0/companies/${CID}/checklist/list_templates/${ctId}/sections`, CID, {
      section: { name: "Section B - Second Report", position: 2 },
    });
    if (!secB.ok) return NextResponse.json({ error: `Section B: ${secB.error}`, log }, { status: 502 });
    const secBId = (secB.json as { id: number }).id;
    log.push(`4. Added Section B to company: ${secBId}`);
    await sleep(PACE_MS);

    const itemB = await post(token, `/rest/v1.0/companies/${CID}/inspection_templates/${ctId}/items`, CID, {
      inspection_template_item: { name: "Item B1 - from second report", position: 1, section_id: secBId, response_set_id: rsId, type: "default" },
    });
    if (!itemB.ok) return NextResponse.json({ error: `Item B1: ${itemB.error}`, log }, { status: 502 });
    log.push(`   Item B1: ${(itemB.json as { id: number }).id}`);
    await sleep(PACE_MS);

    // Read project template to see if Section B appeared
    const ptAfter = await get(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/${ptId}`, CID) as InspDetail | null;
    const ptAfterItems = inspItems(ptAfter);
    log.push(`   Project template after adding B: ${JSON.stringify(ptAfterItems)}`);

    // ── STEP 5: Create inspection #2 ──
    const insp2 = await post(token, `/rest/v1.1/projects/${PID}/checklist/lists`, CID, {
      list_template_id: ptId,
      list: { description: "Test inspection #2 — does it have Section B items too?" },
    });
    if (!insp2.ok) return NextResponse.json({ error: `Inspection #2: ${insp2.error}`, log }, { status: 502 });
    const insp2Id = (insp2.json as { id: number }).id;
    log.push(`5. Inspection #2 created: ${insp2Id}`);
    await sleep(PACE_MS);

    const insp2Detail = await get(token, `/rest/v1.0/checklist/lists/${insp2Id}?view=extended&project_id=${PID}`, CID) as InspDetail | null;
    const insp2Items = inspItems(insp2Detail);
    log.push(`   Inspection #2 items: ${JSON.stringify(insp2Items)}`);

    // ── RESULTS ──
    const syncWorks = insp2Items.length > insp1Items.length;

    return NextResponse.json({
      success: true,
      company_template_id: ctId,
      project_template_id: ptId,
      inspection_1: { id: insp1Id, items: insp1Items },
      inspection_2: { id: insp2Id, items: insp2Items },
      sync_works: syncWorks,
      conclusion: syncWorks
        ? "SYNC WORKS — Inspection #2 has more items than #1. Editing company template propagates to project template. Your approach is confirmed!"
        : insp2Items.length === insp1Items.length && insp1Items.length > 0
          ? "NO SYNC — Both inspections have the same items. Company edits did not propagate via API."
          : "INCONCLUSIVE — check the items manually.",
      log,
      cleanup_note: `Delete company template ${ctId} and project templates/inspections from Sandbox when done testing.`,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err), log }, { status: 500 });
  }
}
