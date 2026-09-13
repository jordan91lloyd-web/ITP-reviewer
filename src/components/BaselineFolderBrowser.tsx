"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, RefreshCw } from "lucide-react";

// Dead simple folder browser. No useCallback, no useRef, no dependency chains.
// State is local. Communicates via onProcessFolder prop.
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

  // Load top folders on mount
  useEffect(() => {
    setLoading(true);
    setTopFolders(null);
    setExpanded({});
    fetch(`/api/drawing-changes/documents?company_id=${company_id}&project_id=${project_id}`)
      .then(r => r.json())
      .then(data => setTopFolders(data.folders ?? []))
      .catch(() => setTopFolders([]))
      .finally(() => setLoading(false));
  }, [company_id, project_id]);

  function toggleFolder(id: number) {
    if (expanded[id]) {
      // Collapse
      const next = { ...expanded };
      delete next[id];
      setExpanded(next);
    } else {
      // Expand — fetch contents
      setExpanded(prev => ({ ...prev, [id]: "loading" }));
      fetch(`/api/drawing-changes/documents?company_id=${company_id}&project_id=${project_id}&folder_id=${id}`)
        .then(r => r.json())
        .then(data => {
          // Filter out self-referencing subfolders to prevent infinite recursion
          const subs = (data.subfolders ?? []).filter((s: Folder) => s.id !== id);
          setExpanded(prev => ({ ...prev, [id]: { subfolders: subs, files: data.files ?? [] } }));
        })
        .catch(() => {
          setExpanded(prev => ({ ...prev, [id]: { subfolders: [], files: [] } }));
        });
    }
  }

  async function handleProcessFolder(folderId: number, folderName: string) {
    // Recursively collect all files from this folder and subfolders.
    // Visited set prevents infinite loops from circular folder references.
    const allFiles: { id: number; name: string; url: string }[] = [];
    const visited = new Set<number>();

    async function crawl(id: number, depth: number) {
      if (visited.has(id) || depth > MAX_FOLDER_DEPTH) return;
      visited.add(id);
      try {
        const res = await fetch(`/api/drawing-changes/documents?company_id=${company_id}&project_id=${project_id}&folder_id=${id}`);
        if (!res.ok) return;
        const data = await res.json();
        for (const f of (data.files ?? [])) {
          if (f.is_supported && f.url) allFiles.push({ id: f.id, name: f.name, url: f.url });
        }
        for (const sub of (data.subfolders ?? [])) {
          await crawl(sub.id, depth + 1);
        }
      } catch { /* skip */ }
    }

    await crawl(folderId, 0);
    onProcessFolder(allFiles, folderName);
  }

  function renderFolder(folder: Folder, depth: number, ancestors?: Set<number>): React.ReactNode {
    // Guard against circular references and excessive depth
    if (depth > MAX_FOLDER_DEPTH) return null;
    const parentIds = ancestors ?? new Set<number>();
    if (parentIds.has(folder.id)) return null; // circular reference — skip
    const nextAncestors = new Set(parentIds);
    nextAncestors.add(folder.id);

    const state = expanded[folder.id];
    const isExpanded = !!state;
    const isLoading = state === "loading";
    const contents = typeof state === "object" ? state : null;
    const indent = 12 + depth * 20;

    return (
      <div key={folder.id}>
        <div
          onClick={() => toggleFolder(folder.id)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: `8px 12px 8px ${indent}px`,
            borderBottom: "1px solid var(--hp-border)",
            cursor: "pointer", userSelect: "none",
          }}
        >
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
          {isExpanded && !isLoading && !processing && (
            <button
              onClick={(e) => { e.stopPropagation(); handleProcessFolder(folder.id, folder.name); }}
              style={{
                fontSize: 11, fontWeight: 600, color: "#fff",
                background: "var(--hp-warm-800)", border: "none",
                borderRadius: 6, padding: "4px 12px", cursor: "pointer",
              }}
            >
              Process This Folder
            </button>
          )}
          {processing && isExpanded && (
            <span style={{ fontSize: 11, color: "var(--hp-significant)" }}>{progressText}</span>
          )}
        </div>

        {contents && (
          <>
            {contents.files.filter(f => f.is_supported).map(file => (
              <div key={file.id} style={{
                display: "flex", alignItems: "center",
                padding: `6px 12px 6px ${indent + 24}px`,
                borderBottom: "1px solid var(--hp-border)", fontSize: 12,
              }}>
                <span style={{ color: "var(--hp-text-primary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}{file.size ? ` (${(file.size / 1024 / 1024).toFixed(1)} MB)` : ""}
                </span>
              </div>
            ))}
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
    <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", maxHeight: 400, overflowY: "auto" }}>
      {topFolders.map(f => renderFolder(f, 0))}
    </div>
  );
}
