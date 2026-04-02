# SGDS Description List Component Skill

`<sgds-description-list>` renders a single label–value row. `<sgds-description-list-group>` wraps multiple rows with an optional group title and description. Use this instead of raw `<dl>/<dt>/<dd>` elements for consistent SGDS styling.

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
