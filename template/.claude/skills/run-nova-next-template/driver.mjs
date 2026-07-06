#!/usr/bin/env node
// Driver for nova-next-template: launches Chrome headless to screenshot
// (and HTTP-check) routes of the running Next.js dev server.
//
// Prereq: the dev server must already be running (npm run dev). It serves
// on http://localhost:3000 by default, or 3001 if 3000 is taken.
//
// Usage:
//   node .claude/skills/run-nova-next-template/driver.mjs [route ...]
//   node .claude/skills/run-nova-next-template/driver.mjs --base http://localhost:3001 /login /components
//
// With no routes it shoots the default set. Screenshots land in
// .tmp-run-shots/<slug>.png (relative to cwd). Exit code is non-zero if any
// route returns a non-2xx/3xx status, so it doubles as a smoke test.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const DEFAULT_ROUTES = ["/", "/login", "/register", "/components", "/dashboard"];
const WINDOW = "1440,900";

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    // Windows
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    // Linux
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    // macOS
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  const hit = candidates.find((p) => existsSync(p));
  if (!hit) {
    console.error(
      "No Chrome/Edge/Chromium found. Set CHROME_PATH to the browser binary."
    );
    process.exit(2);
  }
  return hit;
}

async function httpStatus(url) {
  try {
    const res = await fetch(url, { redirect: "manual" });
    return res.status;
  } catch (e) {
    return 0;
  }
}

const args = process.argv.slice(2);
let base = "http://localhost:3000";
const routes = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--base") base = args[++i];
  else routes.push(args[i]);
}
const targets = routes.length ? routes : DEFAULT_ROUTES;

const chrome = findChrome();
const outDir = resolve(process.cwd(), ".tmp-run-shots");
mkdirSync(outDir, { recursive: true });

let failures = 0;
for (const route of targets) {
  const url = base + route;
  const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
  const out = resolve(outDir, `${slug}.png`);
  const status = await httpStatus(url);
  const ok = status >= 200 && status < 400;
  if (!ok) failures++;
  try {
    execFileSync(
      chrome,
      [
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        `--window-size=${WINDOW}`,
        `--screenshot=${out}`,
        url,
      ],
      { stdio: "ignore", timeout: 30000 }
    );
  } catch {
    // chrome headless still writes the file on most failures; report below
  }
  const shot = existsSync(out) ? out : "(no screenshot)";
  console.log(`${ok ? "OK " : "ERR"} HTTP ${status}  ${url}  -> ${shot}`);
}

console.log(`\n${targets.length - failures}/${targets.length} routes healthy. Shots in ${outDir}`);
process.exit(failures ? 1 : 0);
