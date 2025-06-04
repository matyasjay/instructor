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
import Explore from "./explore";
import MyServices from "./my-services";
import Project from "./project";

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
        path: "/explore",
        element: <Explore />,
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
        path: "/app/project",
        element: <Project />,
        hydrateFallbackElement: <SkeletonPage />,
        loader: async () => {
          const auth = await getUserIsAuthenticated();
          return { authenticated: !!auth.user_id };
        },
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
        path: "/app/my-services",
        element: <MyServices />,
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
