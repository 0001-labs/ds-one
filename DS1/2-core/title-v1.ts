import { LitElement, html, css } from "lit";
import { getText } from "../utils/language";

/**
 * A component for displaying page titles with localization support
 *
 * @element title-v1
 * @prop {string} key - The translation key to use
 * @prop {string} defaultValue - Default value if translation is not found
 */
export class Title extends LitElement {
  private _gridArea = "";

  static get properties() {
    return {
      gridarea: { type: String, reflect: true },
      key: { type: String, reflect: true },
      defaultValue: { type: String, reflect: true, attribute: "default-value" },
      _text: { type: String, state: true },
    };
  }

  declare key: string;
  declare defaultValue: string;
  declare _text: string;
  private boundHandlers: { languageChanged: EventListener };

  set gridarea(value: string) {
    const oldValue = this._gridArea;
    this._gridArea = value;
    this.style.gridArea = value;
    this.requestUpdate("gridarea", oldValue);
  }

  get gridarea(): string {
    return this._gridArea;
  }

  static styles = css`
    :host {
      display: flex;
      padding: calc(2px * var(--scaling-factor));
      align-items: flex-start;
    }

    h1 {
      display: block;
      place-content: center;
      font-family: var(--typeface);
      color: light-dark(var(--black), var(--white));
      font-size: calc(36px * var(--scaling-factor));
      font-weight: 500;
      align-items: center;
      letter-spacing: -0.72px;
      margin: 0;
      height: 45px;
    }

    ::slotted(*) {
      margin: 0;
      width: 100%;
    }
  `;

  constructor() {
    super();
    this.key = "";
    this.defaultValue = "";
    this._text = "";

    this.boundHandlers = {
      languageChanged: (() => {
        this._loadText();
      }) as EventListener,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadText();
    window.addEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("key") || changedProperties.has("defaultValue")) {
      this._loadText();
    }
  }

  _loadText() {
    if (!this.key) {
      this._text = this.defaultValue || "";
      return;
    }

    try {
      const text = getText(this.key);
      this._text = text || this.defaultValue || this.key;
    } catch (error) {
      console.error(
        `[title-v1] Error loading text for key "${this.key}":`,
        error
      );
      this._text = this.defaultValue || this.key;
    }
  }

  firstUpdated() {
    if (this.hasAttribute("gridarea")) {
      this.style.gridArea = this.getAttribute("gridarea") || "";
    }
  }

  render() {
    const hasKey = this.key && this._text;

    return html` <h1>${hasKey ? this._text : html`<slot></slot>`}</h1> `;
  }
}

customElements.define("title-v1", Title);

declare global {
  interface HTMLElementTagNameMap {
    "title-v1": Title;
  }
}
