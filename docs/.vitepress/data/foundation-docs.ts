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
  "foundations/layout/breakpoint": "foundation-grid-system--docs",
  "foundations/layout/responsive-grid": "foundation-grid-system--responsive",
};

const foundationStorybookPathLabels: Record<string, string> = {
  "foundations/colour/brand-colour": "foundation/theming/govtech-brand-palettes",
  "foundations/colour/primitive-colour": "foundation-theming",
  "foundations/colour/semantic-colour": "foundation-theming",
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

// Token-only allowlist. Storybook links appear on token pages only — not on
// principles, utilities, or other foundation pages. Paths are normalised
// (no leading "docs/", no `.md` suffix).
const TOKEN_PAGE_PATHS = new Set<string>([
  // Border
  "foundations/border/border-radius-tokens",
  "foundations/border/border-width-tokens",
  // Colour
  "foundations/colour/brand-colour",
  "foundations/colour/primitive-colour",
  "foundations/colour/semantic-colour",
  // Elevation
  "foundations/elevation/edge-elevation",
  "foundations/elevation/surface-elevation",
  // Iconography
  "foundations/iconography/icon-tokens",
  // Layer
  "foundations/layer/layer-tokens",
  // Layout
  "foundations/layout/breakpoint",
  "foundations/layout/responsive-grid",
  // Spacing
  "foundations/spacing/component-gap",
  "foundations/spacing/component-padding",
  "foundations/spacing/layout-gap",
  "foundations/spacing/layout-padding",
  "foundations/spacing/spacer-scale",
  "foundations/spacing/spacing-tokens",
  "foundations/spacing/text-gap",
  // Typography
  "foundations/typography/font-family",
  "foundations/typography/font-weight-tokens",
  "foundations/typography/letter-spacing-tokens",
  "foundations/typography/line-height-tokens",
  "foundations/typography/paragraph-spacing",
  "foundations/typography/responsive",
  "foundations/typography/text-decoration",
  "foundations/typography/text-transform",
  "foundations/typography/typography-tokens",
]);

export const getFoundationStorybookHref = (path: string): string => {
  const normalizedPath = path.replace(/\.md$/, "");
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
