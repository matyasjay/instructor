import fs from "node:fs/promises";
import express from "express";
import { ViteDevServer } from "vite";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3001;
const base = process.env.BASE || "/";

const templateHtml = isProduction
  ? await fs.readFile("/dist/client/index.html", "utf-8")
  : "";

const app = express();

let vite: ViteDevServer;

if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("/dist/client", { extensions: [] }));
}

app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template: string;
    let render: (url: string) => Promise<{ head: string; html: string }>;
    if (!isProduction) {
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/app/server")).render;
    } else {
      template = templateHtml;
      // @ts-expect-error
      render = (await import("/dist/server/server")).render;
    }

    const rendered = await render(url);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e as Error);
    console.log((e as Error).stack);
    res.status(500).end((e as Error).stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally exit: process.exit(1)
});
