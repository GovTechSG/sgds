<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { applyTheme, getPreferredTheme, isDarkTheme, toggleTheme } from "../../theme/composables/sgds-theming";
import {
  applyPalette,
  getStoredPalette,
  currentPaletteId,
  brandPalettes,
  sgdsPrimaryPalette,
  type PaletteId,
} from "../../theme/composables/sgds-palette";
import { setScopedDark, setScopedPalette } from "../../theme/composables/sgds-scoped-theming";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "outline" | "ghost";
    tone?: "brand" | "danger" | "fixed-light" | "neutral";
    size?: "xs" | "sm" | "md" | "lg";
    /**
     * When provided, theme/palette toggles apply to this element only
     * (and its descendants), not to the whole document.
     */
    scopeEl?: HTMLElement | null;
  }>(),
  { variant: "ghost", tone: "neutral", size: "md", scopeEl: null },
);

const isScoped = computed(() => props.scopeEl != null);

// Local state used only when this component instance is scoped to an element.
const localDark = ref(false);
const localPaletteId = ref<PaletteId>("default");

const activeDark = computed(() => (isScoped.value ? localDark.value : isDarkTheme.value));
const activePaletteId = computed(() => (isScoped.value ? localPaletteId.value : currentPaletteId.value));

const paletteOpen = ref(false);
const paletteBtnRef = ref<HTMLElement | null>(null);
const paletteDropdownStyle = ref<Record<string, string>>({});

// When the scoped element becomes available, paint its initial theme/palette
// so the demo starts in a predictable state regardless of the global setting.
watch(
  () => props.scopeEl,
  (el) => {
    if (!el) return;
    setScopedDark(el, localDark.value);
    setScopedPalette(el, localPaletteId.value);
  },
  { immediate: true },
);

onMounted(() => {
  if (!isScoped.value) {
    applyTheme(getPreferredTheme(), false);
    applyPalette(getStoredPalette(), false);
  }
  document.addEventListener("click", closePaletteOnOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", closePaletteOnOutside);
});

function togglePalette() {
  if (!paletteOpen.value && paletteBtnRef.value) {
    const rect = paletteBtnRef.value.getBoundingClientRect();
    paletteDropdownStyle.value = {
      top: `${rect.bottom + 8}px`,
      right: `${window.innerWidth - rect.right}px`,
    };
  }
  paletteOpen.value = !paletteOpen.value;
}

function closePaletteOnOutside(e: MouseEvent) {
  if (paletteBtnRef.value && !paletteBtnRef.value.contains(e.target as Node)) {
    paletteOpen.value = false;
  }
}

function handleToggleTheme() {
  if (isScoped.value && props.scopeEl) {
    localDark.value = !localDark.value;
    setScopedDark(props.scopeEl, localDark.value);
  } else {
    toggleTheme();
  }
}

function selectPalette(id: PaletteId) {
  if (isScoped.value && props.scopeEl) {
    localPaletteId.value = id;
    setScopedPalette(props.scopeEl, id);
  } else {
    applyPalette(id);
  }
  paletteOpen.value = false;
}
</script>

<template>
  <div class="sgds:inline-flex sgds:items-center sgds:gap-xs" v-bind="$attrs">
    <sgds-icon-button
      ref="paletteBtnRef"
      name="sliders"
      :variant="variant"
      :tone="tone"
      :size="size"
      ariaLabel="Change theme colour"
      title="Change theme colour"
      @click.stop="togglePalette"
    ></sgds-icon-button>
    <sgds-icon-button
      :name="activeDark ? 'sun' : 'moon'"
      :variant="variant"
      :tone="tone"
      :size="size"
      :ariaLabel="activeDark ? 'Switch to light mode' : 'Switch to dark mode'"
      :title="activeDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="handleToggleTheme"
    ></sgds-icon-button>
  </div>

  <Teleport to="body">
    <div
      v-if="paletteOpen"
      class="palette-dropdown"
      :style="paletteDropdownStyle"
      @click.stop
    >
      <div class="palette-dropdown__section">
        <p class="palette-dropdown__title">Our brand colour</p>
        <div class="palette-dropdown__swatches">
          <button
            class="palette-swatch-btn"
            :title="sgdsPrimaryPalette.label"
            :aria-label="sgdsPrimaryPalette.label"
            :aria-pressed="activePaletteId === sgdsPrimaryPalette.id"
            @click="selectPalette(sgdsPrimaryPalette.id)"
          >
            <span
              class="palette-swatch-circle"
              :style="{ background: sgdsPrimaryPalette.swatch }"
              :class="{ 'palette-swatch-circle--active': activePaletteId === sgdsPrimaryPalette.id }"
            >
              <svg v-if="activePaletteId === sgdsPrimaryPalette.id" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
            </span>
            <span class="palette-swatch-label">{{ sgdsPrimaryPalette.shortLabel }}</span>
          </button>
        </div>
      </div>

      <div class="palette-dropdown__section">
        <p class="palette-dropdown__title">GovTech brand colour</p>
        <div class="palette-dropdown__swatches">
          <button
            v-for="palette in brandPalettes"
            :key="palette.id"
            class="palette-swatch-btn"
            :title="palette.label"
            :aria-label="palette.label"
            :aria-pressed="activePaletteId === palette.id"
            @click="selectPalette(palette.id)"
          >
            <span
              class="palette-swatch-circle"
              :style="{ background: palette.swatch }"
              :class="{ 'palette-swatch-circle--active': activePaletteId === palette.id }"
            >
              <svg v-if="activePaletteId === palette.id" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
            </span>
            <span class="palette-swatch-label">{{ palette.shortLabel }}</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
/* Palette dropdown — position: fixed + z-index + box-shadow cannot be expressed as utilities */
.palette-dropdown {
  background: var(--sgds-bg-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  font-family: var(--sgds-font-family-brand);
  gap: var(--sgds-gap-md);
  padding: var(--sgds-padding-xl);
  position: fixed;
  width: max-content;
  z-index: 1000;
}

.sgds-night-theme .palette-dropdown {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
}

.palette-dropdown__title {
  color: var(--sgds-body-color-muted);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-wide);
  line-height: var(--sgds-line-height-label-sm);
  margin: 0;
  text-transform: uppercase;
}

.palette-dropdown__section {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
}

.palette-dropdown__swatches {
  display: flex;
  gap: var(--sgds-gap-lg);
}

.palette-swatch-btn {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: var(--sgds-font-family-brand);
  gap: var(--sgds-gap-xs);
  padding: 0;
}

.palette-swatch-circle {
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 32px;
  justify-content: center;
  outline: 3px solid transparent;
  outline-offset: 2px;
  transition: transform 200ms ease, outline-color 150ms ease;
  width: 32px;
}

.palette-swatch-circle--active {
  outline-color: var(--sgds-primary-border-color-default);
}

.palette-swatch-btn:hover .palette-swatch-circle {
  transform: scale(1.1);
}

.palette-swatch-btn:focus-visible .palette-swatch-circle {
  outline-color: var(--sgds-primary-border-color-default);
}

.palette-swatch-label {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-label-xs);
  text-align: center;
  white-space: nowrap;
}
</style>
