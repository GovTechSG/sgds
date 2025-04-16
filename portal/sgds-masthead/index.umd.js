(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const NODE_MODE$1 = false;
  // Allows minifiers to rename references to globalThis
  const global$4 = globalThis;
  /**
   * Whether the current browser supports `adoptedStyleSheets`.
   */
  const supportsAdoptingStyleSheets$1 = global$4.ShadowRoot &&
      (global$4.ShadyCSS === undefined || global$4.ShadyCSS.nativeShadow) &&
      'adoptedStyleSheets' in Document.prototype &&
      'replace' in CSSStyleSheet.prototype;
  const constructionToken$1 = Symbol();
  const cssTagCache$1 = new WeakMap();
  /**
   * A container for a string of CSS text, that may be used to create a CSSStyleSheet.
   *
   * CSSResult is the return value of `css`-tagged template literals and
   * `unsafeCSS()`. In order to ensure that CSSResults are only created via the
   * `css` tag and `unsafeCSS()`, CSSResult cannot be constructed directly.
   */
  class CSSResult$1 {
      constructor(cssText, strings, safeToken) {
          // This property needs to remain unminified.
          this['_$cssResult$'] = true;
          if (safeToken !== constructionToken$1) {
              throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
          }
          this.cssText = cssText;
          this._strings = strings;
      }
      // This is a getter so that it's lazy. In practice, this means stylesheets
      // are not created until the first element instance is made.
      get styleSheet() {
          // If `supportsAdoptingStyleSheets` is true then we assume CSSStyleSheet is
          // constructable.
          let styleSheet = this._styleSheet;
          const strings = this._strings;
          if (supportsAdoptingStyleSheets$1 && styleSheet === undefined) {
              const cacheable = strings !== undefined && strings.length === 1;
              if (cacheable) {
                  styleSheet = cssTagCache$1.get(strings);
              }
              if (styleSheet === undefined) {
                  (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
                  if (cacheable) {
                      cssTagCache$1.set(strings, styleSheet);
                  }
              }
          }
          return styleSheet;
      }
      toString() {
          return this.cssText;
      }
  }
  /**
   * Wrap a value for interpolation in a {@linkcode css} tagged template literal.
   *
   * This is unsafe because untrusted CSS text can be used to phone home
   * or exfiltrate data to an attacker controlled site. Take care to only use
   * this with trusted input.
   */
  const unsafeCSS$1 = (value) => new CSSResult$1(typeof value === 'string' ? value : String(value), undefined, constructionToken$1);
  /**
   * Applies the given styles to a `shadowRoot`. When Shadow DOM is
   * available but `adoptedStyleSheets` is not, styles are appended to the
   * `shadowRoot` to [mimic spec behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   * Note, when shimming is used, any styles that are subsequently placed into
   * the shadowRoot should be placed *before* any shimmed adopted styles. This
   * will match spec behavior that gives adopted sheets precedence over styles in
   * shadowRoot.
   */
  const adoptStyles$1 = (renderRoot, styles) => {
      if (supportsAdoptingStyleSheets$1) {
          renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
      }
      else {
          for (const s of styles) {
              const style = document.createElement('style');
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const nonce = global$4['litNonce'];
              if (nonce !== undefined) {
                  style.setAttribute('nonce', nonce);
              }
              style.textContent = s.cssText;
              renderRoot.appendChild(style);
          }
      }
  };
  const cssResultFromStyleSheet$1 = (sheet) => {
      let cssText = '';
      for (const rule of sheet.cssRules) {
          cssText += rule.cssText;
      }
      return unsafeCSS$1(cssText);
  };
  const getCompatibleStyle$1 = supportsAdoptingStyleSheets$1 ||
      (NODE_MODE$1 )
      ? (s) => s
      : (s) => s instanceof CSSStyleSheet ? cssResultFromStyleSheet$1(s) : s;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  // TODO (justinfagnani): Add `hasOwn` here when we ship ES2022
  const { is: is$1, defineProperty: defineProperty$1, getOwnPropertyDescriptor: getOwnPropertyDescriptor$1, getOwnPropertyNames: getOwnPropertyNames$1, getOwnPropertySymbols: getOwnPropertySymbols$1, getPrototypeOf: getPrototypeOf$1, } = Object;
  // Lets a minifier replace globalThis references with a minified name
  const global$3 = globalThis;
  let issueWarning$4;
  const trustedTypes$2 = global$3
      .trustedTypes;
  // Temporary workaround for https://crbug.com/993268
  // Currently, any attribute starting with "on" is considered to be a
  // TrustedScript source. Such boolean attributes must be set to the equivalent
  // trusted emptyScript value.
  const emptyStringForBooleanAttribute$1 = trustedTypes$2
      ? trustedTypes$2.emptyScript
      : '';
  const polyfillSupport$3 = global$3.reactiveElementPolyfillSupportDevMode
      ;
  {
      // Ensure warnings are issued only 1x, even if multiple versions of Lit
      // are loaded.
      const issuedWarnings = (global$3.litIssuedWarnings ??=
          new Set());
      // Issue a warning, if we haven't already.
      issueWarning$4 = (code, warning) => {
          warning += ` See https://lit.dev/msg/${code} for more information.`;
          if (!issuedWarnings.has(warning)) {
              console.warn(warning);
              issuedWarnings.add(warning);
          }
      };
      issueWarning$4('dev-mode', `Lit is in dev mode. Not recommended for production!`);
      // Issue polyfill support warning.
      if (global$3.ShadyDOM?.inUse && polyfillSupport$3 === undefined) {
          issueWarning$4('polyfill-support-missing', `Shadow DOM is being polyfilled via \`ShadyDOM\` but ` +
              `the \`polyfill-support\` module has not been loaded.`);
      }
  }
  /**
   * Useful for visualizing and logging insights into what the Lit template system is doing.
   *
   * Compiled out of prod mode builds.
   */
  const debugLogEvent$2 = (event) => {
          const shouldEmit = global$3
              .emitLitDebugLogEvents;
          if (!shouldEmit) {
              return;
          }
          global$3.dispatchEvent(new CustomEvent('lit-debug', {
              detail: event,
          }));
      }
      ;
  /*
   * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
   * replaced at compile time by the munged name for object[property]. We cannot
   * alias this function, so we have to use a small shim that has the same
   * behavior when not compiling.
   */
  /*@__INLINE__*/
  const JSCompiler_renameProperty$2 = (prop, _obj) => prop;
  const defaultConverter$1 = {
      toAttribute(value, type) {
          switch (type) {
              case Boolean:
                  value = value ? emptyStringForBooleanAttribute$1 : null;
                  break;
              case Object:
              case Array:
                  // if the value is `null` or `undefined` pass this through
                  // to allow removing/no change behavior.
                  value = value == null ? value : JSON.stringify(value);
                  break;
          }
          return value;
      },
      fromAttribute(value, type) {
          let fromValue = value;
          switch (type) {
              case Boolean:
                  fromValue = value !== null;
                  break;
              case Number:
                  fromValue = value === null ? null : Number(value);
                  break;
              case Object:
              case Array:
                  // Do *not* generate exception when invalid JSON is set as elements
                  // don't normally complain on being mis-configured.
                  // TODO(sorvell): Do generate exception in *dev mode*.
                  try {
                      // Assert to adhere to Bazel's "must type assert JSON parse" rule.
                      fromValue = JSON.parse(value);
                  }
                  catch (e) {
                      fromValue = null;
                  }
                  break;
          }
          return fromValue;
      },
  };
  /**
   * Change function that returns true if `value` is different from `oldValue`.
   * This method is used as the default for a property's `hasChanged` function.
   */
  const notEqual$1 = (value, old) => !is$1(value, old);
  const defaultPropertyDeclaration$2 = {
      attribute: true,
      type: String,
      converter: defaultConverter$1,
      reflect: false,
      hasChanged: notEqual$1,
  };
  // Ensure metadata is enabled. TypeScript does not polyfill
  // Symbol.metadata, so we must ensure that it exists.
  Symbol.metadata ??= Symbol('metadata');
  // Map from a class's metadata object to property options
  // Note that we must use nullish-coalescing assignment so that we only use one
  // map even if we load multiple version of this module.
  global$3.litPropertyMetadata ??= new WeakMap();
  /**
   * Base element class which manages element properties and attributes. When
   * properties change, the `update` method is asynchronously called. This method
   * should be supplied by subclasses to render updates as desired.
   * @noInheritDoc
   */
  class ReactiveElement$1
  // In the Node build, this `extends` clause will be substituted with
  // `(globalThis.HTMLElement ?? HTMLElement)`.
  //
  // This way, we will first prefer any global `HTMLElement` polyfill that the
  // user has assigned, and then fall back to the `HTMLElement` shim which has
  // been imported (see note at the top of this file about how this import is
  // generated by Rollup). Note that the `HTMLElement` variable has been
  // shadowed by this import, so it no longer refers to the global.
   extends HTMLElement {
      /**
       * Adds an initializer function to the class that is called during instance
       * construction.
       *
       * This is useful for code that runs against a `ReactiveElement`
       * subclass, such as a decorator, that needs to do work for each
       * instance, such as setting up a `ReactiveController`.
       *
       * ```ts
       * const myDecorator = (target: typeof ReactiveElement, key: string) => {
       *   target.addInitializer((instance: ReactiveElement) => {
       *     // This is run during construction of the element
       *     new MyController(instance);
       *   });
       * }
       * ```
       *
       * Decorating a field will then cause each instance to run an initializer
       * that adds a controller:
       *
       * ```ts
       * class MyElement extends LitElement {
       *   @myDecorator foo;
       * }
       * ```
       *
       * Initializers are stored per-constructor. Adding an initializer to a
       * subclass does not add it to a superclass. Since initializers are run in
       * constructors, initializers will run in order of the class hierarchy,
       * starting with superclasses and progressing to the instance's class.
       *
       * @nocollapse
       */
      static addInitializer(initializer) {
          this.__prepare();
          (this._initializers ??= []).push(initializer);
      }
      /**
       * Returns a list of attributes corresponding to the registered properties.
       * @nocollapse
       * @category attributes
       */
      static get observedAttributes() {
          // Ensure we've created all properties
          this.finalize();
          // this.__attributeToPropertyMap is only undefined after finalize() in
          // ReactiveElement itself. ReactiveElement.observedAttributes is only
          // accessed with ReactiveElement as the receiver when a subclass or mixin
          // calls super.observedAttributes
          return (this.__attributeToPropertyMap && [...this.__attributeToPropertyMap.keys()]);
      }
      /**
       * Creates a property accessor on the element prototype if one does not exist
       * and stores a {@linkcode PropertyDeclaration} for the property with the
       * given options. The property setter calls the property's `hasChanged`
       * property option or uses a strict identity check to determine whether or not
       * to request an update.
       *
       * This method may be overridden to customize properties; however,
       * when doing so, it's important to call `super.createProperty` to ensure
       * the property is setup correctly. This method calls
       * `getPropertyDescriptor` internally to get a descriptor to install.
       * To customize what properties do when they are get or set, override
       * `getPropertyDescriptor`. To customize the options for a property,
       * implement `createProperty` like this:
       *
       * ```ts
       * static createProperty(name, options) {
       *   options = Object.assign(options, {myOption: true});
       *   super.createProperty(name, options);
       * }
       * ```
       *
       * @nocollapse
       * @category properties
       */
      static createProperty(name, options = defaultPropertyDeclaration$2) {
          // If this is a state property, force the attribute to false.
          if (options.state) {
              options.attribute = false;
          }
          this.__prepare();
          this.elementProperties.set(name, options);
          if (!options.noAccessor) {
              const key = // Use Symbol.for in dev mode to make it easier to maintain state
                      // when doing HMR.
                      Symbol.for(`${String(name)} (@property() cache)`)
                  ;
              const descriptor = this.getPropertyDescriptor(name, key, options);
              if (descriptor !== undefined) {
                  defineProperty$1(this.prototype, name, descriptor);
              }
          }
      }
      /**
       * Returns a property descriptor to be defined on the given named property.
       * If no descriptor is returned, the property will not become an accessor.
       * For example,
       *
       * ```ts
       * class MyElement extends LitElement {
       *   static getPropertyDescriptor(name, key, options) {
       *     const defaultDescriptor =
       *         super.getPropertyDescriptor(name, key, options);
       *     const setter = defaultDescriptor.set;
       *     return {
       *       get: defaultDescriptor.get,
       *       set(value) {
       *         setter.call(this, value);
       *         // custom action.
       *       },
       *       configurable: true,
       *       enumerable: true
       *     }
       *   }
       * }
       * ```
       *
       * @nocollapse
       * @category properties
       */
      static getPropertyDescriptor(name, key, options) {
          const { get, set } = getOwnPropertyDescriptor$1(this.prototype, name) ?? {
              get() {
                  return this[key];
              },
              set(v) {
                  this[key] = v;
              },
          };
          if (get == null) {
              if ('value' in (getOwnPropertyDescriptor$1(this.prototype, name) ?? {})) {
                  throw new Error(`Field ${JSON.stringify(String(name))} on ` +
                      `${this.name} was declared as a reactive property ` +
                      `but it's actually declared as a value on the prototype. ` +
                      `Usually this is due to using @property or @state on a method.`);
              }
              issueWarning$4('reactive-property-without-getter', `Field ${JSON.stringify(String(name))} on ` +
                  `${this.name} was declared as a reactive property ` +
                  `but it does not have a getter. This will be an error in a ` +
                  `future version of Lit.`);
          }
          return {
              get() {
                  return get?.call(this);
              },
              set(value) {
                  const oldValue = get?.call(this);
                  set.call(this, value);
                  this.requestUpdate(name, oldValue, options);
              },
              configurable: true,
              enumerable: true,
          };
      }
      /**
       * Returns the property options associated with the given property.
       * These options are defined with a `PropertyDeclaration` via the `properties`
       * object or the `@property` decorator and are registered in
       * `createProperty(...)`.
       *
       * Note, this method should be considered "final" and not overridden. To
       * customize the options for a given property, override
       * {@linkcode createProperty}.
       *
       * @nocollapse
       * @final
       * @category properties
       */
      static getPropertyOptions(name) {
          return this.elementProperties.get(name) ?? defaultPropertyDeclaration$2;
      }
      /**
       * Initializes static own properties of the class used in bookkeeping
       * for element properties, initializers, etc.
       *
       * Can be called multiple times by code that needs to ensure these
       * properties exist before using them.
       *
       * This method ensures the superclass is finalized so that inherited
       * property metadata can be copied down.
       * @nocollapse
       */
      static __prepare() {
          if (this.hasOwnProperty(JSCompiler_renameProperty$2('elementProperties'))) {
              // Already prepared
              return;
          }
          // Finalize any superclasses
          const superCtor = getPrototypeOf$1(this);
          superCtor.finalize();
          // Create own set of initializers for this class if any exist on the
          // superclass and copy them down. Note, for a small perf boost, avoid
          // creating initializers unless needed.
          if (superCtor._initializers !== undefined) {
              this._initializers = [...superCtor._initializers];
          }
          // Initialize elementProperties from the superclass
          this.elementProperties = new Map(superCtor.elementProperties);
      }
      /**
       * Finishes setting up the class so that it's ready to be registered
       * as a custom element and instantiated.
       *
       * This method is called by the ReactiveElement.observedAttributes getter.
       * If you override the observedAttributes getter, you must either call
       * super.observedAttributes to trigger finalization, or call finalize()
       * yourself.
       *
       * @nocollapse
       */
      static finalize() {
          if (this.hasOwnProperty(JSCompiler_renameProperty$2('finalized'))) {
              return;
          }
          this.finalized = true;
          this.__prepare();
          // Create properties from the static properties block:
          if (this.hasOwnProperty(JSCompiler_renameProperty$2('properties'))) {
              const props = this.properties;
              const propKeys = [
                  ...getOwnPropertyNames$1(props),
                  ...getOwnPropertySymbols$1(props),
              ];
              for (const p of propKeys) {
                  this.createProperty(p, props[p]);
              }
          }
          // Create properties from standard decorator metadata:
          const metadata = this[Symbol.metadata];
          if (metadata !== null) {
              const properties = litPropertyMetadata.get(metadata);
              if (properties !== undefined) {
                  for (const [p, options] of properties) {
                      this.elementProperties.set(p, options);
                  }
              }
          }
          // Create the attribute-to-property map
          this.__attributeToPropertyMap = new Map();
          for (const [p, options] of this.elementProperties) {
              const attr = this.__attributeNameForProperty(p, options);
              if (attr !== undefined) {
                  this.__attributeToPropertyMap.set(attr, p);
              }
          }
          this.elementStyles = this.finalizeStyles(this.styles);
          {
              if (this.hasOwnProperty('createProperty')) {
                  issueWarning$4('no-override-create-property', 'Overriding ReactiveElement.createProperty() is deprecated. ' +
                      'The override will not be called with standard decorators');
              }
              if (this.hasOwnProperty('getPropertyDescriptor')) {
                  issueWarning$4('no-override-get-property-descriptor', 'Overriding ReactiveElement.getPropertyDescriptor() is deprecated. ' +
                      'The override will not be called with standard decorators');
              }
          }
      }
      /**
       * Takes the styles the user supplied via the `static styles` property and
       * returns the array of styles to apply to the element.
       * Override this method to integrate into a style management system.
       *
       * Styles are deduplicated preserving the _last_ instance in the list. This
       * is a performance optimization to avoid duplicated styles that can occur
       * especially when composing via subclassing. The last item is kept to try
       * to preserve the cascade order with the assumption that it's most important
       * that last added styles override previous styles.
       *
       * @nocollapse
       * @category styles
       */
      static finalizeStyles(styles) {
          const elementStyles = [];
          if (Array.isArray(styles)) {
              // Dedupe the flattened array in reverse order to preserve the last items.
              // Casting to Array<unknown> works around TS error that
              // appears to come from trying to flatten a type CSSResultArray.
              const set = new Set(styles.flat(Infinity).reverse());
              // Then preserve original order by adding the set items in reverse order.
              for (const s of set) {
                  elementStyles.unshift(getCompatibleStyle$1(s));
              }
          }
          else if (styles !== undefined) {
              elementStyles.push(getCompatibleStyle$1(styles));
          }
          return elementStyles;
      }
      /**
       * Returns the property name for the given attribute `name`.
       * @nocollapse
       */
      static __attributeNameForProperty(name, options) {
          const attribute = options.attribute;
          return attribute === false
              ? undefined
              : typeof attribute === 'string'
                  ? attribute
                  : typeof name === 'string'
                      ? name.toLowerCase()
                      : undefined;
      }
      constructor() {
          super();
          this.__instanceProperties = undefined;
          /**
           * True if there is a pending update as a result of calling `requestUpdate()`.
           * Should only be read.
           * @category updates
           */
          this.isUpdatePending = false;
          /**
           * Is set to `true` after the first update. The element code cannot assume
           * that `renderRoot` exists before the element `hasUpdated`.
           * @category updates
           */
          this.hasUpdated = false;
          /**
           * Name of currently reflecting property
           */
          this.__reflectingProperty = null;
          this.__initialize();
      }
      /**
       * Internal only override point for customizing work done when elements
       * are constructed.
       */
      __initialize() {
          this.__updatePromise = new Promise((res) => (this.enableUpdating = res));
          this._$changedProperties = new Map();
          // This enqueues a microtask that ust run before the first update, so it
          // must be called before requestUpdate()
          this.__saveInstanceProperties();
          // ensures first update will be caught by an early access of
          // `updateComplete`
          this.requestUpdate();
          this.constructor._initializers?.forEach((i) => i(this));
      }
      /**
       * Registers a `ReactiveController` to participate in the element's reactive
       * update cycle. The element automatically calls into any registered
       * controllers during its lifecycle callbacks.
       *
       * If the element is connected when `addController()` is called, the
       * controller's `hostConnected()` callback will be immediately called.
       * @category controllers
       */
      addController(controller) {
          (this.__controllers ??= new Set()).add(controller);
          // If a controller is added after the element has been connected,
          // call hostConnected. Note, re-using existence of `renderRoot` here
          // (which is set in connectedCallback) to avoid the need to track a
          // first connected state.
          if (this.renderRoot !== undefined && this.isConnected) {
              controller.hostConnected?.();
          }
      }
      /**
       * Removes a `ReactiveController` from the element.
       * @category controllers
       */
      removeController(controller) {
          this.__controllers?.delete(controller);
      }
      /**
       * Fixes any properties set on the instance before upgrade time.
       * Otherwise these would shadow the accessor and break these properties.
       * The properties are stored in a Map which is played back after the
       * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
       * (<=41), properties created for native platform properties like (`id` or
       * `name`) may not have default values set in the element constructor. On
       * these browsers native properties appear on instances and therefore their
       * default value will overwrite any element default (e.g. if the element sets
       * this.id = 'id' in the constructor, the 'id' will become '' since this is
       * the native platform default).
       */
      __saveInstanceProperties() {
          const instanceProperties = new Map();
          const elementProperties = this.constructor
              .elementProperties;
          for (const p of elementProperties.keys()) {
              if (this.hasOwnProperty(p)) {
                  instanceProperties.set(p, this[p]);
                  delete this[p];
              }
          }
          if (instanceProperties.size > 0) {
              this.__instanceProperties = instanceProperties;
          }
      }
      /**
       * Returns the node into which the element should render and by default
       * creates and returns an open shadowRoot. Implement to customize where the
       * element's DOM is rendered. For example, to render into the element's
       * childNodes, return `this`.
       *
       * @return Returns a node into which to render.
       * @category rendering
       */
      createRenderRoot() {
          const renderRoot = this.shadowRoot ??
              this.attachShadow(this.constructor.shadowRootOptions);
          adoptStyles$1(renderRoot, this.constructor.elementStyles);
          return renderRoot;
      }
      /**
       * On first connection, creates the element's renderRoot, sets up
       * element styling, and enables updating.
       * @category lifecycle
       */
      connectedCallback() {
          // Create renderRoot before controllers `hostConnected`
          this.renderRoot ??=
              this.createRenderRoot();
          this.enableUpdating(true);
          this.__controllers?.forEach((c) => c.hostConnected?.());
      }
      /**
       * Note, this method should be considered final and not overridden. It is
       * overridden on the element instance with a function that triggers the first
       * update.
       * @category updates
       */
      enableUpdating(_requestedUpdate) { }
      /**
       * Allows for `super.disconnectedCallback()` in extensions while
       * reserving the possibility of making non-breaking feature additions
       * when disconnecting at some point in the future.
       * @category lifecycle
       */
      disconnectedCallback() {
          this.__controllers?.forEach((c) => c.hostDisconnected?.());
      }
      /**
       * Synchronizes property values when attributes change.
       *
       * Specifically, when an attribute is set, the corresponding property is set.
       * You should rarely need to implement this callback. If this method is
       * overridden, `super.attributeChangedCallback(name, _old, value)` must be
       * called.
       *
       * See [using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)
       * on MDN for more information about the `attributeChangedCallback`.
       * @category attributes
       */
      attributeChangedCallback(name, _old, value) {
          this._$attributeToProperty(name, value);
      }
      __propertyToAttribute(name, value) {
          const elemProperties = this.constructor.elementProperties;
          const options = elemProperties.get(name);
          const attr = this.constructor.__attributeNameForProperty(name, options);
          if (attr !== undefined && options.reflect === true) {
              const converter = options.converter?.toAttribute !==
                  undefined
                  ? options.converter
                  : defaultConverter$1;
              const attrValue = converter.toAttribute(value, options.type);
              if (this.constructor.enabledWarnings.includes('migration') &&
                  attrValue === undefined) {
                  issueWarning$4('undefined-attribute-value', `The attribute value for the ${name} property is ` +
                      `undefined on element ${this.localName}. The attribute will be ` +
                      `removed, but in the previous version of \`ReactiveElement\`, ` +
                      `the attribute would not have changed.`);
              }
              // Track if the property is being reflected to avoid
              // setting the property again via `attributeChangedCallback`. Note:
              // 1. this takes advantage of the fact that the callback is synchronous.
              // 2. will behave incorrectly if multiple attributes are in the reaction
              // stack at time of calling. However, since we process attributes
              // in `update` this should not be possible (or an extreme corner case
              // that we'd like to discover).
              // mark state reflecting
              this.__reflectingProperty = name;
              if (attrValue == null) {
                  this.removeAttribute(attr);
              }
              else {
                  this.setAttribute(attr, attrValue);
              }
              // mark state not reflecting
              this.__reflectingProperty = null;
          }
      }
      /** @internal */
      _$attributeToProperty(name, value) {
          const ctor = this.constructor;
          // Note, hint this as an `AttributeMap` so closure clearly understands
          // the type; it has issues with tracking types through statics
          const propName = ctor.__attributeToPropertyMap.get(name);
          // Use tracking info to avoid reflecting a property value to an attribute
          // if it was just set because the attribute changed.
          if (propName !== undefined && this.__reflectingProperty !== propName) {
              const options = ctor.getPropertyOptions(propName);
              const converter = typeof options.converter === 'function'
                  ? { fromAttribute: options.converter }
                  : options.converter?.fromAttribute !== undefined
                      ? options.converter
                      : defaultConverter$1;
              // mark state reflecting
              this.__reflectingProperty = propName;
              this[propName] = converter.fromAttribute(value, options.type
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              );
              // mark state not reflecting
              this.__reflectingProperty = null;
          }
      }
      /**
       * Requests an update which is processed asynchronously. This should be called
       * when an element should update based on some state not triggered by setting
       * a reactive property. In this case, pass no arguments. It should also be
       * called when manually implementing a property setter. In this case, pass the
       * property `name` and `oldValue` to ensure that any configured property
       * options are honored.
       *
       * @param name name of requesting property
       * @param oldValue old value of requesting property
       * @param options property options to use instead of the previously
       *     configured options
       * @category updates
       */
      requestUpdate(name, oldValue, options) {
          // If we have a property key, perform property update steps.
          if (name !== undefined) {
              if (name instanceof Event) {
                  issueWarning$4(``, `The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()`);
              }
              options ??= this.constructor.getPropertyOptions(name);
              const hasChanged = options.hasChanged ?? notEqual$1;
              const newValue = this[name];
              if (hasChanged(newValue, oldValue)) {
                  this._$changeProperty(name, oldValue, options);
              }
              else {
                  // Abort the request if the property should not be considered changed.
                  return;
              }
          }
          if (this.isUpdatePending === false) {
              this.__updatePromise = this.__enqueueUpdate();
          }
      }
      /**
       * @internal
       */
      _$changeProperty(name, oldValue, options) {
          // TODO (justinfagnani): Create a benchmark of Map.has() + Map.set(
          // vs just Map.set()
          if (!this._$changedProperties.has(name)) {
              this._$changedProperties.set(name, oldValue);
          }
          // Add to reflecting properties set.
          // Note, it's important that every change has a chance to add the
          // property to `__reflectingProperties`. This ensures setting
          // attribute + property reflects correctly.
          if (options.reflect === true && this.__reflectingProperty !== name) {
              (this.__reflectingProperties ??= new Set()).add(name);
          }
      }
      /**
       * Sets up the element to asynchronously update.
       */
      async __enqueueUpdate() {
          this.isUpdatePending = true;
          try {
              // Ensure any previous update has resolved before updating.
              // This `await` also ensures that property changes are batched.
              await this.__updatePromise;
          }
          catch (e) {
              // Refire any previous errors async so they do not disrupt the update
              // cycle. Errors are refired so developers have a chance to observe
              // them, and this can be done by implementing
              // `window.onunhandledrejection`.
              Promise.reject(e);
          }
          const result = this.scheduleUpdate();
          // If `scheduleUpdate` returns a Promise, we await it. This is done to
          // enable coordinating updates with a scheduler. Note, the result is
          // checked to avoid delaying an additional microtask unless we need to.
          if (result != null) {
              await result;
          }
          return !this.isUpdatePending;
      }
      /**
       * Schedules an element update. You can override this method to change the
       * timing of updates by returning a Promise. The update will await the
       * returned Promise, and you should resolve the Promise to allow the update
       * to proceed. If this method is overridden, `super.scheduleUpdate()`
       * must be called.
       *
       * For instance, to schedule updates to occur just before the next frame:
       *
       * ```ts
       * override protected async scheduleUpdate(): Promise<unknown> {
       *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
       *   super.scheduleUpdate();
       * }
       * ```
       * @category updates
       */
      scheduleUpdate() {
          const result = this.performUpdate();
          if (this.constructor.enabledWarnings.includes('async-perform-update') &&
              typeof result?.then ===
                  'function') {
              issueWarning$4('async-perform-update', `Element ${this.localName} returned a Promise from performUpdate(). ` +
                  `This behavior is deprecated and will be removed in a future ` +
                  `version of ReactiveElement.`);
          }
          return result;
      }
      /**
       * Performs an element update. Note, if an exception is thrown during the
       * update, `firstUpdated` and `updated` will not be called.
       *
       * Call `performUpdate()` to immediately process a pending update. This should
       * generally not be needed, but it can be done in rare cases when you need to
       * update synchronously.
       *
       * @category updates
       */
      performUpdate() {
          // Abort any update if one is not pending when this is called.
          // This can happen if `performUpdate` is called early to "flush"
          // the update.
          if (!this.isUpdatePending) {
              return;
          }
          debugLogEvent$2?.({ kind: 'update' });
          if (!this.hasUpdated) {
              // Create renderRoot before first update. This occurs in `connectedCallback`
              // but is done here to support out of tree calls to `enableUpdating`/`performUpdate`.
              this.renderRoot ??=
                  this.createRenderRoot();
              {
                  // Produce warning if any reactive properties on the prototype are
                  // shadowed by class fields. Instance fields set before upgrade are
                  // deleted by this point, so any own property is caused by class field
                  // initialization in the constructor.
                  const ctor = this.constructor;
                  const shadowedProperties = [...ctor.elementProperties.keys()].filter((p) => this.hasOwnProperty(p) && p in getPrototypeOf$1(this));
                  if (shadowedProperties.length) {
                      throw new Error(`The following properties on element ${this.localName} will not ` +
                          `trigger updates as expected because they are set using class ` +
                          `fields: ${shadowedProperties.join(', ')}. ` +
                          `Native class fields and some compiled output will overwrite ` +
                          `accessors used for detecting changes. See ` +
                          `https://lit.dev/msg/class-field-shadowing ` +
                          `for more information.`);
                  }
              }
              // Mixin instance properties once, if they exist.
              if (this.__instanceProperties) {
                  // TODO (justinfagnani): should we use the stored value? Could a new value
                  // have been set since we stored the own property value?
                  for (const [p, value] of this.__instanceProperties) {
                      this[p] = value;
                  }
                  this.__instanceProperties = undefined;
              }
              // Trigger initial value reflection and populate the initial
              // changedProperties map, but only for the case of experimental
              // decorators on accessors, which will not have already populated the
              // changedProperties map. We can't know if these accessors had
              // initializers, so we just set them anyway - a difference from
              // experimental decorators on fields and standard decorators on
              // auto-accessors.
              // For context why experimentalDecorators with auto accessors are handled
              // specifically also see:
              // https://github.com/lit/lit/pull/4183#issuecomment-1711959635
              const elementProperties = this.constructor
                  .elementProperties;
              if (elementProperties.size > 0) {
                  for (const [p, options] of elementProperties) {
                      if (options.wrapped === true &&
                          !this._$changedProperties.has(p) &&
                          this[p] !== undefined) {
                          this._$changeProperty(p, this[p], options);
                      }
                  }
              }
          }
          let shouldUpdate = false;
          const changedProperties = this._$changedProperties;
          try {
              shouldUpdate = this.shouldUpdate(changedProperties);
              if (shouldUpdate) {
                  this.willUpdate(changedProperties);
                  this.__controllers?.forEach((c) => c.hostUpdate?.());
                  this.update(changedProperties);
              }
              else {
                  this.__markUpdated();
              }
          }
          catch (e) {
              // Prevent `firstUpdated` and `updated` from running when there's an
              // update exception.
              shouldUpdate = false;
              // Ensure element can accept additional updates after an exception.
              this.__markUpdated();
              throw e;
          }
          // The update is no longer considered pending and further updates are now allowed.
          if (shouldUpdate) {
              this._$didUpdate(changedProperties);
          }
      }
      /**
       * Invoked before `update()` to compute values needed during the update.
       *
       * Implement `willUpdate` to compute property values that depend on other
       * properties and are used in the rest of the update process.
       *
       * ```ts
       * willUpdate(changedProperties) {
       *   // only need to check changed properties for an expensive computation.
       *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
       *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
       *   }
       * }
       *
       * render() {
       *   return html`SHA: ${this.sha}`;
       * }
       * ```
       *
       * @category updates
       */
      willUpdate(_changedProperties) { }
      // Note, this is an override point for polyfill-support.
      // @internal
      _$didUpdate(changedProperties) {
          this.__controllers?.forEach((c) => c.hostUpdated?.());
          if (!this.hasUpdated) {
              this.hasUpdated = true;
              this.firstUpdated(changedProperties);
          }
          this.updated(changedProperties);
          if (this.isUpdatePending &&
              this.constructor.enabledWarnings.includes('change-in-update')) {
              issueWarning$4('change-in-update', `Element ${this.localName} scheduled an update ` +
                  `(generally because a property was set) ` +
                  `after an update completed, causing a new update to be scheduled. ` +
                  `This is inefficient and should be avoided unless the next update ` +
                  `can only be scheduled as a side effect of the previous update.`);
          }
      }
      __markUpdated() {
          this._$changedProperties = new Map();
          this.isUpdatePending = false;
      }
      /**
       * Returns a Promise that resolves when the element has completed updating.
       * The Promise value is a boolean that is `true` if the element completed the
       * update without triggering another update. The Promise result is `false` if
       * a property was set inside `updated()`. If the Promise is rejected, an
       * exception was thrown during the update.
       *
       * To await additional asynchronous work, override the `getUpdateComplete`
       * method. For example, it is sometimes useful to await a rendered element
       * before fulfilling this Promise. To do this, first await
       * `super.getUpdateComplete()`, then any subsequent state.
       *
       * @return A promise of a boolean that resolves to true if the update completed
       *     without triggering another update.
       * @category updates
       */
      get updateComplete() {
          return this.getUpdateComplete();
      }
      /**
       * Override point for the `updateComplete` promise.
       *
       * It is not safe to override the `updateComplete` getter directly due to a
       * limitation in TypeScript which means it is not possible to call a
       * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
       * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
       * This method should be overridden instead. For example:
       *
       * ```ts
       * class MyElement extends LitElement {
       *   override async getUpdateComplete() {
       *     const result = await super.getUpdateComplete();
       *     await this._myChild.updateComplete;
       *     return result;
       *   }
       * }
       * ```
       *
       * @return A promise of a boolean that resolves to true if the update completed
       *     without triggering another update.
       * @category updates
       */
      getUpdateComplete() {
          return this.__updatePromise;
      }
      /**
       * Controls whether or not `update()` should be called when the element requests
       * an update. By default, this method always returns `true`, but this can be
       * customized to control when to update.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      shouldUpdate(_changedProperties) {
          return true;
      }
      /**
       * Updates the element. This method reflects property values to attributes.
       * It can be overridden to render and keep updated element DOM.
       * Setting properties inside this method will *not* trigger
       * another update.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      update(_changedProperties) {
          // The forEach() expression will only run when when __reflectingProperties is
          // defined, and it returns undefined, setting __reflectingProperties to
          // undefined
          this.__reflectingProperties &&= this.__reflectingProperties.forEach((p) => this.__propertyToAttribute(p, this[p]));
          this.__markUpdated();
      }
      /**
       * Invoked whenever the element is updated. Implement to perform
       * post-updating tasks via DOM APIs, for example, focusing an element.
       *
       * Setting properties inside this method will trigger the element to update
       * again after this update cycle completes.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      updated(_changedProperties) { }
      /**
       * Invoked when the element is first updated. Implement to perform one time
       * work on the element after update.
       *
       * ```ts
       * firstUpdated() {
       *   this.renderRoot.getElementById('my-text-area').focus();
       * }
       * ```
       *
       * Setting properties inside this method will trigger the element to update
       * again after this update cycle completes.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      firstUpdated(_changedProperties) { }
  }
  /**
   * Memoized list of all element styles.
   * Created lazily on user subclasses when finalizing the class.
   * @nocollapse
   * @category styles
   */
  ReactiveElement$1.elementStyles = [];
  /**
   * Options used when calling `attachShadow`. Set this property to customize
   * the options for the shadowRoot; for example, to create a closed
   * shadowRoot: `{mode: 'closed'}`.
   *
   * Note, these options are used in `createRenderRoot`. If this method
   * is customized, options should be respected if possible.
   * @nocollapse
   * @category rendering
   */
  ReactiveElement$1.shadowRootOptions = { mode: 'open' };
  // Assigned here to work around a jscompiler bug with static fields
  // when compiling to ES5.
  // https://github.com/google/closure-compiler/issues/3177
  ReactiveElement$1[JSCompiler_renameProperty$2('elementProperties')] = new Map();
  ReactiveElement$1[JSCompiler_renameProperty$2('finalized')] = new Map();
  // Apply polyfills if available
  polyfillSupport$3?.({ ReactiveElement: ReactiveElement$1 });
  // Dev mode warnings...
  {
      // Default warning set.
      ReactiveElement$1.enabledWarnings = [
          'change-in-update',
          'async-perform-update',
      ];
      const ensureOwnWarnings = function (ctor) {
          if (!ctor.hasOwnProperty(JSCompiler_renameProperty$2('enabledWarnings'))) {
              ctor.enabledWarnings = ctor.enabledWarnings.slice();
          }
      };
      ReactiveElement$1.enableWarning = function (warning) {
          ensureOwnWarnings(this);
          if (!this.enabledWarnings.includes(warning)) {
              this.enabledWarnings.push(warning);
          }
      };
      ReactiveElement$1.disableWarning = function (warning) {
          ensureOwnWarnings(this);
          const i = this.enabledWarnings.indexOf(warning);
          if (i >= 0) {
              this.enabledWarnings.splice(i, 1);
          }
      };
  }
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for ReactiveElement usage.
  (global$3.reactiveElementVersions ??= []).push('2.0.4');
  if (global$3.reactiveElementVersions.length > 1) {
      issueWarning$4('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` +
          `is not recommended.`);
  }

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  // Allows minifiers to rename references to globalThis
  const global$2 = globalThis;
  /**
   * Useful for visualizing and logging insights into what the Lit template system is doing.
   *
   * Compiled out of prod mode builds.
   */
  const debugLogEvent$1 = (event) => {
          const shouldEmit = global$2
              .emitLitDebugLogEvents;
          if (!shouldEmit) {
              return;
          }
          global$2.dispatchEvent(new CustomEvent('lit-debug', {
              detail: event,
          }));
      }
      ;
  // Used for connecting beginRender and endRender events when there are nested
  // renders when errors are thrown preventing an endRender event from being
  // called.
  let debugLogRenderId = 0;
  let issueWarning$3;
  {
      global$2.litIssuedWarnings ??= new Set();
      // Issue a warning, if we haven't already.
      issueWarning$3 = (code, warning) => {
          warning += code
              ? ` See https://lit.dev/msg/${code} for more information.`
              : '';
          if (!global$2.litIssuedWarnings.has(warning)) {
              console.warn(warning);
              global$2.litIssuedWarnings.add(warning);
          }
      };
      issueWarning$3('dev-mode', `Lit is in dev mode. Not recommended for production!`);
  }
  const wrap = global$2.ShadyDOM?.inUse &&
      global$2.ShadyDOM?.noPatch === true
      ? global$2.ShadyDOM.wrap
      : (node) => node;
  const trustedTypes$1 = global$2.trustedTypes;
  /**
   * Our TrustedTypePolicy for HTML which is declared using the html template
   * tag function.
   *
   * That HTML is a developer-authored constant, and is parsed with innerHTML
   * before any untrusted expressions have been mixed in. Therefor it is
   * considered safe by construction.
   */
  const policy = trustedTypes$1
      ? trustedTypes$1.createPolicy('lit-html', {
          createHTML: (s) => s,
      })
      : undefined;
  const identityFunction = (value) => value;
  const noopSanitizer = (_node, _name, _type) => identityFunction;
  /** Sets the global sanitizer factory. */
  const setSanitizer = (newSanitizer) => {
      if (sanitizerFactoryInternal !== noopSanitizer) {
          throw new Error(`Attempted to overwrite existing lit-html security policy.` +
              ` setSanitizeDOMValueFactory should be called at most once.`);
      }
      sanitizerFactoryInternal = newSanitizer;
  };
  /**
   * Only used in internal tests, not a part of the public API.
   */
  const _testOnlyClearSanitizerFactoryDoNotCallOrElse = () => {
      sanitizerFactoryInternal = noopSanitizer;
  };
  const createSanitizer = (node, name, type) => {
      return sanitizerFactoryInternal(node, name, type);
  };
  // Added to an attribute name to mark the attribute as bound so we can find
  // it easily.
  const boundAttributeSuffix = '$lit$';
  // This marker is used in many syntactic positions in HTML, so it must be
  // a valid element name and attribute name. We don't support dynamic names (yet)
  // but this at least ensures that the parse tree is closer to the template
  // intention.
  const marker = `lit$${Math.random().toFixed(9).slice(2)}$`;
  // String used to tell if a comment is a marker comment
  const markerMatch = '?' + marker;
  // Text used to insert a comment marker node. We use processing instruction
  // syntax because it's slightly smaller, but parses as a comment node.
  const nodeMarker = `<${markerMatch}>`;
  const d = document;
  // Creates a dynamic marker. We never have to search for these in the DOM.
  const createMarker = () => d.createComment('');
  const isPrimitive = (value) => value === null || (typeof value != 'object' && typeof value != 'function');
  const isArray = Array.isArray;
  const isIterable = (value) => isArray(value) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof value?.[Symbol.iterator] === 'function';
  const SPACE_CHAR = `[ \t\n\f\r]`;
  const ATTR_VALUE_CHAR = `[^ \t\n\f\r"'\`<>=]`;
  const NAME_CHAR = `[^\\s"'>=/]`;
  // These regexes represent the five parsing states that we care about in the
  // Template's HTML scanner. They match the *end* of the state they're named
  // after.
  // Depending on the match, we transition to a new state. If there's no match,
  // we stay in the same state.
  // Note that the regexes are stateful. We utilize lastIndex and sync it
  // across the multiple regexes used. In addition to the five regexes below
  // we also dynamically create a regex to find the matching end tags for raw
  // text elements.
  /**
   * End of text is: `<` followed by:
   *   (comment start) or (tag) or (dynamic tag binding)
   */
  const textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  const COMMENT_START = 1;
  const TAG_NAME = 2;
  const DYNAMIC_TAG_NAME = 3;
  const commentEndRegex = /-->/g;
  /**
   * Comments not started with <!--, like </{, can be ended by a single `>`
   */
  const comment2EndRegex = />/g;
  /**
   * The tagEnd regex matches the end of the "inside an opening" tag syntax
   * position. It either matches a `>`, an attribute-like sequence, or the end
   * of the string after a space (attribute-name position ending).
   *
   * See attributes in the HTML spec:
   * https://www.w3.org/TR/html5/syntax.html#elements-attributes
   *
   * " \t\n\f\r" are HTML space characters:
   * https://infra.spec.whatwg.org/#ascii-whitespace
   *
   * So an attribute is:
   *  * The name: any character except a whitespace character, ("), ('), ">",
   *    "=", or "/". Note: this is different from the HTML spec which also excludes control characters.
   *  * Followed by zero or more space characters
   *  * Followed by "="
   *  * Followed by zero or more space characters
   *  * Followed by:
   *    * Any character except space, ('), ("), "<", ">", "=", (`), or
   *    * (") then any non-("), or
   *    * (') then any non-(')
   */
  const tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, 'g');
  const ENTIRE_MATCH = 0;
  const ATTRIBUTE_NAME = 1;
  const SPACES_AND_EQUALS = 2;
  const QUOTE_CHAR = 3;
  const singleQuoteAttrEndRegex = /'/g;
  const doubleQuoteAttrEndRegex = /"/g;
  /**
   * Matches the raw text elements.
   *
   * Comments are not parsed within raw text elements, so we need to search their
   * text content for marker strings.
   */
  const rawTextElement = /^(?:script|style|textarea|title)$/i;
  /** TemplateResult types */
  const HTML_RESULT = 1;
  const SVG_RESULT = 2;
  const MATHML_RESULT = 3;
  // TemplatePart types
  // IMPORTANT: these must match the values in PartType
  const ATTRIBUTE_PART = 1;
  const CHILD_PART = 2;
  const PROPERTY_PART = 3;
  const BOOLEAN_ATTRIBUTE_PART = 4;
  const EVENT_PART = 5;
  const ELEMENT_PART = 6;
  const COMMENT_PART = 7;
  /**
   * Generates a template literal tag function that returns a TemplateResult with
   * the given result type.
   */
  const tag = (type) => (strings, ...values) => {
      // Warn against templates octal escape sequences
      // We do this here rather than in render so that the warning is closer to the
      // template definition.
      if (strings.some((s) => s === undefined)) {
          console.warn('Some template strings are undefined.\n' +
              'This is probably caused by illegal octal escape sequences.');
      }
      {
          // Import static-html.js results in a circular dependency which g3 doesn't
          // handle. Instead we know that static values must have the field
          // `_$litStatic$`.
          if (values.some((val) => val?.['_$litStatic$'])) {
              issueWarning$3('', `Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.\n` +
                  `Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`);
          }
      }
      return {
          // This property needs to remain unminified.
          ['_$litType$']: type,
          strings,
          values,
      };
  };
  /**
   * Interprets a template literal as an HTML template that can efficiently
   * render to and update a container.
   *
   * ```ts
   * const header = (title: string) => html`<h1>${title}</h1>`;
   * ```
   *
   * The `html` tag returns a description of the DOM to render as a value. It is
   * lazy, meaning no work is done until the template is rendered. When rendering,
   * if a template comes from the same expression as a previously rendered result,
   * it's efficiently updated instead of replaced.
   */
  const html = tag(HTML_RESULT);
  /**
   * A sentinel value that signals that a value was handled by a directive and
   * should not be written to the DOM.
   */
  const noChange = Symbol.for('lit-noChange');
  /**
   * A sentinel value that signals a ChildPart to fully clear its content.
   *
   * ```ts
   * const button = html`${
   *  user.isAdmin
   *    ? html`<button>DELETE</button>`
   *    : nothing
   * }`;
   * ```
   *
   * Prefer using `nothing` over other falsy values as it provides a consistent
   * behavior between various expression binding contexts.
   *
   * In child expressions, `undefined`, `null`, `''`, and `nothing` all behave the
   * same and render no nodes. In attribute expressions, `nothing` _removes_ the
   * attribute, while `undefined` and `null` will render an empty string. In
   * property expressions `nothing` becomes `undefined`.
   */
  const nothing = Symbol.for('lit-nothing');
  /**
   * The cache of prepared templates, keyed by the tagged TemplateStringsArray
   * and _not_ accounting for the specific template tag used. This means that
   * template tags cannot be dynamic - they must statically be one of html, svg,
   * or attr. This restriction simplifies the cache lookup, which is on the hot
   * path for rendering.
   */
  const templateCache = new WeakMap();
  const walker = d.createTreeWalker(d, 129 /* NodeFilter.SHOW_{ELEMENT|COMMENT} */);
  let sanitizerFactoryInternal = noopSanitizer;
  function trustFromTemplateString(tsa, stringFromTSA) {
      // A security check to prevent spoofing of Lit template results.
      // In the future, we may be able to replace this with Array.isTemplateObject,
      // though we might need to make that check inside of the html and svg
      // functions, because precompiled templates don't come in as
      // TemplateStringArray objects.
      if (!isArray(tsa) || !tsa.hasOwnProperty('raw')) {
          let message = 'invalid template strings array';
          {
              message = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `
                  .trim()
                  .replace(/\n */g, '\n');
          }
          throw new Error(message);
      }
      return policy !== undefined
          ? policy.createHTML(stringFromTSA)
          : stringFromTSA;
  }
  /**
   * Returns an HTML string for the given TemplateStringsArray and result type
   * (HTML or SVG), along with the case-sensitive bound attribute names in
   * template order. The HTML contains comment markers denoting the `ChildPart`s
   * and suffixes on bound attributes denoting the `AttributeParts`.
   *
   * @param strings template strings array
   * @param type HTML or SVG
   * @return Array containing `[html, attrNames]` (array returned for terseness,
   *     to avoid object fields since this code is shared with non-minified SSR
   *     code)
   */
  const getTemplateHtml = (strings, type) => {
      // Insert makers into the template HTML to represent the position of
      // bindings. The following code scans the template strings to determine the
      // syntactic position of the bindings. They can be in text position, where
      // we insert an HTML comment, attribute value position, where we insert a
      // sentinel string and re-write the attribute name, or inside a tag where
      // we insert the sentinel string.
      const l = strings.length - 1;
      // Stores the case-sensitive bound attribute names in the order of their
      // parts. ElementParts are also reflected in this array as undefined
      // rather than a string, to disambiguate from attribute bindings.
      const attrNames = [];
      let html = type === SVG_RESULT ? '<svg>' : type === MATHML_RESULT ? '<math>' : '';
      // When we're inside a raw text tag (not it's text content), the regex
      // will still be tagRegex so we can find attributes, but will switch to
      // this regex when the tag ends.
      let rawTextEndRegex;
      // The current parsing state, represented as a reference to one of the
      // regexes
      let regex = textEndRegex;
      for (let i = 0; i < l; i++) {
          const s = strings[i];
          // The index of the end of the last attribute name. When this is
          // positive at end of a string, it means we're in an attribute value
          // position and need to rewrite the attribute name.
          // We also use a special value of -2 to indicate that we encountered
          // the end of a string in attribute name position.
          let attrNameEndIndex = -1;
          let attrName;
          let lastIndex = 0;
          let match;
          // The conditions in this loop handle the current parse state, and the
          // assignments to the `regex` variable are the state transitions.
          while (lastIndex < s.length) {
              // Make sure we start searching from where we previously left off
              regex.lastIndex = lastIndex;
              match = regex.exec(s);
              if (match === null) {
                  break;
              }
              lastIndex = regex.lastIndex;
              if (regex === textEndRegex) {
                  if (match[COMMENT_START] === '!--') {
                      regex = commentEndRegex;
                  }
                  else if (match[COMMENT_START] !== undefined) {
                      // We started a weird comment, like </{
                      regex = comment2EndRegex;
                  }
                  else if (match[TAG_NAME] !== undefined) {
                      if (rawTextElement.test(match[TAG_NAME])) {
                          // Record if we encounter a raw-text element. We'll switch to
                          // this regex at the end of the tag.
                          rawTextEndRegex = new RegExp(`</${match[TAG_NAME]}`, 'g');
                      }
                      regex = tagEndRegex;
                  }
                  else if (match[DYNAMIC_TAG_NAME] !== undefined) {
                      {
                          throw new Error('Bindings in tag names are not supported. Please use static templates instead. ' +
                              'See https://lit.dev/docs/templates/expressions/#static-expressions');
                      }
                  }
              }
              else if (regex === tagEndRegex) {
                  if (match[ENTIRE_MATCH] === '>') {
                      // End of a tag. If we had started a raw-text element, use that
                      // regex
                      regex = rawTextEndRegex ?? textEndRegex;
                      // We may be ending an unquoted attribute value, so make sure we
                      // clear any pending attrNameEndIndex
                      attrNameEndIndex = -1;
                  }
                  else if (match[ATTRIBUTE_NAME] === undefined) {
                      // Attribute name position
                      attrNameEndIndex = -2;
                  }
                  else {
                      attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
                      attrName = match[ATTRIBUTE_NAME];
                      regex =
                          match[QUOTE_CHAR] === undefined
                              ? tagEndRegex
                              : match[QUOTE_CHAR] === '"'
                                  ? doubleQuoteAttrEndRegex
                                  : singleQuoteAttrEndRegex;
                  }
              }
              else if (regex === doubleQuoteAttrEndRegex ||
                  regex === singleQuoteAttrEndRegex) {
                  regex = tagEndRegex;
              }
              else if (regex === commentEndRegex || regex === comment2EndRegex) {
                  regex = textEndRegex;
              }
              else {
                  // Not one of the five state regexes, so it must be the dynamically
                  // created raw text regex and we're at the close of that element.
                  regex = tagEndRegex;
                  rawTextEndRegex = undefined;
              }
          }
          {
              // If we have a attrNameEndIndex, which indicates that we should
              // rewrite the attribute name, assert that we're in a valid attribute
              // position - either in a tag, or a quoted attribute value.
              console.assert(attrNameEndIndex === -1 ||
                  regex === tagEndRegex ||
                  regex === singleQuoteAttrEndRegex ||
                  regex === doubleQuoteAttrEndRegex, 'unexpected parse state B');
          }
          // We have four cases:
          //  1. We're in text position, and not in a raw text element
          //     (regex === textEndRegex): insert a comment marker.
          //  2. We have a non-negative attrNameEndIndex which means we need to
          //     rewrite the attribute name to add a bound attribute suffix.
          //  3. We're at the non-first binding in a multi-binding attribute, use a
          //     plain marker.
          //  4. We're somewhere else inside the tag. If we're in attribute name
          //     position (attrNameEndIndex === -2), add a sequential suffix to
          //     generate a unique attribute name.
          // Detect a binding next to self-closing tag end and insert a space to
          // separate the marker from the tag end:
          const end = regex === tagEndRegex && strings[i + 1].startsWith('/>') ? ' ' : '';
          html +=
              regex === textEndRegex
                  ? s + nodeMarker
                  : attrNameEndIndex >= 0
                      ? (attrNames.push(attrName),
                          s.slice(0, attrNameEndIndex) +
                              boundAttributeSuffix +
                              s.slice(attrNameEndIndex)) +
                          marker +
                          end
                      : s + marker + (attrNameEndIndex === -2 ? i : end);
      }
      const htmlResult = html +
          (strings[l] || '<?>') +
          (type === SVG_RESULT ? '</svg>' : type === MATHML_RESULT ? '</math>' : '');
      // Returned as an array for terseness
      return [trustFromTemplateString(strings, htmlResult), attrNames];
  };
  class Template {
      constructor(
      // This property needs to remain unminified.
      { strings, ['_$litType$']: type }, options) {
          this.parts = [];
          let node;
          let nodeIndex = 0;
          let attrNameIndex = 0;
          const partCount = strings.length - 1;
          const parts = this.parts;
          // Create template element
          const [html, attrNames] = getTemplateHtml(strings, type);
          this.el = Template.createElement(html, options);
          walker.currentNode = this.el.content;
          // Re-parent SVG or MathML nodes into template root
          if (type === SVG_RESULT || type === MATHML_RESULT) {
              const wrapper = this.el.content.firstChild;
              wrapper.replaceWith(...wrapper.childNodes);
          }
          // Walk the template to find binding markers and create TemplateParts
          while ((node = walker.nextNode()) !== null && parts.length < partCount) {
              if (node.nodeType === 1) {
                  {
                      const tag = node.localName;
                      // Warn if `textarea` includes an expression and throw if `template`
                      // does since these are not supported. We do this by checking
                      // innerHTML for anything that looks like a marker. This catches
                      // cases like bindings in textarea there markers turn into text nodes.
                      if (/^(?:textarea|template)$/i.test(tag) &&
                          node.innerHTML.includes(marker)) {
                          const m = `Expressions are not supported inside \`${tag}\` ` +
                              `elements. See https://lit.dev/msg/expression-in-${tag} for more ` +
                              `information.`;
                          if (tag === 'template') {
                              throw new Error(m);
                          }
                          else
                              issueWarning$3('', m);
                      }
                  }
                  // TODO (justinfagnani): for attempted dynamic tag names, we don't
                  // increment the bindingIndex, and it'll be off by 1 in the element
                  // and off by two after it.
                  if (node.hasAttributes()) {
                      for (const name of node.getAttributeNames()) {
                          if (name.endsWith(boundAttributeSuffix)) {
                              const realName = attrNames[attrNameIndex++];
                              const value = node.getAttribute(name);
                              const statics = value.split(marker);
                              const m = /([.?@])?(.*)/.exec(realName);
                              parts.push({
                                  type: ATTRIBUTE_PART,
                                  index: nodeIndex,
                                  name: m[2],
                                  strings: statics,
                                  ctor: m[1] === '.'
                                      ? PropertyPart
                                      : m[1] === '?'
                                          ? BooleanAttributePart
                                          : m[1] === '@'
                                              ? EventPart
                                              : AttributePart,
                              });
                              node.removeAttribute(name);
                          }
                          else if (name.startsWith(marker)) {
                              parts.push({
                                  type: ELEMENT_PART,
                                  index: nodeIndex,
                              });
                              node.removeAttribute(name);
                          }
                      }
                  }
                  // TODO (justinfagnani): benchmark the regex against testing for each
                  // of the 3 raw text element names.
                  if (rawTextElement.test(node.tagName)) {
                      // For raw text elements we need to split the text content on
                      // markers, create a Text node for each segment, and create
                      // a TemplatePart for each marker.
                      const strings = node.textContent.split(marker);
                      const lastIndex = strings.length - 1;
                      if (lastIndex > 0) {
                          node.textContent = trustedTypes$1
                              ? trustedTypes$1.emptyScript
                              : '';
                          // Generate a new text node for each literal section
                          // These nodes are also used as the markers for node parts
                          // We can't use empty text nodes as markers because they're
                          // normalized when cloning in IE (could simplify when
                          // IE is no longer supported)
                          for (let i = 0; i < lastIndex; i++) {
                              node.append(strings[i], createMarker());
                              // Walk past the marker node we just added
                              walker.nextNode();
                              parts.push({ type: CHILD_PART, index: ++nodeIndex });
                          }
                          // Note because this marker is added after the walker's current
                          // node, it will be walked to in the outer loop (and ignored), so
                          // we don't need to adjust nodeIndex here
                          node.append(strings[lastIndex], createMarker());
                      }
                  }
              }
              else if (node.nodeType === 8) {
                  const data = node.data;
                  if (data === markerMatch) {
                      parts.push({ type: CHILD_PART, index: nodeIndex });
                  }
                  else {
                      let i = -1;
                      while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                          // Comment node has a binding marker inside, make an inactive part
                          // The binding won't work, but subsequent bindings will
                          parts.push({ type: COMMENT_PART, index: nodeIndex });
                          // Move to the end of the match
                          i += marker.length - 1;
                      }
                  }
              }
              nodeIndex++;
          }
          {
              // If there was a duplicate attribute on a tag, then when the tag is
              // parsed into an element the attribute gets de-duplicated. We can detect
              // this mismatch if we haven't precisely consumed every attribute name
              // when preparing the template. This works because `attrNames` is built
              // from the template string and `attrNameIndex` comes from processing the
              // resulting DOM.
              if (attrNames.length !== attrNameIndex) {
                  throw new Error(`Detected duplicate attribute bindings. This occurs if your template ` +
                      `has duplicate attributes on an element tag. For example ` +
                      `"<input ?disabled=\${true} ?disabled=\${false}>" contains a ` +
                      `duplicate "disabled" attribute. The error was detected in ` +
                      `the following template: \n` +
                      '`' +
                      strings.join('${...}') +
                      '`');
              }
          }
          // We could set walker.currentNode to another node here to prevent a memory
          // leak, but every time we prepare a template, we immediately render it
          // and re-use the walker in new TemplateInstance._clone().
          debugLogEvent$1 &&
              debugLogEvent$1({
                  kind: 'template prep',
                  template: this,
                  clonableTemplate: this.el,
                  parts: this.parts,
                  strings,
              });
      }
      // Overridden via `litHtmlPolyfillSupport` to provide platform support.
      /** @nocollapse */
      static createElement(html, _options) {
          const el = d.createElement('template');
          el.innerHTML = html;
          return el;
      }
  }
  function resolveDirective(part, value, parent = part, attributeIndex) {
      // Bail early if the value is explicitly noChange. Note, this means any
      // nested directive is still attached and is not run.
      if (value === noChange) {
          return value;
      }
      let currentDirective = attributeIndex !== undefined
          ? parent.__directives?.[attributeIndex]
          : parent.__directive;
      const nextDirectiveConstructor = isPrimitive(value)
          ? undefined
          : // This property needs to remain unminified.
              value['_$litDirective$'];
      if (currentDirective?.constructor !== nextDirectiveConstructor) {
          // This property needs to remain unminified.
          currentDirective?.['_$notifyDirectiveConnectionChanged']?.(false);
          if (nextDirectiveConstructor === undefined) {
              currentDirective = undefined;
          }
          else {
              currentDirective = new nextDirectiveConstructor(part);
              currentDirective._$initialize(part, parent, attributeIndex);
          }
          if (attributeIndex !== undefined) {
              (parent.__directives ??= [])[attributeIndex] =
                  currentDirective;
          }
          else {
              parent.__directive = currentDirective;
          }
      }
      if (currentDirective !== undefined) {
          value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
      }
      return value;
  }
  /**
   * An updateable instance of a Template. Holds references to the Parts used to
   * update the template instance.
   */
  class TemplateInstance {
      constructor(template, parent) {
          this._$parts = [];
          /** @internal */
          this._$disconnectableChildren = undefined;
          this._$template = template;
          this._$parent = parent;
      }
      // Called by ChildPart parentNode getter
      get parentNode() {
          return this._$parent.parentNode;
      }
      // See comment in Disconnectable interface for why this is a getter
      get _$isConnected() {
          return this._$parent._$isConnected;
      }
      // This method is separate from the constructor because we need to return a
      // DocumentFragment and we don't want to hold onto it with an instance field.
      _clone(options) {
          const { el: { content }, parts: parts, } = this._$template;
          const fragment = (options?.creationScope ?? d).importNode(content, true);
          walker.currentNode = fragment;
          let node = walker.nextNode();
          let nodeIndex = 0;
          let partIndex = 0;
          let templatePart = parts[0];
          while (templatePart !== undefined) {
              if (nodeIndex === templatePart.index) {
                  let part;
                  if (templatePart.type === CHILD_PART) {
                      part = new ChildPart(node, node.nextSibling, this, options);
                  }
                  else if (templatePart.type === ATTRIBUTE_PART) {
                      part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
                  }
                  else if (templatePart.type === ELEMENT_PART) {
                      part = new ElementPart(node, this, options);
                  }
                  this._$parts.push(part);
                  templatePart = parts[++partIndex];
              }
              if (nodeIndex !== templatePart?.index) {
                  node = walker.nextNode();
                  nodeIndex++;
              }
          }
          // We need to set the currentNode away from the cloned tree so that we
          // don't hold onto the tree even if the tree is detached and should be
          // freed.
          walker.currentNode = d;
          return fragment;
      }
      _update(values) {
          let i = 0;
          for (const part of this._$parts) {
              if (part !== undefined) {
                  debugLogEvent$1 &&
                      debugLogEvent$1({
                          kind: 'set part',
                          part,
                          value: values[i],
                          valueIndex: i,
                          values,
                          templateInstance: this,
                      });
                  if (part.strings !== undefined) {
                      part._$setValue(values, part, i);
                      // The number of values the part consumes is part.strings.length - 1
                      // since values are in between template spans. We increment i by 1
                      // later in the loop, so increment it by part.strings.length - 2 here
                      i += part.strings.length - 2;
                  }
                  else {
                      part._$setValue(values[i]);
                  }
              }
              i++;
          }
      }
  }
  class ChildPart {
      // See comment in Disconnectable interface for why this is a getter
      get _$isConnected() {
          // ChildParts that are not at the root should always be created with a
          // parent; only RootChildNode's won't, so they return the local isConnected
          // state
          return this._$parent?._$isConnected ?? this.__isConnected;
      }
      constructor(startNode, endNode, parent, options) {
          this.type = CHILD_PART;
          this._$committedValue = nothing;
          // The following fields will be patched onto ChildParts when required by
          // AsyncDirective
          /** @internal */
          this._$disconnectableChildren = undefined;
          this._$startNode = startNode;
          this._$endNode = endNode;
          this._$parent = parent;
          this.options = options;
          // Note __isConnected is only ever accessed on RootParts (i.e. when there is
          // no _$parent); the value on a non-root-part is "don't care", but checking
          // for parent would be more code
          this.__isConnected = options?.isConnected ?? true;
          {
              // Explicitly initialize for consistent class shape.
              this._textSanitizer = undefined;
          }
      }
      /**
       * The parent node into which the part renders its content.
       *
       * A ChildPart's content consists of a range of adjacent child nodes of
       * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
       * `.endNode`).
       *
       * - If both `.startNode` and `.endNode` are non-null, then the part's content
       * consists of all siblings between `.startNode` and `.endNode`, exclusively.
       *
       * - If `.startNode` is non-null but `.endNode` is null, then the part's
       * content consists of all siblings following `.startNode`, up to and
       * including the last child of `.parentNode`. If `.endNode` is non-null, then
       * `.startNode` will always be non-null.
       *
       * - If both `.endNode` and `.startNode` are null, then the part's content
       * consists of all child nodes of `.parentNode`.
       */
      get parentNode() {
          let parentNode = wrap(this._$startNode).parentNode;
          const parent = this._$parent;
          if (parent !== undefined &&
              parentNode?.nodeType === 11 /* Node.DOCUMENT_FRAGMENT */) {
              // If the parentNode is a DocumentFragment, it may be because the DOM is
              // still in the cloned fragment during initial render; if so, get the real
              // parentNode the part will be committed into by asking the parent.
              parentNode = parent.parentNode;
          }
          return parentNode;
      }
      /**
       * The part's leading marker node, if any. See `.parentNode` for more
       * information.
       */
      get startNode() {
          return this._$startNode;
      }
      /**
       * The part's trailing marker node, if any. See `.parentNode` for more
       * information.
       */
      get endNode() {
          return this._$endNode;
      }
      _$setValue(value, directiveParent = this) {
          if (this.parentNode === null) {
              throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
          }
          value = resolveDirective(this, value, directiveParent);
          if (isPrimitive(value)) {
              // Non-rendering child values. It's important that these do not render
              // empty text nodes to avoid issues with preventing default <slot>
              // fallback content.
              if (value === nothing || value == null || value === '') {
                  if (this._$committedValue !== nothing) {
                      debugLogEvent$1 &&
                          debugLogEvent$1({
                              kind: 'commit nothing to child',
                              start: this._$startNode,
                              end: this._$endNode,
                              parent: this._$parent,
                              options: this.options,
                          });
                      this._$clear();
                  }
                  this._$committedValue = nothing;
              }
              else if (value !== this._$committedValue && value !== noChange) {
                  this._commitText(value);
              }
              // This property needs to remain unminified.
          }
          else if (value['_$litType$'] !== undefined) {
              this._commitTemplateResult(value);
          }
          else if (value.nodeType !== undefined) {
              if (this.options?.host === value) {
                  this._commitText(`[probable mistake: rendered a template's host in itself ` +
                      `(commonly caused by writing \${this} in a template]`);
                  console.warn(`Attempted to render the template host`, value, `inside itself. This is almost always a mistake, and in dev mode `, `we render some warning text. In production however, we'll `, `render it, which will usually result in an error, and sometimes `, `in the element disappearing from the DOM.`);
                  return;
              }
              this._commitNode(value);
          }
          else if (isIterable(value)) {
              this._commitIterable(value);
          }
          else {
              // Fallback, will render the string representation
              this._commitText(value);
          }
      }
      _insert(node) {
          return wrap(wrap(this._$startNode).parentNode).insertBefore(node, this._$endNode);
      }
      _commitNode(value) {
          if (this._$committedValue !== value) {
              this._$clear();
              if (sanitizerFactoryInternal !== noopSanitizer) {
                  const parentNodeName = this._$startNode.parentNode?.nodeName;
                  if (parentNodeName === 'STYLE' || parentNodeName === 'SCRIPT') {
                      let message = 'Forbidden';
                      {
                          if (parentNodeName === 'STYLE') {
                              message =
                                  `Lit does not support binding inside style nodes. ` +
                                      `This is a security risk, as style injection attacks can ` +
                                      `exfiltrate data and spoof UIs. ` +
                                      `Consider instead using css\`...\` literals ` +
                                      `to compose styles, and do dynamic styling with ` +
                                      `css custom properties, ::parts, <slot>s, ` +
                                      `and by mutating the DOM rather than stylesheets.`;
                          }
                          else {
                              message =
                                  `Lit does not support binding inside script nodes. ` +
                                      `This is a security risk, as it could allow arbitrary ` +
                                      `code execution.`;
                          }
                      }
                      throw new Error(message);
                  }
              }
              debugLogEvent$1 &&
                  debugLogEvent$1({
                      kind: 'commit node',
                      start: this._$startNode,
                      parent: this._$parent,
                      value: value,
                      options: this.options,
                  });
              this._$committedValue = this._insert(value);
          }
      }
      _commitText(value) {
          // If the committed value is a primitive it means we called _commitText on
          // the previous render, and we know that this._$startNode.nextSibling is a
          // Text node. We can now just replace the text content (.data) of the node.
          if (this._$committedValue !== nothing &&
              isPrimitive(this._$committedValue)) {
              const node = wrap(this._$startNode).nextSibling;
              {
                  if (this._textSanitizer === undefined) {
                      this._textSanitizer = createSanitizer(node, 'data', 'property');
                  }
                  value = this._textSanitizer(value);
              }
              debugLogEvent$1 &&
                  debugLogEvent$1({
                      kind: 'commit text',
                      node,
                      value,
                      options: this.options,
                  });
              node.data = value;
          }
          else {
              {
                  const textNode = d.createTextNode('');
                  this._commitNode(textNode);
                  // When setting text content, for security purposes it matters a lot
                  // what the parent is. For example, <style> and <script> need to be
                  // handled with care, while <span> does not. So first we need to put a
                  // text node into the document, then we can sanitize its content.
                  if (this._textSanitizer === undefined) {
                      this._textSanitizer = createSanitizer(textNode, 'data', 'property');
                  }
                  value = this._textSanitizer(value);
                  debugLogEvent$1 &&
                      debugLogEvent$1({
                          kind: 'commit text',
                          node: textNode,
                          value,
                          options: this.options,
                      });
                  textNode.data = value;
              }
          }
          this._$committedValue = value;
      }
      _commitTemplateResult(result) {
          // This property needs to remain unminified.
          const { values, ['_$litType$']: type } = result;
          // If $litType$ is a number, result is a plain TemplateResult and we get
          // the template from the template cache. If not, result is a
          // CompiledTemplateResult and _$litType$ is a CompiledTemplate and we need
          // to create the <template> element the first time we see it.
          const template = typeof type === 'number'
              ? this._$getTemplate(result)
              : (type.el === undefined &&
                  (type.el = Template.createElement(trustFromTemplateString(type.h, type.h[0]), this.options)),
                  type);
          if (this._$committedValue?._$template === template) {
              debugLogEvent$1 &&
                  debugLogEvent$1({
                      kind: 'template updating',
                      template,
                      instance: this._$committedValue,
                      parts: this._$committedValue._$parts,
                      options: this.options,
                      values,
                  });
              this._$committedValue._update(values);
          }
          else {
              const instance = new TemplateInstance(template, this);
              const fragment = instance._clone(this.options);
              debugLogEvent$1 &&
                  debugLogEvent$1({
                      kind: 'template instantiated',
                      template,
                      instance,
                      parts: instance._$parts,
                      options: this.options,
                      fragment,
                      values,
                  });
              instance._update(values);
              debugLogEvent$1 &&
                  debugLogEvent$1({
                      kind: 'template instantiated and updated',
                      template,
                      instance,
                      parts: instance._$parts,
                      options: this.options,
                      fragment,
                      values,
                  });
              this._commitNode(fragment);
              this._$committedValue = instance;
          }
      }
      // Overridden via `litHtmlPolyfillSupport` to provide platform support.
      /** @internal */
      _$getTemplate(result) {
          let template = templateCache.get(result.strings);
          if (template === undefined) {
              templateCache.set(result.strings, (template = new Template(result)));
          }
          return template;
      }
      _commitIterable(value) {
          // For an Iterable, we create a new InstancePart per item, then set its
          // value to the item. This is a little bit of overhead for every item in
          // an Iterable, but it lets us recurse easily and efficiently update Arrays
          // of TemplateResults that will be commonly returned from expressions like:
          // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
          // If value is an array, then the previous render was of an
          // iterable and value will contain the ChildParts from the previous
          // render. If value is not an array, clear this part and make a new
          // array for ChildParts.
          if (!isArray(this._$committedValue)) {
              this._$committedValue = [];
              this._$clear();
          }
          // Lets us keep track of how many items we stamped so we can clear leftover
          // items from a previous render
          const itemParts = this._$committedValue;
          let partIndex = 0;
          let itemPart;
          for (const item of value) {
              if (partIndex === itemParts.length) {
                  // If no existing part, create a new one
                  // TODO (justinfagnani): test perf impact of always creating two parts
                  // instead of sharing parts between nodes
                  // https://github.com/lit/lit/issues/1266
                  itemParts.push((itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options)));
              }
              else {
                  // Reuse an existing part
                  itemPart = itemParts[partIndex];
              }
              itemPart._$setValue(item);
              partIndex++;
          }
          if (partIndex < itemParts.length) {
              // itemParts always have end nodes
              this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
              // Truncate the parts array so _value reflects the current state
              itemParts.length = partIndex;
          }
      }
      /**
       * Removes the nodes contained within this Part from the DOM.
       *
       * @param start Start node to clear from, for clearing a subset of the part's
       *     DOM (used when truncating iterables)
       * @param from  When `start` is specified, the index within the iterable from
       *     which ChildParts are being removed, used for disconnecting directives in
       *     those Parts.
       *
       * @internal
       */
      _$clear(start = wrap(this._$startNode).nextSibling, from) {
          this._$notifyConnectionChanged?.(false, true, from);
          while (start && start !== this._$endNode) {
              const n = wrap(start).nextSibling;
              wrap(start).remove();
              start = n;
          }
      }
      /**
       * Implementation of RootPart's `isConnected`. Note that this method
       * should only be called on `RootPart`s (the `ChildPart` returned from a
       * top-level `render()` call). It has no effect on non-root ChildParts.
       * @param isConnected Whether to set
       * @internal
       */
      setConnected(isConnected) {
          if (this._$parent === undefined) {
              this.__isConnected = isConnected;
              this._$notifyConnectionChanged?.(isConnected);
          }
          else {
              throw new Error('part.setConnected() may only be called on a ' +
                  'RootPart returned from render().');
          }
      }
  }
  class AttributePart {
      get tagName() {
          return this.element.tagName;
      }
      // See comment in Disconnectable interface for why this is a getter
      get _$isConnected() {
          return this._$parent._$isConnected;
      }
      constructor(element, name, strings, parent, options) {
          this.type = ATTRIBUTE_PART;
          /** @internal */
          this._$committedValue = nothing;
          /** @internal */
          this._$disconnectableChildren = undefined;
          this.element = element;
          this.name = name;
          this._$parent = parent;
          this.options = options;
          if (strings.length > 2 || strings[0] !== '' || strings[1] !== '') {
              this._$committedValue = new Array(strings.length - 1).fill(new String());
              this.strings = strings;
          }
          else {
              this._$committedValue = nothing;
          }
          {
              this._sanitizer = undefined;
          }
      }
      /**
       * Sets the value of this part by resolving the value from possibly multiple
       * values and static strings and committing it to the DOM.
       * If this part is single-valued, `this._strings` will be undefined, and the
       * method will be called with a single value argument. If this part is
       * multi-value, `this._strings` will be defined, and the method is called
       * with the value array of the part's owning TemplateInstance, and an offset
       * into the value array from which the values should be read.
       * This method is overloaded this way to eliminate short-lived array slices
       * of the template instance values, and allow a fast-path for single-valued
       * parts.
       *
       * @param value The part value, or an array of values for multi-valued parts
       * @param valueIndex the index to start reading values from. `undefined` for
       *   single-valued parts
       * @param noCommit causes the part to not commit its value to the DOM. Used
       *   in hydration to prime attribute parts with their first-rendered value,
       *   but not set the attribute, and in SSR to no-op the DOM operation and
       *   capture the value for serialization.
       *
       * @internal
       */
      _$setValue(value, directiveParent = this, valueIndex, noCommit) {
          const strings = this.strings;
          // Whether any of the values has changed, for dirty-checking
          let change = false;
          if (strings === undefined) {
              // Single-value binding case
              value = resolveDirective(this, value, directiveParent, 0);
              change =
                  !isPrimitive(value) ||
                      (value !== this._$committedValue && value !== noChange);
              if (change) {
                  this._$committedValue = value;
              }
          }
          else {
              // Interpolation case
              const values = value;
              value = strings[0];
              let i, v;
              for (i = 0; i < strings.length - 1; i++) {
                  v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
                  if (v === noChange) {
                      // If the user-provided value is `noChange`, use the previous value
                      v = this._$committedValue[i];
                  }
                  change ||=
                      !isPrimitive(v) || v !== this._$committedValue[i];
                  if (v === nothing) {
                      value = nothing;
                  }
                  else if (value !== nothing) {
                      value += (v ?? '') + strings[i + 1];
                  }
                  // We always record each value, even if one is `nothing`, for future
                  // change detection.
                  this._$committedValue[i] = v;
              }
          }
          if (change && !noCommit) {
              this._commitValue(value);
          }
      }
      /** @internal */
      _commitValue(value) {
          if (value === nothing) {
              wrap(this.element).removeAttribute(this.name);
          }
          else {
              {
                  if (this._sanitizer === undefined) {
                      this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'attribute');
                  }
                  value = this._sanitizer(value ?? '');
              }
              debugLogEvent$1 &&
                  debugLogEvent$1({
                      kind: 'commit attribute',
                      element: this.element,
                      name: this.name,
                      value,
                      options: this.options,
                  });
              wrap(this.element).setAttribute(this.name, (value ?? ''));
          }
      }
  }
  class PropertyPart extends AttributePart {
      constructor() {
          super(...arguments);
          this.type = PROPERTY_PART;
      }
      /** @internal */
      _commitValue(value) {
          {
              if (this._sanitizer === undefined) {
                  this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'property');
              }
              value = this._sanitizer(value);
          }
          debugLogEvent$1 &&
              debugLogEvent$1({
                  kind: 'commit property',
                  element: this.element,
                  name: this.name,
                  value,
                  options: this.options,
              });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.element[this.name] = value === nothing ? undefined : value;
      }
  }
  class BooleanAttributePart extends AttributePart {
      constructor() {
          super(...arguments);
          this.type = BOOLEAN_ATTRIBUTE_PART;
      }
      /** @internal */
      _commitValue(value) {
          debugLogEvent$1 &&
              debugLogEvent$1({
                  kind: 'commit boolean attribute',
                  element: this.element,
                  name: this.name,
                  value: !!(value && value !== nothing),
                  options: this.options,
              });
          wrap(this.element).toggleAttribute(this.name, !!value && value !== nothing);
      }
  }
  class EventPart extends AttributePart {
      constructor(element, name, strings, parent, options) {
          super(element, name, strings, parent, options);
          this.type = EVENT_PART;
          if (this.strings !== undefined) {
              throw new Error(`A \`<${element.localName}>\` has a \`@${name}=...\` listener with ` +
                  'invalid content. Event listeners in templates must have exactly ' +
                  'one expression and no surrounding text.');
          }
      }
      // EventPart does not use the base _$setValue/_resolveValue implementation
      // since the dirty checking is more complex
      /** @internal */
      _$setValue(newListener, directiveParent = this) {
          newListener =
              resolveDirective(this, newListener, directiveParent, 0) ?? nothing;
          if (newListener === noChange) {
              return;
          }
          const oldListener = this._$committedValue;
          // If the new value is nothing or any options change we have to remove the
          // part as a listener.
          const shouldRemoveListener = (newListener === nothing && oldListener !== nothing) ||
              newListener.capture !==
                  oldListener.capture ||
              newListener.once !==
                  oldListener.once ||
              newListener.passive !==
                  oldListener.passive;
          // If the new value is not nothing and we removed the listener, we have
          // to add the part as a listener.
          const shouldAddListener = newListener !== nothing &&
              (oldListener === nothing || shouldRemoveListener);
          debugLogEvent$1 &&
              debugLogEvent$1({
                  kind: 'commit event listener',
                  element: this.element,
                  name: this.name,
                  value: newListener,
                  options: this.options,
                  removeListener: shouldRemoveListener,
                  addListener: shouldAddListener,
                  oldListener,
              });
          if (shouldRemoveListener) {
              this.element.removeEventListener(this.name, this, oldListener);
          }
          if (shouldAddListener) {
              // Beware: IE11 and Chrome 41 don't like using the listener as the
              // options object. Figure out how to deal w/ this in IE11 - maybe
              // patch addEventListener?
              this.element.addEventListener(this.name, this, newListener);
          }
          this._$committedValue = newListener;
      }
      handleEvent(event) {
          if (typeof this._$committedValue === 'function') {
              this._$committedValue.call(this.options?.host ?? this.element, event);
          }
          else {
              this._$committedValue.handleEvent(event);
          }
      }
  }
  class ElementPart {
      constructor(element, parent, options) {
          this.element = element;
          this.type = ELEMENT_PART;
          /** @internal */
          this._$disconnectableChildren = undefined;
          this._$parent = parent;
          this.options = options;
      }
      // See comment in Disconnectable interface for why this is a getter
      get _$isConnected() {
          return this._$parent._$isConnected;
      }
      _$setValue(value) {
          debugLogEvent$1 &&
              debugLogEvent$1({
                  kind: 'commit to element binding',
                  element: this.element,
                  value,
                  options: this.options,
              });
          resolveDirective(this, value);
      }
  }
  // Apply polyfills if available
  const polyfillSupport$2 = global$2.litHtmlPolyfillSupportDevMode
      ;
  polyfillSupport$2?.(Template, ChildPart);
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for lit-html usage.
  (global$2.litHtmlVersions ??= []).push('3.2.0');
  if (global$2.litHtmlVersions.length > 1) {
      issueWarning$3('multiple-versions', `Multiple versions of Lit loaded. ` +
          `Loading multiple versions is not recommended.`);
  }
  /**
   * Renders a value, usually a lit-html TemplateResult, to the container.
   *
   * This example renders the text "Hello, Zoe!" inside a paragraph tag, appending
   * it to the container `document.body`.
   *
   * ```js
   * import {html, render} from 'lit';
   *
   * const name = "Zoe";
   * render(html`<p>Hello, ${name}!</p>`, document.body);
   * ```
   *
   * @param value Any [renderable
   *   value](https://lit.dev/docs/templates/expressions/#child-expressions),
   *   typically a {@linkcode TemplateResult} created by evaluating a template tag
   *   like {@linkcode html} or {@linkcode svg}.
   * @param container A DOM container to render to. The first render will append
   *   the rendered value to the container, and subsequent renders will
   *   efficiently update the rendered value if the same result type was
   *   previously rendered there.
   * @param options See {@linkcode RenderOptions} for options documentation.
   * @see
   * {@link https://lit.dev/docs/libraries/standalone-templates/#rendering-lit-html-templates| Rendering Lit HTML Templates}
   */
  const render = (value, container, options) => {
      if (container == null) {
          // Give a clearer error message than
          //     Uncaught TypeError: Cannot read properties of null (reading
          //     '_$litPart$')
          // which reads like an internal Lit error.
          throw new TypeError(`The container to render into may not be ${container}`);
      }
      const renderId = debugLogRenderId++ ;
      const partOwnerNode = options?.renderBefore ?? container;
      // This property needs to remain unminified.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let part = partOwnerNode['_$litPart$'];
      debugLogEvent$1 &&
          debugLogEvent$1({
              kind: 'begin render',
              id: renderId,
              value,
              container,
              options,
              part,
          });
      if (part === undefined) {
          const endNode = options?.renderBefore ?? null;
          // This property needs to remain unminified.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          partOwnerNode['_$litPart$'] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, undefined, options ?? {});
      }
      part._$setValue(value);
      debugLogEvent$1 &&
          debugLogEvent$1({
              kind: 'end render',
              id: renderId,
              value,
              container,
              options,
              part,
          });
      return part;
  };
  {
      render.setSanitizer = setSanitizer;
      render.createSanitizer = createSanitizer;
      {
          render._testOnlyClearSanitizerFactoryDoNotCallOrElse =
              _testOnlyClearSanitizerFactoryDoNotCallOrElse;
      }
  }

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const NODE_MODE = false;
  // Allows minifiers to rename references to globalThis
  const global$1 = globalThis;
  /**
   * Whether the current browser supports `adoptedStyleSheets`.
   */
  const supportsAdoptingStyleSheets = global$1.ShadowRoot &&
      (global$1.ShadyCSS === undefined || global$1.ShadyCSS.nativeShadow) &&
      'adoptedStyleSheets' in Document.prototype &&
      'replace' in CSSStyleSheet.prototype;
  const constructionToken = Symbol();
  const cssTagCache = new WeakMap();
  /**
   * A container for a string of CSS text, that may be used to create a CSSStyleSheet.
   *
   * CSSResult is the return value of `css`-tagged template literals and
   * `unsafeCSS()`. In order to ensure that CSSResults are only created via the
   * `css` tag and `unsafeCSS()`, CSSResult cannot be constructed directly.
   */
  class CSSResult {
      constructor(cssText, strings, safeToken) {
          // This property needs to remain unminified.
          this['_$cssResult$'] = true;
          if (safeToken !== constructionToken) {
              throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
          }
          this.cssText = cssText;
          this._strings = strings;
      }
      // This is a getter so that it's lazy. In practice, this means stylesheets
      // are not created until the first element instance is made.
      get styleSheet() {
          // If `supportsAdoptingStyleSheets` is true then we assume CSSStyleSheet is
          // constructable.
          let styleSheet = this._styleSheet;
          const strings = this._strings;
          if (supportsAdoptingStyleSheets && styleSheet === undefined) {
              const cacheable = strings !== undefined && strings.length === 1;
              if (cacheable) {
                  styleSheet = cssTagCache.get(strings);
              }
              if (styleSheet === undefined) {
                  (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
                  if (cacheable) {
                      cssTagCache.set(strings, styleSheet);
                  }
              }
          }
          return styleSheet;
      }
      toString() {
          return this.cssText;
      }
  }
  const textFromCSSResult = (value) => {
      // This property needs to remain unminified.
      if (value['_$cssResult$'] === true) {
          return value.cssText;
      }
      else if (typeof value === 'number') {
          return value;
      }
      else {
          throw new Error(`Value passed to 'css' function must be a 'css' function result: ` +
              `${value}. Use 'unsafeCSS' to pass non-literal values, but take care ` +
              `to ensure page security.`);
      }
  };
  /**
   * Wrap a value for interpolation in a {@linkcode css} tagged template literal.
   *
   * This is unsafe because untrusted CSS text can be used to phone home
   * or exfiltrate data to an attacker controlled site. Take care to only use
   * this with trusted input.
   */
  const unsafeCSS = (value) => new CSSResult(typeof value === 'string' ? value : String(value), undefined, constructionToken);
  /**
   * A template literal tag which can be used with LitElement's
   * {@linkcode LitElement.styles} property to set element styles.
   *
   * For security reasons, only literal string values and number may be used in
   * embedded expressions. To incorporate non-literal values {@linkcode unsafeCSS}
   * may be used inside an expression.
   */
  const css = (strings, ...values) => {
      const cssText = strings.length === 1
          ? strings[0]
          : values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
      return new CSSResult(cssText, strings, constructionToken);
  };
  /**
   * Applies the given styles to a `shadowRoot`. When Shadow DOM is
   * available but `adoptedStyleSheets` is not, styles are appended to the
   * `shadowRoot` to [mimic spec behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   * Note, when shimming is used, any styles that are subsequently placed into
   * the shadowRoot should be placed *before* any shimmed adopted styles. This
   * will match spec behavior that gives adopted sheets precedence over styles in
   * shadowRoot.
   */
  const adoptStyles = (renderRoot, styles) => {
      if (supportsAdoptingStyleSheets) {
          renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
      }
      else {
          for (const s of styles) {
              const style = document.createElement('style');
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const nonce = global$1['litNonce'];
              if (nonce !== undefined) {
                  style.setAttribute('nonce', nonce);
              }
              style.textContent = s.cssText;
              renderRoot.appendChild(style);
          }
      }
  };
  const cssResultFromStyleSheet = (sheet) => {
      let cssText = '';
      for (const rule of sheet.cssRules) {
          cssText += rule.cssText;
      }
      return unsafeCSS(cssText);
  };
  const getCompatibleStyle = supportsAdoptingStyleSheets ||
      (NODE_MODE )
      ? (s) => s
      : (s) => s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  // TODO (justinfagnani): Add `hasOwn` here when we ship ES2022
  const { is, defineProperty, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, getPrototypeOf, } = Object;
  // Lets a minifier replace globalThis references with a minified name
  const global = globalThis;
  let issueWarning$2;
  const trustedTypes = global
      .trustedTypes;
  // Temporary workaround for https://crbug.com/993268
  // Currently, any attribute starting with "on" is considered to be a
  // TrustedScript source. Such boolean attributes must be set to the equivalent
  // trusted emptyScript value.
  const emptyStringForBooleanAttribute = trustedTypes
      ? trustedTypes.emptyScript
      : '';
  const polyfillSupport$1 = global.reactiveElementPolyfillSupportDevMode
      ;
  {
      // Ensure warnings are issued only 1x, even if multiple versions of Lit
      // are loaded.
      const issuedWarnings = (global.litIssuedWarnings ??=
          new Set());
      // Issue a warning, if we haven't already.
      issueWarning$2 = (code, warning) => {
          warning += ` See https://lit.dev/msg/${code} for more information.`;
          if (!issuedWarnings.has(warning)) {
              console.warn(warning);
              issuedWarnings.add(warning);
          }
      };
      issueWarning$2('dev-mode', `Lit is in dev mode. Not recommended for production!`);
      // Issue polyfill support warning.
      if (global.ShadyDOM?.inUse && polyfillSupport$1 === undefined) {
          issueWarning$2('polyfill-support-missing', `Shadow DOM is being polyfilled via \`ShadyDOM\` but ` +
              `the \`polyfill-support\` module has not been loaded.`);
      }
  }
  /**
   * Useful for visualizing and logging insights into what the Lit template system is doing.
   *
   * Compiled out of prod mode builds.
   */
  const debugLogEvent = (event) => {
          const shouldEmit = global
              .emitLitDebugLogEvents;
          if (!shouldEmit) {
              return;
          }
          global.dispatchEvent(new CustomEvent('lit-debug', {
              detail: event,
          }));
      }
      ;
  /*
   * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
   * replaced at compile time by the munged name for object[property]. We cannot
   * alias this function, so we have to use a small shim that has the same
   * behavior when not compiling.
   */
  /*@__INLINE__*/
  const JSCompiler_renameProperty$1 = (prop, _obj) => prop;
  const defaultConverter = {
      toAttribute(value, type) {
          switch (type) {
              case Boolean:
                  value = value ? emptyStringForBooleanAttribute : null;
                  break;
              case Object:
              case Array:
                  // if the value is `null` or `undefined` pass this through
                  // to allow removing/no change behavior.
                  value = value == null ? value : JSON.stringify(value);
                  break;
          }
          return value;
      },
      fromAttribute(value, type) {
          let fromValue = value;
          switch (type) {
              case Boolean:
                  fromValue = value !== null;
                  break;
              case Number:
                  fromValue = value === null ? null : Number(value);
                  break;
              case Object:
              case Array:
                  // Do *not* generate exception when invalid JSON is set as elements
                  // don't normally complain on being mis-configured.
                  // TODO(sorvell): Do generate exception in *dev mode*.
                  try {
                      // Assert to adhere to Bazel's "must type assert JSON parse" rule.
                      fromValue = JSON.parse(value);
                  }
                  catch (e) {
                      fromValue = null;
                  }
                  break;
          }
          return fromValue;
      },
  };
  /**
   * Change function that returns true if `value` is different from `oldValue`.
   * This method is used as the default for a property's `hasChanged` function.
   */
  const notEqual = (value, old) => !is(value, old);
  const defaultPropertyDeclaration$1 = {
      attribute: true,
      type: String,
      converter: defaultConverter,
      reflect: false,
      hasChanged: notEqual,
  };
  // Ensure metadata is enabled. TypeScript does not polyfill
  // Symbol.metadata, so we must ensure that it exists.
  Symbol.metadata ??= Symbol('metadata');
  // Map from a class's metadata object to property options
  // Note that we must use nullish-coalescing assignment so that we only use one
  // map even if we load multiple version of this module.
  global.litPropertyMetadata ??= new WeakMap();
  /**
   * Base element class which manages element properties and attributes. When
   * properties change, the `update` method is asynchronously called. This method
   * should be supplied by subclasses to render updates as desired.
   * @noInheritDoc
   */
  class ReactiveElement
  // In the Node build, this `extends` clause will be substituted with
  // `(globalThis.HTMLElement ?? HTMLElement)`.
  //
  // This way, we will first prefer any global `HTMLElement` polyfill that the
  // user has assigned, and then fall back to the `HTMLElement` shim which has
  // been imported (see note at the top of this file about how this import is
  // generated by Rollup). Note that the `HTMLElement` variable has been
  // shadowed by this import, so it no longer refers to the global.
   extends HTMLElement {
      /**
       * Adds an initializer function to the class that is called during instance
       * construction.
       *
       * This is useful for code that runs against a `ReactiveElement`
       * subclass, such as a decorator, that needs to do work for each
       * instance, such as setting up a `ReactiveController`.
       *
       * ```ts
       * const myDecorator = (target: typeof ReactiveElement, key: string) => {
       *   target.addInitializer((instance: ReactiveElement) => {
       *     // This is run during construction of the element
       *     new MyController(instance);
       *   });
       * }
       * ```
       *
       * Decorating a field will then cause each instance to run an initializer
       * that adds a controller:
       *
       * ```ts
       * class MyElement extends LitElement {
       *   @myDecorator foo;
       * }
       * ```
       *
       * Initializers are stored per-constructor. Adding an initializer to a
       * subclass does not add it to a superclass. Since initializers are run in
       * constructors, initializers will run in order of the class hierarchy,
       * starting with superclasses and progressing to the instance's class.
       *
       * @nocollapse
       */
      static addInitializer(initializer) {
          this.__prepare();
          (this._initializers ??= []).push(initializer);
      }
      /**
       * Returns a list of attributes corresponding to the registered properties.
       * @nocollapse
       * @category attributes
       */
      static get observedAttributes() {
          // Ensure we've created all properties
          this.finalize();
          // this.__attributeToPropertyMap is only undefined after finalize() in
          // ReactiveElement itself. ReactiveElement.observedAttributes is only
          // accessed with ReactiveElement as the receiver when a subclass or mixin
          // calls super.observedAttributes
          return (this.__attributeToPropertyMap && [...this.__attributeToPropertyMap.keys()]);
      }
      /**
       * Creates a property accessor on the element prototype if one does not exist
       * and stores a {@linkcode PropertyDeclaration} for the property with the
       * given options. The property setter calls the property's `hasChanged`
       * property option or uses a strict identity check to determine whether or not
       * to request an update.
       *
       * This method may be overridden to customize properties; however,
       * when doing so, it's important to call `super.createProperty` to ensure
       * the property is setup correctly. This method calls
       * `getPropertyDescriptor` internally to get a descriptor to install.
       * To customize what properties do when they are get or set, override
       * `getPropertyDescriptor`. To customize the options for a property,
       * implement `createProperty` like this:
       *
       * ```ts
       * static createProperty(name, options) {
       *   options = Object.assign(options, {myOption: true});
       *   super.createProperty(name, options);
       * }
       * ```
       *
       * @nocollapse
       * @category properties
       */
      static createProperty(name, options = defaultPropertyDeclaration$1) {
          // If this is a state property, force the attribute to false.
          if (options.state) {
              options.attribute = false;
          }
          this.__prepare();
          this.elementProperties.set(name, options);
          if (!options.noAccessor) {
              const key = // Use Symbol.for in dev mode to make it easier to maintain state
                      // when doing HMR.
                      Symbol.for(`${String(name)} (@property() cache)`)
                  ;
              const descriptor = this.getPropertyDescriptor(name, key, options);
              if (descriptor !== undefined) {
                  defineProperty(this.prototype, name, descriptor);
              }
          }
      }
      /**
       * Returns a property descriptor to be defined on the given named property.
       * If no descriptor is returned, the property will not become an accessor.
       * For example,
       *
       * ```ts
       * class MyElement extends LitElement {
       *   static getPropertyDescriptor(name, key, options) {
       *     const defaultDescriptor =
       *         super.getPropertyDescriptor(name, key, options);
       *     const setter = defaultDescriptor.set;
       *     return {
       *       get: defaultDescriptor.get,
       *       set(value) {
       *         setter.call(this, value);
       *         // custom action.
       *       },
       *       configurable: true,
       *       enumerable: true
       *     }
       *   }
       * }
       * ```
       *
       * @nocollapse
       * @category properties
       */
      static getPropertyDescriptor(name, key, options) {
          const { get, set } = getOwnPropertyDescriptor(this.prototype, name) ?? {
              get() {
                  return this[key];
              },
              set(v) {
                  this[key] = v;
              },
          };
          if (get == null) {
              if ('value' in (getOwnPropertyDescriptor(this.prototype, name) ?? {})) {
                  throw new Error(`Field ${JSON.stringify(String(name))} on ` +
                      `${this.name} was declared as a reactive property ` +
                      `but it's actually declared as a value on the prototype. ` +
                      `Usually this is due to using @property or @state on a method.`);
              }
              issueWarning$2('reactive-property-without-getter', `Field ${JSON.stringify(String(name))} on ` +
                  `${this.name} was declared as a reactive property ` +
                  `but it does not have a getter. This will be an error in a ` +
                  `future version of Lit.`);
          }
          return {
              get() {
                  return get?.call(this);
              },
              set(value) {
                  const oldValue = get?.call(this);
                  set.call(this, value);
                  this.requestUpdate(name, oldValue, options);
              },
              configurable: true,
              enumerable: true,
          };
      }
      /**
       * Returns the property options associated with the given property.
       * These options are defined with a `PropertyDeclaration` via the `properties`
       * object or the `@property` decorator and are registered in
       * `createProperty(...)`.
       *
       * Note, this method should be considered "final" and not overridden. To
       * customize the options for a given property, override
       * {@linkcode createProperty}.
       *
       * @nocollapse
       * @final
       * @category properties
       */
      static getPropertyOptions(name) {
          return this.elementProperties.get(name) ?? defaultPropertyDeclaration$1;
      }
      /**
       * Initializes static own properties of the class used in bookkeeping
       * for element properties, initializers, etc.
       *
       * Can be called multiple times by code that needs to ensure these
       * properties exist before using them.
       *
       * This method ensures the superclass is finalized so that inherited
       * property metadata can be copied down.
       * @nocollapse
       */
      static __prepare() {
          if (this.hasOwnProperty(JSCompiler_renameProperty$1('elementProperties'))) {
              // Already prepared
              return;
          }
          // Finalize any superclasses
          const superCtor = getPrototypeOf(this);
          superCtor.finalize();
          // Create own set of initializers for this class if any exist on the
          // superclass and copy them down. Note, for a small perf boost, avoid
          // creating initializers unless needed.
          if (superCtor._initializers !== undefined) {
              this._initializers = [...superCtor._initializers];
          }
          // Initialize elementProperties from the superclass
          this.elementProperties = new Map(superCtor.elementProperties);
      }
      /**
       * Finishes setting up the class so that it's ready to be registered
       * as a custom element and instantiated.
       *
       * This method is called by the ReactiveElement.observedAttributes getter.
       * If you override the observedAttributes getter, you must either call
       * super.observedAttributes to trigger finalization, or call finalize()
       * yourself.
       *
       * @nocollapse
       */
      static finalize() {
          if (this.hasOwnProperty(JSCompiler_renameProperty$1('finalized'))) {
              return;
          }
          this.finalized = true;
          this.__prepare();
          // Create properties from the static properties block:
          if (this.hasOwnProperty(JSCompiler_renameProperty$1('properties'))) {
              const props = this.properties;
              const propKeys = [
                  ...getOwnPropertyNames(props),
                  ...getOwnPropertySymbols(props),
              ];
              for (const p of propKeys) {
                  this.createProperty(p, props[p]);
              }
          }
          // Create properties from standard decorator metadata:
          const metadata = this[Symbol.metadata];
          if (metadata !== null) {
              const properties = litPropertyMetadata.get(metadata);
              if (properties !== undefined) {
                  for (const [p, options] of properties) {
                      this.elementProperties.set(p, options);
                  }
              }
          }
          // Create the attribute-to-property map
          this.__attributeToPropertyMap = new Map();
          for (const [p, options] of this.elementProperties) {
              const attr = this.__attributeNameForProperty(p, options);
              if (attr !== undefined) {
                  this.__attributeToPropertyMap.set(attr, p);
              }
          }
          this.elementStyles = this.finalizeStyles(this.styles);
          {
              if (this.hasOwnProperty('createProperty')) {
                  issueWarning$2('no-override-create-property', 'Overriding ReactiveElement.createProperty() is deprecated. ' +
                      'The override will not be called with standard decorators');
              }
              if (this.hasOwnProperty('getPropertyDescriptor')) {
                  issueWarning$2('no-override-get-property-descriptor', 'Overriding ReactiveElement.getPropertyDescriptor() is deprecated. ' +
                      'The override will not be called with standard decorators');
              }
          }
      }
      /**
       * Takes the styles the user supplied via the `static styles` property and
       * returns the array of styles to apply to the element.
       * Override this method to integrate into a style management system.
       *
       * Styles are deduplicated preserving the _last_ instance in the list. This
       * is a performance optimization to avoid duplicated styles that can occur
       * especially when composing via subclassing. The last item is kept to try
       * to preserve the cascade order with the assumption that it's most important
       * that last added styles override previous styles.
       *
       * @nocollapse
       * @category styles
       */
      static finalizeStyles(styles) {
          const elementStyles = [];
          if (Array.isArray(styles)) {
              // Dedupe the flattened array in reverse order to preserve the last items.
              // Casting to Array<unknown> works around TS error that
              // appears to come from trying to flatten a type CSSResultArray.
              const set = new Set(styles.flat(Infinity).reverse());
              // Then preserve original order by adding the set items in reverse order.
              for (const s of set) {
                  elementStyles.unshift(getCompatibleStyle(s));
              }
          }
          else if (styles !== undefined) {
              elementStyles.push(getCompatibleStyle(styles));
          }
          return elementStyles;
      }
      /**
       * Returns the property name for the given attribute `name`.
       * @nocollapse
       */
      static __attributeNameForProperty(name, options) {
          const attribute = options.attribute;
          return attribute === false
              ? undefined
              : typeof attribute === 'string'
                  ? attribute
                  : typeof name === 'string'
                      ? name.toLowerCase()
                      : undefined;
      }
      constructor() {
          super();
          this.__instanceProperties = undefined;
          /**
           * True if there is a pending update as a result of calling `requestUpdate()`.
           * Should only be read.
           * @category updates
           */
          this.isUpdatePending = false;
          /**
           * Is set to `true` after the first update. The element code cannot assume
           * that `renderRoot` exists before the element `hasUpdated`.
           * @category updates
           */
          this.hasUpdated = false;
          /**
           * Name of currently reflecting property
           */
          this.__reflectingProperty = null;
          this.__initialize();
      }
      /**
       * Internal only override point for customizing work done when elements
       * are constructed.
       */
      __initialize() {
          this.__updatePromise = new Promise((res) => (this.enableUpdating = res));
          this._$changedProperties = new Map();
          // This enqueues a microtask that ust run before the first update, so it
          // must be called before requestUpdate()
          this.__saveInstanceProperties();
          // ensures first update will be caught by an early access of
          // `updateComplete`
          this.requestUpdate();
          this.constructor._initializers?.forEach((i) => i(this));
      }
      /**
       * Registers a `ReactiveController` to participate in the element's reactive
       * update cycle. The element automatically calls into any registered
       * controllers during its lifecycle callbacks.
       *
       * If the element is connected when `addController()` is called, the
       * controller's `hostConnected()` callback will be immediately called.
       * @category controllers
       */
      addController(controller) {
          (this.__controllers ??= new Set()).add(controller);
          // If a controller is added after the element has been connected,
          // call hostConnected. Note, re-using existence of `renderRoot` here
          // (which is set in connectedCallback) to avoid the need to track a
          // first connected state.
          if (this.renderRoot !== undefined && this.isConnected) {
              controller.hostConnected?.();
          }
      }
      /**
       * Removes a `ReactiveController` from the element.
       * @category controllers
       */
      removeController(controller) {
          this.__controllers?.delete(controller);
      }
      /**
       * Fixes any properties set on the instance before upgrade time.
       * Otherwise these would shadow the accessor and break these properties.
       * The properties are stored in a Map which is played back after the
       * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
       * (<=41), properties created for native platform properties like (`id` or
       * `name`) may not have default values set in the element constructor. On
       * these browsers native properties appear on instances and therefore their
       * default value will overwrite any element default (e.g. if the element sets
       * this.id = 'id' in the constructor, the 'id' will become '' since this is
       * the native platform default).
       */
      __saveInstanceProperties() {
          const instanceProperties = new Map();
          const elementProperties = this.constructor
              .elementProperties;
          for (const p of elementProperties.keys()) {
              if (this.hasOwnProperty(p)) {
                  instanceProperties.set(p, this[p]);
                  delete this[p];
              }
          }
          if (instanceProperties.size > 0) {
              this.__instanceProperties = instanceProperties;
          }
      }
      /**
       * Returns the node into which the element should render and by default
       * creates and returns an open shadowRoot. Implement to customize where the
       * element's DOM is rendered. For example, to render into the element's
       * childNodes, return `this`.
       *
       * @return Returns a node into which to render.
       * @category rendering
       */
      createRenderRoot() {
          const renderRoot = this.shadowRoot ??
              this.attachShadow(this.constructor.shadowRootOptions);
          adoptStyles(renderRoot, this.constructor.elementStyles);
          return renderRoot;
      }
      /**
       * On first connection, creates the element's renderRoot, sets up
       * element styling, and enables updating.
       * @category lifecycle
       */
      connectedCallback() {
          // Create renderRoot before controllers `hostConnected`
          this.renderRoot ??=
              this.createRenderRoot();
          this.enableUpdating(true);
          this.__controllers?.forEach((c) => c.hostConnected?.());
      }
      /**
       * Note, this method should be considered final and not overridden. It is
       * overridden on the element instance with a function that triggers the first
       * update.
       * @category updates
       */
      enableUpdating(_requestedUpdate) { }
      /**
       * Allows for `super.disconnectedCallback()` in extensions while
       * reserving the possibility of making non-breaking feature additions
       * when disconnecting at some point in the future.
       * @category lifecycle
       */
      disconnectedCallback() {
          this.__controllers?.forEach((c) => c.hostDisconnected?.());
      }
      /**
       * Synchronizes property values when attributes change.
       *
       * Specifically, when an attribute is set, the corresponding property is set.
       * You should rarely need to implement this callback. If this method is
       * overridden, `super.attributeChangedCallback(name, _old, value)` must be
       * called.
       *
       * See [using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)
       * on MDN for more information about the `attributeChangedCallback`.
       * @category attributes
       */
      attributeChangedCallback(name, _old, value) {
          this._$attributeToProperty(name, value);
      }
      __propertyToAttribute(name, value) {
          const elemProperties = this.constructor.elementProperties;
          const options = elemProperties.get(name);
          const attr = this.constructor.__attributeNameForProperty(name, options);
          if (attr !== undefined && options.reflect === true) {
              const converter = options.converter?.toAttribute !==
                  undefined
                  ? options.converter
                  : defaultConverter;
              const attrValue = converter.toAttribute(value, options.type);
              if (this.constructor.enabledWarnings.includes('migration') &&
                  attrValue === undefined) {
                  issueWarning$2('undefined-attribute-value', `The attribute value for the ${name} property is ` +
                      `undefined on element ${this.localName}. The attribute will be ` +
                      `removed, but in the previous version of \`ReactiveElement\`, ` +
                      `the attribute would not have changed.`);
              }
              // Track if the property is being reflected to avoid
              // setting the property again via `attributeChangedCallback`. Note:
              // 1. this takes advantage of the fact that the callback is synchronous.
              // 2. will behave incorrectly if multiple attributes are in the reaction
              // stack at time of calling. However, since we process attributes
              // in `update` this should not be possible (or an extreme corner case
              // that we'd like to discover).
              // mark state reflecting
              this.__reflectingProperty = name;
              if (attrValue == null) {
                  this.removeAttribute(attr);
              }
              else {
                  this.setAttribute(attr, attrValue);
              }
              // mark state not reflecting
              this.__reflectingProperty = null;
          }
      }
      /** @internal */
      _$attributeToProperty(name, value) {
          const ctor = this.constructor;
          // Note, hint this as an `AttributeMap` so closure clearly understands
          // the type; it has issues with tracking types through statics
          const propName = ctor.__attributeToPropertyMap.get(name);
          // Use tracking info to avoid reflecting a property value to an attribute
          // if it was just set because the attribute changed.
          if (propName !== undefined && this.__reflectingProperty !== propName) {
              const options = ctor.getPropertyOptions(propName);
              const converter = typeof options.converter === 'function'
                  ? { fromAttribute: options.converter }
                  : options.converter?.fromAttribute !== undefined
                      ? options.converter
                      : defaultConverter;
              // mark state reflecting
              this.__reflectingProperty = propName;
              this[propName] = converter.fromAttribute(value, options.type
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              );
              // mark state not reflecting
              this.__reflectingProperty = null;
          }
      }
      /**
       * Requests an update which is processed asynchronously. This should be called
       * when an element should update based on some state not triggered by setting
       * a reactive property. In this case, pass no arguments. It should also be
       * called when manually implementing a property setter. In this case, pass the
       * property `name` and `oldValue` to ensure that any configured property
       * options are honored.
       *
       * @param name name of requesting property
       * @param oldValue old value of requesting property
       * @param options property options to use instead of the previously
       *     configured options
       * @category updates
       */
      requestUpdate(name, oldValue, options) {
          // If we have a property key, perform property update steps.
          if (name !== undefined) {
              if (name instanceof Event) {
                  issueWarning$2(``, `The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()`);
              }
              options ??= this.constructor.getPropertyOptions(name);
              const hasChanged = options.hasChanged ?? notEqual;
              const newValue = this[name];
              if (hasChanged(newValue, oldValue)) {
                  this._$changeProperty(name, oldValue, options);
              }
              else {
                  // Abort the request if the property should not be considered changed.
                  return;
              }
          }
          if (this.isUpdatePending === false) {
              this.__updatePromise = this.__enqueueUpdate();
          }
      }
      /**
       * @internal
       */
      _$changeProperty(name, oldValue, options) {
          // TODO (justinfagnani): Create a benchmark of Map.has() + Map.set(
          // vs just Map.set()
          if (!this._$changedProperties.has(name)) {
              this._$changedProperties.set(name, oldValue);
          }
          // Add to reflecting properties set.
          // Note, it's important that every change has a chance to add the
          // property to `__reflectingProperties`. This ensures setting
          // attribute + property reflects correctly.
          if (options.reflect === true && this.__reflectingProperty !== name) {
              (this.__reflectingProperties ??= new Set()).add(name);
          }
      }
      /**
       * Sets up the element to asynchronously update.
       */
      async __enqueueUpdate() {
          this.isUpdatePending = true;
          try {
              // Ensure any previous update has resolved before updating.
              // This `await` also ensures that property changes are batched.
              await this.__updatePromise;
          }
          catch (e) {
              // Refire any previous errors async so they do not disrupt the update
              // cycle. Errors are refired so developers have a chance to observe
              // them, and this can be done by implementing
              // `window.onunhandledrejection`.
              Promise.reject(e);
          }
          const result = this.scheduleUpdate();
          // If `scheduleUpdate` returns a Promise, we await it. This is done to
          // enable coordinating updates with a scheduler. Note, the result is
          // checked to avoid delaying an additional microtask unless we need to.
          if (result != null) {
              await result;
          }
          return !this.isUpdatePending;
      }
      /**
       * Schedules an element update. You can override this method to change the
       * timing of updates by returning a Promise. The update will await the
       * returned Promise, and you should resolve the Promise to allow the update
       * to proceed. If this method is overridden, `super.scheduleUpdate()`
       * must be called.
       *
       * For instance, to schedule updates to occur just before the next frame:
       *
       * ```ts
       * override protected async scheduleUpdate(): Promise<unknown> {
       *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
       *   super.scheduleUpdate();
       * }
       * ```
       * @category updates
       */
      scheduleUpdate() {
          const result = this.performUpdate();
          if (this.constructor.enabledWarnings.includes('async-perform-update') &&
              typeof result?.then ===
                  'function') {
              issueWarning$2('async-perform-update', `Element ${this.localName} returned a Promise from performUpdate(). ` +
                  `This behavior is deprecated and will be removed in a future ` +
                  `version of ReactiveElement.`);
          }
          return result;
      }
      /**
       * Performs an element update. Note, if an exception is thrown during the
       * update, `firstUpdated` and `updated` will not be called.
       *
       * Call `performUpdate()` to immediately process a pending update. This should
       * generally not be needed, but it can be done in rare cases when you need to
       * update synchronously.
       *
       * @category updates
       */
      performUpdate() {
          // Abort any update if one is not pending when this is called.
          // This can happen if `performUpdate` is called early to "flush"
          // the update.
          if (!this.isUpdatePending) {
              return;
          }
          debugLogEvent?.({ kind: 'update' });
          if (!this.hasUpdated) {
              // Create renderRoot before first update. This occurs in `connectedCallback`
              // but is done here to support out of tree calls to `enableUpdating`/`performUpdate`.
              this.renderRoot ??=
                  this.createRenderRoot();
              {
                  // Produce warning if any reactive properties on the prototype are
                  // shadowed by class fields. Instance fields set before upgrade are
                  // deleted by this point, so any own property is caused by class field
                  // initialization in the constructor.
                  const ctor = this.constructor;
                  const shadowedProperties = [...ctor.elementProperties.keys()].filter((p) => this.hasOwnProperty(p) && p in getPrototypeOf(this));
                  if (shadowedProperties.length) {
                      throw new Error(`The following properties on element ${this.localName} will not ` +
                          `trigger updates as expected because they are set using class ` +
                          `fields: ${shadowedProperties.join(', ')}. ` +
                          `Native class fields and some compiled output will overwrite ` +
                          `accessors used for detecting changes. See ` +
                          `https://lit.dev/msg/class-field-shadowing ` +
                          `for more information.`);
                  }
              }
              // Mixin instance properties once, if they exist.
              if (this.__instanceProperties) {
                  // TODO (justinfagnani): should we use the stored value? Could a new value
                  // have been set since we stored the own property value?
                  for (const [p, value] of this.__instanceProperties) {
                      this[p] = value;
                  }
                  this.__instanceProperties = undefined;
              }
              // Trigger initial value reflection and populate the initial
              // changedProperties map, but only for the case of experimental
              // decorators on accessors, which will not have already populated the
              // changedProperties map. We can't know if these accessors had
              // initializers, so we just set them anyway - a difference from
              // experimental decorators on fields and standard decorators on
              // auto-accessors.
              // For context why experimentalDecorators with auto accessors are handled
              // specifically also see:
              // https://github.com/lit/lit/pull/4183#issuecomment-1711959635
              const elementProperties = this.constructor
                  .elementProperties;
              if (elementProperties.size > 0) {
                  for (const [p, options] of elementProperties) {
                      if (options.wrapped === true &&
                          !this._$changedProperties.has(p) &&
                          this[p] !== undefined) {
                          this._$changeProperty(p, this[p], options);
                      }
                  }
              }
          }
          let shouldUpdate = false;
          const changedProperties = this._$changedProperties;
          try {
              shouldUpdate = this.shouldUpdate(changedProperties);
              if (shouldUpdate) {
                  this.willUpdate(changedProperties);
                  this.__controllers?.forEach((c) => c.hostUpdate?.());
                  this.update(changedProperties);
              }
              else {
                  this.__markUpdated();
              }
          }
          catch (e) {
              // Prevent `firstUpdated` and `updated` from running when there's an
              // update exception.
              shouldUpdate = false;
              // Ensure element can accept additional updates after an exception.
              this.__markUpdated();
              throw e;
          }
          // The update is no longer considered pending and further updates are now allowed.
          if (shouldUpdate) {
              this._$didUpdate(changedProperties);
          }
      }
      /**
       * Invoked before `update()` to compute values needed during the update.
       *
       * Implement `willUpdate` to compute property values that depend on other
       * properties and are used in the rest of the update process.
       *
       * ```ts
       * willUpdate(changedProperties) {
       *   // only need to check changed properties for an expensive computation.
       *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
       *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
       *   }
       * }
       *
       * render() {
       *   return html`SHA: ${this.sha}`;
       * }
       * ```
       *
       * @category updates
       */
      willUpdate(_changedProperties) { }
      // Note, this is an override point for polyfill-support.
      // @internal
      _$didUpdate(changedProperties) {
          this.__controllers?.forEach((c) => c.hostUpdated?.());
          if (!this.hasUpdated) {
              this.hasUpdated = true;
              this.firstUpdated(changedProperties);
          }
          this.updated(changedProperties);
          if (this.isUpdatePending &&
              this.constructor.enabledWarnings.includes('change-in-update')) {
              issueWarning$2('change-in-update', `Element ${this.localName} scheduled an update ` +
                  `(generally because a property was set) ` +
                  `after an update completed, causing a new update to be scheduled. ` +
                  `This is inefficient and should be avoided unless the next update ` +
                  `can only be scheduled as a side effect of the previous update.`);
          }
      }
      __markUpdated() {
          this._$changedProperties = new Map();
          this.isUpdatePending = false;
      }
      /**
       * Returns a Promise that resolves when the element has completed updating.
       * The Promise value is a boolean that is `true` if the element completed the
       * update without triggering another update. The Promise result is `false` if
       * a property was set inside `updated()`. If the Promise is rejected, an
       * exception was thrown during the update.
       *
       * To await additional asynchronous work, override the `getUpdateComplete`
       * method. For example, it is sometimes useful to await a rendered element
       * before fulfilling this Promise. To do this, first await
       * `super.getUpdateComplete()`, then any subsequent state.
       *
       * @return A promise of a boolean that resolves to true if the update completed
       *     without triggering another update.
       * @category updates
       */
      get updateComplete() {
          return this.getUpdateComplete();
      }
      /**
       * Override point for the `updateComplete` promise.
       *
       * It is not safe to override the `updateComplete` getter directly due to a
       * limitation in TypeScript which means it is not possible to call a
       * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
       * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
       * This method should be overridden instead. For example:
       *
       * ```ts
       * class MyElement extends LitElement {
       *   override async getUpdateComplete() {
       *     const result = await super.getUpdateComplete();
       *     await this._myChild.updateComplete;
       *     return result;
       *   }
       * }
       * ```
       *
       * @return A promise of a boolean that resolves to true if the update completed
       *     without triggering another update.
       * @category updates
       */
      getUpdateComplete() {
          return this.__updatePromise;
      }
      /**
       * Controls whether or not `update()` should be called when the element requests
       * an update. By default, this method always returns `true`, but this can be
       * customized to control when to update.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      shouldUpdate(_changedProperties) {
          return true;
      }
      /**
       * Updates the element. This method reflects property values to attributes.
       * It can be overridden to render and keep updated element DOM.
       * Setting properties inside this method will *not* trigger
       * another update.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      update(_changedProperties) {
          // The forEach() expression will only run when when __reflectingProperties is
          // defined, and it returns undefined, setting __reflectingProperties to
          // undefined
          this.__reflectingProperties &&= this.__reflectingProperties.forEach((p) => this.__propertyToAttribute(p, this[p]));
          this.__markUpdated();
      }
      /**
       * Invoked whenever the element is updated. Implement to perform
       * post-updating tasks via DOM APIs, for example, focusing an element.
       *
       * Setting properties inside this method will trigger the element to update
       * again after this update cycle completes.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      updated(_changedProperties) { }
      /**
       * Invoked when the element is first updated. Implement to perform one time
       * work on the element after update.
       *
       * ```ts
       * firstUpdated() {
       *   this.renderRoot.getElementById('my-text-area').focus();
       * }
       * ```
       *
       * Setting properties inside this method will trigger the element to update
       * again after this update cycle completes.
       *
       * @param _changedProperties Map of changed properties with old values
       * @category updates
       */
      firstUpdated(_changedProperties) { }
  }
  /**
   * Memoized list of all element styles.
   * Created lazily on user subclasses when finalizing the class.
   * @nocollapse
   * @category styles
   */
  ReactiveElement.elementStyles = [];
  /**
   * Options used when calling `attachShadow`. Set this property to customize
   * the options for the shadowRoot; for example, to create a closed
   * shadowRoot: `{mode: 'closed'}`.
   *
   * Note, these options are used in `createRenderRoot`. If this method
   * is customized, options should be respected if possible.
   * @nocollapse
   * @category rendering
   */
  ReactiveElement.shadowRootOptions = { mode: 'open' };
  // Assigned here to work around a jscompiler bug with static fields
  // when compiling to ES5.
  // https://github.com/google/closure-compiler/issues/3177
  ReactiveElement[JSCompiler_renameProperty$1('elementProperties')] = new Map();
  ReactiveElement[JSCompiler_renameProperty$1('finalized')] = new Map();
  // Apply polyfills if available
  polyfillSupport$1?.({ ReactiveElement });
  // Dev mode warnings...
  {
      // Default warning set.
      ReactiveElement.enabledWarnings = [
          'change-in-update',
          'async-perform-update',
      ];
      const ensureOwnWarnings = function (ctor) {
          if (!ctor.hasOwnProperty(JSCompiler_renameProperty$1('enabledWarnings'))) {
              ctor.enabledWarnings = ctor.enabledWarnings.slice();
          }
      };
      ReactiveElement.enableWarning = function (warning) {
          ensureOwnWarnings(this);
          if (!this.enabledWarnings.includes(warning)) {
              this.enabledWarnings.push(warning);
          }
      };
      ReactiveElement.disableWarning = function (warning) {
          ensureOwnWarnings(this);
          const i = this.enabledWarnings.indexOf(warning);
          if (i >= 0) {
              this.enabledWarnings.splice(i, 1);
          }
      };
  }
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for ReactiveElement usage.
  (global.reactiveElementVersions ??= []).push('2.0.4');
  if (global.reactiveElementVersions.length > 1) {
      issueWarning$2('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` +
          `is not recommended.`);
  }

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  /*
   * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
   * replaced at compile time by the munged name for object[property]. We cannot
   * alias this function, so we have to use a small shim that has the same
   * behavior when not compiling.
   */
  /*@__INLINE__*/
  const JSCompiler_renameProperty = (prop, _obj) => prop;
  let issueWarning$1;
  {
      // Ensure warnings are issued only 1x, even if multiple versions of Lit
      // are loaded.
      const issuedWarnings = (globalThis.litIssuedWarnings ??= new Set());
      // Issue a warning, if we haven't already.
      issueWarning$1 = (code, warning) => {
          warning += ` See https://lit.dev/msg/${code} for more information.`;
          if (!issuedWarnings.has(warning)) {
              console.warn(warning);
              issuedWarnings.add(warning);
          }
      };
  }
  /**
   * Base element class that manages element properties and attributes, and
   * renders a lit-html template.
   *
   * To define a component, subclass `LitElement` and implement a
   * `render` method to provide the component's template. Define properties
   * using the {@linkcode LitElement.properties properties} property or the
   * {@linkcode property} decorator.
   */
  class LitElement extends ReactiveElement {
      constructor() {
          super(...arguments);
          /**
           * @category rendering
           */
          this.renderOptions = { host: this };
          this.__childPart = undefined;
      }
      /**
       * @category rendering
       */
      createRenderRoot() {
          const renderRoot = super.createRenderRoot();
          // When adoptedStyleSheets are shimmed, they are inserted into the
          // shadowRoot by createRenderRoot. Adjust the renderBefore node so that
          // any styles in Lit content render before adoptedStyleSheets. This is
          // important so that adoptedStyleSheets have precedence over styles in
          // the shadowRoot.
          this.renderOptions.renderBefore ??= renderRoot.firstChild;
          return renderRoot;
      }
      /**
       * Updates the element. This method reflects property values to attributes
       * and calls `render` to render DOM via lit-html. Setting properties inside
       * this method will *not* trigger another update.
       * @param changedProperties Map of changed properties with old values
       * @category updates
       */
      update(changedProperties) {
          // Setting properties in `render` should not trigger an update. Since
          // updates are allowed after super.update, it's important to call `render`
          // before that.
          const value = this.render();
          if (!this.hasUpdated) {
              this.renderOptions.isConnected = this.isConnected;
          }
          super.update(changedProperties);
          this.__childPart = render(value, this.renderRoot, this.renderOptions);
      }
      /**
       * Invoked when the component is added to the document's DOM.
       *
       * In `connectedCallback()` you should setup tasks that should only occur when
       * the element is connected to the document. The most common of these is
       * adding event listeners to nodes external to the element, like a keydown
       * event handler added to the window.
       *
       * ```ts
       * connectedCallback() {
       *   super.connectedCallback();
       *   addEventListener('keydown', this._handleKeydown);
       * }
       * ```
       *
       * Typically, anything done in `connectedCallback()` should be undone when the
       * element is disconnected, in `disconnectedCallback()`.
       *
       * @category lifecycle
       */
      connectedCallback() {
          super.connectedCallback();
          this.__childPart?.setConnected(true);
      }
      /**
       * Invoked when the component is removed from the document's DOM.
       *
       * This callback is the main signal to the element that it may no longer be
       * used. `disconnectedCallback()` should ensure that nothing is holding a
       * reference to the element (such as event listeners added to nodes external
       * to the element), so that it is free to be garbage collected.
       *
       * ```ts
       * disconnectedCallback() {
       *   super.disconnectedCallback();
       *   window.removeEventListener('keydown', this._handleKeydown);
       * }
       * ```
       *
       * An element may be re-connected after being disconnected.
       *
       * @category lifecycle
       */
      disconnectedCallback() {
          super.disconnectedCallback();
          this.__childPart?.setConnected(false);
      }
      /**
       * Invoked on each update to perform rendering tasks. This method may return
       * any value renderable by lit-html's `ChildPart` - typically a
       * `TemplateResult`. Setting properties inside this method will *not* trigger
       * the element to update.
       * @category rendering
       */
      render() {
          return noChange;
      }
  }
  // This property needs to remain unminified.
  LitElement['_$litElement$'] = true;
  /**
   * Ensure this class is marked as `finalized` as an optimization ensuring
   * it will not needlessly try to `finalize`.
   *
   * Note this property name is a string to prevent breaking Closure JS Compiler
   * optimizations. See @lit/reactive-element for more information.
   */
  LitElement[JSCompiler_renameProperty('finalized')] = true;
  // Install hydration if available
  globalThis.litElementHydrateSupport?.({ LitElement });
  // Apply polyfills if available
  const polyfillSupport = globalThis.litElementPolyfillSupportDevMode
      ;
  polyfillSupport?.({ LitElement });
  // IMPORTANT: do not change the property name or the assignment expression.
  // This line will be used in regexes to search for LitElement usage.
  (globalThis.litElementVersions ??= []).push('4.1.0');
  if (globalThis.litElementVersions.length > 1) {
      issueWarning$1('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` +
          `is not recommended.`);
  }

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  let issueWarning;
  {
      // Ensure warnings are issued only 1x, even if multiple versions of Lit
      // are loaded.
      const issuedWarnings = (globalThis.litIssuedWarnings ??= new Set());
      // Issue a warning, if we haven't already.
      issueWarning = (code, warning) => {
          warning += ` See https://lit.dev/msg/${code} for more information.`;
          if (!issuedWarnings.has(warning)) {
              console.warn(warning);
              issuedWarnings.add(warning);
          }
      };
  }
  const legacyProperty = (options, proto, name) => {
      const hasOwnProperty = proto.hasOwnProperty(name);
      proto.constructor.createProperty(name, hasOwnProperty ? { ...options, wrapped: true } : options);
      // For accessors (which have a descriptor on the prototype) we need to
      // return a descriptor, otherwise TypeScript overwrites the descriptor we
      // define in createProperty() with the original descriptor. We don't do this
      // for fields, which don't have a descriptor, because this could overwrite
      // descriptor defined by other decorators.
      return hasOwnProperty
          ? Object.getOwnPropertyDescriptor(proto, name)
          : undefined;
  };
  // This is duplicated from a similar variable in reactive-element.ts, but
  // actually makes sense to have this default defined with the decorator, so
  // that different decorators could have different defaults.
  const defaultPropertyDeclaration = {
      attribute: true,
      type: String,
      converter: defaultConverter$1,
      reflect: false,
      hasChanged: notEqual$1,
  };
  /**
   * Wraps a class accessor or setter so that `requestUpdate()` is called with the
   * property name and old value when the accessor is set.
   */
  const standardProperty = (options = defaultPropertyDeclaration, target, context) => {
      const { kind, metadata } = context;
      if (metadata == null) {
          issueWarning('missing-class-metadata', `The class ${target} is missing decorator metadata. This ` +
              `could mean that you're using a compiler that supports decorators ` +
              `but doesn't support decorator metadata, such as TypeScript 5.1. ` +
              `Please update your compiler.`);
      }
      // Store the property options
      let properties = globalThis.litPropertyMetadata.get(metadata);
      if (properties === undefined) {
          globalThis.litPropertyMetadata.set(metadata, (properties = new Map()));
      }
      properties.set(context.name, options);
      if (kind === 'accessor') {
          // Standard decorators cannot dynamically modify the class, so we can't
          // replace a field with accessors. The user must use the new `accessor`
          // keyword instead.
          const { name } = context;
          return {
              set(v) {
                  const oldValue = target.get.call(this);
                  target.set.call(this, v);
                  this.requestUpdate(name, oldValue, options);
              },
              init(v) {
                  if (v !== undefined) {
                      this._$changeProperty(name, undefined, options);
                  }
                  return v;
              },
          };
      }
      else if (kind === 'setter') {
          const { name } = context;
          return function (value) {
              const oldValue = this[name];
              target.call(this, value);
              this.requestUpdate(name, oldValue, options);
          };
      }
      throw new Error(`Unsupported decorator location: ${kind}`);
  };
  /**
   * A class field or accessor decorator which creates a reactive property that
   * reflects a corresponding attribute value. When a decorated property is set
   * the element will update and render. A {@linkcode PropertyDeclaration} may
   * optionally be supplied to configure property features.
   *
   * This decorator should only be used for public fields. As public fields,
   * properties should be considered as primarily settable by element users,
   * either via attribute or the property itself.
   *
   * Generally, properties that are changed by the element should be private or
   * protected fields and should use the {@linkcode state} decorator.
   *
   * However, sometimes element code does need to set a public property. This
   * should typically only be done in response to user interaction, and an event
   * should be fired informing the user; for example, a checkbox sets its
   * `checked` property when clicked and fires a `changed` event. Mutating public
   * properties should typically not be done for non-primitive (object or array)
   * properties. In other cases when an element needs to manage state, a private
   * property decorated via the {@linkcode state} decorator should be used. When
   * needed, state properties can be initialized via public properties to
   * facilitate complex interactions.
   *
   * ```ts
   * class MyElement {
   *   @property({ type: Boolean })
   *   clicked = false;
   * }
   * ```
   * @category Decorator
   * @ExportDecoratedItems
   */
  function property(options) {
      return (protoOrTarget, nameOrContext
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => {
          return (typeof nameOrContext === 'object'
              ? standardProperty(options, protoOrTarget, nameOrContext)
              : legacyProperty(options, protoOrTarget, nameOrContext));
      };
  }

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  /**
   * Declares a private or protected reactive property that still triggers
   * updates to the element when it changes. It does not reflect from the
   * corresponding attribute.
   *
   * Properties declared this way must not be used from HTML or HTML templating
   * systems, they're solely for properties internal to the element. These
   * properties may be renamed by optimization tools like closure compiler.
   * @category Decorator
   */
  function state(options) {
      return property({
          ...options,
          // Add both `state` and `attribute` because we found a third party
          // controller that is keying off of PropertyOptions.state to determine
          // whether a field is a private internal property or not.
          state: true,
          attribute: false,
      });
  }

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  {
      // Ensure warnings are issued only 1x, even if multiple versions of Lit
      // are loaded.
      (globalThis.litIssuedWarnings ??= new Set());
  }

  var css_248z$3 = css`:host{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);color:var(--sgds-body-color-default);font-family:var(--sgds-font-family-brand);font-size:var(--sgds-font-size-2);font-weight:var(--sgds-font-weight-regular);line-height:var(--sgds-line-height-body);margin:0;*,:after,:before{box-sizing:border-box}:disabled{cursor:not-allowed}@media (prefers-reduced-motion:no-preference){:root{scroll-behavior:smooth}}a[target=_blank]{align-items:center;display:flex;gap:var(--sgds-gap-2-xs)}::slotted(a[target=_blank]):after,a[target=_blank]:after{background-color:currentColor;content:"/";display:inline-block;-webkit-mask-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.274 3.9H9.3a.6.6 0 0 1 0 1.2c-.85 0-1.451 0-1.922.039-.463.038-.745.11-.968.223A2.4 2.4 0 0 0 5.361 6.41c-.113.223-.184.505-.222.968-.039.47-.04 1.072-.04 1.922v5.4c0 .85.001 1.451.04 1.922.038.463.11.745.222.968a2.4 2.4 0 0 0 1.05 1.048c.222.114.504.185.967.223.47.038 1.072.039 1.922.039h5.4c.85 0 1.451 0 1.921-.039.464-.038.746-.11.969-.223a2.4 2.4 0 0 0 1.048-1.048c.113-.223.185-.505.223-.968.038-.47.039-1.072.039-1.922a.6.6 0 1 1 1.2 0v.026c0 .818 0 1.469-.043 1.993-.044.538-.136.996-.35 1.415a3.6 3.6 0 0 1-1.573 1.574c-.42.213-.878.305-1.415.35-.525.042-1.175.042-1.993.042H9.274c-.818 0-1.469 0-1.993-.043-.538-.044-.996-.136-1.415-.35a3.6 3.6 0 0 1-1.574-1.573c-.213-.42-.305-.877-.35-1.415-.042-.524-.042-1.175-.042-1.993V9.274c0-.818 0-1.468.043-1.993.044-.538.136-.996.35-1.415a3.6 3.6 0 0 1 1.573-1.574c.42-.213.877-.305 1.415-.35C7.805 3.9 8.456 3.9 9.274 3.9Zm3.626.6a.6.6 0 0 1 .6-.6h6a.6.6 0 0 1 .6.6v6a.6.6 0 1 1-1.2 0V5.949l-5.976 5.975a.6.6 0 0 1-.848-.848L18.05 5.1H13.5a.6.6 0 0 1-.6-.6Z' fill='%230E0E0E'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.274 3.9H9.3a.6.6 0 0 1 0 1.2c-.85 0-1.451 0-1.922.039-.463.038-.745.11-.968.223A2.4 2.4 0 0 0 5.361 6.41c-.113.223-.184.505-.222.968-.039.47-.04 1.072-.04 1.922v5.4c0 .85.001 1.451.04 1.922.038.463.11.745.222.968a2.4 2.4 0 0 0 1.05 1.048c.222.114.504.185.967.223.47.038 1.072.039 1.922.039h5.4c.85 0 1.451 0 1.921-.039.464-.038.746-.11.969-.223a2.4 2.4 0 0 0 1.048-1.048c.113-.223.185-.505.223-.968.038-.47.039-1.072.039-1.922a.6.6 0 1 1 1.2 0v.026c0 .818 0 1.469-.043 1.993-.044.538-.136.996-.35 1.415a3.6 3.6 0 0 1-1.573 1.574c-.42.213-.878.305-1.415.35-.525.042-1.175.042-1.993.042H9.274c-.818 0-1.469 0-1.993-.043-.538-.044-.996-.136-1.415-.35a3.6 3.6 0 0 1-1.574-1.573c-.213-.42-.305-.877-.35-1.415-.042-.524-.042-1.175-.042-1.993V9.274c0-.818 0-1.468.043-1.993.044-.538.136-.996.35-1.415a3.6 3.6 0 0 1 1.573-1.574c.42-.213.877-.305 1.415-.35C7.805 3.9 8.456 3.9 9.274 3.9Zm3.626.6a.6.6 0 0 1 .6-.6h6a.6.6 0 0 1 .6.6v6a.6.6 0 1 1-1.2 0V5.949l-5.976 5.975a.6.6 0 0 1-.848-.848L18.05 5.1H13.5a.6.6 0 0 1-.6-.6Z' fill='%230E0E0E'/%3E%3C/svg%3E");-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;padding:0 .45em}::slotted(svg){vertical-align:middle}}`;

  /**
   * @cssprop --sgds-{stateColor} - State colors in hexadecimal value
   * @cssprop --sgds-{stateColor}-rgb - State colors in rgb value
   * @cssprop --sgds-{stateColor}-{weights} - State colors with different weightage in hexadecimal value
   * @cssprop --sgds-gray-{weights} - State colors with different weightage in hexadecimal value
   * @cssprop --overlay-background-color - The drawer and modal component overlay background color
   * @cssprop --zindex-modal - The drawer and modal component z-index value
   */
  class SgdsElement extends LitElement {
      /** Emits a custom event with more convenient defaults. */
      emit(name, options) {
          const event = new CustomEvent(name, Object.assign({ bubbles: true, cancelable: false, composed: true, detail: {} }, options));
          this.dispatchEvent(event);
          return event;
      }
      static define(name, elementConstructor = this, options = {}) {
          const currentlyRegisteredConstructor = customElements.get(name);
          if (!currentlyRegisteredConstructor) {
              // We try to register as the actual class first. If for some reason that fails, we fall back to anonymous classes.
              // customElements can only have 1 class of the same "object id" per registry, so that is why the try {} catch {} exists.
              // Some tools like Jest Snapshots and if you import the constructor and call `new SgdsButton()` they will fail with
              //   the anonymous class version.
              try {
                  customElements.define(name, elementConstructor, options);
              }
              catch (_err) {
                  customElements.define(name, class extends elementConstructor {
                  }, options);
              }
              return;
          }
          // let newVersion = ' (unknown version)';
          // let existingVersion = newVersion;
          // if ('version' in elementConstructor && elementConstructor.version) {
          //   newVersion = ' v' + elementConstructor.version;
          // }
          // if ('version' in currentlyRegisteredConstructor && currentlyRegisteredConstructor.version) {
          //   existingVersion = ' v' + currentlyRegisteredConstructor.version;
          // }
          // // Need to make sure we're not working with null or empty strings before doing version comparisons.
          // if (newVersion && existingVersion && newVersion === existingVersion) {
          //   // If versions match, we don't need to warn anyone. Carry on.
          //   return;
          // }
          // console.warn(
          //   `Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`
          // );
      }
      constructor() {
          super();
          Object.entries(this.constructor.dependencies).forEach(([name, component]) => {
              this.constructor.define(name, component);
          });
      }
  }
  SgdsElement.styles = [css_248z$3];
  /** @internal */
  SgdsElement.dependencies = {};

  var css_248z$2 = css`b{font-weight:bolder}[role=button]{cursor:pointer}a{color:#0049dc}a:hover{color:#0022b9}.sgds-masthead{font-family:Inter,system-ui,sans-serif;font-size:.875rem;line-height:1.25rem}.banner{background-color:light-dark(#f3f3f3,#1a1a1a)}.container{margin-left:auto;margin-right:auto;max-width:var(--sgds-mainnav-max-width);padding:.25rem var(--sgds-mainnav-padding-x);width:100%}.sg-crest{flex-shrink:0;height:20px;width:20px}.sg-crest path{fill:#db0000}.masthead-layout{display:flex;gap:.25rem}.masthead-text-layout{align-items:center;display:flex;flex-wrap:wrap;gap:0 .75rem}.sgds-masthead-identify-icon{align-self:center;display:block;height:20px;transform:rotate(180deg);transition:transform .3s ease-in-out 0s;user-select:none;width:20px}.sgds-masthead-identify-icon.show{transform:rotate(0deg)}.sgds-masthead-button{align-items:center;color:light-dark(#6b4feb,#a999f3);cursor:pointer;display:flex;gap:4px}.sgds-masthead-button:hover{color:light-dark(#523abc,#c8bdf7)}.panel{background-color:light-dark(oklch(from #0e0e0e l c h/.1),oklch(from #fff l c h/.1))}.sgds-masthead .sgds-masthead-content{display:none;padding-bottom:1rem;padding-top:1rem}.sgds-masthead .sgds-masthead-content.show{display:block}.content-grid{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}.icon{margin-top:-.1em}.wrapper{display:flex;gap:.5rem}.content{display:flex;flex-direction:column;gap:.25rem}.content .title{font-weight:600}.content article{color:light-dark(#525252,#a5a5a5)}.banner-icon,.banner-icon-inline{height:20px;width:20px}.banner-icon path,.banner-icon-inline path{fill:light-dark(#1a1a1a,#f3f3f3)}a.trusted-websites-link{color:light-dark(#6b4feb,#a999f3);text-decoration:underline;width:fit-content}a.trusted-websites-link:hover{color:light-dark(#523abc,#c8bdf7)}@media screen and (max-width:768px){.container{padding:.25rem var(--sgds-mainnav-mobile-padding-x)}.sgds-masthead-content .content-grid{gap:1rem;grid-template-columns:1fr}}`;

  var css_248z$1 = css`svg{vertical-align:middle}`;

  var css_248z = css`::slotted(a[target=_blank]:after),a[target=_blank]:after{background-color:currentColor;content:"/";display:inline-block;margin:0 .125rem;-webkit-mask-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.274 3.9H9.3a.6.6 0 0 1 0 1.2c-.85 0-1.451 0-1.922.039-.463.038-.745.11-.968.223A2.4 2.4 0 0 0 5.361 6.41c-.113.223-.184.505-.222.968-.039.47-.04 1.072-.04 1.922v5.4c0 .85.001 1.451.04 1.922.038.463.11.745.222.968a2.4 2.4 0 0 0 1.05 1.048c.222.114.504.185.967.223.47.038 1.072.039 1.922.039h5.4c.85 0 1.451 0 1.921-.039.464-.038.746-.11.969-.223a2.4 2.4 0 0 0 1.048-1.048c.113-.223.185-.505.223-.968.038-.47.039-1.072.039-1.922a.6.6 0 1 1 1.2 0v.026c0 .818 0 1.469-.043 1.993-.044.538-.136.996-.35 1.415a3.6 3.6 0 0 1-1.573 1.574c-.42.213-.878.305-1.415.35-.525.042-1.175.042-1.993.042H9.274c-.818 0-1.469 0-1.993-.043-.538-.044-.996-.136-1.415-.35a3.6 3.6 0 0 1-1.574-1.573c-.213-.42-.305-.877-.35-1.415-.042-.524-.042-1.175-.042-1.993V9.274c0-.818 0-1.468.043-1.993.044-.538.136-.996.35-1.415a3.6 3.6 0 0 1 1.573-1.574c.42-.213.877-.305 1.415-.35C7.805 3.9 8.456 3.9 9.274 3.9Zm3.626.6a.6.6 0 0 1 .6-.6h6a.6.6 0 0 1 .6.6v6a.6.6 0 1 1-1.2 0V5.949l-5.976 5.975a.6.6 0 0 1-.848-.848L18.05 5.1H13.5a.6.6 0 0 1-.6-.6Z' fill='%230E0E0E'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.274 3.9H9.3a.6.6 0 0 1 0 1.2c-.85 0-1.451 0-1.922.039-.463.038-.745.11-.968.223A2.4 2.4 0 0 0 5.361 6.41c-.113.223-.184.505-.222.968-.039.47-.04 1.072-.04 1.922v5.4c0 .85.001 1.451.04 1.922.038.463.11.745.222.968a2.4 2.4 0 0 0 1.05 1.048c.222.114.504.185.967.223.47.038 1.072.039 1.922.039h5.4c.85 0 1.451 0 1.921-.039.464-.038.746-.11.969-.223a2.4 2.4 0 0 0 1.048-1.048c.113-.223.185-.505.223-.968.038-.47.039-1.072.039-1.922a.6.6 0 1 1 1.2 0v.026c0 .818 0 1.469-.043 1.993-.044.538-.136.996-.35 1.415a3.6 3.6 0 0 1-1.573 1.574c-.42.213-.878.305-1.415.35-.525.042-1.175.042-1.993.042H9.274c-.818 0-1.469 0-1.993-.043-.538-.044-.996-.136-1.415-.35a3.6 3.6 0 0 1-1.574-1.573c-.213-.42-.305-.877-.35-1.415-.042-.524-.042-1.175-.042-1.993V9.274c0-.818 0-1.468.043-1.993.044-.538.136-.996.35-1.415a3.6 3.6 0 0 1 1.573-1.574c.42-.213.877-.305 1.415-.35C7.805 3.9 8.456 3.9 9.274 3.9Zm3.626.6a.6.6 0 0 1 .6-.6h6a.6.6 0 0 1 .6.6v6a.6.6 0 1 1-1.2 0V5.949l-5.976 5.975a.6.6 0 0 1-.848-.848L18.05 5.1H13.5a.6.6 0 0 1-.6-.6Z' fill='%230E0E0E'/%3E%3C/svg%3E");-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;mask-size:73%;-webkit-mask-size:73%;padding:0 .45em}`;

  /**
   * @summary All .gov.sg digital services shall adopt The Official Government Banner for every page in the digital service and be placed at the top of the page.
   */
  class SgdsMasthead extends SgdsElement {
      constructor() {
          super(...arguments);
          /** @internal */
          this.toggleVisibility = false;
      }
      /** @internal */
      _toggleVisibility() {
          this.toggleVisibility = !this.toggleVisibility;
      }
      render() {
          return html `
      <div id="sgds-masthead" class="sgds-masthead" aria-label="A Singapore Government Agency Website" role="banner">
        <div class="banner">
          <div class="container">
            <div class="masthead-layout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                class="sg-crest"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.31179 7.0109C4.31179 7.0109 3.78527 7.78129 4.4749 8.77746C4.4749 8.77746 4.58365 8.27018 5.67275 8.27018H6.97989C8.21435 8.27018 9.13979 7.04881 8.55889 5.78895C8.55889 5.78895 9.42995 5.88317 9.72123 5.31901C10.0114 4.75544 9.70292 4.52966 9.26739 4.52966H7.07088C7.07088 4.9341 6.32687 4.9904 6.32687 4.52966H5.09241C5.09241 4.52966 4.16643 4.52966 4.14867 5.33797C4.14867 5.33797 4.35784 5.20641 4.56589 5.18803V5.40346C4.56589 5.40346 4.31179 5.45057 4.19361 5.51664C4.07599 5.58213 3.90344 5.7608 4.06711 6.22154C4.23023 6.68171 4.29403 6.84142 4.29403 6.84142C4.29403 6.84142 4.55757 6.60588 4.98422 6.60588H5.48356C6.37237 6.60588 6.20925 7.49864 5.31989 7.49864C4.43052 7.49864 4.3129 7.01032 4.3129 7.01032L4.31179 7.0109Z"
                  fill="currentColor"
                />
                <path
                  d="M8.94948 6.0808C8.94948 6.0808 9.24908 6.09976 9.46657 5.90271C9.46657 5.90271 11.4362 7.49118 8.51395 10.6859C5.59118 13.8813 7.85094 15.9494 7.85094 15.9494C7.85094 15.9494 7.32498 16.4751 7.62402 17.5C7.62402 17.5 6.40843 16.7894 5.47856 15.5823C4.13479 13.8382 3.31367 11.1697 7.00374 9.04116C7.00374 9.04116 9.43938 7.77268 8.94948 6.0808Z"
                  fill="currentColor"
                />
                <path
                  d="M5.93914 4.22922C5.93914 4.22922 6.33251 3.50249 7.24573 3.50249C7.96588 3.50249 8.13011 3.11988 8.13011 3.11988C8.13011 3.11988 8.44413 2.5 10.0298 2.5C11.4829 2.5 12.4621 3.00153 13.2544 3.67139C13.2544 3.67139 11.1183 2.2995 9.01282 4.22922H5.93914Z"
                  fill="currentColor"
                />
                <path
                  d="M14.8217 8.828C14.7612 6.5599 13.0668 4.12922 9.42448 4.2671C12.9825 1.14703 19.1543 8.11333 14.0711 11.7734C14.0711 11.7734 14.9216 10.517 14.8217 8.828Z"
                  fill="currentColor"
                />
                <path
                  d="M9.96927 4.51761C14.4106 4.37973 15.9962 9.89315 13.1278 12.3744L10.2478 13.8158C10.2478 13.8158 9.87273 12.5628 11.2648 11.0961C12.6568 9.6306 13.9994 6.88625 10.1518 5.08177C10.1518 5.08177 10.2245 4.70605 9.97038 4.51819L9.96927 4.51761Z"
                  fill="currentColor"
                />
                <path
                  d="M9.73904 5.75795C9.73904 5.75795 9.95708 5.54481 10.0298 5.36959C13.3331 6.79778 12.8133 9.21697 10.8403 11.2467C9.63029 12.537 10.0053 13.9284 10.0053 13.9284C10.0053 13.9284 8.52954 14.8803 8.02078 15.7076C8.02078 15.7076 5.88363 13.8233 8.84357 10.6957C11.748 7.62563 9.73904 5.75795 9.73904 5.75795Z"
                  fill="currentColor"
                />
              </svg>
              <div class="masthead-text-layout">
                <span>A Singapore Government Agency Website</span>
                <div
                  class="sgds-masthead-button"
                  id="sgds-masthead-identify"
                  role="button"
                  aria-expanded="${this.toggleVisibility}"
                  aria-controls="sgds-masthead-content"
                  @click=${() => this._toggleVisibility()}
                >
                  <span>How to identify</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="sgds-masthead-identify-icon ${!this.toggleVisibility ? null : "show"}"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.64645 7.14645C9.84171 6.95118 10.1583 6.95118 10.3536 7.14645L15.3536 12.1464C15.5488 12.3417 15.5488 12.6583 15.3536 12.8536C15.1583 13.0488 14.8417 13.0488 14.6464 12.8536L10 8.20711L5.35355 12.8536C5.15829 13.0488 4.84171 13.0488 4.64645 12.8536C4.45118 12.6583 4.45118 12.3417 4.64645 12.1464L9.64645 7.14645Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div
            id="sgds-masthead-content"
            class="container sgds-masthead-content ${this.toggleVisibility ? "show" : null}"
          >
            <div class="content-grid">
              <div class="wrapper">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="banner-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.5 7.31409C2.5 7.01647 2.65873 6.74143 2.91644 6.59254L9.5831 2.74069C9.84105 2.59165 10.1589 2.59165 10.4169 2.74069L17.0836 6.59254C17.3413 6.74143 17.5 7.01647 17.5 7.31409V8.33314C17.5 8.79338 17.1269 9.16648 16.6667 9.16648H15.8333V14.9998H16.6667C17.1269 14.9998 17.5 15.3729 17.5 15.8331V16.6665C17.5 17.1267 17.1269 17.4998 16.6667 17.4998H3.33333C2.8731 17.4998 2.5 17.1267 2.5 16.6665V15.8331C2.5 15.3729 2.8731 14.9998 3.33333 14.9998H4.16667V9.16648H3.33333C2.8731 9.16648 2.5 8.79338 2.5 8.33314V7.31409ZM6.66667 9.16648V14.9998H8.75V9.16648H6.66667ZM11.25 9.16648V14.9998H13.3333V9.16648H11.25ZM11.25 6.24981C11.25 6.94017 10.6904 7.49981 10 7.49981C9.30964 7.49981 8.75 6.94017 8.75 6.24981C8.75 5.55945 9.30964 4.99981 10 4.99981C10.6904 4.99981 11.25 5.55945 11.25 6.24981Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div class="content">
                  <div class="title">Official website links end with .gov.sg</div>
                  <article>Government agencies communicate via .gov.sg websites (e.g. go.gov.sg/open).</article>
                  <a
                    href="https://www.gov.sg/trusted-sites#govsites"
                    class="trusted-websites-link"
                    rel="noreferrer"
                    target="_blank"
                    >Trusted websites</a
                  >
                </div>
              </div>
              <div class="wrapper">
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="banner-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.83334 8.33317H5.41668C4.26608 8.33317 3.33334 9.26591 3.33334 10.4165V16.2498C3.33334 17.4004 4.26608 18.3332 5.41668 18.3332H14.5833C15.7339 18.3332 16.6667 17.4004 16.6667 16.2498V10.4165C16.6667 9.26591 15.7339 8.33317 14.5833 8.33317H14.1667V5.83317C14.1667 3.53198 12.3012 1.6665 10 1.6665C7.69882 1.6665 5.83334 3.53198 5.83334 5.83317V8.33317ZM7.50001 8.33317H12.5V5.83317C12.5 4.45246 11.3807 3.33317 10 3.33317C8.6193 3.33317 7.50001 4.45246 7.50001 5.83317V8.33317Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div class="content">
                  <div class="title">Secure websites use HTTPS</div>
                  <article>
                    Look for a lock (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      class="banner-icon-inline"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.83331 8.33317H5.41665C4.26605 8.33317 3.33331 9.26591 3.33331 10.4165V16.2498C3.33331 17.4004 4.26605 18.3332 5.41665 18.3332H14.5833C15.7339 18.3332 16.6666 17.4004 16.6666 16.2498V10.4165C16.6666 9.26591 15.7339 8.33317 14.5833 8.33317H14.1666V5.83317C14.1666 3.53198 12.3012 1.6665 9.99998 1.6665C7.69879 1.6665 5.83331 3.53198 5.83331 5.83317V8.33317ZM7.49998 8.33317H12.5V5.83317C12.5 4.45246 11.3807 3.33317 9.99998 3.33317C8.61927 3.33317 7.49998 4.45246 7.49998 5.83317V8.33317Z"
                        fill="currentColor"
                      /></svg
                    >) or https:// as an added precaution. Share sensitive information only on official, secure
                    websites.
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
      }
  }
  SgdsMasthead.styles = [...SgdsElement.styles, css_248z$1, css_248z, css_248z$2];
  __decorate([
      state()
  ], SgdsMasthead.prototype, "toggleVisibility", void 0);

  /**
   *
   * @param name tagname of custom element
   * @returns boolean
   */
  function register(name, constructor) {
      if (!customElements.get(name)) {
          customElements.define(name, constructor);
      }
  }

  register("sgds-masthead", SgdsMasthead);

}));
//# sourceMappingURL=index.umd.js.map
