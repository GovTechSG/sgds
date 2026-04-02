<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultLayout from './layouts/DefaultLayout.vue';
import DocsLayout from './layouts/DocsLayout.vue';
import PageLayout from './layouts/PageLayout.vue';
import Mainnav from "../components/Mainnav.vue";
import Footer from "../components/Footer.vue";

const { frontmatter } = useData()
</script>

<template>
  <div :class="$style.shell">
    <Mainnav />
    <div class="sgds-container">
      <DefaultLayout v-if="frontmatter.layout === 'default'" />
      <DocsLayout v-if="frontmatter.layout === 'docs'" />
      <PageLayout v-if="frontmatter.layout === 'page'" />
    </div>
  </div>
  <Footer />
</template>

<style module>
  .shell {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-layout-gap-xl);
    margin-bottom: var(--sgds-dimension-128);
  }
</style>
