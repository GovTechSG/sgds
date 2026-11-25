# Feature Blocks Reference

Feature showcase sections with image or component placement, multiple grid ratios, and layout options.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/`

## Image-Based Feature Sections (6 blocks)

### 4-8 Ratio (Image takes 4 columns, content takes 8)

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Feature 4-8 Image Left | `feature-4-8-img-left.stories.js` | [feature-4-8-img-left.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-4-8-img-left.stories.js) | Feature with image on left (4 cols), content on right (8 cols) |
| Feature 4-8 Image Right | `feature-4-8-img-right.stories.js` | [feature-4-8-img-right.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-4-8-img-right.stories.js) | Feature with image on right (4 cols), content on left (8 cols) |

### 6-6 Ratio (Balanced split)

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Feature 6-6 Image Left | `feature-6-6-img-left.stories.js` | [feature-6-6-img-left.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-6-6-img-left.stories.js) | Feature with image on left (6 cols), content on right (6 cols) |
| Feature 6-6 Image Right | `feature-6-6-img-right.stories.js` | [feature-6-6-img-right.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-6-6-img-right.stories.js) | Feature with image on right (6 cols), content on left (6 cols) |

### 8-4 Ratio (Image takes 8 columns, content takes 4)

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Feature 8-4 Image Left | `feature-8-4-img-left.stories.js` | [feature-8-4-img-left.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-8-4-img-left.stories.js) | Feature with image on left (8 cols), content on right (4 cols) |
| Feature 8-4 Image Right | `feature-8-4-img-right.stories.js` | [feature-8-4-img-right.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-8-4-img-right.stories.js) | Feature with image on right (8 cols), content on left (4 cols) |

## Component-Based Feature Sections (2 blocks)

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Feature 6-6 Component Left | `feature-6-6-component-left.stories.js` | [feature-6-6-component-left.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-6-6-component-left.stories.js) | Feature with SGDS component on left (6 cols), content on right (6 cols) |
| Feature 6-6 Component Right | `feature-6-6-component-right.stories.js` | [feature-6-6-component-right.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-6-6-component-right.stories.js) | Feature with SGDS component on right (6 cols), content on left (6 cols) |

## Text-Only Feature Sections (3 blocks)

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Feature No Image Center | `feature-no-img-center.stories.js` | [feature-no-img-center.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-no-img-center.stories.js) | Feature section with text only, center-aligned |
| Feature No Image Left | `feature-no-img-left.stories.js` | [feature-no-img-left.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-no-img-left.stories.js) | Feature section with text only, left-aligned |
| Feature Cards Below | `feature-cards-below.stories.js` | [feature-cards-below.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/feature/feature-cards-below.stories.js) | Feature section with card grid displayed below |

## How to Use

Each block file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const FeatureTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your content

Copy the template structure, substitute your content and images, and it's ready to use.
