// ─── GET /api/breadcrumb/debug-sample ────────────────────────────────────────
// Reads and returns the debug sample written by the site-briefings route.
// Temporary — remove once the field shape is confirmed.

import { NextResponse } from "next/server";
import { readFileSync } from "fs";

export async function GET() {
  try {
    const raw  = readFileSync("/tmp/breadcrumb-debug.json", "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json({ ok: true, sample: data });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "File not found — trigger site-briefings first" },
      { status: 404 }
    );
  }
}
