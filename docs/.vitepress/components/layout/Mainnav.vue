<script setup lang="ts">
import { ref } from 'vue';
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
      <ThemeControls slot="non-collapsible" class="mainnav-desktop-only" />
    </sgds-mainnav>
    <sgds-system-banner show dismissible>
      <sgds-system-banner-item>
        <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
        <strong>This site is a work in progress as part of GovTech &#123;build&#125; hackathon.</strong> Content may be incomplete or subject to change.
      </sgds-system-banner-item>
    </sgds-system-banner>
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

.mainnav-container sgds-mainnav-item:not([active]) a:focus-visible {
  color: var(--sgds-color-default);
}

.sgds-night-theme .mainnav-brand-logo {
  color: var(--sgds-color-fixed-light);
}
</style>
