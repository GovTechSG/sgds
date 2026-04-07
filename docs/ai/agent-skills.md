---
layout: docs
title: Agent skills
description: SGDS skills are knowledge packs that teach AI assistants how to use the design system correctly.
---

<script setup>
import AiSkillsSetupSteps from "../.vitepress/components/ai/AiSkillsSetupSteps.vue";
import SkillsTable from "../.vitepress/components/ui/SkillsTable.vue";
</script>

<h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">What are agent skills?</h3>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
  <code>llms.txt</code> tells your AI what SGDS contains. Skills tell your AI how to use it.
</p>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
  Think of <code>llms.txt</code> as the ingredient list, and skills as the recipe.
</p>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
  Skills are markdown files that give your AI step-by-step instructions for working with SGDS — which components to reach for, which tokens and patterns to follow, and what good output looks like. You install them once into your project, and your AI reads them automatically from that point on.
</p>

<h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight section-heading">Why skills matter</h4>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
  If you've ever asked an AI to help you build something, you've probably seen the result: code that almost works — wrong component names, made-up class names, patterns that don't exist in your design system. The AI isn't being careless. It simply doesn't know how your system works.
</p>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
  Skills fix that. Once installed, your AI understands exactly how SGDS is structured without you having to explain it every time.
</p>

<h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight section-heading">How skills work</h4>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
  Skills are plain markdown files structured for AI consumption. Each skill contains:
</p>

<ul class="example-prompts">
  <li class="example-prompt"><strong>A quick decision guide</strong> — decision trees for choosing the right token or component variant</li>
  <li class="example-prompt"><strong>An API summary</strong> — compact attribute and property tables</li>
  <li class="example-prompt"><strong>Usage examples</strong> — idiomatic HTML the AI can produce and adapt</li>
  <li class="example-prompt"><strong>A "For AI agents" section</strong> — explicit rules and common mistakes to avoid</li>
</ul>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
  Skills are read by the agent at query time. They do not add runtime dependencies to your project.
</p>

<h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight section-heading">What you can do with skills installed</h4>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
  Instead of wrestling with your AI to get correct output, you can simply describe what you want to build:
</p>

<ul class="example-prompts">
  <li class="example-prompt">"Build a sidebar dashboard layout using SGDS"</li>
  <li class="example-prompt">"What spacing utility class should I use between these cards?"</li>
  <li class="example-prompt">"How do I prevent a modal from closing when clicking the background?"</li>
</ul>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
  Your AI will respond with accurate, SGDS-aligned answers — no guessing, no wrong names, no hallucinated components.
</p>

<h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight section-heading">How to install SGDS skills</h4>

<div class="section-block">
  <AiSkillsSetupSteps />
</div>

<h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight section-heading">Available SGDS skills</h4>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal skills-intro">
  Each skill covers a different area of SGDS. You don't need to remember what's in them — your AI reads them for you.
</p>

<div class="section-block">
  <SkillsTable />
</div>

<h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight section-heading">What skills can't do</h4>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
  Skills guide the agent. They rely on what's underneath — <code>llms.txt</code> points the AI to what exists, and the SGDS documentation gives it the detail. The richer both are, the better the skills perform.
</p>

<style>
  h2,
  h3,
  h4,
  p,
  ul,
  li {
    margin: 0;
  }

  p,
  li {
    color: var(--sgds-body-color-subtle);
  }

  .section-heading {
    margin-top: var(--sgds-layout-gap-lg);
  }

  .example-prompts {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-text-gap-xs);
    margin: var(--sgds-text-gap-md) 0;
    padding-left: var(--sgds-padding-lg);
  }

  p + p {
    margin-top: var(--sgds-text-gap-sm);
  }

  h2 + p,
  h3 + p,
  h4 + p {
    margin-top: var(--sgds-text-gap-sm);
  }

  .section-block {
    margin-top: var(--sgds-text-gap-sm);
  }

  .skills-intro {
    margin-bottom: var(--sgds-text-gap-lg);
}
</style>
