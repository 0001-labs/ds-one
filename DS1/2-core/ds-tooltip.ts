import { LitElement, html, unsafeCSS } from "lit";
import { translate } from "../0-face/i18n";
import styles from "./styles/ds-tooltip.css?inline";

export class Tooltip extends LitElement {
  static properties = {
    text: { type: String, reflect: true },
    defaultValue: { type: String, reflect: true, attribute: "default-value" },
    _text: { state: true },
    _visible: { state: true },
  };

  declare text: string;
  declare defaultValue: string;
  private _text: string;
  private _visible: boolean;

  private boundWindowHandlers: {
    languageChanged: EventListener;
    translationsLoaded: EventListener;
  };
  private boundHostHandlers: {
    mouseenter: EventListener;
    mouseleave: EventListener;
    focusin: EventListener;
    focusout: EventListener;
  };

  constructor() {
    super();
    this.text = "";
    this.defaultValue = "";
    this._text = "";
    this._visible = false;

    this.boundWindowHandlers = {
      languageChanged: (() => {
        this._loadText();
      }) as EventListener,
      translationsLoaded: (() => {
        this._loadText();
      }) as EventListener,
    };

    this.boundHostHandlers = {
      mouseenter: (() => {
        this._visible = true;
        this.requestUpdate();
      }) as EventListener,
      mouseleave: (() => {
        this._visible = false;
        this.requestUpdate();
      }) as EventListener,
      focusin: (() => {
        this._visible = true;
        this.requestUpdate();
      }) as EventListener,
      focusout: (() => {
        this._visible = false;
        this.requestUpdate();
      }) as EventListener,
    };
  }

  static styles = unsafeCSS(styles);

  connectedCallback(): void {
    super.connectedCallback();
    this._loadText();

    window.addEventListener(
      "language-changed",
      this.boundWindowHandlers.languageChanged
    );
    window.addEventListener(
      "translations-loaded",
      this.boundWindowHandlers.translationsLoaded
    );

    this.addEventListener("mouseenter", this.boundHostHandlers.mouseenter);
    this.addEventListener("mouseleave", this.boundHostHandlers.mouseleave);
    this.addEventListener("focusin", this.boundHostHandlers.focusin);
    this.addEventListener("focusout", this.boundHostHandlers.focusout);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(
      "language-changed",
      this.boundWindowHandlers.languageChanged
    );
    window.removeEventListener(
      "translations-loaded",
      this.boundWindowHandlers.translationsLoaded
    );

    this.removeEventListener("mouseenter", this.boundHostHandlers.mouseenter);
    this.removeEventListener("mouseleave", this.boundHostHandlers.mouseleave);
    this.removeEventListener("focusin", this.boundHostHandlers.focusin);
    this.removeEventListener("focusout", this.boundHostHandlers.focusout);
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has("text") || changed.has("defaultValue")) {
      this._loadText();
    }
  }

  _loadText(): void {
    if (!this.text) {
      this._text = this.defaultValue || "";
      this.requestUpdate();
      return;
    }

    try {
      const t = translate(this.text);
      this._text = t && t !== this.text ? t : this.defaultValue || this.text;
    } catch (err) {
      console.error("ds-tooltip: error loading text for text", this.text, err);
      this._text = this.defaultValue || this.text;
    }
    this.requestUpdate();
  }

  render() {
    const bubbleClasses = ["bubble", this._visible ? "visible" : ""].join(" ");

    return html`
      <span class="slot-wrapper"><slot></slot></span>
      ${this._text
        ? html`<div class="${bubbleClasses}">${this._text}</div>`
        : null}
    `;
  }
}

customElements.define("ds-tooltip", Tooltip);

declare global {
  interface HTMLElementTagNameMap {
    "ds-tooltip": Tooltip;
  }
}
