import { LitElement, html, css } from "lit";

/**
 * A component for double navigation (previous/next)
 *
 * @element doublenav-v1
 * @prop {string} previous - URL for previous link
 * @prop {string} next - URL for next link
 * @prop {string} previousText - Text for previous link
 * @prop {string} nextText - Text for next link
 * @prop {string} overlay - Overlay color (blue, red, orange, green, yellow)
 */
export class DoubleNav extends LitElement {
  static get properties() {
    return {
      previous: { type: String, reflect: true },
      next: { type: String, reflect: true },
      previousText: { type: String, reflect: true, attribute: "previous-text" },
      nextText: { type: String, reflect: true, attribute: "next-text" },
      overlay: { type: String, reflect: true },
    };
  }

  declare previous: string;
  declare next: string;
  declare previousText: string;
  declare nextText: string;
  declare overlay?: string;

  constructor() {
    super();
    this.previous = "";
    this.next = "";
    this.previousText = "";
    this.nextText = "";
    this.overlay = "";
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      gap: calc(5px * var(--scaling-factor));
      padding: calc(2px * var(--scaling-factor));
      align-items: center;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: calc(5px * var(--scaling-factor));
      text-decoration: none;
      color: inherit;
    }

    .nav-previous {
      justify-self: start;
    }

    .nav-next {
      justify-self: end;
    }

    .nav-previous icon-v1 {
      order: -1;
    }

    .nav-next icon-v1 {
      padding-top: 3px;
    }

    .nav-previous icon-v1 {
      padding-top: 3px;
    }
  `;

  render() {
    return html`
      ${this.previous
        ? html`
            <a href="${this.previous}" class="nav-previous">
              <icon-v1 type="left"></icon-v1>
              <ds-text>${this.previousText || "Previous"}</ds-text>
            </a>
          `
        : html`<div></div>`}
      ${this.next
        ? html`
            <a href="${this.next}" class="nav-next">
              <ds-text>${this.nextText || "Next"}</ds-text>
              <icon-v1 type="right"></icon-v1>
            </a>
          `
        : html`<div></div>`}
    `;
  }
}

customElements.define("doublenav-v1", DoubleNav);

declare global {
  interface HTMLElementTagNameMap {
    "doublenav-v1": DoubleNav;
  }
}
