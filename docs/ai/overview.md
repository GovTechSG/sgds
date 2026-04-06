---
layout: docs
title: Overview
description: AI coding assistants can write SGDS code for you — correctly, first time. Here's how to set them up.
---

## What are agent skills?

If you've ever asked an AI assistant to help you build something, you've probably gotten code that almost works — wrong component names, made-up class names, outdated patterns.

**Agent skills fix that.** They're a set of knowledge files you install once into your project. Your AI assistant reads them automatically and learns exactly how SGDS works — the right components, the right tokens, the right patterns.

Once installed, you can ask things like:

<div class="example-prompts">
  <div class="example-prompt">💬 "Build a sidebar dashboard layout using SGDS"</div>
  <div class="example-prompt">💬 "What spacing utility class should I use between these cards?"</div>
  <div class="example-prompt">💬 "How do I prevent a modal from closing when clicking the background?"</div>
</div>

And it will just work — no guessing, no wrong names, no hallucinations.

Works with **GitHub Copilot**, **Claude Code**, **Cursor**, **Windsurf**, and other AI coding tools.

## Installation

It takes one command. Run it in your project root:
<CopyCommand command="npx skills add govtechsg/sgds-web-component" />
When prompted, select all skills from the list. This creates a local `.agents/` folder that your AI tools pick up automatically.

## Available skills

Each skill covers a different area of SGDS. You don't need to remember what's in them — your AI reads them for you.

<SkillsTable />

## Where do I start?

<AiWorkflowPaths />

## How it works

Skills are plain Markdown files written for AI consumption. Your AI reads them at query time — they don't add any code or dependencies to your project.

Each skill includes:

- A **quick decision guide** — helps the AI pick the right component or token
- An **API summary** — attributes, slots, and events in compact tables
- **Usage examples** — real HTML the AI can produce and adapt
- **Rules for AI agents** — explicit dos and don'ts to avoid common mistakes

## Keeping skills up to date

After upgrading `@govtechsg/sgds-web-component`, run this to keep your AI's knowledge in sync:
<CopyCommand command="npx skills update" />

<style>
h2,
p,
ul,
li {
  margin: 0;
}

h2 {
  margin-top: var(--sgds-layout-gap-lg);
}

h2:first-of-type {
  margin-top: 0;
}

h2 + p {
  margin-top: var(--sgds-text-gap-sm);
}

p + p,
p + ul,
ul + p,
p + .example-prompts,
p + copy-command,
p + skills-table,
p + ai-workflow-paths,
.example-prompts + p {
  margin-top: var(--sgds-text-gap-sm);
}

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
