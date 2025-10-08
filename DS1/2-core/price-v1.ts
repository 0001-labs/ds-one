import { LitElement, html, css } from "lit";
import { currentLanguage } from "../utils/language";
import type { LanguageCode } from "../utils/language";
import { getPriceLabel } from "../utils/pricing";

/**
 * A component for displaying the monthly price label based on language/region
 *
 * @element price-v1
 * @prop {string} country - Preferred country (overrides language mapping)
 * @prop {string} region - Alias for country; if provided, takes precedence over country
 */
export class Price extends LitElement {
  static get properties() {
    return {
      country: { type: String, reflect: true },
      region: { type: String, reflect: true },
      _label: { type: String, state: true },
      _loading: { type: Boolean, state: true },
    };
  }

  declare country: string;
  declare region: string;
  declare _label: string;
  declare _loading: boolean;
  private boundHandlers: { languageChanged: EventListener };

  constructor() {
    super();
    this.country = "";
    this.region = "";
    this._label = "";
    this._loading = true;

    this.boundHandlers = {
      languageChanged: (() => {
        this._loadPrice();
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
    this._loadPrice();
    window.addEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );
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

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("country") || changed.has("region")) {
      this._loadPrice();
    }
  }

  private _loadPrice() {
    this._loading = true;
    const lang: LanguageCode = currentLanguage.get();
    const preferredCountry = this.region || this.country;
    const label = getPriceLabel({ language: lang, country: preferredCountry });
    this._label = label;
    this._loading = false;
    this.requestUpdate();
  }

  render() {
    return html`<span class="${this._loading ? "loading" : ""}"
      >${this._label}</span
    >`;
  }
}

customElements.define("price-v1", Price);

declare global {
  interface HTMLElementTagNameMap {
    "price-v1": Price;
  }
}
