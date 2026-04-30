export type BrandColor = {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  textTone: "light" | "dark" | "fixed-light" | "fixed-dark";
  bordered?: boolean;
};

export type PaletteSwatch = {
  token: string;
  hex: string;
};

export type PaletteRow = {
  label: string;
  description: string;
  colors: PaletteSwatch[];
};

export type SemanticColorItem = {
  label: string;
  token: string;
  hex: string;
};

export type SemanticColorGroup = {
  title: string;
  items: SemanticColorItem[];
};

export type SemanticColorSet = {
  title: string;
  description: string;
  groups: SemanticColorGroup[];
};

export const brandColors: BrandColor[] = [
  {
    name: "Singapore Red",
    hex: "#F4333D",
    rgb: "244 / 51 / 61",
    cmyk: "0 / 79 / 75 / 4",
    textTone: "light",
  },
  {
    name: "GovTech magenta",
    hex: "#BA2FA2",
    rgb: "186 / 47 / 162",
    cmyk: "0 / 75 / 13 / 27",
    textTone: "light",
  },
  {
    name: "GovTech cyan",
    hex: "#00C0F3",
    rgb: "0 / 192 / 243",
    cmyk: "100 / 21 / 0 / 5",
    textTone: "dark",
  },
  {
    name: "White",
    hex: "#FFFFFF",
    rgb: "255 / 255 / 255",
    cmyk: "0 / 0 / 0 / 0",
    textTone: "fixed-dark",
    bordered: true,
  },
  {
    name: "Black",
    hex: "#0E0E0E",
    rgb: "14 / 14 / 14",
    cmyk: "0 / 0 / 0 / 95",
    textTone: "fixed-light",
  },
];

export const extendedColors: PaletteSwatch[] = [
  { token: "extended-pink", hex: "#E02D78" },
  { token: "extended-red", hex: "#F4333D" },
  { token: "extended-orange", hex: "#FF7605" },
  { token: "extended-yellow", hex: "#FAC900" },
  { token: "extended-green", hex: "#17C964" },
  { token: "extended-teal", hex: "#00C2C2" },
  { token: "extended-cyan", hex: "#00C0F3" },
  { token: "extended-blue", hex: "#0278ED" },
  { token: "extended-purple", hex: "#6648E1" },
  { token: "extended-magenta", hex: "#BA2FA2" },
];

export const paletteRows: PaletteRow[] = [
  {
    label: "Neutral",
    description: "Neutral colours support base surfaces, text and interface structure.",
    colors: ["#F3F3F3", "#DFDFDF", "#C2C2C2", "#A5A5A5", "#868686", "#6B6B6B", "#525252", "#3D3D3D", "#2A2A2A", "#0E0E0E"].map((hex, index) => ({ token: `neutral-${index + 1}`, hex })),
  },
  { label: "Pink", description: "Pink colours support expressive and categorical uses.", colors: ["#FDF0F6", "#F9D6E5", "#F3AECB", "#ED84B0", "#E54D8C", "#C7286A", "#9A1F52", "#73173E", "#51102C", "#340A1C"].map((hex, index) => ({ token: `pink-${index + 1}`, hex })) },
  { label: "Red", description: "Red colours support danger, error and destructive states.", colors: ["#FEF0F1", "#FDD6D8", "#FBADB1", "#F88289", "#F5424B", "#CB2B33", "#9E2127", "#76191E", "#531115", "#350B0D"].map((hex, index) => ({ token: `red-${index + 1}`, hex })) },
  { label: "Orange", description: "Orange colours support warm categorical uses.", colors: ["#FFF2E7", "#FFD8B8", "#FFB171", "#FF831C", "#D96404", "#AD5003", "#853E03", "#642E02", "#452001", "#281603"].map((hex, index) => ({ token: `orange-${index + 1}`, hex })) },
  { label: "Yellow", description: "Yellow colours support warning and cautionary states.", colors: ["#FEF3C8", "#FCDE64", "#EBBD00", "#C8A100", "#A28200", "#826800", "#645000", "#4A3C00", "#342900", "#1E1A00"].map((hex, index) => ({ token: `yellow-${index + 1}`, hex })) },
  { label: "Green", description: "Green colours support success and positive states.", colors: ["#E3F9ED", "#B1EDCB", "#5CD992", "#16BD5E", "#129A4D", "#0E7C3D", "#0B5E2F", "#084623", "#063119", "#031F0F"].map((hex, index) => ({ token: `green-${index + 1}`, hex })) },
  { label: "Teal", description: "Teal colours support cool categorical uses.", colors: ["#E1F8F8", "#AAEBEB", "#4FD5D5", "#00B8B8", "#009696", "#007777", "#005C5C", "#004444", "#002F2F", "#021E1D"].map((hex, index) => ({ token: `teal-${index + 1}`, hex })) },
  { label: "Cyan", description: "Cyan colours support brand-adjacent and categorical uses.", colors: ["#E0F7FE", "#A7E9FB", "#47D1F6", "#00B3E2", "#0091B8", "#007493", "#005971", "#004355", "#002E3B", "#001D25"].map((hex, index) => ({ token: `cyan-${index + 1}`, hex })) },
  { label: "Blue", description: "Blue colours support links, accents and informative states.", colors: ["#ECF5FE", "#C8E2FB", "#96C7F7", "#60AAF4", "#1E87EF", "#0269D0", "#0151A0", "#013C77", "#012A54", "#001B34"].map((hex, index) => ({ token: `blue-${index + 1}`, hex })) },
  { label: "Purple", description: "Purple colours support product and expressive uses.", colors: ["#F4F2FD", "#E1DBF9", "#C6BAF4", "#AA99EE", "#8B74E8", "#6E51E2", "#533BB8", "#3E2C8A", "#2B1E5F", "#1F152E"].map((hex, index) => ({ token: `purple-${index + 1}`, hex })) },
  { label: "Magenta", description: "Magenta colours support GovTech brand-adjacent and expressive uses.", colors: ["#FBF2F9", "#F2D8ED", "#E5B2DC", "#D98BCB", "#C95EB7", "#B82EA0", "#8E247B", "#6A1B5D", "#4A1341", "#2F0C29"].map((hex, index) => ({ token: `magenta-${index + 1}`, hex })) },
];

export const semanticColorSets: SemanticColorSet[] = [
  {
    title: "Grayscales",
    description: "Grayscale semantic tokens are used for page backgrounds, surfaces, text, icons and borders.",
    groups: [
      {
        title: "Background colours",
        items: [
          { label: "Default", token: "--sgds-bg-default", hex: "#FFFFFF" },
          { label: "Alternate", token: "--sgds-bg-alternate", hex: "#F7F7F7" },
          { label: "Fixed light", token: "--sgds-bg-fixed-light", hex: "#FFFFFF" },
          { label: "Fixed dark", token: "--sgds-bg-fixed-dark", hex: "#0E0E0E" },
        ],
      },
      {
        title: "Surface colours",
        items: [
          { label: "Default", token: "--sgds-surface-default", hex: "#FFFFFF" },
          { label: "Raised", token: "--sgds-surface-raised", hex: "#F3F3F3" },
          { label: "Inverse", token: "--sgds-surface-inverse", hex: "#2A2A2A" },
          { label: "Fixed light", token: "--sgds-surface-fixed-light", hex: "#FFFFFF" },
          { label: "Fixed dark", token: "--sgds-surface-fixed-dark", hex: "#2A2A2A" },
        ],
      },
      {
        title: "Text and icon colours",
        items: [
          { label: "Default", token: "--sgds-color-default", hex: "#1A1A1A" },
          { label: "Subtle", token: "--sgds-color-subtle", hex: "#525252" },
          { label: "Muted", token: "--sgds-color-muted", hex: "#C6C6C6" },
          { label: "Inverse", token: "--sgds-color-inverse", hex: "#F3F3F3" },
          { label: "Fixed light", token: "--sgds-color-fixed-light", hex: "#F3F3F3" },
          { label: "Fixed dark", token: "--sgds-color-fixed-dark", hex: "#1A1A1A" },
        ],
      },
      {
        title: "Border colours",
        items: [
          { label: "Default", token: "--sgds-border-color-default", hex: "#868686" },
          { label: "Emphasis", token: "--sgds-border-color-emphasis", hex: "#3B3B3B" },
          { label: "Muted", token: "--sgds-border-color-muted", hex: "#DFDFDF" },
          { label: "Fixed light", token: "--sgds-border-color-fixed-light", hex: "#FFFFFF" },
          { label: "Fixed dark", token: "--sgds-border-color-fixed-dark", hex: "#1A1A1A" },
        ],
      },
    ],
  },
  {
    title: "Primary colours",
    description: "Primary semantic tokens are the main product colour roles for actions, emphasis and selected UI.",
    groups: [
      {
        title: "Background colours",
        items: [
          { label: "Default", token: "--sgds-primary-bg-default", hex: "#523ABC" },
          { label: "Muted", token: "--sgds-primary-bg-muted", hex: "#F4F2FE" },
        ],
      },
      {
        title: "Surface colours",
        items: [
          { label: "Default", token: "--sgds-primary-surface-default", hex: "#6B4FEB" },
          { label: "Emphasis", token: "--sgds-primary-surface-emphasis", hex: "#523ABC" },
          { label: "Muted", token: "--sgds-primary-surface-muted", hex: "#F4F2FE" },
        ],
      },
      {
        title: "Text and icon colours",
        items: [
          { label: "Default", token: "--sgds-primary-color-default", hex: "#6B4FEB" },
          { label: "Emphasis", token: "--sgds-primary-color-emphasis", hex: "#523ABC" },
          { label: "Fixed light", token: "--sgds-primary-color-fixed-light", hex: "#A999F3" },
          { label: "Fixed dark", token: "--sgds-primary-color-fixed-dark", hex: "#6B4FEB" },
        ],
      },
      {
        title: "Border colours",
        items: [
          { label: "Default", token: "--sgds-primary-border-color-default", hex: "#6B4FEB" },
          { label: "Emphasis", token: "--sgds-primary-border-color-emphasis", hex: "#523ABC" },
          { label: "Muted", token: "--sgds-primary-border-color-muted", hex: "#E1DBFB" },
        ],
      },
    ],
  },
  {
    title: "Semantic colours - success",
    description: "Success tokens communicate positive, complete or valid states.",
    groups: [
      {
        title: "Background colours",
        items: [
          { label: "Default", token: "--sgds-success-bg-default", hex: "#0B5E2F" },
          { label: "Muted", token: "--sgds-success-bg-muted", hex: "#E3F9ED" },
        ],
      },
      {
        title: "Surface colours",
        items: [
          { label: "Default", token: "--sgds-success-surface-default", hex: "#0E7C3D" },
          { label: "Emphasis", token: "--sgds-success-surface-emphasis", hex: "#0B5E2F" },
          { label: "Muted", token: "--sgds-success-surface-muted", hex: "#E3F9ED" },
        ],
      },
      {
        title: "Text and icon colours",
        items: [
          { label: "Default", token: "--sgds-success-color-default", hex: "#0E7C3D" },
          { label: "Emphasis", token: "--sgds-success-color-emphasis", hex: "#0B5E2F" },
          { label: "Fixed light", token: "--sgds-success-color-fixed-light", hex: "#16BD5E" },
          { label: "Fixed dark", token: "--sgds-success-color-fixed-dark", hex: "#0E7C3D" },
        ],
      },
      {
        title: "Border colours",
        items: [
          { label: "Default", token: "--sgds-success-border-color-default", hex: "#0E7C3D" },
          { label: "Emphasis", token: "--sgds-success-border-color-emphasis", hex: "#0B5E2F" },
          { label: "Muted", token: "--sgds-success-border-color-muted", hex: "#B1EDCB" },
        ],
      },
    ],
  },
  {
    title: "Semantic colours - danger",
    description: "Danger tokens communicate destructive, invalid or negative states.",
    groups: [
      {
        title: "Background colours",
        items: [
          { label: "Default", token: "--sgds-danger-bg-default", hex: "#A11B1B" },
          { label: "Muted", token: "--sgds-danger-bg-muted", hex: "#FCF1F1" },
        ],
      },
      {
        title: "Surface colours",
        items: [
          { label: "Default", token: "--sgds-danger-surface-default", hex: "#CF2323" },
          { label: "Emphasis", token: "--sgds-danger-surface-emphasis", hex: "#A11B1B" },
          { label: "Muted", token: "--sgds-danger-surface-muted", hex: "#FCF1F1" },
        ],
      },
      {
        title: "Text and icon colours",
        items: [
          { label: "Default", token: "--sgds-danger-color-default", hex: "#CF2323" },
          { label: "Emphasis", token: "--sgds-danger-color-emphasis", hex: "#A11B1B" },
          { label: "Fixed light", token: "--sgds-danger-color-fixed-light", hex: "#E98B8B" },
          { label: "Fixed dark", token: "--sgds-danger-color-fixed-dark", hex: "#CF2323" },
        ],
      },
      {
        title: "Border colours",
        items: [
          { label: "Default", token: "--sgds-danger-border-color-default", hex: "#CF2323" },
          { label: "Emphasis", token: "--sgds-danger-border-color-emphasis", hex: "#A11B1B" },
          { label: "Muted", token: "--sgds-danger-border-color-muted", hex: "#F8D7D7" },
        ],
      },
    ],
  },
  {
    title: "Semantic colours - warning",
    description: "Warning tokens communicate cautionary states that need attention.",
    groups: [
      {
        title: "Background colours",
        items: [
          { label: "Default", token: "--sgds-warning-bg-default", hex: "#FCDE63" },
          { label: "Muted", token: "--sgds-warning-bg-muted", hex: "#FEF4CB" },
        ],
      },
      {
        title: "Surface colours",
        items: [
          { label: "Default", token: "--sgds-warning-surface-default", hex: "#FCDE63" },
          { label: "Emphasis", token: "--sgds-warning-surface-emphasis", hex: "#7E6917" },
          { label: "Muted", token: "--sgds-warning-surface-muted", hex: "#FEF4CB" },
        ],
      },
      {
        title: "Text and icon colours",
        items: [
          { label: "Default", token: "--sgds-warning-color-default", hex: "#7E6917" },
          { label: "Emphasis", token: "--sgds-warning-color-emphasis", hex: "#605111" },
          { label: "Fixed light", token: "--sgds-warning-color-fixed-light", hex: "#E5BF29" },
          { label: "Fixed dark", token: "--sgds-warning-color-fixed-dark", hex: "#7E6917" },
        ],
      },
      {
        title: "Border colours",
        items: [
          { label: "Default", token: "--sgds-warning-border-color-default", hex: "#7E6917" },
          { label: "Emphasis", token: "--sgds-warning-border-color-emphasis", hex: "#605111" },
          { label: "Muted", token: "--sgds-warning-border-color-muted", hex: "#FCDE63" },
        ],
      },
    ],
  },
];
