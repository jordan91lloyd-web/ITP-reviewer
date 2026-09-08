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

  // Optional narrowing so callers can pull one building or level rather than
  // the whole project. Filtering happens AFTER the full paged fetch, so the
  // tree is always built from complete data.
  const pathContains = request.nextUrl.searchParams.get("path_contains")?.trim().toLowerCase();
  const depthParam = request.nextUrl.searchParams.get("depth");
  const wantDepth = depthParam !== null && !isNaN(Number(depthParam)) ? Number(depthParam) : null;

  if (pathContains || wantDepth !== null) {
    const flat = locations
      .map((l) => ({
        id: l.id,
        path: l.name ?? "",
        node_name: l.node_name ?? "",
        depth: Math.max(0, (l.name ?? "").split(">").length - 1),
        parent_id: l.parent_id,
      }))
      .filter((l) => {
        if (pathContains && !l.path.toLowerCase().includes(pathContains)) return false;
        if (wantDepth !== null && l.depth !== wantDepth) return false;
        return true;
      });

    const collator = new Intl.Collator("en-AU", { numeric: true, sensitivity: "base" });
    flat.sort((a, b) => collator.compare(a.path, b.path));

    console.log(
      `[bulk-itp/locations] project=${projectId}: ${locations.length} locations, ` +
      `${flat.length} matching path_contains=${pathContains ?? "-"} depth=${wantDepth ?? "-"}`
    );

    return NextResponse.json({
      project_id: projectId,
      count: locations.length,
      matching: flat.length,
      filters: { path_contains: pathContains ?? null, depth: wantDepth },
      locations: flat,
    });
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
