/**
 * Screenshot utility for autonomous UI review.
 *
 * Usage:
 *   npx tsx scripts/screenshot.ts [url-path] [--full] [--width=1280]
 *
 * Examples:
 *   npx tsx scripts/screenshot.ts /dashboard
 *   npx tsx scripts/screenshot.ts /dashboard --full
 *   npx tsx scripts/screenshot.ts / --width=1440
 *
 * Screenshots are saved to screenshots/ directory.
 * Claude Code can read them with the Read tool to review the UI.
 */

import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const args = process.argv.slice(2);

// Parse arguments
const urlPath = args.find((a) => !a.startsWith("--")) || "/";
const fullPage = args.includes("--full");
const widthArg = args.find((a) => a.startsWith("--width="));
const width = widthArg ? parseInt(widthArg.split("=")[1]) : 1280;
const port = process.env.PORT || "3010";
const baseUrl = `http://localhost:${port}`;

const screenshotDir = path.join(process.cwd(), "screenshots");

async function takeScreenshot() {
  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width, height: 900 },
  });
  const page = await context.newPage();

  const url = `${baseUrl}${urlPath}`;
  console.log(`Navigating to ${url}...`);

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  } catch (e) {
    // networkidle can be flaky, fall back to load
    console.log("networkidle timeout, using load event...");
    await page.goto(url, { waitUntil: "load", timeout: 15000 });
    // Give React a moment to render
    await page.waitForTimeout(2000);
  }

  // Wait a bit for any client-side rendering
  await page.waitForTimeout(1000);

  // Generate filename from path
  const safeName = urlPath.replace(/\//g, "_").replace(/^_/, "") || "home";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const filename = `${safeName}_${timestamp}.png`;
  const filepath = path.join(screenshotDir, filename);

  await page.screenshot({
    path: filepath,
    fullPage,
  });

  console.log(`Screenshot saved: screenshots/${filename}`);

  // Also save a "latest" version for easy access
  const latestPath = path.join(screenshotDir, `${safeName}_latest.png`);
  fs.copyFileSync(filepath, latestPath);
  console.log(`Latest copy: screenshots/${safeName}_latest.png`);

  await browser.close();
}

takeScreenshot().catch((err) => {
  console.error("Screenshot failed:", err.message);
  process.exit(1);
});
