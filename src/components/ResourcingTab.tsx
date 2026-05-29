"use client";

// ─── ResourcingTab ────────────────────────────────────────────────────────────
// Programme-aligned subcontractor matrix.
// ROWS = projects · COLUMNS = construction stages (fixed order)
// Each row's stage cells are independently drag-to-scroll.
// Snapping on mouseup sets current stage for that project.
// TODAY line is fixed at PROJ_W + 2 * STAGE_W = 440px.
// No shared header row — stage name is shown inside each cell.

import { useState, useEffect, useRef } from "react";
import { RefreshCw, Settings, X } from "lucide-react";

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

const STAGE_W      = 130;
const PROJ_W       = 180;
const TODAY_OFFSET = 0;                          // TODAY line sits at left edge of scroll area
const TODAY_LINE   = PROJ_W + TODAY_OFFSET * STAGE_W; // 180px — right of project column
const DEFAULT_IDX  = 2;                          // default scrollLeft = 2*130 = 260 (Piling & Retention)

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
    .trim().replace(/\s+/g, " ").slice(0, 26);
}

function trunc(s: string, n = 16): string {
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

// vendorStageCount[vendorName][stageIndex] = number of projects with that vendor at that stage
function buildVendorStageCount(
  visiblePids: string[],
  map: StageMap,
): Record<string, Record<number, number>> {
  const vsc: Record<string, Record<number, number>> = {};
  for (const pid of visiblePids) {
    for (let i = 0; i < STAGES.length; i++) {
      for (const v of map[STAGES[i]]?.[pid] ?? []) {
        if (!vsc[v]) vsc[v] = {};
        vsc[v][i] = (vsc[v][i] ?? 0) + 1;
      }
    }
  }
  return vsc;
}

function getCellConflictLevel(
  pid: string,
  stageIndex: number,
  map: StageMap,
  vsc: Record<string, Record<number, number>>,
): 0 | 3 | 4 {
  const vendors = map[STAGES[stageIndex]]?.[pid] ?? [];
  let max = 0;
  for (const v of vendors) {
    const count = vsc[v]?.[stageIndex] ?? 0;
    if (count > max) max = count;
  }
  if (max >= 4) return 4;
  if (max >= 3) return 3;
  return 0;
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
  const [draggingRow, setDraggingRow]   = useState<string | null>(null);
  // stageIndices[pid] = current stage index (0–21)
  const [stageIndices, setStageIndices] = useState<Record<string, number>>({});

  const rowScrollRefs   = useRef<Map<string, HTMLDivElement>>(new Map());
  const dragState       = useRef<Map<string, { isDown: boolean; startX: number; scrollStart: number }>>(new Map());
  const saveDebounce    = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const scrollsSetRef   = useRef(false);
  const stageIndicesRef = useRef<Record<string, number>>({});
  stageIndicesRef.current = stageIndices;

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

  // ── Set initial scroll positions after data loads ────────────────────────────
  useEffect(() => {
    if (!loaded) { scrollsSetRef.current = false; return; }
    if (scrollsSetRef.current) return;
    const t = setTimeout(() => {
      const si = stageIndicesRef.current;
      for (const [pid, el] of rowScrollRefs.current) {
        const stageIdx = si[pid] ?? DEFAULT_IDX;
        el.scrollLeft = stageIdx * STAGE_W; // TODAY at left edge: scrollLeft = stageIdx * STAGE_W
      }
      scrollsSetRef.current = true;
    }, 50);
    return () => clearTimeout(t);
  }, [loaded, stageIndices]);

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

  // ── Drag-to-scroll ────────────────────────────────────────────────────────────

  function handleMouseDown(pid: string, e: React.MouseEvent<HTMLDivElement>) {
    dragState.current.set(pid, {
      isDown: true,
      startX: e.pageX,
      scrollStart: e.currentTarget.scrollLeft,
    });
    setDraggingRow(pid);
    e.currentTarget.style.cursor = "grabbing";
    e.currentTarget.style.userSelect = "none";
  }

  function handleMouseMove(pid: string, e: React.MouseEvent<HTMLDivElement>) {
    const state = dragState.current.get(pid);
    if (!state?.isDown) return;
    e.preventDefault();
    const el = e.currentTarget;
    el.scrollLeft = state.scrollStart - (e.pageX - state.startX);
    const idx = Math.min(
      Math.max(Math.round(el.scrollLeft / STAGE_W) + TODAY_OFFSET, 0),
      STAGES.length - 1,
    );
    setStageIndices(prev => ({ ...prev, [pid]: idx }));
  }

  function finishDrag(pid: string, el: HTMLDivElement) {
    if (!dragState.current.has(pid)) return;
    dragState.current.delete(pid);
    setDraggingRow(null);
    el.style.cursor = "grab";
    el.style.userSelect = "";
    const snapScrollIdx = Math.round(el.scrollLeft / STAGE_W);
    el.scrollTo({ left: snapScrollIdx * STAGE_W, behavior: "smooth" });
    const currentIdx = Math.min(snapScrollIdx + TODAY_OFFSET, STAGES.length - 1);
    setStageIndices(prev => ({ ...prev, [pid]: currentIdx }));
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
    if (state?.isDown) finishDrag(pid, e.currentTarget);
    else e.currentTarget.style.cursor = "grab";
  }

  // ── Load commitments ──────────────────────────────────────────────────────────

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

  const vsc = buildVendorStageCount(visible.map(p => String(p.id)), stageMap);

  function conflictCounts() {
    let red = 0, amber = 0;
    for (const stageCounts of Object.values(vsc))
      for (const count of Object.values(stageCounts))
        if (count >= 4) red++; else if (count >= 3) amber++;
    return { red, amber };
  }
  const { red: redCount, amber: amberCount } = loaded ? conflictCounts() : { red: 0, amber: 0 };

  // ── Pre-load states ────────────────────────────────────────────────────────

  if (!company_id) return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontSize: 14, color: "#64748B", fontStyle: "italic" }}>Select a company to view resourcing.</p>
    </div>
  );

  if (!loading && !loaded) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
        <div style={{
          background: "#fff", borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
          padding: "40px 44px", maxWidth: 360, width: "100%", textAlign: "center",
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: "0 0 8px 0" }}>
            Subcontractor Matrix
          </h2>
          <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 28px 0", lineHeight: 1.5 }}>
            Fetches live commitments across <strong style={{ color: "#0F172A" }}>{visible.length}</strong> projects
            and maps them to the construction programme.
          </p>
          <button
            onClick={() => void loadAll()}
            style={{
              background: "#0F172A", color: "#fff", border: "none", borderRadius: 10,
              padding: "11px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer",
              width: "100%", letterSpacing: "0.01em",
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
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
        <div style={{
          background: "#fff", borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
          padding: "40px 44px", maxWidth: 360, width: "100%",
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
            Subcontractor Matrix
          </h2>
          <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 24px 0" }}>
            Loading project {loadingIdx} of {visible.length}
          </p>
          {/* Progress bar */}
          <div style={{ background: "#E2E8F0", borderRadius: 99, height: 4, overflow: "hidden", marginBottom: 10 }}>
            <div style={{
              height: "100%", borderRadius: 99,
              width: `${pct}%`, background: "#6366F1",
              transition: "width 0.35s ease",
            }} />
          </div>
          <p style={{ fontSize: 13, color: "#94A3B8", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {loadingName}
          </p>
        </div>
      </div>
    );
  }

  if (error) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <p style={{ fontSize: 13, color: "#EF4444" }}>{error}</p>
      <button onClick={() => void loadAll()}
        style={{ fontSize: 12, padding: "8px 20px", borderRadius: 8, border: "1px solid #E2E8F0", cursor: "pointer", background: "#fff", color: "#475569" }}>
        Retry
      </button>
    </div>
  );

  // ── Loaded ──────────────────────────────────────────────────────────────────

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#F8FAFC" }}>

      {/* Hide scrollbars on row scroll containers */}
      <style>{`
        .rsc-row-scroll::-webkit-scrollbar { display: none; }
        .rsc-row-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .rsc-btn-ghost:hover { background: #F1F5F9 !important; }
        .rsc-more-btn:hover { text-decoration: underline; }
      `}</style>

      {/* ── Top bar ── */}
      <div style={{
        flexShrink: 0, display: "flex", alignItems: "center", gap: 12,
        padding: "0 20px", height: 56, background: "#fff",
        borderBottom: "1px solid #E2E8F0",
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: 0, marginRight: 4 }}>
          Subcontractor Matrix
        </h2>

        {/* Conflict pills */}
        {redCount > 0 && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "#FEE2E2", color: "#991B1B",
            fontSize: 12, fontWeight: 500,
            padding: "4px 10px", borderRadius: 999,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
            {redCount} conflict{redCount > 1 ? "s" : ""}
          </span>
        )}
        {amberCount > 0 && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "#FEF3C7", color: "#92400E",
            fontSize: 12, fontWeight: 500,
            padding: "4px 10px", borderRadius: 999,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
            {amberCount} watch
          </span>
        )}

        <div style={{ flex: 1 }} />

        {/* Action buttons */}
        <button
          className="rsc-btn-ghost"
          onClick={() => setManageOpen(true)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, padding: "6px 12px", borderRadius: 8,
            border: "1px solid #E2E8F0", background: "#fff",
            color: "#475569", cursor: "pointer", fontWeight: 500,
            transition: "background 0.1s",
          }}
        >
          <Settings size={13} /> Manage
        </button>
        <button
          className="rsc-btn-ghost"
          onClick={() => void loadAll()}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, padding: "6px 12px", borderRadius: 8,
            border: "1px solid #E2E8F0", background: "#fff",
            color: "#475569", cursor: "pointer", fontWeight: 500,
            transition: "background 0.1s",
          }}
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* ── Table area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

        {/* TODAY LINE */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: TODAY_LINE,
            top: 0, bottom: 0, width: 0,
            borderLeft: "2px dashed #EF4444",
            opacity: 0.8,
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <span style={{
            position: "absolute", top: 8, left: 5,
            fontSize: 10, fontWeight: 600, color: "#EF4444",
            background: "#FEE2E2",
            padding: "2px 6px", borderRadius: 4,
            lineHeight: 1.4, whiteSpace: "nowrap",
          }}>
            TODAY
          </span>
        </div>

        {/* ── DATA ROWS — vertically scrollable ── */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {visible.length === 0 ? (
            <div style={{ padding: "24px 20px", fontSize: 13, color: "#64748B", fontStyle: "italic" }}>
              No projects visible. Use Manage to show projects.
            </div>
          ) : (
            visible.map(proj => {
              const pid        = String(proj.id);
              const currentIdx = stageIndices[pid] ?? DEFAULT_IDX;
              const isDragging = draggingRow === pid;

              return (
                <div
                  key={proj.id}
                  style={{
                    display: "flex",
                    borderBottom: "1px solid #F1F5F9",
                    background: "#fff",
                    transition: "box-shadow 0.15s",
                    boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {/* Project name cell */}
                  <div style={{
                    width: PROJ_W, minWidth: PROJ_W, flexShrink: 0,
                    borderRight: "1px solid #E2E8F0",
                    padding: "14px 14px",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    minHeight: 80,
                  }}>
                    <span
                      style={{
                        fontSize: 13, fontWeight: 600, color: "#0F172A",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        display: "block", lineHeight: 1.4,
                      }}
                      title={proj.display_name ?? proj.name}
                    >
                      {shortName(proj.display_name ?? proj.name)}
                    </span>
                    <span style={{ fontSize: 11, color: "#64748B", display: "block", marginTop: 3, fontStyle: "italic" }}>
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
                    style={{ flex: 1, minWidth: 0, overflowX: "scroll", cursor: "grab" }}
                    onMouseDown={e => handleMouseDown(pid, e)}
                    onMouseMove={e => handleMouseMove(pid, e)}
                    onMouseUp={e => handleMouseUp(pid, e)}
                    onMouseLeave={e => handleMouseLeave(pid, e)}
                  >
                    <div style={{
                      display: "flex",
                      width: STAGES.length * STAGE_W,
                      minWidth: STAGES.length * STAGE_W,
                    }}>
                      {STAGES.map((stage, stageIdx) => {
                        const vendors      = stageMap[stage]?.[pid] ?? [];
                        const conflictLvl  = getCellConflictLevel(pid, stageIdx, stageMap, vsc);
                        const cellKey      = `${pid}:${stage}`;
                        const isExpanded   = expanded.has(cellKey);
                        const isCurrent    = stageIdx === currentIdx;
                        const isPast       = stageIdx < currentIdx;

                        // Background: conflict overrides past/future; current just adds left border
                        let bg: string;
                        if      (conflictLvl === 4) bg = "#FFF1F2";
                        else if (conflictLvl === 3) bg = "#FFFBEB";
                        else if (isPast)            bg = "#F8FAFC";
                        else                        bg = "#fff";

                        // Current stage: red left border only (bg already set above)
                        const leftBorder = isCurrent ? "3px solid #EF4444" : "none";

                        let vendorColor: string = isPast ? "#CBD5E1" : "#334155";
                        let labelColor:  string = isPast ? "#E2E8F0" : "#CBD5E1";
                        let fw:          number = 400;

                        if (isCurrent) {
                          labelColor  = "#EF4444";
                          vendorColor = "#0F172A";
                          fw          = 600;
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
                              borderLeft:   leftBorder,
                              borderRight:  "1px solid #F1F5F9",
                              borderBottom: "1px solid #F1F5F9",
                              padding: "8px 10px",
                              minHeight: 80,
                              boxSizing: "border-box",
                            }}
                          >
                            {/* Stage name inside cell */}
                            <div style={{
                              fontSize: 9,
                              color: labelColor,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              lineHeight: 1.3,
                              marginBottom: vendors.length > 0 ? 5 : 0,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}>
                              {stage}
                            </div>

                            {/* Vendors */}
                            {vendors.length > 0 && (
                              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {shown.map(v => {
                                  const vc = vsc[v]?.[stageIdx] ?? 0;
                                  return (
                                    <span
                                      key={v}
                                      title={v}
                                      style={{
                                        display: "block", fontSize: 11,
                                        color: vendorColor, fontWeight: fw,
                                        lineHeight: 1.5,
                                        overflow: "hidden", textOverflow: "ellipsis",
                                        whiteSpace: "nowrap", maxWidth: STAGE_W - 20,
                                      }}
                                    >
                                      {vc === 2 && (
                                        <span style={{ color: "#F59E0B", marginRight: 3 }}>•</span>
                                      )}
                                      {trunc(v)}
                                    </span>
                                  );
                                })}
                                {!isExpanded && overflow > 0 && (
                                  <button
                                    className="rsc-more-btn"
                                    onClick={() => toggleExpand(pid, stage)}
                                    style={{
                                      background: "none", border: "none", padding: 0,
                                      cursor: "pointer", fontSize: 10, color: "#6366F1",
                                      textAlign: "left", lineHeight: 1.5,
                                    }}
                                  >+{overflow} more</button>
                                )}
                                {isExpanded && display.length > 2 && (
                                  <button
                                    className="rsc-more-btn"
                                    onClick={() => toggleExpand(pid, stage)}
                                    style={{
                                      background: "none", border: "none", padding: 0,
                                      cursor: "pointer", fontSize: 10, color: "#6366F1",
                                      textAlign: "left", lineHeight: 1.5,
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
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setManageOpen(false)}
        >
          <div
            style={{
              background: "#fff", borderRadius: 16,
              border: "1px solid #E2E8F0",
              width: 400, maxHeight: "72vh",
              display: "flex", flexDirection: "column",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 20px", borderBottom: "1px solid #F1F5F9", flexShrink: 0,
            }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#0F172A" }}>
                Manage Projects
              </h3>
              <button
                onClick={() => setManageOpen(false)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#94A3B8", padding: 4, fontSize: 18, lineHeight: 1,
                  display: "flex", alignItems: "center",
                }}
              >
                <X size={18} />
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
                      padding: "11px 20px", borderBottom: "1px solid #F8FAFC",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleHide(pid)}
                  >
                    <span style={{
                      fontSize: 13, color: hidden ? "#94A3B8" : "#0F172A",
                      fontWeight: hidden ? 400 : 500,
                    }}>
                      {shortName(proj.display_name ?? proj.name)}
                    </span>
                    {/* CSS toggle switch */}
                    <div style={{
                      width: 36, height: 20, borderRadius: 999,
                      background: hidden ? "#E2E8F0" : "#6366F1",
                      position: "relative", flexShrink: 0,
                      transition: "background 0.2s",
                    }}>
                      <div style={{
                        position: "absolute",
                        top: 2, left: hidden ? 2 : 18,
                        width: 16, height: 16, borderRadius: "50%",
                        background: "#fff",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        transition: "left 0.2s",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid #F1F5F9", flexShrink: 0 }}>
              <p style={{ margin: 0, fontSize: 11, color: "#94A3B8", textAlign: "center" }}>
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
