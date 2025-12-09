// ds-banner.ts
// Unit component that
// can be used to show a list of items consiting of compoentnts from core




import { LitElement, html, css } from "lit";

export class List extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
    }
  `;

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

