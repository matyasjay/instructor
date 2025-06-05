import { SkeletonPage } from "@/components/ui/skeleton";
import { getUserIsAuthenticated } from "@/lib/hooks/useAuth";
import { PAGES } from "@/config/pages";
import {
  IndexRouteObject,
  LoaderFunctionArgs,
  Navigate,
  NonIndexRouteObject,
} from "react-router";
import { ErrorDisplay } from "./error";
import Dashboard from "./dashboard";
import Landing from "./landing";
import ProtectedLayout from "./protected";
import Layout from "./layout";
import ServiceAll from "./service-all";
import ServiceOwn from "./service-own";

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
