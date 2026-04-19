"use client";

// ─── UploadPortal ─────────────────────────────────────────────────────────
// The upload form. No user-supplied metadata — just files.
// Claude automatically extracts the project name, ITP number, and other
// header fields from the uploaded documents.

import { useState } from "react";
import DropZone from "./DropZone";
import ReviewResults from "./ReviewResults";
import type { ReviewResult } from "@/lib/types";

export default function UploadPortal() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<ReviewResult | null>(null);

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      return [...prev, ...newFiles.filter((f) => !existing.has(f.name))];
    });
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (files.length === 0) {
      return setErrorMessage("Please add at least one document before running the review.");
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      // Debug: confirm all files are in FormData before sending
      console.log(`[upload] Submitting ${files.length} file(s):`, files.map((f) => f.name));

      const response = await fetch("/api/review", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      } else {
        setResult(data.result);
      }
    } catch {
      setErrorMessage(
        "Could not reach the review service. Make sure the dev server is running and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage(null);
    setFiles([]);
  };

  if (result) {
    return <ReviewResults result={result} onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── Drop zone ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <DropZone
          files={files}
          onFilesAdded={handleFilesAdded}
          onRemove={handleRemove}
          disabled={isLoading}
        />

        {files.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {files.length} file{files.length !== 1 ? "s" : ""} selected
            </span>
            <span className="text-xs text-gray-500">
              — all will be reviewed together as one bundle
            </span>
          </div>
        )}
      </div>

      {/* ── Error message ── */}
      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 leading-relaxed">
          <span className="font-semibold">Error: </span>{errorMessage}
        </div>
      )}

      {/* ── Submit button ── */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-[#1F3864] px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#253f77] active:bg-[#162a4a] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <Spinner />
              Reviewing {files.length} file{files.length !== 1 ? "s" : ""} — this takes 30–90 seconds…
            </span>
          ) : (
            "Run QA Review"
          )}
        </button>

        {!isLoading && (
          <p className="mt-2 text-center text-xs text-gray-400">
            Your documents are sent to Claude and not saved anywhere.
          </p>
        )}

        {isLoading && (
          <p className="mt-2 text-center text-xs text-gray-400">
            Claude is reading your documents and extracting the package details. Please wait.
          </p>
        )}
      </div>

    </form>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
