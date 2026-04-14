export type TypographyTokenRow = {
  token: string;
  value: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
  exampleClass?: string;
  usageExampleClass?: string;
  usageExampleItems?: { text: string; className: string; href?: string }[];
  exampleText?: string;
  usage: string;
  note?: string;
};

export type TypographyTokenDoc = {
  key: string;
  title: string;
  description: string;
  rows: TypographyTokenRow[];
};

export const typographyTokenDocs: Record<string, TypographyTokenDoc> = {
  "font-family": {
    key: "font-family",
    title: "Font family tokens",
    description:
      "Font family tokens define the brand typeface used across SGDS typography. SGDS currently exposes a single brand font family token for headings, body text, controls, and components.",
    rows: [
      {
        token: "--sgds-font-family-brand",
        value: "Inter",
        exampleClass: "sgds:font-display",
        exampleText: "SGDS brand typeface",
        usage: "Default brand typeface for SGDS headings, body text, controls, and components.",
        note: "Default",
      },
    ],
  },
  "font-weight": {
    key: "font-weight",
    title: "Font weight tokens",
    description:
      "Font weight tokens control text stroke thickness. Use the semantic weight that matches the role of the content instead of choosing arbitrary numeric weights.",
    rows: [
      { token: "--sgds-font-weight-light", value: "300", exampleClass: "sgds:font-light", usage: "Low-emphasis headings or display text." },
      { token: "--sgds-font-weight-regular", value: "400", exampleClass: "sgds:font-regular", usage: "Default body text, labels, captions, and most interface copy." },
      { token: "--sgds-font-weight-semibold", value: "600", exampleClass: "sgds:font-semibold", usage: "Section headings, labels, and UI text that needs emphasis." },
      { token: "--sgds-font-weight-bold", value: "700", exampleClass: "sgds:font-bold", usage: "Strong headings and high-emphasis display text." },
    ],
  },
  "letter-spacing": {
    key: "letter-spacing",
    title: "Letter spacing tokens",
    description:
      "Letter spacing tokens tune the horizontal rhythm of typography. SGDS pairs tighter values with larger headings and wider values with compact overline labels.",
    rows: [
      {
        token: "--sgds-letter-spacing-tighter",
        value: "-1px / -0.0625rem",
        exampleClass: "sgds:tracking-tighter",
        usageExampleClass: "sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter",
        usageExampleItems: [
          { text: "Display large", className: "sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter" },
          { text: "Display medium", className: "sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter" },
          { text: "Display small", className: "sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter" },
        ],
        usage: "Large display headings.",
      },
      {
        token: "--sgds-letter-spacing-tight",
        value: "-0.4px / -0.025rem",
        exampleClass: "sgds:tracking-tight",
        usageExampleClass: "sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight",
        usageExampleItems: [
          { text: "H1", className: "sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight" },
          { text: "H2", className: "sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight" },
          { text: "H3", className: "sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight" },
          { text: "H4", className: "sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight" },
        ],
        usage: "Section headings from H1 to H4.",
      },
      {
        token: "--sgds-letter-spacing-normal",
        value: "0px / 0rem",
        exampleClass: "sgds:tracking-normal",
        usageExampleClass: "sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal",
        usageExampleItems: [
          { text: "Body text", className: "sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal" },
          { text: "Label", className: "sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal" },
          { text: "Caption", className: "sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal" },
          { text: "Link", className: "sgds:text-link-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:underline", href: "#" },
        ],
        usage: "Body text, labels, captions, and links.",
        note: "Default",
      },
      {
        token: "--sgds-letter-spacing-wide",
        value: "1px / 0.0625rem",
        exampleClass: "sgds:tracking-wide",
        usageExampleClass: "sgds:text-overline-md sgds:font-regular sgds:leading-2-xs sgds:tracking-wide sgds:uppercase",
        usageExampleItems: [
          { text: "Overline", className: "sgds:text-overline-md sgds:font-regular sgds:leading-2-xs sgds:tracking-wide sgds:uppercase" },
          { text: "Category label", className: "sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase" },
        ],
        usage: "Overlines and uppercase category labels.",
      },
      {
        token: "--sgds-letter-spacing-wider",
        value: "2px / 0.125rem",
        exampleClass: "sgds:tracking-wider",
        usageExampleClass: "sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-wider sgds:uppercase",
        usageExampleItems: [
          { text: "Decorative label", className: "sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-wider sgds:uppercase" },
        ],
        usage: "Decorative labels where stronger character spacing is needed.",
      },
    ],
  },
  "line-height": {
    key: "line-height",
    title: "Line height tokens",
    description:
      "Primitive line height tokens define the base scale for vertical rhythm. These fixed values are referenced by semantic tokens and can be used directly when precise control is needed.",
    rows: [
      { token: "--sgds-line-height-16", value: "16px / 1rem", exampleClass: "sgds:leading-16", exampleText: "Line one\nLine two", usage: "Compact labels and badges." },
      { token: "--sgds-line-height-20", value: "20px / 1.25rem", exampleClass: "sgds:leading-20", exampleText: "Line one\nLine two", usage: "Small labels, captions, and overlines." },
      { token: "--sgds-line-height-24", value: "24px / 1.5rem", exampleClass: "sgds:leading-24", exampleText: "Line one\nLine two", usage: "Subtitles, body medium, and body small text." },
      { token: "--sgds-line-height-28", value: "28px / 1.75rem", exampleClass: "sgds:leading-28", exampleText: "Line one\nLine two", usage: "Small headings and paragraph text." },
      { token: "--sgds-line-height-32", value: "32px / 2rem", exampleClass: "sgds:leading-32", exampleText: "Line one\nLine two", usage: "Medium headings and body large text." },
      { token: "--sgds-line-height-36", value: "36px / 2.25rem", exampleClass: "sgds:leading-36", exampleText: "Line one\nLine two", usage: "Larger headings." },
      { token: "--sgds-line-height-40", value: "40px / 2.5rem", exampleClass: "sgds:leading-40", exampleText: "Line one\nLine two", usage: "XL headings and display small text." },
      { token: "--sgds-line-height-44", value: "44px / 2.75rem", exampleClass: "sgds:leading-44", exampleText: "Line one\nLine two", usage: "Display medium text." },
      { token: "--sgds-line-height-48", value: "48px / 3rem", exampleClass: "sgds:leading-48", exampleText: "Line one\nLine two", usage: "Display large text." },
      { token: "--sgds-line-height-52", value: "52px / 3.25rem", exampleClass: "sgds:leading-52", exampleText: "Line one\nLine two", usage: "Extra large display headings." },
      { token: "--sgds-line-height-56", value: "56px / 3.5rem", exampleClass: "sgds:leading-56", exampleText: "Line one\nLine two", usage: "Extra large display headings." },
      { token: "--sgds-line-height-60", value: "60px / 3.75rem", exampleClass: "sgds:leading-60", exampleText: "Line one\nLine two", usage: "Extra large display headings." },
      { token: "--sgds-line-height-64", value: "64px / 4rem", exampleClass: "sgds:leading-64", exampleText: "Line one\nLine two", usage: "Extra large display headings." },
    ],
  },
  "paragraph-spacing": {
    key: "paragraph-spacing",
    title: "Paragraph spacing tokens",
    description:
      "Paragraph spacing tokens control the vertical margin after text blocks. Use them to keep prose rhythm consistent instead of manually setting paragraph margins.",
    rows: [
      {
        token: "--sgds-paragraph-spacing-none",
        value: "0px / 0rem",
        exampleClass: "sgds:mb-paragraph-none",
        usageExampleItems: [
          { text: "Body large", className: "sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal" },
          { text: "Body medium", className: "sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal" },
          { text: "Caption", className: "sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal" },
        ],
        usage: "Used for all types",
        note: "Default",
      },
      {
        token: "--sgds-paragraph-spacing-sm",
        value: "8px / 0.5rem",
        exampleClass: "sgds:mb-paragraph-sm",
        usage: "-",
      },
      {
        token: "--sgds-paragraph-spacing-md",
        value: "16px / 1rem",
        exampleClass: "sgds:mb-paragraph-md",
        usageExampleItems: [
          { text: "Caption", className: "sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal" },
          { text: "Next caption", className: "sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal" },
        ],
        usage: "Used for Caption only",
      },
      {
        token: "--sgds-paragraph-spacing-lg",
        value: "24px / 1.5rem",
        exampleClass: "sgds:mb-paragraph-lg",
        usageExampleItems: [
          { text: "Body medium", className: "sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal" },
          { text: "Body small", className: "sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal" },
        ],
        usage: "Used for Body medium and small only",
      },
      {
        token: "--sgds-paragraph-spacing-xl",
        value: "32px / 2rem",
        exampleClass: "sgds:mb-paragraph-xl",
        usageExampleItems: [
          { text: "Body large", className: "sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal" },
          { text: "Next body large paragraph", className: "sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal" },
        ],
        usage: "Used for Body large only",
      },
    ],
  },
  "text-decoration": {
    key: "text-decoration",
    title: "Text decoration tokens",
    description:
      "Text decoration is available through SGDS-prefixed Tailwind utilities. The repo does not define custom SGDS CSS variables for text decoration, so use these utilities directly when decoration is needed.",
    rows: [
      { token: "No SGDS token variable", value: "none", exampleClass: "sgds:no-underline", usage: "Remove underline when another interaction affordance is already present.", note: "Default" },
      { token: "No SGDS token variable", value: "underline", exampleClass: "sgds:underline", usage: "Links and intentionally underlined text." },
    ],
  },
  "text-transform": {
    key: "text-transform",
    title: "Text transform tokens",
    description:
      "Text transform is available through SGDS-prefixed Tailwind utilities. The repo does not define custom SGDS CSS variables for text transform, so use these utilities directly and reserve casing changes for deliberate typographic roles.",
    rows: [
      { token: "No SGDS token variable", value: "none", exampleClass: "sgds:normal-case", usage: "Preserve source casing.", note: "Default" },
      { token: "No SGDS token variable", value: "uppercase", exampleClass: "sgds:uppercase", usage: "Overlines, short labels, or categorical metadata." },
    ],
  },
  "responsive": {
    key: "responsive",
    title: "Responsive line height tokens",
    description:
      "Semantic line height tokens that scale across breakpoints. Use these tokens when vertical rhythm needs to adapt to the screen size alongside responsive font sizes.",
    rows: [
      { token: "--sgds-line-height-3-xs", value: "16px", mobile: "16px / 1rem", tablet: "16px / 1rem", desktop: "16px / 1rem", exampleClass: "sgds:leading-3-xs", exampleText: "Line one\nLine two", usage: "Compact labels and badges." },
      { token: "--sgds-line-height-2-xs", value: "20px", mobile: "20px / 1.25rem", tablet: "20px / 1.25rem", desktop: "20px / 1.25rem", exampleClass: "sgds:leading-2-xs", exampleText: "Line one\nLine two", usage: "Small labels, captions, and overlines." },
      { token: "--sgds-line-height-xs", value: "24px", mobile: "24px / 1.5rem", tablet: "24px / 1.5rem", desktop: "24px / 1.5rem", exampleClass: "sgds:leading-xs", exampleText: "Line one\nLine two", usage: "Subtitles, body medium, and body small text." },
      { token: "--sgds-line-height-sm", value: "24px", mobile: "24px / 1.5rem", tablet: "28px / 1.75rem", desktop: "28px / 1.75rem", exampleClass: "sgds:leading-sm", exampleText: "Line one\nLine two", usage: "Small headings such as H4." },
      { token: "--sgds-line-height-md", value: "28px", mobile: "28px / 1.75rem", tablet: "32px / 2rem", desktop: "32px / 2rem", exampleClass: "sgds:leading-md", exampleText: "Line one\nLine two", usage: "Medium headings and body large text." },
      { token: "--sgds-line-height-lg", value: "32px", mobile: "32px / 2rem", tablet: "36px / 2.25rem", desktop: "40px / 2.5rem", exampleClass: "sgds:leading-lg", exampleText: "Line one\nLine two", usage: "Large headings such as H2." },
      { token: "--sgds-line-height-xl", value: "40px", mobile: "40px / 2.5rem", tablet: "44px / 2.75rem", desktop: "48px / 3rem", exampleClass: "sgds:leading-xl", exampleText: "Line one\nLine two", usage: "XL headings and display small text." },
      { token: "--sgds-line-height-2-xl", value: "44px", mobile: "44px / 2.75rem", tablet: "52px / 3.25rem", desktop: "56px / 3.5rem", exampleClass: "sgds:leading-2-xl", exampleText: "Line one\nLine two", usage: "Display medium text." },
      { token: "--sgds-line-height-3-xl", value: "48px", mobile: "48px / 3rem", tablet: "60px / 3.75rem", desktop: "64px / 4rem", exampleClass: "sgds:leading-3-xl", exampleText: "Line one\nLine two", usage: "Display large text." },
    ],
  },
};
