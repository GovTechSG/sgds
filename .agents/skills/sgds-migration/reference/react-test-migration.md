# React Test Migration

You are helping users migrate their React component test suites from RTL + Jest (jsdom) to SGDS web components with Vitest + vitest-browser-react (using Playwright as the Chromium browser provider). The goal is to preserve all test logic and coverage while adapting to the new component model and test runner.

## Migration Philosophy

**Test first, then swap components.** This ensures tests pass before production code changes, making debugging easier.

The migration follows these phases:

1. **Analysis**: Scan the React codebase for components and their tests
2. **Mapping**: Identify which React components map to SGDS web components
3. **Test Migration**: Write new vitest-browser tests for SGDS components
4. **Component Swap**: Replace React components with SGDS web components in source
5. **Cleanup**: Remove unused React component imports and verify all tests pass

## Prerequisites & Documentation

This skill assumes familiarity with:
- **React Testing Library (RTL)** — [Official docs](https://testing-library.com/docs/react-testing-library/intro/)
- **Jest** — [Official docs](https://jestjs.io/docs/getting-started)
- **Vitest** — [Official docs](https://vitest.dev/)
- **Vitest Browser (with vitest-browser-react)** — [Official docs](https://vitest.dev/guide/browser.html)
- **Playwright** — [Official docs](https://playwright.dev/)

### Jest → Vitest API Migration

For comprehensive API migration (test functions, assertions, mocking, etc.), refer to the [official Vitest migration guide](https://vitest.dev/guide/migration.html#jest).

This skill focuses on **SGDS-specific patterns** on top of that foundation.

## Why Migrate to Vitest + Vitest Browser for SGDS

The key advantage: **Shadow DOM support**. SGDS web components use shadow DOM, which jsdom cannot test. Using vitest with `vitest-browser-react` (with Playwright as the browser provider) runs tests in a real Chromium browser, enabling:

- ✅ Full shadow DOM access via locators
- ✅ Real browser behavior (not simulated)
- ✅ Native web component support
- ✅ Better debugging with real browser DevTools

**Setup:** Configure `vitest.config.ts` to use `playwright()` as the browser provider, which spins up Chromium for test execution.

## Test Migration Pattern with SGDS

For detailed API documentation on the migration from RTL to vitest-browser-react, refer to:
- [vitest-browser-react API](https://vitest.dev/guide/browser.html#libraries-and-frameworks)
- [Playwright Locator API](https://playwright.dev/docs/api/class-locator)

## Setting Up SGDS in Your Test Environment

Before writing any tests, SGDS web components must be available in your test environment. Add a `vitest.setup.ts` file:

```typescript
// vitest.setup.ts - Runs once before all tests

// Import SGDS CSS for vitest browser tests
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";

// Optional: Set up global test utilities, mocks, etc.
```

Then reference it in your `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    // ... other config
    setupFiles: ["./vitest.setup.ts"],  // This file runs once at start
  },
});
```

**Result**: SGDS web components are now available in ALL tests without importing them individually.

---

### SGDS-Specific Testing Patterns

When migrating tests that use SGDS web components, remember:

**1. Web Component Rendering**
```typescript
import { describe, test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";

const { container, locator } = await render(<MyComponent />);
```

**2. Testing React Components That Render SGDS**

The key distinction: You're testing React components that **render** SGDS web components, not testing the web components themselves.

For **querying the web component host** (use standard DOM):
```typescript
const sgdsInput = container.querySelector("sgds-input");
expect(sgdsInput?.getAttribute("label")).toBe("Email");
expect(sgdsInput?.getAttribute("disabled")).toBe("true");
```

For **interacting with shadow DOM internals** (use Playwright Locator API):
```typescript
// Fill input inside sgds-input
const input = locator.getByRole("textbox");
await input.fill("test@example.com");

// Click button inside sgds-button
const button = locator.getByRole("button", { name: /submit/i });
await button.click();

// Check checkbox inside sgds-checkbox
const checkbox = locator.getByRole("checkbox");
await checkbox.check();
```

**Pattern**: Use `locator` for any **interaction** (click, fill, check, etc.), and `container.querySelector()` for **verification** (checking attributes, text content).

**Complete Example:**

```typescript
test('user can fill and submit form', async () => {
  const { container, locator } = await render(<LoginForm />);

  // 1. Interact using locator (pierces shadow DOM)
  const input = locator.getByRole("textbox");
  await input.fill("test@example.com");

  const button = locator.getByRole("button", { name: /submit/i });
  await button.click();

  // 2. Verify using container.querySelector (check host element)
  const sgdsInput = container.querySelector("sgds-input");
  expect(sgdsInput?.getAttribute("value")).toBe("test@example.com");

  // Verify form submission happened
  expect(container.textContent).toContain("Success!");
});
```

**3. Mocking**
```typescript
import { vi } from "vitest";
const onClick = vi.fn();
```

Refer to [Vitest docs on mocking](https://vitest.dev/guide/mocking.html) for details.

## SGDS Component Mapping

Component mapping is semantic and straightforward:

**React Component → SGDS Web Component**
- `Button` → `sgds-button`
- `Input` → `sgds-input`
- `Checkbox` → `sgds-checkbox`
- `Modal` → `sgds-modal`
- `Card` → `sgds-card`
- `Select` → `sgds-select`
- (and so on...)

**How to identify:** Check if an SGDS equivalent exists in the `@govtechsg/sgds-web-component` library by matching the semantic name. If it exists, it's a candidate for migration.

For component-specific details (props, shadow DOM structure, events), refer to the `sgds-components` skill or check the source code in `node_modules/@govtechsg/sgds-web-component/components/`.

## Test File Naming During Migration

Since old and new tests will coexist during the migration, use a differentiator:

- **Old RTL + Jest tests**: `Component.spec.tsx`
- **New Vitest + vitest-browser-react tests**: `Component.vitest.spec.tsx` (or similar naming convention)

## Handling Applications with No Tests

**Scenario**: Your application has no existing tests (or tests couldn't be detected/analyzed).

**Approach**:
1. Set up vitest-browser-react environment anyway (see Step 4 below)
2. Create a **simple template test** for one component (e.g., Button)
3. **Do NOT write** business logic or product-specific tests — that's your responsibility
4. Proceed with component swapping in your source code
5. Use the template as a starting point for your own tests

**Example**: After setting up vitest, you'd have:
```typescript
// SearchBox.test.vitest-browser.tsx - TEMPLATE
import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { SearchBox } from './SearchBox';

describe('SearchBox', () => {
  test('renders without crashing', async () => {
    const { container } = await render(<SearchBox onSearch={() => {}} />);
    expect(container).toBeTruthy();
  });

  // Add your business logic tests here
});
```

**Your responsibility**: Write tests that cover YOUR product logic (validation rules, state management, error handling, etc.).

---

## Step-by-Step Workflow

### Step 1: Analyze Existing Codebase
- Scan `src/` for React component files (`.tsx`, `.jsx`)
- For each component, extract:
  - UI components used (e.g., Button, Input, Checkbox)
  - Props passed to each UI component
  - Any conditional rendering or dynamic props
- List all test files (`.spec.tsx`, `.test.tsx`)
- For each test file, identify which components are tested

### Step 2: Plan Component Migration
- For each UI component found, check if an SGDS equivalent exists
- Build a **component swap plan** showing:
  - Original component → SGDS component
  - Props mapping (React props → web component attrs)
  - Test impact (which tests need rewriting)

### Step 3: Write New Tests First
- For each component being migrated:
  1. Read the existing RTL test file
  2. Identify what's being tested (rendering, interaction, props)
  3. Write equivalent vitest-browser tests using the patterns above
  4. Save new tests in `vitest/ComponentName.spec.tsx`
  5. **Do NOT run tests yet** — components don't use SGDS yet

### Step 4: Update Component Source Code
- For each component with new tests:
  1. Update imports (remove React library components, add SGDS web components)
  2. Replace component JSX with SGDS web component JSX
  3. Adapt props to web component attributes (`prop` → `prop-attr={}`)
  4. Handle slot content if needed

### Step 5: Verify Tests Pass
- Run the new vitest tests
- Fix any failing tests
- Run across all migrated components

### Step 6: Generate Migration Report
- List all components migrated
- Document any manual adjustments made
- Provide rollback instructions if needed

## Working with Your Input

If you provide a React codebase:

1. Ask clarifying questions:
   - Which UI components should be prioritized first?
   - Are there any custom component abstractions we should preserve?
   - Do you want to migrate all components at once or prioritize?

2. Scan the project for:
   - `src/` directory structure
   - Existing test files and their patterns
   - Component dependencies and prop flows
   - Use of third-party component libraries (MUI, Chakra, etc.)

3. Identify SGDS candidates:
   - Check against the component mapping table above
   - Flag components without SGDS equivalents (these stay as React)
   - Flag complex components that need manual review

4. Generate the migration plan (show to user for approval)

5. Build tests incrementally, component by component

## Tips & Gotchas

### Running Tests in CI/CD

For comprehensive CI/CD setup with different systems (GitHub Actions, GitLab CI, Azure Pipelines, Docker, Jenkins, CircleCI), see the [official Playwright CI documentation](https://playwright.dev/docs/ci).

When setting up Playwright in CI, use the `--with-deps` flag to install system libraries (fonts, graphics libraries) that browsers need.

---

### Shadow DOM in Web Components
SGDS web components use shadow DOM. This means:
- Internal elements are not visible to `document.querySelector()`
- Use Playwright locators to pierce shadow boundaries
- Locators automatically chain through shadow DOM
- Attributes on the host element are still queryable via `querySelector`

Example:
```typescript
// ❌ This won't find the input inside sgds-input
const input = container.querySelector("input");

// ✅ This works — locator pierces shadow DOM
const input = locator.getByRole("textbox");

// ✅ This also works — host element attribute
const sgdsInput = container.querySelector("sgds-input");
expect(sgdsInput?.getAttribute("label")).toBe("Email");
```

### Form Handling
SGDS forms use native `<form>` elements. When migrating form tests:
- Keep the `<form>` as-is
- Replace inner input/button/select with SGDS equivalents
- Test form submission by clicking buttons, not calling `.submit()` on the form

### Event Handlers & React Version

SGDS web components emit custom events. How you handle them depends on your React version:

**React 19+**: Supports custom events directly via camelCase attributes
```typescript
// React 19+ — Custom events work via attributes
<sgds-input onsgds-input={(e) => setEmail(e.target.value)} />
<sgds-button onclick={(e) => handleClick()} />
```

**React 18 and earlier**: Need React wrapper components or event listeners
```typescript
// React ≤18 — Use sgds-react wrapper components or manually attach listeners
<SgdsInput onChange={(value) => setEmail(value)} />
<SgdsButton onClick={handleClick} />
```

**For event binding patterns specific to your React version**, refer to the [sgds-components skill](../sgds-components/SKILL.md#react-integration), which includes:
- React 19+ attribute binding
- React 18 wrapper component patterns
- Next.js integration details

The wrapper component (React component using the web component) handles the bridge between React's event system and web component custom events.

### Component Variants & Props
Check if your React component has variants or theme props. SGDS components may have:
- Different prop names (e.g., `variant` → `type` or `appearance`)
- HTML attributes only (no JS props)
- Event names that differ slightly

For specific component APIs, refer to the `sgds-components` skill or check the source code in `node_modules/@govtechsg/sgds-web-component/components/`.

## Success Criteria

A successful migration has:
- ✅ All tests migrated to vitest-browser format
- ✅ No RTL or Jest imports remaining in test files
- ✅ Tests passing in real browser (Chromium)
- ✅ Source components updated to use SGDS web components
- ✅ Component props mapped correctly to web component attributes
- ✅ No console errors or warnings during test runs
- ✅ Shadow DOM handled correctly (locators used where needed)
- ✅ Migration report generated documenting all changes
