import { Navigate, Outlet } from "react-router";
import { PAGES } from "@/config/pages";
import useAuth from "@/lib/hooks/useAuth";

export default function ProtectedLayout() {
  const { authenticated } = useAuth();

  if (authenticated !== true) {
    return <Navigate to={PAGES.PUBLIC.LANDING} />;
  }

  return <Outlet />;
}
