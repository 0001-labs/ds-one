import { LitElement, css, html } from "lit";
import { getText } from "../utils/language";
import { getViewMode } from "../utils/viewMode";

/**
 * A component for displaying article content with image/text toggle
 *
 * @element article-v1
 */
export class Article extends LitElement {
  static get properties() {
    return {
      imgLightDesktop: {
        type: String,
        reflect: true,
        attribute: "img-light-desktop",
      },
      imgDarkDesktop: {
        type: String,
        reflect: true,
        attribute: "img-dark-desktop",
      },
      imgLightMobile: {
        type: String,
        reflect: true,
        attribute: "img-light-mobile",
      },
      imgDarkMobile: {
        type: String,
        reflect: true,
        attribute: "img-dark-mobile",
      },
      src: { type: String, reflect: true },
      alt: { type: String, reflect: true },
      imageToggle: { type: Boolean, reflect: true, attribute: "image-toggle" },
      imageOnlyWidth: {
        type: Number,
        reflect: true,
        attribute: "image-only-width",
      },
      priority: { type: Boolean, reflect: true },
      externalToggle: {
        type: Boolean,
        reflect: true,
        attribute: "external-toggle",
      },
      mobileKey: { type: String, reflect: true, attribute: "mobile-key" },
      desktopKey: { type: String, reflect: true, attribute: "desktop-key" },
      textKey: { type: String, reflect: true, attribute: "text-key" },
      defaultValue: { type: String, reflect: true, attribute: "default-value" },
      _text: { type: String, state: true },
      _currentImage: { type: String, state: true },
      _imageVisible: { type: Boolean, state: true },
      _shouldAnimate: { type: Boolean, state: true },
    };
  }

  declare imgLightDesktop: string;
  declare imgDarkDesktop: string;
  declare imgLightMobile: string;
  declare imgDarkMobile: string;
  declare src: string;
  declare alt: string;
  declare imageToggle: boolean;
  declare imageOnlyWidth: number;
  declare priority: boolean;
  declare externalToggle: boolean;
  declare mobileKey: string;
  declare desktopKey: string;
  declare textKey: string;
  declare defaultValue: string;
  declare _text: string;
  declare _currentImage: string;
  declare _imageVisible: boolean;
  declare _shouldAnimate: boolean;

  private _mql: MediaQueryList | null;
  private boundHandlers: {
    languageChanged: EventListener;
    themeChanged: EventListener;
    viewportChanged?: (e: MediaQueryListEvent) => void;
    viewModeChanged: EventListener;
  };

  constructor() {
    super();
    this.imgLightDesktop = "";
    this.imgDarkDesktop = "";
    this.imgLightMobile = "";
    this.imgDarkMobile = "";
    this.src = "";
    this.alt = "";
    this.imageToggle = false;
    this.imageOnlyWidth = 480;
    this.priority = false;
    this.externalToggle = false;
    this.mobileKey = "";
    this.desktopKey = "";
    this.textKey = "";
    this.defaultValue = "";
    this._text = "";
    this._currentImage = "";
    this._imageVisible = true;
    this._shouldAnimate = false;
    this._mql = null;

    this.boundHandlers = {
      languageChanged: (() => {
        this._loadText();
      }) as EventListener,
      themeChanged: (() => {
        this._resolveImage();
      }) as EventListener,
      viewportChanged: (e: MediaQueryListEvent) => {
        this._resolveImage();
        this._loadText();
      },
      viewModeChanged: ((e: CustomEvent) => {
        if (this.imageToggle && this.externalToggle) {
          const newMode = e.detail;
          const shouldShowImage = newMode === "image";
          if (this._imageVisible !== shouldShowImage) {
            this._shouldAnimate = true;
            this._imageVisible = shouldShowImage;
            this.requestUpdate();
          }
        }
      }) as EventListener,
    };
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--typeface);
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;
      hyphens: auto;
      color: light-dark(var(--black), var(--white));
      line-height: calc(20px * var(--scaling-factor));
      padding: calc(2px * var(--scaling-factor));
    }

    .container {
      position: relative;
      width: min(100%, var(--image-only-width));
    }

    figure.media,
    .copy {
      margin: 0;
      width: 100%;
      overflow: hidden;
      display: block;
      margin-bottom: calc(8px * var(--scaling-factor));
    }

    .fade-in {
      animation: fade-in 0.25s ease;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    img.loaded {
      opacity: 1;
    }

    .toggle-button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font-family: var(--typeface);
      font-size: calc(14px * var(--scaling-factor));
      margin-bottom: calc(8px * var(--scaling-factor));
      padding: 0;
      text-decoration: underline;
    }

    .toggle-button:hover {
      opacity: 0.7;
    }
  `;

  updated(changed: Map<string, unknown>) {
    if (changed.has("imageOnlyWidth")) {
      const opx = Number(this.imageOnlyWidth) || 480;
      this.style.setProperty("--image-only-width", `${opx}px`);
    }
    if (
      changed.has("imgLightDesktop") ||
      changed.has("imgDarkDesktop") ||
      changed.has("imgLightMobile") ||
      changed.has("imgDarkMobile") ||
      changed.has("src")
    ) {
      this._resolveImage();
    }
    if (
      changed.has("textKey") ||
      changed.has("defaultValue") ||
      changed.has("mobileKey") ||
      changed.has("desktopKey")
    ) {
      this._loadText();
    }
    if (changed.has("imageToggle")) {
      const isExternallyControlled = this.imageToggle && this.externalToggle;
      if (!isExternallyControlled) {
        const newImageVisible = !this.imageToggle;
        if (this._imageVisible !== newImageVisible) {
          this._shouldAnimate = true;
          this._imageVisible = newImageVisible;
        }
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadText();
    this._resolveImage();

    if (this.imageToggle && this.externalToggle) {
      const currentMode = getViewMode();
      this._imageVisible = currentMode === "image";
    } else {
      this._imageVisible = !this.imageToggle;
    }

    this.style.setProperty("--image-only-width", `${this.imageOnlyWidth}px`);

    try {
      this._mql = window.matchMedia("(max-width: 720px)");
      if (this._mql && this.boundHandlers.viewportChanged) {
        this._mql.addEventListener(
          "change",
          this.boundHandlers.viewportChanged
        );
      }
    } catch (err) {
      // no-op
    }

    window.addEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );
    window.addEventListener("theme-changed", this.boundHandlers.themeChanged);

    if (this.imageToggle && this.externalToggle) {
      window.addEventListener(
        "view-mode-changed",
        this.boundHandlers.viewModeChanged
      );

      setTimeout(() => {
        const currentMode = getViewMode();
        const shouldShowImage = currentMode === "image";
        if (this._imageVisible !== shouldShowImage) {
          this._shouldAnimate = true;
          this._imageVisible = shouldShowImage;
          this.requestUpdate();
        }
      }, 100);
    } else if (this.imageToggle) {
      window.addEventListener(
        "article-toggle",
        this._toggleImage as EventListener
      );
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );
    window.removeEventListener(
      "theme-changed",
      this.boundHandlers.themeChanged
    );
    window.removeEventListener(
      "article-toggle",
      this._toggleImage as EventListener
    );
    window.removeEventListener(
      "view-mode-changed",
      this.boundHandlers.viewModeChanged
    );

    if (this._mql && this.boundHandlers.viewportChanged) {
      try {
        this._mql.removeEventListener(
          "change",
          this.boundHandlers.viewportChanged
        );
      } catch (err) {
        // no-op
      }
    }
  }

  private _loadText() {
    const isMobile = (() => {
      try {
        return (
          window.matchMedia && window.matchMedia("(max-width: 720px)").matches
        );
      } catch (err) {
        return false;
      }
    })();

    const selectedKey = (() => {
      const mobile = (this.mobileKey || "").trim();
      const desktop = (this.desktopKey || "").trim();
      const base = (this.textKey || "").trim();
      if (mobile || desktop) {
        return isMobile ? mobile || base : desktop || base;
      }
      return base;
    })();

    if (!selectedKey) {
      this._text = this.defaultValue || "";
      return;
    }

    try {
      const text = getText(selectedKey);
      this._text = text || this.defaultValue || selectedKey;
    } catch (error) {
      console.error(
        `[article-v1] Error loading text for key "${selectedKey}":`,
        error
      );
      this._text = this.defaultValue || selectedKey;
    }
  }

  private _resolveImage() {
    if (this.src && typeof this.src === "string") {
      const direct = this.src.startsWith("@") ? this.src.slice(1) : this.src;
      this._currentImage = direct;
      return;
    }

    const theme =
      document.documentElement.getAttribute("data-theme") || "light";
    const isMobile = (() => {
      try {
        return (
          window.matchMedia && window.matchMedia("(max-width: 720px)").matches
        );
      } catch (err) {
        return false;
      }
    })();

    let chosen = "";
    if (isMobile) {
      if (theme === "dark") {
        chosen = this.imgDarkMobile || this.imgLightMobile;
      } else {
        chosen = this.imgLightMobile || this.imgDarkMobile;
      }
    } else {
      if (theme === "dark") {
        chosen = this.imgDarkDesktop || this.imgLightDesktop;
      } else {
        chosen = this.imgLightDesktop || this.imgDarkDesktop;
      }
    }

    if (typeof chosen === "string" && chosen.startsWith("@")) {
      chosen = chosen.slice(1);
    }
    this._currentImage = chosen || "";
  }

  private _toggleImage = () => {
    this._shouldAnimate = true;
    this._imageVisible = !this._imageVisible;
    this.requestUpdate();
  };

  private _handleImageLoad = (e: Event) => {
    const img = e.target as HTMLImageElement;
    img.classList.add("loaded");
  };

  render() {
    const showImage =
      (this.imageToggle ? this._imageVisible : true) && !!this._currentImage;
    const animationClass = this._shouldAnimate ? "fade-in" : "";

    if (this._shouldAnimate) {
      this._shouldAnimate = false;
    }

    const buttonText = this._imageVisible
      ? getText("hideImage")
      : getText("viewImage");

    return html`
      <div class="container">
        ${this.imageToggle && !this.externalToggle
          ? html`<button @click="${this._toggleImage}" class="toggle-button">
              ${buttonText}
            </button>`
          : ""}
        ${showImage
          ? html`<figure class="media ${animationClass}">
              <img
                src="${this._currentImage}"
                alt="${this.alt || ""}"
                loading="${this.priority ? "eager" : "lazy"}"
                fetchpriority="${this.priority ? "high" : "auto"}"
                decoding="async"
                @load="${this._handleImageLoad}"
              />
            </figure>`
          : html`<p class="copy ${animationClass}">${this._text}</p>`}
      </div>
    `;
  }
}

customElements.define("article-v1", Article);

declare global {
  interface HTMLElementTagNameMap {
    "article-v1": Article;
  }
}
