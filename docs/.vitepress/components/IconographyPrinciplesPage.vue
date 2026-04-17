<script setup lang="ts">
import FoundationPrinciplesList from "./foundations/FoundationPrinciplesList.vue";
import FoundationPrincipleTemplate from "./foundations/FoundationPrincipleTemplate.vue";
import Section from "./foundations/Section.vue";
import IconographyCharacteristicsPage from "./IconographyCharacteristicsPage.vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

const principles = [
  {
    title: "Create visual consistency",
    body: "Icons should be consistent in layouts, not only in their look and feel but in their placement within a page or component.",
  },
  {
    title: "Visually pleasing",
    body: "An eye-catching and appealing graphic helps people perform tasks quicker and more easily.",
  },
  {
    title: "Keep icons simple and schematic",
    body: "Reduce the amount of graphic details by focusing on the basic characteristics of the object rather than creating a highly realistic image in order to speed up recognition.",
  },
];

const rules = [
  {
    title: "Design on purpose",
    body: "Icons, like all elements of good design, must have a clear purpose. Before you even think about what sort of icons you want, you need to ask yourself: why?",
  },
  {
    title: "Size really matters",
    body: "The promise of nascent technologies, such as SVG and icon fonts, is yet to be realised, so for now we have to think about size and scalability.",
  },
  {
    title: "Prioritise recognition over recall",
    body: "Icons are fast to recognise at a glance, if well designed. This is particularly true for standard icons that people have seen and used before.",
  },
  {
    title: "Icons need a text label",
    body: "To help overcome the ambiguity that almost all icons face, a text label must be present alongside an icon to clarify its meaning in that particular context.",
  },
];
</script>

<template>
  <TypographyPageTemplate stacked-examples>
    <FoundationPrincipleTemplate>
      <FoundationPrinciplesList :principles="principles" />
      <FoundationPrinciplesList title="Rules and guide" :principles="rules" />
      <Section
        title="Characteristics"
        description="Characteristics that define how SGDS icons look, behave, and work across interface contexts."
      >
        <IconographyCharacteristicsPage />
      </Section>
    </FoundationPrincipleTemplate>
  </TypographyPageTemplate>
</template>
