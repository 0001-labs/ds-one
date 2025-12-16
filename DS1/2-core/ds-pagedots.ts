import { LitElement, html, css } from "lit";

/**
 * Page dots indicator component for carousels and pagination.
 *
 * Usage:
 * - <ds-pagedots count="3" active="0"></ds-pagedots>
 */
export class Pagedots extends LitElement {
  static properties = {
    /** Number of dots to display */
    count: { type: Number, reflect: true },
    /** Index of the active dot (0-based) */
    active: { type: Number, reflect: true },
  };

  declare count: number;
  declare active: number;

  constructor() {
    super();
    this.count = 3;
    this.active = 0;
  }

  static styles = css`
    :host {
      display: flex;
      gap: calc(11.2px * var(--sf, 1));
      justify-content: center;
      align-items: center;
      height: calc(28px * var(--sf, 1));
    }

    .dot {
      width: calc(2.8px * var(--sf, 1));
      height: calc(2.8px * var(--sf, 1));
      border-radius: 50%;
      background: white;
      border: calc(0.7px * var(--sf, 1)) solid #696969;
      transition: background 0.2s ease, border 0.2s ease;
    }

    .dot.active {
      background: #666;
      border: none;
    }
  `;

  render() {
    const dots = Array.from({ length: this.count }, (_, i) => i);
    return html`
      ${dots.map(
        (index) => html`
          <span
            class="dot ${index === this.active ? "active" : ""}"
            role="button"
            aria-label="Slide ${index + 1}"
            aria-current="${index === this.active ? "true" : "false"}"
          ></span>
        `,
      )}
    `;
  }
}

customElements.define("ds-pagedots", Pagedots);

declare global {
  interface HTMLElementTagNameMap {
    "ds-pagedots": Pagedots;
  }
}

