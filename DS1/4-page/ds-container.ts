// ds-container.ts
// Container component with responsive width constraints

import { LitElement, html, css } from "lit";

declare global {
  interface CustomElementRegistry {
    define(name: string, constructor: typeof LitElement): void;
  }
  var customElements: CustomElementRegistry;
}

export class Container extends LitElement {
  static styles = css`
    :host {
      display: flex;
      width: 100%;
      max-width: 100%;
      flex-direction: column;
      box-sizing: border-box;
    }

    /* Ensure children don't overflow */
    :host ::slotted(*) {
      max-width: 100%;
      box-sizing: border-box;
    }

    /* Mobile: 100% width */
    @media (max-width: 820px) {
      :host {
        width: 100%;
        max-width: 100%;
      }
    }

    /* Desktop: max-width 1000px, centered */
    @media (min-width: 821px) {
      :host {
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      }
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("ds-container", Container);

declare global {
  interface HTMLElementTagNameMap {
    "ds-container": Container;
  }
}
