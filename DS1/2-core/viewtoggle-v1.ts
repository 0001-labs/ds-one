import { LitElement, html } from "lit";
import { getText } from "../utils/language";
import { getViewMode, setViewMode } from "../utils/viewMode";

/**
 * A component for toggling between text and image view modes
 *
 * @element viewtoggle-v1
 */
export class ViewToggle extends LitElement {
  static properties = {
    _mode: { type: String, state: true },
  };

  declare _mode: "text" | "image";

  private boundHandlers: {
    viewModeChanged: EventListener;
    languageChanged: EventListener;
  };

  constructor() {
    super();
    this._mode = getViewMode();
    this.boundHandlers = {
      viewModeChanged: ((e: CustomEvent) => {
        const mode = e.detail === "image" ? "image" : "text";
        if (this._mode !== mode) {
          this._mode = mode;
        }
      }) as EventListener,
      languageChanged: (() => {
        this.requestUpdate();
      }) as EventListener,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      "view-mode-changed",
      this.boundHandlers.viewModeChanged
    );
    window.addEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      "view-mode-changed",
      this.boundHandlers.viewModeChanged
    );
    window.removeEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );
  }

  private _toggle = () => {
    const next = this._mode === "image" ? "text" : "image";
    setViewMode(next);
  };

  render() {
    const label =
      this._mode === "image" ? getText("hideImage") : getText("viewImage");
    return html`
      <button-v1 variant="primary" @click=${this._toggle}>${label}</button-v1>
    `;
  }
}

customElements.define("viewtoggle-v1", ViewToggle);

declare global {
  interface HTMLElementTagNameMap {
    "viewtoggle-v1": ViewToggle;
  }
}
