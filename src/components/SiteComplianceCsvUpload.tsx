"use client";

// ─── SiteComplianceCsvUpload ───────────────────────────────────────────────────
// Two drag-and-drop CSV upload zones side by side.
// Parses CSVs client-side (no dependencies) and calls onParsed.
// Warns when data appears to be from a previous week.

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
    if (!isNaN(d.getTime()) && (latest === null || d > latest)) {
      latest = d;
    }
  }
  return latest;
}

// ── Single zone ────────────────────────────────────────────────────────────────

interface ZoneProps {
  label: string;
  hint: string;
  dateColumn: string;
  onParsed: (rows: Record<string, string>[], filename: string, uploadTime: Date) => void;
}

function CsvZone({ label, hint, dateColumn, onParsed }: ZoneProps) {
  const [isDragging, setIsDragging]     = useState(false);
  const [filename, setFilename]         = useState<string | null>(null);
  const [uploadTime, setUploadTime]     = useState<Date | null>(null);
  const [staleWarning, setStaleWarning] = useState(false);
  const [parseError, setParseError]     = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        setParseError("Please upload a .csv file.");
        return;
      }
      setParseError(null);

      const reader = new FileReader();
      reader.onload = e => {
        const text = e.target?.result as string;
        try {
          const rows = parseCSV(text);
          const now  = new Date();
          setFilename(file.name);
          setUploadTime(now);

          // Check staleness — warn if most recent date > 7 days ago.
          const latest = mostRecentDate(rows, dateColumn);
          if (latest) {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            setStaleWarning(latest < sevenDaysAgo);
          } else {
            setStaleWarning(false);
          }

          onParsed(rows, file.name, now);
        } catch {
          setParseError("Failed to parse CSV — please check the file format.");
        }
      };
      reader.readAsText(file);
    },
    [dateColumn, onParsed]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const loaded = !!filename;

  return (
    <div className="flex-1 min-w-0">
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={e => { e.preventDefault(); setIsDragging(false); }}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          "cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : loaded
              ? "border-green-300 bg-green-50 hover:border-green-400"
              : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={onInputChange}
          className="hidden"
        />

        {loaded ? (
          <div className="flex flex-col items-center gap-1.5">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <p className="text-sm font-semibold text-green-700 truncate max-w-full">{filename}</p>
            <p className="text-xs text-gray-400">
              Uploaded {uploadTime?.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className="text-xs text-blue-500 mt-1">Click or drop to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-sm font-semibold text-gray-700">{label}</p>
            <p className="text-xs text-gray-500">{hint}</p>
            <p className="text-xs text-blue-500 mt-1">Click or drag .csv here</p>
          </div>
        )}
      </div>

      {parseError && (
        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {parseError}
        </div>
      )}

      {staleWarning && (
        <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <p className="text-xs text-amber-700">
            This report may be from a previous week. Upload a fresh export from Breadcrumb.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Public component ───────────────────────────────────────────────────────────

interface Props {
  onBriefingsParsed: (rows: Record<string, string>[], filename: string, uploadTime: Date) => void;
  onApprovalsParsed: (rows: Record<string, string>[], filename: string, uploadTime: Date) => void;
}

export default function SiteComplianceCsvUpload({ onBriefingsParsed, onApprovalsParsed }: Props) {
  return (
    <div className="flex gap-4">
      <CsvZone
        label="Site Briefings report"
        hint="From Breadcrumb → Reports → Site Briefings"
        dateColumn="Date Submitted"
        onParsed={onBriefingsParsed}
      />
      <CsvZone
        label="Approvals report"
        hint="From Breadcrumb → Reports → Approvals"
        dateColumn="Date Submitted"
        onParsed={onApprovalsParsed}
      />
    </div>
  );
}
