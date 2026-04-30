#!/usr/bin/env node
// scripts/gen-illustration.mjs
//
// Generate an AiM-style illustration via Pollinations (free, no API key).
// Usage:
//   node scripts/gen-illustration.mjs --out calc-hero --prompt "..."
//   node scripts/gen-illustration.mjs --out calc-hero --prompt-file prompts/calc.txt
//   node scripts/gen-illustration.mjs --out calc-hero --prompt "..." --seeds 4
//
// Behavior:
//   - 1 seed   → writes public/brand/illustrations/<name>.webp (resized + optimized).
//   - N seeds  → writes tmp/illustrations/<name>-seed-<i>.png for review.
//   - Logs every run to scripts/illustration-log.jsonl.

import { readFile, writeFile, mkdir, appendFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(import.meta.url), "..", "..");

// ── tiny .env loader (no extra dep) ───────────────────────────────────────
async function loadEnv() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  const content = await readFile(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
await loadEnv();

// ── arg parsing ────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = {
    seeds: 1,
    model: "flux",
    optimize: true,
    width: 1024,
    height: 1024,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = argv[i + 1];
    if (a === "--prompt") { out.prompt = next; i++; }
    else if (a === "--prompt-file") { out.promptFile = next; i++; }
    else if (a === "--out") { out.out = next; i++; }
    else if (a === "--seeds") { out.seeds = Math.max(1, parseInt(next, 10) || 1); i++; }
    else if (a === "--model") { out.model = next; i++; }
    else if (a === "--width") { out.width = parseInt(next, 10) || 1024; i++; }
    else if (a === "--height") { out.height = parseInt(next, 10) || 1024; i++; }
    else if (a === "--no-optimize") { out.optimize = false; }
    else if (a === "--help" || a === "-h") { out.help = true; }
  }
  return out;
}

const args = parseArgs(process.argv);

if (args.help || !args.out || (!args.prompt && !args.promptFile)) {
  console.log(`
gen-illustration — AiM Insurance illustration generator (Pollinations / Flux)
─────────────────────────────────────────────────────────

Required:
  --out <name>           Output slug (no extension). Goes to public/brand/illustrations/.
  --prompt "..."         Inline prompt text.
  --prompt-file <path>   Read prompt from file (overrides --prompt).

Optional:
  --model <id>           Pollinations model. Default: flux.
                         Options: flux | flux-realism | flux-anime | turbo
  --seeds <N>            Generate N variants for review (default 1).
                         When N > 1, outputs go to tmp/illustrations/ for picking.
  --width / --height     Pixels (default 1024×1024).
  --no-optimize          Skip resize + webp conversion. Keep raw PNG.
  --help                 This help.

Example:
  node scripts/gen-illustration.mjs --out calc-hero --prompt "..."
`);
  process.exit(args.help ? 0 : 1);
}

// ── load prompt ────────────────────────────────────────────────────────────
let prompt = args.prompt;
if (args.promptFile) {
  prompt = await readFile(resolve(args.promptFile), "utf8");
}
prompt = (prompt || "").trim();
if (!prompt) {
  console.error("✗ Prompt is empty.");
  process.exit(1);
}

const ILLUSTRATIONS_DIR = join(ROOT, "public/brand/illustrations");
const TMP_DIR = join(ROOT, "tmp/illustrations");
await mkdir(ILLUSTRATIONS_DIR, { recursive: true });
if (args.seeds > 1) await mkdir(TMP_DIR, { recursive: true });

// ── provider: pollinations (free, no key) ─────────────────────────────────
// Endpoint: https://image.pollinations.ai/prompt/<urlencoded>?model=flux&seed=N
//   - Returns a JPEG/PNG body directly.
//   - Free, rate-limited but generous.
//   - Models: flux | flux-realism | flux-anime | turbo
async function generatePollinations(seedIndex) {
  const seed = Math.floor(Math.random() * 1_000_000) + seedIndex;
  const url = new URL(
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`
  );
  url.searchParams.set("model", args.model);
  url.searchParams.set("seed", String(seed));
  url.searchParams.set("width", String(args.width));
  url.searchParams.set("height", String(args.height));
  url.searchParams.set("nologo", "true");
  url.searchParams.set("enhance", "true");
  url.searchParams.set("private", "true");

  // Pollinations can be slow on first hit (cold model). Allow long timeout.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 180_000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${txt.slice(0, 200)}`);
    }
    const ab = await res.arrayBuffer();
    return Buffer.from(ab);
  } finally {
    clearTimeout(timeout);
  }
}

// ── optimize: resize → webp ────────────────────────────────────────────────
async function optimize(pngBuffer, outPath) {
  // Lazy-load sharp so the script works even if the dep isn't installed yet.
  const { default: sharp } = await import("sharp");
  const meta = await sharp(pngBuffer).metadata();
  const targetWidth = Math.min(1600, meta.width ?? 1600);
  await sharp(pngBuffer)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(outPath);
}

// ── log run ────────────────────────────────────────────────────────────────
async function log(entry) {
  const logPath = join(ROOT, "scripts/illustration-log.jsonl");
  await appendFile(logPath, JSON.stringify(entry) + "\n", "utf8");
}

// ── run ─────────────────────────────────────────────────────────────────────
const t0 = Date.now();
console.log(`◇ Provider: pollinations (${args.model})`);
console.log(`◇ Out:      ${args.out}${args.seeds > 1 ? ` (×${args.seeds})` : ""}`);
console.log(`◇ Prompt:   ${prompt.slice(0, 80).replace(/\s+/g, " ")}…`);
console.log(``);

const generated = [];

for (let i = 1; i <= args.seeds; i++) {
  const label = args.seeds > 1 ? `seed ${i}/${args.seeds}` : "generating";
  process.stdout.write(`◌ ${label}…`);
  try {
    const buf = await generatePollinations(i);
    let outPath;
    if (args.seeds > 1) {
      outPath = join(TMP_DIR, `${args.out}-seed-${i}.png`);
      await writeFile(outPath, buf);
    } else if (args.optimize) {
      outPath = join(ILLUSTRATIONS_DIR, `${args.out}.webp`);
      await optimize(buf, outPath);
    } else {
      outPath = join(ILLUSTRATIONS_DIR, `${args.out}.png`);
      await writeFile(outPath, buf);
    }
    const sz = (await stat(outPath)).size;
    process.stdout.write(`\r✓ ${label} → ${outPath.replace(ROOT + "/", "")} (${(sz / 1024).toFixed(0)} KB)\n`);
    generated.push({ seed: i, path: outPath, bytes: sz });
  } catch (err) {
    process.stdout.write(`\r✗ ${label} failed: ${err.message}\n`);
    generated.push({ seed: i, error: err.message });
  }
}

const ms = Date.now() - t0;
console.log(``);
console.log(`◆ Done in ${(ms / 1000).toFixed(1)}s`);

await log({
  ts: new Date().toISOString(),
  model: args.model,
  out: args.out,
  seeds: args.seeds,
  promptPreview: prompt.slice(0, 200),
  results: generated.map((g) => ({
    seed: g.seed,
    path: g.path?.replace(ROOT + "/", ""),
    bytes: g.bytes,
    error: g.error,
  })),
});

if (args.seeds > 1) {
  console.log(`\nReview seeds in tmp/illustrations/, then re-run with --seeds 1 + the winning prompt to save the final webp.`);
}
