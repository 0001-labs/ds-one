import { LitElement, html, css } from "lit";
import { getText } from "../utils/language";

/**
 * A component for displaying project/work attributes (year, category, status)
 *
 * @element attributes-v1
 * @prop {string} year - Year key for translation
 * @prop {string} category - Category key for translation
 * @prop {string} status - Status key for translation
 * @prop {string} type - Type of attributes: "project" or "work"
 */
export class Attributes extends LitElement {
  static get properties() {
    return {
      year: { type: String, reflect: true },
      category: { type: String, reflect: true },
      status: { type: String, reflect: true },
      type: { type: String, reflect: true },
    };
  }

  declare year: string;
  declare category: string;
  declare status: string;
  declare type: string;

  private boundHandlers: { languageChanged: EventListener };

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      gap: calc(16px * var(--scaling-factor));
      align-items: flex-start;
    }

    .attribute-row {
      display: inline-flex;
      height: calc(20px * var(--scaling-factor));
      padding: 0px calc(2px * var(--scaling-factor));
      align-items: flex-start;
      gap: calc(5px * var(--scaling-factor));
      font-family: var(--typeface);
      font-size: calc(14px * var(--scaling-factor));
      color: light-dark(var(--slate), var(--slate-dark));
    }

    .status-indicator {
      width: calc(8px * var(--scaling-factor));
      height: calc(8px * var(--scaling-factor));
      display: inline-block;
      transition:
        background 0.2s,
        border-radius 0.2s;
    }

    .status-indicator.done {
      background-color: green;
    }

    .status-indicator.ongoing {
      background-color: #30adec;
    }

    .status-indicator.pending {
      background-color: #f6c71c;
    }

    .status-indicator.not-started {
      background-color: #b1b4b9;
    }
  `;

  constructor() {
    super();
    this.year = "";
    this.category = "";
    this.status = "";
    this.type = "project";

    this.boundHandlers = {
      languageChanged: (() => {
        this.requestUpdate();
      }) as EventListener,
    };
  }

  connectedCallback() {
    super.connectedCallback();
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

  _getStatusClass(status: string): string {
    if (status.includes("Done")) return "done";
    if (status.includes("Ongoing")) return "ongoing";
    if (status.includes("Pending")) return "pending";
    if (status.includes("NotStarted")) return "not-started";
    return "pending";
  }

  render() {
    return html`
      ${this.year
        ? html`
            <div class="attribute-row">${getText(this.year) || this.year}</div>
          `
        : ""}
      ${this.category
        ? html`
            <div class="attribute-row">
              ${this.type === "work"
                ? html`<span
                    class="status-indicator ${this._getStatusClass(
                      this.status
                    )}"
                  ></span>`
                : ""}
              ${getText(this.category) || this.category}
            </div>
          `
        : ""}
      ${this.status && this.type === "project"
        ? html`
            <div class="attribute-row">
              <span
                class="status-indicator ${this._getStatusClass(this.status)}"
              ></span>
              ${getText(this.status) || this.status}
            </div>
          `
        : ""}
    `;
  }
}

customElements.define("attributes-v1", Attributes);

declare global {
  interface HTMLElementTagNameMap {
    "attributes-v1": Attributes;
  }
}
