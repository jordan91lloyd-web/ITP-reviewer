"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight } from "lucide-react";
import type { ConvertedInspection, InspectionItem } from "@/lib/inspectionCreatorTypes";

const ALLOWED_TYPES = new Set([
  "application/pdf", "image/jpeg", "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);
const ALLOWED_EXTENSIONS = new Set([".pdf", ".jpg", ".jpeg", ".png", ".docx", ".xlsx"]);
const LEGACY_EXTENSIONS = new Set([".doc", ".xls"]);
const MAX_SIZE = 32 * 1024 * 1024;

interface SimpleProject { id: number; name: string; display_name: string; project_number: string | null }
interface SimpleLocation { id: number; name: string; path?: string; depth?: number }

interface UploadResult {
  success: boolean;
  inspection_id?: number;
  inspection_url?: string;
  sections_created?: number;
  items_created?: number;
  verified?: boolean;
  verified_item_count?: number;
  error?: string;
  company_template_id?: number;
  project_template_id?: number;
}

export default function InspectionCreatorTab({ company_id }: { company_id: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inspection, setInspection] = useState<ConvertedInspection | null>(null);
  const [editableItems, setEditableItems] = useState<InspectionItem[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Procore selectors
  const [projects, setProjects] = useState<SimpleProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [locations, setLocations] = useState<SimpleLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [inspectionDate, setInspectionDate] = useState("");
  const [projectsLoading, setProjectsLoading] = useState(false);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Collapsed sections
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  // Load projects on mount
  useEffect(() => {
    if (!company_id) return;
    setProjectsLoading(true);
    fetch(`/api/dashboard/projects?company_id=${company_id}`)
      .then((r) => r.json())
      .then((data) => setProjects(data.projects ?? []))
      .catch(() => {})
      .finally(() => setProjectsLoading(false));
  }, [company_id]);

  // Load locations when project changes
  useEffect(() => {
    if (!selectedProjectId) { setLocations([]); return; }
    fetch(`/api/inspection-creator/locations?project_id=${selectedProjectId}&company_id=${company_id}`)
      .then((r) => r.json())
      .then((data) => setLocations(data.locations ?? []))
      .catch(() => setLocations([]));
  }, [selectedProjectId, company_id]);

  const handleFile = useCallback((f: File) => {
    setError(null); setInspection(null); setUploadResult(null); setUploadError(null);
    const ext = f.name.toLowerCase().slice(f.name.lastIndexOf("."));
    if (LEGACY_EXTENSIONS.has(ext)) { setError(`Legacy ${ext} not supported — re-save as ${ext === ".doc" ? ".docx" : ".xlsx"}.`); return; }
    if (!ALLOWED_TYPES.has(f.type) && !ALLOWED_EXTENSIONS.has(ext)) { setError("Unsupported file type. Use PDF, JPG, PNG, DOCX, or XLSX."); return; }
    if (f.size > MAX_SIZE) { setError(`File too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Max 32 MB.`); return; }
    setFile(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleConvert = async () => {
    if (!file) return;
    setIsLoading(true); setError(null); setInspection(null); setUploadResult(null); setUploadError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/inspection-creator/convert", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) { setError(data.error ?? "Conversion failed."); }
      else {
        setInspection(data.inspection);
        setEditableItems(data.inspection.items);
        setTemplateName(data.inspection.template_name);
        setDescription(data.inspection.description);
      }
    } catch { setError("Conversion timed out or failed. Try again."); }
    finally { setIsLoading(false); }
  };

  const handleUpload = async () => {
    if (!inspection || !selectedProjectId) return;
    setIsUploading(true); setUploadError(null); setUploadResult(null);
    try {
      const updatedInspection: ConvertedInspection = {
        ...inspection,
        template_name: templateName,
        description,
        items: editableItems,
      };
      const fd = new FormData();
      fd.append("payload", JSON.stringify({
        inspection: updatedInspection,
        project_id: selectedProjectId,
        company_id: parseInt(company_id),
        location_id: selectedLocationId ?? undefined,
        inspection_date: inspectionDate || undefined,
      }));
      const res = await fetch("/api/inspection-creator/upload", { method: "POST", body: fd });
      const data: UploadResult = await res.json();
      if (data.success) { setUploadResult(data); }
      else { setUploadError(data.error ?? "Upload failed."); if (data.company_template_id) setUploadResult(data); }
    } catch { setUploadError("Could not reach the upload service."); }
    finally { setIsUploading(false); }
  };

  const handleReset = () => {
    setFile(null); setInspection(null); setEditableItems([]); setError(null);
    setUploadResult(null); setUploadError(null); setTemplateName(""); setDescription("");
  };

  // ── Editable item helpers ────────────────────────────────────────
  const updateItemName = (seq: number, name: string) => {
    setEditableItems((prev) => prev.map((it) => it.sequence === seq ? { ...it, item_name: name } : it));
  };

  const deleteItem = (seq: number) => {
    setEditableItems((prev) => prev.filter((it) => it.sequence !== seq));
  };

  const addItem = (sectionName: string) => {
    const maxSeq = editableItems.reduce((max, it) => Math.max(max, it.sequence), 0);
    setEditableItems((prev) => [...prev, {
      sequence: maxSeq + 1,
      section: sectionName,
      item_name: "",
      original_item_number: null,
      source_reference: null,
      original_report_content: "Manually added",
    }]);
  };

  const addSection = () => {
    const name = `New Section ${Date.now() % 1000}`;
    const maxSeq = editableItems.reduce((max, it) => Math.max(max, it.sequence), 0);
    setEditableItems((prev) => [...prev, {
      sequence: maxSeq + 1,
      section: name,
      item_name: "",
      original_item_number: null,
      source_reference: null,
      original_report_content: "Manually added",
    }]);
  };

  const renameSection = (oldName: string, newName: string) => {
    if (!newName.trim() || newName === oldName) return;
    setEditableItems((prev) => prev.map((it) => it.section === oldName ? { ...it, section: newName } : it));
  };

  const deleteSection = (sectionName: string) => {
    setEditableItems((prev) => prev.filter((it) => it.section !== sectionName));
  };

  const toggleSection = (name: string) => {
    setCollapsedSections((prev) => { const s = new Set(prev); s.has(name) ? s.delete(name) : s.add(name); return s; });
  };

  // Group items by section (preserving order)
  const sections: Record<string, InspectionItem[]> = {};
  for (const it of editableItems) {
    (sections[it.section] ??= []).push(it);
  }

  const canUpload = !!selectedProjectId && editableItems.length > 0;

  return (
    <div style={{ maxWidth: 768, margin: "0 auto", padding: "40px 16px" }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--hp-warm-900)" }}>Report to Inspection</h1>
        <p style={{ marginTop: 4, fontSize: 14, color: "var(--hp-text-secondary)" }}>
          Upload a report and convert it into a Procore inspection with editable checklist items.
        </p>
      </header>

      {/* ── Project + Location selectors ─────────────────────────────── */}
      <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Target project</label>
          <select
            value={selectedProjectId ?? ""}
            onChange={(e) => { setSelectedProjectId(e.target.value ? Number(e.target.value) : null); setSelectedLocationId(null); }}
            disabled={projectsLoading || projects.length === 0}
            style={{ width: "100%", borderRadius: 8, border: "1px solid #d1d5db", padding: "8px 12px", fontSize: 14, color: "#1f2937" }}
          >
            <option value="">{projectsLoading ? "Loading..." : projects.length === 0 ? "No projects" : "\u2014 Choose a project \u2014"}</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.project_number ? `${p.project_number} \u2014 ` : ""}{p.display_name || p.name}</option>)}
          </select>
        </div>

        {selectedProjectId && (
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Location (optional)</label>
              <select
                value={selectedLocationId ?? ""}
                onChange={(e) => setSelectedLocationId(e.target.value ? Number(e.target.value) : null)}
                style={{ width: "100%", borderRadius: 8, border: "1px solid #d1d5db", padding: "8px 12px", fontSize: 14, color: "#1f2937" }}
              >
                <option value="">None</option>
                {locations.map((loc) => <option key={loc.id} value={loc.id}>{loc.path ?? loc.name}</option>)}
              </select>
            </div>
            <div style={{ width: 180 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Date (optional)</label>
              <input
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                style={{ width: "100%", borderRadius: 8, border: "1px solid #d1d5db", padding: "8px 12px", fontSize: 14, color: "#1f2937" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Upload zone ──────────────────────────────────────────────── */}
      {!inspection && (
        <div>
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            style={{
              cursor: "pointer", borderRadius: 8, border: "2px dashed", padding: 40, textAlign: "center", transition: "border-color 0.15s",
              borderColor: isDragging ? "var(--hp-accent)" : "var(--hp-border)",
              backgroundColor: isDragging ? "var(--hp-warm-100)" : "var(--hp-surface)",
            }}
          >
            <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx" style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            {file ? (
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "var(--hp-warm-800)" }}>{file.name}</p>
                <p style={{ fontSize: 12, marginTop: 4, color: "var(--hp-text-muted)" }}>{(file.size / 1024 / 1024).toFixed(1)} MB &middot; Click or drag to replace</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "var(--hp-warm-700)" }}>Drop a report here, or click to select</p>
                <p style={{ fontSize: 12, marginTop: 4, color: "var(--hp-text-muted)" }}>PDF, JPG, PNG, DOCX, or XLSX &middot; Max 32 MB</p>
              </div>
            )}
          </div>

          {error && (
            <div style={{ marginTop: 16, borderRadius: 8, padding: "12px 16px", fontSize: 14, fontWeight: 500, backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b" }}>
              {error}
            </div>
          )}

          <button onClick={handleConvert} disabled={!file || isLoading}
            style={{ marginTop: 16, width: "100%", borderRadius: 8, backgroundColor: "#d97706", padding: "12px 16px", fontSize: 14, fontWeight: 600, color: "white", border: "none", cursor: file && !isLoading ? "pointer" : "not-allowed", opacity: !file || isLoading ? 0.4 : 1 }}>
            {isLoading ? "Converting\u2026 this can take up to a minute" : "Convert to Inspection"}
          </button>
        </div>
      )}

      {/* ── Editable preview ─────────────────────────────────────────── */}
      {inspection && (
        <div>
          {/* Upload controls at top */}
          <div style={{ marginBottom: 24 }}>
            {uploadError && (
              <div style={{ marginBottom: 16, borderRadius: 8, padding: "12px 16px", fontSize: 14, fontWeight: 500, backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b" }}>
                <p>{uploadError}</p>
                {uploadResult?.company_template_id && (
                  <p style={{ marginTop: 4, fontSize: 12 }}>A partial template was created — you may need to delete company template {uploadResult.company_template_id} in Procore.</p>
                )}
              </div>
            )}

            {uploadResult?.success && (
              <div style={{ marginBottom: 16, borderRadius: 8, padding: "16px", fontSize: 14, backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534" }}>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Inspection created in Procore</p>
                <p>{uploadResult.sections_created} section{uploadResult.sections_created === 1 ? "" : "s"}, {uploadResult.items_created} item{uploadResult.items_created === 1 ? "" : "s"}</p>
                {uploadResult.verified && <p style={{ marginTop: 4, fontSize: 12, color: "#15803d" }}>Verified: {uploadResult.verified_item_count} items confirmed</p>}
                {uploadResult.inspection_url && (
                  <a href={uploadResult.inspection_url} target="_blank" rel="noopener noreferrer"
                    style={{ marginTop: 8, display: "inline-block", fontSize: 14, fontWeight: 500, textDecoration: "underline", color: "#166534" }}>
                    Open in Procore &rarr;
                  </a>
                )}
              </div>
            )}

            {!uploadResult?.success && (
              <>
                {!canUpload && <p style={{ marginBottom: 8, fontSize: 12, color: "var(--hp-text-muted)" }}>Select a project above before uploading.</p>}
                <button onClick={handleUpload} disabled={!canUpload || isUploading}
                  style={{ width: "100%", borderRadius: 8, backgroundColor: "#d97706", padding: "12px 16px", fontSize: 14, fontWeight: 600, color: "white", border: "none", cursor: canUpload && !isUploading ? "pointer" : "not-allowed", opacity: !canUpload || isUploading ? 0.4 : 1 }}>
                  {isUploading ? "Creating inspection in Procore\u2026" : "Create Inspection in Procore"}
                </button>
              </>
            )}
          </div>

          {/* Banner */}
          <div style={{ marginBottom: 24, borderRadius: 8, padding: "12px 16px", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "var(--hp-warm-100)", border: "1px solid var(--hp-border)", color: "var(--hp-warm-800)" }}>
            <span>{editableItems.length} item{editableItems.length !== 1 ? "s" : ""} across {Object.keys(sections).length} section{Object.keys(sections).length !== 1 ? "s" : ""} &mdash; edit before uploading</span>
            <div style={{ display: "flex", gap: 12, flexShrink: 0, marginLeft: 16 }}>
              <button onClick={handleReset} style={{ fontSize: 14, fontWeight: 500, color: "var(--hp-accent)", background: "none", border: "none", cursor: "pointer" }}>Start over</button>
            </div>
          </div>

          {/* Template name + description */}
          <div style={{ marginBottom: 24, borderRadius: 8, padding: 20, backgroundColor: "var(--hp-surface)", border: "1px solid var(--hp-border)" }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Template name</label>
              <input type="text" value={templateName} onChange={(e) => setTemplateName(e.target.value)}
                style={{ width: "100%", borderRadius: 6, border: "1px solid var(--hp-border)", padding: "8px 12px", fontSize: 14, color: "var(--hp-warm-900)" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Description</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", borderRadius: 6, border: "1px solid var(--hp-border)", padding: "8px 12px", fontSize: 14, color: "var(--hp-warm-900)" }} />
            </div>

            {/* Metadata row */}
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px", fontSize: 13 }}>
              {inspection.report_title && <><span style={{ fontSize: 12, fontWeight: 500, color: "var(--hp-text-muted)" }}>Report</span><span style={{ color: "var(--hp-warm-800)" }}>{inspection.report_title}</span></>}
              {inspection.report_author && <><span style={{ fontSize: 12, fontWeight: 500, color: "var(--hp-text-muted)" }}>Author</span><span style={{ color: "var(--hp-warm-800)" }}>{inspection.report_author}</span></>}
              {inspection.report_date && <><span style={{ fontSize: 12, fontWeight: 500, color: "var(--hp-text-muted)" }}>Date</span><span style={{ color: "var(--hp-warm-800)" }}>{inspection.report_date}</span></>}
              {inspection.report_company && <><span style={{ fontSize: 12, fontWeight: 500, color: "var(--hp-text-muted)" }}>Company</span><span style={{ color: "var(--hp-warm-800)" }}>{inspection.report_company}</span></>}
            </div>
          </div>

          {/* Sections + Items */}
          {Object.entries(sections).map(([sectionName, items]) => {
            const collapsed = collapsedSections.has(sectionName);
            return (
              <div key={sectionName} style={{ marginBottom: 16 }}>
                {/* Section header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: collapsed ? 0 : 12 }}>
                  <button onClick={() => toggleSection(sectionName)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                    {collapsed ? <ChevronRight size={14} style={{ color: "var(--hp-text-muted)" }} /> : <ChevronDown size={14} style={{ color: "var(--hp-text-muted)" }} />}
                  </button>
                  <input
                    type="text"
                    defaultValue={sectionName}
                    onBlur={(e) => renameSection(sectionName, e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                    style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--hp-warm-700)", background: "none", border: "none", borderBottom: "1px dashed transparent", flex: 1, padding: "2px 0" }}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "var(--hp-accent)"; }}
                    onBlurCapture={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = "transparent"; }}
                  />
                  <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>{items.length} item{items.length !== 1 ? "s" : ""}</span>
                  <button onClick={() => { if (window.confirm(`Delete section "${sectionName}" and all ${items.length} items?`)) deleteSection(sectionName); }}
                    title="Delete section" style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                    <Trash2 size={13} style={{ color: "var(--hp-text-muted)" }} />
                  </button>
                </div>

                {/* Items */}
                {!collapsed && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {items.map((item, idx) => (
                      <div key={item.sequence} style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 6, padding: "8px 12px", backgroundColor: "var(--hp-surface)", border: "1px solid var(--hp-border)" }}>
                        <GripVertical size={14} style={{ color: "var(--hp-text-muted)", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 600, color: "var(--hp-text-muted)", flexShrink: 0, width: 28 }}>{idx + 1}</span>
                        <input
                          type="text"
                          value={item.item_name}
                          onChange={(e) => updateItemName(item.sequence, e.target.value)}
                          placeholder="Check item..."
                          style={{ flex: 1, fontSize: 14, color: "var(--hp-warm-900)", background: "none", border: "none", outline: "none", padding: "2px 0" }}
                        />
                        {item.source_reference && (
                          <span style={{ fontSize: 10, color: "var(--hp-text-muted)", flexShrink: 0, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.source_reference}>{item.source_reference}</span>
                        )}
                        <button onClick={() => deleteItem(item.sequence)} title="Remove item"
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, flexShrink: 0 }}>
                          <Trash2 size={13} style={{ color: "var(--hp-text-muted)" }} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addItem(sectionName)}
                      style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "var(--hp-accent)", background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>
                      <Plus size={12} /> Add item
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add section */}
          <button onClick={addSection}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "var(--hp-accent)", background: "none", border: "none", cursor: "pointer", padding: "8px 0", marginTop: 8 }}>
            <Plus size={12} /> Add section
          </button>
        </div>
      )}
    </div>
  );
}
