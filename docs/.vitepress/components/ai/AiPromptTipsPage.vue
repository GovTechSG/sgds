<script setup lang="ts">
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CodeToken from "../ui/CodeToken.vue";
import PromptBox from "../ui/PromptBox.vue";
import {
  figmaPromptExamples,
  figmaPromptTips,
  migrationSteps,
  promptContextRows,
  promptStructureRows,
  textPromptExamples,
  textPromptTips,
} from "../../data/ai-prompt-tips";
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:m-0">Prompting with SGDS skills</h3>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        SGDS skills help an AI agent understand the design system. They tell the agent which components, utilities, layouts, and setup steps to use.
      </p>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        Skills do not replace your product context. The agent still needs to know the user task, business rules, hidden states, and what good output looks like. Treat prompting as a short conversation, not a one-prompt handoff.
      </p>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-2-xs)]">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">What the agent can extract vs what you provide</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          SGDS skills give the agent reliable system knowledge, and tools like Figma MCP or codebase access can add live context. You still need to describe the intent and rules that only your team knows.
        </p>
      </div>

      <sgds-table tableBorder headerBackground responsive="always" class="sgds:box-border sgds:w-full sgds:max-w-full">
        <sgds-table-row>
          <sgds-table-head class="sgds:box-border sgds:w-1/2">The agent can extract</sgds-table-head>
          <sgds-table-head class="sgds:box-border sgds:w-1/2">You need to describe</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row v-for="row in promptContextRows" :key="row.agentCanExtract">
          <sgds-table-cell class="sgds:box-border sgds:w-1/2">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default">{{ row.agentCanExtract }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="sgds:box-border sgds:w-1/2">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default">{{ row.userNeedsToDescribe }}</span>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-2-xs)]">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">A useful prompt has five parts</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          You do not need to write a long prompt. You need to give enough context for the agent to make the right SGDS decisions.
        </p>
      </div>

      <ul class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
        <li v-for="row in promptStructureRows" :key="row.tip" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default">
          <strong>{{ row.tip }}:</strong> {{ row.detail }}
        </li>
      </ul>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-2-xs)]">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">Tips for text prompts</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          These tips work when you are starting from an idea, an existing codebase, or a written requirement.
        </p>
      </div>

      <ul class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
        <li v-for="row in textPromptTips" :key="row.tip" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default">
          <strong>{{ row.tip }}:</strong> {{ row.detail }}
        </li>
      </ul>

      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
        <p class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">Example text prompts</p>
        <PromptBox v-for="example in textPromptExamples" :key="example.label" :label="example.label" :prompt="example.prompt" />
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-2-xs)]">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">Tips for designers using Figma</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          Figma gives the agent visual structure. You still need to explain the behaviour and intent behind the design.
        </p>
      </div>

      <ul class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
        <li v-for="row in figmaPromptTips" :key="row.tip" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default">
          <strong>{{ row.tip }}:</strong> {{ row.detail }}
        </li>
      </ul>

      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
        <p class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">Example Figma prompts</p>
        <PromptBox v-for="example in figmaPromptExamples" :key="example.label" :label="example.label" :prompt="example.prompt" />
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">Starter workflows</h4>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        Use these prompts when you are ready for the agent to act.
      </p>

      <sgds-tab-group class="sgds:block sgds:w-full" variant="underlined">
        <sgds-tab slot="nav" panel="new-app" active>Starting a new application</sgds-tab>
        <sgds-tab slot="nav" panel="migrating-app">Migrating an existing app to SGDS v3</sgds-tab>

        <sgds-tab-panel name="new-app">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
              When kicking off a new project, give the agent a clear setup instruction upfront:
            </p>

            <PromptBox prompt="Set up a new frontend app using [your framework]. Run npm install @govtechsg/sgds-web-component and install the skills with npx skills add govtechsg/sgds-web-component. Use SGDS as the sole design system for the application.">
              Set up a new frontend app using
              <CodeToken label="[your framework]" wrap />.
              Run
              <CodeToken label="npm install @govtechsg/sgds-web-component" wrap />
              and install the skills with
              <CodeToken label="npx skills add govtechsg/sgds-web-component" wrap />.
              Use SGDS as the sole design system for the application.
            </PromptBox>

            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                A few things to keep in mind:
              </p>
              <ul class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <li><strong>Specify your framework.</strong> Use React, Vue, Angular, or plain HTML.</li>
                <li><strong>Say "sole design system".</strong> This prevents the agent from mixing in other UI libraries.</li>
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
              If you are upgrading an existing app, work <strong>incrementally</strong>. Change one component or section at a time.
            </p>

            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                Start with this prompt:
              </p>
              <PromptBox prompt="I want to migrate my app to SGDS v3 incrementally." />
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                Then build on it with these strategies:
              </p>

              <AiInstructionStepper :steps="migrationSteps">
                <template #step-1>
                  <p>Ask the agent to analyse your codebase first and produce a migration plan before touching any code:</p>
                  <PromptBox prompt="Analyse my codebase and generate a migration plan to SGDS v3 before making any changes." />
                </template>

                <template #step-2>
                  <p>Tell the agent to replace existing UI components with their SGDS equivalents, one by one:</p>
                  <PromptBox prompt="Replace the existing button component with &lt;sgds-button&gt;. Do not change anything else." />
                </template>

                <template #step-3>
                  <p>Ask the agent to swap your old design system's typography, spacing, and colour foundations with SGDS v3:</p>
                  <PromptBox prompt="Replace the old foundation styles (typography, spacing, colours) with SGDS v3 equivalents." />
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
                Here is an example prompt that combines everything for a full migration:
              </p>
              <PromptBox prompt="Plan an incremental migration to SGDS v3. For each page, suggest 1-to-1 swaps for components, replace old foundation styles with SGDS v3, and recommend SGDS utility tokens for any custom or legacy styles." />
            </div>
          </div>
        </sgds-tab-panel>
      </sgds-tab-group>
    </section>
  </div>
</template>
