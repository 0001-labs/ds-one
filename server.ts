// Simple development server for DS one examples
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname;

    // Default to examples index
    if (filePath === "/" || filePath === "") {
      filePath = "/examples/index.html";
    }

    // Remove leading slash for file system
    const file = filePath.startsWith("/") ? filePath.slice(1) : filePath;

    try {
      const content = await Bun.file(file).text();

      // Determine content type
      let contentType = "text/plain";
      if (file.endsWith(".html")) contentType = "text/html";
      else if (file.endsWith(".js")) contentType = "application/javascript";
      else if (file.endsWith(".ts")) contentType = "application/typescript";
      else if (file.endsWith(".css")) contentType = "text/css";
      else if (file.endsWith(".json")) contentType = "application/json";
      else if (file.endsWith(".svg")) contentType = "image/svg+xml";
      else if (file.endsWith(".woff2")) contentType = "font/woff2";

      return new Response(content, {
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err) {
      return new Response(`File not found: ${file}`, { status: 404 });
    }
  },
});

console.log(`🚀 DS one dev server running at http://localhost:${server.port}`);
console.log(
  `📝 Examples at http://localhost:${server.port}/examples/portfolio-components.html`
);
console.log(
  `🔗 Link test at http://localhost:${server.port}/examples/test-link.html`
);
