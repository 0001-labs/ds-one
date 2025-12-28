// ds-grid.ts
// Simple grid layout component

import { LitElement, html, unsafeCSS } from "lit";
import { detectMobileDevice } from "../0-face/device";
import styles from "./styles/ds-grid.css?inline";

declare global {
  interface CustomElementRegistry {
    define(name: string, constructor: typeof LitElement): void;
  }
  var customElements: CustomElementRegistry;
}

export class Grid extends LitElement {
  static properties = {
    align: { type: String },
  };

  align?: string;
  private resizeObserver?: () => void;
  private resizeTimeout?: any;

  static styles = unsafeCSS(styles);

  connectedCallback() {
    super.connectedCallback();
    this.updateMobileClass();

    // Listen for resize events to update mobile class
    this.resizeObserver = () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        this.updateMobileClass();
      }, 100);
    };
    window.addEventListener("resize", this.resizeObserver);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      window.removeEventListener("resize", this.resizeObserver);
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  private updateMobileClass() {
    const isMobile = detectMobileDevice();
    if (isMobile) {
      this.classList.add("mobile");
      this.classList.remove("desktop");
    } else {
      this.classList.add("desktop");
      this.classList.remove("mobile");
    }
  }

  render() {
    return html``;
  }
}

customElements.define("ds-grid", Grid);

declare global {
  interface HTMLElementTagNameMap {
    "ds-grid": Grid;
  }
}
