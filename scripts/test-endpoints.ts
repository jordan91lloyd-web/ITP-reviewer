// ─── Test Procore Endpoints ─────────────────────────────────────────────────
// Reads .env.local, gets a valid access token from Supabase procore_tokens,
// then probes a list of Procore REST endpoints and reports status/shape.

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

// Parse .env.local manually (no dotenv dependency)
const envText = readFileSync(".env.local", "utf-8");
for (const line of envText.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq < 0) continue;
  const key = trimmed.slice(0, eq).trim();
  const val = trimmed.slice(eq + 1).trim();
  if (!process.env[key]) process.env[key] = val;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const COMPANY_ID   = process.env.FLEEK_COMPANY_ID!;
const USER_ID      = process.env.MCP_PROCORE_USER_ID!;
const PROJECT_ID   = "598134326053879";
const BASE         = "https://api.procore.com/rest/v1.0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getAccessToken(): Promise<string> {
  const { data, error } = await supabase
    .from("procore_tokens")
    .select("access_token, refresh_token, expires_at")
    .eq("company_id", COMPANY_ID)
    .eq("user_id", USER_ID)
    .single();

  if (error || !data) {
    throw new Error(`Failed to get token: ${error?.message ?? "no row"}`);
  }

  const now = Math.floor(Date.now() / 1000);
  if (data.expires_at > now + 60) {
    console.log(`Token valid (expires in ${data.expires_at - now}s)\n`);
    return data.access_token;
  }

  // Token expired — refresh it
  console.log("Token expired, refreshing...");
  const res = await fetch("https://login.procore.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "refresh_token",
      refresh_token: data.refresh_token,
      client_id:     process.env.PROCORE_CLIENT_ID!,
      client_secret: process.env.PROCORE_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Token refresh failed: ${res.status} ${body}`);
  }

  const tokens = await res.json();
  const newExpiry = Math.floor(Date.now() / 1000) + tokens.expires_in;

  await supabase
    .from("procore_tokens")
    .update({
      access_token:  tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at:    newExpiry,
      updated_at:    new Date().toISOString(),
    })
    .eq("company_id", COMPANY_ID)
    .eq("user_id", USER_ID);

  console.log(`Token refreshed (expires in ${tokens.expires_in}s)\n`);
  return tokens.access_token;
}

interface EndpointDef {
  name: string;
  url: string;
}

const endpoints: EndpointDef[] = [
  {
    name: "work_order_contracts (subcontracts)",
    url:  `${BASE}/work_order_contracts?project_id=${PROJECT_ID}&company_id=${COMPANY_ID}&view=default`,
  },
  {
    name: "purchase_order_contracts (POs)",
    url:  `${BASE}/purchase_order_contracts?project_id=${PROJECT_ID}&company_id=${COMPANY_ID}`,
  },
  {
    name: "direct_costs",
    url:  `${BASE}/projects/${PROJECT_ID}/direct_costs?company_id=${COMPANY_ID}`,
  },
  {
    name: "budget_line_items",
    url:  `${BASE}/budget_line_items?project_id=${PROJECT_ID}&company_id=${COMPANY_ID}`,
  },
  {
    name: "rfis",
    url:  `${BASE}/projects/${PROJECT_ID}/rfis?company_id=${COMPANY_ID}`,
  },
  {
    name: "submittals",
    url:  `${BASE}/projects/${PROJECT_ID}/submittals?company_id=${COMPANY_ID}`,
  },
  {
    name: "change_events",
    url:  `${BASE}/projects/${PROJECT_ID}/change_events?company_id=${COMPANY_ID}`,
  },
  {
    name: "payment_applications_owner_invoices",
    url:  `${BASE}/payment_applications_owner_invoices?project_id=${PROJECT_ID}&company_id=${COMPANY_ID}`,
  },
  {
    name: "potential_change_orders (PCOs)",
    url:  `${BASE}/projects/${PROJECT_ID}/potential_change_orders?company_id=${COMPANY_ID}`,
  },
  // ── Round 2: alternative paths for 404s ──
  {
    name: "change_events (v1.1)",
    url:  `https://api.procore.com/rest/v1.1/projects/${PROJECT_ID}/change_events?company_id=${COMPANY_ID}`,
  },
  {
    name: "change_order_packages",
    url:  `${BASE}/change_order_packages?project_id=${PROJECT_ID}&company_id=${COMPANY_ID}`,
  },
  {
    name: "change_order_requests (v1.0 flat)",
    url:  `${BASE}/change_order_requests?project_id=${PROJECT_ID}&company_id=${COMPANY_ID}`,
  },
  {
    name: "potential_change_orders (flat)",
    url:  `${BASE}/potential_change_orders?project_id=${PROJECT_ID}&company_id=${COMPANY_ID}`,
  },
  {
    name: "payment_applications (v1.0 flat)",
    url:  `${BASE}/payment_applications?project_id=${PROJECT_ID}&company_id=${COMPANY_ID}`,
  },
  {
    name: "prime_contracts",
    url:  `${BASE}/prime_contracts?project_id=${PROJECT_ID}&company_id=${COMPANY_ID}`,
  },
  {
    name: "commitments (v1.1)",
    url:  `https://api.procore.com/rest/v1.1/projects/${PROJECT_ID}/commitments?company_id=${COMPANY_ID}`,
  },
  {
    name: "observations",
    url:  `${BASE}/projects/${PROJECT_ID}/observations?company_id=${COMPANY_ID}`,
  },
  {
    name: "incidents",
    url:  `${BASE}/projects/${PROJECT_ID}/incidents?company_id=${COMPANY_ID}`,
  },
  {
    name: "punch_items",
    url:  `${BASE}/projects/${PROJECT_ID}/punch_items?company_id=${COMPANY_ID}`,
  },
];

function truncateKeys(obj: Record<string, unknown>): string[] {
  return Object.keys(obj).slice(0, 30);
}

async function probeEndpoint(
  ep: EndpointDef,
  token: string,
): Promise<void> {
  console.log(`── ${ep.name} ──`);
  console.log(`   URL: ${ep.url}`);

  try {
    const res = await fetch(ep.url, {
      headers: {
        Authorization:        `Bearer ${token}`,
        "Procore-Company-Id": COMPANY_ID,
      },
      signal: AbortSignal.timeout(15_000),
    });

    const xTotal = res.headers.get("X-Total") ?? res.headers.get("total");

    let body: unknown;
    try { body = await res.json(); } catch { body = null; }

    if (!res.ok) {
      const msg = typeof body === "object" && body !== null && "message" in body
        ? (body as Record<string, unknown>).message
        : typeof body === "object" && body !== null && "errors" in body
          ? JSON.stringify((body as Record<string, unknown>).errors)
          : `HTTP ${res.status}`;
      console.log(`   STATUS: ${res.status} ERROR`);
      console.log(`   Error: ${msg}`);
      if (body && typeof body === "object") {
        console.log(`   Full error body: ${JSON.stringify(body).slice(0, 300)}`);
      }
      console.log();
      return;
    }

    const arr = Array.isArray(body) ? body : null;
    const total = xTotal ? parseInt(xTotal, 10) : (arr ? arr.length : null);

    console.log(`   STATUS: ${res.status} OK`);
    console.log(`   Total items: ${total}`);
    if (xTotal) console.log(`   X-Total header: ${xTotal}`);

    if (arr && arr.length > 0) {
      const first = arr[0];
      console.log(`   First item keys: ${truncateKeys(first).join(", ")}`);
      // Show a few interesting fields
      const interesting = ["id", "title", "number", "status", "subject", "description", "vendor", "grand_total", "amount"];
      for (const k of interesting) {
        if (k in first) {
          const val = first[k];
          const display = typeof val === "object" ? JSON.stringify(val)?.slice(0, 120) : String(val).slice(0, 120);
          console.log(`   first.${k} = ${display}`);
        }
      }
    } else if (arr && arr.length === 0) {
      console.log(`   (empty array)`);
    } else if (body && typeof body === "object") {
      console.log(`   Response keys: ${truncateKeys(body as Record<string, unknown>).join(", ")}`);
    }
  } catch (err) {
    console.log(`   STATUS: NETWORK ERROR`);
    console.log(`   Error: ${err instanceof Error ? err.message : String(err)}`);
  }

  console.log();
}

async function main() {
  console.log(`Testing ${endpoints.length} Procore endpoints`);
  console.log(`Project: ${PROJECT_ID}  Company: ${COMPANY_ID}\n`);

  const token = await getAccessToken();

  for (const ep of endpoints) {
    await probeEndpoint(ep, token);
    // 600ms delay between requests
    await new Promise(r => setTimeout(r, 600));
  }

  console.log("Done.");
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
