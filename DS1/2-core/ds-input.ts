// ds-input.ts
// Input component for text and other input types

import { LitElement, html, unsafeCSS } from "lit";
import "./ds-text";
import styles from "./styles/ds-input.css?inline";

export class Input extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
    name: { type: String, reflect: true },
    value: { type: String },
    placeholder: { type: String },
    placeholderKey: { type: String, attribute: "placeholder-key" },
    label: { type: String },
    labelText: { type: String, attribute: "label-text" },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    autofocus: { type: Boolean },
    autocomplete: { type: String },
    pattern: { type: String },
    minlength: { type: Number },
    maxlength: { type: Number },
    min: { type: String },
    max: { type: String },
    step: { type: String },
    variant: { type: String, reflect: true },
    error: { type: String },
    errorText: { type: String, attribute: "error-text" },
    _focused: { type: Boolean, state: true },
  };

  declare type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local";
  declare name: string;
  declare value: string;
  declare placeholder: string;
  declare placeholderKey: string;
  declare label: string;
  declare labelText: string;
  declare disabled: boolean;
  declare readonly: boolean;
  declare required: boolean;
  declare autofocus: boolean;
  declare autocomplete: string;
  declare pattern: string;
  declare minlength: number;
  declare maxlength: number;
  declare min: string;
  declare max: string;
  declare step: string;
  declare variant: "default" | "filled" | "outlined";
  declare error: string;
  declare errorText: string;
  declare _focused: boolean;

  constructor() {
    super();
    this.type = "text";
    this.name = "";
    this.value = "";
    this.placeholder = "";
    this.placeholderKey = "";
    this.label = "";
    this.labelText = "";
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.autofocus = false;
    this.autocomplete = "off";
    this.pattern = "";
    this.minlength = 0;
    this.maxlength = 0;
    this.min = "";
    this.max = "";
    this.step = "";
    this.variant = "default";
    this.error = "";
    this.errorText = "";
    this._focused = false;
  }

  static styles = unsafeCSS(styles);

  private _handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent("input-change", {
        detail: { value: this.value, name: this.name },
        bubbles: true,
      })
    );
  }

  private _handleFocus(): void {
    this._focused = true;
    this.dispatchEvent(new CustomEvent("input-focus", { bubbles: true }));
  }

  private _handleBlur(): void {
    this._focused = false;
    this.dispatchEvent(new CustomEvent("input-blur", { bubbles: true }));
  }

  /**
   * Focus the input element
   */
  focus(): void {
    const input = this.shadowRoot?.querySelector("input");
    input?.focus();
  }

  /**
   * Blur the input element
   */
  blur(): void {
    const input = this.shadowRoot?.querySelector("input");
    input?.blur();
  }

  /**
   * Select all text in the input
   */
  select(): void {
    const input = this.shadowRoot?.querySelector("input");
    input?.select();
  }

  render() {
    const hasError = Boolean(this.error || this.errorText);

    return html`
      <div class="input-wrapper">
        ${this.label || this.labelText
          ? html`
              <label for="input">
                ${this.labelText
                  ? html`<ds-text .text=${this.labelText}></ds-text>`
                  : this.label}
              </label>
            `
          : null}

        <div class="input-container">
          <input
            id="input"
            .type=${this.type}
            .name=${this.name}
            .value=${this.value}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            ?autofocus=${this.autofocus}
            autocomplete=${this.autocomplete}
            pattern=${this.pattern || ""}
            minlength=${this.minlength || ""}
            maxlength=${this.maxlength || ""}
            min=${this.min}
            max=${this.max}
            step=${this.step}
            class=${hasError ? "has-error" : ""}
            @input=${this._handleInput}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />
        </div>

        ${hasError
          ? html`
              <div class="error-message">
                ${this.errorText
                  ? html`<ds-text .text=${this.errorText}></ds-text>`
                  : this.error}
              </div>
            `
          : null}
      </div>
    `;
  }
}

customElements.define("ds-input", Input);

declare global {
  interface HTMLElementTagNameMap {
    "ds-input": Input;
  }
}
