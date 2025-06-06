import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/components/context/auth";
import { PAGES } from "@/config/pages";

export default function ProtectedLayout() {
  const { authenticated } = useAuth();

  if (authenticated !== true) {
    return <Navigate to={PAGES.PUBLIC.LANDING} />;
  }

  return <Outlet />;
}
