<script setup lang="ts">
import PromptBox from "../ui/PromptBox.vue";
import {
  figmaPromptExamples,
  figmaPromptTips,
  promptContextRows,
  promptStructureRows,
  textPromptExamples,
  textPromptTips,
} from "../../data/ai-prompt-tips";
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:m-0">Prompting with SGDS agent skills</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        SGDS agent skills help an AI agent understand the design system. They tell the agent which components, utilities, layouts, and setup steps to use.
      </p>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        Agent skills do not replace your product context. The agent still needs to know the user task, business rules, hidden states, and what good output looks like. Treat prompting as a short conversation, not a one-prompt handoff.
      </p>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">What the agent can extract vs what you provide</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          SGDS agent skills give the agent reliable system knowledge, and tools like Figma MCP or codebase access can add live context. You still need to describe the intent and rules that only your team knows.
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

    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">A useful prompt has five parts</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          You do not need to write a long prompt. You need to give enough context for the agent to make the right SGDS decisions.
        </p>
      </div>

      <ul class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8">
        <li v-for="row in promptStructureRows" :key="row.tip" class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default">
          <strong>{{ row.tip }}:</strong> {{ row.detail }}
        </li>
      </ul>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Tips for text prompts</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          These tips work when you are starting from an idea, an existing codebase, or a written requirement.
        </p>
      </div>

      <ul class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8">
        <li v-for="row in textPromptTips" :key="row.tip" class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default">
          <strong>{{ row.tip }}:</strong> {{ row.detail }}
        </li>
      </ul>

      <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
        <PromptBox v-for="example in textPromptExamples" :key="example.label" :label="example.label" :prompt="example.prompt" />
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Tips for designers using Figma</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          Figma gives the agent visual structure. You still need to explain the behaviour and intent behind the design.
        </p>
      </div>

      <ul class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8">
        <li v-for="row in figmaPromptTips" :key="row.tip" class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default">
          <strong>{{ row.tip }}:</strong> {{ row.detail }}
          <a
            v-if="row.link"
            :href="row.link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="sgds:text-link-md sgds:leading-xs sgds:tracking-normal sgds:underline"
          >
            {{ row.link.label }}
          </a>
        </li>
      </ul>

      <div class="sgds:flex sgds:flex-col sgds:gap-component-xs">
        <PromptBox v-for="example in figmaPromptExamples" :key="example.label" :label="example.label" :prompt="example.prompt" />
      </div>
    </section>

  </div>
</template>
