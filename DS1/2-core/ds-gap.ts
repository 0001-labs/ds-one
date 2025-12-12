import { LitElement, html, css } from "lit";

/**
 * Full-width vertical spacer.
 *
 * Usage:
 * - <ds-gap unit></ds-gap>
 * - <ds-gap double></ds-gap>
 * - <ds-gap size="05"></ds-gap>
 */
export class Gap extends LitElement {
  static properties = {
    /** Raw scale token selector ("01", "025", "05", "08", "1", "2", "3", "4", "8", "12") */
    size: { type: String, reflect: true },
  };

  declare size: string;

  constructor() {
    super();
    this.size = "";
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      /* Default if no attribute is provided */
      --gap-size: var(--unit);
      height: var(--gap-size);
      flex: 0 0 auto;
    }

    /* Semantic sizing tokens (from DS1/1-root/one.css) */
    :host([tenth]) {
      --gap-size: var(--tenth);
    }
    :host([quarter]) {
      --gap-size: var(--quarter);
    }
    :host([half]) {
      --gap-size: var(--half);
    }
    :host([eight-tenth]) {
      --gap-size: var(--eight-tenth);
    }
    :host([unit]) {
      --gap-size: var(--unit);
    }
    :host([double]) {
      --gap-size: var(--double);
    }
    :host([triple]) {
      --gap-size: var(--triple);
    }
    :host([quad]) {
      --gap-size: var(--quad);
    }
    :host([oct]) {
      --gap-size: var(--oct);
    }
    :host([dozen]) {
      --gap-size: var(--dozen);
    }

    /* Raw scale sizing (size="...") */
    :host([size="01"]) {
      --gap-size: var(--01);
    }
    :host([size="025"]) {
      --gap-size: var(--025);
    }
    :host([size="05"]) {
      --gap-size: var(--05);
    }
    :host([size="08"]) {
      --gap-size: var(--08);
    }
    :host([size="1"]) {
      --gap-size: var(--1);
    }
    :host([size="2"]) {
      --gap-size: var(--2);
    }
    :host([size="3"]) {
      --gap-size: var(--3);
    }
    :host([size="4"]) {
      --gap-size: var(--4);
    }
    :host([size="8"]) {
      --gap-size: var(--8);
    }
    :host([size="12"]) {
      --gap-size: var(--12);
    }
  `;

  render() {
    return html``;
  }
}

customElements.define("ds-gap", Gap);

declare global {
  interface HTMLElementTagNameMap {
    "ds-gap": Gap;
  }
}
