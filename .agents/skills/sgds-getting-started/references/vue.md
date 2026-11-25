# Vue Integration

Vue 3 supports web components natively — no SGDS-specific wrappers exist.

Refer to the [Vue + web components documentation](https://vuejs.org/guide/extras/web-components) for configuration. The SGDS-specific filter for suppressing unknown element warnings is:

```js
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("sgds-");
```
