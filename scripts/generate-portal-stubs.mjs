#!/usr/bin/env node

/**
 * generate-portal-stubs.mjs
 *
 * Reads a CEM diff JSON (produced by cem-diff.mjs) and generates stub entries
 * in the portal's data files so new components, blocks, and templates are
 * immediately visible — albeit with placeholder content that humans fill in.
 *
 * Usage:
 *   node scripts/generate-portal-stubs.mjs <diff.json>
 *
 * What it modifies:
 *   - docs/.vitepress/data/component-docs.ts   (new component stubs)
 *   - docs/.vitepress/data/component-aliases.ts (new alias entries)
 *   - docs/.vitepress/data/storybook-ids.ts     (new story mappings)
 *   - docs/.vitepress/config.mts                (sidebar entries)
 *   - docs/components/<key>.md                  (new component pages)
 *   - docs/blocks/preview/<key>.md              (new block previews)
 *   - docs/templates/page-templates/preview/<key>.md (new template previews)
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
  console.error("Usage: node scripts/generate-portal-stubs.mjs <diff.json>");
  process.exit(1);
}

const diff = JSON.parse(readFileSync(diffPath, "utf-8"));
const changes = [];

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
  if (diff.newComponents.length === 0) return;

  const filePath = join(DATA_DIR, "component-docs.ts");
  let content = readFileSync(filePath, "utf-8");

  // Find the closing of componentDocs object.
  // Pattern: the last `tooltip` entry ends, then `};` on its own line before helper functions.
  // We insert new entries just before the final `};` of componentDocs.
  //
  // Strategy: find the marker "// --- AUTO-GENERATED STUBS ---" if it exists,
  // otherwise find the closing pattern. We look for the `};` that comes after
  // the last known component entry and before `const buildAccessibility`.

  const insertMarker = "// --- AUTO-GENERATED STUBS BELOW ---";
  let insertionPoint;

  if (content.includes(insertMarker)) {
    // Append after the marker
    insertionPoint = content.indexOf(insertMarker) + insertMarker.length;
  } else {
    // Find the closing `};` of componentDocs by counting braces from its declaration
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
    // Insert before the closing `}` (and the `;` after it)
    insertionPoint = closeIdx;
  }

  const stubs = diff.newComponents.filter((comp) => {
    const key = tagToKey(comp.tag);
    // Skip if this component key already exists in the file
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
    // Append stubs after existing marker
    content =
      content.substring(0, insertionPoint) +
      "\n" +
      stubs.join("\n") +
      content.substring(insertionPoint);
  } else {
    // Insert marker + stubs before the closing `};`
    content =
      content.substring(0, insertionPoint) +
      stubBlock +
      content.substring(insertionPoint);
  }

  writeFileSync(filePath, content, "utf-8");
  changes.push(`component-docs.ts: added ${diff.newComponents.length} component stub(s)`);
}

// ---------------------------------------------------------------------------
// 2. Component aliases in component-aliases.ts
// ---------------------------------------------------------------------------

function generateAliases() {
  if (diff.newComponents.length === 0) return;

  const filePath = join(DATA_DIR, "component-aliases.ts");
  let content = readFileSync(filePath, "utf-8");

  for (const comp of diff.newComponents) {
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
  changes.push(`component-aliases.ts: added aliases for ${diff.newComponents.length} component(s)`);
}

// ---------------------------------------------------------------------------
// 3. Component .md files
// ---------------------------------------------------------------------------

function generateComponentPages() {
  if (diff.newComponents.length === 0) return;

  const template = loadTemplate("component-stub.md.template");

  for (const comp of diff.newComponents) {
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
  if (diff.newComponents.length === 0) return;

  const filePath = join(ROOT, "docs", ".vitepress", "config.mts");
  let content = readFileSync(filePath, "utf-8");

  for (const comp of diff.newComponents) {
    const key = tagToKey(comp.tag);
    const title = keyToTitle(key);
    const link = `/components/${key}`;

    // Check if already in sidebar
    if (content.includes(`"${link}"`)) continue;

    // Find the sidebar items array for /components/
    const sidebarStart = content.indexOf('sidebar["/components/"]');
    if (sidebarStart === -1) continue;

    // Extract all existing `{ text: "...", link: "..." }` entries and find
    // the correct alphabetical position to insert the new entry.
    const entryRegex = /\{ text: "([^"]+)", link: "[^"]+" \},?/g;
    let match;
    let insertBeforeIdx = -1;
    const newTitleLower = title.toLowerCase();

    // Search only within the sidebar section
    const sidebarEnd = content.indexOf("];", sidebarStart);
    const sidebarSlice = content.substring(sidebarStart, sidebarEnd);

    entryRegex.lastIndex = 0;
    while ((match = entryRegex.exec(sidebarSlice)) !== null) {
      const existingTitle = match[1].toLowerCase();
      if (existingTitle > newTitleLower) {
        // Insert before this entry
        insertBeforeIdx = sidebarStart + match.index;
        break;
      }
    }

    const newEntry = `    { text: "${title}", link: "${link}" },\n`;

    if (insertBeforeIdx !== -1) {
      content = content.substring(0, insertBeforeIdx) + newEntry + content.substring(insertBeforeIdx);
    } else {
      // Append before closing `],`
      const closingIdx = content.indexOf("  ],", sidebarStart);
      if (closingIdx === -1) continue;
      content = content.substring(0, closingIdx) + newEntry + content.substring(closingIdx);
    }
  }

  writeFileSync(filePath, content, "utf-8");
  changes.push(`config.mts: added sidebar entries for ${diff.newComponents.length} component(s)`);
}

// ---------------------------------------------------------------------------
// 5. Storybook story IDs
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
// 6. Block/template preview .md files
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
// 7. Update aliases in generate-component-updates.mjs
// ---------------------------------------------------------------------------

function generateUpdatesScriptAliases() {
  if (diff.newComponents.length === 0) return;

  const filePath = join(ROOT, "scripts", "generate-component-updates.mjs");
  let content = readFileSync(filePath, "utf-8");

  for (const comp of diff.newComponents) {
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
  changes.push(`generate-component-updates.mjs: added aliases for ${diff.newComponents.length} component(s)`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!diff.hasChanges) {
    console.log("No changes to generate stubs for.");
    return;
  }

  console.log(`Generating stubs for ${diff.newVersion}...`);
  console.log(`  New components: ${diff.newComponents.length}`);
  console.log(`  Changed components: ${diff.changedComponents.length}`);
  console.log(`  New stories: ${(diff.newStories ?? []).length}`);

  generateComponentStubs();
  generateAliases();
  generateUpdatesScriptAliases();
  generateComponentPages();
  generateSidebarEntries();
  generateStoryIds();
  generatePreviewPages();

  console.log("\nChanges made:");
  for (const c of changes) {
    console.log(`  - ${c}`);
  }
}

main();
