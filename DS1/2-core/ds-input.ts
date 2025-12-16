// ds-input.ts
// Input component for text and other input types

import { LitElement, html, css } from "lit";
import "./ds-text";

export class Input extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
    name: { type: String, reflect: true },
    value: { type: String },
    placeholder: { type: String },
    placeholderKey: { type: String, attribute: "placeholder-key" },
    label: { type: String },
    labelKey: { type: String, attribute: "label-key" },
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
    errorKey: { type: String, attribute: "error-key" },
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
  declare labelKey: string;
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
  declare errorKey: string;
  declare _focused: boolean;

  constructor() {
    super();
    this.type = "text";
    this.name = "";
    this.value = "";
    this.placeholder = "";
    this.placeholderKey = "";
    this.label = "";
    this.labelKey = "";
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
    this.errorKey = "";
    this._focused = false;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: calc(var(--025) * var(--sf, 1));
      width: 100%;
    }

    label {
      font-family: var(--typeface-regular);
      font-size: calc(12px * var(--sf, 1));
      color: var(--text-color-secondary);
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    input {
      width: 100%;
      height: calc(var(--1) * var(--sf, 1));
      padding: 0 calc(var(--025) * var(--sf, 1));
      font-family: var(--typeface-regular);
      font-size: calc(14px * var(--sf, 1));
      color: var(--text-color-primary);
      background-color: var(--input-background, transparent);
      border: 1px solid var(--input-border-color, var(--border-color, #ccc));
      border-radius: calc(var(--025) * var(--sf, 1));
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
      box-sizing: border-box;
    }

    input::placeholder {
      color: var(--text-color-tertiary, #999);
    }

    input:focus {
      border-color: var(--accent-color, #007aff);
      box-shadow: 0 0 0 2px
        var(--input-focus-ring, rgba(0, 122, 255, 0.2));
    }

    input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--input-disabled-background, #f5f5f5);
    }

    input:read-only {
      background-color: var(--input-readonly-background, #fafafa);
    }

    :host([variant="filled"]) input {
      background-color: var(
        --input-filled-background,
        var(--surface-color-secondary, #f5f5f5)
      );
      border: none;
      border-bottom: 2px solid var(--border-color, #ccc);
      border-radius: calc(var(--025) * var(--sf, 1))
        calc(var(--025) * var(--sf, 1)) 0 0;
    }

    :host([variant="filled"]) input:focus {
      border-bottom-color: var(--accent-color, #007aff);
      box-shadow: none;
    }

    :host([variant="outlined"]) input {
      background-color: transparent;
      border: 2px solid var(--border-color, #ccc);
    }

    :host([variant="outlined"]) input:focus {
      border-color: var(--accent-color, #007aff);
    }

    .error-message {
      font-family: var(--typeface-regular);
      font-size: calc(12px * var(--sf, 1));
      color: var(--error-color, #ff3b30);
      margin-top: calc(var(--025) * var(--sf, 1));
    }

    :host([required]) label::after {
      content: " *";
      color: var(--error-color, #ff3b30);
    }

    /* Error state */
    input.has-error {
      border-color: var(--error-color, #ff3b30);
    }

    input.has-error:focus {
      box-shadow: 0 0 0 2px rgba(255, 59, 48, 0.2);
    }
  `;

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
    const hasError = Boolean(this.error || this.errorKey);

    return html`
      <div class="input-wrapper">
        ${this.label || this.labelKey
          ? html`
              <label for="input">
                ${this.labelKey
                  ? html`<ds-text .key=${this.labelKey}></ds-text>`
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
                ${this.errorKey
                  ? html`<ds-text .key=${this.errorKey}></ds-text>`
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
