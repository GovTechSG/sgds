export type SemanticValue = {
  label: string;   // primitive label, e.g. "gray-000", "gray-1100 · 50%"
  hex: string;     // resolved colour for swatch, e.g. "#ffffff", "rgba(14,14,14,0.5)"
  border?: boolean; // show a border on near-white swatches
};

export type SemanticRow = {
  token: string;       // full CSS var name, e.g. "--sgds-bg-default"
  description: string;
  light: SemanticValue;
  dark: SemanticValue;
};

export type SemanticGroup = {
  id: string;
  label: string;
  rows: SemanticRow[];
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function solid(label: string, hex: string, border?: boolean): SemanticValue {
  return { label, hex, border };
}

function alpha(label: string, hex: string, opacity: number): SemanticValue {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { label, hex: `rgba(${r},${g},${b},${opacity})` };
}

const transparent: SemanticValue = { label: "transparent", hex: "transparent" };

// Primitive hex values
const G = {
  "000":  "#ffffff",
  "50":   "#f7f7f7",
  "100":  "#f3f3f3",
  "200":  "#dfdfdf",
  "300":  "#c6c6c6",
  "400":  "#a5a5a5",
  "500":  "#868686",
  "600":  "#6b6b6b",
  "700":  "#525252",
  "800":  "#3b3b3b",
  "900":  "#2a2a2a",
  "1000": "#1a1a1a",
  "1100": "#0e0e0e",
} as const;

const PP = {
  "100": "#f4f2fe",
  "200": "#e1dbfb",
  "300": "#c8bdf7",
  "400": "#a999f3",
  "500": "#8a72ef",
  "600": "#6b4feb",
  "700": "#523abc",
  "800": "#3c2b8a",
  "900": "#2a1e61",
} as const;

const GREEN = {
  "100": "#e3f9ed", "200": "#b1edcb", "300": "#62db96",
  "400": "#16bd5e", "500": "#129a4d", "600": "#0e7c3d",
  "700": "#0b5e2f", "800": "#084523", "900": "#063119",
} as const;

const RED = {
  "100": "#fcf1f1", "200": "#f8d7d7", "300": "#f1b2b2",
  "400": "#e98b8b", "500": "#e05959", "600": "#cf2323",
  "700": "#a11b1b", "800": "#791414", "900": "#550e0e",
} as const;

const YELLOW = {
  "100": "#fef4cb", "200": "#fcde63", "300": "#e5bf29",
  "400": "#c2a223", "500": "#9d841c", "600": "#7e6917",
  "700": "#605111", "800": "#483c0d", "900": "#322909",
} as const;

const BLUE = {
  "100": "#ecf5fe", "200": "#c8e2fb", "300": "#96c7f7",
  "400": "#60aaf4", "500": "#1e87ef", "600": "#0269d0",
  "700": "#0151a0", "800": "#013c77", "900": "#012a54",
} as const;

const PURPLE = {
  "100": "#fbf0fe", "200": "#f2d6fc", "300": "#e6adf9",
  "400": "#d983f6", "500": "#c94cf2", "600": "#ac1cdb",
  "700": "#8516a9", "800": "#641180", "900": "#460c5a",
} as const;

const CYAN = {
  "100": "#e0f7fc", "200": "#a8e9f7", "300": "#49d2ef",
  "400": "#00b4da", "500": "#0092b1", "600": "#00758d",
  "700": "#005a6d", "800": "#004352", "900": "#002f38",
} as const;

// ─── Semantic colour groups ───────────────────────────────────────────────────

export const semanticColourGroups: SemanticGroup[] = [
  {
    id: "default",
    label: "Default",
    rows: [
      // Backgrounds
      {
        token: "--sgds-bg-default",
        description: "Primary background colour for pages and major sections. Used as the standard backdrop across interfaces.",
        light: solid("gray-000", G["000"], true),
        dark:  solid("gray-1100", G["1100"]),
      },
      {
        token: "--sgds-bg-alternate",
        description: "Alternate background for visual separation between sections, e.g. zebra striping or secondary panels.",
        light: solid("gray-50", G["50"], true),
        dark:  solid("gray-1000", G["1000"]),
      },
      {
        token: "--sgds-bg-fixed-light",
        description: "Fixed light background that does not change in dark mode. Useful for areas that must always remain light.",
        light: solid("gray-000", G["000"], true),
        dark:  solid("gray-000", G["000"], true),
      },
      {
        token: "--sgds-bg-fixed-dark",
        description: "Fixed dark background that stays dark regardless of theme. Ideal for overlays or consistent dark regions.",
        light: solid("gray-1100", G["1100"]),
        dark:  solid("gray-1100", G["1100"]),
      },
      {
        token: "--sgds-bg-overlay",
        description: "Semi-opaque background used behind modals, drawers, and overlays to obscure background content.",
        light: alpha("gray-1100 · 50%", G["1100"], 0.5),
        dark:  alpha("gray-1100 · 50%", G["1100"], 0.5),
      },
      {
        token: "--sgds-bg-translucent",
        description: "10% translucent overlay. Adapts between dark-on-light and light-on-dark depending on the active theme.",
        light: alpha("gray-1100 · 10%", G["1100"], 0.1),
        dark:  alpha("gray-000 · 10%", G["000"], 0.1),
      },
      {
        token: "--sgds-bg-translucent-subtle",
        description: "Subtle ~5% translucent background. Used for lighter layering needs such as hover states.",
        light: alpha("gray-1100 · 5%", G["1100"], 0.05),
        dark:  alpha("gray-000 · 10%", G["000"], 0.1),
      },
      {
        token: "--sgds-bg-transparent",
        description: "Fully transparent background. Used when no background colour is required, or to inherit from the parent.",
        light: transparent,
        dark:  transparent,
      },
      // Surfaces
      {
        token: "--sgds-surface-default",
        description: "Default surface colour for containers such as cards, modals, and drawers. Adapts to light or dark themes.",
        light: solid("gray-000", G["000"], true),
        dark:  solid("gray-900", G["900"]),
      },
      {
        token: "--sgds-surface-raised",
        description: "Slightly elevated surface indicating layering above the default surface.",
        light: solid("gray-100", G["100"], true),
        dark:  solid("gray-800", G["800"]),
      },
      {
        token: "--sgds-surface-inverse",
        description: "Inverse of the default surface. Used for high-contrast regions that flip between themes.",
        light: solid("gray-900", G["900"]),
        dark:  solid("gray-000", G["000"], true),
      },
      {
        token: "--sgds-surface-fixed-light",
        description: "Surface that always appears light, regardless of theme. For consistent brand regions.",
        light: solid("gray-000", G["000"], true),
        dark:  solid("gray-000", G["000"], true),
      },
      {
        token: "--sgds-surface-fixed-dark",
        description: "Surface that always appears dark, regardless of theme.",
        light: solid("gray-900", G["900"]),
        dark:  solid("gray-900", G["900"]),
      },
      // Text / icon colours
      {
        token: "--sgds-color-default",
        description: "Primary foreground colour for general body text and icons.",
        light: solid("gray-1000", G["1000"]),
        dark:  solid("gray-100", G["100"]),
      },
      {
        token: "--sgds-color-subtle",
        description: "Slightly muted foreground for secondary or supporting text.",
        light: solid("gray-700", G["700"]),
        dark:  solid("gray-400", G["400"]),
      },
      {
        token: "--sgds-color-muted",
        description: "Muted foreground for disabled, placeholder, or low-emphasis content.",
        light: solid("gray-300", G["300"]),
        dark:  solid("gray-800", G["800"]),
      },
      {
        token: "--sgds-color-inverse",
        description: "Inverse foreground colour for use on contrasting backgrounds.",
        light: solid("gray-100", G["100"]),
        dark:  solid("gray-1000", G["1000"]),
      },
      {
        token: "--sgds-color-fixed-light",
        description: "Fixed light foreground that does not change across themes.",
        light: solid("gray-100", G["100"]),
        dark:  solid("gray-100", G["100"]),
      },
      {
        token: "--sgds-color-fixed-dark",
        description: "Fixed dark foreground that does not change across themes.",
        light: solid("gray-1000", G["1000"]),
        dark:  solid("gray-1000", G["1000"]),
      },
      {
        token: "--sgds-color-transparent",
        description: "Transparent foreground colour.",
        light: transparent,
        dark:  transparent,
      },
      // Border colours
      {
        token: "--sgds-border-color-default",
        description: "Default border colour for interactive components and dividers.",
        light: solid("gray-500", G["500"]),
        dark:  solid("gray-500", G["500"]),
      },
      {
        token: "--sgds-border-color-emphasis",
        description: "Stronger border colour for emphasis, focus, or active states.",
        light: solid("gray-800", G["800"]),
        dark:  solid("gray-200", G["200"]),
      },
      {
        token: "--sgds-border-color-muted",
        description: "Subtle border colour for lightweight separators and containers.",
        light: solid("gray-200", G["200"]),
        dark:  solid("gray-800", G["800"]),
      },
      {
        token: "--sgds-border-color-fixed-light",
        description: "Fixed light border colour that stays light in both themes.",
        light: solid("gray-000", G["000"], true),
        dark:  solid("gray-000", G["000"], true),
      },
      {
        token: "--sgds-border-color-fixed-dark",
        description: "Fixed dark border colour that stays dark in both themes.",
        light: solid("gray-1000", G["1000"]),
        dark:  solid("gray-1000", G["1000"]),
      },
      {
        token: "--sgds-border-color-translucent",
        description: "Translucent border for subtle outlines that adapt to the active theme.",
        light: alpha("gray-1100 · 5%", G["1100"], 0.05),
        dark:  alpha("gray-000 · 10%", G["000"], 0.1),
      },
      {
        token: "--sgds-border-color-transparent",
        description: "Transparent border that removes the border visually.",
        light: transparent,
        dark:  transparent,
      },
    ],
  },
  {
    id: "primary",
    label: "Primary",
    rows: [
      {
        token: "--sgds-primary-bg-default",
        description: "Bold primary background for call-to-action elements.",
        light: solid("product-primary-700", PP["700"]),
        dark:  solid("product-primary-600", PP["600"]),
      },
      {
        token: "--sgds-primary-bg-muted",
        description: "Subtle primary tinted background for low-emphasis areas.",
        light: solid("product-primary-100", PP["100"], true),
        dark:  solid("product-primary-200", PP["200"], true),
      },
      {
        token: "--sgds-primary-bg-translucent",
        description: "Translucent primary background for hover or focus states.",
        light: alpha("product-primary-700 · 10%", PP["700"], 0.1),
        dark:  alpha("product-primary-100 · 5%", PP["100"], 0.05),
      },
      {
        token: "--sgds-primary-surface-default",
        description: "Default primary surface for filled interactive elements.",
        light: solid("product-primary-600", PP["600"]),
        dark:  solid("product-primary-600", PP["600"]),
      },
      {
        token: "--sgds-primary-surface-emphasis",
        description: "Stronger primary surface for hover or active states.",
        light: solid("product-primary-700", PP["700"]),
        dark:  solid("product-primary-700", PP["700"]),
      },
      {
        token: "--sgds-primary-surface-muted",
        description: "Light primary surface for tinted badges and backgrounds.",
        light: solid("product-primary-100", PP["100"], true),
        dark:  solid("product-primary-100", PP["100"], true),
      },
      {
        token: "--sgds-primary-surface-translucent",
        description: "Translucent primary surface for layered UI elements.",
        light: alpha("product-primary-700 · 10%", PP["700"], 0.1),
        dark:  alpha("product-primary-100 · 10%", PP["100"], 0.1),
      },
      {
        token: "--sgds-primary-color-default",
        description: "Primary text or icon colour on neutral backgrounds.",
        light: solid("product-primary-600", PP["600"]),
        dark:  solid("product-primary-400", PP["400"]),
      },
      {
        token: "--sgds-primary-color-emphasis",
        description: "Stronger primary colour for links and emphasis text.",
        light: solid("product-primary-700", PP["700"]),
        dark:  solid("product-primary-300", PP["300"]),
      },
      {
        token: "--sgds-primary-color-fixed-light",
        description: "Fixed primary colour for use on dark or coloured backgrounds.",
        light: solid("product-primary-400", PP["400"]),
        dark:  solid("product-primary-400", PP["400"]),
      },
      {
        token: "--sgds-primary-color-fixed-dark",
        description: "Fixed primary colour for use on light backgrounds.",
        light: solid("product-primary-600", PP["600"]),
        dark:  solid("product-primary-600", PP["600"]),
      },
      {
        token: "--sgds-primary-border-color-default",
        description: "Default primary border colour.",
        light: solid("product-primary-600", PP["600"]),
        dark:  solid("product-primary-400", PP["400"]),
      },
      {
        token: "--sgds-primary-border-color-emphasis",
        description: "Stronger primary border for focus or active states.",
        light: solid("product-primary-700", PP["700"]),
        dark:  solid("product-primary-200", PP["200"], true),
      },
      {
        token: "--sgds-primary-border-color-muted",
        description: "Subtle primary border for lightweight outlines.",
        light: solid("product-primary-200", PP["200"], true),
        dark:  solid("product-primary-700", PP["700"]),
      },
    ],
  },
  {
    id: "success",
    label: "Success",
    rows: [
      {
        token: "--sgds-success-bg-default",
        description: "Default success background for confirmation and success states.",
        light: solid("green-700", GREEN["700"]),
        dark:  solid("green-600", GREEN["600"]),
      },
      {
        token: "--sgds-success-bg-muted",
        description: "Subtle success tinted background.",
        light: solid("green-100", GREEN["100"], true),
        dark:  solid("green-200", GREEN["200"], true),
      },
      {
        token: "--sgds-success-surface-default",
        description: "Default success surface for filled components.",
        light: solid("green-600", GREEN["600"]),
        dark:  solid("green-600", GREEN["600"]),
      },
      {
        token: "--sgds-success-surface-emphasis",
        description: "Stronger success surface for hover or active states.",
        light: solid("green-700", GREEN["700"]),
        dark:  solid("green-700", GREEN["700"]),
      },
      {
        token: "--sgds-success-surface-muted",
        description: "Light success surface for tinted badges and backgrounds.",
        light: solid("green-100", GREEN["100"], true),
        dark:  solid("green-100", GREEN["100"], true),
      },
      {
        token: "--sgds-success-color-default",
        description: "Success text or icon colour.",
        light: solid("green-600", GREEN["600"]),
        dark:  solid("green-400", GREEN["400"]),
      },
      {
        token: "--sgds-success-color-emphasis",
        description: "Stronger success colour for emphasis.",
        light: solid("green-700", GREEN["700"]),
        dark:  solid("green-300", GREEN["300"]),
      },
      {
        token: "--sgds-success-color-fixed-light",
        description: "Fixed success colour for dark backgrounds.",
        light: solid("green-400", GREEN["400"]),
        dark:  solid("green-400", GREEN["400"]),
      },
      {
        token: "--sgds-success-color-fixed-dark",
        description: "Fixed success colour for light backgrounds.",
        light: solid("green-600", GREEN["600"]),
        dark:  solid("green-600", GREEN["600"]),
      },
      {
        token: "--sgds-success-border-color-default",
        description: "Default success border colour.",
        light: solid("green-600", GREEN["600"]),
        dark:  solid("green-400", GREEN["400"]),
      },
      {
        token: "--sgds-success-border-color-emphasis",
        description: "Stronger success border for focus or active states.",
        light: solid("green-700", GREEN["700"]),
        dark:  solid("green-200", GREEN["200"], true),
      },
      {
        token: "--sgds-success-border-color-muted",
        description: "Subtle success border colour.",
        light: solid("green-200", GREEN["200"], true),
        dark:  solid("green-700", GREEN["700"]),
      },
    ],
  },
  {
    id: "warning",
    label: "Warning",
    rows: [
      {
        token: "--sgds-warning-bg-default",
        description: "Default warning background for caution or alert states.",
        light: solid("yellow-200", YELLOW["200"]),
        dark:  solid("yellow-300", YELLOW["300"]),
      },
      {
        token: "--sgds-warning-bg-muted",
        description: "Subtle warning tinted background.",
        light: solid("yellow-100", YELLOW["100"], true),
        dark:  solid("yellow-200", YELLOW["200"]),
      },
      {
        token: "--sgds-warning-surface-default",
        description: "Default warning surface for filled components.",
        light: solid("yellow-200", YELLOW["200"]),
        dark:  solid("yellow-200", YELLOW["200"]),
      },
      {
        token: "--sgds-warning-surface-emphasis",
        description: "Stronger warning surface for hover or active states.",
        light: solid("yellow-600", YELLOW["600"]),
        dark:  solid("yellow-600", YELLOW["600"]),
      },
      {
        token: "--sgds-warning-surface-muted",
        description: "Light warning surface for tinted badges.",
        light: solid("yellow-100", YELLOW["100"], true),
        dark:  solid("yellow-100", YELLOW["100"], true),
      },
      {
        token: "--sgds-warning-color-default",
        description: "Warning text or icon colour.",
        light: solid("yellow-600", YELLOW["600"]),
        dark:  solid("yellow-300", YELLOW["300"]),
      },
      {
        token: "--sgds-warning-color-emphasis",
        description: "Stronger warning colour for emphasis.",
        light: solid("yellow-700", YELLOW["700"]),
        dark:  solid("yellow-200", YELLOW["200"]),
      },
      {
        token: "--sgds-warning-color-fixed-light",
        description: "Fixed warning colour for dark backgrounds.",
        light: solid("yellow-300", YELLOW["300"]),
        dark:  solid("yellow-300", YELLOW["300"]),
      },
      {
        token: "--sgds-warning-color-fixed-dark",
        description: "Fixed warning colour for light backgrounds.",
        light: solid("yellow-600", YELLOW["600"]),
        dark:  solid("yellow-600", YELLOW["600"]),
      },
      {
        token: "--sgds-warning-border-color-default",
        description: "Default warning border colour.",
        light: solid("yellow-600", YELLOW["600"]),
        dark:  solid("yellow-400", YELLOW["400"]),
      },
      {
        token: "--sgds-warning-border-color-emphasis",
        description: "Stronger warning border for focus or active states.",
        light: solid("yellow-700", YELLOW["700"]),
        dark:  solid("yellow-200", YELLOW["200"]),
      },
      {
        token: "--sgds-warning-border-color-muted",
        description: "Subtle warning border colour.",
        light: solid("yellow-200", YELLOW["200"]),
        dark:  solid("yellow-700", YELLOW["700"]),
      },
    ],
  },
  {
    id: "danger",
    label: "Danger",
    rows: [
      {
        token: "--sgds-danger-bg-default",
        description: "Default danger background for error and destructive states.",
        light: solid("red-700", RED["700"]),
        dark:  solid("red-600", RED["600"]),
      },
      {
        token: "--sgds-danger-bg-muted",
        description: "Subtle danger tinted background.",
        light: solid("red-100", RED["100"], true),
        dark:  solid("red-200", RED["200"], true),
      },
      {
        token: "--sgds-danger-surface-default",
        description: "Default danger surface for filled components.",
        light: solid("red-600", RED["600"]),
        dark:  solid("red-600", RED["600"]),
      },
      {
        token: "--sgds-danger-surface-emphasis",
        description: "Stronger danger surface for hover or active states.",
        light: solid("red-700", RED["700"]),
        dark:  solid("red-700", RED["700"]),
      },
      {
        token: "--sgds-danger-surface-muted",
        description: "Light danger surface for tinted badges.",
        light: solid("red-100", RED["100"], true),
        dark:  solid("red-100", RED["100"], true),
      },
      {
        token: "--sgds-danger-surface-translucent",
        description: "Translucent danger surface for destructive state overlays.",
        light: alpha("red-700 · 8%", RED["700"], 0.08),
        dark:  alpha("red-100 · 8%", RED["100"], 0.08),
      },
      {
        token: "--sgds-danger-color-default",
        description: "Danger text or icon colour.",
        light: solid("red-600", RED["600"]),
        dark:  solid("red-400", RED["400"]),
      },
      {
        token: "--sgds-danger-color-emphasis",
        description: "Stronger danger colour for emphasis.",
        light: solid("red-700", RED["700"]),
        dark:  solid("red-300", RED["300"]),
      },
      {
        token: "--sgds-danger-color-fixed-light",
        description: "Fixed danger colour for dark backgrounds.",
        light: solid("red-400", RED["400"]),
        dark:  solid("red-400", RED["400"]),
      },
      {
        token: "--sgds-danger-color-fixed-dark",
        description: "Fixed danger colour for light backgrounds.",
        light: solid("red-600", RED["600"]),
        dark:  solid("red-600", RED["600"]),
      },
      {
        token: "--sgds-danger-border-color-default",
        description: "Default danger border colour.",
        light: solid("red-600", RED["600"]),
        dark:  solid("red-400", RED["400"]),
      },
      {
        token: "--sgds-danger-border-color-emphasis",
        description: "Stronger danger border for focus or active states.",
        light: solid("red-700", RED["700"]),
        dark:  solid("red-200", RED["200"], true),
      },
      {
        token: "--sgds-danger-border-color-muted",
        description: "Subtle danger border colour.",
        light: solid("red-200", RED["200"], true),
        dark:  solid("red-700", RED["700"]),
      },
    ],
  },
  {
    id: "accent",
    label: "Accent",
    rows: [
      {
        token: "--sgds-accent-bg-default",
        description: "Default accent background (blue) for informational and link-adjacent elements.",
        light: solid("blue-700", BLUE["700"]),
        dark:  solid("blue-600", BLUE["600"]),
      },
      {
        token: "--sgds-accent-bg-muted",
        description: "Subtle accent tinted background.",
        light: solid("blue-100", BLUE["100"], true),
        dark:  solid("blue-200", BLUE["200"], true),
      },
      {
        token: "--sgds-accent-surface-default",
        description: "Default accent surface for filled components.",
        light: solid("blue-600", BLUE["600"]),
        dark:  solid("blue-600", BLUE["600"]),
      },
      {
        token: "--sgds-accent-surface-emphasis",
        description: "Stronger accent surface for hover or active states.",
        light: solid("blue-700", BLUE["700"]),
        dark:  solid("blue-700", BLUE["700"]),
      },
      {
        token: "--sgds-accent-surface-muted",
        description: "Light accent surface for tinted badges.",
        light: solid("blue-100", BLUE["100"], true),
        dark:  solid("blue-100", BLUE["100"], true),
      },
      {
        token: "--sgds-accent-color-default",
        description: "Accent text or icon colour.",
        light: solid("blue-600", BLUE["600"]),
        dark:  solid("blue-400", BLUE["400"]),
      },
      {
        token: "--sgds-accent-color-emphasis",
        description: "Stronger accent colour for emphasis.",
        light: solid("blue-700", BLUE["700"]),
        dark:  solid("blue-300", BLUE["300"]),
      },
      {
        token: "--sgds-accent-color-fixed-light",
        description: "Fixed accent colour for dark backgrounds.",
        light: solid("blue-400", BLUE["400"]),
        dark:  solid("blue-400", BLUE["400"]),
      },
      {
        token: "--sgds-accent-color-fixed-dark",
        description: "Fixed accent colour for light backgrounds.",
        light: solid("blue-600", BLUE["600"]),
        dark:  solid("blue-600", BLUE["600"]),
      },
      {
        token: "--sgds-accent-border-color-default",
        description: "Default accent border colour.",
        light: solid("blue-500", BLUE["500"]),
        dark:  solid("blue-500", BLUE["500"]),
      },
      {
        token: "--sgds-accent-border-color-emphasis",
        description: "Stronger accent border for focus or active states.",
        light: solid("blue-700", BLUE["700"]),
        dark:  solid("blue-200", BLUE["200"], true),
      },
      {
        token: "--sgds-accent-border-color-muted",
        description: "Subtle accent border colour.",
        light: solid("blue-200", BLUE["200"], true),
        dark:  solid("blue-700", BLUE["700"]),
      },
    ],
  },
  {
    id: "neutral",
    label: "Neutral",
    rows: [
      {
        token: "--sgds-neutral-bg-default",
        description: "Default neutral background for secondary or contextual elements.",
        light: solid("gray-700", G["700"]),
        dark:  solid("gray-600", G["600"]),
      },
      {
        token: "--sgds-neutral-bg-muted",
        description: "Subtle neutral tinted background.",
        light: solid("gray-100", G["100"], true),
        dark:  solid("gray-200", G["200"]),
      },
      {
        token: "--sgds-neutral-surface-default",
        description: "Default neutral surface for filled components.",
        light: solid("gray-700", G["700"]),
        dark:  solid("gray-600", G["600"]),
      },
      {
        token: "--sgds-neutral-surface-emphasis",
        description: "Stronger neutral surface for hover or active states.",
        light: solid("gray-800", G["800"]),
        dark:  solid("gray-700", G["700"]),
      },
      {
        token: "--sgds-neutral-surface-muted",
        description: "Light neutral surface for tinted badges.",
        light: solid("gray-100", G["100"], true),
        dark:  solid("gray-200", G["200"]),
      },
      {
        token: "--sgds-neutral-surface-translucent",
        description: "Translucent neutral surface for layered neutral UI.",
        light: alpha("gray-1100 · 15%", G["1100"], 0.15),
        dark:  alpha("gray-000 · 15%", G["000"], 0.15),
      },
      {
        token: "--sgds-neutral-color-default",
        description: "Neutral text or icon colour.",
        light: solid("gray-600", G["600"]),
        dark:  solid("gray-400", G["400"]),
      },
      {
        token: "--sgds-neutral-color-emphasis",
        description: "Stronger neutral colour for emphasis.",
        light: solid("gray-700", G["700"]),
        dark:  solid("gray-300", G["300"]),
      },
      {
        token: "--sgds-neutral-color-fixed-light",
        description: "Fixed neutral colour for dark backgrounds.",
        light: solid("gray-400", G["400"]),
        dark:  solid("gray-400", G["400"]),
      },
      {
        token: "--sgds-neutral-color-fixed-dark",
        description: "Fixed neutral colour for light backgrounds.",
        light: solid("gray-600", G["600"]),
        dark:  solid("gray-600", G["600"]),
      },
      {
        token: "--sgds-neutral-border-color-default",
        description: "Default neutral border colour.",
        light: solid("gray-600", G["600"]),
        dark:  solid("gray-400", G["400"]),
      },
      {
        token: "--sgds-neutral-border-color-emphasis",
        description: "Stronger neutral border for emphasis.",
        light: solid("gray-700", G["700"]),
        dark:  solid("gray-200", G["200"]),
      },
      {
        token: "--sgds-neutral-border-color-muted",
        description: "Subtle neutral border colour.",
        light: solid("gray-200", G["200"]),
        dark:  solid("gray-700", G["700"]),
      },
    ],
  },
  {
    id: "purple",
    label: "Purple",
    rows: [
      {
        token: "--sgds-purple-bg-default",
        description: "Default purple background for brand-purple accented elements.",
        light: solid("purple-700", PURPLE["700"]),
        dark:  solid("purple-600", PURPLE["600"]),
      },
      {
        token: "--sgds-purple-bg-muted",
        description: "Subtle purple tinted background.",
        light: solid("purple-100", PURPLE["100"], true),
        dark:  solid("purple-200", PURPLE["200"], true),
      },
      {
        token: "--sgds-purple-surface-default",
        description: "Default purple surface for filled components.",
        light: solid("purple-600", PURPLE["600"]),
        dark:  solid("purple-600", PURPLE["600"]),
      },
      {
        token: "--sgds-purple-surface-emphasis",
        description: "Stronger purple surface for hover or active states.",
        light: solid("purple-700", PURPLE["700"]),
        dark:  solid("purple-700", PURPLE["700"]),
      },
      {
        token: "--sgds-purple-surface-muted",
        description: "Light purple surface for tinted badges.",
        light: solid("purple-100", PURPLE["100"], true),
        dark:  solid("purple-100", PURPLE["100"], true),
      },
      {
        token: "--sgds-purple-color-default",
        description: "Purple text or icon colour.",
        light: solid("purple-600", PURPLE["600"]),
        dark:  solid("purple-400", PURPLE["400"]),
      },
      {
        token: "--sgds-purple-color-emphasis",
        description: "Stronger purple colour for emphasis.",
        light: solid("purple-700", PURPLE["700"]),
        dark:  solid("purple-300", PURPLE["300"]),
      },
      {
        token: "--sgds-purple-color-fixed-light",
        description: "Fixed purple colour for dark backgrounds.",
        light: solid("purple-400", PURPLE["400"]),
        dark:  solid("purple-400", PURPLE["400"]),
      },
      {
        token: "--sgds-purple-color-fixed-dark",
        description: "Fixed purple colour for light backgrounds.",
        light: solid("purple-600", PURPLE["600"]),
        dark:  solid("purple-600", PURPLE["600"]),
      },
      {
        token: "--sgds-purple-border-color-default",
        description: "Default purple border colour.",
        light: solid("purple-500", PURPLE["500"]),
        dark:  solid("purple-500", PURPLE["500"]),
      },
      {
        token: "--sgds-purple-border-color-emphasis",
        description: "Stronger purple border for focus or active states.",
        light: solid("purple-700", PURPLE["700"]),
        dark:  solid("purple-200", PURPLE["200"], true),
      },
      {
        token: "--sgds-purple-border-color-muted",
        description: "Subtle purple border colour.",
        light: solid("purple-200", PURPLE["200"], true),
        dark:  solid("purple-700", PURPLE["700"]),
      },
    ],
  },
  {
    id: "cyan",
    label: "Cyan",
    rows: [
      {
        token: "--sgds-cyan-bg-default",
        description: "Default cyan background for GovTech-cyan accented elements.",
        light: solid("cyan-700", CYAN["700"]),
        dark:  solid("cyan-600", CYAN["600"]),
      },
      {
        token: "--sgds-cyan-bg-muted",
        description: "Subtle cyan tinted background.",
        light: solid("cyan-100", CYAN["100"], true),
        dark:  solid("cyan-200", CYAN["200"], true),
      },
      {
        token: "--sgds-cyan-surface-default",
        description: "Default cyan surface for filled components.",
        light: solid("cyan-600", CYAN["600"]),
        dark:  solid("cyan-600", CYAN["600"]),
      },
      {
        token: "--sgds-cyan-surface-emphasis",
        description: "Stronger cyan surface for hover or active states.",
        light: solid("cyan-700", CYAN["700"]),
        dark:  solid("cyan-700", CYAN["700"]),
      },
      {
        token: "--sgds-cyan-surface-muted",
        description: "Light cyan surface for tinted badges.",
        light: solid("cyan-100", CYAN["100"], true),
        dark:  solid("cyan-100", CYAN["100"], true),
      },
      {
        token: "--sgds-cyan-color-default",
        description: "Cyan text or icon colour.",
        light: solid("cyan-600", CYAN["600"]),
        dark:  solid("cyan-400", CYAN["400"]),
      },
      {
        token: "--sgds-cyan-color-emphasis",
        description: "Stronger cyan colour for emphasis.",
        light: solid("cyan-700", CYAN["700"]),
        dark:  solid("cyan-300", CYAN["300"]),
      },
      {
        token: "--sgds-cyan-color-fixed-light",
        description: "Fixed cyan colour for dark backgrounds.",
        light: solid("cyan-400", CYAN["400"]),
        dark:  solid("cyan-400", CYAN["400"]),
      },
      {
        token: "--sgds-cyan-color-fixed-dark",
        description: "Fixed cyan colour for light backgrounds.",
        light: solid("cyan-600", CYAN["600"]),
        dark:  solid("cyan-600", CYAN["600"]),
      },
      {
        token: "--sgds-cyan-border-color-default",
        description: "Default cyan border colour.",
        light: solid("cyan-500", CYAN["500"]),
        dark:  solid("cyan-500", CYAN["500"]),
      },
      {
        token: "--sgds-cyan-border-color-emphasis",
        description: "Stronger cyan border for focus or active states.",
        light: solid("cyan-700", CYAN["700"]),
        dark:  solid("cyan-200", CYAN["200"], true),
      },
      {
        token: "--sgds-cyan-border-color-muted",
        description: "Subtle cyan border colour.",
        light: solid("cyan-200", CYAN["200"], true),
        dark:  solid("cyan-700", CYAN["700"]),
      },
    ],
  },
];

// ─── Typography semantic group (rendered as its own section) ─────────────────

export const typographySemanticGroup: SemanticGroup = {
  id: "typography",
  label: "Typography",
  rows: [
    {
      token: "--sgds-display-color-default",
      description: "Default colour for large display headings.",
      light: solid("gray-1000", G["1000"]),
      dark:  solid("gray-000", G["000"], true),
    },
    {
      token: "--sgds-display-color-subtle",
      description: "Slightly muted display colour for secondary display text.",
      light: solid("gray-800", G["800"]),
      dark:  solid("gray-200", G["200"]),
    },
    {
      token: "--sgds-heading-color-default",
      description: "Default colour for section headings (h1–h6).",
      light: solid("gray-900", G["900"]),
      dark:  solid("gray-100", G["100"]),
    },
    {
      token: "--sgds-heading-color-subtle",
      description: "Slightly muted heading colour for secondary or nested headings.",
      light: solid("gray-800", G["800"]),
      dark:  solid("gray-200", G["200"]),
    },
    {
      token: "--sgds-body-color-default",
      description: "Default colour for body text content.",
      light: solid("gray-1000", G["1000"]),
      dark:  solid("gray-000", G["000"], true),
    },
    {
      token: "--sgds-body-color-subtle",
      description: "Slightly muted body colour for captions, metadata, or secondary copy.",
      light: solid("gray-700", G["700"]),
      dark:  solid("gray-300", G["300"]),
    },
    {
      token: "--sgds-label-color-default",
      description: "Default colour for form labels and small UI labels.",
      light: solid("gray-900", G["900"]),
      dark:  solid("gray-100", G["100"]),
    },
    {
      token: "--sgds-label-color-subtle",
      description: "Slightly muted label colour for helper text or secondary labels.",
      light: solid("gray-700", G["700"]),
      dark:  solid("gray-300", G["300"]),
    },
    {
      token: "--sgds-link-color-default",
      description: "Default colour for hyperlinks.",
      light: solid("blue-600", BLUE["600"]),
      dark:  solid("blue-400", BLUE["400"]),
    },
    {
      token: "--sgds-link-color-emphasis",
      description: "Hover or focus colour for hyperlinks.",
      light: solid("blue-700", BLUE["700"]),
      dark:  solid("blue-300", BLUE["300"]),
    },
  ],
};

// ─── Form colour groups (rendered as tabbed section) ─────────────────────────

export const formColourGroups: SemanticGroup[] = [
  {
    id: "form-surface",
    label: "Surface",
    rows: [
      {
        token: "--sgds-form-surface-default",
        description: "Default background surface for form inputs and fields.",
        light: solid("gray-000", G["000"], true),
        dark:  solid("gray-900", G["900"]),
      },
      {
        token: "--sgds-form-surface-raised",
        description: "Slightly elevated form surface for nested or grouped inputs.",
        light: solid("gray-100", G["100"], true),
        dark:  solid("gray-800", G["800"]),
      },
      {
        token: "--sgds-form-surface-emphasis",
        description: "Emphasised form surface for active or focused states.",
        light: solid("gray-700", G["700"]),
        dark:  solid("gray-200", G["200"]),
      },
      {
        token: "--sgds-form-surface-subtle",
        description: "Subtle form surface for placeholder or decorative areas.",
        light: solid("gray-400", G["400"]),
        dark:  solid("gray-500", G["500"]),
      },
      {
        token: "--sgds-form-surface-muted",
        description: "Muted surface for disabled or inactive form fields.",
        light: solid("gray-200", G["200"]),
        dark:  solid("gray-700", G["700"]),
      },
      {
        token: "--sgds-form-surface-inverse",
        description: "Inverse surface for dark-on-light form elements.",
        light: solid("gray-900", G["900"]),
        dark:  solid("gray-000", G["000"], true),
      },
      {
        token: "--sgds-form-surface-fixed-light",
        description: "Fixed light surface for form fields that always remain light.",
        light: solid("gray-000", G["000"], true),
        dark:  solid("gray-000", G["000"], true),
      },
      {
        token: "--sgds-form-surface-fixed-dark",
        description: "Fixed dark surface for form fields that always remain dark.",
        light: solid("gray-900", G["900"]),
        dark:  solid("gray-900", G["900"]),
      },
    ],
  },
  {
    id: "form-color",
    label: "Text",
    rows: [
      {
        token: "--sgds-form-color-default",
        description: "Default text colour within form fields.",
        light: solid("gray-900", G["900"]),
        dark:  solid("gray-100", G["100"]),
      },
      {
        token: "--sgds-form-color-subtle",
        description: "Slightly muted colour for helper text or secondary form text.",
        light: solid("gray-700", G["700"]),
        dark:  solid("gray-300", G["300"]),
      },
      {
        token: "--sgds-form-color-muted",
        description: "Muted colour for disabled or placeholder text in forms.",
        light: solid("gray-300", G["300"]),
        dark:  solid("gray-700", G["700"]),
      },
      {
        token: "--sgds-form-color-inverse",
        description: "Inverse colour for form text on contrasting backgrounds.",
        light: solid("gray-100", G["100"]),
        dark:  solid("gray-900", G["900"]),
      },
      {
        token: "--sgds-form-color-fixed-light",
        description: "Fixed light text colour that does not change across themes.",
        light: solid("gray-000", G["000"], true),
        dark:  solid("gray-000", G["000"], true),
      },
      {
        token: "--sgds-form-color-fixed-dark",
        description: "Fixed dark text colour that does not change across themes.",
        light: solid("gray-1100", G["1100"]),
        dark:  solid("gray-1100", G["1100"]),
      },
    ],
  },
  {
    id: "form-primary",
    label: "Primary",
    rows: [
      {
        token: "--sgds-form-primary-surface-default",
        description: "Default primary surface for active checkboxes, radios, and toggles.",
        light: solid("product-primary-600", PP["600"]),
        dark:  solid("product-primary-600", PP["600"]),
      },
      {
        token: "--sgds-form-primary-surface-emphasis",
        description: "Stronger primary surface for hover or active interactive form states.",
        light: solid("product-primary-700", PP["700"]),
        dark:  solid("product-primary-700", PP["700"]),
      },
      {
        token: "--sgds-form-primary-color-default",
        description: "Primary colour for selected form element indicators.",
        light: solid("product-primary-600", PP["600"]),
        dark:  solid("product-primary-400", PP["400"]),
      },
    ],
  },
  {
    id: "form-success",
    label: "Success",
    rows: [
      {
        token: "--sgds-form-success-surface-default",
        description: "Success surface for valid or confirmed form states.",
        light: solid("green-600", GREEN["600"]),
        dark:  solid("green-600", GREEN["600"]),
      },
      {
        token: "--sgds-form-success-color-default",
        description: "Success text or icon colour in form validation.",
        light: solid("green-600", GREEN["600"]),
        dark:  solid("green-500", GREEN["500"]),
      },
      {
        token: "--sgds-form-success-border-color-default",
        description: "Success border colour for valid form fields.",
        light: solid("green-500", GREEN["500"]),
        dark:  solid("green-500", GREEN["500"]),
      },
    ],
  },
  {
    id: "form-danger",
    label: "Danger",
    rows: [
      {
        token: "--sgds-form-danger-surface-default",
        description: "Danger surface for error or invalid form states.",
        light: solid("red-600", RED["600"]),
        dark:  solid("red-600", RED["600"]),
      },
      {
        token: "--sgds-form-danger-color-default",
        description: "Danger text or icon colour in form validation.",
        light: solid("red-600", RED["600"]),
        dark:  solid("red-500", RED["500"]),
      },
      {
        token: "--sgds-form-danger-border-color-default",
        description: "Danger border colour for invalid form fields.",
        light: solid("red-500", RED["500"]),
        dark:  solid("red-500", RED["500"]),
      },
    ],
  },
];
