import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { COOKIES } from "@/config/cookies";

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

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
