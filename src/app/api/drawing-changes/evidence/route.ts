// POST /api/drawing-changes/evidence
// Generates a Change Evidence Sheet PDF for a single drawing.
// Body: { drawing_number, drawing_title, old_revision, new_revision,
//         old_pdf_url, new_pdf_url, changes: ChangeRow[], project_name }

import { NextRequest, NextResponse } from "next/server";
import React from "react";
import {
  renderToBuffer,
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

export const maxDuration = 60;

const s = StyleSheet.create({
  page: { padding: 36, fontSize: 9, fontFamily: "Helvetica", color: "#1C1917" },
  header: { marginBottom: 16 },
  title: { fontSize: 16, fontWeight: "bold", color: "#1C1917" },
  subtitle: { fontSize: 10, color: "#78716C", marginTop: 2 },
  revLabel: { fontSize: 11, fontWeight: "bold", color: "#44403C", marginTop: 4 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#D6D3D1", marginVertical: 10 },
  changeRow: { flexDirection: "row", marginBottom: 6, paddingBottom: 6, borderBottomWidth: 0.5, borderBottomColor: "#E7E5E4" },
  changeNum: { width: 24, fontSize: 9, fontWeight: "bold", color: "#78716C" },
  changeBody: { flex: 1 },
  changeTitle: { fontSize: 9, fontWeight: "bold" },
  changeDesc: { fontSize: 9, color: "#44403C", marginTop: 2 },
  changeLoc: { fontSize: 8, color: "#78716C", marginTop: 2 },
  typePill: { fontSize: 7, fontWeight: "bold", textTransform: "uppercase" },
  sevPill: { fontSize: 7, fontWeight: "bold", textTransform: "uppercase" },
  changeMeta: { flexDirection: "row", gap: 8, marginTop: 3 },
  drawingImage: { width: "100%", marginTop: 8 },
  drawingLabel: { fontSize: 11, fontWeight: "bold", color: "#44403C", marginTop: 16, marginBottom: 4 },
  footer: {
    position: "absolute", bottom: 20, left: 36, right: 36,
    flexDirection: "row", justifyContent: "space-between",
    fontSize: 7, color: "#A8A29E",
  },
  highRow: { backgroundColor: "#FEF2F2" },
});

const TYPE_COLORS: Record<string, string> = {
  addition: "#166534", deletion: "#991B1B", spec_change: "#92400E", relocation: "#1E40AF",
};
const TYPE_LABELS: Record<string, string> = {
  addition: "Addition", deletion: "Deletion", spec_change: "Spec Change", relocation: "Relocation",
};
const SEV_COLORS: Record<string, string> = {
  high: "#991B1B", medium: "#92400E", low: "#166534",
};

interface ChangeInput {
  change_type: string;
  description: string;
  location_on_drawing: string | null;
  severity: string;
}

function EvidencePdf({
  projectName, drawingNumber, drawingTitle, oldRev, newRev,
  changes, oldImageData, newImageData,
}: {
  projectName: string;
  drawingNumber: string;
  drawingTitle: string;
  oldRev: string;
  newRev: string;
  changes: ChangeInput[];
  oldImageData: string | null;
  newImageData: string | null;
}) {
  return React.createElement(Document, null,
    // Page 1: Change details
    React.createElement(Page, { size: "A4", style: s.page },
      React.createElement(View, { style: s.header },
        React.createElement(Text, { style: s.title }, "Change Evidence Sheet"),
        React.createElement(Text, { style: s.subtitle },
          `${projectName} · ${drawingNumber} — ${drawingTitle}`
        ),
        React.createElement(Text, { style: s.revLabel },
          `Revision ${oldRev} → Revision ${newRev} · ${changes.length} change${changes.length !== 1 ? "s" : ""}`
        ),
      ),
      React.createElement(View, { style: s.divider }),

      // Change list
      ...changes.map((c, i) =>
        React.createElement(View, {
          key: i,
          style: { ...s.changeRow, ...(c.severity === "high" ? s.highRow : {}) },
          wrap: false,
        },
          React.createElement(Text, { style: s.changeNum }, `${i + 1}.`),
          React.createElement(View, { style: s.changeBody },
            React.createElement(Text, { style: s.changeDesc }, c.description),
            c.location_on_drawing
              ? React.createElement(Text, { style: s.changeLoc }, `Location: ${c.location_on_drawing}`)
              : null,
            React.createElement(View, { style: s.changeMeta },
              React.createElement(Text, {
                style: { ...s.typePill, color: TYPE_COLORS[c.change_type] ?? "#44403C" }
              }, TYPE_LABELS[c.change_type] ?? c.change_type),
              React.createElement(Text, {
                style: { ...s.sevPill, color: SEV_COLORS[c.severity] ?? "#44403C" }
              }, c.severity.toUpperCase()),
            ),
          ),
        )
      ),

      React.createElement(View, { style: s.footer, fixed: true },
        React.createElement(Text, null, "Holdpoint — Change Evidence Sheet"),
        React.createElement(Text, {
          render: ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) =>
            `Page ${pageNumber} of ${totalPages}`
        }),
      ),
    ),

    // Page 2: Old revision drawing
    oldImageData ? React.createElement(Page, { size: "A4", orientation: "landscape", style: { ...s.page, padding: 24 } },
      React.createElement(Text, { style: s.drawingLabel },
        `OLD: ${drawingNumber} — Revision ${oldRev}`
      ),
      React.createElement(Image, {
        src: `data:image/png;base64,${oldImageData}`,
        style: s.drawingImage,
      }),
      React.createElement(View, { style: { ...s.footer, left: 24, right: 24 }, fixed: true },
        React.createElement(Text, null, `${drawingNumber} Rev ${oldRev} (OLD)`),
        React.createElement(Text, null, "Holdpoint — Change Evidence Sheet"),
      ),
    ) : null,

    // Page 3: New revision drawing
    newImageData ? React.createElement(Page, { size: "A4", orientation: "landscape", style: { ...s.page, padding: 24 } },
      React.createElement(Text, { style: s.drawingLabel },
        `NEW: ${drawingNumber} — Revision ${newRev}`
      ),
      React.createElement(Image, {
        src: `data:image/png;base64,${newImageData}`,
        style: s.drawingImage,
      }),
      React.createElement(View, { style: { ...s.footer, left: 24, right: 24 }, fixed: true },
        React.createElement(Text, null, `${drawingNumber} Rev ${newRev} (NEW)`),
        React.createElement(Text, null, "Holdpoint — Change Evidence Sheet"),
      ),
    ) : null,
  );
}

async function downloadAsImage(url: string): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    // PDFs can't be embedded as images in react-pdf, so we return null for PDFs
    // and only embed if it's already an image
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("image")) {
      return buf.toString("base64");
    }
    // For PDFs — react-pdf can't render PDF-inside-PDF, skip the image
    return null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  let body: {
    project_name: string;
    drawing_number: string;
    drawing_title: string;
    old_revision: string;
    new_revision: string;
    old_pdf_url?: string;
    new_pdf_url?: string;
    changes: ChangeInput[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { project_name, drawing_number, drawing_title, old_revision, new_revision, old_pdf_url, new_pdf_url, changes } = body;

  if (!drawing_number || !changes || changes.length === 0) {
    return NextResponse.json({ error: "drawing_number and changes required" }, { status: 400 });
  }

  // Try to download drawing images (only works for image URLs, not PDFs)
  const [oldImageData, newImageData] = await Promise.all([
    old_pdf_url ? downloadAsImage(old_pdf_url) : Promise.resolve(null),
    new_pdf_url ? downloadAsImage(new_pdf_url) : Promise.resolve(null),
  ]);

  const doc = React.createElement(EvidencePdf, {
    projectName: project_name ?? "",
    drawingNumber: drawing_number,
    drawingTitle: drawing_title ?? "",
    oldRev: old_revision ?? "",
    newRev: new_revision ?? "",
    changes,
    oldImageData,
    newImageData,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await renderToBuffer(doc as any);
  const filename = `evidence-${drawing_number}-rev${old_revision}-to-${new_revision}.pdf`;

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
