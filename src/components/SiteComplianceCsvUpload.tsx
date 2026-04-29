"use client";

// ─── SiteComplianceCsvUpload ───────────────────────────────────────────────────
// Single unified drop zone that accepts both Breadcrumb CSV exports at once.
// Auto-detects which file is which by inspecting column headers.
// Parses CSVs client-side (no dependencies).

import { useRef, useState, useCallback } from "react";
import { Upload, CheckCircle, AlertTriangle } from "lucide-react";

// ── CSV parser ─────────────────────────────────────────────────────────────────

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  fields.push(cur);
  return fields;
}

export function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map(h => h.trim());
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = (values[idx] ?? "").trim();
    });
    rows.push(row);
  }

  return rows;
}

/** Returns the most recent valid date value in a column, or null. */
function mostRecentDate(rows: Record<string, string>[], dateColumn: string): Date | null {
  let latest: Date | null = null;
  for (const row of rows) {
    const raw = row[dateColumn];
    if (!raw) continue;
    const d = new Date(raw);
    if (!isNaN(d.getTime()) && (latest === null || d > latest)) latest = d;
  }
  return latest;
}

/** Detect which report type a CSV is from its headers. */
function detectReportType(headers: string[]): "briefings" | "approvals" | "unknown" {
  const set = new Set(headers.map(h => h.trim()));
  if (set.has("Site Briefing Type")) return "briefings";
  if (set.has("Type") && set.has("Approval Time")) return "approvals";
  return "unknown";
}

/** Last-7-days date range label: "Mon DD MMM – Sun DD MMM YYYY" */
function sevenDayRangeLabel(): string {
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setDate(end.getDate() - 6); // 7 days inclusive
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  const optsYear: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  return `${start.toLocaleDateString("en-AU", opts)} – ${end.toLocaleDateString("en-AU", optsYear)}`;
}

// ── Loaded file pill ───────────────────────────────────────────────────────────

interface FilePillProps {
  label: string;
  filename: string;
  uploadTime: Date;
}

function FilePill({ label, filename, uploadTime }: FilePillProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs min-w-0">
      <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
      <div className="min-w-0">
        <p className="font-semibold text-green-700 truncate">{label}</p>
        <p className="text-gray-500 truncate">{filename}</p>
        <p className="text-gray-400">
          {uploadTime.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}

// ── Public component ───────────────────────────────────────────────────────────

interface LoadedFile {
  filename: string;
  uploadTime: Date;
}

interface Props {
  onBriefingsParsed: (rows: Record<string, string>[], filename: string, uploadTime: Date) => void;
  onApprovalsParsed: (rows: Record<string, string>[], filename: string, uploadTime: Date) => void;
}

export default function SiteComplianceCsvUpload({ onBriefingsParsed, onApprovalsParsed }: Props) {
  const [isDragging, setIsDragging]       = useState(false);
  const [briefings, setBriefings]         = useState<LoadedFile | null>(null);
  const [approvals, setApprovals]         = useState<LoadedFile | null>(null);
  const [errors, setErrors]               = useState<string[]>([]);
  const [staleWarning, setStaleWarning]   = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File): Promise<void> => {
      return new Promise(resolve => {
        if (!file.name.toLowerCase().endsWith(".csv")) {
          setErrors(prev => [...prev, `"${file.name}" — not a .csv file`]);
          resolve();
          return;
        }

        const reader = new FileReader();
        reader.onload = e => {
          const text = e.target?.result as string;
          try {
            const lines = text.split(/\r?\n/);
            if (lines.length < 2) {
              setErrors(prev => [...prev, `"${file.name}" — file appears empty`]);
              resolve();
              return;
            }

            const headers = parseCsvLine(lines[0]).map(h => h.trim());
            const type    = detectReportType(headers);

            if (type === "unknown") {
              setErrors(prev => [
                ...prev,
                `"${file.name}" — unrecognised format (expected Site Briefings or Approvals report)`,
              ]);
              resolve();
              return;
            }

            const rows = parseCSV(text);
            const now  = new Date();

            // Staleness check across both files combined
            const latest = mostRecentDate(rows, "Date Submitted");
            if (latest) {
              const sevenDaysAgo = new Date();
              sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
              if (latest < sevenDaysAgo) setStaleWarning(true);
            }

            if (type === "briefings") {
              setBriefings({ filename: file.name, uploadTime: now });
              onBriefingsParsed(rows, file.name, now);
            } else {
              setApprovals({ filename: file.name, uploadTime: now });
              onApprovalsParsed(rows, file.name, now);
            }
          } catch {
            setErrors(prev => [...prev, `"${file.name}" — failed to parse`]);
          }
          resolve();
        };
        reader.readAsText(file);
      });
    },
    [onBriefingsParsed, onApprovalsParsed]
  );

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      setErrors([]);
      const files = Array.from(fileList);
      for (const file of files) {
        await processFile(file);
      }
    },
    [processFile]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFiles(e.target.files);
    e.target.value = "";
  };

  const bothLoaded  = briefings !== null && approvals !== null;
  const eitherLoaded = briefings !== null || approvals !== null;

  return (
    <div>
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={e => { e.preventDefault(); setIsDragging(false); }}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          "cursor-pointer rounded-xl border-2 border-dashed transition-colors",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : bothLoaded
              ? "border-green-300 bg-green-50 hover:border-green-400"
              : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          multiple
          onChange={onInputChange}
          className="hidden"
        />

        <div className="px-6 py-5">
          {/* Header row */}
          <div className="flex items-start gap-3 mb-4">
            <Upload className={`h-6 w-6 shrink-0 mt-0.5 ${bothLoaded ? "text-green-500" : "text-gray-400"}`} />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Drop your weekly Breadcrumb exports here
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Upload both CSVs at once — Site Briefings and Approvals
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Covers the 7-day period: {sevenDayRangeLabel()}
              </p>
            </div>
          </div>

          {/* File confirmation pills */}
          {eitherLoaded ? (
            <div className="flex gap-3 flex-wrap">
              {briefings ? (
                <FilePill
                  label="Site Briefings"
                  filename={briefings.filename}
                  uploadTime={briefings.uploadTime}
                />
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                  <span className="text-amber-700 font-medium">Site Briefings still needed</span>
                </div>
              )}
              {approvals ? (
                <FilePill
                  label="Approvals"
                  filename={approvals.filename}
                  uploadTime={approvals.uploadTime}
                />
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                  <span className="text-amber-700 font-medium">Approvals report still needed</span>
                </div>
              )}
              {bothLoaded && (
                <p className="w-full text-xs text-gray-400 mt-1">Click or drop to replace files</p>
              )}
            </div>
          ) : (
            <p className="text-xs text-blue-500">Click to browse or drag both .csv files here</p>
          )}
        </div>
      </div>

      {/* Parse errors */}
      {errors.length > 0 && (
        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-xs font-semibold text-red-700 mb-1">Some files were skipped:</p>
          <ul className="space-y-0.5">
            {errors.map((err, i) => (
              <li key={i} className="text-xs text-red-700">• {err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Stale data warning */}
      {staleWarning && (
        <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <p className="text-xs text-amber-700">
            These reports may be from a previous week. Please upload fresh exports from Breadcrumb.
          </p>
        </div>
      )}
    </div>
  );
}
