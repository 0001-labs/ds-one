import { LitElement, html, css } from "lit";

export class PortfolioPanel extends LitElement {
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

customElements.define("portfolio-panel", PortfolioPanel);

declare global {
  interface HTMLElementTagNameMap {
    "portfolio-panel": PortfolioPanel;
  }
}
