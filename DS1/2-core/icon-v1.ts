import { LitElement, html, css, type PropertyValues } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export class Icon extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
  };

  private _type = "";

  size = "1em";
  color = "currentColor";
  background = "transparent";

  get type() {
    return this._type;
  }
  set type(val) {
    const oldVal = this._type;
    this._type = val;
    this.requestUpdate("type", oldVal);
  }

  static styles = css`
    :host {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: calc(16px * var(--scaling-factor));
      height: calc(16px * var(--scaling-factor));
    }

    svg {
      width: 100%;
      height: 100%;
      fill: var(--icon-color, currentColor);
    }

    path {
      fill: var(--icon-color, currentColor);
    }

    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(16px * var(--scaling-factor));
      height: calc(16px * var(--scaling-factor));
    }

    /* Notes style color variable for future implementation */
    :host {
      --notes-style-color: #ffb6b9;
    }
  `;

  // Load all SVGs from `x Icon/` as raw strings at build time (Vite)
  // The keys will be the file base names (without extension), lowercased.
  private static readonly iconNameToSvgMap: Record<string, string> = (() => {
    try {
      // Note: folder name contains a space, keep it exact.
      const modules = (import.meta as any).glob("../x Icon/*.svg", {
        as: "raw",
        eager: true,
      }) as Record<string, string>;

      const map: Record<string, string> = {};
      for (const [path, content] of Object.entries(modules)) {
        const fileName = path.split("/").pop() ?? "";
        const baseName = fileName.replace(/\.svg$/i, "").toLowerCase();
        if (baseName) {
          map[baseName] = content;
        }
      }
      return map;
    } catch (err) {
      // If not running under Vite (or during tests), gracefully degrade.
      console.warn(
        "Icon: failed to glob SVGs from x Icon/; falling back only to inline switch icons.",
        err
      );
      return {};
    }
  })();

  constructor() {
    super();
    console.log("Icon constructor", this._type);
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("Icon connected", this._type);
  }

  renderIcon() {
    console.log("renderIcon called with type:", this._type);

    if (!this._type || this._type === "") {
      console.log("No type specified, rendering default slot");
      return html`<div class="icon-container"><slot></slot></div>`;
    }

    // First, try to render an SVG whose file name matches `type`
    const svgFromSet = Icon.iconNameToSvgMap[this._type.toLowerCase()];
    if (svgFromSet) {
      return html`<div class="icon-container">${unsafeHTML(svgFromSet)}</div>`;
    }

    switch (this._type.toLowerCase()) {
      case "close":
        console.log("Rendering close icon");
        return html`
          <div class="icon-container">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
              />
            </svg>
          </div>
        `;
      case "page":
        console.log("Rendering page icon");
        return html`
          <div class="icon-container">
            <svg viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
              <rect
                width="16"
                height="16"
                transform="translate(0.799988 0.678772)"
                fill="var(--accent-color)"
              />
              <path
                d="M13.7956 2.38385V14.9737H3.80438V2.38385H13.7956ZM4.7243 14.0538H12.8757V3.30377H4.7243V14.0538ZM8.67841 8.53619V9.45612H5.92938V8.53619H8.67841ZM10.8259 6.60455V7.52448H5.92938V6.60455H10.8259ZM10.8259 4.67194V5.59283H5.92938V4.67194H10.8259Z"
                fill="#2A2A2A"
              />
            </svg>
          </div>
        `;
      case "note":
        console.log("Rendering note icon");
        return html`
          <div class="icon-container">
            <svg viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
              <rect
                width="16"
                height="16"
                transform="translate(0.799988 0.678772)"
                fill="var(--accent-color, #CCFF4D)"
              />
              <path
                d="M14.7653 3.99225V13.3653H2.83466V3.99225H14.7653ZM3.83466 12.3653H13.7653V4.99225H3.83466V12.3653Z"
                fill="#2A2A2A"
              />
              <path
                d="M8.8064 7.75881V8.67873H4.51343V7.75881H8.8064ZM10.7527 5.75881V6.67873H4.51343V5.75881H10.7527Z"
                fill="#2A2A2A"
              />
            </svg>
          </div>
        `;
      case "default":
        console.log("Rendering default icon");
        return html`
          <div class="icon-container">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="16"
                height="16"
                transform="translate(0.799988)"
                fill="var(--accent-color, #CCFF4D)"
              />
              <path
                d="M9.95899 15V6.81H7.05999V5.77H14.093V6.81H11.194V15H9.95899Z"
                fill="#2A2A2A"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.89999 0V5.10001H0.799988V0H5.89999Z"
                fill="#2A2A2A"
              />
            </svg>
          </div>
        `;
      case "big":
        console.log("Rendering big icon");
        return html`
          <div class="icon-container">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3141_3351)">
                <rect
                  width="16"
                  height="16"
                  transform="translate(0.799988)"
                  fill="var(--accent-color, #CCFF4D)"
                />
                <path
                  d="M13.959 12.615V4.425H11.06V3.385H16.802V4.425H15.194V12.615H13.959Z"
                  fill="#2A2A2A"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.79999 3.5V12.5H0.799988V3.5H9.79999Z"
                  fill="#2A2A2A"
                />
              </g>
              <defs>
                <clipPath id="clip0_3141_3351">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.799988)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        `;
      case "gallery":
        console.log("Rendering gallery icon");
        return html`
          <div class="icon-container">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3144_2504)">
                <rect
                  width="16"
                  height="16"
                  transform="translate(0.799988)"
                  fill="var(--accent-color, #CCFF4D)"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.799988 16V0H16.8L0.799988 16ZM1.50604 0.769531V1.80957H4.40546V10H5.63983V1.80957H8.53925V0.769531H1.50604Z"
                  fill="#2A2A2A"
                />
              </g>
              <defs>
                <clipPath id="clip0_3144_2504">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.799988)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        `;
      case "check":
        console.log("Rendering check icon");
        return html`
          <div class="icon-container">
            <svg
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="16"
                height="16"
                transform="translate(0.799988 0.678772)"
                fill="var(--accent-color)"
              />
              <path
                d="M7.48658 11.8747L13.2431 6.12674L12.5361 5.41788L7.48845 10.4734L5.06409 8.04082L4.35706 8.73597L7.48658 11.8747Z"
                fill="#2A2A2A"
              />
            </svg>
          </div>
        `;
      default:
        console.log(`Unknown icon type: ${this._type}, rendering default slot`);
        return html`<div class="icon-container"><slot></slot></div>`;
    }
  }

  updated(changedProperties: PropertyValues) {
    console.log("Icon updated", changedProperties);

    this.style.setProperty("--icon-size", this.size);
    this.style.setProperty("--icon-color", this.color);
    this.style.setProperty("--icon-background", this.background);
  }

  render() {
    console.log("Icon render", this._type);
    return this.renderIcon();
  }
}

customElements.define("icon-v1", Icon);

// Add this line to help with debugging
console.log("Icon component registered with custom elements registry");

declare global {
  interface HTMLElementTagNameMap {
    "icon-v1": Icon;
  }
}
