// /Users/joachim/Library/Mobile Documents/com~apple~CloudDocs/Design system/3 Unit/row-v1.ts

import { LitElement, html, css } from "lit";

declare global {
  interface CustomElementRegistry {
    define(name: string, constructor: typeof LitElement): void;
  }
  var customElements: CustomElementRegistry;
}

export class Row extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
  };

  declare type: "fill" | "centered";

  constructor() {
    super();
    this.type = "fill";
  }

  static styles = css`
    :host {
      display: flex;
      align-items: end;
      width: calc(240px * var(--scaling-factor));
    }

    :host([type="fill"]) {
      justify-content: space-between;
      height: calc(var(--1) * var(--scaling-factor));
    }

    :host([type="centered"]) {
      justify-content: center;
      height: calc(var(--1) * var(--scaling-factor));
      gap: calc(var(--025) * var(--scaling-factor));
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("row-v1", Row);

declare global {
  interface HTMLElementTagNameMap {
    "row-v1": Row;
  }
}
