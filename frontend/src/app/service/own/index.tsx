import ServiceList from "@/components/feature/service-list";
import { useServices } from "@/lib/hooks/useServices";

function ServiceOwn() {
  const services = useServices("user");

  return (
    <div className="flex flex-col w-full gap-3.5 mx-auto min-h-10/12 px-9">
      <ServiceList title="My Services" services={services} />
    </div>
  );
}

export default ServiceOwn;
