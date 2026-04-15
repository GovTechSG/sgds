---
name: "sgds-components"
description: "Complete reference for all SGDS web components including installation and framework integration. Use when users ask about any <sgds-*> component — accordion, alert, badge, breadcrumb, button, card, checkbox, close-button, combo-box, datepicker, description-list, divider, drawer, dropdown, file-upload, footer, icon, icon-button, icon-card, icon-list, image-card, input, link, mainnav, masthead, modal, overflow-menu, pagination, progress-bar, quantity-toggle, radio, select, sidebar, sidenav, skeleton, spinner, stepper, subnav, switch, system-banner, tab, table, table-of-contents, textarea, thumbnail-card, toast, or tooltip. Also covers React 19+, React ≤18, Vue, Angular, and Next.js integration."
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

### React

**React version determines which import to use.**

#### React 19+ (client-side, e.g. Vite)

React 19 supports native custom elements directly — import once at the app entry point, then use the web component tag anywhere:

```jsx
import "@govtechsg/sgds-web-component";

function App() {
  return (
    <sgds-button variant="primary" onsgds-blur={(e) => console.log(e)}>
      Click Me
    </sgds-button>
  );
}
```

Custom event syntax in React 19: prefix the event name with `on` in lowercase (`sgds-blur` → `onsgds-blur`).

> **Using Next.js?** Next.js is SSR-based and requires a different setup — see the [Next.js section](#nextjs) below.

Complex props (arrays, objects) can be passed declaratively:

```jsx
import "@govtechsg/sgds-web-component";

const steps = [
  { component: <Step1 />, stepHeader: "Personal details" },
  { component: <Step2 />, stepHeader: "Contact details" },
];

function App() {
  return <sgds-stepper steps={steps}></sgds-stepper>;
}
```

#### React 18 and below

React ≤18 does not support custom element events or complex props natively. Use the React wrapper components:

```jsx
import { SgdsButton } from "@govtechsg/sgds-web-component/react";

function App() {
  return (
    <SgdsButton variant="primary" onSgdsBlur={(e) => console.log(e)}>
      Click Me
    </SgdsButton>
  );
}
```

React wrapper event naming: `sgds-blur` → `onSgdsBlur`, `sgds-change` → `onSgdsChange` (prefix `on`, camelCase applies to every hyphen-separated word).

**Accessing component methods in React ≤18** (via `useRef`):

```tsx
import { useRef } from "react";
import type { SgdsStepper as SStep } from "@govtechsg/sgds-web-component/components";
import SgdsStepper from "@govtechsg/sgds-web-component/react/stepper/index.js";

function StepperComponent() {
  const stepperRef = useRef<SStep>(null);
  return <SgdsStepper steps={steps} ref={stepperRef} />;
}
```

> **Note**: The React wrappers will be phased out in a future major version. Migrate to React 19+ native usage when possible.

Official docs: https://webcomponent.designsystem.tech.gov.sg/?path=/docs/frameworks-react--docs

---

### Next.js

Next.js is an SSR framework — web components rely on browser APIs and will error if imported at the module level during server-side rendering.

**Step 1 — Create `sgds.tsx` (library loader)**

```tsx
'use client';

import { useEffect } from 'react';

const SgdsLibraryLoader = () => {
  useEffect(() => {
    (async () => {
      await import('@govtechsg/sgds-web-component');
    })();
  }, []);

  return null;
};

export default SgdsLibraryLoader;
```

**Step 2 — Add to root layout `<head>`**

```tsx
// src/app/layout.tsx
import SgdsLibraryLoader from './sgds';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <SgdsLibraryLoader />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

**Step 3 — Use components directly** with `suppressHydrationWarning`

```tsx
<sgds-masthead suppressHydrationWarning></sgds-masthead>
```

**Step 4 — TypeScript support** — add a `types.d.ts` at the project root and reference the SGDS React type definitions. This gives full IntelliSense for props and typed `CustomEvent` detail payloads on all `sgds-*` elements:

Use an ES import in any `.d.ts` file included by your `tsconfig`:

```ts
import "@govtechsg/sgds-web-component/types/react";
```

**Events in Next.js** — due to hydration timing, wire custom events via `useEffect` + `addEventListener` rather than declarative React props:

```tsx
'use client';
import { useEffect, useRef } from 'react';

export default function MyInput() {
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: Event) => console.log((e.target as any).value);
    el.addEventListener('sgds-input', handler);
    return () => el.removeEventListener('sgds-input', handler);
  }, []);

  return <sgds-input ref={ref} suppressHydrationWarning />;
}
```

**Organise into reusable React components** — do not inline `useEffect` / `addEventListener` alongside business logic. Wrap each SGDS element in a dedicated client component that exposes typed props and forwards events via callbacks:

```tsx
// components/sgds/SgdsInput.tsx
'use client';
import { useEffect, useRef, useCallback } from 'react';

interface SgdsInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onSgdsInput?: (value: string) => void;
  onSgdsChange?: (value: string) => void;
}

export default function SgdsInput({ label, placeholder, value, onSgdsInput, onSgdsChange }: SgdsInputProps) {
  const ref = useRef<any>(null);
  const onSgdsInputRef = useRef(onSgdsInput);
  const onSgdsChangeRef = useRef(onSgdsChange);
  onSgdsInputRef.current = onSgdsInput;
  onSgdsChangeRef.current = onSgdsChange;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleInput = (e: Event) => onSgdsInputRef.current?.((e.target as any).value);
    const handleChange = (e: Event) => onSgdsChangeRef.current?.((e.target as any).value);

    el.addEventListener('sgds-input', handleInput);
    el.addEventListener('sgds-change', handleChange);
    return () => {
      el.removeEventListener('sgds-input', handleInput);
      el.removeEventListener('sgds-change', handleChange);
    };
  }, []);

  return (
    <sgds-input
      ref={ref}
      label={label}
      placeholder={placeholder}
      value={value}
      suppressHydrationWarning
    />
  );
}
```

Then consume it like any React component — no event wiring in the page:

```tsx
// app/contact/page.tsx
'use client';
import SgdsInput from '@/components/sgds/SgdsInput';

export default function ContactPage() {
  const [name, setName] = useState('');
  return <SgdsInput label="Name" placeholder="Enter name" onSgdsInput={setName} />;
}
```

Place all SGDS wrappers under a shared directory (e.g. `components/sgds/`) so they are discoverable and reusable across pages.

See the [official Next.js integration docs](https://webcomponent.designsystem.tech.gov.sg/?path=/docs/frameworks-react--docs) for more detail.

---

### Vue

Vue 3 supports web components natively — no SGDS-specific wrappers exist. Refer to the [Vue + web components documentation](https://vuejs.org/guide/extras/web-components) for configuration. The SGDS-specific filter for suppressing unknown element warnings is `tag.startsWith("sgds-")`.

---

### Angular

Angular supports web components natively via `CUSTOM_ELEMENTS_SCHEMA` — no SGDS-specific wrappers exist. Refer to the [Angular elements documentation](https://angular.io/guide/elements) for configuration.

---

## Troubleshooting Component Behaviour

When a component behaves unexpectedly — wrong event fired, property not reflected, slot not rendering — read the compiled source directly. It contains full method bodies, event logic, internal defaults, and edge-case handling that no documentation captures.

**Always check `node_modules` first** — if `node_modules/@govtechsg/sgds-web-component` exists, read from there:

```
node_modules/@govtechsg/sgds-web-component/components/Accordion/sgds-accordion.js
node_modules/@govtechsg/sgds-web-component/components/Accordion/sgds-accordion-item.js
node_modules/@govtechsg/sgds-web-component/components/Accordion/sgds-accordion.d.ts
```

Replace `Accordion/sgds-accordion` with the relevant component folder and file name. The `.js` file contains the full implementation; the `.d.ts` file lists all properties, types, events, slots, and JSDoc descriptions.

**Only if `node_modules` is absent (CDN users)** — browse the source for the exact version in use on the npm package page:

```
https://www.npmjs.com/package/@govtechsg/sgds-web-component/v/{version}?activeTab=code
```

Example for `v3.4.0-rc.4`:
```
https://www.npmjs.com/package/@govtechsg/sgds-web-component/v/3.4.0-rc.4?activeTab=code
```

Navigate into `components/{ComponentName}/` to find the same `.js` and `.d.ts` files. Ask the user for their version if unknown — it is visible in the CDN `<script>` or `<link>` tag URL they are using.

---

**For AI agents**: The primary decision tree is React version + rendering mode:
- **React 19+ CSR (Vite etc.)**: native `<sgds-*>` tag + direct import, event props lowercase with `on` prefix (`onsgds-change`)
- **Next.js (SSR)**: `SgdsLibraryLoader` + `useEffect` dynamic import — never a top-level import; wire events via `addEventListener` in `useEffect`
- **React ≤18**: SGDS React wrapper package, camelCase event props (`onSgdsChange`)
- **Vue / Angular**: standard web component integration; SGDS-specific detail for Vue is `tag.startsWith("sgds-")` to suppress unknown element warnings

When a user reports unexpected component behaviour (wrong event, property not reflecting, slot not rendering), direct them to read the compiled source before trying anything else — see the **Troubleshooting Component Behaviour** section above.

**Global rule — never set explicit widths on SGDS components.** Do not add `width`, `style="width: ..."`, or fixed-width utility classes (e.g. `sgds:w-40`) directly on any `<sgds-*>` element. Width is controlled by the parent layout — use flex, grid, or wrapper divs to constrain it. The only exception is when a user explicitly requests a fixed width.

---

## Available Components

| Category | Component | Reference |
|---|---|---|
| **Actions** | Button | [→ reference/button.md](reference/button.md) |
| **Actions** | Icon Button | [→ reference/icon-button.md](reference/icon-button.md) |
| **Actions** | Close Button | [→ reference/close-button.md](reference/close-button.md) |
| **Actions** | Link | [→ reference/link.md](reference/link.md) |
| **Actions** | Dropdown | [→ reference/dropdown.md](reference/dropdown.md) |
| **Actions** | Overflow Menu | [→ reference/overflow-menu.md](reference/overflow-menu.md) |
| **Navigation** | Masthead | [→ reference/masthead.md](reference/masthead.md) |
| **Navigation** | Main Nav | [→ reference/mainnav.md](reference/mainnav.md) |
| **Navigation** | Footer | [→ reference/footer.md](reference/footer.md) |
| **Navigation** | Breadcrumb | [→ reference/breadcrumb.md](reference/breadcrumb.md) |
| **Navigation** | Pagination | [→ reference/pagination.md](reference/pagination.md) |
| **Navigation** | Sidenav | [→ reference/sidenav.md](reference/sidenav.md) |
| **Navigation** | Sidebar (RC) | [→ reference/sidebar.md](reference/sidebar.md) |
| **Navigation** | Subnav | [→ reference/subnav.md](reference/subnav.md) |
| **Navigation** | Tab | [→ reference/tab.md](reference/tab.md) |
| **Navigation** | Table of Contents | [→ reference/table-of-contents.md](reference/table-of-contents.md) |
| **Layout** | Accordion | [→ reference/accordion.md](reference/accordion.md) |
| **Layout** | Divider | [→ reference/divider.md](reference/divider.md) |
| **Layout** | Drawer | [→ reference/drawer.md](reference/drawer.md) |
| **Layout** | Modal | [→ reference/modal.md](reference/modal.md) |
| **Content** | Badge | [→ reference/badge.md](reference/badge.md) |
| **Content** | Card | [→ reference/card.md](reference/card.md) |
| **Content** | Icon Card | [→ reference/icon-card.md](reference/icon-card.md) |
| **Content** | Image Card | [→ reference/image-card.md](reference/image-card.md) |
| **Content** | Thumbnail Card | [→ reference/thumbnail-card.md](reference/thumbnail-card.md) |
| **Content** | Description List | [→ reference/description-list.md](reference/description-list.md) |
| **Content** | Icon | [→ reference/icon.md](reference/icon.md) |
| **Content** | Icon List | [→ reference/icon-list.md](reference/icon-list.md) |
| **Content** | Table | [→ reference/table.md](reference/table.md) |
| **Content** | Tooltip | [→ reference/tooltip.md](reference/tooltip.md) |
| **Forms** | Input | [→ reference/input.md](reference/input.md) |
| **Forms** | Textarea | [→ reference/textarea.md](reference/textarea.md) |
| **Forms** | Select | [→ reference/select.md](reference/select.md) |
| **Forms** | Checkbox | [→ reference/checkbox.md](reference/checkbox.md) |
| **Forms** | Radio | [→ reference/radio.md](reference/radio.md) |
| **Forms** | Combo Box | [→ reference/combo-box.md](reference/combo-box.md) |
| **Forms** | Datepicker | [→ reference/datepicker.md](reference/datepicker.md) |
| **Forms** | File Upload | [→ reference/file-upload.md](reference/file-upload.md) |
| **Forms** | Quantity Toggle | [→ reference/quantity-toggle.md](reference/quantity-toggle.md) |
| **Forms** | Switch | [→ reference/switch.md](reference/switch.md) |
| **Forms** | Stepper | [→ reference/stepper.md](reference/stepper.md) |
| **Feedback** | Alert | [→ reference/alert.md](reference/alert.md) |
| **Feedback** | Spinner | [→ reference/spinner.md](reference/spinner.md) |
| **Feedback** | Skeleton | [→ reference/skeleton.md](reference/skeleton.md) |
| **Feedback** | Progress Bar | [→ reference/progress-bar.md](reference/progress-bar.md) |
| **Feedback** | Toast | [→ reference/toast.md](reference/toast.md) |
| **Feedback** | System Banner | [→ reference/system-banner.md](reference/system-banner.md) |
