#!/usr/bin/env node

/**
 * generate-storybook-stubs.mjs
 *
 * Reads a storybook diff JSON (produced by storybook-diff.mjs) and generates
 * stub entries for new templates and blocks in the portal.
 *
 * Usage:
 *   node scripts/generate-storybook-stubs.mjs <diff.json>
 *
 * What it modifies:
 *   - docs/.vitepress/data/storybook-ids.ts            (new story mappings)
 *   - docs/blocks/preview/<key>.md                     (new block previews)
 *   - docs/templates/page-templates/preview/<key>.md   (new template previews)
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA_DIR = join(ROOT, "docs", ".vitepress", "data");

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const diffPath = process.argv[2];
if (!diffPath) {
  console.error("Usage: node scripts/generate-storybook-stubs.mjs <diff.json>");
  process.exit(1);
}

const diff = JSON.parse(readFileSync(diffPath, "utf-8"));
const changes = [];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function keyToTitle(key) {
  const words = key.split("-");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
}

function loadTemplate(name) {
  return readFileSync(join(__dirname, "templates", name), "utf-8");
}

function applyTemplate(template, vars) {
  let result = template;
  for (const [k, v] of Object.entries(vars)) {
    result = result.replaceAll(`{{${k}}}`, v);
  }
  return result;
}

// ---------------------------------------------------------------------------
// 1. Storybook story IDs
// ---------------------------------------------------------------------------

function generateStoryIds() {
  if ((diff.newStories ?? []).length === 0) return;

  const filePath = join(DATA_DIR, "storybook-ids.ts");
  let content = readFileSync(filePath, "utf-8");

  // Find the closing `};` of storybookStoryIds
  const objStart = content.indexOf("storybookStoryIds");
  const objEnd = content.indexOf("};", objStart);

  const newLines = diff.newStories.map((story) => {
    return `  "${story.portalKey}": "${story.id}",`;
  });

  content =
    content.substring(0, objEnd) +
    newLines.join("\n") +
    "\n" +
    content.substring(objEnd);

  writeFileSync(filePath, content, "utf-8");
  changes.push(`storybook-ids.ts: added ${diff.newStories.length} story mapping(s)`);
}

// ---------------------------------------------------------------------------
// 2. Block/template preview .md files
// ---------------------------------------------------------------------------

function generatePreviewPages() {
  if ((diff.newStories ?? []).length === 0) return;

  const blockTemplate = loadTemplate("block-preview.md.template");
  const templateTemplate = loadTemplate("template-preview.md.template");

  for (const story of diff.newStories) {
    const title = keyToTitle(story.key);
    let mdPath;
    let content;

    if (story.kind === "block") {
      mdPath = join(ROOT, "docs", "blocks", "preview", `${story.key}.md`);
      content = applyTemplate(blockTemplate, { KEY: story.key, TITLE: title });
    } else if (story.kind === "template") {
      mdPath = join(ROOT, "docs", "templates", "page-templates", "preview", `${story.key}.md`);
      content = applyTemplate(templateTemplate, { KEY: story.key, TITLE: title });
    } else {
      continue;
    }

    if (existsSync(mdPath)) {
      console.error(`Skipping ${mdPath} — already exists`);
      continue;
    }

    writeFileSync(mdPath, content, "utf-8");
    changes.push(`${story.kind} preview: ${story.key}.md created`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!diff.hasChanges) {
    console.log("No new stories to generate stubs for.");
    return;
  }

  console.log(`Generating storybook stubs...`);
  console.log(`  New stories: ${diff.newStories.length}`);

  generateStoryIds();
  generatePreviewPages();

  console.log("\nChanges made:");
  for (const c of changes) {
    console.log(`  - ${c}`);
  }
}

main();
