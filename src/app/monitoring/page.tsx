"use client";

// ─── My Monitoring Page ────────────────────────────────────────────────────────
// Personal project attention tracker and notes diary for the logged-in user.
// Private — each user sees only their own data.

import { useState, useEffect, useCallback, useRef } from "react";
import { Activity, AlertTriangle, ChevronRight, ChevronDown, Trash2, Archive, Clock, CalendarDays, ExternalLink } from "lucide-react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  name: string;
  display_name: string;
  project_number: string | null;
  is_hidden?: boolean;
}

interface AttentionData {
  total_seconds_14d: number;
  total_seconds_30d: number;
  last_visited: string | null;
  session_count_14d: number;
  weekly: Array<{ week_start: string; total_seconds: number }>;
}

interface ProjectNote {
  id: string;
  note_text: string;
  note_date: string;
  month_key: string;
  is_archived: boolean;
  created_at: string;
}

interface NoteMonth {
  month_key: string;
  notes: ProjectNote[];
}

interface ProjectSnapshot {
  procore_project_id: string;
  stage: string | null;
  summary: string | null;
  generated_at: string | null;
  completion_pct: number | null;
  itp_gaps: string[];
}

// ── Status colour helpers ──────────────────────────────────────────────────────

function projectStatus(att: AttentionData | undefined): "green" | "amber" | "red" {
  if (!att || !att.last_visited) return "red";
  const daysSince = (Date.now() - new Date(att.last_visited).getTime()) / 86400_000;
  if (daysSince > 14) return "red";
  if (att.total_seconds_14d >= 300) return "green";
  return "amber";
}

const STATUS_COLORS = {
  green: "#4CAF50",
  amber: "#F59E0B",
  red:   "#EF4444",
};

// ── Formatting helpers ─────────────────────────────────────────────────────────

function fmtDuration(seconds: number): string {
  if (seconds <= 0) return "—";
  if (seconds < 60)    return `${seconds}s`;
  if (seconds < 3600)  return `${Math.round(seconds / 60)}m`;
  return `${(seconds / 3600).toFixed(1)}h`;
}

function fmtRelative(iso: string | null): string {
  if (!iso) return "Never";
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function fmtNoteDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

function fmtMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

function currentMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// ── Weekly bar chart ───────────────────────────────────────────────────────────

function WeeklyBarChart({ weekly }: { weekly: Array<{ week_start: string; total_seconds: number }> }) {
  const BAR_W   = 24;
  const BAR_GAP = 8;
  const CHART_H = 72;
  const CHART_W = weekly.length * (BAR_W + BAR_GAP) - BAR_GAP;
  const maxVal  = Math.max(...weekly.map(w => w.total_seconds), 1);

  return (
    <div style={{ overflowX: "auto" }}>
      <svg width={CHART_W} height={CHART_H + 20} style={{ display: "block" }}>
        {weekly.map((week, i) => {
          const barH = Math.max(2, Math.round((week.total_seconds / maxVal) * CHART_H));
          const x    = i * (BAR_W + BAR_GAP);
          const y    = CHART_H - barH;
          const hasData = week.total_seconds > 0;
          const isLast  = i === weekly.length - 1;
          // Week label: short date
          const label   = new Date(week.week_start).toLocaleDateString("en-AU", { day: "numeric", month: "short" });

          return (
            <g key={week.week_start}>
              <rect
                x={x}
                y={y}
                width={BAR_W}
                height={barH}
                rx={3}
                fill={hasData ? (isLast ? "var(--hp-warm-800, #5C4226)" : "#C4A882") : "#E5E7EB"}
                style={{ transition: "height 0.3s ease" }}
              />
              {/* Tooltip on hover via title */}
              <title>{fmtDuration(week.total_seconds)} · w/c {label}</title>
              {/* X-axis label for current week only */}
              {isLast && (
                <text
                  x={x + BAR_W / 2}
                  y={CHART_H + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#9CA3AF"
                >
                  This wk
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Archive confirmation modal ─────────────────────────────────────────────────

interface ArchiveModalProps {
  monthLabel: string;
  nextMonthLabel: string;
  onCancel: () => void;
  onArchive: (copyForward: boolean) => void;
  loading: boolean;
}

function ArchiveModal({ monthLabel, nextMonthLabel, onCancel, onArchive, loading }: ArchiveModalProps) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: "white", borderRadius: 12, padding: 28, maxWidth: 400, width: "90%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <Archive size={18} color="var(--hp-warm-700, #6B5A42)" />
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--hp-warm-900)" }}>
            Archive {monthLabel}?
          </span>
        </div>
        <p style={{ fontSize: 13, color: "var(--hp-text-muted, #6b7280)", marginBottom: 20 }}>
          This will close {monthLabel} and start a fresh {nextMonthLabel} page.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={() => onArchive(false)}
            disabled={loading}
            style={{
              padding: "9px 16px", borderRadius: 8, border: "1px solid var(--hp-border, #e5e7eb)",
              background: "white", fontSize: 13, fontWeight: 600,
              color: "var(--hp-warm-800)", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            Archive only
          </button>
          <button
            onClick={() => onArchive(true)}
            disabled={loading}
            style={{
              padding: "9px 16px", borderRadius: 8, border: "none",
              background: "var(--hp-warm-800, #5C4226)", fontSize: 13, fontWeight: 600,
              color: "white", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            Archive &amp; copy last note to {nextMonthLabel}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: "9px 16px", borderRadius: 8, border: "none",
              background: "transparent", fontSize: 13,
              color: "var(--hp-text-muted, #6b7280)", cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function MonitoringPage() {
  // Auth / company / projects
  const [companyId,   setCompanyId]   = useState<number | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [projects,    setProjects]    = useState<Project[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [authError,   setAuthError]   = useState(false);

  // Attention data
  const [attention,  setAttention]  = useState<Record<string, AttentionData>>({});

  // Snapshots for insights
  const [snapshots, setSnapshots] = useState<Map<string, ProjectSnapshot>>(new Map());

  // Selected project
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Notes state
  const [noteMonths,     setNoteMonths]     = useState<NoteMonth[]>([]);
  const [notesLoading,   setNotesLoading]   = useState(false);
  const [noteText,       setNoteText]       = useState("");
  const [savingNote,     setSavingNote]     = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const [archiveModal,   setArchiveModal]   = useState(false);
  const [archiving,      setArchiving]      = useState(false);
  const noteTextareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Boot: fetch auth + company + projects ────────────────────────────────────

  useEffect(() => {
    async function boot() {
      setLoading(true);
      try {
        // Auth check
        const authRes = await fetch("/api/auth/me");
        if (!authRes.ok) { setAuthError(true); setLoading(false); return; }
        const authData = await authRes.json() as { authenticated: boolean };
        if (!authData.authenticated) { setAuthError(true); setLoading(false); return; }

        // Companies
        const coRes  = await fetch("/api/procore/companies");
        const coData = await coRes.json() as { companies?: Array<{ id: number; name: string; is_active: boolean }> };
        const cos    = (coData.companies ?? []).filter(c => c.is_active);
        if (cos.length === 0) { setLoading(false); return; }
        const co = cos[0];
        setCompanyId(co.id);
        setCompanyName(co.name);

        // Projects + attention + snapshots in parallel
        const [projRes, attRes, snapRes] = await Promise.all([
          fetch(`/api/dashboard/projects?company_id=${co.id}`),
          fetch(`/api/monitoring/attention?company_id=${co.id}`),
          fetch(`/api/insights/snapshots?company_id=${co.id}`),
        ]);

        const projData = await projRes.json() as { projects?: Project[] };
        setProjects((projData.projects ?? []).filter(p => !p.is_hidden));

        const attData = await attRes.json() as { attention?: Record<string, AttentionData> };
        setAttention(attData.attention ?? {});

        const snapData = await snapRes.json() as { snapshots?: ProjectSnapshot[] };
        const snapMap = new Map<string, ProjectSnapshot>();
        for (const s of snapData.snapshots ?? []) {
          snapMap.set(String(s.procore_project_id), s);
        }
        setSnapshots(snapMap);
      } catch (err) {
        console.error("[monitoring] boot error:", err);
      } finally {
        setLoading(false);
      }
    }

    boot();
  }, []);

  // ── Load notes for selected project ─────────────────────────────────────────

  const loadNotes = useCallback(async (project: Project, cid: number) => {
    setNotesLoading(true);
    setNoteMonths([]);
    setNoteText("");
    try {
      const res  = await fetch(`/api/monitoring/notes?project_id=${project.id}&company_id=${cid}`);
      const data = await res.json() as { months?: NoteMonth[] };
      setNoteMonths(data.months ?? []);
    } catch (err) {
      console.error("[monitoring] loadNotes:", err);
    } finally {
      setNotesLoading(false);
    }
  }, []);

  // ── Select project ───────────────────────────────────────────────────────────

  function selectProject(p: Project) {
    setSelectedProject(p);
    if (companyId) loadNotes(p, companyId);
  }

  // ── Save note ────────────────────────────────────────────────────────────────

  async function saveNote() {
    if (!noteText.trim() || !selectedProject || !companyId) return;
    setSavingNote(true);
    try {
      const res = await fetch("/api/monitoring/notes", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          project_id:   String(selectedProject.id),
          project_name: selectedProject.display_name || selectedProject.name,
          company_id:   String(companyId),
          note_text:    noteText.trim(),
          month_key:    currentMonthKey(),
        }),
      });
      if (!res.ok) return;
      const data = await res.json() as { note?: ProjectNote };
      if (data.note) {
        setNoteMonths(prev => {
          const mk  = currentMonthKey();
          const idx = prev.findIndex(m => m.month_key === mk);
          if (idx >= 0) {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], notes: [data.note!, ...updated[idx].notes] };
            return updated;
          }
          return [{ month_key: mk, notes: [data.note!] }, ...prev];
        });
        setNoteText("");
      }
    } catch (err) {
      console.error("[monitoring] saveNote:", err);
    } finally {
      setSavingNote(false);
    }
  }

  // ── Delete note ──────────────────────────────────────────────────────────────

  async function deleteNote(noteId: string) {
    setDeletingNoteId(noteId);
    try {
      await fetch(`/api/monitoring/notes/${noteId}`, { method: "DELETE" });
      setNoteMonths(prev =>
        prev
          .map(m => ({ ...m, notes: m.notes.filter(n => n.id !== noteId) }))
          .filter(m => m.notes.length > 0)
      );
    } catch (err) {
      console.error("[monitoring] deleteNote:", err);
    } finally {
      setDeletingNoteId(null);
    }
  }

  // ── Archive month ────────────────────────────────────────────────────────────

  async function handleArchive(copyForward: boolean) {
    if (!selectedProject || !companyId) return;
    setArchiving(true);
    try {
      const mk  = currentMonthKey();
      const res = await fetch("/api/monitoring/notes/archive", {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          project_id: String(selectedProject.id),
          company_id: String(companyId),
          month_key:  mk,
        }),
      });
      const data = await res.json() as { ok?: boolean; last_note_text?: string | null };

      if (data.ok) {
        // Mark current month as archived in local state
        setNoteMonths(prev =>
          prev.map(m =>
            m.month_key === mk
              ? { ...m, notes: m.notes.map(n => ({ ...n, is_archived: true })) }
              : m
          )
        );

        // Copy forward if requested
        if (copyForward && data.last_note_text) {
          const newMk  = currentMonthKey(); // same month — archiving doesn't change the key
          const newRes = await fetch("/api/monitoring/notes", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({
              project_id:   String(selectedProject.id),
              project_name: selectedProject.display_name || selectedProject.name,
              company_id:   String(companyId),
              note_text:    data.last_note_text,
              month_key:    newMk,
            }),
          });
          const newData = await newRes.json() as { note?: ProjectNote };
          if (newData.note) {
            setNoteMonths(prev => {
              const idx = prev.findIndex(m => m.month_key === newMk && !m.notes.some(n => n.is_archived));
              if (idx >= 0) {
                const updated = [...prev];
                updated[idx]  = { ...updated[idx], notes: [newData.note!, ...updated[idx].notes] };
                return updated;
              }
              return [{ month_key: newMk, notes: [newData.note!] }, ...prev];
            });
          }
        }
      }
    } catch (err) {
      console.error("[monitoring] archive:", err);
    } finally {
      setArchiving(false);
      setArchiveModal(false);
    }
  }

  // ── Derived values ───────────────────────────────────────────────────────────

  const needsAttention = projects.filter(p => {
    const s = projectStatus(attention[String(p.id)]);
    return s === "red" || s === "amber";
  }).length;

  const mk     = currentMonthKey();
  const [selYear, selMonth] = mk.split("-");
  const nextMk = (() => {
    const d = new Date(Number(selYear), Number(selMonth), 1); // first day of next month
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  })();

  const currentMonthNotes = noteMonths.find(m => m.month_key === mk && !m.notes.every(n => n.is_archived));
  const archivedMonths    = noteMonths.filter(m => m.month_key !== mk || m.notes.every(n => n.is_archived));

  // Insight for selected project
  const snap = selectedProject ? snapshots.get(String(selectedProject.id)) : null;
  let insightText: string | null = null;
  if (snap?.summary) {
    try {
      const parsed = JSON.parse(snap.summary) as { stage?: string };
      insightText  = parsed.stage ?? snap.summary.slice(0, 300);
    } catch {
      insightText = snap.summary.slice(0, 300);
    }
  }

  // Attention for selected project
  const selAtt    = selectedProject ? attention[String(selectedProject.id)] : undefined;
  const selStatus = projectStatus(selAtt);

  const monthlySeconds = selAtt
    ? (selAtt.weekly ?? []).reduce((s, w) => {
        const wDate = new Date(w.week_start);
        const now   = new Date();
        if (wDate.getMonth() === now.getMonth() && wDate.getFullYear() === now.getFullYear()) {
          return s + w.total_seconds;
        }
        return s;
      }, 0)
    : 0;

  // ── Render: not authenticated ─────────────────────────────────────────────────

  if (authError) {
    return (
      <div style={{ padding: 48, textAlign: "center" }}>
        <p style={{ color: "var(--hp-text-muted)" }}>
          You need to{" "}
          <a href="/api/auth/login" style={{ color: "var(--hp-warm-800)", textDecoration: "underline" }}>
            connect to Procore
          </a>{" "}
          to use My Monitoring.
        </p>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        display:  "flex",
        height:   "calc(100vh - 56px)", // below GlobalNav
        overflow: "hidden",
        background: "var(--hp-bg, #FAF7F4)",
      }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        style={{
          width: 280,
          minWidth: 280,
          borderRight: "1px solid var(--hp-border, #e5e7eb)",
          overflowY: "auto",
          background: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Activity size={16} color="var(--hp-warm-700, #6B5A42)" />
            <span style={{ fontWeight: 700, fontSize: 14, color: "var(--hp-warm-900)" }}>
              My Monitoring
            </span>
          </div>
          {companyName && (
            <p style={{ fontSize: 11, color: "var(--hp-text-muted)", marginBottom: 10 }}>
              {companyName}
            </p>
          )}

          {/* Summary banner */}
          {!loading && projects.length > 0 && (
            <div
              style={{
                padding: "7px 10px",
                borderRadius: 8,
                marginBottom: 12,
                background: needsAttention > 0 ? "#FEF3C7" : "#F0FDF4",
                border: `1px solid ${needsAttention > 0 ? "#FDE68A" : "#BBF7D0"}`,
                fontSize: 12,
                color: needsAttention > 0 ? "#92400E" : "#166534",
                fontWeight: 600,
              }}
            >
              {needsAttention > 0
                ? `${needsAttention} of ${projects.length} projects need attention`
                : `All ${projects.length} projects on track`}
            </div>
          )}
        </div>

        {/* Project list */}
        {loading ? (
          <div style={{ padding: 16, color: "var(--hp-text-muted)", fontSize: 13 }}>Loading…</div>
        ) : projects.length === 0 ? (
          <div style={{ padding: 16, color: "var(--hp-text-muted)", fontSize: 13 }}>No projects found.</div>
        ) : (
          <div style={{ flex: 1 }}>
            {projects.map(p => {
              const att    = attention[String(p.id)];
              const status = projectStatus(att);
              const isSelected = selectedProject?.id === p.id;

              // First line of most recent note for this project
              const allNotes = isSelected
                ? noteMonths.flatMap(m => m.notes)
                : [];
              const recentNote = allNotes.length > 0
                ? allNotes.sort((a, b) => b.note_date.localeCompare(a.note_date))[0]?.note_text ?? null
                : null;

              return (
                <button
                  key={p.id}
                  onClick={() => selectProject(p)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 16px 10px 12px",
                    background: isSelected ? "var(--hp-warm-50, #FAF7F4)" : "transparent",
                    borderBottom: "1px solid var(--hp-border, #f3f4f6)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "stretch",
                    gap: 10,
                    border: "none",
                    borderLeft: `3px solid ${STATUS_COLORS[status]}`,
                    borderBottomColor: "var(--hp-border, #f3f4f6)",
                    borderBottomWidth: 1,
                    borderBottomStyle: "solid",
                  }}
                >
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 12,
                        color: isSelected ? "var(--hp-warm-900)" : "#374151",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginBottom: 2,
                      }}
                    >
                      {p.display_name || p.name}
                    </div>
                    <div style={{ display: "flex", gap: 10, fontSize: 10, color: "var(--hp-text-muted)" }}>
                      <span>
                        <CalendarDays size={9} style={{ display: "inline", marginRight: 2, verticalAlign: "middle" }} />
                        {fmtRelative(att?.last_visited ?? null)}
                      </span>
                      {att && att.total_seconds_30d > 0 && (
                        <span>
                          <Clock size={9} style={{ display: "inline", marginRight: 2, verticalAlign: "middle" }} />
                          {fmtDuration(att.total_seconds_30d)} / 30d
                        </span>
                      )}
                    </div>
                    {isSelected && recentNote && (
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--hp-text-muted)",
                          fontStyle: "italic",
                          marginTop: 3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 200,
                        }}
                      >
                        {recentNote.slice(0, 60)}{recentNote.length > 60 ? "…" : ""}
                      </div>
                    )}
                  </div>
                  <ChevronRight size={12} color="#D1D5DB" style={{ alignSelf: "center", flexShrink: 0 }} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
        {!selectedProject ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "var(--hp-text-muted)",
              gap: 12,
            }}
          >
            <Activity size={40} color="#D1D5DB" />
            <p style={{ fontSize: 14 }}>Select a project to view its monitoring data.</p>
          </div>
        ) : (
          <div style={{ maxWidth: 720 }}>

            {/* Project title */}
            <div style={{ marginBottom: 24 }}>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--hp-warm-900)",
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                {selectedProject.display_name || selectedProject.name}
              </h1>
              {selectedProject.project_number && (
                <span style={{ fontSize: 12, color: "var(--hp-text-muted)" }}>
                  Project {selectedProject.project_number}
                </span>
              )}
            </div>

            {/* ── SECTION 1: Attention Overview ── */}
            <section style={{ marginBottom: 28 }}>
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid var(--hp-border, #e5e7eb)",
                  padding: "18px 20px",
                }}
              >
                <h2
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "var(--hp-text-muted)",
                    margin: "0 0 14px 0",
                  }}
                >
                  Attention Overview
                </h2>

                {/* Red alert banner */}
                {selStatus === "red" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: "#FEF3C7",
                      border: "1px solid #FDE68A",
                      marginBottom: 16,
                      fontSize: 12,
                      color: "#92400E",
                      fontWeight: 600,
                    }}
                  >
                    <AlertTriangle size={14} color="#D97706" />
                    This project hasn&apos;t had meaningful attention in 14+ days
                  </div>
                )}

                {/* Bar chart */}
                {selAtt?.weekly && selAtt.weekly.length > 0 ? (
                  <>
                    <WeeklyBarChart weekly={selAtt.weekly} />
                    <div
                      style={{
                        display: "flex",
                        gap: 20,
                        marginTop: 12,
                        fontSize: 12,
                        color: "var(--hp-text-muted)",
                      }}
                    >
                      <span>
                        <strong style={{ color: "#374151" }}>
                          {fmtDuration(monthlySeconds)}
                        </strong>{" "}
                        this month
                      </span>
                      <span>
                        Last visited:{" "}
                        <strong style={{ color: "#374151" }}>
                          {fmtRelative(selAtt.last_visited)}
                        </strong>
                      </span>
                      <span>
                        {selAtt.session_count_14d} session{selAtt.session_count_14d !== 1 ? "s" : ""} this fortnight
                      </span>
                    </div>
                  </>
                ) : (
                  <p style={{ fontSize: 13, color: "var(--hp-text-muted)", margin: 0 }}>
                    No attention data yet — open a project on the Dashboard to start tracking.
                  </p>
                )}
              </div>
            </section>

            {/* ── SECTION 2: Project Insight ── */}
            <section style={{ marginBottom: 28 }}>
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid var(--hp-border, #e5e7eb)",
                  padding: "18px 20px",
                }}
              >
                <h2
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "var(--hp-text-muted)",
                    margin: "0 0 12px 0",
                  }}
                >
                  Project Insight
                </h2>

                {snap ? (
                  <div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#374151",
                        lineHeight: 1.6,
                        margin: "0 0 10px 0",
                      }}
                    >
                      {insightText
                        ? (insightText.length > 300 ? insightText.slice(0, 297) + "…" : insightText)
                        : "Insight generated — no stage summary available."}
                    </p>
                    {snap.generated_at && (
                      <p style={{ fontSize: 11, color: "var(--hp-text-muted)", margin: "0 0 10px 0" }}>
                        Generated{" "}
                        {new Date(snap.generated_at).toLocaleDateString("en-AU", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </p>
                    )}
                    <Link
                      href="/dashboard"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                        color: "var(--hp-warm-700, #6B5A42)",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      View full insight
                      <ExternalLink size={11} />
                    </Link>
                  </div>
                ) : (
                  <p style={{ fontSize: 13, color: "var(--hp-text-muted)", margin: 0 }}>
                    No insight generated yet for this project. Generate one from the{" "}
                    <Link href="/dashboard" style={{ color: "var(--hp-warm-700)", textDecoration: "underline" }}>
                      Insights tab
                    </Link>
                    .
                  </p>
                )}
              </div>
            </section>

            {/* ── SECTION 3: Project Notes ── */}
            <section>
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid var(--hp-border, #e5e7eb)",
                  padding: "18px 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: "var(--hp-text-muted)",
                      margin: 0,
                    }}
                  >
                    Project Notes
                  </h2>
                  <button
                    onClick={() => setArchiveModal(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      color: "var(--hp-text-muted)",
                      background: "transparent",
                      border: "1px solid var(--hp-border)",
                      borderRadius: 6,
                      padding: "3px 8px",
                      cursor: "pointer",
                    }}
                  >
                    <Archive size={10} />
                    Archive {fmtMonthLabel(mk)}
                  </button>
                </div>

                {notesLoading ? (
                  <p style={{ fontSize: 13, color: "var(--hp-text-muted)" }}>Loading notes…</p>
                ) : (
                  <>
                    {/* Current month */}
                    <div style={{ marginBottom: 20 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "var(--hp-warm-900)",
                          marginBottom: 12,
                          paddingBottom: 8,
                          borderBottom: "1px solid var(--hp-border)",
                        }}
                      >
                        {fmtMonthLabel(mk)}
                      </div>

                      {/* Notes list for current month */}
                      {(currentMonthNotes?.notes ?? []).length === 0 ? (
                        <p
                          style={{
                            fontSize: 13,
                            color: "var(--hp-text-muted)",
                            fontStyle: "italic",
                            marginBottom: 16,
                          }}
                        >
                          No notes yet this month.
                        </p>
                      ) : (
                        (currentMonthNotes?.notes ?? []).map(note => (
                          <NoteRow
                            key={note.id}
                            note={note}
                            onDelete={deleteNote}
                            deleting={deletingNoteId === note.id}
                            readOnly={false}
                          />
                        ))
                      )}

                      {/* Add note */}
                      <div style={{ marginTop: 12 }}>
                        <textarea
                          ref={noteTextareaRef}
                          value={noteText}
                          onChange={e => setNoteText(e.target.value)}
                          placeholder="Add a note about this project…"
                          rows={3}
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            fontSize: 13,
                            borderRadius: 8,
                            border: "1px solid var(--hp-border, #e5e7eb)",
                            resize: "vertical",
                            outline: "none",
                            color: "#374151",
                            fontFamily: "inherit",
                            boxSizing: "border-box",
                            transition: "border-color 0.15s",
                          }}
                          onFocus={e => { e.target.style.borderColor = "var(--hp-warm-700, #6B5A42)"; }}
                          onBlur={e => { e.target.style.borderColor = "var(--hp-border, #e5e7eb)"; }}
                          onKeyDown={e => {
                            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) saveNote();
                          }}
                        />
                        <button
                          onClick={saveNote}
                          disabled={savingNote || !noteText.trim()}
                          style={{
                            marginTop: 8,
                            padding: "8px 16px",
                            borderRadius: 8,
                            border: "none",
                            background: "var(--hp-warm-800, #5C4226)",
                            color: "white",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: savingNote || !noteText.trim() ? "not-allowed" : "pointer",
                            opacity: savingNote || !noteText.trim() ? 0.5 : 1,
                            transition: "opacity 0.15s",
                          }}
                        >
                          {savingNote ? "Saving…" : "Save note"}
                        </button>
                        <span
                          style={{
                            fontSize: 10,
                            color: "var(--hp-text-muted)",
                            marginLeft: 8,
                          }}
                        >
                          ⌘↵ to save
                        </span>
                      </div>
                    </div>

                    {/* Archived months */}
                    {archivedMonths.map(month => (
                      <ArchivedMonthSection
                        key={month.month_key}
                        month={month}
                        expanded={expandedMonths.has(month.month_key)}
                        onToggle={() =>
                          setExpandedMonths(prev => {
                            const next = new Set(prev);
                            if (next.has(month.month_key)) next.delete(month.month_key);
                            else next.add(month.month_key);
                            return next;
                          })
                        }
                      />
                    ))}
                  </>
                )}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* ── Archive modal ── */}
      {archiveModal && (
        <ArchiveModal
          monthLabel={fmtMonthLabel(mk)}
          nextMonthLabel={fmtMonthLabel(nextMk)}
          onCancel={() => setArchiveModal(false)}
          onArchive={handleArchive}
          loading={archiving}
        />
      )}
    </div>
  );
}

// ── NoteRow component ──────────────────────────────────────────────────────────

function NoteRow({
  note,
  onDelete,
  deleting,
  readOnly,
}: {
  note: ProjectNote;
  onDelete: (id: string) => void;
  deleting: boolean;
  readOnly: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "10px 0",
        borderBottom: "1px solid var(--hp-border, #f3f4f6)",
        position: "relative",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "var(--hp-text-muted)",
          marginBottom: 4,
          fontWeight: 600,
        }}
      >
        {fmtNoteDate(note.note_date)}
        {readOnly && (
          <span
            style={{
              marginLeft: 8,
              padding: "1px 5px",
              borderRadius: 4,
              background: "#F3F4F6",
              color: "#9CA3AF",
              fontWeight: 400,
            }}
          >
            read-only
          </span>
        )}
      </div>
      <p
        style={{
          fontSize: 13,
          color: "#374151",
          margin: 0,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          paddingRight: readOnly ? 0 : 28,
        }}
      >
        {note.note_text}
      </p>
      {!readOnly && hovered && (
        <button
          onClick={() => onDelete(note.id)}
          disabled={deleting}
          title="Delete note"
          style={{
            position: "absolute",
            top: 10,
            right: 0,
            background: "transparent",
            border: "none",
            cursor: deleting ? "not-allowed" : "pointer",
            padding: 2,
            borderRadius: 4,
            color: deleting ? "#D1D5DB" : "#9CA3AF",
          }}
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}

// ── ArchivedMonthSection ───────────────────────────────────────────────────────

function ArchivedMonthSection({
  month,
  expanded,
  onToggle,
}: {
  month: NoteMonth;
  expanded: boolean;
  onToggle: () => void;
}) {
  const noOp = () => {};

  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          width: "100%",
          textAlign: "left",
          background: "transparent",
          border: "none",
          borderTop: "1px solid var(--hp-border, #f3f4f6)",
          padding: "10px 0",
          cursor: "pointer",
          color: "var(--hp-text-muted)",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        {fmtMonthLabel(month.month_key)}{" "}
        <span style={{ fontWeight: 400, color: "#9CA3AF" }}>
          ({month.notes.length} note{month.notes.length !== 1 ? "s" : ""})
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 10,
            padding: "1px 6px",
            borderRadius: 4,
            background: "#F3F4F6",
            color: "#9CA3AF",
          }}
        >
          Archived
        </span>
      </button>

      {expanded && (
        <div style={{ paddingBottom: 8 }}>
          {month.notes.map(note => (
            <NoteRow
              key={note.id}
              note={note}
              onDelete={noOp}
              deleting={false}
              readOnly={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
