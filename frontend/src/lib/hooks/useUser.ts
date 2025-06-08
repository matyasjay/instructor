import { useEffect, useState } from "react";
import { STORAGE } from "@/config/cookies";
import useAuth from "@/lib/hooks/useAuth";

const defaultUser: User = {
  id: "",
  name: "",
  email: "",
  password: "",
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
};

export default function useUser() {
  const [user, setUser] = useState<User>(defaultUser);
  const { authenticated } = useAuth();

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}"));
  }, [authenticated]);

  return user;
}
