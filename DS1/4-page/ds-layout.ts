// ds-layout.ts
// Simple grid layout component with debug mode

import { LitElement, html, css } from "lit";

declare global {
  interface CustomElementRegistry {
    define(name: string, constructor: typeof LitElement): void;
  }
  var customElements: CustomElementRegistry;
}

export class Layout extends LitElement {
  static properties = {
    mode: { type: String },
    align: { type: String },
    debug: { type: Boolean },
  };

  mode?: string;
  align?: string;
  debug?: boolean;

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 120px 480px 40px;
      grid-template-rows: 120px 120px 60px 180px 60px 120px 60px 20px 120px 120px;
      grid-template-areas:
        "square . ."
        ". title ."
        ". header ."
        ". projects ."
        ". . ."
        ". bio ."
        ". . ."
        ". nav ."
        ". . ."
        ". footer ."
        ". . .";
      min-height: 600px;
      background-color: rgba(165, 165, 165, 0.03);
      position: relative;
      width: 100%;
      max-width: 640px;
      margin: 0 auto;
    }

    :host([mode="company"]) {
      grid-template-columns: auto 400px auto;
      grid-template-rows: 80px 20px 20px 120px 20px 120px;
      grid-template-areas:
        ". . ."
        ". header ."
        ". . ."
        ". content ."
        ". . ."
        ". footer .";
      gap: 0;
      max-width: 100%;
    }

    :host([align="left"]) {
      margin: 0;
      justify-self: start;
    }

    :host([align="center"]) {
      margin: 0 auto;
      justify-self: center;
    }

    :host([align="right"]) {
      margin: 0 0 0 auto;
      justify-self: end;
    }

    .debug-overlay {
      position: absolute;
      margin-left: -1px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 1000;
      display: grid;
      font-size: 18px;
      font-weight: bold;
      grid-template-columns: 120px 480px;
      grid-template-rows: 120px 120px 60px 180px 60px 120px 60px 20px 120px 120px;
      grid-template-areas:
        "square ."
        ". title"
        ". header"
        ". projects"
        ". ."
        ". bio"
        ". ."
        ". nav"
        ". ."
        ". footer"
        ". .";
    }

    :host([mode="company"]) .debug-overlay {
      grid-template-columns: auto 400px auto;
      grid-template-rows: 80px 20px 20px 120px 20px 120px;
      grid-template-areas:
        ". . ."
        ". header ."
        ". . ."
        ". content ."
        ". . ."
        ". footer .";
      gap: 0;
    }

    .debug-area {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: var(--type-weight-default);
      font-family: var(--typeface);
      color: var(--black);
      border: 1px solid red;
      opacity: 1;
    }

    .debug-square {
      grid-area: square;
    }

    .debug-title {
      grid-area: title;
    }

    .debug-header {
      grid-area: header;
      border-color: #0000ff;
    }

    .debug-projects {
      grid-area: projects;
      border-color: #ffff00;
    }

    .debug-bio {
      grid-area: bio;
      border-color: #ff00ff;
    }

    .debug-nav {
      grid-area: nav;
      border-color: #00ffff;
    }

    .debug-footer {
      grid-area: footer;
      border-color: #ffa500;
    }

    .debug-content {
      grid-area: content;
      border-color: rgba(71, 231, 71, 0.63);
    }
  `;

  render() {
    const isDebug = this.debug || this.mode === "debug";
    const isCompany = this.mode === "company";

    return html`
      <slot></slot>
      ${isDebug
        ? html`
            <div class="debug-overlay">
              ${isCompany
                ? html`
                    <div class="debug-area debug-header">header</div>
                    <div class="debug-area debug-content">content</div>
                    <div class="debug-area debug-footer">footer</div>
                  `
                : html`
                    <div class="debug-area debug-square">square</div>
                    <div class="debug-area debug-title">title</div>
                    <div class="debug-area debug-header">header</div>
                    <div class="debug-area debug-projects">projects</div>
                    <div class="debug-area debug-bio">bio</div>
                    <div class="debug-area debug-nav">nav</div>
                    <div class="debug-area debug-footer">footer</div>
                  `}
            </div>
          `
        : ""}
    `;
  }
}

customElements.define("ds-layout", Layout);

declare global {
  interface HTMLElementTagNameMap {
    "ds-layout": Layout;
  }
}
