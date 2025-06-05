import ServiceNewForm from "./form";
import { PAGES } from "@/config/pages";
import { useEffect, useState } from "react";
import { Navigate, useLoaderData } from "react-router";

function ServiceNew() {
  const [ready, setReady] = useState(false);
  const { authenticated } = useLoaderData();

  useEffect(() => {
    if (authenticated === true) {
      setReady(true);
    }
  }, [authenticated]);

  if (!authenticated) {
    return <Navigate to={PAGES.PUBLIC.LOGIN} />;
  }

  return !ready ? null : (
    <div className="flex flex-col w-full gap-3.5 mx-auto min-h-10/12 px-9">
      <div className="w-full pt-4">
        <h1 className="flex scroll-m-20 text-lg font-semibold tracking-tight mb-4">
          New Service
        </h1>
      </div>
      <ServiceNewForm />
    </div>
  );
}

export default ServiceNew;
