<script setup lang="ts">
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg sgds:w-full">
    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:w-full">
      <div class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:w-full">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">The role of AI in design systems</h3>
      </div>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
        AI is changing how product teams work — not as a replacement for design or engineering judgment, but as a tool that accelerates both. It can generate interfaces, write code, and prototype ideas very quickly. AI can and does make mistakes — and a common reason is the lack of context. It generates based on what it has been given, and when that context is incomplete or unclear, it fills the gaps with its best guess. The output may look right but drift from how your product is actually meant to work.
      </p>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:w-full">
      <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">AI generates output. It doesn't generate understanding.</h3>
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-md)] sgds:w-full">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          AI can generate a button in seconds. But it won't know that the same button should look different inside an alert, or behave differently inside a card. It won't know your spacing rules, your colour conventions, or the decisions your team made about how things should work. That design knowledge has to come from somewhere — <strong>and that somewhere is a design system.</strong>
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          When AI produces unexpected output, it is often less a failure of the model and more a reflection of what it had to work from. The more complete and consistent the foundation, the less it needs to guess. Without one, those gaps compound quickly. The more you build with AI, the faster inconsistencies accumulate.
        </p>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:w-full">
      <div class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:w-full">
        <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Why system quality matters when teams build with AI</h3>
        <a href="#why-system-quality-matters-when-teams-build-with-ai" class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:text-subtle sgds:no-underline" aria-label="Link to section">
          <sgds-icon name="link-45deg" size="sm"></sgds-icon>
        </a>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-md)] sgds:w-full">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          There's a meaningful difference between a design system a product team builds for themselves and one that is built and maintained by a dedicated team across an organisation. The components might look similar from the outside, but the model is different.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          When a centralised team maintains the system, every improvement flows downstream. A component gets refined, an accessibility issue gets fixed, a pattern gets updated — and every product built on that system picks it up. The work done once benefits many. That's a fundamentally different proposition from each team maintaining their own, where the same problems get solved independently and the same gaps quietly accumulate in parallel.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          Some teams work from a component library rather than a full design system. A component library provides reusable building blocks such as buttons, inputs, cards, but leaves the decisions about how to combine them, when to use which pattern, and what conventions to follow largely up to the individual team. This works well enough in many contexts, but the absence of shared guidance becomes more visible as teams grow, workflows change, and AI enters the picture. An AI working from a component library has the parts but not the logic. It assembles them in ways that look plausible but may not reflect how your team actually builds.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          A design system also does not guarantee good AI output on its own. If parts of the system are undocumented, inconsistent, or outdated, AI has no way of knowing that. It simply works with what is there and treats it as the full picture. In that sense, AI often surfaces the state of the system itself. If the output looks inconsistent or off, it usually points to something that was already unclear in the system, rather than a problem with the AI alone. For teams working at scale or using AI frequently, those weaknesses tend to show up quickly, and the cost of resolving them often falls back onto product teams.
        </p>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:w-full">
      <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">What this means for teams building with us</h3>
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-md)] sgds:w-full">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          For teams using our design system, this plays out in a practical way. We provide a ready foundation already aligned to the Digital Service Standards and maintained centrally — so teams can focus on building. We've introduced AI support to keep pace with how teams are using AI. In practice, this means:
        </p>
        <ul class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
          <li><strong>More consistent outputs across your product</strong> — AI works from the same components and patterns, so what gets generated holds together across teams and touchpoints</li>
          <li><strong>Less time fixing AI-generated work</strong> — when the rules are already defined and accessible, AI is less likely to guess wrong</li>
          <li><strong>Faster workflows from idea to implementation</strong> — the foundation is already in place, so teams spend time building, not deciding how to build or fixing UI that drifted from the standard</li>
          <li><strong>Confidence that what you build meets expected standards</strong> — accessibility requirements and government design standards are built into the system, not added later</li>
        </ul>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:w-full">
      <div class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:w-full">
        <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">How we are evolving for AI</h3>
        <a href="#how-sgds-is-evolving-for-ai" class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:text-subtle sgds:no-underline" aria-label="Link to section">
          <sgds-icon name="link-45deg" size="sm"></sgds-icon>
        </a>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-md)] sgds:w-full">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          As AI becomes part of everyday workflows, design systems need to work not just for people, but for AI as well. They have to be clear, structured, and complete enough to guide both human decisions and AI-generated outputs.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          The role of a dedicated design system team becomes more consequential in this context. Keeping a shared system current is what allows product teams to build without having to resolve foundational questions themselves. When that maintenance slips, the consequences tend to surface quickly, particularly when AI is involved.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:text-subtle">
          We are evolving with this shift. The work is ongoing and we're continuing to build a system that works for the way teams work now — so that when you reach for AI, what gets built back is consistent, considered, and worth shipping.
        </p>
      </div>
    </section>
  </div>
</template>
