import { IndexRouteObject, Navigate, NonIndexRouteObject } from "react-router";
import Landing from "@/app/landing";
import Layout from "@/components/layout/main";
import ProtectedLayout from "@/components/layout/protected";
import { SkeletonPage } from "@/components/ui/skeleton";
import { menu } from "@/config/menu";
import { PAGES } from "@/config/pages";
import { NotFound } from "@/lib/errors";
import { requireAuth } from "@/lib/utils";

const router = [
  {
    path: "/",
    element: <Layout />,
    loader: requireAuth,
    hydrateFallbackElement: <SkeletonPage />,
    children: [
      {
        path: "/",
        element: <Navigate to={PAGES.PUBLIC.LANDING} />,
      },
      {
        path: "/*",
        element: NotFound,
      },
      {
        path: "/landing",
        element: <Landing />,
      },
      {
        path: "/app",
        element: <ProtectedLayout />,
        children: [
          {
            path: "/app/*",
            element: NotFound,
          },
          ...menu,
        ],
      },
    ],
  },
] satisfies (IndexRouteObject | NonIndexRouteObject)[];

export default router;
