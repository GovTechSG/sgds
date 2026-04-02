# SGDS Grid Utilities Skill

Structures responsive page and content layouts using the SGDS grid system.

**Priority rule**: Always reach for `.sgds-container`, `.sgds-grid`, and `.sgds-col-*` first. Only fall back to Tailwind `sgds:grid-cols-*` and `sgds:col-span-*` when you have a layout need that the SGDS grid classes cannot express (e.g., a non-standard column count, auto-filling card rows with `sgds:grid-cols-[repeat(auto-fill,_minmax(...))]`).

---

## Core Concept

The SGDS grid is a **CSS Grid** layout built from three cooperating layers:

| Layer | Class | Role |
|-------|-------|------|
| Container | `.sgds-container` or `.sgds-container-sidebar` | Constrains content width and centres horizontally |
| Grid wrapper | `.sgds-grid` | Sets column track count and gutter for the breakpoint |
| Column | `.sgds-col-{bp}-{n}` | Spans `n` tracks on the grid |

Stack them as `container → grid → col`:

```html
<div class="sgds-container">
  <div class="sgds-grid">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">Main content</div>
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">Side content</div>
  </div>
</div>
```

---

## Breakpoints

The grid expands from 4 columns (mobile) → 8 columns (small/medium) → 12 columns (large and above).

| Breakpoint | Min width | Class prefix | Columns | Gutter |
|------------|-----------|--------------|---------|--------|
| Extra Small (default) | — | `.sgds-col-*` | 4 | 16px |
| Small | 512px | `.sgds-col-sm-*` | 8 | 16px |
| Medium | 768px | `.sgds-col-md-*` | 8 | 24px |
| Large | 1024px | `.sgds-col-lg-*` | 12 | 24px |
| Extra Large | 1280px | `.sgds-col-xl-*` | 12 | 32px |
| Extra Extra Large | 1440px | `.sgds-col-2-xl-*` | 12 | 32px |

Classes are mobile-first additive — define the XS span first, then override at larger breakpoints.

---

## Containers

### `.sgds-container` — standard full-page layout

Use for every page that does **not** have a persistent sidebar.

| Breakpoint | Max width |
|------------|-----------|
| XS (default) | `calc(100% - 40px)` — 20px outer margins |
| SM (512px+) | `calc(100% - 48px)` — 24px outer margins |
| MD (768px+) | `calc(100% - 56px)` — 28px outer margins |
| LG (1024px+) | 888px |
| XL (1280px+) | 1168px |
| 2-XL (1440px+) | 1312px |

### `.sgds-container-sidebar` — use inside sidebar app layouts

Use when content sits alongside a sticky sidebar (i.e. the Sidebar App Layout from the [Application Shell](../../sgds-pattern-block-templates/reference/application-shell.md)). Narrower max-widths preserve readable line lengths.

| Breakpoint | Max width |
|------------|-----------|
| MD (768px+) | `calc(100% - 96px)` — 48px margins |
| LG (1024px+) | 840px |
| XL (1280px+) | 888px |
| 2-XL (1440px+) | 1024px |

---

## Column Classes

### XS — 4 columns (default, no breakpoint prefix)

```
.sgds-col-1  .sgds-col-2  .sgds-col-3  .sgds-col-4
```

### SM — 8 columns (512px+)

```
.sgds-col-sm-1 through .sgds-col-sm-8
```

### MD — 8 columns (768px+)

```
.sgds-col-md-1 through .sgds-col-md-8
```

### LG — 12 columns (1024px+)

```
.sgds-col-lg-1 through .sgds-col-lg-12
```

### XL — 12 columns (1280px+)

```
.sgds-col-xl-1 through .sgds-col-xl-12
```

### 2-XL — 12 columns (1440px+)

```
.sgds-col-2-xl-1 through .sgds-col-2-xl-12
```

---

## Centered Columns

Horizontally centres a column within the grid without offset wrappers. Only even-numbered spans are available. The column starts at the calculated midpoint: `start = (total_cols − span) / 2 + 1`.

| Class | Available at | Span |
|-------|-------------|------|
| `.sgds-col-center-2` | XS (4-col grid) | 2 of 4 |
| `.sgds-col-sm-center-2` `.sgds-col-sm-center-4` `.sgds-col-sm-center-6` | SM (8-col) | 2, 4, 6 of 8 |
| `.sgds-col-md-center-2` `.sgds-col-md-center-4` `.sgds-col-md-center-6` | MD (8-col) | 2, 4, 6 of 8 |
| `.sgds-col-lg-center-2` through `.sgds-col-lg-center-10` | LG (12-col) | 2, 4, 6, 8, 10 of 12 |
| `.sgds-col-xl-center-2` through `.sgds-col-xl-center-10` | XL (12-col) | 2, 4, 6, 8, 10 of 12 |
| `.sgds-col-2-xl-center-2` through `.sgds-col-2-xl-center-10` | 2-XL (12-col) | 2, 4, 6, 8, 10 of 12 |

```html
<!-- Centred 8/12 block on large screens -->
<div class="sgds-container">
  <div class="sgds-grid">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-center-8">
      Centred content
    </div>
  </div>
</div>
```

---

## Visibility Classes

Hide a column at a specific breakpoint. Classes cascade: hiding at XS is revealed at SM; hiding at SM is revealed at MD; and so on.

| Class | Hidden at |
|-------|-----------|
| `.sgds-col-none` | XS (default) |
| `.sgds-col-sm-none` | SM (512px+) |
| `.sgds-col-md-none` | MD (768px+) |
| `.sgds-col-lg-none` | LG (1024px+) |
| `.sgds-col-xl-none` | XL (1280px+) |
| `.sgds-col-2-xl-none` | 2-XL (1440px+) |

```html
<!-- Show on desktop only -->
<div class="sgds-col-none sgds-col-lg-12">Desktop-only content</div>
```

---

## Common Patterns

### Mixed-span rows in one grid (e.g., dashboard charts)

All items — whether they share a row or span the full width — belong in **one** `.sgds-grid`. CSS Grid wraps them into rows automatically. Never create a separate `.sgds-grid` for each row.

```html
<!-- Row 1: 8/12 + 4/12. Row 2: 12/12. One grid covers everything. -->
<div class="sgds-container">
  <div class="sgds-grid sgds:gap-layout-sm">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">Wide chart</div>
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">Narrow chart</div>
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12">Full-width chart</div>
  </div>
</div>
```

### Full-width single column (mobile) → two halves (desktop)

```html
<div class="sgds-container">
  <div class="sgds-grid">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">Left</div>
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">Right</div>
  </div>
</div>
```

### Content (8) + aside (4) on large screens

```html
<div class="sgds-container">
  <div class="sgds-grid">
    <main class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">Main content</main>
    <aside class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">Sidebar</aside>
  </div>
</div>
```

### Three-column card grid

```html
<div class="sgds-container">
  <div class="sgds-grid">
    <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-4">Card 1</div>
    <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-4">Card 2</div>
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">Card 3</div>
  </div>
</div>
```

### Centred narrow content (e.g., login form, article body)

```html
<div class="sgds-container">
  <div class="sgds-grid">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-center-8">
      <h1>Article title</h1>
      <p>Body copy…</p>
    </div>
  </div>
</div>
```

### Within a sidebar layout

Use `.sgds-container-sidebar` instead of `.sgds-container` to get the narrower sidebar-aware widths.

```html
<div class="sgds-container-sidebar">
  <div class="sgds-grid">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12">Full-width within sidebar layout</div>
  </div>
</div>
```

---

## Quick Decision Guide

**Step 1 — Do you need a page container?**
- Full page, no sidebar → `.sgds-container`
- Content alongside a sidebar → `.sgds-container-sidebar`

**Step 2 — Do you need a column grid inside the container?**
- Yes → add `.sgds-grid` as a direct child

**Step 3 — What span does each child need?**
- Works on all screens the same → `.sgds-col-{n}` (use the max column count: 4 for XS, 8 for SM/MD, 12 for LG+)
- Changes across breakpoints → stack classes: `sgds-col-4 sgds-col-sm-8 sgds-col-lg-6`
- Needs to be centred → use the `-center-{n}` variant instead of the plain span class

**Step 4 — Need to hide at a breakpoint?**
- Add `.sgds-col-{bp}-none` to suppress the element at that width

**When to use Tailwind `sgds:grid-cols-*` instead?**
- Auto-filling card rows: `sgds:grid-cols-[repeat(auto-fill,_minmax(240px,1fr))]`
- Custom column counts not covered by 4/8/12 (rare)
- Non-grid flex layouts (use `sgds:flex` instead)

---

**For AI Agents**

1. **Always use SGDS grid classes first** — `.sgds-container` + `.sgds-grid` + `.sgds-col-*` before any Tailwind `sgds:grid-cols-*` utilities.
2. **Container choice is mandatory** — every `.sgds-grid` must be wrapped by either `.sgds-container` or `.sgds-container-sidebar`; never place `.sgds-grid` directly on `<body>` or a non-container wrapper.
3. **One grid per layout region, not one grid per row** — all items in a section (whether they share a row or span full width) go inside a single `.sgds-grid`. CSS Grid handles row wrapping automatically based on column spans; do not create a new `.sgds-grid` for each visual row.
4. **Mobile-first column definition**: start from XS then override upward. XS has 4 cols, SM/MD have 8, LG/XL/2-XL have 12.
5. **Column spans must not exceed the current breakpoint's total** — at XS max is 4; at SM/MD max is 8; at LG+ max is 12.
6. **Centred columns** only work for even spans (2, 4, 6, 8, 10) and only within the 12-column grid (LG+) or 8-column grid (SM/MD) as applicable.
7. **Sidebar container** is narrower by design — use `.sgds-container-sidebar` only when content is rendered inside the sidebar app layout's main slot.
8. **Do not nest `.sgds-container` inside `.sgds-container`** — one container per layout level.
9. For content that does NOT need multiple columns (e.g., a full-width hero or page header), skip `.sgds-grid` entirely — put the element directly inside `.sgds-container`.
