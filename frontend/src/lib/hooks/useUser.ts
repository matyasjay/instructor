import { STORAGE } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { authPost } from "../utils";

export async function fetchUser() {
  const user = window.localStorage.getItem(STORAGE.USER) ?? "{}";
  const result = await authPost(ENDPOINTS.CURRENT_USER, JSON.parse(user));
  delete result.id;
  delete result.password;
  delete result.passwordhash;
  return result;
}
