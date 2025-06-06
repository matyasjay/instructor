import { isRouteErrorResponse } from "react-router";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";
import { COOKIES } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { client } from "@/lib/http";

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

export function mapHttpError(error: AxiosError<{ error: string }>) {
  const message = error.response?.data?.error;
  return (
    {
      ["sql: no rows in result set"]: "Failed to get the database record!",
    }[message + ""] ?? "Network error happened!"
  );
}

export function parseValidationError(error: ZodIssue) {
  return {
    ["email"]: `E-mail is not a valid e-mail address!`,
  }[Object(error).validation + ""];
}

export function mapZodIssue(issue: ZodIssue) {
  return {
    ["too_small"]: `${capitalizeFirstLetter(
      Object(issue).path
    )} must be at least ${Object(issue).minimum} characters long!`,
    ["invalid_string"]: parseValidationError(issue),
  }[issue.code + ""];
}

export function parseErrorObject<T = unknown>(error: T) {
  const _e = error as (T | ZodError) & {
    zod: boolean;
    error: string;
  };
  if (_e.zod) {
    const issues = (_e as ZodError).issues;
    return `${issues.map(mapZodIssue).join("\n")}`;
  } else if (_e instanceof AxiosError) {
    return mapHttpError(_e);
  } else if (isRouteErrorResponse(error)) {
    return error.statusText;
  } else if (_e.error) {
    return _e.error;
  } else {
    return typeof _e === "object"
      ? JSON.stringify(_e)
      : Object(_e).message + "";
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

export async function requireAuth() {
  const result = await authGet(ENDPOINTS.ME);
  return { authenticated: !!result.user_id };
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
