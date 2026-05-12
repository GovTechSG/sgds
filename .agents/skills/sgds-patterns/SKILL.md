---
name: sgds-patterns
description: |
  Complete catalog of reusable typography and text patterns for SGDS applications. Use this skill whenever the user needs to style text, create typography hierarchies, format headings, style lists, or needs consistent text layouts. Also use when the user mentions headings, page titles, body text, lists, paragraphs, display text, content headers, or any typography styling — even if they just say "make a nice heading" or "style my text". Current patterns include headings (H1-H6), display typography (large prominent text), content headers, lists (ordered and unordered), and paragraphs. Each pattern links directly to the raw HTML template for implementation.
compatibility: Requires sgds-utilities and sgds-components skills for prerequisite setup
---

# SGDS Patterns

This skill catalogs all reusable UI patterns available in SGDS. Patterns are production-ready templates that combine SGDS components and utilities to solve common UI needs.

## When to Use This Skill

Use this skill whenever you need to:
- Implement a **typography pattern** (page headings, content headers, lists, paragraphs with specific sizing/weight)
- Build a **form pattern** (multi-field forms, validation patterns, input groupings)
- Create **page layouts** (login page, empty states, data tables, search interfaces)
- Display **notifications, reviews, or data visualizations** with SGDS
- Find the exact HTML markup and SGDS utility classes for a UI pattern

## Prerequisites

Before implementing any pattern, ensure you have:

1. **sgds-getting-started**: Initial application setup (Inter font, foundation CSS imports, component registration)
2. **sgds-utilities**: Understanding of SGDS utility classes (spacing, typography, color, grid, etc.)
3. **sgds-components**: Knowledge of SGDS web components used within patterns

Refer to these skills before asking how to implement a pattern.

## Current Patterns: Typography

Typography patterns define semantic, reusable layouts for text content. All patterns use SGDS utilities for consistent styling and respect the design token hierarchy.

Use the category links below to find specific patterns:

- **[Heading](./references/typography/heading.md)** - Page and section headings with optional overlines (6 patterns)
- **[Display](./references/typography/display.md)** - Large, prominent display typography (12 patterns)
- **[Content](./references/typography/content.md)** - Card titles and subsection headings (6 patterns)
- **[List](./references/typography/list.md)** - Ordered and unordered lists in three sizes (6 patterns)
- **[Paragraph](./references/typography/paragraph.md)** - Body text styles for longer-form content (3 patterns)

## How to Use a Pattern

1. **Find the pattern** you need using the category links above or the specific pattern reference files
2. **Get the raw HTML template** from the GitHub URL in the reference file
3. **Extract the template** (the `const XxxTemplate = () => html\`....\`` part) — this is the markup to implement
4. **Adapt to your content** — replace placeholder text and adjust SGDS utility classes as needed for your use case
5. **Combine with sgds-components** if the pattern includes interactive elements (buttons, forms, dropdowns, etc.)


## Pattern Naming Convention

Pattern files follow this naming scheme:

```
stories/patterns/[Category]/[Subcategory]/[PatternName]-[variant].stories.js
```

Examples:
- `Typography/Heading/h1.stories.js` → H1 pattern (default weight)
- `Typography/Heading/h1-light.stories.js` → H1 pattern (light weight)
- `Typography/Display/display-lg-center.stories.js` → Large display, center-aligned
- `Typography/List/ul-body-md.stories.js` → Unordered list, body-medium size

Variants indicate:
- **Weight**: `-light` suffix for light font-weight variants
- **Alignment**: `-center` suffix for center-aligned variants
- **Size**: Built into the name (e.g., `display-sm`, `body-md`)

---

## Integration Example

Here's a quick example of how to use a typography pattern:

```html
<!-- Import SGDS foundation styles and components -->
<link rel="stylesheet" href="@govtechsg/sgds-web-component/lib/index.css" />
<script type="module" src="@govtechsg/sgds-web-component/lib/index.js"></script>

<!-- Use the H1 pattern template -->
<div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="max-width: var(--sgds-text-max-width);">
  <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
    Overline Label
  </div>
  <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
    Page Heading Goes Here
  </h1>
  <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
    Supporting body text that provides context and detail for the page or section above.
  </p>
</div>
```

Copy the template, substitute your content, and the pattern is ready to use.

---

## Accessing Pattern Files

All patterns are stored in the repository at `stories/patterns/` and available on GitHub. Use the typography category links above to find the exact URL for any pattern:

```
https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/[Subcategory]/[PatternName].stories.js
```

Each category reference file contains a table with direct links to all patterns in that category.
