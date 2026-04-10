// ─── File validation helpers ───────────────────────────────────────────────

/** Allowed MIME types and their friendly labels */
export const ALLOWED_TYPES: Record<string, string> = {
  "application/pdf": "PDF",
  "image/jpeg": "JPEG",
  "image/jpg": "JPG",
  "image/png": "PNG",
};

/** Max size per file: 20 MB */
export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

/** Max total bundle size: 50 MB */
export const MAX_BUNDLE_SIZE_BYTES = 50 * 1024 * 1024;

/** Max number of files in one bundle */
export const MAX_FILE_COUNT = 20;

export function isAllowedType(mimeType: string): boolean {
  return mimeType in ALLOWED_TYPES;
}

export function isTooLarge(bytes: number): boolean {
  return bytes > MAX_FILE_SIZE_BYTES;
}

/** Returns a human-readable file size string, e.g. "4.2 MB" */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Friendly label for a MIME type */
export function fileTypeLabel(mimeType: string): string {
  return ALLOWED_TYPES[mimeType] ?? mimeType;
}
