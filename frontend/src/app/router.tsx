import {
  IndexRouteObject,
  LoaderFunctionArgs,
  Navigate,
  NonIndexRouteObject,
} from "react-router";
import Dashboard from "./dashboard";
import { ErrorDisplay } from "./error";
import Landing from "./landing";
import Layout from "./layout";
import ProtectedLayout from "./protected";
import ServiceAll from "./service-all";
import ServiceOwn from "./service-own";
import { SkeletonPage } from "@/components/ui/skeleton";
import { PAGES } from "@/config/pages";
import { getUserIsAuthenticated } from "@/lib/hooks/useAuth";

async function requireAuth(_: LoaderFunctionArgs) {
  const authenticated = await getUserIsAuthenticated();
  return { authenticated };
}

const router: (IndexRouteObject | NonIndexRouteObject)[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorDisplay />,
    hydrateFallbackElement: <SkeletonPage />,
    children: [
      {
        path: "/",
        element: <Navigate to={PAGES.PUBLIC.LANDING} />,
      },
      {
        path: "/*",
        element: <Navigate to={PAGES.PUBLIC.LANDING} />,
      },
      {
        path: "/landing",
        element: <Landing />,
      },
      {
        path: "/app",
        element: <ProtectedLayout />,
        loader: requireAuth,
        children: [
          {
            path: "/app/*",
            element: <Navigate to={PAGES.PUBLIC.LANDING} />,
          },
          {
            path: "/app/dashboard",
            element: <Dashboard />,
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
