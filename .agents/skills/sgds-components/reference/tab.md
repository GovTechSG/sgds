# SGDS Tab Component Skill

`<sgds-tab-group>` coordinates `<sgds-tab>` and `<sgds-tab-panel>` elements. Each tab's `panel` attribute must match a tab panel's `name` attribute — this is how the tab and its content are linked.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When content can be split into distinct, mutually exclusive sections and users need to switch between them without leaving the page.
- For categorised content where only one section needs to be visible at a time (e.g. product details, settings categories, filtered views).
- When vertical navigation between content sections is preferred — use `orientation="vertical"`.

### When NOT to use

- When users need to compare content across sections simultaneously — consider showing all sections instead.
- For sequential steps where order matters — use `<sgds-stepper>` instead.
- For primary page navigation — use `<sgds-mainnav>` or `<sgds-sidenav>`.
- When there are fewer than 2 tabs — a single tab provides no value; show the content directly.
- When there are more tabs than can reasonably fit in the tab list — consider grouping or a different navigation pattern.

## Behaviour

- `<sgds-tab>` elements must be placed in the `nav` slot of `<sgds-tab-group>`; `<sgds-tab-panel>` elements go in the default slot.
- Each `<sgds-tab panel="x">` is linked to a `<sgds-tab-panel name="x">` by matching `panel` and `name` values — mismatches result in no panel being shown.
- The first non-disabled tab is active by default; add `active` to a specific `<sgds-tab>` to override the initial selection.
- `disabled` on a `<sgds-tab>` prevents selection and skips the tab during keyboard navigation.
- `variant` controls visual style: `underlined` (default) or `solid`. Set on `<sgds-tab-group>` — propagates to all child tabs.
- `orientation` controls layout: `horizontal` (default) or `vertical`. Set on `<sgds-tab-group>`.
- `density` controls spacing: `default` or `compact`. Set on `<sgds-tab-group>`.
- Fires `sgds-tab-show` (with `event.detail.name`) when a tab is activated and `sgds-tab-hide` when it is deactivated.
- No public methods on `<sgds-tab-group>`.

## Component Composition

**`nav` slot (`<sgds-tab-group>`)** — only `<sgds-tab slot="nav" panel="...">` elements. Do not place any other content in this slot.

**Default slot (`<sgds-tab-group>`)** — only `<sgds-tab-panel name="...">` elements. The `panel` value on `<sgds-tab>` and the `name` value on `<sgds-tab-panel>` must match exactly — a typo in either results in a tab with no visible content.

**`<sgds-tab>` default slot** — the tab label text (1–3 words recommended). Keep labels concise to avoid overflow on narrow screens.

**`<sgds-tab-panel>` default slot** — any content that would appear in a normal page section: text, forms, tables, lists, `<sgds-card>` grids. Each panel is an independent content area.

**Avoid placing inside tab panels:**
- Nested `<sgds-tab-group>` — nested tabs are a known accessibility and usability anti-pattern
- Content that users need to compare simultaneously across panels — show it side by side instead

## Advanced Considerations

- **`panel`/`name` matching**: the link between a tab and its panel is entirely string-based — a typo in either attribute results in a broken tab with no panel displayed. Always verify both values match exactly.
- **`active` attribute**: sets the initially active tab at render time only; once the tab group is interactive, active state is managed internally and the `active` attribute is not reactively updated.
- **`variant` and `density` propagation**: these are set on `<sgds-tab-group>` and automatically propagate to all child `<sgds-tab>` elements — do not set them on individual tabs.
- **`sgds-tab-show` / `sgds-tab-hide`**: both events fire with `event.detail.name` (the panel name string) — use to lazy-load content, track analytics, or sync URL state with the active tab.
- **No public methods**: programmatic tab activation is not supported via methods — manage active state by adding/removing the `active` attribute on a `<sgds-tab>` directly if needed.

## Edge Cases

- **Mismatched `panel` / `name`**: the tab renders but clicking it shows no content — always keep `panel` and `name` in sync.
- **All tabs disabled**: the tab group renders with no selectable tab — ensure at least one tab is enabled.
- **No `active` tab set**: the first non-disabled tab is selected automatically; this is correct behaviour, not a bug.
- **Dynamically added tabs**: tabs added after initial render may not be registered — initialise the full tab list before mounting the component where possible.
- **Long tab labels**: may overflow the tab bar on narrow viewports — keep labels concise (1–3 words) or use `orientation="vertical"` for longer labels.

## Quick Decision Guide

**Visual style?**
- Underline tabs → `variant="underlined"` (default)
- Solid/pill tabs → `variant="solid"`

**Orientation?**
- Horizontal tabs → `orientation="horizontal"` (default)
- Vertical side tabs → `orientation="vertical"`

**Compact spacing?** → `density="compact"` on `<sgds-tab-group>`

**Set initial active tab?** → Add `active` to the specific `<sgds-tab>`

**Set initial active tab (first loaded tab)?** → The first non-disabled tab is active by default

```html
<!-- Basic tab group -->
<sgds-tab-group>
  <sgds-tab slot="nav" panel="home">Home</sgds-tab>
  <sgds-tab slot="nav" panel="profile">Profile</sgds-tab>
  <sgds-tab slot="nav" panel="settings" disabled>Settings</sgds-tab>

  <sgds-tab-panel name="home">
    <p>Welcome to the home tab content.</p>
  </sgds-tab-panel>
  <sgds-tab-panel name="profile">
    <p>Profile information goes here.</p>
  </sgds-tab-panel>
  <sgds-tab-panel name="settings">
    <p>Settings are not available.</p>
  </sgds-tab-panel>
</sgds-tab-group>

<!-- Solid variant, compact density -->
<sgds-tab-group variant="solid" density="compact">
  <sgds-tab slot="nav" panel="tab1">Tab One</sgds-tab>
  <sgds-tab slot="nav" panel="tab2" active>Tab Two (starts active)</sgds-tab>
  <sgds-tab-panel name="tab1">Content for tab one.</sgds-tab-panel>
  <sgds-tab-panel name="tab2">Content for tab two.</sgds-tab-panel>
</sgds-tab-group>

<!-- Vertical orientation -->
<sgds-tab-group orientation="vertical">
  <sgds-tab slot="nav" panel="section1">Section 1</sgds-tab>
  <sgds-tab slot="nav" panel="section2">Section 2</sgds-tab>
  <sgds-tab-panel name="section1">Section 1 content.</sgds-tab-panel>
  <sgds-tab-panel name="section2">Section 2 content.</sgds-tab-panel>
</sgds-tab-group>

<!-- Listen to tab change -->
<sgds-tab-group id="my-tabs">
  <sgds-tab slot="nav" panel="a">Tab A</sgds-tab>
  <sgds-tab slot="nav" panel="b">Tab B</sgds-tab>
  <sgds-tab-panel name="a">Content A</sgds-tab-panel>
  <sgds-tab-panel name="b">Content B</sgds-tab-panel>
</sgds-tab-group>

<script>
  document.getElementById("my-tabs").addEventListener("sgds-tab-show", e => {
    console.log("Active tab:", e.detail.name);
  });
</script>
```

## API Summary

### `<sgds-tab-group>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `underlined \| solid` | `underlined` | Visual style of the tab list |
| `orientation` | `horizontal \| vertical` | `horizontal` | Layout direction of the tabs |
| `density` | `default \| compact` | `default` | Spacing of the tab items |

### `<sgds-tab>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `panel` | string | `""` | **Required** — must match the `name` of a `<sgds-tab-panel>` |
| `active` | boolean | `false` | Sets this tab as active on initial load |
| `disabled` | boolean | `false` | Prevents the tab from being selected |

### `<sgds-tab-panel>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `name` | string | — | **Required** — must match the `panel` of a `<sgds-tab>` |

## Slots

| Component | Slot | Purpose |
|---|---|---|
| `<sgds-tab-group>` | `nav` | `<sgds-tab>` elements go here |
| `<sgds-tab-group>` | *(default)* | `<sgds-tab-panel>` elements go here |
| `<sgds-tab>` | *(default)* | Tab label text |
| `<sgds-tab-panel>` | *(default)* | Tab panel content |

## Events (`<sgds-tab-group>`)

| Event | Cancelable | Detail | When |
|---|---|---|---|
| `sgds-tab-show` | No | `{ name: string }` | A tab and its panel are shown |
| `sgds-tab-hide` | No | `{ name: string }` | A tab and its panel are hidden |

---

**For AI agents**:
1. `<sgds-tab>` must have `slot="nav"` and its `panel` must exactly match a `<sgds-tab-panel>`'s `name`.
2. `variant`, `orientation`, and `density` are set on `<sgds-tab-group>` — they propagate automatically to all child `<sgds-tab>` elements.
3. `sgds-tab-show` and `sgds-tab-hide` both carry `event.detail.name` which is the panel name string.
4. To set the initially active tab, add `active` to one `<sgds-tab>` — if none are active, the first non-disabled tab is selected.
5. There are no public methods on the tab group.
