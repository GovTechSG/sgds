<script setup>
import { Content } from "vitepress";
import { useData } from 'vitepress';
import PageHeader from "../../components/page/PageHeader.vue";

const { frontmatter } = useData()
</script>

<template>
  <div
    :class="[
      'sgds:mb-[var(--sgds-margin-xl)] sgds:flex sgds:flex-col',
      frontmatter.pageGapClass || 'sgds:gap-layout-lg'
    ]"
  >
    <PageHeader
      :title="frontmatter.title"
      :description="frontmatter.description"
      :title-class="frontmatter.pageTitleClass"
      :description-class="frontmatter.pageDescriptionClass"
      :bottom-gap-class="frontmatter.pageHeaderBottomGapClass"
    />
    <div>
      <Content />
    </div>
  </div>
</template>
