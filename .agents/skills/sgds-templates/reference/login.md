# Login Page Template

Centered authentication card with email/password form, optional SSO button, and signup link. Adapted from shadcn's `login-01` block.

---

## When to use

- Sign-in and authentication pages
- Sign-up and account creation flows
- Forgot password and password reset pages
- OTP verification and multi-factor authentication
- Account recovery and identity verification

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

## Raw Content Link

To get the full HTML template, fetch and extract from the raw GitHub link below. See **[How to Extract HTML from Raw GitHub Links](../SKILL.md#how-to-extract-html-from-raw-github-links)** in SKILL.md for step-by-step instructions.


| File | GitHub Raw URL |
|------|---|
| Login | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/templates/Form/basic.stories.js |

---

## Complete Template

The template follows this pattern:

```html
<sgds-masthead></sgds-masthead>

<sgds-mainnav>
  <strong slot="brand">My Application</strong>
</sgds-mainnav>

<!-- Centered layout with floating card -->
<div class="sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-default sgds:min-h-screen sgds:p-layout-md">
  <div class="sgds:w-full sgds:max-w-[420px]">

    <!-- Card container -->
    <div class="sgds:bg-surface-raised sgds:rounded-lg sgds:border sgds:border-muted sgds:p-layout-md">

      <!-- Logo/Branding -->
      <div class="sgds:text-center sgds:mb-layout-lg">
        <h1 class="sgds:text-display-sm sgds:font-bold sgds:text-default sgds:mb-component-xs">Welcome back</h1>
        <p class="sgds:text-sm sgds:text-body-subtle">Sign in to your account to continue</p>
      </div>

      <!-- Form -->
      <form class="sgds:space-y-component-md">

        <sgds-input
          label="Email address"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          hasFeedback
        ></sgds-input>

        <sgds-input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          hasFeedback
        ></sgds-input>

        <!-- Helper text -->
        <div class="sgds:flex sgds:justify-between sgds:items-center sgds:text-sm">
          <sgds-checkbox label="Remember me" value="remember"></sgds-checkbox>
          <sgds-link><a href="#forgot" class="sgds:text-primary-default">Forgot password?</a></sgds-link>
        </div>

        <!-- Sign in button -->
        <sgds-button variant="primary" type="submit" class="sgds:w-full">
          Sign in
        </sgds-button>

      </form>

      <!-- Divider -->
      <div class="sgds:flex sgds:items-center sgds:gap-component-sm sgds:my-layout-md">
        <div class="sgds:flex-1 sgds:h-px sgds:bg-muted"></div>
        <span class="sgds:text-xs sgds:text-body-subtle">or</span>
        <div class="sgds:flex-1 sgds:h-px sgds:bg-muted"></div>
      </div>

      <!-- Singpass button -->
      <sgds-button variant="outline" class="sgds:w-full sgds:mb-layout-md">
        <sgds-icon name="singpass" slot="leftIcon"></sgds-icon>
        Sign in with Singpass
      </sgds-button>

      <!-- Sign up link -->
      <p class="sgds:text-center sgds:text-sm sgds:text-body-subtle">
        Don't have an account?
        <sgds-link><a href="#signup" class="sgds:text-primary-default sgds:font-semibold">Sign up</a></sgds-link>
      </p>

    </div>

  </div>
</div>

<sgds-footer></sgds-footer>
```

---

## Customisation notes

- **App branding**: Update logo path and application name at the top of the card
- **Card title & description**: Modify "Welcome back" and description text for your auth flow (sign up, forgot password, OTP verification, etc.)
- **Form fields**: Email and password are standard; adjust field types, labels, and add validation rules as needed
- **Submit button**: Change button text to match your action (Sign in, Register, Verify, etc.)
- **Helper links**: Update "Forgot password?" and "Sign up" links to your routes
- **SSO/Alternative auth**: Replace the Singpass button with your auth provider if different
- **Two-column variant**: For more visual impact, consider the two-column layout (left branded panel, right form); adapt colors using `sgds:bg-primary-default` or other semantic colors
- **Validation feedback**: Use `hasFeedback` on inputs to show inline validation errors
