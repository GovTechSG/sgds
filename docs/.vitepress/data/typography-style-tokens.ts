export type TokenRow = {
  tokenNames: readonly string[];
  example: string;
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
        exampleClass: "tokenExampleDisplayLgBold",
        aliases: ["--sgds-font-size-display-lg", "--sgds-font-weight-bold", "--sgds-line-height-3-xl", "--sgds-letter-spacing-tighter"],
      },
      {
        tokenNames: ["sgds-display-lg-light"],
        example: "Display large light",
        exampleClass: "tokenExampleDisplayLgLight",
        aliases: ["--sgds-font-size-display-lg", "--sgds-font-weight-light", "--sgds-line-height-3-xl", "--sgds-letter-spacing-tighter"],
      },
      {
        tokenNames: ["sgds-display-md-bold"],
        example: "Display medium bold",
        exampleClass: "tokenExampleDisplayMdBold",
        aliases: ["--sgds-font-size-display-md", "--sgds-font-weight-bold", "--sgds-line-height-2-xl", "--sgds-letter-spacing-tighter"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-display-md-light"],
        example: "Display medium light",
        exampleClass: "tokenExampleDisplayMdLight",
        aliases: ["--sgds-font-size-display-md", "--sgds-font-weight-light", "--sgds-line-height-2-xl", "--sgds-letter-spacing-tighter"],
      },
      {
        tokenNames: ["sgds-display-sm-bold"],
        example: "Display small bold",
        exampleClass: "tokenExampleDisplaySmBold",
        aliases: ["--sgds-font-size-display-sm", "--sgds-font-weight-bold", "--sgds-line-height-xl", "--sgds-letter-spacing-tighter"],
      },
      {
        tokenNames: ["sgds-display-sm-light"],
        example: "Display small light",
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
        exampleClass: "tokenExampleHeadingXlBold",
        aliases: ["--sgds-font-size-heading-xl", "--sgds-font-weight-bold", "--sgds-line-height-xl", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-xl-light"],
        example: "Heading XL light",
        exampleClass: "tokenExampleHeadingXlLight",
        aliases: ["--sgds-font-size-heading-xl", "--sgds-font-weight-light", "--sgds-line-height-xl", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-lg-bold"],
        example: "Heading large bold",
        exampleClass: "tokenExampleHeadingLgBold",
        aliases: ["--sgds-font-size-heading-lg", "--sgds-font-weight-bold", "--sgds-line-height-lg", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-lg-light"],
        example: "Heading large light",
        exampleClass: "tokenExampleHeadingLgLight",
        aliases: ["--sgds-font-size-heading-lg", "--sgds-font-weight-light", "--sgds-line-height-lg", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-md-semibold"],
        example: "Heading medium semibold",
        exampleClass: "tokenExampleHeadingMdSemibold",
        aliases: ["--sgds-font-size-heading-md", "--sgds-font-weight-semibold", "--sgds-line-height-md", "--sgds-letter-spacing-tight"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-heading-md-light"],
        example: "Heading medium light",
        exampleClass: "tokenExampleHeadingMdLight",
        aliases: ["--sgds-font-size-heading-md", "--sgds-font-weight-light", "--sgds-line-height-md", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-sm-semibold"],
        example: "Heading small semibold",
        exampleClass: "tokenExampleHeadingSmSemibold",
        aliases: ["--sgds-font-size-heading-sm", "--sgds-font-weight-semibold", "--sgds-line-height-sm", "--sgds-letter-spacing-tight"],
      },
      {
        tokenNames: ["sgds-heading-sm-light"],
        example: "Heading small light",
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
        exampleClass: "tokenExampleSubtitleMdSemibold",
        aliases: ["--sgds-font-size-subtitle-md", "--sgds-font-weight-semibold", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-subtitle-md-light"],
        example: "Subtitle medium light",
        exampleClass: "tokenExampleSubtitleMdLight",
        aliases: ["--sgds-font-size-subtitle-md", "--sgds-font-weight-light", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-subtitle-sm-semibold"],
        example: "Subtitle small semibold",
        exampleClass: "tokenExampleSubtitleSmSemibold",
        aliases: ["--sgds-font-size-subtitle-sm", "--sgds-font-weight-semibold", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-subtitle-sm-light"],
        example: "Subtitle small light",
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
        exampleClass: "tokenExampleBodyLgSemibold",
        aliases: ["--sgds-font-size-body-lg", "--sgds-font-weight-semibold", "--sgds-line-height-md", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-body-lg-regular"],
        example: "Body large regular",
        exampleClass: "tokenExampleBodyLgRegular",
        aliases: ["--sgds-font-size-body-lg", "--sgds-font-weight-regular", "--sgds-line-height-md", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-body-md-semibold"],
        example: "Body medium semibold",
        exampleClass: "tokenExampleBodyMdSemibold",
        aliases: ["--sgds-font-size-body-md", "--sgds-font-weight-semibold", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-body-md-regular"],
        example: "Body medium regular",
        exampleClass: "tokenExampleBodyMdRegular",
        aliases: ["--sgds-font-size-body-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-body-sm-semibold"],
        example: "Body small semibold",
        exampleClass: "tokenExampleBodySmSemibold",
        aliases: ["--sgds-font-size-body-sm", "--sgds-font-weight-semibold", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-body-sm-regular"],
        example: "Body small regular",
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
        exampleClass: "tokenExampleLabelLgSemibold",
        aliases: ["--sgds-font-size-label-lg", "--sgds-font-weight-semibold", "--sgds-line-height-md", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-lg-regular"],
        example: "Label large regular",
        exampleClass: "tokenExampleLabelLgRegular",
        aliases: ["--sgds-font-size-label-lg", "--sgds-font-weight-regular", "--sgds-line-height-md", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-md-semibold"],
        example: "Label medium semibold",
        exampleClass: "tokenExampleLabelMdSemibold",
        aliases: ["--sgds-font-size-label-md", "--sgds-font-weight-semibold", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-md-regular"],
        example: "Label medium regular",
        exampleClass: "tokenExampleLabelMdRegular",
        aliases: ["--sgds-font-size-label-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-label-md-light"],
        example: "Label medium light",
        exampleClass: "tokenExampleLabelMdLight",
        aliases: ["--sgds-font-size-label-md", "--sgds-font-weight-light", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-sm-semibold"],
        example: "Label small semibold",
        exampleClass: "tokenExampleLabelSmSemibold",
        aliases: ["--sgds-font-size-label-sm", "--sgds-font-weight-semibold", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-sm-regular"],
        example: "Label small regular",
        exampleClass: "tokenExampleLabelSmRegular",
        aliases: ["--sgds-font-size-label-sm", "--sgds-font-weight-regular", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-xs-semibold"],
        example: "Label XS semibold",
        exampleClass: "tokenExampleLabelXsSemibold",
        aliases: ["--sgds-font-size-label-xs", "--sgds-font-weight-semibold", "--sgds-line-height-3-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-label-xs-regular"],
        example: "Label XS regular",
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
        exampleClass: "tokenExampleCaptionSemibold",
        aliases: ["--sgds-font-size-caption-md", "--sgds-font-weight-semibold", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-caption-regular"],
        example: "Caption regular",
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
        exampleClass: "tokenExampleOverlineSemibold",
        aliases: ["--sgds-font-size-overline-md", "--sgds-font-weight-semibold", "--sgds-line-height-2-xs", "--sgds-letter-spacing-wide"],
      },
      {
        tokenNames: ["sgds-overline-regular"],
        example: "OVERLINE REGULAR",
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
        exampleClass: "tokenExampleLinkLgRegular",
        aliases: ["--sgds-font-size-link-lg", "--sgds-font-weight-regular", "--sgds-line-height-md", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-link-md-regular"],
        example: "Link medium regular",
        exampleClass: "tokenExampleLinkMdRegular",
        aliases: ["--sgds-font-size-link-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-link-sm-regular"],
        example: "Link small regular",
        exampleClass: "tokenExampleLinkSmRegular",
        aliases: ["--sgds-font-size-link-sm", "--sgds-font-weight-regular", "--sgds-line-height-2-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-link-xs-regular"],
        example: "Link XS regular",
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
        exampleClass: "tokenExampleListUnordered",
        aliases: ["sgds:list-disc", "--sgds-font-size-body-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
        note: "Default",
      },
      {
        tokenNames: ["sgds-list-ordered"],
        example: "Ordered list item",
        exampleClass: "tokenExampleListOrdered",
        aliases: ["sgds:list-decimal", "--sgds-font-size-body-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
      {
        tokenNames: ["sgds-list-unstyled"],
        example: "Unstyled list item",
        exampleClass: "tokenExampleListUnstyled",
        aliases: ["sgds:list-none", "--sgds-font-size-body-md", "--sgds-font-weight-regular", "--sgds-line-height-xs", "--sgds-letter-spacing-normal"],
      },
    ],
  },
];
