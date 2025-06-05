import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { defaultOptions } from "@/config/query";
import { ErrorBoundary } from "./error";
import router from "./router";
import { ThemeProvider } from "./theme";
import "../global.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found to hydrate app!");
}

const App = () => {
  const queryClient = useQueryClient(new QueryClient(defaultOptions));

  const memoRouter = useMemo(() => createBrowserRouter(router, {}), []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.DEV && <ReactQueryDevtools />}
        <ThemeProvider>
          <RouterProvider router={memoRouter} />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

createRoot(root).render(<App />);
