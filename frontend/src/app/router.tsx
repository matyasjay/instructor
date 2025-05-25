import Product from "@/app/product";
import Splash from "@/app/splash";

const router = [
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/product",
    element: <Product />,
  },
];

export default router;
