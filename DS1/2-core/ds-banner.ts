// ds-banner.ts
// Fixed banner component for notifications/alerts

import { LitElement, html, css } from "lit";
import { getText } from "../0-face/i18n.js";
import "./ds-text.js";
import "./ds-button.js";

declare global {
  interface CustomElementRegistry {
    define(name: string, constructor: typeof LitElement): void;
  }
  var customElements: CustomElementRegistry;
}

export class Banner extends LitElement {
  static properties = {
    textKey: { type: String, attribute: "text-key" },
    actionKey: { type: String, attribute: "action-key" },
    href: { type: String },
    mailto: { type: String },
    subjectKey: { type: String, attribute: "subject-key" },
    describeKey: { type: String, attribute: "describe-key" },
    appVersionKey: { type: String, attribute: "app-version-key" },
    variant: { type: String },
    version: { type: String },
    _showVersion: { type: Boolean, state: true },
  };

  textKey: string = "";
  actionKey: string = "";
  href: string = "";
  mailto: string = "";
  subjectKey: string = "";
  describeKey: string = "";
  appVersionKey: string = "";
  variant: string = "warning"; // warning, info, success, error
  version: string = "";
  _showVersion: boolean = false;

  private _boundUpdate = () => this.requestUpdate();

  connectedCallback() {
    super.connectedCallback();
    // Listen for translations and language changes to rebuild mailto URL
    window.addEventListener("translations-loaded", this._boundUpdate);
    window.addEventListener("language-changed", this._boundUpdate);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("translations-loaded", this._boundUpdate);
    window.removeEventListener("language-changed", this._boundUpdate);
  }

  static styles = css`
    :host {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: calc(var(--unit) * var(--sf, 1));
      align-items: center;
      justify-content: space-between;
      padding: 0 calc(var(--unit) * var(--sf, 1));
      box-sizing: border-box;
      z-index: 9999;
    }

    :host([variant="warning"]) {
      background-color: color-mix(in srgb, var(--yellow) 50%, transparent);
      --banner-text-color: color-mix(in srgb, var(--black) 50%, transparent);
      --banner-action-color: var(--slate);
    }

    :host([variant="info"]) {
      background-color: rgba(var(--sharp-blue-rgb, 0, 122, 255), 0.7);
      --banner-text-color: var(--white, #fff);
      --banner-action-color: var(--white, #fff);
    }

    :host([variant="success"]) {
      background-color: rgba(var(--apple-green-rgb, 52, 199, 89), 0.7);
      --banner-text-color: var(--white, #fff);
      --banner-action-color: var(--white, #fff);
    }

    :host([variant="error"]) {
      background-color: rgba(var(--tuned-red-rgb, 255, 59, 48), 0.7);
      --banner-text-color: var(--white, #fff);
      --banner-action-color: var(--slate, #1e1e1e);
    }

    .text-wrapper {
      flex: 1;
      cursor: pointer;
      user-select: none;
    }

    .text-wrapper ds-text,
    .text-wrapper .version {
      color: var(--banner-text-color);
    }

    .action-wrapper {
      font-size: calc(12px * var(--sf, 1));
    }

    .action-wrapper a {
      color: var(--banner-action-color);
      text-decoration: none;
      font-family: var(--typeface-regular);
      font-size: calc(12px * var(--sf, 1));
      cursor: pointer;
      pointer-events: auto;
      display: inline-block;
    }

    .action-wrapper a:hover {
      opacity: 0.8;
    }

    .action-wrapper ds-text {
      color: var(--banner-action-color);
      font-family: var(--typeface-regular);
      font-size: calc(12px * var(--sf, 1));
      pointer-events: none;
    }
  `;

  private _toggleVersion() {
    if (this.version) {
      this._showVersion = !this._showVersion;
    }
  }

  private _getMailtoHref(): string {
    // If a direct href is provided, use it
    if (this.href && this.href !== "#") return this.href;

    // If mailto is provided, build internationalized URL
    if (this.mailto) {
      try {
        const subject = this.subjectKey
          ? getText(this.subjectKey) || this.subjectKey
          : "Issue report";
        const describe = this.describeKey
          ? getText(this.describeKey) || this.describeKey
          : "Describe the issue:";
        const appVersionLabel = this.appVersionKey
          ? getText(this.appVersionKey) || this.appVersionKey
          : "App version:";

        const body = `${describe}\n\n\n${appVersionLabel} ${this.version || ""}`;

        return `mailto:${this.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      } catch (error) {
        // Fallback if translations fail
        return `mailto:${this.mailto}?subject=Issue%20report&body=Describe%20the%20issue%3A%0A%0A%0AApp%20version%3A%20${this.version || ""}`;
      }
    }

    return "#";
  }

  render() {
    const mailtoHref = this._getMailtoHref();

    return html`
      <div class="text-wrapper" @click=${this._toggleVersion}>
        ${this._showVersion && this.version
          ? html`<ds-text default-value=${this.version}></ds-text>`
          : html`<ds-text key=${this.textKey}><slot></slot></ds-text>`}
      </div>
      ${this.actionKey
        ? html`
            <div class="action-wrapper">
              <a href=${mailtoHref}>
                <ds-text key=${this.actionKey}></ds-text>
              </a>
            </div>
          `
        : ""}
    `;
  }
}

customElements.define("ds-banner", Banner);

declare global {
  interface HTMLElementTagNameMap {
    "ds-banner": Banner;
  }
}
