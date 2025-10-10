// ds-table.ts
// Data table component

import { LitElement, html, css } from "lit";

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

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .table-container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .table-header {
      display: grid;
      grid-template-columns: 160px 80px 80px 80px;
      height: 20px;
      width: 400px;
    }

    .table-body {
      display: grid;
      grid-template-columns: 160px 80px 80px 80px;
      border: 1px solid var(--black);
      width: 400px;
    }

    .header-cell {
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: left;
      padding:  0 2px;
      font-family: var(--typeface);
      font-size: var(--type-size-default);
      font-weight: var(--type-weight-default);
      line-height: var(--type-lineheight-default);
      color: var(--black);
      letter-spacing: -0.26px;
    }

    .data-cell {
      height: 20px;
      margin-top: -1px;
      display: flex;
      align-items: center;
      justify-content: left;
    
      outline: 1px solid var(--black);

      font-family: var(--typeface);
      font-size: var(--type-size-default);
      font-weight: var(--type-weight-default);
      line-height: var(--type-lineheight-default);
      color: var(--black);
      letter-spacing: -0.26px;
    }

    .status-cell {
      background-color: var(--light-green);
    }

    .product-cell {
      text-align: left;
      justify-content: flex-start;
    }

    .users-cell,
    .retention-cell {
      text-align: center;
    }

    .status-cell {
      text-align: center;
    }

    /* Responsive adjustments */
    @media (max-width: 480px) {
      .table-header,
      .table-body {
        width: 100%;
        grid-template-columns: 1fr 60px 60px 60px;
      }
    }
  `;

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
