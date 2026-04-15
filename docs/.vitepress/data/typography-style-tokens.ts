export type TokenRow = {
  tokenNames: readonly string[];
  example: string;
  description: string;
  headingLevel?: string;
  exampleClass: string;
  aliases: readonly string[];
  note?: string;
};

export type TokenSection = {
  key: string;
  name: string;
  rows: readonly TokenRow[];
};

export const aliasToUtility = (alias: string) => {
  if (alias.startsWith("--sgds-font-size-")) {
    return `sgds:text-${alias.replace("--sgds-font-size-", "")}`;
  }

  if (alias.startsWith("--sgds-font-weight-")) {
    return `sgds:font-${alias.replace("--sgds-font-weight-", "")}`;
  }

  if (alias.startsWith("--sgds-line-height-")) {
    return `sgds:leading-${alias.replace("--sgds-line-height-", "")}`;
  }

  if (alias.startsWith("--sgds-letter-spacing-")) {
    return `sgds:tracking-${alias.replace("--sgds-letter-spacing-", "")}`;
  }

  return alias;
};

export const typographyStyleSections: readonly TokenSection[] = [
  {
    key: "display",
    name: "Layout displays",
    rows: [
      {
        tokenNames: ["sgds-display-lg-bold"],
        example: "Display large bold",
        description: "Use for the strongest page moments, such as hero statements or campaign-level messages.",
        exampleClass: "tokenExampleDisplayLgBold",
        aliases: ["--sgds-font-size-display-lg", "--sgds-font-weight-bold", "--sgds-line-height-3-xl", "--sgds-letter-spacing-tighter"],
      },
      {
        tokenNames: ["sgds-display-lg-light"],
        example: "Display large light",
        description: "Use for large expressive headings when the message needs scale but a softer tone.",
        exampleClass: "tokenExampleDisplayLgLight",
        aliases: ["--sgds-font-size-display-lg", "--sgds-font-weight-light", "--sgds-line-height-3-xl", "--sgds-letter-spacing-tighter"],
      },
      {
        tokenNames: ["sgds-display-md-bold"],
        example: "Display medium bold",
        description: "Use as the default display style for high-emphasis page titles or feature-led sections.",
        exampleClass: "tokenExampleDisplayMdBold",
        aliases: ["--sgds-font-size-display-md", "--sgds-font-weight-bold", "--sgds-line-height-2-xl", "--sgds-letter-spacing-tighter"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-display-md-light"],
        example: "Display medium light",
        description: "Use for prominent titles that should feel spacious and less forceful than bold display text.",
        exampleClass: "tokenExampleDisplayMdLight",
        aliases: ["--sgds-font-size-display-md", "--sgds-font-weight-light", "--sgds-line-height-2-xl", "--sgds-letter-spacing-tighter"],
      },
      {
        tokenNames: ["sgds-display-sm-bold"],
        example: "Display small bold",
        description: "Use for compact hero titles, feature headings, or strong editorial callouts.",
        exampleClass: "tokenExampleDisplaySmBold",
        aliases: ["--sgds-font-size-display-sm", "--sgds-font-weight-bold", "--sgds-line-height-xl", "--sgds-letter-spacing-tighter"],
      },
      {
        tokenNames: ["sgds-display-sm-light"],
        example: "Display small light",
        description: "Use for display-level headings where hierarchy is needed without heavy visual weight.",
        exampleClass: "tokenExampleDisplaySmLight",
        aliases: ["--sgds-font-size-display-sm", "--sgds-font-weight-light", "--sgds-line-height-xl", "--sgds-letter-spacing-tighter"],
      },
    ],
  },
  {
    key: "heading",
    name: "Layout heading",
    rows: [
      {
        tokenNames: ["sgds-heading-xl-bold"],
        example: "Heading XL bold",
        description: "Use for top-level page headings when a strong structural title is needed.",
        headingLevel: "H1",
        exampleClass: "tokenExampleHeadingXlBold",
        aliases: ["--sgds-font-size-heading-xl", "--sgds-font-weight-bold", "--sgds-line-height-xl", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-xl-light"],
        example: "Heading XL light",
        description: "Use for top-level headings that should stay prominent with a lighter voice.",
        exampleClass: "tokenExampleHeadingXlLight",
        aliases: ["--sgds-font-size-heading-xl", "--sgds-font-weight-light", "--sgds-line-height-xl", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-lg-bold"],
        example: "Heading large bold",
        description: "Use for major section headings or page areas that need clear separation.",
        headingLevel: "H2",
        exampleClass: "tokenExampleHeadingLgBold",
        aliases: ["--sgds-font-size-heading-lg", "--sgds-font-weight-bold", "--sgds-line-height-lg", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-lg-light"],
        example: "Heading large light",
        description: "Use for major headings when the surrounding layout already provides strong hierarchy.",
        exampleClass: "tokenExampleHeadingLgLight",
        aliases: ["--sgds-font-size-heading-lg", "--sgds-font-weight-light", "--sgds-line-height-lg", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-md-semibold"],
        example: "Heading medium semibold",
        description: "Use as the default heading style for section titles and common content hierarchy.",
        headingLevel: "H3",
        exampleClass: "tokenExampleHeadingMdSemibold",
        aliases: ["--sgds-font-size-heading-md", "--sgds-font-weight-semibold", "--sgds-line-height-md", "--sgds-letter-spacing-tight"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-heading-md-light"],
        example: "Heading medium light",
        description: "Use for medium headings that need a quieter relationship with nearby content.",
        exampleClass: "tokenExampleHeadingMdLight",
        aliases: ["--sgds-font-size-heading-md", "--sgds-font-weight-light", "--sgds-line-height-md", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-sm-semibold"],
        example: "Heading small semibold",
        description: "Use for smaller section headings, grouped content titles, or card headings.",
        headingLevel: "H4",
        exampleClass: "tokenExampleHeadingSmSemibold",
        aliases: ["--sgds-font-size-heading-sm", "--sgds-font-weight-semibold", "--sgds-line-height-sm", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-sm-light"],
        example: "Heading small light",
        description: "Use for small headings where the hierarchy should stay subtle.",
        exampleClass: "tokenExampleHeadingSmLight",
        aliases: ["--sgds-font-size-heading-sm", "--sgds-font-weight-light", "--sgds-line-height-sm", "--sgds-letter-spacing-tight"],
      },
    ],
  },
  {
    key: "subtitle",
    name: "Secondary heading",
    rows: [
      {
        tokenNames: ["sgds-subtitle-md-semibold"],
        example: "Subtitle medium semibold",
        description: "Use as the default subtitle for supporting section titles or short lead-in text.",
        headingLevel: "H5",
        exampleClass: "tokenExampleSubtitleMdSemibold",
        aliases: ["--sgds-font-size-subtitle-md", "--sgds-font-weight-semibold", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-subtitle-md-light"],
        example: "Subtitle medium light",
        description: "Use for supporting titles that should feel secondary to a nearby heading.",
        exampleClass: "tokenExampleSubtitleMdLight",
        aliases: ["--sgds-font-size-subtitle-md", "--sgds-font-weight-light", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-subtitle-sm-semibold"],
        example: "Subtitle small semibold",
        description: "Use for compact supporting titles in cards, forms, or grouped content.",
        headingLevel: "H6",
        exampleClass: "tokenExampleSubtitleSmSemibold",
        aliases: ["--sgds-font-size-subtitle-sm", "--sgds-font-weight-semibold", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-subtitle-sm-light"],
        example: "Subtitle small light",
        description: "Use for quieter supporting titles in dense layouts.",
        exampleClass: "tokenExampleSubtitleSmLight",
        aliases: ["--sgds-font-size-subtitle-sm", "--sgds-font-weight-light", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
    ],
  },
  {
    key: "paragraph-body",
    name: "Body texts",
    rows: [
      {
        tokenNames: ["sgds-body-lg-semibold"],
        example: "Body large semibold",
        description: "Use for emphasised body copy, lead paragraphs, or important supporting text.",
        exampleClass: "tokenExampleBodyLgSemibold",
        aliases: ["--sgds-font-size-body-lg", "--sgds-font-weight-semibold", "--sgds-line-height-md", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-body-lg-regular"],
        example: "Body large regular",
        description: "Use for introductory reading text or body copy that benefits from a larger size.",
        exampleClass: "tokenExampleBodyLgRegular",
        aliases: ["--sgds-font-size-body-lg", "--sgds-font-weight-regular", "--sgds-line-height-md", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-body-md-semibold"],
        example: "Body medium semibold",
        description: "Use for emphasised phrases or key body text within standard content.",
        exampleClass: "tokenExampleBodyMdSemibold",
        aliases: ["--sgds-font-size-body-md", "--sgds-font-weight-semibold", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-body-md-regular"],
        example: "Body medium regular",
        description: "Use as the default body style for paragraphs, descriptions, and reading content.",
        exampleClass: "tokenExampleBodyMdRegular",
        aliases: ["--sgds-font-size-body-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-body-sm-semibold"],
        example: "Body small semibold",
        description: "Use for emphasised secondary text where space is limited.",
        exampleClass: "tokenExampleBodySmSemibold",
        aliases: ["--sgds-font-size-body-sm", "--sgds-font-weight-semibold", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-body-sm-regular"],
        example: "Body small regular",
        description: "Use for secondary descriptions, helper text, and compact reading content.",
        exampleClass: "tokenExampleBodySmRegular",
        aliases: ["--sgds-font-size-body-sm", "--sgds-font-weight-regular", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
    ],
  },
  {
    key: "label",
    name: "Labels",
    rows: [
      {
        tokenNames: ["sgds-label-lg-semibold"],
        example: "Label large semibold",
        description: "Use for large control labels or action text that needs strong emphasis.",
        exampleClass: "tokenExampleLabelLgSemibold",
        aliases: ["--sgds-font-size-label-lg", "--sgds-font-weight-semibold", "--sgds-line-height-md", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-lg-regular"],
        example: "Label large regular",
        description: "Use for large labels where the component already provides visual emphasis.",
        exampleClass: "tokenExampleLabelLgRegular",
        aliases: ["--sgds-font-size-label-lg", "--sgds-font-weight-regular", "--sgds-line-height-md", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-md-semibold"],
        example: "Label medium semibold",
        description: "Use for field labels, buttons, tabs, and controls that need clear affordance.",
        exampleClass: "tokenExampleLabelMdSemibold",
        aliases: ["--sgds-font-size-label-md", "--sgds-font-weight-semibold", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-md-regular"],
        example: "Label medium regular",
        description: "Use as the default label style for common interface text.",
        exampleClass: "tokenExampleLabelMdRegular",
        aliases: ["--sgds-font-size-label-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-label-md-light"],
        example: "Label medium light",
        description: "Use for quiet interface labels where hierarchy should remain low.",
        exampleClass: "tokenExampleLabelMdLight",
        aliases: ["--sgds-font-size-label-md", "--sgds-font-weight-light", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-sm-semibold"],
        example: "Label small semibold",
        description: "Use for compact labels, badges, chips, or metadata that needs emphasis.",
        exampleClass: "tokenExampleLabelSmSemibold",
        aliases: ["--sgds-font-size-label-sm", "--sgds-font-weight-semibold", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-sm-regular"],
        example: "Label small regular",
        description: "Use for compact labels in dense interface areas.",
        exampleClass: "tokenExampleLabelSmRegular",
        aliases: ["--sgds-font-size-label-sm", "--sgds-font-weight-regular", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-xs-semibold"],
        example: "Label XS semibold",
        description: "Use for very small labels that still need to be noticed.",
        exampleClass: "tokenExampleLabelXsSemibold",
        aliases: ["--sgds-font-size-label-xs", "--sgds-font-weight-semibold", "--sgds-line-height-3-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-xs-regular"],
        example: "Label XS regular",
        description: "Use for the smallest interface labels, metadata, or compact annotations.",
        exampleClass: "tokenExampleLabelXsRegular",
        aliases: ["--sgds-font-size-label-xs", "--sgds-font-weight-regular", "--sgds-line-height-3-xs", "--sgds-letter-spacing-normal"],
      },
    ],
  },
  {
    key: "caption",
    name: "Caption",
    rows: [
      {
        tokenNames: ["sgds-caption-semibold"],
        example: "Caption semibold",
        description: "Use for captions, helper notes, or metadata that need emphasis.",
        exampleClass: "tokenExampleCaptionSemibold",
        aliases: ["--sgds-font-size-caption-md", "--sgds-font-weight-semibold", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-caption-regular"],
        example: "Caption regular",
        description: "Use as the default caption style for supplementary notes, timestamps, and metadata.",
        exampleClass: "tokenExampleCaptionRegular",
        aliases: ["--sgds-font-size-caption-md", "--sgds-font-weight-regular", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
    ],
  },
  {
    key: "overline",
    name: "Overline",
    rows: [
      {
        tokenNames: ["sgds-overline-semibold"],
        example: "OVERLINE SEMIBOLD",
        description: "Use for short category labels above headings when the label needs emphasis.",
        exampleClass: "tokenExampleOverlineSemibold",
        aliases: ["--sgds-font-size-overline-md", "--sgds-font-weight-semibold", "--sgds-line-height-2-xs", "--sgds-letter-spacing-wide"],
      },
      {
        tokenNames: ["sgds-overline-regular"],
        example: "OVERLINE REGULAR",
        description: "Use as the default overline style for compact category or section labels.",
        exampleClass: "tokenExampleOverlineRegular",
        aliases: ["--sgds-font-size-overline-md", "--sgds-font-weight-regular", "--sgds-line-height-2-xs", "--sgds-letter-spacing-wide"],
        note: "Default",
      },
    ],
  },
  {
    key: "link",
    name: "Link",
    rows: [
      {
        tokenNames: ["sgds-link-lg-regular"],
        example: "Link large regular",
        description: "Use for prominent text links that sit with large body or heading-adjacent content.",
        exampleClass: "tokenExampleLinkLgRegular",
        aliases: ["--sgds-font-size-link-lg", "--sgds-font-weight-regular", "--sgds-line-height-md", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-link-md-regular"],
        example: "Link medium regular",
        description: "Use as the default inline link style within standard body content.",
        exampleClass: "tokenExampleLinkMdRegular",
        aliases: ["--sgds-font-size-link-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-link-sm-regular"],
        example: "Link small regular",
        description: "Use for secondary or compact links in dense layouts.",
        exampleClass: "tokenExampleLinkSmRegular",
        aliases: ["--sgds-font-size-link-sm", "--sgds-font-weight-regular", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-link-xs-regular"],
        example: "Link XS regular",
        description: "Use for the smallest supporting links, such as metadata actions or compact controls.",
        exampleClass: "tokenExampleLinkXsRegular",
        aliases: ["--sgds-font-size-link-xs", "--sgds-font-weight-regular", "--sgds-line-height-3-xs", "--sgds-letter-spacing-normal"],
      },
    ],
  },
  {
    key: "list",
    name: "List",
    rows: [
      {
        tokenNames: ["sgds-list-unordered"],
        example: "Unordered list item",
        description: "Use for related items where sequence does not matter.",
        exampleClass: "tokenExampleListUnordered",
        aliases: ["sgds:list-disc", "--sgds-font-size-body-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-list-ordered"],
        example: "Ordered list item",
        description: "Use for steps, rankings, or information where sequence matters.",
        exampleClass: "tokenExampleListOrdered",
        aliases: ["sgds:list-decimal", "--sgds-font-size-body-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-list-unstyled"],
        example: "Unstyled list item",
        description: "Use when list semantics are needed but bullets or numbers would add visual noise.",
        exampleClass: "tokenExampleListUnstyled",
        aliases: ["sgds:list-none", "--sgds-font-size-body-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
    ],
  },
];
