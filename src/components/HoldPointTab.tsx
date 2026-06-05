"use client";

import { useState, useRef, useCallback } from "react";
import {
  Download, RefreshCw, Plus, X, Search, FileText,
  ChevronDown, ChevronRight,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface HoldPoint {
  id:                string;
  description:       string;
  stage:             string;
  responsible_party: string;
  source:            string;
}

interface DrawingItem {
  id:              number;
  number:          string;
  title:           string;
  revision_number: string;
  pdf_url:         string;
  discipline:      string;
}

interface UploadItem {
  id:     string;
  title:  string;
  base64: string;
}

interface DashboardProject {
  id:           number;
  name:         string;
  display_name: string;
}

interface Props {
  company_id: string;
  projects:   DashboardProject[];
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STAGE_ORDER = [
  "Demolition & Excavation", "Piling & Retention", "Concrete & Structure",
  "Steel & Framing", "Facade & Roofing", "Waterproofing",
  "Services Rough-In", "Fitout & Finishes", "External Works",
  "Testing & Commissioning",
];

const STAGE_COLORS: Record<string, string> = {
  "Demolition & Excavation": "#FEF3C7", "Piling & Retention":  "#FDE8D8",
  "Concrete & Structure":    "#DBEAFE", "Steel & Framing":      "#E0E7FF",
  "Facade & Roofing":        "#F0FDF4", "Waterproofing":        "#FDF4FF",
  "Services Rough-In":       "#FFF7ED", "Fitout & Finishes":    "#F0FDF4",
  "External Works":          "#ECFDF5", "Testing & Commissioning": "#F8FAFC",
};

const STAGE_TEXT: Record<string, string> = {
  "Demolition & Excavation": "#92400E", "Piling & Retention":  "#9A3412",
  "Concrete & Structure":    "#1E40AF", "Steel & Framing":      "#3730A3",
  "Facade & Roofing":        "#166534", "Waterproofing":        "#6B21A8",
  "Services Rough-In":       "#9A3412", "Fitout & Finishes":    "#14532D",
  "External Works":          "#064E3B", "Testing & Commissioning": "#334155",
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function groupByStage(holdPoints: HoldPoint[]): Map<string, HoldPoint[]> {
  const map = new Map<string, HoldPoint[]>();
  for (const s of STAGE_ORDER) map.set(s, []);
  for (const hp of holdPoints) {
    if (!map.has(hp.stage)) map.set(hp.stage, []);
    map.get(hp.stage)!.push(hp);
  }
  for (const [k, v] of map) { if (v.length === 0) map.delete(k); }
  return map;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function HoldPointTab({ company_id, projects }: Props) {
  const [step, setStep]                         = useState<0|1|2|3>(0);
  const [projectId, setProjectId]               = useState("");
  const [projectName, setProjectName]           = useState("");

  // Step 1 — document selection
  const [recommendations, setRecommendations]   = useState<DrawingItem[]>([]);
  const [recsLoading, setRecsLoading]           = useState(false);
  const [totalDrawings, setTotalDrawings]       = useState(0);
  const [selectedIds, setSelectedIds]           = useState<Set<number>>(new Set());
  const [uploads, setUploads]                   = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging]             = useState(false);
  const [collapsedDisc, setCollapsedDisc]       = useState<Set<string>>(new Set());

  // Step 2 — generating
  const [genDocNames, setGenDocNames]           = useState<string[]>([]);
  const [genIndex, setGenIndex]                 = useState(0);
  const genIntervalRef                          = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Step 3 — register
  const [holdPoints, setHoldPoints]             = useState<HoldPoint[]>([]);
  const holdPointsRef                           = useRef<HoldPoint[]>([]);
  const [generatedAt, setGeneratedAt]           = useState<string | null>(null);
  const [saving, setSaving]                     = useState(false);
  const [savedOk, setSavedOk]                   = useState(false);
  const saveTimerRef                            = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [pdfLoading, setPdfLoading]             = useState(false);
  const [filterStage, setFilterStage]           = useState("");
  const [filterParty, setFilterParty]           = useState("");
  const [searchText, setSearchText]             = useState("");
  const [collapsedStages, setCollapsedStages]   = useState<Set<string>>(new Set());
  const [editingId, setEditingId]               = useState<string | null>(null);
  const [editValues, setEditValues]             = useState<Partial<HoldPoint>>({});
  const [addingToStage, setAddingToStage]       = useState<string | null>(null);
  const [addForm, setAddForm]                   = useState({ description: "", responsible_party: "" });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ── Project selection ────────────────────────────────────────────────────────

  const handleProjectChange = useCallback(async (pid: string) => {
    setProjectId(pid);
    const proj = projects.find(p => String(p.id) === pid);
    setProjectName(proj?.display_name ?? proj?.name ?? "");
    setRecommendations([]);
    setSelectedIds(new Set());
    setUploads([]);
    setHoldPoints([]);
    holdPointsRef.current = [];
    setGeneratedAt(null);
    if (!pid) return;

    setRecsLoading(true);
    const [savedRes, recsRes] = await Promise.all([
      fetch(`/api/holdpoint/save?company_id=${company_id}&project_id=${pid}`),
      fetch(`/api/holdpoint/drawings?company_id=${company_id}&project_id=${pid}`),
    ]);
    setRecsLoading(false);

    const savedJson = await savedRes.json() as {
      register?: { hold_points: HoldPoint[]; project_name: string; generated_at: string } | null;
    };
    const recsJson = await recsRes.json() as { recommended: DrawingItem[]; total_drawings: number };

    const recs = recsJson.recommended ?? [];
    setRecommendations(recs);
    setTotalDrawings(recsJson.total_drawings ?? 0);
    setSelectedIds(new Set(recs.map(r => r.id)));

    // Collapse all discipline groups by default
    const disciplines = [...new Set(recs.map(r => r.discipline))];
    setCollapsedDisc(new Set(disciplines));

    if (savedJson.register) {
      const reg = savedJson.register;
      holdPointsRef.current = reg.hold_points;
      setHoldPoints(reg.hold_points);
      setGeneratedAt(reg.generated_at);
      setStep(3);
    } else {
      setStep(1);
    }
  }, [company_id, projects]);

  // ── File upload ──────────────────────────────────────────────────────────────

  function handleFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files)
      .filter(f => f.name.toLowerCase().endsWith(".pdf"))
      .forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = (reader.result as string).split(",")[1];
          const title  = file.name.replace(/\.pdf$/i, "");
          setUploads(prev => {
            if (prev.some(u => u.title === title)) return prev;
            return [...prev, { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, title, base64 }];
          });
        };
        reader.readAsDataURL(file);
      });
  }

  // ── Generate ─────────────────────────────────────────────────────────────────

  async function generate() {
    const selDrawings = recommendations.filter(r => selectedIds.has(r.id));
    const totalDocs   = selDrawings.length + uploads.length;
    if (totalDocs === 0) return;

    const docNames = [
      ...selDrawings.map(d => `${d.number} — ${d.title}`),
      ...uploads.map(u => u.title),
    ];
    setGenDocNames(docNames);
    setGenIndex(0);
    setStep(2);

    // Simulate per-doc progress (advances every ~20s)
    clearInterval(genIntervalRef.current);
    genIntervalRef.current = setInterval(() => {
      setGenIndex(prev => Math.min(prev + 1, totalDocs - 1));
    }, 20_000);

    try {
      const res  = await fetch("/api/holdpoint/generate", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company_id,
          project_id:   projectId,
          project_name: projectName,
          drawings:     selDrawings.map(d => ({ id: d.id, number: d.number, title: d.title, pdf_url: d.pdf_url })),
          uploads:      uploads.map(u => ({ title: u.title, base64: u.base64 })),
        }),
      });
      const json = await res.json() as { hold_points: HoldPoint[] };
      const hps  = json.hold_points ?? [];
      holdPointsRef.current = hps;
      setHoldPoints(hps);
      setGeneratedAt(new Date().toISOString());
      setStep(3);
    } finally {
      clearInterval(genIntervalRef.current);
    }
  }

  // ── Auto-save (debounced) ────────────────────────────────────────────────────

  function applyEdit(newPoints: HoldPoint[]) {
    setHoldPoints(newPoints);
    holdPointsRef.current = newPoints;
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => void doSave(holdPointsRef.current), 1500);
  }

  async function doSave(points: HoldPoint[]) {
    setSaving(true);
    try {
      await fetch("/api/holdpoint/save", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company_id,
          project_id:   projectId,
          project_name: projectName,
          hold_points:  points,
        }),
      });
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  // ── Inline editing ───────────────────────────────────────────────────────────

  function startEdit(hp: HoldPoint) {
    setEditingId(hp.id);
    setEditValues({ description: hp.description, responsible_party: hp.responsible_party });
  }

  function commitEdit() {
    if (!editingId) return;
    applyEdit(holdPointsRef.current.map(hp =>
      hp.id === editingId ? { ...hp, ...editValues } : hp,
    ));
    setEditingId(null);
  }

  function deleteHp(id: string) {
    applyEdit(holdPointsRef.current.filter(hp => hp.id !== id));
  }

  // ── Add hold point ───────────────────────────────────────────────────────────

  function commitAdd(stage: string) {
    if (!addForm.description.trim()) return;
    const next = holdPointsRef.current;
    const newHp: HoldPoint = {
      id:                `HP-${String(next.length + 1).padStart(3, "0")}`,
      description:       addForm.description,
      stage,
      responsible_party: addForm.responsible_party,
      source:            "Manual",
    };
    applyEdit([...next, newHp]);
    setAddingToStage(null);
    setAddForm({ description: "", responsible_party: "" });
  }

  // ── PDF download ─────────────────────────────────────────────────────────────

  async function downloadPdf() {
    setPdfLoading(true);
    try {
      const res  = await fetch("/api/holdpoint/pdf", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          project_name:   projectName,
          hold_points:    holdPointsRef.current,
          generated_date: generatedAt
            ? fmtDate(generatedAt)
            : undefined,
        }),
      });
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `holdpoint-${projectName.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setPdfLoading(false);
    }
  }

  // ── Derived state ────────────────────────────────────────────────────────────

  const filteredHPs = holdPoints.filter(hp => {
    if (filterStage && hp.stage !== filterStage)                                          return false;
    if (filterParty && !hp.responsible_party.toLowerCase().includes(filterParty.toLowerCase())) return false;
    if (searchText  && !hp.description.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  const groupedHPs = groupByStage(filteredHPs);

  const disciplineGroups = recommendations.reduce<Record<string, DrawingItem[]>>((acc, d) => {
    if (!acc[d.discipline]) acc[d.discipline] = [];
    acc[d.discipline].push(d);
    return acc;
  }, {});

  const selDrawingCount = recommendations.filter(r => selectedIds.has(r.id)).length;
  const totalDocCount   = selDrawingCount + uploads.length;
  const estSeconds      = totalDocCount * 20;
  const uniqueParties   = [...new Set(holdPoints.map(hp => hp.responsible_party))].filter(Boolean).sort();

  // ══════════════════════════════════════════════════════════════════════════════
  // STEP 0 — Project selection
  // ══════════════════════════════════════════════════════════════════════════════
  if (step === 0) {
    return (
      <div style={{ padding: "40px 0", maxWidth: 480 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>
          Hold Point Register
        </h2>
        <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>
          Select a project to view or generate a printable hold point checklist.
        </p>
        <select
          value={projectId}
          onChange={e => void handleProjectChange(e.target.value)}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #CBD5E1", fontSize: 14, color: "#0F172A", background: "#FFFFFF", cursor: "pointer" }}
        >
          <option value="">— Select project —</option>
          {projects.map(p => (
            <option key={p.id} value={String(p.id)}>{p.display_name || p.name}</option>
          ))}
        </select>
        {recsLoading && (
          <div style={{ marginTop: 16, fontSize: 13, color: "#64748B" }}>Loading project data...</div>
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // STEP 1 — Document selection
  // ══════════════════════════════════════════════════════════════════════════════
  if (step === 1) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <button onClick={() => setStep(0)} style={BACK_BTN}>← Back</button>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0 }}>{projectName}</h2>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>Select documents to analyse</div>
          </div>
        </div>

        {/* A — Recommended drawings */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
                {recommendations.length} recommended drawings found
              </div>
              <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>
                General notes, design criteria and specification sheets auto-selected
                {totalDrawings > 0 && ` · ${totalDrawings} total drawings in project`}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setSelectedIds(new Set(recommendations.map(r => r.id)))}
                style={LINK_BTN}
              >
                Select all
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                style={LINK_BTN}
              >
                Clear all
              </button>
            </div>
          </div>

          {recommendations.length === 0 ? (
            <div style={{ padding: "20px 16px", border: "1px solid #E2E8F0", borderRadius: 8, color: "#94A3B8", fontSize: 13 }}>
              No drawings found in this project.
            </div>
          ) : (
            <div style={{ border: "1px solid #E2E8F0", borderRadius: 8, overflow: "hidden" }}>
              {Object.entries(disciplineGroups).map(([discipline, items]) => {
                const collapsed  = collapsedDisc.has(discipline);
                const selCount   = items.filter(d => selectedIds.has(d.id)).length;
                return (
                  <div key={discipline} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    {/* Discipline header */}
                    <button
                      onClick={() => setCollapsedDisc(prev => {
                        const n = new Set(prev);
                        if (n.has(discipline)) n.delete(discipline); else n.add(discipline);
                        return n;
                      })}
                      style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#F8FAFC", border: "none", cursor: "pointer", textAlign: "left" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {collapsed ? <ChevronRight size={14} color="#94A3B8" /> : <ChevronDown size={14} color="#94A3B8" />}
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{discipline.toUpperCase()}</span>
                        <span style={{ fontSize: 11, color: "#94A3B8" }}>{items.length} drawing{items.length !== 1 ? "s" : ""}</span>
                      </div>
                      <span style={{ fontSize: 12, color: selCount > 0 ? "#6366F1" : "#CBD5E1", fontWeight: 600 }}>
                        {selCount} selected
                      </span>
                    </button>

                    {!collapsed && items.map(d => (
                      <label
                        key={d.id}
                        style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 14px 9px 28px", borderTop: "1px solid #F8FAFC", cursor: "pointer" }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedIds.has(d.id)}
                          onChange={() => {
                            setSelectedIds(prev => {
                              const n = new Set(prev);
                              if (n.has(d.id)) n.delete(d.id); else n.add(d.id);
                              return n;
                            });
                          }}
                          style={{ marginTop: 2, accentColor: "#6366F1", flexShrink: 0 }}
                        />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                            {d.number}
                            {d.revision_number && <span style={{ fontSize: 11, color: "#94A3B8", marginLeft: 6 }}>Rev {d.revision_number}</span>}
                          </div>
                          <div style={{ fontSize: 12, color: "#64748B", marginTop: 1 }}>{d.title}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* B — Upload additional documents */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>
            + Add documents
          </div>
          <div style={{ fontSize: 12, color: "#64748B", marginBottom: 10 }}>
            For: facade reports, PCA schedules, engineering reports, consultant specifications
          </div>

          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
            style={{
              border: `2px dashed ${isDragging ? "#6366F1" : "#CBD5E1"}`,
              borderRadius: 10, padding: "24px 20px", textAlign: "center",
              cursor: "pointer", background: isDragging ? "#EEF2FF" : "#FAFAFA",
              transition: "border-color 0.15s, background 0.15s",
            }}
          >
            <FileText size={28} style={{ color: "#94A3B8", marginBottom: 8 }} />
            <div style={{ fontSize: 13, color: "#64748B" }}>Drag and drop PDFs here, or click to browse</div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            style={{ display: "none" }}
            onChange={e => { handleFiles(e.target.files); e.target.value = ""; }}
          />

          {/* Uploaded chips */}
          {uploads.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {uploads.map(u => (
                <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: 20, fontSize: 13, color: "#334155" }}>
                  <FileText size={13} style={{ color: "#6366F1" }} />
                  {u.title}.pdf
                  <button
                    onClick={() => setUploads(prev => prev.filter(x => x.id !== u.id))}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 0, marginLeft: 2, display: "flex", alignItems: "center" }}
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Generate button */}
        <button
          onClick={() => void generate()}
          disabled={totalDocCount === 0}
          style={{
            padding: "11px 28px",
            background: totalDocCount === 0 ? "#E2E8F0" : "#0F172A",
            color: totalDocCount === 0 ? "#94A3B8" : "#FFFFFF",
            border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600,
            cursor: totalDocCount === 0 ? "default" : "pointer",
          }}
        >
          {totalDocCount === 0
            ? "Generate Hold Point Register"
            : `Generate Hold Point Register — ${selDrawingCount > 0 ? `${selDrawingCount} drawing${selDrawingCount !== 1 ? "s" : ""}` : ""}${selDrawingCount > 0 && uploads.length > 0 ? " + " : ""}${uploads.length > 0 ? `${uploads.length} uploaded document${uploads.length !== 1 ? "s" : ""}` : ""}`}
        </button>
        {totalDocCount > 0 && (
          <div style={{ marginTop: 8, fontSize: 12, color: "#94A3B8" }}>Estimated time: ~{estSeconds} seconds</div>
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // STEP 2 — Generating
  // ══════════════════════════════════════════════════════════════════════════════
  if (step === 2) {
    const total      = genDocNames.length;
    const currentDoc = genDocNames[Math.min(genIndex, total - 1)];
    const pct        = total > 0 ? Math.round(((genIndex + 1) / total) * 100) : 20;

    return (
      <div style={{ padding: "60px 0", maxWidth: 520 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
          Generating Hold Point Register
        </div>
        <div style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>
          {currentDoc ? `Analysing ${currentDoc}...` : "Preparing documents..."}
        </div>
        <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 24 }}>
          ({genIndex + 1} of {total}) · ~{(total - genIndex) * 20}s remaining
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: "#E2E8F0", borderRadius: 4, overflow: "hidden", marginBottom: 20 }}>
          <div style={{
            height: "100%", background: "#0F172A", borderRadius: 4,
            width: `${pct}%`, transition: "width 0.5s ease",
          }} />
        </div>

        {/* Doc list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {genDocNames.map((name, i) => (
            <div key={i} style={{ fontSize: 12, color: i < genIndex ? "#94A3B8" : i === genIndex ? "#0F172A" : "#CBD5E1", fontWeight: i === genIndex ? 600 : 400, display: "flex", alignItems: "center", gap: 6 }}>
              {i < genIndex  && <span style={{ color: "#16A34A" }}>✓</span>}
              {i === genIndex && (
                <span style={{
                  display: "inline-block", width: 10, height: 10,
                  border: "2px solid #0F172A", borderTopColor: "transparent",
                  borderRadius: "50%", animation: "spin 0.7s linear infinite",
                }} />
              )}
              {i > genIndex  && <span style={{ width: 10, height: 10, display: "inline-block" }} />}
              {name}
            </div>
          ))}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // STEP 3 — Register view
  // ══════════════════════════════════════════════════════════════════════════════

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setStep(0)} style={BACK_BTN}>← Projects</button>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0 }}>{projectName}</h2>
          </div>
          <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 3 }}>
            {generatedAt && `Generated ${fmtDate(generatedAt)}`}
            {saving  && " · Saving..."}
            {!saving && savedOk && " · Saved"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => { setUploads([]); setStep(1); }}
            style={GHOST_BTN}
          >
            <RefreshCw size={13} /> Re-generate
          </button>
          <button
            onClick={() => void doSave(holdPointsRef.current)}
            disabled={saving}
            style={{ ...GHOST_BTN, background: "#6366F1", borderColor: "transparent", color: "#FFFFFF", opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => void downloadPdf()}
            disabled={pdfLoading}
            style={{ ...GHOST_BTN, background: "#0F172A", borderColor: "transparent", color: "#FFFFFF", opacity: pdfLoading ? 0.6 : 1 }}
          >
            <Download size={13} /> {pdfLoading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Summary pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 20, padding: "4px 12px", fontSize: 13, fontWeight: 700, color: "#0F172A" }}>
          {holdPoints.length} total
        </div>
        {STAGE_ORDER.filter(s => holdPoints.some(hp => hp.stage === s)).map(stage => (
          <div
            key={stage}
            style={{
              background:   STAGE_COLORS[stage] ?? "#F8FAFC",
              border:       "1px solid #E2E8F0",
              borderRadius: 20,
              padding:      "4px 12px",
              fontSize:     12,
              fontWeight:   600,
              color:        STAGE_TEXT[stage] ?? "#334155",
              cursor:       "pointer",
            }}
            onClick={() => setFilterStage(filterStage === stage ? "" : stage)}
          >
            {holdPoints.filter(hp => hp.stage === stage).length} {stage}
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <Search size={13} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
          <input
            type="text"
            placeholder="Search descriptions..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ padding: "7px 10px 7px 28px", border: "1px solid #E2E8F0", borderRadius: 7, fontSize: 13, width: 200 }}
          />
        </div>
        <select value={filterStage} onChange={e => setFilterStage(e.target.value)} style={SEL}>
          <option value="">All stages</option>
          {STAGE_ORDER.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterParty} onChange={e => setFilterParty(e.target.value)} style={SEL}>
          <option value="">All parties</option>
          {uniqueParties.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        {(filterStage || filterParty || searchText) && (
          <button
            onClick={() => { setFilterStage(""); setFilterParty(""); setSearchText(""); }}
            style={{ fontSize: 12, color: "#94A3B8", background: "none", border: "none", cursor: "pointer" }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Register table */}
      {filteredHPs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#94A3B8" }}>
          {holdPoints.length === 0
            ? "No hold points generated. Try re-generating with more documents."
            : "No hold points match the current filters."}
        </div>
      ) : (
        Array.from(groupedHPs.entries()).map(([stage, items]) => {
          if (items.length === 0) return null;
          const collapsed = collapsedStages.has(stage);
          const bg = STAGE_COLORS[stage] ?? "#F8FAFC";
          const fg = STAGE_TEXT[stage]   ?? "#334155";

          return (
            <div key={stage} style={{ marginBottom: 12, border: "1px solid #E2E8F0", borderRadius: 10, overflow: "hidden" }}>
              {/* Stage header */}
              <button
                onClick={() => setCollapsedStages(prev => {
                  const n = new Set(prev);
                  if (n.has(stage)) n.delete(stage); else n.add(stage);
                  return n;
                })}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", background: bg, border: "none", cursor: "pointer" }}
              >
                <span style={{ fontWeight: 700, fontSize: 13, color: fg }}>{stage}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: fg }}>{items.length} hold point{items.length !== 1 ? "s" : ""}</span>
                  {collapsed ? <ChevronRight size={14} color={fg} /> : <ChevronDown size={14} color={fg} />}
                </div>
              </button>

              {!collapsed && (
                <>
                  {/* Table header */}
                  <div style={{ display: "grid", gridTemplateColumns: "64px 1fr 180px 200px 32px", padding: "7px 16px", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", fontSize: 11, fontWeight: 700, color: "#64748B", letterSpacing: "0.05em" }}>
                    <span>#</span>
                    <span>DESCRIPTION</span>
                    <span>RESPONSIBLE</span>
                    <span>SOURCE</span>
                    <span />
                  </div>

                  {/* Rows */}
                  {items.map((hp, ri) => {
                    const isEditing = editingId === hp.id;
                    return (
                      <div
                        key={hp.id}
                        style={{ display: "grid", gridTemplateColumns: "64px 1fr 180px 200px 32px", padding: "8px 16px", borderBottom: "1px solid #F8FAFC", background: ri % 2 === 0 ? "#FFFFFF" : "#FAFAFA", alignItems: "center", fontSize: 13 }}
                      >
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#6366F1" }}>{hp.id}</span>

                        {isEditing ? (
                          <input
                            autoFocus
                            value={editValues.description ?? ""}
                            onChange={e => setEditValues(v => ({ ...v, description: e.target.value }))}
                            onBlur={commitEdit}
                            onKeyDown={e => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") setEditingId(null); }}
                            style={{ padding: "3px 6px", border: "1px solid #6366F1", borderRadius: 4, fontSize: 13, width: "100%" }}
                          />
                        ) : (
                          <span
                            onClick={() => startEdit(hp)}
                            style={{ color: "#0F172A", paddingRight: 8, cursor: "text" }}
                            title="Click to edit"
                          >
                            {hp.description}
                          </span>
                        )}

                        {isEditing ? (
                          <input
                            value={editValues.responsible_party ?? ""}
                            onChange={e => setEditValues(v => ({ ...v, responsible_party: e.target.value }))}
                            onBlur={commitEdit}
                            style={{ padding: "3px 6px", border: "1px solid #6366F1", borderRadius: 4, fontSize: 12 }}
                          />
                        ) : (
                          <span
                            onClick={() => startEdit(hp)}
                            style={{ color: "#475569", fontSize: 12, cursor: "text" }}
                            title="Click to edit"
                          >
                            {hp.responsible_party}
                          </span>
                        )}

                        <span style={{ color: "#94A3B8", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {hp.source}
                        </span>

                        <button
                          onClick={() => deleteHp(hp.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#CBD5E1", padding: 0 }}
                          title="Delete"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    );
                  })}

                  {/* Add hold point */}
                  {addingToStage === stage ? (
                    <div style={{ display: "flex", gap: 8, padding: "10px 16px", background: "#F8FAFC", borderTop: "1px solid #E2E8F0", flexWrap: "wrap", alignItems: "center" }}>
                      <input
                        autoFocus
                        placeholder="Description *"
                        value={addForm.description}
                        onChange={e => setAddForm(v => ({ ...v, description: e.target.value }))}
                        onKeyDown={e => { if (e.key === "Enter") commitAdd(stage); if (e.key === "Escape") setAddingToStage(null); }}
                        style={{ ...INPUT, flex: 2, minWidth: 200 }}
                      />
                      <input
                        placeholder="Responsible party"
                        value={addForm.responsible_party}
                        onChange={e => setAddForm(v => ({ ...v, responsible_party: e.target.value }))}
                        style={{ ...INPUT, minWidth: 150 }}
                      />
                      <button onClick={() => commitAdd(stage)} style={{ padding: "6px 14px", background: "#0F172A", border: "none", borderRadius: 6, color: "#FFFFFF", fontSize: 13, cursor: "pointer" }}>Add</button>
                      <button onClick={() => setAddingToStage(null)} style={{ padding: "6px 10px", background: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: 6, fontSize: 13, cursor: "pointer", color: "#64748B" }}>Cancel</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingToStage(stage)}
                      style={{ width: "100%", padding: "8px 16px", background: "none", border: "none", textAlign: "left", fontSize: 13, color: "#94A3B8", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, borderTop: "1px solid #F8FAFC" }}
                    >
                      <Plus size={13} /> Add hold point
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

// ── Style constants ────────────────────────────────────────────────────────────

const BACK_BTN: React.CSSProperties = {
  background: "none", border: "none", color: "#6366F1",
  cursor: "pointer", fontSize: 13, padding: 0,
};

const GHOST_BTN: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 6,
  padding: "7px 13px", background: "#F1F5F9",
  border: "1px solid #E2E8F0", borderRadius: 8,
  cursor: "pointer", fontSize: 13, color: "#475569",
  whiteSpace: "nowrap",
};

const LINK_BTN: React.CSSProperties = {
  background: "none", border: "none",
  color: "#6366F1", cursor: "pointer", fontSize: 12,
};

const SEL: React.CSSProperties = {
  padding: "7px 10px", border: "1px solid #E2E8F0",
  borderRadius: 7, fontSize: 13, color: "#475569", background: "#FFFFFF",
};

const INPUT: React.CSSProperties = {
  padding: "6px 10px", border: "1px solid #E2E8F0",
  borderRadius: 6, fontSize: 13, color: "#0F172A",
};
