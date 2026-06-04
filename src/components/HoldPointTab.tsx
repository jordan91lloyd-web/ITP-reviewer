"use client";

import { useState, useRef, useCallback } from "react";
import { Download, RefreshCw, Plus, X, Search, FileText, ChevronDown, ChevronRight } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface HoldPoint {
  id:                string;
  description:       string;
  trade:             string;
  stage:             string;
  responsible_party: string;
  source_reference:  string;
  completed:         boolean;
}

interface UploadItem {
  id:     string;
  title:  string;  // filename without .pdf
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

const STAGE_ORDER = [
  "Demolition", "Structure", "Facade", "Services Rough-In",
  "Fitout", "External Works", "Defects & Handover",
];

const STAGE_COLORS: Record<string, string> = {
  "Demolition":        "#FEF3C7",
  "Structure":         "#DBEAFE",
  "Facade":            "#F0FDF4",
  "Services Rough-In": "#FDF4FF",
  "Fitout":            "#FFF7ED",
  "External Works":    "#ECFDF5",
  "Defects & Handover":"#F8FAFC",
};

const STAGE_TEXT: Record<string, string> = {
  "Demolition":        "#92400E",
  "Structure":         "#1E40AF",
  "Facade":            "#166534",
  "Services Rough-In": "#6B21A8",
  "Fitout":            "#9A3412",
  "External Works":    "#14532D",
  "Defects & Handover":"#334155",
};

const TRADES = [
  "Concrete","Waterproofing","Structural Steel","Facade","Fire Services",
  "Electrical","Mechanical","Plumbing","Carpentry","Tiling","Painting","General",
];

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
  // Step: 0=select project, 1=upload docs, 2=generating, 3=register
  const [step, setStep]                       = useState<0|1|2|3>(0);
  const [selectedProjectId, setProjectId]     = useState<string>("");
  const [selectedProjectName, setProjectName] = useState<string>("");
  const [uploads, setUploads]                 = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging]           = useState(false);
  const [generating, setGenerating]           = useState(false);
  const [holdPoints, setHoldPoints]           = useState<HoldPoint[]>([]);
  const [generatedAt, setGeneratedAt]         = useState<string | null>(null);
  const [pdfLoading, setPdfLoading]           = useState(false);
  const [saving, setSaving]                   = useState(false);
  // Register view state
  const [filterStage, setFilterStage]         = useState("");
  const [filterTrade, setFilterTrade]         = useState("");
  const [filterParty, setFilterParty]         = useState("");
  const [searchRegister, setSearchRegister]   = useState("");
  const [collapsedStages, setCollapsedStages] = useState<Set<string>>(new Set());
  // Inline editing
  const [editingId, setEditingId]             = useState<string | null>(null);
  const [editValues, setEditValues]           = useState<Partial<HoldPoint>>({});
  // Add hold point form per stage
  const [addingToStage, setAddingToStage]     = useState<string | null>(null);
  const [addForm, setAddForm]                 = useState({ description: "", trade: "General", responsible_party: "", source_reference: "" });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ── Load saved register on project select ──────────────────────────────────
  const loadSaved = useCallback(async (projId: string) => {
    if (!projId || !company_id) return null;
    const res = await fetch(`/api/holdpoint/save?company_id=${company_id}&project_id=${projId}`);
    const json = await res.json() as { register?: { hold_points: HoldPoint[]; generated_at: string } | null };
    return json.register ?? null;
  }, [company_id]);

  async function handleProjectChange(projId: string) {
    setProjectId(projId);
    const proj = projects.find(p => String(p.id) === projId);
    setProjectName(proj?.display_name ?? proj?.name ?? "");
    setUploads([]);
    setHoldPoints([]);
    setGeneratedAt(null);
    if (!projId) return;

    const saved = await loadSaved(projId);
    if (saved) {
      setHoldPoints(saved.hold_points);
      setGeneratedAt(saved.generated_at);
      setStep(3);
    } else {
      setStep(1);
    }
  }

  // ── File handling ──────────────────────────────────────────────────────────
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
            return [...prev, {
              id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              title,
              base64,
            }];
          });
        };
        reader.readAsDataURL(file);
      });
  }

  function removeUpload(id: string) {
    setUploads(prev => prev.filter(u => u.id !== id));
  }

  // ── Generate ───────────────────────────────────────────────────────────────
  async function generate() {
    if (!uploads.length) return;
    setGenerating(true);
    setStep(2);
    try {
      const res = await fetch("/api/holdpoint/generate", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company_id,
          project_id:   selectedProjectId,
          project_name: selectedProjectName,
          documents:    uploads.map(u => ({
            title:      u.title,
            base64:     u.base64,
            media_type: "application/pdf",
          })),
        }),
      });
      const json = await res.json() as { hold_points: HoldPoint[] };
      setHoldPoints(json.hold_points ?? []);
      setGeneratedAt(new Date().toISOString());
      setStep(3);
    } finally {
      setGenerating(false);
    }
  }

  // ── Inline edit ────────────────────────────────────────────────────────────
  function startEdit(hp: HoldPoint) {
    setEditingId(hp.id);
    setEditValues({ description: hp.description, responsible_party: hp.responsible_party });
  }

  function commitEdit() {
    if (!editingId) return;
    setHoldPoints(prev => prev.map(hp =>
      hp.id === editingId ? { ...hp, ...editValues } : hp,
    ));
    setEditingId(null);
  }

  function deleteHp(id: string) {
    setHoldPoints(prev => prev.filter(hp => hp.id !== id));
  }

  // ── Add hold point ─────────────────────────────────────────────────────────
  function commitAdd(stage: string) {
    if (!addForm.description.trim()) return;
    const newHp: HoldPoint = {
      id:                `HP-${String(holdPoints.length + 1).padStart(3, "0")}`,
      description:       addForm.description,
      trade:             addForm.trade,
      stage,
      responsible_party: addForm.responsible_party,
      source_reference:  addForm.source_reference,
      completed:         false,
    };
    setHoldPoints(prev => [...prev, newHp]);
    setAddingToStage(null);
    setAddForm({ description: "", trade: "General", responsible_party: "", source_reference: "" });
  }

  // ── Save changes ───────────────────────────────────────────────────────────
  async function saveChanges() {
    setSaving(true);
    try {
      await fetch("/api/holdpoint/save", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          company_id,
          project_id:   selectedProjectId,
          project_name: selectedProjectName,
          hold_points:  holdPoints,
        }),
      });
    } finally {
      setSaving(false);
    }
  }

  // ── PDF download ───────────────────────────────────────────────────────────
  async function downloadPdf() {
    setPdfLoading(true);
    try {
      const res = await fetch("/api/holdpoint/pdf", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ project_name: selectedProjectName, hold_points: holdPoints }),
      });
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `holdpoint-register-${selectedProjectName.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setPdfLoading(false);
    }
  }

  // ── Filter hold points for register view ───────────────────────────────────
  const filteredHPs = holdPoints.filter(hp => {
    if (filterStage && hp.stage !== filterStage) return false;
    if (filterTrade && hp.trade !== filterTrade) return false;
    if (filterParty && !hp.responsible_party.toLowerCase().includes(filterParty.toLowerCase())) return false;
    if (searchRegister && !hp.description.toLowerCase().includes(searchRegister.toLowerCase())) return false;
    return true;
  });

  const grouped   = groupByStage(filteredHPs);
  const docCount  = uploads.length;
  const estSeconds = docCount * 15;

  // ── Step 0: Project selection ──────────────────────────────────────────────
  if (step === 0) {
    return (
      <div style={{ padding: "40px 0", maxWidth: 480 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>
          Hold Point Register
        </h2>
        <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>
          Select a project to view or generate a register.
        </p>
        <select
          value={selectedProjectId}
          onChange={e => void handleProjectChange(e.target.value)}
          style={{
            width: "100%", padding: "10px 14px", borderRadius: 8,
            border: "1px solid #CBD5E1", fontSize: 14, color: "#0F172A",
            background: "#FFFFFF", cursor: "pointer",
          }}
        >
          <option value="">— Select project —</option>
          {projects.map(p => (
            <option key={p.id} value={String(p.id)}>
              {p.display_name || p.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // ── Step 1: Upload portal ──────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 640 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button
            onClick={() => setStep(0)}
            style={{ background: "none", border: "none", color: "#6366F1", cursor: "pointer", fontSize: 13 }}
          >
            ← Back
          </button>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0 }}>
            {selectedProjectName}
          </h2>
        </div>

        {/* Drop zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
          style={{
            border: `2px dashed ${isDragging ? "#6366F1" : "#CBD5E1"}`,
            borderRadius: 12,
            padding: "44px 24px",
            textAlign: "center",
            cursor: "pointer",
            background: isDragging ? "#EEF2FF" : "#FAFAFA",
            transition: "border-color 0.15s, background 0.15s",
          }}
        >
          <FileText size={40} style={{ color: "#94A3B8", marginBottom: 14 }} />
          <div style={{ fontSize: 16, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>
            Upload Documents to Analyse
          </div>
          <div style={{ fontSize: 14, color: "#64748B", marginBottom: 12 }}>
            Drag and drop PDFs here, or click to browse
          </div>
          <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>
            Supports: Specifications, Structural Notes, PCA Reports,<br />
            Facade Reports, Engineering Consultant Reports
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          style={{ display: "none" }}
          onChange={e => { handleFiles(e.target.files); e.target.value = ""; }}
        />

        {/* Uploaded file list */}
        {uploads.length > 0 && (
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            {uploads.map(u => (
              <div
                key={u.id}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", background: "#F8FAFC",
                  border: "1px solid #E2E8F0", borderRadius: 8,
                }}
              >
                <FileText size={16} style={{ color: "#6366F1", flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 13, color: "#0F172A" }}>{u.title}.pdf</span>
                <button
                  onClick={() => removeUpload(u.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 0 }}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Generate button */}
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => void generate()}
            disabled={docCount === 0}
            style={{
              padding: "10px 24px",
              background: docCount === 0 ? "#E2E8F0" : "#0F172A",
              color: docCount === 0 ? "#94A3B8" : "#FFFFFF",
              border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600,
              cursor: docCount === 0 ? "default" : "pointer",
            }}
          >
            {docCount === 0
              ? "Analyse documents"
              : `Analyse ${docCount} document${docCount !== 1 ? "s" : ""} (~${estSeconds} seconds)`}
          </button>
        </div>
      </div>
    );
  }

  // ── Step 2: Generating ─────────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>
          Generating hold point register...
        </div>
        <div style={{ fontSize: 13, color: "#64748B", marginBottom: 24 }}>
          Analysing {docCount} document{docCount !== 1 ? "s" : ""} with Claude AI.
          This may take ~{estSeconds} seconds.
        </div>
        <div style={{ width: 320, margin: "0 auto", height: 6, background: "#E2E8F0", borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            height: "100%", background: "#6366F1", borderRadius: 4,
            animation: "progress-slide 2s ease-in-out infinite alternate",
            width: "40%",
          }} />
        </div>
        <style>{`@keyframes progress-slide { from { margin-left: 0; } to { margin-left: 60%; } }`}</style>
      </div>
    );
  }

  // ── Step 3: Register view ──────────────────────────────────────────────────
  const uniqueParties = [...new Set(holdPoints.map(hp => hp.responsible_party))].sort();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setStep(0)}
              style={{ background: "none", border: "none", color: "#6366F1", cursor: "pointer", fontSize: 13 }}
            >
              ← Projects
            </button>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0 }}>
              {selectedProjectName}
            </h2>
          </div>
          {generatedAt && (
            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
              Last generated: {fmtDate(generatedAt)}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => { setUploads([]); setStep(1); }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 13, color: "#475569", cursor: "pointer" }}
          >
            <RefreshCw size={13} /> Re-generate
          </button>
          <button
            onClick={() => void saveChanges()}
            disabled={saving}
            style={{ padding: "8px 14px", background: "#6366F1", border: "none", borderRadius: 8, fontSize: 13, color: "#FFFFFF", cursor: "pointer", opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={() => void downloadPdf()}
            disabled={pdfLoading}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#0F172A", border: "none", borderRadius: 8, fontSize: 13, color: "#FFFFFF", cursor: "pointer", opacity: pdfLoading ? 0.6 : 1 }}
          >
            <Download size={13} /> {pdfLoading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Summary bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "10px 16px", minWidth: 100 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>{holdPoints.length}</div>
          <div style={{ fontSize: 11, color: "#64748B" }}>Total hold points</div>
        </div>
        {STAGE_ORDER.filter(s => holdPoints.some(hp => hp.stage === s)).map(stage => (
          <div key={stage} style={{ background: STAGE_COLORS[stage] ?? "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "10px 16px", minWidth: 80 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: STAGE_TEXT[stage] ?? "#334155" }}>
              {holdPoints.filter(hp => hp.stage === stage).length}
            </div>
            <div style={{ fontSize: 11, color: STAGE_TEXT[stage] ?? "#334155" }}>{stage}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <Search size={13} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
          <input
            type="text"
            placeholder="Search..."
            value={searchRegister}
            onChange={e => setSearchRegister(e.target.value)}
            style={{ padding: "7px 10px 7px 28px", border: "1px solid #E2E8F0", borderRadius: 7, fontSize: 13, width: 160 }}
          />
        </div>
        <select value={filterStage} onChange={e => setFilterStage(e.target.value)} style={SEL}>
          <option value="">All stages</option>
          {STAGE_ORDER.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterTrade} onChange={e => setFilterTrade(e.target.value)} style={SEL}>
          <option value="">All trades</option>
          {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterParty} onChange={e => setFilterParty(e.target.value)} style={SEL}>
          <option value="">All parties</option>
          {uniqueParties.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        {(filterStage || filterTrade || filterParty || searchRegister) && (
          <button
            onClick={() => { setFilterStage(""); setFilterTrade(""); setFilterParty(""); setSearchRegister(""); }}
            style={{ fontSize: 12, color: "#94A3B8", background: "none", border: "none", cursor: "pointer" }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Register table */}
      {filteredHPs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#94A3B8" }}>
          No hold points match the current filters.
        </div>
      ) : (
        Array.from(grouped.entries()).map(([stage, items]) => {
          if (items.length === 0) return null;
          const collapsed = collapsedStages.has(stage);
          const bg = STAGE_COLORS[stage] ?? "#F8FAFC";
          const fg = STAGE_TEXT[stage] ?? "#334155";
          return (
            <div key={stage} style={{ marginBottom: 16, border: "1px solid #E2E8F0", borderRadius: 10, overflow: "hidden" }}>
              {/* Stage header */}
              <button
                onClick={() => setCollapsedStages(prev => { const n = new Set(prev); if (n.has(stage)) n.delete(stage); else n.add(stage); return n; })}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: bg, border: "none", cursor: "pointer" }}
              >
                <span style={{ fontWeight: 700, fontSize: 14, color: fg }}>{stage}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: fg }}>{items.length} hold point{items.length !== 1 ? "s" : ""}</span>
                  {collapsed ? <ChevronRight size={14} color={fg} /> : <ChevronDown size={14} color={fg} />}
                </div>
              </button>

              {!collapsed && (
                <>
                  {/* Table header */}
                  <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 110px 160px 160px 36px", gap: 0, background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", padding: "8px 16px", fontSize: 11, fontWeight: 700, color: "#64748B", letterSpacing: "0.05em" }}>
                    <span>#</span>
                    <span>DESCRIPTION</span>
                    <span>TRADE</span>
                    <span>RESPONSIBLE PARTY</span>
                    <span>SOURCE</span>
                    <span />
                  </div>

                  {/* Rows */}
                  {items.map((hp, ri) => {
                    const isEditing = editingId === hp.id;
                    return (
                      <div
                        key={hp.id}
                        style={{ display: "grid", gridTemplateColumns: "70px 1fr 110px 160px 160px 36px", gap: 0, padding: "9px 16px", borderBottom: "1px solid #F8FAFC", background: ri % 2 === 0 ? "#FFFFFF" : "#FAFAFA", alignItems: "center", fontSize: 13 }}
                      >
                        <span style={{ fontWeight: 700, color: "#6366F1", fontSize: 12 }}>{hp.id}</span>
                        {isEditing ? (
                          <input
                            autoFocus
                            value={editValues.description ?? hp.description}
                            onChange={e => setEditValues(v => ({ ...v, description: e.target.value }))}
                            onBlur={commitEdit}
                            onKeyDown={e => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") setEditingId(null); }}
                            style={{ padding: "3px 6px", border: "1px solid #6366F1", borderRadius: 4, fontSize: 13, width: "100%" }}
                          />
                        ) : (
                          <span
                            onClick={() => startEdit(hp)}
                            style={{ cursor: "text", color: "#0F172A", paddingRight: 8 }}
                            title="Click to edit"
                          >
                            {hp.description}
                          </span>
                        )}
                        <span style={{ color: "#475569", fontSize: 12 }}>{hp.trade}</span>
                        {isEditing ? (
                          <input
                            value={editValues.responsible_party ?? hp.responsible_party}
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
                        <span style={{ color: "#94A3B8", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{hp.source_reference}</span>
                        <button
                          onClick={() => deleteHp(hp.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#CBD5E1", padding: 0 }}
                          title="Delete"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}

                  {/* Add hold point */}
                  {addingToStage === stage ? (
                    <div style={{ padding: "10px 16px", background: "#F8FAFC", borderTop: "1px solid #E2E8F0", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <input
                        autoFocus
                        placeholder="Description *"
                        value={addForm.description}
                        onChange={e => setAddForm(v => ({ ...v, description: e.target.value }))}
                        style={{ ...INPUT, flex: 2, minWidth: 180 }}
                      />
                      <select value={addForm.trade} onChange={e => setAddForm(v => ({ ...v, trade: e.target.value }))} style={INPUT}>
                        {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input
                        placeholder="Responsible party"
                        value={addForm.responsible_party}
                        onChange={e => setAddForm(v => ({ ...v, responsible_party: e.target.value }))}
                        style={{ ...INPUT, minWidth: 140 }}
                      />
                      <input
                        placeholder="Source reference"
                        value={addForm.source_reference}
                        onChange={e => setAddForm(v => ({ ...v, source_reference: e.target.value }))}
                        style={{ ...INPUT, minWidth: 130 }}
                      />
                      <button onClick={() => commitAdd(stage)} style={{ padding: "6px 14px", background: "#6366F1", border: "none", borderRadius: 6, color: "#FFFFFF", fontSize: 13, cursor: "pointer" }}>Add</button>
                      <button onClick={() => setAddingToStage(null)} style={{ padding: "6px 10px", background: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: 6, fontSize: 13, cursor: "pointer", color: "#64748B" }}>Cancel</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingToStage(stage)}
                      style={{ width: "100%", padding: "8px 16px", background: "none", border: "none", textAlign: "left", fontSize: 13, color: "#94A3B8", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, borderTop: "1px solid #F1F5F9" }}
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

const SEL: React.CSSProperties = {
  padding: "7px 10px", border: "1px solid #E2E8F0",
  borderRadius: 7, fontSize: 13, color: "#475569", background: "#FFFFFF",
};

const INPUT: React.CSSProperties = {
  padding: "6px 10px", border: "1px solid #E2E8F0",
  borderRadius: 6, fontSize: 13, color: "#0F172A",
};
