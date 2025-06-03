import Login from "@/app/login";
import NotFound from "@/app/login";
import { IndexRouteObject } from "react-router";
import { ErrorDisplay } from "./error";
import Dashboard from "./dashboard";
import Signup from "./signup";
import Landing from "./landing";

const router: IndexRouteObject[] = [
  {
    index: true,
    path: "/",
    element: <Landing />,
    errorElement: <ErrorDisplay />,
  },
  {
    index: true,
    path: "/login",
    element: <Login />,
    errorElement: <ErrorDisplay />,
  },
  {
    index: true,
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorDisplay />,
  },
  {
    index: true,
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorDisplay />,
  },
  {
    index: true,
    path: "/*",
    element: <NotFound />,
    errorElement: <ErrorDisplay />,
  },
];

export default router;
