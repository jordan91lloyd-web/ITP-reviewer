// Registers the local dev server as an MCP server in Claude Code.
//
// Reads MCP_BEARER_TOKEN straight out of .env.local so the token is never
// copied by hand — pasting a command with the placeholder left in has bitten
// us more than once, and it fails as a confusing 401 rather than an obvious
// error.
//
// Run from the repo root:  node scripts/register-local-mcp.js

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const NAME = "holdpoint-local";
const URL = "http://localhost:3010/api/mcp";

const envPath = path.join(process.cwd(), ".env.local");

if (!fs.existsSync(envPath)) {
  console.error("Could not find .env.local. Run this from the repo root:");
  console.error("  cd C:\\Projects\\procore-itp-reviewer");
  console.error("  node scripts/register-local-mcp.js");
  process.exit(1);
}

const env = fs.readFileSync(envPath, "utf8");
const match = env.match(/^MCP_BEARER_TOKEN=(.*)$/m);

if (!match || !match[1].trim()) {
  console.error("MCP_BEARER_TOKEN is missing or empty in .env.local.");
  process.exit(1);
}

const token = match[1].trim();

if (token.includes("PASTE") || token.length < 16) {
  console.error(`MCP_BEARER_TOKEN does not look like a real token: "${token}"`);
  process.exit(1);
}

console.log(`Token found, ${token.length} characters. Registering ${NAME}…\n`);

try {
  execSync(`claude mcp remove ${NAME}`, { stdio: "ignore" });
  console.log(`Removed the existing ${NAME} registration.`);
} catch {
  // Nothing registered yet — fine.
}

try {
  // Output is captured, NOT inherited. `claude mcp add` echoes the full
  // Authorization header back, and that output has ended up pasted into a
  // chat more than once. The token never reaches the screen from here.
  execSync(
    `claude mcp add -t http ${NAME} ${URL} -H "Authorization: Bearer ${token}"`,
    { stdio: ["ignore", "pipe", "pipe"] }
  );
  console.log(`Registered ${NAME} at ${URL}.`);
} catch (err) {
  console.error("\nFailed to register. Is the Claude Code CLI on your PATH?");
  process.exit(1);
}

console.log("\nChecking it connected…\n");

try {
  execSync("claude mcp list", { stdio: "inherit" });
} catch {
  console.error("Could not run 'claude mcp list'.");
}

console.log(
  `\nIf ${NAME} says Failed to connect, your dev server is not running.` +
  `\nStart it in another terminal with: npm run dev`
);
