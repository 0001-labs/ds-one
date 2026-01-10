import { LitElement, html, unsafeCSS } from "lit";
import { getText, currentLanguage } from "../0-face/i18n";
import styles from "./styles/ds-text.css?inline";

/**
 * A component for displaying text from translations
 *
 * @element ds-text
 * @prop {string} text - The translation key (optional if using slot content)
 *
 * @example
 * // Using slot content as the key (preferred)
 * <ds-text>Welcome to the app</ds-text>
 *
 * // Using text attribute (still supported)
 * <ds-text text="Welcome to the app"></ds-text>
 */
export class Text extends LitElement {
  static get properties() {
    return {
      text: { type: String, reflect: true },
      _text: { type: String, state: true },
    };
  }

  declare text: string;
  declare _text: string;
  declare _currentLanguage: string;
  private _slotKey: string = "";
  private boundHandlers: { languageChanged: EventListener };

  constructor() {
    super();
    this.text = "";
    this._text = "";
    this._currentLanguage = currentLanguage.value;

    // Create bound event handlers for proper cleanup
    this.boundHandlers = {
      languageChanged: (() => {
        this._currentLanguage = currentLanguage.value;
        this._updateLanguageAttribute();
        this._loadText();
        this.requestUpdate();
      }) as EventListener,
    };
  }

  static styles = unsafeCSS(styles);

  connectedCallback() {
    super.connectedCallback();

    // Capture slot content as the translation key if no text attribute
    if (!this.text) {
      const slotContent = this.textContent?.trim() || "";
      if (slotContent) {
        this._slotKey = slotContent;
        // Clear the slot content - we'll render the translation in shadow DOM
        this.textContent = "";
      }
    }

    this._currentLanguage = currentLanguage.value;
    this._updateLanguageAttribute();
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

    if (changedProperties.has("text")) {
      this._loadText();
    }
  }

  _updateLanguageAttribute() {
    const lang = this._currentLanguage || currentLanguage.value;
    // Handles "ja", "ja-JP", "zh-Hant", "zh-Hans", etc.
    const parts = (lang || "").toLowerCase().split(/[-_]/).filter(Boolean);
    const primaryLang = parts[0] || "";

    if (primaryLang === "ja") {
      this.setAttribute("data-language", "ja");
      return;
    }

    if (primaryLang === "zh") {
      // Prefer explicit script; otherwise infer from common regions.
      const hasHans =
        parts.includes("hans") || parts.includes("cn") || parts.includes("sg");
      const hasHant =
        parts.includes("hant") ||
        parts.includes("tw") ||
        parts.includes("hk") ||
        parts.includes("mo");

      if (hasHans) this.setAttribute("data-language", "zh-hans");
      else if (hasHant) this.setAttribute("data-language", "zh-hant");
      else this.setAttribute("data-language", "zh");
      return;
    }

    this.removeAttribute("data-language");
  }

  _loadText() {
    // Use text attribute first, then slot content as fallback
    const key = this.text || this._slotKey;

    if (!key) {
      this._text = "";
      this._updateLanguageAttribute();
      this.requestUpdate();
      return;
    }

    try {
      const translatedText = getText(key);
      this._text = translatedText || key;
    } catch (error) {
      console.error("Error loading text for key:", key, error);
      this._text = key;
    }
    this._updateLanguageAttribute();
    this.requestUpdate();
  }

  render() {
    return html`<span>${this._text || this.text || this._slotKey}</span>`;
  }
}

customElements.define("ds-text", Text);

declare global {
  interface HTMLElementTagNameMap {
    "ds-text": Text;
  }
}
