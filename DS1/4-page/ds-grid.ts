// ds-grid.ts
// Simple grid layout component

import { LitElement, html, css } from "lit";
import { detectMobileDevice } from "../0-face/2025-04-23-device";

declare global {
  interface CustomElementRegistry {
    define(name: string, constructor: typeof LitElement): void;
  }
  var customElements: CustomElementRegistry;
}

export class Grid extends LitElement {
  static properties = {
    align: { type: String },
    _isMobile: { type: Boolean, state: true },
  };

  align?: string;
  _isMobile: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    this._isMobile = detectMobileDevice();
    console.log(`[ds-grid] Mobile device: ${this._isMobile}`);

    // Apply mobile class immediately
    if (this._isMobile) {
      this.classList.add("mobile");
      console.log(`[ds-grid] Mobile class added`);
    }

    // Calculate mobile grid dimensions to fit screen
    if (this._isMobile && typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      const columns = 14;
      const gap = 0.5;

      // Calculate column size accounting for gaps between columns
      // Total width = (columns * columnSize) + ((columns - 1) * gap)
      // Therefore: columnSize = (screenWidth - ((columns - 1) * gap)) / columns
      const totalGapWidth = (columns - 1) * gap;
      const columnSize = (screenWidth - totalGapWidth) / columns;

      console.log(
        `[ds-grid] Mobile grid: ${columns} columns × ${columnSize.toFixed(2)}px + ${totalGapWidth}px gaps = ${screenWidth}px`
      );

      // Set custom property for this grid instance
      this.style.setProperty("--mobile-column-size", `${columnSize}px`);
      this.style.setProperty("--mobile-gap", `${gap}px`);
    }
  }

  static styles = css`
    :host {
      margin-top: 0.5px !important;
      margin-left: 0.5px !important;
      display: grid;
      width: 1440px;
      height: 100%;
      grid-template-columns: repeat(auto-fill, 19px);
      grid-template-rows: repeat(auto-fill, 19px);
      gap: 1px;
      row-rule: calc(1px * var(--scaling-factor)) solid
        light-dark(rgb(147, 147, 147), rgb(147, 147, 147));
      column-rule: calc(1px * var(--scaling-factor)) solid
        light-dark(rgb(147, 147, 147), rgb(147, 147, 147));
      outline:
        1px solid light-dark(rgb(147, 147, 147)),
        rgb(147, 147, 147);
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 300;
    }

    /* DO NOT CHANGE THIS GRID CODE FOR MOBILE. ITS PERFECT FOR MOBILE. */
    :host(.mobile) {
      outline: calc(2px * var(--scaling-factor)) solid rgba(251, 255, 0, 0.9);
      width: calc(100% - calc(1px * var(--scaling-factor)));
      max-width: 100vw;
      margin-left: 0 !important;
      margin-top: 0 !important;
      box-sizing: border-box;
      position: fixed;
      top: calc(0.5px * var(--scaling-factor));
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 300;
      gap: calc(1px * var(--scaling-factor));
      grid-template-columns: repeat(14, calc(19px * var(--scaling-factor)));
      grid-template-rows: repeat(auto-fill, calc(19px * var(--scaling-factor)));
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

  updated() {
    // Apply mobile class if detected as mobile device
    if (this._isMobile) {
      this.classList.add("mobile");
    } else {
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
