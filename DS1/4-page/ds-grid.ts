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
      margin-top: 0.5px;
      margin-left: 0px;
      display: grid;
      z-index: -10;
      grid-template-columns: repeat(19, 79px);
      grid-template-rows: repeat(500, 19px);
      gap: 1px;
      row-rule: 1px solid #00000012;
      column-rule: 1px solid #00000012;
      outline: 1px solid #100101e7;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 1;
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
