# Content Patterns Reference

Smaller heading styles (h4–h6) paired with supporting body text. Use for card titles, subsection headings, and nested content.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Content/`

| Pattern Name | File Path | URL | Use Case |
|---|---|---|---|
| H4 | `h4.stories.js` | [h4.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Content/h4.stories.js) | Content heading with supporting text |
| H4 Light | `h4-light.stories.js` | [h4-light.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Content/h4-light.stories.js) | Content heading, light font weight |
| H5 | `h5.stories.js` | [h5.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Content/h5.stories.js) | Content heading variant with supporting text |
| H5 Light | `h5-light.stories.js` | [h5-light.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Content/h5-light.stories.js) | Content heading variant, light font weight |
| H6 | `h6.stories.js` | [h6.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Content/h6.stories.js) | Content heading variant with supporting text |
| H6 Light | `h6-light.stories.js` | [h6-light.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Content/h6-light.stories.js) | Content heading variant, light font weight |

## How to Use

Each pattern file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const ContentTemplate = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your content

Copy the template structure, substitute your heading and supporting text, and it's ready to use.
