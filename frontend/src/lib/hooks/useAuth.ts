import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "@/components/endpoints";
import { QUERY_KEYS } from "@/config/query";
import { authFetch, parseErrorObject } from "../utils";

async function authUser() {
  try {
    return await authFetch(ENDPOINTS.ME);
  } catch (e) {
    return {
      error: parseErrorObject(e),
    };
  }
}

export const useAuth = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: authUser,
    retry: false,
  });
};
