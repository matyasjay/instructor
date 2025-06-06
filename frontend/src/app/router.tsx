import { IndexRouteObject, Navigate, NonIndexRouteObject } from "react-router";
import Account from "@/app/account";
import Landing from "@/app/landing";
import ServiceAll from "@/app/service/all";
import ServiceOwn from "@/app/service/own";
import Layout from "@/components/layout/main";
import ProtectedLayout from "@/components/layout/protected";
import { SkeletonPage } from "@/components/ui/skeleton";
import { PAGES } from "@/config/pages";
import { NotFound } from "@/lib/errors";
import { requireAuth } from "@/lib/utils";

const router: (IndexRouteObject | NonIndexRouteObject)[] = [
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
          {
            path: "/app/account",
            element: <Account />,
          },
          {
            path: "/app/service/own",
            element: <ServiceOwn />,
          },
          {
            path: "/app/service/all",
            element: <ServiceAll />,
          },
        ],
      },
    ],
  },
];

export default router;
