// ─── GET /api/admin/documents/discipline-guide?id=<guide-id> ─────────────────
// Returns the discipline-specific scoring guide as a plain-text PDF.
// Uses @react-pdf/renderer so no extra dependencies are needed.
// Requires authentication (any logged-in user); no admin check needed for
// read-only reference documents.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import React from "react";
import { renderToBuffer, Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { DISCIPLINE_GUIDES } from "@/lib/discipline-guides";

const styles = StyleSheet.create({
  page: {
    fontFamily:   "Helvetica",
    paddingTop:   40,
    paddingBottom: 50,
    paddingLeft:  44,
    paddingRight: 44,
    backgroundColor: "#FAFAF9",
  },
  title: {
    fontSize:     18,
    fontFamily:   "Helvetica-Bold",
    color:        "#2E2418",
    marginBottom: 4,
  },
  subtitle: {
    fontSize:     11,
    color:        "#8C7258",
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8DDD0",
    borderBottomStyle: "solid",
    marginBottom:      16,
  },
  body: {
    fontSize:   10,
    color:      "#2E2418",
    lineHeight: 1.6,
  },
  footer: {
    position:       "absolute",
    bottom:         18,
    left:           44,
    right:          44,
    borderTopWidth: 1,
    borderTopColor: "#E8DDD0",
    borderTopStyle: "solid",
    paddingTop:     6,
    flexDirection:  "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color:    "#A89278",
  },
});

export async function GET(request: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  // ── Find guide ──────────────────────────────────────────────────────────────
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const guide = id ? DISCIPLINE_GUIDES.find(g => g.id === id) : null;

  console.log(`[discipline-guide] id="${id ?? "(none)"}" → ${guide ? `found: "${guide.name}"` : "NOT FOUND"}`);

  if (!guide) {
    return NextResponse.json({ error: "Guide not found." }, { status: 404 });
  }

  // ── Render PDF ──────────────────────────────────────────────────────────────
  const dateStr = new Date().toLocaleDateString("en-AU", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const element = React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(Text, { style: styles.title }, `Discipline Scoring Guide: ${guide.name}`),
      React.createElement(Text, { style: styles.subtitle }, `Holdpoint ITP QA Platform  ·  Generated ${dateStr}`),
      React.createElement(View, { style: styles.divider }),
      React.createElement(Text, { style: styles.body }, guide.content.trim()),
      React.createElement(
        View,
        { style: styles.footer, fixed: true },
        React.createElement(Text, { style: styles.footerText }, `Holdpoint  ·  ${guide.name} Scoring Guide`),
        React.createElement(
          Text,
          {
            style: styles.footerText,
            render: ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) =>
              `Page ${pageNumber} of ${totalPages}`,
            fixed: true,
          }
        )
      )
    )
  );

  // renderToBuffer type does not accept ReactElement directly in some versions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await (renderToBuffer as any)(element);
  const filename = `discipline-guide-${guide.id}.pdf`;

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type":        "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
