#!/usr/bin/env node

/**
 * storybook-diff.mjs
 *
 * Detects new Storybook stories (templates & blocks) that are present in the
 * deployed Storybook index but missing from storybook-ids.ts.
 *
 * Usage:
 *   node scripts/storybook-diff.mjs [--output <path>]
 *
 *   Writes diff JSON to stdout. Use --output <path> to write to a file instead.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
let outputPath = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--output" && args[i + 1]) {
    outputPath = args[++i];
  }
}

// ---------------------------------------------------------------------------
// Storybook story diff
// ---------------------------------------------------------------------------

const STORYBOOK_BASE = "https://www.webcomponent.designsystem.tech.gov.sg";

async function fetchStorybookIndex() {
  try {
    // Storybook 7+ uses index.json
    const res = await fetch(`${STORYBOOK_BASE}/index.json`);
    if (res.ok) return await res.json();
  } catch {
    // ignore
  }
  try {
    // Fallback to stories.json
    const res = await fetch(`${STORYBOOK_BASE}/stories.json`);
    if (res.ok) return await res.json();
  } catch {
    // ignore
  }
  return null;
}

/** Collect all Storybook story IDs already mapped in storybook-ids.ts (the values, not the keys). */
/** Returns { ids: Set of story IDs (values), keys: Set of portal keys (keys) } */
function getExistingStoryMappings() {
  const storybookIdsPath = join(ROOT, "docs", ".vitepress", "data", "storybook-ids.ts");
  if (!existsSync(storybookIdsPath)) return { ids: new Set(), keys: new Set() };

  const content = readFileSync(storybookIdsPath, "utf-8");
  const ids = new Set();
  const keys = new Set();
  // Match `"portalKey": "story-id"` pairs
  const regex = /"([^"]+)":\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.add(match[1]);
    ids.add(match[2]);
  }
  return { ids, keys };
}

function classifyStory(storyId) {
  const id = storyId.toLowerCase();
  if (id.startsWith("templates-")) return "template";
  if (id.startsWith("blocks-")) return "block";
  return null;
}

/** Validate that a story ID contains only safe characters (alphanumeric, hyphens, underscores). */
const SAFE_ID_RE = /^[a-zA-Z0-9_-]+$/;

function isValidStoryId(storyId) {
  return typeof storyId === "string" && SAFE_ID_RE.test(storyId);
}

function storyIdToKey(storyId, kind) {
  // e.g., "blocks-cards--cards-3" → "cards"
  //        "templates-about-us-basic--basic" → "about-us"
  const prefix = kind === "template" ? "templates-" : "blocks-";
  let segment = storyId.replace(prefix, "");
  // Take first segment before "--"
  segment = segment.split("--")[0];
  return segment;
}

async function diffStories() {
  const index = await fetchStorybookIndex();
  if (!index) {
    console.error("Warning: Could not fetch Storybook index. Skipping story diff.");
    return [];
  }

  const { ids: existingIds, keys: existingKeys } = getExistingStoryMappings();
  const newStories = [];

  const entries = index.entries ?? index.stories ?? {};
  for (const [storyId, story] of Object.entries(entries)) {
    // Reject story IDs with unsafe characters (path separators, shell metacharacters, quotes)
    if (!isValidStoryId(storyId)) {
      console.error(`Warning: Skipping story with unsafe ID: ${storyId.substring(0, 80)}`);
      continue;
    }

    const kind = classifyStory(storyId);
    if (!kind) continue;

    // Skip if this exact story ID is already mapped
    if (existingIds.has(storyId)) continue;

    const key = storyIdToKey(storyId, kind);
    const portalKey = `${kind}:${key}`;

    // Skip if this portal key already exists (story may have been renamed)
    if (existingKeys.has(portalKey)) continue;

    newStories.push({
      id: storyId,
      title: story.title ?? story.name ?? storyId,
      kind,
      portalKey,
      key,
    });
  }

  // Deduplicate by portalKey (keep first occurrence)
  const seen = new Set();
  return newStories.filter((s) => {
    if (seen.has(s.portalKey)) return false;
    seen.add(s.portalKey);
    return true;
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const newStories = await diffStories();

  const diff = {
    newStories,
    hasChanges: newStories.length > 0,
  };

  const json = JSON.stringify(diff, null, 2);
  if (outputPath) {
    writeFileSync(outputPath, json, "utf-8");
    console.error(`Storybook diff written to ${outputPath}`);
  } else {
    console.log(json);
  }
}

main().catch((err) => {
  console.error("storybook-diff failed:", err.message);
  process.exit(1);
});
