import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMemo } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./error";
import router from "./router";
import { ThemeProvider } from "./theme";
import { defaultOptions } from "@/config/query";
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
