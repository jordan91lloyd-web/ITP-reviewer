// ─── POST /api/dashboard/action-report ───────────────────────────────────────
// Generates a PDF action report for the given inspections using
// @react-pdf/renderer and streams it back as a downloadable PDF.

import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ActionReportPDF from "@/components/ActionReportPDF";
import type { DashboardInspection } from "@/app/api/dashboard/inspections/route";

export async function POST(request: NextRequest) {
  let body: {
    inspections?:   DashboardInspection[];
    project_name?:  string;
    project_number?: string;
    company_id?:    string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { inspections, project_name, project_number, company_id } = body;

  if (!inspections || !project_name || !company_id) {
    return NextResponse.json(
      { error: "inspections, project_name, and company_id are required." },
      { status: 400 }
    );
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(ActionReportPDF, {
      inspections,
      projectName:   project_name,
      projectNumber: project_number ?? "",
    }) as any; // renderToBuffer expects ReactElement<DocumentProps> — our component wraps Document internally

    const buffer = await renderToBuffer(element);
    const slug = project_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    // Convert Buffer to Uint8Array for the Web Response API
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="holdpoint-${slug}-report.pdf"`,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[action-report] PDF generation failed:", msg);
    return NextResponse.json({ error: `PDF generation failed: ${msg}` }, { status: 500 });
  }
}
