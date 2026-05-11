<script setup lang="ts">
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CodeToken from "../ui/CodeToken.vue";
import CopyCommand from "../ui/CopyCommand.vue";
import PromptBox from "../ui/PromptBox.vue";

const beforeStartSteps = [
  { number: 1, title: "Install and configure your AI agent" },
  { number: 2, title: "Install SGDS web component package" },
  { number: 3, title: "Install SGDS agent skills" },
];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg sgds:w-full">
    <section class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-normal sgds:m-0">Choose your AI workflow</h2>
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Use AI to build SGDS interfaces from prompts, Figma designs, or existing code. Start by choosing your project context, then follow the workflow for your role.
        </p>
        <div class="sgds:grid sgds:grid-cols-2 sgds:max-md:grid-cols-1 sgds:gap-layout-md" aria-label="Project starting point">
          <sgds-icon-card class="sgds:h-full">
            <sgds-icon slot="icon" name="rocket" size="xl" class="sgds:text-primary-default" aria-hidden="true" />
            <span slot="title">New project</span>
            <span slot="description">Create a new product, prototype, or service from scratch.</span>
          </sgds-icon-card>
          <sgds-icon-card class="sgds:h-full">
            <sgds-icon slot="icon" name="arrow-repeat" size="xl" class="sgds:text-primary-default" aria-hidden="true" />
            <span slot="title">Existing project</span>
            <span slot="description">Adopt SGDS in an existing product, or improve an existing SGDS interface.</span>
          </sgds-icon-card>
        </div>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Before you start</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        Set up your AI agent and SGDS dependencies before using these journeys.
      </p>

      <AiInstructionStepper :steps="beforeStartSteps">
        <template #step-1>
          <p>Choose your AI agent, such as Claude Code, Codex, Cursor, or another compatible AI tool. Follow the tool documentation for installation and setup.</p>
        </template>

        <template #step-2>
          <p>Run the following command if you have not installed SGDS components:</p>
          <CopyCommand command="npm i @govtechsg/sgds-web-component" />
        </template>

        <template #step-3>
          <p>Run the following command to install the skills:</p>
          <CopyCommand command="npx skills add govtechsg/sgds-web-component" />
          <p>Select all existing skills from the list. This pulls the latest skills from the <CodeToken label="skills/" /> folder of this repository into your local <CodeToken label=".agents/" /> directory, where compatible AI tools automatically pick them up.</p>
        </template>
      </AiInstructionStepper>

      <sgds-alert class="sgds:mt-layout-sm" show variant="success" outlined>
        <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
        <div>You only need to complete this setup once. Once everything is in place, your AI agent will have the context it needs to work with SGDS. Prompt it and it will know what to do.</div>
      </sgds-alert>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-normal sgds:m-0">Get started</h2>
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            To get started with a new project:
          </p>
          <ul class="sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
            <li><a href="#new-prompt-code">Text prompt to code with SGDS skills</a></li>
            <li><a href="#new-figma-code">Moving from Figma to code</a></li>
          </ul>
        </div>

        <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            To get started with an existing project:
          </p>
          <ul class="sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
            <li><a href="#existing-code-migration">Prompt-to-code with SGDS migration skills</a></li>
            <li><a href="#existing-figma-code">Figma to code</a></li>
          </ul>
        </div>
      </div>
    </section>

    <section id="new-project" class="sgds:flex sgds:flex-col sgds:gap-layout-md sgds:w-full">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
        <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-normal sgds:m-0">New project</h2>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Use this path when you are starting from a blank codebase, early prototype, or new service journey.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Choose <strong>prompt-to-code</strong> when you want to move quickly from intent to working interface.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Choose <strong>Figma-to-code</strong> when visual review, layout precision, or stakeholder alignment matters before implementation.
        </p>
      </div>

      <sgds-tab-group>
        <sgds-tab slot="nav" panel="new-prompt-code" active>Prompt-to-code</sgds-tab>
        <sgds-tab slot="nav" panel="new-figma-code">Figma-to-code</sgds-tab>

        <sgds-tab-panel id="new-prompt-code" name="new-prompt-code" class="sgds:pt-layout-md">
          <article class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <div>
              <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">Prompt-to-code with SGDS skills</h3>
            </div>
            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
                Use this workflow when you want to generate working SGDS code directly from a product requirement, user flow, wireframe, or page description.
              </p>
              <ol class="sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:m-0 sgds:pl-[var(--sgds-padding-xl)] sgds:text-subtle">
                <li>Describe the page, flow, or component you want to build.</li>
                <li>Ask your AI coding tool to use the relevant SGDS skills.</li>
                <li>Start with <CodeToken label="sgds-getting-started" /> to set up the project correctly.</li>
                <li>Use SGDS component, utility, form, block, and template skills as the interface grows.</li>
                <li>Review the output against SGDS guidance before shipping.</li>
              </ol>
              <PromptBox prompt="Create a new SGDS application for a service request dashboard. Use SGDS web components, SGDS utilities, and the SGDS application shell. Include a sidebar, summary cards, a filterable table, and an empty state." />
            </div>
          </article>
        </sgds-tab-panel>

        <sgds-tab-panel id="new-figma-code" name="new-figma-code" class="sgds:pt-layout-md">
          <article class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <div>
              <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">Figma-to-code with SGDS libraries</h3>
            </div>
            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
                Use this workflow when visual review, layout precision, or stakeholder alignment needs to happen before implementation.
              </p>
              <ol class="sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:m-0 sgds:pl-[var(--sgds-padding-xl)] sgds:text-subtle">
                <li>Start from the SGDS Figma libraries.</li>
                <li>Compose the screen using SGDS components and styles.</li>
                <li>Use Figma MCP to send the selected design from Figma to code.</li>
                <li>Ask the AI coding tool to implement the design using SGDS web components and utilities.</li>
              </ol>
              <PromptBox prompt="Implement this Figma screen using SGDS web components and SGDS utilities. Match the layout closely, reuse existing SGDS components where possible, and flag anything that does not have a direct SGDS match." />
            </div>
          </article>
        </sgds-tab-panel>
      </sgds-tab-group>
    </section>

    <section id="existing-project" class="sgds:flex sgds:flex-col sgds:gap-layout-md sgds:w-full">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
        <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-normal sgds:m-0">Existing project</h2>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Use this path when you already have a codebase, product, or interface that needs to adopt SGDS or improve its SGDS alignment.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Choose <strong>code migration</strong> when you are working inside an existing codebase and need to move existing UI towards SGDS.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Choose <strong>Figma-to-code</strong> when visual review, layout precision, or stakeholder alignment matters before implementation.
        </p>
      </div>

      <sgds-tab-group>
        <sgds-tab slot="nav" panel="existing-code-migration" active>Code migration</sgds-tab>
        <sgds-tab slot="nav" panel="existing-figma-code">Figma-to-code</sgds-tab>

        <sgds-tab-panel id="existing-code-migration" name="existing-code-migration" class="sgds:pt-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <sgds-alert show variant="warning" outlined>
              <sgds-icon slot="icon" name="exclamation-triangle"></sgds-icon>
              <div>SGDS migration skills are still in progress. Until they are ready, use the SGDS component, utility, form, block, and template skills as references during migration.</div>
            </sgds-alert>

            <article class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <div>
              <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">Code migration with SGDS skills</h3>
            </div>
            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
                Use this workflow when you need to refactor existing pages, replace custom UI with SGDS components, or migrate an interface towards SGDS standards.
              </p>
              <ol class="sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:m-0 sgds:pl-[var(--sgds-padding-xl)] sgds:text-subtle">
                <li>Share the relevant page, component, or codebase context with the AI tool.</li>
                <li>Ask it to assess the current implementation against SGDS patterns.</li>
                <li>Use the SGDS migration skills when they are available.</li>
                <li>Replace custom UI with SGDS components where appropriate.</li>
                <li>Preserve existing behaviour unless the migration requires a change.</li>
                <li>Build and test the updated page before review.</li>
              </ol>
              <PromptBox prompt="Review this existing form page and migrate it to SGDS. Replace custom inputs, buttons, alerts, and layout styles with SGDS web components and utilities. Keep the current validation behaviour unless it conflicts with SGDS guidance." />
            </div>
            </article>
          </div>
        </sgds-tab-panel>

        <sgds-tab-panel id="existing-figma-code" name="existing-figma-code" class="sgds:pt-layout-md">
          <article class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <div>
              <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">Figma-to-code for existing projects</h3>
            </div>
            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
                Use this workflow when the existing product needs design review before implementation.
              </p>
              <ol class="sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:m-0 sgds:pl-[var(--sgds-padding-xl)] sgds:text-subtle">
                <li>Recreate or update the screen in Figma using SGDS libraries.</li>
                <li>Keep existing product constraints visible in the design.</li>
                <li>Use Figma MCP to send the design to code.</li>
                <li>Ask the AI coding tool to implement the update within the existing codebase.</li>
              </ol>
              <PromptBox prompt="Implement this updated Figma design in the existing project. Use SGDS web components and SGDS utilities. Preserve existing routes, data handling, and business logic unless the design requires a change." />
            </div>
          </article>
        </sgds-tab-panel>
      </sgds-tab-group>
    </section>

  </div>
</template>
