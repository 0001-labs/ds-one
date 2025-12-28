// ds-banner.ts
// Fixed banner component for notifications/alerts

import { LitElement, html, unsafeCSS } from "lit";
import { getText } from "../0-face/i18n.js";
import "./ds-text.js";
import "./ds-button.js";
import styles from "./styles/ds-banner.css?inline";

declare global {
  interface CustomElementRegistry {
    define(name: string, constructor: typeof LitElement): void;
  }
  var customElements: CustomElementRegistry;
}

export class Banner extends LitElement {
  static properties = {
    text: { type: String },
    action: { type: String },
    href: { type: String },
    mailto: { type: String },
    subject: { type: String },
    describe: { type: String },
    appVersion: { type: String, attribute: "app-version" },
    variant: { type: String },
    version: { type: String },
    _showVersion: { type: Boolean, state: true },
  };

  text: string = "";
  action: string = "";
  href: string = "";
  mailto: string = "";
  subject: string = "";
  describe: string = "";
  appVersion: string = "";
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

  static styles = unsafeCSS(styles);

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
        const subject = this.subject
          ? getText(this.subject) || this.subject
          : "Issue report";
        const describe = this.describe
          ? getText(this.describe) || this.describe
          : "Describe the issue:";
        const appVersionLabel = this.appVersion
          ? getText(this.appVersion) || this.appVersion
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
          ? html`<ds-text text=${this.version}></ds-text>`
          : html`<ds-text text=${this.text}><slot></slot></ds-text>`}
      </div>
      ${this.action
        ? html`
            <div class="action-wrapper">
              <a href=${mailtoHref}>
                <ds-text text=${this.action}></ds-text>
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
