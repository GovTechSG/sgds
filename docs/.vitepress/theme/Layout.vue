<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultLayout from './layouts/DefaultLayout.vue';
import DocsLayout from './layouts/DocsLayout.vue';
import PageLayout from './layouts/PageLayout.vue';
import PreviewLayout from './layouts/PreviewLayout.vue';
import BareLayout from './layouts/BareLayout.vue';
import Mainnav from "../components/layout/Mainnav.vue";
import Footer from "../components/layout/Footer.vue";

const { frontmatter } = useData()
</script>

<template>
  <BareLayout v-if="frontmatter.layout === 'bare'" />
  <PreviewLayout v-else-if="frontmatter.layout === 'preview'" />
  <template v-else>
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl sgds:mb-layout-xl">
      <Mainnav />
      <main class="sgds-container">
        <DefaultLayout v-if="frontmatter.layout === 'default'" />
        <DocsLayout v-if="frontmatter.layout === 'docs'" />
        <PageLayout v-if="frontmatter.layout === 'page'" />
      </main>
    </div>
    <Footer />
  </template>
</template>
