import { LitElement, html, css } from "lit";
import { getText } from "../utils/language";

/**
 * A component for creating localized links that open in new tabs
 *
 * @element link-v1
 * @prop {string} href - The URL to link to
 */
export class Link extends LitElement {
  static get properties() {
    return {
      href: { type: String, reflect: true },
      _text: { type: String, state: true },
    };
  }

  declare href: string;
  declare _text: string;

  private boundHandlers: { languageChanged: EventListener };

  constructor() {
    super();
    this.href = "";
    this._text = "";

    // Create bound event handlers for proper cleanup
    this.boundHandlers = {
      languageChanged: (() => {
        this._loadText();
      }) as EventListener,
    };
  }

  static styles = css`
    :host {
      display: inline;
      font-family: var(--typeface);
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    icon-v1 {
      display: inline-block;
      vertical-align: middle;
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

    if (changedProperties.has("href")) {
      this._loadText();
    }
  }

  _loadText() {
    try {
      const text = getText("link");
      this._text = text || "Link";
    } catch (error) {
      console.error("Error loading text for key 'link':", error);
      this._text = "Link";
    }
    this.requestUpdate();
  }

  render() {
    if (!this.href) {
      return html`<span>${this._text}</span>`;
    }

    return html`
      <a href="${this.href}" target="_blank" rel="noopener noreferrer">
        ${this._text}
        <icon-v1 type="open"></icon-v1>
      </a>
    `;
  }
}

customElements.define("link-v1", Link);

declare global {
  interface HTMLElementTagNameMap {
    "link-v1": Link;
  }
}
