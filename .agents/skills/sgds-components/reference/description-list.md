# SGDS Description List Component Skill

`<sgds-description-list>` renders a single label–value row. `<sgds-description-list-group>` wraps multiple rows with an optional group title and description. Use this instead of raw `<dl>/<dt>/<dd>` elements for consistent SGDS styling.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- Displaying a summary of structured data — names, statuses, references, dates, addresses.
- Review or confirmation screens where form input is presented as read-only key–value pairs.
- Detail panels, profile cards, or data tables with a label–value structure.
- When multiple rows share a logical group — wrap them in `<sgds-description-list-group>` with a title.

### When NOT to use

- For editable form fields — use `<sgds-input>`, `<sgds-select>`, or other form components.
- For tabular data with multiple columns — use `<sgds-table>` instead.
- When no label is needed — use plain text or `<sgds-badge>` for single values.
- For navigation or interactive lists — use `<sgds-icon-list>` or a nav component.

## Behaviour

- `<sgds-description-list>` renders one label (default slot) and one value (`data` slot) per row.
- `<sgds-description-list-group>` wraps multiple rows and accepts an optional `title` and `description` slot.
- `stacked` set on the group stacks each row's label above its value; it propagates automatically to all child rows — do not set it on individual rows.
- `bordered` set on the group adds a bottom border to each row; it also propagates automatically — do not set it on individual rows.
- Neither component has interactive states, events, or public methods — they are purely presentational.

## Advanced Considerations

- **Stacking propagation**: `stacked` on the group sets an internal property on each child `<sgds-description-list>` — setting it manually on individual rows has no visual effect beyond what the group already sets.
- **Bordered propagation**: same as `stacked` — always control via the group.
- **Responsive layout**: use `stacked` for compact or mobile-first layouts; switch to side-by-side (default) for wider containers.
- **Rich value content**: the `data` slot accepts any inline HTML — `<sgds-badge>`, `<a>`, `<strong>`, and spans are all valid; avoid block-level elements.

## Edge Cases

- **Empty `data` slot**: renders an empty value cell — always provide a fallback string (e.g. "—") when data may be absent.
- **`stacked` on individual row**: has no visible effect if the group does not also set `stacked` — always set on the group.
- **Very long labels or values**: wrap within their cell; side-by-side layout may look unbalanced — switch to `stacked` for long content.
- **Single row without group**: `<sgds-description-list>` works standalone; no `<sgds-description-list-group>` wrapper is required for a single row.
- **Dynamic content in `data` slot**: updating slotted content reactively works normally — the component re-renders the slot content as the DOM updates.

## Quick Decision Guide

**Single row or grouped?**
- One label–value pair → `<sgds-description-list>` alone
- Multiple rows with a shared title → wrap in `<sgds-description-list-group>`

**Layout**
- Side-by-side (default) → omit `stacked`
- Stacked (label above value) → add `stacked` on the group (propagates to all children automatically)

**Bordered?**
- No borders (default) → omit `bordered`
- Bottom border on rows → add `bordered` on the group (propagates to all children)

```html
<!-- Basic group -->
<sgds-description-list-group>
  <sgds-description-list>
    Label 1
    <span slot="data">Data value 1</span>
  </sgds-description-list>
  <sgds-description-list>
    Label 2
    <span slot="data">Data value 2</span>
  </sgds-description-list>
</sgds-description-list-group>

<!-- With optional title and description -->
<sgds-description-list-group>
  <span slot="title">Group Title</span>
  <span slot="description">Optional group description</span>
  <sgds-description-list>
    Label
    <span slot="data">Value</span>
  </sgds-description-list>
</sgds-description-list-group>

<!-- Stacked layout -->
<sgds-description-list-group stacked>
  <sgds-description-list>
    Label
    <span slot="data">Value</span>
  </sgds-description-list>
</sgds-description-list-group>

<!-- Bordered rows -->
<sgds-description-list-group bordered>
  <sgds-description-list>
    Label 1
    <span slot="data">Value 1</span>
  </sgds-description-list>
  <sgds-description-list>
    Label 2
    <span slot="data">Value 2</span>
  </sgds-description-list>
</sgds-description-list-group>
```

## API Summary — `<sgds-description-list-group>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `stacked` | boolean | `false` | Stacks label above value; propagated to all child `sgds-description-list` elements |
| `bordered` | boolean | `false` | Adds a border; propagated to all child `sgds-description-list` elements |

## API Summary — `<sgds-description-list>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `stacked` | boolean | `false` | Stacks label above value (set by parent group — do not set manually) |
| `bordered` | boolean | `false` | Bordered style (set by parent group — do not set manually) |

## Slots — `<sgds-description-list-group>`

| Slot | Purpose |
|---|---|
| *(default)* | `<sgds-description-list>` elements |
| `title` | Optional group title |
| `description` | Optional group description |

## Slots — `<sgds-description-list>`

| Slot | Purpose |
|---|---|
| *(default)* | Label text |
| `data` | Data / value content |

## Events

None on either component.

---

**For AI agents**:
1. Always use `<sgds-description-list-group>` + `<sgds-description-list>` for key-value data — never suggest raw `<dl>/<dt>/<dd>`.
2. Set `stacked` and `bordered` on the **group**, not on individual `<sgds-description-list>` elements — the group propagates them automatically.
3. The `data` slot on `<sgds-description-list>` holds the value; the default slot holds the label.
4. `title` and `description` slots on the group are optional — omit them when no group heading is needed.
5. There are no custom events on either component.
