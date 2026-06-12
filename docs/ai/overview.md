---
layout: docs
title: Overview
description: AI coding assistants can use SGDS agent skills for clearer design system context. Here is how to set them up.
---

## What are agent skills?

If you have ever asked an AI assistant to help you build something, you may have received code that almost works: wrong component names, made-up class names, or outdated patterns.

**Agent skills help with that.** They are a set of instruction files you install into your project. Compatible AI coding tools can read them for clearer SGDS context, including the right components, tokens, utilities, and patterns.

If you're unsure where to begin, start with <code>sgds-workflow</code>. It maps the full SGDS skill set and points you to the right skill for the task at hand.

Once installed, you can ask things like:

<div class="example-prompts">
  <div class="example-prompt">💬 "Build a sidebar dashboard layout using SGDS"</div>
  <div class="example-prompt">💬 "What spacing utility class should I use between these cards?"</div>
  <div class="example-prompt">💬 "How do I prevent a modal from closing when clicking the background?"</div>
</div>

The assistant still needs human review, but it starts with SGDS-specific context instead of relying on generic web examples.

Use these skills with compatible AI coding tools that can read local agent skill files.

## Installation

It takes one command. Run it in your project root:
<CopyCommand command="npx skills add govtechsg/sgds-web-component" />
When prompted, select all SGDS skills from the list. This creates a local `.agents/` folder that compatible AI coding tools can read from your project.

## Available skills

Each skill covers a different area of SGDS. You do not need to remember what is in them. The assistant can read the relevant skill when the task calls for it.

<SkillsTable />

## Where do I start?

<AiWorkflowPaths />

## How it works

Skills are plain Markdown files written for AI assistants. The assistant reads them at query time. They do not add runtime code or dependencies to your product.

Each skill includes:

- A **quick decision guide** — helps the AI pick the right component or token
- An **API summary** — attributes, slots, and events in compact tables
- **Usage examples** — real HTML the AI can produce and adapt
- **Rules for AI agents** — explicit dos and don'ts to avoid common mistakes

## Keeping skills up to date

After upgrading `@govtechsg/sgds-web-component`, refresh the SGDS skills installed in your project:
<CopyCommand command="npx skills update --project -y" />

<style scoped>
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
