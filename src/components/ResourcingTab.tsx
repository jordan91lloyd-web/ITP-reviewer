"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { RefreshCw, Download, X, Plus, GripVertical, Users, Eye, EyeOff, Save, RotateCcw } from "lucide-react";

interface RoleCategory { key: string; label: string; short: string; }
interface PersonAssignment { email: string; name: string; role_key: string; job_title: string; }
interface ProjectRow {
  project_id: string; project_name: string; project_number: string | null;
  is_active: boolean; assignments: PersonAssignment[];
}

interface Props { companyId: number | null; }

// ── Workload colour: green=1 project, amber=2, red=3+ ───────────────────────
function workloadColor(projectCount: number): { bg: string; border: string; text: string } {
  if (projectCount <= 1) return { bg: "#dcfce7", border: "#86efac", text: "#166534" };
  if (projectCount === 2) return { bg: "#fef3c7", border: "#fcd34d", text: "#92400e" };
  return { bg: "#fee2e2", border: "#fca5a5", text: "#991b1b" };
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

  // Drag state
  const [dragData, setDragData] = useState<{ person: PersonAssignment; fromProjectId: string; fromRole: string } | null>(null);
  const [dropTarget, setDropTarget] = useState<{ projectId: string; roleKey: string } | null>(null);

  // Add person
  const [addTarget, setAddTarget] = useState<{ projectId: string; roleKey: string } | null>(null);
  const [addSearch, setAddSearch] = useState("");

  // ── Workload map: email → number of project assignments ──────────────────
  const workloadMap = useMemo(() => {
    const map = new Map<string, number>();
    const visibleProjects = projects.filter(p => !hiddenIds.has(p.project_id));
    for (const p of visibleProjects) {
      for (const a of p.assignments) {
        map.set(a.email, (map.get(a.email) ?? 0) + 1);
      }
    }
    return map;
  }, [projects, hiddenIds]);

  // All unique people (for add dropdown)
  const allPeople = useMemo(() => {
    const map = new Map<string, PersonAssignment>();
    for (const p of projects) for (const a of p.assignments) if (!map.has(a.email)) map.set(a.email, a);
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [projects]);

  // ── Load saved snapshot ────────────────────────────────────────────────────

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
      if (data.source === "empty") setSuccess("No saved data yet. Click 'Sync from Procore' to populate.");
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadSnapshot(); }, [loadSnapshot]);

  // ── Sync from Procore ──────────────────────────────────────────────────────

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
      setSuccess(`Synced ${data.projects?.length ?? 0} projects from Procore (v${data.version})`);
    } catch (err) { setError(err instanceof Error ? err.message : "Sync failed"); }
    finally { setSyncing(false); }
  };

  // ── Save current state ─────────────────────────────────────────────────────

  const saveState = async () => {
    setSaving(true); setError(null);
    try {
      const res = await fetch("/api/resourcing", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects, synced_at: syncedAt }),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      setVersion(data.version);
      setHasUnsaved(false);
      setSuccess(`Saved as version ${data.version}`);
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
      setSuccess(`Reverted to version ${data.version}`);
    } catch (err) { setError(err instanceof Error ? err.message : "Revert failed"); }
    finally { setLoading(false); }
  };

  // ── Hide/unhide project ────────────────────────────────────────────────────

  const toggleHideProject = async (projectId: string) => {
    const isHidden = hiddenIds.has(projectId);
    try {
      await fetch("/api/resourcing", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: isHidden ? "unhide_project" : "hide_project", project_id: projectId }),
      });
      setHiddenIds(prev => {
        const next = new Set(prev);
        if (isHidden) next.delete(projectId); else next.add(projectId);
        return next;
      });
    } catch { /* silent */ }
  };

  // ── Drag handlers ──────────────────────────────────────────────────────────

  const onDragStart = (person: PersonAssignment, projectId: string, roleKey: string) => {
    setDragData({ person, fromProjectId: projectId, fromRole: roleKey });
  };

  const onDragOver = (e: React.DragEvent, projectId: string, roleKey: string) => {
    e.preventDefault();
    setDropTarget({ projectId, roleKey });
  };

  const onDrop = (e: React.DragEvent, toProjectId: string, toRole: string) => {
    e.preventDefault();
    setDropTarget(null);
    if (!dragData) return;

    const { person, fromProjectId, fromRole } = dragData;
    if (fromProjectId === toProjectId && fromRole === toRole) { setDragData(null); return; }

    const duplicate = e.shiftKey;

    setProjects(prev => prev.map(p => {
      // Remove from source (unless duplicating)
      if (!duplicate && p.project_id === fromProjectId) {
        return { ...p, assignments: p.assignments.filter(a => !(a.email === person.email && a.role_key === fromRole)) };
      }
      return p;
    }).map(p => {
      // Add to target
      if (p.project_id === toProjectId) {
        const exists = p.assignments.some(a => a.email === person.email && a.role_key === toRole);
        if (!exists) {
          return { ...p, assignments: [...p.assignments, { ...person, role_key: toRole }] };
        }
      }
      return p;
    }));

    setHasUnsaved(true);
    setDragData(null);
  };

  // ── Add/Remove ─────────────────────────────────────────────────────────────

  const addPerson = (person: PersonAssignment, projectId: string, roleKey: string) => {
    setProjects(prev => prev.map(p => {
      if (p.project_id !== projectId) return p;
      const exists = p.assignments.some(a => a.email === person.email && a.role_key === roleKey);
      if (exists) return p;
      return { ...p, assignments: [...p.assignments, { ...person, role_key: roleKey }] };
    }));
    setAddTarget(null); setAddSearch(""); setHasUnsaved(true);
  };

  const removePerson = (email: string, projectId: string, roleKey: string) => {
    setProjects(prev => prev.map(p => {
      if (p.project_id !== projectId) return p;
      return { ...p, assignments: p.assignments.filter(a => !(a.email === email && a.role_key === roleKey)) };
    }));
    setHasUnsaved(true);
  };

  // ── Visible projects ───────────────────────────────────────────────────────
  const visibleProjects = showHidden ? projects : projects.filter(p => !hiddenIds.has(p.project_id));

  // Active role columns (only show columns that have people)
  const activeRoles = roles.filter(role => projects.some(p => p.assignments.some(a => a.role_key === role.key)));

  if (!companyId) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, padding: 40 }}>
      <p style={{ fontSize: 14, color: "var(--hp-text-secondary)" }}>Select a company to view resourcing.</p>
    </div>;
  }

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--hp-text)", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Users className="h-5 w-5" /> Staff Resourcing
          </h2>
          <p style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 2 }}>
            Drag to move, Shift+drop to duplicate. Changes are local until you save.
            {syncedAt && <span style={{ marginLeft: 8, color: "var(--hp-text-muted)" }}>
              Last synced: {new Date(syncedAt).toLocaleDateString("en-AU", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
              {version > 0 && ` · v${version}`}
            </span>}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {hasUnsaved && (
            <button onClick={saveState} disabled={saving}
              style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 14px", borderRadius: 6, border: "none", backgroundColor: "#4a3728", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save"}
            </button>
          )}
          {version > 1 && (
            <button onClick={revert} title="Revert to previous version"
              style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", fontSize: 11, cursor: "pointer", color: "var(--hp-text-secondary)" }}>
              <RotateCcw className="h-3 w-3" /> Undo
            </button>
          )}
          <button onClick={() => setShowHidden(!showHidden)}
            style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: showHidden ? "var(--hp-warm-100)" : "var(--hp-surface)", fontSize: 11, cursor: "pointer", color: "var(--hp-text-secondary)" }}>
            {showHidden ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            {showHidden ? "Showing all" : `${hiddenIds.size} hidden`}
          </button>
          <button onClick={syncFromProcore} disabled={syncing}
            style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 14px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", fontSize: 12, cursor: "pointer", color: "var(--hp-text-secondary)" }}>
            <Download className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing..." : "Sync from Procore"}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 12, fontSize: 11, color: "var(--hp-text-muted)", alignItems: "center" }}>
        <span style={{ fontWeight: 600 }}>Workload:</span>
        {[{ n: 1, label: "1 project" }, { n: 2, label: "2 projects" }, { n: 3, label: "3+ projects" }].map(({ n, label }) => {
          const c = workloadColor(n);
          return <span key={n} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: c.bg, border: `1px solid ${c.border}` }} />
            {label}
          </span>;
        })}
      </div>

      {success && <div style={{ marginBottom: 10, padding: "6px 12px", borderRadius: 6, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", fontSize: 12, color: "#15803d" }}>{success}</div>}
      {error && <div style={{ marginBottom: 10, padding: "6px 12px", borderRadius: 6, backgroundColor: "#fee2e2", border: "1px solid #fecaca", fontSize: 12, color: "#dc2626" }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <RefreshCw className="h-5 w-5 animate-spin mx-auto" style={{ color: "var(--hp-text-secondary)" }} />
          <p style={{ fontSize: 13, color: "var(--hp-text-secondary)", marginTop: 8 }}>Loading...</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--hp-border)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 800 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--hp-warm-50)" }}>
                <th style={{ position: "sticky", left: 0, zIndex: 10, backgroundColor: "var(--hp-warm-50)", padding: "10px 12px", textAlign: "left", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--hp-text-secondary)", borderBottom: "2px solid var(--hp-border)", minWidth: 180 }}>
                  Project
                </th>
                {activeRoles.map(role => (
                  <th key={role.key} title={role.label}
                    style={{ padding: "10px 6px", textAlign: "center", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--hp-text-secondary)", borderBottom: "2px solid var(--hp-border)", minWidth: 100 }}>
                    {role.short}
                  </th>
                ))}
                <th style={{ width: 36, borderBottom: "2px solid var(--hp-border)" }} />
              </tr>
            </thead>
            <tbody>
              {visibleProjects.map((project, rowIdx) => {
                const isHidden = hiddenIds.has(project.project_id);
                return (
                  <tr key={project.project_id} style={{
                    backgroundColor: isHidden ? "#f9fafb" : rowIdx % 2 === 0 ? "#ffffff" : "var(--hp-warm-50, #faf8f5)",
                    opacity: isHidden ? 0.5 : 1,
                  }}>
                    <td style={{
                      position: "sticky", left: 0, zIndex: 5,
                      backgroundColor: isHidden ? "#f9fafb" : rowIdx % 2 === 0 ? "#ffffff" : "var(--hp-warm-50, #faf8f5)",
                      padding: "8px 12px", borderBottom: "1px solid var(--hp-border, #f0f0f0)",
                      fontWeight: 500, color: "var(--hp-text)",
                    }}>
                      <div style={{ fontSize: 12, lineHeight: 1.3 }}>
                        {project.project_number && <span style={{ color: "var(--hp-text-muted)", marginRight: 4 }}>#{project.project_number}</span>}
                        {project.project_name.replace(/^\d+\s*-\s*/, "")}
                      </div>
                    </td>

                    {activeRoles.map(role => {
                      const cellPeople = project.assignments.filter(a => a.role_key === role.key);
                      const isDropHere = dropTarget?.projectId === project.project_id && dropTarget?.roleKey === role.key;

                      return (
                        <td key={role.key}
                          onDragOver={(e) => onDragOver(e, project.project_id, role.key)}
                          onDragLeave={() => setDropTarget(null)}
                          onDrop={(e) => onDrop(e, project.project_id, role.key)}
                          style={{
                            padding: "4px 4px", borderBottom: "1px solid var(--hp-border, #f0f0f0)",
                            verticalAlign: "middle", textAlign: "center",
                            backgroundColor: isDropHere ? "#dbeafe" : undefined,
                            outline: isDropHere ? "2px dashed #3b82f6" : undefined,
                            transition: "background-color 0.1s",
                          }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", minHeight: 26, alignItems: "center" }}>
                            {cellPeople.map(person => {
                              const load = workloadMap.get(person.email) ?? 1;
                              const c = workloadColor(load);
                              return (
                                <div key={person.email} draggable
                                  onDragStart={() => onDragStart(person, project.project_id, role.key)}
                                  title={`${person.name} — ${person.job_title || role.label}\n${load} project${load !== 1 ? "s" : ""}\nDrag to move · Shift+drop to duplicate`}
                                  style={{
                                    display: "inline-flex", alignItems: "center", gap: 2,
                                    padding: "2px 5px 2px 3px", borderRadius: 4,
                                    backgroundColor: c.bg, border: `1px solid ${c.border}`,
                                    cursor: "grab", fontSize: 11, fontWeight: 500, color: c.text,
                                    maxWidth: 110, lineHeight: 1.2,
                                  }}>
                                  <GripVertical className="h-2.5 w-2.5 shrink-0" style={{ opacity: 0.4 }} />
                                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {person.name.split(" ")[0]}
                                  </span>
                                  <button onClick={(e) => { e.stopPropagation(); removePerson(person.email, project.project_id, role.key); }}
                                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", marginLeft: 1, opacity: 0.4 }}>
                                    <X className="h-2.5 w-2.5" />
                                  </button>
                                </div>
                              );
                            })}
                            <button onClick={() => { setAddTarget({ projectId: project.project_id, roleKey: role.key }); setAddSearch(""); }}
                              style={{ width: 18, height: 18, borderRadius: 3, border: "1px dashed var(--hp-border)", backgroundColor: "transparent", cursor: "pointer", color: "var(--hp-text-muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", opacity: 0.5 }}>
                              <Plus className="h-2.5 w-2.5" />
                            </button>

                            {/* Add dropdown */}
                            {addTarget?.projectId === project.project_id && addTarget?.roleKey === role.key && (
                              <div style={{ position: "absolute", zIndex: 50, width: 200, maxHeight: 180, overflowY: "auto", backgroundColor: "#fff", border: "1px solid var(--hp-border)", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", padding: 4 }}>
                                <input type="text" placeholder="Search..." value={addSearch} onChange={e => setAddSearch(e.target.value)} autoFocus
                                  onBlur={() => setTimeout(() => setAddTarget(null), 200)}
                                  style={{ width: "100%", padding: "4px 8px", borderRadius: 4, border: "1px solid var(--hp-border)", fontSize: 11, marginBottom: 4 }} />
                                {allPeople
                                  .filter(p => !addSearch || p.name.toLowerCase().includes(addSearch.toLowerCase()) || p.email.toLowerCase().includes(addSearch.toLowerCase()))
                                  .filter(p => !cellPeople.some(c => c.email === p.email))
                                  .slice(0, 12)
                                  .map(p => (
                                    <div key={p.email} onMouseDown={() => addPerson(p, project.project_id, role.key)}
                                      style={{ padding: "4px 8px", borderRadius: 4, cursor: "pointer", fontSize: 11 }}
                                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>
                                      {p.name} <span style={{ color: "#9ca3af" }}>{p.job_title}</span>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}

                    {/* Hide button */}
                    <td style={{ padding: "4px 4px", borderBottom: "1px solid var(--hp-border, #f0f0f0)" }}>
                      <button onClick={() => toggleHideProject(project.project_id)}
                        title={isHidden ? "Show project" : "Hide project"}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 2, opacity: 0.3 }}>
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
