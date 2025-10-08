import { LitElement, html, css } from "lit";
import { translate, getNotionText } from "../x-utils/language";

export class Tooltip extends LitElement {
  static properties = {
    key: { type: String, reflect: true },
    defaultValue: { type: String, reflect: true, attribute: "default-value" },
    _text: { state: true },
    _visible: { state: true },
  };

  declare key: string;
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
    this.key = "";
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

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    .slot-wrapper {
      display: inline-flex;
      align-items: center;
    }

    .bubble {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 50%;
      bottom: 100%;
      transform: translate(-50%, calc(-2px * var(--scaling-factor)));
      z-index: 1000;
      pointer-events: none;
      height: calc(var(--08) * var(--scaling-factor));
      opacity: 0;
      transition: opacity 120ms ease, transform 120ms ease;
      background-color: light-dark(var(--black), var(--white));
      color: light-dark(var(--white), var(--black));
      border-radius: 0;
      font-size: var(--type-size-default);
      padding: 0px calc(1px * var(--scaling-factor));
      font-family: var(
        --typeface,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        sans-serif
      );
      font-weight: 500;
      white-space: nowrap;
      min-width: max-content;
    }

    .bubble.visible {
      opacity: 1;
    }
  `;

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
    if (changed.has("key") || changed.has("defaultValue")) {
      this._loadText();
    }
  }

  async _loadText(): Promise<void> {
    if (!this.key) {
      this._text = this.defaultValue || "";
      this.requestUpdate();
      return;
    }

    try {
      const notionText = await getNotionText(this.key);
      if (notionText) {
        this._text = notionText;
        this.requestUpdate();
        return;
      }
      const t = translate(this.key);
      this._text = t && t !== this.key ? t : this.defaultValue || this.key;
    } catch (err) {
      console.error("tooltip-v1: error loading text for key", this.key, err);
      this._text = this.defaultValue || this.key;
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

customElements.define("tooltip-v1", Tooltip);

declare global {
  interface HTMLElementTagNameMap {
    "tooltip-v1": Tooltip;
  }
}
