<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { BackgroundColor, Color, Theme } from "@adobe/leonardo-contrast-colors";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import {
  brandPalettes,
  currentPaletteId,
  sgdsPrimaryPalette,
  type PaletteId,
} from "../theme/composables/sgds-palette";
import { semanticColourGroups, typographySemanticGroup, formColourGroups } from "../data/semantic-colours";

const tokenViewOptions = [
  { id: "css-variable", label: "CSS variable" },
  { id: "figma", label: "Figma token" },
] as const;
type TokenViewId = (typeof tokenViewOptions)[number]["id"];
const activeTokenViewId = ref<TokenViewId>("css-variable");
const copiedKey = ref<string | null>(null);

const onTokenViewShow = (event: Event) => {
  const nextView = (event as CustomEvent<{ name?: string }>).detail?.name as TokenViewId | undefined;
  if (nextView && tokenViewOptions.some((o) => o.id === nextView)) activeTokenViewId.value = nextView;
};

const copyTokenValue = async (key: string, text: string) => {
  await navigator.clipboard.writeText(text);
  copiedKey.value = key;
  setTimeout(() => { if (copiedKey.value === key) copiedKey.value = null; }, 2000);
};

// Tokens in this file always have the -- prefix
const getTokenValue = (token: string) => {
  if (activeTokenViewId.value === "css-variable") return token;
  return token.replace(/^--/, "");
};

const props = withDefaults(
  defineProps<{
    section?: "all" | "product" | "primitive" | "semantic";
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

// Contrast ratios against white that define the default shade curve.
// 600 is treated as the brand input; lighter/darker shades scale around it.
const SHADE_RATIOS = [1.1, 1.3, 1.6, 2.2, 3.0, 4.5, 7.0, 10.0, 14.0] as const;
const BRAND_SHADE_INDEX = shadeKeys.indexOf("600");

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

function wcagContrastNumber(foregroundHex: string, backgroundHex: string): number {
  return Number(wcagContrastRatio(foregroundHex, backgroundHex));
}

function remapRatio(value: number, sourceMin: number, sourceMax: number, targetMin: number, targetMax: number): number {
  if (sourceMax === sourceMin) return targetMin;
  const progress = clamp((value - sourceMin) / (sourceMax - sourceMin), 0, 1);
  return targetMin + (targetMax - targetMin) * progress;
}

function targetRatioForShade(index: number, seedContrast: number): number {
  const seedTarget = SHADE_RATIOS[BRAND_SHADE_INDEX];
  const defaultTarget = SHADE_RATIOS[index];

  if (index === BRAND_SHADE_INDEX) return seedContrast;

  if (index < BRAND_SHADE_INDEX) {
    const lightestTarget = Math.min(seedContrast, SHADE_RATIOS[0]);
    return remapRatio(
      defaultTarget,
      SHADE_RATIOS[0],
      seedTarget,
      lightestTarget,
      seedContrast,
    );
  }

  const darkestTarget = seedContrast >= SHADE_RATIOS[shadeKeys.length - 1]
    ? 21
    : SHADE_RATIOS[shadeKeys.length - 1];
  return remapRatio(
    defaultTarget,
    seedTarget,
    SHADE_RATIOS[shadeKeys.length - 1],
    seedContrast,
    darkestTarget,
  );
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
  const seedContrast = wcagContrastNumber(seed, contrastLightBackground);
  const ratios = Object.fromEntries(
    shadeKeys.map((shade, index) => [shade, targetRatioForShade(index, seedContrast)]),
  );
  const backgroundColor = new BackgroundColor({
    name: "background",
    colorKeys: [contrastLightBackground],
    ratios: [1],
    output: "HEX",
  });
  const customBrandColor = new Color({
    name: "primary",
    colorKeys: [seed],
    colorSpace: "LCH",
    ratios,
    output: "HEX",
  });
  const theme = new Theme({
    colors: [backgroundColor, customBrandColor],
    backgroundColor,
    lightness: 100,
    output: "HEX",
  });
  const primary = theme.contrastColors.find((colour) => "name" in colour && colour.name === "primary");

  if (!primary || !("values" in primary)) {
    return { "600": seed };
  }

  return Object.fromEntries(
    primary.values.map((value) => [value.name, value.value.toUpperCase()]),
  );
}

const currentColours = computed<ProductPrimaryRow[]>(() => {
  const palette = brandPalettes.find((p) => p.id === selectedGovtechPaletteId.value) ?? sgdsPrimaryPalette;

  return createProductPrimaryRows(palette.shades);
});

function onTabShow(e: Event) {
  selectedGovtechPaletteId.value = (e as CustomEvent).detail.name as Exclude<PaletteId, "default">;
}

const normalisedCustomHex = computed(() => normaliseColourInput(customHexInput.value));
const isCustomHexValid = computed(() => normalisedCustomHex.value !== null);

const customPaletteRows = computed<ProductPrimaryRow[]>(() => {
  const fallback = "#6B4FEB";
  const palette = generateCustomPalette(normalisedCustomHex.value ?? fallback);
  return createProductPrimaryRows(palette);
});

const activeProductRows = computed<ProductPrimaryRow[]>(() =>
  productPrimaryMode.value === "govtech-brand" ? currentColours.value : customPaletteRows.value
);

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

const currentPrimitiveRows = computed(() => {
  const family = primitiveColourFamilies.find((f) => f.id === activePrimitiveFamilyId.value)!;
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
});

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

const activeSemanticGroupId = ref("default");

const currentSemanticRows = computed(() => {
  const group = semanticColourGroups.find((g) => g.id === activeSemanticGroupId.value)!;
  return filterGroupRows(group, "color");
});

function onSemanticTabShow(e: Event) {
  activeSemanticGroupId.value = (e as CustomEvent).detail.name as string;
}

const activeBgGroupId = ref("default");

const currentBgRows = computed(() => {
  const group = semanticColourGroups.find((g) => g.id === activeBgGroupId.value)!;
  return filterGroupRows(group, "bg");
});

function onBgTabShow(e: Event) {
  activeBgGroupId.value = (e as CustomEvent).detail.name as string;
}

const activeSurfaceGroupId = ref("default");

const currentSurfaceRows = computed(() => {
  const group = semanticColourGroups.find((g) => g.id === activeSurfaceGroupId.value)!;
  return filterGroupRows(group, "surface");
});

function onSurfaceTabShow(e: Event) {
  activeSurfaceGroupId.value = (e as CustomEvent).detail.name as string;
}

const activeBorderGroupId = ref("default");

const currentBorderRows = computed(() => {
  const group = semanticColourGroups.find((g) => g.id === activeBorderGroupId.value)!;
  return filterGroupRows(group, "border-color");
});

function onBorderTabShow(e: Event) {
  activeBorderGroupId.value = (e as CustomEvent).detail.name as string;
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

const activeFormColourGroupId = ref(formColourGroups[0].id);

const currentFormColourRows = computed(() => {
  return formColourGroups.find((g) => g.id === activeFormColourGroupId.value)!.rows;
});

function onFormTabShow(e: Event) {
  activeFormColourGroupId.value = (e as CustomEvent).detail.name as string;
}

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
const showProductSection = computed(() => props.section === "all" || props.section === "product");
const showPrimitiveSection = computed(() => props.section === "all" || props.section === "primitive");
const showSemanticSection = computed(() => props.section === "all" || props.section === "semantic");
</script>

<template>
  <TypographyPageTemplate>

    <!-- Product primary colour -->
    <section v-if="showProductSection" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__body typography-page-template__body--prose">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <h4 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Primary colour tokens</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Choose a GovTech brand palette or enter a custom hex code for your <strong>600</strong> token. The table below uses the same SGDS primary token structure either way, so teams can compare a pre-approved palette with a generated custom ramp.
            </p>
          </div>

          <div class="cp-source-panel sgds:flex sgds:flex-col sgds:gap-layout-sm">
            <div
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

            <div v-if="productPrimaryMode === 'govtech-brand'" class="cp-source-panel__control sgds:flex sgds:flex-col sgds:gap-text-sm">
              <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="underlined" @sgds-tab-show="onTabShow">
                <sgds-tab
                  v-for="palette in brandPalettes"
                  :key="palette.id"
                  slot="nav"
                  :panel="palette.id"
                  :active="selectedGovtechPaletteId === palette.id || null"
                >{{ palette.shortLabel }}</sgds-tab>
                <sgds-tab-panel
                  v-for="palette in brandPalettes"
                  :key="`panel-${palette.id}`"
                  :name="palette.id"
                ></sgds-tab-panel>
              </sgds-tab-group>
            </div>

            <div
              v-else
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

          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
            <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
          </sgds-tab-group>

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="cp-token-column">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
              <sgds-table-head class="cp-hex-column">Hex</sgds-table-head>
              <sgds-table-head class="cp-value-column">RGBA</sgds-table-head>
              <sgds-table-head class="cp-contrast-column">Contrast</sgds-table-head>
              <sgds-table-head class="cp-example-column">Example</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="row in activeProductRows" :key="`${productPrimaryMode}-${row.token}`">
              <sgds-table-cell class="cp-token-column">
                <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                  <CodeToken :label="getTokenValue(row.token)" />
                </sgds-tooltip>
                <div v-else class="ts-snippet-row">
                  <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                  <button
                    :class="['ts-snippet-copy-btn', copiedKey === `product-${row.token}` ? 'sgds:text-success-default' : 'sgds:text-default']"
                    @click="copyTokenValue(`product-${row.token}`, getTokenValue(row.token))"
                  >
                    <sgds-icon :name="copiedKey === `product-${row.token}` ? 'check' : 'copy'" size="sm" />
                  </button>
                </div>
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
                  <span
                    class="cp-example-ag"
                    :style="{ color: row.hex }"
                    aria-hidden="true"
                  >Ag</span>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>

    <!-- Primitive colours -->
    <section v-if="showPrimitiveSection" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__body typography-page-template__body--prose">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <h4 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Primitive colour tokens</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              These are the base primitive colour tokens in the SGDS design system. Semantic tokens for feedback, status, and neutral surfaces are mapped from this palette.
            </p>
          </div>

          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="underlined" @sgds-tab-show="onPrimitiveTabShow">
            <sgds-tab
              v-for="family in primitiveColourFamilies"
              :key="family.id"
              slot="nav"
              :panel="family.id"
              :active="activePrimitiveFamilyId === family.id || null"
            >{{ family.label }}</sgds-tab>
            <sgds-tab-panel
              v-for="family in primitiveColourFamilies"
              :key="`prim-panel-${family.id}`"
              :name="family.id"
            ></sgds-tab-panel>
          </sgds-tab-group>

          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
            <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
          </sgds-tab-group>

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="cp-token-column">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
              <sgds-table-head class="cp-hex-column">Hex</sgds-table-head>
              <sgds-table-head class="cp-value-column">RGBA</sgds-table-head>
              <sgds-table-head class="cp-contrast-column">Contrast</sgds-table-head>
              <sgds-table-head class="cp-example-column">Example</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="row in currentPrimitiveRows" :key="row.token">
              <sgds-table-cell class="cp-token-column">
                <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                  <CodeToken :label="getTokenValue(row.token)" />
                </sgds-tooltip>
                <div v-else class="ts-snippet-row">
                  <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                  <button
                    :class="['ts-snippet-copy-btn', copiedKey === `prim-${row.token}` ? 'sgds:text-success-default' : 'sgds:text-default']"
                    @click="copyTokenValue(`prim-${row.token}`, getTokenValue(row.token))"
                  >
                    <sgds-icon :name="copiedKey === `prim-${row.token}` ? 'check' : 'copy'" size="sm" />
                  </button>
                </div>
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
                  <span
                    class="cp-example-ag"
                    :style="{ color: row.hex }"
                    aria-hidden="true"
                  >Ag</span>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>

    <!-- Semantic colours: 3 sub-sections -->
    <template v-if="showSemanticSection">

      <!-- 1. Background colour -->
      <section class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <h4 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Background colour</h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Background tokens set the base canvas colour for pages, panels, and overlays. They adapt between light and dark themes.
              </p>
            </div>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="underlined" @sgds-tab-show="onBgTabShow">
              <sgds-tab
                v-for="group in semanticColourGroups"
                :key="group.id"
                slot="nav"
                :panel="group.id"
                :active="activeBgGroupId === group.id || null"
              >{{ group.label }}</sgds-tab>
              <sgds-tab-panel
                v-for="group in semanticColourGroups"
                :key="`bg-panel-${group.id}`"
                :name="group.id"
              ></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
              <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
              <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="sc-token-column">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
                <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="row in currentBgRows" :key="row.token">
                <sgds-table-cell class="sc-token-column">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === `bg-${row.token}` ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(`bg-${row.token}`, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === `bg-${row.token}` ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
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
          </article>
        </div>
      </section>

      <!-- 2. Foreground colour -->
      <section class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <h4 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Foreground colour</h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Foreground colour tokens for icons and UI elements across semantic categories. Each token resolves to a different primitive value in light and dark modes.
              </p>
            </div>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="underlined" @sgds-tab-show="onSemanticTabShow">
              <sgds-tab
                v-for="group in semanticColourGroups"
                :key="group.id"
                slot="nav"
                :panel="group.id"
                :active="activeSemanticGroupId === group.id || null"
              >{{ group.label }}</sgds-tab>
              <sgds-tab-panel
                v-for="group in semanticColourGroups"
                :key="`sem-panel-${group.id}`"
                :name="group.id"
              ></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
              <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
              <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="sc-token-column">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
                <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="row in currentSemanticRows" :key="row.token">
                <sgds-table-cell class="sc-token-column">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === `fg-${row.token}` ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(`fg-${row.token}`, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === `fg-${row.token}` ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
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
          </article>
        </div>
      </section>

      <!-- 3. Surface colour -->
      <section class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <h4 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Surface colour</h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Surface tokens define fill colours for elevated containers such as cards, drawers, and dropdowns. They adapt between light and dark themes.
              </p>
            </div>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="underlined" @sgds-tab-show="onSurfaceTabShow">
              <sgds-tab
                v-for="group in semanticColourGroups"
                :key="group.id"
                slot="nav"
                :panel="group.id"
                :active="activeSurfaceGroupId === group.id || null"
              >{{ group.label }}</sgds-tab>
              <sgds-tab-panel
                v-for="group in semanticColourGroups"
                :key="`surface-panel-${group.id}`"
                :name="group.id"
              ></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
              <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
              <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="sc-token-column">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
                <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="row in currentSurfaceRows" :key="row.token">
                <sgds-table-cell class="sc-token-column">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === `surface-${row.token}` ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(`surface-${row.token}`, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === `surface-${row.token}` ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
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
          </article>
        </div>
      </section>

      <!-- 4. Border colour -->
      <section class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <h4 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Border colour</h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Border colour tokens define outline and divider colours for components across semantic categories. They adapt between light and dark themes.
              </p>
            </div>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="underlined" @sgds-tab-show="onBorderTabShow">
              <sgds-tab
                v-for="group in semanticColourGroups"
                :key="group.id"
                slot="nav"
                :panel="group.id"
                :active="activeBorderGroupId === group.id || null"
              >{{ group.label }}</sgds-tab>
              <sgds-tab-panel
                v-for="group in semanticColourGroups"
                :key="`border-panel-${group.id}`"
                :name="group.id"
              ></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
              <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
              <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="sc-token-column">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
                <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="row in currentBorderRows" :key="row.token">
                <sgds-table-cell class="sc-token-column">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === `border-${row.token}` ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(`border-${row.token}`, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === `border-${row.token}` ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
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
          </article>
        </div>
      </section>

      <!-- 5. Text colour -->
      <section class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <h4 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Text colour</h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Typography colour tokens define the foreground colours for display, heading, body, label, and link text. They adapt between light and dark themes.
              </p>
            </div>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="underlined" @sgds-tab-show="onTextTabShow">
              <sgds-tab slot="nav" panel="text-display" :active="activeTextColourTabId === 'text-display' || null">Display</sgds-tab>
              <sgds-tab slot="nav" panel="text-heading" :active="activeTextColourTabId === 'text-heading' || null">Heading</sgds-tab>
              <sgds-tab slot="nav" panel="text-body" :active="activeTextColourTabId === 'text-body' || null">Body</sgds-tab>
              <sgds-tab slot="nav" panel="text-label" :active="activeTextColourTabId === 'text-label' || null">Label</sgds-tab>
              <sgds-tab slot="nav" panel="text-link" :active="activeTextColourTabId === 'text-link' || null">Link</sgds-tab>
              <sgds-tab slot="nav" panel="text-form" :active="activeTextColourTabId === 'text-form' || null">Form</sgds-tab>
              <sgds-tab-panel name="text-display"></sgds-tab-panel>
              <sgds-tab-panel name="text-heading"></sgds-tab-panel>
              <sgds-tab-panel name="text-body"></sgds-tab-panel>
              <sgds-tab-panel name="text-label"></sgds-tab-panel>
              <sgds-tab-panel name="text-link"></sgds-tab-panel>
              <sgds-tab-panel name="text-form"></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
              <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
              <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="sc-token-column">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
                <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="row in currentTextColourRows" :key="row.token">
                <sgds-table-cell class="sc-token-column">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === `text-${row.token}` ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(`text-${row.token}`, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === `text-${row.token}` ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
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
          </article>
        </div>
      </section>

      <!-- 6. Form colour -->
      <section class="typography-page-template__section typography-page-template__section--spaced">
        <div class="typography-page-template__body typography-page-template__body--prose">
          <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <h4 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Form colour</h4>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Form colour tokens cover surfaces, text, and validation states within input fields, checkboxes, radios, and other form controls.
              </p>
            </div>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="underlined" @sgds-tab-show="onFormTabShow">
              <sgds-tab
                v-for="group in formColourGroups"
                :key="group.id"
                slot="nav"
                :panel="group.id"
                :active="activeFormColourGroupId === group.id || null"
              >{{ group.label }}</sgds-tab>
              <sgds-tab-panel
                v-for="group in formColourGroups"
                :key="`form-panel-${group.id}`"
                :name="group.id"
              ></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
              <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
              <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
            </sgds-tab-group>

            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table sc-form-table">
              <sgds-table-row>
                <sgds-table-head class="sc-token-column">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
                <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
                <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="row in currentFormColourRows" :key="row.token">
                <sgds-table-cell class="sc-token-column">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === `form-${row.token}` ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(`form-${row.token}`, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === `form-${row.token}` ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
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
          </article>
        </div>
      </section>

    </template>

  </TypographyPageTemplate>
</template>

<style>
/* ─── Product primary / Primitive shared styles ────────────────────────────── */


.cp-token-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 18rem;
  min-inline-size: 13rem;
}

.cp-hex-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 8rem;
  min-inline-size: 6rem;
}

.cp-value-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 12rem;
  min-inline-size: 8rem;
}

.cp-contrast-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 6rem;
  min-inline-size: 4rem;
}

.cp-example-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 16rem;
  min-inline-size: 10rem;
}

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
  background: var(--sgds-bg-default);
}

@media (max-width: 1023px) {
  .cp-token-column,
  .cp-hex-column,
  .cp-value-column,
  .cp-contrast-column,
  .cp-example-column {
    inline-size: auto;
    min-inline-size: 0;
  }

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
  max-inline-size: 14rem;
  min-inline-size: 11rem;
}

.sc-mode-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 11rem;
  min-inline-size: 7rem;
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
  max-inline-size: 18rem;
  min-inline-size: 14rem;
}

.sc-form-table .sc-mode-column {
  max-inline-size: 9rem;
  min-inline-size: 6rem;
}

@media (max-width: 1023px) {
  .sc-token-column,
  .sc-desc-column,
  .sc-mode-column {
    inline-size: auto;
    max-inline-size: none;
    min-inline-size: 0;
    width: auto;
  }
}
</style>
