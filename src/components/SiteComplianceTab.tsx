"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RefreshCw, Download, Settings, X } from "lucide-react";

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
  const [data,           setData]           = useState<ComplianceData | null>(null);
  const [loading,        setLoading]        = useState(true);
  const [notes,          setNotes]          = useState<Record<string, string>>({});
  const [pdfLoading,     setPdfLoading]     = useState(false);
  const [hiddenSites,    setHiddenSites]    = useState<Set<string>>(new Set());
  const [manageOpen,     setManageOpen]     = useState(false);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [complianceRes, hiddenRes] = await Promise.all([
        fetch(`/api/breadcrumb/compliance-data?company_id=${companyId}`),
        fetch(`/api/breadcrumb/hidden-sites?company_id=${companyId}`),
      ]);
      const json   = (await complianceRes.json()) as ComplianceData;
      const hidden = (await hiddenRes.json()) as { hidden: string[] };
      setData(json);
      setHiddenSites(new Set(hidden.hidden ?? []));
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

  async function toggleHideSite(siteReference: string) {
    const isHidden = hiddenSites.has(siteReference);
    // Optimistic update
    setHiddenSites(prev => {
      const next = new Set(prev);
      if (isHidden) next.delete(siteReference); else next.add(siteReference);
      return next;
    });
    await fetch("/api/breadcrumb/hidden-sites", {
      method:  isHidden ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ company_id: companyId, site_reference: siteReference }),
    });
  }

  async function downloadPdf() {
    if (!data) return;
    setPdfLoading(true);
    try {
      // Pass only visible sites to the PDF
      const visibleData: ComplianceData = {
        ...data,
        sites: data.sites.filter(s => !hiddenSites.has(s.siteReference)),
      };
      const res  = await fetch("/api/breadcrumb/compliance-pdf", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ data: visibleData, companyName: "Fleek Constructions" }),
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
    const bg = val === null ? "#E5E7EB" : val ? "#16A34A" : "#DC2626";
    return <div style={{ width: 10, height: 10, borderRadius: "50%", background: bg, margin: "0 auto" }} />;
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
  const visibleSites = sites.filter(s => !hiddenSites.has(s.siteReference));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", margin: 0 }}>Site Compliance</h2>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>
            Week of {fmtWeekLabel(weekStart)}
            {sites.length > 0 && (
              <span style={{ marginLeft: 10, color: "#94A3B8" }}>
                Showing {visibleSites.length} of {sites.length} sites
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setManageOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", background: "#F1F5F9",
              border: "1px solid #E2E8F0", borderRadius: 8,
              cursor: "pointer", fontSize: 13, color: "#475569",
            }}
          >
            <Settings size={14} /> Manage Sites
          </button>
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

      {/* Scrollable table */}
      <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "calc(100vh - 200px)", borderRadius: 10, border: "1px solid #E2E8F0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 10, background: "#F8FAFC" }}>
            <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
              <th style={{ ...TH, textAlign: "left", width: 200, paddingLeft: 16 }}>SITE</th>
              {weekDates.map((d, i) => (
                <th key={i} style={{ ...TH, width: 44, color: d > today ? "#CBD5E1" : "#64748B", ...(i === 4 ? { borderRight: "2px solid #F1F5F9" } : {}) }}>
                  {weekDays[i].split(" ")[0].toUpperCase()}
                </th>
              ))}
              <th style={{ ...TH, width: 64 }}>SCORE</th>
              <th style={{ ...TH, width: 80 }}>TOOLBOX</th>
              <th style={{ ...TH, width: 100 }}>INDUCTIONS</th>
              <th style={{ ...TH, width: 60 }}>DOCS</th>
              <th style={{ ...TH, textAlign: "left", minWidth: 180, paddingLeft: 12 }}>NOTES</th>
              <th style={{ ...TH, width: 110 }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {visibleSites.map((site, si) => (
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
                  <td key={k} style={{ ...TD, textAlign: "center", ...(i === 4 ? { borderRight: "2px solid #F1F5F9" } : {}) }}>
                    <DayCell val={weekDates[i] > today ? null : (site.prestart[k] ?? null)} />
                  </td>
                ))}

                {/* Score */}
                {(() => {
                  const y = weekDates.filter(d => d <= today).length;
                  const x = DAY_KEYS.filter((k, i) => weekDates[i] <= today && site.prestart[k] === true).length;
                  const color = y === 0 ? "#94A3B8" : x === y ? "#16A34A" : x >= Math.ceil(y / 2) ? "#D97706" : "#DC2626";
                  return (
                    <td style={{ ...TD, textAlign: "center", fontSize: 14, fontWeight: 700, color }}>
                      {y === 0 ? "–" : `${x}/${y}`}
                    </td>
                  );
                })()}

                {/* Toolbox */}
                <td style={{ ...TD, textAlign: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: site.toolbox ? "#16A34A" : "#DC2626", margin: "0 auto" }} />
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

      {visibleSites.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#94A3B8", fontSize: 14 }}>
          {sites.length === 0
            ? "No sites found for this company in Breadcrumb."
            : "All sites are hidden. Use Manage Sites to show them."}
        </div>
      )}

      {/* Manage Sites modal */}
      {manageOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={e => { if (e.target === e.currentTarget) setManageOpen(false); }}
        >
          <div style={{
            background: "#FFFFFF", borderRadius: 12, width: 480,
            maxHeight: "80vh", display: "flex", flexDirection: "column",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}>
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #E2E8F0" }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Manage Sites</h3>
              <button
                onClick={() => setManageOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 4 }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Site list */}
            <div style={{ overflowY: "auto", flex: 1, padding: "8px 0" }}>
              {sites.length === 0 && (
                <div style={{ padding: "24px", color: "#94A3B8", fontSize: 14, textAlign: "center" }}>
                  No sites available.
                </div>
              )}
              {sites.map(site => {
                const hidden = hiddenSites.has(site.siteReference);
                return (
                  <div
                    key={site.siteReference}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 24px",
                      opacity: hidden ? 0.45 : 1,
                      borderBottom: "1px solid #F8FAFC",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{site.siteName}</div>
                      <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{site.siteReference}</div>
                    </div>
                    {/* Toggle */}
                    <button
                      onClick={() => void toggleHideSite(site.siteReference)}
                      style={{
                        width: 44, height: 24, borderRadius: 12, border: "none",
                        cursor: "pointer", position: "relative", flexShrink: 0,
                        background: hidden ? "#E2E8F0" : "#22C55E",
                        transition: "background 0.15s",
                      }}
                      title={hidden ? "Show site" : "Hide site"}
                    >
                      <span style={{
                        position: "absolute", top: 3,
                        left: hidden ? 3 : 23,
                        width: 18, height: 18, borderRadius: "50%",
                        background: "#FFFFFF",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        transition: "left 0.15s",
                      }} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Modal footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setManageOpen(false)}
                style={{
                  padding: "8px 20px", background: "#0F172A", border: "none",
                  borderRadius: 8, fontSize: 13, color: "#FFFFFF", cursor: "pointer",
                }}
              >
                Done
              </button>
            </div>
          </div>
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
  background:    "#F8FAFC",
};

const TD: React.CSSProperties = {
  padding: "9px 8px",
};
