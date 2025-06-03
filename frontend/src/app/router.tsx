import Login from "@/app/login";
import NotFound from "@/app/login";
import { IndexRouteObject } from "react-router";
import { ErrorDisplay } from "./error";

const router: IndexRouteObject[] = [
  {
    index: true,
    path: "/",
    element: <Login />,
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
    path: "/*",
    element: <NotFound />,
    errorElement: <ErrorDisplay />,
  },
];

export default router;
