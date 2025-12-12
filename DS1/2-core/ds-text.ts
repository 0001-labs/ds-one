import { LitElement, html, css } from "lit";
import { getText, currentLanguage } from "../0-face/i18n";

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
  declare _currentLanguage: string;
  private boundHandlers: { languageChanged: EventListener };

  constructor() {
    super();
    this.key = "";
    this.defaultValue = "";
    this.fallback = "";
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

  static styles = css`
    :host {
      display: inline;
      font-family: var(--typeface-regular);
      font-size: var(--type-size-default);
      font-weight: var(--type-weight-default);
      line-height: calc(var(--type-lineheight-default) * var(--sf));
      letter-spacing: calc(var(--type-letterspacing-default) * var(--sf));
      text-align: var(--text-align-default);
      text-transform: var(--text-transform-default);
      text-decoration: var(--text-decoration-default);
    }

    :host([data-language="ja"]) {
      font-family: var(--typeface-regular-jp);
    }

    :host([data-language="zh"]),
    :host([data-language="zh-hant"]) {
      font-family: var(--typeface-regular-zh-hant);
      font-weight: 800;
    }

    :host([data-language="zh-hans"]) {
      font-family: var(--typeface-regular-zh-hans);
      font-weight: 800;
    }
  `;

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

    if (changedProperties.has("key") || changedProperties.has("defaultValue")) {
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
    if (!this.key) {
      this._text = this.defaultValue || this.fallback || "";
      this._updateLanguageAttribute();
      this.requestUpdate();
      return;
    }

    try {
      const text = getText(this.key);
      this._text = text || this.defaultValue || this.fallback || this.key;
    } catch (error) {
      console.error("Error loading text for key:", this.key, error);
      this._text = this.defaultValue || this.fallback || this.key;
    }
    this._updateLanguageAttribute();
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
