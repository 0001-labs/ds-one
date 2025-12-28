import { LitElement, html, unsafeCSS } from "lit";
import { getText, currentLanguage } from "../0-face/i18n";
import styles from "./styles/ds-text.css?inline";

/**
 * A component for displaying text from translations
 *
 * @element ds-text
 * @prop {string} text - The translation text to use
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
  private boundHandlers: { languageChanged: EventListener };

  constructor() {
    super();
    this.text = "";
    this._text = "";
    this._currentLanguage = currentLanguage.value;

    // Create bound event handlers for proper cleanup
    this.boundHandlers = {
      languageChanged: (() => {
        console.log("Language changed event received in ds-text");
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
    if (!this.text) {
      this._text = "";
      this._updateLanguageAttribute();
      this.requestUpdate();
      return;
    }

    try {
      const translatedText = getText(this.text);
      this._text = translatedText || this.text;
    } catch (error) {
      console.error("Error loading text for text:", this.text, error);
      this._text = this.text;
    }
    this._updateLanguageAttribute();
    this.requestUpdate();
  }

  render() {
    return html`<span>${this._text || this.text}</span>`;
  }
}

customElements.define("ds-text", Text);

declare global {
  interface HTMLElementTagNameMap {
    "ds-text": Text;
  }
}
