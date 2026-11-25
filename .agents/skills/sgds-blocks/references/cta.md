# CTA Blocks Reference

Call-to-action sections with multiple style and alignment variations. Mix of contained and full-bleed layouts.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cta/`

## Contained CTA (4 blocks)

Contained CTAs have constrained width and are typically centered on the page with padding. Use these when you want the CTA section to sit within page margins.

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Contained Primary | `contained-primary.stories.js` | [contained-primary.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cta/contained-primary.stories.js) | Contained CTA with primary style |
| Contained Primary Center | `contained-primary-center.stories.js` | [contained-primary-center.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cta/contained-primary-center.stories.js) | Contained CTA, primary style, center-aligned |
| Contained Raised | `contained-raised.stories.js` | [contained-raised.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cta/contained-raised.stories.js) | Contained CTA with raised style |
| Contained Raised Center | `contained-raised-center.stories.js` | [contained-raised-center.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cta/contained-raised-center.stories.js) | Contained CTA, raised style, center-aligned |

## Full-Bleed CTA (4 blocks)

Full-bleed CTAs extend edge-to-edge across the viewport width. Use these for maximum visual impact and to create distinct sections.

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Full-Bleed Primary | `fullbleed-primary.stories.js` | [fullbleed-primary.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cta/fullbleed-primary.stories.js) | Full-bleed CTA with primary style |
| Full-Bleed Primary Center | `fullbleed-primary-center.stories.js` | [fullbleed-primary-center.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cta/fullbleed-primary-center.stories.js) | Full-bleed CTA, primary style, center-aligned |
| Full-Bleed Alternate | `fullbleed-alternate.stories.js` | [fullbleed-alternate.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cta/fullbleed-alternate.stories.js) | Full-bleed CTA with alternate style |
| Full-Bleed Alternate Center | `fullbleed-alternate-center.stories.js` | [fullbleed-alternate-center.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cta/fullbleed-alternate-center.stories.js) | Full-bleed CTA, alternate style, center-aligned |

## How to Use

Each block file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const CTATemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your content

Copy the template structure, substitute your content and call-to-action text, and it's ready to use.
