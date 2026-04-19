"use client";

// ─── Admin: Document Management ───────────────────────────────────────────────
// Upload scoring guidelines to Supabase Storage. Admin-only.

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, Clock, Users } from "lucide-react";

interface StorageDocument {
  name:          string;
  size:          number | null;
  last_modified: string | null;
  url:           string;
}

interface AuditEntry {
  id:         string;
  created_at: string;
  user_name:  string;
  user_email: string | null;
  details:    {
    filename?:                 string;
    file_size?:                number;
    previous_version_existed?: boolean;
  } | null;
}

function formatBytes(bytes: number | null): string {
  if (bytes == null) return "—";
  if (bytes < 1024)          return `${bytes} B`;
  if (bytes < 1024 * 1024)   return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminDocumentsPage() {
  const [adminChecked, setAdminChecked] = useState(false);
  const [isAdmin, setIsAdmin]           = useState(false);
  const [companyId, setCompanyId]       = useState("");
  const [documents, setDocuments]       = useState<StorageDocument[]>([]);
  const [configured, setConfigured]     = useState(true);
  const [loadError, setLoadError]       = useState<string | null>(null);
  const [uploading, setUploading]       = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null);
  const [dragOver, setDragOver]         = useState(false);
  const [auditHistory, setAuditHistory] = useState<AuditEntry[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  // Admin check
  useEffect(() => {
    fetch("/api/admin/check")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const admin   = !!data?.isAdmin;
        const company = data?.company_id ?? "";
        setIsAdmin(admin);
        setCompanyId(company);
        setAdminChecked(true);
        if (admin) {
          loadDocuments();
          loadAuditHistory(company);
        }
      })
      .catch(() => setAdminChecked(true));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function loadDocuments() {
    setLoadError(null);
    fetch("/api/documents")
      .then(r => r.ok ? r.json() : Promise.reject("Request failed"))
      .then(data => {
        setDocuments(data.documents ?? []);
        setConfigured(data.configured !== false);
        if (data.error) setLoadError(data.error);
      })
      .catch(() => setLoadError("Failed to load documents."));
  }

  function loadAuditHistory(cid?: string) {
    const company = cid ?? companyId;
    if (!company) return;
    fetch(`/api/audit?action=scoring_document_updated&limit=10&company_id=${encodeURIComponent(company)}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setAuditHistory(data?.events ?? []))
      .catch(() => {});
  }

  async function handleUpload(file: File) {
    const allowed = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
      "application/msword",
    ];
    if (!allowed.includes(file.type)) {
      setUploadResult({ success: false, message: "Only .docx, .doc, and .pdf files are allowed." });
      return;
    }
    if (file.size > 52_428_800) {
      setUploadResult({ success: false, message: "File exceeds the 50 MB limit." });
      return;
    }

    setUploading(true);
    setUploadResult(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res  = await fetch("/api/documents/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.success) {
        setUploadResult({ success: true, message: "Document uploaded successfully." });
        loadDocuments();
        loadAuditHistory(companyId);
      } else {
        setUploadResult({ success: false, message: data.error ?? "Upload failed." });
      }
    } catch {
      setUploadResult({ success: false, message: "Network error. Please try again." });
    } finally {
      setUploading(false);
    }
  }

  // ── Loading / access denied ────────────────────────────────────────────────

  if (!adminChecked) {
    return (
      <div className="flex-1 bg-[#F9FAFB] flex items-center justify-center py-24">
        <div className="h-6 w-6 border-2 border-gray-300 border-t-[#1F3864] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    // Redirect silently to homepage
    if (typeof window !== "undefined") window.location.replace("/");
    return null;
  }

  // ── Main ─────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-full bg-[#F9FAFB]">

      {/* Sub-header */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <Link href="/how-it-works" className="hover:text-[#1F3864] transition-colors font-medium">
            How it Works
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-[#1F3864]">Document Management</span>
        </div>
        <Link
          href="/admin/users"
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#1F3864] transition-colors"
        >
          <Users className="h-3.5 w-3.5" />
          Manage admin users →
        </Link>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#1F3864]">Scoring Document Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload a new version of the ITP QA Scoring Guidelines.
            {companyId && <span className="ml-1 text-gray-400">Company: {companyId}</span>}
          </p>
        </div>

        {/* Supabase not configured */}
        {!configured && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold">Supabase Storage not configured</p>
              <p className="mt-0.5 text-amber-700">
                Set <code className="bg-amber-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> in{" "}
                <code className="bg-amber-100 px-1 rounded">.env.local</code> to enable uploads.
                The static fallback at{" "}
                <code className="bg-amber-100 px-1 rounded">/documents/ITP-QA-Scoring-Guidelines-v1.0.docx</code>{" "}
                will be served until Storage is configured.
              </p>
            </div>
          </div>
        )}

        {/* Current document in Storage */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">Current document in Storage</p>
            <button
              onClick={() => { loadDocuments(); loadAuditHistory(companyId); }}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RefreshCw className="h-3 w-3" /> Refresh
            </button>
          </div>

          {loadError && (
            <div className="px-5 py-4 text-sm text-red-600">{loadError}</div>
          )}

          {!loadError && documents.length === 0 && (
            <div className="px-5 py-6 text-center">
              <FileText className="h-8 w-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No document uploaded to Storage yet.</p>
              <p className="text-xs text-gray-400 mt-1">
                The static fallback at{" "}
                <code className="bg-gray-50 px-1 rounded">/documents/ITP-QA-Scoring-Guidelines-v1.0.docx</code>{" "}
                is served until you upload one here.
              </p>
            </div>
          )}

          {documents.map(doc => (
            <div key={doc.name} className="px-5 py-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1F3864]/5 shrink-0">
                  <FileText className="h-5 w-5 text-[#1F3864]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">scoring-guidelines.docx</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatBytes(doc.size)} · Uploaded {formatDate(doc.last_modified)}
                  </p>
                </div>
              </div>
              <a
                href={doc.url}
                download
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Download
              </a>
            </div>
          ))}
        </div>

        {/* Upload zone */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">Upload new version</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Uploading replaces the current document. The How it Works download link updates automatically.
            </p>
          </div>

          <div className="p-5">
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) handleUpload(file);
              }}
              onClick={() => fileRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 cursor-pointer transition-colors ${
                dragOver
                  ? "border-[#D97706] bg-amber-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              } ${uploading ? "pointer-events-none opacity-60" : ""}`}
            >
              <Upload className={`h-8 w-8 mb-3 ${dragOver ? "text-[#D97706]" : "text-gray-300"}`} />
              <p className="text-sm font-semibold text-gray-700">
                {uploading ? "Uploading…" : "Drop file here or click to select"}
              </p>
              <p className="text-xs text-gray-400 mt-1">Supports .docx, .doc, .pdf · Max 50 MB</p>
              <input
                ref={fileRef}
                type="file"
                accept=".docx,.doc,.pdf"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                  e.target.value = "";
                }}
              />
            </div>

            {uploadResult && (
              <div className={`mt-4 flex items-start gap-3 rounded-xl border px-4 py-3 ${
                uploadResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
              }`}>
                {uploadResult.success
                  ? <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  : <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                }
                <p className={`text-sm font-medium ${uploadResult.success ? "text-green-800" : "text-red-800"}`}>
                  {uploadResult.message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Document change history */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <Clock className="h-4 w-4 text-gray-400" />
            <p className="text-sm font-semibold text-gray-800">Upload history</p>
            <span className="text-xs text-gray-400">(last 10)</span>
          </div>

          {auditHistory.length === 0 ? (
            <div className="px-5 py-6 text-center text-sm text-gray-400">
              No uploads recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {auditHistory.map(entry => (
                <div key={entry.id} className="px-5 py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-700">{entry.user_name}</p>
                    {entry.user_email && (
                      <p className="text-[10px] text-gray-400">{entry.user_email}</p>
                    )}
                    {entry.details?.filename && (
                      <p className="text-[10px] text-gray-400 italic">{entry.details.filename}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">{formatDate(entry.created_at)}</p>
                    {entry.details?.file_size != null && (
                      <p className="text-[10px] text-gray-400">{formatBytes(entry.details.file_size)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          <Link href="/how-it-works#reference-doc" className="hover:text-gray-600 transition-colors">
            ← Back to How it Works
          </Link>
        </p>
      </div>
    </div>
  );
}
