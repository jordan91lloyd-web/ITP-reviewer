// ─── POST /api/action-plan/upload ─────────────────────────────────────────
// Uploads a ConvertedActionPlan into Procore as an Action Plan with sections
// and items. Sequential, deterministic ordering. Stops on first failure.
// Best-effort attachment of the original report file after creation.

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

// Max file size for attachment attempt (Vercel request body limit consideration)
const MAX_ATTACH_SIZE = 4 * 1024 * 1024; // 4 MB

function jsonHeaders(accessToken: string, companyId: string): Record<string, string> {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "Procore-Company-Id": companyId,
  };
}

function authHeaders(accessToken: string, companyId: string): Record<string, string> {
  return {
    Authorization: `Bearer ${accessToken}`,
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
    headers: jsonHeaders(accessToken, companyId),
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

// ── Attachment attempt record ─────────────────────────────────────────────

interface AttachAttempt {
  method: string;
  path: string;
  status: number;
  response: string;
}

interface AttachmentResult {
  attempted: boolean;
  succeeded: boolean;
  method: string | null;
  skipped_reason: string | null;
  attempts: AttachAttempt[];
}

// ── Main handler ──────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ success: false, error: "Not authenticated with Procore." }, { status: 401 });
  }

  // Parse multipart/form-data
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request — expected multipart/form-data." }, { status: 400 });
  }

  const payloadStr = formData.get("payload");
  if (typeof payloadStr !== "string") {
    return NextResponse.json({ success: false, error: "Missing 'payload' field." }, { status: 400 });
  }

  let payload: {
    plan: ConvertedActionPlan;
    project_id: number;
    company_id: number;
    plan_type_id: number;
  };
  try {
    payload = JSON.parse(payloadStr);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON in 'payload' field." }, { status: 400 });
  }

  const { plan, project_id, company_id, plan_type_id } = payload;
  if (!plan || !project_id || !company_id || !plan_type_id) {
    return NextResponse.json(
      { success: false, error: "Missing required fields: plan, project_id, company_id, plan_type_id." },
      { status: 400 }
    );
  }

  const reportFile = formData.get("file") as File | null;

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

  // ── Step 4: Best-effort attachment ─────────────────────────────────────────
  const attachment: AttachmentResult = {
    attempted: false,
    succeeded: false,
    method: null,
    skipped_reason: null,
    attempts: [],
  };

  if (!reportFile) {
    attachment.skipped_reason = "No file provided.";
  } else if (reportFile.size > MAX_ATTACH_SIZE) {
    attachment.skipped_reason = `File too large to attach automatically (${(reportFile.size / 1024 / 1024).toFixed(1)} MB) — Vercel request body limit.`;
  } else {
    attachment.attempted = true;
    const fileBuffer = Buffer.from(await reportFile.arrayBuffer());
    const fileName = reportFile.name;
    const fileMime = reportFile.type || "application/octet-stream";

    // ── Candidate A: Two-step Procore upload flow ──────────────────────────
    try {
      // A1: Request upload descriptor
      const uploadPath = `/rest/v1.1/companies/${company_id}/uploads`;
      const uploadRes = await fetch(urlWithCompany(uploadPath, companyId), {
        method: "POST",
        headers: jsonHeaders(accessToken, companyId),
        body: JSON.stringify({
          response_filename: fileName,
          response_content_type: fileMime,
        }),
      });
      const uploadText = await uploadRes.text();
      attachment.attempts.push({
        method: "POST",
        path: uploadPath,
        status: uploadRes.status,
        response: uploadText.slice(0, 1000),
      });

      if (uploadRes.ok) {
        let uploadData: Record<string, unknown> = {};
        try { uploadData = JSON.parse(uploadText); } catch { /* ignore */ }

        const uuid = uploadData.uuid as string | undefined;
        const uploadUrl = (uploadData.url as string) ?? (uploadData.upload_url as string);

        if (uuid && uploadUrl) {
          // A2: PUT file bytes to the signed URL
          const putRes = await fetch(uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": fileMime },
            body: fileBuffer,
          });
          const putText = await putRes.text().catch(() => "");
          attachment.attempts.push({
            method: "PUT",
            path: uploadUrl.slice(0, 200),
            status: putRes.status,
            response: putText.slice(0, 1000),
          });

          if (putRes.ok || putRes.status === 200 || putRes.status === 201) {
            // A3: PATCH plan with upload_uuids
            const patchPath = `/rest/v1.0/projects/${project_id}/action_plans/plans/${createdPlanId}`;
            const patchRes1 = await fetch(urlWithCompany(patchPath, companyId), {
              method: "PATCH",
              headers: jsonHeaders(accessToken, companyId),
              body: JSON.stringify({ plan: { upload_uuids: [uuid] } }),
            });
            const patchText1 = await patchRes1.text();
            attachment.attempts.push({
              method: "PATCH (upload_uuids)",
              path: patchPath,
              status: patchRes1.status,
              response: patchText1.slice(0, 1000),
            });

            if (patchRes1.ok) {
              attachment.succeeded = true;
              attachment.method = "two-step upload + PATCH upload_uuids";
            } else {
              // A3b: Retry with assets key
              const patchRes2 = await fetch(urlWithCompany(patchPath, companyId), {
                method: "PATCH",
                headers: jsonHeaders(accessToken, companyId),
                body: JSON.stringify({ plan: { assets: [uuid] } }),
              });
              const patchText2 = await patchRes2.text();
              attachment.attempts.push({
                method: "PATCH (assets)",
                path: patchPath,
                status: patchRes2.status,
                response: patchText2.slice(0, 1000),
              });

              if (patchRes2.ok) {
                attachment.succeeded = true;
                attachment.method = "two-step upload + PATCH assets";
              }
            }
          }
        }
      }
    } catch (err) {
      attachment.attempts.push({
        method: "POST (upload error)",
        path: `/rest/v1.1/companies/${company_id}/uploads`,
        status: 0,
        response: err instanceof Error ? err.message : String(err),
      });
    }

    // ── Candidate B: Direct multipart PATCH ─────────────────────────────────
    if (!attachment.succeeded) {
      try {
        const patchPath = `/rest/v1.0/projects/${project_id}/action_plans/plans/${createdPlanId}`;
        const fd = new FormData();
        fd.append("plan[attachments][]", new Blob([fileBuffer], { type: fileMime }), fileName);

        const patchRes = await fetch(urlWithCompany(patchPath, companyId), {
          method: "PATCH",
          headers: authHeaders(accessToken, companyId),
          body: fd,
        });
        const patchText = await patchRes.text();
        attachment.attempts.push({
          method: "PATCH multipart",
          path: patchPath,
          status: patchRes.status,
          response: patchText.slice(0, 1000),
        });

        if (patchRes.ok) {
          attachment.succeeded = true;
          attachment.method = "PATCH multipart plan[attachments][]";
        }
      } catch (err) {
        attachment.attempts.push({
          method: "PATCH multipart (error)",
          path: `plans/${createdPlanId}`,
          status: 0,
          response: err instanceof Error ? err.message : String(err),
        });
      }
    }

    // ── Candidate C: Direct multipart POST to /attachments ──────────────────
    if (!attachment.succeeded) {
      try {
        const attachPath = `/rest/v1.0/projects/${project_id}/action_plans/plans/${createdPlanId}/attachments`;
        const fd = new FormData();
        fd.append("attachments[]", new Blob([fileBuffer], { type: fileMime }), fileName);

        const postRes = await fetch(urlWithCompany(attachPath, companyId), {
          method: "POST",
          headers: authHeaders(accessToken, companyId),
          body: fd,
        });
        const postText = await postRes.text();
        attachment.attempts.push({
          method: "POST multipart",
          path: attachPath,
          status: postRes.status,
          response: postText.slice(0, 1000),
        });

        if (postRes.ok) {
          attachment.succeeded = true;
          attachment.method = "POST multipart attachments[]";
        }
      } catch (err) {
        attachment.attempts.push({
          method: "POST multipart (error)",
          path: `plans/${createdPlanId}/attachments`,
          status: 0,
          response: err instanceof Error ? err.message : String(err),
        });
      }
    }
  }

  // ── Success (plan + sections + items always succeeded to reach here) ────
  const planUrl = `${PROCORE_WEB_HOST}/webclients/host/companies/${company_id}/projects/${project_id}/tools/actionplans/plans/${createdPlanId}`;

  return NextResponse.json({
    success: true,
    plan_id: createdPlanId,
    plan_url: planUrl,
    sections_created: sectionsCreated,
    items_created: itemsCreated,
    attachment,
  });
}
