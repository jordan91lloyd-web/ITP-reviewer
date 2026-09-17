// ─── POST /api/inspection-creator/upload ──────────────────────────────────
// Persistent company template flow:
// 1. Find or create [HP] {category} company template
// 2. Clear existing items/sections on it
// 3. Add new sections and items from the converted inspection
// 4. Find or create project template (copy from company)
// 5. PATCH project template description
// Sequential with 600ms pacing. Returns project template ID and URL.
// NEVER deletes company templates.

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
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const url = `${PROCORE_BASE}${path}${path.includes("?") ? "&" : "?"}company_id=${companyId}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, "Procore-Company-Id": companyId },
    });
    if (res.status === 429 && attempt < MAX_RETRIES) {
      const backoff = PACE_MS * Math.pow(2, attempt + 1);
      console.warn(`[inspection-creator/upload] 429 on GET ${path}, retry in ${backoff}ms`);
      await sleep(backoff);
      continue;
    }
    if (!res.ok) return null;
    return res.json();
  }
  return null;
}

async function procoreDelete(
  token: string,
  path: string,
  companyId: string,
): Promise<{ ok: boolean; status: number }> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const url = `${PROCORE_BASE}${path}${path.includes("?") ? "&" : "?"}company_id=${companyId}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`, "Procore-Company-Id": companyId },
    });
    if (res.status === 429 && attempt < MAX_RETRIES) {
      const backoff = PACE_MS * Math.pow(2, attempt + 1);
      await sleep(backoff);
      continue;
    }
    return { ok: res.ok, status: res.status };
  }
  return { ok: false, status: 429 };
}

async function procorePatch(
  token: string,
  path: string,
  companyId: string,
  body: unknown,
): Promise<{ ok: boolean; status: number; json: unknown; error: string | null }> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const url = `${PROCORE_BASE}${path}${path.includes("?") ? "&" : "?"}company_id=${companyId}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: jsonHeaders(token, companyId),
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let json: unknown = null;
    try { json = JSON.parse(text); } catch { /* not JSON */ }

    if (res.status === 429 && attempt < MAX_RETRIES) {
      const backoff = PACE_MS * Math.pow(2, attempt + 1);
      console.warn(`[inspection-creator/upload] 429 on PATCH ${path}, retry in ${backoff}ms`);
      await sleep(backoff);
      continue;
    }
    if (!res.ok) return { ok: false, status: res.status, json, error: text.slice(0, 1000) };
    return { ok: true, status: res.status, json, error: null };
  }
  return { ok: false, status: 429, json: null, error: "Rate limited after retries" };
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("procore_access_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let payload: {
    inspection: ConvertedInspection;
    project_id: number;
    company_id: number;
    category: string;
    report_description: string;
  };

  try {
    const formData = await request.formData();
    const raw = formData.get("payload") as string;
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { inspection, project_id, company_id, category, report_description } = payload;
  const cid = String(company_id);
  const pid = String(project_id);
  const templateName = `[HP] ${category}`;

  // Collect distinct sections in order
  const sectionNames: string[] = [];
  for (const item of inspection.items) {
    if (!sectionNames.includes(item.section)) sectionNames.push(item.section);
  }

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

    // ── Step 0b: Lookup inspection type "Quality" ─────────────────────
    let inspectionTypeId: number | null = null;
    try {
      const typesData = await procoreGet(
        token,
        `/rest/v1.0/companies/${cid}/checklist/list_templates/inspection_types`,
        cid,
      ) as Array<{ id: number; name: string }> | null;
      if (Array.isArray(typesData)) {
        const qualityType = typesData.find((t) => t.name.toLowerCase() === "quality");
        if (qualityType) {
          inspectionTypeId = qualityType.id;
          console.log(`[inspection-creator] Found Quality inspection_type_id=${inspectionTypeId}`);
        } else {
          console.log(`[inspection-creator] No "Quality" inspection type found among ${typesData.length} types`);
        }
      }
    } catch (e) {
      console.warn(`[inspection-creator] Failed to fetch inspection types: ${e}`);
    }
    await sleep(PACE_MS);

    // ── Step 0c: Lookup trade for company template ──────────────────
    let tradeId: number | null = null;
    const suggestedTrade = inspection.suggested_trade;
    if (suggestedTrade) {
      try {
        const tradesData = await procoreGet(
          token,
          `/rest/v1.0/companies/${cid}/trades`,
          cid,
        ) as Array<{ id: number; name: string }> | null;
        if (Array.isArray(tradesData)) {
          const normalised = suggestedTrade.toLowerCase();
          // Exact match first, then partial (contains)
          const exactMatch = tradesData.find((t) => t.name.toLowerCase() === normalised);
          const partialMatch = !exactMatch
            ? tradesData.find((t) => t.name.toLowerCase().includes(normalised) || normalised.includes(t.name.toLowerCase()))
            : null;
          const match = exactMatch ?? partialMatch;
          if (match) {
            tradeId = match.id;
            console.log(`[inspection-creator] Matched trade "${suggestedTrade}" -> "${match.name}" (id=${tradeId})`);
          } else {
            console.log(`[inspection-creator] No trade match for "${suggestedTrade}" among ${tradesData.length} trades`);
          }
        }
      } catch (e) {
        console.warn(`[inspection-creator] Failed to fetch trades: ${e}`);
      }
      await sleep(PACE_MS);
    }

    // ── Step 1: Find or create company template ──────────────────────
    let companyTemplateId: number | null = null;

    const searchData = await procoreGet(
      token,
      `/rest/v1.0/companies/${cid}/checklist/list_templates?filters[query]=${encodeURIComponent(templateName)}`,
      cid,
    ) as Array<{ id: number; name: string }> | null;

    if (Array.isArray(searchData)) {
      // Exact name match only
      const exact = searchData.find((t) => t.name === templateName);
      if (exact) {
        companyTemplateId = exact.id;
        console.log(`[inspection-creator] Found existing company template: ${companyTemplateId} ("${templateName}")`);
      }
    }

    // Build the template fields (name + optional type + optional trade)
    const templateFields: Record<string, unknown> = { name: templateName };
    if (inspectionTypeId) templateFields.inspection_type_id = inspectionTypeId;
    if (tradeId) templateFields.trade_id = tradeId;

    if (!companyTemplateId) {
      const createRes = await procorePost(token, `/rest/v1.0/companies/${cid}/checklist/list_templates`, cid, {
        list_template: templateFields,
      });
      if (!createRes.ok) {
        const is403 = createRes.status === 403;
        return NextResponse.json({
          error: is403
            ? "You don't have permission to create inspection templates. Ask your Procore admin to set your Inspections permission to 'Admin' at the company level."
            : `Failed to create company template: ${createRes.error}`,
        }, { status: is403 ? 403 : 502 });
      }
      companyTemplateId = (createRes.json as { id: number }).id;
      console.log(`[inspection-creator] Created company template: ${companyTemplateId} ("${templateName}")`);
      await sleep(PACE_MS);
    } else {
      // PATCH existing company template with inspection type and trade if available
      const patchFields: Record<string, unknown> = {};
      if (inspectionTypeId) patchFields.inspection_type_id = inspectionTypeId;
      if (tradeId) patchFields.trade_id = tradeId;
      if (Object.keys(patchFields).length > 0) {
        const patchRes = await procorePatch(
          token,
          `/rest/v1.0/companies/${cid}/checklist/list_templates/${companyTemplateId}`,
          cid,
          { list_template: patchFields },
        );
        if (patchRes.ok) {
          console.log(`[inspection-creator] Updated company template with inspection_type_id=${inspectionTypeId}, trade_id=${tradeId}`);
        } else {
          console.warn(`[inspection-creator] Failed to PATCH company template: ${patchRes.error}`);
        }
        await sleep(PACE_MS);
      }
    }

    // ── Step 2: Clear existing items, then sections ──────────────────
    // Get existing items
    const existingItems = await procoreGet(
      token,
      `/rest/v1.0/companies/${cid}/inspection_templates/${companyTemplateId}/items`,
      cid,
    ) as Array<{ id: number }> | null;

    if (Array.isArray(existingItems) && existingItems.length > 0) {
      console.log(`[inspection-creator] Deleting ${existingItems.length} existing items`);
      for (const item of existingItems) {
        await procoreDelete(token, `/rest/v1.0/companies/${cid}/inspection_templates/${companyTemplateId}/items/${item.id}`, cid);
        await sleep(PACE_MS);
      }
    }

    // Get existing sections
    const existingSections = await procoreGet(
      token,
      `/rest/v1.0/companies/${cid}/checklist/list_templates/${companyTemplateId}/sections`,
      cid,
    ) as Array<{ id: number }> | null;

    if (Array.isArray(existingSections) && existingSections.length > 0) {
      console.log(`[inspection-creator] Deleting ${existingSections.length} existing sections`);
      for (const section of existingSections) {
        await procoreDelete(token, `/rest/v1.0/companies/${cid}/checklist/list_templates/${companyTemplateId}/sections/${section.id}`, cid);
        await sleep(PACE_MS);
      }
    }

    // ── Step 3: Create new sections ──────────────────────────────────
    const sectionIdMap = new Map<string, number>();

    for (let si = 0; si < sectionNames.length; si++) {
      const step = await procorePost(
        token,
        `/rest/v1.0/companies/${cid}/checklist/list_templates/${companyTemplateId}/sections`,
        cid,
        { section: { name: sectionNames[si], position: si + 1 } },
      );
      if (!step.ok) {
        return NextResponse.json({
          error: `Failed to create section "${sectionNames[si]}": ${step.error}`,
        }, { status: 502 });
      }
      sectionIdMap.set(sectionNames[si], (step.json as { id: number }).id);
      console.log(`[inspection-creator] Section "${sectionNames[si]}" -> ${sectionIdMap.get(sectionNames[si])}`);
      await sleep(PACE_MS);
    }

    // ── Step 4: Create items ─────────────────────────────────────────
    let itemsCreated = 0;
    const itemsFailed: string[] = [];
    const sectionPositions = new Map<string, number>();

    for (const item of inspection.items) {
      const sectionId = sectionIdMap.get(item.section);
      if (!sectionId) {
        itemsFailed.push(`"${item.item_name}" -- section "${item.section}" not found`);
        continue;
      }

      const pos = (sectionPositions.get(item.section) ?? 0) + 1;
      sectionPositions.set(item.section, pos);

      const step = await procorePost(
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
      if (!step.ok) {
        console.warn(`[inspection-creator] Failed to create item "${item.item_name}": ${step.error}`);
        itemsFailed.push(`"${item.item_name}" -- ${step.status}: ${(step.error ?? "").slice(0, 200)}`);
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
        sections_created: sectionIdMap.size,
      }, { status: 502 });
    }

    // ── Step 5: Find or create project template ──────────────────────
    let projectTemplateId: number | null = null;

    // Check for existing project template synced from this company template
    const projectTemplates = await procoreGet(
      token,
      `/rest/v1.1/projects/${pid}/checklist/list_templates`,
      cid,
    ) as Array<{ id: number; name: string; synced_to?: { list_template_id?: number } }> | null;

    if (Array.isArray(projectTemplates)) {
      // Match by synced_to.list_template_id first, then by name
      const syncedMatch = projectTemplates.find(
        (t) => t.synced_to?.list_template_id === companyTemplateId,
      );
      if (syncedMatch) {
        projectTemplateId = syncedMatch.id;
        console.log(`[inspection-creator] Found synced project template: ${projectTemplateId}`);
      } else {
        const nameMatch = projectTemplates.find((t) => t.name === templateName);
        if (nameMatch) {
          projectTemplateId = nameMatch.id;
          console.log(`[inspection-creator] Found project template by name: ${projectTemplateId}`);
        }
      }
    }

    if (!projectTemplateId) {
      // Copy company template to project
      const copyRes = await procorePost(
        token,
        `/rest/v1.0/projects/${pid}/checklist/list_templates/create_from_company_template`,
        cid,
        { source_template_id: companyTemplateId },
      );
      if (!copyRes.ok) {
        return NextResponse.json({
          error: `Failed to copy template to project: ${copyRes.error}`,
          sections_created: sectionIdMap.size,
          items_created: itemsCreated,
        }, { status: 502 });
      }
      projectTemplateId = (copyRes.json as { id: number }).id;
      console.log(`[inspection-creator] Project template created: ${projectTemplateId}`);
      await sleep(PACE_MS);
    }

    // ── Step 6: PATCH project template description ───────────────────
    if (report_description) {
      const patchRes = await procorePatch(
        token,
        `/rest/v1.0/projects/${pid}/checklist/list_templates/${projectTemplateId}`,
        cid,
        { list_template: { description: report_description } },
      );
      if (patchRes.ok) {
        console.log(`[inspection-creator] Project template description set: "${report_description}"`);
      } else {
        console.warn(`[inspection-creator] Failed to set description: ${patchRes.error}`);
        // Non-fatal — continue
      }
      await sleep(PACE_MS);
    }

    // ── Build template URL ───────────────────────────────────────────
    const templateUrl = `${PROCORE_WEB_HOST}/webclients/host/companies/${cid}/projects/${pid}/tools/inspections/list_templates/${projectTemplateId}`;

    return NextResponse.json({
      success: true,
      project_template_id: projectTemplateId,
      template_url: templateUrl,
      template_name: templateName,
      category,
      report_description,
      sections_created: sectionIdMap.size,
      items_created: itemsCreated,
      items_total: inspection.items.length,
      items_failed: itemsFailed.length,
      failed_items: itemsFailed.length > 0 ? itemsFailed : undefined,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[inspection-creator/upload] Error: ${msg}`);

    return NextResponse.json({
      error: msg,
    }, { status: 500 });
  }
}
