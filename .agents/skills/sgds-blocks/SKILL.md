---
name: "sgds-blocks"
description: "Use when users want to build pages, design layouts, create sections, or compose multiple sections together. Covers reusable UI blocks: app layout, application shell, hero sections, CTAs, cards, card grids, feature sections, statistics, page headers, filter interfaces, forms, and more. Also trigger on: 'build a form', 'create a call to action', 'design a landing page', 'show statistics', 'sidebar layout'. These are drop-in sections — compose them with sgds-templates for complete pages."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: pattern
---

# SGDS Block Templates

Reusable UI blocks that slot into any page layout. Each block is a self-contained section — drop it into a page template from **[sgds-templates](../sgds-templates/SKILL.md)** to assemble complete pages without writing layout code from scratch.

## What is a block?

A block is a chunk of UI that:

- Has a single, focused responsibility (filter content, display a stat, show a form section, create a hero banner)
- Works standalone inside any container
- Can appear multiple times on a page or alongside other blocks

The **Application Shell** is a special mandatory block — it is the page chrome (`<sgds-masthead>`, `<sgds-mainnav>`, `<sgds-footer>`) that every SGDS page must include. All other blocks are content blocks that slot inside the shell.

Blocks are the ingredients. Page templates are the recipes.

## Prerequisites

```javascript
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component/css/utility.css";
```

See **[sgds-components](../sgds-components/SKILL.md)** for full installation details.

---

## Quick Decision Guide

| What you need | Block to use |
|---|---|
| Mandatory page chrome (masthead, mainnav, footer, container) for any SGDS page | [Application Shell](references/application-shell.md) |
| Full-bleed hero section with headline, description, CTA button and optional image | [Hero](references/hero.md) |
| Feature showcase section with image/component positioning and grid ratios | [Feature](references/feature.md) |
| Call-to-action section (primary, raised, alternate, centered, or full-bleed) | [CTA](references/cta.md) |
| Statistics/metrics display (3, 4, 5, or 6 columns) | [Stats](references/stats.md) |
| Card grid layout (3-column or 4-column) | [Cards](references/cards.md) |
| Page-level header with breadcrumb, icon + title, description, and primary CTA | [Page Header](references/page-header.md) |
| Read-only entity summary card with key-value fields and an edit action | [Basic Details Card](references/basic-details.md) |
| Filter interfaces and search results layout | [Filter](references/filter.md) |
| Multi-field form with proper component sizing, grouping, and layout rules | [Form](references/form.md) |

---

## → Read [references/application-shell.md](references/application-shell.md)

**Required for every page.** The application shell wraps all page content with the mandatory Singapore Government chrome: `<sgds-masthead>`, `<sgds-mainnav>`, and `<sgds-footer>`. Provides two layout variants — Simple App (`.sgds-container`, public-facing) and Sidebar App (`.sgds-container-sidebar`, dashboards and internal tools) — with full breakpoint tables and sticky-header patterns.

---

## → Read [references/hero.md](references/hero.md)

Hero sections with multiple layout and background options. Use for above-the-fold content on landing pages, campaign pages, or section introductions.

---

## → Read [references/feature.md](references/feature.md)

Feature showcase sections with image/component positioning and grid ratios. Use to highlight key product benefits, capabilities, or features.

---

## → Read [references/cta.md](references/cta.md)

Call-to-action sections with multiple style and alignment options (primary, raised, alternate, centered, contained, or full-bleed). Use to drive user action throughout the page.

---

## → Read [references/stats.md](references/stats.md)

Statistics/metrics display with multiple column counts (3, 4, 5, or 6 columns, with optional right-aligned variants). Use to showcase key metrics, achievements, or impact numbers.

---

## → Read [references/cards.md](references/cards.md)

Grid layouts for card components (3-column or 4-column). Use to display collections of items in structured card grids.

---

## → Read [references/page-header.md](references/page-header.md)

Breadcrumb trail + icon-tinted container + h1 heading + description + primary CTA button. Use at the top of any content page to orient the user and surface the primary action.

---

## → Read [references/basic-details.md](references/basic-details.md)

Bordered card with a subtitle heading, stacked key-value field pairs, and an optional edit button. Use to display read-only entity metadata (IDs, names, descriptions, contact info) on detail or profile pages.

---

## → Read [references/filter.md](references/filter.md)

Filter interfaces and search results layout. Use for advanced filtering and search result displays.

---

## → Read [references/form.md](references/form.md)

**Form layout rules: grid math, component pairing, validation feedback, and canonical patterns.** All forms use `.sgds-grid` with 12 columns. Form containers are 8 columns wide (left/center-aligned). Paired fields take 6 columns each (max 2 per row). Full-width fields (textarea, checkbox-group, radio-group, file-upload) always span 12 columns. Includes 5 reusable patterns: full-width only, paired fields, mixed layout, multiple sections, and sidebar navigation.

---

## Composing blocks with page templates

Blocks live inside the content area of a page template. The typical pattern:

```html
<!-- Page template provides the chrome -->
<sgds-masthead></sgds-masthead>
<sgds-mainnav>...</sgds-mainnav>

<div class="sgds:bg-surface-default sgds:min-h-screen">
  <div class="sgds:w-container sgds:mx-auto sgds:py-layout-md">

    <!-- Two-column layout: block on the left, content on the right -->
    <div class="sgds:flex sgds:gap-layout-md sgds:items-start">

      <!-- Drop the block here -->
      <aside class="sgds:shrink-0 sgds:w-64">
        <!-- Filter Sidebar block -->
      </aside>

      <!-- Content area -->
      <div class="sgds:flex-1">
        <!-- Cards, table, results, etc. -->
      </div>

    </div>
  </div>
</div>

<sgds-footer></sgds-footer>
```

---

## Before Writing Form Code

Forms are complex because SGDS components have specific constraints. **Read [references/form.md](references/form.md) FIRST** — it contains all grid math, component pairing rules, 5 canonical patterns, and positioning variants.

### Component API Verification
Read the component reference for every `<sgds-*>` element you use:

- **Child element naming**: Each component has specific child element names. `<sgds-select>` uses `<sgds-select-option>` (not `<sgds-option>`). `<sgds-combo-box>` uses `<sgds-combobox-option>`. Always verify in the [sgds-components skill](../sgds-components/SKILL.md) reference.
- **Slot requirements**: `<sgds-file-upload>` slots require text labels (not just icons). Check if the component expects child elements, slot content, or JS properties.
- **Optional properties**: `<sgds-stepper>` uses a JS property (`steps` array), not HTML child elements like `<sgds-stepper-item>`. Verify which components accept attributes vs. JS properties.

### Form-Specific Constraints

From [references/form.md](references/form.md):

- Forms take exactly **8 columns** within `.sgds-container`
- **Pairable fields** (Input, Select, Datepicker, Combo-box single-select): Take **6 columns each** at lg+ (4 columns at sm)
- **Full-width fields** (Textarea, Checkbox-group, Radio-group, Combo-box multi-select, File-upload): Always 12 columns
- **Grid math**: `sidebar_cols + form_cols + toc_cols ≤ 12`
- **Multi-select combo-box**: ⚠️ CRITICAL — must be full-width, never pair with any other component

**Always cross-check** against [references/form.md](references/form.md) before coding.

---

## Building Custom Blocks

Users are free to design their own blocks with full creative latitude — layout, composition, and visual hierarchy are all open. The only constraint is that every block must stay within the SGDS system rails:

| Requirement | How |
|---|---|
| **UI components** | Use `<sgds-*>` web components. Do not reach for plain HTML equivalents when an SGDS component exists (e.g. use `<sgds-badge>`, not a hand-rolled `<span>` chip). |
| **Styling** | Use `sgds:` Tailwind utilities exclusively for colours, spacing, typography, and layout. Do not write arbitrary CSS values that duplicate what the design token system already expresses. |
| **Typography** | Use semantic role tokens (`sgds:text-heading-md`, `sgds:text-body-md`, `sgds:text-overline-md`, etc.) paired with matching weight, line-height, and tracking tokens. Do not use raw scale tokens (`sgds:text-base`, `sgds:text-sm`) which are not part of the public API. |
| **Icons** | Use `<sgds-icon name="...">` exclusively. Do not embed raw SVG or third-party icon libraries. |
| **External inspiration** | Fine to reference sites like [shadcnblocks.com](https://www.shadcnblocks.com/blocks/about), Tailwind UI, or any other design gallery for layout ideas — but always re-implement using SGDS components and tokens, not the source site's CSS or component library. |

→ Read **[references/custom-block-rules.md](references/custom-block-rules.md)** for the full token reference, anti-patterns, and annotated examples.

---

## For AI agents

### ⚠️ CRITICAL RULE — ALWAYS LOAD THESE SKILLS FIRST

Before you write ANY block code:

1. **LOAD `sgds-utilities` skill** — You need the complete utility class reference
2. **LOAD `sgds-components` skill** — You need component APIs and child element names
3. **Then READ `references/custom-block-rules.md`** in this skill

**STYLING RULE (applies to ALL blocks):**
- Use `sgds:` Tailwind utilities EXCLUSIVELY for spacing, colors, typography, layout
- Use `<sgds-*>` components EXCLUSIVELY for UI elements
- **NEVER use inline `<style>` blocks** to replicate design tokens (e.g., `margin: 24px`, `var(--sgds-*)`)
- **NEVER write arbitrary CSS** that duplicates what design tokens already express

If you skip loading utilities/components first, you will default to inline styles and break the design system. This is the #1 mistake agents make with blocks.

---

### Agent workflow (in order)

1. Load `sgds-utilities` skill
2. Load `sgds-components` skill
3. Load this skill
4. Read `references/custom-block-rules.md`
5. THEN write block code using utilities + components

### Guidelines

1. **Every page must have the Application Shell** — `<sgds-masthead>`, `<sgds-mainnav>`, and `<sgds-footer>` are mandatory on every SGDS page. Read **[references/application-shell.md](references/application-shell.md)** for layout patterns and container classes.
2. When a user asks for a filtered list page, combine the Filter Sidebar block with the List Page template from **[sgds-templates](../sgds-templates/SKILL.md)**.
3. Adapt category labels, values, and counts to the user's actual data domain — do not copy the conference example verbatim.
4. When a user says "I want to build a custom block" or references an external design (shadcnblocks, Figma, screenshot), read **[references/custom-block-rules.md](references/custom-block-rules.md)** before generating any output.
