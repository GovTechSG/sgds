<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useData } from "vitepress";
import { onMounted } from "vue";
import BrandLogo from "./BrandLogo.vue";
import SearchModal from "./SearchModal.vue";
import { applyTheme, getPreferredTheme, isDarkTheme, toggleTheme } from "../theme/composables/sgds-theming";

const route = useRoute();
const { site } = useData();

onMounted(() => {
  applyTheme(getPreferredTheme(), false);
});

const searchOpen = ref(false);

const navItems = [
  { text: "Get started", link: "/get-started/", activeMatch: "/get-started" },
  { text: "Foundations", link: "/foundations/", activeMatch: "/foundations" },
  { text: "Components", link: "/components/accordion", activeMatch: "/components" },
  { text: "Patterns", link: "/patterns/page-templates/form-page", activeMatch: "/patterns" },
  { text: "Guidelines", link: "/guidelines/", activeMatch: "/guidelines" },
  { text: "Resources", link: "/resources/", activeMatch: "/resources" },
  { text: "AI", link: "/ai/introduction", activeMatch: "/ai" },
]
</script>

<template>
  <div :class="$style.container">
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav fluid expand="lg" brandHref="/">
      <BrandLogo slot="brand" :class="$style.brandLogo" />

      <sgds-mainnav-item
        v-for="navItem in navItems"
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

<style module>
  .container {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .container :global(sgds-masthead),
  .container :global(sgds-mainnav) {
    margin: 0;
  }

  .container :global(sgds-mainnav-item:not([active]) a:focus-visible) {
    color: var(--sgds-color-default);
  }

  .brandLogo {
    color: var(--sgds-color-default);
    display: block;
  }

  :global(.sgds-night-theme) .brandLogo {
    color: var(--sgds-color-fixed-light);
  }
</style>
