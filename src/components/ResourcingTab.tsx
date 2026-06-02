"use client";

// ─── ResourcingTab ────────────────────────────────────────────────────────────
// Programme-aligned subcontractor matrix.
// Unlocked: each row drags independently.
// Locked: all rows scroll as a single unit; per-row drag is disabled.
// TODAY line uses position:absolute inside the table container — zoom-independent.

import { useState, useEffect, useRef, useCallback } from "react";
import { RefreshCw, Settings, X, Lock, Unlock, Sparkles, Pencil, Send } from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────────

const STAGE_WIDTH       = 130;
const PROJECT_COL_WIDTH = 200;
const LEFT_BUFFER       = 6;  // empty cells before stage 0
const RIGHT_BUFFER      = 8;  // empty cells after stage 21
const TODAY_OFFSET      = 3;  // TODAY line is this many columns into the scroll area

// Absolute left of TODAY line within the table container.
// = project column + TODAY_OFFSET columns = 200 + 3*130 = 590px
const TODAY_ABS_LEFT = PROJECT_COL_WIDTH + TODAY_OFFSET * STAGE_WIDTH;

const STAGES = [
  "Demolition", "Excavation", "Piling & Retention", "In-Ground Services",
  "Basement Construction", "Structure", "Facade & Windows", "Roofing",
  "Services Rough-In", "Partitions & Framing", "Sheeting", "Waterproofing",
  "Tiling", "Joinery", "Ceilings", "Painting", "Flooring",
  "Services Fit-Off", "Fixtures & Appliances", "External Works",
  "Testing & Commissioning", "Defects & Handover",
] as const;
type Stage = (typeof STAGES)[number];

// Total content: LEFT_BUFFER + 22 stages + RIGHT_BUFFER = 36 columns = 4680px
const TOTAL_COLS  = LEFT_BUFFER + STAGES.length + RIGHT_BUFFER;
const TOTAL_WIDTH = TOTAL_COLS * STAGE_WIDTH;

const DEFAULT_IDX = 0;

// scrollLeft = (LEFT_BUFFER - TODAY_OFFSET + N) * STAGE_WIDTH = (3 + N) * 130
// Stage 0 → 390px, Stage 21 → 3120px
function stageToScrollLeft(n: number): number {
  const clamped = Math.max(0, Math.min(STAGES.length - 1, n));
  return (LEFT_BUFFER - TODAY_OFFSET + clamped) * STAGE_WIDTH;
}
function scrollLeftToStage(scrollLeft: number): number {
  const n = Math.round(scrollLeft / STAGE_WIDTH) - (LEFT_BUFFER - TODAY_OFFSET);
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

interface VendorOverride {
  vendor_name:     string;
  project_id:      string;
  override_stage:  string;
  original_stage?: string;
}

interface PopoverState {
  vendor:  string;
  pid:     string;
  stage:   string; // stage the vendor is currently shown in
  x:       number; // viewport x
  y:       number; // viewport y
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

// activeVendorStageCount[vendorName][stageIndex] = number of projects where:
//   (a) that vendor is in that stage, AND
//   (b) that stage is "active" for that project (within 3 stages of current position)
function buildActiveVendorStageCount(
  visiblePids: string[],
  map: StageMap,
  stageIndices: Record<string, number>,
): Record<string, Record<number, number>> {
  const avsc: Record<string, Record<number, number>> = {};
  for (const pid of visiblePids) {
    const currentIdx = stageIndices[pid] ?? DEFAULT_IDX;
    for (let i = 0; i < STAGES.length; i++) {
      if (Math.abs(i - currentIdx) > 3) continue; // stage not active for this project
      for (const v of map[STAGES[i]]?.[pid] ?? []) {
        if (!avsc[v]) avsc[v] = {};
        avsc[v][i] = (avsc[v][i] ?? 0) + 1;
      }
    }
  }
  return avsc;
}

// Returns conflict level for a cell. Only flags a conflict when:
//   1. The stage is active for this project (within 3 of its current stage), AND
//   2. The vendor appears in the same stage for 3+ other projects that are also active there.
function getCellConflictLevel(
  pid: string,
  stageIndex: number,
  currentIdx: number,
  map: StageMap,
  avsc: Record<string, Record<number, number>>,
): 0 | 3 | 4 {
  if (Math.abs(stageIndex - currentIdx) > 3) return 0;
  const vendors = map[STAGES[stageIndex]]?.[pid] ?? [];
  let max = 0;
  for (const v of vendors) {
    const count = avsc[v]?.[stageIndex] ?? 0;
    if (count > max) max = count;
  }
  if (max >= 4) return 4;
  if (max >= 3) return 3;
  return 0;
}

// Applies vendor overrides to a raw stageMap — moves each overridden vendor to
// their override_stage, removing them from whichever stage they currently sit in.
function applyOverrides(rawMap: StageMap, overrides: VendorOverride[]): StageMap {
  if (!overrides.length) return rawMap;
  // Deep copy of every stage that has entries
  const result: StageMap = {};
  for (const [stage, pids] of Object.entries(rawMap)) {
    result[stage] = {};
    for (const [pid, vendors] of Object.entries(pids)) {
      result[stage][pid] = [...vendors];
    }
  }
  for (const { vendor_name, project_id, override_stage } of overrides) {
    // Remove from every stage other than the override stage
    for (const stage of Object.keys(result)) {
      if (stage === override_stage) continue;
      const arr = result[stage]?.[project_id];
      if (arr) {
        const idx = arr.indexOf(vendor_name);
        if (idx >= 0) arr.splice(idx, 1);
      }
    }
    // Add to override stage
    if (!result[override_stage]) result[override_stage] = {};
    if (!result[override_stage][project_id]) result[override_stage][project_id] = [];
    if (!result[override_stage][project_id].includes(vendor_name)) {
      result[override_stage][project_id].push(vendor_name);
    }
  }
  return result;
}

// ── useDragScroll hook ────────────────────────────────────────────────────────
// Attaches drag-to-scroll to a div ref. mousemove/mouseup on window so
// dragging works even when cursor leaves the element quickly.
// No-ops when isLocked = true.

function useDragScroll(
  ref:              React.RefObject<HTMLDivElement | null>,
  onSnap:           (stageIndex: number) => void,
  onPositionChange: (stageIndex: number) => void,
  isLocked:         boolean,
): void {
  const snapRef   = useRef(onSnap);
  const posRef    = useRef(onPositionChange);
  const lockedRef = useRef(isLocked);
  snapRef.current   = onSnap;
  posRef.current    = onPositionChange;
  lockedRef.current = isLocked;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown      = false;
    let startX      = 0;
    let scrollStart = 0;
    let hasMoved    = false;

    const onMouseDown = (e: MouseEvent) => {
      if (lockedRef.current) return;
      isDown      = true;
      hasMoved    = false;
      startX      = e.pageX;
      scrollStart = el.scrollLeft;
      el.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown || lockedRef.current) return;
      hasMoved      = true;
      el.scrollLeft = scrollStart - (e.pageX - startX);
      posRef.current(scrollLeftToStage(el.scrollLeft));
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown          = false;
      el.style.cursor = lockedRef.current ? "default" : "grab";
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
  // ref is stable — effect runs once per mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

// ── ProjectRow ────────────────────────────────────────────────────────────────

interface ProjectRowProps {
  pid:               string;
  displayName:       string;
  currentIdx:        number;
  stageMap:          StageMap;
  vsc:               Record<string, Record<number, number>>;
  expanded:          Set<string>;
  isLocked:          boolean;
  overriddenVendors: Set<string>; // entries are `${vendor_name}:${pid}`
  onToggleExpand:    (pid: string, stage: string) => void;
  onSnap:            (pid: string, idx: number) => void;
  onPositionChange:  (pid: string, idx: number) => void;
  onRegisterRef:     (pid: string, el: HTMLDivElement | null) => void;
  onVendorClick:     (vendor: string, pid: string, stage: string, x: number, y: number) => void;
}

function ProjectRow({
  pid, displayName, currentIdx, stageMap, vsc, expanded, isLocked,
  overriddenVendors, onToggleExpand, onSnap, onPositionChange, onRegisterRef, onVendorClick,
}: ProjectRowProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleSnap = useCallback((idx: number) => onSnap(pid, idx), [pid, onSnap]);
  const handlePos  = useCallback((idx: number) => onPositionChange(pid, idx), [pid, onPositionChange]);

  useDragScroll(scrollRef, handleSnap, handlePos, isLocked);

  // Set initial scroll position on mount
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = stageToScrollLeft(currentIdx);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentStageName = STAGES[Math.min(currentIdx, STAGES.length - 1)];

  return (
    <div style={{
      display: "flex",
      borderBottom: "1px solid #F1F5F9",
      minHeight: 80,
      background: "#fff",
      // Explicit width in locked mode so shared scroll container measures full scroll range
      ...(isLocked ? { minWidth: PROJECT_COL_WIDTH + TOTAL_WIDTH } : {}),
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
        <div style={{
          fontSize: 13, fontWeight: 600, color: "#0F172A",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }} title={displayName}>
          {shortName(displayName)}
        </div>
        <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>
          Currently: {currentStageName}
        </div>
      </div>

      {/* Stage cells — in locked mode overflow:hidden (parent shared scroll drives panning) */}
      <div
        className="rsc-row-scroll"
        ref={el => {
          scrollRef.current = el;
          onRegisterRef(pid, el);
        }}
        style={{
          flex:     isLocked ? "none" : 1,
          width:    isLocked ? TOTAL_WIDTH : undefined,
          minWidth: 0,
          overflowX: isLocked ? "hidden" : "scroll",
          cursor:    isLocked ? "default" : "grab",
        }}
      >
        <div style={{ display: "flex", width: TOTAL_WIDTH, minWidth: TOTAL_WIDTH }}>

          {/* Left buffer */}
          {Array.from({ length: LEFT_BUFFER }).map((_, i) => (
            <div key={`l${i}`} style={{
              minWidth: STAGE_WIDTH, width: STAGE_WIDTH, flexShrink: 0,
              background: "#FAFAFA", borderRight: "1px solid #F8FAFC",
            }} />
          ))}

          {/* 22 stage cells */}
          {STAGES.map((stage, stageIdx) => {
            const vendors     = stageMap[stage]?.[pid] ?? [];
            if (stageIdx === 0) console.log("[ResourcingTab] getVendors", pid, stageIdx, stage, vendors);
            const conflictLvl = getCellConflictLevel(pid, stageIdx, currentIdx, stageMap, vsc);
            const cellKey     = `${pid}:${stage}`;
            const isExpanded  = expanded.has(cellKey);
            const isCurrent   = stageIdx === currentIdx;
            const isPast      = stageIdx < currentIdx;

            let bg: string;
            if      (conflictLvl === 4) bg = "#FFF1F2";
            else if (conflictLvl === 3) bg = "#FFFBEB";
            else if (isPast)            bg = "#F8FAFC";
            else                        bg = "#fff";

            const leftBorder          = isCurrent ? "3px solid #EF4444" : "1px solid #F1F5F9";
            const labelColor          = isCurrent ? "#EF4444" : isPast ? "#CBD5E1" : "#94A3B8";
            const labelWeight: number = isCurrent ? 700 : 400;
            const vendorColor         = isCurrent ? "#0F172A" : isPast ? "#94A3B8" : "#334155";
            const vendorSize          = isCurrent ? 12 : 11;
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
                <div style={{
                  fontSize: 9, fontWeight: labelWeight, color: labelColor,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  lineHeight: 1.3,
                  marginBottom: vendors.length > 0 ? 5 : 0,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {stage}
                </div>

                {vendors.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {shown.map(v => {
                      const vc         = vsc[v]?.[stageIdx] ?? 0;
                      const isOverride = overriddenVendors.has(`${v}:${pid}`);
                      return (
                        <span
                          key={v}
                          title={`${v} — click to reassign stage`}
                          className="rsc-vendor-span"
                          onClick={e => {
                            e.stopPropagation();
                            onVendorClick(v, pid, stage, e.clientX, e.clientY);
                          }}
                          style={{
                            display: "flex", alignItems: "center", gap: 2,
                            fontSize: vendorSize, fontWeight: vendorWeight,
                            color: vendorColor, lineHeight: 1.6,
                            cursor: "pointer",
                            overflow: "hidden",
                            maxWidth: STAGE_WIDTH - 12,
                          }}
                        >
                          {isOverride && (
                            <span style={{ color: "#F59E0B", flexShrink: 0, fontSize: 8 }}>●</span>
                          )}
                          {!isOverride && vc === 2 && (
                            <span style={{ color: "#F59E0B", flexShrink: 0 }}>•</span>
                          )}
                          <span style={{
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            flex: 1,
                          }}>
                            {trunc(v)}
                          </span>
                          <span className="rsc-pencil" style={{ flexShrink: 0 }}>
                            <Pencil size={9} />
                          </span>
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
          {Array.from({ length: RIGHT_BUFFER }).map((_, i) => (
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
  const [loading, setLoading]             = useState(false);
  const [loadingName, setLoadingName]     = useState("");
  const [loadingIdx, setLoadingIdx]       = useState(0);
  const [loaded, setLoaded]               = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [stageMap, setStageMap]           = useState<StageMap>({});
  const [hiddenIds, setHiddenIds]         = useState<Set<string>>(new Set());
  const [manageOpen, setManageOpen]       = useState(false);
  const [conflictsOpen, setConflictsOpen] = useState(false);
  const [expanded, setExpanded]           = useState<Set<string>>(new Set());
  const [stageIndices, setStageIndices]   = useState<Record<string, number>>({});

  // Lock state — persisted to localStorage
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("rsc-locked") === "true";
  });

  // Chat panel
  const [chatPanelOpen, setChatPanelOpen] = useState(false);

  interface ChatMessage { role: "user" | "assistant"; content: string; }
  const WELCOME_MSG: ChatMessage = {
    role: "assistant",
    content: "Hi! Ask me anything about your subcontractor resourcing. For example:\n- How many projects is Aluxus on?\n- Who is our most overloaded contractor?\n- Which trades have active conflicts?\n- Is Civil King stretched right now?",
  };
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [chatInput, setChatInput]       = useState("");
  const [chatLoading, setChatLoading]   = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Vendor overrides + reassign popover
  const [vendorOverrides, setVendorOverrides]   = useState<VendorOverride[]>([]);
  const [popover, setPopover]                   = useState<PopoverState | null>(null);
  const [popoverStage, setPopoverStage]         = useState("");
  const [popoverSaving, setPopoverSaving]       = useState(false);

  const rowScrollRefs   = useRef<Map<string, HTMLDivElement>>(new Map());
  const saveDebounce    = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const scrollsSetRef   = useRef(false);
  const stageIndicesRef = useRef<Record<string, number>>({});
  const sharedScrollRef = useRef<HTMLDivElement | null>(null);
  stageIndicesRef.current = stageIndices;

  // ── Debug scroll math on mount ─────────────────────────────────────────────
  useEffect(() => {
    console.log("[ResourcingTab] TODAY_ABS_LEFT:", TODAY_ABS_LEFT);
    console.log("[ResourcingTab] stage 0  scrollLeft:", stageToScrollLeft(0));
    console.log("[ResourcingTab] stage 21 scrollLeft:", stageToScrollLeft(21));
    console.log("[ResourcingTab] content width:", TOTAL_WIDTH);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Load saved offsets on mount ────────────────────────────────────────────
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

  // ── Set initial scroll positions after data loads ──────────────────────────
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

  // ── Load vendor overrides when data finishes loading ──────────────────────
  useEffect(() => {
    if (!loaded || !company_id) return;
    fetch(`/api/resourcing/vendor-override?company_id=${company_id}`)
      .then(r => r.ok ? r.json() : { overrides: [] })
      .then((data: { overrides?: VendorOverride[] }) => {
        setVendorOverrides(data.overrides ?? []);
      })
      .catch(() => {});
  }, [loaded, company_id]);

  // ── Sync scroll positions when locking / unlocking ────────────────────────
  useEffect(() => {
    if (isLocked) {
      // Set shared container to match the first row's current scroll position
      const el = sharedScrollRef.current;
      if (el) {
        const [firstRowEl] = rowScrollRefs.current.values();
        el.scrollLeft = firstRowEl ? firstRowEl.scrollLeft : stageToScrollLeft(DEFAULT_IDX);
      }
    } else {
      // Restore each row to its own saved stage position
      const si = stageIndicesRef.current;
      for (const [pid, el] of rowScrollRefs.current) {
        el.scrollLeft = stageToScrollLeft(si[pid] ?? DEFAULT_IDX);
      }
    }
  // Only run when isLocked changes, not on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocked]);

  // ── Drag-to-pan on shared scroll container when locked ────────────────────
  useEffect(() => {
    const el = sharedScrollRef.current;
    if (!el || !isLocked) return;

    el.style.cursor = "grab";

    let isDown      = false;
    let startX      = 0;
    let scrollStart = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown      = true;
      startX      = e.pageX;
      scrollStart = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = scrollStart - (e.pageX - startX);
    };
    const onMouseUp = () => {
      isDown          = false;
      el.style.cursor = "grab";
    };

    el.addEventListener("mousedown",     onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);

    return () => {
      el.removeEventListener("mousedown",     onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      el.style.cursor = "default";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocked]);

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
  function toggleLock() {
    setIsLocked(prev => {
      const next = !prev;
      localStorage.setItem("rsc-locked", String(next));
      return next;
    });
  }

  // ── Snap / position callbacks ──────────────────────────────────────────────

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

  // ── Load commitments ───────────────────────────────────────────────────────

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
      console.log("[ResourcingTab] stageMap keys:", Object.keys(map));
      console.log("[ResourcingTab] stageMap sample:", JSON.stringify(Object.entries(map).slice(0, 2)));
      setStageMap(map); setLoaded(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to load"); }
    finally { setLoading(false); }
  }

  // ── Effective stage map (raw + vendor overrides applied) ──────────────────

  const effectiveStageMap = applyOverrides(stageMap, vendorOverrides);

  // Set of `${vendor_name}:${project_id}` for O(1) override lookup in cells
  const overriddenVendors = new Set(
    vendorOverrides.map(o => `${o.vendor_name}:${o.project_id}`),
  );

  // ── Conflict data ──────────────────────────────────────────────────────────

  const vsc = buildActiveVendorStageCount(
    visible.map(p => String(p.id)),
    effectiveStageMap,
    stageIndices,
  );

  function conflictCounts() {
    let red = 0, amber = 0;
    for (const stageCounts of Object.values(vsc))
      for (const count of Object.values(stageCounts))
        if (count >= 4) red++; else if (count >= 3) amber++;
    return { red, amber };
  }
  const { red: redCount, amber: amberCount } = loaded ? conflictCounts() : { red: 0, amber: 0 };

  const conflictRows: ConflictRow[] = [];
  if (loaded) {
    for (const [vendor, stageCounts] of Object.entries(vsc)) {
      for (const [stageIdxStr, count] of Object.entries(stageCounts)) {
        if (count < 3) continue;
        const stageIdx = Number(stageIdxStr);
        const stage    = STAGES[stageIdx];
        const projectNames = visible
          .filter(p => {
            const pid2 = String(p.id);
            const pidCurrentIdx = stageIndices[pid2] ?? DEFAULT_IDX;
            return (
              Math.abs(stageIdx - pidCurrentIdx) <= 3 &&
              effectiveStageMap[stage]?.[pid2]?.includes(vendor)
            );
          })
          .map(p => shortName(p.display_name ?? p.name));
        conflictRows.push({ vendor, stage, count, projectNames });
      }
    }
    conflictRows.sort((a, b) => b.count - a.count);
  }

  // ── Vendor override callbacks ─────────────────────────────────────────────

  const handleVendorClick = useCallback((vendor: string, pid: string, stage: string, x: number, y: number) => {
    setPopover({ vendor, pid, stage, x, y });
    setPopoverStage(stage);
  }, []);

  async function handleVendorSave() {
    if (!popover || !company_id || !popoverStage) return;
    setPopoverSaving(true);
    try {
      await fetch("/api/resourcing/vendor-override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id:     String(company_id),
          vendor_name:    popover.vendor,
          project_id:     popover.pid,
          override_stage: popoverStage,
          original_stage: popover.stage,
        }),
      });
      // Update local override state — upsert by vendor+pid key
      setVendorOverrides(prev => {
        const filtered = prev.filter(o => !(o.vendor_name === popover.vendor && o.project_id === popover.pid));
        return [...filtered, {
          vendor_name:    popover.vendor,
          project_id:     popover.pid,
          override_stage: popoverStage,
          original_stage: popover.stage,
        }];
      });
      setPopover(null);
    } finally {
      setPopoverSaving(false);
    }
  }

  // ── Chat helpers ──────────────────────────────────────────────────────────

  function buildChatContext() {
    const projectSummary = visible.map(p => {
      const pid       = String(p.id);
      const stageName = STAGES[stageIndices[pid] ?? DEFAULT_IDX];
      return `${shortName(p.display_name ?? p.name)}: ${stageName}`;
    }).join("\n");

    const conflictSummary = conflictRows.length > 0
      ? conflictRows.map(r =>
          `${r.vendor} — ${r.stage} (${r.count} projects: ${r.projectNames.join(", ")})`
        ).join("\n")
      : "No active conflicts detected.";

    const vendorData = visible.map(p => {
      const pid        = String(p.id);
      const currentIdx = stageIndices[pid] ?? DEFAULT_IDX;
      const vendors: string[] = [];
      for (let i = 0; i < STAGES.length; i++) {
        if (Math.abs(i - currentIdx) > 3) continue;
        for (const v of effectiveStageMap[STAGES[i]]?.[pid] ?? []) {
          if (!vendors.includes(v)) vendors.push(v);
        }
      }
      const stageName = STAGES[Math.min(currentIdx, STAGES.length - 1)];
      return `${shortName(p.display_name ?? p.name)} (${stageName}): [${vendors.join(", ")}]`;
    }).join("\n");

    return { projectSummary, conflictSummary, vendorData };
  }

  async function sendChatMessage() {
    const text = chatInput.trim();
    if (!text || chatLoading) return;

    const userMsg: { role: "user" | "assistant"; content: string } = { role: "user", content: text };
    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);
    setChatInput("");
    setChatLoading(true);

    // Scroll to bottom
    setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

    // Placeholder assistant message that we'll stream into
    const placeholderIdx = newMessages.length;
    setChatMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/resourcing/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.filter(m => m.content !== "").map(m => ({ role: m.role, content: m.content })),
          context: buildChatContext(),
        }),
      });

      if (!res.ok || !res.body) {
        setChatMessages(prev => prev.map((m, i) => i === placeholderIdx ? { ...m, content: "Failed to connect. Please try again." } : m));
        return;
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setChatMessages(prev => prev.map((m, i) =>
            i === placeholderIdx ? { ...m, content: m.content + chunk } : m
          ));
          chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch (e) {
      setChatMessages(prev => prev.map((m, i) =>
        i === placeholderIdx ? { ...m, content: "Error: " + (e instanceof Error ? e.message : "Unknown") } : m
      ));
    } finally {
      setChatLoading(false);
      setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
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

  // ── Loaded ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#F8FAFC" }}>

      <style>{`
        .rsc-row-scroll::-webkit-scrollbar { display: none; }
        .rsc-row-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .rsc-ghost:hover { background: #F1F5F9 !important; }
        .rsc-shared-scroll::-webkit-scrollbar { height: 5px; }
        .rsc-shared-scroll::-webkit-scrollbar-track { background: #F1F5F9; }
        .rsc-shared-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
        @keyframes rsc-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }
        .rsc-vendor-span .rsc-pencil { display: none; opacity: 0.5; }
        .rsc-vendor-span:hover .rsc-pencil { display: inline-flex; }
        .rsc-vendor-span:hover { text-decoration: underline; text-decoration-color: #CBD5E1; text-decoration-style: dashed; }
      `}</style>

      {/* ── Top bar ── */}
      <div style={{
        flexShrink: 0, display: "flex", alignItems: "center", gap: 10,
        padding: "0 20px", height: 56, background: "#fff",
        borderBottom: "1px solid #E2E8F0",
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: 0, marginRight: 4 }}>
          Subcontractor Matrix
        </h2>

        {/* Conflict pills */}
        {redCount > 0 && (
          <button onClick={() => setConflictsOpen(true)} style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "#FEE2E2", color: "#991B1B",
            fontSize: 12, fontWeight: 500, padding: "4px 10px", borderRadius: 999,
            border: "none", cursor: "pointer",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
            {redCount} conflict{redCount > 1 ? "s" : ""}
          </button>
        )}
        {amberCount > 0 && (
          <button onClick={() => setConflictsOpen(true)} style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "#FEF3C7", color: "#92400E",
            fontSize: 12, fontWeight: 500, padding: "4px 10px", borderRadius: 999,
            border: "none", cursor: "pointer",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
            {amberCount} watch
          </button>
        )}

        <div style={{ flex: 1 }} />

        {/* Chat Assistant */}
        <button
          className="rsc-ghost"
          onClick={() => setChatPanelOpen(o => !o)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, padding: "6px 12px", borderRadius: 8,
            border: "1px solid #E2E8F0",
            background: chatPanelOpen ? "#F5F3FF" : "#fff",
            color: chatPanelOpen ? "#6366F1" : "#475569",
            cursor: "pointer", fontWeight: 500,
          }}
        >
          <Sparkles size={13} /> AI Analysis
        </button>

        {/* Lock / Unlock */}
        <button
          className="rsc-ghost"
          onClick={toggleLock}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, padding: "6px 12px", borderRadius: 8,
            border: isLocked ? "1px solid #BBF7D0" : "1px solid #E2E8F0",
            background: isLocked ? "#DCFCE7" : "#fff",
            color: isLocked ? "#166534" : "#475569",
            cursor: "pointer", fontWeight: 500,
          }}
        >
          {isLocked ? <Lock size={13} /> : <Unlock size={13} />}
          {isLocked ? "Locked" : "Lock"}
        </button>

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

      {/* Lock banner */}
      {isLocked && (
        <div style={{
          flexShrink: 0, padding: "6px 20px",
          background: "#F0FDF4", borderBottom: "1px solid #BBF7D0",
          fontSize: 12, color: "#166534", display: "flex", alignItems: "center", gap: 6,
        }}>
          <Lock size={11} />
          Matrix locked — scroll horizontally to pan all rows together. Click Unlock to adjust individual stages.
        </div>
      )}

      {/* ── Data rows ── */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {/* Table container — TODAY line absolute inside here */}
        <div style={{ position: "relative" }}>

          {/* TODAY line */}
          <div aria-hidden style={{
            position: "absolute", left: TODAY_ABS_LEFT, top: 0, bottom: 0,
            width: 2,
            background: "repeating-linear-gradient(to bottom, #EF4444 0px, #EF4444 8px, transparent 8px, transparent 16px)",
            zIndex: 20, pointerEvents: "none",
          }} />
          <div aria-hidden style={{
            position: "absolute", left: TODAY_ABS_LEFT + 6, top: 8,
            background: "#EF4444", color: "#fff",
            fontSize: 10, fontWeight: 600, lineHeight: 1,
            padding: "3px 7px", borderRadius: 4,
            zIndex: 21, pointerEvents: "none",
          }}>TODAY</div>

          {/* Shared scroll wrapper — in locked mode this handles horizontal pan */}
          <div
            ref={sharedScrollRef}
            className={isLocked ? "rsc-shared-scroll" : undefined}
            style={{
              overflowX: isLocked ? "scroll" : "hidden",
              overflowY: "visible",
              cursor: isLocked ? "grab" : "default",
            }}
          >
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
                    stageMap={effectiveStageMap}
                    vsc={vsc}
                    expanded={expanded}
                    isLocked={isLocked}
                    overriddenVendors={overriddenVendors}
                    onToggleExpand={toggleExpand}
                    onSnap={handleSnap}
                    onPositionChange={handlePositionChange}
                    onRegisterRef={handleRegisterRef}
                    onVendorClick={handleVendorClick}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ── Chat Panel (right slide-in) ── */}
      {chatPanelOpen && (
        <div style={{
          position: "fixed", right: 0, top: 0, bottom: 0, width: 400,
          background: "#fff", borderLeft: "1px solid #E2E8F0",
          display: "flex", flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.08)",
          zIndex: 40,
        }}>
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 20px", borderBottom: "1px solid #F1F5F9", flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={15} style={{ color: "#6366F1" }} />
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#0F172A" }}>
                Resourcing Assistant
              </h3>
            </div>
            <button
              onClick={() => setChatPanelOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 4, display: "flex" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px", borderRadius: 12,
                  background: msg.role === "user" ? "#6366F1" : "#F1F5F9",
                  color: msg.role === "user" ? "#fff" : "#0F172A",
                  fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap",
                }}>
                  {msg.content === "" && chatLoading && i === chatMessages.length - 1 ? (
                    <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94A3B8", animation: "rsc-pulse 1s ease-in-out infinite" }} />
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94A3B8", animation: "rsc-pulse 1s ease-in-out 0.2s infinite" }} />
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94A3B8", animation: "rsc-pulse 1s ease-in-out 0.4s infinite" }} />
                    </span>
                  ) : (
                    <>
                      {msg.content}
                      {chatLoading && i === chatMessages.length - 1 && msg.role === "assistant" && (
                        <span style={{
                          display: "inline-block", width: 2, height: "1em",
                          background: "#6366F1", marginLeft: 2, verticalAlign: "text-bottom",
                          animation: "rsc-pulse 0.8s ease-in-out infinite",
                        }} />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Input */}
          <div style={{
            flexShrink: 0, padding: "12px 16px",
            borderTop: "1px solid #F1F5F9",
            display: "flex", gap: 8,
          }}>
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void sendChatMessage(); } }}
              placeholder={loaded ? "Ask about resourcing…" : "Load data first…"}
              disabled={!loaded || chatLoading}
              style={{
                flex: 1, fontSize: 13, padding: "8px 12px",
                border: "1px solid #E2E8F0", borderRadius: 8,
                background: loaded ? "#fff" : "#F8FAFC",
                color: "#0F172A", outline: "none",
              }}
            />
            <button
              onClick={() => void sendChatMessage()}
              disabled={!chatInput.trim() || !loaded || chatLoading}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                border: "none",
                background: (!chatInput.trim() || !loaded || chatLoading) ? "#E2E8F0" : "#6366F1",
                color: (!chatInput.trim() || !loaded || chatLoading) ? "#94A3B8" : "#fff",
                cursor: (!chatInput.trim() || !loaded || chatLoading) ? "not-allowed" : "pointer",
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Vendor Reassign Popover ── */}
      {popover && (
        <>
          {/* Click-outside backdrop */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 48 }}
            onClick={() => setPopover(null)}
          />
          <div style={{
            position: "fixed",
            left: Math.min(popover.x + 8, (typeof window !== "undefined" ? window.innerWidth : 1200) - 292),
            top:  Math.min(popover.y + 8, (typeof window !== "undefined" ? window.innerHeight : 800) - 220),
            width: 280,
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: 12,
            padding: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 49,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              Reassign vendor
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {popover.vendor}
            </div>
            <div style={{ fontSize: 11, color: "#64748B", marginBottom: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {shortName(projects.find(p => String(p.id) === popover.pid)?.display_name ?? projects.find(p => String(p.id) === popover.pid)?.name ?? popover.pid)}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 500, color: "#475569", display: "block", marginBottom: 4 }}>
                Move to
              </label>
              <select
                value={popoverStage}
                onChange={e => setPopoverStage(e.target.value)}
                style={{
                  width: "100%", fontSize: 12, padding: "6px 8px",
                  border: "1px solid #E2E8F0", borderRadius: 8,
                  background: "#F8FAFC", color: "#0F172A",
                  cursor: "pointer",
                }}
              >
                {STAGES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setPopover(null)}
                style={{
                  flex: 1, fontSize: 12, fontWeight: 500,
                  padding: "7px 0", borderRadius: 8,
                  border: "1px solid #E2E8F0", background: "#fff",
                  color: "#475569", cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => void handleVendorSave()}
                disabled={popoverSaving || popoverStage === popover.stage}
                style={{
                  flex: 1, fontSize: 12, fontWeight: 600,
                  padding: "7px 0", borderRadius: 8,
                  border: "none",
                  background: (popoverSaving || popoverStage === popover.stage) ? "#E2E8F0" : "#0F172A",
                  color: (popoverSaving || popoverStage === popover.stage) ? "#94A3B8" : "#fff",
                  cursor: (popoverSaving || popoverStage === popover.stage) ? "not-allowed" : "pointer",
                }}
              >
                {popoverSaving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </>
      )}

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
              <button onClick={() => setConflictsOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 4, display: "flex" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ overflowY: "auto", flex: 1 }}>
              {conflictRows.length === 0 ? (
                <div style={{ padding: "24px", fontSize: 13, color: "#64748B", textAlign: "center" }}>
                  No conflicts found.
                </div>
              ) : (
                <>
                  <div style={{
                    display: "grid", gridTemplateColumns: "2fr 1.5fr 3fr 56px",
                    padding: "10px 24px", background: "#F8FAFC",
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

                  {conflictRows.map((row, i) => (
                    <div
                      key={`${row.vendor}-${row.stage}-${i}`}
                      style={{
                        display: "grid", gridTemplateColumns: "2fr 1.5fr 3fr 56px",
                        padding: "12px 24px", borderBottom: "1px solid #F1F5F9",
                        alignItems: "start",
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", paddingRight: 8 }}>{row.vendor}</div>
                      <div style={{ fontSize: 12, color: "#475569", paddingRight: 8 }}>{row.stage}</div>
                      <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>{row.projectNames.join(", ")}</div>
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
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#0F172A" }}>Manage Projects</h3>
              <button onClick={() => setManageOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 4, display: "flex" }}>
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
                    <div style={{
                      width: 36, height: 20, borderRadius: 999,
                      background: hidden ? "#E2E8F0" : "#6366F1",
                      position: "relative", flexShrink: 0, transition: "background 0.2s",
                    }}>
                      <div style={{
                        position: "absolute", top: 2, left: hidden ? 2 : 18,
                        width: 16, height: 16, borderRadius: "50%",
                        background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
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
