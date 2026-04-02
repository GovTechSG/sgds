# Form Page Template

Single-page form layout with labelled sections. Adapted from shadcn's settings page pattern.

Use for: entity creation/editing, profile settings, multi-section configuration pages.

---

## Layout Structure

Uses the Simple App Layout from the [Application Shell](../../sgds-pattern-block-templates/reference/application-shell.md). No sidebar. Form content is the full focus.

```
┌──────────────────────────────────────────────────────┐
│  sgds-masthead                                       │
├──────────────────────────────────────────────────────┤
│  sgds-mainnav                                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Page title            [Cancel]  [Save changes]      │
│  Page subtitle                                       │
│                                                      │
│  ─────────────────────────────────────────────────── │
│                                                      │
│  Section label  │  Field A                           │
│  Description    │  Field B   Field C                 │
│  of section     │                                    │
│                 │  Field D (full width)              │
│                                                      │
│  ─────────────────────────────────────────────────── │
│                                                      │
│  Section 2      │  Field E                           │
│  label          │  Field F                           │
│                 │                                    │
│  ─────────────────────────────────────────────────── │
│                                                      │
│                         [Cancel]  [Save changes]     │
└──────────────────────────────────────────────────────┘
```

---

## Complete Template

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
        <p class="sgds:text-sm sgds:text-muted sgds:mt-1">
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
            <p class="sgds:text-sm sgds:text-muted sgds:mt-1">
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
            <p class="sgds:text-sm sgds:text-muted sgds:mt-1">
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
            <p class="sgds:text-sm sgds:text-muted sgds:mt-1">
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

---

## Variant: Modal form (for quick edits)

When editing a row in a table, open a modal instead of navigating to a full page.

```html
<sgds-modal size="medium" id="editModal">
  <span slot="title">Edit record</span>

  <div slot="body">
    <form id="edit-form" class="sgds:flex sgds:flex-col sgds:gap-component-sm">
      <sgds-input label="Name" name="name" required hasFeedback></sgds-input>
      <sgds-select label="Status" name="status">
        <sgds-select-option value="active">Active</sgds-select-option>
        <sgds-select-option value="inactive">Inactive</sgds-select-option>
      </sgds-select>
      <sgds-textarea label="Remarks" name="remarks" rows="3"></sgds-textarea>
    </form>
  </div>

  <div slot="footer">
    <div class="sgds:flex sgds:justify-end sgds:gap-component-sm">
      <sgds-button variant="outline" onclick="document.getElementById('editModal').hideModal()">
        Cancel
      </sgds-button>
      <sgds-button variant="primary" form="edit-form" type="submit">Save</sgds-button>
    </div>
  </div>
</sgds-modal>
```

---

## Key visual rules

- **Sectioned layout**: `sgds:border-t sgds:border-muted sgds:py-layout-md` creates clean visual separation without heavy dividers
- **3-column grid**: left 1/3 = meta (description, guidance), right 2/3 = inputs; drop to single column on mobile
- **2-column rows**: `sgds:grid-cols-2` for pairs like first/last name; single column for email, select, etc.
- **Duplicate actions**: Save/Cancel at top right of page header AND at the bottom of the form — users should never have to scroll far to save
- **Full-form validation**: use `novalidate` on `<form>` and `hasFeedback` on each input; handle submit in JS with `form.reportValidity()`
- **`hint` usage**: short instructional text below the input, not a label; keeps labels concise
