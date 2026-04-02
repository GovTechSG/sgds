# Filter Sidebar — Checkbox

A vertical filter panel that groups content dimensions into labelled sections. Each section uses `sgds-checkbox-group` so users can select multiple values within a category. A "Clear all" link at the top resets all selections.

## When to use

- A page shows a list of items (events, records, products, articles) that users need to narrow down
- Items can be classified along multiple independent dimensions (type, status, date range, location, etc.)
- Multiple values within a dimension can be selected at once (inclusive filtering)

## Block anatomy

```
Filter sidebar
├── Filter header
│   ├── "Filter by" heading
│   └── "Clear all" link (sgds-link)
└── Filter group (repeat per category)
    ├── Category label (div, text-base semibold)
    └── sgds-checkbox-group
        └── sgds-checkbox × N  (one per option, with item count)
```

## Complete block

```html
<aside class="sgds:flex sgds:flex-col sgds:gap-2-xl">

  <!-- Filter header -->
  <div class="sgds:flex sgds:gap-4 sgds:items-center">
    <span class="sgds:text-xl sgds:font-semibold sgds:text-default">Filter by</span>
    <sgds-link><a href="#">Clear all</a></sgds-link>
  </div>

  <!-- Category 1 -->
  <div class="sgds:flex sgds:flex-col sgds:gap-xs">
    <div class="sgds:text-base sgds:font-semibold sgds:text-default">Programme type</div>
    <sgds-checkbox-group>
      <sgds-checkbox value="opening-address">Opening Address (1)</sgds-checkbox>
      <sgds-checkbox value="keynote">Keynote (4)</sgds-checkbox>
      <sgds-checkbox value="panel-discussion">Panel Discussion (6)</sgds-checkbox>
      <sgds-checkbox value="presentation">Presentation (12)</sgds-checkbox>
    </sgds-checkbox-group>
  </div>

  <!-- Category 2 -->
  <div class="sgds:flex sgds:flex-col sgds:gap-xs">
    <div class="sgds:text-base sgds:font-semibold sgds:text-default">Sessions</div>
    <sgds-checkbox-group>
      <sgds-checkbox value="morning">Morning (12)</sgds-checkbox>
      <sgds-checkbox value="afternoon">Afternoon (16)</sgds-checkbox>
    </sgds-checkbox-group>
  </div>

  <!-- Category 3 -->
  <div class="sgds:flex sgds:flex-col sgds:gap-xs">
    <div class="sgds:text-base sgds:font-semibold sgds:text-default">Track</div>
    <sgds-checkbox-group>
      <sgds-checkbox value="ai-cybersecurity">AI x Cybersecurity (4)</sgds-checkbox>
      <sgds-checkbox value="resilient-cloud">Resilient and Secure Cloud (6)</sgds-checkbox>
      <sgds-checkbox value="cisos-future">CISOs of the Future (8)</sgds-checkbox>
    </sgds-checkbox-group>
  </div>

  <!-- Category 4 -->
  <div class="sgds:flex sgds:flex-col sgds:gap-xs">
    <div class="sgds:text-base sgds:font-semibold sgds:text-default">Event hall</div>
    <sgds-checkbox-group>
      <sgds-checkbox value="hall-a">Hall A</sgds-checkbox>
      <sgds-checkbox value="hall-b">Hall B</sgds-checkbox>
      <sgds-checkbox value="hall-c">Hall C</sgds-checkbox>
    </sgds-checkbox-group>
  </div>

</aside>
```

## Sizing in a two-column layout

When placed beside a content area, constrain the sidebar width and let the content column grow:

```html
<div class="sgds:flex sgds:gap-layout-md sgds:items-start">

  <aside class="sgds:shrink-0 sgds:w-64 sgds:flex sgds:flex-col sgds:gap-2-xl">
    <!-- block content here -->
  </aside>

  <div class="sgds:flex-1">
    <!-- cards, table, results, etc. -->
  </div>

</div>
```

- `sgds:shrink-0` — prevents the sidebar from compressing when the content area is wide
- `sgds:w-64` — fixed 256px width; adjust to `sgds:w-56` or `sgds:w-72` if needed
- `sgds:flex-1` on the content column — fills remaining space

## Key visual rules

- **Category label**: `<div>` with `sgds:text-base sgds:font-semibold sgds:text-default` — not a `<p>` or heading tag, as it's a UI label not document structure
- **Group gap**: `sgds:gap-2-xl` between filter sections — generous spacing prevents the panel feeling cramped
- **Item count in label**: append `(n)` to each checkbox label to show how many results match — helps users decide which filters are worth applying
- **Clear all**: use `<sgds-link>` (not a button) — it's a navigational reset action, not a form submission

## For AI agents

1. Replace category names, `value` attributes, and item counts to match the user's actual data.
2. Add or remove `<div class="sgds:flex sgds:flex-col sgds:gap-xs">` blocks freely — each block is one independent filter dimension.
3. "Clear all" should reset all `sgds-checkbox` checked states. Wire it in JS: `document.querySelectorAll('sgds-checkbox').forEach(cb => cb.checked = false)`.
4. This block has no page chrome. Wrap it in a page template from **[sgds-pattern-page-templates](../../sgds-pattern-page-templates/SKILL.md)**.
