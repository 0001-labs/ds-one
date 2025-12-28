import { LitElement, html, unsafeCSS, PropertyValues } from "lit";
import styles from "./styles/ds-gap.css?inline";

/**
 * Full-width vertical spacer.
 *
 * Usage:
 * - <ds-gap unit></ds-gap>
 * - <ds-gap double></ds-gap>
 * - <ds-gap size="05"></ds-gap>
 */
export class Gap extends LitElement {
  static properties = {
    /** Raw scale token selector ("01", "025", "05", "08", "1", "2", "3", "4", "8", "12") */
    size: { type: String, reflect: true },
  };

  declare size?: string;

  constructor() {
    super();
  }

  static styles = unsafeCSS(styles);

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);
    // Remove size attribute if it's empty or undefined
    if (changedProperties.has("size")) {
      if (!this.size || this.size === "") {
        this.removeAttribute("size");
      }
    }
  }

  render() {
    return html``;
  }
}

customElements.define("ds-gap", Gap);

declare global {
  interface HTMLElementTagNameMap {
    "ds-gap": Gap;
  }
}
