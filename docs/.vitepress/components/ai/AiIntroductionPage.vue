<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg sgds:w-full">
    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
      <div class="sgds:flex sgds:items-center sgds:gap-text-xs sgds:w-full">
        <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-normal sgds:m-0">The role of AI in design systems</h2>
      </div>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        AI is now part of everyday design and engineering work. Coding assistants and agents can read codebases, edit files, run commands, draft pull requests, and connect to tools such as Figma through integrations like MCP. These capabilities are useful, but they still depend on the context they receive. When that context is incomplete, the output may look plausible while drifting from how a product is meant to work.
      </p>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
      <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">AI needs a source of truth</h3>
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          An AI tool can generate a button quickly. It still needs to know which button to use, which token controls its spacing, how it behaves in different states, and which pattern it belongs to. That design knowledge needs to come from a reliable source.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          A design system gives AI that source of truth. It turns design decisions into components, tokens, patterns, documentation, and usage rules that both people and AI tools can reference. The clearer the system, the less the assistant needs to infer from examples or defaults.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          SGDS is built on a layered token architecture. Raw values, primitive tokens, semantic tokens, and component-specific tokens connect design intent to implementation. A token name describes the decision it represents, so an AI tool can work from meaning instead of copying visual values.
        </p>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
      <div class="sgds:flex sgds:items-center sgds:gap-text-xs sgds:w-full">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">Why system quality matters when teams build with AI</h3>
        <a href="#why-system-quality-matters-when-teams-build-with-ai" class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:text-subtle sgds:no-underline" aria-label="Link to section">
          <sgds-icon name="link-45deg" size="sm"></sgds-icon>
        </a>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          There is a meaningful difference between a local component set and a design system maintained for many teams. Both can provide reusable parts. A design system also defines how those parts work together, when to use them, and what standards they meet.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          When a central team maintains the system, improvements can flow downstream. A component gets refined, an accessibility issue gets fixed, or a pattern gets updated. Products built on that system can then pick up the improvement instead of solving the same problem separately.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          This matters more when teams use AI often. If an assistant only sees isolated examples, it may copy the surface of the interface without the underlying logic. If it can reference shared components, tokens, templates, and usage guidance, it has a better path to produce work that matches the system.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          A design system does not guarantee good AI output by itself. It needs to be documented, current, and accessible to the tools that teams use. When the system is unclear, AI tends to expose those gaps. When the system is structured well, AI can work from the same standards as the team.
        </p>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
      <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">What this means for teams building with us</h3>
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          SGDS gives teams a maintained foundation aligned to the Digital Service Standards. We are also making the system easier for AI tools to use through structured documentation and agent skills. In practice, this helps teams:
        </p>
        <ul class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
          <li><strong>Generate more consistent UI</strong> because AI works from the same components, tokens, and patterns</li>
          <li><strong>Reduce rework</strong> because the rules are available before code or design output is produced</li>
          <li><strong>Move from idea to implementation with clearer guardrails</strong> because common layouts, templates, and behaviours are already defined</li>
          <li><strong>Keep standards visible</strong> because accessibility and government design requirements are part of the system</li>
        </ul>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
      <div class="sgds:flex sgds:items-center sgds:gap-text-xs sgds:w-full">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">How we are evolving for AI</h3>
        <a href="#how-sgds-is-evolving-for-ai" class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:text-subtle sgds:no-underline" aria-label="Link to section">
          <sgds-icon name="link-45deg" size="sm"></sgds-icon>
        </a>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md sgds:w-full">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Design systems now need to serve both people and AI tools. They need clear documentation, machine-readable context, reliable examples, and guidance that explains how components and patterns should be used.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          We are evolving SGDS in that direction. The work includes clearer component guidance, reusable templates and blocks, and agent skills that help AI tools produce SGDS-aligned output.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          The goal is practical: when teams use AI, SGDS should help the output stay consistent, accessible, and aligned with how government digital services are built.
        </p>
      </div>
    </section>
  </div>
</template>
