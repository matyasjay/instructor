import { isRouteErrorResponse } from 'react-router';
import { AxiosError } from 'axios';
import axios from 'axios';
import camelCase from 'camelcase';
import { clsx, type ClassValue } from 'clsx';
import Cookies from 'js-cookie';
import { twMerge } from 'tailwind-merge';
import { COOKIES, STORAGE } from '@/lib/cookies';
import { ENDPOINT } from '@/lib/endpoints';

export const httpClient = axios.create({
  method: 'GET',
  baseURL: 'http://localhost:3333',
  headers: { Accept: 'application/json' },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeObjectKeys<T = Record<string, unknown>>(obj: T): T {
  return Object.entries(Object(obj)).reduce(
    (result, [key, value]) => ({
      ...result,
      [camelCase(key)]:
        !!value && typeof value === 'object' && !Array.isArray(value)
          ? normalizeObjectKeys(value)
          : Array.isArray(value)
            ? value.map(normalizeObjectKeys)
            : value,
    }),
    Object.create(null),
  );
}

export function mapHttpError(error: AxiosError<{ error: string }>) {
  const message = normalizeObjectKeys(error.response?.data ?? Object.create(null))?.error ?? error;

  const key: string = !!message && typeof message === 'object' && 'message' in message ? message.message : message;
  return (
    {
      ['sql: no rows in result set']: 'Failed to get the database record!',
    }[key] ?? key
  );
}

export function parseValidationError(error: ZodIssue) {
  return {
    ['email']: `E-mail is not a valid e-mail address!`,
  }[Object(error).validation + ''];
}

export function mapZodIssue(issue: ZodIssue) {
  return issue.message;
}

export function parseErrorObject<T = unknown>(error: T) {
  const _e = error as (T | ZodError<T>) & {
    zod: boolean;
    error: string;
  };
  if (_e.zod) {
    const errors = JSON.parse(Object(_e).message);
    return `${errors.map(mapZodIssue).join('\n')}`;
  } else if (_e.error) {
    return _e.error;
  } else if (_e instanceof AxiosError) {
    return mapHttpError(_e);
  } else if (isRouteErrorResponse(error)) {
    return error.statusText;
  } else {
    return typeof _e === 'object' ? JSON.stringify(_e) : Object(_e).message + '';
  }
}

export async function authGet(endpoint: Endpoint) {
  try {
    const jwt = Cookies.get(COOKIES.JWT);
    const response = await httpClient.get(endpoint, {
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

export async function authPost<T = Record<string, unknown>, R = Record<string, unknown>>(
  endpoint: Endpoint,
  data: T,
  options?: { skipNormalize?: boolean },
): Promise<ApiResponse<R>> {
  try {
    // @ts-expect-error - userId is implicit
    if (!data.userId) {
      const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? '{}');
      // @ts-expect-error - userId is implicit
      data.userId = user.id;
    }
    const jwt = Cookies.get(COOKIES.JWT);
    const response = await httpClient.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return options?.skipNormalize ? response.data : normalizeObjectKeys(response.data ?? {});
  } catch (e) {
    return {
      error: parseErrorObject(e),
    } as ApiResponse<R>;
  }
}

export async function requireAuth() {
  const result = await authGet(ENDPOINT.USER_GET);
  return { authenticated: !!result.id };
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

let _throttle = false;
export function throttle(callback: () => void, timeInMs: number) {
  if (_throttle || typeof timeInMs !== 'number' || isNaN(+timeInMs)) {
    return void 0;
  }
  _throttle = true;
  setTimeout(() => {
    if (typeof callback === 'function') callback();
    _throttle = false;
  }, timeInMs);
}
