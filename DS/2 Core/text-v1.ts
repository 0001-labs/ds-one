import { LitElement, html, css } from "lit";
import {
  getNotionText,
  translate,
  currentLanguage,
} from "../utils/language";
import type { LanguageCode } from "../utils/language";
import { getPriceLabel } from "../utils/pricing";

/**
 * A component for displaying text from translations
 *
 * @element text-v1
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
      type: { type: String, reflect: true },
      country: { type: String, reflect: true },
      region: { type: String, reflect: true },
      _text: { type: String, state: true },
      _loading: { type: Boolean, state: true },
    };
  }

  declare key: string;
  declare defaultValue: string;
  declare fallback: string;
  declare type: string;
  declare country: string;
  declare region: string;
  declare _text: string;
  declare _loading: boolean;
  private boundHandlers: { languageChanged: EventListener };

  constructor() {
    super();
    this.key = "";
    this.defaultValue = "";
    this.fallback = "";
    this.type = "";
    this.country = "";
    this._text = "";
    this._loading = true;

    // Create bound event handlers for proper cleanup
    this.boundHandlers = {
      languageChanged: (() => {
        console.log("Language changed event received in text-v1");
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

    if (
      changedProperties.has("key") ||
      changedProperties.has("defaultValue") ||
      changedProperties.has("type") ||
      changedProperties.has("country") ||
      changedProperties.has("region")
    ) {
      this._loadText();
    }
  }

  async _loadText() {
    this._loading = true;
    this.requestUpdate();

    try {
      // Special mode: price label
      if (this.type === "price") {
        const lang: LanguageCode = currentLanguage.get();
        const preferredCountry = this.region || this.country;
        const label = getPriceLabel({
          language: lang,
          country: preferredCountry,
        });
        this._text = label;
        this._loading = false;
        return;
      }

      if (!this.key) {
        this._text = this.defaultValue || this.fallback || "";
        this._loading = false;
        return;
      }

      // First try to get text from Notion
      const notionText = await getNotionText(this.key);
      if (notionText) {
        this._text = notionText;
        this._loading = false;
        return;
      }

      // If no Notion text, try translation
      const translatedText = translate(this.key);
      if (translatedText && translatedText !== this.key) {
        this._text = translatedText;
      } else {
        // Fall back to default value or fallback
        this._text = this.defaultValue || this.fallback || this.key;
      }
    } catch (error) {
      console.error("Error loading text for key:", this.key, error);
      this._text = this.defaultValue || this.fallback || this.key;
    }

    this._loading = false;
    this.requestUpdate();
  }

  render() {
    return html`<span class="${this._loading ? "loading" : ""}"
      >${this._text}</span
    >`;
  }
}

customElements.define("text-v1", Text);

declare global {
  interface HTMLElementTagNameMap {
    "text-v1": Text;
  }
}
