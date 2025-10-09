import { LitElement, html, css } from "lit";

/**
 * A component for displaying the current year
 *
 * @element year-v1
 */
export class Year extends LitElement {
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

customElements.define("year-v1", Year);

declare global {
  interface HTMLElementTagNameMap {
    "year-v1": Year;
  }
}
