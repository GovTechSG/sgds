# Paragraph Patterns Reference

Body text styles for longer-form content and prose. Available in three sizes to accommodate different layout contexts.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Paragraph/`

| Pattern Name | File Path | URL | Use Case |
|---|---|---|---|
| Paragraph Body Small | `paragraph-body-sm.stories.js` | [paragraph-body-sm.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Paragraph/paragraph-body-sm.stories.js) | Body text, small size |
| Paragraph Body Medium | `paragraph-body-md.stories.js` | [paragraph-body-md.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Paragraph/paragraph-body-md.stories.js) | Body text, medium size |
| Paragraph Body Large | `paragraph-body-lg.stories.js` | [paragraph-body-lg.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Paragraph/paragraph-body-lg.stories.js) | Body text, large size |

## How to Use

Each pattern file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const ParagraphTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your paragraph content

Copy the template structure, substitute your paragraph text, and it's ready to use.
