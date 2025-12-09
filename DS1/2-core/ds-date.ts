import { LitElement, html, css } from "lit";

/**
 * A component for displaying the current year
 *
 * @element ds-date
 */
export class DateComponent extends LitElement {
  static styles = css`
    :host {
      display: inline;
      font-family: var(--typeface, var(--typeface-regular));
      font-size: inherit;
      color: inherit;
    }
  `;

  render() {
    const year = new Date().getFullYear();
    return html`<span>${year}</span>`;
  }
}

customElements.define("ds-date", DateComponent);

declare global {
  interface HTMLElementTagNameMap {
    "ds-date": DateComponent;
  }
}

