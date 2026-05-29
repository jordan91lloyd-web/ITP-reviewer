"use client";

// ─── ResourcingTab ────────────────────────────────────────────────────────────
// Programme-aligned subcontractor matrix.
// Each project row has independently draggable stage cells.
// Buffer columns on each side allow scrolling to first/last stage.
// TODAY line is fixed at PROJECT_COL_WIDTH + TODAY_OFFSET * STAGE_WIDTH = 850px.

import { useState, useEffect, useRef, useCallback } from "react";
import { RefreshCw, Settings, X } from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────────

const STAGE_WIDTH       = 130;
const PROJECT_COL_WIDTH = 200;
const BUFFER_COLS       = 10;
const TODAY_OFFSET      = 5;
const TODAY_LEFT        = PROJECT_COL_WIDTH + TODAY_OFFSET * STAGE_WIDTH; // 850px

const STAGES = [
  "Demolition", "Excavation", "Piling & Retention", "In-Ground Services",
  "Basement Construction", "Structure", "Facade & Windows", "Roofing",
  "Services Rough-In", "Partitions & Framing", "Sheeting", "Waterproofing",
  "Tiling", "Joinery", "Ceilings", "Painting", "Flooring",
  "Services Fit-Off", "Fixtures & Appliances", "External Works",
  "Testing & Commissioning", "Defects & Handover",
] as const;
type Stage = (typeof STAGES)[number];

// Total scroll content: BUFFER_COLS + 22 stages + BUFFER_COLS = 42 columns
const TOTAL_COLS  = BUFFER_COLS + STAGES.length + BUFFER_COLS;
const TOTAL_WIDTH = TOTAL_COLS * STAGE_WIDTH; // 5460px

const DEFAULT_IDX = 0; // "Demolition" — stage 0 at TODAY on first load

// Stage N sits at content pixel (BUFFER_COLS + N) * STAGE_WIDTH.
// To place stage N under TODAY (TODAY_OFFSET columns from scroll-area left):
//   scrollLeft = (BUFFER_COLS + N) * STAGE_WIDTH - TODAY_OFFSET * STAGE_WIDTH
//              = (BUFFER_COLS - TODAY_OFFSET + N) * STAGE_WIDTH
//              = (10 - 5 + N) * STAGE_WIDTH = (5 + N) * STAGE_WIDTH
// Stage 0  → scrollLeft = 5  * 130 = 650
// Stage 21 → scrollLeft = 26 * 130 = 3380
function stageToScrollLeft(n: number): number {
  const clamped = Math.max(0, Math.min(STAGES.length - 1, n));
  return (BUFFER_COLS - TODAY_OFFSET + clamped) * STAGE_WIDTH;
}
// Inverse: stage index from scrollLeft
function scrollLeftToStage(scrollLeft: number): number {
  const n = Math.round(scrollLeft / STAGE_WIDTH) - (BUFFER_COLS - TODAY_OFFSET);
  return Math.max(0, Math.min(STAGES.length - 1, n));
}

// ── Types ──────────────────────────────────────────────────────────────────────

interface Commitment {
  id: string; title: string; vendor_name: string; status: string; value: number;
}
interface Props {
  company_id: string | number | null;
  projects: Array<{ id: number; name: string; display_name?: string; is_hidden?: boolean }>;
}
type StageMap = Record<string, Record<string, string[]>>;

interface ConflictRow {
  vendor: string;
  stage:  string;
  count:  number;
  projectNames: string[];
}

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

// ── useDragScroll hook ────────────────────────────────────────────────────────
// Attaches drag-to-scroll to a div ref. mousemove/mouseup on window so
// dragging works even when cursor leaves the element quickly.

function useDragScroll(
  ref:               React.RefObject<HTMLDivElement | null>,
  onSnap:            (stageIndex: number) => void,
  onPositionChange:  (stageIndex: number) => void,
): void {
  // Store callbacks in refs so we never need to re-register listeners
  const snapRef = useRef(onSnap);
  const posRef  = useRef(onPositionChange);
  snapRef.current = onSnap;
  posRef.current  = onPositionChange;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown      = false;
    let startX      = 0;
    let scrollStart = 0;
    let hasMoved    = false;

    const onMouseDown = (e: MouseEvent) => {
      isDown      = true;
      hasMoved    = false;
      startX      = e.pageX;
      scrollStart = el.scrollLeft;
      el.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      hasMoved       = true;
      el.scrollLeft  = scrollStart - (e.pageX - startX);
      posRef.current(scrollLeftToStage(el.scrollLeft));
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown          = false;
      el.style.cursor = "grab";
      if (!hasMoved) return;
      const clamped = scrollLeftToStage(el.scrollLeft);
      el.scrollTo({ left: stageToScrollLeft(clamped), behavior: "smooth" });
      snapRef.current(clamped);
    };

    const onMouseLeave = () => { if (isDown) onMouseUp(); };

    el.addEventListener("mousedown",      onMouseDown);
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseup",    onMouseUp);
    el.addEventListener("mouseleave",     onMouseLeave);

    return () => {
      el.removeEventListener("mousedown",     onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      el.removeEventListener("mouseleave",    onMouseLeave);
    };
  // ref is a stable object — effect runs once per mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

// ── ProjectRow ────────────────────────────────────────────────────────────────

interface ProjectRowProps {
  pid:              string;
  displayName:      string;
  currentIdx:       number;
  stageMap:         StageMap;
  vsc:              Record<string, Record<number, number>>;
  expanded:         Set<string>;
  onToggleExpand:   (pid: string, stage: string) => void;
  onSnap:           (pid: string, idx: number) => void;
  onPositionChange: (pid: string, idx: number) => void;
  onRegisterRef:    (pid: string, el: HTMLDivElement | null) => void;
}

function ProjectRow({
  pid, displayName, currentIdx, stageMap, vsc, expanded,
  onToggleExpand, onSnap, onPositionChange, onRegisterRef,
}: ProjectRowProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleSnap = useCallback(
    (idx: number) => onSnap(pid, idx),
    [pid, onSnap],
  );
  const handlePos = useCallback(
    (idx: number) => onPositionChange(pid, idx),
    [pid, onPositionChange],
  );

  useDragScroll(scrollRef, handleSnap, handlePos);

  // Set initial scroll position on mount (handles re-shown rows after toggle)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = stageToScrollLeft(currentIdx);
    }
  // Only on mount — parent's useEffect handles the initial API-data load case
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentStageName = STAGES[Math.min(currentIdx, STAGES.length - 1)];

  return (
    <div style={{
      display: "flex",
      borderBottom: "1px solid #F1F5F9",
      minHeight: 80,
      background: "#fff",
    }}>
      {/* Sticky project name column */}
      <div style={{
        width: PROJECT_COL_WIDTH, minWidth: PROJECT_COL_WIDTH,
        position: "sticky", left: 0,
        background: "#fff", zIndex: 10,
        padding: "12px 16px",
        borderRight: "1px solid #E2E8F0",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div
          style={{
            fontSize: 13, fontWeight: 600, color: "#0F172A",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}
          title={displayName}
        >
          {shortName(displayName)}
        </div>
        <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>
          Currently: {currentStageName}
        </div>
      </div>

      {/* Horizontally draggable stage cells */}
      <div
        className="rsc-row-scroll"
        ref={el => {
          scrollRef.current = el;
          onRegisterRef(pid, el);
        }}
        style={{ flex: 1, minWidth: 0, overflowX: "scroll", cursor: "grab" }}
      >
        <div style={{ display: "flex", width: TOTAL_WIDTH, minWidth: TOTAL_WIDTH }}>

          {/* Left buffer */}
          {Array.from({ length: BUFFER_COLS }).map((_, i) => (
            <div key={`l${i}`} style={{
              minWidth: STAGE_WIDTH, width: STAGE_WIDTH, flexShrink: 0,
              background: "#FAFAFA", borderRight: "1px solid #F8FAFC",
            }} />
          ))}

          {/* 22 stage cells */}
          {STAGES.map((stage, stageIdx) => {
            const vendors     = stageMap[stage]?.[pid] ?? [];
            const conflictLvl = getCellConflictLevel(pid, stageIdx, stageMap, vsc);
            const cellKey     = `${pid}:${stage}`;
            const isExpanded  = expanded.has(cellKey);
            const isCurrent   = stageIdx === currentIdx;
            const isPast      = stageIdx < currentIdx;

            // Background: conflict overrides shading; current adds red border only
            let bg: string;
            if      (conflictLvl === 4) bg = "#FFF1F2";
            else if (conflictLvl === 3) bg = "#FFFBEB";
            else if (isPast)            bg = "#F8FAFC";
            else                        bg = "#fff";

            const leftBorder   = isCurrent ? "3px solid #EF4444" : "1px solid #F1F5F9";
            const labelColor   = isCurrent ? "#EF4444" : isPast ? "#CBD5E1" : "#94A3B8";
            const labelWeight: number = isCurrent ? 700 : 400;
            const vendorColor  = isCurrent ? "#0F172A" : isPast ? "#94A3B8" : "#334155";
            const vendorSize   = isCurrent ? 12 : 11;
            const vendorWeight: number = isCurrent ? 600 : 400;

            const display  = [...vendors].sort((a, b) => a.localeCompare(b));
            const shown    = isExpanded ? display : display.slice(0, 2);
            const overflow = display.length - 2;

            return (
              <div key={stage} style={{
                minWidth: STAGE_WIDTH, width: STAGE_WIDTH, flexShrink: 0,
                background: bg,
                borderLeft:   leftBorder,
                borderRight:  "1px solid #F1F5F9",
                borderBottom: "1px solid #F1F5F9",
                padding: "8px 10px",
                minHeight: 80,
                boxSizing: "border-box",
              }}>
                {/* Stage label */}
                <div style={{
                  fontSize: 9, fontWeight: labelWeight, color: labelColor,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  lineHeight: 1.3,
                  marginBottom: vendors.length > 0 ? 5 : 0,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {stage}
                </div>

                {/* Vendors */}
                {vendors.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {shown.map(v => {
                      const vc = vsc[v]?.[stageIdx] ?? 0;
                      return (
                        <span key={v} title={v} style={{
                          display: "block",
                          fontSize: vendorSize, fontWeight: vendorWeight,
                          color: vendorColor, lineHeight: 1.6,
                          overflow: "hidden", textOverflow: "ellipsis",
                          whiteSpace: "nowrap", maxWidth: STAGE_WIDTH - 20,
                        }}>
                          {vc === 2 && <span style={{ color: "#F59E0B", marginRight: 3 }}>•</span>}
                          {trunc(v)}
                        </span>
                      );
                    })}
                    {!isExpanded && overflow > 0 && (
                      <button
                        onClick={() => onToggleExpand(pid, stage)}
                        style={{
                          background: "none", border: "none", padding: 0,
                          cursor: "pointer", fontSize: 11, fontWeight: 500,
                          color: "#6366F1", textAlign: "left", lineHeight: 1.5,
                        }}
                      >+{overflow} more</button>
                    )}
                    {isExpanded && display.length > 2 && (
                      <button
                        onClick={() => onToggleExpand(pid, stage)}
                        style={{
                          background: "none", border: "none", padding: 0,
                          cursor: "pointer", fontSize: 11, fontWeight: 500,
                          color: "#6366F1", textAlign: "left", lineHeight: 1.5,
                        }}
                      >show less</button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Right buffer */}
          {Array.from({ length: BUFFER_COLS }).map((_, i) => (
            <div key={`r${i}`} style={{
              minWidth: STAGE_WIDTH, width: STAGE_WIDTH, flexShrink: 0,
              background: "#FAFAFA", borderRight: "1px solid #F8FAFC",
            }} />
          ))}

        </div>
      </div>
    </div>
  );
}

// ── ResourcingTab ─────────────────────────────────────────────────────────────

export default function ResourcingTab({ company_id, projects }: Props) {
  const [loading, setLoading]           = useState(false);
  const [loadingName, setLoadingName]   = useState("");
  const [loadingIdx, setLoadingIdx]     = useState(0);
  const [loaded, setLoaded]             = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [stageMap, setStageMap]         = useState<StageMap>({});
  const [hiddenIds, setHiddenIds]       = useState<Set<string>>(new Set());
  const [manageOpen, setManageOpen]     = useState(false);
  const [conflictsOpen, setConflictsOpen] = useState(false);
  const [expanded, setExpanded]         = useState<Set<string>>(new Set());
  // stageIndices[pid] = current stage index (0–21)
  const [stageIndices, setStageIndices] = useState<Record<string, number>>({});

  const rowScrollRefs   = useRef<Map<string, HTMLDivElement>>(new Map());
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
  // Handles the case where API offsets arrive after rows first render.
  useEffect(() => {
    if (!loaded) { scrollsSetRef.current = false; return; }
    if (scrollsSetRef.current) return;
    const t = setTimeout(() => {
      const si = stageIndicesRef.current;
      for (const [pid, el] of rowScrollRefs.current) {
        const idx = si[pid] ?? DEFAULT_IDX;
        el.scrollLeft = stageToScrollLeft(idx);
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

  // ── Snap / position callbacks ─────────────────────────────────────────────────

  const handleSnap = useCallback((pid: string, idx: number) => {
    setStageIndices(prev => ({ ...prev, [pid]: idx }));
    clearTimeout(saveDebounce.current[pid]);
    saveDebounce.current[pid] = setTimeout(() => {
      if (!company_id) return;
      void fetch("/api/resourcing/project-offset", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id: String(company_id),
          project_id: pid,
          current_stage: STAGES[idx],
        }),
      });
    }, 500);
  }, [company_id]);

  const handlePositionChange = useCallback((pid: string, idx: number) => {
    setStageIndices(prev => ({ ...prev, [pid]: idx }));
  }, []);

  const handleRegisterRef = useCallback((pid: string, el: HTMLDivElement | null) => {
    if (el) rowScrollRefs.current.set(pid, el);
    else rowScrollRefs.current.delete(pid);
  }, []);

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

  // ── Conflict data ─────────────────────────────────────────────────────────────

  const vsc = buildVendorStageCount(visible.map(p => String(p.id)), stageMap);

  function conflictCounts() {
    let red = 0, amber = 0;
    for (const stageCounts of Object.values(vsc))
      for (const count of Object.values(stageCounts))
        if (count >= 4) red++; else if (count >= 3) amber++;
    return { red, amber };
  }
  const { red: redCount, amber: amberCount } = loaded ? conflictCounts() : { red: 0, amber: 0 };

  // Conflict rows for modal: each (vendor, stage) with 3+ projects
  const conflictRows: ConflictRow[] = [];
  if (loaded) {
    for (const [vendor, stageCounts] of Object.entries(vsc)) {
      for (const [stageIdxStr, count] of Object.entries(stageCounts)) {
        if (count < 3) continue;
        const stageIdx = Number(stageIdxStr);
        const stage    = STAGES[stageIdx];
        const projectNames = visible
          .filter(p => stageMap[stage]?.[String(p.id)]?.includes(vendor))
          .map(p => shortName(p.display_name ?? p.name));
        conflictRows.push({ vendor, stage, count, projectNames });
      }
    }
    conflictRows.sort((a, b) => b.count - a.count);
  }

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
            Fetches live commitments across{" "}
            <strong style={{ color: "#0F172A" }}>{visible.length}</strong> projects
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

      <style>{`
        .rsc-row-scroll::-webkit-scrollbar { display: none; }
        .rsc-row-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .rsc-ghost:hover { background: #F1F5F9 !important; }
      `}</style>

      {/* TODAY LINE — fixed, full viewport height */}
      <div aria-hidden style={{
        position: "fixed", left: TODAY_LEFT, top: 0,
        width: 2, height: "100vh",
        background: "repeating-linear-gradient(to bottom, #EF4444 0px, #EF4444 8px, transparent 8px, transparent 16px)",
        zIndex: 30, pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "fixed", left: TODAY_LEFT + 6, top: 108,
        background: "#EF4444", color: "#fff",
        fontSize: 10, fontWeight: 600, lineHeight: 1,
        padding: "3px 7px", borderRadius: 4,
        zIndex: 31, pointerEvents: "none",
      }}>TODAY</div>

      {/* ── Top bar ── */}
      <div style={{
        flexShrink: 0, display: "flex", alignItems: "center", gap: 10,
        padding: "0 20px", height: 56, background: "#fff",
        borderBottom: "1px solid #E2E8F0",
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: 0, marginRight: 4 }}>
          Subcontractor Matrix
        </h2>

        {/* Conflict pills — clickable to open conflicts modal */}
        {redCount > 0 && (
          <button
            onClick={() => setConflictsOpen(true)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "#FEE2E2", color: "#991B1B",
              fontSize: 12, fontWeight: 500,
              padding: "4px 10px", borderRadius: 999,
              border: "none", cursor: "pointer",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
            {redCount} conflict{redCount > 1 ? "s" : ""}
          </button>
        )}
        {amberCount > 0 && (
          <button
            onClick={() => setConflictsOpen(true)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "#FEF3C7", color: "#92400E",
              fontSize: 12, fontWeight: 500,
              padding: "4px 10px", borderRadius: 999,
              border: "none", cursor: "pointer",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
            {amberCount} watch
          </button>
        )}

        <div style={{ flex: 1 }} />

        <button
          className="rsc-ghost"
          onClick={() => setManageOpen(true)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, padding: "6px 12px", borderRadius: 8,
            border: "1px solid #E2E8F0", background: "#fff",
            color: "#475569", cursor: "pointer", fontWeight: 500,
          }}
        >
          <Settings size={13} /> Manage
        </button>
        <button
          className="rsc-ghost"
          onClick={() => void loadAll()}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, padding: "6px 12px", borderRadius: 8,
            border: "1px solid #E2E8F0", background: "#fff",
            color: "#475569", cursor: "pointer", fontWeight: 500,
          }}
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* ── Data rows ── */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {visible.length === 0 ? (
          <div style={{ padding: "24px 20px", fontSize: 13, color: "#64748B", fontStyle: "italic" }}>
            No projects visible. Use Manage to show projects.
          </div>
        ) : (
          visible.map(proj => {
            const pid = String(proj.id);
            return (
              <ProjectRow
                key={pid}
                pid={pid}
                displayName={proj.display_name ?? proj.name}
                currentIdx={stageIndices[pid] ?? DEFAULT_IDX}
                stageMap={stageMap}
                vsc={vsc}
                expanded={expanded}
                onToggleExpand={toggleExpand}
                onSnap={handleSnap}
                onPositionChange={handlePositionChange}
                onRegisterRef={handleRegisterRef}
              />
            );
          })
        )}
      </div>

      {/* ── Conflicts Modal ── */}
      {conflictsOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)",
          }}
          onClick={() => setConflictsOpen(false)}
        >
          <div
            style={{
              background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0",
              width: 640, maxHeight: "80vh",
              display: "flex", flexDirection: "column",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 24px", borderBottom: "1px solid #F1F5F9", flexShrink: 0,
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#0F172A" }}>
                  Active Conflicts
                </h3>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748B" }}>
                  Same contractor across 3+ projects in the same stage
                </p>
              </div>
              <button
                onClick={() => setConflictsOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 4, display: "flex" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Table */}
            <div style={{ overflowY: "auto", flex: 1 }}>
              {conflictRows.length === 0 ? (
                <div style={{ padding: "24px", fontSize: 13, color: "#64748B", textAlign: "center" }}>
                  No conflicts found.
                </div>
              ) : (
                <>
                  {/* Table header */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.5fr 3fr 56px",
                    padding: "10px 24px",
                    background: "#F8FAFC",
                    borderBottom: "1px solid #E2E8F0",
                    fontSize: 11, fontWeight: 600, color: "#64748B",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    position: "sticky", top: 0, zIndex: 1,
                  }}>
                    <div>Contractor</div>
                    <div>Stage</div>
                    <div>Projects</div>
                    <div style={{ textAlign: "center" }}>Count</div>
                  </div>

                  {/* Table rows */}
                  {conflictRows.map((row, i) => (
                    <div
                      key={`${row.vendor}-${row.stage}-${i}`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1.5fr 3fr 56px",
                        padding: "12px 24px",
                        borderBottom: "1px solid #F1F5F9",
                        alignItems: "start",
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", paddingRight: 8 }}>
                        {row.vendor}
                      </div>
                      <div style={{ fontSize: 12, color: "#475569", paddingRight: 8 }}>
                        {row.stage}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>
                        {row.projectNames.join(", ")}
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <span style={{
                          display: "inline-block",
                          background: row.count >= 4 ? "#FEE2E2" : "#FEF3C7",
                          color: row.count >= 4 ? "#991B1B" : "#92400E",
                          fontSize: 12, fontWeight: 700,
                          padding: "2px 8px", borderRadius: 999,
                          minWidth: 24, textAlign: "center",
                        }}>
                          {row.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Manage Projects Modal ── */}
      {manageOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)",
          }}
          onClick={() => setManageOpen(false)}
        >
          <div
            style={{
              background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0",
              width: 400, maxHeight: "72vh",
              display: "flex", flexDirection: "column",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 20px", borderBottom: "1px solid #F1F5F9", flexShrink: 0,
            }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#0F172A" }}>
                Manage Projects
              </h3>
              <button
                onClick={() => setManageOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 4, display: "flex" }}
              >
                <X size={18} />
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
                      padding: "11px 20px", borderBottom: "1px solid #F8FAFC", cursor: "pointer",
                    }}
                    onClick={() => toggleHide(pid)}
                  >
                    <span style={{ fontSize: 13, color: hidden ? "#94A3B8" : "#0F172A", fontWeight: hidden ? 400 : 500 }}>
                      {shortName(proj.display_name ?? proj.name)}
                    </span>
                    {/* CSS toggle */}
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
