# Hero Blocks Reference

Hero sections for page introductions and full-bleed feature displays.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/hero/`

## Basic Hero Layouts (3 blocks)

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Hero | `hero.stories.js` | [hero.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/hero/hero.stories.js) | Basic hero section |
| Hero Center | `hero-center.stories.js` | [hero-center.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/hero/hero-center.stories.js) | Hero section, center-aligned content |
| Hero Full-Bleed | `hero-fullbleed.stories.js` | [hero-fullbleed.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/hero/hero-fullbleed.stories.js) | Full-bleed hero section (edge-to-edge) |

## Hero with Background Images (3 blocks)

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Hero with Image | `hero-image.stories.js` | [hero-image.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/hero/hero-image.stories.js) | Hero section with background image |
| Hero with Background Image | `hero-bg-image.stories.js` | [hero-bg-image.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/hero/hero-bg-image.stories.js) | Hero section with full background image |
| Hero with Background Image Light | `hero-bg-image-light.stories.js` | [hero-bg-image-light.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/hero/hero-bg-image-light.stories.js) | Hero section with light background image variant |

## How to Use

Each block file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const HeroTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your content

**Example:**
```javascript
// From hero-center.stories.js
const HeroCenterTemplate = () => html`
  <section class="sgds:flex sgds:flex-col sgds:items-center sgds:justify-center sgds:py-2xl sgds:text-center">
    <h1 class="sgds:text-heading-xl sgds:font-bold">Hero Heading</h1>
    <p class="sgds:text-body-lg sgds:text-body-subtle">Supporting text</p>
  </section>
`;
```

Copy this structure, substitute your content, and it's ready to use.
