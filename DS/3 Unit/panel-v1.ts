// /Users/joachim/Library/Mobile Documents/com~apple~CloudDocs/Design system/3 Unit/panel-v1.ts

import { LitElement, html, css } from "lit";

export class Panel extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      height: var(--08);
      align-items: end;
      gap: var(--025);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("panel-v1", Panel);

declare global {
  interface HTMLElementTagNameMap {
    "panel-v1": Panel;
  }
}
