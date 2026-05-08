# Heading Patterns Reference

Main and secondary page headings with optional overline labels and supporting text. Use for page titles, section headings, and major content divisions.

**Base URL:** `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Heading/`

| Pattern Name | File Path | URL | Use Case |
|---|---|---|---|
| H1 | `h1.stories.js` | [h1.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Heading/h1.stories.js) | Main page heading with overline and supporting text |
| H1 Light | `h1-light.stories.js` | [h1-light.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Heading/h1-light.stories.js) | Main page heading, light font weight |
| H2 | `h2.stories.js` | [h2.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Heading/h2.stories.js) | Secondary heading with overline and supporting text |
| H2 Light | `h2-light.stories.js` | [h2-light.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Heading/h2-light.stories.js) | Secondary heading, light font weight |
| H3 | `h3.stories.js` | [h3.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Heading/h3.stories.js) | Tertiary heading with overline and supporting text |
| H3 Light | `h3-light.stories.js` | [h3-light.stories.js](https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/patterns/Typography/Heading/h3-light.stories.js) | Tertiary heading, light font weight |

## How to Use

Each pattern file is a JavaScript/TypeScript module exporting a Lit template. To fetch the raw template:

1. Use the URL from the table above
2. Look for the template function (e.g., `const H1Template = () => html\`...\``)
3. Extract the HTML markup from the template literal
4. Adapt the markup to your content

Copy the template structure, substitute your heading text, and it's ready to use.
