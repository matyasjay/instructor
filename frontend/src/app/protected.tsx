import { Navigate, Outlet, useLoaderData } from "react-router";
import { AuthContext } from "./context";
import { PAGES } from "@/config/pages";

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
