import { useMemo } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { defaultOptions } from "@/config/query";
import router from "./router";
import Layout from "./layout";
import "../global.css";
import { ErrorBoundary } from "./error";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found to hydrate app!");
}

const App = () => {
  const queryClient = useQueryClient(new QueryClient(defaultOptions));

  const memoRouter = useMemo(() => {
    return createBrowserRouter(router, {});
  }, [queryClient]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.DEV && <ReactQueryDevtools />}
        <Layout>
          <RouterProvider router={memoRouter} />
        </Layout>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

createRoot(root).render(<App />);
