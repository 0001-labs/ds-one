import { LitElement, html, css } from "lit";

// Home tab button that reveals on hover (active) or stays visible and non-interactive (disabled)
export class Home extends LitElement {
  static properties = {
    state: { type: String, reflect: true }, // "active" | "disabled"
  } as any;

  state: "active" | "disabled" = "active";

  /**
   * Ensure Home is always disabled on mobile devices.
   * Runs once when the element is connected to the DOM.
   */
  connectedCallback() {
    super.connectedCallback();
    if (this._isMobileDevice()) {
      this.state = "disabled";
    }
  }

  /**
   * Lightweight mobile detection. Mirrors the app's utility without importing it
   * to keep the design system component self-contained.
   */
  private _isMobileDevice(): boolean {
    const nav: any = (globalThis as any).navigator;
    const win: any = (globalThis as any).window;
    const ua: string =
      (nav && (nav.userAgent || nav.vendor)) || (win && win.opera) || "";

    const uaMatchesMobile =
      /Mobile|Android|iP(ad|hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)|Windows Phone|Phone|Tablet/i.test(
        ua
      );

    const touchPoints = (nav && nav.maxTouchPoints) || 0;
    const isTouchCapable = touchPoints > 1;
    const narrowViewport = win
      ? Math.min(win.innerWidth || 0, win.innerHeight || 0) <= 820
      : false;

    return uaMatchesMobile || (isTouchCapable && narrowViewport);
  }

  protected updated(): void {
    // Enforce disabled on mobile even if someone flips the state later
    if (this._isMobileDevice() && this.state !== "disabled") {
      this.state = "disabled";
    }
  }

  static styles = css`
    :host {
      /* local sizing vars, derived from one.css */
      --home-visible: calc(var(--1) * 0.1); /* 2px */

      position: relative;
      display: flex; /* expand hover zone horizontally */
      width: 100%; /* take the whole row width of the app container */
      height: calc(
        var(--1) * var(--scaling-factor)
      ); /* provide hover zone under the tab */
      font-family: var(--typeface);
      overflow: hidden; /* hide the part above the host */
    }

    /* Disabled: preserve full hover area space but keep inactive */
    :host([state="disabled"]) {
      height: var(--1); /* keep same layout height as active */
      overflow: hidden;
    }

    .home {
      position: absolute;
      left: 0;
      width: calc(var(--4) * var(--scaling-factor));
      height: calc(var(--1) * var(--scaling-factor));
      margin: 0 calc(var(--1) * var(--scaling-factor));
      display: flex;
      align-items: center;
      background: var(--accent-color);
      color: light-dark(var(--black), var(--black));
      user-select: none;
      transition: top 120ms ease;
    }

    /* Inner text spacing without affecting the 80px outer width */
    .home > ds-text {
      padding: 0 calc(var(--1) * 0.15 * var(--scaling-factor));
      box-sizing: border-box;
      height: 100%;
      display: inline-flex;
      align-items: center;
    }

    /* invisible flex filler to extend hover area to the right */
    .hover-fill {
      flex: 1 1 auto;
    }

    /* Active: hidden until hover */
    .home.is-active {
      cursor: pointer;
      /* Hide above, leave a 2px strip visible */
      top: calc(var(--home-visible) - var(--1));
    }

    /* Reveal the tab when hovering anywhere in the host area
       (the host is 80x20, while the tab starts hidden above) */
    :host(:hover) .home.is-active {
      top: 0;
    }

    /* Disabled: stays hidden and not interactive */
    .home.is-disabled {
      top: calc(var(--home-visible) - var(--1));
      cursor: default;
      pointer-events: none;
      color: var(--accent-color);
    }

    .label {
      font-size: var(--type-size-default);
    }
  `;

  // No setup needed; `state` defaults to "active" and reflects if provided

  private _navigateHome() {
    if (this.state === "disabled") return;
    window.location.href = "./home.html";
  }

  private _onKeyDown(e: any) {
    if (this.state === "disabled") return;
    if (e?.key === "Enter" || e?.key === " ") {
      e.preventDefault();
      this._navigateHome();
    }
  }

  render() {
    const isDisabled = this.state === "disabled";
    return html`
      <div class="hover-fill"></div>
      <div
        class="home ${isDisabled ? "is-disabled" : "is-active"}"
        role="button"
        aria-disabled="${String(isDisabled)}"
        tabindex="${isDisabled ? -1 : 0}"
        @click="${this._navigateHome}"
        @keydown="${this._onKeyDown}"
      >
        <ds-text key="home"></ds-text>
      </div>
    `;
  }
}

customElements.define("home-v1", Home);

declare global {
  interface HTMLElementTagNameMap {
    "home-v1": Home;
  }
}
