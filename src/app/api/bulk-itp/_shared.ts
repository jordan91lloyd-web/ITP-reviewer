// ─── Shared request plumbing for the bulk ITP builder routes ─────────────────
// All builder routes are read-only and follow the same shape:
// cookie auth, required project_id and company_id, 502 on a Procore failure.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export interface BuilderContext {
  accessToken: string;
  projectId: number;
  companyId: number;
}

/**
 * Resolves auth and the two required query params.
 * Returns either a context or a NextResponse to return immediately.
 */
export async function resolveContext(
  request: NextRequest
): Promise<{ ctx: BuilderContext } | { error: NextResponse }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;

  if (!accessToken) {
    return {
      error: NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 }),
    };
  }

  const projectIdParam = request.nextUrl.searchParams.get("project_id");
  if (!projectIdParam || isNaN(Number(projectIdParam))) {
    return {
      error: NextResponse.json({ error: "project_id query parameter is required." }, { status: 400 }),
    };
  }

  const companyIdParam =
    request.nextUrl.searchParams.get("company_id") ?? process.env.FLEEK_COMPANY_ID ?? "";
  if (!companyIdParam || isNaN(Number(companyIdParam))) {
    return {
      error: NextResponse.json({ error: "company_id query parameter is required." }, { status: 400 }),
    };
  }

  return {
    ctx: {
      accessToken,
      projectId: Number(projectIdParam),
      companyId: Number(companyIdParam),
    },
  };
}

/** Reads an optional positive integer query param. */
export function numberParam(request: NextRequest, name: string): number | null {
  const raw = request.nextUrl.searchParams.get(name);
  if (!raw || isNaN(Number(raw))) return null;
  return Number(raw);
}

/** Consistent 502 for anything Procore refuses. */
export function procoreFailure(tag: string, err: unknown): NextResponse {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`[bulk-itp/${tag}] Procore error:`, message);
  return NextResponse.json({ error: message }, { status: 502 });
}
