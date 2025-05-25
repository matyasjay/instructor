import { Suspense, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
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


const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found to hydrate app!");
}

const AppError = () => {
  return <span>Error!</span>;
};

const App = () => {
  const queryClient = useQueryClient(new QueryClient(defaultOptions));
  const memoRouter = useMemo(() => createBrowserRouter(router), [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools />}
      <Layout>
        <Suspense fallback={null}>
          <ErrorBoundary FallbackComponent={AppError}>
            <RouterProvider router={memoRouter} />;
          </ErrorBoundary>
        </Suspense>
      </Layout>
    </QueryClientProvider>
  );
};

createRoot(root).render(<App />);
