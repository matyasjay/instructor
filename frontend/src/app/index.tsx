import { Suspense, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QUERY_DEFAULT_CONFIG } from "@/config/query";
import ROUTE_TABLE from "@/router";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./layout";
import "../global.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found to hydrate app!");
}

const App = () => {
  const queryClient = useQueryClient(new QueryClient(QUERY_DEFAULT_CONFIG));
  const router = useMemo(() => createBrowserRouter(ROUTE_TABLE), [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools />}
      <AppLayout>
        <Suspense fallback={null}>
          <RouterProvider router={router} />;
        </Suspense>
      </AppLayout>
    </QueryClientProvider>
  );
};

createRoot(root).render(<App />);
