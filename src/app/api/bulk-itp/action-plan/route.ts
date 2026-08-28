// ─── GET /api/bulk-itp/action-plan?project_id=X&plan_id=Z&company_id=Y ───────
// One Action Plan, assembled: sections, their items, and what is already
// linked to each item.
//
// This is what the builder's pairing step reads. Each item reports:
//   • requests — "an inspection of template T is required here"
//   • records  — "inspection N satisfies that request"
//
// Items that already carry a record for a given template do not need building
// again, which is what makes the builder safe to re-run on a partly done plan.

import { NextRequest, NextResponse } from "next/server";
import {
  getActionPlanSections,
  getActionPlanItems,
  getTestRecordRequests,
  getTestRecords,
} from "@/lib/procore";
import { resolveContext, numberParam, procoreFailure } from "../_shared";

export interface BuilderPlanItem {
  id: number;
  title: string;
  description: string | null;
  position: number | null;
  status: string | null;
  /** Template ids already requested against this item. */
  requested_template_ids: number[];
  /** Inspection ids already linked to this item. */
  linked_checklist_ids: number[];
  /** Request rows, kept so the builder can reuse an existing request id. */
  requests: Array<{ id: number; checklist_template_id: number | null; records_count: number }>;
}

export interface BuilderPlanSection {
  id: number;
  title: string | null;
  position: number | null;
  items: BuilderPlanItem[];
}

export async function GET(request: NextRequest) {
  const resolved = await resolveContext(request);
  if ("error" in resolved) return resolved.error;
  const { accessToken, projectId, companyId } = resolved.ctx;

  const planId = numberParam(request, "plan_id");
  if (planId === null) {
    return NextResponse.json({ error: "plan_id query parameter is required." }, { status: 400 });
  }

  let sections, items, requests, records;
  try {
    // Sequential rather than parallel — Procore rate-limits hard on this
    // project and the report tab already learned that lesson (429s at
    // concurrency 3). Four calls is cheap enough to keep serial.
    sections = await getActionPlanSections(accessToken, projectId, planId, companyId);
    items    = await getActionPlanItems(accessToken, projectId, planId, companyId);
    requests = await getTestRecordRequests(accessToken, projectId, planId, companyId);
    records  = await getTestRecords(accessToken, projectId, planId, companyId);
  } catch (err) {
    return procoreFailure("action-plan", err);
  }

  const requestsByItem = new Map<number, typeof requests>();
  for (const r of requests) {
    const list = requestsByItem.get(r.plan_item_id) ?? [];
    list.push(r);
    requestsByItem.set(r.plan_item_id, list);
  }

  const recordsByItem = new Map<number, typeof records>();
  for (const r of records) {
    const list = recordsByItem.get(r.plan_item_id) ?? [];
    list.push(r);
    recordsByItem.set(r.plan_item_id, list);
  }

  const itemsBySection = new Map<number, BuilderPlanItem[]>();
  for (const item of items) {
    const itemRequests = requestsByItem.get(item.id) ?? [];
    const itemRecords  = recordsByItem.get(item.id) ?? [];

    const built: BuilderPlanItem = {
      id: item.id,
      title: item.title,
      description: item.description ?? null,
      position: item.position ?? null,
      status: item.status?.name ?? null,
      requested_template_ids: itemRequests
        .map((r) => r.payload?.checklist_template_id)
        .filter((id): id is number => typeof id === "number"),
      linked_checklist_ids: itemRecords
        .map((r) => r.payload?.checklist_id)
        .filter((id): id is number => typeof id === "number"),
      requests: itemRequests.map((r) => ({
        id: r.id,
        checklist_template_id: r.payload?.checklist_template_id ?? null,
        records_count: r.plan_test_records_count ?? 0,
      })),
    };

    const list = itemsBySection.get(item.plan_section_id) ?? [];
    list.push(built);
    itemsBySection.set(item.plan_section_id, list);
  }

  const byPosition = <T extends { position: number | null }>(a: T, b: T) =>
    (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER);

  const result: BuilderPlanSection[] = sections
    .map((s) => ({
      id: s.id,
      title: s.title ?? null,
      position: s.position ?? null,
      items: (itemsBySection.get(s.id) ?? []).sort(byPosition),
    }))
    .sort(byPosition);

  const linkedCount = records.length;
  console.log(
    `[bulk-itp/action-plan] project=${projectId} plan=${planId}: ` +
    `${result.length} sections, ${items.length} items, ` +
    `${requests.length} requests, ${linkedCount} linked inspections`
  );

  return NextResponse.json({
    project_id: projectId,
    plan_id: planId,
    section_count: result.length,
    item_count: items.length,
    request_count: requests.length,
    linked_count: linkedCount,
    sections: result,
  });
}
