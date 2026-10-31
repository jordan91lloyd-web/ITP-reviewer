"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { RefreshCw, Download, X, Plus, GripVertical, Users, Eye, EyeOff, Save, RotateCcw, UserPlus, Check } from "lucide-react";

interface RoleCategory { key: string; label: string; short: string; }
interface PersonAssignment { email: string; name: string; role_key: string; job_title: string; is_custom?: boolean; }
interface ProjectRow {
  project_id: string; project_name: string; project_number: string | null;
  is_active: boolean; assignments: PersonAssignment[];
}

interface Props { companyId: number | null; }

// ── Workload colours: green=1-2, amber=3, red=4+ ────────────────────────────
function workloadColor(projectCount: number, isOverridden: boolean): { bg: string; border: string; text: string } {
  if (isOverridden) return { bg: "#dcfce7", border: "#86efac", text: "#166534" }; // forced green
  if (projectCount <= 2) return { bg: "#dcfce7", border: "#86efac", text: "#166534" }; // green
  if (projectCount === 3) return { bg: "#fef3c7", border: "#fcd34d", text: "#92400e" }; // amber
  return { bg: "#fee2e2", border: "#fca5a5", text: "#991b1b" }; // red 4+
}

export default function ResourcingTab({ companyId }: Props) {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [roles, setRoles] = useState<RoleCategory[]>([]);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());
  const [showHidden, setShowHidden] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  const [hasUnsaved, setHasUnsaved] = useState(false);

  // Workload overrides — emails that are expected multi-project (always green)
  const [workloadOverrides, setWorkloadOverrides] = useState<Set<string>>(new Set());

  // Custom project order
  const [projectOrder, setProjectOrder] = useState<string[] | null>(null);

  // Drag person
  const [dragData, setDragData] = useState<{ person: PersonAssignment; fromProjectId: string; fromRole: string } | null>(null);
  const [dropTarget, setDropTarget] = useState<{ projectId: string; roleKey: string } | null>(null);

  // Drag project row reorder
  const [dragRowId, setDragRowId] = useState<string | null>(null);
  const [dropRowId, setDropRowId] = useState<string | null>(null);

  // Add person dialog
  const [addTarget, setAddTarget] = useState<{ projectId: string; roleKey: string } | null>(null);
  const [addSearch, setAddSearch] = useState("");
  const [showCustomAdd, setShowCustomAdd] = useState(false);
  const [customName, setCustomName] = useState("");

  // ── Workload map ───────────────────────────────────────────────────────────
  const workloadMap = useMemo(() => {
    const map = new Map<string, number>();
    const visible = projects.filter(p => !hiddenIds.has(p.project_id));
    for (const p of visible) for (const a of p.assignments) map.set(a.email, (map.get(a.email) ?? 0) + 1);
    return map;
  }, [projects, hiddenIds]);

  // All unique people for add dropdown
  const allPeople = useMemo(() => {
    const map = new Map<string, PersonAssignment>();
    for (const p of projects) for (const a of p.assignments) if (!map.has(a.email)) map.set(a.email, a);
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [projects]);

  // ── Ordered projects ───────────────────────────────────────────────────────
  const orderedProjects = useMemo(() => {
    if (!projectOrder) return projects;
    const orderMap = new Map(projectOrder.map((id, idx) => [id, idx]));
    return [...projects].sort((a, b) => {
      const oa = orderMap.get(a.project_id) ?? 999;
      const ob = orderMap.get(b.project_id) ?? 999;
      return oa - ob;
    });
  }, [projects, projectOrder]);

  const visibleProjects = showHidden ? orderedProjects : orderedProjects.filter(p => !hiddenIds.has(p.project_id));
  const activeRoles = roles.filter(role => projects.some(p => p.assignments.some(a => a.role_key === role.key)));

  // ── Load ───────────────────────────────────────────────────────────────────

  const loadSnapshot = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/resourcing?action=load");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setProjects(data.projects ?? []);
      setRoles(data.roles ?? []);
      setHiddenIds(new Set(data.hidden_project_ids ?? []));
      setSyncedAt(data.synced_at);
      setVersion(data.version ?? 0);
      setHasUnsaved(false);
      // Load extra state from snapshot
      if (data.workload_overrides) setWorkloadOverrides(new Set(data.workload_overrides));
      if (data.project_order) setProjectOrder(data.project_order);
      if (data.source === "empty") setSuccess("No saved data yet — click 'Sync from Procore' to populate.");
    } catch (err) { setError(err instanceof Error ? err.message : "Failed"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadSnapshot(); }, [loadSnapshot]);

  // ── Sync ───────────────────────────────────────────────────────────────────

  const syncFromProcore = async () => {
    setSyncing(true); setError(null); setSuccess(null);
    try {
      const res = await fetch("/api/resourcing?action=sync");
      if (!res.ok) throw new Error("Sync failed");
      const data = await res.json();
      setProjects(data.projects ?? []);
      setRoles(data.roles ?? []);
      setSyncedAt(data.synced_at);
      setVersion(data.version ?? 0);
      setHasUnsaved(false);
      setProjectOrder(null); // reset to default order after sync
      setSuccess(`Synced ${data.projects?.length ?? 0} projects (v${data.version})`);
    } catch (err) { setError(err instanceof Error ? err.message : "Sync failed"); }
    finally { setSyncing(false); }
  };

  // ── Save — includes overrides and project order in the snapshot ────────────

  const saveState = async () => {
    setSaving(true); setError(null);
    try {
      const payload = {
        projects: (projectOrder ? orderedProjects : projects),
        synced_at: syncedAt,
        workload_overrides: [...workloadOverrides],
        project_order: projectOrder ?? orderedProjects.map(p => p.project_id),
      };
      const res = await fetch("/api/resourcing", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      setVersion(data.version);
      setHasUnsaved(false);
      setSuccess(`Saved v${data.version}`);
    } catch (err) { setError(err instanceof Error ? err.message : "Save failed"); }
    finally { setSaving(false); }
  };

  // ── Revert ─────────────────────────────────────────────────────────────────

  const revert = async () => {
    if (version <= 1) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/resourcing?action=revert&version=${version - 1}`);
      if (!res.ok) throw new Error("Revert failed");
      const data = await res.json();
      setProjects(data.projects ?? []);
      setSyncedAt(data.synced_at);
      setVersion(data.version);
      setHasUnsaved(false);
      if (data.workload_overrides) setWorkloadOverrides(new Set(data.workload_overrides));
      if (data.project_order) setProjectOrder(data.project_order);
      setSuccess(`Reverted to v${data.version}`);
    } catch (err) { setError(err instanceof Error ? err.message : "Revert failed"); }
    finally { setLoading(false); }
  };

  // ── Hide/unhide ────────────────────────────────────────────────────────────

  const toggleHide = async (pid: string) => {
    const hiding = !hiddenIds.has(pid);
    await fetch("/api/resourcing", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: hiding ? "hide_project" : "unhide_project", project_id: pid }),
    }).catch(() => {});
    setHiddenIds(prev => { const n = new Set(prev); if (hiding) n.add(pid); else n.delete(pid); return n; });
  };

  // ── Toggle workload override ───────────────────────────────────────────────

  const toggleWorkloadOverride = (email: string) => {
    setWorkloadOverrides(prev => { const n = new Set(prev); if (n.has(email)) n.delete(email); else n.add(email); return n; });
    setHasUnsaved(true);
  };

  // ── Drag person ────────────────────────────────────────────────────────────

  const onPersonDragStart = (person: PersonAssignment, projectId: string, roleKey: string) => {
    setDragData({ person, fromProjectId: projectId, fromRole: roleKey });
  };

  const onCellDragOver = (e: React.DragEvent, projectId: string, roleKey: string) => {
    if (!dragData) return; // only for person drags
    e.preventDefault();
    setDropTarget({ projectId, roleKey });
  };

  const onCellDrop = (e: React.DragEvent, toProjectId: string, toRole: string) => {
    e.preventDefault();
    setDropTarget(null);
    if (!dragData) return;
    const { person, fromProjectId, fromRole } = dragData;
    if (fromProjectId === toProjectId && fromRole === toRole) { setDragData(null); return; }
    const duplicate = e.shiftKey;
    setProjects(prev => prev.map(p => {
      if (!duplicate && p.project_id === fromProjectId)
        return { ...p, assignments: p.assignments.filter(a => !(a.email === person.email && a.role_key === fromRole)) };
      return p;
    }).map(p => {
      if (p.project_id === toProjectId && !p.assignments.some(a => a.email === person.email && a.role_key === toRole))
        return { ...p, assignments: [...p.assignments, { ...person, role_key: toRole }] };
      return p;
    }));
    setHasUnsaved(true);
    setDragData(null);
  };

  // ── Drag project row reorder ───────────────────────────────────────────────

  const onRowDragStart = (e: React.DragEvent, projectId: string) => {
    e.dataTransfer.effectAllowed = "move";
    setDragRowId(projectId);
  };

  const onRowDragOver = (e: React.DragEvent, projectId: string) => {
    if (!dragRowId) return;
    e.preventDefault();
    setDropRowId(projectId);
  };

  const onRowDrop = (e: React.DragEvent, targetProjectId: string) => {
    e.preventDefault();
    if (!dragRowId || dragRowId === targetProjectId) { setDragRowId(null); setDropRowId(null); return; }
    const currentOrder = projectOrder ?? orderedProjects.map(p => p.project_id);
    const fromIdx = currentOrder.indexOf(dragRowId);
    const toIdx = currentOrder.indexOf(targetProjectId);
    if (fromIdx === -1 || toIdx === -1) { setDragRowId(null); setDropRowId(null); return; }
    const newOrder = [...currentOrder];
    newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, dragRowId);
    setProjectOrder(newOrder);
    setHasUnsaved(true);
    setDragRowId(null);
    setDropRowId(null);
  };

  // ── Add/Remove person ──────────────────────────────────────────────────────

  const addPerson = (person: PersonAssignment, projectId: string, roleKey: string) => {
    setProjects(prev => prev.map(p => {
      if (p.project_id !== projectId) return p;
      if (p.assignments.some(a => a.email === person.email && a.role_key === roleKey)) return p;
      return { ...p, assignments: [...p.assignments, { ...person, role_key: roleKey }] };
    }));
    setAddTarget(null); setAddSearch(""); setShowCustomAdd(false); setCustomName(""); setHasUnsaved(true);
  };

  const addCustomPerson = (name: string, projectId: string, roleKey: string) => {
    if (!name.trim()) return;
    const email = `custom_${name.trim().toLowerCase().replace(/\s+/g, ".")}@manual`;
    addPerson({ email, name: name.trim(), role_key: roleKey, job_title: "", is_custom: true }, projectId, roleKey);
  };

  const removePerson = (email: string, projectId: string, roleKey: string) => {
    setProjects(prev => prev.map(p => {
      if (p.project_id !== projectId) return p;
      return { ...p, assignments: p.assignments.filter(a => !(a.email === email && a.role_key === roleKey)) };
    }));
    setHasUnsaved(true);
  };

  if (!companyId) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, padding: 40 }}>
      <p style={{ fontSize: 14, color: "var(--hp-text-secondary)" }}>Select a company to view resourcing.</p>
    </div>;
  }

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--hp-text)", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Users className="h-5 w-5" /> Staff Resourcing
          </h2>
          <p style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 2 }}>
            Drag people between cells · Shift+drop to duplicate · Drag rows to reorder · Right-click name to toggle workload override
            {syncedAt && <span style={{ marginLeft: 8 }}>
              Synced {new Date(syncedAt).toLocaleDateString("en-AU", { day: "2-digit", month: "short" })}
              {version > 0 && ` · v${version}`}
            </span>}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {hasUnsaved && (
            <button onClick={saveState} disabled={saving}
              style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 14px", borderRadius: 6, border: "none", backgroundColor: "#4a3728", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save"}
            </button>
          )}
          {version > 1 && (
            <button onClick={revert} title="Revert to previous version"
              style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 6, border: "1px solid #d1d5db", backgroundColor: "#fff", fontSize: 11, cursor: "pointer", color: "#6b7280" }}>
              <RotateCcw className="h-3 w-3" /> Undo
            </button>
          )}
          <button onClick={() => setShowHidden(!showHidden)}
            style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 6, border: "1px solid #d1d5db", backgroundColor: showHidden ? "#f5f0eb" : "#fff", fontSize: 11, cursor: "pointer", color: "#6b7280" }}>
            {showHidden ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            {hiddenIds.size > 0 ? `${hiddenIds.size} hidden` : "Hide"}
          </button>
          <button onClick={syncFromProcore} disabled={syncing}
            style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 14px", borderRadius: 6, border: "1px solid #d1d5db", backgroundColor: "#fff", fontSize: 12, cursor: "pointer", color: "#6b7280" }}>
            <Download className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing..." : "Sync Procore"}
          </button>
        </div>
      </div>

      {/* ── Legend ── */}
      <div style={{ display: "flex", gap: 14, marginBottom: 10, fontSize: 11, color: "#9ca3af", alignItems: "center" }}>
        {[
          { n: 1, label: "1-2 projects" },
          { n: 3, label: "3 projects" },
          { n: 4, label: "4+ projects" },
        ].map(({ n, label }) => {
          const c = workloadColor(n, false);
          return <span key={n} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: c.bg, border: `1px solid ${c.border}` }} />
            {label}
          </span>;
        })}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Check className="h-3 w-3" style={{ color: "#16a34a" }} /> = multi-project override (always green)
        </span>
      </div>

      {success && <div style={{ marginBottom: 8, padding: "5px 12px", borderRadius: 6, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", fontSize: 11, color: "#15803d" }}>{success}</div>}
      {error && <div style={{ marginBottom: 8, padding: "5px 12px", borderRadius: 6, backgroundColor: "#fee2e2", border: "1px solid #fecaca", fontSize: 11, color: "#dc2626" }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <RefreshCw className="h-5 w-5 animate-spin mx-auto" style={{ color: "#9ca3af" }} />
        </div>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid #e5e7eb" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 800 }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f0eb" }}>
                <th style={{ position: "sticky", left: 0, zIndex: 10, backgroundColor: "#f5f0eb", padding: "8px 10px", textAlign: "left", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8b7355", borderBottom: "2px solid #d4c5b5", minWidth: 170, width: 170 }}>
                  Project
                </th>
                {activeRoles.map(role => (
                  <th key={role.key} title={role.label}
                    style={{ padding: "8px 4px", textAlign: "center", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em", color: "#8b7355", borderBottom: "2px solid #d4c5b5", minWidth: 90 }}>
                    {role.short}
                  </th>
                ))}
                <th style={{ width: 28, borderBottom: "2px solid #d4c5b5", backgroundColor: "#f5f0eb" }} />
              </tr>
            </thead>
            <tbody>
              {visibleProjects.map((project, rowIdx) => {
                const isHidden = hiddenIds.has(project.project_id);
                const isDropRow = dropRowId === project.project_id;
                const rowBg = isHidden ? "#f9fafb" : rowIdx % 2 === 0 ? "#ffffff" : "#faf8f5";
                return (
                  <tr key={project.project_id}
                    draggable
                    onDragStart={(e) => onRowDragStart(e, project.project_id)}
                    onDragOver={(e) => onRowDragOver(e, project.project_id)}
                    onDrop={(e) => onRowDrop(e, project.project_id)}
                    onDragEnd={() => { setDragRowId(null); setDropRowId(null); }}
                    style={{
                      backgroundColor: rowBg, opacity: isHidden ? 0.5 : 1,
                      borderTop: isDropRow ? "2px solid #3b82f6" : undefined,
                    }}>
                    {/* Project name */}
                    <td style={{
                      position: "sticky", left: 0, zIndex: 5, backgroundColor: rowBg,
                      padding: "6px 10px", borderBottom: "1px solid #f0ebe4",
                      fontWeight: 500, color: "#374151", cursor: "grab",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <GripVertical className="h-3 w-3 shrink-0" style={{ opacity: 0.25 }} />
                        <div style={{ fontSize: 11, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {project.project_number && <span style={{ color: "#9ca3af", marginRight: 3, fontWeight: 400 }}>#{project.project_number}</span>}
                          {project.project_name.replace(/^\d+\s*-\s*/, "").split(",")[0]}
                        </div>
                      </div>
                    </td>

                    {/* Role cells */}
                    {activeRoles.map(role => {
                      const cellPeople = project.assignments.filter(a => a.role_key === role.key);
                      const isDrop = dropTarget?.projectId === project.project_id && dropTarget?.roleKey === role.key;

                      return (
                        <td key={role.key}
                          onDragOver={(e) => onCellDragOver(e, project.project_id, role.key)}
                          onDragLeave={() => setDropTarget(null)}
                          onDrop={(e) => onCellDrop(e, project.project_id, role.key)}
                          style={{
                            padding: "3px 3px", borderBottom: "1px solid #f0ebe4",
                            verticalAlign: "middle", textAlign: "center",
                            backgroundColor: isDrop ? "#dbeafe" : undefined,
                            outline: isDrop ? "2px dashed #60a5fa" : undefined,
                          }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", minHeight: 24, alignItems: "center" }}>
                            {cellPeople.map(person => {
                              const load = workloadMap.get(person.email) ?? 1;
                              const isOverridden = workloadOverrides.has(person.email);
                              const c = workloadColor(load, isOverridden);
                              return (
                                <div key={person.email} draggable
                                  onDragStart={(e) => { e.stopPropagation(); onPersonDragStart(person, project.project_id, role.key); }}
                                  onContextMenu={(e) => { e.preventDefault(); toggleWorkloadOverride(person.email); }}
                                  title={`${person.name}${person.job_title ? ` — ${person.job_title}` : ""}${person.is_custom ? " (manual)" : ""}\n${load} project${load !== 1 ? "s" : ""}${isOverridden ? " (override: always green)" : ""}\nRight-click to toggle override`}
                                  style={{
                                    display: "inline-flex", alignItems: "center", gap: 1,
                                    padding: "1px 4px 1px 2px", borderRadius: 3,
                                    backgroundColor: c.bg, border: `1px solid ${c.border}`,
                                    cursor: "grab", fontSize: 10, fontWeight: 500, color: c.text,
                                    maxWidth: 100, lineHeight: 1.1,
                                    fontStyle: person.is_custom ? "italic" : "normal",
                                  }}>
                                  {isOverridden && <Check className="h-2 w-2 shrink-0" />}
                                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {person.name.split(" ")[0]}
                                  </span>
                                  <button onClick={(e) => { e.stopPropagation(); removePerson(person.email, project.project_id, role.key); }}
                                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", opacity: 0.35, marginLeft: 1 }}>
                                    <X className="h-2 w-2" />
                                  </button>
                                </div>
                              );
                            })}
                            {/* + add button */}
                            <div style={{ position: "relative", display: "inline-flex" }}>
                              <button onClick={() => { setAddTarget({ projectId: project.project_id, roleKey: role.key }); setAddSearch(""); setShowCustomAdd(false); }}
                                style={{ width: 16, height: 16, borderRadius: 2, border: "1px dashed #d1d5db", backgroundColor: "transparent", cursor: "pointer", color: "#d1d5db", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Plus className="h-2 w-2" />
                              </button>
                              {/* Dropdown */}
                              {addTarget?.projectId === project.project_id && addTarget?.roleKey === role.key && (
                                <div style={{ position: "absolute", zIndex: 50, top: 20, left: -80, width: 200, maxHeight: 220, overflowY: "auto", backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", padding: 4 }}>
                                  <input type="text" placeholder="Search team..." value={addSearch} onChange={e => setAddSearch(e.target.value)} autoFocus
                                    onBlur={() => setTimeout(() => { if (!showCustomAdd) setAddTarget(null); }, 200)}
                                    style={{ width: "100%", padding: "4px 8px", borderRadius: 4, border: "1px solid #e5e7eb", fontSize: 11, marginBottom: 2 }} />
                                  {allPeople
                                    .filter(p => !addSearch || p.name.toLowerCase().includes(addSearch.toLowerCase()))
                                    .filter(p => !cellPeople.some(c => c.email === p.email))
                                    .slice(0, 10)
                                    .map(p => (
                                      <div key={p.email} onMouseDown={() => addPerson(p, project.project_id, role.key)}
                                        style={{ padding: "3px 8px", borderRadius: 4, cursor: "pointer", fontSize: 11 }}
                                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>
                                        {p.name}
                                      </div>
                                    ))}
                                  <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 2, paddingTop: 2 }}>
                                    {!showCustomAdd ? (
                                      <button onMouseDown={() => setShowCustomAdd(true)}
                                        style={{ width: "100%", padding: "4px 8px", borderRadius: 4, border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: 11, color: "#6b7280", textAlign: "left", display: "flex", alignItems: "center", gap: 4 }}>
                                        <UserPlus className="h-3 w-3" /> Add manually...
                                      </button>
                                    ) : (
                                      <div style={{ display: "flex", gap: 4, padding: "2px 4px" }}>
                                        <input type="text" placeholder="Name" value={customName} onChange={e => setCustomName(e.target.value)} autoFocus
                                          onKeyDown={e => { if (e.key === "Enter" && customName.trim()) addCustomPerson(customName, project.project_id, role.key); }}
                                          style={{ flex: 1, padding: "3px 6px", borderRadius: 4, border: "1px solid #e5e7eb", fontSize: 11 }} />
                                        <button onMouseDown={() => { if (customName.trim()) addCustomPerson(customName, project.project_id, role.key); }}
                                          style={{ padding: "3px 8px", borderRadius: 4, border: "none", backgroundColor: "#4a3728", color: "#fff", fontSize: 10, cursor: "pointer" }}>
                                          Add
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      );
                    })}

                    {/* Hide button */}
                    <td style={{ padding: "3px", borderBottom: "1px solid #f0ebe4" }}>
                      <button onClick={() => toggleHide(project.project_id)}
                        title={isHidden ? "Show" : "Hide"} style={{ background: "none", border: "none", cursor: "pointer", padding: 1, opacity: 0.2 }}>
                        {isHidden ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
