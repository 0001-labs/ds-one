// ds-container.ts
// Container component with responsive width constraints

import { LitElement, html, unsafeCSS } from "lit";
import styles from "./styles/ds-container.css?inline";

declare global {
  interface CustomElementRegistry {
    define(name: string, constructor: typeof LitElement): void;
  }
  var customElements: CustomElementRegistry;
}

export class Container extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("ds-container", Container);

declare global {
  interface HTMLElementTagNameMap {
    "ds-container": Container;
  }
}
