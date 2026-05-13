"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Pencil, Layers, Plus } from "lucide-react";
import type { RecentActivityEvent } from "@/app/api/dashboard/recent-activity/route";

// ── Time formatting ────────────────────────────────────────────────────────────

function timeAgo(isoString: string): string {
  const now   = new Date(new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" }));
  const then  = new Date(new Date(isoString).toLocaleString("en-AU", { timeZone: "Australia/Sydney" }));
  const diffMs = now.getTime() - then.getTime();
  const mins   = Math.floor(diffMs / 60_000);
  const hours  = Math.floor(diffMs / 3_600_000);
  const days   = Math.floor(diffMs / 86_400_000);

  if (mins < 60)  return `${Math.max(1, mins)}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// ── Icon map ───────────────────────────────────────────────────────────────────

function EventIcon({ type }: { type: RecentActivityEvent["type"] }) {
  const cls = "shrink-0";
  if (type === "review_run")            return <CheckCircle size={12} className={cls} />;
  if (type === "score_override")        return <Pencil      size={12} className={cls} />;
  if (type === "bulk_review_completed") return <Layers      size={12} className={cls} />;
  return <Plus size={12} className={cls} />;
}

// ── Loading skeleton ───────────────────────────────────────────────────────────

function SkeletonPill() {
  return (
    <div
      className="animate-pulse shrink-0"
      style={{
        display:         "inline-flex",
        width:           140,
        height:          26,
        borderRadius:    20,
        backgroundColor: "var(--hp-warm-200)",
        border:          "1px solid var(--hp-border-light)",
      }}
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  companyId: string;
}

export default function RecentActivityStrip({ companyId }: Props) {
  const [events,  setEvents]  = useState<RecentActivityEvent[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) { setLoading(false); return; }

    setLoading(true);
    fetch(`/api/dashboard/recent-activity?company_id=${encodeURIComponent(companyId)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setEvents(data.events ?? []))
      .catch(() => setEvents([]))   // fail silently
      .finally(() => setLoading(false));
  }, [companyId]);

  // Loading skeleton
  if (loading) {
    return (
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 0 8px", marginBottom: 12 }}>
        <SkeletonPill />
        <SkeletonPill />
        <SkeletonPill />
      </div>
    );
  }

  // Empty or error — show nothing
  if (!events || events.length === 0) return null;

  return (
    <div
      role="list"
      aria-label="Recent activity"
      style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 0 8px", marginBottom: 12 }}
    >
      {events.slice(0, 5).map(event => (
        <div
          key={event.id}
          role="listitem"
          title={event.project_name ? `${event.label} · ${event.project_name}` : event.label}
          style={{
            display:         "inline-flex",
            alignItems:      "center",
            gap:             6,
            padding:         "4px 10px",
            borderRadius:    20,
            backgroundColor: "var(--hp-warm-100)",
            border:          "1px solid var(--hp-border)",
            fontSize:        12,
            color:           "var(--hp-text-secondary)",
            whiteSpace:      "nowrap",
            flexShrink:      0,
          }}
        >
          {/* Icon */}
          <span style={{ color: "var(--hp-text-muted)", display: "flex", alignItems: "center" }}>
            <EventIcon type={event.type} />
          </span>

          {/* Label */}
          <span>{event.label}</span>

          {/* Time */}
          <span style={{ color: "var(--hp-text-muted)", marginLeft: 4 }}>
            {timeAgo(event.created_at)}
          </span>
        </div>
      ))}
    </div>
  );
}
