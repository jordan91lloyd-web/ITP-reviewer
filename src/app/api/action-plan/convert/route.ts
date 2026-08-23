// ─── POST /api/action-plan/convert ────────────────────────────────────────
// Accepts a single PDF/JPG/PNG file, converts it into a structured Action Plan
// via Claude, and returns the result. No Procore calls. No Supabase writes.

import { NextRequest, NextResponse } from "next/server";
import { runActionPlanConversion } from "@/lib/actionPlanClaude";

export const maxDuration = 60;

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No file provided. Upload a single PDF, JPG, or PNG." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { success: false, error: `Unsupported file type "${file.type}". Use PDF, JPG, or PNG.` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is 20 MB.` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type as "application/pdf" | "image/jpeg" | "image/png";

    const plan = await runActionPlanConversion(buffer, file.name, mimeType);

    return NextResponse.json({ success: true, plan });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[action-plan/convert] Error: ${message}`);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
