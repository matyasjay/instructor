import Login from "@/app/login";
import NotFound from "@/app/login";
import { SkeletonPage } from "@/components/ui/skeleton";
import { getUserIsAuthenticated } from "@/lib/hooks/useAuth";
import { PAGES } from "@/config/pages";
import { IndexRouteObject, Navigate, NonIndexRouteObject } from "react-router";
import { ErrorDisplay } from "./error";
import Dashboard from "./dashboard";
import Signup from "./signup";
import Landing from "./landing";
import { ProtectedRoute } from "./protected";
import Layout from "./layout";
import ServiceAll from "./service-all";
import ServiceOwn from "./service-own";
import ServiceNew from "./service-new";

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
        path: "/app/service/own",
        element: <ServiceOwn />,
        hydrateFallbackElement: <SkeletonPage />,
        loader: async () => {
          const auth = await getUserIsAuthenticated();
          return { authenticated: !!auth.user_id };
        },
      },
      {
        path: "/app/service/all",
        element: <ServiceAll />,
        hydrateFallbackElement: <SkeletonPage />,
        loader: async () => {
          const auth = await getUserIsAuthenticated();
          return { authenticated: !!auth.user_id };
        },
      },
      {
        path: "/app/service/new",
        element: <ServiceNew />,
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
