# Angular Integration

Angular supports web components natively via `CUSTOM_ELEMENTS_SCHEMA` — no SGDS-specific wrappers exist.

Refer to the [Angular elements documentation](https://angular.io/guide/elements) for configuration. Add `CUSTOM_ELEMENTS_SCHEMA` to your module or standalone component:

```ts
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppComponent {}
```
