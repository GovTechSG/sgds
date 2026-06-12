---
layout: docs
title: LLMs.txt
description: This page explains what LLMs.txt is and how it helps AI tools understand SGDS.
---

<script setup>
import CodeToken from "../.vitepress/components/ui/CodeToken.vue";
</script>

<h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">What is LLMs.txt?</h3>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal body-copy">
  <code>llms.txt</code> is a plain-text file that gives AI tools a structured map of SGDS — what components exist, how they're organised, and where to find them. When your AI reads it, it has a clearer picture of SGDS before generating anything.
</p>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal body-copy intro-followup">
  Without it, AI tools guess. They may reach for the wrong component, invent tokens that don't exist, or miss patterns your team has established.
</p>

<h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight section-heading">How to use it</h4>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal body-copy context-copy">
  Tell your AI that you are using SGDS and ask it to read this file for context:
</p>

<div class="section-block">
  <CodeBlock prompt code="Read https://designsystem.tech.gov.sg/llms-full.txt and understand SGDS. Use this knowledge when writing code with SGDS">
    Read <CodeToken label="https://designsystem.tech.gov.sg/llms-full.txt" /> and understand SGDS. Use this knowledge when writing code with SGDS
  </CodeBlock>
</div>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal body-copy tools-copy">
  Works with GitHub Copilot, Claude Code, Codex, Cursor, Windsurf, and other AI coding tools.
</p>

<h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight section-heading">What LLMs.txt can't do</h4>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal body-copy">
  <code>llms.txt</code> gives your AI a map of SGDS — what exists and where to find it. But knowing what exists is different from knowing how to use it well. On its own, <code>llms.txt</code> can't tell your AI which component to use in a specific situation, how to combine patterns correctly, or what conventions your team follows. For that, you need agent skills — instruction files that tell your AI how to build with SGDS step by step.
</p>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal body-copy">
  <a href="/ai/skills">→ Learn about agent skills</a>
</p>

<style scoped>
  h3,
  h4,
  p {
    margin: 0;
  }

  .body-copy {
    color: var(--sgds-body-color-subtle);
  }

  .intro-followup {
    margin-top: var(--sgds-text-gap-xs);
  }

  .context-copy {
    margin-bottom: var(--sgds-text-gap-xs);
  }

  .tools-copy {
    margin-top: var(--sgds-text-gap-sm);
  }

  .section-heading {
    margin-top: var(--sgds-layout-gap-lg);
  }

  h3 + p,
  h4 + p {
    margin-top: var(--sgds-text-gap-sm);
  }

  p + p {
    margin-top: var(--sgds-text-gap-sm);
  }

  .section-block {
    margin-top: var(--sgds-text-gap-sm);
  }
</style>
