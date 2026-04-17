import { ref } from "vue";

export const PALETTE_STORAGE_KEY = "sgds-docs-palette";

export type PaletteId = "default" | "purple" | "blue" | "cyan" | "magenta" | "pink" | "red";

type PaletteShades = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type BrandPalette = {
  id: PaletteId;
  label: string;
  shortLabel: string;
  swatch: string;
  shades: PaletteShades;
};

export const sgdsPrimaryPalette = {
  id: "default" as const,
  label: "SGDS primary",
  shortLabel: "SGDS",
  swatch: "#6B4FEB",
  shades: {
    100: "#F4F2FE",
    200: "#E1DBFB",
    300: "#C8BDF7",
    400: "#A999F3",
    500: "#8A72EF",
    600: "#6B4FEB",
    700: "#523ABC",
    800: "#3C2B8A",
    900: "#2A1E61",
  },
};

export const brandPalettes: BrandPalette[] = [
  {
    id: "blue",
    label: "Blue",
    shortLabel: "Blue",
    swatch: "#356DAC",
    shades: {
      100: "#EFF5FC",
      200: "#CEE1F6",
      300: "#A0C5EE",
      400: "#73A9E5",
      500: "#4288D6",
      600: "#356DAC",
      700: "#285483",
      800: "#1E3E62",
      900: "#152B44",
    },
  },
  {
    id: "cyan",
    label: "GovTech Cyan",
    shortLabel: "Cyan",
    swatch: "#007493",
    shades: {
      100: "#E0F7FE",
      200: "#A7E9FB",
      300: "#47D1F6",
      400: "#00B3E2",
      500: "#0091B8",
      600: "#007493",
      700: "#005971",
      800: "#004355",
      900: "#002E3B",
    },
  },
  {
    id: "magenta",
    label: "GovTech Magenta",
    shortLabel: "Magenta",
    swatch: "#B82EA0",
    shades: {
      100: "#FBF2F9",
      200: "#F2D8ED",
      300: "#E5B2DC",
      400: "#D98BCB",
      500: "#C95EB7",
      600: "#B82EA0",
      700: "#8E247B",
      800: "#6A1B5D",
      900: "#4A1341",
    },
  },
  {
    id: "pink",
    label: "Pink",
    shortLabel: "Pink",
    swatch: "#C7286A",
    shades: {
      100: "#FDF0F6",
      200: "#F9D6E4",
      300: "#F3AECB",
      400: "#ED84AF",
      500: "#E54D8C",
      600: "#C7286A",
      700: "#991F52",
      800: "#74173D",
      900: "#51102B",
    },
  },
  {
    id: "purple",
    label: "Purple",
    shortLabel: "Purple",
    swatch: "#8055BB",
    shades: {
      100: "#F6F3FB",
      200: "#E5DBF2",
      300: "#CEBAE7",
      400: "#B598DC",
      500: "#9A74CF",
      600: "#8055BB",
      700: "#634190",
      800: "#49306B",
      900: "#33214A",
    },
  },
  {
    id: "red",
    label: "Singapore Red",
    shortLabel: "Red",
    swatch: "#CB2B33",
    shades: {
      100: "#FEF0F1",
      200: "#FDD6D8",
      300: "#FBADB1",
      400: "#F88289",
      500: "#F5424B",
      600: "#CB2B33",
      700: "#9E2127",
      800: "#76191E",
      900: "#531115",
    },
  },
];

export const currentPaletteId = ref<PaletteId>("default");

export function getStoredPalette(): PaletteId {
  if (typeof window === "undefined") return "default";
  const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY);
  if (stored === "default") return "default";
  return (brandPalettes.find((p) => p.id === stored)?.id ?? "default") as PaletteId;
}

export function applyPalette(id: PaletteId, persist = true) {
  if (typeof document === "undefined") return;

  currentPaletteId.value = id;

  let styleEl = document.getElementById("sgds-palette-override") as HTMLStyleElement | null;
  if (id === "default") {
    if (styleEl) {
      styleEl.remove();
    }

    if (persist && typeof window !== "undefined") {
      window.localStorage.setItem(PALETTE_STORAGE_KEY, id);
    }
    return;
  }

  const palette = brandPalettes.find((p) => p.id === id);
  if (!palette) return;

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "sgds-palette-override";
    document.head.appendChild(styleEl);
  }

  const vars = (Object.entries(palette.shades) as [string, string][])
    .map(([shade, value]) => `  --sgds-product-primary-${shade}: ${value};`)
    .join("\n");

  styleEl.textContent = `:root {\n${vars}\n}`;

  if (persist && typeof window !== "undefined") {
    window.localStorage.setItem(PALETTE_STORAGE_KEY, id);
  }
}
