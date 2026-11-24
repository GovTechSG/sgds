# Next.js Integration

SGDS React wrappers provide **opt-in SSR** in Next.js (tested with Next.js 16). Wrap your config with `withSgdsNextSSR()` to enable Declarative Shadow DOM (DSD) — no FOUC, no layout shift. Works with both webpack and Turbopack.

## Enable SSR

Install the required peer dependencies:

```bash
npm install @lit-labs/ssr @lit-labs/ssr-react
```

Wrap your Next.js config with `withSgdsNextSSR()`:

```js
// next.config.mjs
import { withSgdsNextSSR } from "@govtechsg/sgds-web-component/react/ssr";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
};

export default withSgdsNextSSR(nextConfig);
```

Without `withSgdsNextSSR()`, components render in CSR mode (client-side only).

## Use React wrapper components

Import components from `@govtechsg/sgds-web-component/react` using barrel imports:

```tsx
'use client';
import { SgdsInput, SgdsButton } from "@govtechsg/sgds-web-component/react";

export default function MyForm() {
  return (
    <>
      <SgdsInput label="Name" onSgdsChange={(e) => console.log(e)} />
      <SgdsButton variant="primary">Submit</SgdsButton>
    </>
  );
}
```

Event naming follows the camelCase convention: `sgds-change` → `onSgdsChange`, `sgds-after-show` → `onSgdsAfterShow`.

## SSR — how it works

1. On the server, each SGDS component renders its full shadow DOM as inline HTML using Declarative Shadow DOM (DSD). Component styles are embedded in the HTML response.
2. The browser receives fully styled components on the first paint — no flash of unstyled content (FOUC), no layout shift.
3. On the client, the browser adopts the shadow DOM from the HTML and Lit hydrates without re-rendering. Events attach and the component becomes interactive.

## CSP nonce support (optional)

If the app has a strict `Content-Security-Policy` with `style-src 'nonce-...'`, call `setCSPNonce()` in the root layout to stamp the nonce onto DSD `<style>` tags:

```tsx
// app/layout.tsx (server component)
import { setCSPNonce } from "@govtechsg/sgds-web-component/react/ssr";
import { headers } from "next/headers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  if (nonce) setCSPNonce(nonce);
  return <html lang="en"><body>{children}</body></html>;
}
```

`setCSPNonce()` stamps the nonce onto every `<style>` tag inside each component's Declarative Shadow DOM during server rendering. This is synchronous — no `await` needed.

> `getCSPNonce()` is also exported from `@govtechsg/sgds-web-component/react/ssr` for debugging or inspecting the current nonce value.

The `react/ssr` entry has no `"use client"` directive so it can be used in server components like `layout.tsx`. Components are imported from `@govtechsg/sgds-web-component/react` (not `react/ssr`).

## TypeScript support

Add a `types.d.ts` at the project root:

```ts
import "@govtechsg/sgds-web-component/types/react";
```

Ensure it is included by your `tsconfig.json`:

```json
{
  "include": ["types.d.ts", "next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

Official docs: https://webcomponent.designsystem.tech.gov.sg/?path=/docs/frameworks-react--docs
