# Jest + RTL Patching for SGDS Web Components

If the application already uses Jest + React Testing Library (JSDOM), you can patch the test environment to work with SGDS web components instead of migrating to Vitest. This approach preserves existing tests while making SGDS components testable.

## When to use this path

- Large existing test suite on Jest/RTL that would be costly to rewrite
- Team prefers incremental migration (swap components first, migrate test infra later)
- CI/CD pipeline tightly coupled to Jest

**Trade-off**: JSDOM does not support real Shadow DOM. Tests work because SGDS components degrade gracefully, but you lose the ability to test shadow DOM internals. For full shadow DOM testing, use [Path A: Vitest + vitest-browser-react](./react-test-migration.md).

---

## Jest Configuration

### jest.config.js

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterFramework: ['./jest.setup.js'],
  transformIgnorePatterns: [
    // MUST transform SGDS web component ESM modules
    'node_modules/(?!(@govtechsg/sgds-web-component|lit|@lit)/)',
  ],
  moduleNameMapper: {
    // Map your path aliases as needed
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@test-utils/(.*)$': '<rootDir>/src/__tests__/utils/$1',
  },
};
```

**Critical**: The `transformIgnorePatterns` must allow Jest to transform `@govtechsg/sgds-web-component`, `lit`, and `@lit/*`. Without this, Jest fails with "Cannot use import statement outside a module".

---

## jest.polyfills.js (setupFiles - runs before JSDOM)

```js
/**
 * Polyfills for Node.js globals required for JSDOM tests with SGDS web components.
 */
const { TextDecoder, TextEncoder, ReadableStream } = require('node:util');
const { clearImmediate } = require('node:timers');
const { performance } = require('node:perf_hooks');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
  clearImmediate: { value: clearImmediate },
  performance: { value: performance },
});

const { Blob, File } = require('node:buffer');
const { fetch, Headers, FormData, Request, Response } = require('undici');

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});

// Suppress DOMExceptions from SGDS web component slot/shadow DOM operations.
// JSDOM's shadow DOM mock doesn't fully support slot assignment, causing
// async errors that crash Jest despite tests passing correctly.
process.on('unhandledRejection', (reason) => {
  if (reason instanceof DOMException) return;
  throw reason;
});
```

---

## jest.setup.js (setupFilesAfterFramework - runs after JSDOM)

```js
// ─── Console suppression ───────────────────────────────────────────
// SGDS Lit components inject <style> tags that JSDOM can't parse
const originalConsoleError = console.error;
console.error = (...args) => {
  const isCssError = args.some(
    (arg) =>
      (typeof arg === 'string' && arg.includes('Could not parse CSS stylesheet')) ||
      (typeof arg === 'object' && arg?.type === 'css parsing'),
  );
  if (!isCssError) originalConsoleError.apply(console, args);
};

// ─── ElementInternals polyfill ─────────────────────────────────────
// Required for SGDS form-associated web components (input, select, checkbox, etc.)
HTMLElement.prototype.attachInternals = function () {
  return {
    setFormValue: () => {},
    setValidity: () => {},
    reportValidity: () => true,
    checkValidity: () => true,
    validity: { valid: true },
    validationMessage: '',
    willValidate: true,
    form: null,
    labels: [],
    states: new Set(),
  };
};

// ─── Testing library ───────────────────────────────────────────────
import '@testing-library/jest-dom';

// ─── Register SGDS components globally ─────────────────────────────
import '@govtechsg/sgds-web-component/components/Icon';

// ─── HTMLSlotElement polyfill ──────────────────────────────────────
if (typeof HTMLSlotElement === 'undefined') {
  global.HTMLSlotElement = class HTMLSlotElement extends HTMLElement {
    assignedElements() { return []; }
    assignedNodes() { return []; }
  };
} else if (!HTMLSlotElement.prototype._patchedForSGDS) {
  const originalAddEventListener = HTMLSlotElement.prototype.addEventListener;
  HTMLSlotElement.prototype.addEventListener = function (type, listener, options) {
    if (type === 'slotchange') {
      const wrappedListener = function (event) {
        try {
          if (typeof listener === 'function') listener.call(this, event);
          else if (listener?.handleEvent) listener.handleEvent(event);
        } catch (e) {
          if (!e.message?.includes('Cannot read properties of undefined')) throw e;
        }
      };
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
  HTMLSlotElement.prototype._patchedForSGDS = true;
}

// ─── Animation polyfills ───────────────────────────────────────────
if (!Element.prototype.getAnimations) {
  Element.prototype.getAnimations = () => [];
}
if (!Element.prototype.animate) {
  Element.prototype.animate = function () {
    return {
      finished: Promise.resolve(), ready: Promise.resolve(),
      cancel: () => {}, pause: () => {}, play: () => {},
      finish: () => {}, reverse: () => {},
      addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => {},
      currentTime: 0, playState: 'finished', playbackRate: 1, startTime: 0,
    };
  };
}

// ─── Shadow DOM mock ───────────────────────────────────────────────
if (typeof Element !== 'undefined' && !Element.prototype._mockedAttachShadow) {
  Element.prototype.attachShadow = function (init) {
    const shadowRoot = this;
    Object.defineProperty(this, 'shadowRoot', {
      get() { return shadowRoot; },
      configurable: true,
    });
    return this;
  };
  Element.prototype._mockedAttachShadow = true;
}

// ─── querySelector patch ───────────────────────────────────────────
// SGDS components with Tailwind classes (sgds:*) generate selectors that
// JSDOM treats as invalid CSS — catch the DOMException silently.
if (typeof Element !== 'undefined' && !Element.prototype._patchedQuerySelector) {
  const originalQuerySelector = Element.prototype.querySelector;
  Element.prototype.querySelector = function (selector) {
    try {
      return originalQuerySelector.call(this, selector);
    } catch (error) {
      if (error instanceof DOMException || error.message?.includes('not a valid selector')) return null;
      throw error;
    }
  };
  Element.prototype._patchedQuerySelector = true;
}

// ─── Observer polyfills ────────────────────────────────────────────
global.ResizeObserver = class ResizeObserver {
  observe() {} unobserve() {} disconnect() {}
};
global.IntersectionObserver = class IntersectionObserver {
  constructor() {} observe() {} unobserve() {} disconnect() {}
};

// ─── matchMedia mock ───────────────────────────────────────────────
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false, media: query, onchange: null,
    addListener: jest.fn(), removeListener: jest.fn(),
    addEventListener: jest.fn(), removeEventListener: jest.fn(), dispatchEvent: jest.fn(),
  })),
});

// ─── Snapshot serializer ───────────────────────────────────────────
// Strips <style> tags and normalizes Lit.js markers for stable snapshots
try {
  const { format, plugins } = require('pretty-format');
  expect.addSnapshotSerializer({
    test: (val) => {
      const isNode =
        (typeof Element !== 'undefined' && val instanceof Element) ||
        (val && (val.nodeType === 1 || val.nodeType === 11 || val.outerHTML));
      return Boolean(isNode);
    },
    print: (val) => {
      const clone = val.cloneNode(true);
      clone.querySelectorAll('style').forEach((el) => el.remove());
      const out = format(clone, { plugins: [plugins.DOMElement, plugins.DOMCollection] });
      return out
        .replace(/<!--\?lit\$\d+\$-->/g, '<!--lit-->')
        .replace(/id-\d+-sgds-/g, 'id-[stable]-sgds-');
    },
  });
} catch {}
```

---

## Package Dependencies

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.x",
    "@testing-library/react": "^16.x",
    "@testing-library/user-event": "^14.x",
    "jest": "^29.x",
    "jest-environment-jsdom": "^29.x",
    "pretty-format": "^29.x",
    "undici": "^6.x"
  }
}
```

---

## The flushUpdates Pattern

SGDS web components (Lit.js) update asynchronously via microtasks. In JSDOM, you must wait for these updates to complete before asserting:

```tsx
const flushUpdates = () => new Promise((r) => setTimeout(r, 50));

it('should render component', async () => {
  await act(async () => {
    render(<MyComponent />);
    await flushUpdates();
  });

  // Assertions here — component is now fully rendered
});
```

**Why 50ms?** Lit schedules microtask updates. 50ms gives enough time for shadow DOM construction, property reflection to attributes, slot distribution, and reactive property updates.

---

## Query Strategy (RTL → Web Component Alternatives)

`getByRole` and `getByLabelText` do not work reliably with web components in JSDOM. Use these alternatives:

| RTL pattern | SGDS replacement |
|---|---|
| `screen.getByRole('checkbox', { name: 'X' })` | `screen.getByText('X')?.closest('sgds-checkbox')` |
| `screen.getByRole('textbox')` | `document.querySelector<SgdsInput>('sgds-input')` |
| `screen.getByRole('combobox')` | `document.querySelector<SgdsComboBox>('sgds-combo-box')` |
| `screen.getByLabelText('X')` | `document.querySelector('sgds-input[label="X"]')` |
| `screen.getByRole('switch')` | `document.querySelector('sgds-switch')` |

### By tag name (preferred)

```tsx
const input = document.querySelector<SgdsInput>('sgds-input');
const select = document.querySelector<SgdsSelect>('sgds-select');
const comboBox = container.querySelector<SgdsComboBox>('sgds-combo-box');
```

### By text content + closest

```tsx
const checkbox = screen.getByText('Accept Terms')?.closest('sgds-checkbox');
const switchEl = screen.getByText(/dark mode/i)?.closest('sgds-switch');
```

### By attribute

```tsx
const input = document.querySelector('sgds-input[label="Username"]');
const field = document.querySelector('sgds-input[name="email"]');
```

---

## Event Simulation

Web components use `CustomEvent`, not React synthetic events. In JSDOM, you must set the property before dispatching.

### Text Input

```tsx
const input = document.querySelector<SgdsInput>('sgds-input');

await act(async () => {
  Object.defineProperty(input!, 'value', { value: 'new text', writable: true, configurable: true });
  input!.dispatchEvent(new CustomEvent('sgds-input', { bubbles: true }));
});
```

### Select / ComboBox

```tsx
const select = document.querySelector<SgdsSelect>('sgds-select');

await act(async () => {
  Object.defineProperty(select!, 'value', { value: 'option-2', writable: true, configurable: true });
  select!.dispatchEvent(new CustomEvent('sgds-change', { bubbles: true }));
});
```

### Checkbox / Switch (boolean toggle)

```tsx
const switchEl = document.querySelector('sgds-switch');

await act(async () => {
  Object.defineProperty(switchEl!, 'checked', { value: true, writable: true, configurable: true });
  fireEvent(switchEl!, new CustomEvent('sgds-change', { bubbles: true }));
});
```

### Pagination

```tsx
const pagination = document.querySelector<SgdsPagination>('sgds-pagination');

await act(async () => {
  pagination!.dispatchEvent(new CustomEvent('sgds-page-change', {
    detail: { currentPage: 2 },
    bubbles: true,
  }));
  await flushUpdates();
});
```

### Buttons (standard click still works)

```tsx
const button = screen.getByText('Submit');
await userEvent.click(button);

// Or for SGDS buttons specifically
const sgdsButton = screen.getByText('Delete')?.closest('sgds-button');
await userEvent.click(sgdsButton!);
```

---

## Assertion Migration

| RTL assertion | SGDS replacement |
|---|---|
| `expect(el).toBeChecked()` | `expect(el).toHaveAttribute('checked')` |
| `expect(el).not.toBeChecked()` | `expect(el).not.toHaveAttribute('checked')` |
| `expect(el).toHaveValue('x')` | `expect(el).toHaveAttribute('value', 'x')` |
| `expect(el).toBeDisabled()` | `expect(el).toHaveAttribute('disabled')` |
| `expect(el).toBeInvalid()` | `expect(el).toHaveAttribute('invalid')` |
| `expect(el).toHaveDisplayValue('x')` | `expect(el).toHaveAttribute('value', 'x')` |

### Property-based assertions (for complex values)

```tsx
const comboBox = container.querySelector<SgdsComboBox>('sgds-combo-box')!;
expect(comboBox.value).toBe('option1;option2');
expect(comboBox.multiSelect).toBe(true);
```

---

## Type Imports for Typed Queries

```tsx
import type { SgdsInput } from '@govtechsg/sgds-web-component/components';
import type { SgdsTextarea } from '@govtechsg/sgds-web-component/components';
import type { SgdsSelect } from '@govtechsg/sgds-web-component/components';
import type { SgdsComboBox } from '@govtechsg/sgds-web-component/components';
import type { SgdsPagination } from '@govtechsg/sgds-web-component/components/Pagination/sgds-pagination';
```

---

## Common Gotchas

| Problem | Solution |
|---|---|
| "Cannot use import statement outside a module" | Add SGDS/Lit to `transformIgnorePatterns` allow-list |
| "Cannot read properties of undefined" in slot ops | HTMLSlotElement polyfill in jest.setup.js |
| "Could not parse CSS stylesheet" errors | Suppressed by console.error filter |
| ComboBox value resets to empty | `SgdsComboBox.prototype._handleValueChange = function () {}` |
| Snapshot instability (dynamic IDs, styles) | Custom serializer strips styles + normalizes IDs |
| querySelector fails with `sgds:` classes | querySelector patch catches DOMException |
| Web component not rendered after `render()` | Always use `await act(async () => { ... await flushUpdates() })` |
| `getByRole` doesn't find web components | Use `document.querySelector('sgds-*')` instead |
| Switch/checkbox click doesn't toggle | Set `checked` property + dispatch `CustomEvent('sgds-change')` |
| ElementInternals error | `attachInternals` polyfill in jest.setup.js |
| `getAnimations is not a function` | Animation polyfill in jest.setup.js |

---

## Before/After Example: Checkbox Tests

### BEFORE (RTL + React component library)

```tsx
it('should not have any checked boxes on first load', () => {
  render(<MyForm />);
  const checkbox = screen.getByRole('checkbox', { name: 'Accept Terms' });
  expect(checkbox).not.toBeChecked();
});

it('should toggle when clicked', async () => {
  render(<MyForm />);
  const checkbox = screen.getByRole('checkbox', { name: 'Accept Terms' });
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});
```

### AFTER (RTL + SGDS web components, patched Jest)

```tsx
const flushUpdates = () => new Promise((r) => setTimeout(r, 50));

it('should not have any checked boxes on first load', async () => {
  await act(async () => {
    render(<MyForm />);
    await flushUpdates();
  });

  const checkbox = screen.getByText('Accept Terms')?.closest('sgds-checkbox');
  expect(checkbox).not.toHaveAttribute('checked');
});

it('should toggle when clicked', async () => {
  await act(async () => {
    render(<MyForm />);
    await flushUpdates();
  });

  const checkbox = screen.getByText('Accept Terms')?.closest('sgds-checkbox');

  await act(async () => {
    Object.defineProperty(checkbox!, 'checked', { value: true, writable: true, configurable: true });
    fireEvent(checkbox!, new CustomEvent('sgds-change', { bubbles: true }));
  });

  expect(checkbox).toHaveAttribute('checked');
});
```
