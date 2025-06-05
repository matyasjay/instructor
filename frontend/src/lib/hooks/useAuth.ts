import { useQuery } from "@tanstack/react-query";
import { authGet, parseErrorObject } from "../utils";
import { ENDPOINTS } from "@/config/endpoints";
import { QUERY_KEYS } from "@/config/query";

export async function getUserIsAuthenticated() {
  try {
    return await authGet(ENDPOINTS.ME);
  } catch (e) {
    return {
      error: parseErrorObject(e),
    };
  }
}

export function useAuth() {
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: getUserIsAuthenticated,
    retry: false,
  });
}
