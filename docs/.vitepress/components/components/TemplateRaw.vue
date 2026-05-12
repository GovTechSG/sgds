<script setup lang="ts">
import {
  aboutUsMarkup,
  applicationManagementMarkup,
  blogMarkup,
  catalogueMarkup,
  landingMarkup,
  reportIssueMarkup,
} from "../../data/template-markup";
import { getPatternDoc } from "../../data/pattern-docs";

const props = defineProps<{ templateKey: string }>();

const markupByKey: Record<string, string> = {
  "about-us": aboutUsMarkup,
  "application-management": applicationManagementMarkup,
  blog: blogMarkup,
  catalogue: catalogueMarkup,
  landing: landingMarkup,
  "report-issue": reportIssueMarkup,
};

const markup = markupByKey[props.templateKey] ?? getPatternDoc(props.templateKey)?.demos[0]?.markup ?? "";
</script>

<template>
  <div v-html="markup"></div>
</template>
