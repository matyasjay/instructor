import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import Layout from "./layout";
import { createBrowserRouter, RouterProvider } from "react-router";
import router from "./router";

export function render() {
  const memoRouter = createBrowserRouter(router, {});

  const html = renderToString(
    <StrictMode>
      <Layout>
        <RouterProvider router={memoRouter} />
      </Layout>
    </StrictMode>
  );
  return { html };
}
