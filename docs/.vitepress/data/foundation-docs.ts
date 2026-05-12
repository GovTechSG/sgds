export type FoundationHeaderLink = {
  label: string;
  href: string;
  path: string;
  iconSrc: string;
};

const FOUNDATION_STORYBOOK_BASE =
  "https://webcomponent.designsystem.tech.gov.sg/?path=/docs";

// Storybook story IDs for token pages. Paths not listed here fall back to a
// section-level Storybook entry chosen by `fallbackStorybookIdForPath`.
const foundationStorybookIds: Record<string, string> = {
  "foundations/colour/brand-colour": "foundation-theming-govtech-brand-palettes--docs",
  "foundations/colour/primitive-colour": "foundation-theming--docs",
  "foundations/colour/semantic-colour": "foundation-theming--docs",
  "foundations/iconography/icon-library": "components-icon--docs",
  "foundations/layout/breakpoint": "foundation-grid-system--docs",
  "foundations/layout/responsive-grid": "foundation-grid-system--responsive",
  "foundations/spacing/spacer-scale": "utilities-spacing-introduction--docs",
  "foundations/typography/caption": "foundation-typography-captions--docs",
  "foundations/typography/display": "foundation-typography-display--docs",
  "foundations/typography/heading": "foundation-typography-headings--docs",
  "foundations/typography/label": "foundation-typography-labels--docs",
  "foundations/typography/link": "foundation-typography-links--docs",
  "foundations/typography/list": "foundation-typography-lists--docs",
  "foundations/typography/overline": "foundation-typography-overline--docs",
  "foundations/typography/paragraph-body": "foundation-typography-paragraph-body--docs",
  "foundations/typography/subtitle": "foundation-typography-subtitles--docs",
};

const foundationStorybookPathLabels: Record<string, string> = {
  "foundations/colour/brand-colour": "foundation/theming/govtech-brand-palettes",
  "foundations/colour/primitive-colour": "foundation-theming",
  "foundations/colour/semantic-colour": "foundation-theming",
  "foundations/elevation/edge-elevation": "utilities-elevation--elevation",
  "foundations/elevation/surface-elevation": "utilities-elevation--elevation",
  "foundations/iconography/icon-library": "components/icon",
  "foundations/layer/layer-tokens": "utilities-z-index--z-index-all-stacks",
  "foundations/spacing/gap": "utilities-spacing-gap-component--component",
  "foundations/spacing/padding": "utilities-spacing-padding-component--component",
  "foundations/typography/caption": "foundation-typography-captions",
  "foundations/typography/display": "foundation-typography-display",
  "foundations/typography/heading": "foundation-typography-headings",
  "foundations/typography/label": "foundation-typography-labels",
  "foundations/typography/link": "foundation-typography-links",
  "foundations/typography/list": "foundation-typography-lists",
  "foundations/typography/overline": "foundation-typography-overline",
  "foundations/typography/paragraph-body": "foundation-typography-paragraph-body",
  "foundations/typography/subtitle": "foundation-typography-subtitles",
  "foundations/typography/font-weight-tokens": "utilities-typography-font-weight--font-weight",
  "foundations/typography/letter-spacing-tokens": "utilities-typography-letter-spacing--letter-spacing",
  "foundations/typography/line-height-tokens": "utilities-typography-line-height--line-height",
  "foundations/typography/typography-tokens": "utilities-typography-font-size--display-sizes",
};

const foundationStorybookHrefOverrides: Record<string, string> = {
  "foundations/elevation/edge-elevation":
    "https://webcomponent.designsystem.tech.gov.sg/?path=/story/utilities-elevation--elevation",
  "foundations/elevation/surface-elevation":
    "https://webcomponent.designsystem.tech.gov.sg/?path=/story/utilities-elevation--elevation",
  "foundations/layer/layer-tokens":
    "https://webcomponent.designsystem.tech.gov.sg/?path=/story/utilities-z-index--z-index-all-stacks",
  "foundations/spacing/gap":
    "https://webcomponent.designsystem.tech.gov.sg/?path=/story/utilities-spacing-gap-component--component",
  "foundations/spacing/padding":
    "https://webcomponent.designsystem.tech.gov.sg/?path=/story/utilities-spacing-padding-component--component",
  "foundations/typography/font-weight-tokens":
    "https://webcomponent.designsystem.tech.gov.sg/?path=/story/utilities-typography-font-weight--font-weight",
  "foundations/typography/letter-spacing-tokens":
    "https://webcomponent.designsystem.tech.gov.sg/?path=/story/utilities-typography-letter-spacing--letter-spacing",
  "foundations/typography/line-height-tokens":
    "https://webcomponent.designsystem.tech.gov.sg/?path=/story/utilities-typography-line-height--line-height",
  "foundations/typography/typography-tokens":
    "https://webcomponent.designsystem.tech.gov.sg/?path=/story/utilities-typography-font-size--display-sizes",
};

const fallbackStorybookIdForPath = (path: string): string => {
  if (path.startsWith("foundations/typography")) {
    return "foundation-typography-introduction--docs";
  }

  if (path.startsWith("foundations/layout")) {
    return "foundation-layout--docs";
  }

  return "foundation-introduction--docs";
};

// Foundation pages that should show Storybook links. Paths are normalised
// with no leading "docs/" and no `.md` suffix.
const TOKEN_PAGE_PATHS = new Set<string>([
  // Border
  "foundations/border/radius",
  "foundations/border/width",
  // Colour
  "foundations/colour/brand-colour",
  "foundations/colour/primitive-colour",
  "foundations/colour/semantic-colour",
  // Elevation
  "foundations/elevation/edge-elevation",
  "foundations/elevation/surface-elevation",
  // Iconography
  "foundations/iconography/icon-library",
  "foundations/iconography/icon-size",
  // Layer
  "foundations/layer/layer-tokens",
  // Layout
  "foundations/layout/breakpoint",
  "foundations/layout/responsive-grid",
  // Spacing
  "foundations/spacing/gap",
  "foundations/spacing/margin",
  "foundations/spacing/padding",
  "foundations/spacing/spacer-scale",
  // Typography text styles
  "foundations/typography/caption",
  "foundations/typography/display",
  "foundations/typography/heading",
  "foundations/typography/label",
  "foundations/typography/link",
  "foundations/typography/list",
  "foundations/typography/overline",
  "foundations/typography/paragraph-body",
  "foundations/typography/subtitle",
  // Typography type system
  "foundations/typography/font-weight-tokens",
  "foundations/typography/letter-spacing-tokens",
  "foundations/typography/line-height-tokens",
  "foundations/typography/typography-tokens",
]);

export const getFoundationStorybookHref = (path: string): string => {
  const normalizedPath = path.replace(/\.md$/, "");

  if (foundationStorybookHrefOverrides[normalizedPath]) {
    return foundationStorybookHrefOverrides[normalizedPath];
  }

  const storyId =
    foundationStorybookIds[normalizedPath] ?? fallbackStorybookIdForPath(normalizedPath);

  return `${FOUNDATION_STORYBOOK_BASE}/${storyId}`;
};

export const getFoundationHeaderLinks = (path: string): FoundationHeaderLink[] => {
  const normalizedPath = path.replace(/\.md$/, "");

  if (!TOKEN_PAGE_PATHS.has(normalizedPath)) {
    return [];
  }

  return [
    {
      label: "Storybook",
      iconSrc: "/brands/storybook.svg",
      path: foundationStorybookPathLabels[normalizedPath] ?? normalizedPath,
      href: getFoundationStorybookHref(normalizedPath),
    },
  ];
};
