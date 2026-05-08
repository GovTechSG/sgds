# Form Page Template

Single-page form with labelled sections for entity creation, editing, profile settings, or multi-section configuration pages.

## When to use

- Collecting user information across multiple related sections (personal, role, preferences, etc.)
- Profile or settings pages where users edit their own information
- Complex forms that benefit from visual grouping and descriptive guidance
- Full-page focused forms without competing page elements (as opposed to inline modal forms)

## Block anatomy

```
┌──────────────────────────────────────────────────────────┐
│ sgds-masthead                                            │
├──────────────────────────────────────────────────────────┤
│ sgds-mainnav                                             │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ Page Title                            [Cancel] [Save]   │
│ Page description                                         │
│                                                          │
│ ──────────────────────────────────────────────────────── │
│                                                          │
│ Section 1 label  │  [Input field]                        │
│ Section desc     │  [Input field]  [Input field]         │
│                  │  [Full-width field]                   │
│                                                          │
│ ──────────────────────────────────────────────────────── │
│                                                          │
│ Section 2 label  │  [Select dropdown]                    │
│ Section desc     │  [Select dropdown]                    │
│                  │  [Select dropdown]                    │
│                                                          │
│ ──────────────────────────────────────────────────────── │
│                                                          │
│ Section 3 label  │  [Textarea field]                     │
│ Section desc     │  [Character count]                    │
│                                                          │
│                              [Cancel] [Save changes]    │
└──────────────────────────────────────────────────────────┘
```

---

## Raw Content Link

To get the full HTML template, fetch and extract from the raw GitHub link below. See **[How to Extract HTML from Raw GitHub Links](../SKILL.md#how-to-extract-html-from-raw-github-links)** in SKILL.md for step-by-step instructions.


| File | GitHub Raw URL |
|------|---|
| Form - Basic | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Form/basic.stories.js |
| Form - Multi-Step Form | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Form/multi-step-form.stories.js |
| Form - Report Issue | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Form/report-issue.stories.js |

---

## Complete template

```html
<sgds-masthead></sgds-masthead>

<sgds-mainnav>
  <sgds-mainnav-item slot="start">
    <a href="/">My Application</a>
  </sgds-mainnav-item>
</sgds-mainnav>

<div class="sgds:bg-surface-default sgds:min-h-screen">
  <div class="sgds:w-container sgds:mx-auto sgds:py-layout-md">

    <!-- Page header with actions -->
    <div class="sgds:flex sgds:items-start sgds:justify-between sgds:mb-layout-md">
      <div>
        <h1 class="sgds:text-2xl sgds:font-semibold sgds:text-default">Edit profile</h1>
        <p class="sgds:text-sm sgds:text-body-subtle sgds:mt-1">
          Update your personal details and preferences.
        </p>
      </div>
      <!-- Sticky save/cancel — duplicate at bottom of form too -->
      <div class="sgds:flex sgds:gap-component-sm sgds:shrink-0 sgds:ml-layout-sm">
        <sgds-button variant="outline" onclick="history.back()">Cancel</sgds-button>
        <sgds-button variant="primary" form="profile-form" type="submit">Save changes</sgds-button>
      </div>
    </div>

    <form id="profile-form" method="post" novalidate>

      <!-- Section 1 -->
      <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
        <div class="sgds-grid sgds:gap-layout-md">

          <!-- Section description (left third) -->
          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
            <h2 class="sgds:text-base sgds:font-semibold sgds:text-default">Personal information</h2>
            <p class="sgds:text-sm sgds:text-body-subtle sgds:mt-1">
              Your name and contact details. Only your agency administrator can see this information.
            </p>
          </div>

          <!-- Form fields (right two-thirds) -->
          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">

            <!-- Two-column row -->
            <div class="sgds-grid sgds:gap-component-sm">
              <sgds-input
                class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                label="First name"
                name="firstName"
                required
                hasFeedback
              ></sgds-input>
              <sgds-input
                class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                label="Last name"
                name="lastName"
                required
                hasFeedback
              ></sgds-input>
            </div>

            <!-- Full-width field -->
            <sgds-input
              label="Email address"
              type="email"
              name="email"
              hint="Must be a gov.sg email address."
              required
              hasFeedback
            ></sgds-input>

            <sgds-input
              label="Phone number"
              type="tel"
              name="phone"
              hint="Singapore number including country code, e.g. +65 9123 4567"
              hasFeedback
            ></sgds-input>

          </div>
        </div>
      </div>

      <!-- Section 2 -->
      <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
        <div class="sgds-grid sgds:gap-layout-md">

          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
            <h2 class="sgds:text-base sgds:font-semibold sgds:text-default">Role &amp; access</h2>
            <p class="sgds:text-sm sgds:text-body-subtle sgds:mt-1">
              Your position and assigned permissions within the system.
            </p>
          </div>

          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">

            <sgds-input
              label="Job title"
              name="jobTitle"
              hasFeedback
            ></sgds-input>

            <sgds-select label="Department" name="department" hasFeedback>
              <sgds-select-option value="">Select department</sgds-select-option>
              <sgds-select-option value="policy">Policy</sgds-select-option>
              <sgds-select-option value="operations">Operations</sgds-select-option>
              <sgds-select-option value="ict">ICT</sgds-select-option>
            </sgds-select>

            <sgds-select label="Access level" name="accessLevel" hasFeedback>
              <sgds-select-option value="viewer">Viewer</sgds-select-option>
              <sgds-select-option value="editor">Editor</sgds-select-option>
              <sgds-select-option value="admin">Admin</sgds-select-option>
            </sgds-select>

          </div>
        </div>
      </div>

      <!-- Section 3: long-form text -->
      <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
        <div class="sgds-grid sgds:gap-layout-md">

          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
            <h2 class="sgds:text-base sgds:font-semibold sgds:text-default">Notes</h2>
            <p class="sgds:text-sm sgds:text-body-subtle sgds:mt-1">
              Optional additional context visible to your team.
            </p>
          </div>

          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">
            <sgds-textarea
              label="Internal notes"
              name="notes"
              rows="4"
              maxlength="500"
              characterCount
              hint="Max 500 characters."
            ></sgds-textarea>
          </div>

        </div>
      </div>

      <!-- Form footer actions -->
      <div class="sgds:border-t sgds:border-muted sgds:pt-layout-sm sgds:flex sgds:justify-end sgds:gap-component-sm">
        <sgds-button variant="outline" type="button" onclick="history.back()">Cancel</sgds-button>
        <sgds-button variant="primary" type="submit">Save changes</sgds-button>
      </div>

    </form>

  </div>
</div>

<sgds-footer></sgds-footer>
```

## Customisation notes

- **Page title & description**: Update `Edit profile` and description text to match your use case
- **Section labels & descriptions**: Change each section's heading and paragraph text to reflect your form's purpose
- **Form fields**: Add, remove, or modify inputs based on what data you're collecting; maintain `hasFeedback` for validation feedback
- **Field grouping**: Use the 3-column layout (1/3 description + 2/3 fields) to organize related fields logically
- **Two-column rows**: For paired fields like first/last name, use the nested `sgds-grid` with `sgds-col-lg-6`
- **Full-width fields**: Place inputs outside the two-column grid to span full width
- **Validation**: Keep `novalidate` on the form element and use `hasFeedback` on inputs; handle submission validation in JavaScript with `form.reportValidity()`
- **Button placement**: Duplicate Save/Cancel buttons at top (sticky) and bottom for easy access on long forms
- **Hints vs labels**: Use the `hint` attribute for instructional text; keep labels concise
