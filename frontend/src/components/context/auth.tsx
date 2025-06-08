import { createContext, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { COOKIES } from "@/lib/cookies";

export const AuthContext = createContext<{
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  authenticated: false,
  setAuthenticated: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(
    !!Cookies.get(COOKIES.JWT),
  );

  const value = useMemo(
    () => ({ authenticated, setAuthenticated }),
    [authenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
