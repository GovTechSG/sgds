<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useData } from "vitepress";
import logoSvg from "../../assets/logo.svg?raw";
import SearchModal from "./SearchModal.vue";
import ThemeControls from "../ui/ThemeControls.vue";
import { mainNavItems } from "../../data/nav";

const route = useRoute();
const { site } = useData();

const searchOpen = ref(false);
</script>

<template>
  <div class="sgds:flex sgds:flex-col mainnav-container">
    <sgds-masthead></sgds-masthead>
    <sgds-mainnav expand="lg" brandHref="/">
      <span
        slot="brand"
        class="sgds:block sgds:text-default mainnav-brand-logo"
        v-html="logoSvg"
      ></span>

      <sgds-mainnav-item
        v-for="navItem in mainNavItems"
        :key="navItem.link"
        :active="route.path.startsWith(navItem.activeMatch) || null"
      >
        <a :href="navItem.link" class="sgds:whitespace-nowrap">{{ navItem.text }}</a>
      </sgds-mainnav-item>

      <sgds-icon-button
        slot="non-collapsible"
        name="search"
        variant="ghost"
        tone="neutral"
        :ariaLabel.prop="'Search'"
        @click="searchOpen = true"
      ></sgds-icon-button>
      <ThemeControls slot="non-collapsible" class="mainnav-desktop-only" />
    </sgds-mainnav>
  </div>

  <SearchModal :open="searchOpen" @close="searchOpen = false" />
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

/* Reserve space for web components before shadow DOM upgrades — prevents CLS */
.mainnav-container sgds-masthead:not(:defined) {
  display: block;
  min-height: 28px;
}

.mainnav-container sgds-mainnav:not(:defined) {
  display: block;
  min-height: 80px;
}

.mainnav-container sgds-mainnav-item:not([active]) a:focus-visible {
  color: var(--sgds-color-default);
}

.sgds-night-theme .mainnav-brand-logo {
  color: var(--sgds-color-fixed-light);
}
</style>
