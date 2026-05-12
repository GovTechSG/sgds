# Stats Blocks Reference

Statistics/metrics display sections with multiple column configurations.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/stats/`

| Block Name | File Path | URL | Use Case |
|---|---|---|---|
| Stats 3-Column | `stats-3.stories.js` | [stats-3.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/stats/stats-3.stories.js) | 3-column statistics display |
| Stats 4-Column | `stats-4.stories.js` | [stats-4.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/stats/stats-4.stories.js) | 4-column statistics display |
| Stats 5-Column | `stats-5.stories.js` | [stats-5.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/stats/stats-5.stories.js) | 5-column statistics display |
| Stats 6-Column Right | `stats-right-6.stories.js` | [stats-right-6.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/stats/stats-right-6.stories.js) | 6-column statistics display, right-aligned |
| Stats 8-Column Right | `stats-right-8.stories.js` | [stats-right-8.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/blocks/stats/stats-right-8.stories.js) | 8-column statistics display, right-aligned |

## How to Use

Each block file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const StatsTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your content

Copy the template structure, substitute your metrics and values, and it's ready to use.
