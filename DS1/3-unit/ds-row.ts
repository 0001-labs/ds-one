import { LitElement, html, unsafeCSS } from "lit";
import styles from "./styles/ds-row.css?inline";

declare global {
  interface CustomElementRegistry {
    define(name: string, constructor: typeof LitElement): void;
  }
  var customElements: CustomElementRegistry;
}

export class Row extends LitElement {
  static properties = {
    fill: { type: Boolean, reflect: true },
    centered: { type: Boolean, reflect: true },
    end: { type: Boolean, reflect: true },
  };

  declare fill: boolean;
  declare centered: boolean;
  declare end: boolean;

  constructor() {
    super();
    this.fill = false;
    this.centered = false;
    this.end = false;
  }

  static styles = unsafeCSS(styles);

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
