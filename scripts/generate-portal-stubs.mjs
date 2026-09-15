#!/usr/bin/env node

/**
 * generate-portal-stubs.mjs
 *
 * Reads a CEM diff JSON (produced by cem-diff.mjs) and generates stub entries
 * in the portal's data files so new components are immediately visible —
 * albeit with placeholder content that humans fill in.
 *
 * Usage:
 *   node scripts/generate-portal-stubs.mjs <diff.json> [--family <parent-key>]
 *
 *   --family <key>  Only generate stubs for the family whose parent tag is sgds-<key>.
 *                   When omitted, generates stubs for all new component families.
 *
 * What it modifies:
 *   - docs/.vitepress/data/component-docs.ts   (new component stubs)
 *   - docs/.vitepress/data/component-aliases.ts (new alias entries)
 *   - docs/.vitepress/config.mts                (sidebar entries)
 *   - docs/components/<key>.md                  (new component pages)
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

const cliArgs = process.argv.slice(2);
let diffPath = null;
let familyFilter = null;

for (let i = 0; i < cliArgs.length; i++) {
  if (cliArgs[i] === "--family" && cliArgs[i + 1]) {
    familyFilter = cliArgs[++i];
  } else if (!cliArgs[i].startsWith("-")) {
    diffPath = cliArgs[i];
  }
}

if (!diffPath) {
  console.error("Usage: node scripts/generate-portal-stubs.mjs <diff.json> [--family <parent-key>]");
  process.exit(1);
}

const diff = JSON.parse(readFileSync(diffPath, "utf-8"));
const changes = [];

// ---------------------------------------------------------------------------
// Resolve the list of new components to process
// ---------------------------------------------------------------------------
// cem-diff.mjs now outputs newFamilies: [{ parent: { tag, ..., subComponents } }]
// Flatten to the same newComponents shape used by stub generators.

function resolveNewComponents() {
  const allFamilies = diff.newFamilies ?? [];
  const filtered = familyFilter
    ? allFamilies.filter((f) => tagToKey(f.parent.tag) === familyFilter)
    : allFamilies;
  return filtered.map((f) => f.parent);
}

const newComponents = resolveNewComponents();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tagToKey(tag) {
  // "sgds-data-table" → "data-table"
  return tag.replace(/^sgds-/, "");
}

function keyToTitle(key) {
  // "data-table" → "Data table"
  const words = key.split("-");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
}

function keyToNoHyphen(key) {
  // "data-table" → "datatable"
  return key.replace(/-/g, "");
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

function guessGroup(description) {
  const d = (description ?? "").toLowerCase();
  if (/table|data|grid/.test(d)) return "data display";
  if (/nav|menu|breadcrumb|tab|sidebar|stepper/.test(d)) return "navigation";
  if (/input|select|checkbox|radio|textarea|form|upload|toggle|switch|datepicker|combo/.test(d)) return "form";
  if (/alert|toast|modal|spinner|progress|skeleton|banner/.test(d)) return "feedback";
  if (/badge|label|tag/.test(d)) return "labels";
  if (/list|icon list|description/.test(d)) return "list";
  if (/card|accordion|divider|drawer|tooltip/.test(d)) return "data display";
  if (/layout|container|footer|header/.test(d)) return "layout";
  return "data display"; // safe default
}

// ---------------------------------------------------------------------------
// 1. Component stubs in component-docs.ts
// ---------------------------------------------------------------------------

function generateComponentStubs() {
  if (newComponents.length === 0) return;

  const filePath = join(DATA_DIR, "component-docs.ts");
  let content = readFileSync(filePath, "utf-8");

  const insertMarker = "// --- AUTO-GENERATED STUBS BELOW ---";
  let insertionPoint;

  if (content.includes(insertMarker)) {
    insertionPoint = content.indexOf(insertMarker) + insertMarker.length;
  } else {
    const declStart = content.indexOf("const componentDocs: Record<string, ComponentDoc> = {");
    if (declStart === -1) {
      console.error("Warning: Could not find componentDocs declaration in component-docs.ts");
      return;
    }
    const openBrace = content.indexOf("{", declStart);
    let depth = 0;
    let closeIdx = -1;
    for (let i = openBrace; i < content.length; i++) {
      if (content[i] === "{") depth++;
      if (content[i] === "}") depth--;
      if (depth === 0) {
        closeIdx = i;
        break;
      }
    }
    if (closeIdx === -1) {
      console.error("Warning: Could not find componentDocs closing brace");
      return;
    }
    insertionPoint = closeIdx;
  }

  const stubs = newComponents.filter((comp) => {
    const key = tagToKey(comp.tag);
    if (content.includes(`"${key}": {`)) {
      console.error(`Skipping stub for "${key}" — already exists in component-docs.ts`);
      return false;
    }
    return true;
  }).map((comp) => {
    const key = tagToKey(comp.tag);
    const title = keyToTitle(key);
    const group = guessGroup(comp.description);
    const summary = comp.description || `${title} component.`;
    const escapedSummary = summary.replace(/"/g, '\\"').replace(/\n/g, " ");

    return `  "${key}": {
    key: "${key}",
    title: "${title}",
    tag: "${comp.tag}",
    group: "${group}" as ComponentGroup,
    summary: "${escapedSummary}",
    purposeCards: [
      {
        title: "TODO: Purpose 1",
        description: "Describe the primary use case for ${title.toLowerCase()}.",
      },
      {
        title: "TODO: Purpose 2",
        description: "Describe a secondary use case for ${title.toLowerCase()}.",
      },
      {
        title: "TODO: Purpose 3",
        description: "Describe a third use case for ${title.toLowerCase()}.",
      },
    ],
    anatomyMarkup: \`<${comp.tag}></${comp.tag}>\`,
    anatomyParts: [
      { title: "Container" },
      // TODO: Add anatomy parts
    ],
    demos: [
      {
        ...demo(
          "Default",
          "Basic ${title.toLowerCase()} usage.",
          \`<${comp.tag}></${comp.tag}>\`,
        ),
      },
    ],
    usage: {
      guidance: [
        {
          title: "When to use",
          tone: "do" as const,
          items: [
            "TODO: Add guidance on when to use ${title.toLowerCase()}.",
          ],
        },
        {
          title: "When not to use",
          tone: "dont" as const,
          items: [
            "TODO: Add guidance on when not to use ${title.toLowerCase()}.",
          ],
        },
      ],
      bestPractices: [
        {
          title: "TODO: Best practice",
          description: "Describe a recommended pattern for ${title.toLowerCase()}.",
          tone: "do" as const,
          markup: \`<${comp.tag}></${comp.tag}>\`,
        },
        {
          title: "TODO: Anti-pattern",
          description: "Describe a pattern to avoid with ${title.toLowerCase()}.",
          tone: "dont" as const,
          markup: \`<${comp.tag}></${comp.tag}>\`,
        },
      ],
    },
    accessibility: {
      sections: [
        {
          title: "Built-in accessibility",
          description: [
            "TODO: Describe the built-in accessibility features of ${title.toLowerCase()}.",
          ],
          items: [
            "TODO: Add accessibility guidance.",
          ],
        },
      ],
      keyboardInteractions: [
        {
          key: "Tab",
          description: "TODO: Describe Tab behaviour.",
        },
        {
          key: "Enter",
          description: "TODO: Describe Enter behaviour.",
        },
      ],
    },
    // updates: omitted — auto-populated from GitHub releases via buildResolvedUpdates()
  },`;
  });

  const stubBlock = `\n  ${insertMarker}\n${stubs.join("\n")}\n`;

  if (content.includes(insertMarker)) {
    content =
      content.substring(0, insertionPoint) +
      "\n" +
      stubs.join("\n") +
      content.substring(insertionPoint);
  } else {
    content =
      content.substring(0, insertionPoint) +
      stubBlock +
      content.substring(insertionPoint);
  }

  writeFileSync(filePath, content, "utf-8");
  changes.push(`component-docs.ts: added ${newComponents.length} component stub(s)`);
}

// ---------------------------------------------------------------------------
// 2. Component aliases in component-aliases.ts
// ---------------------------------------------------------------------------

function generateAliases() {
  if (newComponents.length === 0) return;

  const filePath = join(DATA_DIR, "component-aliases.ts");
  let content = readFileSync(filePath, "utf-8");

  for (const comp of newComponents) {
    const parentKey = tagToKey(comp.tag);
    const parentNoHyphen = keyToNoHyphen(parentKey);
    const parentDisplayName = parentKey.replace(/-/g, " ");

    // Skip if parent key already exists
    if (content.includes(`"${parentKey}"`) || content.includes(`${parentKey}:`)) continue;

    // Build aliases list: parent + all sub-component names
    const aliasNames = [parentKey];
    if (parentKey.includes("-")) aliasNames.push(parentDisplayName);
    for (const subTag of comp.subComponents ?? []) {
      const subKey = tagToKey(subTag);
      aliasNames.push(subKey);
      const subDisplay = subKey.replace(/-/g, " ");
      if (subKey !== subDisplay) aliasNames.push(subDisplay);
    }
    const aliasLine = `  "${parentKey}": [${aliasNames.map((a) => `"${a}"`).join(", ")}],`;

    // Find end of specialAliases
    const specialEnd = content.indexOf("};");
    content = content.substring(0, specialEnd) + aliasLine + "\n" + content.substring(specialEnd);

    // Add to scopeToKey — parent key + sub-component keys all map to the parent
    const scopeStart = content.indexOf("export const scopeToKey");
    const scopeEnd = content.indexOf("};", scopeStart);
    let scopeLines = `  "${parentKey}": "${parentKey}",\n`;
    if (parentKey !== parentNoHyphen) {
      scopeLines += `  ${parentNoHyphen}: "${parentKey}",\n`;
    }
    for (const subTag of comp.subComponents ?? []) {
      const subKey = tagToKey(subTag);
      scopeLines += `  "${subKey}": "${parentKey}",\n`;
      const subNoHyphen = keyToNoHyphen(subKey);
      if (subKey !== subNoHyphen) {
        scopeLines += `  ${subNoHyphen}: "${parentKey}",\n`;
      }
    }
    content = content.substring(0, scopeEnd) + scopeLines + content.substring(scopeEnd);
  }

  writeFileSync(filePath, content, "utf-8");
  changes.push(`component-aliases.ts: added aliases for ${newComponents.length} component(s)`);
}

// ---------------------------------------------------------------------------
// 3. Component .md files
// ---------------------------------------------------------------------------

function generateComponentPages() {
  if (newComponents.length === 0) return;

  const template = loadTemplate("component-stub.md.template");

  for (const comp of newComponents) {
    const key = tagToKey(comp.tag);
    const title = keyToTitle(key);
    const description = comp.description || `${title} component.`;
    const mdPath = join(ROOT, "docs", "components", `${key}.md`);

    if (existsSync(mdPath)) {
      console.error(`Skipping ${mdPath} — already exists`);
      continue;
    }

    const content = applyTemplate(template, {
      KEY: key,
      TITLE: title,
      DESCRIPTION: description.replace(/\n/g, " "),
    });

    writeFileSync(mdPath, content, "utf-8");
    changes.push(`docs/components/${key}.md: created`);
  }
}

// ---------------------------------------------------------------------------
// 4. Sidebar entries in config.mts
// ---------------------------------------------------------------------------

function generateSidebarEntries() {
  if (newComponents.length === 0) return;

  const filePath = join(ROOT, "docs", ".vitepress", "config.mts");
  let content = readFileSync(filePath, "utf-8");

  for (const comp of newComponents) {
    const key = tagToKey(comp.tag);
    const title = keyToTitle(key);
    const link = `/components/${key}`;

    // Check if already in sidebar
    if (content.includes(`"${link}"`)) continue;

    // Find the sidebar items array for /components/
    const sidebarStart = content.indexOf('sidebar["/components/"]');
    if (sidebarStart === -1) continue;

    // Find the bounds of the sidebar items array: from `items: [` to its closing `};`
    const itemsStart = content.indexOf("items: [", sidebarStart);
    if (itemsStart === -1) continue;
    const blockEnd = content.indexOf("};", sidebarStart);
    if (blockEnd === -1) continue;
    const sidebarSlice = content.substring(itemsStart, blockEnd);

    // Match only top-level entries (4-space indent, not 8-space nested items)
    const entryRegex = /^    \{ text: "([^"]+)", link: "[^"]+" \},?$/gm;
    let match;
    let insertBeforeIdx = -1;
    const newTitleLower = title.toLowerCase();

    entryRegex.lastIndex = 0;
    while ((match = entryRegex.exec(sidebarSlice)) !== null) {
      const existingTitle = match[1].toLowerCase();
      if (existingTitle > newTitleLower) {
        insertBeforeIdx = itemsStart + match.index;
        break;
      }
    }

    const newEntry = `    { text: "${title}", link: "${link}" },\n`;

    if (insertBeforeIdx !== -1) {
      content = content.substring(0, insertBeforeIdx) + newEntry + content.substring(insertBeforeIdx);
    } else {
      const closingPattern = "  ],";
      let closingIdx = content.lastIndexOf(closingPattern, blockEnd);
      if (closingIdx === -1 || closingIdx < sidebarStart) continue;
      content = content.substring(0, closingIdx) + newEntry + content.substring(closingIdx);
    }
  }

  writeFileSync(filePath, content, "utf-8");
  changes.push(`config.mts: added sidebar entries for ${newComponents.length} component(s)`);
}

// ---------------------------------------------------------------------------
// 5. Update aliases in generate-component-updates.mjs
// ---------------------------------------------------------------------------

function generateUpdatesScriptAliases() {
  if (newComponents.length === 0) return;

  const filePath = join(ROOT, "scripts", "generate-component-updates.mjs");
  let content = readFileSync(filePath, "utf-8");

  for (const comp of newComponents) {
    const parentKey = tagToKey(comp.tag);
    const parentNoHyphen = keyToNoHyphen(parentKey);

    // Skip if already present
    if (content.includes(`"${parentKey}":`)) continue;

    // Add to specialAliases — parent only
    const aliasNames = [parentKey];
    const parentDisplay = parentKey.replace(/-/g, " ");
    if (parentKey.includes("-")) aliasNames.push(parentDisplay);
    const aliasLine = `  "${parentKey}": [${aliasNames.map((a) => `"${a}"`).join(", ")}],`;

    const specialEnd = content.indexOf("};");
    content = content.substring(0, specialEnd) + aliasLine + "\n" + content.substring(specialEnd);

    // Add to scopeToKey — parent only
    const scopeStart = content.indexOf("const scopeToKey");
    const scopeEnd = content.indexOf("};", scopeStart);
    let scopeLines = `  "${parentKey}": "${parentKey}",\n`;
    if (parentKey !== parentNoHyphen) {
      scopeLines += `  ${parentNoHyphen}: "${parentKey}",\n`;
    }
    content = content.substring(0, scopeEnd) + scopeLines + content.substring(scopeEnd);
  }

  writeFileSync(filePath, content, "utf-8");
  changes.push(`generate-component-updates.mjs: added aliases for ${newComponents.length} component(s)`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (newComponents.length === 0) {
    console.log("No new components to generate stubs for.");
    return;
  }

  console.log(`Generating stubs for ${diff.newVersion}...`);
  console.log(`  New components: ${newComponents.length}`);
  if (familyFilter) {
    console.log(`  Family filter: ${familyFilter}`);
  }

  generateComponentStubs();
  generateAliases();
  generateUpdatesScriptAliases();
  generateComponentPages();
  generateSidebarEntries();

  console.log("\nChanges made:");
  for (const c of changes) {
    console.log(`  - ${c}`);
  }
}

main();
