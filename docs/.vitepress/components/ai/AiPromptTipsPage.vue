<script setup lang="ts">
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CodeToken from "../ui/CodeToken.vue";
import PromptBox from "../ui/PromptBox.vue";

const migrationSteps = [
  { number: 1, title: "Always plan before you change" },
  { number: 2, title: "Swap components one at a time" },
  { number: 3, title: "Replace foundational styles" },
  { number: 4, title: "Suggest utility replacements" },
];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Write better prompts, get better code</h3>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        The way you phrase your instructions to an AI assistant makes a big difference. These tips help you get accurate, SGDS-aligned output whether you are starting a new project or migrating an existing app.
      </p>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Choose your workflow</h4>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        Use the workflow that matches your starting point.
      </p>

      <sgds-tab-group variant="underlined">
        <sgds-tab slot="nav" panel="new-app" active>Starting a new application</sgds-tab>
        <sgds-tab slot="nav" panel="migrating-app">Migrating an existing app to SGDS v3</sgds-tab>

        <sgds-tab-panel name="new-app">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
              When kicking off a new project, give the agent a clear setup instruction upfront:
            </p>

            <PromptBox prompt="Set up a new frontend app using [your framework]. Run npm install @govtechsg/sgds-web-component and install the skills with npx skills add govtechsg/sgds-web-component. Use SGDS as the sole design system for the application.">
              Set up a new frontend app using
              <CodeToken label="[your framework]" />.
              Run
              <CodeToken label="npm install @govtechsg/sgds-web-component" />
              and install the skills with
              <CodeToken label="npx skills add govtechsg/sgds-web-component" />.
              Use SGDS as the sole design system for the application.
            </PromptBox>

            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                A few things to keep in mind:
              </p>
              <ul class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <li><strong>Specify your framework</strong> — React, Vue, Angular, or plain HTML. The agent will scaffold accordingly.</li>
                <li><strong>Say "sole design system"</strong> — this prevents the agent from mixing in other UI libraries.</li>
              </ul>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:mt-[var(--sgds-text-gap-md)]">
                <br />
                The agent will handle installation, setup, and make sure all UI uses SGDS components and utilities from the start.
              </p>
            </div>
          </div>
        </sgds-tab-panel>

        <sgds-tab-panel name="migrating-app">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
              If you're upgrading an existing app, the key is to go <strong>incrementally</strong> — one component or section at a time — rather than trying to change everything at once.
            </p>

            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                Start with this prompt:
              </p>
              <PromptBox prompt="I want to migrate my app to SGDS V3 incrementally." />
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                Then build on it with these strategies:
              </p>

              <AiInstructionStepper :steps="migrationSteps">
                <template #step-1>
                  <p>Ask the agent to analyse your codebase first and produce a migration plan before touching any code:</p>
                  <PromptBox prompt="Analyse my codebase and generate a migration plan to SGDS V3 before making any changes." />
                </template>

                <template #step-2>
                  <p>Tell the agent to replace existing UI components with their SGDS equivalents, one by one:</p>
                  <PromptBox prompt="Replace the existing button component with &lt;sgds-button&gt;. Do not change anything else." />
                </template>

                <template #step-3>
                  <p>Ask the agent to swap your old design system's typography, spacing, and colour foundations with SGDS V3:</p>
                  <PromptBox prompt="Replace the old foundation styles (typography, spacing, colours) with SGDS V3 equivalents." />
                </template>

                <template #step-4>
                  <p>Request the agent to recommend the appropriate SGDS semantic CSS utility tokens to replace existing styles (inline styles, CSS classes, or old utility classes):</p>
                  <PromptBox prompt="Look at the components and recommend the appropriate SGDS semantic CSS utility tokens to replace existing styles (inline styles, CSS classes, or old utility classes)." />
                </template>
              </AiInstructionStepper>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)]">
              <p class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">Putting it all together</p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                Here's an example prompt that combines everything for a full migration:
              </p>
              <PromptBox prompt="Plan an incremental migration to SGDS V3. For each page, suggest 1-to-1 swaps for components, replace old foundation styles with SGDS V3, and recommend SGDS utility tokens for any custom or legacy styles." />
            </div>
          </div>
        </sgds-tab-panel>
      </sgds-tab-group>
    </section>
  </div>
</template>
