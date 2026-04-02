---
layout: docs
title: Prompt tips
description: Get better results from your AI coding assistant with these prompting tips for SGDS projects.
---

## Write Better Prompts, Get Better Code

The way you phrase your instructions to an AI assistant makes a big difference. These tips will help you get accurate, design-system-correct code whether you're starting fresh or migrating an existing app.

## Starting a New Application

When kicking off a new project, give the agent a clear setup instruction upfront:

> *"Set up a new frontend app using `[your framework]`. Run `npm install @govtechsg/sgds-web-component` and install the skills with `npx skills add govtechsg/sgds-web-component`. Use SGDS as the sole design system for the application."*

A few things to keep in mind:

- **Specify your framework** — React, Vue, Angular, or plain HTML. The agent will scaffold accordingly.
- **Say "sole design system"** — this prevents the agent from mixing in other UI libraries.
- The agent will handle installation, setup, and make sure all UI uses SGDS components and utilities from the start.

## Migrating an Existing App to SGDS V3

If you're upgrading an existing app, the key is to go **incrementally** — one component or section at a time — rather than trying to change everything at once.

Start with this prompt:

> *"I want to migrate my app to SGDS V3 incrementally."*

Then build on it with these strategies:

### Always plan before you change

Ask the agent to analyse your codebase first and produce a migration plan before touching any code:

> *"Analyse my codebase and generate a migration plan to SGDS V3 before making any changes."*

### Swap components one at a time

Tell the agent to replace existing UI components with their SGDS equivalents, one by one:

> *"Replace the existing button component with `<sgds-button>`. Do not change anything else."*

### Replace foundational styles

Ask the agent to swap your old design system's typography, spacing, and colour foundations with SGDS V3:

> *"Replace the old foundation styles (typography, spacing, colours) with SGDS V3 equivalents."*

### Replace custom styles with SGDS utility tokens

Instead of keeping inline styles or legacy CSS classes, ask the agent to suggest the right SGDS utility token for each:

> *"Recommend SGDS semantic CSS utility tokens to replace any inline styles, custom CSS classes, or old utility classes."*

## Putting It All Together

Here's an example prompt that combines everything for a full migration:

> *"Plan an incremental migration to SGDS V3. For each page, suggest 1-to-1 swaps for components, replace old foundation styles with SGDS V3, and recommend SGDS utility tokens for any custom or legacy styles."*

## Further Reading

- [Introduction](/ai/introduction)
- [AI landing page](/ai/)
