"use client";

// ─── Audit Log Viewer ─────────────────────────────────────────────────────────
// Displays a filterable, paginated list of audit events for the selected company.

import { useState, useEffect, useCallback } from "react";
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

// ── Helpers ────────────────────────────────────────────────────────────────────

interface Company { id: number; name: string }

function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
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

// ── Main page ──────────────────────────────────────────────────────────────────

export default function AuditPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [companies, setCompanies]         = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const [events, setEvents]         = useState<AuditLogRow[]>([]);
  const [total, setTotal]           = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  // Filters
  const [actionFilter, setActionFilter] = useState("");
  const [fromDate, setFromDate]         = useState("");
  const [toDate, setToDate]             = useState("");
  const [page, setPage]                 = useState(1);

  const LIMIT = 50;

  // ── Auth ──────────────────────────────────────────────────────────────────

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

  // ── Fetch events ──────────────────────────────────────────────────────────

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
      if (actionFilter) params.set("action", actionFilter);
      if (fromDate)     params.set("from",   fromDate);
      if (toDate)       params.set("to",     toDate);

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
  }, [selectedCompany, page, actionFilter, fromDate, toDate]);

  useEffect(() => { void fetchEvents(); }, [fetchEvents]);

  // Reset to page 1 when filters change
  function applyFilter() { setPage(1); }

  // ── Not authenticated ─────────────────────────────────────────────────────

  if (authenticated === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-gray-600">Connect to Procore to view the audit log.</p>
        <a href="/api/auth/login" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          Connect to Procore
        </a>
        <Link href="/" className="text-xs text-gray-400 hover:underline">← Back</Link>
      </div>
    );
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // ── Page ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen flex-col bg-gray-50 overflow-hidden">

      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to dashboard
          </Link>
          <span className="text-gray-200">|</span>
          <h1 className="text-sm font-bold text-gray-900">
            <span className="text-yellow-400">Fleek Constructions</span>
            <span className="ml-2 font-normal text-gray-500">Audit Log</span>
          </h1>
        </div>
        {companies.length > 1 && (
          <select
            value={selectedCompany?.id ?? ""}
            onChange={e => {
              const c = companies.find(x => x.id === Number(e.target.value));
              if (c) { setSelectedCompany(c); setPage(1); }
            }}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">— Select company —</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        )}
        {companies.length === 1 && selectedCompany && (
          <span className="text-xs text-gray-500">{selectedCompany.name}</span>
        )}
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {!selectedCompany ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Select a company to view the audit log.
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-6">

            {/* Filters */}
            <div className="flex flex-wrap items-end gap-3 mb-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Action</label>
                <select
                  value={actionFilter}
                  onChange={e => { setActionFilter(e.target.value); applyFilter(); }}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {ACTION_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={e => { setFromDate(e.target.value); applyFilter(); }}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={e => { setToDate(e.target.value); applyFilter(); }}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {(actionFilter || fromDate || toDate) && (
                <button
                  type="button"
                  onClick={() => { setActionFilter(""); setFromDate(""); setToDate(""); applyFilter(); }}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Clear filters
                </button>
              )}
              <div className="ml-auto text-xs text-gray-400">
                {loading ? "Loading…" : `${total.toLocaleString()} event${total !== 1 ? "s" : ""}`}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                {error}
              </div>
            )}

            {/* Table */}
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
                      <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2.5 w-40">Action</th>
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

            {/* Pagination */}
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

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
