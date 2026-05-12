# Cards Blocks Reference

Card grid layouts for displaying content in card format.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cards/`

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Cards 3-Column | `cards-3.stories.js` | [cards-3.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cards/cards-3.stories.js) | 3-column card grid layout |
| Cards 4-Column | `cards-4.stories.js` | [cards-4.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/cards/cards-4.stories.js) | 4-column card grid layout |

## How to Use

Each block file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const CardsTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your content

Copy the template structure, substitute your card content, and it's ready to use.
