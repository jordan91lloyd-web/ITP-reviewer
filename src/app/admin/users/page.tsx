"use client";

// ─── Admin: User Management ────────────────────────────────────────────────────
// List, add, and remove company admins. Admin-only.

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserPlus, Trash2, Shield, FileText } from "lucide-react";

interface AdminUser {
  id:         string;
  email:      string;
  name:       string | null;
  created_at: string;
  created_by: string | null;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function AdminUsersPage() {
  const [adminChecked, setAdminChecked]   = useState(false);
  const [isAdmin, setIsAdmin]             = useState(false);
  const [currentEmail, setCurrentEmail]   = useState("");
  const [admins, setAdmins]               = useState<AdminUser[]>([]);
  const [loadError, setLoadError]         = useState<string | null>(null);
  const [newEmail, setNewEmail]           = useState("");
  const [newName, setNewName]             = useState("");
  const [adding, setAdding]               = useState(false);
  const [addError, setAddError]           = useState<string | null>(null);
  const [addSuccess, setAddSuccess]       = useState(false);
  const [removing, setRemoving]           = useState<string | null>(null);
  const [removeError, setRemoveError]     = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/check")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        setIsAdmin(!!data?.isAdmin);
        setCurrentEmail(data?.email ?? "");
        setAdminChecked(true);
      })
      .catch(() => setAdminChecked(true));
  }, []);

  useEffect(() => {
    if (isAdmin) loadAdmins();
  }, [isAdmin]); // eslint-disable-line react-hooks/exhaustive-deps

  function loadAdmins() {
    setLoadError(null);
    fetch("/api/admin/users")
      .then(r => r.ok ? r.json() : Promise.reject("Request failed"))
      .then(data => setAdmins(data.admins ?? []))
      .catch(() => setLoadError("Failed to load admin users."));
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setAdding(true);
    setAddError(null);
    setAddSuccess(false);
    try {
      const res  = await fetch("/api/admin/users", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: newEmail.trim(), name: newName.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAddError(data.error ?? "Failed to add admin.");
      } else {
        setAddSuccess(true);
        setNewEmail("");
        setNewName("");
        loadAdmins();
      }
    } catch {
      setAddError("Network error. Please try again.");
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(email: string) {
    setRemoving(email);
    setRemoveError(null);
    try {
      const res  = await fetch("/api/admin/users", {
        method:  "DELETE",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRemoveError(data.error ?? "Failed to remove admin.");
      } else {
        loadAdmins();
      }
    } catch {
      setRemoveError("Network error. Please try again.");
    } finally {
      setRemoving(null);
    }
  }

  // ── Auth gates ───────────────────────────────────────────────────────────────

  if (!adminChecked) {
    return (
      <div className="flex-1 bg-[#F9FAFB] flex items-center justify-center py-24">
        <div className="h-6 w-6 border-2 border-gray-300 border-t-[#1F3864] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    if (typeof window !== "undefined") window.location.replace("/");
    return null;
  }

  // ── Main ─────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-full bg-[#F9FAFB]">

      {/* Sub-header */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <Link href="/admin/documents" className="hover:text-[#1F3864] transition-colors font-medium">
            Document Management
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-[#1F3864]">Admin Users</span>
        </div>
        <Link
          href="/admin/documents"
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#1F3864] transition-colors"
        >
          <FileText className="h-3.5 w-3.5" />
          Document Management →
        </Link>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10">

        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#1F3864]">Admin Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Admins can upload scoring documents and manage other admins. You cannot remove yourself.
          </p>
        </div>

        {/* Current admins */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">Current admins</p>
          </div>

          {loadError && (
            <div className="px-5 py-4 text-sm text-red-600">{loadError}</div>
          )}

          {!loadError && admins.length === 0 && (
            <div className="px-5 py-6 text-center text-sm text-gray-400">
              No admins found.
            </div>
          )}

          <div className="divide-y divide-gray-50">
            {admins.map(admin => {
              const isSelf = admin.email.toLowerCase() === currentEmail.toLowerCase();
              return (
                <div key={admin.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1F3864]/10 shrink-0">
                      <Shield className="h-4 w-4 text-[#1F3864]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {admin.name ?? admin.email}
                        </p>
                        {isSelf && (
                          <span className="text-[10px] bg-[#1F3864]/10 text-[#1F3864] font-semibold rounded-full px-2 py-0.5 shrink-0">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">{admin.email}</p>
                      <p className="text-[10px] text-gray-300">
                        Added {formatDate(admin.created_at)}
                        {admin.created_by ? ` by ${admin.created_by}` : ""}
                      </p>
                    </div>
                  </div>
                  {!isSelf && (
                    <button
                      type="button"
                      onClick={() => handleRemove(admin.email)}
                      disabled={removing === admin.email}
                      className="shrink-0 flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                      {removing === admin.email ? "Removing…" : "Remove"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {removeError && (
            <div className="px-5 pb-4 text-sm text-red-600">{removeError}</div>
          )}
        </div>

        {/* Add new admin */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">Add new admin</p>
            <p className="text-xs text-gray-400 mt-0.5">
              The user must be a Procore team member. Their email must match their Procore login.
            </p>
          </div>

          <form onSubmit={handleAdd} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={e => { setNewEmail(e.target.value); setAddError(null); setAddSuccess(false); }}
                placeholder="user@fleekconstructions.au"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Display name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="First name"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {addError && (
              <p className="text-xs text-red-600">{addError}</p>
            )}
            {addSuccess && (
              <p className="text-xs text-green-700 font-medium">Admin added successfully.</p>
            )}

            <button
              type="submit"
              disabled={adding || !newEmail.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#1F3864] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#253f77] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              {adding ? "Adding…" : "Add Admin"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
