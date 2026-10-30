"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Save, Search, Shield, ShieldCheck, ShieldX, Eye, Pencil, Crown, Users, Download, Plus, Trash2, CheckSquare, Square } from "lucide-react";

interface ModuleDef {
  key: string;
  label: string;
  description: string;
}

interface UserWithPerms {
  id: string;
  email: string;
  name: string | null;
  is_super_admin: boolean;
  first_login: string | null;
  last_login: string | null;
  permissions: Record<string, string>;
}

interface PermTemplate {
  id: string;
  name: string;
  description: string | null;
  permissions: Record<string, string>;
}

interface Props {
  companyId: number | null;
}

const LEVEL_LABELS: Record<string, { label: string; color: string; bg: string; icon: typeof Eye }> = {
  none:  { label: "No Access", color: "var(--hp-text-muted, #9ca3af)", bg: "transparent", icon: ShieldX },
  view:  { label: "View",     color: "var(--hp-text-secondary, #6b7280)", bg: "var(--hp-warm-50, #faf8f5)", icon: Eye },
  edit:  { label: "Edit",     color: "var(--hp-significant, #d97706)", bg: "var(--hp-significant-bg, #fffbeb)", icon: Pencil },
  admin: { label: "Admin",    color: "var(--hp-compliant, #16a34a)", bg: "var(--hp-compliant-bg, #f0fdf4)", icon: ShieldCheck },
};

const LEVELS = ["none", "view", "edit", "admin"];

function fmtDate(iso: string | null): string {
  if (!iso) return "Never";
  return new Date(iso).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}

export default function PermissionsTab({ companyId }: Props) {
  const [users, setUsers] = useState<UserWithPerms[]>([]);
  const [modules, setModules] = useState<ModuleDef[]>([]);
  const [templates, setTemplates] = useState<PermTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Single user editing
  const [selectedUser, setSelectedUser] = useState<UserWithPerms | null>(null);
  const [editedPerms, setEditedPerms] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Multi-select for bulk
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [bulkMode, setBulkMode] = useState(false);

  // Template editor
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateDesc, setTemplateDesc] = useState("");
  const [templatePerms, setTemplatePerms] = useState<Record<string, string>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, templatesRes] = await Promise.all([
        fetch("/api/permissions?admin=true"),
        fetch("/api/permissions/templates"),
      ]);
      if (usersRes.status === 403) {
        setError("You do not have permission to manage user access.");
        return;
      }
      if (!usersRes.ok) throw new Error("Failed to load permissions");
      const usersData = await usersRes.json();
      setUsers(usersData.users ?? []);
      setModules(usersData.modules ?? []);

      if (templatesRes.ok) {
        const tmplData = await templatesRes.json();
        setTemplates(tmplData.templates ?? []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const syncDirectory = async () => {
    setSyncing(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/permissions/sync", { method: "POST" });
      if (!res.ok) throw new Error("Sync failed");
      const data = await res.json();
      setSuccess(`Synced ${data.domain_matched} users from Procore (${data.created} new, ${data.updated} updated)`);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const selectUser = (user: UserWithPerms) => {
    setBulkMode(false);
    setSelectedUser(user);
    setEditedPerms({ ...user.permissions });
    setHasChanges(false);
    setSuccess(null);
  };

  const changeLevel = (moduleKey: string, level: string) => {
    if (selectedUser?.is_super_admin) return;
    setEditedPerms(prev => ({ ...prev, [moduleKey]: level }));
    setHasChanges(true);
    setSuccess(null);
  };

  const savePermissions = async () => {
    if (!selectedUser) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_email: selectedUser.email, permissions: editedPerms }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed (${res.status})`);
      }
      const data = await res.json();
      setSuccess(`Saved ${data.changes} change${data.changes !== 1 ? "s" : ""}`);
      setHasChanges(false);
      setUsers(prev => prev.map(u =>
        u.email === selectedUser.email ? { ...u, permissions: { ...editedPerms } } : u
      ));
      setSelectedUser(prev => prev ? { ...prev, permissions: { ...editedPerms } } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // ── Template functions ──────────────────────────────────────────────────

  const applyTemplate = (tmpl: PermTemplate) => {
    if (bulkMode) {
      // Bulk apply to selected users
      applyBulk(tmpl.permissions);
    } else if (selectedUser && !selectedUser.is_super_admin) {
      setEditedPerms({ ...tmpl.permissions });
      setHasChanges(true);
      setSuccess(null);
    }
  };

  const saveTemplate = async () => {
    if (!templateName.trim()) return;
    try {
      const perms = templatePerms;
      const res = await fetch("/api/permissions/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: templateName.trim(), description: templateDesc.trim(), permissions: perms }),
      });
      if (!res.ok) throw new Error("Failed to save template");
      setSuccess(`Template "${templateName}" saved`);
      setShowTemplateEditor(false);
      setTemplateName("");
      setTemplateDesc("");
      setTemplatePerms({});
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save template");
    }
  };

  const deleteTemplate = async (name: string) => {
    try {
      await fetch(`/api/permissions/templates?name=${encodeURIComponent(name)}`, { method: "DELETE" });
      await fetchData();
    } catch { /* silent */ }
  };

  const saveCurrentAsTemplate = () => {
    setTemplatePerms({ ...editedPerms });
    setTemplateName("");
    setTemplateDesc("");
    setShowTemplateEditor(true);
  };

  // ── Bulk apply ──────────────────────────────────────────────────────────

  const applyBulk = async (perms: Record<string, string>) => {
    if (selectedEmails.size === 0) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/permissions/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_emails: [...selectedEmails], permissions: perms }),
      });
      if (!res.ok) throw new Error("Bulk apply failed");
      const data = await res.json();
      setSuccess(`Updated ${data.users_updated} users (${data.total_changes} changes)`);
      setBulkMode(false);
      setSelectedEmails(new Set());
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bulk apply failed");
    } finally {
      setSaving(false);
    }
  };

  const toggleEmail = (email: string) => {
    setSelectedEmails(prev => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email); else next.add(email);
      return next;
    });
  };

  const filteredUsers = users.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.email.toLowerCase().includes(q) || (u.name ?? "").toLowerCase().includes(q);
  });

  if (!companyId) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, padding: 40 }}>
        <p style={{ fontSize: 14, color: "var(--hp-text-secondary)" }}>Select a company first.</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
      {/* ── User list panel ── */}
      <div style={{ width: 340, borderRight: "1px solid var(--hp-border, #e5e7eb)", display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "var(--hp-surface, #ffffff)" }}>
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--hp-border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--hp-text, #1f2937)", margin: 0 }}>
              <Shield className="inline h-4 w-4 mr-2" style={{ verticalAlign: "text-bottom" }} />
              Permissions
            </h2>
            <div style={{ display: "flex", gap: 4 }}>
              <button
                onClick={syncDirectory}
                disabled={syncing}
                title="Sync users from Procore"
                style={{ background: "none", border: "1px solid var(--hp-border)", borderRadius: 6, cursor: "pointer", padding: "4px 8px", fontSize: 11, display: "flex", alignItems: "center", gap: 4, color: "var(--hp-text-secondary)" }}
              >
                <Download className={`h-3 w-3 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Syncing..." : "Sync Procore"}
              </button>
              <button
                onClick={() => { setBulkMode(!bulkMode); setSelectedUser(null); setSelectedEmails(new Set()); }}
                style={{ background: bulkMode ? "var(--hp-warm-100)" : "none", border: "1px solid var(--hp-border)", borderRadius: 6, cursor: "pointer", padding: "4px 8px", fontSize: 11, display: "flex", alignItems: "center", gap: 4, color: bulkMode ? "var(--hp-warm-800)" : "var(--hp-text-secondary)" }}
              >
                <Users className="h-3 w-3" />
                Bulk
              </button>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Search className="h-3.5 w-3.5" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--hp-text-muted)" }} />
            <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "7px 10px 7px 32px", borderRadius: 6, border: "1px solid var(--hp-border)", fontSize: 12, backgroundColor: "var(--hp-bg, #faf9f7)", color: "var(--hp-text)" }} />
          </div>
        </div>

        {/* User list */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {loading ? (
            <div style={{ padding: 20, textAlign: "center" }}>
              <RefreshCw className="h-4 w-4 animate-spin mx-auto" style={{ color: "var(--hp-text-secondary)" }} />
            </div>
          ) : error && users.length === 0 ? (
            <div style={{ padding: 20, fontSize: 13, color: "var(--hp-critical, #dc2626)" }}>{error}</div>
          ) : filteredUsers.length === 0 ? (
            <div style={{ padding: 20, fontSize: 13, color: "var(--hp-text-muted)" }}>
              No users found. Click "Sync Procore" to import your team.
            </div>
          ) : (
            filteredUsers.map(user => {
              const isSelected = bulkMode ? selectedEmails.has(user.email) : selectedUser?.email === user.email;
              const activeCount = Object.values(user.permissions).filter(v => v !== "none").length;
              return (
                <div
                  key={user.email}
                  onClick={() => bulkMode ? toggleEmail(user.email) : selectUser(user)}
                  style={{
                    padding: "10px 16px", cursor: "pointer",
                    borderBottom: "1px solid var(--hp-border, #f0f0f0)",
                    backgroundColor: isSelected ? "var(--hp-warm-100, #f5f0eb)" : "transparent",
                    display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  {bulkMode && (
                    selectedEmails.has(user.email)
                      ? <CheckSquare className="h-4 w-4 shrink-0" style={{ color: "var(--hp-warm-800)" }} />
                      : <Square className="h-4 w-4 shrink-0" style={{ color: "var(--hp-text-muted)" }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: isSelected ? 600 : 400, color: "var(--hp-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {user.name ?? user.email.split("@")[0]}
                      </span>
                      {user.is_super_admin && <Crown className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--hp-significant, #d97706)" }} />}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 2, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>
                      <span style={{ flexShrink: 0, marginLeft: 8 }}>{activeCount} module{activeCount !== 1 ? "s" : ""}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bulk actions bar */}
        {bulkMode && selectedEmails.size > 0 && (
          <div style={{ padding: "10px 16px", borderTop: "1px solid var(--hp-border)", backgroundColor: "var(--hp-warm-50)", fontSize: 12 }}>
            <div style={{ fontWeight: 600, color: "var(--hp-text)", marginBottom: 8 }}>
              {selectedEmails.size} user{selectedEmails.size !== 1 ? "s" : ""} selected
            </div>
            <div style={{ fontSize: 11, color: "var(--hp-text-secondary)", marginBottom: 6 }}>Apply template:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {templates.map(t => (
                <button key={t.name} onClick={() => applyTemplate(t)}
                  style={{ textAlign: "left", padding: "6px 10px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", fontSize: 12, cursor: "pointer", color: "var(--hp-text)" }}>
                  {t.name}
                  {t.description && <span style={{ color: "var(--hp-text-muted)", marginLeft: 6 }}>— {t.description}</span>}
                </button>
              ))}
              {templates.length === 0 && (
                <p style={{ fontSize: 11, color: "var(--hp-text-muted)", fontStyle: "italic" }}>
                  No templates yet. Edit a user's permissions and save as template.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Permission editor panel ── */}
      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
        {/* Status messages */}
        {success && (
          <div style={{ marginBottom: 16, padding: "8px 14px", borderRadius: 6, backgroundColor: "var(--hp-compliant-bg, #f0fdf4)", border: "1px solid var(--hp-compliant, #16a34a)", fontSize: 12, color: "var(--hp-compliant)" }}>
            {success}
          </div>
        )}
        {error && users.length > 0 && (
          <div style={{ marginBottom: 16, padding: "8px 14px", borderRadius: 6, backgroundColor: "var(--hp-critical-bg, #fef2f2)", border: "1px solid var(--hp-critical, #dc2626)", fontSize: 12, color: "var(--hp-critical)" }}>
            {error}
          </div>
        )}

        {/* Template editor modal */}
        {showTemplateEditor && (
          <div style={{ marginBottom: 20, padding: 16, borderRadius: 8, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-warm-50)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", color: "var(--hp-text)" }}>Save as Template</h3>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <input type="text" placeholder="Template name (e.g. Site Supervisor)" value={templateName} onChange={e => setTemplateName(e.target.value)}
                style={{ flex: 1, padding: "7px 10px", borderRadius: 6, border: "1px solid var(--hp-border)", fontSize: 12, color: "var(--hp-text)" }} />
              <input type="text" placeholder="Description (optional)" value={templateDesc} onChange={e => setTemplateDesc(e.target.value)}
                style={{ flex: 1, padding: "7px 10px", borderRadius: 6, border: "1px solid var(--hp-border)", fontSize: 12, color: "var(--hp-text)" }} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={saveTemplate} disabled={!templateName.trim()}
                style={{ padding: "6px 16px", borderRadius: 6, border: "none", backgroundColor: "var(--hp-warm-700)", color: "#fff", fontSize: 12, fontWeight: 600, cursor: templateName.trim() ? "pointer" : "not-allowed", opacity: templateName.trim() ? 1 : 0.5 }}>
                Save Template
              </button>
              <button onClick={() => setShowTemplateEditor(false)}
                style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", color: "var(--hp-text)", fontSize: 12, cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {!selectedUser && !bulkMode ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--hp-text-muted)", gap: 16 }}>
            <Shield className="h-10 w-10" style={{ opacity: 0.3 }} />
            <p style={{ fontSize: 14 }}>Select a user to manage their permissions</p>
            {users.length <= 1 && (
              <button onClick={syncDirectory} disabled={syncing}
                style={{ padding: "8px 20px", borderRadius: 8, border: "none", backgroundColor: "var(--hp-warm-700)", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Download className="h-4 w-4" />
                Sync team from Procore
              </button>
            )}
          </div>
        ) : bulkMode ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--hp-text-muted)", gap: 12 }}>
            <Users className="h-10 w-10" style={{ opacity: 0.3 }} />
            <p style={{ fontSize: 14 }}>Select users on the left, then apply a template</p>
          </div>
        ) : (
          <>
            {/* User header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--hp-text)", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                  {selectedUser!.name ?? selectedUser!.email.split("@")[0]}
                  {selectedUser!.is_super_admin && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--hp-significant)", backgroundColor: "var(--hp-significant-bg)", padding: "2px 8px", borderRadius: 4 }}>SUPER ADMIN</span>
                  )}
                </h3>
                <p style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 4 }}>{selectedUser!.email}</p>
                <p style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 2 }}>
                  First login: {fmtDate(selectedUser!.first_login)} · Last login: {fmtDate(selectedUser!.last_login)}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {hasChanges && (
                  <>
                    <button onClick={saveCurrentAsTemplate}
                      style={{ display: "flex", alignItems: "center", gap: 4, padding: "7px 14px", borderRadius: 8, fontSize: 12, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", color: "var(--hp-text)", cursor: "pointer" }}>
                      <Plus className="h-3.5 w-3.5" /> Save as Template
                    </button>
                    <button onClick={savePermissions} disabled={saving}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer", backgroundColor: "var(--hp-warm-700, #5c4a3a)", color: "#fff", opacity: saving ? 0.7 : 1 }}>
                      <Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quick apply templates */}
            {templates.length > 0 && !selectedUser!.is_super_admin && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--hp-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                  Apply Template
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {templates.map(t => (
                    <button key={t.name} onClick={() => applyTemplate(t)}
                      style={{ padding: "4px 12px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", fontSize: 12, cursor: "pointer", color: "var(--hp-text)", display: "flex", alignItems: "center", gap: 6 }}>
                      {t.name}
                      <button onClick={(e) => { e.stopPropagation(); deleteTemplate(t.name); }}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                        <Trash2 className="h-3 w-3" style={{ color: "var(--hp-text-muted)" }} />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Permission matrix */}
            <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", overflow: "hidden" }}>
              {modules.map((mod, idx) => {
                const currentLevel = editedPerms[mod.key] ?? "none";
                const levelInfo = LEVEL_LABELS[currentLevel] ?? LEVEL_LABELS.none;
                const LevelIcon = levelInfo.icon;
                const isDisabled = selectedUser!.is_super_admin;

                return (
                  <div key={mod.key} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                    borderBottom: idx < modules.length - 1 ? "1px solid var(--hp-border, #f0f0f0)" : "none",
                    backgroundColor: isDisabled ? "var(--hp-warm-50, #faf8f5)" : "var(--hp-surface, #ffffff)",
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--hp-text)" }}>{mod.label}</div>
                      <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 1 }}>{mod.description}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 80 }}>
                      <LevelIcon className="h-3.5 w-3.5" style={{ color: levelInfo.color }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: levelInfo.color }}>{levelInfo.label}</span>
                    </div>
                    <div style={{ display: "flex", gap: 2 }}>
                      {LEVELS.map(level => {
                        const isActive = currentLevel === level;
                        const info = LEVEL_LABELS[level];
                        return (
                          <button key={level} onClick={() => changeLevel(mod.key, level)} disabled={isDisabled} title={info.label}
                            style={{
                              padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 500,
                              border: isActive ? `1px solid ${info.color}` : "1px solid transparent",
                              backgroundColor: isActive ? info.bg : "transparent",
                              color: isActive ? info.color : "var(--hp-text-muted)",
                              cursor: isDisabled ? "not-allowed" : "pointer", opacity: isDisabled ? 0.5 : 1,
                            }}>
                            {info.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedUser!.is_super_admin && (
              <p style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 12, fontStyle: "italic" }}>
                Super Admin permissions cannot be modified. They have full access to all modules.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
