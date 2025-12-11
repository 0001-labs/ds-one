// ds-grid.ts
// Simple grid layout component

import { LitElement, html, css } from "lit";
import { detectMobileDevice } from "../0-face/device";

declare global {
  interface CustomElementRegistry {
    define(name: string, constructor: typeof LitElement): void;
  }
  var customElements: CustomElementRegistry;
}

export class Grid extends LitElement {
  static properties = {
    align: { type: String },
  };

  align?: string;
  private resizeObserver?: () => void;
  private resizeTimeout?: any;

  static styles = css`
    :host {
      margin-top: 0.5px !important;
      margin-left: 0.5px !important;
      display: grid;
      width: 1440px;
      height: 1280px;
      grid-template-columns: repeat(auto-fill, 19px);
      grid-template-rows: repeat(auto-fill, 19px);
      gap: 1px;
      row-rule: calc(1px * var(--sf)) solid var(--grid-color);
      column-rule: calc(1px * var(--sf)) solid var(--grid-color);
      outline: calc(1px * var(--sf)) solid var(--yellow);
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 300;
    }

    /* DO NOT CHANGE THIS GRID CODE FOR MOBILE. ITS PERFECT FOR MOBILE. */
    :host(.mobile) {
      width: calc(100% - calc(1px * var(--sf)));
      max-width: 100vw;
      margin-left: 0.5px !important;
      margin-top: 0 !important;
      box-sizing: border-box;
      position: fixed;
      top: calc(0.5px * var(--sf));
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 300;
      gap: calc(1px * var(--sf));
      grid-template-columns: repeat(14, calc(19px * var(--sf)));
      grid-template-rows: repeat(auto-fill, calc(19px * var(--sf)));
    }

    :host([align="left"]) {
      left: 0;
      transform: none;
    }

    :host([align="center"]) {
      left: 50%;
      transform: translateX(-50%);
    }

    :host([align="right"]) {
      left: auto;
      right: 0;
      transform: none;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateMobileClass();

    // Listen for resize events to update mobile class
    this.resizeObserver = () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        this.updateMobileClass();
      }, 100);
    };
    window.addEventListener("resize", this.resizeObserver);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      window.removeEventListener("resize", this.resizeObserver);
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  private updateMobileClass() {
    const isMobile = detectMobileDevice();
    if (isMobile) {
      this.classList.add("mobile");
      this.classList.remove("desktop");
    } else {
      this.classList.add("desktop");
      this.classList.remove("mobile");
    }
  }

  render() {
    return html``;
  }
}

customElements.define("ds-grid", Grid);

declare global {
  interface HTMLElementTagNameMap {
    "ds-grid": Grid;
  }
}
