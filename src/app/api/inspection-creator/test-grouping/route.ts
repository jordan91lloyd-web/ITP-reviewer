// ─── Temporary test: does copying the same company template twice create
// two project templates that group under one heading in Procore's register?
//
// Steps:
// 1. Create company template "HP Test Grouping"
// 2. Add section "Section A" + item "Item A1"
// 3. Copy to project → project template #1
// 4. Delete items and section from company template
// 5. Add section "Section B" + item "Item B1"
// 6. Copy to project again → project template #2
// 7. Return both project template IDs and URLs
//
// DELETE this route after testing.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const maxDuration = 120;

const PROCORE_BASE = process.env.PROCORE_ENV === "production"
  ? "https://api.procore.com"
  : "https://sandbox.procore.com";

const PROCORE_WEB_HOST = "https://us02.procore.com";
const PACE_MS = 600;

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function headers(token: string, companyId: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Procore-Company-Id": companyId,
  };
}

async function post(token: string, path: string, cid: string, body: unknown) {
  const url = `${PROCORE_BASE}${path}${path.includes("?") ? "&" : "?"}company_id=${cid}`;
  const res = await fetch(url, { method: "POST", headers: headers(token, cid), body: JSON.stringify(body) });
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

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("procore_access_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const CID = "598134325535477"; // Fleek company
  const PID = "598134325555936"; // Sandbox Test Project

  const log: string[] = [];

  try {
    // Step 0: Get response set
    const rsSets = await get(token, `/rest/v1.0/companies/${CID}/checklist/item/response_sets`, CID) as Array<{ id: number; name: string; active: boolean }> | null;
    const rsId = rsSets?.find((rs) => /pass/i.test(rs.name) && rs.active)?.id ?? rsSets?.[0]?.id;
    if (!rsId) return NextResponse.json({ error: "No response sets" }, { status: 400 });
    log.push(`Response set: ${rsId}`);

    // Step 1: Create company template
    const t1 = await post(token, `/rest/v1.0/companies/${CID}/checklist/list_templates`, CID, {
      list_template: { name: "[HP Test] Grouping Experiment" },
    });
    if (!t1.ok) return NextResponse.json({ error: `Create template failed: ${t1.error}`, log }, { status: 502 });
    const companyTemplateId = (t1.json as { id: number }).id;
    log.push(`Company template: ${companyTemplateId}`);
    await sleep(PACE_MS);

    // Step 2: Add section A + item A1
    const s1 = await post(token, `/rest/v1.0/companies/${CID}/checklist/list_templates/${companyTemplateId}/sections`, CID, {
      section: { name: "Section A - First Report", position: 1 },
    });
    if (!s1.ok) return NextResponse.json({ error: `Section A failed: ${s1.error}`, log }, { status: 502 });
    const sectionAId = (s1.json as { id: number }).id;
    log.push(`Section A: ${sectionAId}`);
    await sleep(PACE_MS);

    const i1 = await post(token, `/rest/v1.0/companies/${CID}/inspection_templates/${companyTemplateId}/items`, CID, {
      inspection_template_item: { name: "Check item A1 from first report", position: 1, section_id: sectionAId, response_set_id: rsId, type: "default" },
    });
    if (!i1.ok) return NextResponse.json({ error: `Item A1 failed: ${i1.error}`, log }, { status: 502 });
    const itemA1Id = (i1.json as { id: number }).id;
    log.push(`Item A1: ${itemA1Id}`);
    await sleep(PACE_MS);

    // Step 3: Copy to project → project template #1
    const c1 = await post(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/create_from_company_template`, CID, {
      source_template_id: companyTemplateId,
    });
    if (!c1.ok) return NextResponse.json({ error: `Copy #1 failed: ${c1.error}`, log }, { status: 502 });
    const projectTemplate1 = (c1.json as { id: number }).id;
    log.push(`Project template #1: ${projectTemplate1}`);
    await sleep(PACE_MS);

    // Step 4: Clear company template — delete item, then section
    const delItem = await del(token, `/rest/v1.0/companies/${CID}/inspection_templates/${companyTemplateId}/items/${itemA1Id}`, CID);
    log.push(`Delete item A1: ${delItem.status}`);
    await sleep(PACE_MS);

    const delSection = await del(token, `/rest/v1.0/companies/${CID}/checklist/sections/${sectionAId}`, CID);
    log.push(`Delete section A: ${delSection.status}`);
    await sleep(PACE_MS);

    // Step 5: Add section B + item B1 (different content, same template)
    const s2 = await post(token, `/rest/v1.0/companies/${CID}/checklist/list_templates/${companyTemplateId}/sections`, CID, {
      section: { name: "Section B - Second Report", position: 1 },
    });
    if (!s2.ok) return NextResponse.json({ error: `Section B failed: ${s2.error}`, log }, { status: 502 });
    const sectionBId = (s2.json as { id: number }).id;
    log.push(`Section B: ${sectionBId}`);
    await sleep(PACE_MS);

    const i2 = await post(token, `/rest/v1.0/companies/${CID}/inspection_templates/${companyTemplateId}/items`, CID, {
      inspection_template_item: { name: "Check item B1 from second report", position: 1, section_id: sectionBId, response_set_id: rsId, type: "default" },
    });
    if (!i2.ok) return NextResponse.json({ error: `Item B1 failed: ${i2.error}`, log }, { status: 502 });
    log.push(`Item B1: ${(i2.json as { id: number }).id}`);
    await sleep(PACE_MS);

    // Step 6: Copy to project again → project template #2
    const c2 = await post(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/create_from_company_template`, CID, {
      source_template_id: companyTemplateId,
    });
    if (!c2.ok) return NextResponse.json({ error: `Copy #2 failed: ${c2.error}`, log }, { status: 502 });
    const projectTemplate2 = (c2.json as { id: number }).id;
    log.push(`Project template #2: ${projectTemplate2}`);

    // Step 7: Read back both project templates to confirm different content
    const pt1 = await get(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/${projectTemplate1}`, CID);
    const pt2 = await get(token, `/rest/v1.0/projects/${PID}/checklist/list_templates/${projectTemplate2}`, CID);

    const pt1Sections = (pt1 as { sections?: Array<{ name: string; items?: Array<{ name: string }> }> })?.sections ?? [];
    const pt2Sections = (pt2 as { sections?: Array<{ name: string; items?: Array<{ name: string }> }> })?.sections ?? [];

    return NextResponse.json({
      success: true,
      company_template_id: companyTemplateId,
      project_template_1: {
        id: projectTemplate1,
        url: `${PROCORE_WEB_HOST}/${PID}/project/checklists/list_templates/${projectTemplate1}`,
        sections: pt1Sections.map((s) => ({ name: s.name, items: s.items?.map((i) => i.name) })),
      },
      project_template_2: {
        id: projectTemplate2,
        url: `${PROCORE_WEB_HOST}/${PID}/project/checklists/list_templates/${projectTemplate2}`,
        sections: pt2Sections.map((s) => ({ name: s.name, items: s.items?.map((i) => i.name) })),
      },
      log,
      next_step: "Go to the Sandbox project inspections register in Procore. Create one inspection from each template. Check if they appear under one heading or two.",
    });
  } catch (err) {
    return NextResponse.json({ error: String(err), log }, { status: 500 });
  }
}
