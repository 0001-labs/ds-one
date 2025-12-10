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

  mode: string = "portfolio";
  align?: string;
  debug?: boolean;

  static styles = css`
    :host {
      display: grid;
      position: relative;
      width: 100%;
    }

    :host([mode="portfolio"]) {
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

    /* App mode - Base */
    :host([mode="app"]) {
      grid-template-columns: 1fr;
      grid-template-rows: calc(var(--1) * var(--sf)) 20px 1fr auto;
      grid-template-areas:
        "banner"
        "main"
        "footer";
      min-height: 100vh;
      background-color: transparent;
      width: 100%;
      margin: 0 auto;
      gap: 0;
    }

    /* App mode - with scaling factor */
    :host([mode="app"]) {
      max-width: calc(400px * var(--sf, 1));
      padding: calc(60px * var(--sf, 1)) calc(28px * var(--sf, 1))
        calc(9.751px * var(--sf, 1));
      gap: calc(28px * var(--sf, 1));
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
    }

    :host([mode="portfolio"]) .debug-overlay {
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
      border-color: rgb(24, 147, 73);
      background-color: rgba(127, 123, 11, 0.1);
    }

    .debug-content {
      grid-area: content;
      border-color: rgba(71, 231, 71, 0.63);
    }

    :host([mode="app"]) .debug-overlay {
      grid-template-columns: 1fr;
      grid-template-rows:
        calc(var(--1) * var(--sf))
        calc(var(--2) * var(--sf))
        calc(var(--4) * var(--sf))
        calc(var(--1) * var(--sf));
      grid-template-areas:
        "banner"
        "header"
        "main"
        "footer";
    }

    .debug-banner {
      grid-area: banner;
      border-color: #daed09;
    }

    .debug-header {
      grid-area: header;
      border-color: #0000ff;
      background-color: rgba(127, 123, 11, 0.5);
    }

    .debug-main {
      grid-area: main;
      border-color: #0000ff;
    }

    .debug-footer-app {
      grid-area: footer;
      border-color: #ffa500;
    }
  `;

  render() {
    const isDebug = this.debug || this.mode === "debug";
    const isPortfolio = this.mode === "portfolio";
    const isCompany = this.mode === "company";
    const isApp = this.mode === "app";

    return html`
      <slot></slot>
      ${isDebug
        ? html`
            <div class="debug-overlay">
              ${isApp
                ? html`
                    <div class="debug-area debug-banner">
                      <ds-text key="banner">banner</ds-text>
                    </div>
                    <div class="debug-area debug-header">
                      <ds-text key="header">header</ds-text>
                    </div>

                    <div class="debug-area debug-main">
                      <ds-text key="main">main</ds-text>
                    </div>
                    <div class="debug-area debug-footer-app">
                      <ds-text key="footer">footer</ds-text>
                    </div>
                  `
                : isCompany
                  ? html`
                      <div class="debug-area debug-header">
                        <ds-text key="header">header</ds-text>
                      </div>
                      <div class="debug-area debug-content">
                        <ds-text key="content">content</ds-text>
                      </div>
                      <div class="debug-area debug-footer">
                        <ds-text key="footer">footer</ds-text>
                      </div>
                    `
                  : isPortfolio
                    ? html`
                        <div class="debug-area debug-square">
                          <ds-text key="square">square</ds-text>
                        </div>
                        <div class="debug-area debug-title">
                          <ds-text key="title">title</ds-text>
                        </div>
                        <div class="debug-area debug-header">
                          <ds-text key="header">header</ds-text>
                        </div>
                        <div class="debug-area debug-projects">
                          <ds-text key="projects">projects</ds-text>
                        </div>
                        <div class="debug-area debug-bio">
                          <ds-text key="bio">bio</ds-text>
                        </div>
                        <div class="debug-area debug-nav">
                          <ds-text key="nav">nav</ds-text>
                        </div>
                        <div class="debug-area debug-footer">
                          <ds-text key="footer">footer</ds-text>
                        </div>
                      `
                    : ""}
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
