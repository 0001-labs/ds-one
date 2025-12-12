import { LitElement, html, css } from "lit";
import "../2-core/ds-text";
import "../2-core/ds-icon";
import "./ds-row";

/**
 * Native accordion using <details>/<summary> (no JS toggle logic).
 *
 * Usage:
 * <ds-accordion summary-key="howItBegan" details-key="designedInHokkaido"></ds-accordion>
 */
export class Accordion extends LitElement {
  static properties = {
    summaryKey: { type: String, attribute: "summary-key" },
    detailsKey: { type: String, attribute: "details-key" },
    open: { type: Boolean, reflect: true },
  };

  declare summaryKey: string;
  declare detailsKey: string;
  declare open: boolean;

  constructor() {
    super();
    this.summaryKey = "";
    this.detailsKey = "";
    this.open = false;
  }

  static styles = css`
    :host {
      display: block;
      width: calc(240px * var(--sf));
      color: var(--text-color-primary);
    }

    details {
      width: 100%;
    }

    summary {
      cursor: pointer;
      user-select: none;
      list-style: none;
      outline: none;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    .summaryRow {
      width: 100%;
    }

    ds-icon.chevron {
      transform: rotate(0deg);
      transition: transform 140ms ease;
    }

    details[open] ds-icon.chevron {
      transform: rotate(180deg);
    }

    .detailsBody {
      padding-top: calc(var(--half) * var(--sf));
    }

    .detailsText {
      display: block;
      white-space: normal;
      text-align: left;
    }
  `;

  render() {
    return html`
      <details ?open=${this.open}>
        <summary>
          <ds-row class="summaryRow" type="centered">
            <ds-text .key=${this.summaryKey}></ds-text>
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
          <ds-text class="detailsText" .key=${this.detailsKey}></ds-text>
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
