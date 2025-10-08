import { LitElement, html, css } from "lit";

export class App extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: calc(var(--1) * var(--scaling-factor));
      margin-top: calc(var(--1) * var(--scaling-factor));
      width: 100%;
    }

    :host([type="board"]) .container {
      gap: 0px;
    }
  `;

  constructor() {
    super();
    this.type = "default";
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("app-v1", App);

// This declares the "app-v1" custom element type for TypeScript,
// so you get proper type checking and autocompletion when using <app-v1> in your code.
declare global {
  interface HTMLElementTagNameMap {
    "app-v1": App;
  }
}
