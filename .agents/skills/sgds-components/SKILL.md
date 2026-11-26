---
name: "sgds-components"
description: "Use when users ask about any SGDS web component (<sgds-*>) — accordion, alert, badge, breadcrumb, button, card, checkbox, close-button, combo-box, data-table, datepicker, description-list, divider, drawer, dropdown, file-upload, footer, icon, icon-button, icon-card, icon-list, image-card, input, link, mainnav, masthead, modal, overflow-menu, pagination, progress-bar, quantity-toggle, radio, select, sidebar, sidenav, skeleton, spinner, stepper, subnav, switch, system-banner, tab, table, table-of-contents, textarea, thumbnail-card, toast, or tooltip. Complete reference including installation. For framework integration (React, Next.js, Vue, Angular), see sgds-getting-started."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: components
---

# SGDS Components Setup Skill

Prerequisites and framework integration for using `<sgds-*>` web components.

## Installation

```bash
npm install @govtechsg/sgds-web-component
# or
pnpm add @govtechsg/sgds-web-component
```

Import the library once at your app entry point:

```js
import "@govtechsg/sgds-web-component";
```

## Framework Integration

For React, Next.js, Vue, and Angular integration, see **[sgds-getting-started](../sgds-getting-started/SKILL.md)** Step 3.

---

## Troubleshooting Component Behaviour

When a component behaves unexpectedly — wrong event fired, property not reflected, slot not rendering — read the compiled source directly. It contains full method bodies, event logic, internal defaults, and edge-case handling that no documentation captures.

Read from `node_modules/@govtechsg/sgds-web-component` — this directory is present once the package is installed:

```
node_modules/@govtechsg/sgds-web-component/components/Accordion/sgds-accordion.js
node_modules/@govtechsg/sgds-web-component/components/Accordion/sgds-accordion-item.js
node_modules/@govtechsg/sgds-web-component/components/Accordion/sgds-accordion.d.ts
```

Replace `Accordion/sgds-accordion` with the relevant component folder and file name. The `.js` file contains the full implementation; the `.d.ts` file lists all properties, types, events, slots, and JSDoc descriptions.

**If `node_modules` is absent** — the package has not been installed. Ask the user to run their normal install step (`npm install` / `pnpm install`) before inspecting source files.

---

**For AI agents**: For framework-specific setup (React, Next.js, Vue, Angular), see the reference files in **[sgds-getting-started](../sgds-getting-started/SKILL.md)**.

When a user reports unexpected component behaviour (wrong event, property not reflecting, slot not rendering), direct them to read the compiled source before trying anything else — see the **Troubleshooting Component Behaviour** section above.

**Global rule — never set explicit widths on SGDS components.** Do not add `width`, `style="width: ..."`, or fixed-width utility classes (e.g. `sgds:w-40`) directly on any `<sgds-*>` element. Width is controlled by the parent layout — use flex, grid, or wrapper divs to constrain it. The only exception is when a user explicitly requests a fixed width.

---

## Available Components

| Category | Component | Reference |
|---|---|---|
| **Actions** | Button | [→ references/button.md](references/button.md) |
| **Actions** | Icon Button | [→ references/icon-button.md](references/icon-button.md) |
| **Actions** | Close Button | [→ references/close-button.md](references/close-button.md) |
| **Actions** | Link | [→ references/link.md](references/link.md) |
| **Actions** | Dropdown | [→ references/dropdown.md](references/dropdown.md) |
| **Actions** | Overflow Menu | [→ references/overflow-menu.md](references/overflow-menu.md) |
| **Navigation** | Masthead | [→ references/masthead.md](references/masthead.md) |
| **Navigation** | Main Nav | [→ references/mainnav.md](references/mainnav.md) |
| **Navigation** | Footer | [→ references/footer.md](references/footer.md) |
| **Navigation** | Breadcrumb | [→ references/breadcrumb.md](references/breadcrumb.md) |
| **Navigation** | Pagination | [→ references/pagination.md](references/pagination.md) |
| **Navigation** | Sidenav | [→ references/sidenav.md](references/sidenav.md) |
| **Navigation** | Sidebar | [→ references/sidebar.md](references/sidebar.md) |
| **Navigation** | Subnav | [→ references/subnav.md](references/subnav.md) |
| **Navigation** | Tab | [→ references/tab.md](references/tab.md) |
| **Navigation** | Table of Contents | [→ references/table-of-contents.md](references/table-of-contents.md) |
| **Layout** | Accordion | [→ references/accordion.md](references/accordion.md) |
| **Layout** | Divider | [→ references/divider.md](references/divider.md) |
| **Layout** | Drawer | [→ references/drawer.md](references/drawer.md) |
| **Layout** | Modal | [→ references/modal.md](references/modal.md) |
| **Content** | Badge | [→ references/badge.md](references/badge.md) |
| **Content** | Card | [→ references/card.md](references/card.md) |
| **Content** | Icon Card | [→ references/icon-card.md](references/icon-card.md) |
| **Content** | Image Card | [→ references/image-card.md](references/image-card.md) |
| **Content** | Thumbnail Card | [→ references/thumbnail-card.md](references/thumbnail-card.md) |
| **Content** | Description List | [→ references/description-list.md](references/description-list.md) |
| **Content** | Data Table | [→ references/data-table.md](references/data-table.md) |
| **Content** | Icon | [→ references/icon.md](references/icon.md) |
| **Content** | Icon List | [→ references/icon-list.md](references/icon-list.md) |
| **Content** | Table | [→ references/table.md](references/table.md) |
| **Content** | Tooltip | [→ references/tooltip.md](references/tooltip.md) |
| **Forms** | Input | [→ references/input.md](references/input.md) |
| **Forms** | Textarea | [→ references/textarea.md](references/textarea.md) |
| **Forms** | Select | [→ references/select.md](references/select.md) |
| **Forms** | Checkbox | [→ references/checkbox.md](references/checkbox.md) |
| **Forms** | Radio | [→ references/radio.md](references/radio.md) |
| **Forms** | Combo Box | [→ references/combo-box.md](references/combo-box.md) |
| **Forms** | Datepicker | [→ references/datepicker.md](references/datepicker.md) |
| **Forms** | File Upload | [→ references/file-upload.md](references/file-upload.md) |
| **Forms** | Quantity Toggle | [→ references/quantity-toggle.md](references/quantity-toggle.md) |
| **Feedback** | Switch | [→ references/switch.md](references/switch.md) |
| **Workflow** | Stepper | [→ references/stepper.md](references/stepper.md) |

---

## Form Input Components

When building forms, use these 9 form input components to capture user data:
1. `<sgds-input>` — text fields
2. `<sgds-textarea>` — multi-line text
3. `<sgds-select>` — dropdown selection
4. `<sgds-checkbox>` / `<sgds-checkbox-group>` — multiple choice
5. `<sgds-radio>` / `<sgds-radio-group>` — single choice
6. `<sgds-combo-box>` — searchable select
7. `<sgds-datepicker>` — date input
8. `<sgds-file-upload>` — file picker
9. `<sgds-quantity-toggle>` — numeric counter

**DO NOT use in forms (these are feedback/state, not input):**
- `<sgds-switch>` — This is a **feedback component** (displays toggle state), not a form input. Use `<sgds-checkbox>` or `<sgds-radio-group>` to collect user choice instead.
- Other non-input components (Alert, Badge, Button, Card, etc.) — These are layout/feedback, not form controls.

For form layout patterns (field pairing, spacing, width constraints, multi-step forms with `<sgds-stepper>`, header hierarchy), see the [sgds-blocks form layout skill](../sgds-blocks/references/form-layout.md).
| **Feedback** | Alert | [→ references/alert.md](references/alert.md) |
| **Feedback** | Spinner | [→ references/spinner.md](references/spinner.md) |
| **Feedback** | Skeleton | [→ references/skeleton.md](references/skeleton.md) |
| **Feedback** | Progress Bar | [→ references/progress-bar.md](references/progress-bar.md) |
| **Feedback** | Toast | [→ references/toast.md](references/toast.md) |
| **Feedback** | System Banner | [→ references/system-banner.md](references/system-banner.md) |
