// ─── POST /api/action-plan/upload ─────────────────────────────────────────
// Uploads a ConvertedActionPlan into Procore as an Action Plan with sections
// and items. Sequential, deterministic ordering. Stops on first failure.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { ConvertedActionPlan } from "@/lib/actionPlanTypes";

export const maxDuration = 60;

const PROCORE_ENV = process.env.PROCORE_ENV ?? "sandbox";
const PROCORE_BASE_URL =
  process.env.PROCORE_API_BASE_URL ??
  (PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com");

// Procore web UI host — may differ for other regions (e.g. eu01.procore.com)
const PROCORE_WEB_HOST = "https://us02.procore.com";

function headers(accessToken: string, companyId: string): Record<string, string> {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "Procore-Company-Id": companyId,
  };
}

function urlWithCompany(path: string, companyId: string): string {
  const url = new URL(`${PROCORE_BASE_URL}${path}`);
  url.searchParams.set("company_id", companyId);
  return url.toString();
}

async function procorePost(
  accessToken: string,
  path: string,
  companyId: string,
  body: unknown,
): Promise<{ ok: boolean; status: number; json: unknown; error: string | null }> {
  const res = await fetch(urlWithCompany(path, companyId), {
    method: "POST",
    headers: headers(accessToken, companyId),
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json: unknown = null;
  try { json = JSON.parse(text); } catch { /* not JSON */ }
  if (!res.ok) {
    return { ok: false, status: res.status, json, error: text.slice(0, 1000) };
  }
  return { ok: true, status: res.status, json, error: null };
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ success: false, error: "Not authenticated with Procore." }, { status: 401 });
  }

  let body: {
    plan: ConvertedActionPlan;
    project_id: number;
    company_id: number;
    plan_type_id: number;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const { plan, project_id, company_id, plan_type_id } = body;
  if (!plan || !project_id || !company_id || !plan_type_id) {
    return NextResponse.json(
      { success: false, error: "Missing required fields: plan, project_id, company_id, plan_type_id." },
      { status: 400 }
    );
  }

  const companyId = String(company_id);
  let createdPlanId: number | null = null;
  let sectionsCreated = 0;
  let itemsCreated = 0;

  // ── Step 1: Create the plan ────────────────────────────────────────────────
  const planRes = await procorePost(
    accessToken,
    `/rest/v1.0/projects/${project_id}/action_plans/plans`,
    companyId,
    {
      plan: {
        title: plan.action_plan_name,
        description: plan.description,
        plan_type_id,
      },
    },
  );

  if (!planRes.ok) {
    return NextResponse.json({
      success: false,
      error: `Failed to create plan: ${planRes.error}`,
      created_plan_id: null,
      sections_created: 0,
      items_created: 0,
    });
  }

  createdPlanId = (planRes.json as Record<string, unknown>)?.id as number;
  if (!createdPlanId) {
    return NextResponse.json({
      success: false,
      error: "Plan was created but no id was returned.",
      created_plan_id: null,
      sections_created: 0,
      items_created: 0,
    });
  }

  // ── Step 2: Collect distinct sections in order ─────────────────────────────
  const sectionOrder: string[] = [];
  for (const a of plan.activities) {
    if (!sectionOrder.includes(a.section)) {
      sectionOrder.push(a.section);
    }
  }

  const sectionIdMap: Record<string, number> = {};

  for (let si = 0; si < sectionOrder.length; si++) {
    const sectionTitle = sectionOrder[si];
    const sectionRes = await procorePost(
      accessToken,
      `/rest/v1.0/projects/${project_id}/action_plans/plan_sections`,
      companyId,
      {
        plan_section: {
          plan_id: createdPlanId,
          title: sectionTitle,
          position: si + 1,
        },
      },
    );

    if (!sectionRes.ok) {
      return NextResponse.json({
        success: false,
        error: `Failed to create section "${sectionTitle}": ${sectionRes.error}`,
        created_plan_id: createdPlanId,
        sections_created: sectionsCreated,
        items_created: itemsCreated,
      });
    }

    const sectionId = (sectionRes.json as Record<string, unknown>)?.id as number;
    if (!sectionId) {
      return NextResponse.json({
        success: false,
        error: `Section "${sectionTitle}" was created but no id was returned.`,
        created_plan_id: createdPlanId,
        sections_created: sectionsCreated,
        items_created: itemsCreated,
      });
    }

    sectionIdMap[sectionTitle] = sectionId;
    sectionsCreated++;
  }

  // ── Step 3: Create items per section ───────────────────────────────────────
  for (const sectionTitle of sectionOrder) {
    const sectionId = sectionIdMap[sectionTitle];
    const sectionActivities = plan.activities.filter((a) => a.section === sectionTitle);

    for (let ai = 0; ai < sectionActivities.length; ai++) {
      const a = sectionActivities[ai];

      // Build description from acceptance_criteria + source_reference
      let description: string | undefined;
      if (a.acceptance_criteria && a.source_reference) {
        description = `${a.acceptance_criteria}\n\n${a.source_reference}`;
      } else if (a.acceptance_criteria) {
        description = a.acceptance_criteria;
      } else if (a.source_reference) {
        description = a.source_reference;
      }

      const itemBody: Record<string, unknown> = {
        plan_id: createdPlanId,
        plan_section_id: sectionId,
        title: a.activity_title,
        position: ai + 1,
      };
      if (description) {
        itemBody.description = description;
      }

      const itemRes = await procorePost(
        accessToken,
        `/rest/v1.0/projects/${project_id}/action_plans/plan_items`,
        companyId,
        { plan_item: itemBody },
      );

      if (!itemRes.ok) {
        return NextResponse.json({
          success: false,
          error: `Failed to create item "${a.activity_title}": ${itemRes.error}`,
          created_plan_id: createdPlanId,
          sections_created: sectionsCreated,
          items_created: itemsCreated,
        });
      }

      itemsCreated++;
    }
  }

  // ── Success ────────────────────────────────────────────────────────────────
  const planUrl = `${PROCORE_WEB_HOST}/webclients/host/companies/${company_id}/projects/${project_id}/tools/actionplans/plans/${createdPlanId}`;

  return NextResponse.json({
    success: true,
    plan_id: createdPlanId,
    plan_url: planUrl,
    sections_created: sectionsCreated,
    items_created: itemsCreated,
  });
}
