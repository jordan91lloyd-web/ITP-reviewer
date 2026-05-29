"use client";

// ─── ResourcingTab ────────────────────────────────────────────────────────────
// Programme-aligned subcontractor matrix.
// ROWS = projects · COLUMNS = construction stages (fixed order)
// Each row's stage cells are independently drag-to-scroll.
// Snapping on mouseup sets current stage for that project.
// TODAY line is fixed at PROJ_W + 2 * STAGE_W = 440px.

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

const STAGE_W      = 130;                        // px per stage column
const PROJ_W       = 180;                        // px sticky project column
const TODAY_OFFSET = 2;                          // stages from scroll-area left edge to TODAY line
const TODAY_LINE   = PROJ_W + TODAY_OFFSET * STAGE_W; // 440px from table-area left
const DEFAULT_IDX  = 5;                          // "Structure" — default stage when no saved offset

// ── Types ──────────────────────────────────────────────────────────────────────

interface Commitment {
  id: string; title: string; vendor_name: string; status: string; value: number;
}
interface Props {
  company_id: string | number | null;
  projects: Array<{ id: number; name: string; display_name?: string; is_hidden?: boolean }>;
}
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
  const [loading, setLoading]         = useState(false);
  const [loadingName, setLoadingName] = useState("");
  const [loadingIdx, setLoadingIdx]   = useState(0);
  const [loaded, setLoaded]           = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [stageMap, setStageMap]       = useState<StageMap>({});
  const [hiddenIds, setHiddenIds]     = useState<Set<string>>(new Set());
  const [manageOpen, setManageOpen]   = useState(false);
  const [expanded, setExpanded]       = useState<Set<string>>(new Set());
  // stageIndices[pid] = current stage index (0–21), used for cell shading + "Currently:" label
  const [stageIndices, setStageIndices] = useState<Record<string, number>>({});

  // Refs that don't need to trigger re-renders
  const rowScrollRefs  = useRef<Map<string, HTMLDivElement>>(new Map());
  const dragState      = useRef<Map<string, { isDown: boolean; startX: number; scrollStart: number }>>(new Map());
  const saveDebounce   = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const scrollsSetRef  = useRef(false);
  const stageIndicesRef = useRef<Record<string, number>>({});
  stageIndicesRef.current = stageIndices; // always current, no closure staleness

  // ── Load saved offsets on mount ──────────────────────────────────────────────
  useEffect(() => {
    if (!company_id) return;
    fetch(`/api/resourcing/project-offsets?company_id=${company_id}`)
      .then(r => r.ok ? r.json() : {})
      .then((data: Record<string, string>) => {
        const si: Record<string, number> = {};
        for (const [pid, stageName] of Object.entries(data)) {
          const idx = STAGES.indexOf(stageName as Stage);
          si[pid] = idx >= 0 ? idx : DEFAULT_IDX;
        }
        setStageIndices(si);
      })
      .catch(() => {});
  }, [company_id]);

  // ── Set initial scroll positions after data loads ───────────────────────────
  // Runs when loaded→true OR when stageIndices first arrives (whichever is later).
  // scrollsSetRef prevents re-running on every drag update.
  useEffect(() => {
    if (!loaded) { scrollsSetRef.current = false; return; }
    if (scrollsSetRef.current) return;
    const t = setTimeout(() => {
      const si = stageIndicesRef.current;
      for (const [pid, el] of rowScrollRefs.current) {
        const stageIdx = si[pid] ?? DEFAULT_IDX;
        el.scrollLeft = Math.max(0, (stageIdx - TODAY_OFFSET) * STAGE_W);
      }
      scrollsSetRef.current = true;
    }, 50);
    return () => clearTimeout(t);
  }, [loaded, stageIndices]); // stageIndices dep handles: offsets arrive after load

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

  // ── Drag-to-scroll handlers ──────────────────────────────────────────────────

  function handleMouseDown(pid: string, e: React.MouseEvent<HTMLDivElement>) {
    dragState.current.set(pid, {
      isDown: true,
      startX: e.pageX,
      scrollStart: e.currentTarget.scrollLeft,
    });
    e.currentTarget.style.cursor = "grabbing";
    e.currentTarget.style.userSelect = "none";
  }

  function handleMouseMove(pid: string, e: React.MouseEvent<HTMLDivElement>) {
    const state = dragState.current.get(pid);
    if (!state?.isDown) return;
    e.preventDefault();
    const el = e.currentTarget;
    el.scrollLeft = state.scrollStart - (e.pageX - state.startX);
    // Update current stage live so cell shading responds during drag
    const idx = Math.min(
      Math.max(Math.round(el.scrollLeft / STAGE_W) + TODAY_OFFSET, 0),
      STAGES.length - 1,
    );
    setStageIndices(prev => ({ ...prev, [pid]: idx }));
  }

  function finishDrag(pid: string, el: HTMLDivElement) {
    if (!dragState.current.has(pid)) return;
    dragState.current.delete(pid);
    el.style.cursor = "grab";
    el.style.userSelect = "";
    // Snap to nearest stage column boundary
    const snapScrollIdx = Math.round(el.scrollLeft / STAGE_W);
    el.scrollTo({ left: snapScrollIdx * STAGE_W, behavior: "smooth" });
    const currentIdx = Math.min(snapScrollIdx + TODAY_OFFSET, STAGES.length - 1);
    setStageIndices(prev => ({ ...prev, [pid]: currentIdx }));
    // Debounce save to Supabase
    clearTimeout(saveDebounce.current[pid]);
    saveDebounce.current[pid] = setTimeout(() => {
      if (!company_id) return;
      void fetch("/api/resourcing/project-offset", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id: String(company_id),
          project_id: pid,
          current_stage: STAGES[currentIdx],
        }),
      });
    }, 500);
  }

  function handleMouseUp(pid: string, e: React.MouseEvent<HTMLDivElement>) {
    finishDrag(pid, e.currentTarget);
  }

  function handleMouseLeave(pid: string, e: React.MouseEvent<HTMLDivElement>) {
    const state = dragState.current.get(pid);
    if (state?.isDown) {
      finishDrag(pid, e.currentTarget);
    } else {
      e.currentTarget.style.cursor = "grab";
    }
  }

  // ── Load all project commitments ─────────────────────────────────────────────

  async function loadAll() {
    setLoading(true); setLoaded(false); setError(null);
    setStageMap({}); setExpanded(new Set());
    scrollsSetRef.current = false;
    const result: Record<string, Commitment[]> = {};
    try {
      for (let i = 0; i < visible.length; i++) {
        const p = visible[i];
        setLoadingName(p.display_name ?? p.name);
        setLoadingIdx(i + 1);
        try {
          const r = await fetch(`/api/resourcing/commitments?company_id=${company_id}&project_id=${p.id}`);
          result[String(p.id)] = r.ok
            ? ((await r.json() as { commitments?: Commitment[] }).commitments ?? [])
            : [];
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

  // ── Pre-load states ────────────────────────────────────────────────────────

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

  const HEADER_H   = 52;
  const ROW_MIN_H  = 64;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#FAFAFA" }}>

      {/* Hide scrollbars on row scroll containers */}
      <style>{`
        .rsc-row-scroll::-webkit-scrollbar { display: none; }
        .rsc-row-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

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
          padding: "8px 20px", background: "#fff", borderBottom: "1px solid #E5E7EB", fontSize: 12,
        }}>
          {redCount > 0 && (
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#EF4444", fontWeight: 600 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
              {redCount} conflict{redCount > 1 ? "s" : ""}
            </span>
          )}
          {redCount > 0 && amberCount > 0 && <span style={{ color: "#D1D5DB" }}>|</span>}
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
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

        {/* TODAY LINE — fixed absolute, spans full table height including header */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: TODAY_LINE,
            top: 0, bottom: 0, width: 0,
            borderLeft: "2px dashed #EF4444",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <span style={{
            position: "absolute", top: 6, left: 4,
            fontSize: 9, fontWeight: 700, color: "#EF4444",
            letterSpacing: "0.08em", textTransform: "uppercase",
            lineHeight: 1, background: "#FAFAFA",
            padding: "1px 3px", borderRadius: 3,
          }}>
            TODAY ▼
          </span>
        </div>

        {/* ── HEADER ROW — fixed, does not scroll ── */}
        <div style={{
          flexShrink: 0,
          display: "flex",
          height: HEADER_H,
          background: "#FAFAFA",
          borderBottom: "2px solid #E5E7EB",
          zIndex: 12,
        }}>
          {/* Project column label */}
          <div style={{
            width: PROJ_W, minWidth: PROJ_W, flexShrink: 0,
            borderRight: "1px solid #E5E7EB",
            display: "flex", alignItems: "flex-end",
            padding: "0 12px 8px 12px",
            fontSize: 11, fontWeight: 600, color: "#6B7280",
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}>
            PROJECT
          </div>
          {/* Stage headers — overflow hidden, never scroll */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ display: "flex", width: STAGES.length * STAGE_W }}>
              {STAGES.map(stage => (
                <div
                  key={stage}
                  style={{
                    width: STAGE_W, minWidth: STAGE_W, flexShrink: 0,
                    display: "flex", alignItems: "flex-end", justifyContent: "center",
                    padding: "0 4px 8px 4px",
                    borderRight: "1px solid #F3F4F6",
                    fontSize: 11, fontWeight: 500, color: "#6B7280",
                    letterSpacing: "0.04em", textTransform: "uppercase",
                    textAlign: "center", overflow: "hidden",
                  }}
                  title={stage}
                >
                  <span style={{ display: "block", lineHeight: 1.3 }}>{stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── DATA ROWS — vertically scrollable ── */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {visible.length === 0 ? (
            <div style={{ padding: "24px 20px", fontSize: 13, color: "#6B7280", fontStyle: "italic" }}>
              No projects visible. Use Manage to show projects.
            </div>
          ) : (
            visible.map((proj, rowIdx) => {
              const pid        = String(proj.id);
              const currentIdx = stageIndices[pid] ?? DEFAULT_IDX;
              const rowBg      = rowIdx % 2 === 0 ? "#ffffff" : "#FAFAFA";

              return (
                <div key={proj.id} style={{ display: "flex", borderBottom: "1px solid #E5E7EB" }}>

                  {/* Project name cell — outside scroll container, naturally fixed */}
                  <div style={{
                    width: PROJ_W, minWidth: PROJ_W, flexShrink: 0,
                    background: rowBg,
                    borderRight: "1px solid #E5E7EB",
                    padding: "10px 12px",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    minHeight: ROW_MIN_H,
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
                    <span style={{ fontSize: 10, color: "#9CA3AF", display: "block", marginTop: 3 }}>
                      Currently: {STAGES[Math.min(currentIdx, STAGES.length - 1)]}
                    </span>
                  </div>

                  {/* ── Drag-to-scroll stage cells ── */}
                  <div
                    className="rsc-row-scroll"
                    ref={el => {
                      if (el) rowScrollRefs.current.set(pid, el);
                      else rowScrollRefs.current.delete(pid);
                    }}
                    style={{ flex: 1, overflowX: "scroll", cursor: "grab" }}
                    onMouseDown={e => handleMouseDown(pid, e)}
                    onMouseMove={e => handleMouseMove(pid, e)}
                    onMouseUp={e => handleMouseUp(pid, e)}
                    onMouseLeave={e => handleMouseLeave(pid, e)}
                  >
                    <div style={{ display: "flex", width: STAGES.length * STAGE_W }}>
                      {STAGES.map((stage, stageIdx) => {
                        const vendors    = stageMap[stage]?.[pid] ?? [];
                        const counts     = vcByStage[stage];
                        const maxC       = vendors.length
                          ? Math.max(...vendors.map(v => counts.get(v) ?? 1))
                          : 1;
                        const cellKey    = `${pid}:${stage}`;
                        const isExpanded = expanded.has(cellKey);
                        const isCurrent  = stageIdx === currentIdx;
                        const isPast     = stageIdx < currentIdx;

                        // Cell background: conflict overrides past/future shading
                        let bg:   string = isPast ? "#F3F4F6" : "#ffffff";
                        let text: string = isPast ? "#9CA3AF" : "#111827";
                        let fw:   number = 400;
                        if (vendors.length > 0) {
                          if      (maxC >= 4) { bg = "#FEE2E2"; text = "#991B1B"; fw = 600; }
                          else if (maxC === 3) { bg = "#FEF3C7"; text = "#92400E"; }
                          else if (isPast)    { bg = "#F3F4F6"; text = "#9CA3AF"; }
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
                              borderLeft:  isCurrent ? "3px solid #EF4444" : "none",
                              borderRight: "1px solid #F3F4F6",
                              padding: "8px",
                              position: "relative",
                              minHeight: ROW_MIN_H,
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
                              <div style={{
                                display: "flex", flexDirection: "column", gap: 2,
                                marginTop: isCurrent ? 10 : 0,
                              }}>
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
                  </div>
                </div>
              );
            })
          )}
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
            <div style={{ overflowY: "auto", flex: 1 }}>
              {allProjects.map(proj => {
                const pid    = String(proj.id);
                const hidden = hiddenIds.has(pid);
                return (
                  <div
                    key={pid}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 20px", borderBottom: "1px solid #F3F4F6", cursor: "pointer",
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
