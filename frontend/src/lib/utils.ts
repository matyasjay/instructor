import Cookies from "js-cookie";
import { client } from "@/lib/http";
import { ENDPOINTS } from "@/components/endpoints";
import { COOKIES } from "@/config/cookies";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod/v4";

type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeObjectKeys<T = Record<string, unknown>>(obj: T): T {
  return Object.entries(Object(obj)).reduce(
    (result, [key, value]) => ({
      ...result,
      [key.toLowerCase()]:
        typeof value === "object" ? normalizeObjectKeys(value) : value,
    }),
    Object.create(null),
  );
}

export function parseErrorObject<T = unknown>(error: T) {
  if (error instanceof z.ZodError) {
    return error.issues[0].message;
  } else if (error instanceof AxiosError) {
    return error.response?.data.error;
  } else {
    return JSON.stringify(error);
  }
}

export async function authGet(endpoint: Endpoint) {
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

export async function authPost<T = Record<string, unknown>>(
  endpoint: Endpoint,
  data: T,
) {
  try {
    const jwt = Cookies.get(COOKIES.JWT);
    const response = await client.post(endpoint, data, {
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
