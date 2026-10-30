"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { RefreshCw, Download, X, Plus, GripVertical, Users } from "lucide-react";

interface RoleCategory {
  key: string;
  label: string;
  short: string;
}

interface PersonAssignment {
  email: string;
  name: string;
  role_key: string;
  job_title: string;
  source: "procore" | "override";
}

interface ProjectRow {
  project_id: string;
  project_name: string;
  project_number: string | null;
  assignments: PersonAssignment[];
}

interface Person {
  email: string;
  name: string;
  role_key: string;
  job_title: string;
  project_count: number;
}

interface Props {
  companyId: number | null;
}

// Consistent colour per person (hash email to hue)
function personColor(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) hash = email.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 45%, 92%)`;
}
function personBorder(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) hash = email.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 45%, 70%)`;
}

function initials(name: string): string {
  return name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

export default function ResourcingTab({ companyId }: Props) {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [roles, setRoles] = useState<RoleCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Drag state
  const [dragPerson, setDragPerson] = useState<PersonAssignment | null>(null);
  const [dragSource, setDragSource] = useState<{ projectId: string; roleKey: string } | null>(null);
  const [dropTarget, setDropTarget] = useState<{ projectId: string; roleKey: string } | null>(null);

  // Add person dialog
  const [showAddDialog, setShowAddDialog] = useState<{ projectId: string; roleKey: string } | null>(null);
  const [addSearch, setAddSearch] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/resourcing?company_id=${companyId ?? ""}`);
      if (!res.ok) throw new Error("Failed to load resourcing data");
      const data = await res.json();
      setProjects(data.projects ?? []);
      setPeople(data.people ?? []);
      setRoles(data.roles ?? []);
      if (data.errors?.length) setError(`Some projects had errors: ${data.errors.join("; ")}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => { if (companyId) fetchData(); }, [companyId, fetchData]);

  // ── Drag handlers ───────────────────────────────────────────────────────

  const handleDragStart = (person: PersonAssignment, projectId: string, roleKey: string) => {
    setDragPerson(person);
    setDragSource({ projectId, roleKey });
  };

  const handleDragOver = (e: React.DragEvent, projectId: string, roleKey: string) => {
    e.preventDefault();
    setDropTarget({ projectId, roleKey });
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = async (e: React.DragEvent, targetProjectId: string, targetRoleKey: string) => {
    e.preventDefault();
    setDropTarget(null);

    if (!dragPerson || !dragSource) return;

    // Same cell — no-op
    if (dragSource.projectId === targetProjectId && dragSource.roleKey === targetRoleKey) {
      setDragPerson(null);
      setDragSource(null);
      return;
    }

    setSaving(true);
    setSuccess(null);

    try {
      // Add to target
      await fetch("/api/resourcing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: targetProjectId,
          role_key: targetRoleKey,
          user_email: dragPerson.email,
          user_name: dragPerson.name,
          action: "add",
        }),
      });

      // If holding shift, duplicate (don't remove from source)
      // Otherwise, remove from source
      if (!(e as unknown as { shiftKey?: boolean }).shiftKey) {
        await fetch("/api/resourcing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            project_id: dragSource.projectId,
            role_key: dragSource.roleKey,
            user_email: dragPerson.email,
            action: "remove",
          }),
        });
      }

      setSuccess(`${dragPerson.name} updated`);
      await fetchData();
    } catch {
      setError("Failed to update assignment");
    } finally {
      setSaving(false);
      setDragPerson(null);
      setDragSource(null);
    }
  };

  // ── Add/Remove person ───────────────────────────────────────────────────

  const addPerson = async (email: string, name: string, projectId: string, roleKey: string) => {
    setSaving(true);
    try {
      await fetch("/api/resourcing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId, role_key: roleKey, user_email: email, user_name: name, action: "add" }),
      });
      setShowAddDialog(null);
      setAddSearch("");
      await fetchData();
    } catch { setError("Failed to add"); }
    finally { setSaving(false); }
  };

  const removePerson = async (email: string, projectId: string, roleKey: string) => {
    setSaving(true);
    try {
      await fetch("/api/resourcing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId, role_key: roleKey, user_email: email, action: "remove" }),
      });
      await fetchData();
    } catch { setError("Failed to remove"); }
    finally { setSaving(false); }
  };

  // Filter roles that have at least one assignment across any project (hide empty columns)
  const activeRoles = roles.filter(role =>
    projects.some(p => p.assignments.some(a => a.role_key === role.key))
  );

  if (!companyId) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, padding: 40 }}>
      <p style={{ fontSize: 14, color: "var(--hp-text-secondary)" }}>Select a company to view resourcing.</p>
    </div>;
  }

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--hp-text)", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Users className="h-5 w-5" /> Staff Resourcing
          </h2>
          <p style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 2 }}>
            Drag people between projects. Hold Shift while dropping to duplicate across projects.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {saving && <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>Saving...</span>}
          <button onClick={fetchData} disabled={loading}
            style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 14px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", fontSize: 12, cursor: "pointer", color: "var(--hp-text-secondary)" }}>
            <Download className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Syncing..." : "Sync from Procore"}
          </button>
        </div>
      </div>

      {success && <div style={{ marginBottom: 12, padding: "6px 12px", borderRadius: 6, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", fontSize: 12, color: "#15803d" }}>{success}</div>}
      {error && <div style={{ marginBottom: 12, padding: "6px 12px", borderRadius: 6, backgroundColor: "#fee2e2", border: "1px solid #fecaca", fontSize: 12, color: "#dc2626" }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <RefreshCw className="h-5 w-5 animate-spin mx-auto" style={{ color: "var(--hp-text-secondary)" }} />
          <p style={{ fontSize: 13, color: "var(--hp-text-secondary)", marginTop: 8 }}>Loading project teams from Procore...</p>
        </div>
      ) : projects.length === 0 ? (
        <p style={{ textAlign: "center", padding: 40, color: "var(--hp-text-muted)" }}>No active projects found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 900 }}>
            <thead>
              <tr>
                <th style={{ position: "sticky", left: 0, zIndex: 10, backgroundColor: "var(--hp-surface)", padding: "8px 12px", textAlign: "left", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--hp-text-muted)", borderBottom: "2px solid var(--hp-border)", minWidth: 200 }}>
                  Project
                </th>
                {activeRoles.map(role => (
                  <th key={role.key} style={{ padding: "8px 8px", textAlign: "center", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--hp-text-muted)", borderBottom: "2px solid var(--hp-border)", minWidth: 120 }}
                    title={role.label}>
                    {role.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((project, rowIdx) => (
                <tr key={project.project_id} style={{ backgroundColor: rowIdx % 2 === 0 ? "var(--hp-surface)" : "var(--hp-bg)" }}>
                  {/* Project name (sticky) */}
                  <td style={{
                    position: "sticky", left: 0, zIndex: 5,
                    backgroundColor: rowIdx % 2 === 0 ? "var(--hp-surface)" : "var(--hp-bg, #faf9f7)",
                    padding: "8px 12px", borderBottom: "1px solid var(--hp-border, #f0f0f0)",
                    fontWeight: 500, color: "var(--hp-text)",
                  }}>
                    <div style={{ fontSize: 12, lineHeight: 1.3 }}>{project.project_name}</div>
                    {project.project_number && (
                      <div style={{ fontSize: 10, color: "var(--hp-text-muted)" }}>#{project.project_number}</div>
                    )}
                  </td>

                  {/* Role cells */}
                  {activeRoles.map(role => {
                    const cellPeople = project.assignments.filter(a => a.role_key === role.key);
                    const isDropping = dropTarget?.projectId === project.project_id && dropTarget?.roleKey === role.key;
                    const isAddOpen = showAddDialog?.projectId === project.project_id && showAddDialog?.roleKey === role.key;

                    return (
                      <td
                        key={role.key}
                        onDragOver={(e) => handleDragOver(e, project.project_id, role.key)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, project.project_id, role.key)}
                        style={{
                          padding: "4px 6px", borderBottom: "1px solid var(--hp-border, #f0f0f0)",
                          verticalAlign: "top", minHeight: 40,
                          backgroundColor: isDropping ? "#dbeafe" : undefined,
                          border: isDropping ? "2px dashed #3b82f6" : undefined,
                          transition: "background-color 0.15s",
                        }}
                      >
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 3, minHeight: 28, alignItems: "center" }}>
                          {cellPeople.map(person => (
                            <div
                              key={person.email}
                              draggable
                              onDragStart={() => handleDragStart(person, project.project_id, role.key)}
                              style={{
                                display: "inline-flex", alignItems: "center", gap: 4,
                                padding: "2px 6px 2px 4px", borderRadius: 4,
                                backgroundColor: personColor(person.email),
                                border: `1px solid ${personBorder(person.email)}`,
                                cursor: "grab", fontSize: 11, fontWeight: 500,
                                color: "#374151", maxWidth: 130,
                                opacity: person.source === "override" ? 0.85 : 1,
                              }}
                              title={`${person.name} (${person.job_title || role.label})\nDrag to move • Shift+drop to duplicate`}
                            >
                              <GripVertical className="h-3 w-3 shrink-0" style={{ color: "#9ca3af", cursor: "grab" }} />
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {person.name.split(" ")[0]}
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); removePerson(person.email, project.project_id, role.key); }}
                                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", marginLeft: 2 }}
                                title="Remove from this project"
                              >
                                <X className="h-3 w-3" style={{ color: "#9ca3af" }} />
                              </button>
                            </div>
                          ))}

                          {/* Add button */}
                          <button
                            onClick={() => { setShowAddDialog({ projectId: project.project_id, roleKey: role.key }); setAddSearch(""); }}
                            style={{
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                              width: 22, height: 22, borderRadius: 4,
                              border: "1px dashed var(--hp-border)", backgroundColor: "transparent",
                              cursor: "pointer", color: "var(--hp-text-muted)",
                            }}
                            title={`Add ${role.label}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>

                          {/* Add person dropdown */}
                          {isAddOpen && (
                            <div style={{
                              position: "absolute", zIndex: 50,
                              width: 220, maxHeight: 200, overflowY: "auto",
                              backgroundColor: "#fff", border: "1px solid var(--hp-border)",
                              borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              padding: 4, marginTop: 2,
                            }}>
                              <input
                                type="text"
                                placeholder="Search..."
                                value={addSearch}
                                onChange={e => setAddSearch(e.target.value)}
                                autoFocus
                                onBlur={() => setTimeout(() => setShowAddDialog(null), 200)}
                                style={{ width: "100%", padding: "4px 8px", borderRadius: 4, border: "1px solid var(--hp-border)", fontSize: 11, marginBottom: 4 }}
                              />
                              {people
                                .filter(p => {
                                  if (!addSearch) return true;
                                  const q = addSearch.toLowerCase();
                                  return p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q);
                                })
                                .filter(p => !cellPeople.some(c => c.email === p.email))
                                .slice(0, 15)
                                .map(p => (
                                  <div
                                    key={p.email}
                                    onMouseDown={() => addPerson(p.email, p.name, project.project_id, role.key)}
                                    style={{ padding: "4px 8px", borderRadius: 4, cursor: "pointer", fontSize: 11, color: "#374151" }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                                  >
                                    {p.name}
                                    <span style={{ color: "#9ca3af", marginLeft: 4 }}>{p.job_title}</span>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Legend */}
      {projects.length > 0 && (
        <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 8, backgroundColor: "var(--hp-warm-50)", border: "1px solid var(--hp-warm-200)", fontSize: 11, color: "var(--hp-text-muted)" }}>
          <strong>Tips:</strong> Drag a person badge to move them between projects/roles. Hold <strong>Shift</strong> while dropping to duplicate (assign to both projects).
          Click <strong>+</strong> to add someone. Click <strong>x</strong> to remove. Changes are saved immediately.
          {activeRoles.length > 0 && (
            <span style={{ marginLeft: 12 }}>
              Columns: {activeRoles.map(r => `${r.short} = ${r.label}`).join(" · ")}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
