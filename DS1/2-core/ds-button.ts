// ds-button.ts
// Core button component

import { LitElement, html, unsafeCSS } from "lit";
import "./ds-text";
import styles from "./styles/ds-button.css?inline";

export class Button extends LitElement {
  static properties = {
    primary: { type: Boolean, reflect: true },
    secondary: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    blank: { type: Boolean, reflect: true },
    language: { type: String },
    text: { type: String },
    href: { type: String },
    _loading: { type: Boolean, state: true },
  };

  // Public properties
  declare primary: boolean;
  declare secondary: boolean;
  declare disabled: boolean;
  declare blank: boolean;
  declare language: string;
  declare text: string;
  declare href: string;

  // Private state
  declare _loading: boolean;

  constructor() {
    super();
    this.primary = false; // Default to no-background (no attribute)
    this.secondary = false;
    this.disabled = false;
    this.blank = false;
    this.language = "en-US";
    this.text = "";
    this.href = "";
    this._loading = false;
  }

  static styles = unsafeCSS(styles);

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    const hasTextProps = this.text;

    return html`
      <button
        ?primary=${this.primary}
        ?secondary=${this.secondary}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        ${hasTextProps
          ? html`<ds-text .text=${this.text}></ds-text>`
          : html`<slot></slot>`}
      </button>
    `;
  }

  private _handleClick(e: Event) {
    // Prevent any action if disabled and stop event propagation
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // If href is provided, navigate to the URL and do not bubble further
    if (this.href) {
      e.preventDefault();
      e.stopPropagation();
      if (this.blank) {
        window.open(this.href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = this.href;
      }
      return;
    }

    // Otherwise, rely on the native 'click' event bubbling from the inner
    // <button> through the shadow boundary to consumers of <ds-button>.
    // Do not re-dispatch a synthetic 'click' here to avoid duplicate events.
  }
}

customElements.define("ds-button", Button);

declare global {
  interface HTMLElementTagNameMap {
    "ds-button": Button;
  }
}
