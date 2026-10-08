/**
 * Authenticated screenshot utility.
 * Fetches a valid token from the token store API and sets it as a cookie
 * so the dashboard renders fully.
 *
 * Usage:
 *   npx tsx scripts/screenshot-auth.ts [url-path] [--full] [--width=1280] [--click=selector] [--wait=ms]
 */

import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

// Load env vars from .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

const args = process.argv.slice(2);
const urlPath = args.find((a) => !a.startsWith("--")) || "/dashboard";
const fullPage = args.includes("--full");
const widthArg = args.find((a) => a.startsWith("--width="));
const width = widthArg ? parseInt(widthArg.split("=")[1]) : 1440;
const clickArg = args.find((a) => a.startsWith("--click="));
const clickText = clickArg ? clickArg.split("=").slice(1).join("=") : null;
const waitArg = args.find((a) => a.startsWith("--wait="));
const waitMs = waitArg ? parseInt(waitArg.split("=")[1]) : 3000;
const port = process.env.PORT || "3010";
const baseUrl = `http://localhost:${port}`;
const screenshotDir = path.join(process.cwd(), "screenshots");

async function getToken(): Promise<string | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const companyId = process.env.FLEEK_COMPANY_ID;
  const userId = process.env.MCP_PROCORE_USER_ID;

  if (!supabaseUrl || !supabaseKey || !companyId || !userId) {
    console.log("Missing env vars for token fetch");
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase
    .from("procore_tokens")
    .select("access_token, expires_at")
    .eq("company_id", companyId)
    .eq("user_id", userId)
    .single();

  if (!data) {
    console.log("No token found in procore_tokens");
    return null;
  }

  return data.access_token;
}

async function takeScreenshot() {
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const token = await getToken();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width, height: 900 },
  });

  if (token) {
    await context.addCookies([
      {
        name: "procore_access_token",
        value: token,
        domain: "localhost",
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
      },
    ]);
  }

  const page = await context.newPage();
  const url = `${baseUrl}${urlPath}`;
  console.log(`Navigating to ${url}${token ? " (authenticated)" : ""}...`);

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  } catch {
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(5000);
  }

  await page.waitForTimeout(2000);

  // Click a button/tab by text if requested
  if (clickText) {
    console.log(`Clicking button: "${clickText}"...`);
    try {
      await page.click(`button:has-text("${clickText}")`, { timeout: 5000 });
      console.log(`Clicked. Waiting ${waitMs}ms...`);
      await page.waitForTimeout(waitMs);
    } catch (e) {
      console.log(`Click failed: ${(e as Error).message}`);
    }
  }

  const safeName = (clickText
    ? `${urlPath}_${clickText}`.replace(/[^a-zA-Z0-9]/g, "_")
    : urlPath.replace(/\//g, "_").replace(/^_/, "")
  ) || "home";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const filename = `${safeName}_${timestamp}.png`;
  const filepath = path.join(screenshotDir, filename);

  await page.screenshot({ path: filepath, fullPage });

  const latestPath = path.join(screenshotDir, `${safeName}_latest.png`);
  fs.copyFileSync(filepath, latestPath);
  console.log(`Screenshot saved: screenshots/${filename}`);
  console.log(`Latest copy: screenshots/${safeName}_latest.png`);

  await browser.close();
}

takeScreenshot().catch((err) => {
  console.error("Screenshot failed:", err.message);
  process.exit(1);
});
