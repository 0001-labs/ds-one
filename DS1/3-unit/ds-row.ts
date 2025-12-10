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
      width: calc(240px * var(--sf));
    }

    :host([type="fill"]) {
      justify-content: space-between;
      height: calc(var(--1) * var(--sf));
    }

    :host([type="centered"]) {
      justify-content: center;
      height: calc(var(--1) * var(--sf));
      gap: calc(var(--025) * var(--sf));
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("ds-row", Row);

declare global {
  interface HTMLElementTagNameMap {
    "ds-row": Row;
  }
}
