import { LitElement, html, css } from "lit";

/**
 * A component for displaying page headers
 *
 * @element header-v1
 * @prop {string} gridarea - Grid area placement
 */
export class Header extends LitElement {
  private _gridArea = "";

  static get properties() {
    return {
      gridarea: { type: String, reflect: true },
    };
  }

  set gridarea(value: string) {
    const oldValue = this._gridArea;
    this._gridArea = value;
    this.style.gridArea = value;
    this.requestUpdate("gridarea", oldValue);
  }

  get gridarea(): string {
    return this._gridArea;
  }

  static styles = css`
    :host {
      display: flex;
      padding: calc(2px * var(--scaling-factor));
      align-items: flex-start;
      width: 100%;
    }

    h2 {
      display: flex;
      place-content: center;
      font-family: var(--typeface);
      color: light-dark(var(--black), var(--white));
      align-items: center;
      font-weight: 500;
      font-size: calc(14px * var(--scaling-factor));
      margin: 0;
      width: 100%;
    }

    ::slotted(*) {
      margin: 0;
    }
  `;

  constructor() {
    super();
  }

  firstUpdated() {
    if (this.hasAttribute("gridarea")) {
      this.style.gridArea = this.getAttribute("gridarea") || "";
    }
  }

  render() {
    return html`
      <h2
        style="display: flex; flex-wrap: nowrap; justify-content: space-between; align-items: center; width: 100%;"
      >
        <slot></slot>
      </h2>
    `;
  }
}

customElements.define("header-v1", Header);

declare global {
  interface HTMLElementTagNameMap {
    "header-v1": Header;
  }
}
