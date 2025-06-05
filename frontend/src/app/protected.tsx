import { Navigate, Outlet, useLoaderData } from "react-router";
import { PAGES } from "@/config/pages";
import { AuthContext } from "./context";

export default function ProtectedLayout() {
  const { authenticated } = useLoaderData() as { authenticated: boolean };

  if (!authenticated) {
    return <Navigate to={PAGES.PUBLIC.LANDING} />;
  }

  return (
    <AuthContext.Provider value={{ authenticated }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
