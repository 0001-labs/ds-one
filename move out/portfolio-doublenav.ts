import { LitElement, html, css } from "lit";

/**
 * A component for double navigation (previous/next)
 *
 * @element portfolio-doublenav
 * @prop {string} previous - URL for previous link
 * @prop {string} next - URL for next link
 * @prop {string} previousText - Text for previous link
 * @prop {string} nextText - Text for next link
 * @prop {string} overlay - Overlay color (blue, red, orange, green, yellow)
 */
export class PortfolioDoubleNav extends LitElement {
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
      gap: calc(5px * var(--sf));
      padding: calc(2px * var(--sf));
      align-items: center;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: calc(5px * var(--sf));
      text-decoration: none;
      color: inherit;
    }

    .nav-previous {
      justify-self: start;
    }

    .nav-next {
      justify-self: end;
    }

    .nav-previous ds-icon {
      order: -1;
    }

    .nav-next ds-icon {
      padding-top: 3px;
    }

    .nav-previous ds-icon {
      padding-top: 3px;
    }
  `;

  render() {
    return html`
      ${this.previous
        ? html`
            <a href="${this.previous}" class="nav-previous">
              <ds-icon type="left"></ds-icon>
              <ds-text>${this.previousText || "Previous"}</ds-text>
            </a>
          `
        : html`<div></div>`}
      ${this.next
        ? html`
            <a href="${this.next}" class="nav-next">
              <ds-text>${this.nextText || "Next"}</ds-text>
              <ds-icon type="right"></ds-icon>
            </a>
          `
        : html`<div></div>`}
    `;
  }
}

customElements.define("portfolio-doublenav", PortfolioDoubleNav);

declare global {
  interface HTMLElementTagNameMap {
    "portfolio-doublenav": PortfolioDoubleNav;
  }
}
