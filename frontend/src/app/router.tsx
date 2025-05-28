import Product from "@/app/product";
import Splash from "@/app/splash";
import { IndexRouteObject } from "react-router";
import { ErrorDisplay } from "./error";

const router: IndexRouteObject[] = [
  {
    index: true,
    path: "/",
    element: <Splash />,
    errorElement: <ErrorDisplay />,
  },
  {
    index: true,
    path: "/product",
    element: <Product />,
    errorElement: <ErrorDisplay />,
  },
];

export default router;
