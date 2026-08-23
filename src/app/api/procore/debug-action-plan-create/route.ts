// ─── GET /api/procore/debug-action-plan-create ────────────────────────────────
// Guarded write spike. Creates ONE test Action Plan in Procore to discover the
// correct API shape (wrappers, required fields, sections, items).
//
// Usage (browser, while logged in):
//   /api/procore/debug-action-plan-create?project_id=X&company_id=Y&confirm=CREATE
//   /api/procore/debug-action-plan-create?project_id=X&company_id=Y&plan_id=Z&confirm=CREATE
//
// If plan_id is supplied, step 3 (create plan) is skipped and steps 4/5 use that id.
// The confirm=CREATE guard is mandatory — without it no Procore requests are made.
// Leaves the test plan in place for manual inspection in the Procore UI.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROCORE_ENV = process.env.PROCORE_ENV ?? "sandbox";
const PROCORE_BASE_URL =
  process.env.PROCORE_API_BASE_URL ??
  (PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com");

// ── Helpers ───────────────────────────────────────────────────────────────────

interface StepLog {
  step: string;
  method: string;
  path: string;
  body_sent: unknown;
  status: number;
  response: string;
  ok: boolean;
}

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

async function probeGet(
  accessToken: string,
  path: string,
  companyId: string,
  stepLabel: string
): Promise<{ log: StepLog; json: unknown; records: unknown[] }> {
  try {
    const res = await fetch(urlWithCompany(path, companyId), {
      headers: headers(accessToken, companyId),
    });
    const body = await res.text();
    const log: StepLog = {
      step: stepLabel,
      method: "GET",
      path,
      body_sent: null,
      status: res.status,
      response: body.slice(0, 1500),
      ok: res.ok,
    };
    let json: unknown = null;
    let records: unknown[] = [];
    try {
      json = JSON.parse(body);
      records = Array.isArray(json)
        ? json
        : Array.isArray((json as Record<string, unknown>)?.data)
          ? (json as Record<string, unknown>).data as unknown[]
          : [];
    } catch { /* not JSON */ }
    return { log, json, records };
  } catch (err) {
    return {
      log: {
        step: stepLabel,
        method: "GET",
        path,
        body_sent: null,
        status: 0,
        response: err instanceof Error ? err.message : String(err),
        ok: false,
      },
      json: null,
      records: [],
    };
  }
}

async function probePost(
  accessToken: string,
  path: string,
  companyId: string,
  body: unknown,
  stepLabel: string
): Promise<{ log: StepLog; json: unknown; ok: boolean }> {
  try {
    const res = await fetch(urlWithCompany(path, companyId), {
      method: "POST",
      headers: headers(accessToken, companyId),
      body: JSON.stringify(body),
    });
    const text = await res.text();
    const log: StepLog = {
      step: stepLabel,
      method: "POST",
      path,
      body_sent: body,
      status: res.status,
      response: text.slice(0, 1500),
      ok: res.ok,
    };
    let json: unknown = null;
    try { json = JSON.parse(text); } catch { /* not JSON */ }
    return { log, json, ok: res.ok };
  } catch (err) {
    return {
      log: {
        step: stepLabel,
        method: "POST",
        path,
        body_sent: body,
        status: 0,
        response: err instanceof Error ? err.message : String(err),
        ok: false,
      },
      json: null,
      ok: false,
    };
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const confirm = sp.get("confirm");

  // Guard — no Procore requests at all without explicit confirmation
  if (confirm !== "CREATE") {
    return NextResponse.json(
      { error: "confirmation required", hint: "Add &confirm=CREATE to the URL" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const projectId = sp.get("project_id");
  const companyId = sp.get("company_id");
  if (!projectId || !companyId) {
    return NextResponse.json(
      { error: "project_id and company_id query params are required." },
      { status: 400 }
    );
  }

  const suppliedPlanId = sp.get("plan_id") ? Number(sp.get("plan_id")) : null;

  const steps: StepLog[] = [];
  let planTypeId: number | null = null;
  let newPlanId: number | null = suppliedPlanId;
  let newSectionId: number | null = null;
  let newItemId: number | null = null;
  let item2Created = false;

  // ── STEP 1: find a plan type ────────────────────────────────────────────────
  const typesPaths = [
    `/rest/v1.0/projects/${projectId}/action_plans/plan_types`,
    `/rest/v1.0/companies/${companyId}/action_plans/plan_types`,
  ];
  for (const path of typesPaths) {
    const { log, records } = await probeGet(accessToken, path, companyId, "1 - find plan types");
    steps.push(log);
    if (log.ok && records.length > 0) {
      // Take first active type, or just the first one
      const active = records.find(
        (r) => (r as Record<string, unknown>)?.active !== false
      ) ?? records[0];
      planTypeId = (active as Record<string, unknown>)?.id as number ?? null;
      break;
    }
  }

  // ── STEP 2: find sections on an existing plan ──────────────────────────────
  let existingPlanId: number | null = null;
  {
    const plansPath = `/rest/v1.0/projects/${projectId}/action_plans/plans`;
    const { log, records } = await probeGet(accessToken, plansPath, companyId, "2a - list existing plans");
    steps.push(log);
    if (log.ok && records.length > 0) {
      existingPlanId = (records[0] as Record<string, unknown>)?.id as number ?? null;
    }
  }

  if (existingPlanId) {
    const sectionPaths = [
      `/rest/v1.0/projects/${projectId}/action_plans/plan_sections`,
      `/rest/v1.0/projects/${projectId}/action_plans/plans/${existingPlanId}/plan_sections`,
    ];
    for (const path of sectionPaths) {
      const { log } = await probeGet(accessToken, path, companyId, "2b - find sections");
      steps.push(log);
      if (log.ok) break;
    }
  }

  // ── STEP 3: create a plan (skipped if plan_id supplied) ─────────────────────
  if (suppliedPlanId) {
    steps.push({
      step: "3 - create plan (SKIPPED — using supplied plan_id)",
      method: "NONE",
      path: "",
      body_sent: null,
      status: 0,
      response: `Using supplied plan_id=${suppliedPlanId}`,
      ok: true,
    });
  } else {
    const planPath = `/rest/v1.0/projects/${projectId}/action_plans/plans`;
    const innerPlan = {
      title: "ZZZ TEST - HOLDPOINT SPIKE - DELETE ME",
      description: "Automated API write test. Safe to delete.",
      ...(planTypeId ? { plan_type_id: planTypeId } : {}),
    };

    const wrappers: { label: string; body: unknown }[] = [
      { label: '{ "plan": {...} }', body: { plan: innerPlan } },
      { label: '{ "action_plan": {...} }', body: { action_plan: innerPlan } },
      { label: "unwrapped", body: innerPlan },
    ];

    for (const w of wrappers) {
      const { log, json, ok } = await probePost(
        accessToken, planPath, companyId, w.body,
        `3 - create plan (${w.label})`
      );
      steps.push(log);
      if (ok && json && typeof json === "object") {
        newPlanId = (json as Record<string, unknown>).id as number ?? null;
        break;
      }
    }
  }

  // ── STEP 4: create a section (flat path, plan_id in body) ───────────────────
  if (newPlanId) {
    const sectionPath = `/rest/v1.0/projects/${projectId}/action_plans/plan_sections`;
    const innerSection = { plan_id: newPlanId, title: "Report Items", position: 1 };
    const sectionWrappers: { label: string; body: unknown }[] = [
      { label: '{ "plan_section": {...} }', body: { plan_section: innerSection } },
      { label: "unwrapped", body: innerSection },
    ];
    for (const w of sectionWrappers) {
      const { log, json, ok } = await probePost(
        accessToken, sectionPath, companyId, w.body,
        `4 - create section (${w.label})`
      );
      steps.push(log);
      if (ok && json && typeof json === "object") {
        newSectionId = (json as Record<string, unknown>).id as number ?? null;
        break;
      }
    }
  }

  // ── STEP 5: create an item (only if section was created) ────────────────────
  if (newPlanId && newSectionId) {
    const itemPath = `/rest/v1.0/projects/${projectId}/action_plans/plan_items`;
    const innerItem = {
      plan_id: newPlanId,
      plan_section_id: newSectionId,
      title: "Item 1 - Test item",
      description: "TEST DESCRIPTION FIELD - which UI label is this",
      notes: "TEST NOTES FIELD - which UI label is this",
      position: 1,
    };
    const itemWrappers: { label: string; body: unknown }[] = [
      { label: '{ "plan_item": {...} }', body: { plan_item: innerItem } },
      { label: "unwrapped", body: innerItem },
    ];
    for (const w of itemWrappers) {
      const { log, json, ok } = await probePost(
        accessToken, itemPath, companyId, w.body,
        `5 - create item (${w.label})`
      );
      steps.push(log);
      if (ok && json && typeof json === "object") {
        newItemId = (json as Record<string, unknown>).id as number ?? null;
        break;
      }
    }

    // ── STEP 5b: bare minimum item (title only) ──────────────────────────────
    if (newItemId) {
      const bareItem = {
        plan_id: newPlanId,
        plan_section_id: newSectionId,
        title: "Item 2 - Title only",
        position: 2,
      };
      const bareWrappers: { label: string; body: unknown }[] = [
        { label: '{ "plan_item": {...} }', body: { plan_item: bareItem } },
        { label: "unwrapped", body: bareItem },
      ];
      for (const w of bareWrappers) {
        const { log, json, ok } = await probePost(
          accessToken, itemPath, companyId, w.body,
          `5b - create bare item (${w.label})`
        );
        steps.push(log);
        if (ok && json && typeof json === "object") {
          item2Created = true;
          break;
        }
      }
    }
  }

  // ── STEP 6: no cleanup — leave for manual inspection ───────────────────────
  steps.push({
    step: "6 - cleanup skipped",
    method: "NONE",
    path: "",
    body_sent: null,
    status: 0,
    response: newPlanId
      ? `Test plan ${newPlanId} left in place for manual inspection in Procore UI.`
      : "No plan was created — nothing to clean up.",
    ok: true,
  });

  return NextResponse.json({
    summary: {
      plan_type_id_used: planTypeId,
      supplied_plan_id: suppliedPlanId,
      plan_created: !suppliedPlanId && newPlanId !== null,
      new_plan_id: newPlanId,
      section_created: newSectionId !== null,
      new_section_id: newSectionId,
      item_created: newItemId !== null,
      new_item_id: newItemId,
      item2_created: item2Created,
    },
    steps,
  });
}
