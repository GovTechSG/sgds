---
name: "sgds-templates"
description: "Complete ready-to-use page templates built with SGDS components and utilities. Use this skill whenever a user asks to build a page, dashboard, login page, form page, settings page, list page, or any full-page UI — even if they don't say 'template'. Apply when starting a new app, building internal tools, dashboards, admin portals, authentication flows, or data table views."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: pattern
---

# SGDS Page Templates

Ready-to-use full-page templates using SGDS components and utilities — adapted from the visual patterns of shadcn Blocks. Each template gives a beautiful starting point without writing layout code from scratch.

## Prerequisites

> **Every page must include the Application Shell.** Read **[sgds-blocks → reference/application-shell.md](../sgds-blocks/reference/application-shell.md)** before generating any page. The shell provides mandatory `<sgds-masthead>`, `<sgds-mainnav>`, and `<sgds-footer>` on every page, plus container class selection (`.sgds-container` vs `.sgds-container-sidebar`) and sticky-header conventions. Never generate a page template without all three shell components.

```javascript
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component/css/utility.css";
```

See **[sgds-getting-started](../sgds-getting-started/SKILL.md)** and **[sgds-components](../sgds-components/SKILL.md)** for full installation.

For container width and max-width utilities used in these templates, see **[sgds-utilities](../sgds-utilities/reference/dimension.md)**.

---

## Quick Decision Guide

| What you're building | Template to use |
|---|---|
| Admin dashboard with filters & data table | [Application Management](reference/application-management.md) |
| Public catalogue with search & filtering | [Catalogue / Search & Filter](reference/catalogue.md) |
| Internal tool, admin portal, analytics dashboard | [Dashboard](reference/dashboard.md) |
| Login / sign-in page | [Login](reference/login.md) |
| Multi-field settings or data-entry form | [Form Page](reference/form.md) |
| Company/agency profile, team intro, achievements | [About Us](reference/about-us.md) |
| Product or service landing page | [Landing Page](reference/landing.md) |
| Blog post, news article, or case study | [Blog / Content Page](reference/blog.md) |

---

## → Read [reference/application-management.md](reference/application-management.md)
Sidebar filters + search + data table + pagination. Use for admin dashboards, application registries, management portals.

## → Read [reference/catalogue.md](reference/catalogue.md)
Search + sidebar multi-group filters + sort dropdown + results grid + empty state. Use for product catalogues, event listings, content browsing.

## → Read [reference/dashboard.md](reference/dashboard.md)
Sidebar navigation + stat cards row + data table. Use for dashboards, admin portals, internal tools with metrics.

> **Note**: The dashboard template uses `sgds-sidebar` (RC component). Load the CDN script before other SGDS imports — see **[sgds-components sidebar reference](../sgds-components/reference/sidebar.md)** for the CDN tag and framework setup.

## → Read [reference/login.md](reference/login.md)
Centered card with email/password form. Use for authentication, sign-in, sign-up pages.

## → Read [reference/form.md](reference/form.md)
Two-column settings layout with labelled form sections. Use for settings pages, profile pages, multi-section data entry.

## → Read [reference/about-us.md](reference/about-us.md)
Two-column headline + image grid + logo strip + achievements stats panel. Use for agency profiles, product about pages, team introductions.

## → Read [reference/landing.md](reference/landing.md)
Hero section + feature cards + CTA sections. Use for product launches, service introductions, campaign pages.

## → Read [reference/blog.md](reference/blog.md)
Featured image + article header + body content + author card. Use for blog posts, news articles, case studies, testimonials.

---

## Raw Content Links — Copy & Paste Ready

All page templates have working implementations in the `stories/templates/` directory. Use these raw GitHub links to fetch the complete source:

| Template | Story Folder | Story File | Raw URL |
|---|---|---|---|
| Application Management | ApplicationManagement | applications-list.stories.js | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/ApplicationManagement/applications-list.stories.js |
| Catalogue / Search & Filter | Catalogue | search-filter.stories.js | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Catalogue/search-filter.stories.js |
| Dashboard | ApplicationManagement | applications-list.stories.js | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/ApplicationManagement/applications-list.stories.js |
| About Us | AboutUs | basic.stories.js | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/AboutUs/basic.stories.js |
| Form - Basic | Form | basic.stories.js | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Form/basic.stories.js |
| Form - Multi-Step | Form | multi-step-form.stories.js | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Form/multi-step-form.stories.js |
| Form - Report Issue | Form | report-issue.stories.js | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Form/report-issue.stories.js |
| Blog / Content | Blog | success-story.stories.js | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Blog/success-story.stories.js |
| Landing Page | Landing | basic.stories.js | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Landing/basic.stories.js |
| Login | Form | basic.stories.js | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Form/basic.stories.js |

Each reference page (e.g., [reference/dashboard.md](reference/dashboard.md)) includes the relevant raw content links for that specific template.

---

## How to Extract HTML from Raw GitHub Links

All templates have working story implementations in the `stories/templates/` directory. To extract the HTML template:

### Step 1: Fetch the raw file

Copy the raw GitHub URL from the table above and fetch it:

```bash
curl https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/{FOLDER}/{FILE}.js
```

Example:
```bash
curl https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/AboutUs/basic.stories.js
```

### Step 2: Extract the HTML from the template literal

Story files export a `Template` function that returns an `html` template literal. Locate the section that looks like:

```javascript
const Template = () => html`
  <!-- YOUR HTML STARTS HERE -->
  <sgds-masthead></sgds-masthead>
  ...
  <sgds-footer></sgds-footer>
  <!-- YOUR HTML ENDS HERE -->
`;
```

### Step 3: Clean the HTML

1. **Remove the `html\`` wrapper** — delete the leading `html\`` and trailing closing backtick
2. **Remove Lit-specific syntax** — delete any `${variable}` interpolations; replace with placeholder text if needed
3. **Remove `<style>` blocks** — move CSS to the reference file's "Customisation notes" section if notable
4. **Preserve all SGDS components and utility classes** — keep every `sgds-*` element and `sgds:` class exactly as-is
5. **Format the HTML** — use consistent indentation (2 spaces per level)

### Step 4: Structure the reference file

Follow the sgds-blocks pattern:

```markdown
# [Template Name] Page Template

[1-2 sentence description of what this template is for]

## When to use

- Use case 1
- Use case 2
- Use case 3

## Block anatomy

\`\`\`
[ASCII diagram of the layout structure]
\`\`\`

---

## Complete template

\`\`\`html
[CLEANED HTML FROM STEP 3]
\`\`\`

## Customisation notes

- Update [element] to [purpose]
- Modify [component] by [how]
- [More notes...]

---

## Raw Content Link

| File | GitHub Raw URL |
|------|---|
| [Template Name] | [raw GitHub URL] |
```

### Example: About Us template

The raw file at:
```
https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/AboutUs/basic.stories.js
```

Contains:
```javascript
const Template = () => html`
  <style>...</style>
  <sgds-masthead></sgds-masthead>
  ...
`;
```

**Extract** → remove `html\`` and backtick → clean up `<style>` → result is the HTML in [reference/about-us.md](reference/about-us.md).

---

## Visual Hierarchy Principles (apply to all templates)

These are the rules that make SGDS UIs look polished — the same principles shadcn/Mantine use:

**1. Layer backgrounds to create depth**
- Page background: `sgds:bg-surface-default` (the base canvas)
- Cards / panels: `sgds:bg-surface-raised` (lifts content off the page)
- Nested content areas: `sgds:bg-surface-overlay` sparingly

**2. Use semantic spacing, not raw numbers**
Prefer `sgds:p-layout-md`, `sgds:gap-layout-md`, `sgds:p-component-md` over `sgds:p-4`. Semantic tokens are responsive and encode intent. **Always apply whitespace between sections and elements — never render blocks without spacing.** See **sgds-utilities-spacing** for the full defaults table.

**3. Consistent card anatomy**
Every card: padding inside (`sgds:p-component-lg`), gap between card rows (`sgds:gap-layout-md`), border-radius (`sgds:rounded-lg`), subtle shadow (`sgds:shadow-card`).

**4. Action hierarchy in forms**
Primary action → `<sgds-button variant="primary">`. Secondary / cancel → `<sgds-button variant="outline">`. Destructive → `<sgds-button variant="ghost" tone="danger">`.

**5. Subtle labels, prominent values**
In stat cards and description lists: label in `sgds:text-body-subtle sgds:text-sm`, value in `sgds:text-default sgds:text-2xl sgds:font-semibold`.
