<script setup>
import { Content } from "vitepress";
import { useData } from 'vitepress';
import PageHeader from "../../components/PageHeader.vue";

const { frontmatter } = useData()
</script>

<template>
  <div :class="$style['layout-container']">
    <PageHeader
      :title="frontmatter.title"
      :description="frontmatter.description"
      :title-class="frontmatter.pageTitleClass"
      :description-class="frontmatter.pageDescriptionClass"
    />
    <div :class="$style['content-container']">
      <Content />
    </div>
  </div>
</template>

<style module>
  .layout-container {
    margin: var(--sgds-margin-none) var(--sgds-margin-none) var(--sgds-margin-xl);
    display: flex;
    flex-direction: column;
    gap: var(--sgds-spacer-10);
  }
</style>
