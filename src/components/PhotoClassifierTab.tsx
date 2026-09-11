"use client";

import { useState, useCallback } from "react";
import { RefreshCw, ChevronDown, ChevronRight } from "lucide-react";

interface DashboardProject {
  id: number;
  name: string;
  display_name: string;
}

interface Props {
  company_id: string;
  projects: DashboardProject[];
}

interface Album {
  id: number;
  name: string;
  count: number;
}

interface ClassificationResult {
  photo_id: number;
  filename: string;
  subject: string;
  location_detail: string | null;
  confidence: number;
}

interface AlbumResult {
  album_id: number;
  album_name: string;
  resolved_location: { id: number; path: string } | null;
  total_photos: number;
  already_classified: number;
  newly_classified: number;
  skipped: number;
  classifications: ClassificationResult[];
}

interface RunSummary {
  total_albums: number;
  total_photos: number;
  already_classified: number;
  newly_classified: number;
  skipped: number;
  by_subject: Record<string, number>;
  confidence: { confident: number; needs_review: number; low: number };
  unresolved_albums: { album_id: number; album_name: string; photo_count: number }[];
  low_confidence_items: { photo_id: number; filename: string; subject: string; confidence: number }[];
  needs_review_items: { photo_id: number; filename: string; subject: string; confidence: number }[];
}

const SUBJECT_LABELS: Record<string, string> = {
  insulation: "Insulation",
  noggins_blocking: "Noggins & Blocking",
  hydraulic_rough_in: "Hydraulic Rough-In",
  mechanical_rough_in: "Mechanical Rough-In",
  electrical_rough_in: "Electrical Rough-In",
  fire_services: "Fire Services",
  waterproofing_membrane: "Waterproofing Membrane",
  pipe_lagging: "Pipe Lagging",
  framing: "Framing",
  bulkhead_framing: "Bulkhead Framing",
  general_room: "General Room Shot",
  external: "External",
  signage_label: "Signage / Label",
  unknown: "Unknown",
};

function fmtConfidence(c: number): string {
  return `${Math.round(c * 100)}%`;
}

export default function PhotoClassifierTab({ company_id, projects }: Props) {
  const [projectId, setProjectId] = useState("");
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [summary, setSummary] = useState<RunSummary | null>(null);
  const [albumResults, setAlbumResults] = useState<AlbumResult[]>([]);
  const [expandedAlbums, setExpandedAlbums] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const fetchAlbums = useCallback(async (pid: string) => {
    setLoadingAlbums(true);
    setAlbums([]);
    setError(null);
    try {
      const res = await fetch(`/api/photo-classifier/albums?project_id=${pid}`);
      if (!res.ok) throw new Error("Failed to fetch albums");
      const data = await res.json();
      setAlbums(data.albums ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch albums");
    } finally {
      setLoadingAlbums(false);
    }
  }, []);

  const handleProjectChange = useCallback((pid: string) => {
    setProjectId(pid);
    setSummary(null);
    setAlbumResults([]);
    if (pid) fetchAlbums(pid);
  }, [fetchAlbums]);

  const runClassifier = useCallback(async () => {
    if (!projectId) return;
    setRunning(true);
    setError(null);
    setSummary(null);
    setAlbumResults([]);
    try {
      const body: Record<string, unknown> = { company_id, project_id: projectId };
      if (selectedAlbumId) body.album_id = selectedAlbumId;

      const res = await fetch("/api/photo-classifier/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Failed (HTTP ${res.status})`);
      }
      const data = await res.json();
      setSummary(data.summary);
      setAlbumResults(data.albums ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Classification failed");
    } finally {
      setRunning(false);
    }
  }, [projectId, company_id, selectedAlbumId]);

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--hp-bg)" }}>
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--hp-text-primary)", margin: 0 }}>
          Photo Classifier
        </h2>
        <p style={{ fontSize: 12, color: "var(--hp-text-secondary)", marginTop: 4 }}>
          Classify site photos by what they show. Stage 1 of evidence sync — read-only, no attachments.
        </p>
      </div>

      {/* Project selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <select
          value={projectId}
          onChange={(e) => handleProjectChange(e.target.value)}
          style={{ borderRadius: 8, border: "1px solid var(--hp-border)", padding: "8px 12px", fontSize: 13, backgroundColor: "var(--hp-surface)", color: "var(--hp-text-primary)", minWidth: 280 }}
        >
          <option value="">Select a project</option>
          {projects.map((p) => (
            <option key={p.id} value={String(p.id)}>{p.display_name || p.name}</option>
          ))}
        </select>
      </div>

      {/* Albums + run controls */}
      {projectId && (
        <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", padding: 16, backgroundColor: "var(--hp-surface)" }}>
          {loadingAlbums ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--hp-text-secondary)" }}>
              <RefreshCw size={14} className="animate-spin" /> Loading albums...
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <select
                  value={selectedAlbumId ?? ""}
                  onChange={(e) => setSelectedAlbumId(e.target.value ? parseInt(e.target.value) : null)}
                  style={{ borderRadius: 8, border: "1px solid var(--hp-border)", padding: "6px 10px", fontSize: 12, backgroundColor: "var(--hp-surface)", color: "var(--hp-text-primary)", minWidth: 250 }}
                >
                  <option value="">All albums ({albums.length})</option>
                  {albums.filter(a => a.count > 0).map((a) => (
                    <option key={a.id} value={a.id}>{a.name} ({a.count} photos)</option>
                  ))}
                </select>

                <button
                  onClick={runClassifier}
                  disabled={running}
                  style={{ borderRadius: 8, padding: "6px 16px", fontSize: 12, fontWeight: 600, color: "#fff", backgroundColor: "var(--hp-warm-800)", border: "none", cursor: running ? "default" : "pointer", opacity: running ? 0.4 : 1 }}
                >
                  {running ? "Classifying..." : selectedAlbumId ? "Classify Album" : "Classify All"}
                </button>

                {running && (
                  <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
                    This may take a few minutes for large albums...
                  </span>
                )}
              </div>

              <div style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
                {albums.length} albums · {albums.reduce((sum, a) => sum + a.count, 0)} total photos
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <div style={{ borderRadius: 8, border: "1px solid var(--hp-critical-bg)", backgroundColor: "var(--hp-critical-bg)", color: "var(--hp-critical)", padding: 12, fontSize: 12 }}>
          {error}
        </div>
      )}

      {/* Results */}
      {summary && (
        <>
          {/* Summary card */}
          <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", padding: 16, backgroundColor: "var(--hp-warm-100)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--hp-text-primary)", marginBottom: 8 }}>
              Classification Summary
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 12, color: "var(--hp-text-secondary)" }}>
              <div><strong style={{ fontSize: 18, color: "var(--hp-text-primary)" }}>{summary.newly_classified}</strong> newly classified</div>
              <div><strong style={{ fontSize: 18, color: "var(--hp-text-primary)" }}>{summary.already_classified}</strong> already done</div>
              <div><strong style={{ fontSize: 18, color: "var(--hp-text-primary)" }}>{summary.skipped}</strong> skipped</div>
              <div><strong style={{ fontSize: 18, color: "var(--hp-compliant)" }}>{summary.confidence.confident}</strong> confident</div>
              <div><strong style={{ fontSize: 18, color: "var(--hp-significant)" }}>{summary.confidence.needs_review}</strong> needs review</div>
              <div><strong style={{ fontSize: 18, color: "var(--hp-critical)" }}>{summary.confidence.low}</strong> low confidence</div>
            </div>

            {/* By subject */}
            {Object.keys(summary.by_subject).length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--hp-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                  By Subject
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {Object.entries(summary.by_subject).sort((a, b) => b[1] - a[1]).map(([subject, count]) => (
                    <span key={subject} style={{ borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 500, backgroundColor: "var(--hp-surface)", border: "1px solid var(--hp-border)", color: "var(--hp-text-primary)" }}>
                      {SUBJECT_LABELS[subject] ?? subject}: {count}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Unresolved albums */}
            {summary.unresolved_albums.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--hp-critical)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                  Unresolved Albums (no location match)
                </div>
                {summary.unresolved_albums.map((a) => (
                  <div key={a.album_id} style={{ fontSize: 12, color: "var(--hp-text-secondary)", padding: "2px 0" }}>
                    {a.album_name} ({a.photo_count} photos)
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Needs review */}
          {summary.needs_review_items.length > 0 && (
            <div style={{ borderRadius: 8, border: "1px solid var(--hp-significant-bg)", padding: 16, backgroundColor: "var(--hp-significant-bg)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--hp-significant)", marginBottom: 8 }}>
                Needs Review ({summary.needs_review_items.length})
              </div>
              {summary.needs_review_items.map((item) => (
                <div key={item.photo_id} style={{ fontSize: 12, color: "var(--hp-text-secondary)", padding: "2px 0" }}>
                  {item.filename} — {SUBJECT_LABELS[item.subject] ?? item.subject} ({fmtConfidence(item.confidence)})
                </div>
              ))}
            </div>
          )}

          {/* Low confidence */}
          {summary.low_confidence_items.length > 0 && (
            <div style={{ borderRadius: 8, border: "1px solid var(--hp-critical-bg)", padding: 16, backgroundColor: "var(--hp-critical-bg)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--hp-critical)", marginBottom: 8 }}>
                Low Confidence ({summary.low_confidence_items.length})
              </div>
              {summary.low_confidence_items.map((item) => (
                <div key={item.photo_id} style={{ fontSize: 12, color: "var(--hp-text-secondary)", padding: "2px 0" }}>
                  {item.filename} — {SUBJECT_LABELS[item.subject] ?? item.subject} ({fmtConfidence(item.confidence)})
                </div>
              ))}
            </div>
          )}

          {/* Per-album results */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--hp-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
              Results by Album
            </div>
            {albumResults.map((album) => {
              const isExpanded = expandedAlbums.has(album.album_id);
              return (
                <div key={album.album_id} style={{ borderRadius: 8, border: "1px solid var(--hp-border)", marginBottom: 6, overflow: "hidden" }}>
                  <div
                    onClick={() => setExpandedAlbums((prev) => { const next = new Set(prev); if (next.has(album.album_id)) next.delete(album.album_id); else next.add(album.album_id); return next; })}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", backgroundColor: "var(--hp-warm-100)", cursor: "pointer", userSelect: "none" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {isExpanded ? <ChevronDown size={14} style={{ color: "var(--hp-text-muted)" }} /> : <ChevronRight size={14} style={{ color: "var(--hp-text-muted)" }} />}
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--hp-text-primary)" }}>{album.album_name}</span>
                      {album.resolved_location ? (
                        <span style={{ fontSize: 11, color: "var(--hp-compliant)" }}>{album.resolved_location.path}</span>
                      ) : (
                        <span style={{ fontSize: 11, color: "var(--hp-critical)" }}>No location match</span>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
                      {album.newly_classified} new · {album.already_classified} existing · {album.total_photos} total
                    </span>
                  </div>

                  {isExpanded && album.classifications.length > 0 && (
                    <div style={{ maxHeight: 300, overflowY: "auto" }}>
                      {album.classifications.map((c) => (
                        <div key={c.photo_id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 14px 6px 36px", borderTop: "1px solid var(--hp-border)", fontSize: 12 }}>
                          <span style={{ color: "var(--hp-text-secondary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.filename}</span>
                          <span style={{ borderRadius: 999, padding: "1px 8px", fontSize: 11, fontWeight: 500, backgroundColor: "var(--hp-surface)", border: "1px solid var(--hp-border)", color: "var(--hp-text-primary)", whiteSpace: "nowrap" }}>
                            {SUBJECT_LABELS[c.subject] ?? c.subject}
                          </span>
                          {c.location_detail && (
                            <span style={{ fontSize: 11, color: "var(--hp-text-muted)", whiteSpace: "nowrap" }}>{c.location_detail}</span>
                          )}
                          <span style={{ fontSize: 11, fontWeight: 500, color: c.confidence >= 0.7 ? "var(--hp-compliant)" : c.confidence >= 0.5 ? "var(--hp-significant)" : "var(--hp-critical)", whiteSpace: "nowrap" }}>
                            {fmtConfidence(c.confidence)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
    </div>
  );
}
