import { lazy, Suspense } from "react";

const ServiceList = lazy(() => import("@/components/feature/service-list"))

function ServiceOwn() {
  return (
    <Suspense>
      <ServiceList title="My Services" type="user" />
    </Suspense>
  );
}

export default ServiceOwn;
