"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, RefreshCw, CheckSquare, Square } from "lucide-react";

// Folder browser with multi-select. Users tick folders and/or individual files,
// then hit "Process Selected" to send everything in one batch.
// Guards against circular/self-referencing folders from Procore.

const MAX_FOLDER_DEPTH = 20;

interface Folder {
  id: number;
  name: string;
}

interface FileItem {
  id: number;
  name: string;
  url: string;
  is_supported: boolean;
  size: number | null;
}

interface Props {
  company_id: string;
  project_id: string;
  onProcessFolder: (files: { id: number; name: string; url: string }[], folderName: string) => void;
  processing: boolean;
  progressText: string;
}

export default function BaselineFolderBrowser({ company_id, project_id, onProcessFolder, processing, progressText }: Props) {
  const [topFolders, setTopFolders] = useState<Folder[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, { subfolders: Folder[]; files: FileItem[] } | "loading" | undefined>>({});

  // Selection state — folder ids and file ids tracked separately
  const [selectedFolders, setSelectedFolders] = useState<Set<number>>(new Set());
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());

  // Load top folders on mount
  useEffect(() => {
    setLoading(true);
    setTopFolders(null);
    setExpanded({});
    setSelectedFolders(new Set());
    setSelectedFiles(new Set());
    fetch(`/api/drawing-changes/documents?company_id=${company_id}&project_id=${project_id}`)
      .then(r => r.json())
      .then(data => setTopFolders(data.folders ?? []))
      .catch(() => setTopFolders([]))
      .finally(() => setLoading(false));
  }, [company_id, project_id]);

  function toggleFolder(id: number) {
    if (expanded[id]) {
      const next = { ...expanded };
      delete next[id];
      setExpanded(next);
    } else {
      setExpanded(prev => ({ ...prev, [id]: "loading" }));
      fetch(`/api/drawing-changes/documents?company_id=${company_id}&project_id=${project_id}&folder_id=${id}`)
        .then(r => r.json())
        .then(data => {
          const subs = (data.subfolders ?? []).filter((s: Folder) => s.id !== id);
          setExpanded(prev => ({ ...prev, [id]: { subfolders: subs, files: data.files ?? [] } }));
        })
        .catch(() => {
          setExpanded(prev => ({ ...prev, [id]: { subfolders: [], files: [] } }));
        });
    }
  }

  function toggleFolderSelection(id: number, e: React.MouseEvent) {
    e.stopPropagation();
    setSelectedFolders(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleFileSelection(id: number) {
    setSelectedFiles(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  // Count how many items are selected
  const totalSelected = selectedFolders.size + selectedFiles.size;

  // Collect all selected files (individual files + crawl selected folders)
  const [crawlStatus, setCrawlStatus] = useState<string | null>(null);

  async function handleProcessSelected() {
    const allFiles: { id: number; name: string; url: string }[] = [];
    const visited = new Set<number>();
    const seenFileIds = new Set<number>();
    let skippedNoUrl = 0;

    setCrawlStatus("Collecting files from selected folders...");
    let totalRaw = 0;
    let totalUnsupported = 0;

    // Fetch all files for each selected folder using recursive=true
    for (const fid of selectedFolders) {
      if (visited.has(fid)) continue;
      visited.add(fid);
      try {
        setCrawlStatus(`Scanning folder ${visited.size}/${selectedFolders.size}...`);
        const res = await fetch(`/api/drawing-changes/documents?company_id=${company_id}&project_id=${project_id}&folder_id=${fid}&recursive=true`);
        if (!res.ok) {
          console.warn(`[BaselineFolderBrowser] folder ${fid} returned ${res.status}`);
          continue;
        }
        const data = await res.json();
        const rawFiles = data.files ?? [];
        totalRaw += rawFiles.length;
        for (const f of rawFiles) {
          if (!f.is_supported) { totalUnsupported++; continue; }
          if (seenFileIds.has(f.id)) continue;
          seenFileIds.add(f.id);
          if (f.url) {
            allFiles.push({ id: f.id, name: f.name, url: f.url });
          } else {
            skippedNoUrl++;
          }
        }
      } catch (err) {
        console.warn(`[BaselineFolderBrowser] crawl error for folder ${fid}:`, err);
      }
    }

    // Add individually selected files (from already-expanded folders)
    for (const fileId of selectedFiles) {
      if (seenFileIds.has(fileId)) continue;
      for (const state of Object.values(expanded)) {
        if (typeof state !== "object" || !state) continue;
        const match = state.files.find(f => f.id === fileId && f.is_supported);
        if (match) {
          seenFileIds.add(fileId);
          if (match.url) {
            allFiles.push({ id: match.id, name: match.name, url: match.url });
          } else {
            skippedNoUrl++;
          }
          break;
        }
      }
    }

    if (allFiles.length > 0) {
      const label = selectedFolders.size > 0
        ? `${selectedFolders.size} folder${selectedFolders.size !== 1 ? "s" : ""}${selectedFiles.size > 0 ? ` + ${selectedFiles.size} file${selectedFiles.size !== 1 ? "s" : ""}` : ""}`
        : `${selectedFiles.size} file${selectedFiles.size !== 1 ? "s" : ""}`;
      setCrawlStatus(null);
      onProcessFolder(allFiles, label);
    } else {
      const parts: string[] = [];
      parts.push(`Found ${totalRaw} total item${totalRaw !== 1 ? "s" : ""}`);
      if (totalUnsupported > 0) parts.push(`${totalUnsupported} unsupported format`);
      if (skippedNoUrl > 0) parts.push(`${skippedNoUrl} missing download URL`);
      if (totalRaw === 0) parts.push("— folders may only contain subfolders, not files directly");
      setCrawlStatus(`No processable files. ${parts.join(", ")}.`);
      setTimeout(() => setCrawlStatus(null), 10000);
    }
  }

  function renderFolder(folder: Folder, depth: number, ancestors?: Set<number>): React.ReactNode {
    if (depth > MAX_FOLDER_DEPTH) return null;
    const parentIds = ancestors ?? new Set<number>();
    if (parentIds.has(folder.id)) return null;
    const nextAncestors = new Set(parentIds);
    nextAncestors.add(folder.id);

    const state = expanded[folder.id];
    const isExpanded = !!state;
    const isLoading = state === "loading";
    const contents = typeof state === "object" ? state : null;
    const indent = 12 + depth * 20;
    const isFolderSelected = selectedFolders.has(folder.id);

    return (
      <div key={folder.id}>
        <div
          onClick={() => toggleFolder(folder.id)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: `8px 12px 8px ${indent}px`,
            borderBottom: "1px solid var(--hp-border)",
            cursor: "pointer", userSelect: "none",
            backgroundColor: isFolderSelected ? "var(--hp-warm-100)" : undefined,
          }}
        >
          {/* Checkbox for folder selection */}
          <span
            onClick={(e) => toggleFolderSelection(folder.id, e)}
            style={{ cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center" }}
          >
            {isFolderSelected
              ? <CheckSquare size={14} style={{ color: "var(--hp-warm-800)" }} />
              : <Square size={14} style={{ color: "var(--hp-text-muted)" }} />
            }
          </span>

          {isLoading
            ? <RefreshCw size={12} className="animate-spin" style={{ color: "var(--hp-text-muted)" }} />
            : isExpanded
              ? <ChevronDown size={12} style={{ color: "var(--hp-text-muted)" }} />
              : <ChevronRight size={12} style={{ color: "var(--hp-text-muted)" }} />
          }
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--hp-text-primary)", flex: 1 }}>{folder.name}</span>
          {contents && (
            <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
              {contents.files.filter(f => f.is_supported).length} files
              {contents.subfolders.length > 0 && ` · ${contents.subfolders.length} folders`}
            </span>
          )}
        </div>

        {contents && (
          <>
            {contents.files.filter(f => f.is_supported).map(file => {
              const isFileSelected = selectedFiles.has(file.id) || isFolderSelected;
              return (
                <div
                  key={file.id}
                  onClick={() => { if (!isFolderSelected) toggleFileSelection(file.id); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: `6px 12px 6px ${indent + 24}px`,
                    borderBottom: "1px solid var(--hp-border)", fontSize: 12,
                    cursor: isFolderSelected ? "default" : "pointer",
                    backgroundColor: isFileSelected ? "var(--hp-warm-100)" : undefined,
                  }}
                >
                  <span style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                    {isFileSelected
                      ? <CheckSquare size={12} style={{ color: isFolderSelected ? "var(--hp-text-muted)" : "var(--hp-warm-800)" }} />
                      : <Square size={12} style={{ color: "var(--hp-text-muted)" }} />
                    }
                  </span>
                  <span style={{ color: "var(--hp-text-primary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {file.name}{file.size ? ` (${(file.size / 1024 / 1024).toFixed(1)} MB)` : ""}
                  </span>
                </div>
              );
            })}
            {contents.subfolders.map(sub => renderFolder(sub, depth + 1, nextAncestors))}
          </>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 16, fontSize: 12, color: "var(--hp-text-secondary)", border: "1px solid var(--hp-border)", borderRadius: 8 }}>
        <RefreshCw size={12} className="animate-spin" /> Loading folders...
      </div>
    );
  }

  if (!topFolders || topFolders.length === 0) {
    return <div style={{ padding: 16, fontSize: 12, color: "var(--hp-text-secondary)" }}>No document folders found.</div>;
  }

  return (
    <div>
      {/* Sticky action bar */}
      {totalSelected > 0 && !processing && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 12px", marginBottom: 4,
          borderRadius: 8, border: "1px solid var(--hp-warm-800)",
          backgroundColor: "var(--hp-warm-100)",
        }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--hp-warm-800)" }}>
            {selectedFolders.size > 0 && `${selectedFolders.size} folder${selectedFolders.size !== 1 ? "s" : ""}`}
            {selectedFolders.size > 0 && selectedFiles.size > 0 && " + "}
            {selectedFiles.size > 0 && `${selectedFiles.size} file${selectedFiles.size !== 1 ? "s" : ""}`}
            {" selected"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => { setSelectedFolders(new Set()); setSelectedFiles(new Set()); }}
              style={{ fontSize: 11, color: "var(--hp-text-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              Clear
            </button>
            <button
              onClick={handleProcessSelected}
              style={{
                fontSize: 12, fontWeight: 600, color: "#fff",
                background: "var(--hp-warm-800)", border: "none",
                borderRadius: 6, padding: "6px 16px", cursor: "pointer",
              }}
            >
              Process Selected
            </button>
          </div>
        </div>
      )}
      {crawlStatus && !processing && (
        <div style={{
          padding: "8px 12px", marginBottom: 4, borderRadius: 8,
          backgroundColor: crawlStatus.includes("No ") ? "var(--hp-significant-bg)" : "var(--hp-warm-100)",
          fontSize: 12, color: crawlStatus.includes("No ") ? "var(--hp-significant)" : "var(--hp-warm-800)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {!crawlStatus.includes("No ") && <RefreshCw size={12} className="animate-spin" />}
          {crawlStatus}
        </div>
      )}
      {processing && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 12px", marginBottom: 4,
          borderRadius: 8, backgroundColor: "var(--hp-warm-100)",
        }}>
          <RefreshCw size={12} className="animate-spin" style={{ color: "var(--hp-significant)" }} />
          <span style={{ fontSize: 12, color: "var(--hp-significant)", fontWeight: 500 }}>{progressText}</span>
        </div>
      )}
      <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", maxHeight: 400, overflowY: "auto" }}>
        {topFolders.map(f => renderFolder(f, 0))}
      </div>
    </div>
  );
}
