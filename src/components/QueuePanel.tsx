"use client";

// ─── QueuePanel ────────────────────────────────────────────────────────────────
// Displays all background review jobs across projects.
// Shown in the "Queue" top-level tab of the dashboard.

import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface QueueItem {
  inspection_id: number;
  status:        "queued" | "processing" | "done" | "failed";
  error?:        string;
}

export interface QueueJob {
  job_id:       string;
  project_id:   string;
  project_name: string;
  company_id:   string;  // used by dashboard polling; not rendered
  status:       "running" | "completed" | "failed";
  total:        number;
  completed:    number;
  failed:       number;
  items:        QueueItem[];
  started_at:   string;
}

interface QueuePanelProps {
  jobs:      QueueJob[];
  onDismiss: (job_id: string) => void;
}

// ── Status pill styles ─────────────────────────────────────────────────────────

function pillStyle(status: QueueJob["status"]): React.CSSProperties {
  if (status === "running")   return { backgroundColor: "#fffbeb", color: "#92400e", border: "1px solid #fde68a" };
  if (status === "completed") return { backgroundColor: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" };
  return                             { backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" };
}

function pillLabel(status: QueueJob["status"]): string {
  if (status === "running")   return "Running";
  if (status === "completed") return "Done";
  return "Failed";
}

// ── Item status icon ───────────────────────────────────────────────────────────

function ItemIcon({ status }: { status: QueueItem["status"] }) {
  if (status === "done")       return <span style={{ color: "var(--hp-compliant, #16a34a)", fontWeight: 700 }}>✓</span>;
  if (status === "failed")     return <span style={{ color: "var(--hp-critical, #dc2626)", fontWeight: 700 }}>✗</span>;
  if (status === "processing") return <span className="animate-pulse" style={{ color: "var(--hp-significant, #d97706)" }}>●</span>;
  return                              <span style={{ color: "var(--hp-text-muted)" }}>○</span>;
}

// ── QueuePanel ─────────────────────────────────────────────────────────────────

export default function QueuePanel({ jobs, onDismiss }: QueuePanelProps) {
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());

  function toggleExpand(job_id: string) {
    setExpandedJobs(prev => {
      const next = new Set(prev);
      if (next.has(job_id)) next.delete(job_id);
      else next.add(job_id);
      return next;
    });
  }

  function handleClearCompleted() {
    jobs
      .filter(j => j.status === "completed" || j.status === "failed")
      .forEach(j => onDismiss(j.job_id));
  }

  const hasFinishedJobs = jobs.some(j => j.status !== "running");

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ backgroundColor: "var(--hp-bg)", padding: "24px 28px" }}
    >
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--hp-text-primary)", margin: 0 }}>
          Background Reviews
        </h2>
        {hasFinishedJobs && (
          <button
            type="button"
            onClick={handleClearCompleted}
            style={{
              fontSize: 12, padding: "5px 12px", borderRadius: 6,
              border: "1px solid var(--hp-border)", backgroundColor: "var(--hp-surface)",
              color: "var(--hp-text-secondary)", cursor: "pointer",
            }}
          >
            Clear completed
          </button>
        )}
      </div>

      {/* ── Empty state ── */}
      {jobs.length === 0 && (
        <div style={{ textAlign: "center", paddingTop: 64 }}>
          <p style={{ fontSize: 14, color: "var(--hp-text-muted)", margin: "0 0 6px 0" }}>
            No background reviews running
          </p>
          <p style={{ fontSize: 13, color: "var(--hp-text-muted)", margin: 0 }}>
            Select ITPs from any project and click &lsquo;Run in Background&rsquo; to start
          </p>
        </div>
      )}

      {/* ── Job cards ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {jobs.map(job => {
          const pct        = job.total > 0 ? Math.round((job.completed / job.total) * 100) : 0;
          const isExpanded = expandedJobs.has(job.job_id);
          const canDismiss = job.status !== "running";

          return (
            <div
              key={job.job_id}
              style={{
                backgroundColor: "var(--hp-surface)",
                border: "1px solid var(--hp-border)",
                borderRadius: 10,
                padding: "14px 16px",
                position: "relative",
              }}
            >
              {/* Dismiss × */}
              {canDismiss && (
                <button
                  type="button"
                  onClick={() => onDismiss(job.job_id)}
                  style={{
                    position: "absolute", top: 10, right: 10,
                    fontSize: 15, color: "var(--hp-text-muted)",
                    background: "none", border: "none", cursor: "pointer",
                    lineHeight: 1, padding: "2px 4px",
                  }}
                  title="Dismiss"
                >
                  ×
                </button>
              )}

              {/* Project name + status pill */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, paddingRight: canDismiss ? 24 : 0 }}>
                <span style={{
                  fontSize: 13, fontWeight: 600, color: "var(--hp-text-primary)",
                  flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {job.project_name}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, flexShrink: 0,
                  ...pillStyle(job.status),
                }}>
                  {pillLabel(job.status)}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: 4, borderRadius: 2, backgroundColor: "var(--hp-border)", marginBottom: 6, overflow: "hidden" }}>
                {job.total > 0 && (
                  <div style={{
                    height: "100%", width: `${pct}%`,
                    backgroundColor: "var(--hp-sage-400, #5f8f6e)",
                    borderRadius: 2, transition: "width 0.4s ease",
                  }} />
                )}
              </div>

              {/* Progress text */}
              <p style={{ fontSize: 12, color: "var(--hp-text-muted)", margin: "0 0 8px 0" }}>
                {job.completed} of {job.total} reviewed
                {job.failed > 0 && ` · ${job.failed} failed`}
              </p>

              {/* Expandable item list */}
              {job.items.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => toggleExpand(job.job_id)}
                    style={{
                      fontSize: 11, color: "var(--hp-text-secondary)",
                      background: "none", border: "none", cursor: "pointer",
                      padding: "2px 0", display: "flex", alignItems: "center", gap: 4,
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 150ms", fontSize: 9,
                    }}>▶</span>
                    {isExpanded ? "Hide items" : `Show ${job.items.length} items`}
                  </button>

                  {isExpanded && (
                    <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
                      {job.items.map(item => (
                        <div key={item.inspection_id} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12 }}>
                          <span style={{ flexShrink: 0, width: 14, textAlign: "center", lineHeight: "18px" }}>
                            <ItemIcon status={item.status} />
                          </span>
                          <div style={{ flex: 1 }}>
                            <span style={{ color: "var(--hp-text-secondary)" }}>ITP #{item.inspection_id}</span>
                            {item.status === "failed" && item.error && (
                              <span style={{ color: "var(--hp-critical, #dc2626)", marginLeft: 6, fontSize: 11 }}>
                                — {item.error}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Started time */}
              <p style={{ fontSize: 11, color: "var(--hp-text-muted)", margin: "8px 0 0 0" }}>
                Started {new Date(job.started_at).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
