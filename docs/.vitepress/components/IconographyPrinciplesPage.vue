<script setup lang="ts">
import FoundationPrinciplesList from "./foundations/FoundationPrinciplesList.vue";
import FoundationPrincipleTemplate from "./foundations/FoundationPrincipleTemplate.vue";
import FoundationRulesGuidanceList from "./foundations/FoundationRulesGuidanceList.vue";
import Section from "./foundations/Section.vue";
import IconographyCharacteristicsPage from "./IconographyCharacteristicsPage.vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

const principles = [
  {
    title: "Create visual consistency",
    body: "Keep icons consistent in look and placement across pages and components.",
  },
  {
    title: "Visually pleasing",
    body: "Use clear, balanced icons that help users complete tasks quickly.",
  },
  {
    title: "Keep icons simple and schematic",
    body: "Focus on the object's basic features. Simple icons are faster to recognise.",
  },
];

const rules = [
  {
    title: "Design on purpose",
    body: "Every icon needs a clear purpose. Decide why it is needed first.",
    demo: "icon-purpose",
  },
  {
    title: "Prioritise recognition over recall",
    body: "Use icons people can recognise at a glance, especially standard icons.",
    demo: "icon-recognition",
  },
  {
    title: "Icons need a text label",
    body: "Add a text label when an icon could be unclear in context.",
    demo: "icon-label",
  },
];
</script>

<template>
  <TypographyPageTemplate stacked-examples>
    <FoundationPrincipleTemplate>
      <FoundationPrinciplesList :principles="principles" />
      <FoundationRulesGuidanceList title="Rules and guide" :rules="rules" />
      <Section title="Characteristics">
        <IconographyCharacteristicsPage />
      </Section>
    </FoundationPrincipleTemplate>
  </TypographyPageTemplate>
</template>
