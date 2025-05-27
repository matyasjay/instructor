import { Suspense } from "react";
import Component from "./component";

function Product() {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
}

export default Product;
