import React, { useMemo } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout";
import Welcome from "./welcome";

import "../global.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found to hydrate app!");
}

export const ROUTE_TABLE = [
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
];

export const QUERY_CONFG = {
  defaultOptions: {
    queries: {
      throwOnError: true,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60,
    },
  },
};

const App = () => {
  const queryClient = useQueryClient(new QueryClient(QUERY_CONFG));
  const router = useMemo(() => createBrowserRouter(ROUTE_TABLE), [queryClient]);

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={() => <div>Error</div>}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools />}
          <AppLayout>
            <RouterProvider router={router} />;
          </AppLayout>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
