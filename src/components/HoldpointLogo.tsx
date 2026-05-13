// ── Holdpoint logo mark ────────────────────────────────────────────────────────
// Crosshair / hold-point target symbol.
// variant="light"  → dark strokes on light/cream backgrounds
// variant="dark"   → light strokes on dark backgrounds
// size >= 48       → enhanced hero version with inner dashed ring

export default function HoldpointLogo({
  variant = "light",
  size = 32,
}: {
  variant?: "light" | "dark";
  size?: number;
}) {
  const isLarge = size >= 48;

  // Outer circle stroke — large dark version uses softer opacity
  const strokeColor =
    variant === "light"
      ? "#5C4733"
      : isLarge
      ? "rgba(255,255,255,0.45)"
      : "rgba(255,255,255,0.85)";

  // Tick mark stroke — slightly more opaque than outer ring on large
  const tickColor =
    variant === "light"
      ? "#5C4733"
      : isLarge
      ? "rgba(255,255,255,0.5)"
      : "rgba(255,255,255,0.85)";

  const accentColor = variant === "light" ? "#C4924A" : "#C4924A";
  const holdBarWidth = isLarge ? 2.5 : 1.5;

  // Inner dashed ring — only on large dark variant
  const innerRingColor =
    variant === "dark" && isLarge ? "rgba(255,255,255,0.2)" : null;

  // outerR=13 in viewBox 0 0 36 36; innerR = outerR * 0.55
  const innerR = Math.round(13 * 0.55); // 7

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

      {/* Inner dashed ring — large hero version only */}
      {innerRingColor && (
        <circle
          cx="18"
          cy="18"
          r={innerR}
          stroke={innerRingColor}
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
        />
      )}

      {/* N tick */}
      <line x1="18" y1="5" x2="18" y2="9" stroke={tickColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* S tick */}
      <line x1="18" y1="27" x2="18" y2="31" stroke={tickColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* W tick */}
      <line x1="5" y1="18" x2="9" y2="18" stroke={tickColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* E tick */}
      <line x1="27" y1="18" x2="31" y2="18" stroke={tickColor} strokeWidth="1.5" strokeLinecap="round" />

      {/* Centre dot — the hold point */}
      <circle cx="18" cy="18" r="2.5" fill={accentColor} />

      {/* Hold bar — horizontal baseline below the circle */}
      <line
        x1="12"
        y1="33"
        x2="24"
        y2="33"
        stroke={accentColor}
        strokeWidth={holdBarWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
