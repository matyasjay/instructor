import Product from "@/app/product";
import Splash from "@/app/splash";
import { IndexRouteObject } from "react-router";
import { ErrorBoundary } from "./error";

const router: IndexRouteObject[] = [
  {
    index: true,
    path: "/",
    element: <Splash />,
    ErrorBoundary: ErrorBoundary,
  },
  {
    index: true,
    path: "/product",
    element: <Product />,
    ErrorBoundary: ErrorBoundary,
  },
];

export default router;
