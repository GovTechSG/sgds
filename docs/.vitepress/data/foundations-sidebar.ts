export type SidebarLinkItem = {
  text: string;
  link: string;
};

export type SidebarGroupItem = {
  text: string;
  items: Array<SidebarGroupItem | SidebarLinkItem>;
};

export const foundationsSidebar = {
  base: "/foundations/",
  items: [
    {
      text: "Design tokens",
      items: [
        { text: "Overview", link: "/foundations/design-tokens" },
        { text: "Token architecture", link: "/foundations/token-architecture" },
        { text: "Token naming", link: "/foundations/token-naming" },
      ],
    },
    {
      text: "Accessibility",
      items: [],
    },
    {
      text: "Border",
      items: [
        { text: "Overview", link: "/foundations/border" },
        { text: "Radius", link: "/foundations/border/radius" },
        { text: "Width", link: "/foundations/border/width" },
      ],
    },
    {
      text: "Colour",
      items: [
        { text: "Overview", link: "/foundations/colour" },
        { text: "Brand colour", link: "/foundations/colour/brand-colour" },
        { text: "Primitive colour", link: "/foundations/colour/primitive-colour" },
        { text: "Semantic colour", link: "/foundations/colour/semantic-colour" },
      ],
    },
    {
      text: "Elevation",
      items: [
        { text: "Overview", link: "/foundations/elevation" },
        {
          text: "Edge elevation",
          link: "/foundations/elevation/edge-elevation",
        },
        {
          text: "Surface elevation",
          link: "/foundations/elevation/surface-elevation",
        },
      ],
    },
    {
      text: "Iconography",
      items: [
        { text: "Overview", link: "/foundations/iconography" },
        { text: "Icon size", link: "/foundations/iconography/icon-size" },
        { text: "Icon library", link: "/foundations/iconography/icon-library" },
      ],
    },
    {
      text: "Layer",
      items: [
        { text: "Overview", link: "/foundations/layer" },
        { text: "Z-index", link: "/foundations/layer/layer-tokens" },
      ],
    },
    {
      text: "Layout",
      items: [
        { text: "Overview", link: "/foundations/layout" },
        {
          text: "Responsive grid",
          link: "/foundations/layout/responsive-grid",
        },
        { text: "Breakpoint", link: "/foundations/layout/breakpoint" },
        {
          text: "Layout utilities",
          items: [],
        },
      ],
    },
    {
      text: "Spacing",
      items: [
        { text: "Overview", link: "/foundations/spacing" },
        { text: "Spacer scale", link: "/foundations/spacing/spacer-scale" },
        { text: "Gap", link: "/foundations/spacing/gap" },
        { text: "Padding", link: "/foundations/spacing/padding" },
        { text: "Margin", link: "/foundations/spacing/margin" },
      ],
    },
    {
      text: "Typography",
      items: [
        { text: "Overview", link: "/foundations/typography" },
        {
          text: "Typography styles",
          items: [
            { text: "Display", link: "/foundations/typography/display" },
            { text: "Headings", link: "/foundations/typography/heading" },
            { text: "Subtitles", link: "/foundations/typography/subtitle" },
            {
              text: "Paragraph body",
              link: "/foundations/typography/paragraph-body",
            },
            { text: "Captions", link: "/foundations/typography/caption" },
            { text: "Labels", link: "/foundations/typography/label" },
            { text: "Links", link: "/foundations/typography/link" },
            { text: "Lists", link: "/foundations/typography/list" },
            { text: "Overline", link: "/foundations/typography/overline" },
          ],
        },
        {
          text: "Typography tokens",
          items: [
            {
              text: "Font family",
              link: "/foundations/typography/font-family",
            },
            {
              text: "Font size",
              link: "/foundations/typography/typography-tokens",
            },
            {
              text: "Font weight",
              link: "/foundations/typography/font-weight-tokens",
            },
            {
              text: "Letter spacing",
              link: "/foundations/typography/letter-spacing-tokens",
            },
            {
              text: "Line height",
              link: "/foundations/typography/line-height-tokens",
            },
            {
              text: "Paragraph spacing",
              link: "/foundations/typography/paragraph-spacing",
            },
            { text: "Responsive", link: "/foundations/typography/responsive" },
            {
              text: "Text decoration",
              link: "/foundations/typography/text-decoration",
            },
            {
              text: "Text transform",
              link: "/foundations/typography/text-transform",
            },
          ],
        },
        {
          text: "Typography utilities",
          items: [
            { text: "Font size", link: "/foundations/typography/font-size" },
            {
              text: "Font weight",
              link: "/foundations/typography/font-weight",
            },
            {
              text: "Letter spacing",
              link: "/foundations/typography/letter-spacing",
            },
            {
              text: "Line height",
              link: "/foundations/typography/line-height",
            },
          ],
        },
      ],
    },
  ] satisfies Array<SidebarGroupItem>,
};

export function findSidebarTextByLink(
  items: Array<SidebarGroupItem | SidebarLinkItem>,
  link: string
): string | null {
  for (const item of items) {
    if ("link" in item && item.link === link) return item.text;
    if ("items" in item) {
      const match = findSidebarTextByLink(item.items, link);
      if (match) return match;
    }
  }

  return null;
}

function findFirstLeafLink(
  items: Array<SidebarGroupItem | SidebarLinkItem>
): string | undefined {
  for (const item of items) {
    if ("link" in item) return item.link;
    if ("items" in item) {
      const found = findFirstLeafLink(item.items);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Returns the entry URL for a foundation section by its id (e.g. "colour", "typography").
 * Derives the URL from the first leaf link in the matching sidebar section,
 * so foundations.ts never needs to duplicate URLs already defined here.
 */
export function getFoundationEntryUrl(id: string): string {
  const section = foundationsSidebar.items.find(
    (item) => item.text.toLowerCase() === id
  );
  if (!section) return "";
  return findFirstLeafLink(section.items) ?? "";
}
