import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { STORAGE } from "@/lib/cookies";
import { ENDPOINTS } from "@/lib/endpoints";
import { MUTATION_KEYS } from "@/lib/query";
import { authPost, normalizeObjectKeys } from "../utils";

export async function fetchService(service: "all" | "user") {
  const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}");

  const endpoint = {
    ["all"]: ENDPOINTS.GET_SERVICES_ALL,
    ["user"]: ENDPOINTS.GET_SERVICES_USER,
  }[service];

  const result = await authPost<{ id: string }, AggregatedService[]>(
    endpoint,
    { id: user.id },
    { skipNormalize: true },
  );

  return result;
}

export function useServices(scope: "all" | "user"): {
  isPending: boolean;
  services: AggregatedService[];
} {
  const [delayFinished, setDelayFinished] = useState(false);

  const {
    isPending: rawIsPending,
    data,
    mutate,
  } = useMutation({
    mutationFn: fetchService,
    mutationKey: [MUTATION_KEYS.GET_SERVICES],
    onSuccess: (data) => {
      if (Object(data).error) {
        return [];
      }
      return data;
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayFinished(true);
    }, 200);

    mutate(scope);

    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line

  const services =
    !!data && "error" in data ? [] : (data?.map(normalizeObjectKeys) ?? []);

  const isPending = rawIsPending || !delayFinished;

  return { isPending, services };
}
