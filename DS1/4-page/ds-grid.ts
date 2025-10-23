// ds-grid.ts
// Simple grid layout component

import { LitElement, html, css } from "lit";

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

  static styles = css`
    :host {
      margin-top: 0.5px !important;
      margin-left: 0.5px !important;
      display: grid;
      width: 100%;
      height: 100%;
      grid-template-columns: repeat(auto-fill, 19px);
      grid-template-rows: repeat(auto-fill, 19px);
      gap: 1px;
      row-rule: 1px solid
        light-dark(rgba(0, 0, 0, 0.03), rgba(215, 215, 215, 0.022));
      column-rule: 1px solid
        light-dark(rgba(0, 0, 0, 0.03), rgba(238, 238, 238, 0.022));
      outline: 1px solid light-dark(rgba(0, 0, 0, 0.15), #100101e7);
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 300;
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
      left: 100%;
      transform: translateX(-100%);
    }
  `;

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
