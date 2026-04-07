---
layout: docs
title: Setup instructions
description: SGDS skills are knowledge packs that teach AI assistants how to use the design system correctly.
---

<script setup>
import AiSkillsSetupSteps from "../.vitepress/components/ai/AiSkillsSetupSteps.vue";
import SkillsTable from "../.vitepress/components/ui/SkillsTable.vue";
import AiWorkflowPaths from "../.vitepress/components/ai/AiWorkflowPaths.vue";
</script>

## Setup instructions

If you've ever asked an AI assistant to help you build something, you've probably gotten code that almost works — wrong component names, made-up class names, outdated patterns.

**Skills fix that.** They are a set of knowledge files you install once into your project. Your AI assistant reads them automatically and learns exactly how SGDS works — the right components, the right tokens, the right patterns.

Once installed, you can ask things like:

<div class="example-prompts">
  <div class="example-prompt">💬 "Build a sidebar dashboard layout using SGDS"</div>
  <div class="example-prompt">💬 "What spacing utility class should I use between these cards?"</div>
  <div class="example-prompt">💬 "How do I prevent a modal from closing when clicking the background?"</div>
</div>

And it will just work — no guessing, no wrong names, no hallucinations.

Works with **GitHub Copilot**, **Claude Code**, **Cursor**, **Windsurf**, and other AI coding tools.

<AiSkillsSetupSteps />

<h2 class="sgds:text-4 sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Available skills</h2>

Each skill covers a different area of SGDS. You don't need to remember what's in them — your AI reads them for you.

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
