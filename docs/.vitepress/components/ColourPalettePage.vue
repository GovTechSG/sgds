<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { BackgroundColor, Color, Theme } from "@adobe/leonardo-contrast-colors";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import ThemeRevealDiagram from "./foundations/ThemeRevealDiagram.vue";
import SectionHeader from "./foundations/SectionHeader.vue";
import {
  brandPalettes,
  currentPaletteId,
  sgdsPrimaryPalette,
  type PaletteId,
} from "../theme/composables/sgds-palette";
import { semanticColourGroups, typographySemanticGroup, formColourGroups } from "../data/semantic-colours";

// Tokens always render in their CSS variable form (with the -- prefix).
const getTokenValue = (token: string) => token;

const props = withDefaults(
  defineProps<{
    section?:
      | "all"
      | "product"
      | "brand-govtech"
      | "brand-custom"
      | "primitive"
      | "semantic"
      | "semantic-bg"
      | "semantic-foreground"
      | "semantic-surface"
      | "semantic-border"
      | "semantic-text"
      | "semantic-form";
  }>(),
  {
    section: "all",
  },
);

type ProductPrimaryMode = "govtech-brand" | "custom";
type ProductPrimaryRow = {
  shade: string;
  hex: string;
  rgba: string;
  token: string;
  wcag: string;
  apca: string;
};

const contrastDarkBackground = "#0E0E0E";
const contrastLightBackground = "#FFFFFF";

function hexToRgba(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

// ─── Product primary palette ─────────────────────────────────────────────────

const productPrimaryMode = ref<ProductPrimaryMode>("govtech-brand");
const selectedGovtechPaletteId = ref<Exclude<PaletteId, "default">>(brandPalettes[0]?.id ?? "blue");
const customHexInput = ref("#6B4FEB");
const isCustomPickerOpen = ref(false);
const customPickerRef = ref<HTMLElement | null>(null);
const pickerCanvasRef = ref<HTMLElement | null>(null);
const pickerDragging = ref(false);
const shadeKeys = ["100", "200", "300", "400", "500", "600", "700", "800", "900"] as const;

// Contrast ratios against white for shades 100–900.
const SHADE_RATIOS = [1.1, 1.33, 1.78, 2.46, 3.64, 5.33, 7.81, 10.86, 14.35] as const;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normaliseColourInput(value: string): string | null {
  const trimmed = value.trim();
  const hexValue = trimmed.replace(/^#/, "");

  if (/^[0-9a-fA-F]{3}$/.test(hexValue)) {
    const expanded = hexValue.split("").map((char) => char + char).join("");
    return `#${expanded.toUpperCase()}`;
  }

  if (/^[0-9a-fA-F]{6}$/.test(hexValue)) {
    return `#${hexValue.toUpperCase()}`;
  }

  const rgbMatch = trimmed.match(
    /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
  ) ?? trimmed.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);

  if (!rgbMatch) {
    return null;
  }

  const [r, g, b] = rgbMatch.slice(1).map((channel) => Number(channel));
  const isValidRgb = [r, g, b].every((channel) => Number.isInteger(channel) && channel >= 0 && channel <= 255);

  if (!isValidRgb) {
    return null;
  }

  return rgbToHex(r, g, b);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channels = [r, g, b].map((channel) => {
    const normalised = channel / 255;
    return normalised <= 0.03928
      ? normalised / 12.92
      : ((normalised + 0.055) / 1.055) ** 2.4;
  });

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function wcagContrastRatio(foregroundHex: string, backgroundHex: string): string {
  const foreground = relativeLuminance(foregroundHex);
  const background = relativeLuminance(backgroundHex);
  const lighter = Math.max(foreground, background);
  const darker = Math.min(foreground, background);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

// APCA-W3 (0.0.98G 4g) — https://github.com/Myndex/apca-w3
function apcaLuminance(r: number, g: number, b: number): number {
  // sRGB linearisation uses a plain ^2.4 (no piecewise)
  let Y =
    0.2126729 * (r / 255) ** 2.4 +
    0.7151522 * (g / 255) ** 2.4 +
    0.0721750 * (b / 255) ** 2.4;
  // Soft clamp for near-black
  return Y < 0.022 ? Y + (0.022 - Y) ** 1.414 : Y;
}

function apcaContrast(textHex: string, bgHex: string): string {
  const t = hexToRgb(textHex);
  const b = hexToRgb(bgHex);
  const Ytxt = apcaLuminance(t.r, t.g, t.b);
  const Ybg  = apcaLuminance(b.r, b.g, b.b);

  if (Math.abs(Ybg - Ytxt) < 0.0005) return "Lc 0";

  let SAPC: number;
  let Lc: number;

  if (Ybg > Ytxt) {
    // Normal polarity — dark text on lighter background
    SAPC = (Ybg ** 0.56 - Ytxt ** 0.57) * 1.14;
    if (SAPC < 0.001) Lc = 0;
    else if (SAPC < 0.035991) Lc = (SAPC - SAPC * 27.7847239587675 * 0.027) * 100;
    else Lc = (SAPC - 0.027) * 100;
  } else {
    // Reverse polarity — light text on darker background
    SAPC = (Ybg ** 0.65 - Ytxt ** 0.62) * 1.14;
    if (SAPC > -0.001) Lc = 0;
    else if (SAPC > -0.035991) Lc = (SAPC - SAPC * 27.7847239587675 * 0.027) * 100;
    else Lc = (SAPC + 0.027) * 100;
  }

  return `Lc ${Math.round(Math.abs(Lc) * 10) / 10}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: lightness * 100 };
  }

  const delta = max - min;
  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let hue = 0;
  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      hue = (red - green) / delta + 4;
      break;
  }

  return {
    h: hue * 60,
    s: saturation * 100,
    l: lightness * 100,
  };
}

function hueToRgb(p: number, q: number, t: number): number {
  let adjusted = t;
  if (adjusted < 0) adjusted += 1;
  if (adjusted > 1) adjusted -= 1;
  if (adjusted < 1 / 6) return p + (q - p) * 6 * adjusted;
  if (adjusted < 1 / 2) return q;
  if (adjusted < 2 / 3) return p + (q - p) * (2 / 3 - adjusted) * 6;
  return p;
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hue = ((h % 360) + 360) % 360 / 360;
  const saturation = clamp(s, 0, 100) / 100;
  const lightness = clamp(l, 0, 100) / 100;

  if (saturation === 0) {
    const value = lightness * 255;
    return { r: value, g: value, b: value };
  }

  const q = lightness < 0.5
    ? lightness * (1 + saturation)
    : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;

  return {
    r: hueToRgb(p, q, hue + 1 / 3) * 255,
    g: hueToRgb(p, q, hue) * 255,
    b: hueToRgb(p, q, hue - 1 / 3) * 255,
  };
}

function createProductPrimaryRows(shades: Record<string, string>): ProductPrimaryRow[] {
  return (Object.entries(shades) as [string, string][]).map(([shade, hex]) => {
    const bg = parseInt(shade, 10) <= 500 ? contrastDarkBackground : contrastLightBackground;
    return {
      shade,
      hex: hex.toUpperCase(),
      rgba: hexToRgba(hex),
      token: `--sgds-product-primary-${shade}`,
      wcag: wcagContrastRatio(hex, bg),
      apca: apcaContrast(hex, bg),
    };
  });
}

function generateCustomPalette(hex: string): Record<string, string> {
  const seed = hex.toUpperCase();
  const ratios = Object.fromEntries(
    shadeKeys.map((shade, index) => [shade, SHADE_RATIOS[index]]),
  );
  const backgroundColor = new BackgroundColor({
    name: "background",
    colorKeys: [contrastLightBackground],
    ratios
  });
  const customBrandColor = new Color({
    name: "primary",
    colorKeys: [seed],
    ratios
  });
  const theme = new Theme({
    colors: [customBrandColor],
    backgroundColor,
    lightness: 100
  });
  const primary = theme.contrastColors.find((colour) => "name" in colour && colour.name === "primary");

  if (!primary || !("values" in primary)) {
    return Object.fromEntries(shadeKeys.map((shade) => [shade, seed]));
  }

  return Object.fromEntries(
    primary.values.map((value) => [value.name, value.value.toUpperCase()]),
  );
}

const currentColours = computed<ProductPrimaryRow[]>(() => {
  const palette = brandPalettes.find((p) => p.id === selectedGovtechPaletteId.value) ?? sgdsPrimaryPalette;

  return createProductPrimaryRows(palette.shades);
});

const allGovtechPaletteRows = computed<{ id: string; shortLabel: string; rows: ProductPrimaryRow[] }[]>(() =>
  brandPalettes.map((palette) => ({
    id: palette.id,
    shortLabel: palette.shortLabel,
    rows: createProductPrimaryRows(palette.shades),
  }))
);

function onTabShow(e: Event) {
  selectedGovtechPaletteId.value = (e as CustomEvent).detail.name as Exclude<PaletteId, "default">;
}

function onColourSelectChange(e: Event) {
  selectedGovtechPaletteId.value = (e.target as HTMLElement & { value: string }).value as Exclude<PaletteId, "default">;
}

const normalisedCustomHex = computed(() => normaliseColourInput(customHexInput.value));
const isCustomHexValid = computed(() => normalisedCustomHex.value !== null);

const customPaletteRows = computed<ProductPrimaryRow[]>(() => {
  const fallback = "#6B4FEB";
  const palette = generateCustomPalette(normalisedCustomHex.value ?? fallback);
  return createProductPrimaryRows(palette);
});

const activeProductRows = computed<ProductPrimaryRow[]>(() => {
  // When the page is rendered standalone inside the Brand colour page's
  // Custom tab, there is no segmented control to flip productPrimaryMode,
  // so resolve directly to the generated custom palette.
  if (showBrandCustomOnly.value) return customPaletteRows.value;
  return productPrimaryMode.value === "govtech-brand"
    ? currentColours.value
    : customPaletteRows.value;
});

function onProductPrimaryModeChange(event: Event) {
  productPrimaryMode.value = (event as CustomEvent<{ value: ProductPrimaryMode }>).detail.value;
}

function setProductPrimaryMode(mode: ProductPrimaryMode) {
  productPrimaryMode.value = mode;
}

const customRgb = computed(() => {
  const safeHex = normalisedCustomHex.value ?? "#6B4FEB";
  return hexToRgb(safeHex);
});

const customHsl = computed(() => {
  const safeHex = normalisedCustomHex.value ?? "#6B4FEB";
  const { r, g, b } = hexToRgb(safeHex);
  return rgbToHsl(r, g, b);
});

function buildHexFromHsv(hue: number, saturation: number, value: number): string {
  const rgb = hslToRgb(hue, 100, 50);
  const pure = {
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255,
  };

  const sat = clamp(saturation, 0, 100) / 100;
  const val = clamp(value, 0, 100) / 100;

  const mixed = {
    r: 1 + (pure.r - 1) * sat,
    g: 1 + (pure.g - 1) * sat,
    b: 1 + (pure.b - 1) * sat,
  };

  return rgbToHex(mixed.r * 255 * val, mixed.g * 255 * val, mixed.b * 255 * val);
}

const pickerPoint = computed(() => {
  const safeHue = customHsl.value.h;
  const { r, g, b } = customRgb.value;
  const max = Math.max(r, g, b) / 255;
  if (max === 0) {
    return { x: 0, y: 100, hue: safeHue };
  }

  const normalised = {
    r: r / 255 / max,
    g: g / 255 / max,
    b: b / 255 / max,
  };
  const maxNorm = Math.max(normalised.r, normalised.g, normalised.b);
  const minNorm = Math.min(normalised.r, normalised.g, normalised.b);
  const saturation = maxNorm === 0 ? 0 : ((maxNorm - minNorm) / maxNorm) * 100;

  return {
    x: clamp(saturation, 0, 100),
    y: clamp(100 - max * 100, 0, 100),
    hue: safeHue,
  };
});

function onCustomHexFieldInput(event: Event) {
  customHexInput.value = String((event.target as HTMLInputElement | null)?.value ?? "");
}

function onCustomColourPickerInput(event: Event) {
  customHexInput.value = String((event.target as HTMLInputElement | null)?.value ?? "");
}

function updateCustomHue(event: Event) {
  const nextHue = Number((event.target as HTMLInputElement | null)?.value ?? customHsl.value.h);
  customHexInput.value = buildHexFromHsv(nextHue, pickerPoint.value.x, 100 - pickerPoint.value.y);
}

function openCustomPicker() {
  isCustomPickerOpen.value = true;
}

function closeCustomPicker() {
  isCustomPickerOpen.value = false;
}

function closeCustomPickerOnOutside(event: MouseEvent) {
  if (!customPickerRef.value) return;
  if (!customPickerRef.value.contains(event.target as Node)) {
    isCustomPickerOpen.value = false;
  }
}

watch(
  currentPaletteId,
  (value) => {
    if (value !== "default") {
      selectedGovtechPaletteId.value = value;
    }
  },
  { immediate: true },
);

function updateCustomFromCanvas(event: MouseEvent) {
  if (!pickerCanvasRef.value) return;
  const rect = pickerCanvasRef.value.getBoundingClientRect();
  const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
  const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
  customHexInput.value = buildHexFromHsv(customHsl.value.h, x, 100 - y);
}

function startCanvasDrag(event: MouseEvent) {
  pickerDragging.value = true;
  updateCustomFromCanvas(event);
}

function handleCanvasDrag(event: MouseEvent) {
  if (!pickerDragging.value) return;
  updateCustomFromCanvas(event);
}

function stopCanvasDrag() {
  pickerDragging.value = false;
}

onMounted(() => {
  document.addEventListener("click", closeCustomPickerOnOutside);
  document.addEventListener("mousemove", handleCanvasDrag);
  document.addEventListener("mouseup", stopCanvasDrag);
});

onUnmounted(() => {
  document.removeEventListener("click", closeCustomPickerOnOutside);
  document.removeEventListener("mousemove", handleCanvasDrag);
  document.removeEventListener("mouseup", stopCanvasDrag);
});

// ─── Primitive colours ────────────────────────────────────────────────────────

type PrimitiveFamily = {
  id: string;
  label: string;
  shades: { shade: string; hex: string }[];
};

const primitiveColourFamilies: PrimitiveFamily[] = [
  {
    id: "grey",
    label: "Grey",
    shades: [
      { shade: "000",  hex: "#ffffff" },
      { shade: "50",   hex: "#f7f7f7" },
      { shade: "100",  hex: "#f3f3f3" },
      { shade: "200",  hex: "#dfdfdf" },
      { shade: "300",  hex: "#c6c6c6" },
      { shade: "400",  hex: "#a5a5a5" },
      { shade: "500",  hex: "#868686" },
      { shade: "600",  hex: "#6b6b6b" },
      { shade: "700",  hex: "#525252" },
      { shade: "800",  hex: "#3b3b3b" },
      { shade: "900",  hex: "#2a2a2a" },
      { shade: "1000", hex: "#1a1a1a" },
      { shade: "1100", hex: "#0e0e0e" },
    ],
  },
  {
    id: "red",
    label: "Red",
    shades: [
      { shade: "100", hex: "#fcf1f1" },
      { shade: "200", hex: "#f8d7d7" },
      { shade: "300", hex: "#f1b2b2" },
      { shade: "400", hex: "#e98b8b" },
      { shade: "500", hex: "#e05959" },
      { shade: "600", hex: "#cf2323" },
      { shade: "700", hex: "#a11b1b" },
      { shade: "800", hex: "#791414" },
      { shade: "900", hex: "#550e0e" },
    ],
  },
  {
    id: "yellow",
    label: "Yellow",
    shades: [
      { shade: "100", hex: "#fef4cb" },
      { shade: "200", hex: "#fcde63" },
      { shade: "300", hex: "#e5bf29" },
      { shade: "400", hex: "#c2a223" },
      { shade: "500", hex: "#9d841c" },
      { shade: "600", hex: "#7e6917" },
      { shade: "700", hex: "#605111" },
      { shade: "800", hex: "#483c0d" },
      { shade: "900", hex: "#322909" },
    ],
  },
  {
    id: "green",
    label: "Green",
    shades: [
      { shade: "100", hex: "#e3f9ed" },
      { shade: "200", hex: "#b1edcb" },
      { shade: "300", hex: "#62db96" },
      { shade: "400", hex: "#16bd5e" },
      { shade: "500", hex: "#129a4d" },
      { shade: "600", hex: "#0e7c3d" },
      { shade: "700", hex: "#0b5e2f" },
      { shade: "800", hex: "#084523" },
      { shade: "900", hex: "#063119" },
    ],
  },
  {
    id: "cyan",
    label: "Cyan",
    shades: [
      { shade: "100", hex: "#e0f7fc" },
      { shade: "200", hex: "#a8e9f7" },
      { shade: "300", hex: "#49d2ef" },
      { shade: "400", hex: "#00b4da" },
      { shade: "500", hex: "#0092b1" },
      { shade: "600", hex: "#00758d" },
      { shade: "700", hex: "#005a6d" },
      { shade: "800", hex: "#004352" },
      { shade: "900", hex: "#002f38" },
    ],
  },
  {
    id: "blue",
    label: "Blue",
    shades: [
      { shade: "100", hex: "#ecf5fe" },
      { shade: "200", hex: "#c8e2fb" },
      { shade: "300", hex: "#96c7f7" },
      { shade: "400", hex: "#60aaf4" },
      { shade: "500", hex: "#1e87ef" },
      { shade: "600", hex: "#0269d0" },
      { shade: "700", hex: "#0151a0" },
      { shade: "800", hex: "#013c77" },
      { shade: "900", hex: "#012a54" },
    ],
  },
  {
    id: "purple",
    label: "Purple",
    shades: [
      { shade: "100", hex: "#fbf0fe" },
      { shade: "200", hex: "#f2d6fc" },
      { shade: "300", hex: "#e6adf9" },
      { shade: "400", hex: "#d983f6" },
      { shade: "500", hex: "#c94cf2" },
      { shade: "600", hex: "#ac1cdb" },
      { shade: "700", hex: "#8516a9" },
      { shade: "800", hex: "#641180" },
      { shade: "900", hex: "#460c5a" },
    ],
  },
];

const activePrimitiveFamilyId = ref("grey");

// ─── Primitive role-mapped cards (split light/dark layout) ────────────────────
// Each card shows a family ramp with border-role captions for both themes.
// Captions describe how the primitive shade is consumed by the family's
// border-* semantic tokens. Sourced from day.css and night.css.

type PrimitiveScaleSwatch = {
  shade: string;
  hex: string;
  tone: "light" | "dark";
  bordered?: boolean;
  topCaption?: string;
  bottomCaption?: string;
};

type PrimitiveScaleCard = {
  id: string;
  family: string;
  role: string;
  swatches: PrimitiveScaleSwatch[];
};

// Helper: build chromatic card swatches given the border-default shade.
const chromaticBorderSwatches = (
  family: PrimitiveFamily,
  defaultShade: string,
): PrimitiveScaleSwatch[] =>
  family.shades.map(({ shade, hex }) => {
    const tone: "light" | "dark" = parseInt(shade, 10) >= 500 ? "dark" : "light";
    let topCaption: string | undefined;
    let bottomCaption: string | undefined;
    if (shade === "200") { topCaption = "Muted"; bottomCaption = "Emphasis"; }
    if (shade === defaultShade) { topCaption = "Default"; bottomCaption = "Default"; }
    if (shade === "700") { topCaption = "Emphasis"; bottomCaption = "Muted"; }
    return { shade, hex, tone, topCaption, bottomCaption };
  });

const greyFamily = primitiveColourFamilies.find((f) => f.id === "grey")!;
const redFamily = primitiveColourFamilies.find((f) => f.id === "red")!;
const yellowFamily = primitiveColourFamilies.find((f) => f.id === "yellow")!;
const greenFamily = primitiveColourFamilies.find((f) => f.id === "green")!;
const cyanFamily = primitiveColourFamilies.find((f) => f.id === "cyan")!;
const blueFamily = primitiveColourFamilies.find((f) => f.id === "blue")!;
const purpleFamily = primitiveColourFamilies.find((f) => f.id === "purple")!;

const primitiveScaleCards: PrimitiveScaleCard[] = [
  {
    id: "grey",
    family: "Grey",
    role: "Neutral borders across both themes",
    swatches: greyFamily.shades.map(({ shade, hex }) => {
      const idx = parseInt(shade, 10);
      const tone: "light" | "dark" = idx >= 500 ? "dark" : "light";
      let topCaption: string | undefined;
      let bottomCaption: string | undefined;
      if (shade === "000") { topCaption = "Fixed light"; bottomCaption = "Fixed light"; }
      if (shade === "200") { topCaption = "Muted"; bottomCaption = "Emphasis"; }
      if (shade === "500") { topCaption = "Default"; bottomCaption = "Default"; }
      if (shade === "800") { topCaption = "Emphasis"; bottomCaption = "Muted"; }
      if (shade === "1000") { topCaption = "Fixed dark"; bottomCaption = "Fixed dark"; }
      return { shade, hex, tone, bordered: shade === "000", topCaption, bottomCaption };
    }),
  },
  { id: "red",    family: "Red",    role: "Danger borders",  swatches: chromaticBorderSwatches(redFamily,    "600") },
  { id: "yellow", family: "Yellow", role: "Warning borders", swatches: chromaticBorderSwatches(yellowFamily, "600") },
  { id: "green",  family: "Green",  role: "Success borders", swatches: chromaticBorderSwatches(greenFamily,  "600") },
  { id: "cyan",   family: "Cyan",   role: "Cyan borders",    swatches: chromaticBorderSwatches(cyanFamily,   "500") },
  { id: "blue",   family: "Blue",   role: "Accent borders",  swatches: chromaticBorderSwatches(blueFamily,   "500") },
  { id: "purple", family: "Purple", role: "Purple borders",  swatches: chromaticBorderSwatches(purpleFamily, "500") },
];

function createPrimitiveRows(family: PrimitiveFamily) {
  return family.shades.map(({ shade, hex }) => {
    const bg = isDarkShade(shade) ? contrastLightBackground : contrastDarkBackground;
    return {
      shade,
      hex: hex.toUpperCase(),
      rgba: hexToRgba(hex),
      token: `--sgds-${family.id === "grey" ? "gray" : family.id}-${shade}`,
      wcag: wcagContrastRatio(hex, bg),
      apca: apcaContrast(hex, bg),
    };
  });
}

const currentPrimitiveRows = computed(() => {
  const family = primitiveColourFamilies.find((f) => f.id === activePrimitiveFamilyId.value)!;
  return createPrimitiveRows(family);
});

const allPrimitiveFamilyRows = computed(() =>
  primitiveColourFamilies.map((family) => ({
    id: family.id,
    label: family.label,
    rows: createPrimitiveRows(family),
  }))
);

function onPrimitiveTabShow(e: Event) {
  activePrimitiveFamilyId.value = (e as CustomEvent).detail.name as string;
}

// Light shades use a dark bg for legibility; dark shades use a light bg
function isDarkShade(shade: string): boolean {
  const n = parseInt(shade);
  // Grey has non-standard shades (000, 50, 1000, 1100)
  if (isNaN(n)) return false;
  return n >= 600;
}

// ─── Semantic colours ─────────────────────────────────────────────────────────

// Returns only the rows matching a given token type for a semantic group.
// For the "default" group the prefix is `--sgds-<type>-`; for others it is `--sgds-<id>-<type>-`.
function filterGroupRows(group: (typeof semanticColourGroups)[number], tokenType: string) {
  const prefix = group.id === "default"
    ? `--sgds-${tokenType}-`
    : `--sgds-${group.id}-${tokenType}-`;
  return group.rows.filter((r) => r.token.startsWith(prefix));
}


const activeTextColourTabId = ref("text-display");

const currentTextColourRows = computed(() => {
  if (activeTextColourTabId.value === "text-form") {
    return formColourGroups.find((g) => g.id === "form-color")!.rows;
  }
  const prefix = activeTextColourTabId.value.replace("text-", "--sgds-") + "-";
  return typographySemanticGroup.rows.filter((r) => r.token.startsWith(prefix));
});

function onTextTabShow(e: Event) {
  activeTextColourTabId.value = (e as CustomEvent).detail.name as string;
}

const textColourSubgroups = [
  { id: "text-display", label: "Display" },
  { id: "text-heading", label: "Heading" },
  { id: "text-body", label: "Body" },
  { id: "text-label", label: "Label" },
  { id: "text-link", label: "Link" },
  { id: "text-form", label: "Form" },
] as const;

const allTextColourSubgroups = computed(() =>
  textColourSubgroups.map((sub) => {
    const rows =
      sub.id === "text-form"
        ? formColourGroups.find((g) => g.id === "form-color")!.rows
        : typographySemanticGroup.rows.filter((r) =>
            r.token.startsWith(sub.id.replace("text-", "--sgds-") + "-"),
          );
    return { id: sub.id, label: sub.label, rows };
  })
);

const activeFormColourGroupId = ref(formColourGroups[0].id);

const currentFormColourRows = computed(() => {
  return formColourGroups.find((g) => g.id === activeFormColourGroupId.value)!.rows;
});

function onFormTabShow(e: Event) {
  activeFormColourGroupId.value = (e as CustomEvent).detail.name as string;
}

const allFormColourGroups = computed(() =>
  formColourGroups.map((group) => ({ id: group.id, label: group.label, rows: group.rows }))
);

// Add a border to near-invisible swatches: explicit border flag OR any rgba value below 40% opacity.
// bg-overlay at 50% is dark enough to see; everything below that threshold is not.
function semanticSwatchHasBorder(hex: string, _label: string, explicitBorder?: boolean): boolean {
  if (explicitBorder) return true;
  if (hex.startsWith("rgba")) {
    const m = hex.match(/rgba\(\d+,\d+,\d+,([\d.]+)\)/);
    if (m && parseFloat(m[1]) < 0.4) return true;
  }
  return false;
}

// For product-primary tokens, resolve to CSS variables so swatches follow the active palette.
// Translucent variants use color-mix() to apply opacity against the live variable.
function semanticSwatchStyle(hex: string, label: string): Record<string, string> {
  if (hex === "transparent") return {};
  const m = label.match(/^product-primary-(\d+)/);
  if (m) {
    const shade = m[1];
    if (hex.startsWith("rgba")) {
      const alphaMatch = hex.match(/rgba\(\d+,\d+,\d+,([\d.]+)\)/);
      if (alphaMatch) {
        const pct = Math.round(parseFloat(alphaMatch[1]) * 100);
        return { background: `color-mix(in srgb, var(--sgds-product-primary-${shade}) ${pct}%, transparent)` };
      }
    }
    return { background: `var(--sgds-product-primary-${shade})` };
  }
  return { background: hex };
}

const showAllSections = computed(() => props.section === "all");
// Standalone variants used inside the Brand colour page tabs. They render
// just the GovTech brand tables or just the custom picker + table, without
// the section heading or segmented control wrapper.
const showBrandGovtechOnly = computed(() => props.section === "brand-govtech");
const showBrandCustomOnly = computed(() => props.section === "brand-custom");
const showProductSection = computed(
  () =>
    props.section === "all" ||
    props.section === "product" ||
    showBrandGovtechOnly.value ||
    showBrandCustomOnly.value,
);
// Show the section heading and segmented-control chrome only when the page
// is rendered standalone, not when embedded inside a Brand colour tab.
const showProductChrome = computed(
  () => props.section === "all" || props.section === "product",
);
const showGovtechTables = computed(
  () =>
    showBrandGovtechOnly.value ||
    (showProductChrome.value && productPrimaryMode.value === "govtech-brand"),
);
const showCustomGenerator = computed(
  () =>
    showBrandCustomOnly.value ||
    (showProductChrome.value && productPrimaryMode.value === "custom"),
);
const showPrimitiveSection = computed(() => props.section === "all" || props.section === "primitive");
const showSemanticSection = computed(
  () =>
    props.section === "all" ||
    props.section === "semantic" ||
    props.section.startsWith("semantic-"),
);
const showSemanticBg = computed(
  () =>
    props.section === "all" ||
    props.section === "semantic" ||
    props.section === "semantic-bg",
);
const showSemanticForeground = computed(
  () =>
    props.section === "all" ||
    props.section === "semantic" ||
    props.section === "semantic-foreground",
);
const showSemanticSurface = computed(
  () =>
    props.section === "all" ||
    props.section === "semantic" ||
    props.section === "semantic-surface",
);
const showSemanticBorder = computed(
  () =>
    props.section === "all" ||
    props.section === "semantic" ||
    props.section === "semantic-border",
);
const showSemanticText = computed(
  () =>
    props.section === "all" ||
    props.section === "semantic" ||
    props.section === "semantic-text",
);
const showSemanticForm = computed(
  () =>
    props.section === "all" ||
    props.section === "semantic" ||
    props.section === "semantic-form",
);

// Contrast info modal — shared across all tables that have a Contrast column.
const contrastInfoOpen = ref(false);
const openContrastInfo = () => {
  contrastInfoOpen.value = true;
};
</script>

<template>
  <TypographyPageTemplate>

    <!-- Product primary colour -->
    <section v-if="showProductSection" class="typography-page-template__section typography-page-template__section--spaced">
      <div v-if="showProductChrome" class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <SectionHeader title="Product colour tokens" />
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Choose a GovTech brand palette or enter a custom hex code for your <strong>600</strong> token. The table below uses the same SGDS primary token structure either way, so teams can compare a pre-approved palette with a generated custom ramp.
        </p>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div v-if="showProductChrome || showCustomGenerator" class="cp-source-panel sgds:flex sgds:flex-col sgds:gap-layout-sm">
            <div
              v-if="showProductChrome"
              class="cp-segmented-control sgds:inline-flex sgds:items-start"
              role="tablist"
              aria-label="Primary palette source"
            >
              <button
                type="button"
                :class="[
                  'cp-segmented-control__pill sgds:flex sgds:items-center sgds:justify-center sgds:px-lg sgds:py-sm sgds:text-label-md sgds:leading-xs sgds:tracking-normal',
                  productPrimaryMode === 'govtech-brand' ? 'cp-segmented-control__pill--active' : '',
                ]"
                :aria-pressed="productPrimaryMode === 'govtech-brand'"
                @click="setProductPrimaryMode('govtech-brand')"
              >
                GovTech brand
              </button>
              <button
                type="button"
                :class="[
                  'cp-segmented-control__pill sgds:flex sgds:items-center sgds:justify-center sgds:gap-xs sgds:px-lg sgds:py-sm sgds:text-label-md sgds:leading-xs sgds:tracking-normal',
                  productPrimaryMode === 'custom' ? 'cp-segmented-control__pill--active' : '',
                ]"
                :aria-pressed="productPrimaryMode === 'custom'"
                @click="setProductPrimaryMode('custom')"
              >
                Custom
                <sgds-badge variant="primary" size="sm">BETA</sgds-badge>
              </button>
            </div>

            <div
              v-if="showCustomGenerator"
              ref="customPickerRef"
              class="cp-source-panel__control cp-source-panel__control--custom sgds:flex sgds:flex-col sgds:gap-text-sm"
            >
              <div class="cp-custom-picker-field" @click.stop="openCustomPicker">
                      <sgds-input
                        type="text"
                        label="Brand colour"
                        name="custom-product-primary"
                        placeholder="#6B4FEB or rgb(107, 79, 235)"
                        :value="customHexInput"
                        @sgds-input="onCustomHexFieldInput"
                        @sgds-focus="openCustomPicker"
                ></sgds-input>
              </div>

              <div v-if="isCustomPickerOpen" class="cp-custom-picker sgds:flex sgds:flex-col sgds:gap-component-sm" @click.stop>
                <div class="cp-custom-picker__body sgds:flex sgds:flex-col sgds:gap-component-sm">
                  <div
                    ref="pickerCanvasRef"
                    class="cp-custom-picker__canvas"
                    :style="{ '--cp-picker-hue': `${customHsl.h}deg` }"
                    @mousedown.prevent="startCanvasDrag"
                  >
                    <span
                      class="cp-custom-picker__canvas-thumb"
                      :style="{ left: `${pickerPoint.x}%`, top: `${pickerPoint.y}%` }"
                      aria-hidden="true"
                    ></span>
                  </div>

                  <input
                    class="cp-custom-picker__hue-slider"
                    type="range"
                    min="0"
                    max="360"
                    :value="String(customHsl.h)"
                    @input="updateCustomHue"
                    aria-label="Adjust hue"
                  />

                  <span
                    class="cp-custom-picker__swatch cp-custom-picker__swatch--large"
                    :style="{ background: normalisedCustomHex ?? '#6B4FEB' }"
                    aria-hidden="true"
                  ></span>
                </div>

              </div>

              <p v-if="!isCustomHexValid" class="cp-custom-hint sgds:text-body-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Enter a valid hex or RGB colour before using the generated custom palette.
              </p>
            </div>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <template v-if="showGovtechTables">
            <div
              v-for="palette in allGovtechPaletteRows"
              :key="palette.id"
              class="sgds:flex sgds:flex-col sgds:gap-text-md"
            >
              <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
                GovTech {{ palette.shortLabel.toLowerCase() }} colour
              </h4>
              <sgds-table tableBorder headerBackground responsive="always" layout="fixed" class="typography-page-template__utility-table">
                <sgds-table-row>
                  <sgds-table-head class="cp-token-column" style="width: 291.29px">Token</sgds-table-head>
                  <sgds-table-head class="cp-hex-column" style="width: 105.24px">Hex</sgds-table-head>
                  <sgds-table-head class="cp-value-column" style="width: 258.2px">RGBA</sgds-table-head>
                  <sgds-table-head class="cp-contrast-column" style="width: 150px">
                  <span class="sgds:inline-flex sgds:items-center sgds:gap-text-2-xs">
                    Contrast
                    <sgds-icon-button
                      name="question-circle"
                      variant="ghost"
                      tone="neutral"
                      size="sm"
                      :ariaLabel.prop="'About colour contrast ratios'"
                      @click="openContrastInfo"
                    ></sgds-icon-button>
                  </span>
                </sgds-table-head>
                  <sgds-table-head class="cp-example-column" style="width: 169px">Preview</sgds-table-head>
                </sgds-table-row>

                <sgds-table-row v-for="row in palette.rows" :key="`${palette.id}-${row.token}`">
                  <sgds-table-cell class="cp-token-column">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-table-cell>
                  <sgds-table-cell class="cp-hex-column">
                    <CodeToken :label="row.hex" :surface="false" />
                  </sgds-table-cell>
                  <sgds-table-cell class="cp-value-column">
                    <CodeToken :label="row.rgba" :surface="false" />
                  </sgds-table-cell>
                  <sgds-table-cell class="cp-contrast-column">
                    <sgds-tooltip :content="`WCAG ${row.wcag}. APCA ${row.apca}.`" placement="top">
                      <button
                        :class="[
                          'cp-contrast-sample',
                          parseInt(row.shade, 10) <= 500
                            ? 'cp-contrast-bg-dark'
                            : 'cp-contrast-bg-light',
                        ]"
                        :style="{ color: row.hex }"
                        :aria-label="`${row.token} contrast: WCAG ${row.wcag}. APCA ${row.apca}.`"
                        type="button"
                      >A</button>
                    </sgds-tooltip>
                  </sgds-table-cell>
                  <sgds-table-cell class="cp-example-column">
                    <div class="cp-example-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                      <span
                        class="cp-swatch"
                        :style="{ background: row.hex }"
                        aria-hidden="true"
                      ></span>
                      <svg class="cp-example-ag" xmlns="http://www.w3.org/2000/svg"><text x="0" y="1em" :fill="row.hex">Ag</text></svg>
                    </div>
                  </sgds-table-cell>
                </sgds-table-row>
              </sgds-table>
            </div>
          </template>

          <sgds-table v-else-if="showCustomGenerator" tableBorder headerBackground responsive="always" layout="fixed" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="cp-token-column" style="width: 291.29px">Token</sgds-table-head>
              <sgds-table-head class="cp-hex-column" style="width: 105.24px">Hex</sgds-table-head>
              <sgds-table-head class="cp-value-column" style="width: 258.2px">RGBA</sgds-table-head>
              <sgds-table-head class="cp-contrast-column" style="width: 150px">
                  <span class="sgds:inline-flex sgds:items-center sgds:gap-text-2-xs">
                    Contrast
                    <sgds-icon-button
                      name="question-circle"
                      variant="ghost"
                      tone="neutral"
                      size="sm"
                      :ariaLabel.prop="'About colour contrast ratios'"
                      @click="openContrastInfo"
                    ></sgds-icon-button>
                  </span>
                </sgds-table-head>
              <sgds-table-head class="cp-example-column" style="width: 169px">Preview</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="row in activeProductRows" :key="`${productPrimaryMode}-${row.token}`">
              <sgds-table-cell class="cp-token-column">
                <CodeToken :label="getTokenValue(row.token)" />
              </sgds-table-cell>
              <sgds-table-cell class="cp-hex-column">
                <CodeToken :label="row.hex" :surface="false" />
              </sgds-table-cell>
              <sgds-table-cell class="cp-value-column">
                <CodeToken :label="row.rgba" :surface="false" />
              </sgds-table-cell>
              <sgds-table-cell class="cp-contrast-column">
                <sgds-tooltip :content="`WCAG ${row.wcag}. APCA ${row.apca}.`" placement="top">
                  <button
                    :class="[
                      'cp-contrast-sample',
                      parseInt(row.shade, 10) <= 500
                        ? 'cp-contrast-bg-dark'
                        : 'cp-contrast-bg-light',
                    ]"
                    :style="{ color: row.hex }"
                    :aria-label="`${row.token} contrast: WCAG ${row.wcag}. APCA ${row.apca}.`"
                    type="button"
                  >A</button>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="cp-example-column">
                <div class="cp-example-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                  <span
                    class="cp-swatch"
                    :style="{ background: row.hex }"
                    aria-hidden="true"
                  ></span>
                  <svg class="cp-example-ag" xmlns="http://www.w3.org/2000/svg"><text x="0" y="1em" :fill="row.hex">Ag</text></svg>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
          </div>
      </div>
    </section>

    <!-- Primitive colours -->
    <section v-if="showPrimitiveSection" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__body typography-page-template__body--prose">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

          <!-- Intro: what primitive colour tokens are -->
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <SectionHeader title="How primitive colour tokens work" />
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              A primitive colour token is the foundation layer of the SGDS colour system. It pairs a raw hex value with a name that identifies the shade. Every other colour token in the system resolves down to a primitive.
            </p>

            <!-- Anatomy of a primitive token: raw value → primitive name (SVG version). -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 144" fill="none" class="sgds:block sgds:my-layout-xs sgds:w-full sgds:max-w-[420px]">
              <!-- Column headers -->
              <text x="32" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="var(--sgds-color-default, #333333)" letter-spacing="0">Raw hex value</text>
              <text x="214" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="var(--sgds-color-default, #333333)" letter-spacing="0">Primitive colour</text>

              <!-- Row 1: #E98B8B → sgds-red-400 -->
              <rect x="32" y="26" width="110" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
              <circle cx="55" cy="43" r="7" fill="#e98b8b" />
              <text x="66" y="48" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">#E98B8B</text>
              <line x1="150" y1="43" x2="194" y2="43" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1.5" stroke-linecap="round" />
              <polygon points="194,39 200,43 194,47" fill="var(--sgds-border-color-default, #AAAAAA)" />
              <rect x="214" y="26" width="152" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
              <circle cx="237" cy="43" r="7" fill="#e98b8b" />
              <text x="248" y="48" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">sgds-red-400</text>

              <!-- Row 2: #129A4D → sgds-green-500 -->
              <rect x="32" y="68" width="110" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
              <circle cx="55" cy="85" r="7" fill="#129a4d" />
              <text x="66" y="90" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">#129A4D</text>
              <line x1="150" y1="85" x2="194" y2="85" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1.5" stroke-linecap="round" />
              <polygon points="194,81 200,85 194,89" fill="var(--sgds-border-color-default, #AAAAAA)" />
              <rect x="214" y="68" width="168" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
              <circle cx="237" cy="85" r="7" fill="#129a4d" />
              <text x="248" y="90" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">sgds-green-500</text>

              <!-- Row 3: #0269D0 → sgds-blue-600 -->
              <rect x="32" y="110" width="110" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
              <circle cx="55" cy="127" r="7" fill="#0269d0" />
              <text x="66" y="132" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">#0269D0</text>
              <line x1="150" y1="127" x2="194" y2="127" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1.5" stroke-linecap="round" />
              <polygon points="194,123 200,127 194,131" fill="var(--sgds-border-color-default, #AAAAAA)" />
              <rect x="214" y="110" width="160" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
              <circle cx="237" cy="127" r="7" fill="#0269d0" />
              <text x="248" y="132" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">sgds-blue-600</text>
            </svg>

            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Each primitive colour has two parts: the <strong>base</strong> (colour) and the <strong>modifier</strong> (scale). The token <CodeToken label="sgds-blue-600" /> sits at step 600 on the blue ramp, and every other primitive follows the same pattern.
            </p>

            <!-- Naming anatomy: colour family + scale parts of the token (SVG version). -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 136" fill="none" class="sgds:block sgds:my-layout-xs sgds:w-full sgds:max-w-[460px]">
              <!-- "Base (Colour)" label — centered above "blue" segment -->
              <text x="166" y="16" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="var(--sgds-color-default, #333333)">
                <tspan font-weight="600">Base</tspan><tspan font-weight="400"> (Colour)</tspan>
              </text>

              <!-- Vertical connector line from label down to dot -->
              <line x1="166" y1="22" x2="166" y2="62" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1" />

              <!-- Dot at end of vertical connector -->
              <circle cx="166" cy="65" r="4" fill="var(--sgds-border-color-default, #AAAAAA)" />

              <!-- Pill background (surface-raised, full border-radius) -->
              <rect x="66" y="72" width="188" height="52" rx="26" ry="26" fill="var(--sgds-surface-raised, #FFFFFF)" />

              <!-- "blue" segment highlight (primary-surface-muted, rounded-sm, px-1) -->
              <rect x="138" y="83" width="56" height="30" rx="4" ry="4" fill="var(--sgds-primary-surface-muted, #F4F2FE)" />

              <!-- "600" segment highlight (success-surface-muted, rounded-sm, px-1) -->
              <rect x="198" y="83" width="44" height="30" rx="4" ry="4" fill="var(--sgds-success-surface-muted, #E3F9ED)" />

              <!-- Token text: sgds-blue-600 -->
              <text y="104" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="20" letter-spacing="0">
                <tspan x="82" fill="var(--sgds-color-default, #333333)" font-weight="400">sgds-</tspan><tspan fill="var(--sgds-color-fixed-dark, #1F1F1F)" font-weight="600">blue</tspan><tspan fill="var(--sgds-color-default, #333333)" font-weight="400">-</tspan><tspan fill="var(--sgds-color-fixed-dark, #1F1F1F)" font-weight="600">600</tspan>
              </text>

              <!-- Horizontal connector dot (just past pill right edge) -->
              <circle cx="258" cy="98" r="4" fill="var(--sgds-border-color-default, #AAAAAA)" />

              <!-- Horizontal connector line from dot to "Modifier" label -->
              <line x1="262" y1="98" x2="332" y2="98" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1" />

              <!-- "Modifier (Scale)" label — to the right of the pill -->
              <text x="340" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="var(--sgds-color-default, #333333)">
                <tspan font-weight="600">Modifier</tspan><tspan font-weight="400"> (Scale)</tspan>
              </text>
            </svg>

            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Beyond naming, each primitive is a stable reference for a single hex value. Across the seven colour families, the SGDS palette covers every shade the system needs, from the lightest tints to the deepest darks.
            </p>
          </div>

          <!-- When to use primitives -->
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <SectionHeader title="When to use primitives" />
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Using primitives directly in product code or design files is not recommended. It leads to inconsistencies when themes or brand palettes change. Always reach for <a href="/foundations/colour/semantic-colour" class="sgds:underline">semantic colour tokens</a> first.
            </p>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Only use primitives when you need to:
            </p>
            <ul class="sgds:list-disc sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-sm sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              <li><strong>Generate a custom brand palette</strong> through our colour generator.</li>
              <li><strong>Explore colour ideas in Figma</strong> when prototyping or experimenting.</li>
              <li><strong>Define new semantic tokens</strong> when extending the design system.</li>
            </ul>
          </div>

          <!-- Existing token table -->
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <SectionHeader title="Primitive colour tokens" />

            <!-- Subsection: how to read the shade scale used in the table below -->
            <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
              <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Understanding our colour scale</h4>
              <ul class="sgds:list-disc sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-sm sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <li><strong>100</strong> is lightest, <strong>900</strong> is darkest. Grey adds <strong>000</strong> and <strong>1100</strong> for dark-mode surfaces.</li>
                <li>Shade <strong>600</strong> is the brand input each family scales around.</li>
                <li>Grey uses <CodeToken label="gray" /> in token names for Tailwind compatibility.</li>
              </ul>
            </div>
          </div>

          <div class="typography-page-template__body typography-page-template__body--prose">

          <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div
            v-for="family in allPrimitiveFamilyRows"
            :key="family.id"
            class="sgds:flex sgds:flex-col sgds:gap-text-md"
          >
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
              {{ family.label }}
            </h4>
            <sgds-table tableBorder headerBackground responsive="always" layout="fixed" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="cp-token-column" style="width: 291.29px">Token</sgds-table-head>
                <sgds-table-head class="cp-hex-column" style="width: 105.24px">Hex</sgds-table-head>
                <sgds-table-head class="cp-value-column" style="width: 258.2px">RGBA</sgds-table-head>
                <sgds-table-head class="cp-contrast-column" style="width: 150px">
                  <span class="sgds:inline-flex sgds:items-center sgds:gap-text-2-xs">
                    Contrast
                    <sgds-icon-button
                      name="question-circle"
                      variant="ghost"
                      tone="neutral"
                      size="sm"
                      :ariaLabel.prop="'About colour contrast ratios'"
                      @click="openContrastInfo"
                    ></sgds-icon-button>
                  </span>
                </sgds-table-head>
                <sgds-table-head class="cp-example-column" style="width: 169px">Preview</sgds-table-head>
              </sgds-table-row>

              <sgds-table-row v-for="row in family.rows" :key="`${family.id}-${row.token}`">
                <sgds-table-cell class="cp-token-column">
                  <CodeToken :label="getTokenValue(row.token)" />
                </sgds-table-cell>
                <sgds-table-cell class="cp-hex-column">
                  <CodeToken :label="row.hex" :surface="false" />
                </sgds-table-cell>
                <sgds-table-cell class="cp-value-column">
                  <CodeToken :label="row.rgba" :surface="false" />
                </sgds-table-cell>
                <sgds-table-cell class="cp-contrast-column">
                  <sgds-tooltip :content="`WCAG ${row.wcag}. APCA ${row.apca}.`" placement="top">
                    <button
                      :class="['cp-contrast-sample', isDarkShade(row.shade) ? 'cp-contrast-bg-light' : 'cp-contrast-bg-dark']"
                      :style="{ color: row.hex }"
                      :aria-label="`${row.token} contrast: WCAG ${row.wcag}. APCA ${row.apca}.`"
                      type="button"
                    >A</button>
                  </sgds-tooltip>
                </sgds-table-cell>
                <sgds-table-cell class="cp-example-column">
                  <div class="cp-example-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                    <span
                      class="cp-swatch"
                      :style="{ background: row.hex }"
                      aria-hidden="true"
                    ></span>
                    <svg class="cp-example-ag" xmlns="http://www.w3.org/2000/svg"><text x="0" y="1em" :fill="row.hex">Ag</text></svg>
                  </div>
                </sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </div>
          </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Semantic colours: 3 sub-sections -->
    <template v-if="showSemanticSection">
      <section v-if="props.section === 'semantic'" class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <SectionHeader title="How semantic colour tokens work" />
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                A primitive colour token names a hex value. A semantic colour token names the job that value performs in the interface. Where <CodeToken label="--sgds-blue-600" /> names a specific shade, a semantic token like <CodeToken label="--sgds-link-color-default" /> names the role "default colour for a link". The system maps each role to the right primitive behind the scenes.
              </p>

              <!-- Mapping: Raw hex → Primitive → Semantic (SVG version).
                   Two themed primitives converge on a single semantic token. -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 112" fill="none" class="sgds:block sgds:my-layout-xs sgds:w-full sgds:max-w-[760px]">
                <defs>
                  <!-- Split swatch gradient: day (blue-600) / night (blue-400) -->
                  <linearGradient id="swatch-split" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="50%" stop-color="#0269d0" />
                    <stop offset="50%" stop-color="#60aaf4" />
                  </linearGradient>
                </defs>

                <!-- Column headers -->
                <text x="100" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="var(--sgds-color-default, #333333)">Raw hex value</text>
                <text x="276" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="var(--sgds-color-default, #333333)">Primitive colour</text>
                <text x="504" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="var(--sgds-color-default, #333333)">Semantic colour</text>

                <!-- Row 1: Day theme — #0269D0 → sgds-blue-600 -->
                <text x="16" y="49" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="var(--sgds-color-default, #333333)">Day theme</text>
                <rect x="100" y="28" width="110" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
                <circle cx="123" cy="45" r="7" fill="#0269d0" />
                <text x="134" y="50" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">#0269D0</text>
                <line x1="218" y1="45" x2="262" y2="45" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1.5" stroke-linecap="round" />
                <polygon points="262,41 268,45 262,49" fill="var(--sgds-border-color-default, #AAAAAA)" />
                <rect x="276" y="28" width="160" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
                <circle cx="299" cy="45" r="7" fill="#0269d0" />
                <text x="310" y="50" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">sgds-blue-600</text>

                <!-- Row 2: Night theme — #60AAF4 → sgds-blue-400 -->
                <text x="16" y="93" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="var(--sgds-color-default, #333333)">Night theme</text>
                <rect x="100" y="72" width="110" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
                <circle cx="123" cy="89" r="7" fill="#60aaf4" />
                <text x="134" y="94" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">#60AAF4</text>
                <line x1="218" y1="89" x2="262" y2="89" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1.5" stroke-linecap="round" />
                <polygon points="262,85 268,89 262,93" fill="var(--sgds-border-color-default, #AAAAAA)" />
                <rect x="276" y="72" width="160" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
                <circle cx="299" cy="89" r="7" fill="#60aaf4" />
                <text x="310" y="94" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">sgds-blue-400</text>

                <!-- Merge arrow: two curves converging into one arrowhead -->
                <path d="M444 45 C 460 45, 460 67, 472 67" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                <path d="M444 89 C 460 89, 460 67, 472 67" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                <line x1="472" y1="67" x2="488" y2="67" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1.5" stroke-linecap="round" />
                <polygon points="488,63 494,67 488,71" fill="var(--sgds-border-color-default, #AAAAAA)" />

                <!-- Semantic pill (spans both rows, vertically centred) -->
                <rect x="504" y="50" width="244" height="34" rx="17" fill="var(--sgds-surface-raised, #FFFFFF)" />
                <circle cx="527" cy="67" r="7" fill="url(#swatch-split)" />
                <text x="538" y="72" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="14" fill="var(--sgds-color-default, #333333)">sgds-link-color-default</text>
              </svg>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                <CodeToken label="--sgds-link-color-default" /> resolves to <strong>two</strong> primitives, one for each theme. Switching themes swaps the underlying primitive while every component using the link role stays unchanged.
              </p>

              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                This separation lets themes and brands shift colours without touching components. The same semantic token can point to one primitive in day mode and a different one in night mode. The role stays consistent across every component. Only the rendered hex value changes for contrast, brand, or accessibility.
              </p>
              <ThemeRevealDiagram />
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                This mapping gives SGDS one place to adjust colour behaviour across components, instead of changing each component separately.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">How we structure semantic colours</h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                SGDS semantic colour names follow a role-based structure. The name tells you what the colour is for before it tells you the visual value.
              </p>
              <!-- Semantic token naming anatomy (SVG version): sgds-primary-bg-muted -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 136" fill="none" class="sgds:block sgds:my-layout-xs sgds:w-full sgds:max-w-[500px]">
                <!-- "Base" label — centered above "primary-bg" segment -->
                <text x="202" y="16" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="var(--sgds-color-default, #333333)">Base</text>

                <!-- Vertical connector line from label to dot -->
                <line x1="202" y1="22" x2="202" y2="62" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1" />

                <!-- Dot at end of vertical connector -->
                <circle cx="202" cy="65" r="4" fill="var(--sgds-border-color-default, #AAAAAA)" />

                <!-- Pill background (surface-raised, full border-radius) -->
                <rect x="66" y="72" width="284" height="52" rx="26" ry="26" fill="var(--sgds-surface-raised, #FFFFFF)" />

                <!-- "primary-bg" segment highlight (primary-surface-muted, rounded-sm, px-1) -->
                <rect x="138" y="83" width="128" height="30" rx="4" ry="4" fill="var(--sgds-primary-surface-muted, #F4F2FE)" />

                <!-- "muted" segment highlight (success-surface-muted, rounded-sm, px-1) -->
                <rect x="270" y="83" width="68" height="30" rx="4" ry="4" fill="var(--sgds-success-surface-muted, #E3F9ED)" />

                <!-- Token text: sgds-primary-bg-muted -->
                <text y="104" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace" font-size="20" letter-spacing="0">
                  <tspan x="82" fill="var(--sgds-color-default, #333333)" font-weight="400">sgds-</tspan><tspan fill="var(--sgds-color-fixed-dark, #1F1F1F)" font-weight="600">primary-bg</tspan><tspan fill="var(--sgds-color-default, #333333)" font-weight="400">-</tspan><tspan fill="var(--sgds-color-fixed-dark, #1F1F1F)" font-weight="600">muted</tspan>
                </text>

                <!-- Horizontal connector dot (just past pill right edge) -->
                <circle cx="354" cy="98" r="4" fill="var(--sgds-border-color-default, #AAAAAA)" />

                <!-- Horizontal connector line from dot to "Modifier" label -->
                <line x1="358" y1="98" x2="420" y2="98" stroke="var(--sgds-border-color-default, #AAAAAA)" stroke-width="1" />

                <!-- "Modifier" label — to the right of the pill -->
                <text x="428" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="var(--sgds-color-default, #333333)">Modifier</text>
              </svg>
              <ul class="sgds:list-disc sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-sm sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <li><strong>Base design element or property</strong> combines the colour role and where it is applied, such as danger surface, success text, primary border, or neutral icon.</li>
                <li><strong>Modifier</strong> identifies emphasis or state, such as default, subtle, muted, inverse, fixed light, fixed dark, hover, or selected.</li>
              </ul>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">When we use semantic colours</h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                SGDS uses semantic colours wherever a colour decision needs to stay meaningful across components, themes, and product brands. They let us describe the job a colour performs once, then remap the primitive values behind that job as the system grows.
              </p>
              <ul class="sgds:list-disc sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-sm sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <li><strong>Component foundations</strong> use background, surface, foreground, and border tokens so every component responds to day mode, night mode, and brand changes consistently.</li>
                <li><strong>Interaction states</strong> use semantic tokens for hover, active, selected, disabled, and inverse states, so state behaviour stays predictable across patterns.</li>
                <li><strong>Status and feedback</strong> use success, danger, warning, and neutral tokens, so alerts, validation, badges, and messages share the same meaning.</li>
                <li><strong>Forms</strong> use form-specific semantic tokens for fields, labels, helper text, and validation states, so form controls stay aligned with SGDS components.</li>
                <li><strong>System scaling</strong> relies on semantic colours because new themes, brands, and components can reuse the same roles instead of redefining colour values one component at a time.</li>
              </ul>
            </div>

          </article>
        </div>
      </section>

      <!-- 1. Background colour -->
      <section v-if="showSemanticBg" class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <SectionHeader title="Background colour tokens" />
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Background tokens set the base canvas colour for pages, panels, and overlays. They adapt between light and dark themes.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <template v-for="group in semanticColourGroups" :key="`bg-group-${group.id}`">
                <div v-if="filterGroupRows(group, 'bg').length > 0" class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
                  <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">{{ group.label }}</h4>
                  <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
                    <sgds-table-row>
                      <sgds-table-head class="sc-token-column">Token</sgds-table-head>
                      <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                      <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                      <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
                    </sgds-table-row>
                    <sgds-table-row v-for="row in filterGroupRows(group, 'bg')" :key="row.token">
                      <sgds-table-cell class="sc-token-column">
                        <CodeToken :label="getTokenValue(row.token)" />
                      </sgds-table-cell>
                      <sgds-table-cell class="sc-desc-column">{{ row.description }}</sgds-table-cell>
                      <sgds-table-cell class="sc-mode-column">
                        <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                          <span :class="['sc-swatch', semanticSwatchHasBorder(row.light.hex, row.light.label, row.light.border) ? 'sc-swatch--border' : '', row.light.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.light.hex, row.light.label)" aria-hidden="true"></span>
                          <CodeToken :label="row.light.label" :surface="false" />
                        </div>
                      </sgds-table-cell>
                      <sgds-table-cell class="sc-mode-column">
                        <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                          <span :class="['sc-swatch', semanticSwatchHasBorder(row.dark.hex, row.dark.label, row.dark.border) ? 'sc-swatch--border' : '', row.dark.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.dark.hex, row.dark.label)" aria-hidden="true"></span>
                          <CodeToken :label="row.dark.label" :surface="false" />
                        </div>
                      </sgds-table-cell>
                    </sgds-table-row>
                  </sgds-table>
                </div>
              </template>
            </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 2. Foreground colour -->
      <section v-if="showSemanticForeground" class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <SectionHeader title="Foreground colour tokens" />
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Foreground colour tokens for icons and UI elements across semantic categories. Each token resolves to a different primitive value in light and dark modes.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <template v-for="group in semanticColourGroups" :key="`fg-group-${group.id}`">
                <div v-if="filterGroupRows(group, 'color').length > 0" class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
                  <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">{{ group.label }}</h4>
                  <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
                    <sgds-table-row>
                      <sgds-table-head class="sc-token-column">Token</sgds-table-head>
                      <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                      <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                      <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
                    </sgds-table-row>
                    <sgds-table-row v-for="row in filterGroupRows(group, 'color')" :key="row.token">
                      <sgds-table-cell class="sc-token-column">
                        <CodeToken :label="getTokenValue(row.token)" />
                      </sgds-table-cell>
                      <sgds-table-cell class="sc-desc-column">{{ row.description }}</sgds-table-cell>
                      <sgds-table-cell class="sc-mode-column">
                        <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                          <span :class="['sc-swatch', semanticSwatchHasBorder(row.light.hex, row.light.label, row.light.border) ? 'sc-swatch--border' : '', row.light.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.light.hex, row.light.label)" aria-hidden="true"></span>
                          <CodeToken :label="row.light.label" :surface="false" />
                        </div>
                      </sgds-table-cell>
                      <sgds-table-cell class="sc-mode-column">
                        <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                          <span :class="['sc-swatch', semanticSwatchHasBorder(row.dark.hex, row.dark.label, row.dark.border) ? 'sc-swatch--border' : '', row.dark.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.dark.hex, row.dark.label)" aria-hidden="true"></span>
                          <CodeToken :label="row.dark.label" :surface="false" />
                        </div>
                      </sgds-table-cell>
                    </sgds-table-row>
                  </sgds-table>
                </div>
              </template>
            </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 3. Surface colour -->
      <section v-if="showSemanticSurface" class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <SectionHeader title="Surface colour tokens" />
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Surface tokens define fill colours for elevated containers such as cards, drawers, and dropdowns. They adapt between light and dark themes.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <template v-for="group in semanticColourGroups" :key="`surface-group-${group.id}`">
                <div v-if="filterGroupRows(group, 'surface').length > 0" class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
                  <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">{{ group.label }}</h4>
                  <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
                    <sgds-table-row>
                      <sgds-table-head class="sc-token-column">Token</sgds-table-head>
                      <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                      <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                      <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
                    </sgds-table-row>
                    <sgds-table-row v-for="row in filterGroupRows(group, 'surface')" :key="row.token">
                      <sgds-table-cell class="sc-token-column">
                        <CodeToken :label="getTokenValue(row.token)" />
                      </sgds-table-cell>
                      <sgds-table-cell class="sc-desc-column">{{ row.description }}</sgds-table-cell>
                      <sgds-table-cell class="sc-mode-column">
                        <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                          <span :class="['sc-swatch', semanticSwatchHasBorder(row.light.hex, row.light.label, row.light.border) ? 'sc-swatch--border' : '', row.light.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.light.hex, row.light.label)" aria-hidden="true"></span>
                          <CodeToken :label="row.light.label" :surface="false" />
                        </div>
                      </sgds-table-cell>
                      <sgds-table-cell class="sc-mode-column">
                        <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                          <span :class="['sc-swatch', semanticSwatchHasBorder(row.dark.hex, row.dark.label, row.dark.border) ? 'sc-swatch--border' : '', row.dark.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.dark.hex, row.dark.label)" aria-hidden="true"></span>
                          <CodeToken :label="row.dark.label" :surface="false" />
                        </div>
                      </sgds-table-cell>
                    </sgds-table-row>
                  </sgds-table>
                </div>
              </template>
            </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 4. Border colour -->
      <section v-if="showSemanticBorder" class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <SectionHeader title="Border colour tokens" />
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Border colour tokens define outline and divider colours for components across semantic categories. They adapt between light and dark themes.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <template v-for="group in semanticColourGroups" :key="`border-group-${group.id}`">
                <div v-if="filterGroupRows(group, 'border-color').length > 0" class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
                  <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">{{ group.label }}</h4>
                  <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
                    <sgds-table-row>
                      <sgds-table-head class="sc-token-column">Token</sgds-table-head>
                      <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                      <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                      <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
                    </sgds-table-row>
                    <sgds-table-row v-for="row in filterGroupRows(group, 'border-color')" :key="row.token">
                      <sgds-table-cell class="sc-token-column">
                        <CodeToken :label="getTokenValue(row.token)" />
                      </sgds-table-cell>
                      <sgds-table-cell class="sc-desc-column">{{ row.description }}</sgds-table-cell>
                      <sgds-table-cell class="sc-mode-column">
                        <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                          <span :class="['sc-swatch', semanticSwatchHasBorder(row.light.hex, row.light.label, row.light.border) ? 'sc-swatch--border' : '', row.light.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.light.hex, row.light.label)" aria-hidden="true"></span>
                          <CodeToken :label="row.light.label" :surface="false" />
                        </div>
                      </sgds-table-cell>
                      <sgds-table-cell class="sc-mode-column">
                        <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                          <span :class="['sc-swatch', semanticSwatchHasBorder(row.dark.hex, row.dark.label, row.dark.border) ? 'sc-swatch--border' : '', row.dark.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.dark.hex, row.dark.label)" aria-hidden="true"></span>
                          <CodeToken :label="row.dark.label" :surface="false" />
                        </div>
                      </sgds-table-cell>
                    </sgds-table-row>
                  </sgds-table>
                </div>
              </template>
            </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 5. Text colour -->
      <section v-if="showSemanticText" class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <SectionHeader title="Text colour tokens" />
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Typography colour tokens define the foreground colours for display, heading, body, label, and link text. They adapt between light and dark themes.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <div
                v-for="sub in allTextColourSubgroups"
                :key="sub.id"
                class="sgds:flex sgds:flex-col sgds:gap-layout-xs"
              >
                <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">{{ sub.label }}</h4>
                <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
                  <sgds-table-row>
                    <sgds-table-head class="sc-token-column">Token</sgds-table-head>
                    <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                    <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                    <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
                  </sgds-table-row>
                  <sgds-table-row v-for="row in sub.rows" :key="`${sub.id}-${row.token}`">
                    <sgds-table-cell class="sc-token-column">
                      <CodeToken :label="getTokenValue(row.token)" />
                    </sgds-table-cell>
                    <sgds-table-cell class="sc-desc-column">{{ row.description }}</sgds-table-cell>
                    <sgds-table-cell class="sc-mode-column">
                      <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                        <span :class="['sc-swatch', semanticSwatchHasBorder(row.light.hex, row.light.label, row.light.border) ? 'sc-swatch--border' : '', row.light.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.light.hex, row.light.label)" aria-hidden="true"></span>
                        <CodeToken :label="row.light.label" :surface="false" />
                      </div>
                    </sgds-table-cell>
                    <sgds-table-cell class="sc-mode-column">
                      <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                        <span :class="['sc-swatch', semanticSwatchHasBorder(row.dark.hex, row.dark.label, row.dark.border) ? 'sc-swatch--border' : '', row.dark.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.dark.hex, row.dark.label)" aria-hidden="true"></span>
                        <CodeToken :label="row.dark.label" :surface="false" />
                      </div>
                    </sgds-table-cell>
                  </sgds-table-row>
                </sgds-table>
              </div>
            </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 6. Form colour -->
      <section v-if="showSemanticForm" class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <SectionHeader title="Form colour tokens" />
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Form colour tokens cover surfaces, text, and validation states within input fields, checkboxes, radios, and other form controls.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <div
                v-for="group in allFormColourGroups"
                :key="group.id"
                class="sgds:flex sgds:flex-col sgds:gap-layout-xs"
              >
                <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">{{ group.label }}</h4>
                <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table sc-form-table">
                  <sgds-table-row>
                    <sgds-table-head class="sc-token-column">Token</sgds-table-head>
                    <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                    <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                    <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
                  </sgds-table-row>
                  <sgds-table-row v-for="row in group.rows" :key="`${group.id}-${row.token}`">
                    <sgds-table-cell class="sc-token-column">
                      <CodeToken :label="getTokenValue(row.token)" />
                    </sgds-table-cell>
                    <sgds-table-cell class="sc-desc-column">{{ row.description }}</sgds-table-cell>
                    <sgds-table-cell class="sc-mode-column">
                      <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                        <span :class="['sc-swatch', semanticSwatchHasBorder(row.light.hex, row.light.label, row.light.border) ? 'sc-swatch--border' : '', row.light.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.light.hex, row.light.label)" aria-hidden="true"></span>
                        <CodeToken :label="row.light.label" :surface="false" />
                      </div>
                    </sgds-table-cell>
                    <sgds-table-cell class="sc-mode-column">
                      <div class="sc-cell sgds:flex sgds:items-center sgds:gap-text-xs">
                        <span :class="['sc-swatch', semanticSwatchHasBorder(row.dark.hex, row.dark.label, row.dark.border) ? 'sc-swatch--border' : '', row.dark.hex === 'transparent' ? 'sc-swatch--transparent' : '']" :style="semanticSwatchStyle(row.dark.hex, row.dark.label)" aria-hidden="true"></span>
                        <CodeToken :label="row.dark.label" :surface="false" />
                      </div>
                    </sgds-table-cell>
                  </sgds-table-row>
                </sgds-table>
              </div>
            </div>
            </div>
          </article>
        </div>
      </section>

    </template>

  </TypographyPageTemplate>

  <!-- Shared contrast info modal — opened from any "?" trigger next to a
       Contrast column header. Uses <sgds-modal> with the documented title /
       description / default body / footer slots. -->
  <sgds-modal
    :open="contrastInfoOpen"
    size="lg"
    @sgds-after-hide="contrastInfoOpen = false"
  >
    <h2 slot="title">Colour contrast ratios</h2>
    <p slot="description">
      Colour contrast ratios measure whether text is readable against a background.
    </p>
    <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
        <strong>WCAG (Web Content Accessibility Guidelines)</strong> is the international accessibility standard most government services follow. It scores contrast as a single ratio between 1 (no contrast) and 21 (black on white). Body text needs at least <span class="sgds:font-semibold">4.5</span> to meet the AA conformance level. Large text needs at least <span class="sgds:font-semibold">3</span>, since bigger letters are easier to read.
      </p>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
        <strong>APCA (Accessible Perceptual Contrast Algorithm)</strong> is a newer model that's more accurate for real reading. As a rough guide, body text needs an absolute value around <span class="sgds:font-semibold">60</span> or higher.
      </p>
    </div>
    <sgds-button slot="footer" variant="primary" :ariaLabel.prop="'Got it'" @click="contrastInfoOpen = false">Got it</sgds-button>
  </sgds-modal>
</template>

<style>
/* ─── Product primary / Primitive shared styles ────────────────────────────── */

.cp-segmented-control {
  background: var(--sgds-bg-default);
  position: relative;
  width: fit-content;
}

.cp-segmented-control__pill {
  appearance: none;
  background: var(--sgds-bg-default);
  border: 1px solid var(--sgds-border-color-muted);
  color: var(--sgds-body-color-default);
  cursor: pointer;
  font-family: var(--sgds-font-family-brand);
  font-weight: var(--sgds-font-weight-regular);
  min-inline-size: 6.75rem;
  position: relative;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
}

.cp-segmented-control__pill:first-child {
  border-radius: var(--sgds-border-radius-md) 0 0 var(--sgds-border-radius-md);
}

.cp-segmented-control__pill:last-child {
  border-left: 0;
  border-radius: 0 var(--sgds-border-radius-md) var(--sgds-border-radius-md) 0;
}

.cp-segmented-control__pill--active {
  background: var(--sgds-product-primary-100);
  border-color: var(--sgds-product-primary-600);
  color: var(--sgds-product-primary-600);
  font-weight: var(--sgds-font-weight-semibold);
  z-index: 1;
}

.cp-segmented-control__pill--active + .cp-segmented-control__pill {
  border-left-color: transparent;
}

.cp-segmented-control__pill:last-child.cp-segmented-control__pill--active {
  border-left: 1px solid var(--sgds-product-primary-600);
  margin-left: -1px;
}

.cp-segmented-control__pill:focus-visible {
  outline: var(--sgds-outline-focus);
  outline-offset: var(--sgds-outline-offset-focus);
  position: relative;
  z-index: 1;
}

.cp-source-panel__control--custom {
  max-inline-size: 24rem;
  position: relative;
}

.cp-custom-picker-field {
  width: 100%;
}

.cp-custom-picker {
  background: var(--sgds-bg-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08);
  inset-block-start: calc(100% + var(--sgds-gap-xs));
  inset-inline-start: 0;
  padding: var(--sgds-component-padding-sm);
  position: absolute;
  width: min(100%, 22rem);
  z-index: 3;
}

.sgds-night-theme .cp-custom-picker {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.42), 0 4px 12px rgba(0, 0, 0, 0.24);
}

.cp-custom-picker__swatch {
  block-size: var(--sgds-dimension-32);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-md);
  inline-size: var(--sgds-dimension-32);
}

.cp-custom-picker__swatch--large {
  block-size: 3.5rem;
  border-radius: var(--sgds-border-radius-lg);
  inline-size: 3.5rem;
  margin-block-start: auto;
}

.cp-custom-picker__canvas {
  --cp-picker-hue: 260deg;
  background:
    linear-gradient(to top, #000000, transparent),
    linear-gradient(to right, #ffffff, hsl(var(--cp-picker-hue) 100% 50%));
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  box-sizing: border-box;
  cursor: crosshair;
  min-block-size: 14rem;
  position: relative;
  width: 100%;
}

.cp-custom-picker__canvas-thumb {
  background: transparent;
  block-size: 1.5rem;
  border: 3px solid var(--sgds-color-fixed-light);
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.22);
  inline-size: 1.5rem;
  position: absolute;
  transform: translate(-50%, -50%);
}

.cp-custom-picker__hue-slider {
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(
    to right,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  );
  border-radius: var(--sgds-border-radius-pill);
  block-size: 1.25rem;
  inline-size: 100%;
  margin: 0;
}

.cp-custom-picker__hue-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: var(--sgds-color-fixed-light);
  block-size: 1.5rem;
  border: 3px solid var(--sgds-product-primary-400);
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18);
  inline-size: 1.5rem;
}

.cp-custom-picker__hue-slider::-moz-range-thumb {
  background: var(--sgds-color-fixed-light);
  block-size: 1.5rem;
  border: 3px solid var(--sgds-product-primary-400);
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18);
  inline-size: 1.5rem;
}

.cp-custom-hint {
  color: var(--sgds-body-color-muted);
  margin: 0;
}

.cp-swatch,
.cp-contrast-sample {
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-md);
  box-sizing: border-box;
  flex: none;
}

.cp-swatch {
  block-size: var(--sgds-dimension-40);
  inline-size: var(--sgds-dimension-80);
}

.cp-example-ag {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-22);
  font-weight: var(--sgds-font-weight-semibold);
  line-height: 1;
  overflow: visible;
  block-size: 1.2em;
  inline-size: 2em;
}

.cp-contrast-sample {
  align-items: center;
  appearance: none;
  cursor: pointer;
  display: inline-flex;
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-16);
  font-weight: var(--sgds-font-weight-semibold);
  justify-content: center;
  line-height: var(--sgds-line-height-24);
  block-size: var(--sgds-dimension-40);
  inline-size: var(--sgds-dimension-40);
  padding: var(--sgds-padding-none);
}

.cp-contrast-sample:hover,
.cp-contrast-sample:focus-visible {
  outline: var(--sgds-outline-focus);
  outline-offset: var(--sgds-outline-offset-focus);
}

.cp-contrast-bg-dark {
  background: var(--sgds-gray-1100);
}

.cp-contrast-bg-light {
  background: var(--sgds-surface-fixed-light);
}

@media (max-width: 1023px) {
  .cp-segmented-control {
    inline-size: 100%;
  }

  .cp-segmented-control__pill {
    flex: 1 1 0;
    min-inline-size: 0;
  }

  .cp-custom-picker {
    width: 100%;
  }
}


/* ─── Semantic colours ─────────────────────────────────────────────────────── */

.sc-token-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: none;
  min-inline-size: 11rem;
}

.sc-mode-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 16rem;
  min-inline-size: 10rem;
}

.sc-swatch {
  block-size: 24px;
  border-radius: var(--sgds-border-radius-sm);
  box-sizing: border-box;
  flex: none;
  inline-size: 24px;
}

.sc-swatch--border {
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
}

/* Checkerboard for transparent swatches — no SGDS utility covers background-image patterns */
.sc-swatch--transparent {
  background-color: #e8e8e8;
  background-image:
    linear-gradient(45deg, #c0c0c0 25%, transparent 25%),
    linear-gradient(-45deg, #c0c0c0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #c0c0c0 75%),
    linear-gradient(-45deg, transparent 75%, #c0c0c0 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
}

.sc-desc-column {
  inline-size: max-content;
  max-inline-size: 24rem;
  min-inline-size: 16rem;
  width: auto;
}

/* Form colour table: widen description column, narrow token and mode columns */
.sc-form-table .sc-token-column {
  inline-size: max-content;
  max-inline-size: none;
  min-inline-size: 14rem;
}

.sc-form-table .sc-mode-column {
  max-inline-size: 14rem;
  min-inline-size: 9rem;
}

</style>
