// ─── GET /api/monitoring/attention?company_id=X ───────────────────────────────
// Returns attention summary for all projects for the current user.
// Sessions with active_seconds < 120 are excluded.
//
// Response shape:
// {
//   attention: {
//     [project_id]: {
//       total_seconds_14d: number,
//       total_seconds_30d: number,
//       last_visited: string | null,
//       session_count_14d: number,
//       weekly: Array<{ week_start: string, total_seconds: number }> // 8 weeks, oldest first
//     }
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Get the Monday of the week containing the given date
function weekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getUTCDay(); // 0=Sun, 1=Mon...
  const diff = (day === 0 ? -6 : 1 - day);
  d.setUTCDate(d.getUTCDate() + diff);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const companyId = request.nextUrl.searchParams.get("company_id");
  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  let userId: string;
  try {
    const user = await getProcoreUser(accessToken);
    userId = String(user.id);
  } catch {
    return NextResponse.json({ error: "Failed to resolve user." }, { status: 401 });
  }

  // Fetch sessions from the last 56 days (8 weeks), excluding < 120 seconds
  const since = new Date();
  since.setDate(since.getDate() - 56);

  const { data: sessions, error } = await supabase
    .from("project_attention_sessions")
    .select("project_id, started_at, active_seconds")
    .eq("user_id", userId)
    .eq("company_id", companyId)
    .gte("started_at", since.toISOString())
    .gte("active_seconds", 120);

  if (error) {
    console.error("[monitoring/attention]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const now = new Date();
  const cutoff14d = new Date(now.getTime() - 14 * 86400_000);
  const cutoff30d = new Date(now.getTime() - 30 * 86400_000);

  // Build 8 week-start dates (oldest first)
  const weekStarts: string[] = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 7 * 86400_000);
    weekStarts.push(toISO(weekStart(d)));
  }

  type ProjectAgg = {
    total_seconds_14d: number;
    total_seconds_30d: number;
    last_visited: string | null;
    session_count_14d: number;
    weeklyMap: Map<string, number>;
  };

  const map = new Map<string, ProjectAgg>();

  function getOrCreate(pid: string): ProjectAgg {
    if (!map.has(pid)) {
      map.set(pid, {
        total_seconds_14d: 0,
        total_seconds_30d: 0,
        last_visited: null,
        session_count_14d: 0,
        weeklyMap: new Map(weekStarts.map(w => [w, 0])),
      });
    }
    return map.get(pid)!;
  }

  for (const s of sessions ?? []) {
    const pid     = String(s.project_id);
    const agg     = getOrCreate(pid);
    const secs    = Number(s.active_seconds ?? 0);
    const startedAt = s.started_at as string;
    const startDate = new Date(startedAt);

    // 14d / 30d totals
    if (startDate >= cutoff14d) {
      agg.total_seconds_14d += secs;
      agg.session_count_14d += 1;
    }
    if (startDate >= cutoff30d) {
      agg.total_seconds_30d += secs;
    }

    // last_visited
    if (!agg.last_visited || startedAt > agg.last_visited) {
      agg.last_visited = startedAt;
    }

    // Weekly bucket
    const ws = toISO(weekStart(startDate));
    if (agg.weeklyMap.has(ws)) {
      agg.weeklyMap.set(ws, (agg.weeklyMap.get(ws) ?? 0) + secs);
    }
  }

  // Serialise
  const attention: Record<string, {
    total_seconds_14d: number;
    total_seconds_30d: number;
    last_visited: string | null;
    session_count_14d: number;
    weekly: Array<{ week_start: string; total_seconds: number }>;
  }> = {};

  for (const [pid, agg] of map.entries()) {
    attention[pid] = {
      total_seconds_14d: agg.total_seconds_14d,
      total_seconds_30d: agg.total_seconds_30d,
      last_visited:      agg.last_visited,
      session_count_14d: agg.session_count_14d,
      weekly:            weekStarts.map(w => ({ week_start: w, total_seconds: agg.weeklyMap.get(w) ?? 0 })),
    };
  }

  return NextResponse.json({ attention });
}
