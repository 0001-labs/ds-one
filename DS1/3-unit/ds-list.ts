// ds-list.ts
// Unit component that
// can be used to show a list of items consisting of components from core

import { LitElement, html, unsafeCSS } from "lit";
import styles from "./styles/ds-list.css?inline";

export class List extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("ds-list", List);

declare global {
  interface HTMLElementTagNameMap {
    "ds-list": List;
  }
}

