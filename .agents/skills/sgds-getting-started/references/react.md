# React Integration

**React version determines which import to use.**

## React 19+ (client-side, e.g. Vite)

React 19 supports native custom elements directly — import once at the app entry point, then use the web component tag anywhere:

```jsx
import "@govtechsg/sgds-web-component";

function App() {
  return (
    <sgds-button variant="primary" onsgds-blur={(e) => console.log(e)}>
      Click Me
    </sgds-button>
  );
}
```

Custom event syntax in React 19: prefix the event name with `on` in lowercase (`sgds-blur` → `onsgds-blur`).

> **Using Next.js?** Next.js requires a different setup — see [Next.js integration](nextjs.md).

Complex props (arrays, objects) can be passed declaratively:

```jsx
import "@govtechsg/sgds-web-component";

const steps = [
  { component: <Step1 />, stepHeader: "Personal details" },
  { component: <Step2 />, stepHeader: "Contact details" },
];

function App() {
  return <sgds-stepper steps={steps}></sgds-stepper>;
}
```

## React 18 and below

React 18 does not support custom element events or complex props natively. Use the React wrapper components:

```jsx
import { SgdsButton } from "@govtechsg/sgds-web-component/react";

function App() {
  return (
    <SgdsButton variant="primary" onSgdsBlur={(e) => console.log(e)}>
      Click Me
    </SgdsButton>
  );
}
```

React wrapper event naming: `sgds-blur` → `onSgdsBlur`, `sgds-change` → `onSgdsChange` (prefix `on`, camelCase applies to every hyphen-separated word).

**Accessing component methods in React 18** (via `useRef`):

```tsx
import { useRef } from "react";
import type { SgdsStepper as SStep } from "@govtechsg/sgds-web-component/components";
import { SgdsStepper } from "@govtechsg/sgds-web-component/react";

function StepperComponent() {
  const stepperRef = useRef<SStep>(null);
  return <SgdsStepper steps={steps} ref={stepperRef} />;
}
```

## TypeScript support

Add a `types.d.ts` at the project root:

```ts
import "@govtechsg/sgds-web-component/types/react";
```

Ensure it is included by your `tsconfig.json`:

```json
{
  "include": ["types.d.ts", "**/*.ts", "**/*.tsx"]
}
```

With this in place, event handlers are fully typed with no manual casting needed:

```tsx
<sgds-switch onsgds-change={(e: CustomEvent<ISgdsSwitchChangeEventDetail>) => console.log(e.detail.checked)} />
```

Official docs: https://webcomponent.designsystem.tech.gov.sg/?path=/docs/frameworks-react--docs
