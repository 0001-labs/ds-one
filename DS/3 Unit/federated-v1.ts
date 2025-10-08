import { LitElement, html, css } from "lit";

export class Federated extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: calc(80px * var(--scaling-factor));
      border-top: 1px solid var(--slate-light);
      border-bottom: 1px solid var(--slate-light);
      gap: calc(20px * var(--scaling-factor));
    }

    ::slotted(*) {
      width: 100%;
      height: 20px;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("federated-v1", Federated);

declare global {
  interface HTMLElementTagNameMap {
    "federated-v1": Federated;
  }
} 