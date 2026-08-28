// ─── GET /api/bulk-itp/action-plans?project_id=X&company_id=Y ────────────────
// The Action Plans ("trackers") on a project, for the builder's plan picker.

import { NextRequest, NextResponse } from "next/server";
import { getActionPlans } from "@/lib/procore";
import { resolveContext, procoreFailure } from "../_shared";

export interface BuilderActionPlan {
  id: number;
  /** Procore calls this `title`. Exposed as `title` here to avoid confusion. */
  title: string;
  number: number | null;
  status: string | null;
  plan_type: string | null;
  location: string | null;
  manager: string | null;
  total_item_count: number | null;
  closed_item_count: number | null;
  updated_at: string | null;
}

export async function GET(request: NextRequest) {
  const resolved = await resolveContext(request);
  if ("error" in resolved) return resolved.error;
  const { accessToken, projectId, companyId } = resolved.ctx;

  let plans;
  try {
    plans = await getActionPlans(accessToken, projectId, companyId);
  } catch (err) {
    return procoreFailure("action-plans", err);
  }

  const result: BuilderActionPlan[] = plans
    .map((p) => ({
      id: p.id,
      title: p.title,
      number: p.number ?? null,
      status: p.status ?? null,
      plan_type: p.plan_type?.name ?? null,
      location: p.location?.name ?? null,
      manager: p.manager?.name ?? null,
      total_item_count: p.total_item_count ?? null,
      closed_item_count: p.closed_item_count ?? null,
      updated_at: p.updated_at ?? null,
    }))
    .sort((a, b) => (a.number ?? Number.MAX_SAFE_INTEGER) - (b.number ?? Number.MAX_SAFE_INTEGER));

  console.log(`[bulk-itp/action-plans] project=${projectId}: ${result.length} plans`);

  return NextResponse.json({ project_id: projectId, count: result.length, plans: result });
}
