import { LitElement, html, unsafeCSS } from "lit";
import styles from "./styles/ds-date.css?inline";

/**
 * A component for displaying the current year
 *
 * @element ds-date
 */
export class DateComponent extends LitElement {
  static styles = unsafeCSS(styles);

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
