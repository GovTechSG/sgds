---
name: "sgds-migration"
description: "Complete workflow for migrating an existing frontend application to SGDS web components. Use this skill when a user wants to migrate from another UI library (MUI, Chakra UI, shadcn/ui, Ant Design, Vuetify, Angular Material, Bootstrap, etc.) to SGDS, or asks how to start using SGDS in an existing project. Covers four phases: (1) scan the current frontend tech stack, (2) install and configure SGDS with font, foundation CSS, and utilities, (3) migrate tests (Path A: Vitest + Playwright, or Path B: patch existing Jest/RTL), (4) replace old styling systems with SGDS v3 utilities, plus a post-migration verification checklist. React fully supported."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: setup
---

# SGDS Migration Skill

You are helping users migrate an existing frontend application from another component library (Material UI, Chakra UI, shadcn/ui, Bootstrap, Ant Design, Vuetify, Angular Material, etc.) to SGDS web components.

This is a **four-phase workflow**:
1. **Scan** the existing frontend tech stack (framework + UI library)
2. **Set up** SGDS via the `sgds-getting-started` skill
3. **Migrate tests** — either upgrade to Vitest + Playwright (Path A) or patch existing Jest/RTL (Path B)
4. **Migrate styling** - Replace old CSS systems with SGDS v3 utilities

Each phase builds on the previous one. Users should complete each phase in order.

---

## Phase 1: Scan the Frontend Stack

**Goal**: Understand what you're working with before making changes.

### What to Identify

Ask the user about their current setup:

1. **Frontend Framework**: React? Vue? Angular? Vanilla JavaScript? Svelte?
2. **Current UI Library**:
   - **SGDS v1** (Bulma-based CSS framework)?
   - **SGDS v2** (Bootstrap / React Bootstrap components)?
   - **Other**: MUI, Chakra UI, shadcn/ui, Ant Design, Vuetify, Angular Material, Bootstrap, Tailwind-only?
3. **Test Runner**: Jest, Vitest, Karma, Playwright, Cypress?
4. **Build Tool**: Create React App, Next.js, Vite, Angular CLI, Webpack?
5. **Node/Package Manager**: npm, pnpm, yarn?

### Analysis Tools

For **React projects**, you can use the provided analysis script to scan the codebase:
```bash
python scripts/analyze_react_stack.py <project_path>
```

This script identifies:
- React component files and their imports
- Current UI library dependencies (MUI, Chakra, etc.)
- Component usage and prop patterns
- Test files and test frameworks
- Outputs a JSON migration plan

For **Vue, Angular, Vanilla JS**, manual discussion is recommended (tooling WIP).

### Output of Phase 1

Present findings as a structured summary:
```
Frontend Stack Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Framework:      React 18 (TypeScript)
UI Library:     Material UI (MUI)
Test Runner:    Jest + React Testing Library
Build Tool:     Vite
Package Mgr:    pnpm

Components to Migrate:
  - Button (25 instances)
  - Input (18 instances)
  - Modal (5 instances)
  - Card (12 instances)
  - […]

Components Already Compatible:
  - Custom Layout components
  - Business logic hooks

Estimated Scope: 2-3 weeks for full migration
```

### What If No Tests Are Found?

If the codebase has no tests (or tests cannot be detected/analyzed):

✅ **Still proceed with the migration** — testing infrastructure is still valuable

The approach shifts to:
1. Set up the test environment (vitest-browser-react for React)
2. Create a **basic test template** for one simple component (e.g., Button)
3. Do NOT write business logic / product logic tests (that's the user's responsibility)
4. Proceed with component swapping migration in the source code
5. User can then extend the template tests for their specific use cases

**User action**: After component migration, the user should write tests specific to their business logic and product requirements.


## Phase 2: Install and Configure SGDS

**Goal**: Complete SGDS setup so components render with correct fonts and styling.

**Follow the `sgds-getting-started` skill (Steps 1–3)** in full:

### Step 1: Set the Font

Add the Inter font `<link>` tags to the HTML `<head>` (or framework equivalent):

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400;1,14..32,600;1,14..32,700&display=swap"
    rel="stylesheet"
  />
</head>
```

### Step 2: Import CSS (in your Tailwind-processed CSS file)

**Critical — import order matters.** Add these to the project's main CSS file (e.g. `globals.css`):

```css
/* Tailwind WITHOUT preflight — preflight resets override SGDS component styles */
@import "tailwindcss/theme.css";
@import "tailwindcss/utilities.css";

/* SGDS CSS — this order is required */
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/night.css"; /* optional: only if supporting dark mode */
@import "@govtechsg/sgds-web-component/css/sgds.css";
@import "@govtechsg/sgds-web-component/css/utility.css";
```

**Do NOT use `@import "tailwindcss"`** — this includes Tailwind's preflight reset (`*, :after, :before { border: 0 solid; margin: 0; padding: 0; }`) which overrides SGDS web component internal styles.

### Step 3: Register SGDS Web Components

Import once at app entry point:

```javascript
import '@govtechsg/sgds-web-component';
```

### What You Get

After Phase 2:
- SGDS web components render with correct Inter font and design tokens
- `sgds:` utility classes are available and functional
- Foundation styles (typography, headings, body) are applied
- Your existing components still use the old UI library (MUI, Chakra, Bootstrap, v1 Bulma, etc.)

---

## Component Migration Strategy

**The strategy is the same regardless of which UI library you're migrating from** (MUI, Chakra, v1 Bulma, v2 Bootstrap, etc.).

**Migrate components first** because web components use Shadow DOM and won't conflict with old CSS. After components are done, migrate styling in Phase 4.

**For component-specific details and APIs**, refer to `../sgds-components/SKILL.md` which documents all 46 `<sgds-*>` components.

### Component-First Rule

Before building any UI element with plain HTML and utility classes, **always check whether an SGDS web component already covers the need**. Consult `../sgds-components/SKILL.md` first. Only fall back to custom markup when no SGDS component exists for the use case.

Common mistakes to avoid:
- **DO NOT** use a raw `<table>` with utility classes — use `<SgdsTable>`, `<SgdsTableRow>`, `<SgdsTableHead>`, `<SgdsTableCell>`
- **DO NOT** use a raw `<input>` with utility classes — use `<SgdsInput>` (has built-in label, validation, hint text)
- **DO NOT** use a raw `<select>` with utility classes — use `<SgdsSelect>` + `<SgdsSelectOption>`

### React: Always Use PascalCase React Wrappers

In React applications, **always import and use the PascalCase React wrappers** from `@govtechsg/sgds-web-component/react/*`. Do NOT mix lowercase web component tags (`<sgds-modal>`) with React wrapper components (`<SgdsButton>`).

```tsx
// ✅ Correct — consistent PascalCase React wrappers
import SgdsModal from "@govtechsg/sgds-web-component/react/modal";
import SgdsButton from "@govtechsg/sgds-web-component/react/button";

<SgdsModal open={open} onSgdsClose={() => setOpen(false)}>
  <SgdsButton variant="primary">Submit</SgdsButton>
</SgdsModal>

// ❌ Wrong — mixing lowercase tags with React wrappers
<sgds-modal open={open} onsgds-close={() => setOpen(false)}>
  <SgdsButton variant="primary">Submit</SgdsButton>
</sgds-modal>
```

### Library-Specific Mapping References

Based on the source library detected in Phase 1, load the appropriate mapping file:

| Source Library | Mapping Reference |
|---|---|
| `@govtechsg/sgds-react` (v2) | `reference/from-sgds-react.md` |
| `@mui/material` / `@material-ui/*` | `reference/from-mui.md` |
| `@chakra-ui/react` | `reference/from-chakra.md` |
| `@radix-ui/*` / shadcn `components/ui/*` | `reference/from-shadcn.md` |

Each mapping file provides: component table, props mapping, before/after code examples, and removed concepts.

**Always also load**:
- `reference/events.md` — Universal SGDS event mapping (onSgdsChange, onSgdsInput, etc.) and value access patterns per component
- `reference/css-utilities-migration.md` — CSS migration tables (Bootstrap/Tailwind/MUI sx/Chakra → `sgds:` utilities) used in Phase 4

### Form Pattern Rules

When migrating forms, follow the `sgds-forms` skill patterns:

- **Action buttons (Submit, Cancel, Back) must be right-aligned** at the bottom of the form:
  ```html
  <div class="sgds:flex sgds:justify-end sgds:gap-component-xs">
    <sgds-button variant="outline">Cancel</sgds-button>
    <sgds-button variant="primary" type="submit">Submit</sgds-button>
  </div>
  ```
- This applies to both standalone forms and forms inside modals (use `slot="footer"` with `sgds:justify-end`)

---

## Phase 3: Set Up Testing Environment and Migrate Tests

**Goal**: Ensure your test suite works with SGDS web components after migration.

SGDS web components use Shadow DOM. Choose one of two paths based on your situation:

### Path A (Recommended): Vitest + Playwright Browser Testing

Best for: new projects, greenfield test suites, or teams ready to upgrade test infra.

**Read**: `reference/react-test-migration.md` for the complete React migration workflow including Vitest setup, testing patterns, and examples.

**Why**: Runs tests in real Chromium — full Shadow DOM support, real browser behavior, Playwright locator API pierces shadow boundaries automatically.

### Path B: Patch Existing Jest + RTL (JSDOM)

Best for: large existing Jest/RTL test suites where migrating test infrastructure is too costly.

**Read**: `reference/jest-rtl-patching.md` for the complete patching guide.

**What it does**: Adds polyfills and patches to make JSDOM tolerate SGDS web components (ElementInternals, HTMLSlotElement, animations, Shadow DOM mock, querySelector fix for `sgds:` classes, snapshot stabilization).

**Trade-off**: JSDOM cannot fully test shadow DOM internals. Tests work because SGDS components degrade gracefully, but you lose the ability to interact with elements inside the shadow root. Consider upgrading to Path A later.

### Choosing a Path

| Factor | Path A (Vitest + Playwright) | Path B (Patch Jest/RTL) |
|---|---|---|
| Shadow DOM testing | Full support | Host-level only |
| Migration effort | Medium (rewrite test infra) | Low (add setup files) |
| Long-term quality | Higher | Adequate |
| Existing test suite | Needs rewriting | Preserved with patches |

### React (Fully Supported - Both Paths)

**Time Estimate**: 1–2 weeks depending on test coverage

**No Existing Tests?** Still proceed — Path A includes guidance for setting up the Vitest browser environment and creating template tests even if your codebase has no tests today.

---

**For Vue, Angular, and other frameworks**: Use the same **Vitest + Playwright** approach (Path A). The React migration guide demonstrates the testing pattern you'd follow; setup is framework-specific but the foundation is consistent.

---

## Phase 4: Migrate Foundation and Styling CSS

**Goal**: Replace old styling systems with SGDS v3 utilities (Tailwind-based with `sgds:` prefix). The visual styling will now match SGDS v3 brand and design system, but the position and arrangement of elements remain the same.

**Important - UX Consistency**: Elements must stay in the same positions. Your product's users have learned where to find things (navigation, buttons, forms, etc.). Preserving element positions ensures users won't be confused or unable to locate features they depend on. You're updating the look (colors, typography, spacing tokens), not rearranging the page structure.

**When to Start**: After Phase 3 is complete and components are using SGDS web components.

**Prerequisites** (should already be done in Phase 2):
- `sgds.css` foundation CSS imported (provides Inter font-family, typography resets)
- `utility.css` imported in a Tailwind-processed CSS file
- Tailwind preflight disabled (using `tailwindcss/theme.css` + `tailwindcss/utilities.css`)

**What to Replace**:
- Old layout systems (MUI `<Box>`, Chakra `<Grid>`, v1 Bulma `.columns`, v2 Bootstrap `<Row>/<Col>`)
- Old utility classes (MUI `sx` prop, Chakra style props, Bulma `.is-*`, Bootstrap `.m-*` `.p-*`)
- Old color/typography systems (replace with SGDS CSS tokens and utilities)

**Ask the user about scope**: Before starting, ask the user which pages/routes they want to migrate in this pass. They may want to migrate the entire app, or only specific pages. Do not assume — let the user define the migration boundary.

**How to Migrate**:

**Read**: `reference/css-utilities-migration.md` for quick lookup tables mapping old CSS patterns (Bootstrap, Tailwind, MUI sx, Chakra style props) to `sgds:` equivalents.

**Read**: `../sgds-utilities/SKILL.md` for the complete reference on all SGDS utility classes, CSS tokens, and styling.

**Key Principle**: Replace old layout/utility systems with SGDS v3 utilities (Tailwind-based with `sgds:` prefix) while **preserving the layout arrangement** — grid becomes `sgds:grid`, flex becomes `sgds:flex`, spacing becomes `sgds:gap-*`, `sgds:p-*`, etc.

**Result**: Application now uses SGDS v3 brand colors, typography, and spacing tokens while maintaining the original information architecture and layout decisions.

**Time Estimate**: 1–2 weeks depending on size of CSS surface area

---

## Phase 5: Post-Migration Verification

**Goal**: Confirm that the migration is complete and everything is configured correctly.

Run through this checklist after all phases are done:

### Font Check
- [ ] Text renders in **Inter** font (not browser default serif/sans-serif)
- [ ] Verify in DevTools: `font-family` on `<body>` includes `Inter`
- [ ] Google Fonts `<link>` tags are present in `<head>`

### CSS Setup Check
- [ ] `sgds:` utility classes have effect (inspect element — styles are applied, not ignored)
- [ ] Tailwind preflight is NOT active (check no `*, :after, :before { border: 0 solid; margin: 0; padding: 0; }` in computed styles)
- [ ] SGDS components have correct internal styling (borders, padding, colors visible)

### Component Check
- [ ] All SGDS components use PascalCase React wrappers (no mixed `<sgds-*>` lowercase tags in React)
- [ ] No raw HTML elements used where an SGDS component exists (table, select, input)
- [ ] Form action buttons are right-aligned (`sgds:justify-end`)

### Token Check
- [ ] Theme tokens are active: `sgds:bg-primary-default`, `sgds:text-body-secondary` etc. resolve to actual colors
- [ ] Day/night theme switching works (if applicable)

### Test Check
- [ ] All tests pass (`pnpm test`)
- [ ] Event handlers use correct SGDS patterns (`onSgdsChange`, `onSgdsInput`, not native `onChange`)

---

## Overall Workflow

```
Phase 1: Scan
  ↓
  Understand framework, UI library, test runner
  Load library-specific mapping (from-mui.md, from-chakra.md, etc.)
  Output: Stack summary + scope estimate

Phase 2: Set Up SGDS
  ↓
  Follow sgds-getting-started skill (font + CSS + component registration)
  Disable Tailwind preflight
  Output: SGDS components available, Inter font active, utilities working

Phase 3: Migrate Tests & Components
  ↓
  Path A: Vitest + Playwright (reference/react-test-migration.md)
  Path B: Patch Jest/RTL (reference/jest-rtl-patching.md)
  Use: reference/events.md for event patterns
  Use PascalCase React wrappers consistently
  Use SGDS components (not raw HTML) where available
  Output: Tests passing, components using SGDS web components

Phase 4: Migrate Foundation & Styling CSS
  ↓
  Use: reference/css-utilities-migration.md for lookup tables
  Use: ../sgds-utilities/SKILL.md for complete reference
  Use: ../sgds-forms/SKILL.md for form layout patterns
  Output: All styling uses SGDS v3 utilities (Tailwind + sgds: prefix)

Phase 5: Verify
  ↓
  Run post-migration checklist
  Output: All checks pass — migration complete
```

---

## Tips & Common Questions

### "Can I migrate components without migrating tests?"
**Not recommended.** Tests that were written for the old UI library (MUI, Chakra) may fail when components are swapped to SGDS (different APIs, Shadow DOM). Migrate tests first, then components, so you know things work before and after each change.

However, **if you have no tests**, you can still proceed: set up the test environment, provide a simple template test, and swap components. You (the user) add business logic tests afterward.

**Key principle**: This skill handles UI component migration and testing infrastructure. You are responsible for writing tests specific to your product logic and business requirements.

### "Can I migrate incrementally?"
**Yes.** Migrate one component (test + source) at a time. Old components can coexist with new SGDS components in your application during the transition.

### "What if my test runner doesn't support real browsers?"
**Two options**: (1) Upgrade to Vitest + Playwright for full Shadow DOM support (Path A), or (2) patch your existing Jest/RTL environment with polyfills to make SGDS components work in JSDOM (Path B — see `reference/jest-rtl-patching.md`). Path B trades shadow DOM testing depth for lower migration effort.

### "How long does this take?"
Depends on:
- Number of components (button, input, etc. you're migrating)
- Current test coverage (higher coverage = more work to migrate)
- Team familiarity with SGDS and new test tools
- Whether you need to migrate layout CSS as well
- **Estimate**: 1–4 weeks for a typical mid-size React app

### "Why migrate components before layout CSS?"
**Components first because**:
- Web components use Shadow DOM, won't conflict with old CSS
- Safe to migrate anytime
- Clear boundary: components are swapped, old CSS can be removed cleanly

**Layout second because**:
- Avoid running both old layout system + v3 layout simultaneously
- Once components done, old CSS is largely obsolete
- Cleaner final state with fewer CSS conflicts

### "What if I'm using SGDS v1 (Bulma) or v2 (Bootstrap)?"
**Same four-phase strategy applies** — scan, set up, migrate tests, migrate styling. The component swaps are the same as other libraries.

### "Do I need to rewrite all my components?"
Only the ones you're migrating to SGDS. If you have custom components (layout, logic, etc.) that don't have SGDS equivalents, they can stay unchanged.

---

## For AI Agents

When using this skill:

1. **Start with Phase 1**: Always ask the user about their current stack before making recommendations.
2. **Defer to referenced skills**: Use exact skill names when delegating:
   - `../sgds-getting-started/SKILL.md` for setup (Phase 2)
   - `../sgds-components/SKILL.md` for component-specific APIs
   - `../sgds-forms/SKILL.md` for form layout patterns (action buttons right-aligned)
   - `reference/react-test-migration.md` for React test migration (Phase 3, Path A)
   - `reference/jest-rtl-patching.md` for Jest/RTL patching (Phase 3, Path B)
   - `reference/from-mui.md`, `reference/from-chakra.md`, `reference/from-shadcn.md`, `reference/from-sgds-react.md` for library-specific mappings
   - `reference/events.md` for event handling patterns
   - `reference/css-utilities-migration.md` for CSS migration lookup tables (Phase 4)
   - `../sgds-utilities/SKILL.md` for complete CSS utilities and styling (Phase 4)
3. **Don't duplicate**: Do not rewrite getting-started, components, or utilities instructions here. Link to them instead.
4. **Be honest about scope**: Clearly state which frameworks are supported (React: yes, others: use Vitest + Playwright foundation) and set expectations.
5. **Choose test path wisely**: If the user already has Jest + RTL with many tests, recommend Path B (patching) unless they explicitly want to upgrade. If starting fresh, recommend Path A (Vitest + Playwright).
6. **Ask clarifying questions** before diving into migration work:
   - How many components need migrating? (prioritizes effort)
   - Any custom components we should keep? (speeds up decision-making)
   - Test coverage and runner? (impacts test migration path choice)
   - Are you willing to change test infrastructure? (Path A vs Path B)
7. **React: PascalCase only** — Always use React wrappers (`SgdsModal`, `SgdsButton`, etc.) from `@govtechsg/sgds-web-component/react/*`. Never use lowercase `<sgds-*>` tags in React components.
8. **Component-first rule** — Before using raw HTML + utility classes, check if an SGDS component covers the need. Always prefer `<SgdsTable>` over `<table>`, `<SgdsInput>` over `<input>`, etc.
9. **Disable Tailwind preflight** — Use `@import "tailwindcss/theme.css"` + `@import "tailwindcss/utilities.css"` instead of `@import "tailwindcss"`. The preflight reset overrides SGDS component styles.
10. **Run Phase 5 verification** — After all migration work is done, run through the post-migration checklist with the user to confirm everything is correctly configured.
