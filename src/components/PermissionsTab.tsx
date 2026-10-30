"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Save, Search, Shield, Crown, Users, Download, Plus, Trash2, CheckSquare, Square, Check, X } from "lucide-react";

interface ModuleDef { key: string; label: string; description: string; }
interface UserWithPerms {
  id: string; email: string; name: string | null; is_super_admin: boolean;
  first_login: string | null; last_login: string | null;
  permissions: Record<string, string>;
}
interface PermTemplate { id: string; name: string; description: string | null; permissions: Record<string, string>; }
interface Props { companyId?: number | null; }

// Simplified: "edit" = has access, "none" = no access. Super Admin is separate.
function hasAccess(level: string): boolean {
  return level === "view" || level === "edit" || level === "admin";
}

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

  const [selectedUser, setSelectedUser] = useState<UserWithPerms | null>(null);
  const [editedPerms, setEditedPerms] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [bulkMode, setBulkMode] = useState(false);

  // Template creation
  const [creatingTemplate, setCreatingTemplate] = useState(false);
  const [newTmplName, setNewTmplName] = useState("");
  const [newTmplPerms, setNewTmplPerms] = useState<Record<string, string>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, templatesRes] = await Promise.all([
        fetch("/api/permissions?admin=true"),
        fetch("/api/permissions/templates"),
      ]);
      if (usersRes.status === 403) { setError("You do not have permission to manage user access."); return; }
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
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const syncDirectory = async () => {
    setSyncing(true); setError(null); setSuccess(null);
    try {
      const res = await fetch("/api/permissions/sync", { method: "POST" });
      if (!res.ok) throw new Error("Sync failed");
      const data = await res.json();
      setSuccess(`Synced: ${data.domain_matched} active users (${data.created} new, ${data.deactivated ?? 0} removed)`);
      await fetchData();
    } catch (err) { setError(err instanceof Error ? err.message : "Sync failed"); }
    finally { setSyncing(false); }
  };

  const selectUser = (user: UserWithPerms) => {
    setBulkMode(false); setSelectedUser(user);
    setEditedPerms({ ...user.permissions }); setHasChanges(false); setSuccess(null);
  };

  const toggleAccess = (moduleKey: string) => {
    if (selectedUser?.is_super_admin) return;
    const current = editedPerms[moduleKey] ?? "none";
    setEditedPerms(prev => ({ ...prev, [moduleKey]: hasAccess(current) ? "none" : "edit" }));
    setHasChanges(true); setSuccess(null);
  };

  const savePermissions = async () => {
    if (!selectedUser) return;
    setSaving(true); setError(null); setSuccess(null);
    try {
      const res = await fetch("/api/permissions", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_email: selectedUser.email, permissions: editedPerms }),
      });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || `Failed`); }
      const data = await res.json();
      setSuccess(`Saved ${data.changes} change${data.changes !== 1 ? "s" : ""}`);
      setHasChanges(false);
      setUsers(prev => prev.map(u => u.email === selectedUser.email ? { ...u, permissions: { ...editedPerms } } : u));
      setSelectedUser(prev => prev ? { ...prev, permissions: { ...editedPerms } } : null);
    } catch (err) { setError(err instanceof Error ? err.message : "Save failed"); }
    finally { setSaving(false); }
  };

  // ── Templates ─────────────────────────────────────────────────────────

  const startCreateTemplate = () => {
    // Default all modules to "none"
    const perms: Record<string, string> = {};
    modules.forEach(m => perms[m.key] = "none");
    setNewTmplPerms(perms);
    setNewTmplName("");
    setCreatingTemplate(true);
    setSelectedUser(null);
    setBulkMode(false);
  };

  const saveNewTemplate = async () => {
    if (!newTmplName.trim()) return;
    try {
      const res = await fetch("/api/permissions/templates", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTmplName.trim(), permissions: newTmplPerms }),
      });
      if (!res.ok) throw new Error("Failed to save template");
      setSuccess(`Template "${newTmplName}" created`);
      setCreatingTemplate(false);
      await fetchData();
    } catch (err) { setError(err instanceof Error ? err.message : "Failed"); }
  };

  const saveCurrentAsTemplate = () => {
    setNewTmplPerms({ ...editedPerms });
    setNewTmplName("");
    setCreatingTemplate(true);
  };

  const deleteTemplate = async (name: string) => {
    await fetch(`/api/permissions/templates?name=${encodeURIComponent(name)}`, { method: "DELETE" });
    await fetchData();
  };

  const applyTemplateToUser = (tmpl: PermTemplate) => {
    if (selectedUser && !selectedUser.is_super_admin) {
      setEditedPerms({ ...tmpl.permissions });
      setHasChanges(true); setSuccess(null);
    }
  };

  const applyTemplateBulk = async (tmpl: PermTemplate) => {
    if (selectedEmails.size === 0) return;
    setSaving(true); setError(null); setSuccess(null);
    try {
      const res = await fetch("/api/permissions/bulk", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_emails: [...selectedEmails], permissions: tmpl.permissions }),
      });
      if (!res.ok) throw new Error("Bulk apply failed");
      const data = await res.json();
      setSuccess(`Applied "${tmpl.name}" to ${data.users_updated} users (${data.total_changes} changes)`);
      setBulkMode(false); setSelectedEmails(new Set());
      await fetchData();
    } catch (err) { setError(err instanceof Error ? err.message : "Failed"); }
    finally { setSaving(false); }
  };

  const toggleEmail = (email: string) => {
    setSelectedEmails(prev => { const n = new Set(prev); if (n.has(email)) n.delete(email); else n.add(email); return n; });
  };

  const filteredUsers = users.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.email.toLowerCase().includes(q) || (u.name ?? "").toLowerCase().includes(q);
  });

  // Permissions tab works independently of company selection — uses FLEEK_COMPANY_ID server-side

  // ── Access pill component ─────────────────────────────────────────────
  const AccessPill = ({ on }: { on: boolean }) => (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600,
      backgroundColor: on ? "#dcfce7" : "#fee2e2",
      color: on ? "#15803d" : "#dc2626",
      border: `1px solid ${on ? "#bbf7d0" : "#fecaca"}`,
    }}>
      {on ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      {on ? "Access" : "No Access"}
    </span>
  );

  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
      {/* ── Left panel: users ── */}
      <div style={{ width: 340, borderRight: "1px solid var(--hp-border)", display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "var(--hp-surface)" }}>
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--hp-border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--hp-text)", margin: 0 }}>
              <Shield className="inline h-4 w-4 mr-2" style={{ verticalAlign: "text-bottom" }} />
              Permissions
            </h2>
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={syncDirectory} disabled={syncing} title="Sync users from Procore"
                style={{ background: "none", border: "1px solid var(--hp-border)", borderRadius: 6, cursor: "pointer", padding: "4px 8px", fontSize: 11, display: "flex", alignItems: "center", gap: 4, color: "var(--hp-text-secondary)" }}>
                <Download className={`h-3 w-3 ${syncing ? "animate-spin" : ""}`} /> {syncing ? "Syncing..." : "Sync"}
              </button>
              <button onClick={() => { setBulkMode(!bulkMode); setSelectedUser(null); setCreatingTemplate(false); setSelectedEmails(new Set()); }}
                style={{ background: bulkMode ? "var(--hp-warm-100)" : "none", border: "1px solid var(--hp-border)", borderRadius: 6, cursor: "pointer", padding: "4px 8px", fontSize: 11, display: "flex", alignItems: "center", gap: 4, color: bulkMode ? "var(--hp-warm-800)" : "var(--hp-text-secondary)" }}>
                <Users className="h-3 w-3" /> Bulk
              </button>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Search className="h-3.5 w-3.5" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--hp-text-muted)" }} />
            <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "7px 10px 7px 32px", borderRadius: 6, border: "1px solid var(--hp-border)", fontSize: 12, backgroundColor: "var(--hp-bg)", color: "var(--hp-text)" }} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {loading ? (
            <div style={{ padding: 20, textAlign: "center" }}><RefreshCw className="h-4 w-4 animate-spin mx-auto" style={{ color: "var(--hp-text-secondary)" }} /></div>
          ) : filteredUsers.length === 0 ? (
            <div style={{ padding: 20, fontSize: 13, color: "var(--hp-text-muted)" }}>No users found. Click "Sync" to import from Procore.</div>
          ) : (
            filteredUsers.map(user => {
              const isSelected = bulkMode ? selectedEmails.has(user.email) : selectedUser?.email === user.email;
              const activeCount = Object.values(user.permissions).filter(v => hasAccess(v)).length;
              const totalModules = Object.keys(user.permissions).length;
              return (
                <div key={user.email} onClick={() => bulkMode ? toggleEmail(user.email) : selectUser(user)}
                  style={{ padding: "10px 16px", cursor: "pointer", borderBottom: "1px solid var(--hp-border, #f0f0f0)", backgroundColor: isSelected ? "var(--hp-warm-100)" : "transparent", display: "flex", alignItems: "center", gap: 10 }}>
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
                      {user.is_super_admin && <Crown className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--hp-significant)" }} />}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 2, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>
                      <span style={{ flexShrink: 0, marginLeft: 8, color: activeCount > 0 ? "#15803d" : "var(--hp-text-muted)" }}>
                        {user.is_super_admin ? "All" : `${activeCount}/${totalModules}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bulk actions */}
        {bulkMode && selectedEmails.size > 0 && (
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--hp-border)", backgroundColor: "var(--hp-warm-50)" }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--hp-text)", marginBottom: 8 }}>
              {selectedEmails.size} user{selectedEmails.size !== 1 ? "s" : ""} selected
            </div>
            {templates.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {templates.map(t => (
                  <button key={t.name} onClick={() => applyTemplateBulk(t)} disabled={saving}
                    style={{ textAlign: "left", padding: "8px 12px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", fontSize: 12, cursor: "pointer", color: "var(--hp-text)", fontWeight: 500 }}>
                    Apply: {t.name}
                  </button>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 11, color: "var(--hp-text-muted)", fontStyle: "italic" }}>
                Create a template first, then you can bulk assign it here.
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Right panel: editor ── */}
      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
        {success && <div style={{ marginBottom: 16, padding: "8px 14px", borderRadius: 6, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", fontSize: 12, color: "#15803d" }}>{success}</div>}
        {error && users.length > 0 && <div style={{ marginBottom: 16, padding: "8px 14px", borderRadius: 6, backgroundColor: "#fee2e2", border: "1px solid #fecaca", fontSize: 12, color: "#dc2626" }}>{error}</div>}

        {/* ── Templates section (always visible) ── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--hp-text)", margin: 0 }}>Permission Templates</h3>
            <button onClick={startCreateTemplate}
              style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 12px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", fontSize: 12, cursor: "pointer", color: "var(--hp-text)", fontWeight: 500 }}>
              <Plus className="h-3 w-3" /> New Template
            </button>
          </div>

          {templates.length === 0 && !creatingTemplate && (
            <div style={{ padding: "16px 20px", borderRadius: 8, border: "1px dashed var(--hp-border)", backgroundColor: "var(--hp-warm-50)", textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "var(--hp-text-secondary)", margin: "0 0 8px" }}>No templates yet</p>
              <p style={{ fontSize: 12, color: "var(--hp-text-muted)", margin: 0 }}>
                Create a template to quickly assign the same permissions to multiple users.
                For example: "Site Supervisor" with access to Company and ITP Reviews only.
              </p>
            </div>
          )}

          {templates.length > 0 && !creatingTemplate && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {templates.map(t => {
                const accessCount = Object.values(t.permissions).filter(v => hasAccess(v)).length;
                const accessModules = modules.filter(m => hasAccess(t.permissions[m.key] ?? "none")).map(m => m.label);
                return (
                  <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-text)" }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 2 }}>
                        {accessCount === 0 ? "No access to any module" : accessModules.join(", ")}
                      </div>
                    </div>
                    <button onClick={() => deleteTemplate(t.name)} title="Delete template"
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                      <Trash2 className="h-3.5 w-3.5" style={{ color: "var(--hp-text-muted)" }} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Template creator ── */}
        {creatingTemplate && (
          <div style={{ marginBottom: 20, padding: 16, borderRadius: 8, border: "1px solid var(--hp-warm-200)", backgroundColor: "var(--hp-warm-50)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--hp-text)", margin: "0 0 12px" }}>
              {newTmplName ? `Template: ${newTmplName}` : "New Permission Template"}
            </h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input type="text" placeholder="Template name (e.g. Site Supervisor)" value={newTmplName} onChange={e => setNewTmplName(e.target.value)}
                style={{ flex: 1, padding: "8px 12px", borderRadius: 6, border: "1px solid var(--hp-border)", fontSize: 13, color: "var(--hp-text)", backgroundColor: "var(--hp-surface)" }} />
              <button onClick={saveNewTemplate} disabled={!newTmplName.trim()}
                style={{ padding: "7px 20px", borderRadius: 6, border: "none", backgroundColor: "var(--hp-warm-700)", color: "#fff", fontSize: 12, fontWeight: 600, cursor: newTmplName.trim() ? "pointer" : "not-allowed", opacity: newTmplName.trim() ? 1 : 0.5, whiteSpace: "nowrap" }}>
                Save Template
              </button>
              <button onClick={() => setCreatingTemplate(false)}
                style={{ padding: "7px 16px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", color: "var(--hp-text)", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel
              </button>
            </div>

            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--hp-text-secondary)", marginBottom: 8 }}>
              Toggle which modules this template gives access to:
            </div>

            <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", overflow: "hidden", marginBottom: 12 }}>
              {modules.filter(m => m.key !== "permissions").map((mod, idx) => {
                const on = hasAccess(newTmplPerms[mod.key] ?? "none");
                return (
                  <div key={mod.key} onClick={() => setNewTmplPerms(prev => ({ ...prev, [mod.key]: hasAccess(prev[mod.key] ?? "none") ? "none" : "edit" }))}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 14px", cursor: "pointer",
                      borderBottom: idx < modules.length - 2 ? "1px solid var(--hp-border, #f0f0f0)" : "none",
                      backgroundColor: on ? "#f0fdf4" : "var(--hp-surface)",
                    }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--hp-text)" }}>{mod.label}</div>
                      <div style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>{mod.description}</div>
                    </div>
                    <AccessPill on={on} />
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ── User permission editor ── */}
        {selectedUser && !creatingTemplate && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--hp-text)", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                  {selectedUser.name ?? selectedUser.email.split("@")[0]}
                  {selectedUser.is_super_admin && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--hp-significant)", backgroundColor: "var(--hp-significant-bg)", padding: "2px 8px", borderRadius: 4 }}>SUPER ADMIN</span>
                  )}
                </h3>
                <p style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 4 }}>{selectedUser.email}</p>
                <p style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 2 }}>
                  First login: {fmtDate(selectedUser.first_login)} · Last login: {fmtDate(selectedUser.last_login)}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {hasChanges && !selectedUser.is_super_admin && (
                  <>
                    <button onClick={saveCurrentAsTemplate}
                      style={{ display: "flex", alignItems: "center", gap: 4, padding: "7px 14px", borderRadius: 8, fontSize: 12, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", color: "var(--hp-text)", cursor: "pointer" }}>
                      <Plus className="h-3.5 w-3.5" /> Save as Template
                    </button>
                    <button onClick={savePermissions} disabled={saving}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer", backgroundColor: "var(--hp-warm-700)", color: "#fff", opacity: saving ? 0.7 : 1 }}>
                      <Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quick apply template */}
            {templates.length > 0 && !selectedUser.is_super_admin && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--hp-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Quick Apply Template</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {templates.map(t => (
                    <button key={t.name} onClick={() => applyTemplateToUser(t)}
                      style={{ padding: "4px 12px", borderRadius: 6, border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)", fontSize: 12, cursor: "pointer", color: "var(--hp-text)", fontWeight: 500 }}>
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Permission toggles */}
            <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", overflow: "hidden" }}>
              {modules.filter(m => m.key !== "permissions").map((mod, idx, arr) => {
                const on = hasAccess(editedPerms[mod.key] ?? "none");
                const isDisabled = selectedUser.is_super_admin;
                return (
                  <div key={mod.key}
                    onClick={() => !isDisabled && toggleAccess(mod.key)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", cursor: isDisabled ? "default" : "pointer",
                      borderBottom: idx < arr.length - 1 ? "1px solid var(--hp-border, #f0f0f0)" : "none",
                      backgroundColor: isDisabled ? "var(--hp-warm-50)" : on ? "#f0fdf4" : "var(--hp-surface)",
                      transition: "background-color 0.15s",
                    }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--hp-text)" }}>{mod.label}</div>
                      <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 1 }}>{mod.description}</div>
                    </div>
                    <AccessPill on={on} />
                  </div>
                );
              })}
            </div>

            {selectedUser.is_super_admin && (
              <p style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 12, fontStyle: "italic" }}>
                Super Admin has full access to all modules. This cannot be changed.
              </p>
            )}
          </>
        )}

        {/* Empty state */}
        {!selectedUser && !creatingTemplate && !bulkMode && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 60, color: "var(--hp-text-muted)", gap: 12 }}>
            <Shield className="h-10 w-10" style={{ opacity: 0.3 }} />
            <p style={{ fontSize: 14 }}>Select a user to manage their permissions</p>
          </div>
        )}

        {bulkMode && !creatingTemplate && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 60, color: "var(--hp-text-muted)", gap: 12 }}>
            <Users className="h-10 w-10" style={{ opacity: 0.3 }} />
            <p style={{ fontSize: 14 }}>
              {selectedEmails.size === 0
                ? "Select users on the left to bulk assign a template"
                : `${selectedEmails.size} selected — choose a template from the left panel`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
