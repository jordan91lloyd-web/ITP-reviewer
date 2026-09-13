"use client";

import { useState, useCallback } from "react";
import { ChevronRight, ChevronDown, RefreshCw } from "lucide-react";

// Standalone component — no shared state with DrawingChangesTab.
// Communicates only via onProcessFolder callback.

interface Folder {
  id: number;
  name: string;
  has_children: boolean;
}

interface FileItem {
  id: number;
  name: string;
  url: string;
  content_type: string;
  size: number | null;
  is_supported: boolean;
}

interface FolderContents {
  subfolders: Folder[];
  files: FileItem[];
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
  const [topLoading, setTopLoading] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [contents, setContents] = useState<Map<number, FolderContents>>(new Map());
  const [loading, setLoading] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);

  // Fetch top-level folders (1 API call)
  const loadTopFolders = useCallback(async () => {
    setTopLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/drawing-changes/documents?company_id=${company_id}&project_id=${project_id}`);
      if (!res.ok) { setError("Failed to load folders"); return; }
      const data = await res.json();
      setTopFolders(data.folders ?? []);
    } catch {
      setError("Failed to load folders");
    } finally {
      setTopLoading(false);
    }
  }, [company_id, project_id]);

  // Load on first render
  if (topFolders === null && !topLoading) {
    loadTopFolders();
  }

  // Fetch one folder's contents (1 API call)
  const loadFolder = useCallback(async (folderId: number) => {
    setLoading((prev) => new Set(prev).add(folderId));
    try {
      const res = await fetch(`/api/drawing-changes/documents?company_id=${company_id}&project_id=${project_id}&folder_id=${folderId}`);
      if (!res.ok) return;
      const data = await res.json();
      setContents((prev) => {
        const next = new Map(prev);
        next.set(folderId, {
          subfolders: data.subfolders ?? [],
          files: data.files ?? [],
        });
        return next;
      });
    } catch { /* ignore */ }
    finally {
      setLoading((prev) => { const next = new Set(prev); next.delete(folderId); return next; });
    }
  }, [company_id, project_id]);

  // Toggle expand/collapse — loads contents on first expand
  const toggle = useCallback((folderId: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
        // Load contents if not already loaded — check via state setter to avoid dep on contents
        setContents((currentContents) => {
          if (!currentContents.has(folderId)) loadFolder(folderId);
          return currentContents; // no change, just reading
        });
      }
      return next;
    });
  }, [loadFolder]);

  // Recursively collect all supported files from a folder (uses API, not cached data)
  const collectAllFiles = useCallback(async (folderId: number): Promise<{ id: number; name: string; url: string }[]> => {
    const result: { id: number; name: string; url: string }[] = [];
    try {
      const res = await fetch(`/api/drawing-changes/documents?company_id=${company_id}&project_id=${project_id}&folder_id=${folderId}`);
      if (!res.ok) return result;
      const data = await res.json();
      for (const f of (data.files ?? [])) {
        if (f.is_supported && f.url) result.push({ id: f.id, name: f.name, url: f.url });
      }
      for (const sub of (data.subfolders ?? [])) {
        const subFiles = await collectAllFiles(sub.id);
        result.push(...subFiles);
      }
    } catch { /* skip */ }
    return result;
  }, [company_id, project_id]);

  // Render a folder row
  function renderFolder(folder: Folder, depth: number) {
    const isExpanded = expanded.has(folder.id);
    const isLoading = loading.has(folder.id);
    const folderContents = contents.get(folder.id);
    const indent = 12 + depth * 20;

    return (
      <div key={folder.id}>
        <div
          onClick={() => toggle(folder.id)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: `8px 12px 8px ${indent}px`,
            borderBottom: "1px solid var(--hp-border)",
            backgroundColor: "var(--hp-bg)",
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
          {folderContents && (
            <span style={{ fontSize: 11, color: "var(--hp-text-muted)" }}>
              {folderContents.files.filter((f) => f.is_supported).length} files
              {folderContents.subfolders.length > 0 && ` · ${folderContents.subfolders.length} folders`}
            </span>
          )}
          {isExpanded && !processing && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                (async () => {
                  const files = await collectAllFiles(folder.id);
                  onProcessFolder(files, folder.name);
                })();
              }}
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

        {isExpanded && folderContents && (
          <>
            {folderContents.files.filter((f) => f.is_supported).map((file) => (
              <div key={file.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: `6px 12px 6px ${indent + 24}px`,
                borderBottom: "1px solid var(--hp-border)", fontSize: 12,
              }}>
                <span style={{ color: "var(--hp-text-primary)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}{file.size ? ` (${(file.size / 1024 / 1024).toFixed(1)} MB)` : ""}
                </span>
              </div>
            ))}
            {folderContents.subfolders.map((sub) => renderFolder(sub, depth + 1))}
          </>
        )}
      </div>
    );
  }

  if (topLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 16, fontSize: 12, color: "var(--hp-text-secondary)", border: "1px solid var(--hp-border)", borderRadius: 8 }}>
        <RefreshCw size={12} className="animate-spin" /> Loading folders...
      </div>
    );
  }

  if (error) {
    return <div style={{ padding: 16, fontSize: 12, color: "var(--hp-critical)" }}>{error}</div>;
  }

  if (!topFolders || topFolders.length === 0) {
    return <div style={{ padding: 16, fontSize: 12, color: "var(--hp-text-secondary)" }}>No document folders found.</div>;
  }

  return (
    <div style={{ borderRadius: 8, border: "1px solid var(--hp-border)", maxHeight: 400, overflowY: "auto" }}>
      {topFolders.map((f) => renderFolder(f, 0))}
    </div>
  );
}
