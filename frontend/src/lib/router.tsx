import { IndexRouteObject, Navigate, NonIndexRouteObject } from "react-router";
import Landing from "@/app/landing";
import ServiceOwn from "@/app/service/own";
import ErrorLayout from "@/components/layout/error";
import Layout from "@/components/layout/main";
import ProtectedLayout from "@/components/layout/protected";
import { Spinner } from "@/components/ui/skeleton";
import { PageNotFoundError } from "@/lib/error";
import { menu } from "@/lib/menu";
import { PAGES } from "@/lib/pages";
import { requireAuth } from "@/lib/utils";

const router = [
  {
    path: "/",
    element: <Layout />,
    loader: requireAuth,
    hydrateFallbackElement: <Spinner />,
    children: [
      {
        path: "/",
        element: <Navigate to={PAGES.PUBLIC.LANDING} />,
      },
      {
        path: "/*",
        element: (
          <ErrorLayout
            error={PageNotFoundError}
            resetErrorBoundary={() => null}
            hideLayout
          />
        ),
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
            element: (
              <ErrorLayout
                error={PageNotFoundError}
                resetErrorBoundary={() => null}
                hideLayout
              />
            ),
          },
          ...menu,
          {
            path: "/app/service/own/:id",
            element: <ServiceOwn />,
          },
        ],
      },
    ],
  },
] satisfies (IndexRouteObject | NonIndexRouteObject)[];

export default router;
