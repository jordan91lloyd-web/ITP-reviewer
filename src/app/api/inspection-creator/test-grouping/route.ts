// ─── Temporary test: does editing a company template sync to the project template?
//
// Test flow:
// 1. Create company template with Section A + Item A1
// 2. Copy to project
// 3. Read project template → should have Section A + Item A1
// 4. Add Section B + Item B1 to COMPANY template (don't touch project)
// 5. Read project template again → does it now also have Section B?
// 6. Delete Section A + Item A1 from company template
// 7. Read project template again → did it lose Section A?
//
// This tests whether the synced_to relationship is live or snapshot-at-copy.
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

async function del(token: string, path: string, cid: string) {
  const url = `${PROCORE_BASE}${path}${path.includes("?") ? "&" : "?"}company_id=${cid}`;
  const res = await fetch(url, { method: "DELETE", headers: { Authorization: `Bearer ${token}`, "Procore-Company-Id": cid } });
  return { ok: res.ok, status: res.status };
}

type SectionData = { name: string; items?: Array<{ name: string }> };

function summarise(template: unknown): { sections: Array<{ name: string; items: string[] }> } {
  const t = template as { sections?: SectionData[] } | null;
  return {
    sections: (t?.sections ?? []).map((s) => ({
      name: s.name,
      items: (s.items ?? []).map((i) => i.name),
    })),
  };
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

    // 1. Create company template
    const name = `[HP Test] Sync ${Date.now()}`;
    const t1 = await post(token, `/rest/v1.0/companies/${CID}/checklist/list_templates`, CID, {
      list_template: { name },
    });
    if (!t1.ok) return NextResponse.json({ error: `Create failed: ${t1.error}`, log }, { status: 502 });
    const ctId = (t1.json as { id: number }).id;
    log.push(`Company template: ${ctId} (${name})`);
    await sleep(PACE_MS);

    // 2. Add Section A + Item A1
    const s1 = await post(token, `/rest/v1.0/companies/${CID}/checklist/list_templates/${ctId}/sections`, CID, {
      section: { name: "Section A", position: 1 },
    });
    if (!s1.ok) return NextResponse.json({ error: `Section A: ${s1.error}`, log }, { status: 502 });
    const secAId = (s1.json as { id: number }).id;
    log.push(`Section A: ${secAId}`);
    await sleep(PACE_MS);

    const i1 = await post(token, `/rest/v1.0/companies/${CID}/inspection_templates/${ctId}/items`, CID, {
      inspection_template_item: { name: "Item A1", position: 1, section_id: secAId, response_set_id: rsId, type: "default" },
    });
    if (!i1.ok) return NextResponse.json({ error: `Item A1: ${i1.error}`, log }, { status: 502 });
    const itemA1Id = (i1.json as { id: number }).id;
    log.push(`Item A1: ${itemA1Id}`);
    await sleep(PACE_MS);

    // 3. Copy to project
    const c1 = await post(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/create_from_company_template`, CID, {
      source_template_id: ctId,
    });
    if (!c1.ok) return NextResponse.json({ error: `Copy: ${c1.error}`, log }, { status: 502 });
    const ptId = (c1.json as { id: number }).id;
    log.push(`Project template: ${ptId}`);
    await sleep(PACE_MS);

    // 4. Read project template — should have Section A + Item A1
    const read1 = await get(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/${ptId}`, CID);
    const snapshot1 = summarise(read1);
    log.push(`AFTER COPY — project template has: ${JSON.stringify(snapshot1)}`);
    await sleep(PACE_MS);

    // 5. Add Section B + Item B1 to COMPANY template
    const s2 = await post(token, `/rest/v1.0/companies/${CID}/checklist/list_templates/${ctId}/sections`, CID, {
      section: { name: "Section B", position: 2 },
    });
    if (!s2.ok) return NextResponse.json({ error: `Section B: ${s2.error}`, log }, { status: 502 });
    const secBId = (s2.json as { id: number }).id;
    log.push(`Section B: ${secBId}`);
    await sleep(PACE_MS);

    const i2 = await post(token, `/rest/v1.0/companies/${CID}/inspection_templates/${ctId}/items`, CID, {
      inspection_template_item: { name: "Item B1", position: 1, section_id: secBId, response_set_id: rsId, type: "default" },
    });
    if (!i2.ok) return NextResponse.json({ error: `Item B1: ${i2.error}`, log }, { status: 502 });
    log.push(`Item B1: ${(i2.json as { id: number }).id}`);
    await sleep(PACE_MS);

    // 6. Read project template again — does it now have Section B too?
    const read2 = await get(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/${ptId}`, CID);
    const snapshot2 = summarise(read2);
    log.push(`AFTER ADDING B TO COMPANY — project template has: ${JSON.stringify(snapshot2)}`);
    await sleep(PACE_MS);

    // 7. Delete Section A + Item A1 from company template
    await del(token, `/rest/v1.0/companies/${CID}/inspection_templates/${ctId}/items/${itemA1Id}`, CID);
    log.push(`Deleted item A1 from company template`);
    await sleep(PACE_MS);
    await del(token, `/rest/v1.0/companies/${CID}/checklist/sections/${secAId}`, CID);
    log.push(`Deleted section A from company template`);
    await sleep(PACE_MS);

    // 8. Read project template one more time — did it lose Section A?
    const read3 = await get(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/${ptId}`, CID);
    const snapshot3 = summarise(read3);
    log.push(`AFTER DELETING A FROM COMPANY — project template has: ${JSON.stringify(snapshot3)}`);

    return NextResponse.json({
      success: true,
      company_template_id: ctId,
      project_template_id: ptId,
      results: {
        after_copy: snapshot1,
        after_adding_B_to_company: snapshot2,
        after_deleting_A_from_company: snapshot3,
      },
      conclusion: snapshot2.sections.length > snapshot1.sections.length
        ? "SYNC IS LIVE — adding to company template propagated to project template. This approach works!"
        : "SYNC IS SNAPSHOT — project template did not change. Company edits do not propagate.",
      log,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err), log }, { status: 500 });
  }
}
