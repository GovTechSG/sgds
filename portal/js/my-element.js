/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let MyElement = class MyElement extends LitElement {
    _toggleSgdsDay() {
        this.container.classList.value = '';
    }
    _toggleRosy() {
        this.container.classList.value = '';
        this.container.classList.add('rosy-theme');
    }
    render() {
        return html `
      <div id="theme-container">
        <slot></slot>
        <div class="toggle-container">
          <button id="day-theme" @click=${this._toggleSgdsDay}>
            SGDS day theme
          </button>
          <!-- <button id="night-theme">SGDS night theme</button> -->
          <button id="rosy-theme" @click=${this._toggleRosy}>Rosy theme</button>
        </div>
      </div>
    `;
    }
};
MyElement.styles = css `
    #theme-container {
      display: flex;
      background: var(--sgds-primary-bg-translucent);
      flex-direction: column;
      gap: var(--sgds-gap-sm);
      padding: 16px;
    }
    .rosy-theme {
      --rosy-100: #f5b6da;
      --rosy-200: #f186c0;
      --rosy-300: #ee4fa6;
      --rosy-400: #ee0290;
      --rosy-500: #ef0078;
      --rosy-600: #dd0074;
      --rosy-700: #c6006e;
      --rosy-800: #b0006a;
      --rosy-900: #880061;
      --sgds-brand-100: var(--rosy-100);
      --sgds-brand-200: var(--rosy-200);
      --sgds-brand-300:var(--rosy-300);
      --sgds-brand-400: var(--rosy-400);
      --sgds-brand-500: var(--rosy-500);
      --sgds-brand-600: var(--rosy-600);
      --sgds-brand-700: var(--rosy-700);
      --sgds-brand-800: var(--rosy-800);
      --sgds-brand-900: var(--rosy-900);
      --sgds-primary-bg: var(--sgds-brand-500);
      --sgds-primary-bg-subtle: var(--sgds-brand-200);
      --sgds-primary-bg-emphasis: var(--sgds-brand-600);
      --sgds-primary-bg-translucent: oklch(
        from var(--sgds-brand-100) l c h / 0.1
      );
      --sgds-primary-color: var(--sgds-brand-400);
      --sgds-primary-color-emphasis: var(--sgds-brand-500);
      --sgds-primary-border-color: var(--sgds-brand-400);
      --sgds-primary-border-color-subtle: var(--sgds-brand-300);
      --sgds-primary-border-color-emphasis: var(--sgds-brand-700);

      --sgds-form-primary-bg: var(--rosy-600);
      --sgds-form-primary-bg-emphasis: var(--rosy-700);
      --sgds-form-primary-bg-translucent: oklch(
        from var(--rosy-600) l c h / 0.1
      );
      --sgds-form-primary-active-color: var(--rosy-600);
    }

    .toggle-container {
      display: flex;
      gap: var(--sgds-gap-sm);
    }
  `;
__decorate([
    query('#theme-container')
], MyElement.prototype, "container", void 0);
MyElement = __decorate([
    customElement('sgds-portal-theme-box')
], MyElement);
export { MyElement };
//# sourceMappingURL=my-element.js.map