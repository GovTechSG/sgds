# Login Page Template

Centered authentication card. Adapted from shadcn's `login-01` block.

Use for: sign-in, sign-up, forgot password, OTP verification pages.

---

## Layout Structure

Full-height centered layout — card sits in the middle of the viewport on desktop, fills the screen on mobile.

```
┌───────────────────────────────────────┐
│                                       │
│          sgds-masthead                │
│                                       │
│     ┌─────────────────────────┐       │
│     │  App name / logo        │       │
│     │  ─────────────────────  │       │
│     │  Welcome back           │       │
│     │  Sign in to continue    │       │
│     │                         │       │
│     │  [Email input         ] │       │
│     │  [Password input      ] │       │
│     │                         │       │
│     │  [     Sign in        ] │       │
│     │                         │       │
│     │  Don't have an account? │       │
│     └─────────────────────────┘       │
│                                       │
└───────────────────────────────────────┘
```

---

## Complete Template

```html
<sgds-masthead></sgds-masthead>

<sgds-mainnav>
  <strong slot="brand">My Application</strong>
</sgds-mainnav>

<div class="sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-default sgds:p-layout-md sgds:py-layout-xl">
  <div class="sgds:max-w-container-md sgds:w-full">

    <!-- App branding -->
    <div class="sgds:text-center sgds:mb-layout-sm">
      <img src="/logo.svg" alt="App logo" class="sgds:h-10 sgds:mx-auto sgds:mb-3" />
      <h1 class="sgds:text-xl sgds:font-semibold sgds:text-default">My Application</h1>
    </div>

    <!-- Auth card -->
    <div class="sgds:bg-surface-raised sgds:rounded-xl sgds:shadow-card sgds:p-component-xl">

      <!-- Card header -->
      <div class="sgds:mb-layout-sm">
        <h2 class="sgds:text-lg sgds:font-semibold sgds:text-default">Welcome back</h2>
        <p class="sgds:text-sm sgds:text-muted sgds:mt-1">Sign in to your account to continue</p>
      </div>

      <!-- Login form -->
      <form class="sgds:flex sgds:flex-col sgds:gap-component-sm">

        <sgds-input
          label="Email address"
          type="email"
          name="email"
          placeholder="you@agency.gov.sg"
          required
          hasFeedback
        ></sgds-input>

        <div>
          <sgds-input
            label="Password"
            type="password"
            name="password"
            required
            hasFeedback
          ></sgds-input>
          <div class="sgds:flex sgds:justify-end sgds:mt-1">
            <sgds-link size="sm"><a href="/forgot-password">Forgot password?</a></sgds-link>
          </div>
        </div>

        <sgds-button type="submit" variant="primary" fullWidth>
          Sign in
        </sgds-button>

      </form>

      <!-- Divider -->
      <div class="sgds:flex sgds:items-center sgds:gap-3 sgds:my-component-lg">
        <sgds-divider></sgds-divider>
        <span class="sgds:text-xs sgds:text-muted sgds:whitespace-nowrap">or sign in with</span>
        <sgds-divider></sgds-divider>
      </div>

      <!-- SSO option -->
      <sgds-button variant="outline" fullWidth>
        <sgds-icon slot="leftIcon" name="user-circle"></sgds-icon>
        Singpass
      </sgds-button>

      <!-- Footer link -->
      <p class="sgds:text-sm sgds:text-center sgds:text-muted sgds:mt-layout-xs">
        Don't have an account?
        <a href="/register">Sign up</a>
      </p>

    </div>

  </div>
</div>

<sgds-footer></sgds-footer>
```

---

## Variant: Two-column with branding panel

For more visual impact — left panel with brand message, right panel with form.

```html
<sgds-masthead></sgds-masthead>

<sgds-mainnav>
  <strong slot="brand">My Application</strong>
</sgds-mainnav>

<div class="sgds:flex sgds:flex-col lg:sgds:flex-row sgds:bg-surface-default">

  <!-- Left: brand panel (hidden on mobile) -->
  <div class="sgds:hidden lg:sgds:flex lg:sgds:w-1/2 sgds:flex-col sgds:justify-between sgds:bg-primary-default sgds:p-layout-lg">
    <div>
      <img src="/logo-white.svg" alt="App logo" class="sgds:h-8" />
    </div>
    <blockquote class="sgds:text-white">
      <p class="sgds:text-xl sgds:font-medium sgds:leading-relaxed">
        "Serving citizens with speed and integrity."
      </p>
      <footer class="sgds:mt-4 sgds:text-sm sgds:opacity-75">— Your Agency Name</footer>
    </blockquote>
  </div>

  <!-- Right: form panel -->
  <div class="sgds:flex sgds:w-full lg:sgds:w-1/2 sgds:items-center sgds:justify-center sgds:p-layout-md">
    <div class="sgds:max-w-container-md sgds:w-full">
      <div class="sgds:mb-layout-sm">
        <h2 class="sgds:text-xl sgds:font-semibold sgds:text-default">Sign in</h2>
        <p class="sgds:text-sm sgds:text-muted sgds:mt-1">Enter your credentials to access the portal</p>
      </div>
      <form class="sgds:flex sgds:flex-col sgds:gap-component-sm">
        <sgds-input label="Email" type="email" name="email" required hasFeedback></sgds-input>
        <sgds-input label="Password" type="password" name="password" required hasFeedback></sgds-input>
        <sgds-button type="submit" variant="primary" fullWidth>Sign in</sgds-button>
      </form>
    </div>
  </div>

</div>

<sgds-footer></sgds-footer>
```

---

## Key visual rules

- **Card bg**: `sgds:bg-surface-raised` on `sgds:bg-surface-default` page — creates the "floating card" effect
- **Card padding**: `sgds:p-component-xl` — generous internal padding reads as premium
- **Card radius**: `sgds:rounded-xl` — slightly more rounded than default for auth pages
- **Card shadow**: `sgds:shadow-card` — lifts the card off the background
- **Button**: always `fullWidth` on auth forms — full-width primary button is the visual anchor
- **Error states**: `hasFeedback` on all inputs — shows validation inline without a page reload
