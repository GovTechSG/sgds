<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useData } from "vitepress";
import logoSvg from "../../assets/logo.svg?raw";
import SearchModal from "./SearchModal.vue";
import { applyTheme, getPreferredTheme, isDarkTheme, toggleTheme } from "../../theme/composables/sgds-theming";
import {
  applyPalette,
  getStoredPalette,
  currentPaletteId,
  brandPalettes,
  sgdsPrimaryPalette,
  type PaletteId,
} from "../../theme/composables/sgds-palette";
import { mainNavItems } from "../../data/nav";

const route = useRoute();
const { site } = useData();

const searchOpen = ref(false);
const paletteOpen = ref(false);
const paletteBtnRef = ref<HTMLElement | null>(null);
const paletteDropdownStyle = ref<Record<string, string>>({});

onMounted(() => {
  applyTheme(getPreferredTheme(), false);
  applyPalette(getStoredPalette(), false);
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

function selectPalette(id: PaletteId) {
  applyPalette(id);
  paletteOpen.value = false;
}
</script>

<template>
  <div class="sgds:flex sgds:flex-col mainnav-container">
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav expand="lg" brandHref="/">
      <span slot="brand" class="sgds:block sgds:text-default mainnav-brand-logo" v-html="logoSvg"></span>

      <sgds-mainnav-item
        v-for="navItem in mainNavItems"
        :key="navItem.link"
        :active="route.path.startsWith(navItem.activeMatch) || null"
      >
        <a :href="navItem.link">{{ navItem.text }}</a>
      </sgds-mainnav-item>

      <sgds-icon-button
        slot="non-collapsible"
        name="search"
        variant="ghost"
        tone="neutral"
        ariaLabel="Search"
        @click="searchOpen = true"
      ></sgds-icon-button>
      <sgds-icon-button
        ref="paletteBtnRef"
        slot="non-collapsible"
        name="sliders"
        variant="ghost"
        tone="neutral"
        ariaLabel="Change theme colour"
        title="Change theme colour"
        class="mainnav-desktop-only"
        @click.stop="togglePalette"
      ></sgds-icon-button>
      <sgds-icon-button
        slot="non-collapsible"
        :name="isDarkTheme ? 'sun' : 'moon'"
        variant="ghost"
        tone="neutral"
        :ariaLabel="isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'"
        :title="isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'"
        class="mainnav-desktop-only"
        @click="toggleTheme"
      ></sgds-icon-button>
    </sgds-mainnav>
    <sgds-system-banner show dismissible>
      <sgds-system-banner-item>
        <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
        <strong>This site is a work in progress as part of GovTech &#123;build&#125; hackathon.</strong> Content may be incomplete or subject to change.
      </sgds-system-banner-item>
    </sgds-system-banner>
  </div>

  <SearchModal :open="searchOpen" @close="searchOpen = false" />

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
            :aria-pressed="currentPaletteId === sgdsPrimaryPalette.id"
            @click="selectPalette(sgdsPrimaryPalette.id)"
          >
            <span
              class="palette-swatch-circle"
              :style="{ background: sgdsPrimaryPalette.swatch }"
              :class="{ 'palette-swatch-circle--active': currentPaletteId === sgdsPrimaryPalette.id }"
            >
              <svg v-if="currentPaletteId === sgdsPrimaryPalette.id" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 16 16" aria-hidden="true">
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
          :aria-pressed="currentPaletteId === palette.id"
          @click="selectPalette(palette.id)"
        >
          <span
            class="palette-swatch-circle"
            :style="{ background: palette.swatch }"
            :class="{ 'palette-swatch-circle--active': currentPaletteId === palette.id }"
          >
            <svg v-if="currentPaletteId === palette.id" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 16 16" aria-hidden="true">
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
/* Hide colour/theme controls on mobile — @media required, no SGDS responsive utilities exist */
@media screen and (max-width: 1023px) {
  .mainnav-desktop-only {
    display: none !important;
  }
}

/* Global selectors targeting web component internals — cannot be expressed as utility classes */
.mainnav-container sgds-masthead,
.mainnav-container sgds-mainnav {
  margin: 0;
}

.mainnav-container sgds-mainnav-item:not([active]) a:focus-visible {
  color: var(--sgds-color-default);
}

.sgds-night-theme .mainnav-brand-logo {
  color: var(--sgds-color-fixed-light);
}

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
