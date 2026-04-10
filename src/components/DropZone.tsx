"use client";

// ─── DropZone component ───────────────────────────────────────────────────
// Handles drag-and-drop and file-picker uploads.
// Shows validation errors inline (no browser alert pop-ups).

import React, { useCallback, useRef, useState } from "react";
import { isAllowedType, isTooLarge, formatFileSize } from "@/lib/validation";

interface Props {
  files: File[];
  onFilesAdded: (newFiles: File[]) => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export default function DropZone({ files, onFilesAdded, onRemove, disabled }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  // Validation errors shown below the drop area (instead of alert pop-ups)
  const [dropErrors, setDropErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Validate incoming files and separate valid from invalid
  const processFiles = useCallback(
    (incoming: FileList | File[]) => {
      const arr = Array.from(incoming);
      const valid: File[] = [];
      const errors: string[] = [];

      for (const file of arr) {
        if (!isAllowedType(file.type)) {
          errors.push(`"${file.name}" — unsupported type. Use PDF, JPG, or PNG.`);
        } else if (isTooLarge(file.size)) {
          errors.push(`"${file.name}" — over the 20 MB limit.`);
        } else {
          valid.push(file);
        }
      }

      // Show errors inline
      setDropErrors(errors);

      if (valid.length) {
        onFilesAdded(valid);
      }
    },
    [onFilesAdded]
  );

  // ── Drag event handlers ──────────────────────────────────────────────────
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    processFiles(e.dataTransfer.files);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
    // Reset the input value so the same file can be re-selected after removal
    e.target.value = "";
  };

  const dropAreaClass = [
    "cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors",
    isDragging
      ? "border-blue-500 bg-blue-50"
      : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50",
    disabled ? "opacity-50 cursor-not-allowed" : "",
  ].join(" ");

  return (
    <div>
      {/* ── Drop area ── */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={dropAreaClass}
      >
        {/* Upload arrow icon */}
        <svg
          className="mx-auto mb-3 h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>

        <p className="text-sm font-medium text-gray-700">
          Drag and drop files here, or{" "}
          <span className="text-blue-600 underline">click to browse</span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PDF, JPG, or PNG — max 20 MB per file, 50 MB total bundle
        </p>

        {/* Hidden native file picker — triggered by clicking the drop area */}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={onInputChange}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* ── Inline validation errors ── */}
      {dropErrors.length > 0 && (
        <div className="mt-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-orange-700">
            Some files were skipped:
          </p>
          <ul className="space-y-0.5">
            {dropErrors.map((err, i) => (
              <li key={i} className="text-xs text-orange-700">
                • {err}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── File list ── */}
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* File type badge */}
                <span className="shrink-0 rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {file.name.split(".").pop()?.toUpperCase() ?? "FILE"}
                </span>
                {/* File name — truncated if too long */}
                <span className="truncate text-gray-700">{file.name}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="text-xs text-gray-400">{formatFileSize(file.size)}</span>
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(i);
                  }}
                  disabled={disabled}
                  className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40"
                  title={`Remove ${file.name}`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
