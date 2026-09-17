// ─── POST /api/inspection-creator/upload ──────────────────────────────────
// Creates a Procore project-level inspection template from a ConvertedInspection:
// 1. Create company template
// 2. Add sections
// 3. Add items
// 4. Copy to project level
// 5. Delete company template (best effort cleanup)
// Sequential with 600ms pacing. Returns project template ID and URL.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { ConvertedInspection } from "@/lib/inspectionCreatorTypes";

export const maxDuration = 300;

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const PROCORE_WEB_HOST = "https://us02.procore.com";
const PACE_MS = 600;
const MAX_RETRIES = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function jsonHeaders(token: string, companyId: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Procore-Company-Id": companyId,
  };
}

async function procorePost(
  token: string,
  path: string,
  companyId: string,
  body: unknown,
): Promise<{ ok: boolean; status: number; json: unknown; error: string | null }> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const url = `${PROCORE_BASE}${path}${path.includes("?") ? "&" : "?"}company_id=${companyId}`;
    const res = await fetch(url, {
      method: "POST",
      headers: jsonHeaders(token, companyId),
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let json: unknown = null;
    try { json = JSON.parse(text); } catch { /* not JSON */ }

    if (res.status === 429 && attempt < MAX_RETRIES) {
      const backoff = PACE_MS * Math.pow(2, attempt + 1);
      console.warn(`[inspection-creator/upload] 429 on ${path}, retry in ${backoff}ms`);
      await sleep(backoff);
      continue;
    }
    if (!res.ok) return { ok: false, status: res.status, json, error: text.slice(0, 1000) };
    return { ok: true, status: res.status, json, error: null };
  }
  return { ok: false, status: 429, json: null, error: "Rate limited after retries" };
}

async function procoreGet(
  token: string,
  path: string,
  companyId: string,
): Promise<unknown> {
  const url = `${PROCORE_BASE}${path}${path.includes("?") ? "&" : "?"}company_id=${companyId}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, "Procore-Company-Id": companyId },
  });
  if (!res.ok) return null;
  return res.json();
}

async function procoreDelete(
  token: string,
  path: string,
  companyId: string,
): Promise<void> {
  const url = `${PROCORE_BASE}${path}${path.includes("?") ? "&" : "?"}company_id=${companyId}`;
  try {
    await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`, "Procore-Company-Id": companyId },
    });
  } catch { /* best effort */ }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("procore_access_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let payload: {
    inspection: ConvertedInspection;
    project_id: number;
    company_id: number;
  };

  try {
    const formData = await request.formData();
    const raw = formData.get("payload") as string;
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { inspection, project_id, company_id } = payload;
  const cid = String(company_id);
  const pid = String(project_id);

  // Collect distinct sections in order
  const sectionNames: string[] = [];
  for (const item of inspection.items) {
    if (!sectionNames.includes(item.section)) sectionNames.push(item.section);
  }

  let companyTemplateId: number | null = null;
  let projectTemplateId: number | null = null;

  try {
    // ── Step 0: Get default response set ──────────────────────────────
    const rsData = await procoreGet(token, `/rest/v1.0/companies/${cid}/checklist/item/response_sets`, cid) as Array<{ id: number; name: string; active: boolean }> | null;
    let responseSetId: number | null = null;
    if (Array.isArray(rsData) && rsData.length > 0) {
      const passFail = rsData.find((rs) => /pass/i.test(rs.name) && rs.active);
      responseSetId = passFail?.id ?? rsData.find((rs) => rs.active)?.id ?? rsData[0].id;
    }
    if (!responseSetId) {
      return NextResponse.json({ error: "No response sets found for this company. Configure Pass/Fail in Procore first." }, { status: 400 });
    }
    console.log(`[inspection-creator] Using response_set_id=${responseSetId}`);

    // ── Step 1: Create company template ──────────────────────────────
    const templateName = `[HP] ${inspection.template_name}`;

    const step1 = await procorePost(token, `/rest/v1.0/companies/${cid}/checklist/list_templates`, cid, {
      list_template: { name: templateName },
    });
    if (!step1.ok) {
      const is403 = step1.status === 403;
      return NextResponse.json({
        error: is403
          ? "You don't have permission to create inspection templates. Ask your Procore admin to set your Inspections permission to 'Admin' at the company level (Company Settings → Permission Templates). This is required because the Procore API only allows template sections and items to be created at the company level before copying to the project."
          : `Failed to create template: ${step1.error}`,
      }, { status: is403 ? 403 : 502 });
    }
    companyTemplateId = (step1.json as { id: number }).id;
    console.log(`[inspection-creator] Company template created: ${companyTemplateId}`);
    await sleep(PACE_MS);

    // ── Step 2: Create sections ──────────────────────────────────────
    const sectionIdMap = new Map<string, number>();

    for (let si = 0; si < sectionNames.length; si++) {
      const step2 = await procorePost(
        token,
        `/rest/v1.0/companies/${cid}/checklist/list_templates/${companyTemplateId}/sections`,
        cid,
        { section: { name: sectionNames[si], position: si + 1 } },
      );
      if (!step2.ok) {
        return NextResponse.json({
          error: `Failed to create section "${sectionNames[si]}": ${step2.error}`,
          company_template_id: companyTemplateId,
        }, { status: 502 });
      }
      sectionIdMap.set(sectionNames[si], (step2.json as { id: number }).id);
      console.log(`[inspection-creator] Section "${sectionNames[si]}" → ${sectionIdMap.get(sectionNames[si])}`);
      await sleep(PACE_MS);
    }

    // ── Step 3: Create items ─────────────────────────────────────────
    let itemsCreated = 0;
    const itemsFailed: string[] = [];
    // Track position per section
    const sectionPositions = new Map<string, number>();

    for (const item of inspection.items) {
      const sectionId = sectionIdMap.get(item.section);
      if (!sectionId) {
        itemsFailed.push(`"${item.item_name}" — section "${item.section}" not found`);
        continue;
      }

      const pos = (sectionPositions.get(item.section) ?? 0) + 1;
      sectionPositions.set(item.section, pos);

      const step3 = await procorePost(
        token,
        `/rest/v1.0/companies/${cid}/inspection_templates/${companyTemplateId}/items`,
        cid,
        {
          inspection_template_item: {
            name: item.item_name,
            position: pos,
            section_id: sectionId,
            response_set_id: responseSetId,
            type: "default",
          },
        },
      );
      if (!step3.ok) {
        console.warn(`[inspection-creator] Failed to create item "${item.item_name}": ${step3.error}`);
        itemsFailed.push(`"${item.item_name}" — ${step3.status}: ${(step3.error ?? "").slice(0, 200)}`);
        // Continue creating remaining items rather than aborting
        await sleep(PACE_MS);
        continue;
      }
      itemsCreated++;
      await sleep(PACE_MS);
    }
    console.log(`[inspection-creator] ${itemsCreated} items created, ${itemsFailed.length} failed`);

    if (itemsCreated === 0) {
      return NextResponse.json({
        error: `All ${inspection.items.length} items failed to create. First failure: ${itemsFailed[0]}`,
        company_template_id: companyTemplateId,
        sections_created: sectionIdMap.size,
      }, { status: 502 });
    }

    // ── Step 4: Copy to project level ────────────────────────────────
    const step4 = await procorePost(
      token,
      `/rest/v1.0/projects/${pid}/checklist/list_templates/create_from_company_template`,
      cid,
      { source_template_id: companyTemplateId },
    );
    if (!step4.ok) {
      return NextResponse.json({
        error: `Failed to copy template to project: ${step4.error}`,
        company_template_id: companyTemplateId,
        sections_created: sectionIdMap.size,
        items_created: itemsCreated,
      }, { status: 502 });
    }
    projectTemplateId = (step4.json as { id: number }).id;
    console.log(`[inspection-creator] Project template created: ${projectTemplateId}`);
    await sleep(PACE_MS);

    // ── Step 5: Delete company template (best effort cleanup) ────────
    console.log(`[inspection-creator] Cleaning up company template ${companyTemplateId}`);
    await procoreDelete(token, `/rest/v1.0/companies/${cid}/checklist/list_templates/${companyTemplateId}`, cid);

    const templateUrl = `${PROCORE_WEB_HOST}/${pid}/project/checklists/list_templates/${projectTemplateId}`;

    return NextResponse.json({
      success: true,
      project_template_id: projectTemplateId,
      template_url: templateUrl,
      template_name: templateName,
      sections_created: sectionIdMap.size,
      items_created: itemsCreated,
      items_total: inspection.items.length,
      items_failed: itemsFailed.length,
      failed_items: itemsFailed.length > 0 ? itemsFailed : undefined,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[inspection-creator/upload] Error: ${msg}`);

    // Best-effort cleanup of company template on failure
    if (companyTemplateId) {
      console.log(`[inspection-creator] Cleaning up company template ${companyTemplateId}`);
      await procoreDelete(token, `/rest/v1.0/companies/${cid}/checklist/list_templates/${companyTemplateId}`, cid);
    }

    return NextResponse.json({
      error: msg,
      company_template_id: companyTemplateId,
      project_template_id: projectTemplateId,
    }, { status: 500 });
  }
}
