<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import {
  brandPalettes,
  currentPaletteId,
  sgdsPrimaryPalette,
  type PaletteId,
} from "../theme/composables/sgds-palette";
import { semanticColourGroups } from "../data/semantic-colours";

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

const sgdsProductPrimaryTemplate = {
  "100": "#F4F2FE",
  "200": "#E1DBFB",
  "300": "#C8BDF7",
  "400": "#A999F3",
  "500": "#8A72EF",
  "600": "#6B4FEB",
  "700": "#523ABC",
  "800": "#3C2B8A",
  "900": "#2A1E61",
} as const;

const customGenerationTemplates = {
  productPrimary: sgdsProductPrimaryTemplate,
  teal: {
    "100": "#EEF5FA",
    "200": "#CEE2F1",
    "300": "#A0C7E4",
    "400": "#71ABD7",
    "500": "#3C8BC8",
    "600": "#0F6EB7",
    "700": "#0B558C",
    "800": "#083F69",
    "900": "#062C49",
  },
  magenta: {
    "100": "#FBF2F9",
    "200": "#F2D8ED",
    "300": "#E5B2DC",
    "400": "#D98BCB",
    "500": "#C95EB7",
    "600": "#B82EA0",
    "700": "#8E247B",
    "800": "#6A1B5D",
    "900": "#4A1341",
  },
  red: {
    "100": "#FDF0F0",
    "200": "#FAD7D6",
    "300": "#F5B0AF",
    "400": "#EF8887",
    "500": "#E85251",
    "600": "#D1201E",
    "700": "#A21817",
    "800": "#7A1211",
    "900": "#560D0C",
  },
  blue: {
    "100": "#EBF4FF",
    "200": "#C6E1FF",
    "300": "#92C6FF",
    "400": "#5AA9FF",
    "500": "#1484FF",
    "600": "#0067D8",
    "700": "#004FA6",
    "800": "#003B7C",
    "900": "#002957",
  },
} as const;

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

function rgbToXyz(r: number, g: number, b: number): { x: number; y: number; z: number } {
  const [red, green, blue] = [r, g, b].map((channel) => {
    const normalised = channel / 255;
    return normalised <= 0.04045
      ? normalised / 12.92
      : ((normalised + 0.055) / 1.055) ** 2.4;
  });

  return {
    x: red * 0.4124564 + green * 0.3575761 + blue * 0.1804375,
    y: red * 0.2126729 + green * 0.7151522 + blue * 0.072175,
    z: red * 0.0193339 + green * 0.119192 + blue * 0.9503041,
  };
}

function xyzToLab(x: number, y: number, z: number): { l: number; a: number; b: number } {
  const reference = { x: 0.95047, y: 1, z: 1.08883 };
  const transform = (value: number) =>
    value > 0.008856 ? Math.cbrt(value) : 7.787 * value + 16 / 116;

  const fx = transform(x / reference.x);
  const fy = transform(y / reference.y);
  const fz = transform(z / reference.z);

  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

function hexToLab(hex: string): { l: number; a: number; b: number } {
  const { r, g, b } = hexToRgb(hex);
  const { x, y, z } = rgbToXyz(r, g, b);
  return xyzToLab(x, y, z);
}

function labToXyz(l: number, a: number, b: number): { x: number; y: number; z: number } {
  const reference = { x: 0.95047, y: 1, z: 1.08883 };

  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;

  const inverse = (value: number) => {
    const cubed = value ** 3;
    return cubed > 0.008856 ? cubed : (value - 16 / 116) / 7.787;
  };

  return {
    x: reference.x * inverse(fx),
    y: reference.y * inverse(fy),
    z: reference.z * inverse(fz),
  };
}

function xyzToRgb(x: number, y: number, z: number): { r: number; g: number; b: number } {
  const redLinear = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
  const greenLinear = x * -0.969266 + y * 1.8760108 + z * 0.041556;
  const blueLinear = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

  const gammaCorrect = (value: number) => {
    const clipped = clamp(value, 0, 1);
    return clipped <= 0.0031308
      ? clipped * 12.92
      : 1.055 * clipped ** (1 / 2.4) - 0.055;
  };

  return {
    r: gammaCorrect(redLinear) * 255,
    g: gammaCorrect(greenLinear) * 255,
    b: gammaCorrect(blueLinear) * 255,
  };
}

function labToHex(l: number, a: number, b: number): string {
  const xyz = labToXyz(l, a, b);
  const rgb = xyzToRgb(xyz.x, xyz.y, xyz.z);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
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
  return (Object.entries(shades) as [string, string][]).map(([shade, hex]) => ({
    shade,
    hex: hex.toUpperCase(),
    rgba: hexToRgba(hex),
    token: `--sgds-product-primary-${shade}`,
    wcag: wcagContrastRatio(
      hex,
      parseInt(shade, 10) <= 500 ? contrastDarkBackground : contrastLightBackground,
    ),
    apca: "—",
  }));
}

const exactPaletteBySwatch = new Map<string, Record<string, string>>([
  [sgdsProductPrimaryTemplate["600"], { ...sgdsProductPrimaryTemplate }],
  ...Object.values(customGenerationTemplates).map((palette) => [palette["600"], { ...palette }] as const),
  ...brandPalettes.map((palette) => [palette.swatch.toUpperCase(), palette.shades] as const),
]);

const customTemplateProfiles = Object.entries(customGenerationTemplates).map(([id, palette]) => {
  const baseLab = hexToLab(palette["600"]);
  const baseHsl = rgbToHsl(...Object.values(hexToRgb(palette["600"])));

  return {
    id,
    hue: baseHsl.h,
    saturation: baseHsl.s,
    lightness: baseHsl.l,
    deltas: Object.fromEntries(
      shadeKeys.map((shade) => {
        const lab = hexToLab(palette[shade]);
        return [
          shade,
          {
            l: lab.l - baseLab.l,
            a: lab.a - baseLab.a,
            b: lab.b - baseLab.b,
          },
        ];
      }),
    ) as Record<(typeof shadeKeys)[number], { l: number; a: number; b: number }>,
  };
});

function hueDistance(a: number, b: number): number {
  const distance = Math.abs(a - b);
  return Math.min(distance, 360 - distance);
}

function getClosestCustomTemplate(hex: string) {
  const { h, s, l } = rgbToHsl(...Object.values(hexToRgb(hex)));

  return customTemplateProfiles.reduce((closest, template) => {
    const closestScore =
      hueDistance(h, closest.hue) * 2 +
      Math.abs(s - closest.saturation) * 0.35 +
      Math.abs(l - closest.lightness) * 0.25;
    const templateScore =
      hueDistance(h, template.hue) * 2 +
      Math.abs(s - template.saturation) * 0.35 +
      Math.abs(l - template.lightness) * 0.25;

    return templateScore < closestScore ? template : closest;
  });
}

function generateCustomPalette(hex: string): Record<string, string> {
  const matchedPalette = exactPaletteBySwatch.get(hex.toUpperCase());
  if (matchedPalette) {
    return matchedPalette;
  }

  const baseLab = hexToLab(hex);
  const template = getClosestCustomTemplate(hex);
  const shades: Record<string, string> = {};

  for (const shade of shadeKeys) {
    if (shade === "600") {
      shades[shade] = hex;
      continue;
    }

    const delta = template.deltas[shade];
    shades[shade] = labToHex(
      clamp(baseLab.l + delta.l, 0, 100),
      baseLab.a + delta.a,
      baseLab.b + delta.b,
    );
  }

  return shades;
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
  return family.shades.map(({ shade, hex }) => ({
    shade,
    hex: hex.toUpperCase(),
    rgba: hexToRgba(hex),
    token: `--sgds-${family.id === "grey" ? "gray" : family.id}-${shade}`,
  }));
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

const activeSemanticGroupId = ref("default");

const currentSemanticRows = computed(() => {
  return semanticColourGroups.find((g) => g.id === activeSemanticGroupId.value)!.rows;
});

function onSemanticTabShow(e: Event) {
  activeSemanticGroupId.value = (e as CustomEvent).detail.name as string;
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
</script>

<template>
  <TypographyPageTemplate>

    <!-- Product primary colour -->
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Product primary colour</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-sm">

          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Primary colour tokens</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Choose a GovTech brand palette or enter a custom hex code for your <strong>600</strong> token. The table below uses the same SGDS primary token structure either way, so teams can compare a pre-approved palette with a generated custom ramp.
            </p>
          </div>

          <div class="cp-source-panel">
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

            <div v-if="productPrimaryMode === 'govtech-brand'" class="cp-source-panel__control">
              <sgds-tab-group variant="underlined" @sgds-tab-show="onTabShow">
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
              class="cp-source-panel__control cp-source-panel__control--custom"
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

              <div v-if="isCustomPickerOpen" class="cp-custom-picker" @click.stop>
                <div class="cp-custom-picker__body">
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

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="cp-token-column">Token name</sgds-table-head>
              <sgds-table-head class="cp-hex-column">Hex</sgds-table-head>
              <sgds-table-head class="cp-value-column">RGBA</sgds-table-head>
              <sgds-table-head class="cp-contrast-column">Contrast</sgds-table-head>
              <sgds-table-head class="cp-example-column">Example</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="row in activeProductRows" :key="`${productPrimaryMode}-${row.token}`">
              <sgds-table-cell class="cp-token-column">
                <CodeToken :label="row.token" />
              </sgds-table-cell>
              <sgds-table-cell class="cp-hex-column">
                <CodeToken :label="row.hex" :surface="false" />
              </sgds-table-cell>
              <sgds-table-cell class="cp-value-column">
                <CodeToken :label="row.rgba" :surface="false" />
              </sgds-table-cell>
              <sgds-table-cell class="cp-contrast-column">
                <sgds-tooltip :content="`WCAG ${row.wcag}. APCA not available.`" placement="top">
                  <button
                    :class="[
                      'cp-contrast-sample',
                      parseInt(row.shade, 10) <= 500
                        ? 'cp-contrast-bg-dark'
                        : 'cp-contrast-bg-light',
                    ]"
                    :style="{ color: row.hex }"
                    :aria-label="`${row.token} contrast: WCAG ${row.wcag}. APCA not available.`"
                    type="button"
                  >A</button>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="cp-example-column">
                <div class="cp-example-cell">
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
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Primitive colours</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-sm">

          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Primitive colour tokens</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              These are the base primitive colour tokens in the SGDS design system. Semantic tokens for feedback, status, and neutral surfaces are mapped from this palette.
            </p>
          </div>

          <sgds-tab-group variant="underlined" @sgds-tab-show="onPrimitiveTabShow">
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

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="cp-token-column">Token name</sgds-table-head>
              <sgds-table-head class="cp-hex-column">Hex</sgds-table-head>
              <sgds-table-head class="cp-value-column">RGBA</sgds-table-head>
              <sgds-table-head class="cp-contrast-column">Contrast</sgds-table-head>
              <sgds-table-head class="cp-example-column">Example</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="row in currentPrimitiveRows" :key="row.token">
              <sgds-table-cell class="cp-token-column">
                <CodeToken :label="row.token" />
              </sgds-table-cell>
              <sgds-table-cell class="cp-hex-column">
                <CodeToken :label="row.hex" :surface="false" />
              </sgds-table-cell>
              <sgds-table-cell class="cp-value-column">
                <CodeToken :label="row.rgba" :surface="false" />
              </sgds-table-cell>
              <sgds-table-cell class="cp-contrast-column">
                <sgds-tooltip content="No contrast data" placement="top">
                  <button
                    :class="['cp-contrast-sample', isDarkShade(row.shade) ? 'cp-contrast-bg-light' : 'cp-contrast-bg-dark']"
                    :style="{ color: row.hex }"
                    :aria-label="`${row.token} — no contrast data`"
                    type="button"
                  >A</button>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="cp-example-column">
                <div class="cp-example-cell">
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

    <!-- Semantic colours -->
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Semantic colours</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-sm">

          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Semantic colour tokens</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Semantic tokens map primitive colours to their intended roles in the UI — such as backgrounds, surfaces, text, and borders. Each token resolves to a different primitive value in light and dark modes.
            </p>
          </div>

          <sgds-tab-group variant="underlined" @sgds-tab-show="onSemanticTabShow">
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

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="sc-token-column">Token name</sgds-table-head>
              <sgds-table-head class="sc-desc-column">Description</sgds-table-head>
              <sgds-table-head class="sc-mode-column">Light</sgds-table-head>
              <sgds-table-head class="sc-mode-column">Dark</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="row in currentSemanticRows" :key="row.token">
              <sgds-table-cell class="sc-token-column">
                <CodeToken :label="row.token" />
              </sgds-table-cell>
              <sgds-table-cell class="sc-desc-column">{{ row.description }}</sgds-table-cell>
              <sgds-table-cell class="sc-mode-column">
                <div class="sc-cell">
                  <span
                    :class="['sc-swatch', semanticSwatchHasBorder(row.light.hex, row.light.label, row.light.border) ? 'sc-swatch--border' : '', row.light.hex === 'transparent' ? 'sc-swatch--transparent' : '']"
                    :style="semanticSwatchStyle(row.light.hex, row.light.label)"
                    aria-hidden="true"
                  ></span>
                  <CodeToken :label="row.light.label" :surface="false" />
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="sc-mode-column">
                <div class="sc-cell">
                  <span
                    :class="['sc-swatch', semanticSwatchHasBorder(row.dark.hex, row.dark.label, row.dark.border) ? 'sc-swatch--border' : '', row.dark.hex === 'transparent' ? 'sc-swatch--transparent' : '']"
                    :style="semanticSwatchStyle(row.dark.hex, row.dark.label)"
                    aria-hidden="true"
                  ></span>
                  <CodeToken :label="row.dark.label" :surface="false" />
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>

  </TypographyPageTemplate>
</template>

<style>
/* ─── Product primary / Primitive shared styles ────────────────────────────── */

.cp-token-column {
  box-sizing: border-box;
  inline-size: clamp(13rem, 28vw, 18rem);
  min-inline-size: clamp(13rem, 28vw, 18rem);
}

.cp-hex-column {
  box-sizing: border-box;
  inline-size: clamp(6rem, 10vw, 8rem);
  min-inline-size: clamp(6rem, 10vw, 8rem);
}

.cp-value-column {
  box-sizing: border-box;
  inline-size: clamp(8rem, 18vw, 12rem);
  min-inline-size: clamp(8rem, 18vw, 12rem);
}

.cp-contrast-column {
  box-sizing: border-box;
  inline-size: clamp(4rem, 6vw, 6rem);
  min-inline-size: clamp(4rem, 6vw, 6rem);
}

.cp-example-column {
  box-sizing: border-box;
  inline-size: clamp(10rem, 22vw, 16rem);
  min-inline-size: clamp(10rem, 22vw, 16rem);
}

.cp-example-cell {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-sm);
}

.cp-source-panel {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-sm);
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

.cp-source-panel__control {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
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
  display: flex;
  flex-direction: column;
  gap: var(--sgds-component-gap-sm);
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

.cp-custom-picker__body {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-component-gap-sm);
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
  inline-size: clamp(11rem, 20vw, 14rem);
  min-inline-size: clamp(11rem, 20vw, 14rem);
}

.sc-mode-column {
  box-sizing: border-box;
  inline-size: clamp(7rem, 10vw, 11rem);
  min-inline-size: clamp(7rem, 10vw, 11rem);
}

.sc-cell {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-sm);
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
  width: 100%;
}

@media (max-width: 1023px) {
  .sc-token-column,
  .sc-desc-column,
  .sc-mode-column {
    inline-size: auto;
    min-inline-size: 0;
    width: auto;
  }
}
</style>
