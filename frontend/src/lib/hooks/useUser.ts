import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/auth";
import { STORAGE } from "@/config/cookies";

const defaultUser: User = {
  id: "",
  name: "",
  email: "",
};

export default function useUser() {
  const [user, setUser] = useState<User>(defaultUser);
  const { authenticated } = useAuth();

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}"));
  }, [authenticated]);

  return user;
}
