---
layout: docs
title: What AI can do
description: See how AI can support designers, developers, and product managers when SGDS is the source of truth.
headerAlert:
  description: This AI section is still being developed. Please treat the content as contextual guidance only, as information may be largely incomplete and inaccurate at the time of reading.
  variant: danger
  icon: exclamation-circle-fill
---

<h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">For designers</h3>

<div class="ai-role-card">
  <p class="ai-role-title">Use AI to:</p>
  <ul class="ai-list">
    <li>Turn screens into structured handoff notes</li>
    <li>Generate interaction states (hover, error, loading)</li>
    <li>Identify missing accessibility considerations</li>
    <li>Suggest appropriate SGDS components for layouts</li>
    <li>Create content variations (labels, helper text, errors)</li>
  </ul>
  <p class="ai-example-label">Example</p>
  <p class="ai-example-copy">“Review this screen and list missing states using SGDS patterns.”</p>
</div>

<h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">For developers</h2>

<div class="ai-role-card">
  <p class="ai-role-title">Use AI to:</p>
  <ul class="ai-list">
    <li>Generate SGDS-aligned code</li>
    <li>Choose the correct component and variant</li>
    <li>Build forms with validation and accessibility</li>
    <li>Scaffold pages using SGDS layout patterns</li>
    <li>Refactor existing code to match SGDS</li>
  </ul>
  <p class="ai-example-label">Example</p>
  <p class="ai-example-copy">“Using SGDS form patterns, generate a registration form with validation and error states.”</p>
</div>

<h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">For product managers</h2>

<div class="ai-role-card">
  <p class="ai-role-title">Use AI to:</p>
  <ul class="ai-list">
    <li>Draft PRDs and user stories</li>
    <li>Structure user flows and journeys</li>
    <li>Map requirements to SGDS components</li>
    <li>Generate acceptance criteria</li>
    <li>Create clearer briefs for designers and developers</li>
  </ul>
  <p class="ai-example-label">Example</p>
  <p class="ai-example-copy">“Create a user flow for onboarding using SGDS components and include edge cases.”</p>
</div>

<h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">What changes when you use SGDS with AI</h2>

<div class="ai-compare-grid">
  <div class="ai-compare-card">
    <p class="ai-compare-title">Without SGDS</p>
    <ul class="ai-list">
      <li>AI guesses components and patterns</li>
      <li>Outputs may look right but are inconsistent</li>
    </ul>
  </div>
  <div class="ai-compare-card ai-compare-card--accent">
    <p class="ai-compare-title">With SGDS</p>
    <ul class="ai-list">
      <li>AI follows defined components and behaviours</li>
      <li>Outputs are more consistent and usable</li>
      <li>Less time spent fixing and aligning</li>
    </ul>
  </div>
</div>

<h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Example output</h2>

<div class="ai-example-block">

```md
Screen review notes

- Missing hover state for secondary button
- Missing error state for required email field
- Consider using sgds-alert for inline form feedback
- Helper text should be added beneath password input
- Loading state needed for submit button
```

</div>

<h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">When to use AI</h2>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use AI when you need to:</p>

<ul class="ai-list">
  <li>Generate a first draft quickly</li>
  <li>Explore options</li>
  <li>Translate ideas into something structured</li>
  <li>Reduce repetitive work</li>
</ul>

<h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Important</h2>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">AI helps you move faster, but it does not replace judgment.</p>

<p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Always review outputs for:</p>

<ul class="ai-list">
  <li>Accessibility</li>
  <li>Business logic</li>
  <li>Product requirements</li>
</ul>

<style>
h2,
h3,
p,
ul,
li {
  margin: 0;
}

h2,
h3 {
  margin-top: var(--sgds-layout-gap-lg);
}

h3:first-of-type {
  margin-top: 0;
}

h2 + p,
h3 + p,
h2 + .ai-role-card,
h2 + .ai-compare-grid,
h2 + .ai-example-block,
h3 + .ai-role-card {
  margin-top: var(--sgds-text-gap-sm);
}

p + p,
p + ul,
ul + p {
  margin-top: var(--sgds-text-gap-sm);
}

.ai-role-card,
.ai-compare-card,
.ai-example-block {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  padding: var(--sgds-component-padding-lg);
}

.ai-role-card {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
}

.ai-role-title,
.ai-example-label,
.ai-compare-title {
  color: var(--sgds-heading-color-default);
  font-size: var(--sgds-font-size-heading-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-sm);
  margin: 0;
}

.ai-list {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
  margin: 0;
  padding-left: var(--sgds-padding-lg);
}

.ai-example-copy {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  margin: 0;
}

p,
li {
  color: var(--sgds-body-color-subtle);
}

.ai-compare-grid {
  display: grid;
  gap: var(--sgds-gap-2-xl);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ai-compare-card {
  min-height: var(--sgds-dimension-200);
}

.ai-compare-card--accent {
  background: var(--sgds-primary-surface-translucent);
}

.ai-example-block :global(pre) {
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
}

.ai-example-block :global(code) {
  color: var(--sgds-body-color-default);
}

@media (max-width: 768px) {
  .ai-compare-grid {
    grid-template-columns: 1fr;
  }
}
</style>
