// ─── Audit Service ────────────────────────────────────────────────────────────
// Writes structured audit events to the audit_log Supabase table.
//
// IMPORTANT: logAuditEvent() NEVER throws. Any failure is logged to console
// only — audit logging must not interrupt the main application flow.

import { createClient } from "@supabase/supabase-js";
import { getProcoreUser } from "@/lib/procore";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

// ── Action constants ───────────────────────────────────────────────────────────

export const AUDIT_ACTIONS = {
  REVIEW_RUN:              "review_run",
  REVIEW_FAILED:           "review_failed",
  SCORE_OVERRIDE:          "score_override",
  PDF_EXPORTED:            "pdf_exported",
  BULK_REVIEW_STARTED:     "bulk_review_started",
  BULK_REVIEW_COMPLETED:   "bulk_review_completed",
  LOGIN:                   "login",
  LOGOUT:                  "logout",
} as const;

export type AuditAction = typeof AUDIT_ACTIONS[keyof typeof AUDIT_ACTIONS];

// ── Event interface ────────────────────────────────────────────────────────────

export interface AuditEvent {
  company_id:   string;
  user_id:      string;
  user_name:    string;
  user_email?:  string;
  action:       AuditAction;
  entity_type?: "inspection" | "project";
  entity_id?:   string;
  entity_name?: string;
  project_id?:  string;
  project_name?: string;
  details?:     Record<string, unknown>;
}

// ── Row type returned from the DB ──────────────────────────────────────────────

export interface AuditLogRow extends AuditEvent {
  id:         string;
  created_at: string;
}

// ── Core log function ──────────────────────────────────────────────────────────

export async function logAuditEvent(event: AuditEvent): Promise<void> {
  try {
    const { error } = await supabase.from("audit_log").insert({
      company_id:   event.company_id,
      user_id:      event.user_id,
      user_name:    event.user_name,
      user_email:   event.user_email   ?? null,
      action:       event.action,
      entity_type:  event.entity_type  ?? null,
      entity_id:    event.entity_id    ?? null,
      entity_name:  event.entity_name  ?? null,
      project_id:   event.project_id   ?? null,
      project_name: event.project_name ?? null,
      details:      event.details      ?? null,
    });
    if (error) {
      console.error("[audit] Failed to write audit event:", error.message);
    }
  } catch (err) {
    console.error("[audit] Unexpected error:", err instanceof Error ? err.message : String(err));
  }
}

// ── User resolution ────────────────────────────────────────────────────────────
// Resolves a Procore access token to audit user fields.
// Returns anonymous identity if the token is missing or the API call fails —
// so callers can always proceed without checking the result.

export async function resolveAuditUser(
  accessToken: string | undefined
): Promise<{ user_id: string; user_name: string; user_email: string }> {
  if (!accessToken) {
    return { user_id: "anonymous", user_name: "Anonymous", user_email: "" };
  }
  try {
    const user = await getProcoreUser(accessToken);
    return {
      user_id:    String(user.id),
      user_name:  user.name,
      user_email: user.login,
    };
  } catch {
    return { user_id: "unknown", user_name: "Unknown User", user_email: "" };
  }
}
