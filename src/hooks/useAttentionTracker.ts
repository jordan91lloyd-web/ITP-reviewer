"use client";

// ─── useAttentionTracker ───────────────────────────────────────────────────────
// Tracks active time for a project and writes it to the monitoring API.
//
// Rules:
//  - Only counts time when the browser tab is visible
//  - Pauses after 2 minutes of no user activity (mouse/key/click/scroll)
//  - Heartbeat every 30 seconds while active
//  - Uses sendBeacon (or keepalive fetch) on unmount for reliable final update
//  - All API failures are caught silently — never throws or affects the UI
//  - Sessions with active_seconds < 120 are excluded from attention queries
//    (so short accidental visits don't pollute the data)

import { useEffect, useRef } from "react";

interface Options {
  project_id:   string | null;
  project_name: string;
  company_id:   string | null;
  enabled:      boolean;
}

const IDLE_TIMEOUT_MS  = 120_000; // 2 minutes
const HEARTBEAT_MS     = 30_000;  // 30 seconds

export function useAttentionTracker({
  project_id,
  project_name,
  company_id,
  enabled,
}: Options) {
  const sessionIdRef      = useRef<string | null>(null);
  const activeSecondsRef  = useRef(0);
  const isIdleRef         = useRef(false);
  const lastActivityRef   = useRef(Date.now());
  const tickRef           = useRef<ReturnType<typeof setInterval> | null>(null);
  const heartbeatRef      = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!enabled || !project_id || !company_id) return;

    let mounted = true;

    // ── Start session ──────────────────────────────────────────────────────────
    async function startSession() {
      try {
        const res = await fetch("/api/monitoring/session/start", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ project_id, project_name, company_id }),
        });
        if (!res.ok) return;
        const data = await res.json() as { session_id?: string };
        if (mounted && data.session_id) {
          sessionIdRef.current = data.session_id;
        }
      } catch {
        // fail silently
      }
    }

    startSession();

    // ── Tick every second — count active time ──────────────────────────────────
    tickRef.current = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastActivityRef.current > IDLE_TIMEOUT_MS) {
        isIdleRef.current = true;
      }
      if (!isIdleRef.current) {
        activeSecondsRef.current += 1;
      }
    }, 1_000);

    // ── Activity listeners — reset idle timer ──────────────────────────────────
    function onActivity() {
      lastActivityRef.current = Date.now();
      isIdleRef.current       = false;
    }

    window.addEventListener("mousemove", onActivity, { passive: true });
    window.addEventListener("keydown",   onActivity, { passive: true });
    window.addEventListener("click",     onActivity, { passive: true });
    window.addEventListener("scroll",    onActivity, { passive: true });

    // ── Heartbeat every 30 seconds ─────────────────────────────────────────────
    heartbeatRef.current = setInterval(async () => {
      if (!sessionIdRef.current) return;
      try {
        await fetch("/api/monitoring/session/heartbeat", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            session_id:     sessionIdRef.current,
            active_seconds: activeSecondsRef.current,
          }),
        });
      } catch {
        // fail silently
      }
    }, HEARTBEAT_MS);

    // ── Cleanup ────────────────────────────────────────────────────────────────
    return () => {
      mounted = false;
      if (tickRef.current)      clearInterval(tickRef.current);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown",   onActivity);
      window.removeEventListener("click",     onActivity);
      window.removeEventListener("scroll",    onActivity);

      if (!sessionIdRef.current) return;

      const payload = JSON.stringify({
        session_id:     sessionIdRef.current,
        active_seconds: activeSecondsRef.current,
      });

      // sendBeacon is more reliable on page unload than fetch
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/monitoring/session/end", blob);
      } else {
        fetch("/api/monitoring/session/end", {
          method:    "POST",
          headers:   { "Content-Type": "application/json" },
          body:      payload,
          keepalive: true,
        }).catch(() => {});
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, project_id, company_id]);
  // project_name intentionally excluded — changes should not restart the session
}
