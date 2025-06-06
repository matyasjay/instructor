import { useEffect, useState } from "react";
import { STORAGE } from "@/config/cookies";

const defaultUser: User = {
  id: "",
  name: "",
  email: "",
};

export default function useUser() {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}"));
  }, []);

  return user;
}
