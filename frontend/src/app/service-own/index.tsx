import { PAGES } from "@/config/pages";
import { useServices } from "@/lib/hooks/useServices";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";

function ServiceOwn() {
  const services = useServices();
  const { authenticated } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated === false) {
      navigate(PAGES.PUBLIC.LOGIN);
    }
  }, [authenticated]);

  return (
    <div className="flex flex-col w-full gap-3.5 mx-auto min-h-10/12 px-9">
      <div className="w-full pt-4">
        <h1 className="flex scroll-m-20 text-lg font-semibold tracking-tight mb-4">
          Own Services
        </h1>
      </div>
      {services.map(({ name, id }) => (
        <div>
          {id} - {name}
        </div>
      ))}
    </div>
  );
}

export default ServiceOwn;
