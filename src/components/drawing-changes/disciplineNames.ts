// TODO: Confirm discipline code mapping with Jordy — codes beyond A/S/M/E/H/F/C/L/WG/INT are unverified

export const DISCIPLINE_NAMES: Record<string, string> = {
  "A": "Architectural (A)",
  "S": "Structural (S)",
  "M": "Mechanical (M)",
  "E": "Electrical (E)",
  "H": "Hydraulic (H)",
  "F": "Fire (F)",
  "C": "Civil (C)",
  "L": "Landscape (L)",
  "WG": "Waterproofing (WG)",
  "INT": "Interior (INT)",
};

export function friendlyDiscipline(raw: string): string {
  // Try exact match first
  if (DISCIPLINE_NAMES[raw]) return DISCIPLINE_NAMES[raw];
  // Try matching the prefix (e.g. "Architectural" -> check if it starts with a known code)
  const upper = raw.toUpperCase();
  for (const [code, name] of Object.entries(DISCIPLINE_NAMES)) {
    if (upper === code || upper.startsWith(code + " ") || upper.startsWith(code + "-")) return name;
  }
  // Fallback: return raw string as-is
  return raw;
}
