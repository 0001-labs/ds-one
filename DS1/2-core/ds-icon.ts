import { LitElement, html, unsafeCSS } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import styles from "./styles/ds-icon.css?inline";
import { iconNameToSvgMap, type IconName } from "./generated/ds-icon-map";

export type IconVariant = "glyph" | "primary" | "secondary";

/**
 * Icon component that renders SVG icons from the design system icon set.
 *
 * Usage:
 *   <ds-icon type="close"></ds-icon>
 *   <ds-icon type="home" variant="primary"></ds-icon>
 *
 * Variants:
 *   - glyph (default): No background, inherits text color. Like text.
 *   - primary: Accent color background with contrasting icon color.
 *   - secondary: Subtle background with icon color.
 *
 * Size is controlled by the `--sf` CSS variable (design system scale factor).
 * Color can be customized via `--icon-color` CSS variable.
 */
export class Icon extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
    variant: { type: String, reflect: true },
  };

  private _type: IconName | "" = "";
  variant: IconVariant = "glyph";

  get type(): IconName | "" {
    return this._type;
  }

  set type(val: IconName | "") {
    const oldVal = this._type;
    this._type = val;
    this.requestUpdate("type", oldVal);
  }

  static styles = unsafeCSS(styles);

  render() {
    if (!this._type) {
      return html`<slot></slot>`;
    }

    const svg = iconNameToSvgMap[this._type.toLowerCase() as IconName];
    if (svg) {
      return html`${unsafeHTML(svg)}`;
    }

    // Fallback to slot if icon not found
    return html`<slot></slot>`;
  }
}

customElements.define("ds-icon", Icon);

declare global {
  interface HTMLElementTagNameMap {
    "ds-icon": Icon;
  }
}

export type { IconName };
