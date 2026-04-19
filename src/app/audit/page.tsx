"use client";

// ─── Audit Log Viewer ─────────────────────────────────────────────────────────
// Filterable, paginated audit event log with project/user/action/date filters,
// summary stats, and CSV export.

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { AuditLogRow } from "@/lib/audit";

// ── Constants ──────────────────────────────────────────────────────────────────

const ACTION_OPTIONS = [
  { value: "",                        label: "All actions" },
  { value: "review_run",              label: "Review Run" },
  { value: "review_failed",           label: "Review Failed" },
  { value: "score_override",          label: "Score Override" },
  { value: "pdf_exported",            label: "PDF Exported" },
  { value: "bulk_review_started",     label: "Bulk Review Started" },
  { value: "bulk_review_completed",   label: "Bulk Review Completed" },
  { value: "login",                   label: "Login" },
  { value: "logout",                  label: "Logout" },
];

const ACTION_BADGE: Record<string, string> = {
  review_run:            "bg-green-100 text-green-800",
  review_failed:         "bg-red-100 text-red-800",
  score_override:        "bg-purple-100 text-purple-800",
  pdf_exported:          "bg-blue-100 text-blue-800",
  bulk_review_started:   "bg-sky-100 text-sky-800",
  bulk_review_completed: "bg-teal-100 text-teal-800",
  login:                 "bg-gray-100 text-gray-700",
  logout:                "bg-gray-100 text-gray-500",
};

const ACTION_LABEL: Record<string, string> = {
  review_run:            "Review Run",
  review_failed:         "Review Failed",
  score_override:        "Score Override",
  pdf_exported:          "PDF Exported",
  bulk_review_started:   "Bulk Review Started",
  bulk_review_completed: "Bulk Review Completed",
  login:                 "Login",
  logout:                "Logout",
};

// ── Types ──────────────────────────────────────────────────────────────────────

interface Company  { id: number; name: string }
interface Project  { id: number; name: string; display_name?: string | null }
interface AuditUser { user_id: string; user_name: string }
interface AuditStats {
  total_reviews:    number;
  total_overrides:  number;
  last_activity:    string | null;
  most_active_user: string | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function detailsSummary(row: AuditLogRow): string {
  const d = row.details as Record<string, unknown> | null;
  if (!d) return "";
  if (row.action === "review_run") {
    const parts: string[] = [];
    if (d.score != null)      parts.push(`Score: ${d.score}`);
    if (d.score_band)         parts.push(String(d.score_band).replace(/_/g, " "));
    if (d.file_count != null) parts.push(`${d.file_count} files`);
    return parts.join(" · ");
  }
  if (row.action === "review_failed") {
    return d.error ? `Error: ${String(d.error).slice(0, 80)}` : "";
  }
  if (row.action === "score_override") {
    return `${d.old_score} → ${d.new_score}${d.note ? ` — "${String(d.note).slice(0, 60)}"` : ""}`;
  }
  if (row.action === "pdf_exported") {
    return `${d.inspection_count} report${Number(d.inspection_count) !== 1 ? "s" : ""}, ${d.export_type}`;
  }
  return "";
}

// ── Inner page (needs useSearchParams — must be inside Suspense) ───────────────

function AuditPageInner() {
  const searchParams = useSearchParams();

  // Auth + company
  const [authenticated, setAuthenticated]     = useState<boolean | null>(null);
  const [companies, setCompanies]             = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Projects + users for filter dropdowns
  const [projects, setProjects]   = useState<Project[]>([]);
  const [auditUsers, setAuditUsers] = useState<AuditUser[]>([]);

  // Events
  const [events, setEvents]         = useState<AuditLogRow[]>([]);
  const [total, setTotal]           = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  // Summary stats (shown when projectFilter is active)
  const [stats, setStats]           = useState<AuditStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Export
  const [exportLoading, setExportLoading] = useState(false);

  // Filters — initialise project filter from URL params
  const [actionFilter,  setActionFilter]  = useState("");
  const [projectFilter, setProjectFilter] = useState(searchParams.get("project_id")   ?? "");
  const [projectName,   setProjectName]   = useState(searchParams.get("project_name") ?? "");
  const [userFilter,    setUserFilter]    = useState("");
  const [fromDate,      setFromDate]      = useState("");
  const [toDate,        setToDate]        = useState("");
  const [page,          setPage]          = useState(1);

  const LIMIT = 50;

  // ── Auth + bootstrap ────────────────────────────────────────────────────────

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.authenticated) {
          setAuthenticated(true);
          fetch("/api/procore/companies")
            .then(r => r.json())
            .then(d => {
              const list: Company[] = d.companies ?? [];
              setCompanies(list);
              if (list.length === 1) setSelectedCompany(list[0]);
            })
            .catch(() => {});
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false));
  }, []);

  // ── Load projects + users when company selected ─────────────────────────────

  useEffect(() => {
    if (!selectedCompany) return;

    // Projects
    fetch(`/api/dashboard/projects?company_id=${selectedCompany.id}`)
      .then(r => r.json())
      .then(d => setProjects(d.projects ?? []))
      .catch(() => {});

    // Distinct audit users
    fetch(`/api/audit/users?company_id=${selectedCompany.id}`)
      .then(r => r.json())
      .then(d => setAuditUsers(d.users ?? []))
      .catch(() => {});
  }, [selectedCompany]);

  // ── Load summary stats when project filter changes ──────────────────────────

  useEffect(() => {
    if (!selectedCompany || !projectFilter) {
      setStats(null);
      return;
    }
    setStatsLoading(true);
    fetch(`/api/audit/stats?company_id=${selectedCompany.id}&project_id=${projectFilter}`)
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => setStats(null))
      .finally(() => setStatsLoading(false));
  }, [selectedCompany, projectFilter]);

  // ── Fetch events ─────────────────────────────────────────────────────────────

  const fetchEvents = useCallback(async () => {
    if (!selectedCompany) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        company_id: String(selectedCompany.id),
        page:       String(page),
        limit:      String(LIMIT),
      });
      if (actionFilter)  params.set("action",     actionFilter);
      if (projectFilter) params.set("project_id", projectFilter);
      if (userFilter)    params.set("user_name",  userFilter);
      if (fromDate)      params.set("from",        fromDate);
      if (toDate)        params.set("to",          toDate);

      const res  = await fetch(`/api/audit?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load audit log");
      setEvents(data.events ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.total_pages ?? 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load audit log");
    } finally {
      setLoading(false);
    }
  }, [selectedCompany, page, actionFilter, projectFilter, userFilter, fromDate, toDate]);

  useEffect(() => { void fetchEvents(); }, [fetchEvents]);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  function resetPage() { setPage(1); }

  function clearAllFilters() {
    setActionFilter("");
    setProjectFilter("");
    setProjectName("");
    setUserFilter("");
    setFromDate("");
    setToDate("");
    setPage(1);
  }

  const hasFilters = !!(actionFilter || projectFilter || userFilter || fromDate || toDate);

  function buildExportUrl(): string {
    if (!selectedCompany) return "";
    const params = new URLSearchParams({ company_id: String(selectedCompany.id) });
    if (actionFilter)  params.set("action",     actionFilter);
    if (projectFilter) params.set("project_id", projectFilter);
    if (userFilter)    params.set("user_name",  userFilter);
    if (fromDate)      params.set("from",        fromDate);
    if (toDate)        params.set("to",          toDate);
    return `/api/audit/export?${params}`;
  }

  async function handleExport() {
    if (!selectedCompany) return;
    setExportLoading(true);
    try {
      const res = await fetch(buildExportUrl());
      if (!res.ok) throw new Error("Export failed");
      const blob     = await res.blob();
      const url      = URL.createObjectURL(blob);
      const a        = document.createElement("a");
      a.href         = url;
      a.download     = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // Non-critical — just stop spinner
    } finally {
      setExportLoading(false);
    }
  }

  // ── Auth gates ───────────────────────────────────────────────────────────────

  if (authenticated === false) {
    return (
      <div className="flex-1 bg-[#F9FAFB] flex flex-col items-center justify-center gap-4 py-24">
        <p className="text-sm text-gray-600">Connect to Procore to view the audit log.</p>
        <a href="/api/auth/login" className="rounded-lg bg-[#1F3864] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#253f77] transition-colors">
          Connect to Procore
        </a>
      </div>
    );
  }

  if (authenticated === null) {
    return (
      <div className="flex-1 bg-[#F9FAFB] flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  // ── Page ──────────────────────────────────────────────────────────────────────

  return (
    <div className="flex h-full flex-col bg-[#F9FAFB] overflow-hidden">

      {/* Sub-header: breadcrumb + company selector */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shrink-0">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <Link href="/dashboard" className="hover:text-[#1F3864] transition-colors font-medium">
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-[#1F3864]">Audit Log</span>
          {projectName && (
            <>
              <span className="text-gray-300">/</span>
              <span className="text-gray-600">{projectName}</span>
            </>
          )}
        </div>
        {companies.length > 1 && (
          <select
            value={selectedCompany?.id ?? ""}
            onChange={e => {
              const c = companies.find(x => x.id === Number(e.target.value));
              if (c) { setSelectedCompany(c); setPage(1); }
            }}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="">— Select company —</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        )}
        {companies.length === 1 && selectedCompany && (
          <span className="text-xs text-gray-500 font-medium">{selectedCompany.name}</span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {!selectedCompany ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Select a company to view the audit log.
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-6">

            {/* ── Filters ── */}
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 mb-5 shadow-sm">
              <div className="flex flex-wrap items-end gap-3">

                {/* Project */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Project</label>
                  <select
                    value={projectFilter}
                    onChange={e => {
                      const pid = e.target.value;
                      const p   = projects.find(x => String(x.id) === pid);
                      setProjectFilter(pid);
                      setProjectName(pid ? (p?.display_name || p?.name || "") : "");
                      resetPage();
                    }}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 max-w-[200px]"
                  >
                    <option value="">All projects</option>
                    {projects.map(p => (
                      <option key={p.id} value={String(p.id)}>
                        {p.display_name || p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* User */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">User</label>
                  <select
                    value={userFilter}
                    onChange={e => { setUserFilter(e.target.value); resetPage(); }}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 max-w-[180px]"
                  >
                    <option value="">All users</option>
                    {auditUsers.map(u => (
                      <option key={u.user_id} value={u.user_name}>{u.user_name}</option>
                    ))}
                  </select>
                </div>

                {/* Action */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Action</label>
                  <select
                    value={actionFilter}
                    onChange={e => { setActionFilter(e.target.value); resetPage(); }}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {ACTION_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* From */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={e => { setFromDate(e.target.value); resetPage(); }}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* To */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={e => { setToDate(e.target.value); resetPage(); }}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Clear */}
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 transition-colors self-end"
                  >
                    Clear filters
                  </button>
                )}

                {/* Spacer + count + export */}
                <div className="ml-auto flex items-end gap-3">
                  <span className="text-xs text-gray-400 pb-1.5">
                    {loading ? "Loading…" : `${total.toLocaleString()} event${total !== 1 ? "s" : ""}`}
                  </span>
                  <button
                    type="button"
                    onClick={handleExport}
                    disabled={exportLoading || total === 0}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                  >
                    {exportLoading ? <Spinner /> : "↓"} Export CSV
                  </button>
                </div>
              </div>
            </div>

            {/* ── Summary stats bar (shown when project is filtered) ── */}
            {projectFilter && (
              <div className={`rounded-xl border border-gray-100 bg-white px-5 py-3 mb-5 shadow-sm grid grid-cols-4 gap-4 ${statsLoading ? "opacity-60" : ""}`}>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Reviews run</p>
                  <p className="text-xl font-bold text-gray-900">{stats?.total_reviews ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Score overrides</p>
                  <p className="text-xl font-bold text-gray-900">{stats?.total_overrides ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Last activity</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {stats?.last_activity ? fmtDate(stats.last_activity) : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Most active user</p>
                  <p className="text-sm font-semibold text-gray-700 truncate">
                    {stats?.most_active_user ?? "—"}
                  </p>
                </div>
              </div>
            )}

            {/* ── Error ── */}
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                {error}
              </div>
            )}

            {/* ── Table ── */}
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
              {loading && events.length === 0 ? (
                <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-400">
                  <Spinner /> Loading events…
                </div>
              ) : events.length === 0 ? (
                <div className="py-16 text-center text-sm text-gray-400">No audit events found.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-2.5 w-40">Date / Time</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2.5 w-36">User</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2.5 w-36">Action</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2.5">ITP / Entity</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2.5 w-40">Project</th>
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2.5">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {events.map(row => (
                      <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap tabular-nums">
                          {fmtDateTime(row.created_at)}
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-xs font-medium text-gray-800 truncate max-w-[140px]">{row.user_name}</p>
                          {row.user_email && (
                            <p className="text-[10px] text-gray-400 truncate max-w-[140px]">{row.user_email}</p>
                          )}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${ACTION_BADGE[row.action] ?? "bg-gray-100 text-gray-600"}`}>
                            {ACTION_LABEL[row.action] ?? row.action}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-xs text-gray-700 truncate max-w-[220px]">
                            {row.entity_name ?? "—"}
                          </p>
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-xs text-gray-500 truncate max-w-[160px]">
                            {row.project_name ?? "—"}
                          </p>
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-xs text-gray-500 truncate max-w-[240px]">
                            {detailsSummary(row)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-xs text-gray-400">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || loading}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

// ── Export (wraps inner in Suspense for useSearchParams) ───────────────────────

export default function AuditPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 bg-[#F9FAFB] flex items-center justify-center py-24">
          <Spinner />
        </div>
      }
    >
      <AuditPageInner />
    </Suspense>
  );
}
