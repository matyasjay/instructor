import { Navigate, Outlet } from "react-router";
import useAuth from "@/lib/hooks/useAuth";
import { PAGES } from "@/lib/pages";

export default function ProtectedLayout() {
  const { authenticated } = useAuth();

  if (authenticated !== true) {
    return <Navigate to={PAGES.PUBLIC.LANDING} />;
  }

  return <Outlet />;
}
