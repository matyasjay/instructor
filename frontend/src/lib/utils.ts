import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import { COOKIES } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { client } from "@/lib/http";

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
    Object.create(null)
  );
}

export function parseErrorObject<T = unknown>(error: T) {
  const _e = error as (T | ZodError) & {
    zod: boolean;
    error: string;
  };
  if (_e.zod) {
    return (_e as ZodError).issues[0].message;
  } else if (_e instanceof AxiosError) {
    return _e.response?.data.error;
  } else if (_e.error) {
    return _e.error;
  } else {
    return JSON.stringify(_e);
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
  options?: { skipNormalize?: boolean }
) {
  try {
    const jwt = Cookies.get(COOKIES.JWT);
    const response = await client.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return options?.skipNormalize
      ? response.data
      : normalizeObjectKeys(response.data ?? {});
  } catch (e) {
    return {
      error: parseErrorObject(e),
    };
  }
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
