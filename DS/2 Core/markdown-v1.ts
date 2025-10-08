import { LitElement, html, css } from "lit";

customElements.define('markdown-v1', class Markdown extends LitElement {
  static properties = {
    content: { type: String },
    title: { type: String },
    language: { type: String },
    guideId: { type: String }
  };

  content = '';
  title = '';
  language = '';
  guideId = '';

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
    }

    .markdown-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .markdown-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #eee;
    }

    .markdown-title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }

    .markdown-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;
      color: #666;
      flex-wrap: wrap;
    }

    .markdown-category {
      background: #e3f2fd;
      color: #1976d2;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-weight: 500;
    }

    .markdown-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .markdown-tag {
      background: #f5f5f5;
      color: #666;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }

    .markdown-content {
      font-size: 1rem;
    }

    .markdown-content h1,
    .markdown-content h2,
    .markdown-content h3,
    .markdown-content h4,
    .markdown-content h5,
    .markdown-content h6 {
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
      line-height: 1.3;
    }

    .markdown-content h1 {
      font-size: 1.8rem;
      color: #2c3e50;
    }

    .markdown-content h2 {
      font-size: 1.5rem;
      color: #34495e;
    }

    .markdown-content h3 {
      font-size: 1.3rem;
      color: #2c3e50;
    }

    .markdown-content h4 {
      font-size: 1.1rem;
      color: #34495e;
    }

    .markdown-content p {
      margin-bottom: 1rem;
      line-height: 1.7;
    }

    .markdown-content ul,
    .markdown-content ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
    }

    .markdown-content li {
      margin-bottom: 0.5rem;
    }

    .markdown-content blockquote {
      border-left: 4px solid #3498db;
      padding-left: 1rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: #555;
    }

    .markdown-content code {
      background: #f8f9fa;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9em;
    }

    .markdown-content pre {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
      margin: 1.5rem 0;
    }

    .markdown-content pre code {
      background: none;
      padding: 0;
    }

    .markdown-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
    }

    .markdown-content th,
    .markdown-content td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .markdown-content th {
      background: #f8f9fa;
      font-weight: 600;
    }

    .markdown-content a {
      color: #3498db;
      text-decoration: none;
    }

    .markdown-content a:hover {
      text-decoration: underline;
    }

    .markdown-content img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
      margin: 1rem 0;
    }

    .markdown-content hr {
      border: none;
      border-top: 1px solid #eee;
      margin: 2rem 0;
    }
  `;

  render() {
    if (!this.content) {
      return html`<div class="markdown-container">
        <p>No content available</p>
      </div>`;
    }

    return html`
      <div class="markdown-container">
        ${this.title ? html`
          <div class="markdown-header">
            <h1 class="markdown-title">${this.title}</h1>
            <div class="markdown-meta">
              ${this.language ? html`
                <span class="markdown-category">${this.language}</span>
              ` : ''}
              ${this.guideId ? html`
                <span class="markdown-tag">Guide ID: ${this.guideId}</span>
              ` : ''}
            </div>
          </div>
        ` : ''}
        <div class="markdown-content">
          ${this.renderMarkdown(this.content)}
        </div>
      </div>
    `;
  }

  private renderMarkdown(markdown: string): any {
    // Simple markdown rendering - you might want to use a proper markdown parser
    let htmlContent = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // Line breaks
      .replace(/\n/g, '<br>');

    return html`${htmlContent}`;
  }
});

declare global {
  interface HTMLElementTagNameMap {
    'markdown-v1': any;
  }
} 