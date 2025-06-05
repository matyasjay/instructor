import {
  IndexRouteObject,
  LoaderFunctionArgs,
  Navigate,
  NonIndexRouteObject,
} from "react-router";
import { PAGES } from "@/config/pages";
import { getUserIsAuthenticated } from "@/lib/hooks/useAuth";
import Dashboard from "./dashboard";
import { ErrorDisplay } from "./error";
import Landing from "./landing";
import Layout from "./layout";
import ProtectedLayout from "./protected";
import ServiceAll from "./service-all";
import ServiceOwn from "./service-own";

const PageNotFoundError = Error("Page Not Found");

const NotFound = (
  <ErrorDisplay
    error={PageNotFoundError}
    resetErrorBoundary={() => null}
    hideLayout
  />
);

async function requireAuth(_: LoaderFunctionArgs) {
  const result = await getUserIsAuthenticated();
  return { authenticated: !!result.user_id };
}

const router: (IndexRouteObject | NonIndexRouteObject)[] = [
  {
    path: "/",
    element: <Layout />,
    loader: requireAuth,
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
