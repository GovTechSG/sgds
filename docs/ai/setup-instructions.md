---
layout: docs
title: Setup instructions
description: SGDS skills are instruction files that give compatible AI coding tools clearer design system context.
---

<script setup>
import AiSkillsSetupSteps from "../.vitepress/components/ai/AiSkillsSetupSteps.vue";
import SkillsTable from "../.vitepress/components/ui/SkillsTable.vue";
import AiWorkflowPaths from "../.vitepress/components/ai/AiWorkflowPaths.vue";
</script>

## Setup instructions

If you have ever asked an AI assistant to help you build something, you may have received code that almost works: wrong component names, made-up class names, or outdated patterns.

**Skills help with that.** They are a set of instruction files you install into your project. Compatible AI coding tools can read them for clearer SGDS context, including the right components, tokens, utilities, and patterns.

Once installed, you can ask things like:

<div class="example-prompts">
  <div class="example-prompt">💬 "Build a sidebar dashboard layout using SGDS"</div>
  <div class="example-prompt">💬 "What spacing utility class should I use between these cards?"</div>
  <div class="example-prompt">💬 "How do I prevent a modal from closing when clicking the background?"</div>
</div>

The assistant still needs human review, but it starts with SGDS-specific context instead of relying on generic web examples.

Use these skills with compatible AI coding tools that can read local agent skill files.

<AiSkillsSetupSteps />

<h2 class="sgds:text-4 sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Available skills</h2>

Each skill covers a different area of SGDS. You do not need to remember what is in them. The assistant can read the relevant skill when the task calls for it.

<SkillsTable />

## Where do I start?

<AiWorkflowPaths />

<style>
.example-prompts {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
  margin: var(--sgds-text-gap-md) 0;
}
.example-prompt {
  background-color: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: 8px;
  padding: var(--sgds-component-padding-xs) var(--sgds-component-padding-sm);
  color: var(--sgds-body-color-default);
  font-size: var(--sgds-font-size-2);
}
</style>
