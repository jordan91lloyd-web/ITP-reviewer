// ── Holdpoint logo mark ────────────────────────────────────────────────────────
// Crosshair / hold-point target symbol.
// variant="light"  → dark strokes on light/cream backgrounds
// variant="dark"   → light strokes on dark/brown sidebar backgrounds

export default function HoldpointLogo({
  variant = "light",
  size = 32,
}: {
  variant?: "light" | "dark";
  size?: number;
}) {
  const strokeColor = variant === "light" ? "#5C4733" : "rgba(255,255,255,0.85)";
  const accentColor = variant === "light" ? "#C4924A" : "#E4AD6A";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="18" cy="18" r="13" stroke={strokeColor} strokeWidth="1.5" />
      {/* N tick */}
      <line x1="18" y1="5" x2="18" y2="9" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* S tick */}
      <line x1="18" y1="27" x2="18" y2="31" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* W tick */}
      <line x1="5" y1="18" x2="9" y2="18" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* E tick */}
      <line x1="27" y1="18" x2="31" y2="18" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* Centre dot — the hold point */}
      <circle cx="18" cy="18" r="2.5" fill={accentColor} />
      {/* Hold bar — horizontal baseline below the circle */}
      <line x1="12" y1="33" x2="24" y2="33" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
