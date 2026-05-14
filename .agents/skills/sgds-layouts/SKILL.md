---
name: "sgds-layouts"
description: "Complete catalog of page layout patterns for SGDS applications. Use this skill whenever a user asks about page layouts, content arrangement, aside panels, split views, sidebar layouts, breadcrumb layouts, or viewport-height layouts — even if they just say 'how should I lay out my page' or 'I need a two-column layout'. Covers Full Width layouts (public-facing pages with sgds-container) and With Sidebar layouts (dashboards/internal tools with sgds-container-sidebar). Trigger on: layout, aside, split view, sidebar layout, two-column, three-column, content arrangement, page structure with aside."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: pattern
---

# SGDS Layouts

Production-ready page layout patterns that define how content areas are arranged within the Application Shell. Each layout combines SGDS components and utilities to provide a structural starting point — drop in your content blocks and you have a complete page.

## What is a layout?

A layout defines the spatial arrangement of content regions on a page:

- How many content columns exist (single, split, aside + main)
- Where navigation lives (top-only vs sidebar)
- How the page scrolls (document flow vs viewport-contained)

Layouts sit between the **Application Shell** (mandatory page chrome) and **Blocks/Templates** (the actual content). The shell wraps the layout; blocks fill the layout's content areas.

## Prerequisites

Before implementing any layout, ensure you have:

1. **sgds-getting-started**: Initial application setup (Inter font, foundation CSS imports, component registration)
2. **sgds-utilities**: Understanding of SGDS utility classes (grid, spacing, flex, etc.)
3. **sgds-components**: Knowledge of SGDS web components (masthead, mainnav, footer, sidebar)

```javascript
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component/css/utility.css";
```

See **[sgds-getting-started](../sgds-getting-started/SKILL.md)** and **[sgds-components](../sgds-components/SKILL.md)** for full installation.

---

## Quick Decision Guide

| What you're building | Layout category | Layout to use |
|---|---|---|
| Simple public-facing page, single content area | Full Width | [Default](reference/full-width.md#default) |
| Page with a left sidebar/aside panel (4/8 split) | Full Width | [Aside Left](reference/full-width.md#aside-left) |
| Page with a right sidebar/aside panel (8/4 split) | Full Width | [Aside Right](reference/full-width.md#aside-right) |
| Page with both left and right aside panels (3/6/3) | Full Width | [Aside Both](reference/full-width.md#aside-both) |
| Two equal content panels side by side | Full Width | [Split](reference/full-width.md#split) |
| Page with breadcrumb navigation bar | Full Width | [Breadcrumb](reference/full-width.md#breadcrumb) |
| Dashboard/internal tool, single content area | With Sidebar | [Default](reference/with-sidebar.md#default) |
| Dashboard with left aside panel | With Sidebar | [Aside Left](reference/with-sidebar.md#aside-left) |
| Dashboard with right aside panel | With Sidebar | [Aside Right](reference/with-sidebar.md#aside-right) |
| Collapsible overlay sidebar with breadcrumb | With Sidebar | [Overlay](reference/with-sidebar.md#overlay) |
| Dashboard with two equal content panels | With Sidebar | [Split](reference/with-sidebar.md#split) |

---

## Two Layout Categories

### Full Width — Public-facing pages

For general-purpose applications, public-facing digital services, and pages without persistent side navigation.

**Key characteristics:**
- Uses `.sgds-container` for centred, responsive content
- Standard `<sgds-masthead>`, `<sgds-mainnav>`, `<sgds-footer>`
- Content flows with the document (no viewport containment)
- Grid-based aside panels use `.sgds-grid` with `sgds-col-*` classes

**→ Read [reference/full-width.md](reference/full-width.md)** for all 6 Full Width layout variants.

---

### With Sidebar — Dashboards and internal tools

For internal tools, dashboards, admin portals, and transactional apps that need persistent side navigation alongside the main content.

**Key characteristics:**
- Uses `.sgds-container-sidebar` for narrower content (accounts for sidebar width)
- `fluid` attribute on `<sgds-masthead>` and `<sgds-mainnav>`
- `<sgds-sidebar>` component for persistent navigation
- `<sgds-footer tone="neutral" layout="sidebar">` for sidebar-aware footer
- Viewport-height containment: `sgds:h-screen sgds:flex sgds:flex-col sgds:overflow-hidden`
- Main content area scrolls independently: `sgds:overflow-y-auto`

**→ Read [reference/with-sidebar.md](reference/with-sidebar.md)** for all 5 With Sidebar layout variants.

---

## How to Extract HTML from Raw GitHub Links

All layouts have working story implementations in the `stories/layouts/` directory. To use them:

### Step 1: Fetch the raw file

```bash
curl https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/{Category}/{File}.stories.js
```

### Step 2: Extract the HTML from the template literal

Story files export a `Template` function that returns an `html` template literal:

```javascript
const Template = () => html`
  <!-- YOUR HTML STARTS HERE -->
  <sgds-masthead></sgds-masthead>
  ...
  <sgds-footer></sgds-footer>
  <!-- YOUR HTML ENDS HERE -->
`;
```

### Step 3: Clean the HTML

1. Remove the `html\`` wrapper and trailing backtick
2. Remove Lit-specific syntax (`${variable}` interpolations) — replace with inline HTML
3. Remove `<style>` blocks (these are just for Storybook placeholders)
4. Preserve all SGDS components and utility classes exactly as-is
5. Format with consistent indentation (2 spaces)

---

## For AI agents

### Workflow

1. Load `sgds-utilities` skill (for utility class reference)
2. Load `sgds-components` skill (for component APIs)
3. Load this skill
4. Read the appropriate reference file based on the user's needs
5. Fetch the raw GitHub story file if you need the complete implementation
6. Adapt the layout to the user's content

### Guidelines

- Every layout includes the mandatory Application Shell (`<sgds-masthead>`, `<sgds-mainnav>`, `<sgds-footer>`)
- Do not mix Full Width and With Sidebar patterns — pick one based on the use case
- For sidebar layouts, always include the viewport-containment classes on the root wrapper
- Populate aside panels and content areas with blocks from **[sgds-blocks](../sgds-blocks/SKILL.md)** or templates from **[sgds-templates](../sgds-templates/SKILL.md)**
