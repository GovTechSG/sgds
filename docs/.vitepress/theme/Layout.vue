<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultLayout from './layouts/DefaultLayout.vue';
import DocsLayout from './layouts/DocsLayout.vue';
import PageLayout from './layouts/PageLayout.vue';
import Mainnav from "../components/layout/Mainnav.vue";
import Footer from "../components/layout/Footer.vue";

const { frontmatter } = useData()
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl sgds:mb-[var(--sgds-dimension-128)]">
    <Mainnav />
    <div class="sgds-container">
      <DefaultLayout v-if="frontmatter.layout === 'default'" />
      <DocsLayout v-if="frontmatter.layout === 'docs'" />
      <PageLayout v-if="frontmatter.layout === 'page'" />
    </div>
  </div>
  <Footer />
</template>
