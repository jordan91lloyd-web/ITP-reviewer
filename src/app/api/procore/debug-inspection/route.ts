// ─── GET /api/procore/debug-inspection ────────────────────────────────────────
// Diagnostic endpoint. Returns everything Procore gives us for a single
// inspection plus structural counts — items, sections, responses, attachments,
// and where each attachment lives in the response tree.
//
// Usage (in browser while logged in to localhost:3010):
//   /api/procore/debug-inspection?project_id=123&inspection_id=456&company_id=789
//
// This endpoint is read-only and does NOT run the QA review.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getInspectionDetail,
  getInspectionItems,
  getProcoreProject,
} from "@/lib/procore";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  const sp = request.nextUrl.searchParams;
  const project_id    = Number(sp.get("project_id"));
  const inspection_id = Number(sp.get("inspection_id"));
  const company_id    = Number(sp.get("company_id"));

  if (!project_id || !inspection_id || !company_id) {
    return NextResponse.json(
      { error: "project_id, inspection_id, company_id query params are all required." },
      { status: 400 }
    );
  }

  try {
    const inspection = await getInspectionDetail(accessToken, project_id, inspection_id, company_id);

    // Count attachments in every location
    const attachmentSources: Record<string, number> = {};
    let totalAttachments = 0;
    const bump = (source: string, n: number) => {
      if (n > 0) {
        attachmentSources[source] = (attachmentSources[source] ?? 0) + n;
        totalAttachments += n;
      }
    };

    bump("inspection.attachments", inspection.attachments?.length ?? 0);

    for (const r of inspection.responses ?? []) {
      bump("responses[].attachments", r.attachments?.length ?? 0);
    }

    for (const it of inspection.items ?? []) {
      bump("items[].attachments", it.attachments?.length ?? 0);
      bump("items[].response.attachments", it.response?.attachments?.length ?? 0);
      for (const r of it.list_item_responses ?? []) {
        bump("items[].list_item_responses[].attachments", r.attachments?.length ?? 0);
      }
    }

    for (const s of inspection.sections ?? []) {
      for (const it of s.items ?? []) {
        bump("sections[].items[].attachments", it.attachments?.length ?? 0);
        bump("sections[].items[].response.attachments", it.response?.attachments?.length ?? 0);
        for (const r of it.list_item_responses ?? []) {
          bump("sections[].items[].list_item_responses[].attachments", r.attachments?.length ?? 0);
        }
      }
    }

    // Fallback item count
    let fallbackItems: unknown[] = [];
    if ((inspection.items?.length ?? 0) === 0 && (inspection.sections?.length ?? 0) === 0) {
      fallbackItems = await getInspectionItems(accessToken, project_id, inspection_id, company_id);
    }

    let projectInfo: unknown = null;
    try {
      projectInfo = await getProcoreProject(accessToken, project_id, company_id);
    } catch (err) {
      projectInfo = { error: err instanceof Error ? err.message : String(err) };
    }

    return NextResponse.json({
      summary: {
        inspection_id,
        name: inspection.name,
        status: inspection.status,
        closed_at: inspection.closed_at,
        topLevelKeys: Object.keys(inspection as unknown as Record<string, unknown>).sort(),
        counts: {
          items:     inspection.items?.length ?? 0,
          sections:  inspection.sections?.length ?? 0,
          responses: inspection.responses?.length ?? 0,
          topLevelAttachments: inspection.attachments?.length ?? 0,
          fallbackListItems: fallbackItems.length,
        },
        attachments: {
          total: totalAttachments,
          bySource: attachmentSources,
        },
      },
      project: projectInfo,
      // First 3 items so we can see the actual shape (without dumping MB of data)
      firstThreeItems: (inspection.items ?? inspection.sections?.flatMap(s => s.items ?? []) ?? []).slice(0, 3),
      fallbackFirstTwo: fallbackItems.slice(0, 2),
      // Raw inspection (trimmed to avoid huge payload — just the metadata + 1 item/response)
      rawInspection: {
        ...inspection,
        items: inspection.items?.slice(0, 1),
        sections: inspection.sections?.slice(0, 1),
        responses: inspection.responses?.slice(0, 1),
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
