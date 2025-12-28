import { LitElement, html, unsafeCSS } from "lit";
import styles from "./styles/ds-pagedots.css?inline";

/**
 * Page dots indicator component for carousels and pagination.
 *
 * Usage:
 * - <ds-pagedots count="3" active="0"></ds-pagedots>
 */
export class Pagedots extends LitElement {
  static properties = {
    /** Number of dots to display */
    count: { type: Number, reflect: true },
    /** Index of the active dot (0-based) */
    active: { type: Number, reflect: true },
  };

  declare count: number;
  declare active: number;

  constructor() {
    super();
    this.count = 3;
    this.active = 0;
  }

  static styles = unsafeCSS(styles);

  render() {
    const dots = Array.from({ length: this.count }, (_, i) => i);
    return html`
      ${dots.map(
        (index) => html`
          <span
            class="dot ${index === this.active ? "active" : ""}"
            role="button"
            aria-label="Slide ${index + 1}"
            aria-current="${index === this.active ? "true" : "false"}"
          ></span>
        `
      )}
    `;
  }
}

customElements.define("ds-pagedots", Pagedots);

declare global {
  interface HTMLElementTagNameMap {
    "ds-pagedots": Pagedots;
  }
}
