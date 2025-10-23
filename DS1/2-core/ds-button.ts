// ds-button.ts
// Core button component

import { LitElement, html, css, type PropertyValues } from "lit";
import { getText, currentLanguage } from "../utils/language";

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
    notionKey: { type: String, attribute: "notion-key" },
    key: { type: String },
    fallback: { type: String },
    language: { type: String },
    defaultText: { type: String, attribute: "default-text" },
    href: { type: String },
    _loading: { type: Boolean, state: true },
    _notionText: { type: String, state: true },
  };

  // Public properties
  declare variant: string;
  declare disabled: boolean;
  declare bold: boolean;
  declare "no-background": boolean;
  declare blank: boolean;
  declare notionKey: string | null;
  declare key: string;
  declare fallback: string;
  declare language: string;
  declare defaultText: string;
  declare href: string;

  // Private state
  declare _loading: boolean;
  declare _notionText: string | null;

  constructor() {
    super();
    this.variant = "title";
    this.disabled = false;
    this.bold = false;
    this["no-background"] = false;
    this.blank = false;
    this.notionKey = null;
    this.key = "";
    this.fallback = "";
    this.language = "en-US";
    this.defaultText = "";
    this.href = "";
    this._loading = false;
    this._notionText = null;
  }

  static styles = css`
    button {
      max-height: calc(var(--08) * var(--scaling-factor));
      border: none;
      cursor: pointer;
      font-size: calc(var(--type-size-default) * var(--scaling-factor));
      padding: 0 calc(1px * var(--scaling-factor));
      color: var(--button-text-color);
      font-family: var(--typeface);
    }

    button.title {
      background-color: var(--button-background-color-secondary);
      color: var(--button-text-color);
    }

    button.primary {
      background-color: var(--accent-color);
      color: var(--button-text-color);
      text-decoration-line: none;
      font-family: var(--typeface);
    }

    button.secondary {
      background-color: var(--button-background-color-secondary);
      color: var(--button-text-color);
      font-family: var(--typeface);
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
    this._updateText();

    // Listen for language changes
    window.addEventListener("language-changed", this._handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("language-changed", this._handleLanguageChange);
  }

  _handleLanguageChange = () => {
    this._updateText();
  };

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);

    if (changedProps.has("key") || changedProps.has("defaultText")) {
      this._updateText();
    }
  }

  /**
   * Update text from translations (synchronous like Portfolio)
   */
  private _updateText() {
    if (this.key) {
      this._notionText = getText(this.key);
    } else {
      this._notionText = this.defaultText || this.fallback || null;
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <button
        class=${this.variant}
        ?disabled=${this.disabled}
        ?bold=${this.bold}
        ?no-background=${this["no-background"]}
        @click=${this._handleClick}
      >
        ${this._notionText ? this._notionText : html`<slot></slot>`}
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
