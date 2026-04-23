import nightCssRaw from "@govtechsg/sgds-web-component/themes/night.css?raw";
import { brandPalettes, sgdsPrimaryPalette, type PaletteId } from "./sgds-palette";

const SCOPED_NIGHT_CLASS = "sgds-night-theme-scope";
const SCOPED_NIGHT_STYLE_ID = "sgds-night-theme-scope-stylesheet";

// Inject a version of night.css whose selector matches any element with the
// `sgds-night-theme-scope` class, so dark mode can be applied to a subtree
// instead of the whole document. Runs once per page load.
function ensureScopedNightThemeInjected() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SCOPED_NIGHT_STYLE_ID)) return;

  const css = nightCssRaw
    .replace(/@import\s+[^;]+;/g, "")
    .replace(/:root\.sgds-night-theme/g, `.${SCOPED_NIGHT_CLASS}`);

  const styleEl = document.createElement("style");
  styleEl.id = SCOPED_NIGHT_STYLE_ID;
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}

export function setScopedDark(el: HTMLElement, isDark: boolean) {
  ensureScopedNightThemeInjected();
  el.classList.toggle(SCOPED_NIGHT_CLASS, isDark);
}

export function setScopedPalette(el: HTMLElement, id: PaletteId) {
  const palette =
    id === "default"
      ? sgdsPrimaryPalette
      : brandPalettes.find((p) => p.id === id) ?? sgdsPrimaryPalette;

  for (const [shade, value] of Object.entries(palette.shades)) {
    el.style.setProperty(`--sgds-product-primary-${shade}`, value);
  }
}
