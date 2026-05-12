# CLAUDE.md — SGDS Docs Portal Architecture

This file encodes the architectural rules for the `docs/` VitePress site. Follow these rules in all future sessions.

---

## Always use SGDS skills

This project IS the Singapore Government Design System portal. Every UI decision must come from SGDS — never invent components, utilities, tokens, or theming on the fly.

**Before adding, modifying, or styling any UI**, invoke the relevant SGDS skill via the Skill tool:

| When the task involves… | Invoke this skill |
|---|---|
| Bootstrapping a new app, deciding where to start, or unsure which skill applies | `sgds-workflow` |
| First-time setup of a new app (font, foundation CSS, utilities, layout) | `sgds-getting-started` |
| Any `<sgds-*>` web component (button, input, modal, table, tab, etc.) | `sgds-components` |
| Any `sgds:` Tailwind utility class (spacing, colour, typography, border, layout, grid) | `sgds-utilities` |
| Theming, primary colour, day/night mode, font customisation, CSS token overrides | `sgds-theming` |
| Form validation, `hasFeedback`, constraint validation, `FormData` from SGDS form components | `sgds-forms` |
| Building a full page (dashboard, login, settings, list, form page) | `sgds-pattern-page-templates` |
| Reusable UI blocks (app shell, sticky header, sidebar, filter panel, container layout) | `sgds-pattern-block-templates` |
| Charts, graphs, dashboards, ECharts setup with SGDS palette | `sgds-data-visualisation` |

**Rules**:

- Use `sgds:` Tailwind utilities for ALL styling — no raw CSS, no inline `style` attributes (see [Guiding Principles → 6](#6-sgds-utilities-for-all-styling--no-raw-css-no-inline-styles)).
- Use `<sgds-*>` web components, not custom equivalents. If a component seems missing, check `sgds-components` first.
- Use SGDS semantic spacing (`sgds:gap-layout-*`, `sgds:gap-text-*`, `sgds:p-component-*`) over raw numeric utilities.
- Use SGDS typography classes for all text (`sgds:text-heading-*`, `sgds:text-body-*`, `sgds:text-subtitle-*`) — match the class to the heading element semantically (H2 → `text-heading-lg`, H3 → `text-heading-md`, H4 → `text-heading-sm`).
- Use SGDS colour tokens (`sgds:bg-*`, `sgds:text-*`, `sgds:border-*`) — never hex values directly in markup. Hex is only acceptable in data files where it represents source-of-truth palette values.

If a UI need genuinely cannot be expressed with SGDS, raise it as a token/utility/component gap — do not work around it with raw CSS or non-SGDS components.

---

## Project Structure

```
docs/
  .vitepress/
    components/          # Vue components (renderers only — no owned data)
      ai/                #   AI-related page components
      components/        #   Doc renderers (ComponentDesignPage, DesignPageWrapper, section components)
      foundations/       #   Foundation page components
      landing/           #   Landing page components
      layout/            #   Layout components (Mainnav, Footer, SearchModal)
      page/              #   Page-level components (DocFooter, PageHeader)
      ui/                #   Reusable UI utilities (CodeToken, CopyCommand, SkillsTable)
    composables/         # Shared Vue composables (e.g. useComponentUpdates.ts)
    data/                # Single source of truth for all content data
    theme/               # VitePress theme (Layout.vue, index.ts, layouts/)
      layouts/           #   DefaultLayout.vue, DocsLayout.vue, PageLayout.vue
    utils/               # Shared utilities (e.g. page-status.ts)
  components/            # One .md file per component (e.g. accordion.md)
  patterns/              # One .md file per pattern (categorised by type)
  guidelines/            # One .md file per guideline
  resources/             # One .md file per resource
  ...
```

---

## Guiding Principles

### 1. Data, not components
All documentation content lives in `docs/.vitepress/data/`. Vue components render it; they never own it.

- Component docs → `component-docs.ts`
- Pattern docs → `pattern-docs.ts`
- Guideline docs → `guideline-docs.ts`
- Resource docs → `resource-docs.ts`
- Navigation → `nav.ts`
- Search index → `search-index.ts`
- AI skills table → `skills.ts`
- AI workflow / setup step data → `ai-workflow-data.ts`
- Component name aliases (for GitHub release parsing) → `component-aliases.ts`

### 2. One renderer, many docs
`ComponentDesignPage.vue` is the single rendering engine for all doc types (components, patterns, guidelines, resources). New doc types get a thin wrapper (`DesignPageWrapper.vue`), not a new renderer.

### 3. No page-sized components
Components over ~200 lines that mix data and rendering must be split into section sub-components. Section-level concerns get their own files in `docs/.vitepress/components/components/`:

| Component | Responsibility |
|---|---|
| `AnatomySection.vue` | Anatomy canvas, callout SVGs, ResizeObserver |
| `BehaviourSection.vue` | Demo/behaviour rows (configuration + usage behaviours tabs) |
| `MeasurementsSection.vue` | Themed image pairs grid |
| `BestPracticesSection.vue` | Do/don't card grid |
| `MotionSection.vue` | Motion preview + specs table |
| `AccessibilitySection.vue` | Highlight overlays + keyboard interactions |
| `UpdatesSection.vue` | Updates/roadmap/feedback/bug tables |
| `PortalNumberedItem.vue` | Anatomy/callout item renderer |

### 4. Props over hardcoding
Navigation items, social links, category colours, skills table content — all live in data files, not inline constants.

### 5. Shared types
All types shared across multiple files are exported from `component-docs.ts`. No local redefinition of types like `BestPractice`, `UsageGuidance`, `MotionSpec`, etc.

### 6. SGDS utilities for all styling — no raw CSS, no inline styles
All styling must be applied through the `class` attribute using SGDS utility classes (the `sgds:` Tailwind prefix). **No `<style module>` blocks anywhere.**

**Do:**
```html
<div class="sgds:flex sgds:flex-col sgds:gap-md sgds:text-heading-sm sgds:font-semibold">
```

**Do not:**
```html
<!-- inline style -->
<div :style="{ gap: 'var(--sgds-gap-md)' }">

<!-- style module -->
<style module>
.myClass { display: flex; gap: var(--sgds-gap-md); }
</style>
```

**Legitimate exceptions** — allowed in non-module `<style>` blocks with a comment explaining why:
- `@keyframes` definitions
- Vue Transition hook classes (`.name-enter-active`, `.name-leave-active`, etc.)
- Global selectors targeting shadow DOM / web component internals in `v-html` markup
- Dark theme `.sgds-night-theme` global class selectors (e.g. image swapping)
- `::placeholder` pseudo-elements
- CSS border tricks (e.g. `gap: 1px; background: border-color` for grid dividers)
- Descendant combinators targeting markdown-rendered content

**Legitimate `:style` bindings** — dynamic runtime values only:
- Pixel coordinates computed from `getBoundingClientRect()` (anatomy callouts, accessibility highlights)
- Dynamic color hex values from data arrays (OurColoursPage swatches)
- CSS custom property values for animation delay (`--swatch-index`)

If a visual requirement cannot be expressed with existing SGDS utilities, raise it as a token/utility gap — do not work around it with raw CSS.

---

## How to Add a New Component Doc

1. Add an entry to `docs/.vitepress/data/component-docs.ts`:
   ```ts
   const componentDocs: Record<string, ComponentDoc> = {
     "my-component": {
       key: "my-component",
       title: "My Component",
       tag: "sgds-my-component",
       group: "form",
       summary: "...",
       demos: [...],
       // optional: anatomyParts, usage, accessibility, updates, ...
     },
   };
   ```

2. Create `docs/components/my-component.md`:
   ```md
   ---
   layout: docs
   title: My Component
   description: Short description for the page header.
   ---

   <script setup>
   import ComponentDesignPage from "../.vitepress/components/components/ComponentDesignPage.vue";
   </script>

   <ComponentDesignPage component-key="my-component" />
   ```

That's it. No new Vue component needed.

---

## How to Add a New Pattern Doc

1. Add an entry to `docs/.vitepress/data/pattern-docs.ts`.

2. Create `docs/patterns/<category>/my-pattern.md`:
   ```md
   ---
   layout: docs
   title: My Pattern
   description: ...
   ---

   <script setup>
   import DesignPageWrapper from "../../.vitepress/components/components/DesignPageWrapper.vue";
   </script>

   <DesignPageWrapper doc-type="pattern" doc-key="my-pattern" />
   ```

The same pattern applies for guidelines (`doc-type="guideline"`) and resources (`doc-type="resource"`).

---

## Component Size Limits

- Max ~200 lines for any component that mixes data and rendering logic
- Section-level components (anatomy, accessibility, etc.) can be up to ~200 lines
- `ComponentDesignPage.vue` is the orchestrator — its line count is higher due to global CSS utilities that must live there

---

## Where Types Live

All shared types are exported from `docs/.vitepress/data/component-docs.ts`:

```ts
export type { ComponentDemo, ComponentDoc, ResolvedComponentDoc }
export type { AnatomyInput, AnatomyCallout, ThemedImageAsset, MeasurementAsset }
export type { UsageGuidance, UsageBehaviour, UsageContentSection }
export type { MotionSpec, BestPractice, ComponentProp }
export type { AccessibilitySection, AccessibilityKeyboardRow, AccessibilityContent }
export type { UpdatesSectionTable, UpdatesLinkBlock, UpdatesContent }
export type { AvailabilityStatus, ComponentMetadataStatus }
```

Import from `../data/component-docs` in all sub-components and wrappers.

---

## Composables

`docs/.vitepress/composables/useComponentUpdates.ts` — fetches GitHub releases from `govtechsg/sgds-web-component`, parses conventional commit messages to populate each component's Updates tab. Supports `VITE_GITHUB_TOKEN` for higher rate limits.

---

## Theme Registration

`docs/.vitepress/theme/index.ts` registers 4 global components (usable in any `.md` without import):

| Component | Source |
|---|---|
| `SkillsTable` | `ui/SkillsTable.vue` |
| `CopyCommand` | `ui/CopyCommand.vue` |
| `AiWorkflowPaths` | `ai/AiWorkflowPaths.vue` |
| `DesignPageWrapper` | `components/DesignPageWrapper.vue` |

---

## Layout System

`theme/Layout.vue` dispatches to one of three layouts based on `frontmatter.layout`:

| Value | Layout | Use case |
|---|---|---|
| *(default)* | `DefaultLayout.vue` | General pages |
| `docs` | `DocsLayout.vue` | All component/pattern/guideline/resource pages |
| `page` | `PageLayout.vue` | Custom landing/section pages |

`DocsLayout.vue` handles: sidebar navigation, section detection, page metadata badges (Figma, Storybook, Responsive), and acronym formatting for sidebar labels.

---

## Script Commands

```bash
pnpm docs:dev       # Start dev server
pnpm docs:build     # Production build
pnpm docs:preview   # Preview production build
```

---

## VitePress Best Practices

Always prefer VitePress's built-in APIs over raw browser or Vue alternatives when both can solve the problem.

| Use case | Prefer | Avoid |
|---|---|---|
| Current route / frontmatter | `useData()` from `vitepress` | `window.location`, `document.title` |
| Programmatic navigation | `useRouter().go(href)` from `vitepress` | `window.location.href = ...` |
| Post-navigation hook | `useRouter().onAfterRouteChanged` | Manual route watchers (unless component-scoped) |
| In-page hash changes | `window.addEventListener("hashchange", ...)` | No VitePress API exists — this is correct |
| Component-scoped route watch | `watch(() => props.key, ...)` | `useRouter().onAfterRouteChanged` (global, last-writer-wins) |

**Note:** `useRouter().onAfterRouteChanged` is a global singleton hook — setting it in a component overwrites any previous handler. Use a component-scoped `watch` on the relevant reactive prop instead for component-level route reactions.

---

## Zero Visual Change Rule

All structural refactoring must produce identical visual output. Before committing:
- Run `pnpm docs:dev` and visually verify affected pages
- Run `pnpm docs:build` to confirm no build errors

Never change markup, class names, tokens, or styling as part of an architectural refactor unless the change directly fixes a hardcoded value that was already wrong.
