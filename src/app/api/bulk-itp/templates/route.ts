// ─── GET /api/bulk-itp/templates?project_id=X&company_id=Y ───────────────────
// Project-level checklist templates, for the builder's template picker.
//
// These are the project copies carrying project-specific customisation, not the
// company masters. Creating inspections from a company template would produce
// ITPs without the project's wet areas or elevations.
//
// Returned sorted by name for display only. The caller selects by id — names
// have drifted over the years and must never be matched on.

import { NextRequest, NextResponse } from "next/server";
import { getProjectChecklistTemplates } from "@/lib/procore";
import { resolveContext, procoreFailure } from "../_shared";

export interface BuilderTemplate {
  id: number;
  name: string;
  inspection_type: string | null;
  trade: string | null;
  item_count: number | null;
  updated_at: string | null;
}

export async function GET(request: NextRequest) {
  const resolved = await resolveContext(request);
  if ("error" in resolved) return resolved.error;
  const { accessToken, projectId, companyId } = resolved.ctx;

  let templates;
  try {
    templates = await getProjectChecklistTemplates(accessToken, projectId, companyId);
  } catch (err) {
    return procoreFailure("templates", err);
  }

  const collator = new Intl.Collator("en-AU", { numeric: true, sensitivity: "base" });

  const result: BuilderTemplate[] = templates
    .map((t) => ({
      id: t.id,
      name: t.name,
      inspection_type: t.inspection_type?.name ?? null,
      trade: t.trade?.name ?? null,
      item_count: t.item_count ?? null,
      updated_at: t.updated_at ?? null,
    }))
    .sort((a, b) => collator.compare(a.name, b.name));

  console.log(`[bulk-itp/templates] project=${projectId}: ${result.length} project templates`);

  return NextResponse.json({ project_id: projectId, count: result.length, templates: result });
}
