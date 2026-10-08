"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { RefreshCw, AlertTriangle, CheckCircle, Clock, ChevronDown, ChevronRight, ArrowRight, Shield, FileText, Wrench, Target } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ActivityItem {
  item: string;
  category: "itps" | "contracts" | "site" | "compliance";
}

interface Risk {
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
}

interface ContractIntelligence {
  total_subcontracts: number;
  active_trades: number;
  not_started: number;
  observations: string[];
}

interface MissingItp {
  itp: string;
  name: string;
  reason: string;
}

interface RecommendedAction {
  action: string;
  priority: "high" | "medium" | "low";
  category: "itps" | "contracts" | "compliance" | "planning";
}

interface ComingUpItem {
  item: string;
  timeframe: string;
}

interface ProjectDigest {
  executive_summary: string;
  project_stage: string;
  completion_pct: number;
  contract_value: number | null;
  activity_this_week: ActivityItem[];
  risks: Risk[];
  contract_intelligence: ContractIntelligence;
  missing_itps: MissingItp[];
  recommended_actions: RecommendedAction[];
  coming_up: ComingUpItem[];
  generated_at: string;
  cached: boolean;
  procore_errors?: string[];
}

interface DashboardProject {
  id: number;
  name: string;
  display_name: string;
  project_number: string | null;
  is_hidden?: boolean;
}

interface Props {
  companyId: number | null;
  projects: DashboardProject[];
  projectsLoading: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtValue(n: number): string {
  return n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${Math.round(n / 1_000)}k`;
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleString("en-AU", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

const categoryIcon = (cat: string) => {
  switch (cat) {
    case "itps": return <FileText className="h-3.5 w-3.5" />;
    case "contracts": return <Wrench className="h-3.5 w-3.5" />;
    case "compliance": return <Shield className="h-3.5 w-3.5" />;
    case "planning": return <Target className="h-3.5 w-3.5" />;
    case "site": return <Wrench className="h-3.5 w-3.5" />;
    default: return null;
  }
};

const severityStyles = (severity: string) => {
  switch (severity) {
    case "high":
      return { bg: "var(--hp-critical-bg, #fef2f2)", border: "var(--hp-critical, #dc2626)", text: "var(--hp-critical, #dc2626)" };
    case "medium":
      return { bg: "var(--hp-significant-bg, #fffbeb)", border: "var(--hp-significant, #d97706)", text: "var(--hp-significant, #d97706)" };
    case "low":
      return { bg: "var(--hp-surface, #f9fafb)", border: "var(--hp-border, #e5e7eb)", text: "var(--hp-text-secondary, #6b7280)" };
    default:
      return { bg: "#f9fafb", border: "#e5e7eb", text: "#6b7280" };
  }
};

const priorityBadge = (priority: string) => {
  const colors = severityStyles(priority);
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const,
      padding: "2px 6px", borderRadius: 4,
      backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}`,
    }}>
      {priority}
    </span>
  );
};

// ── Collapsible Section ───────────────────────────────────────────────────────

function Section({ title, count, defaultOpen, children }: {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  return (
    <div style={{ marginBottom: 16 }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 6, width: "100%",
          background: "none", border: "none", cursor: "pointer", padding: "6px 0",
          fontSize: 14, fontWeight: 600, color: "var(--hp-text, #1f2937)",
        }}
      >
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        {title}
        {count != null && count > 0 && (
          <span style={{
            fontSize: 11, fontWeight: 500, color: "var(--hp-text-secondary)",
            backgroundColor: "var(--hp-warm-100, #f5f0eb)", padding: "1px 8px", borderRadius: 10,
          }}>
            {count}
          </span>
        )}
      </button>
      {open && <div style={{ paddingLeft: 4, paddingTop: 4 }}>{children}</div>}
    </div>
  );
}

// ── Digest Card ───────────────────────────────────────────────────────────────

function DigestCard({ project, digest, loading, error, onGenerate }: {
  project: DashboardProject;
  digest: ProjectDigest | null;
  loading: boolean;
  error: string | null;
  onGenerate: () => void;
}) {
  const hasHighRisks = digest?.risks.some(r => r.severity === "high") ?? false;

  return (
    <div style={{
      border: `1px solid ${hasHighRisks ? "var(--hp-critical, #dc2626)" : "var(--hp-border, #e5e7eb)"}`,
      borderRadius: 12, backgroundColor: "var(--hp-surface, #ffffff)",
      borderLeft: `4px solid ${hasHighRisks ? "var(--hp-critical, #dc2626)" : digest ? "var(--hp-compliant, #16a34a)" : "var(--hp-border, #d1d5db)"}`,
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px 12px",
        borderBottom: digest ? "1px solid var(--hp-border, #e5e7eb)" : "none",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--hp-text, #1f2937)", margin: 0 }}>
            {project.display_name || project.name}
          </h3>
          {digest && (
            <p style={{ fontSize: 13, color: "var(--hp-text-secondary, #6b7280)", marginTop: 4 }}>
              {digest.project_stage}
              {digest.completion_pct > 0 && (
                <span style={{ marginLeft: 8, fontWeight: 500 }}>
                  {digest.completion_pct}% complete
                </span>
              )}
              {digest.contract_value && (
                <span style={{ marginLeft: 8 }}>
                  • {fmtValue(digest.contract_value)}
                </span>
              )}
            </p>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {digest?.generated_at && (
            <span style={{ fontSize: 11, color: "var(--hp-text-secondary, #9ca3af)" }}>
              {digest.cached ? "Cached" : "Fresh"} • {fmtTime(digest.generated_at)}
            </span>
          )}
          <button
            type="button"
            onClick={onGenerate}
            disabled={loading}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500,
              border: "1px solid var(--hp-border, #d1d5db)", cursor: loading ? "not-allowed" : "pointer",
              backgroundColor: "var(--hp-surface, #ffffff)", color: "var(--hp-text, #1f2937)",
              opacity: loading ? 0.6 : 1,
            }}
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Generating…" : digest ? "Refresh" : "Generate"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: "12px 20px", backgroundColor: "var(--hp-critical-bg, #fef2f2)" }}>
          <p style={{ fontSize: 12, color: "var(--hp-critical, #dc2626)", margin: 0 }}>{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading && !digest && (
        <div style={{ padding: "32px 20px", textAlign: "center" }}>
          <RefreshCw className="h-5 w-5 animate-spin mx-auto" style={{ color: "var(--hp-text-secondary, #9ca3af)" }} />
          <p style={{ fontSize: 13, color: "var(--hp-text-secondary, #9ca3af)", marginTop: 8 }}>
            Fetching Procore data and generating digest…
          </p>
        </div>
      )}

      {/* Digest content */}
      {digest && (
        <div style={{ padding: "16px 20px" }}>
          {/* Executive summary */}
          <div style={{
            padding: "12px 16px", borderRadius: 8, marginBottom: 20,
            backgroundColor: "var(--hp-warm-50, #faf8f5)",
            border: "1px solid var(--hp-warm-200, #e8e0d8)",
          }}>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--hp-text, #1f2937)", margin: 0 }}>
              {digest.executive_summary}
            </p>
          </div>

          {/* Risks */}
          {digest.risks.length > 0 && (
            <Section title="Risks & Gaps" count={digest.risks.length} defaultOpen={true}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {digest.risks.map((risk, i) => {
                  const styles = severityStyles(risk.severity);
                  return (
                    <div key={i} style={{
                      padding: "10px 14px", borderRadius: 8,
                      backgroundColor: styles.bg,
                      borderLeft: `3px solid ${styles.border}`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <AlertTriangle className="h-3.5 w-3.5" style={{ color: styles.text }} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: styles.text }}>{risk.title}</span>
                        {priorityBadge(risk.severity)}
                      </div>
                      <p style={{ fontSize: 12, color: "var(--hp-text-secondary, #6b7280)", margin: 0, paddingLeft: 22 }}>
                        {risk.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* Recommended Actions */}
          {digest.recommended_actions.length > 0 && (
            <Section title="Recommended Actions" count={digest.recommended_actions.length} defaultOpen={true}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {digest.recommended_actions.map((action, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px",
                    borderRadius: 6, backgroundColor: "var(--hp-surface, #f9fafb)",
                    border: "1px solid var(--hp-border, #e5e7eb)",
                  }}>
                    <div style={{ marginTop: 1, color: "var(--hp-text-secondary, #9ca3af)" }}>
                      {categoryIcon(action.category)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, color: "var(--hp-text, #1f2937)", margin: 0 }}>{action.action}</p>
                    </div>
                    {priorityBadge(action.priority)}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Missing ITPs */}
          {digest.missing_itps.length > 0 && (
            <Section title="Missing ITPs" count={digest.missing_itps.length} defaultOpen={true}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {digest.missing_itps.map((itp, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px",
                    borderRadius: 6, backgroundColor: "var(--hp-critical-bg, #fef2f2)",
                    border: "1px solid #fecaca",
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--hp-critical, #dc2626)", whiteSpace: "nowrap" as const }}>
                      {itp.itp}
                    </span>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--hp-text, #1f2937)" }}>{itp.name}</span>
                      <p style={{ fontSize: 12, color: "var(--hp-text-secondary, #6b7280)", margin: "2px 0 0" }}>
                        {itp.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Activity This Week */}
          {digest.activity_this_week.length > 0 && (
            <Section title="Recent Activity" count={digest.activity_this_week.length} defaultOpen={false}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {digest.activity_this_week.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
                    fontSize: 13, color: "var(--hp-text, #1f2937)",
                  }}>
                    <CheckCircle className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--hp-compliant, #16a34a)" }} />
                    {item.item}
                    <span style={{
                      fontSize: 10, fontWeight: 500, textTransform: "uppercase" as const,
                      color: "var(--hp-text-secondary, #9ca3af)", marginLeft: "auto",
                    }}>
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Contract Intelligence */}
          {digest.contract_intelligence && (
            <Section title="Contract Intelligence" defaultOpen={false}>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12,
              }}>
                {[
                  { label: "Total subcontracts", value: digest.contract_intelligence.total_subcontracts },
                  { label: "Active trades", value: digest.contract_intelligence.active_trades },
                  { label: "Not started", value: digest.contract_intelligence.not_started },
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: "10px 12px", borderRadius: 8, textAlign: "center" as const,
                    backgroundColor: "var(--hp-warm-50, #faf8f5)",
                    border: "1px solid var(--hp-warm-200, #e8e0d8)",
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "var(--hp-text, #1f2937)" }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: "var(--hp-text-secondary, #6b7280)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              {digest.contract_intelligence.observations.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {digest.contract_intelligence.observations.map((obs, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 10px",
                      fontSize: 12, color: "var(--hp-text-secondary, #6b7280)",
                    }}>
                      <ArrowRight className="h-3 w-3 shrink-0 mt-0.5" />
                      {obs}
                    </div>
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* Coming Up */}
          {digest.coming_up.length > 0 && (
            <Section title="Coming Up" count={digest.coming_up.length} defaultOpen={false}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {digest.coming_up.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
                    fontSize: 13, color: "var(--hp-text, #1f2937)",
                  }}>
                    <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--hp-text-secondary, #9ca3af)" }} />
                    <span style={{ flex: 1 }}>{item.item}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 500,
                      color: "var(--hp-text-secondary, #9ca3af)",
                      whiteSpace: "nowrap" as const,
                    }}>
                      {item.timeframe}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Procore errors */}
          {digest.procore_errors && digest.procore_errors.length > 0 && (
            <div style={{
              marginTop: 12, padding: "8px 12px", borderRadius: 6,
              backgroundColor: "var(--hp-significant-bg, #fffbeb)",
              border: "1px solid var(--hp-significant, #d97706)",
              fontSize: 11, color: "var(--hp-significant, #d97706)",
            }}>
              <strong>Some Procore data unavailable:</strong> {digest.procore_errors.join("; ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Tab ──────────────────────────────────────────────────────────────────

export default function ProjectDigestTab({ companyId, projects, projectsLoading }: Props) {
  const visibleProjects = projects.filter(p => !p.is_hidden);

  // Per-project state
  const [digests, setDigests] = useState<Map<string, ProjectDigest>>(new Map());
  const [loading, setLoading] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  // Bulk refresh
  const [refreshingAll, setRefreshingAll] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState<{ current: number; total: number } | null>(null);
  const autoLoaded = useRef(false);

  // Auto-load cached digests on first render (does NOT generate new ones)
  useEffect(() => {
    if (!companyId || visibleProjects.length === 0 || autoLoaded.current) return;
    autoLoaded.current = true;

    // Batch fetch cached digests — 5 at a time with small delay
    (async () => {
      for (let i = 0; i < visibleProjects.length; i += 5) {
        const batch = visibleProjects.slice(i, i + 5);
        await Promise.all(batch.map(async (p) => {
          const key = String(p.id);
          try {
            const r = await fetch(`/api/digest?project_id=${p.id}&company_id=${companyId}`);
            if (!r.ok) return;
            const data = await r.json();
            if (data && !data.error && data.cached) {
              setDigests(prev => new Map(prev).set(key, data as ProjectDigest));
            }
          } catch { /* no cache hit — fine */ }
        }));
        if (i + 5 < visibleProjects.length) await new Promise(r => setTimeout(r, 200));
      }
    })();
  }, [companyId, visibleProjects]);

  const generateDigest = useCallback(async (projectId: number, force = false) => {
    if (!companyId) return;
    const key = String(projectId);

    setLoading(prev => new Set(prev).add(key));
    setErrors(prev => { const m = new Map(prev); m.delete(key); return m; });

    try {
      const url = `/api/digest?project_id=${projectId}&company_id=${companyId}${force ? "&force=true" : ""}`;
      const res = await fetch(url);
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const digest = await res.json() as ProjectDigest;
      setDigests(prev => new Map(prev).set(key, digest));
    } catch (err) {
      setErrors(prev => new Map(prev).set(key, err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(prev => { const s = new Set(prev); s.delete(key); return s; });
    }
  }, [companyId]);

  const refreshAll = useCallback(async () => {
    if (!companyId || visibleProjects.length === 0) return;
    setRefreshingAll(true);
    setRefreshProgress({ current: 0, total: visibleProjects.length });

    for (let i = 0; i < visibleProjects.length; i++) {
      setRefreshProgress({ current: i + 1, total: visibleProjects.length });
      await generateDigest(visibleProjects[i].id, true);
      // 1s pause between projects to avoid rate limiting
      if (i < visibleProjects.length - 1) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    setRefreshingAll(false);
    setRefreshProgress(null);
  }, [companyId, visibleProjects, generateDigest]);

  if (!companyId) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, padding: 40 }}>
        <p style={{ fontSize: 14, color: "var(--hp-text-secondary, #9ca3af)" }}>Select a company to view project digests.</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--hp-text, #1f2937)", margin: 0 }}>
            Project Digest
          </h2>
          <p style={{ fontSize: 13, color: "var(--hp-text-secondary, #6b7280)", marginTop: 2 }}>
            AI-powered weekly intelligence across all active projects
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {refreshProgress && (
            <span style={{ fontSize: 12, color: "var(--hp-text-secondary, #9ca3af)" }}>
              {refreshProgress.current}/{refreshProgress.total}
            </span>
          )}
          <button
            type="button"
            onClick={refreshAll}
            disabled={refreshingAll || projectsLoading}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
              border: "none", cursor: refreshingAll ? "not-allowed" : "pointer",
              backgroundColor: "var(--hp-warm-700, #5c4a3a)", color: "#fff",
              opacity: refreshingAll ? 0.7 : 1,
            }}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshingAll ? "animate-spin" : ""}`} />
            {refreshingAll ? "Generating…" : "Generate All"}
          </button>
        </div>
      </div>

      {/* Project cards */}
      {projectsLoading ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <RefreshCw className="h-5 w-5 animate-spin mx-auto" style={{ color: "var(--hp-text-secondary)" }} />
          <p style={{ fontSize: 13, color: "var(--hp-text-secondary)", marginTop: 8 }}>Loading projects…</p>
        </div>
      ) : visibleProjects.length === 0 ? (
        <p style={{ fontSize: 14, color: "var(--hp-text-secondary)", textAlign: "center", padding: 40 }}>
          No active projects found.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {visibleProjects.map(project => (
            <DigestCard
              key={project.id}
              project={project}
              digest={digests.get(String(project.id)) ?? null}
              loading={loading.has(String(project.id))}
              error={errors.get(String(project.id)) ?? null}
              onGenerate={() => generateDigest(project.id, true)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
