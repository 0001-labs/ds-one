// ds-button.ts
// Core button component

import { LitElement, html, css } from "lit";
import "./ds-text";

export class Button extends LitElement {
  static properties = {
    variant: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    bold: { type: Boolean, reflect: true },
    "no-background": {
      type: Boolean,
      reflect: true,
      attribute: "no-background",
    },
    blank: { type: Boolean, reflect: true },
    key: { type: String },
    fallback: { type: String },
    language: { type: String },
    defaultText: { type: String, attribute: "default-text" },
    href: { type: String },
    _loading: { type: Boolean, state: true },
  };

  // Public properties
  declare variant: string;
  declare disabled: boolean;
  declare bold: boolean;
  declare "no-background": boolean;
  declare blank: boolean;
  declare key: string;
  declare fallback: string;
  declare language: string;
  declare defaultText: string;
  declare href: string;

  // Private state
  declare _loading: boolean;

  constructor() {
    super();
    this.variant = "title";
    this.disabled = false;
    this.bold = false;
    this["no-background"] = false;
    this.blank = false;
    this.key = "";
    this.fallback = "";
    this.language = "en-US";
    this.defaultText = "";
    this.href = "";
    this._loading = false;
  }

  static styles = css`
    button {
      max-height: calc(var(--08) * var(--sf));
      border: none;
      cursor: pointer;
      font-size: calc(var(--type-size-default) * var(--sf));
      padding: 0 calc(1px * var(--sf));
      color: var(--button-text-color);
      font-family: var(--typeface-regular);
    }

    button.title {
      background-color: var(--button-background-color-secondary);
      color: var(--button-text-color);
    }

    button.primary {
      background-color: var(--accent-color);
      color: var(--button-text-color);
      text-decoration-line: none;
      font-family: var(--typeface-regular);
    }

    button.secondary {
      background-color: var(--button-background-color-secondary);
      color: var(--button-text-color);
      font-family: var(--typeface-regular);
    }

    button[bold] {
      font-weight: var(--type-weight-bold);
      font-family: var(--typeface-medium);
    }

    button[no-background] {
      background-color: transparent;
      max-height: var(--1);
      padding: 0;
      color: var(--button-color, var(--button-text-color-secondary));
    }

    button[no-background][bold] {
      font-weight: var(--type-weight-bold);
      font-family: var(--typeface-medium);
      color: var(--button-color, var(--button-text-color-secondary));
    }

    .loading {
      opacity: 0.7;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    const hasTextProps = this.key || this.defaultText || this.fallback;

    return html`
      <button
        class=${this.variant}
        ?disabled=${this.disabled}
        ?bold=${this.bold}
        ?no-background=${this["no-background"]}
        @click=${this._handleClick}
      >
        ${hasTextProps
          ? html`<ds-text
              .key=${this.key}
              .defaultValue=${this.defaultText}
              .fallback=${this.fallback}
            ></ds-text>`
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
