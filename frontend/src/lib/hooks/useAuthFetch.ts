import Cookies from "js-cookie";
import { client } from "../http";
import { ENDPOINTS } from "@/config/endpoints";
import { normalizeObjectKeys, parseErrorObject } from "../utils";
import { COOKIES } from "@/config/cookies";

type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];

export async function authFetch(endpoint: Endpoint) {
  try {
    const jwt = Cookies.get(COOKIES.JWT);
    const response = await client.get(endpoint, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return normalizeObjectKeys(response.data ?? {});
  } catch (e) {
    return {
      error: parseErrorObject(e),
    };
  }
}
