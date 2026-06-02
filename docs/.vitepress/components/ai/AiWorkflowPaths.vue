<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Badge/index.js";
import "@govtechsg/sgds-web-component/components/Icon/index.js";
import "@govtechsg/sgds-web-component/components/Table/index.js";
import CodeToken from "../ui/CodeToken.vue";
import { newProjectSteps, existingSkills } from "../../data/ai-workflow-data";
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm sgds:my-[var(--sgds-text-gap-md)]">

    <!-- New project -->
    <div class="sgds:border sgds:border-muted sgds:rounded-lg sgds:overflow-hidden">
      <div class="sgds:bg-surface-raised sgds:border-b sgds:border-muted sgds:py-[var(--sgds-component-padding-md)] sgds:px-[var(--sgds-component-padding-lg)] sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
        <sgds-badge variant="success" outlined>New project</sgds-badge>
        <p class="sgds:text-heading-default sgds:text-4 sgds:font-semibold sgds:mt-[var(--sgds-text-gap-xs)] sgds:mx-0 sgds:mb-0 sgds:leading-[1.3]">Starting from scratch?</p>
        <p class="sgds:text-subtle sgds:text-2 sgds:m-0 sgds:leading-[1.5]">Work through these skills in order — each one builds on the last.</p>
      </div>
      <div class="sgds:bg-surface-default sgds:py-[var(--sgds-component-padding-md)] sgds:px-[var(--sgds-component-padding-lg)]">
        <sgds-table tableBorder>
          <sgds-table-row v-for="(step, index) in newProjectSteps" :key="step.component">
            <sgds-table-cell class="sgds:text-center sgds:w-[var(--sgds-dimension-56)]">
              <span class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:bg-surface-inverse sgds:rounded-full sgds:text-inverse sgds:flex-none sgds:text-[var(--sgds-font-size-0)] sgds:font-regular sgds:leading-[var(--sgds-line-height-16)] sgds:h-6 sgds:w-6">{{ index + 1 }}</span>
            </sgds-table-cell>
            <sgds-table-cell class="sgds:w-[1%] sgds:whitespace-nowrap">
              <div v-if="step.skills" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-2-xs)]">
                <CodeToken v-for="skill in step.skills" :key="skill" :label="skill" />
              </div>
              <CodeToken v-else :label="step.skill" />
            </sgds-table-cell>
            <sgds-table-cell class="sgds:text-subtle sgds:text-1 sgds:leading-[1.4]">
              {{ step.desc }}
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </div>

    <!-- Existing app -->
    <div class="sgds:border sgds:border-muted sgds:rounded-lg sgds:overflow-hidden">
      <div class="sgds:bg-surface-raised sgds:border-b sgds:border-muted sgds:py-[var(--sgds-component-padding-md)] sgds:px-[var(--sgds-component-padding-lg)] sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
        <sgds-badge variant="info" outlined>Existing app</sgds-badge>
        <p class="sgds:text-heading-default sgds:text-4 sgds:font-semibold sgds:mt-[var(--sgds-text-gap-xs)] sgds:mx-0 sgds:mb-0 sgds:leading-[1.3]">Already on SGDS v3?</p>
        <p class="sgds:text-subtle sgds:text-2 sgds:m-0 sgds:leading-[1.5]">Skip setup — jump to the skill that covers what you're building right now.</p>
      </div>
      <div class="workflow-skills-grid">
        <div v-for="skill in existingSkills" :key="skill.name" class="sgds:bg-surface-default sgds:py-[var(--sgds-component-padding-sm)] sgds:px-[var(--sgds-component-padding-lg)] sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
          <p class="sgds:font-mono sgds:text-2 sgds:font-medium sgds:text-heading-default sgds:m-0 sgds:leading-[1.4]">{{ skill.name }}</p>
          <p class="sgds:text-1 sgds:text-subtle sgds:m-0 sgds:leading-[1.4]">{{ skill.desc }}</p>
        </div>
      </div>
    </div>

  </div>

  <!-- Tip -->
  <div class="sgds:flex sgds:items-start sgds:gap-[var(--sgds-component-gap-sm)] sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-md sgds:py-[var(--sgds-component-padding-sm)] sgds:px-[var(--sgds-component-padding-md)] sgds:mt-[var(--sgds-text-gap-sm)]">
    <sgds-icon name="lightbulb" size="md" class="sgds:text-warning-default sgds:flex-shrink-0 sgds:mt-[2px]"></sgds-icon>
    <p class="sgds:text-2 sgds:text-default sgds:leading-[1.55] sgds:m-0">
      Not sure where to start? Ask your AI to read the <CodeToken label="sgds-workflow" /> skill first — it will map out everything based on what you're building.
    </p>
  </div>
</template>

<style>
/* CSS border trick for skill grid — gap: 1px with background creates divider lines between grid cells */
.workflow-skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--sgds-border-color-muted);
  border-top: none;
}

@media (max-width: 600px) {
  .workflow-skills-grid { grid-template-columns: 1fr; }
}
</style>
