import { LitElement, html, css } from "lit";

/**
 * A component for single navigation links
 *
 * @element portfolio-singlenav
 * @prop {string} type - Type of navigation: "projects" or "work"
 * @prop {string} to - Optional custom destination URL
 */
export class PortfolioSingleNav extends LitElement {
  static get properties() {
    return {
      type: { type: String, reflect: true },
      to: { type: String, reflect: true },
    };
  }

  declare type: "projects" | "work";
  declare to?: string;

  constructor() {
    super();
    this.type = "work";
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: end;
      gap: calc(5px * var(--sf));
      padding: calc(2px * var(--sf));
      align-items: center;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: calc(5px * var(--sf));
      text-decoration: none;
      color: inherit;
    }
  `;

  render() {
    const navConfig = this.getNavConfig();
    const href = this.to || navConfig.href;

    return html`
      <a href="${href}">
        <ds-text key="${navConfig.key}"></ds-text>
        <ds-icon type="right"></ds-icon>
      </a>
    `;
  }

  private getNavConfig() {
    switch (this.type) {
      case "projects":
        return {
          href: "/projects",
          key: "projects",
        };
      case "work":
        return {
          href: "/",
          key: "workExperience",
        };
    }
  }
}

customElements.define("portfolio-singlenav", PortfolioSingleNav);

declare global {
  interface HTMLElementTagNameMap {
    "portfolio-singlenav": PortfolioSingleNav;
  }
}
