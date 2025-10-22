import { LitElement, html, css } from "lit";
import { currentLanguage, translate } from "../utils/language";

/**
 * Download CV button that resolves language-specific URLs
 *
 * @element downloadcv-v1
 * @prop {string} urlEn - URL for English CV
 * @prop {string} urlDa - URL for Danish CV
 * @prop {string} urlJa - URL for Japanese CV
 * @prop {string} filename - Base filename for download (default: "cv")
 */
export class DownloadCV extends LitElement {
  static properties = {
    urlEn: { type: String, attribute: "url-en", reflect: true },
    urlDa: { type: String, attribute: "url-da", reflect: true },
    urlJa: { type: String, attribute: "url-ja", reflect: true },
    filename: { type: String, reflect: true },
    _activeUrl: { type: String, state: true },
  };

  declare urlEn: string;
  declare urlDa: string;
  declare urlJa: string;
  declare filename: string;
  declare _activeUrl: string;

  constructor() {
    super();
    this.urlEn = "";
    this.urlDa = "";
    this.urlJa = "";
    this.filename = "cv";
    this._activeUrl = "";
  }

  static styles = css`
    :host {
      display: inline-flex;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._resolveUrl();
    window.addEventListener("language-changed", this._handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("language-changed", this._handleLanguageChange);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("urlEn") || changed.has("urlDa") || changed.has("urlJa")) {
      this._resolveUrl();
    }
  }

  private _handleLanguageChange = () => {
    this._resolveUrl();
  };

  private _resolveUrl() {
    const lang = currentLanguage.value || "en-US";
    const prefix = (lang.split("-")[0] || "en").toLowerCase();

    let url = "";
    if (prefix === "da") url = this.urlDa || this.urlEn || this.urlJa;
    else if (prefix === "ja") url = this.urlJa || this.urlEn || this.urlDa;
    else url = this.urlEn || this.urlDa || this.urlJa;

    this._activeUrl = url || "";
  }

  private async _download() {
    if (!this._activeUrl) {
      console.warn("[downloadcv-v1] No URL available");
      return;
    }

    console.log("[downloadcv-v1] Attempting download from:", this._activeUrl);

    try {
      // Prefer blob download (reliable filename, works cross-origin with CORS)
      const res = await fetch(this._activeUrl, { mode: "cors" });
      console.log(
        "[downloadcv-v1] Fetch response:",
        res.status,
        res.statusText
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const langPrefix = (currentLanguage.value || "en-US")
        .split("-")[0]
        .toLowerCase();
      const fileExt = this._inferExtFromUrl(this._activeUrl) || "pdf";
      const name = `${this.filename || "cv"}-${langPrefix}.${fileExt}`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      console.log("[downloadcv-v1] Download triggered successfully");
    } catch (err) {
      console.error("[downloadcv-v1] Fetch failed, using fallback:", err);
      // Fallback: open the file directly
      window.open(this._activeUrl, "_blank", "noopener,noreferrer");
    }
  }

  private _inferExtFromUrl(u: string): string | null {
    const qIndex = u.indexOf("?");
    const clean = qIndex >= 0 ? u.slice(0, qIndex) : u;
    const dot = clean.lastIndexOf(".");
    if (dot === -1) return null;
    const ext = clean.slice(dot + 1).toLowerCase();
    if (ext.length > 5) return null;
    return ext;
  }

  render() {
    const disabled = !this._activeUrl;
    return html`
      <ds-button
        variant="primary"
        .disabled=${disabled}
        default-text=${translate("downloadCV")}
        @click=${() => this._download()}
      ></ds-button>
    `;
  }
}

customElements.define("downloadcv-v1", DownloadCV);

declare global {
  interface HTMLElementTagNameMap {
    "downloadcv-v1": DownloadCV;
  }
}
