import { Navigate, useLoaderData } from "react-router-dom";
import { PAGES } from "@/config/pages";
import Layout from "./layout";

export const ProtectedRoute = () => {
  const { authenticated } = useLoaderData();

  if (!authenticated) {
    return <Navigate to={PAGES.PUBLIC.LOGIN} />;
  }

  return <Layout authenticated={authenticated} />;
};
