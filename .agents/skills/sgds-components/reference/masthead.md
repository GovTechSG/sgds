# SGDS Masthead Component Skill

`<sgds-masthead>` renders the mandatory Official Government Banner required on every page of a .gov.sg digital service. It displays the Singapore crest, the "A Singapore Government Agency Website" identity text, and an expandable "How to identify" panel that explains `.gov.sg` and HTTPS trust signals.

> **Mandatory usage**: All .gov.sg digital services must include this banner at the top of every page, as mandated by the Singapore Government Design System guidelines.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- On **every page** of every .gov.sg digital service — this is a mandatory compliance requirement, not optional.
- Always as the topmost element on the page, above all navigation and content.
- Use `fluid` when the page uses a full-width layout to match the banner to the grid.

### When NOT to use

- Do not omit it on any page of a .gov.sg service — there are no valid exceptions.
- Do not build a custom government identity banner — always use `<sgds-masthead>`.
- Do not place it below navigation or inside a container — it must be the very first element.

## Behaviour

- Always renders the Singapore crest, "A Singapore Government Agency Website" identity text, and a "How to identify" toggle button.
- The "How to identify" panel is hidden by default and expands when the toggle is activated — managed entirely by internal state.
- All content (crest, text, identification panel) is rendered internally and is not customisable via slots.
- `fluid` removes the max-width constraint so the banner stretches to full screen width.
- The toggle uses `role="button"`, `tabindex="0"`, and `aria-expanded` — keyboard accessible via `Enter` and `Space`.
- No public events or public methods.

## Advanced Considerations

- **Mandatory placement**: `<sgds-masthead>` must be the first rendered element in the page — above `<sgds-system-banner>`, `<sgds-mainnav>`, and all other content.
- **`fluid` usage**: match `fluid` to the page grid — if the page uses a fluid container, add `fluid` to the masthead so the banner stretches consistently.
- **No customisation**: all internal content (crest, identity text, identification panel) is fixed by the design system and cannot be modified via slots, CSS parts, or attributes.
- **SSR / framework setup**: for import and loader configuration see the sgds-components SKILL.md.

## Edge Cases

- **Omitted from a page**: violates .gov.sg compliance requirements — always include on every page.
- **Placed below navigation**: violates page layout requirements — the masthead must always be the topmost element.
- **Missing `fluid` on full-width layouts**: the banner will be constrained to a max-width while the rest of the page is full-width — always match `fluid` to the page layout.

## Quick Decision Guide

**Does content need to stretch full screen width?**
- Constrained to max-width (default) → omit `fluid` or set `fluid="false"`
- Full-width layout (e.g., fluid grid pages) → add `fluid`

**Placement**
- Always the first element on the page, above all navigation and content.

```html
<!-- Standard usage — always placed at the very top of the page -->
<sgds-masthead></sgds-masthead>

<!-- Full-width layout -->
<sgds-masthead fluid></sgds-masthead>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `fluid` | boolean | `false` | Removes the max-width constraint so the banner stretches to full screen width |

## Slots

This component has no public slots. All content (crest, text, identification panel) is rendered internally and is not customisable via slots.

## Events

This component has no public events. The "How to identify" toggle is managed entirely by internal state.

## Anatomy

The banner consists of two layers:

1. **Banner bar** — always visible; shows the Singapore crest, "A Singapore Government Agency Website", and the "How to identify" button.
2. **Identification panel** — hidden by default; expands when the user activates "How to identify". Contains:
   - *Official website links end with .gov.sg* — with a link to the trusted websites list
   - *Secure websites use HTTPS* — explains the lock icon indicator

The toggle button uses `role="button"`, `tabindex="0"`, and `aria-expanded` — keyboard accessible via Enter and Space.

## Placement Rule

`<sgds-masthead>` must be the topmost UI component on every page — above the main navigation, above all other content. The framework or application structure is the developer's responsibility; the requirement is simply that nothing sits above the masthead in the rendered page.

---

**For AI agents**: `<sgds-masthead>` is a mandatory compliance requirement on every .gov.sg page — not optional, not just the homepage. It must appear above main navigation. The only component-specific decision is `fluid` for full-width layouts. For library setup questions (imports, SSR loaders, framework config), direct users to **[sgds-components](../SKILL.md)**. Do not suggest building a custom government banner — always use this component.
