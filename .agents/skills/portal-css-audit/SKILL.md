---
name: "portal-css-audit"
description: "Audit and fix CSS violations in the SGDS docs portal. Use when scanning for bare HTML element selectors in unscoped style blocks, fixing global CSS bleed, removing style module blocks, converting style module to plain style with prefixed class names, checking vue style blocks, reviewing unscoped style, or auditing .vue and .md files in docs/.vitepress/ for style violations."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: internal
  category: audit
---

# SGDS CSS Audit

Use this skill to identify and fix CSS violations in the SGDS docs portal (`docs/.vitepress/`). There are two categories of violation:

- **Category A** — Bare HTML element selectors in unscoped `<style>` blocks (global CSS bleed)
- **Category D** — `<style module>` blocks anywhere (banned by CLAUDE.md)

---

## Category A — Bare element selectors in unscoped `<style>`

### Why this is a problem

An unscoped `<style>` block in a Vue SFC is **global**. Any selector that targets a bare HTML element (e.g. `span`, `p`, `li`, `h2`) — even when qualified with a parent class (e.g. `.my-class span { ... }`) — will match **every** matching element across the entire app, not just inside that component. This causes accidental style bleed and rendering breaks on unrelated pages.

### How to detect

```bash
grep -rn "}\s*\n\?\s*[a-z][a-z0-9]*\b\s*[{,]" docs/.vitepress/components/ --include="*.vue"
```

Or look for `<style>` blocks (not `<style scoped>`) that contain rules like:
- `.some-class span { ... }`
- `.some-class p, .some-class li { ... }`
- `span { ... }` (bare, no parent class)

For `.md` files:

```bash
grep -rn -A 20 "<style>" docs/ --include="*.md"
```

### Legitimate exceptions (do NOT fix these)

These patterns are allowed in non-module `<style>` blocks with a comment explaining why:

| Pattern | Reason |
|---|---|
| `.parent :deep(pre)`, `.parent :deep(code)` | Targeting VitePress markdown code blocks from a scoped parent |
| `.parent p`, `.parent li` in `TypographyPageTemplate.vue` | Cross-component slot container — arbitrary content in slot |
| `body { margin: 0 }` in `BareLayout.vue` | Iframe embedding requirement |
| `.docs-layout-content > * > * + h2` etc. in `DocsLayout.vue` | Markdown heading spacing |
| `.some-class p` when comment says "slotted content" | AiInstructionStepper, PromptBox |
| `.sgds-night-theme .some-class` | Global dark theme class selector |
| `@keyframes` | Animation definitions |
| Vue Transition hook classes | `.name-enter-active`, `.name-leave-active`, etc. |

### How to fix — Vue `.vue` files

**Move styling to the element's class attribute** using SGDS utility classes.

Example — removing `.my-row span { color: var(--sgds-color-fixed-dark) }`:

1. Because `color` is an inherited CSS property, adding `sgds:text-fixed-dark` to the parent row's binding causes the color to inherit down through all child `span` and `p` elements — including those inside web component slots.

```html
<!-- Before -->
:class="isHighlighted ? 'my-row' : undefined"

<!-- After -->
:class="isHighlighted ? 'my-row sgds:text-fixed-dark' : undefined"
```

2. Remove the CSS rule from the `<style>` block.

**For `span`/`p` owned directly by the component**, add utility classes on the element itself:

```html
<!-- Before — relies on .ts-snippet-code span { align-self: flex-start; ... } -->
<span>{{ value }}</span>

<!-- After — utility classes on the element itself -->
<span class="sgds:self-start sgds:text-default sgds:whitespace-nowrap">{{ value }}</span>
```

### How to fix — VitePress `.md` files

VitePress `.md` files compile to Vue SFCs and support `<style scoped>`. Convert the `<style>` block to `<style scoped>` so element selectors are data-attribute scoped to that page only:

```diff
- <style>
+ <style scoped>
  h2, p, ul, li { margin: 0; }
```

If the block contains `:global(pre)` or `:global(code)` selectors targeting VitePress-rendered code blocks, replace them with `:deep()` which keeps the parent class anchor scoped while still piercing child content:

```diff
- .my-block :global(pre) { background: transparent; }
+ .my-block :deep(pre) { background: transparent; }
```

### SGDS utility class reference

**Always invoke the `sgds-utilities` skill before looking up or suggesting any `sgds:` utility class.** Do not guess class names from CSS variable names — the skill is the authoritative source.

> Always use the semantic name (`sgds:text-fixed-dark`) — never the Tailwind arbitrary value syntax (`sgds:text-[var(--sgds-color-fixed-dark)]`).

---

## Category D — `<style module>` blocks

### Why this is a problem

`<style module>` is **banned by CLAUDE.md**. All styling must use plain `<style>` with explicit class names or SGDS utility classes via the `class` attribute.

### How to detect

```bash
grep -rn "<style module>" docs/.vitepress/ --include="*.vue"
grep -rn "<style module>" docs/ --include="*.md"
```

### How to fix

1. Choose a short, unique CSS prefix for the component (e.g. `uc-` for `UsingColourPage`, `cbp-` for `ColourBestPracticesPage`).

2. In the `<style module>` block:
   - Change `<style module>` → `<style>`
   - Rename every class from camelCase to kebab-case with the prefix:
     - `.sectionStack` → `.uc-section-stack`
     - `.practiceCard` → `.cbp-practice-card`
   - Convert any `:global(.foo)` wrappers to direct selectors.

3. In the template:
   - Replace every `:class="$style.foo"` → `class="uc-foo"`
   - Replace every `:class="[$style.foo, $style.bar]"` → `class="uc-foo uc-bar"`
   - Replace conditional bindings: `:class="condition ? $style.foo : $style.bar"` → `:class="condition ? 'uc-foo' : 'uc-bar'"`
   - Replace dynamic computed class: `:class="[$style.tile, $style[\`tile${n}\`]]"` → `:class="['uc-tile', \`uc-tile-\${n}\`]"`

4. Zero visual change rule: output must be identical before and after.

---

## Known remaining violations

These files still use `<style module>` (class-based only, no element selector bleed — low severity):

| File | Notes |
|---|---|
| `docs/resources/index.md` | `.container` row-gap only |
| `docs/guidelines/index.md` | `.container` row-gap only |
| `docs/index.md` | Landing page layout classes |

These are lower priority since they contain no bare element selectors, but should be migrated when the files are next edited.
