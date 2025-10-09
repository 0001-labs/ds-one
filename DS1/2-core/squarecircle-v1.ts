import { LitElement, css, html } from "lit";
import { setTheme, currentTheme } from "../utils/theme";

/**
 * A component for theme toggle or project links (square or circle shape)
 *
 * @element squarecircle-v1
 * @prop {string} type - "theme-toggle" or "link"
 * @prop {string} shape - "square" or "circle"
 * @prop {string} href - URL for link type
 * @prop {string} project - Project name for color theming
 * @prop {boolean} loading - Loading state with pulse animation
 */
export class SquareCircle extends LitElement {
  static get properties() {
    return {
      type: { type: String, reflect: true },
      shape: { type: String, reflect: true },
      href: { type: String },
      project: { type: String, reflect: true },
      loading: { type: Boolean, reflect: true },
    };
  }

  declare type: "theme-toggle" | "link";
  declare shape: "square" | "circle";
  declare href: string;
  declare project: string;
  declare loading: boolean;

  constructor() {
    super();
    this.type = "theme-toggle";
    this.shape = "circle";
    this.href = "";
    this.project = "";
    this.loading = false;
  }

  static styles = css`
    :host {
      background-color: light-dark(var(--black), var(--white));
      display: block;
      width: calc(120px * var(--scaling-factor));
      height: calc(120px * var(--scaling-factor));
      cursor: pointer;
      pointer-events: auto;
      position: relative;
      z-index: 1;
    }

    :host([shape="circle"]) {
      border-radius: 9999px;
    }

    :host([shape="circle"]) .wrapper,
    :host([shape="circle"]) .container {
      border-radius: 9999px;
    }

    .wrapper {
      width: 100%;
      height: 100%;
      cursor: pointer;
      pointer-events: auto;
    }

    .container {
      width: 100%;
      height: 100%;
      background-color: inherit;
      cursor: pointer;
      pointer-events: auto;
    }

    .container:hover {
      opacity: 0.8;
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      cursor: pointer;
      pointer-events: auto;
    }

    :host([loading]) {
      animation: gentle-pulse 2s ease-in-out infinite;
    }

    @keyframes gentle-pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  private _handleClick(e: Event) {
    if (this.type === "theme-toggle") {
      e.preventDefault();
      const newTheme = currentTheme.get() === "light" ? "dark" : "light";
      setTheme(newTheme);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", (e) => {
      this._handleClick(e);
    });
  }

  render() {
    const content = html`<div
      class="container"
      @click="${(e: Event) => {
        this._handleClick(e);
      }}"
    ></div>`;

    if (this.type === "link" && this.href) {
      return html`
        <a href="${this.href}" @click="${this._handleClick}">${content}</a>
      `;
    }

    return html`
      <div
        class="wrapper"
        @click="${(e: Event) => {
          this._handleClick(e);
        }}"
      >
        ${content}
      </div>
    `;
  }
}

customElements.define("squarecircle-v1", SquareCircle);

declare global {
  interface HTMLElementTagNameMap {
    "squarecircle-v1": SquareCircle;
  }
}
