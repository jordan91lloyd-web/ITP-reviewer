"use client";

// ─── ResourcingTab ────────────────────────────────────────────────────────────
// Programme-aligned subcontractor matrix.
// ROWS = projects · COLUMNS = construction stages (fixed order)
// Each row has a slider (0–21) that records the project's current stage and
// scrolls the shared viewport so that stage sits under the TODAY line.

import { useState, useEffect, useRef } from "react";
import { RefreshCw, Settings, X, Eye, EyeOff } from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────────

const STAGES = [
  "Demolition",
  "Excavation",
  "Piling & Retention",
  "In-Ground Services",
  "Basement Construction",
  "Structure",
  "Facade & Windows",
  "Roofing",
  "Services Rough-In",
  "Partitions & Framing",
  "Sheeting",
  "Waterproofing",
  "Tiling",
  "Joinery",
  "Ceilings",
  "Painting",
  "Flooring",
  "Services Fit-Off",
  "Fixtures & Appliances",
  "External Works",
  "Testing & Commissioning",
  "Defects & Handover",
] as const;
type Stage = (typeof STAGES)[number];

const STAGE_W    = 130;   // px — width of each stage column
const PROJ_W     = 180;   // px — width of the sticky project + slider column
const TODAY_IDX  = 5;     // "Structure" — default centre point
const TODAY_LEFT = PROJ_W + TODAY_IDX * STAGE_W; // 830px from left of table area

// ── Types ──────────────────────────────────────────────────────────────────────

interface Commitment {
  id: string; title: string; vendor_name: string; status: string; value: number;
}
interface Props {
  company_id: string | number | null;
  projects: Array<{ id: number; name: string; display_name?: string; is_hidden?: boolean }>;
}
// stageMap[stage][project_id] = vendor names[]
type StageMap = Record<string, Record<string, string[]>>;

// ── Helpers ────────────────────────────────────────────────────────────────────

function shortName(name: string): string {
  return name
    .replace(/\s*[-–]\s*(stage|lot|package)\s*\d+.*$/i, "")
    .replace(/\bpty\.?\s*ltd\.?\b/gi, "")
    .replace(/\bno\.\s*\d+\b/gi, "")
    .trim().replace(/\s+/g, " ").slice(0, 22);
}

function trunc(s: string, n = 18): string {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

async function classifyStages(
  items: Array<{ id: string; title: string }>,
): Promise<Record<string, string>> {
  if (!items.length) return {};
  const res = await fetch("/api/resourcing/classify", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const d = await res.json() as { classifications?: Record<string, string> };
  return d.classifications ?? {};
}

function vendorCounts(stage: string, stageMap: StageMap): Map<string, number> {
  const m = new Map<string, number>();
  for (const vs of Object.values(stageMap[stage] ?? {}))
    for (const v of vs) m.set(v, (m.get(v) ?? 0) + 1);
  return m;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function ResourcingTab({ company_id, projects }: Props) {
  const [loading, setLoading]           = useState(false);
  const [loadingName, setLoadingName]   = useState("");
  const [loadingIdx, setLoadingIdx]     = useState(0);
  const [loaded, setLoaded]             = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [stageMap, setStageMap]         = useState<StageMap>({});
  const [hiddenIds, setHiddenIds]       = useState<Set<string>>(new Set());
  const [manageOpen, setManageOpen]     = useState(false);
  const [expanded, setExpanded]         = useState<Set<string>>(new Set());
  // sliderValues[project_id] = stage index (0–21)
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});

  const scrollRef  = useRef<HTMLDivElement>(null);
  const debounce   = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // ── Load saved offsets on mount ──────────────────────────────────────────────
  useEffect(() => {
    if (!company_id) return;
    fetch(`/api/resourcing/project-offsets?company_id=${company_id}`)
      .then(r => r.ok ? r.json() : {})
      .then((data: Record<string, string>) => {
        const sv: Record<string, number> = {};
        for (const [pid, stageName] of Object.entries(data)) {
          const idx = STAGES.indexOf(stageName as Stage);
          sv[pid] = idx >= 0 ? idx : TODAY_IDX;
        }
        setSliderValues(sv);
      })
      .catch(() => {});
  }, [company_id]);

  const allProjects = projects
    .slice()
    .sort((a, b) => shortName(a.display_name ?? a.name).localeCompare(shortName(b.display_name ?? b.name)));

  const visible = allProjects.filter(p => !hiddenIds.has(String(p.id)));

  function toggleHide(id: string) {
    setHiddenIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function toggleExpand(pid: string, stage: string) {
    const k = `${pid}:${stage}`;
    setExpanded(prev => { const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n; });
  }

  function handleSlider(pid: string, val: number) {
    setSliderValues(prev => ({ ...prev, [pid]: val }));
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = Math.max(0, (val - TODAY_IDX) * STAGE_W);
    }
    // Debounce save
    if (debounce.current[pid]) clearTimeout(debounce.current[pid]);
    debounce.current[pid] = setTimeout(() => {
      void fetch("/api/resourcing/project-offset", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id: String(company_id),
          project_id: pid,
          current_stage: STAGES[val],
        }),
      });
    }, 500);
  }

  async function loadAll() {
    setLoading(true); setLoaded(false); setError(null);
    setStageMap({}); setExpanded(new Set());
    const result: Record<string, Commitment[]> = {};
    try {
      for (let i = 0; i < visible.length; i++) {
        const p = visible[i];
        setLoadingName(p.display_name ?? p.name);
        setLoadingIdx(i + 1);
        try {
          const r = await fetch(`/api/resourcing/commitments?company_id=${company_id}&project_id=${p.id}`);
          result[String(p.id)] = r.ok ? ((await r.json() as { commitments?: Commitment[] }).commitments ?? []) : [];
        } catch { result[String(p.id)] = []; }
        if (i < visible.length - 1) await new Promise(r => setTimeout(r, 500));
      }
      const allItems = Object.values(result).flat()
        .filter((c, i, a) => a.findIndex(x => x.id === c.id) === i)
        .map(c => ({ id: c.id, title: c.title }));
      const cls = await classifyStages(allItems);
      const map: StageMap = {};
      for (const [pid, cs] of Object.entries(result)) {
        for (const c of cs) {
          const stage = cls[c.id] ?? "Other";
          if (!map[stage]) map[stage] = {};
          if (!map[stage][pid]) map[stage][pid] = [];
          if (c.vendor_name && !map[stage][pid].includes(c.vendor_name)) map[stage][pid].push(c.vendor_name);
        }
      }
      setStageMap(map); setLoaded(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }

  // ── Conflict counts ────────────────────────────────────────────────────────
  function conflictCounts() {
    let red = 0, amber = 0;
    for (const s of STAGES) for (const c of vendorCounts(s, stageMap).values()) {
      if (c >= 4) red++; else if (c === 3) amber++;
    }
    return { red, amber };
  }
  const { red: redCount, amber: amberCount } = loaded ? conflictCounts() : { red: 0, amber: 0 };

  // ── Pre-load state ────────────────────────────────────────────────────────
  if (!company_id) return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>
      <p style={{ fontSize: 14, fontStyle: "italic" }}>Select a company to view resourcing.</p>
    </div>
  );

  if (!loading && !loaded) {
    const estSecs = Math.ceil(visible.length * 0.5);
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAFA" }}>
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB",
          padding: "40px 48px", maxWidth: 440, width: "100%", textAlign: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
            Resourcing
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
            Subcontractor Matrix
          </h2>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 28 }}>
            Fetches commitments across all <strong>{visible.length}</strong> projects.
            Takes ~{estSecs}s.
          </p>
          <button
            onClick={() => void loadAll()}
            style={{
              background: "#111827", color: "#fff", border: "none", borderRadius: 10,
              padding: "12px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer",
              width: "100%",
            }}
          >
            Load Data
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    const pct = visible.length > 0 ? Math.round((loadingIdx / visible.length) * 100) : 0;
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAFA" }}>
        <div style={{
          background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB",
          padding: "40px 48px", maxWidth: 440, width: "100%",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 6 }}>
            Loading commitments
          </p>
          <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 20 }}>
            {loadingName} — {loadingIdx} of {visible.length} projects
          </p>
          {/* Progress bar */}
          <div style={{ background: "#F3F4F6", borderRadius: 99, height: 6, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 99,
              width: `${pct}%`, background: "#111827",
              transition: "width 0.3s ease",
            }} />
          </div>
          <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 8, textAlign: "right" }}>{pct}%</p>
        </div>
      </div>
    );
  }

  if (error) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <p style={{ fontSize: 13, color: "#EF4444" }}>{error}</p>
      <button onClick={() => void loadAll()}
        style={{ fontSize: 12, padding: "8px 20px", borderRadius: 8, border: "1px solid #E5E7EB", cursor: "pointer", background: "#fff" }}>
        Retry
      </button>
    </div>
  );

  // ── Loaded ──────────────────────────────────────────────────────────────────

  const vcByStage: Record<string, Map<string, number>> = {};
  for (const s of STAGES) vcByStage[s] = vendorCounts(s, stageMap);

  const HEADER_H = 52; // px — height of sticky stage-name header row

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#FAFAFA" }}>

      {/* ── Top bar ── */}
      <div style={{
        flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", height: 52, background: "#fff", borderBottom: "1px solid #E5E7EB",
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>
          Subcontractor Matrix
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setManageOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 12, padding: "6px 14px", borderRadius: 8,
              border: "1px solid #E5E7EB", background: "#fff",
              color: "#374151", cursor: "pointer", fontWeight: 500,
            }}
          >
            <Settings size={13} /> Manage
          </button>
          <button
            onClick={() => void loadAll()}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 12, padding: "6px 14px", borderRadius: 8,
              border: "1px solid #E5E7EB", background: "#fff",
              color: "#374151", cursor: "pointer", fontWeight: 500,
            }}
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {/* ── Conflict summary bar ── */}
      {(redCount > 0 || amberCount > 0) && (
        <div style={{
          flexShrink: 0, display: "flex", alignItems: "center", gap: 16,
          padding: "8px 20px", background: "#fff", borderBottom: "1px solid #E5E7EB",
          fontSize: 12,
        }}>
          {redCount > 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#EF4444", fontWeight: 600 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
              {redCount} conflict{redCount > 1 ? "s" : ""}
            </span>
          )}
          {redCount > 0 && amberCount > 0 && (
            <span style={{ color: "#D1D5DB" }}>|</span>
          )}
          {amberCount > 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#F59E0B", fontWeight: 500 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
              {amberCount} watch
            </span>
          )}
          <span style={{ color: "#D1D5DB", marginLeft: 4, fontWeight: 400 }}>
            — same contractor across {redCount > 0 ? "4+" : "3"} projects in same stage
          </span>
        </div>
      )}

      {/* ── Table area ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {/* TODAY LINE — fixed in table area, does not scroll */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: TODAY_LEFT,
            top: 0,
            bottom: 0,
            width: 0,
            borderLeft: "2px dashed #EF4444",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <span style={{
            position: "absolute",
            top: 6,
            left: 4,
            fontSize: 9,
            fontWeight: 700,
            color: "#EF4444",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1,
            background: "#FAFAFA",
            padding: "1px 3px",
            borderRadius: 3,
          }}>
            TODAY
          </span>
        </div>

        {/* Shared scroll container */}
        <div
          ref={scrollRef}
          style={{ overflow: "auto", height: "100%", position: "relative" }}
        >
          {/* Inner width = project col + all stage cols */}
          <div style={{ width: PROJ_W + STAGES.length * STAGE_W, minWidth: "max-content" }}>

            {/* ── STICKY HEADER ROW ── */}
            <div style={{
              display: "flex",
              position: "sticky",
              top: 0,
              zIndex: 12,
              height: HEADER_H,
              background: "#FAFAFA",
              borderBottom: "2px solid #E5E7EB",
            }}>
              {/* Project column label */}
              <div style={{
                width: PROJ_W, minWidth: PROJ_W, flexShrink: 0,
                position: "sticky", left: 0, zIndex: 13,
                background: "#FAFAFA",
                borderRight: "1px solid #E5E7EB",
                display: "flex", alignItems: "flex-end",
                padding: "0 12px 8px 12px",
                fontSize: 11, fontWeight: 600, color: "#6B7280",
                letterSpacing: "0.05em", textTransform: "uppercase",
              }}>
                PROJECT
              </div>

              {/* Stage column headers */}
              {STAGES.map(stage => (
                <div
                  key={stage}
                  style={{
                    width: STAGE_W, minWidth: STAGE_W, flexShrink: 0,
                    display: "flex", alignItems: "flex-end", justifyContent: "center",
                    padding: "0 4px 8px 4px",
                    borderRight: "1px solid #F3F4F6",
                    fontSize: 11, fontWeight: 500, color: "#6B7280",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                  title={stage}
                >
                  <span style={{ display: "block", lineHeight: 1.3 }}>{stage}</span>
                </div>
              ))}
            </div>

            {/* ── DATA ROWS ── */}
            {visible.length === 0 ? (
              <div style={{ padding: "24px 20px", fontSize: 13, color: "#6B7280", fontStyle: "italic" }}>
                No projects visible. Use Manage to show projects.
              </div>
            ) : (
              visible.map((proj, rowIdx) => {
                const pid       = String(proj.id);
                const sliderVal = sliderValues[pid] ?? TODAY_IDX;
                const rowBg     = rowIdx % 2 === 0 ? "#ffffff" : "#FAFAFA";

                return (
                  <div
                    key={proj.id}
                    style={{ display: "flex", borderBottom: "1px solid #E5E7EB" }}
                  >
                    {/* ── Sticky left: project name + slider ── */}
                    <div style={{
                      width: PROJ_W, minWidth: PROJ_W, flexShrink: 0,
                      position: "sticky", left: 0, zIndex: 8,
                      background: rowBg,
                      borderRight: "1px solid #E5E7EB",
                      padding: "10px 12px",
                      display: "flex", flexDirection: "column", justifyContent: "space-between",
                      minHeight: 72,
                    }}>
                      <span
                        style={{
                          fontSize: 13, fontWeight: 600, color: "#111827",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          display: "block",
                        }}
                        title={proj.display_name ?? proj.name}
                      >
                        {shortName(proj.display_name ?? proj.name)}
                      </span>
                      <div>
                        <span style={{ fontSize: 10, color: "#9CA3AF", display: "block", marginBottom: 2 }}>
                          {STAGES[sliderVal]}
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={STAGES.length - 1}
                          value={sliderVal}
                          onChange={e => handleSlider(pid, Number(e.target.value))}
                          style={{ width: "100%", height: 3, cursor: "pointer", accentColor: "#EF4444" }}
                        />
                      </div>
                    </div>

                    {/* ── Stage cells ── */}
                    {STAGES.map((stage, stageIdx) => {
                      const vendors  = stageMap[stage]?.[pid] ?? [];
                      const counts   = vcByStage[stage];
                      const maxC     = vendors.length
                        ? Math.max(...vendors.map(v => counts.get(v) ?? 1))
                        : 1;
                      const cellKey  = `${pid}:${stage}`;
                      const isExpanded = expanded.has(cellKey);

                      // Programme position
                      const isCurrent = stageIdx === sliderVal;
                      const isPast    = stageIdx < sliderVal;

                      // Background: conflict overrides past/future
                      let bg   = isPast ? "#F9FAFB" : "#ffffff";
                      let text = isPast ? "#9CA3AF" : "#374151";
                      let fw: number = 400;
                      if (vendors.length > 0) {
                        if      (maxC >= 4) { bg = "#FEE2E2"; text = "#991B1B"; fw = 600; }
                        else if (maxC === 3) { bg = "#FEF3C7"; text = "#92400E"; }
                        else if (isPast)    { bg = "#F9FAFB"; text = "#9CA3AF"; }
                        else               { bg = "#ffffff"; }
                      }

                      const display  = [...vendors].sort((a, b) => a.localeCompare(b));
                      const shown    = isExpanded ? display : display.slice(0, 2);
                      const overflow = display.length - 2;

                      return (
                        <div
                          key={stage}
                          style={{
                            width: STAGE_W, minWidth: STAGE_W, flexShrink: 0,
                            background: bg,
                            borderLeft: isCurrent ? "3px solid #EF4444" : "1px solid #F3F4F6",
                            padding: "8px",
                            verticalAlign: "top",
                            position: "relative",
                            minHeight: 72,
                            boxSizing: "border-box",
                          }}
                        >
                          {/* Current stage marker */}
                          {isCurrent && (
                            <span style={{
                              position: "absolute", top: 2, left: "50%",
                              transform: "translateX(-50%)",
                              fontSize: 8, color: "#EF4444",
                              lineHeight: 1, userSelect: "none",
                            }}>▼</span>
                          )}

                          {vendors.length > 0 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: isCurrent ? 10 : 0 }}>
                              {shown.map(v => {
                                const vc = counts.get(v) ?? 1;
                                return (
                                  <span
                                    key={v}
                                    title={v}
                                    style={{
                                      display: "block", fontSize: 11,
                                      color: text, fontWeight: fw, lineHeight: 1.35,
                                      overflow: "hidden", textOverflow: "ellipsis",
                                      whiteSpace: "nowrap", maxWidth: STAGE_W - 16,
                                    }}
                                  >
                                    {vc === 2 && <span style={{ color: "#F59E0B", marginRight: 2 }}>•</span>}
                                    {trunc(v)}
                                  </span>
                                );
                              })}
                              {!isExpanded && overflow > 0 && (
                                <button
                                  onClick={() => toggleExpand(pid, stage)}
                                  style={{
                                    background: "none", border: "none", padding: 0,
                                    cursor: "pointer", fontSize: 10, color: "#9CA3AF",
                                    fontStyle: "italic", textAlign: "left",
                                  }}
                                >+{overflow} more</button>
                              )}
                              {isExpanded && display.length > 2 && (
                                <button
                                  onClick={() => toggleExpand(pid, stage)}
                                  style={{
                                    background: "none", border: "none", padding: 0,
                                    cursor: "pointer", fontSize: 10, color: "#9CA3AF",
                                    fontStyle: "italic", textAlign: "left",
                                  }}
                                >show less</button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}

          </div>
        </div>
      </div>

      {/* ── Manage Projects Modal ── */}
      {manageOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setManageOpen(false)}
        >
          <div
            style={{
              background: "#fff", borderRadius: 16,
              border: "1px solid #E5E7EB",
              width: 360, maxHeight: "70vh",
              display: "flex", flexDirection: "column",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px", borderBottom: "1px solid #E5E7EB", flexShrink: 0,
            }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#111827" }}>
                Manage Projects
              </h3>
              <button
                onClick={() => setManageOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4 }}
              >
                <X size={16} />
              </button>
            </div>
            {/* Project list */}
            <div style={{ overflowY: "auto", flex: 1 }}>
              {allProjects.map(proj => {
                const pid    = String(proj.id);
                const hidden = hiddenIds.has(pid);
                return (
                  <div
                    key={pid}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 20px", borderBottom: "1px solid #F3F4F6",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleHide(pid)}
                  >
                    <span style={{ fontSize: 13, color: hidden ? "#9CA3AF" : "#111827", fontWeight: hidden ? 400 : 500 }}>
                      {shortName(proj.display_name ?? proj.name)}
                    </span>
                    <span style={{ color: hidden ? "#D1D5DB" : "#10B981", flexShrink: 0 }}>
                      {hidden ? <EyeOff size={15} /> : <Eye size={15} />}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Footer */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid #E5E7EB", flexShrink: 0 }}>
              <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF", textAlign: "center" }}>
                {hiddenIds.size > 0
                  ? `${hiddenIds.size} project${hiddenIds.size > 1 ? "s" : ""} hidden`
                  : "All projects visible"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
