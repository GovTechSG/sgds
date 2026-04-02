<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Badge/index.js";
import "@govtechsg/sgds-web-component/components/Icon/index.js";
import "@govtechsg/sgds-web-component/components/Table/index.js";
import CodeToken from "./CodeToken.vue";

const newProjectSteps = [
  {
    stepHeader: " ",
    component: "step1",
    skill: "sgds-getting-started",
    desc: "Fonts, CSS, and component setup",
  },
  {
    stepHeader: " ",
    component: "step2",
    skill: "sgds-components  +  sgds-utilities",
    desc: "Your day-to-day building references",
  },
  {
    stepHeader: " ",
    component: "step3",
    skills: ["sgds-pattern-page-templates", "sgds-pattern-block-templates"],
    desc: "Assembling full pages and layout blocks",
  },
  {
    stepHeader: " ",
    component: "step4",
    skill: "sgds-forms",
    desc: "Whenever a form is involved",
  },
  {
    stepHeader: " ",
    component: "step5",
    skill: "sgds-data-visualisation",
    desc: "Only for charts or dashboards",
  },
];

const existingSkills = [
  { name: "sgds-components", desc: "Building or modifying UI components" },
  { name: "sgds-utilities", desc: "Spacing, layout, and helper classes" },
  { name: "sgds-pattern-page-templates", desc: "Full-page layout work" },
  { name: "sgds-pattern-block-templates", desc: "Self-contained UI blocks" },
  { name: "sgds-forms", desc: "Any form-related work" },
  { name: "sgds-data-visualisation", desc: "Charts or dashboards only" },
];
</script>

<template>
  <div :class="$style.cards">

    <!-- New project -->
    <div :class="$style.card">
      <div :class="$style.cardHeader">
        <sgds-badge variant="success" outlined>New project</sgds-badge>
        <p :class="$style.cardTitle">Starting from scratch?</p>
        <p :class="$style.cardDesc">Work through these skills in order — each one builds on the last.</p>
      </div>
      <div :class="$style.cardBody">
        <sgds-table tableBorder>
          <sgds-table-row v-for="(step, index) in newProjectSteps" :key="step.component">
            <sgds-table-cell :class="$style.sequenceCell">
              <span :class="$style.sequenceBadge">{{ index + 1 }}</span>
            </sgds-table-cell>
            <sgds-table-cell :class="$style.codeCell">
              <div v-if="step.skills" :class="$style.codeStack">
                <CodeToken v-for="skill in step.skills" :key="skill" :label="skill" />
              </div>
              <CodeToken v-else :label="step.skill" />
            </sgds-table-cell>
            <sgds-table-cell :class="$style.labelCell">
              {{ step.desc }}
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </div>

    <!-- Existing app -->
    <div :class="$style.card">
      <div :class="$style.cardHeader">
        <sgds-badge variant="info" outlined>Existing app</sgds-badge>
        <p :class="$style.cardTitle">Already on SGDS v3?</p>
        <p :class="$style.cardDesc">Skip setup — jump to the skill that covers what you're building right now.</p>
      </div>
      <div :class="$style.skillGrid">
        <div v-for="skill in existingSkills" :key="skill.name" :class="$style.skillItem">
          <p :class="$style.skillName">{{ skill.name }}</p>
          <p :class="$style.skillDesc">{{ skill.desc }}</p>
        </div>
      </div>
    </div>

  </div>

  <!-- Tip -->
  <div :class="$style.tip">
    <sgds-icon name="lightbulb" size="md" :class="$style.tipIcon"></sgds-icon>
    <p :class="$style.tipText">
      Not sure where to start? Ask your AI to read the <code :class="$style.code">sgds-workflow</code> skill first — it will map out everything based on what you're building.
    </p>
  </div>
</template>

<style module>
.cards {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-sm);
  margin: var(--sgds-text-gap-md) 0;
}

.card {
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  overflow: hidden;
}

.cardHeader {
  background: var(--sgds-surface-raised);
  border-bottom: 1px solid var(--sgds-border-color-muted);
  padding: var(--sgds-component-padding-md) var(--sgds-component-padding-lg);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
}

.cardTitle {
  font-size: var(--sgds-font-size-4);
  font-weight: var(--sgds-font-weight-semibold);
  color: var(--sgds-heading-color-default);
  margin: var(--sgds-text-gap-xs) 0 0;
  line-height: 1.3;
}

.cardDesc {
  font-size: var(--sgds-font-size-2);
  color: var(--sgds-body-color-subtle);
  margin: 0;
  line-height: 1.5;
}

/* New project */
.cardBody {
  background: var(--sgds-surface-default);
  padding: var(--sgds-component-padding-md) var(--sgds-component-padding-lg);
}

.sequenceCell {
  text-align: center;
  width: var(--sgds-dimension-56);
}

.sequenceBadge {
  align-items: center;
  background: var(--sgds-surface-inverse);
  border-radius: 50%;
  color: var(--sgds-color-inverse);
  display: flex;
  font-size: var(--sgds-font-size-0);
  font-weight: var(--sgds-font-weight-regular);
  height: var(--sgds-dimension-24);
  justify-content: center;
  line-height: var(--sgds-line-height-16);
  width: var(--sgds-dimension-24);
}

.codeCell {
  width: 1%;
  white-space: nowrap;
}

.codeStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
}

.labelCell {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-1);
  line-height: 1.4;
}

/* Existing app — skill grid */
.skillGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--sgds-border-color-muted);
  border-top: none;
}

@media (max-width: 600px) {
  .skillGrid { grid-template-columns: 1fr; }
}

.skillItem {
  background: var(--sgds-surface-default);
  padding: var(--sgds-component-padding-sm) var(--sgds-component-padding-lg);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
}

.skillName {
  font-family: monospace;
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-medium);
  color: var(--sgds-heading-color-default);
  margin: 0;
  line-height: 1.4;
}

.skillDesc {
  font-size: var(--sgds-font-size-1);
  color: var(--sgds-body-color-subtle);
  margin: 0;
  line-height: 1.4;
}

/* Tip */
.tip {
  display: flex;
  align-items: flex-start;
  gap: var(--sgds-component-gap-sm);
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-md);
  padding: var(--sgds-component-padding-sm) var(--sgds-component-padding-md);
  margin-top: var(--sgds-text-gap-sm);
}

.tipIcon {
  color: var(--sgds-warning-color-default);
  flex-shrink: 0;
  margin-top: 2px;
}

.tipText {
  font-size: var(--sgds-font-size-2);
  color: var(--sgds-body-color-default);
  line-height: 1.55;
  margin: 0;
}

.code {
  font-family: monospace;
  font-size: 0.875em;
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  color: var(--sgds-body-color-default);
  padding: 1px 5px;
  border-radius: var(--sgds-border-radius-sm);
}
</style>
