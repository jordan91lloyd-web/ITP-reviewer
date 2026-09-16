import {
  Plus,
  Minus,
  ArrowRightLeft,
  MoveRight,
} from "lucide-react";

export const CATEGORY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  inclusion: { label: "Inclusion", color: "var(--hp-compliant)", bg: "var(--hp-compliant-bg)" },
  exclusion: { label: "Exclusion", color: "var(--hp-critical)", bg: "var(--hp-critical-bg)" },
  allowance: { label: "Allowance", color: "var(--hp-minor)", bg: "var(--hp-minor-bg)" },
  specification: { label: "Specification", color: "var(--hp-minor)", bg: "var(--hp-minor-bg)" },
  condition: { label: "Condition", color: "var(--hp-significant)", bg: "var(--hp-significant-bg)" },
};

export const STATUS_OPTIONS: { value: "needs_review" | "not_a_variation" | "variation_raised"; label: string; color: string; bg: string }[] = [
  { value: "needs_review", label: "Needs Review", color: "var(--hp-significant)", bg: "var(--hp-significant-bg)" },
  { value: "not_a_variation", label: "Not a Variation", color: "var(--hp-compliant)", bg: "var(--hp-compliant-bg)" },
  { value: "variation_raised", label: "Variation Raised", color: "var(--hp-critical)", bg: "var(--hp-critical-bg)" },
];

export const CHANGE_TYPE_LABELS: Record<string, string> = {
  addition: "Addition",
  deletion: "Deletion",
  spec_change: "Spec Change",
  relocation: "Relocation",
};

export const CHANGE_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  addition: { bg: "var(--hp-compliant-bg)", text: "var(--hp-compliant)" },
  deletion: { bg: "var(--hp-critical-bg)", text: "var(--hp-critical)" },
  spec_change: { bg: "var(--hp-significant-bg)", text: "var(--hp-significant)" },
  relocation: { bg: "var(--hp-minor-bg)", text: "var(--hp-minor)" },
};

export const SEVERITY_COLORS: Record<string, { bg: string; text: string }> = {
  high: { bg: "var(--hp-critical-bg)", text: "var(--hp-critical)" },
  medium: { bg: "var(--hp-significant-bg)", text: "var(--hp-significant)" },
  low: { bg: "var(--hp-compliant-bg)", text: "var(--hp-compliant)" },
};

export const VARIATION_RISK_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  likely_variation: { label: "Likely Variation", bg: "var(--hp-critical-bg)", text: "var(--hp-critical)" },
  within_scope: { label: "Within Scope", bg: "var(--hp-compliant-bg)", text: "var(--hp-compliant)" },
  unclear: { label: "Unclear", bg: "var(--hp-significant-bg)", text: "var(--hp-significant)" },
};

export const CHANGE_TYPE_ICONS: Record<string, typeof Plus> = {
  addition: Plus,
  deletion: Minus,
  spec_change: ArrowRightLeft,
  relocation: MoveRight,
};

export const SEV_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };
export const RISK_ORDER: Record<string, number> = { likely_variation: 0, unclear: 1, within_scope: 2 };

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const BTN_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  borderRadius: 8,
  border: "1px solid var(--hp-border)",
  padding: "5px 12px",
  fontSize: 12,
  fontWeight: 500,
  color: "var(--hp-text-secondary)",
  textDecoration: "none",
  background: "var(--hp-surface)",
  cursor: "pointer",
};
