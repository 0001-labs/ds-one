import { LitElement, html, css } from "lit";

/**
 * A component for single navigation links
 *
 * @element singlenav-v1
 * @prop {string} type - Type of navigation: "projects" or "work"
 * @prop {string} to - Optional custom destination URL
 */
export class SingleNav extends LitElement {
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
      gap: calc(5px * var(--scaling-factor));
      padding: calc(2px * var(--scaling-factor));
      align-items: center;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: calc(5px * var(--scaling-factor));
      text-decoration: none;
      color: inherit;
    }
  `;

  render() {
    const navConfig = this.getNavConfig();
    const href = this.to || navConfig.href;

    return html`
      <a href="${href}">
        <text-v1 key="${navConfig.key}"></text-v1>
        <icon-v1 type="right"></icon-v1>
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

customElements.define("singlenav-v1", SingleNav);

declare global {
  interface HTMLElementTagNameMap {
    "singlenav-v1": SingleNav;
  }
}
