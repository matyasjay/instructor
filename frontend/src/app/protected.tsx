import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/hooks/useAuth";
import { PAGES } from "@/config/pages";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = useAuth();

  if (isPending) return null;

  if (data?.error) {
    return <Navigate to={PAGES.PUBLIC.LOGIN} />;
  }

  return children;
};
