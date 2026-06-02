"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RefreshCw, Download } from "lucide-react";

type PrestartDay = boolean | null;

interface SiteRow {
  siteReference:    string;
  siteName:         string;
  prestart:         { mon: PrestartDay; tue: PrestartDay; wed: PrestartDay; thu: PrestartDay; fri: PrestartDay };
  toolbox:          boolean;
  pendingInductions: number;
  pendingDocs:      number;
  notes:            string;
  status:           "On Track" | "Action Req.";
}

interface ComplianceData {
  weekStart:  string;
  weekDates:  string[];
  weekDays:   string[];
  today:      string;
  sites:      SiteRow[];
}

const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri"] as const;

export default function SiteComplianceTab({ companyId }: { companyId: string }) {
  const [data,       setData]       = useState<ComplianceData | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [notes,      setNotes]      = useState<Record<string, string>>({});
  const [pdfLoading, setPdfLoading] = useState(false);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/breadcrumb/compliance-data?company_id=${companyId}`);
      const json = (await res.json()) as ComplianceData;
      setData(json);
      const init: Record<string, string> = {};
      for (const s of json.sites) init[s.siteReference] = s.notes;
      setNotes(init);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => { void load(); }, [load]);

  function handleNotesChange(ref: string, value: string) {
    setNotes(prev => ({ ...prev, [ref]: value }));
    clearTimeout(timers.current[ref]);
    timers.current[ref] = setTimeout(() => void saveNote(ref, value), 1000);
  }

  function handleNotesBlur(ref: string, value: string) {
    clearTimeout(timers.current[ref]);
    void saveNote(ref, value);
  }

  async function saveNote(ref: string, value: string) {
    if (!data) return;
    await fetch("/api/breadcrumb/compliance-notes", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        company_id:     companyId,
        site_reference: ref,
        week_start:     data.weekStart,
        notes:          value,
      }),
    });
  }

  async function downloadPdf() {
    if (!data) return;
    setPdfLoading(true);
    try {
      const res  = await fetch("/api/breadcrumb/compliance-pdf", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ data, companyName: "Fleek Constructions" }),
      });
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `site-compliance-${data.weekStart}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setPdfLoading(false);
    }
  }

  function fmtWeekLabel(ws: string) {
    const d = new Date(ws + "T00:00:00");
    return d.toLocaleDateString("en-AU", {
      weekday: "long", day: "2-digit", month: "long", year: "numeric",
    });
  }

  function DayCell({ val }: { val: PrestartDay }) {
    if (val === null) return <span style={{ color: "#94A3B8", fontWeight: 600, fontSize: 15 }}>–</span>;
    if (val)          return <span style={{ color: "#16A34A", fontWeight: 700, fontSize: 16 }}>✓</span>;
    return              <span style={{ color: "#DC2626", fontWeight: 700, fontSize: 16 }}>✗</span>;
  }

  if (loading) {
    return (
      <div style={{ padding: 48, textAlign: "center", color: "#64748B" }}>
        <div style={{ marginBottom: 12, fontSize: 14 }}>Loading compliance data...</div>
        <div style={{
          display: "inline-block", width: 24, height: 24,
          border: "3px solid #E2E8F0", borderTopColor: "#6366F1",
          borderRadius: "50%", animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!data) {
    return <div style={{ padding: 40, color: "#DC2626" }}>Failed to load compliance data.</div>;
  }

  const { weekStart, weekDates, weekDays, today, sites } = data;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", margin: 0 }}>Site Compliance</h2>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>
            Week of {fmtWeekLabel(weekStart)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => void load()}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", background: "#F1F5F9",
              border: "1px solid #E2E8F0", borderRadius: 8,
              cursor: "pointer", fontSize: 13, color: "#475569",
            }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={() => void downloadPdf()}
            disabled={pdfLoading}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", background: "#0F172A",
              border: "none", borderRadius: 8,
              cursor: pdfLoading ? "default" : "pointer",
              fontSize: 13, color: "#FFFFFF",
              opacity: pdfLoading ? 0.6 : 1,
            }}
          >
            <Download size={14} /> {pdfLoading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #E2E8F0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
              <th style={{ ...TH, textAlign: "left", width: 200, paddingLeft: 16 }}>SITE</th>
              {weekDates.map((d, i) => (
                <th key={i} style={{ ...TH, width: 52, color: d > today ? "#CBD5E1" : "#64748B" }}>
                  {weekDays[i].split(" ")[0].toUpperCase()}
                </th>
              ))}
              <th style={{ ...TH, width: 80 }}>TOOLBOX</th>
              <th style={{ ...TH, width: 100 }}>INDUCTIONS</th>
              <th style={{ ...TH, width: 60 }}>DOCS</th>
              <th style={{ ...TH, textAlign: "left", minWidth: 180, paddingLeft: 12 }}>NOTES</th>
              <th style={{ ...TH, width: 110 }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, si) => (
              <tr
                key={site.siteReference}
                style={{ borderBottom: "1px solid #F1F5F9", background: si % 2 === 0 ? "#FFFFFF" : "#FAFAFA" }}
              >
                {/* Site */}
                <td style={{ ...TD, paddingLeft: 16, fontWeight: 700, color: "#0F172A", fontSize: 13 }}>
                  {site.siteName}
                </td>

                {/* Day columns */}
                {DAY_KEYS.map((k, i) => (
                  <td key={k} style={{ ...TD, textAlign: "center" }}>
                    <DayCell val={weekDates[i] > today ? null : (site.prestart[k] ?? null)} />
                  </td>
                ))}

                {/* Toolbox */}
                <td style={{ ...TD, textAlign: "center" }}>
                  {site.toolbox
                    ? <span style={{ color: "#16A34A", fontWeight: 700, fontSize: 16 }}>✓</span>
                    : <span style={{ color: "#DC2626", fontWeight: 700, fontSize: 16 }}>✗</span>
                  }
                </td>

                {/* Pending inductions */}
                <td style={{ ...TD, textAlign: "center", color: site.pendingInductions > 0 ? "#D97706" : "#0F172A", fontWeight: site.pendingInductions > 0 ? 700 : 400 }}>
                  {site.pendingInductions}
                </td>

                {/* Pending docs */}
                <td style={{ ...TD, textAlign: "center", color: site.pendingDocs > 0 ? "#D97706" : "#0F172A", fontWeight: site.pendingDocs > 0 ? 700 : 400 }}>
                  {site.pendingDocs}
                </td>

                {/* Notes */}
                <td style={{ ...TD, paddingLeft: 12 }}>
                  <input
                    type="text"
                    value={notes[site.siteReference] ?? ""}
                    placeholder="Add note..."
                    onChange={e => handleNotesChange(site.siteReference, e.target.value)}
                    onBlur={e => handleNotesBlur(site.siteReference, e.target.value)}
                    style={{
                      width: "100%", border: "none", background: "transparent",
                      fontSize: 13, color: "#475569", padding: "4px 0",
                      outline: "none", cursor: "text",
                    }}
                    onFocus={e => {
                      e.currentTarget.style.background    = "#F1F5F9";
                      e.currentTarget.style.padding       = "4px 8px";
                      e.currentTarget.style.borderRadius  = "6px";
                    }}
                    onBlurCapture={e => {
                      e.currentTarget.style.background   = "transparent";
                      e.currentTarget.style.padding      = "4px 0";
                      e.currentTarget.style.borderRadius = "0";
                    }}
                  />
                </td>

                {/* Status */}
                <td style={{ ...TD, textAlign: "center" }}>
                  <span style={{
                    display:      "inline-block",
                    padding:      "3px 10px",
                    borderRadius: 20,
                    fontSize:     12,
                    fontWeight:   600,
                    background:   site.status === "On Track" ? "#DCFCE7" : "#FEE2E2",
                    color:        site.status === "On Track" ? "#16A34A" : "#DC2626",
                    whiteSpace:   "nowrap",
                  }}>
                    {site.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sites.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#94A3B8", fontSize: 14 }}>
          No sites found for this company in Breadcrumb.
        </div>
      )}
    </div>
  );
}

const TH: React.CSSProperties = {
  padding:       "10px 8px",
  fontSize:      11,
  fontWeight:    700,
  color:         "#64748B",
  textAlign:     "center",
  letterSpacing: "0.05em",
  userSelect:    "none",
};

const TD: React.CSSProperties = {
  padding: "9px 8px",
};
