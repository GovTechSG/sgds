# Border Radius Theming

Customise the border radius of components by overriding the semantic border radius tokens. Each token controls the roundness of a specific group of components.

## Semantic border radius tokens

| Token | Default | Components |
|-------|---------|------------|
| `--sgds-indicator-border-radius` | sm (4px) | Badge, Skeleton |
| `--sgds-interactive-border-radius` | md (8px) | Button, Icon Button, Tab, Pagination, Close Button, Sidebar, Sidenav, Overflow Menu, Datepicker (calendar) |
| `--sgds-form-border-radius` | md (8px) | Input, Select, Combo Box, Textarea, Quantity Toggle, File Upload, Datepicker (input) |
| `--sgds-form-border-radius-subtle` | md (8px) | Checkbox |
| `--sgds-surface-border-radius` | lg (12px) | Card, Icon Card, Image Card, Thumbnail Card, Accordion, Alert, Description List |
| `--sgds-overlay-border-radius` | lg (12px) | Modal, Dropdown, Toast, Tooltip, Datepicker (calendar panel), Mainnav Dropdown |

## How to customise

Override the semantic tokens in your CSS:

```css
:root {
  --sgds-interactive-border-radius: var(--sgds-border-radius-lg);
  --sgds-surface-border-radius: var(--sgds-border-radius-xl);
  --sgds-overlay-border-radius: var(--sgds-border-radius-xl);
}
```

## Import order

Custom overrides must come **after** the theme file:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";

:root {
  --sgds-interactive-border-radius: var(--sgds-border-radius-lg);
  --sgds-surface-border-radius: var(--sgds-border-radius-xl);
  --sgds-overlay-border-radius: var(--sgds-border-radius-xl);
}
```

## Available primitive values

The semantic tokens should reference one of the primitive border radius values:

| Primitive token | Value |
|----------------|-------|
| `--sgds-border-radius-none` | 0px |
| `--sgds-border-radius-xs` | 2px |
| `--sgds-border-radius-sm` | 4px |
| `--sgds-border-radius-md` | 8px |
| `--sgds-border-radius-lg` | 12px |
| `--sgds-border-radius-xl` | 16px |
| `--sgds-border-radius-2-xl` | 24px |
| `--sgds-border-radius-3-xl` | 32px |
| `--sgds-border-radius-full` | 999px |

---

**For AI agents**: Border radius overrides target the **semantic** tokens (`--sgds-{purpose}-border-radius`), referencing primitive values via `var(--sgds-border-radius-{size})`. Do not tell users to override primitive tokens directly — override the semantic tokens instead so the intent is clear. Overrides must come after `themes/day.css`.
