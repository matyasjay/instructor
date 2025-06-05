import { ENDPOINTS } from "@/config/endpoints";
import { authGet, parseErrorObject } from "../utils";

export async function getUserIsAuthenticated() {
  try {
    return await authGet(ENDPOINTS.ME);
  } catch (e) {
    return {
      error: parseErrorObject(e),
    };
  }
}
