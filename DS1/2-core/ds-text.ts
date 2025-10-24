import { LitElement, html, css } from "lit";
import { getText } from "../utils/language";

/**
 * A component for displaying text from translations
 *
 * @element ds-text
 * @prop {string} key - The translation key to use
 * @prop {string} defaultValue - Default value if translation is not found
 * @prop {string} fallback - Optional fallback text if translation is not found (deprecated, use defaultValue)
 */
export class Text extends LitElement {
  static get properties() {
    return {
      key: { type: String, reflect: true },
      defaultValue: { type: String, reflect: true, attribute: "default-value" },
      fallback: { type: String, reflect: true }, // Kept for backward compatibility
      _text: { type: String, state: true },
    };
  }

  declare key: string;
  declare defaultValue: string;
  declare fallback: string;
  declare _text: string;
  private boundHandlers: { languageChanged: EventListener };

  constructor() {
    super();
    this.key = "";
    this.defaultValue = "";
    this.fallback = "";
    this._text = "";

    // Create bound event handlers for proper cleanup
    this.boundHandlers = {
      languageChanged: (() => {
        console.log("Language changed event received in ds-text");
        this._loadText();
      }) as EventListener,
    };
  }

  static styles = css`
    :host {
      display: inline;
    }

    .loading {
      opacity: 0.6;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._loadText();

    // Listen for language changes
    window.addEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );

    // Also listen for translations loaded event
    window.addEventListener(
      "translations-loaded",
      this.boundHandlers.languageChanged
    );

    // Listen for language changes via events instead of signals
    // The currentLanguage signal changes will trigger the language-changed event
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );
    window.removeEventListener(
      "translations-loaded",
      this.boundHandlers.languageChanged
    );
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has("key") || changedProperties.has("defaultValue")) {
      this._loadText();
    }
  }

  _loadText() {
    if (!this.key) {
      this._text = this.defaultValue || this.fallback || "";
      return;
    }

    try {
      const text = getText(this.key);
      this._text = text || this.defaultValue || this.fallback || this.key;
    } catch (error) {
      console.error("Error loading text for key:", this.key, error);
      this._text = this.defaultValue || this.fallback || this.key;
    }
    this.requestUpdate();
  }

  render() {
    return html`<span>${this._text || this.defaultValue || this.key}</span>`;
  }
}

customElements.define("ds-text", Text);

declare global {
  interface HTMLElementTagNameMap {
    "ds-text": Text;
  }
}
