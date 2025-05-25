import { useQueryClient, QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./welcome/main";

export const createAppRouter = (_queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/welcome",
      element: <Welcome />,
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
