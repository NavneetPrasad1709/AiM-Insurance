#!/usr/bin/env node
/**
 * WordPress → Sanity migration.
 *
 * Usage:
 *   node scripts/migrate-wordpress.mjs \
 *     --url https://your-wp-site.com \
 *     --token YOUR_SANITY_WRITE_TOKEN \
 *     [--project-id abc123] \
 *     [--dataset production] \
 *     [--per-page 100] \
 *     [--dry-run]
 *
 * Reads `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and
 * `SANITY_API_TOKEN` from `.env.local` if present (overridden by CLI flags).
 *
 * What it does:
 *  - Fetches all WordPress posts via REST API (paginated).
 *  - Converts HTML body into Portable Text (paragraphs, h2/h3, lists, images).
 *  - Uploads featured images to Sanity assets.
 *  - Maps WP categories to Sanity `category` documents (creates if missing).
 *  - Creates `post` documents.
 *  - Retries failures up to 3x.
 *  - Logs failures to scripts/migration-errors.json.
 */

import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// ---------- env loader (.env.local) ----------

function loadDotEnv() {
  const file = path.join(projectRoot, ".env.local");
  if (!existsSync(file)) return;
  const txt = readFileSync(file, "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    const k = m[1];
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(k in process.env)) process.env[k] = v;
  }
}
loadDotEnv();

// ---------- args ----------

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        out[key] = true;
      } else {
        out[key] = next;
        i++;
      }
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));

const WP_URL = (args.url || "").replace(/\/$/, "");
const SANITY_TOKEN = args.token || process.env.SANITY_API_TOKEN || "";
const PROJECT_ID = args["project-id"] || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const DATASET = args.dataset || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const PER_PAGE = Number(args["per-page"] || 100);
const DRY_RUN = Boolean(args["dry-run"]);

if (!WP_URL) fatal("Missing --url <wordpress-site>");
if (!DRY_RUN && !SANITY_TOKEN) fatal("Missing --token (or SANITY_API_TOKEN in .env.local)");
if (!DRY_RUN && !PROJECT_ID) fatal("Missing --project-id (or NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local)");

function fatal(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

// ---------- sanity client ----------

const sanity = DRY_RUN
  ? null
  : createClient({
      projectId: PROJECT_ID,
      dataset: DATASET,
      apiVersion: "2024-01-01",
      token: SANITY_TOKEN,
      useCdn: false,
    });

// ---------- helpers ----------

const decodeEntities = (s) =>
  String(s ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&hellip;/g, "…")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&nbsp;/g, " ");

const stripTags = (s) => decodeEntities(String(s ?? "").replace(/<[^>]*>/g, "")).trim();

const slugify = (s) =>
  decodeEntities(String(s ?? ""))
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 96);

const randKey = () => Math.random().toString(36).slice(2, 12);

// Map WP/HTML to a small set of Portable Text blocks.
// Supports: <p>, <h2>, <h3>, <h4>, <ul>/<ol>+<li>, <img>, plus inline <a>/<strong>/<em>.
function htmlToPortableText(html, imageAssetByUrl = {}) {
  if (!html) return [];
  const blocks = [];
  let i = 0;
  const src = String(html).replace(/\r?\n/g, "\n");

  const pushBlock = (style, inner) => {
    const inline = inlineToSpansAndMarks(inner);
    if (!inline.children.length) return;
    blocks.push({
      _type: "block",
      _key: randKey(),
      style,
      markDefs: inline.markDefs,
      children: inline.children,
    });
  };

  const pushList = (level, listItem, inner) => {
    const inline = inlineToSpansAndMarks(inner);
    if (!inline.children.length) return;
    blocks.push({
      _type: "block",
      _key: randKey(),
      style: "normal",
      level,
      listItem,
      markDefs: inline.markDefs,
      children: inline.children,
    });
  };

  const pushImage = (url, alt) => {
    const ref = imageAssetByUrl[url];
    if (!ref) return;
    blocks.push({
      _type: "image",
      _key: randKey(),
      asset: { _type: "reference", _ref: ref },
      alt: alt || "",
    });
  };

  while (i < src.length) {
    const tagOpen = src.indexOf("<", i);
    if (tagOpen === -1) {
      const tail = src.slice(i).trim();
      if (tail) pushBlock("normal", tail);
      break;
    }
    if (tagOpen > i) {
      const between = src.slice(i, tagOpen).trim();
      if (between) pushBlock("normal", between);
    }
    const tagClose = src.indexOf(">", tagOpen);
    if (tagClose === -1) break;
    const tagRaw = src.slice(tagOpen + 1, tagClose);
    const tagMatch = tagRaw.match(/^([a-zA-Z0-9]+)\b/);
    const tag = tagMatch ? tagMatch[1].toLowerCase() : "";

    if (!tag) {
      i = tagClose + 1;
      continue;
    }

    if (tag === "img") {
      const urlMatch = tagRaw.match(/\bsrc=["']([^"']+)["']/);
      const altMatch = tagRaw.match(/\balt=["']([^"']*)["']/);
      if (urlMatch) pushImage(urlMatch[1], altMatch ? altMatch[1] : "");
      i = tagClose + 1;
      continue;
    }

    if (["p", "h2", "h3", "h4", "blockquote"].includes(tag)) {
      const closer = `</${tag}>`;
      const closeIdx = src.toLowerCase().indexOf(closer, tagClose + 1);
      const inner = closeIdx === -1 ? src.slice(tagClose + 1) : src.slice(tagClose + 1, closeIdx);
      const style =
        tag === "h2" ? "h2" : tag === "h3" ? "h3" : tag === "h4" ? "h4" : tag === "blockquote" ? "blockquote" : "normal";
      pushBlock(style, inner);
      i = closeIdx === -1 ? src.length : closeIdx + closer.length;
      continue;
    }

    if (tag === "ul" || tag === "ol") {
      const closer = `</${tag}>`;
      const closeIdx = src.toLowerCase().indexOf(closer, tagClose + 1);
      const inner = closeIdx === -1 ? src.slice(tagClose + 1) : src.slice(tagClose + 1, closeIdx);
      const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let m;
      while ((m = liRe.exec(inner)) !== null) {
        pushList(1, tag === "ul" ? "bullet" : "number", m[1]);
      }
      i = closeIdx === -1 ? src.length : closeIdx + closer.length;
      continue;
    }

    // Unknown tag — try to skip its closer if balanced; else advance past tag.
    const closer = `</${tag}>`;
    const closeIdx = src.toLowerCase().indexOf(closer, tagClose + 1);
    if (closeIdx === -1) {
      i = tagClose + 1;
    } else {
      const inner = src.slice(tagClose + 1, closeIdx).trim();
      if (inner) pushBlock("normal", inner);
      i = closeIdx + closer.length;
    }
  }

  return blocks;
}

function inlineToSpansAndMarks(html) {
  const children = [];
  const markDefs = [];
  let i = 0;
  const src = String(html ?? "");
  const stack = []; // active mark names (e.g., 'strong', 'em', linkKey)

  const flushText = (text) => {
    const t = decodeEntities(text);
    if (!t) return;
    children.push({
      _type: "span",
      _key: randKey(),
      text: t,
      marks: [...stack],
    });
  };

  while (i < src.length) {
    const lt = src.indexOf("<", i);
    if (lt === -1) {
      flushText(src.slice(i));
      break;
    }
    if (lt > i) flushText(src.slice(i, lt));
    const gt = src.indexOf(">", lt);
    if (gt === -1) break;
    const tagRaw = src.slice(lt + 1, gt);
    const isClose = tagRaw.startsWith("/");
    const nameMatch = (isClose ? tagRaw.slice(1) : tagRaw).match(/^([a-zA-Z0-9]+)/);
    const tag = nameMatch ? nameMatch[1].toLowerCase() : "";

    if (!tag) {
      i = gt + 1;
      continue;
    }

    if (tag === "br") {
      flushText("\n");
      i = gt + 1;
      continue;
    }

    if (isClose) {
      // pop matching tag from end of stack if present
      for (let j = stack.length - 1; j >= 0; j--) {
        const v = stack[j];
        if (
          v === tag ||
          (tag === "a" && (v.startsWith("link_") || v === "_nestedlink"))
        ) {
          stack.splice(j, 1);
          break;
        }
      }
      i = gt + 1;
      continue;
    }

    if (tag === "strong" || tag === "b") {
      stack.push("strong");
    } else if (tag === "em" || tag === "i") {
      stack.push("em");
    } else if (tag === "a") {
      // Disallow nested anchors (HTML spec + React hydration). Track inner
      // opens with a sentinel so the matching </a> still pops correctly.
      const alreadyInLink = stack.some((v) => v.startsWith("link_"));
      if (alreadyInLink) {
        stack.push("_nestedlink");
      } else {
        const href = (tagRaw.match(/\bhref=["']([^"']+)["']/) || [])[1] || "";
        const key = `link_${randKey()}`;
        markDefs.push({ _key: key, _type: "link", href });
        stack.push(key);
      }
    }
    // ignore other inline tags (span, etc.)
    i = gt + 1;
  }

  return { children, markDefs };
}

async function uploadImageFromUrl(url, alt) {
  if (!url || DRY_RUN) return null;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`image fetch ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const filename = decodeURIComponent(url.split("?")[0].split("/").pop() || "image");
  const asset = await sanity.assets.upload("image", buf, { filename });
  return { id: asset._id, alt: alt || "" };
}

async function ensureCategory(name) {
  const title = decodeEntities(name).trim();
  if (!title) return null;
  const slug = slugify(title);
  if (DRY_RUN) return `dry-cat-${slug}`;
  const id = `category-${slug}`;
  const existing = await sanity.fetch(`*[_type=="category" && slug.current==$slug][0]._id`, { slug });
  if (existing) return existing;
  const doc = await sanity.createIfNotExists({
    _id: id,
    _type: "category",
    title,
    slug: { _type: "slug", current: slug },
  });
  return doc._id;
}

async function ensureAuthor(name) {
  const clean = decodeEntities(name || "AiM Team").trim() || "AiM Team";
  const slug = slugify(clean);
  if (DRY_RUN) return `dry-author-${slug}`;
  const id = `author-${slug}`;
  const existing = await sanity.fetch(`*[_type=="author" && slug.current==$slug][0]._id`, { slug });
  if (existing) return existing;
  const doc = await sanity.createIfNotExists({
    _id: id,
    _type: "author",
    name: clean,
    slug: { _type: "slug", current: slug },
  });
  return doc._id;
}

// ---------- WordPress fetch ----------

async function fetchWpPosts() {
  const all = [];
  let page = 1;
  while (true) {
    const url = `${WP_URL}/wp-json/wp/v2/posts?per_page=${PER_PAGE}&page=${page}&_embed=1`;
    const res = await fetch(url);
    if (res.status === 400 || res.status === 404) break;
    if (!res.ok) throw new Error(`WP fetch failed ${res.status} on page ${page}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    const totalPages = Number(res.headers.get("x-wp-totalpages") || "0");
    if (totalPages && page >= totalPages) break;
    page++;
    if (page > 100) break; // safety
  }
  return all;
}

// ---------- migrate single post ----------

async function migratePost(wp) {
  const title = stripTags(wp.title?.rendered);
  if (!title) throw new Error("post has no title");
  const slug = wp.slug || slugify(title);
  const excerpt = stripTags(wp.excerpt?.rendered).slice(0, 200) || `${title}.`;
  const publishedAt = new Date(wp.date_gmt || wp.date || Date.now()).toISOString();
  const html = wp.content?.rendered || "";

  // categories from _embedded
  const wpCats =
    (wp._embedded && wp._embedded["wp:term"] && wp._embedded["wp:term"].flat()) || [];
  const catNames = wpCats.filter((t) => t && t.taxonomy === "category").map((t) => t.name);
  const tagNames = wpCats.filter((t) => t && t.taxonomy === "post_tag").map((t) => t.name);
  const categoryIds = [];
  for (const name of catNames) {
    const id = await ensureCategory(name);
    if (id) categoryIds.push(id);
  }
  if (!categoryIds.length) {
    const fallback = await ensureCategory("Insurance Tips");
    if (fallback) categoryIds.push(fallback);
  }

  // author
  const authorName =
    (wp._embedded?.author && wp._embedded.author[0]?.name) || "AiM Team";
  const authorId = await ensureAuthor(authorName);

  // featured image
  let mainImage = null;
  const featured =
    wp._embedded?.["wp:featuredmedia"] && wp._embedded["wp:featuredmedia"][0];
  if (featured?.source_url) {
    const uploaded = await uploadImageFromUrl(featured.source_url, featured.alt_text);
    if (uploaded) {
      mainImage = {
        _type: "image",
        asset: { _type: "reference", _ref: uploaded.id },
        alt: uploaded.alt || title,
      };
    }
  }

  // inline images
  const imgUrls = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
  const imageAssetByUrl = {};
  for (const url of imgUrls) {
    try {
      const up = await uploadImageFromUrl(url);
      if (up) imageAssetByUrl[url] = up.id;
    } catch (e) {
      console.warn(`  ⚠ inline image skipped: ${url} (${e.message})`);
    }
  }

  const body = htmlToPortableText(html, imageAssetByUrl);

  const doc = {
    _type: "post",
    _id: `post-wp-${wp.id}`,
    title,
    slug: { _type: "slug", current: slugify(slug) },
    excerpt,
    publishedAt,
    body,
    featured: false,
    tags: tagNames.map(decodeEntities),
    ...(mainImage ? { mainImage } : {}),
    ...(categoryIds.length
      ? {
          categories: categoryIds.map((_ref) => ({
            _type: "reference",
            _key: randKey(),
            _ref,
          })),
        }
      : {}),
    ...(authorId ? { author: { _type: "reference", _ref: authorId } } : {}),
  };

  if (DRY_RUN) {
    console.log(`  [dry-run] would create: ${doc._id} (${title}) — ${body.length} blocks`);
    return doc;
  }
  return await sanity.createOrReplace(doc);
}

async function withRetry(fn, label, attempts = 3) {
  let lastErr;
  for (let n = 1; n <= attempts; n++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      console.warn(`  ⚠ attempt ${n}/${attempts} failed for ${label}: ${e.message}`);
      await new Promise((r) => setTimeout(r, 500 * n));
    }
  }
  throw lastErr;
}

// ---------- main ----------

(async () => {
  console.log(`→ Fetching posts from ${WP_URL} ...`);
  const posts = await fetchWpPosts();
  console.log(`  found ${posts.length} post(s)`);

  let success = 0;
  let failed = 0;
  const errors = [];

  for (let idx = 0; idx < posts.length; idx++) {
    const p = posts[idx];
    const title = stripTags(p.title?.rendered) || `(post ${p.id})`;
    console.log(`Migrating post ${idx + 1}/${posts.length}: ${title}...`);
    try {
      await withRetry(() => migratePost(p), title);
      success++;
      console.log(`  ✓ Post migrated successfully`);
    } catch (e) {
      failed++;
      console.error(`  ✗ Error: ${e.message} — skipping`);
      errors.push({ id: p.id, slug: p.slug, title, error: e.message });
    }
  }

  if (errors.length) {
    const out = path.join(__dirname, "migration-errors.json");
    writeFileSync(out, JSON.stringify(errors, null, 2));
    console.log(`Errors written to ${out}`);
  }

  console.log(`\nMigration complete: ${success} success, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
})().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
