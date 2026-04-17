import { ref } from "vue";

export type SgdsTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "sgds-docs-theme";
export const isDarkTheme = ref(false);

function getStoredTheme(): SgdsTheme | null {
  if (typeof window === "undefined") return null;

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
}

export function getPreferredTheme(): SgdsTheme {
  if (typeof window === "undefined") return "light";

  const storedTheme = getStoredTheme();
  if (storedTheme) return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: SgdsTheme, persist = true) {
  if (typeof document === "undefined") return;

  const isDark = theme === "dark";
  isDarkTheme.value = isDark;
  document.documentElement.classList.toggle("sgds-night-theme", isDark);

  if (persist && typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

export function initializeTheme() {
  if (typeof window === "undefined") return;

  applyTheme(getPreferredTheme(), false);
}

export function toggleTheme() {
  applyTheme(isDarkTheme.value ? "light" : "dark");
}
