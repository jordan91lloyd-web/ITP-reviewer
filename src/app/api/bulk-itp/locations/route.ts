// ─── GET /api/bulk-itp/locations?project_id=X&company_id=Y ───────────────────
// The project's full location tree, for the builder's location picker.
//
// Fully paged. Bondi has well over 100 locations and a single unpaginated
// request truncates part way through the first apartment — which would quietly
// produce fewer inspections than intended.

import { NextRequest, NextResponse } from "next/server";
import { getProjectLocations } from "@/lib/procore";
import { buildLocationTree, type LocationNode } from "@/lib/location-tree";
import { resolveContext, procoreFailure } from "../_shared";

export async function GET(request: NextRequest) {
  const resolved = await resolveContext(request);
  if ("error" in resolved) return resolved.error;
  const { accessToken, projectId, companyId } = resolved.ctx;

  let locations;
  try {
    locations = await getProjectLocations(accessToken, projectId, companyId);
  } catch (err) {
    return procoreFailure("locations", err);
  }

  const tree: LocationNode[] = buildLocationTree(locations);

  const maxDepth = locations.reduce((max, l) => {
    const depth = (l.name ?? "").split(">").length - 1;
    return depth > max ? depth : max;
  }, 0);

  console.log(
    `[bulk-itp/locations] project=${projectId}: ${locations.length} locations, ` +
    `${tree.length} roots, max depth ${maxDepth}`
  );

  return NextResponse.json({
    project_id: projectId,
    count: locations.length,
    root_count: tree.length,
    max_depth: maxDepth,
    tree,
  });
}
