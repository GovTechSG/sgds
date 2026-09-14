#!/usr/bin/env node

/**
 * cem-diff.mjs
 *
 * Compares the Custom Elements Manifest (CEM) of the currently installed
 * @govtechsg/sgds-web-component against a target version's CEM.
 *
 * Outputs a JSON diff object describing:
 *   - newComponents:     tags in the new CEM that don't exist in the old CEM
 *   - changedComponents: tags with new members (properties, events, slots, cssParts, cssProperties)
 *   - newStories:        Storybook story IDs present in the deployed index.json but missing from storybook-ids.ts
 *
 * Usage:
 *   node scripts/cem-diff.mjs [targetVersion]
 *
 *   targetVersion  Optional. Defaults to "latest" (fetched from npm registry).
 *   Writes diff JSON to stdout. Use --output <path> to write to a file instead.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
let targetVersion = "latest";
let outputPath = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--output" && args[i + 1]) {
    outputPath = args[++i];
  } else if (!args[i].startsWith("-")) {
    targetVersion = args[i];
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getStableVersions() {
  const json = execSync("npm view @govtechsg/sgds-web-component versions --json", {
    encoding: "utf-8",
  });
  const versions = JSON.parse(json);
  // Filter out RC / pre-release tags
  return versions.filter((v) => !v.includes("-"));
}

function resolveLatestStableVersion() {
  const stable = getStableVersions();
  return stable[stable.length - 1];
}

/**
 * Given the target stable version, find the previous stable version.
 * E.g. if target is "3.27.0", returns "3.26.0" (the last stable before it).
 */
function resolvePreviousStableVersion(targetVersion) {
  const stable = getStableVersions();
  const targetIdx = stable.indexOf(targetVersion);
  if (targetIdx > 0) {
    return stable[targetIdx - 1];
  }
  // If target not found in the list or is the first, fall back to second-to-last
  if (stable.length >= 2) {
    return stable[stable.length - 2];
  }
  return null;
}

function downloadCem(version, destDir) {
  mkdirSync(destDir, { recursive: true });
  execSync(
    `npm pack @govtechsg/sgds-web-component@${version} --pack-destination "${destDir}"`,
    { encoding: "utf-8", stdio: "pipe" },
  );
  // Find the tarball
  const tgz = execSync(`ls "${destDir}"/*.tgz`, { encoding: "utf-8" }).trim();
  execSync(`tar xzf "${tgz}" -C "${destDir}"`, { stdio: "pipe" });
  const cemPath = join(destDir, "package", "custom-elements.json");
  if (!existsSync(cemPath)) {
    throw new Error(`CEM not found in package at ${cemPath}`);
  }
  return JSON.parse(readFileSync(cemPath, "utf-8"));
}


// ---------------------------------------------------------------------------
// CEM parsing
// ---------------------------------------------------------------------------

/** Extract all custom-element declarations from a CEM, indexed by tag name.
 *  Each entry includes the module directory path for family grouping. */
function indexByTag(cem) {
  const map = new Map();
  for (const mod of cem.modules ?? []) {
    const moduleDir = mod.path.split("/").slice(0, -1).join("/");
    for (const decl of mod.declarations ?? []) {
      if (decl.customElement && decl.tagName?.startsWith("sgds-")) {
        map.set(decl.tagName, { ...decl, _moduleDir: moduleDir });
      }
    }
    // Also check exports for tag definitions
    for (const exp of mod.exports ?? []) {
      if (exp.kind === "custom-element-definition" && exp.name?.startsWith("sgds-")) {
        const decl = (mod.declarations ?? []).find(
          (d) => d.name === exp.declaration?.name,
        );
        if (decl && !map.has(exp.name)) {
          map.set(exp.name, { ...decl, tagName: exp.name, _moduleDir: moduleDir });
        }
      }
    }
  }
  return map;
}

/**
 * Group a list of component entries by their CEM module directory.
 * Within each group, the shortest tag name is the parent; the rest are sub-components.
 * Returns an array of { parent, subComponents } objects.
 */
function groupByFamily(components, cemIndex) {
  const dirMap = new Map();
  for (const comp of components) {
    const dir = cemIndex.get(comp.tag)?._moduleDir ?? "";
    const arr = dirMap.get(dir) ?? [];
    arr.push(comp);
    dirMap.set(dir, arr);
  }

  const families = [];
  for (const [, members] of dirMap) {
    // Sort by tag length — shortest is the parent
    members.sort((a, b) => a.tag.length - b.tag.length);
    const parent = members[0];
    const subComponents = members.slice(1).map((m) => m.tag);
    families.push({ parent, subComponents });
  }
  return families;
}

function extractNames(arr) {
  return (arr ?? []).map((item) => item.name).filter(Boolean);
}

function diffArrays(oldArr, newArr) {
  const oldSet = new Set(oldArr);
  return newArr.filter((name) => !oldSet.has(name));
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
function getExistingStoryIds() {
  const storybookIdsPath = join(ROOT, "docs", ".vitepress", "data", "storybook-ids.ts");
  if (!existsSync(storybookIdsPath)) return new Set();

  const content = readFileSync(storybookIdsPath, "utf-8");
  const ids = new Set();
  // Match the values (right-hand side) in `"key": "story-id"` pairs
  const regex = /:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    ids.add(match[1]);
  }
  return ids;
}

function classifyStory(storyId, storyTitle) {
  const id = storyId.toLowerCase();
  if (id.startsWith("templates-")) return "template";
  if (id.startsWith("blocks-")) return "block";
  return null;
}

function storyIdToKey(storyId, kind) {
  // e.g., "blocks-cards--cards-3" → "cards"
  //        "templates-about-us-basic--basic" → "about-us"
  const prefix = kind === "template" ? "templates-" : "blocks-";
  let segment = storyId.replace(prefix, "");
  // Take first segment before "--"
  segment = segment.split("--")[0];
  // For blocks, take the category (first hyphen-separated word)
  // For templates, take everything before the last segment (which is the variant)
  return segment;
}

async function diffStories() {
  const index = await fetchStorybookIndex();
  if (!index) {
    console.error("Warning: Could not fetch Storybook index. Skipping story diff.");
    return [];
  }

  const existingIds = getExistingStoryIds();
  const newStories = [];

  const entries = index.entries ?? index.stories ?? {};
  for (const [storyId, story] of Object.entries(entries)) {
    const kind = classifyStory(storyId, story.title);
    if (!kind) continue;

    // Check if this story ID is already mapped as a value in storybook-ids.ts
    if (existingIds.has(storyId)) continue;

    const key = storyIdToKey(storyId, kind);
    const portalKey = `${kind}:${key}`;

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
  // Resolve target version
  if (targetVersion === "latest") {
    targetVersion = resolveLatestStableVersion();
    console.error(`Resolved latest stable version: ${targetVersion}`);
  }

  // Resolve the previous stable version to use as the baseline
  const oldVersion = resolvePreviousStableVersion(targetVersion);
  if (!oldVersion) {
    console.error("Could not resolve a previous stable version. Aborting.");
    process.exit(1);
  }

  console.error(`Old version (previous stable): ${oldVersion}`);
  console.error(`New version (target):          ${targetVersion}`);

  if (oldVersion === targetVersion) {
    console.error("Versions match — no diff needed.");
    const emptyDiff = {
      oldVersion,
      newVersion: targetVersion,
      newComponents: [],
      changedComponents: [],
      newStories: [],
      hasChanges: false,
    };
    output(emptyDiff);
    return;
  }

  // Download CEMs for both stable versions
  const tmpDirOld = join(ROOT, ".tmp-cem-diff-old");
  const tmpDirNew = join(ROOT, ".tmp-cem-diff-new");
  let oldCem, newCem;
  try {
    console.error(`Downloading CEM for v${oldVersion}...`);
    oldCem = downloadCem(oldVersion, tmpDirOld);
    console.error(`Downloading CEM for v${targetVersion}...`);
    newCem = downloadCem(targetVersion, tmpDirNew);
  } finally {
    rmSync(tmpDirOld, { recursive: true, force: true });
    rmSync(tmpDirNew, { recursive: true, force: true });
  }

  const oldIndex = indexByTag(oldCem);
  const newIndex = indexByTag(newCem);

  // Detect new components, grouped by family
  const rawNewComponents = [];
  for (const [tag, decl] of newIndex) {
    if (!oldIndex.has(tag)) {
      rawNewComponents.push({
        tag,
        className: decl.name,
        description: decl.description ?? decl.summary ?? "",
        properties: extractNames(decl.members?.filter((m) => m.kind === "field" && m.privacy !== "private")),
        events: extractNames(decl.events),
        slots: extractNames(decl.slots),
        cssProperties: extractNames(decl.cssProperties),
        cssParts: extractNames(decl.cssParts),
      });
    }
  }

  // Group new components by CEM directory to identify parent/sub-component families
  const families = groupByFamily(rawNewComponents, newIndex);
  const newComponents = families.map(({ parent, subComponents }) => ({
    ...parent,
    subComponents,
  }));

  // Detect changed components
  const changedComponents = [];
  for (const [tag, newDecl] of newIndex) {
    const oldDecl = oldIndex.get(tag);
    if (!oldDecl) continue; // new component, handled above

    const addedProps = diffArrays(
      extractNames(oldDecl.members?.filter((m) => m.kind === "field")),
      extractNames(newDecl.members?.filter((m) => m.kind === "field")),
    );
    const addedEvents = diffArrays(extractNames(oldDecl.events), extractNames(newDecl.events));
    const addedSlots = diffArrays(extractNames(oldDecl.slots), extractNames(newDecl.slots));
    const addedCssProps = diffArrays(extractNames(oldDecl.cssProperties), extractNames(newDecl.cssProperties));
    const addedCssParts = diffArrays(extractNames(oldDecl.cssParts), extractNames(newDecl.cssParts));

    if (
      addedProps.length ||
      addedEvents.length ||
      addedSlots.length ||
      addedCssProps.length ||
      addedCssParts.length
    ) {
      changedComponents.push({
        tag,
        addedProps,
        addedEvents,
        addedSlots,
        addedCssProps,
        addedCssParts,
      });
    }
  }

  // Detect new stories
  const newStories = await diffStories();

  const diff = {
    oldVersion,
    newVersion: targetVersion,
    newComponents,
    changedComponents,
    newStories,
    hasChanges: newComponents.length > 0 || changedComponents.length > 0 || newStories.length > 0,
  };

  output(diff);
}

function output(diff) {
  const json = JSON.stringify(diff, null, 2);
  if (outputPath) {
    writeFileSync(outputPath, json, "utf-8");
    console.error(`Diff written to ${outputPath}`);
  } else {
    console.log(json);
  }
}

main().catch((err) => {
  console.error("cem-diff failed:", err.message);
  process.exit(1);
});
