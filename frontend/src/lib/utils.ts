import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeObjectKeys<T = Record<string, unknown>>(obj: T) {
  return Object.entries(Object(obj)).reduce(
    (result, [key, value]) => ({
      ...result,
      [key.toLowerCase()]: value,
    }),
    Object.create(null)
  );
}
