---
layout: docs
title: Agent skills
description: SGDS agent skills give AI assistants task-specific instructions for building with the design system.
headerAlert:
  description: This AI section is still being developed. Please treat the content as contextual guidance only, as information may be largely incomplete and inaccurate at the time of reading.
  variant: danger
  icon: exclamation-circle-fill
---

<script setup>
import AiSkillsSetupSteps from "../.vitepress/components/ai/AiSkillsSetupSteps.vue";
import CodeToken from "../.vitepress/components/ui/CodeToken.vue";
import SkillsTable from "../.vitepress/components/ui/SkillsTable.vue";
</script>

<div class="sgds:flex sgds:flex-col sgds:gap-layout-lg sgds:w-full">
  <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
    <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:m-0">What are agent skills?</h2>
    <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        Agent skills are instruction files that help AI assistants work with SGDS in a consistent way. They explain which skills to read, which components and utilities to use, how SGDS pages are structured, and which rules to follow when generating design or code.
      </p>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        They work like task-specific operating guidance for your assistant. When you ask for an SGDS app, page, component, form, or content change, the assistant can use the relevant skill before it makes decisions.
      </p>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        If you are unsure where to start, begin with <CodeToken label="sgds-workflow" />. It maps the skill set and points the assistant to the right skill for the task.
      </p>
    </div>
  </section>

  <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
    <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">Why agent skills matter</h3>
    <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        AI assistants are strong at producing code quickly. They still need reliable context to choose the right component, token, layout, copy pattern, and implementation detail. Without that context, the output may look close while drifting from SGDS conventions.
      </p>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        SGDS agent skills make that context available at the point of work. They help the assistant use SGDS as the source of truth instead of inferring patterns from generic web examples.
      </p>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        For new applications, the workflow starts with <CodeToken label="sgds-getting-started" />. From there, the assistant moves between components, utilities, theming, templates, forms, data visualisation, and writing guidance based on the task.
      </p>
    </div>
  </section>

  <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
    <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">How agent skills work</h3>
    <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        Agent skills are plain markdown files written for AI assistants. Each skill describes when it applies, what to read next, which SGDS APIs or utilities matter, and what mistakes to avoid.
      </p>
      <ul class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
        <li class="sgds:m-0"><strong>Workflow guidance</strong>: when to use each skill and in what order</li>
        <li class="sgds:m-0"><strong>Component and utility references</strong>: SGDS web component APIs, slots, events, tokens, and utility classes</li>
        <li class="sgds:m-0"><strong>Page and block patterns</strong>: app shells, sections, full-page templates, and reusable layouts</li>
        <li class="sgds:m-0"><strong>Task rules</strong>: instructions for forms, theming, data visualisation, content, and common implementation checks</li>
      </ul>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        Agent skills are read by the assistant at query time. They do not add runtime dependencies to your product.
      </p>
    </div>
  </section>

  <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
    <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">What you can ask with agent skills installed</h3>
    <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        With the SGDS agent skills installed, you can describe the outcome you need and let the assistant select the relevant system guidance.
      </p>
      <ul class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
        <li class="sgds:m-0">"Build a sidebar dashboard layout using SGDS."</li>
        <li class="sgds:m-0">"Choose the right SGDS spacing utility between these cards."</li>
        <li class="sgds:m-0">"Review this form and align the validation with SGDS."</li>
        <li class="sgds:m-0">"Rewrite this page copy using the SGDS writing guide."</li>
      </ul>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        The result should still be reviewed by a human. Agent skills reduce avoidable mistakes by giving the assistant clearer SGDS rules before it acts.
      </p>
    </div>
  </section>

  <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
    <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">How to install SGDS agent skills</h3>
    <AiSkillsSetupSteps />
  </section>

  <section class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
    <div class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
      <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">Available SGDS agent skills</h3>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        Each skill covers a different part of SGDS. You do not need to memorise the full set. The assistant can read the relevant skill when the task calls for it.
      </p>
    </div>
    <SkillsTable />
  </section>

  <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
    <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">What agent skills cannot do</h3>
    <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        Agent skills guide the assistant. They do not replace product judgement, accessibility review, content review, or engineering review.
      </p>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        Treat AI output as a draft that starts closer to SGDS standards. Review the behaviour, visual fit, code quality, and content before shipping.
      </p>
    </div>
  </section>
</div>
