<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useData } from "vitepress";
import { onMounted } from "vue";
import logoSvg from "../../assets/logo.svg?raw";
import SearchModal from "./SearchModal.vue";
import { applyTheme, getPreferredTheme, isDarkTheme, toggleTheme } from "../../theme/composables/sgds-theming";
import { mainNavItems } from "../../data/nav";

const route = useRoute();
const { site } = useData();

onMounted(() => {
  applyTheme(getPreferredTheme(), false);
});

const searchOpen = ref(false);
</script>

<template>
  <div class="sgds:flex sgds:flex-col mainnav-container">
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav fluid expand="lg" brandHref="/">
      <span slot="brand" class="sgds:block sgds:text-default mainnav-brand-logo" v-html="logoSvg"></span>

      <sgds-mainnav-item
        v-for="navItem in mainNavItems"
        :key="navItem.link"
        :active="route.path.startsWith(navItem.activeMatch)"
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
        slot="non-collapsible"
        :name="isDarkTheme ? 'sun' : 'moon'"
        variant="ghost"
        tone="neutral"
        :ariaLabel="isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'"
        :title="isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      ></sgds-icon-button>
    </sgds-mainnav>
    <sgds-system-banner show fluid dismissible>
      <sgds-system-banner-item>
        <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
        <strong>This site is a work in progress as part of GovTech &#123;build&#125; hackathon.</strong> Content may be incomplete or subject to change.
      </sgds-system-banner-item>
    </sgds-system-banner>
  </div>

  <SearchModal :open="searchOpen" @close="searchOpen = false" />
</template>

<style>
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
