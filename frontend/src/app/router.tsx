import Login from "@/app/login";
import NotFound from "@/app/login";
import { SkeletonPage } from "@/components/ui/skeleton";
import { IndexRouteObject, Navigate, NonIndexRouteObject } from "react-router";
import { ErrorDisplay } from "./error";
import Dashboard from "./dashboard";
import Signup from "./signup";
import Landing from "./landing";
import { ProtectedRoute } from "./protected";
import { PAGES } from "@/config/pages";
import Services from "./services";
import Layout from "./layout";
import { getUserIsAuthenticated } from "@/lib/hooks/useAuth";

const router: (IndexRouteObject | NonIndexRouteObject)[] = [
  {
    index: true,
    path: "/*",
    element: <NotFound />,
    errorElement: <ErrorDisplay />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorDisplay />,
    loader: async () => {
      const auth = await getUserIsAuthenticated();
      return { authenticated: !!auth.user_id };
    },
    hydrateFallbackElement: <SkeletonPage />,
    children: [
      {
        path: "/",
        element: <Navigate to={PAGES.PUBLIC.LANDING} />,
      },
      {
        path: "/landing",
        element: <Landing />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/login",
        element: <Login />,
        hydrateFallbackElement: <SkeletonPage />,
        loader: async () => {
          const auth = await getUserIsAuthenticated();
          return { authenticated: !!auth.user_id };
        },
      },
      {
        path: "/signup",
        element: <Signup />,
        hydrateFallbackElement: <SkeletonPage />,
        loader: async () => {
          const auth = await getUserIsAuthenticated();
          return { authenticated: !!auth.user_id };
        },
      },
    ],
  },
  {
    path: "/app",
    element: <ProtectedRoute />,
    hydrateFallbackElement: <SkeletonPage />,
    errorElement: <ErrorDisplay />,
    loader: async () => {
      const auth = await getUserIsAuthenticated();
      return { authenticated: !!auth.user_id };
    },
    children: [
      {
        path: "/app/*",
        element: <Navigate to={PAGES.PRIVATE.DASHBOARD} />,
      },
      {
        path: "/app/dashboard",
        element: <Dashboard />,
        hydrateFallbackElement: <SkeletonPage />,
        loader: async () => {
          const auth = await getUserIsAuthenticated();
          return { authenticated: !!auth.user_id };
        },
      },
      {
        path: "/app/services",
        element: <Services />,
        hydrateFallbackElement: <SkeletonPage />,
        loader: async () => {
          const auth = await getUserIsAuthenticated();
          return { authenticated: !!auth.user_id };
        },
      },
    ],
  },
];

export default router;
