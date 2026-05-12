# List Patterns Reference

Ordered and unordered lists in three size variants, supporting nested list items. Use for displaying sequential or grouped content.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/`

## Unordered Lists (UL)

| Pattern Name | File Path | URL | Use Case |
|---|---|---|---|
| UL Body Small | `ul-body-sm.stories.js` | [ul-body-sm.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ul-body-sm.stories.js) | Unordered list with small body text |
| UL Body Medium | `ul-body-md.stories.js` | [ul-body-md.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ul-body-md.stories.js) | Unordered list with medium body text |
| UL Body Large | `ul-body-lg.stories.js` | [ul-body-lg.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ul-body-lg.stories.js) | Unordered list with large body text |

## Ordered Lists (OL)

| Pattern Name | File Path | URL | Use Case |
|---|---|---|---|
| OL Body Small | `ol-body-sm.stories.js` | [ol-body-sm.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ol-body-sm.stories.js) | Ordered list with small body text |
| OL Body Medium | `ol-body-md.stories.js` | [ol-body-md.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ol-body-md.stories.js) | Ordered list with medium body text |
| OL Body Large | `ol-body-lg.stories.js` | [ol-body-lg.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/List/ol-body-lg.stories.js) | Ordered list with large body text |

## How to Use

Each pattern file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const ListTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your list content, including nested items if needed

Copy the template structure, substitute your list items, and it's ready to use.
