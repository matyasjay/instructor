import { createContext, useContext } from "react";

export const AuthContext = createContext<{ authenticated: boolean }>({
  authenticated: false,
});

export const useAuth = () => useContext(AuthContext);
