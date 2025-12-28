// ds-table.ts
// Data table component

import { LitElement, html, unsafeCSS } from "lit";
import styles from "./styles/ds-table.css?inline";

export interface TableRow {
  product: string;
  users: string;
  retention: string;
  status?: string;
}

export class DsTable extends LitElement {
  static properties = {
    data: { type: Array },
    columns: { type: Array },
    showStatus: { type: Boolean, attribute: "show-status" },
  };

  declare data: TableRow[];
  declare columns: string[];
  declare showStatus: boolean;

  constructor() {
    super();
    this.data = [];
    this.columns = ["Product", "Users", "Retention"];
    this.showStatus = true;
  }

  static styles = unsafeCSS(styles);

  render() {
    return html`
      <div class="table-container">
        <div class="table-header">
          <div class="header-cell product-cell">Product</div>
          <div class="header-cell users-cell">Users</div>
          <div class="header-cell retention-cell">Retention</div>
          ${this.showStatus ? html`<div class="header-cell">Status</div>` : ""}
        </div>
        <div class="table-body">
          ${this.data.map(
            (row, rowIndex) => html`
              <div class="data-cell product-cell">${row.product}</div>
              <div class="data-cell users-cell">${row.users}</div>
              <div class="data-cell retention-cell">${row.retention}</div>
              ${this.showStatus
                ? html`<div class="data-cell status-cell">
                    ${row.status || "Pending"}
                  </div>`
                : ""}
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("ds-table", DsTable);

declare global {
  interface HTMLElementTagNameMap {
    "ds-table": DsTable;
  }
}
