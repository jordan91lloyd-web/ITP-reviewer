"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Save, Search, Shield, ShieldCheck, ShieldX, Eye, Pencil, Crown } from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserWithPerms | null>(null);
  const [editedPerms, setEditedPerms] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/permissions?admin=true");
      if (res.status === 403) {
        setError("You do not have permission to manage user access.");
        return;
      }
      if (!res.ok) throw new Error("Failed to load permissions");
      const data = await res.json();
      setUsers(data.users ?? []);
      setModules(data.modules ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const selectUser = (user: UserWithPerms) => {
    setSelectedUser(user);
    setEditedPerms({ ...user.permissions });
    setHasChanges(false);
    setSuccess(null);
  };

  const changeLevel = (moduleKey: string, level: string) => {
    if (selectedUser?.is_super_admin) return; // can't edit super admin
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
        body: JSON.stringify({
          target_email: selectedUser.email,
          permissions: editedPerms,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed (${res.status})`);
      }
      const data = await res.json();
      setSuccess(`Saved ${data.changes} change${data.changes !== 1 ? "s" : ""}`);
      setHasChanges(false);
      // Update local state
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
      {/* User list */}
      <div style={{
        width: 320, borderRight: "1px solid var(--hp-border, #e5e7eb)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        backgroundColor: "var(--hp-surface, #ffffff)",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--hp-border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--hp-text, #1f2937)", margin: 0 }}>
              <Shield className="inline h-4 w-4 mr-2" style={{ verticalAlign: "text-bottom" }} />
              Permissions
            </h2>
            <button
              onClick={fetchData}
              disabled={loading}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} style={{ color: "var(--hp-text-secondary)" }} />
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <Search className="h-3.5 w-3.5" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--hp-text-muted)" }} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "7px 10px 7px 32px", borderRadius: 6,
                border: "1px solid var(--hp-border)", fontSize: 12,
                backgroundColor: "var(--hp-bg, #faf9f7)", color: "var(--hp-text)",
              }}
            />
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
            <div style={{ padding: 20, fontSize: 13, color: "var(--hp-text-muted)" }}>No users found</div>
          ) : (
            filteredUsers.map(user => {
              const isSelected = selectedUser?.email === user.email;
              const activeCount = Object.values(user.permissions).filter(v => v !== "none").length;
              return (
                <div
                  key={user.email}
                  onClick={() => selectUser(user)}
                  style={{
                    padding: "10px 16px", cursor: "pointer",
                    borderBottom: "1px solid var(--hp-border, #f0f0f0)",
                    backgroundColor: isSelected ? "var(--hp-warm-100, #f5f0eb)" : "transparent",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: isSelected ? 600 : 400, color: "var(--hp-text)", flex: 1 }}>
                      {user.name ?? user.email.split("@")[0]}
                    </span>
                    {user.is_super_admin && (
                      <Crown className="h-3.5 w-3.5" style={{ color: "var(--hp-significant, #d97706)" }} />
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 2, display: "flex", justifyContent: "space-between" }}>
                    <span>{user.email}</span>
                    <span>{activeCount} module{activeCount !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Permission editor */}
      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
        {!selectedUser ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--hp-text-muted)" }}>
            <p style={{ fontSize: 14 }}>Select a user to manage their permissions</p>
          </div>
        ) : (
          <>
            {/* User header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--hp-text)", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                  {selectedUser.name ?? selectedUser.email.split("@")[0]}
                  {selectedUser.is_super_admin && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--hp-significant)", backgroundColor: "var(--hp-significant-bg)", padding: "2px 8px", borderRadius: 4 }}>
                      SUPER ADMIN
                    </span>
                  )}
                </h3>
                <p style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 4 }}>{selectedUser.email}</p>
                <p style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 2 }}>
                  First login: {fmtDate(selectedUser.first_login)} · Last login: {fmtDate(selectedUser.last_login)}
                </p>
              </div>
              {hasChanges && (
                <button
                  onClick={savePermissions}
                  disabled={saving}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                    border: "none", cursor: saving ? "not-allowed" : "pointer",
                    backgroundColor: "var(--hp-warm-700, #5c4a3a)", color: "#fff",
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  <Save className="h-3.5 w-3.5" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>

            {success && (
              <div style={{ marginBottom: 16, padding: "8px 14px", borderRadius: 6, backgroundColor: "var(--hp-compliant-bg, #f0fdf4)", border: "1px solid var(--hp-compliant, #16a34a)", fontSize: 12, color: "var(--hp-compliant)" }}>
                {success}
              </div>
            )}
            {error && (
              <div style={{ marginBottom: 16, padding: "8px 14px", borderRadius: 6, backgroundColor: "var(--hp-critical-bg, #fef2f2)", border: "1px solid var(--hp-critical, #dc2626)", fontSize: 12, color: "var(--hp-critical)" }}>
                {error}
              </div>
            )}

            {/* Permission matrix */}
            <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", overflow: "hidden" }}>
              {modules.map((mod, idx) => {
                const currentLevel = editedPerms[mod.key] ?? "none";
                const levelInfo = LEVEL_LABELS[currentLevel] ?? LEVEL_LABELS.none;
                const LevelIcon = levelInfo.icon;
                const isDisabled = selectedUser.is_super_admin;

                return (
                  <div
                    key={mod.key}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 16px",
                      borderBottom: idx < modules.length - 1 ? "1px solid var(--hp-border, #f0f0f0)" : "none",
                      backgroundColor: isDisabled ? "var(--hp-warm-50, #faf8f5)" : "var(--hp-surface, #ffffff)",
                    }}
                  >
                    {/* Module info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--hp-text)" }}>{mod.label}</div>
                      <div style={{ fontSize: 11, color: "var(--hp-text-muted)", marginTop: 1 }}>{mod.description}</div>
                    </div>

                    {/* Current level indicator */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 80 }}>
                      <LevelIcon className="h-3.5 w-3.5" style={{ color: levelInfo.color }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: levelInfo.color }}>{levelInfo.label}</span>
                    </div>

                    {/* Level selector */}
                    <div style={{ display: "flex", gap: 2 }}>
                      {LEVELS.map(level => {
                        const isActive = currentLevel === level;
                        const info = LEVEL_LABELS[level];
                        return (
                          <button
                            key={level}
                            onClick={() => changeLevel(mod.key, level)}
                            disabled={isDisabled}
                            title={info.label}
                            style={{
                              padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 500,
                              border: isActive ? `1px solid ${info.color}` : "1px solid transparent",
                              backgroundColor: isActive ? info.bg : "transparent",
                              color: isActive ? info.color : "var(--hp-text-muted)",
                              cursor: isDisabled ? "not-allowed" : "pointer",
                              opacity: isDisabled ? 0.5 : 1,
                            }}
                          >
                            {info.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedUser.is_super_admin && (
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
