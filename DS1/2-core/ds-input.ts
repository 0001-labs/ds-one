// ds-input.ts
// Core input component

import { LitElement, html, css } from "lit";

export class Input extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    id: { type: String, reflect: true },
    name: { type: String, reflect: true },
    autocomplete: { type: String, reflect: true },
  };

  // Public properties
  declare type: string;
  declare placeholder: string;
  declare disabled: boolean;
  declare required: boolean;
  declare id: string;
  declare name: string;
  declare autocomplete: string;

  // Private property to store value
  private _value: string = "";

  constructor() {
    super();
    this.type = "text";
    this.placeholder = "";
    this._value = "";
    this.disabled = false;
    this.required = false;
    this.id = "";
    this.name = "";
    this.autocomplete = "";
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    input {
      background: var(--base-light-grey, #e8e8e8);
      border: none;
      padding: 0 calc(2px * var(--sf, 1));
      border-radius: 4px;
      font-size: var(--type-size-default);
      font-family: var(
        --typeface-regular,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        sans-serif
      );
      color: var(--base-darker-grey, #797979);
      line-height: calc(20px * var(--sf, 1));
      letter-spacing: calc(-0.4px * var(--sf, 1));
      opacity: 0.5;
      height: calc(28px * var(--sf, 1));
      width: 100%;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      opacity: 1;
      color: var(--base-slate, #1e1e1e);
    }

    input::placeholder {
      color: var(--base-darker-grey, #797979);
      opacity: 0.5;
    }

    input:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this._value = target.value;

    // Dispatch a custom event that bubbles through shadow DOM
    this.dispatchEvent(
      new CustomEvent("input", {
        detail: { value: this._value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this._value = target.value;

    // Dispatch a custom event that bubbles through shadow DOM
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this._value },
        bubbles: true,
        composed: true,
      })
    );
  }

  // Expose value getter/setter for JavaScript compatibility
  get value(): string {
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
    return input?.value || this._value || "";
  }

  set value(newValue: string) {
    this._value = newValue || "";
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
    if (input) {
      input.value = this._value;
    }
  }

  // Expose focus method for JavaScript compatibility
  focus() {
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
    input?.focus();
  }

  render() {
    return html`
      <input
        type=${this.type}
        placeholder=${this.placeholder}
        .value=${this._value}
        ?disabled=${this.disabled}
        ?required=${this.required}
        id=${this.id || undefined}
        name=${this.name || undefined}
        autocomplete=${this.autocomplete || undefined}
        @input=${this._handleInput}
        @change=${this._handleChange}
      />
    `;
  }
}

customElements.define("ds-input", Input);

declare global {
  interface HTMLElementTagNameMap {
    "ds-input": Input;
  }
}
