<script setup lang="ts">
import AiInstructionStepper from "./AiInstructionStepper.vue";
import SectionHeader from "../foundations/SectionHeader.vue";
import CodeToken from "../ui/CodeToken.vue";
import CodeBlock from "../ui/CodeBlock.vue";
import { migrationSteps } from "../../data/ai-prompt-tips";

const beforeStartSteps = [
  { number: 1, title: "Set up a coding tool" },
  { number: 2, title: "Install the SGDS package" },
  { number: 3, title: "Add SGDS agent skills" },
];

const newProjectInstructionSteps = [
  { number: 1, title: "Describe what you want to build" },
  { number: 2, title: "Start from the SGDS workflow skill" },
  { number: 3, title: "Generate the SGDS implementation" },
  { number: 4, title: "Review and refine the output" },
];

const developmentWorkflowCards = [
  {
    icon: "rocket",
    title: "New project",
    description: "You are starting a new product or service and want SGDS to be the design system from the start.",
    href: "#new-project",
  },
  {
    icon: "arrow-repeat",
    title: "Existing project",
    description: "You have an existing codebase or implemented interface and want to adopt SGDS components, utilities, and layout guidance.",
    href: "#existing-project",
  },
];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg sgds:w-full">
    <div class="sgds:flex sgds:flex-col">
      <section class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
        <SectionHeader title="Build with SGDS in code" />
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Use this page when you are building or improving SGDS code with an AI coding tool. Start with a new SGDS project, or use an existing codebase that needs to adopt SGDS components, utilities, and layout guidance.
        </p>
        <div class="sgds-grid sgds:gap-layout-md">
          <sgds-icon-card
            v-for="card in developmentWorkflowCards"
            :key="card.title"
            stretchedLink
            class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-6 sgds:h-full"
          >
            <sgds-icon slot="icon" :name="card.icon" size="3-xl" class="sgds:text-primary-default" aria-hidden="true" />
            <span slot="title">{{ card.title }}</span>
            <span slot="description">{{ card.description }}</span>
            <sgds-link slot="footer">
              <a :href="card.href" :aria-label="`Go to ${card.title} section`">{{ card.title }}</a>
            </sgds-link>
          </sgds-icon-card>
        </div>
      </div>
      </section>

      <sgds-divider class="sgds:my-layout-sm"></sgds-divider>

      <section class="sgds:flex sgds:flex-col sgds:gap-text-sm">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Before you start</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        Set up your AI coding tool, SGDS package, and SGDS skills before using these workflows.
      </p>

      <AiInstructionStepper :steps="beforeStartSteps" class="sgds:mt-layout-xs">
        <template #step-1>
          <p>Choose a compatible AI coding tool, such as Claude Code, Codex, Cursor, or another tool that can read your project and run local commands. Follow the tool documentation for installation and project setup.</p>
        </template>

        <template #step-2>
          <p>Run the following command if you have not installed SGDS components:</p>
          <CodeBlock code="npm i @govtechsg/sgds-web-component" lang="bash" />
        </template>

        <template #step-3>
          <p>Run the SGDS skills installer in your project root:</p>
          <CodeBlock code="npx skills add govtechsg/sgds-web-component" lang="bash" />
          <p>Select all SGDS skills when prompted. This creates a local <CodeToken label=".agents/" /> folder with SGDS guidance for setup, components, utilities, templates, forms, and writing. Compatible AI tools can use this guidance when you ask them to build or review SGDS code.</p>
          <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
            <CodeBlock prompt code="Read sgds-workflow first, then use the SGDS skills in this repository to create a sidebar dashboard with SGDS web components and SGDS utility classes." />
          </div>
        </template>
      </AiInstructionStepper>

      </section>
    </div>

    <section id="new-project" class="sgds:flex sgds:flex-col sgds:gap-layout-md sgds:w-full">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
        <SectionHeader title="New project" />
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Use this path when you are starting a new product or service and want SGDS to be the design system from the start.
        </p>
      </div>

      <sgds-alert show variant="info" outlined title="Have Figma screens already?">
        <div>Use <sgds-alert-link href="/ai/figma-and-code-workflows" ariaLabel="Go to Figma workflows page">Figma workflows</sgds-alert-link> instead if you are building from an existing Figma screen or using Figma MCP to move designs into code.</div>
      </sgds-alert>

      <article class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
        <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            When kicking off a new project, give the agent a clear setup instruction upfront and a few things to keep in mind:
          </p>
          <ul class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
            <li class="sgds:m-0"><strong>Specify your framework.</strong> Use React, Vue, Angular, or plain HTML.</li>
            <li class="sgds:m-0"><strong>Say "sole design system".</strong> This prevents the agent from mixing in other UI libraries.</li>
          </ul>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            The agent will handle installation, setup, and make sure all UI uses SGDS components and utilities from the start.
          </p>
        </div>

        <CodeBlock prompt code="Set up a new frontend app using [your framework]. Run npm install @govtechsg/sgds-web-component and install the skills with npx skills add govtechsg/sgds-web-component. Use SGDS as the sole design system for the application.">
          Set up a new frontend app using
          <CodeToken label="[your framework]" wrap />.
          Run
          <CodeToken label="npm install @govtechsg/sgds-web-component" wrap />
          and install the skills with
          <CodeToken label="npx skills add govtechsg/sgds-web-component" wrap />.
          Use SGDS as the sole design system for the application.
        </CodeBlock>
      </article>

      <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <AiInstructionStepper :steps="newProjectInstructionSteps">
          <template #step-1>
            <p>
              Write the prompt in terms of the user flow, page purpose, content, and key interactions. You do not need to know SGDS component names, but you should describe the interface clearly enough for the AI coding tool to choose the right SGDS patterns.
            </p>
            <ol class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              <li class="sgds:m-0">State the product or service context.</li>
              <li class="sgds:m-0">Describe the page, flow, or component you need.</li>
              <li class="sgds:m-0">Include required content, states, interactions, and responsive behaviour.</li>
              <li class="sgds:m-0">Ask for SGDS components, SGDS utilities, and accessible markup.</li>
            </ol>
            <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
              <CodeBlock prompt code="Create an SGDS login page for a government service. Include email and password fields, a submit button, validation states, and accessible form labels." />
              <CodeBlock prompt code="Create an SGDS dashboard with sidebar navigation, summary cards, filters, a data table, loading state, and empty state." />
              <CodeBlock prompt code="Create a multi-step SGDS application form with a stepper, applicant details, supporting documents, review, and submission states." />
            </div>
          </template>

          <template #step-2>
            <p>
              Ask the AI coding tool to read <CodeToken label="sgds-workflow" /> first. It points the tool to the right SGDS skill for each part of the task.
            </p>
            <ol class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              <li class="sgds:m-0">For a new app, begin with <CodeToken label="sgds-getting-started" /> before writing page code.</li>
              <li class="sgds:m-0">For UI elements, check <CodeToken label="sgds-components" /> before creating custom markup.</li>
              <li class="sgds:m-0">For spacing, layout, typography, and colours, use <CodeToken label="sgds-utilities" /> and <CodeToken label="sgds:" /> classes.</li>
              <li class="sgds:m-0">For full pages or reusable sections, use <CodeToken label="sgds-templates" /> and <CodeToken label="sgds-blocks" />.</li>
            </ol>
            <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
              <CodeBlock prompt code="Read sgds-workflow first. Then build a sidebar dashboard layout using SGDS components, utilities, and the recommended app layout." />
            </div>
          </template>

          <template #step-3>
            <p>
              Ask the AI coding tool to create the implementation using SGDS setup, components, utilities, and app layout rules.
            </p>
            <ol class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              <li class="sgds:m-0">Add Inter in the HTML <CodeToken label="<head>" /> before SGDS CSS.</li>
              <li class="sgds:m-0">Import <CodeToken label="themes/day.css" />, <CodeToken label="css/sgds.css" />, and <CodeToken label="css/utility.css" /> in that order from a CSS file processed by Tailwind.</li>
              <li class="sgds:m-0">Import <CodeToken label="@govtechsg/sgds-web-component" /> once in the app entry point.</li>
              <li class="sgds:m-0">Use the SGDS app shell with <CodeToken label=".sgds-container" /> or <CodeToken label=".sgds-container-sidebar" />.</li>
              <li class="sgds:m-0">Use <CodeToken label="<sgds-*>" /> components and <CodeToken label="sgds:" /> utility classes instead of custom CSS where possible.</li>
            </ol>
            <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
              <CodeBlock prompt code="Create a new SGDS application for a service request dashboard. Complete the SGDS setup first, then use SGDS web components, SGDS utility classes, and the SGDS application shell. Include a sidebar, summary cards, a filterable table, and an empty state." />
            </div>
          </template>

          <template #step-4>
            <p>
              Check that the generated code uses SGDS v3 components correctly, follows project conventions, and works across the intended desktop and mobile views.
            </p>
            <ol class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              <li class="sgds:m-0">Run your test suite to check for regressions.</li>
              <li class="sgds:m-0">Do a visual pass in a browser on desktop and mobile.</li>
              <li class="sgds:m-0">Compare against any product brief, wireframe, or Figma design for remaining gaps.</li>
            </ol>
            <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
              <CodeBlock prompt code="Review the generated page against SGDS guidance. Flag any incorrect components, missing states, spacing issues, or accessibility gaps before making changes." />
            </div>
          </template>
        </AiInstructionStepper>

      </article>
    </section>

    <section id="existing-project" class="sgds:flex sgds:flex-col sgds:gap-layout-md sgds:w-full">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
        <SectionHeader title="Existing project" />
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Use this path when you already have a codebase, product, or interface that needs to adopt SGDS or improve its SGDS alignment.
        </p>
      </div>

      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <sgds-alert show variant="info" outlined title="Have Figma screens already?">
          <div>Use <sgds-alert-link href="/ai/figma-and-code-workflows" ariaLabel="Go to Figma workflows page">Figma workflows</sgds-alert-link> instead if you are building from an existing Figma screen or using Figma MCP to move designs into code.</div>
        </sgds-alert>

        <sgds-alert show variant="warning" outlined title="Migration skills are in progress">
          <div>Until they are ready, use sgds-components, sgds-utilities, sgds-forms, sgds-blocks, and sgds-templates as references during migration.</div>
        </sgds-alert>

        <article class="sgds:flex sgds:flex-col sgds:gap-text-md">
          <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Improve or migrate existing UI</h3>
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
              Use this workflow when you need to refactor existing pages, replace custom UI with SGDS components, or migrate an interface towards SGDS standards.
            </p>
            <ol class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              <li class="sgds:m-0">Share the relevant page, component, or codebase context with the AI coding tool.</li>
              <li class="sgds:m-0">Ask it to check the SGDS setup, including CSS import order, utility CSS processing, and component registration.</li>
              <li class="sgds:m-0">Replace custom UI with SGDS components where appropriate, and use <CodeToken label="sgds:" /> utility classes for styling.</li>
              <li class="sgds:m-0">Use <CodeToken label="sgds-forms" /> for form validation and <CodeToken label="sgds-data-visualisation" /> if the page includes charts.</li>
              <li class="sgds:m-0">Preserve existing routes, data handling, and behaviour unless the migration requires a change.</li>
              <li class="sgds:m-0">Build and test the updated page before review.</li>
            </ol>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
              If you are upgrading an existing app, work <strong>incrementally</strong>. Change one component or section at a time.
            </p>
            <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                Start with this prompt:
              </p>
              <CodeBlock prompt code="I want to migrate my app to SGDS v3 incrementally." />
            </div>
            <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                Then build on it with these strategies:
              </p>

              <AiInstructionStepper :steps="migrationSteps">
                <template #step-1>
                  <p>Ask the agent to analyse your codebase first and produce a migration plan before touching any code:</p>
                  <CodeBlock prompt code="Analyse my codebase and generate a migration plan to SGDS v3 before making any changes." />
                </template>

                <template #step-2>
                  <p>Tell the agent to replace existing UI components with their SGDS equivalents, one by one:</p>
                  <CodeBlock prompt code="Replace the existing button component with &lt;sgds-button&gt;. Do not change anything else." />
                </template>

                <template #step-3>
                  <p>Ask the agent to swap your old design system's typography, spacing, and colour foundations with SGDS v3:</p>
                  <CodeBlock prompt code="Replace the old foundation styles (typography, spacing, colours) with SGDS v3 equivalents." />
                </template>

                <template #step-4>
                  <p>Request the agent to recommend the appropriate SGDS semantic CSS utility tokens to replace existing styles:</p>
                  <CodeBlock prompt code="Look at the components and recommend the appropriate SGDS semantic CSS utility tokens to replace existing styles, including inline styles, CSS classes, or old utility classes." />
                </template>
              </AiInstructionStepper>
            </div>
            <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
              <p class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">Putting it all together</p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                Use this prompt when you want the agent to review a page and migrate it safely:
              </p>
              <CodeBlock prompt code="Review this existing form page and migrate it to SGDS. Check the SGDS setup, replace custom inputs, buttons, alerts, and layout styles with SGDS web components and utilities where appropriate, and keep the current validation behaviour unless it conflicts with SGDS guidance." />
            </div>
          </div>
        </article>
      </div>
    </section>

  </div>
</template>
