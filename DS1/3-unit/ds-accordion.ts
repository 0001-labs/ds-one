import { LitElement, html, unsafeCSS } from "lit";
import "../2-core/ds-text";
import "../2-core/ds-icon";
import "./ds-row";
import styles from "./styles/ds-accordion.css?inline";

/**
 * Native accordion using <details>/<summary> (no JS toggle logic).
 *
 * Usage (with translation text):
 * <ds-accordion summary="How it began" details="Designed in Hokkaido"></ds-accordion>
 *
 * Usage (with slotted details content):
 * <ds-accordion summary="How it began">
 *   <div slot="details">Rich HTML content here</div>
 * </ds-accordion>
 */
export class Accordion extends LitElement {
  static properties = {
    summary: { type: String },
    details: { type: String },
    open: { type: Boolean, reflect: true },
    _hasSlottedContent: { type: Boolean, state: true },
  };

  declare summary: string;
  declare details: string;
  declare open: boolean;
  declare _hasSlottedContent: boolean;

  constructor() {
    super();
    this.summary = "";
    this.details = "";
    this.open = false;
    this._hasSlottedContent = false;
  }

  static styles = unsafeCSS(styles);

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assignedNodes = slot.assignedNodes({ flatten: true });
    // Filter out empty text nodes (whitespace only)
    const hasContent = assignedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
    );
    this._hasSlottedContent = hasContent;
  }

  render() {
    return html`
      <details ?open=${this.open}>
        <summary>
          <ds-row class="summaryRow" centered>
            <ds-text .text=${this.summary}></ds-text>
            <ds-icon class="chevron" aria-hidden="true">
              <svg
                viewBox="0 0 10.157 8.219"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M5.078 8.219L0 3.141L1.414 1.727L5.078 5.391L8.743 1.727L10.157 3.141L5.078 8.219Z"
                  fill="currentColor"
                />
              </svg>
            </ds-icon>
          </ds-row>
        </summary>

        <div class="detailsBody">
          <slot name="details" @slotchange=${this._handleSlotChange}></slot>
          ${!this._hasSlottedContent
            ? html`<ds-text
                class="detailsText"
                .text=${this.details}
              ></ds-text>`
            : ""}
        </div>
      </details>
    `;
  }
}

customElements.define("ds-accordion", Accordion);

declare global {
  interface HTMLElementTagNameMap {
    "ds-accordion": Accordion;
  }
}
